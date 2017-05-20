"use strict";

// Wrap every call in this test
var fromNumber = function(x) {
  var result = require("./index.js").fromNumber(x);
  if(result !== null) {
    expect(Object.is(x, eval(result))).toBe(true);
  }
  return result;
};

describe("fromNumber", function() {
  it("returns the original number most of the time", function() {
    expect(fromNumber(0)).toBe("0");
    expect(fromNumber(1)).toBe("1");
    expect(fromNumber(2)).toBe("2");
    expect(fromNumber(16)).toBe("16");
  });

  it("suppresses 'e+' in favour of 'e'", function() {
    expect(fromNumber(1e34)).toBe("1e34");
  });

  it("returns the hexadecimal representation when appropriate", function() {
    expect(fromNumber(0)).toBe("0");
    expect(fromNumber(999999999999)).toBe("999999999999");
    expect(fromNumber(1000000000000)).toBe("1e12");
    expect(fromNumber(1099511627775)).toBe("0xffffffffff");
    expect(fromNumber(1099511627776)).toBe("1099511627776");
    expect(fromNumber(9999999999999)).toBe("9999999999999");
    expect(fromNumber(10000000000000)).toBe("1e13");
    expect(fromNumber(17592186044415)).toBe("0xfffffffffff");
    expect(fromNumber(17592186044416)).toBe("17592186044416");
    expect(fromNumber(99999999999999)).toBe("99999999999999");
    expect(fromNumber(100000000000000)).toBe("1e14");
    expect(fromNumber(281474976710655)).toBe("0xffffffffffff");
    expect(fromNumber(281474976710656)).toBe("281474976710656");
    expect(fromNumber(999999999999999)).toBe("999999999999999");
    expect(fromNumber(1000000000000000)).toBe("1e15");
    expect(fromNumber(4503599627370495)).toBe("0xfffffffffffff");
    expect(fromNumber(4503599627370496)).toBe("4503599627370496");
    expect(fromNumber(9999999999999998)).toBe("9999999999999998");
    expect(fromNumber(9999999999999999)).toBe("1e16");
    expect(fromNumber(10000000000000000)).toBe("1e16");
    expect(fromNumber(10000000000000001)).toBe("1e16");
    expect(fromNumber(10000000000000002)).toBe("0x2386f26fc10002");
    expect(fromNumber(72057594037927928)).toBe("0xfffffffffffff8");
    expect(fromNumber(72057594037927929)).toBe("0xfffffffffffff8");
    expect(fromNumber(72057594037927930)).toBe("0xfffffffffffff8");
    expect(fromNumber(72057594037927931)).toBe("0xfffffffffffff8");
    expect(fromNumber(72057594037927932)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927933)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927934)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927935)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927936)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927937)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927938)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927939)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927940)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927941)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927942)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927943)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927944)).toBe("0xffffffffffffff");
    expect(fromNumber(72057594037927945)).toBe("72057594037927950");
    expect(fromNumber(72057594037927946)).toBe("72057594037927950");
    expect(fromNumber(72057594037927947)).toBe("72057594037927950");
    expect(fromNumber(72057594037927948)).toBe("72057594037927950");
    expect(fromNumber(72057594037927949)).toBe("72057594037927950");
    expect(fromNumber(72057594037927950)).toBe("72057594037927950");
    expect(fromNumber(99999999999999980)).toBe("99999999999999980");
    expect(fromNumber(99999999999999981)).toBe("99999999999999980");
    expect(fromNumber(99999999999999991)).toBe("99999999999999980");
    expect(fromNumber(99999999999999992)).toBe("1e17");
    expect(fromNumber(99999999999999993)).toBe("1e17");
    expect(fromNumber(99999999999999999)).toBe("1e17");
    expect(fromNumber(100000000000000000)).toBe("1e17");
    expect(fromNumber(100000000000000001)).toBe("1e17");
    expect(fromNumber(100000000000000008)).toBe("1e17");
    expect(fromNumber(100000000000000009)).toBe("0x16345785d8a0010");
    expect(fromNumber(100000000000000010)).toBe("0x16345785d8a0010");
    expect(fromNumber(100000000000000011)).toBe("0x16345785d8a0010");
    expect(fromNumber(100000000000000016)).toBe("0x16345785d8a0010");
    expect(fromNumber(100000000000000000000)).toBe("1e20")
    expect(fromNumber(999999999999999000000)).toBe("999999999999999e6")
    expect(fromNumber(999999999999999900000)).toBe("9999999999999999e5")
    expect(fromNumber(999999999999999934463)).toBe("9999999999999999e5")
    expect(fromNumber(999999999999999934464)).toBe("1e21")
  });

  it("uses 'e' and 'e-' when appropriate", function() {
    expect(fromNumber(100)).toBe("100");
    expect(fromNumber(900)).toBe("900");
    expect(fromNumber(1000)).toBe("1e3");
    expect(fromNumber(9000)).toBe("9e3");
    expect(fromNumber(9100)).toBe("9100");
    expect(fromNumber(10000)).toBe("1e4");
    expect(fromNumber(56000)).toBe("56e3");
    expect(fromNumber(100000)).toBe("1e5");
    expect(fromNumber(145000)).toBe("145e3");
    expect(fromNumber(1.45e6)).toBe("145e4");
    expect(fromNumber(1450000)).toBe("145e4");
  });

  it("removes the decimal when possible", function() {
    expect(fromNumber(0.7e8)).toBe("7e7");
    expect(fromNumber(1.476925632985436e+10)).toBe("14769256329.85436");
    expect(fromNumber(1.476925632985436e+20)).toBe("1476925632985436e5");
    expect(fromNumber(1.476925632985436e+84)).toBe("1476925632985436e69");
    expect(fromNumber(1.476925632985436e+85)).toBe("1476925632985436e70");
    expect(fromNumber(1.476925632985436e+86)).toBe("1476925632985436e71");
    expect(fromNumber(1.476925632985436e+99)).toBe("1476925632985436e84");
    expect(fromNumber(1.476925632985436e+100)).toBe("1476925632985436e85");
    expect(fromNumber(1.476925632985436e+308)).toBe("1476925632985436e293");

    expect(fromNumber(6.736e109)).toBe("6736e106");
    expect(fromNumber(2.225073858507202e-308)).toBe("2225073858507202e-323");

    expect(fromNumber(1.476925632985436e-10)).toBe("1476925632985436e-25");
    expect(fromNumber(1.476925632985436e-69)).toBe("1476925632985436e-84");
    expect(fromNumber(1.476925632985436e-84)).toBe("1476925632985436e-99");
    expect(fromNumber(1.476925632985436e-85)).toBe("1.476925632985436e-85"); // Saves nothing here...
    expect(fromNumber(1.476925632985436e-86)).toBe("1.476925632985436e-86"); // And here
    expect(fromNumber(1.476925632985436e-99)).toBe("1.476925632985436e-99"); // And here
    expect(fromNumber(1.4e-99)).toBe("1.4e-99"); // And here
    expect(fromNumber(1.476925632985436e-100)).toBe("1476925632985436e-115");
    expect(fromNumber(1.476925632985436e-308)).toBe("1476925632985436e-323");
  });

  it("truncates the optional leading '0'", function() {
    expect(fromNumber(0.1)).toBe(".1");
    expect(fromNumber(0.7)).toBe(".7");
    expect(fromNumber(0.03476991)).toBe(".03476991");
  });

  it("removes the decimal for very small numbers when possible", function() {
    expect(fromNumber(0.007)).toBe(".007");
    expect(fromNumber(0.0007)).toBe("7e-4");
    expect(fromNumber(0.000783)).toBe("783e-6");
    expect(fromNumber(0.7e-8)).toBe("7e-9");
  });

  it("returns a representation of `Infinity`", function() {
    expect(fromNumber(Infinity)).toBe("2e308");
  });

  it("refuses some numbers", function() {
    expect(fromNumber(-244)).toBe(null);
    expect(fromNumber(-0)).toBe(null);
    expect(fromNumber(-Infinity)).toBe(null);
    expect(fromNumber(NaN)).toBe(null);
    expect(fromNumber("abc")).toBe(null);
  });
});
