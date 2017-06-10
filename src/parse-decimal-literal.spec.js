"use strict";

var _parseDecimalLiteral = require("./index.js")._parseDecimalLiteral;

describe("_parseDecimalLiteral", function() {
  it("works", function() {
    expect(_parseDecimalLiteral("7")).toEqual({mantissa: "7", exponent: 0});
    expect(_parseDecimalLiteral("0.04")).toEqual({mantissa: "4", exponent: -2});
    expect(_parseDecimalLiteral("7800")).toEqual({mantissa: "78", exponent: 2});
    expect(_parseDecimalLiteral("7800.1")).toEqual({mantissa: "78001", exponent: -1});
    expect(_parseDecimalLiteral("7800.01")).toEqual({mantissa: "780001", exponent: -2});
    expect(_parseDecimalLiteral("1.476925632985436e-86")).toEqual({mantissa: "1476925632985436", exponent: -101});
    expect(_parseDecimalLiteral("100.476925632985436e-86")).toEqual({mantissa: "100476925632985436", exponent: -101});
    expect(_parseDecimalLiteral("0.00014e86")).toEqual({mantissa: "14", exponent: 81});
    expect(_parseDecimalLiteral("0.00014e-86")).toEqual({mantissa: "14", exponent: -91});
    expect(_parseDecimalLiteral("0.000783")).toEqual({mantissa: "783", exponent: -6});
    expect(_parseDecimalLiteral("1.000")).toEqual({mantissa: "1", exponent: 0});
  });

  it("handles '0'", function() {
    expect(_parseDecimalLiteral("0")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0.000")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0e12")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0e-19")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0.00000e7")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0.00000e-7")).toEqual({mantissa: "", exponent: 0});
    expect(_parseDecimalLiteral("0e0")).toEqual({mantissa: "", exponent: 0});
  });
});
