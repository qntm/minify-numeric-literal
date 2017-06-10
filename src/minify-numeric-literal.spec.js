"use strict";

var minifyNumericLiteral = require("./minify-numeric-literal.js");

describe("minify-numeric-literal", function() {
  describe("_toString", function() {
    var _toString = minifyNumericLiteral._toString;

    it("works", function () {
      expect(_toString(8)).toBe("8");
      expect(_toString(8.99)).toBe("8.99");
      expect(_toString(4e56)).toBe("4e+56");
      expect(_toString(0.0042)).toBe("0.0042");
    });

    it("method call context", function () {
      expect(_toString(8, true)).toBe("8.");
      expect(_toString(8.99, true)).toBe("8.99");
      expect(_toString(4e56, true)).toBe("4e+56");
      expect(_toString(0.0042, true)).toBe("0.0042");
    });
  });

  describe("_parseDecimalLiteral", function() {
    var _parseDecimalLiteral = minifyNumericLiteral._parseDecimalLiteral;

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

  describe("_decimalLiteral", function() {
    var _decimalLiteral = minifyNumericLiteral._decimalLiteral;

    // Sanity checked version
    var test = function(x, methodCallContext) {
      var result = _decimalLiteral(x, methodCallContext);
      expect(Object.is(eval(result), x)).toBe(true);
      return result;
    };

    it("returns the original number most of the time", function() {
      expect(test(0)).toBe("0");
      expect(test(1)).toBe("1");
      expect(test(2)).toBe("2");
      expect(test(16)).toBe("16");
    });

    it("suppresses 'e+' in favour of 'e'", function() {
      expect(test(1e34)).toBe("1e34");
      expect(test(1e+34)).toBe("1e34");
      expect(test(1e-34)).toBe("1e-34");
    });

    it("uses 'e' and 'e-' when appropriate", function() {
      expect(test(100)).toBe("100");
      expect(test(900)).toBe("900");
      expect(test(1000)).toBe("1e3");
      expect(test(9000)).toBe("9e3");
      expect(test(9100)).toBe("9100");
      expect(test(10000)).toBe("1e4");
      expect(test(56000)).toBe("56e3");
      expect(test(100000)).toBe("1e5");
      expect(test(145000)).toBe("145e3");
      expect(test(1.45e6)).toBe("145e4");
      expect(test(1450000)).toBe("145e4");
    });

    it("removes the decimal when possible", function() {
      expect(test(.7e8)).toBe("7e7");
      expect(test(1.476925632985436e10)).toBe("14769256329.85436");
      expect(test(1.476925632985436e19)).toBe("1476925632985436e4");
      expect(test(1.476925632985436e20)).toBe("1476925632985436e5");
      expect(test(1.476925632985436e84)).toBe("1476925632985436e69");
      expect(test(1.476925632985436e85)).toBe("1476925632985436e70");
      expect(test(1.476925632985436e86)).toBe("1476925632985436e71");
      expect(test(1.476925632985436e99)).toBe("1476925632985436e84");
      expect(test(1.476925632985436e100)).toBe("1476925632985436e85");
      expect(test(1.476925632985436e308)).toBe("1476925632985436e293");

      expect(test(6.736e109)).toBe("6736e106");
      expect(test(2.225073858507202e-308)).toBe("2225073858507202e-323");

      expect(test(.1476925632985436e-9)).toBe("1476925632985436e-25");
      expect(test(1.476925632985436e-10)).toBe("1476925632985436e-25");
      expect(test(1.476925632985436e-69)).toBe("1476925632985436e-84");
      expect(test(1.476925632985436e-84)).toBe("1476925632985436e-99");
      expect(test(1.476925632985436e-85)).toBe("1476925632985436e-100");
      expect(test(1.476925632985436e-86)).toBe("1476925632985436e-101");
      expect(test(1.476925632985436e-99)).toBe("1476925632985436e-114");
      expect(test(1.4e-99)).toBe("14e-100");
      expect(test(1.476925632985436e-100)).toBe("1476925632985436e-115");
      expect(test(1.476925632985436e-308)).toBe("1476925632985436e-323");
    });

    it("truncates the optional leading '0'", function() {
      expect(test(0.1)).toBe(".1");
      expect(test(0.7)).toBe(".7");
      expect(test(0.03476991)).toBe(".03476991");
    });

    it("removes the decimal for very small numbers when possible", function() {
      expect(test(0.07)).toBe(".07");
      expect(test(0.007)).toBe(".007");
      expect(test(0.0007)).toBe("7e-4");
      expect(test(0.000783)).toBe("783e-6");
      expect(test(0.7e-8)).toBe("7e-9");
    });

    describe("method call context", function() {
      it("works", function() {
        expect(test(434e-1, true)).toBe("43.4");
        expect(test(434, true)).toBe("434.");
        expect(test(4340, true)).toBe("4340.");
        expect(test(43400, true)).toBe("434e2");
        expect(test(434000, true)).toBe("434e3");
        expect(test(434e15, true)).toBe("434e15");
      });
    });
  });

  describe("_hexLiteral", function() {
    var _hexLiteral = minifyNumericLiteral._hexLiteral;

    // Sanity checked version
    var test = function(x) {
      var result = minifyNumericLiteral._hexLiteral(x);
      if(result !== null) {
        expect(Object.is(eval(result), x)).toBe(true);
      }
      return result;
    };

    it("refuses non-integers", function() {
      expect(test(0.14)).toBe(null);
      expect(test(Math.PI)).toBe(null);
      expect(test(17701.9)).toBe(null);
    });

    it("refuses numbers whose hex representation would be 22+ characters", function() {
      // There are no floats between these that I can find
      expect("0x" + 0xfffffffffffff800000.toString(16)).toBe("0xfffffffffffff800000"); // 21 chars
      expect(test(0xfffffffffffff800000)).toBe("0xfffffffffffff800000"); // 21 chars

      expect("0x" + 0x10000000000000000000.toString(16)).toBe("0x10000000000000000000"); // 22 chars
      expect(test(0x10000000000000000000)).toBe("0xfffffffffffffffffff"); // 21 chars still

      expect("0x" + 0x10000000000001000000.toString(16)).toBe("0x10000000000001000000"); // 22 chars
      expect(test(0x10000000000001000000)).toBe(null); // 21 chars still
      expect(test(0x10000000000003411142)).toBe(null);
    });

    it("returns the hexadecimal representation", function() {
      expect(test(0)).toBe("0x0");

      expect(test(1099511627774)).toBe("0xfffffffffe");
      expect(test(1099511627775)).toBe("0xffffffffff");
      expect(test(1099511627776)).toBe("0x10000000000");

      expect(test(17592186044414)).toBe("0xffffffffffe");
      expect(test(17592186044415)).toBe("0xfffffffffff");
      expect(test(17592186044416)).toBe("0x100000000000");

      expect(test(281474976710654)).toBe("0xfffffffffffe");
      expect(test(281474976710655)).toBe("0xffffffffffff");
      expect(test(281474976710656)).toBe("0x1000000000000");

      expect(test(4503599627370494)).toBe("0xffffffffffffe");
      expect(test(4503599627370495)).toBe("0xfffffffffffff");
      expect(test(4503599627370496)).toBe("0x10000000000000");

      // At this point the floats are spaced apart by 2, not 1.
      expect(test(9999999999999998)).toBe("0x2386f26fc0fffe");
      expect(test(9999999999999999)).toBe("0x2386f26fc10000");
      expect(test(10000000000000000)).toBe("0x2386f26fc10000");
      expect(test(10000000000000001)).toBe("0x2386f26fc10000");
      expect(test(10000000000000002)).toBe("0x2386f26fc10002");

      // Here the floats are spaced 8 apart.
      expect(test(72057594037927928)).toBe("0xfffffffffffff8");
      expect(test(72057594037927929)).toBe("0xfffffffffffff8");
      expect(test(72057594037927930)).toBe("0xfffffffffffff8");
      expect(test(72057594037927931)).toBe("0xfffffffffffff8");
      expect(test(72057594037927932)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927933)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927934)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927935)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927936)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927937)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927938)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927939)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927940)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927941)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927942)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927943)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927944)).toBe("0xffffffffffffff"); // not 0x100000000000000
      expect(test(72057594037927945)).toBe("0x100000000000010");
      expect(test(72057594037927946)).toBe("0x100000000000010");
      expect(test(72057594037927947)).toBe("0x100000000000010");
      expect(test(72057594037927948)).toBe("0x100000000000010");
      expect(test(72057594037927949)).toBe("0x100000000000010");
      expect(test(72057594037927950)).toBe("0x100000000000010");

      expect(test(100000000000000008)).toBe("0x16345785d8a0000");
      expect(test(100000000000000009)).toBe("0x16345785d8a0010");
      expect(test(100000000000000010)).toBe("0x16345785d8a0010");
      expect(test(100000000000000011)).toBe("0x16345785d8a0010");
      expect(test(100000000000000016)).toBe("0x16345785d8a0010");
      expect(test(100000000000000017)).toBe("0x16345785d8a0010");
      expect(test(100000000000000023)).toBe("0x16345785d8a0010");
      expect(test(100000000000000024)).toBe("0x16345785d8a0020");
    });

    it("returns all Fs where this saves a character", function() {
      expect(0xffffffffffffff).toBe(0x100000000000000);
      expect(test(0x100000000000000)).toBe("0xffffffffffffff");

      expect(0xfffffffffffffff).toBe(0x1000000000000000);
      expect(test(0x1000000000000000)).toBe("0xfffffffffffffff");

      expect(0xffffffffffffffff).toBe(0x10000000000000000);
      expect(test(0x10000000000000000)).toBe("0xffffffffffffffff");

      expect(0xfffffffffffffffff).toBe(0x100000000000000000);
      expect(test(0x100000000000000000)).toBe("0xfffffffffffffffff");

      expect(0xffffffffffffffffff).toBe(0x1000000000000000000);
      expect(test(0x1000000000000000000)).toBe("0xffffffffffffffffff");

      expect(0xfffffffffffffffffff).toBe(0x10000000000000000000);
      expect(test(0x10000000000000000000)).toBe("0xfffffffffffffffffff");

      expect(0xffffffffffffffffffff).toBe(0x100000000000000000000);
      expect(test(0x100000000000000000000)).toBe(null);
    });
  });

  describe("fromNumber", function() {
    var fromNumber = minifyNumericLiteral.fromNumber;

    // Wrap every call in this test
    var test = function(x, methodCallContext) {
      var result = fromNumber(x, methodCallContext);
      if(result !== null) {
        expect(Object.is(x, eval(result))).toBe(true);
      }
      return result;
    };

    it("returns the original number most of the time", function() {
      expect(test(0)).toBe("0");
      expect(test(1)).toBe("1");
      expect(test(2)).toBe("2");
      expect(test(16)).toBe("16");
    });

    it("suppresses 'e+' in favour of 'e'", function() {
      expect(test(1e34)).toBe("1e34");
    });

    it("returns the hexadecimal representation when appropriate", function() {
      expect(test(0)).toBe("0");
      expect(test(999999999999)).toBe("999999999999");
      expect(test(1000000000000)).toBe("1e12");
      expect(test(1099511627775)).toBe("0xffffffffff");
      expect(test(1099511627776)).toBe("1099511627776");
      expect(test(9999999999999)).toBe("9999999999999");
      expect(test(10000000000000)).toBe("1e13");
      expect(test(17592186044415)).toBe("0xfffffffffff");
      expect(test(17592186044416)).toBe("17592186044416");
      expect(test(99999999999999)).toBe("99999999999999");
      expect(test(100000000000000)).toBe("1e14");
      expect(test(281474976710655)).toBe("0xffffffffffff");
      expect(test(281474976710656)).toBe("281474976710656");
      expect(test(999999999999999)).toBe("999999999999999");
      expect(test(1000000000000000)).toBe("1e15");
      expect(test(4503599627370495)).toBe("0xfffffffffffff");
      expect(test(4503599627370496)).toBe("4503599627370496");
      expect(test(9999999999999998)).toBe("9999999999999998");
      expect(test(9999999999999999)).toBe("1e16");
      expect(test(10000000000000000)).toBe("1e16");
      expect(test(10000000000000001)).toBe("1e16");
      expect(test(10000000000000002)).toBe("0x2386f26fc10002");
      expect(test(72057594037927928)).toBe("0xfffffffffffff8");
      expect(test(72057594037927929)).toBe("0xfffffffffffff8");
      expect(test(72057594037927930)).toBe("0xfffffffffffff8");
      expect(test(72057594037927931)).toBe("0xfffffffffffff8");
      expect(test(72057594037927932)).toBe("0xffffffffffffff");
      expect(test(72057594037927933)).toBe("0xffffffffffffff");
      expect(test(72057594037927934)).toBe("0xffffffffffffff");
      expect(test(72057594037927935)).toBe("0xffffffffffffff");
      expect(test(72057594037927936)).toBe("0xffffffffffffff");
      expect(test(72057594037927937)).toBe("0xffffffffffffff");
      expect(test(72057594037927938)).toBe("0xffffffffffffff");
      expect(test(72057594037927939)).toBe("0xffffffffffffff");
      expect(test(72057594037927940)).toBe("0xffffffffffffff");
      expect(test(72057594037927941)).toBe("0xffffffffffffff");
      expect(test(72057594037927942)).toBe("0xffffffffffffff");
      expect(test(72057594037927943)).toBe("0xffffffffffffff");
      expect(test(72057594037927944)).toBe("0xffffffffffffff");
      expect(test(72057594037927945)).toBe("72057594037927950");
      expect(test(72057594037927946)).toBe("72057594037927950");
      expect(test(72057594037927947)).toBe("72057594037927950");
      expect(test(72057594037927948)).toBe("72057594037927950");
      expect(test(72057594037927949)).toBe("72057594037927950");
      expect(test(72057594037927950)).toBe("72057594037927950");
      expect(test(99999999999999980)).toBe("99999999999999980");
      expect(test(99999999999999981)).toBe("99999999999999980");
      expect(test(99999999999999991)).toBe("99999999999999980");
      expect(test(99999999999999992)).toBe("1e17");
      expect(test(99999999999999993)).toBe("1e17");
      expect(test(99999999999999999)).toBe("1e17");
      expect(test(100000000000000000)).toBe("1e17");
      expect(test(100000000000000001)).toBe("1e17");
      expect(test(100000000000000008)).toBe("1e17");
      expect(test(100000000000000009)).toBe("0x16345785d8a0010");
      expect(test(100000000000000010)).toBe("0x16345785d8a0010");
      expect(test(100000000000000011)).toBe("0x16345785d8a0010");
      expect(test(100000000000000016)).toBe("0x16345785d8a0010");
      expect(test(100000000000000000000)).toBe("1e20")
      expect(test(999999999999999000000)).toBe("999999999999999e6")
      expect(test(999999999999999900000)).toBe("9999999999999999e5")
      expect(test(999999999999999934463)).toBe("9999999999999999e5")
      expect(test(999999999999999934464)).toBe("1e21")
    });

    it("uses 'e' and 'e-' when appropriate", function() {
      expect(test(100)).toBe("100");
      expect(test(900)).toBe("900");
      expect(test(1000)).toBe("1e3");
      expect(test(9000)).toBe("9e3");
      expect(test(9100)).toBe("9100");
      expect(test(10000)).toBe("1e4");
      expect(test(56000)).toBe("56e3");
      expect(test(100000)).toBe("1e5");
      expect(test(145000)).toBe("145e3");
      expect(test(1.45e6)).toBe("145e4");
      expect(test(1450000)).toBe("145e4");
    });

    it("removes the decimal when possible", function() {
      expect(test(0.7e8)).toBe("7e7");
      expect(test(1.476925632985436e+10)).toBe("14769256329.85436");
      expect(test(1.476925632985436e+20)).toBe("1476925632985436e5");
      expect(test(1.476925632985436e+84)).toBe("1476925632985436e69");
      expect(test(1.476925632985436e+85)).toBe("1476925632985436e70");
      expect(test(1.476925632985436e+86)).toBe("1476925632985436e71");
      expect(test(1.476925632985436e+99)).toBe("1476925632985436e84");
      expect(test(1.476925632985436e+100)).toBe("1476925632985436e85");
      expect(test(1.476925632985436e+308)).toBe("1476925632985436e293");

      expect(test(6.736e109)).toBe("6736e106");
      expect(test(2.225073858507202e-308)).toBe("2225073858507202e-323");

      expect(test(1.476925632985436e-10)).toBe("1476925632985436e-25");
      expect(test(1.476925632985436e-69)).toBe("1476925632985436e-84");
      expect(test(1.476925632985436e-84)).toBe("1476925632985436e-99");
      expect(test(1.476925632985436e-85)).toBe("1.476925632985436e-85"); // Saves nothing here...
      expect(test(1.476925632985436e-86)).toBe("1.476925632985436e-86"); // And here
      expect(test(1.476925632985436e-99)).toBe("1.476925632985436e-99"); // And here
      expect(test(1.4e-99)).toBe("1.4e-99"); // And here
      expect(test(1.476925632985436e-100)).toBe("1476925632985436e-115");
      expect(test(1.476925632985436e-308)).toBe("1476925632985436e-323");
    });

    it("truncates the optional leading '0'", function() {
      expect(test(0.1)).toBe(".1");
      expect(test(0.7)).toBe(".7");
      expect(test(0.03476991)).toBe(".03476991");
    });

    it("removes the decimal for very small numbers when possible", function() {
      expect(test(0.007)).toBe(".007");
      expect(test(0.0007)).toBe("7e-4");
      expect(test(0.000783)).toBe("783e-6");
      expect(test(0.7e-8)).toBe("7e-9");
    });

    it("returns a representation of `Infinity`", function() {
      expect(test(Infinity)).toBe("2e308");
    });

    it("refuses some numbers", function() {
      expect(test(-244)).toBe(null);
      expect(test(-0)).toBe(null);
      expect(test(-Infinity)).toBe(null);
      expect(test(NaN)).toBe(null);
      expect(test("abc")).toBe(null);
    });

    describe("method call context", function() {
      it("works", function() {
        expect(test(434e-1, true)).toBe("43.4");
        expect(test(434, true)).toBe("434.");
        expect(test(4340, true)).toBe("4340.");
        expect(test(43400, true)).toBe("434e2");
        expect(test(434000, true)).toBe("434e3");
        expect(test(434e15, true)).toBe("434e15");
      });
    });
  });

  describe("parse-numeric-literal", function() {
    var _parseNumericLiteral = minifyNumericLiteral._parseNumericLiteral;

    it("refuses some invalid inputs", function() {
      expect(_parseNumericLiteral("-244")).toBe(null);
      expect(_parseNumericLiteral("-0")).toBe(null);
      expect(_parseNumericLiteral("Infinity")).toBe(null);
      expect(_parseNumericLiteral("-Infinity")).toBe(null);
      expect(_parseNumericLiteral("NaN")).toBe(null);
    });

    it("refuses leading or trailing whitespace", function() {
      expect(_parseNumericLiteral(" 0b101")).toBe(null);
      expect(_parseNumericLiteral("0b101 ")).toBe(null);
      expect(_parseNumericLiteral(" 0B101 ")).toBe(null);
      expect(_parseNumericLiteral("0o ")).toBe(null);
      expect(_parseNumericLiteral("0o0 ")).toBe(null);
      expect(_parseNumericLiteral(" 0o0 ")).toBe(null);
      expect(_parseNumericLiteral(" 0O1 ")).toBe(null);
      expect(_parseNumericLiteral(" 0o0")).toBe(null);
      expect(_parseNumericLiteral("0x1 ")).toBe(null);
      expect(_parseNumericLiteral(" 0x1")).toBe(null);
      expect(_parseNumericLiteral(" 0X1")).toBe(null);
      expect(_parseNumericLiteral(" 7")).toBe(null);
      expect(_parseNumericLiteral("89.1 ")).toBe(null);
      expect(_parseNumericLiteral(" 0 ")).toBe(null);
    });

    it("refuses a leading 0-something with no digits", function() {
      expect(_parseNumericLiteral("0b")).toBe(null);
      expect(_parseNumericLiteral("0B")).toBe(null);
      expect(_parseNumericLiteral("0o")).toBe(null);
      expect(_parseNumericLiteral("0O")).toBe(null);
      expect(_parseNumericLiteral("0x")).toBe(null);
      expect(_parseNumericLiteral("0X")).toBe(null);
    });

    it("refuses leading zero with extras", function() {
      expect(_parseNumericLiteral("00B101")).toBe(null);
      expect(_parseNumericLiteral("00o18")).toBe(null);
      expect(_parseNumericLiteral("00x01")).toBe(null);
      expect(_parseNumericLiteral("01x01")).toBe(null);
      expect(_parseNumericLiteral("1x01")).toBe(null);
      expect(_parseNumericLiteral("1b01")).toBe(null);
      expect(_parseNumericLiteral("2o01")).toBe(null);
      expect(_parseNumericLiteral("00.1")).toBe(null);
    });

    it("refuses duplicate or odd letters", function() {
      expect(_parseNumericLiteral("0c0")).toBe(null);
      expect(_parseNumericLiteral("0b b0")).toBe(null);
      expect(_parseNumericLiteral("0XX0")).toBe(null);
    });
    
    it("refuses unrecognised digits", function() {
      expect(_parseNumericLiteral("0b1012")).toBe(null);
      expect(_parseNumericLiteral("0O18")).toBe(null);
      expect(_parseNumericLiteral("1O18")).toBe(null);
      expect(_parseNumericLiteral("0x1g")).toBe(null);
      expect(_parseNumericLiteral("1a.9")).toBe(null);
    });

    it("refuses odd decimals", function() {
      expect(_parseNumericLiteral(".")).toBe(null);
      expect(_parseNumericLiteral(".e7")).toBe(null);
      expect(_parseNumericLiteral("1243..e-71")).toBe(null);
      expect(_parseNumericLiteral("1243.1.e-71")).toBe(null);
    });

    it("works the rest of the time", function() {
      expect(_parseNumericLiteral("0b1001")).toBe(0b1001);
      expect(_parseNumericLiteral("0B0001001")).toBe(0B0001001);
      expect(_parseNumericLiteral("0o777")).toBe(0o777);
      expect(_parseNumericLiteral("0xabcde")).toBe(0xabcde);
      expect(_parseNumericLiteral("123")).toBe(123);
      expect(_parseNumericLiteral("123.456")).toBe(123.456);
      expect(_parseNumericLiteral(".456")).toBe(.456);
      expect(_parseNumericLiteral(".456e+789")).toBe(.456e+789);
      expect(_parseNumericLiteral("123e+789")).toBe(123e+789);
      expect(_parseNumericLiteral("123.456e+789")).toBe(123.456e+789);
    });
  });

  describe("[[call]]", function() {
    // Wrap every test in this test
    var test = function(str, methodCallContext) {
      var result = minifyNumericLiteral(str, methodCallContext);
      if(result !== null) {
        expect(Object.is(eval(str), eval(result))).toBe(true);
      }
      return result;
    };

    it("returns the original number most of the time", function() {
      expect(test("0")).toBe("0");
      expect(test("1")).toBe("1");
      expect(test("2")).toBe("2");
      expect(test("16")).toBe("16");
    });

    it("suppresses 'e+' in favour of 'e'", function() {
      expect(test("1e34")).toBe("1e34");
    });

    it("returns the hexadecimal representation when appropriate", function() {
      expect(test("0")).toBe("0");
      expect(test("999999999999")).toBe("999999999999");
      expect(test("1000000000000")).toBe("1e12");
      expect(test("1099511627775")).toBe("0xffffffffff");
      expect(test("1099511627776")).toBe("1099511627776");
      expect(test("9999999999999")).toBe("9999999999999");
      expect(test("10000000000000")).toBe("1e13");
      expect(test("17592186044415")).toBe("0xfffffffffff");
      expect(test("17592186044416")).toBe("17592186044416");
      expect(test("99999999999999")).toBe("99999999999999");
      expect(test("100000000000000")).toBe("1e14");
      expect(test("281474976710655")).toBe("0xffffffffffff");
      expect(test("281474976710656")).toBe("281474976710656");
      expect(test("999999999999999")).toBe("999999999999999");
      expect(test("1000000000000000")).toBe("1e15");
      expect(test("4503599627370495")).toBe("0xfffffffffffff");
      expect(test("4503599627370496")).toBe("4503599627370496");
      expect(test("9999999999999998")).toBe("9999999999999998");
      expect(test("9999999999999999")).toBe("1e16");
      expect(test("10000000000000000")).toBe("1e16");
      expect(test("10000000000000001")).toBe("1e16");
      expect(test("10000000000000002")).toBe("0x2386f26fc10002");
      expect(test("72057594037927928")).toBe("0xfffffffffffff8");
      expect(test("72057594037927929")).toBe("0xfffffffffffff8");
      expect(test("72057594037927930")).toBe("0xfffffffffffff8");
      expect(test("72057594037927931")).toBe("0xfffffffffffff8");
      expect(test("72057594037927932")).toBe("0xffffffffffffff");
      expect(test("72057594037927933")).toBe("0xffffffffffffff");
      expect(test("72057594037927934")).toBe("0xffffffffffffff");
      expect(test("72057594037927935")).toBe("0xffffffffffffff");
      expect(test("72057594037927936")).toBe("0xffffffffffffff");
      expect(test("72057594037927937")).toBe("0xffffffffffffff");
      expect(test("72057594037927938")).toBe("0xffffffffffffff");
      expect(test("72057594037927939")).toBe("0xffffffffffffff");
      expect(test("72057594037927940")).toBe("0xffffffffffffff");
      expect(test("72057594037927941")).toBe("0xffffffffffffff");
      expect(test("72057594037927942")).toBe("0xffffffffffffff");
      expect(test("72057594037927943")).toBe("0xffffffffffffff");
      expect(test("72057594037927944")).toBe("0xffffffffffffff");
      expect(test("72057594037927945")).toBe("72057594037927950");
      expect(test("72057594037927946")).toBe("72057594037927950");
      expect(test("72057594037927947")).toBe("72057594037927950");
      expect(test("72057594037927948")).toBe("72057594037927950");
      expect(test("72057594037927949")).toBe("72057594037927950");
      expect(test("72057594037927950")).toBe("72057594037927950");
      expect(test("99999999999999980")).toBe("99999999999999980");
      expect(test("99999999999999981")).toBe("99999999999999980");
      expect(test("99999999999999991")).toBe("99999999999999980");
      expect(test("99999999999999992")).toBe("1e17");
      expect(test("99999999999999993")).toBe("1e17");
      expect(test("99999999999999999")).toBe("1e17");
      expect(test("100000000000000000")).toBe("1e17");
      expect(test("100000000000000001")).toBe("1e17");
      expect(test("100000000000000008")).toBe("1e17");
      expect(test("100000000000000009")).toBe("0x16345785d8a0010");
      expect(test("100000000000000010")).toBe("0x16345785d8a0010");
      expect(test("100000000000000011")).toBe("0x16345785d8a0010");
      expect(test("100000000000000016")).toBe("0x16345785d8a0010");
      expect(test("100000000000000000000")).toBe("1e20")
      expect(test("999999999999999000000")).toBe("999999999999999e6")
      expect(test("999999999999999900000")).toBe("9999999999999999e5")
      expect(test("999999999999999934463")).toBe("9999999999999999e5")
      expect(test("999999999999999934464")).toBe("1e21")
    });

    it("uses 'e' and 'e-' when appropriate", function() {
      expect(test("100")).toBe("100");
      expect(test("900")).toBe("900");
      expect(test("1000")).toBe("1e3");
      expect(test("9000")).toBe("9e3");
      expect(test("9100")).toBe("9100");
      expect(test("10000")).toBe("1e4");
      expect(test("56000")).toBe("56e3");
      expect(test("100000")).toBe("1e5");
      expect(test("145000")).toBe("145e3");
      expect(test("1.45e6")).toBe("145e4");
      expect(test("1450000")).toBe("145e4");
    });

    it("removes the decimal when possible", function() {
      expect(test("0.7e8")).toBe("7e7");
      expect(test("1.476925632985436e+10")).toBe("14769256329.85436");
      expect(test("1.476925632985436e+20")).toBe("1476925632985436e5");
      expect(test("1.476925632985436e+84")).toBe("1476925632985436e69");
      expect(test("1.476925632985436e+85")).toBe("1476925632985436e70");
      expect(test("1.476925632985436e+86")).toBe("1476925632985436e71");
      expect(test("1.476925632985436e+99")).toBe("1476925632985436e84");
      expect(test("1.476925632985436e+100")).toBe("1476925632985436e85");
      expect(test("1.476925632985436e+308")).toBe("1476925632985436e293");

      expect(test("6.736e109")).toBe("6736e106");
      expect(test("2.225073858507202e-308")).toBe("2225073858507202e-323");

      expect(test("1.476925632985436e-10")).toBe("1476925632985436e-25");
      expect(test("1.476925632985436e-69")).toBe("1476925632985436e-84");
      expect(test("1.476925632985436e-84")).toBe("1476925632985436e-99");
      expect(test("1.476925632985436e-85")).toBe("1.476925632985436e-85"); // Saves nothing here...
      expect(test("1.476925632985436e-86")).toBe("1.476925632985436e-86"); // And here
      expect(test("1.476925632985436e-99")).toBe("1.476925632985436e-99"); // And here
      expect(test("1.4e-99")).toBe("1.4e-99"); // And here
      expect(test("1.476925632985436e-100")).toBe("1476925632985436e-115");
      expect(test("1.476925632985436e-308")).toBe("1476925632985436e-323");
      expect(test("2.2250738585072036e-208")).toBe("22250738585072036e-224");
    });

    it("truncates the optional leading '0'", function() {
      expect(test("0.1")).toBe(".1");
      expect(test("0.7")).toBe(".7");
      expect(test("0.03476991")).toBe(".03476991");
    });

    it("removes the decimal for very small numbers when possible", function() {
      expect(test("0.007")).toBe(".007");
      expect(test("0.0007")).toBe("7e-4");
      expect(test("0.000783")).toBe("783e-6");
      expect(test("0.7e-8")).toBe("7e-9");
    });

    it("refuses some invalid inputs", function() {
      expect(test("-244")).toBe(null);
      expect(test("-0")).toBe(null);
      expect(test("Infinity")).toBe(null);
      expect(test("-Infinity")).toBe(null);
      expect(test("NaN")).toBe(null);
      expect(test(371000)).toBe(null);
    });

    describe("method test context", function() {
      it("works", function() {
        expect(test("434e-1", true)).toBe("43.4");
        expect(test("434", true)).toBe("434.");
        expect(test("4340", true)).toBe("4340.");
        expect(test("43400", true)).toBe("434e2");
        expect(test("434000", true)).toBe("434e3");
        expect(test("434e15", true)).toBe("434e15");
      });
    });
  });
});
