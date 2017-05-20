"use strict";

// Sanity checked version
var getHexLiteral = function(x) {
  var result = require("./index.js")._getHexLiteral(x);
  if(result !== null) {
    expect(Object.is(eval(result), x)).toBe(true);
  }
  return result;
};

describe("_getHexLiteral", function() {
  it("refuses non-integers", function() {
    expect(getHexLiteral(0.14)).toBe(null);
    expect(getHexLiteral(Math.PI)).toBe(null);
    expect(getHexLiteral(17701.9)).toBe(null);
  });

  it("refuses numbers whose hex representation would be 22+ characters", function() {
    // There are no floats between these that I can find
    expect("0x" + 0xfffffffffffff800000.toString(16)).toBe("0xfffffffffffff800000"); // 21 chars
    expect(getHexLiteral(0xfffffffffffff800000)).toBe("0xfffffffffffff800000"); // 21 chars

    expect("0x" + 0x10000000000000000000.toString(16)).toBe("0x10000000000000000000"); // 22 chars
    expect(getHexLiteral(0x10000000000000000000)).toBe("0xfffffffffffffffffff"); // 21 chars still

    expect("0x" + 0x10000000000001000000.toString(16)).toBe("0x10000000000001000000"); // 22 chars
    expect(getHexLiteral(0x10000000000001000000)).toBe(null); // 21 chars still
    expect(getHexLiteral(0x10000000000003411142)).toBe(null);
  });

  it("returns the hexadecimal representation", function() {
    expect(getHexLiteral(0)).toBe("0x0");

    expect(getHexLiteral(1099511627774)).toBe("0xfffffffffe");
    expect(getHexLiteral(1099511627775)).toBe("0xffffffffff");
    expect(getHexLiteral(1099511627776)).toBe("0x10000000000");

    expect(getHexLiteral(17592186044414)).toBe("0xffffffffffe");
    expect(getHexLiteral(17592186044415)).toBe("0xfffffffffff");
    expect(getHexLiteral(17592186044416)).toBe("0x100000000000");

    expect(getHexLiteral(281474976710654)).toBe("0xfffffffffffe");
    expect(getHexLiteral(281474976710655)).toBe("0xffffffffffff");
    expect(getHexLiteral(281474976710656)).toBe("0x1000000000000");

    expect(getHexLiteral(4503599627370494)).toBe("0xffffffffffffe");
    expect(getHexLiteral(4503599627370495)).toBe("0xfffffffffffff");
    expect(getHexLiteral(4503599627370496)).toBe("0x10000000000000");

    // At this point the floats are spaced apart by 2, not 1.
    expect(getHexLiteral(9999999999999998)).toBe("0x2386f26fc0fffe");
    expect(getHexLiteral(9999999999999999)).toBe("0x2386f26fc10000");
    expect(getHexLiteral(10000000000000000)).toBe("0x2386f26fc10000");
    expect(getHexLiteral(10000000000000001)).toBe("0x2386f26fc10000");
    expect(getHexLiteral(10000000000000002)).toBe("0x2386f26fc10002");

    // Here the floats are spaced 8 apart.
    expect(getHexLiteral(72057594037927928)).toBe("0xfffffffffffff8");
    expect(getHexLiteral(72057594037927929)).toBe("0xfffffffffffff8");
    expect(getHexLiteral(72057594037927930)).toBe("0xfffffffffffff8");
    expect(getHexLiteral(72057594037927931)).toBe("0xfffffffffffff8");
    expect(getHexLiteral(72057594037927932)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927933)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927934)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927935)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927936)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927937)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927938)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927939)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927940)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927941)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927942)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927943)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927944)).toBe("0xffffffffffffff"); // not 0x100000000000000
    expect(getHexLiteral(72057594037927945)).toBe("0x100000000000010");
    expect(getHexLiteral(72057594037927946)).toBe("0x100000000000010");
    expect(getHexLiteral(72057594037927947)).toBe("0x100000000000010");
    expect(getHexLiteral(72057594037927948)).toBe("0x100000000000010");
    expect(getHexLiteral(72057594037927949)).toBe("0x100000000000010");
    expect(getHexLiteral(72057594037927950)).toBe("0x100000000000010");

    expect(getHexLiteral(100000000000000008)).toBe("0x16345785d8a0000");
    expect(getHexLiteral(100000000000000009)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000010)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000011)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000016)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000017)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000023)).toBe("0x16345785d8a0010");
    expect(getHexLiteral(100000000000000024)).toBe("0x16345785d8a0020");
  });

  it("returns all Fs where this saves a character", function() {
    expect(0xffffffffffffff).toBe(0x100000000000000);
    expect(getHexLiteral(0x100000000000000)).toBe("0xffffffffffffff");

    expect(0xfffffffffffffff).toBe(0x1000000000000000);
    expect(getHexLiteral(0x1000000000000000)).toBe("0xfffffffffffffff");

    expect(0xffffffffffffffff).toBe(0x10000000000000000);
    expect(getHexLiteral(0x10000000000000000)).toBe("0xffffffffffffffff");

    expect(0xfffffffffffffffff).toBe(0x100000000000000000);
    expect(getHexLiteral(0x100000000000000000)).toBe("0xfffffffffffffffff");

    expect(0xffffffffffffffffff).toBe(0x1000000000000000000);
    expect(getHexLiteral(0x1000000000000000000)).toBe("0xffffffffffffffffff");

    expect(0xfffffffffffffffffff).toBe(0x10000000000000000000);
    expect(getHexLiteral(0x10000000000000000000)).toBe("0xfffffffffffffffffff");

    expect(0xffffffffffffffffffff).toBe(0x100000000000000000000);
    expect(getHexLiteral(0x100000000000000000000)).toBe(null);
  });
});
