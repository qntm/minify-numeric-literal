"use strict";

/**
  Return the shortest string of an array of strings.
*/
var shortest = function(strings) {
  return strings.filter(function(string) {
    return string !== null;
  }).sort(function(a, b) {
    return a.length - b.length;
  })[0];
};

var toString = function(x, methodCallContext) {
  var str = String(x);
  if(methodCallContext && !str.match(/[.eE]/)) {
    str += ".";
  }
  return str;
};

/**
  Parse the string representation of a number to yield its
  "canonical" mantissa and exponent. E.g.:

    "7890.0e4" -> {mantissa: "789", exponent: 5}

  The mantissa always starts and ends with a non-zero digit
  except in the special case of strings represention 0, when
  the mantissa is "". The longest possible mantissa has
  length 17 e.g. "22250738585072034".
*/
var parseDecimalLiteral = function(str) {
  var match = /^(\d*?)(0*)(?:\.(0*)(\d*?))?(?:e([+-]?\d+))?$/.exec(str);
  var integer = match[1] || "";
  var trailingZeroes = match[2];
  var leadingZeroes = match[3] || "";
  var decimal = match[4] || "";
  var exponent = match[5] || "0";

  if(decimal === "") {
    if(integer === "") {
      // e.g. "0", "0.000e7"
      return {
        mantissa: "",
        exponent: 0
      };
    }

    // e.g. "7", "7890.000". Omit the decimal and zeroes
    return {
      mantissa: integer,
      exponent: Number(exponent) + trailingZeroes.length
    };
  }

  if(integer === "") {
    // e.g. "0.04". Omit the integer and zeroes
    return {
      mantissa: decimal,
      exponent: Number(exponent) - leadingZeroes.length - decimal.length
    };
  }

  // e.g. "791000.001". Keep everything
  return {
    mantissa: integer + trailingZeroes + leadingZeroes + decimal,
    exponent: Number(exponent) - leadingZeroes.length - decimal.length
  };
};

/**
  The "canonical" representation is:
  e.g. "e0", "999e-6", "999e3", "999e-1"
*/
var canonical = function(mantissa, exponent) {
  return mantissa + "e" + String(exponent);
};

/**
  e.g. "4792346200000000000000", ".00000000000004242"
*/
var exponentLess = function(mantissa, exponent, methodCallContext) {
  var dotPos = mantissa.length + exponent;

  var beforeDot =
    dotPos <= 0 ? null :
    dotPos <= mantissa.length ? mantissa.substring(0, dotPos) :
    mantissa + "0".repeat(dotPos - mantissa.length);
  var afterDot =
    dotPos < 0 ? "0".repeat(-dotPos) + mantissa :
    dotPos < mantissa.length ? mantissa.substring(dotPos) :
    null;

  // `beforeDot` and `afterDot` are never "", always `null`

  return afterDot === null
    ? (beforeDot === null ? "0" : beforeDot) + (methodCallContext ? "." : "")
    : (beforeDot === null ? "" : beforeDot) + "." + afterDot;
};

/**
  Take a finite, non-negative number `x` as input and return the shortest decimal
  literal representation of that number, if possible (or `null` if there is
  none).
*/
var decimalLiteral = function(x, methodCallContext) {
  var parsed = parseDecimalLiteral(String(x));

  var mantissa = parsed.mantissa; // string. Could be "" for inputs like "0"
  var exponent = parsed.exponent; // number

  return shortest([
    exponentLess(mantissa, exponent, methodCallContext), // preferred
    canonical(mantissa, exponent)
  ]);
};

/**
  Assumes `x` is a non-negative finite number.
  Return the shortest hexadecimal literal for the supplied number, if any. Null otherwise.
*/
var hexLiteral = function(x) {
  // JavaScript does not accept hexadecimal literals for anything other than
  // integers.
  if(!Number.isInteger(x)) {
    return null;
  }

  // A positive integer takes at most 22 characters to represent as
  // a decimal literal, e.g. `2.2250738585072034e208`. So if the hexadecimal
  // literal is larger than this, there's no point in continuing because
  // the decimal literal will invariably be the same length or shorter.
  if(x > 0x10000000000000000000) { // 22 chars
    return null;
  }

  // There are a few specific cases where the default hexadecimal representation
  // is `0x1000...0` but `0xfff...f` evaluates to the same float while saving a
  // character:
  if(x === 0x100000000000000) {
    return "0xffffffffffffff"; // 16 chars
  }
  if(x === 0x1000000000000000) {
    return "0xfffffffffffffff"; // 17 chars
  }
  if(x === 0x10000000000000000) {
    return "0xffffffffffffffff"; // 18 chars
  }
  if(x === 0x100000000000000000) {
    return "0xfffffffffffffffff"; // 19 chars
  }
  if(x === 0x1000000000000000000) {
    return "0xffffffffffffffffff"; // 20 chars
  }
  if(x === 0x10000000000000000000) {
    return "0xfffffffffffffffffff"; // 21 chars
  }

  return "0x" + x.toString(16);
};

/**
  Return the smallest literal representation of a float, if one exists.
*/
var fromNumber = function(x, methodCallContext) {
  if(typeof x !== "number") {
    return null;
  }

  // There is no numeric literal representation for NaN.
  if(isNaN(x)) {
    return null;
  }

  // JavaScript does not have negative-valued literals, only positive-valued ones
  // with unary negative operators applied.
  if(x < 0 || 1 / x < 0) {
    return null;
  }

  // Although `"Infinity"` the string is not a valid numeric literal, `Infinity`
  // the float can totally be represented using a numeric literal, like so:
  if(x === Infinity) {
    return "2e308";
  }

  return shortest([
    toString(x, methodCallContext),
    decimalLiteral(x, methodCallContext),
    hexLiteral(x)
  ]);
};

/**
  We need to know exactly what number the input string represents. This step is
  necessary because the input string could be invalid, contain superfluous digits
  or evaluate to `Infinity`.
*/
var parseNumericLiteral = function(str) {
  var match = /^0[bB]([01]+)$/.exec(str);
  if(match !== null) {
    return Number.parseInt(match[1], 0b10);
  }

  match = /^0[oO]([0-7]+)$/.exec(str);
  if(match !== null) {
    return Number.parseInt(match[1], 0o10);
  }

  match = /^0[xX]([0-9a-fA-F]+)$/.exec(str);
  if(match !== null) {
    return Number.parseInt(match[1], 0x10);
  }

  match = /^(((0|[1-9][0-9]*)(\.[0-9]*)?)|\.[0-9]+)([eE][+\-]?[0-9]+)?$/.exec(str);
  if(match !== null) {
    return Number.parseFloat(match[0]);
  }

  return null;
};

/**
  Take a numeric literal e.g. "99e0" and return a minified one
  e.g. "99". If `methodCallContext` is truthy, we assume the literal appears
  in a context like `99e0.toString()` such that `99.toString()` would be a
  syntax error, so return "99." instead.
*/
var minifyNumericLiteral = function(str, methodCallContext) {
  if(typeof str !== "string") {
    return null;
  }

  var x = parseNumericLiteral(str);
  if(x === null) {
    return null;
  }

  return fromNumber(x, methodCallContext);
};

module.exports = minifyNumericLiteral;
module.exports._shortest = shortest;
module.exports._toString = toString;
module.exports._parseDecimalLiteral = parseDecimalLiteral;
module.exports._exponentLess = exponentLess;
module.exports._decimalLiteral = decimalLiteral;
module.exports._hexLiteral = hexLiteral;
module.exports._parseNumericLiteral = parseNumericLiteral;
module.exports.fromNumber = fromNumber;
