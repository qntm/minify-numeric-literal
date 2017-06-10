"use strict";

var minifyNumericLiteral = require("./index.js");

// Sanity checked version
var getDecimalLiteral = function(x) {
  var result = minifyNumericLiteral._getDecimalLiteral(x);
  expect(Object.is(eval(result), x)).toBe(true);
  return result;
};

var _getDecimalLiteralFromParsed = minifyNumericLiteral._getDecimalLiteralFromParsed;

describe("_getDecimalLiteral", function() {
  it("returns the original number most of the time", function() {
    expect(getDecimalLiteral(0)).toBe("0");
    expect(getDecimalLiteral(1)).toBe("1");
    expect(getDecimalLiteral(2)).toBe("2");
    expect(getDecimalLiteral(16)).toBe("16");
  });

  it("suppresses 'e+' in favour of 'e'", function() {
    expect(getDecimalLiteral(1e34)).toBe("1e34");
    expect(getDecimalLiteral(1e+34)).toBe("1e34");
    expect(getDecimalLiteral(1e-34)).toBe("1e-34");
  });

  it("uses 'e' and 'e-' when appropriate", function() {
    expect(getDecimalLiteral(100)).toBe("100");
    expect(getDecimalLiteral(900)).toBe("900");
    expect(getDecimalLiteral(1000)).toBe("1e3");
    expect(getDecimalLiteral(9000)).toBe("9e3");
    expect(getDecimalLiteral(9100)).toBe("9100");
    expect(getDecimalLiteral(10000)).toBe("1e4");
    expect(getDecimalLiteral(56000)).toBe("56e3");
    expect(getDecimalLiteral(100000)).toBe("1e5");
    expect(getDecimalLiteral(145000)).toBe("145e3");
    expect(getDecimalLiteral(1.45e6)).toBe("145e4");
    expect(getDecimalLiteral(1450000)).toBe("145e4");
  });

  it("removes the decimal when possible", function() {
    expect(getDecimalLiteral(.7e8)).toBe("7e7");
    expect(getDecimalLiteral(1.476925632985436e10)).toBe("14769256329.85436");
    expect(getDecimalLiteral(1.476925632985436e19)).toBe("1476925632985436e4");
    expect(getDecimalLiteral(1.476925632985436e20)).toBe("1476925632985436e5");
    expect(getDecimalLiteral(1.476925632985436e84)).toBe("1476925632985436e69");
    expect(getDecimalLiteral(1.476925632985436e85)).toBe("1476925632985436e70");
    expect(getDecimalLiteral(1.476925632985436e86)).toBe("1476925632985436e71");
    expect(getDecimalLiteral(1.476925632985436e99)).toBe("1476925632985436e84");
    expect(getDecimalLiteral(1.476925632985436e100)).toBe("1476925632985436e85");
    expect(getDecimalLiteral(1.476925632985436e308)).toBe("1476925632985436e293");

    expect(getDecimalLiteral(6.736e109)).toBe("6736e106");
    expect(getDecimalLiteral(2.225073858507202e-308)).toBe("2225073858507202e-323");

    expect(getDecimalLiteral(.1476925632985436e-9)).toBe("1476925632985436e-25");
    expect(getDecimalLiteral(1.476925632985436e-10)).toBe("1476925632985436e-25");
    expect(getDecimalLiteral(1.476925632985436e-69)).toBe("1476925632985436e-84");
    expect(getDecimalLiteral(1.476925632985436e-84)).toBe("1476925632985436e-99");
    expect(getDecimalLiteral(1.476925632985436e-85)).toBe("1476925632985436e-100");
    expect(getDecimalLiteral(1.476925632985436e-86)).toBe("1476925632985436e-101");
    expect(getDecimalLiteral(1.476925632985436e-99)).toBe("1476925632985436e-114");
    expect(getDecimalLiteral(1.4e-99)).toBe("14e-100");
    expect(getDecimalLiteral(1.476925632985436e-100)).toBe("1476925632985436e-115");
    expect(getDecimalLiteral(1.476925632985436e-308)).toBe("1476925632985436e-323");
  });

  it("truncates the optional leading '0'", function() {
    expect(getDecimalLiteral(0.1)).toBe(".1");
    expect(getDecimalLiteral(0.7)).toBe(".7");
    expect(getDecimalLiteral(0.03476991)).toBe(".03476991");
  });

  it("removes the decimal for very small numbers when possible", function() {
    expect(getDecimalLiteral(0.07)).toBe(".07");
    expect(getDecimalLiteral(0.007)).toBe(".007");
    expect(getDecimalLiteral(0.0007)).toBe("7e-4");
    expect(getDecimalLiteral(0.000783)).toBe("783e-6");
    expect(getDecimalLiteral(0.7e-8)).toBe("7e-9");
  });
});
