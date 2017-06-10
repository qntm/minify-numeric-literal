"use strict";

// Wrap every call in this test
var parseNumericLiteral = require("./index.js")._parseNumericLiteral;

describe("parse-numeric-literal", function() {
  it("refuses some invalid inputs", function() {
    expect(parseNumericLiteral("-244")).toBe(null);
    expect(parseNumericLiteral("-0")).toBe(null);
    expect(parseNumericLiteral("Infinity")).toBe(null);
    expect(parseNumericLiteral("-Infinity")).toBe(null);
    expect(parseNumericLiteral("NaN")).toBe(null);
  });

  it("refuses leading or trailing whitespace", function() {
    expect(parseNumericLiteral(" 0b101")).toBe(null);
    expect(parseNumericLiteral("0b101 ")).toBe(null);
    expect(parseNumericLiteral(" 0B101 ")).toBe(null);
    expect(parseNumericLiteral("0o ")).toBe(null);
    expect(parseNumericLiteral("0o0 ")).toBe(null);
    expect(parseNumericLiteral(" 0o0 ")).toBe(null);
    expect(parseNumericLiteral(" 0O1 ")).toBe(null);
    expect(parseNumericLiteral(" 0o0")).toBe(null);
    expect(parseNumericLiteral("0x1 ")).toBe(null);
    expect(parseNumericLiteral(" 0x1")).toBe(null);
    expect(parseNumericLiteral(" 0X1")).toBe(null);
    expect(parseNumericLiteral(" 7")).toBe(null);
    expect(parseNumericLiteral("89.1 ")).toBe(null);
    expect(parseNumericLiteral(" 0 ")).toBe(null);
  });

  it("refuses a leading 0-something with no digits", function() {
    expect(parseNumericLiteral("0b")).toBe(null);
    expect(parseNumericLiteral("0B")).toBe(null);
    expect(parseNumericLiteral("0o")).toBe(null);
    expect(parseNumericLiteral("0O")).toBe(null);
    expect(parseNumericLiteral("0x")).toBe(null);
    expect(parseNumericLiteral("0X")).toBe(null);
  });

  it("refuses leading zero with extras", function() {
    expect(parseNumericLiteral("00B101")).toBe(null);
    expect(parseNumericLiteral("00o18")).toBe(null);
    expect(parseNumericLiteral("00x01")).toBe(null);
    expect(parseNumericLiteral("01x01")).toBe(null);
    expect(parseNumericLiteral("1x01")).toBe(null);
    expect(parseNumericLiteral("1b01")).toBe(null);
    expect(parseNumericLiteral("2o01")).toBe(null);
    expect(parseNumericLiteral("00.1")).toBe(null);
  });

  it("refuses duplicate or odd letters", function() {
    expect(parseNumericLiteral("0c0")).toBe(null);
    expect(parseNumericLiteral("0b b0")).toBe(null);
    expect(parseNumericLiteral("0XX0")).toBe(null);
  });
  
  it("refuses unrecognised digits", function() {
    expect(parseNumericLiteral("0b1012")).toBe(null);
    expect(parseNumericLiteral("0O18")).toBe(null);
    expect(parseNumericLiteral("1O18")).toBe(null);
    expect(parseNumericLiteral("0x1g")).toBe(null);
    expect(parseNumericLiteral("1a.9")).toBe(null);
  });

  it("refuses odd decimals", function() {
    expect(parseNumericLiteral(".")).toBe(null);
    expect(parseNumericLiteral(".e7")).toBe(null);
    expect(parseNumericLiteral("1243..e-71")).toBe(null);
    expect(parseNumericLiteral("1243.1.e-71")).toBe(null);
  });

  it("works the rest of the time", function() {
    expect(parseNumericLiteral("0b1001")).toBe(0b1001);
    expect(parseNumericLiteral("0B0001001")).toBe(0B0001001);
    expect(parseNumericLiteral("0o777")).toBe(0o777);
    expect(parseNumericLiteral("0xabcde")).toBe(0xabcde);
    expect(parseNumericLiteral("123")).toBe(123);
    expect(parseNumericLiteral("123.456")).toBe(123.456);
    expect(parseNumericLiteral(".456")).toBe(.456);
    expect(parseNumericLiteral(".456e+789")).toBe(.456e+789);
    expect(parseNumericLiteral("123e+789")).toBe(123e+789);
    expect(parseNumericLiteral("123.456e+789")).toBe(123.456e+789);
  });
});
