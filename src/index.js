"use strict";

/**
  Parse the string representation of a non-zero number to yield its
  mantissa (always a positive integer) and nominal exponent.
*/
var parseDecimalLiteral = function(str) {
  var match = /^(\d*?)(0*)(?:\.(0*)(\d*?))?(?:e([+-]?\d+))?$/.exec(str);
  var integer = match[1] || "";
  var trailingZeroes = match[2];
  var leadingZeroes = match[3] || "";
  var decimal = match[4] || "";
  var exponent = match[5] || "0";

  if(decimal === "") {
    // e.g. 7, 7890.000. Omit the decimal and zeroes
    return {
      mantissa: integer,
      exponent: Number(exponent) + trailingZeroes.length
    };
  }

  if(integer === "") {
    // e.g. 0.04. Omit the integer and zeroes
    return {
      mantissa: decimal,
      exponent: Number(exponent) - leadingZeroes.length - decimal.length
    };
  }

  // e.g. 791000.001. Keep everything
  return {
    mantissa: integer + trailingZeroes + leadingZeroes + decimal,
    exponent: Number(exponent) - leadingZeroes.length - decimal.length
  };
};

/**
  Take a finite, non-negative number `x` as input and return the shortest decimal
  literal representation of that number, if possible (or `null` if there is
  none).
*/
var getDecimalLiteral = function(x) {
  if(x === 0) {
    return "0";
  }

  var best = String(x);

  var parsed = parseDecimalLiteral(best);
  var mantissa = parsed.mantissa;
  var exponent = parsed.exponent;

  // Omit the exponent if at all possible.

  var candidate;
  if(0 <= exponent && exponent <= 2) {
    // E.g. `3431e0`, `8e1`, `17e2`
    // Return `3431`, `80`, `1700`
    candidate = mantissa += "0".repeat(exponent);
  }

  else if(-mantissa.length - 2 <= exponent && exponent < 0) {
    var dotGoesAt = mantissa.length + exponent;
    if(dotGoesAt >= 0) {
      // E.g. `6784e-4`, `6784e-3`, `6784e-2`, `6784e-1`
      // Return `.6784`, `6.784`, `67.84`, `6.784`. We gain
      // the dot (one character) but lose the exponent (three).
      candidate = mantissa.substring(0, dotGoesAt) + "." + mantissa.substring(dotGoesAt);
    } else {
      // E.g. `6784e-5`, `6784e-6`
      // Return `.06784`, `.006784`. We gain the dot and up to 2
      // zeroes, but lose the exponent.
      candidate = "." + "0".repeat(-dotGoesAt) + mantissa;
    }
  }

  else {
    candidate = mantissa + "e" + String(exponent);
  }

  return candidate.length < best.length ? candidate : best;
};

"use strict";

/**
  Assumes `x` is a non-negative finite number.
  Return the shortest hexadecimal literal for the supplied number, if any. Null otherwise.
*/
var getHexLiteral = function(x) {
  // JavaScript does not accept hexadecimal literals for anything other than
  // integers.
  if(!Number.isInteger(x)) {
    return null;
  }

  // A positive number takes at most 22 characters to represent as
  // a decimal literal, e.g. `2.225073858507202e+208`. So if the hexadecimal
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
var fromNumber = function(x) {
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

  return [
    getDecimalLiteral(x),
    getHexLiteral(x) // second choice
  ].reduce(function(best, literal) {
    return literal !== null && (best === null || literal.length < best.length) ? literal : best;
  }, null);
};

var minifyNumericLiteral = function(str) {
  if(typeof str !== "string") {
    return null;
  }

  if(
    !/^(((0|[1-9][0-9]*)(\.[0-9]*)?)|\.[0-9]+)([eE][+\-]?[0-9]+)?$/.exec(str)
    && !/^0[bB][01]+$/.exec(str)
    && !/^0[oO][0-7]+$/.exec(str)
    && !/^0[xX][0-9a-fA-F]+$/.exec(str)
  ) {
    return null;
  }

  var x = eval(str); // Aaaaa!

  return fromNumber(x);
};

module.exports = minifyNumericLiteral;
module.exports.fromNumber = fromNumber;
module.exports._parseDecimalLiteral = parseDecimalLiteral;
module.exports._getDecimalLiteral = getDecimalLiteral;
module.exports._getHexLiteral = getHexLiteral;
