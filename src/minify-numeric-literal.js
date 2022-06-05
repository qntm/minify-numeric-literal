/**
  Return the shortest string of an array of strings.
*/
export const _shortest = strings =>
  strings.reduce(
    (shortest, string) =>
      shortest === null || (string !== null && string.length < shortest.length)
        ? string
        : shortest,
    null
  )

export const _toString = (x, methodCallContext) => {
  const str = String(x)
  return methodCallContext && !str.match(/[.eE]/)
    ? str + '.'
    : str
}

/**
  Parse the string representation of a number to yield its
  "canonical" mantissa and exponent. E.g.:

    "7890.0e4" -> {mantissa: "789", exponent: 5}

  The mantissa always starts and ends with a non-zero digit
  except in the special case of strings represention 0, when
  the mantissa is "". The longest possible mantissa has
  length 17 e.g. "22250738585072034".
*/
export const _parseDecimalLiteral = str => {
  const match = /^(\d*?)(0*)(?:\.(0*)(\d*?))?(?:e([+-]?\d+))?$/.exec(str)
  const integer = match[1] || ''
  const trailingZeroes = match[2]
  const leadingZeroes = match[3] || ''
  const decimal = match[4] || ''
  const exponent = match[5] || '0'

  if (decimal === '') {
    if (integer === '') {
      // e.g. "0", "0.000e7"
      return {
        mantissa: '',
        exponent: 0
      }
    }

    // e.g. "7", "7890.000". Omit the decimal and zeroes
    return {
      mantissa: integer,
      exponent: Number(exponent) + trailingZeroes.length
    }
  }

  if (integer === '') {
    // e.g. "0.04". Omit the integer and zeroes
    return {
      mantissa: decimal,
      exponent: Number(exponent) - leadingZeroes.length - decimal.length
    }
  }

  // e.g. "791000.001". Keep everything
  return {
    mantissa: integer + trailingZeroes + leadingZeroes + decimal,
    exponent: Number(exponent) - leadingZeroes.length - decimal.length
  }
}

/**
  The "canonical" representation is:
  e.g. "e0", "999e-6", "999e3", "999e-1"
*/
const canonical = (mantissa, exponent) =>
  mantissa + 'e' + String(exponent)

/**
  e.g. "4792346200000000000000", ".00000000000004242"
*/
export const _exponentLess = (mantissa, exponent, methodCallContext) => {
  const dotPos = mantissa.length + exponent

  const beforeDot = dotPos <= 0
    ? ''
    : dotPos <= mantissa.length
      ? mantissa.substring(0, dotPos)
      : mantissa + '0'.repeat(dotPos - mantissa.length)

  const afterDot = dotPos < 0
    ? '0'.repeat(-dotPos) + mantissa
    : dotPos < mantissa.length
      ? mantissa.substring(dotPos)
      : ''

  return afterDot === ''
    ? (beforeDot === '' ? '0' : beforeDot) + (methodCallContext ? '.' : '')
    : beforeDot + '.' + afterDot
}

/**
  Take a finite, non-negative number `x` as input and return the shortest decimal
  literal representation of that number, if possible (or `null` if there is
  none).
*/
export const _decimalLiteral = (x, methodCallContext) => {
  const parsed = _parseDecimalLiteral(String(x))

  const mantissa = parsed.mantissa // string. Could be "" for inputs like "0"
  const exponent = parsed.exponent // number

  return _shortest([
    _exponentLess(mantissa, exponent, methodCallContext), // preferred
    canonical(mantissa, exponent)
  ])
}

/**
  Assumes `x` is a non-negative finite number.
  Return the shortest hexadecimal literal for the supplied number, if any. Null otherwise.
*/
export const _hexLiteral = x => {
  // JavaScript does not accept hexadecimal literals for anything other than
  // integers.
  if (!Number.isInteger(x)) {
    return null
  }

  // There are a few specific cases where the default hexadecimal representation
  // is `0x1000...0` but `0xfff...f` evaluates to the same float while saving a
  // character:
  if (x === 0x100000000000000) {
    return '0xffffffffffffff' // 16 chars
  }
  if (x === 0x1000000000000000) {
    return '0xfffffffffffffff' // 17 chars
  }
  if (x === 0x10000000000000000) {
    return '0xffffffffffffffff' // 18 chars
  }
  if (x === 0x100000000000000000) {
    return '0xfffffffffffffffff' // 19 chars
  }
  if (x === 0x1000000000000000000) {
    return '0xffffffffffffffffff' // 20 chars
  }
  if (x === 0x10000000000000000000) {
    return '0xfffffffffffffffffff' // 21 chars
  }

  return '0x' + x.toString(16)
}

/**
  Return the smallest literal representation of a float, if one exists.
*/
export const fromNumber = (x, methodCallContext) => {
  if (typeof x !== 'number') {
    return null
  }

  // There is no numeric literal representation for NaN.
  if (isNaN(x)) {
    return null
  }

  // JavaScript does not have negative-valued literals, only positive-valued ones
  // with unary negative operators applied.
  if (x < 0 || 1 / x < 0) {
    return null
  }

  // Although `"Infinity"` the string is not a valid numeric literal, `Infinity`
  // the float can totally be represented using a numeric literal, like so:
  if (x === Infinity) {
    return '2e308'
  }

  return _shortest([
    _toString(x, methodCallContext),
    _decimalLiteral(x, methodCallContext),
    _hexLiteral(x)
  ])
}

/**
  We need to know exactly what number the input string represents. This step is
  necessary because the input string could be invalid, contain superfluous digits
  or evaluate to `Infinity`.
*/
export const _parseNumericLiteral = str => {
  const binaryMatch = /^0[bB]([01]+)$/.exec(str)
  if (binaryMatch !== null) {
    return Number.parseInt(binaryMatch[1], 0b10)
  }

  const octalMatch = /^0[oO]([0-7]+)$/.exec(str)
  if (octalMatch !== null) {
    return Number.parseInt(octalMatch[1], 0o10)
  }

  const hexMatch = /^0[xX]([0-9a-fA-F]+)$/.exec(str)
  if (hexMatch !== null) {
    return Number.parseInt(hexMatch[1], 0x10)
  }

  const decimalMatch = /^(((0|[1-9][0-9]*)(\.[0-9]*)?)|\.[0-9]+)([eE][+-]?[0-9]+)?$/.exec(str)
  if (decimalMatch !== null) {
    return Number.parseFloat(decimalMatch[0])
  }

  return null
}

/**
  Take a numeric literal e.g. "99e0" and return a minified one
  e.g. "99". If `methodCallContext` is truthy, we assume the literal appears
  in a context like `99e0.toString()` such that `99.toString()` would be a
  syntax error, so return "99." instead.
*/
export default (str, methodCallContext) => {
  if (typeof str !== 'string') {
    return null
  }

  const x = _parseNumericLiteral(str)
  if (x === null) {
    return null
  }

  return fromNumber(x, methodCallContext)
}
