"use strict";

// Wrap every call in this test
var minifyNumericLiteral = function(str) {
  var result = require("./index.js")(str);
  if(result !== null) {
    expect(Object.is(eval(str), eval(result))).toBe(true);
  }
  return result;
};

describe("minify-numeric-literal", function() {
  it("returns the original number most of the time", function() {
    expect(minifyNumericLiteral("0")).toBe("0");
    expect(minifyNumericLiteral("1")).toBe("1");
    expect(minifyNumericLiteral("2")).toBe("2");
    expect(minifyNumericLiteral("16")).toBe("16");
  });

  it("suppresses 'e+' in favour of 'e'", function() {
    expect(minifyNumericLiteral("1e34")).toBe("1e34");
  });

  it("returns the hexadecimal representation when appropriate", function() {
    expect(minifyNumericLiteral("0")).toBe("0");
    expect(minifyNumericLiteral("999999999999")).toBe("999999999999");
    expect(minifyNumericLiteral("1000000000000")).toBe("1e12");
    expect(minifyNumericLiteral("1099511627775")).toBe("0xffffffffff");
    expect(minifyNumericLiteral("1099511627776")).toBe("1099511627776");
    expect(minifyNumericLiteral("9999999999999")).toBe("9999999999999");
    expect(minifyNumericLiteral("10000000000000")).toBe("1e13");
    expect(minifyNumericLiteral("17592186044415")).toBe("0xfffffffffff");
    expect(minifyNumericLiteral("17592186044416")).toBe("17592186044416");
    expect(minifyNumericLiteral("99999999999999")).toBe("99999999999999");
    expect(minifyNumericLiteral("100000000000000")).toBe("1e14");
    expect(minifyNumericLiteral("281474976710655")).toBe("0xffffffffffff");
    expect(minifyNumericLiteral("281474976710656")).toBe("281474976710656");
    expect(minifyNumericLiteral("999999999999999")).toBe("999999999999999");
    expect(minifyNumericLiteral("1000000000000000")).toBe("1e15");
    expect(minifyNumericLiteral("4503599627370495")).toBe("0xfffffffffffff");
    expect(minifyNumericLiteral("4503599627370496")).toBe("4503599627370496");
    expect(minifyNumericLiteral("9999999999999998")).toBe("9999999999999998");
    expect(minifyNumericLiteral("9999999999999999")).toBe("1e16");
    expect(minifyNumericLiteral("10000000000000000")).toBe("1e16");
    expect(minifyNumericLiteral("10000000000000001")).toBe("1e16");
    expect(minifyNumericLiteral("10000000000000002")).toBe("0x2386f26fc10002");
    expect(minifyNumericLiteral("72057594037927928")).toBe("0xfffffffffffff8");
    expect(minifyNumericLiteral("72057594037927929")).toBe("0xfffffffffffff8");
    expect(minifyNumericLiteral("72057594037927930")).toBe("0xfffffffffffff8");
    expect(minifyNumericLiteral("72057594037927931")).toBe("0xfffffffffffff8");
    expect(minifyNumericLiteral("72057594037927932")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927933")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927934")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927935")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927936")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927937")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927938")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927939")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927940")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927941")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927942")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927943")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927944")).toBe("0xffffffffffffff");
    expect(minifyNumericLiteral("72057594037927945")).toBe("72057594037927950");
    expect(minifyNumericLiteral("72057594037927946")).toBe("72057594037927950");
    expect(minifyNumericLiteral("72057594037927947")).toBe("72057594037927950");
    expect(minifyNumericLiteral("72057594037927948")).toBe("72057594037927950");
    expect(minifyNumericLiteral("72057594037927949")).toBe("72057594037927950");
    expect(minifyNumericLiteral("72057594037927950")).toBe("72057594037927950");
    expect(minifyNumericLiteral("99999999999999980")).toBe("99999999999999980");
    expect(minifyNumericLiteral("99999999999999981")).toBe("99999999999999980");
    expect(minifyNumericLiteral("99999999999999991")).toBe("99999999999999980");
    expect(minifyNumericLiteral("99999999999999992")).toBe("1e17");
    expect(minifyNumericLiteral("99999999999999993")).toBe("1e17");
    expect(minifyNumericLiteral("99999999999999999")).toBe("1e17");
    expect(minifyNumericLiteral("100000000000000000")).toBe("1e17");
    expect(minifyNumericLiteral("100000000000000001")).toBe("1e17");
    expect(minifyNumericLiteral("100000000000000008")).toBe("1e17");
    expect(minifyNumericLiteral("100000000000000009")).toBe("0x16345785d8a0010");
    expect(minifyNumericLiteral("100000000000000010")).toBe("0x16345785d8a0010");
    expect(minifyNumericLiteral("100000000000000011")).toBe("0x16345785d8a0010");
    expect(minifyNumericLiteral("100000000000000016")).toBe("0x16345785d8a0010");
    expect(minifyNumericLiteral("100000000000000000000")).toBe("1e20")
    expect(minifyNumericLiteral("999999999999999000000")).toBe("999999999999999e6")
    expect(minifyNumericLiteral("999999999999999900000")).toBe("9999999999999999e5")
    expect(minifyNumericLiteral("999999999999999934463")).toBe("9999999999999999e5")
    expect(minifyNumericLiteral("999999999999999934464")).toBe("1e21")
  });

  it("uses 'e' and 'e-' when appropriate", function() {
    expect(minifyNumericLiteral("100")).toBe("100");
    expect(minifyNumericLiteral("900")).toBe("900");
    expect(minifyNumericLiteral("1000")).toBe("1e3");
    expect(minifyNumericLiteral("9000")).toBe("9e3");
    expect(minifyNumericLiteral("9100")).toBe("9100");
    expect(minifyNumericLiteral("10000")).toBe("1e4");
    expect(minifyNumericLiteral("56000")).toBe("56e3");
    expect(minifyNumericLiteral("100000")).toBe("1e5");
    expect(minifyNumericLiteral("145000")).toBe("145e3");
    expect(minifyNumericLiteral("1.45e6")).toBe("145e4");
    expect(minifyNumericLiteral("1450000")).toBe("145e4");
  });

  it("removes the decimal when possible", function() {
    expect(minifyNumericLiteral("0.7e8")).toBe("7e7");
    expect(minifyNumericLiteral("1.476925632985436e+10")).toBe("14769256329.85436");
    expect(minifyNumericLiteral("1.476925632985436e+20")).toBe("1476925632985436e5");
    expect(minifyNumericLiteral("1.476925632985436e+84")).toBe("1476925632985436e69");
    expect(minifyNumericLiteral("1.476925632985436e+85")).toBe("1476925632985436e70");
    expect(minifyNumericLiteral("1.476925632985436e+86")).toBe("1476925632985436e71");
    expect(minifyNumericLiteral("1.476925632985436e+99")).toBe("1476925632985436e84");
    expect(minifyNumericLiteral("1.476925632985436e+100")).toBe("1476925632985436e85");
    expect(minifyNumericLiteral("1.476925632985436e+308")).toBe("1476925632985436e293");

    expect(minifyNumericLiteral("6.736e109")).toBe("6736e106");
    expect(minifyNumericLiteral("2.225073858507202e-308")).toBe("2225073858507202e-323");

    expect(minifyNumericLiteral("1.476925632985436e-10")).toBe("1476925632985436e-25");
    expect(minifyNumericLiteral("1.476925632985436e-69")).toBe("1476925632985436e-84");
    expect(minifyNumericLiteral("1.476925632985436e-84")).toBe("1476925632985436e-99");
    expect(minifyNumericLiteral("1.476925632985436e-85")).toBe("1.476925632985436e-85"); // Saves nothing here...
    expect(minifyNumericLiteral("1.476925632985436e-86")).toBe("1.476925632985436e-86"); // And here
    expect(minifyNumericLiteral("1.476925632985436e-99")).toBe("1.476925632985436e-99"); // And here
    expect(minifyNumericLiteral("1.4e-99")).toBe("1.4e-99"); // And here
    expect(minifyNumericLiteral("1.476925632985436e-100")).toBe("1476925632985436e-115");
    expect(minifyNumericLiteral("1.476925632985436e-308")).toBe("1476925632985436e-323");
  });

  it("truncates the optional leading '0'", function() {
    expect(minifyNumericLiteral("0.1")).toBe(".1");
    expect(minifyNumericLiteral("0.7")).toBe(".7");
    expect(minifyNumericLiteral("0.03476991")).toBe(".03476991");
  });

  it("removes the decimal for very small numbers when possible", function() {
    expect(minifyNumericLiteral("0.007")).toBe(".007");
    expect(minifyNumericLiteral("0.0007")).toBe("7e-4");
    expect(minifyNumericLiteral("0.000783")).toBe("783e-6");
    expect(minifyNumericLiteral("0.7e-8")).toBe("7e-9");
  });

  it("refuses some invalid inputs", function() {
    expect(minifyNumericLiteral("-244")).toBe(null);
    expect(minifyNumericLiteral("-0")).toBe(null);
    expect(minifyNumericLiteral("Infinity")).toBe(null);
    expect(minifyNumericLiteral("-Infinity")).toBe(null);
    expect(minifyNumericLiteral("NaN")).toBe(null);
    expect(minifyNumericLiteral(371000)).toBe(null);
  });

});
