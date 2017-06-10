"use strict";

var minifyNumericLiteral = require("./index.js");

var _stringifyDecimalLiteral = minifyNumericLiteral._stringifyDecimalLiteral;

describe("_stringifyDecimalLiteral", function() {
  it("Exponent -200", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -200})).toBe("8e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -200})).toBe("88e-200");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -200})).toBe("888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -200})).toBe("8888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -200})).toBe("88888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -200})).toBe("888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -200})).toBe("8888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -200})).toBe("88888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -200})).toBe("888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -200})).toBe("8888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -200})).toBe("88888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -200})).toBe("888888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -200})).toBe("8888888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -200})).toBe("88888888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -200})).toBe("888888888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -200})).toBe("8888888888888888e-200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -200})).toBe("88888888888888888e-200");
  });

  it("Exponent -100", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -100})).toBe("8e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -100})).toBe("88e-100");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -100})).toBe("888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -100})).toBe("8888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -100})).toBe("88888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -100})).toBe("888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -100})).toBe("8888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -100})).toBe("88888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -100})).toBe("888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -100})).toBe("8888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -100})).toBe("88888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -100})).toBe("888888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -100})).toBe("8888888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -100})).toBe("88888888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -100})).toBe("888888888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -100})).toBe("8888888888888888e-100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -100})).toBe("88888888888888888e-100");
  });

  it("Exponent -99", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -99})).toBe("8e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -99})).toBe("88e-99");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -99})).toBe("888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -99})).toBe("8888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -99})).toBe("88888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -99})).toBe("888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -99})).toBe("8888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -99})).toBe("88888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -99})).toBe("888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -99})).toBe("8888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -99})).toBe("88888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -99})).toBe("888888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -99})).toBe("8888888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -99})).toBe("88888888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -99})).toBe("888888888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -99})).toBe("8888888888888888e-99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -99})).toBe("88888888888888888e-99");
  });

  it("Exponent -22", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -22})).toBe("8e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -22})).toBe("88e-22");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -22})).toBe("888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -22})).toBe("8888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -22})).toBe("88888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -22})).toBe("888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -22})).toBe("8888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -22})).toBe("88888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -22})).toBe("888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -22})).toBe("8888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -22})).toBe("88888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -22})).toBe("888888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -22})).toBe("8888888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -22})).toBe("88888888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -22})).toBe("888888888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -22})).toBe("8888888888888888e-22");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -22})).toBe("88888888888888888e-22");
  });

  it("Exponent -21", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -21})).toBe("8e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -21})).toBe("88e-21");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -21})).toBe("888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -21})).toBe("8888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -21})).toBe("88888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -21})).toBe("888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -21})).toBe("8888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -21})).toBe("88888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -21})).toBe("888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -21})).toBe("8888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -21})).toBe("88888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -21})).toBe("888888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -21})).toBe("8888888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -21})).toBe("88888888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -21})).toBe("888888888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -21})).toBe("8888888888888888e-21");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -21})).toBe("88888888888888888e-21");
  });

  it("Exponent -20", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -20})).toBe("8e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -20})).toBe("88e-20");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -20})).toBe("888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -20})).toBe("8888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -20})).toBe("88888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -20})).toBe("888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -20})).toBe("8888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -20})).toBe("88888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -20})).toBe("888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -20})).toBe("8888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -20})).toBe("88888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -20})).toBe("888888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -20})).toBe("8888888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -20})).toBe("88888888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -20})).toBe("888888888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -20})).toBe("8888888888888888e-20");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -20})).toBe(".00088888888888888888");
  });

  it("Exponent -19", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -19})).toBe("8e-19");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -19})).toBe("88e-19");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -19})).toBe("888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -19})).toBe("8888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -19})).toBe("88888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -19})).toBe("888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -19})).toBe("8888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -19})).toBe("88888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -19})).toBe("888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -19})).toBe("8888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -19})).toBe("88888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -19})).toBe("888888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -19})).toBe("8888888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -19})).toBe("88888888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -19})).toBe("888888888888888e-19");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -19})).toBe(".0008888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -19})).toBe(".0088888888888888888");
  });

  it("Exponent -18", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -18})).toBe("8e-18");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -18})).toBe("88e-18");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -18})).toBe("888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -18})).toBe("8888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -18})).toBe("88888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -18})).toBe("888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -18})).toBe("8888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -18})).toBe("88888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -18})).toBe("888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -18})).toBe("8888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -18})).toBe("88888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -18})).toBe("888888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -18})).toBe("8888888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -18})).toBe("88888888888888e-18");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -18})).toBe(".000888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -18})).toBe(".008888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -18})).toBe(".088888888888888888");
  });

  it("Exponent -17", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -17})).toBe("8e-17");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -17})).toBe("88e-17");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -17})).toBe("888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -17})).toBe("8888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -17})).toBe("88888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -17})).toBe("888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -17})).toBe("8888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -17})).toBe("88888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -17})).toBe("888888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -17})).toBe("8888888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -17})).toBe("88888888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -17})).toBe("888888888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -17})).toBe("8888888888888e-17");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -17})).toBe(".00088888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -17})).toBe(".00888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -17})).toBe(".08888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -17})).toBe(".88888888888888888");
  });

  it("Exponent -16", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -16})).toBe("8e-16");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -16})).toBe("88e-16");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -16})).toBe("888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -16})).toBe("8888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -16})).toBe("88888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -16})).toBe("888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -16})).toBe("8888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -16})).toBe("88888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -16})).toBe("888888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -16})).toBe("8888888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -16})).toBe("88888888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -16})).toBe("888888888888e-16");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -16})).toBe(".0008888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -16})).toBe(".0088888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -16})).toBe(".0888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -16})).toBe(".8888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -16})).toBe("8.8888888888888888");
  });

  it("Exponent -15", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -15})).toBe("8e-15");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -15})).toBe("88e-15");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -15})).toBe("888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -15})).toBe("8888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -15})).toBe("88888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -15})).toBe("888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -15})).toBe("8888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -15})).toBe("88888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -15})).toBe("888888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -15})).toBe("8888888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -15})).toBe("88888888888e-15");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -15})).toBe(".000888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -15})).toBe(".008888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -15})).toBe(".088888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -15})).toBe(".888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -15})).toBe("8.888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -15})).toBe("88.888888888888888");
  });

  it("Exponent -14", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -14})).toBe("8e-14");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -14})).toBe("88e-14");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -14})).toBe("888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -14})).toBe("8888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -14})).toBe("88888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -14})).toBe("888888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -14})).toBe("8888888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -14})).toBe("88888888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -14})).toBe("888888888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -14})).toBe("8888888888e-14");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -14})).toBe(".00088888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -14})).toBe(".00888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -14})).toBe(".08888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -14})).toBe(".88888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -14})).toBe("8.88888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -14})).toBe("88.88888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -14})).toBe("888.88888888888888");
  });

  it("Exponent -13", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -13})).toBe("8e-13");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -13})).toBe("88e-13");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -13})).toBe("888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -13})).toBe("8888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -13})).toBe("88888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -13})).toBe("888888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -13})).toBe("8888888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -13})).toBe("88888888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -13})).toBe("888888888e-13");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -13})).toBe(".0008888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -13})).toBe(".0088888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -13})).toBe(".0888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -13})).toBe(".8888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -13})).toBe("8.8888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -13})).toBe("88.8888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -13})).toBe("888.8888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -13})).toBe("8888.8888888888888");
  });

  it("Exponent -12", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -12})).toBe("8e-12");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -12})).toBe("88e-12");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -12})).toBe("888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -12})).toBe("8888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -12})).toBe("88888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -12})).toBe("888888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -12})).toBe("8888888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -12})).toBe("88888888e-12");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -12})).toBe(".000888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -12})).toBe(".008888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -12})).toBe(".088888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -12})).toBe(".888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -12})).toBe("8.888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -12})).toBe("88.888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -12})).toBe("888.888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -12})).toBe("8888.888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -12})).toBe("88888.888888888888");
  });

  it("Exponent -11", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -11})).toBe("8e-11");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -11})).toBe("88e-11");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -11})).toBe("888e-11");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -11})).toBe("8888e-11");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -11})).toBe("88888e-11");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -11})).toBe("888888e-11");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -11})).toBe("8888888e-11");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -11})).toBe(".00088888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -11})).toBe(".00888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -11})).toBe(".08888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -11})).toBe(".88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -11})).toBe("8.88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -11})).toBe("88.88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -11})).toBe("888.88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -11})).toBe("8888.88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -11})).toBe("88888.88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -11})).toBe("888888.88888888888");
  });

  it("Exponent -10", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -10})).toBe("8e-10");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -10})).toBe("88e-10");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -10})).toBe("888e-10");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -10})).toBe("8888e-10");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -10})).toBe("88888e-10");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -10})).toBe("888888e-10");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -10})).toBe(".0008888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -10})).toBe(".0088888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -10})).toBe(".0888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -10})).toBe(".8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -10})).toBe("8.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -10})).toBe("88.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -10})).toBe("888.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -10})).toBe("8888.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -10})).toBe("88888.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -10})).toBe("888888.8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -10})).toBe("8888888.8888888888");
  });

  it("Exponent -9", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -9})).toBe("8e-9");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -9})).toBe("88e-9");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -9})).toBe("888e-9");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -9})).toBe("8888e-9");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -9})).toBe("88888e-9");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -9})).toBe("888888e-9");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -9})).toBe(".008888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -9})).toBe(".088888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -9})).toBe(".888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -9})).toBe("8.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -9})).toBe("88.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -9})).toBe("888.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -9})).toBe("8888.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -9})).toBe("88888.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -9})).toBe("888888.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -9})).toBe("8888888.888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -9})).toBe("88888888.888888888");
  });

  it("Exponent -8", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -8})).toBe("8e-8");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -8})).toBe("88e-8");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -8})).toBe("888e-8");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -8})).toBe("8888e-8");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -8})).toBe("88888e-8");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -8})).toBe(".00888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -8})).toBe(".08888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -8})).toBe(".88888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -8})).toBe("8.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -8})).toBe("88.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -8})).toBe("888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -8})).toBe("8888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -8})).toBe("88888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -8})).toBe("888888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -8})).toBe("8888888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -8})).toBe("88888888.88888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -8})).toBe("888888888.88888888");
  });

  it("Exponent -7", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -7})).toBe("8e-7");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -7})).toBe("88e-7");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -7})).toBe("888e-7");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -7})).toBe("8888e-7");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -7})).toBe(".0088888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -7})).toBe(".0888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -7})).toBe(".8888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -7})).toBe("8.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -7})).toBe("88.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -7})).toBe("888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -7})).toBe("8888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -7})).toBe("88888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -7})).toBe("888888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -7})).toBe("8888888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -7})).toBe("88888888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -7})).toBe("888888888.8888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -7})).toBe("8888888888.8888888");
  });

  it("Exponent -6", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -6})).toBe("8e-6");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -6})).toBe("88e-6");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -6})).toBe("888e-6");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -6})).toBe(".008888");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -6})).toBe(".088888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -6})).toBe(".888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -6})).toBe("8.888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -6})).toBe("88.888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -6})).toBe("888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -6})).toBe("8888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -6})).toBe("88888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -6})).toBe("888888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -6})).toBe("8888888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -6})).toBe("88888888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -6})).toBe("888888888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -6})).toBe("8888888888.888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -6})).toBe("88888888888.888888");
  });

  it("Exponent -5", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -5})).toBe("8e-5");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -5})).toBe("88e-5");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -5})).toBe(".00888");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -5})).toBe(".08888");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -5})).toBe(".88888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -5})).toBe("8.88888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -5})).toBe("88.88888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -5})).toBe("888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -5})).toBe("8888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -5})).toBe("88888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -5})).toBe("888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -5})).toBe("8888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -5})).toBe("88888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -5})).toBe("888888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -5})).toBe("8888888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -5})).toBe("88888888888.88888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -5})).toBe("888888888888.88888");
  });

  it("Exponent -4", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -4})).toBe("8e-4");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -4})).toBe(".0088");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -4})).toBe(".0888");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -4})).toBe(".8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -4})).toBe("8.8888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -4})).toBe("88.8888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -4})).toBe("888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -4})).toBe("8888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -4})).toBe("88888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -4})).toBe("888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -4})).toBe("8888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -4})).toBe("88888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -4})).toBe("888888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -4})).toBe("8888888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -4})).toBe("88888888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -4})).toBe("888888888888.8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -4})).toBe("8888888888888.8888");
  });

  it("Exponent -3", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -3})).toBe(".008");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -3})).toBe(".088");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -3})).toBe(".888");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -3})).toBe("8.888");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -3})).toBe("88.888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -3})).toBe("888.888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -3})).toBe("8888.888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -3})).toBe("88888.888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -3})).toBe("888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -3})).toBe("8888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -3})).toBe("88888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -3})).toBe("888888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -3})).toBe("8888888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -3})).toBe("88888888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -3})).toBe("888888888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -3})).toBe("8888888888888.888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -3})).toBe("88888888888888.888");
  });

  it("Exponent -2", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -2})).toBe(".08");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -2})).toBe(".88");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -2})).toBe("8.88");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -2})).toBe("88.88");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -2})).toBe("888.88");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -2})).toBe("8888.88");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -2})).toBe("88888.88");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -2})).toBe("888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -2})).toBe("8888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -2})).toBe("88888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -2})).toBe("888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -2})).toBe("8888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -2})).toBe("88888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -2})).toBe("888888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -2})).toBe("8888888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -2})).toBe("88888888888888.88");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -2})).toBe("888888888888888.88");
  });

  it("Exponent -1", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: -1})).toBe(".8");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: -1})).toBe("8.8");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: -1})).toBe("88.8");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: -1})).toBe("888.8");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: -1})).toBe("8888.8");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: -1})).toBe("88888.8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: -1})).toBe("888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: -1})).toBe("8888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: -1})).toBe("88888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: -1})).toBe("888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: -1})).toBe("8888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: -1})).toBe("88888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: -1})).toBe("888888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: -1})).toBe("8888888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: -1})).toBe("88888888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: -1})).toBe("888888888888888.8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: -1})).toBe("8888888888888888.8");
  });

  it("Exponent 0", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 0})).toBe("8");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 0})).toBe("88");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 0})).toBe("888");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 0})).toBe("8888");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 0})).toBe("88888");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 0})).toBe("888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 0})).toBe("8888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 0})).toBe("88888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 0})).toBe("888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 0})).toBe("8888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 0})).toBe("88888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 0})).toBe("888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 0})).toBe("8888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 0})).toBe("88888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 0})).toBe("888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 0})).toBe("8888888888888888");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 0})).toBe("88888888888888888");
  });

  it("Exponent 1", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 1})).toBe("80");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 1})).toBe("880");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 1})).toBe("8880");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 1})).toBe("88880");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 1})).toBe("888880");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 1})).toBe("8888880");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 1})).toBe("88888880");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 1})).toBe("888888880");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 1})).toBe("8888888880");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 1})).toBe("88888888880");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 1})).toBe("888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 1})).toBe("8888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 1})).toBe("88888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 1})).toBe("888888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 1})).toBe("8888888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 1})).toBe("88888888888888880");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 1})).toBe("888888888888888880");
  });

  it("Exponent 2", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 2})).toBe("800");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 2})).toBe("8800");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 2})).toBe("88800");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 2})).toBe("888800");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 2})).toBe("8888800");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 2})).toBe("88888800");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 2})).toBe("888888800");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 2})).toBe("8888888800");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 2})).toBe("88888888800");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 2})).toBe("888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 2})).toBe("8888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 2})).toBe("88888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 2})).toBe("888888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 2})).toBe("8888888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 2})).toBe("88888888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 2})).toBe("888888888888888800");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 2})).toBe("8888888888888888800");
  });

  it("Exponent 3", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 3})).toBe("8e3");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 3})).toBe("88e3");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 3})).toBe("888e3");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 3})).toBe("8888e3");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 3})).toBe("88888e3");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 3})).toBe("888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 3})).toBe("8888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 3})).toBe("88888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 3})).toBe("888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 3})).toBe("8888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 3})).toBe("88888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 3})).toBe("888888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 3})).toBe("8888888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 3})).toBe("88888888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 3})).toBe("888888888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 3})).toBe("8888888888888888e3");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 3})).toBe("88888888888888888e3");
  });

  it("Exponent 4", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 4})).toBe("8e4");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 4})).toBe("88e4");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 4})).toBe("888e4");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 4})).toBe("8888e4");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 4})).toBe("88888e4");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 4})).toBe("888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 4})).toBe("8888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 4})).toBe("88888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 4})).toBe("888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 4})).toBe("8888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 4})).toBe("88888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 4})).toBe("888888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 4})).toBe("8888888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 4})).toBe("88888888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 4})).toBe("888888888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 4})).toBe("8888888888888888e4");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 4})).toBe("88888888888888888e4");
  });

  it("Exponent 5", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 5})).toBe("8e5");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 5})).toBe("88e5");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 5})).toBe("888e5");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 5})).toBe("8888e5");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 5})).toBe("88888e5");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 5})).toBe("888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 5})).toBe("8888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 5})).toBe("88888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 5})).toBe("888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 5})).toBe("8888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 5})).toBe("88888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 5})).toBe("888888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 5})).toBe("8888888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 5})).toBe("88888888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 5})).toBe("888888888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 5})).toBe("8888888888888888e5");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 5})).toBe("88888888888888888e5");
  });

  it("Exponent 6", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 6})).toBe("8e6");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 6})).toBe("88e6");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 6})).toBe("888e6");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 6})).toBe("8888e6");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 6})).toBe("88888e6");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 6})).toBe("888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 6})).toBe("8888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 6})).toBe("88888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 6})).toBe("888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 6})).toBe("8888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 6})).toBe("88888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 6})).toBe("888888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 6})).toBe("8888888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 6})).toBe("88888888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 6})).toBe("888888888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 6})).toBe("8888888888888888e6");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 6})).toBe("88888888888888888e6");
  });

  it("Exponent 7", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 7})).toBe("8e7");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 7})).toBe("88e7");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 7})).toBe("888e7");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 7})).toBe("8888e7");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 7})).toBe("88888e7");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 7})).toBe("888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 7})).toBe("8888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 7})).toBe("88888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 7})).toBe("888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 7})).toBe("8888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 7})).toBe("88888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 7})).toBe("888888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 7})).toBe("8888888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 7})).toBe("88888888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 7})).toBe("888888888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 7})).toBe("8888888888888888e7");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 7})).toBe("88888888888888888e7");
  });

  it("Exponent 8", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 8})).toBe("8e8");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 8})).toBe("88e8");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 8})).toBe("888e8");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 8})).toBe("8888e8");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 8})).toBe("88888e8");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 8})).toBe("888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 8})).toBe("8888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 8})).toBe("88888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 8})).toBe("888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 8})).toBe("8888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 8})).toBe("88888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 8})).toBe("888888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 8})).toBe("8888888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 8})).toBe("88888888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 8})).toBe("888888888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 8})).toBe("8888888888888888e8");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 8})).toBe("88888888888888888e8");
  });

  it("Exponent 9", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 9})).toBe("8e9");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 9})).toBe("88e9");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 9})).toBe("888e9");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 9})).toBe("8888e9");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 9})).toBe("88888e9");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 9})).toBe("888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 9})).toBe("8888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 9})).toBe("88888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 9})).toBe("888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 9})).toBe("8888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 9})).toBe("88888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 9})).toBe("888888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 9})).toBe("8888888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 9})).toBe("88888888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 9})).toBe("888888888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 9})).toBe("8888888888888888e9");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 9})).toBe("88888888888888888e9");
  });

  it("Exponent 10", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 10})).toBe("8e10");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 10})).toBe("88e10");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 10})).toBe("888e10");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 10})).toBe("8888e10");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 10})).toBe("88888e10");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 10})).toBe("888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 10})).toBe("8888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 10})).toBe("88888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 10})).toBe("888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 10})).toBe("8888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 10})).toBe("88888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 10})).toBe("888888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 10})).toBe("8888888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 10})).toBe("88888888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 10})).toBe("888888888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 10})).toBe("8888888888888888e10");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 10})).toBe("88888888888888888e10");
  });

  it("Exponent 99", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 99})).toBe("8e99");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 99})).toBe("88e99");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 99})).toBe("888e99");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 99})).toBe("8888e99");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 99})).toBe("88888e99");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 99})).toBe("888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 99})).toBe("8888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 99})).toBe("88888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 99})).toBe("888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 99})).toBe("8888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 99})).toBe("88888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 99})).toBe("888888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 99})).toBe("8888888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 99})).toBe("88888888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 99})).toBe("888888888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 99})).toBe("8888888888888888e99");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 99})).toBe("88888888888888888e99");
  });

  it("Exponent 100", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 100})).toBe("8e100");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 100})).toBe("88e100");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 100})).toBe("888e100");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 100})).toBe("8888e100");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 100})).toBe("88888e100");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 100})).toBe("888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 100})).toBe("8888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 100})).toBe("88888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 100})).toBe("888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 100})).toBe("8888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 100})).toBe("88888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 100})).toBe("888888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 100})).toBe("8888888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 100})).toBe("88888888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 100})).toBe("888888888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 100})).toBe("8888888888888888e100");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 100})).toBe("88888888888888888e100");
  });

  it("Exponent 200", function() {
    expect(_stringifyDecimalLiteral({mantissa: "8", exponent: 200})).toBe("8e200");
    expect(_stringifyDecimalLiteral({mantissa: "88", exponent: 200})).toBe("88e200");
    expect(_stringifyDecimalLiteral({mantissa: "888", exponent: 200})).toBe("888e200");
    expect(_stringifyDecimalLiteral({mantissa: "8888", exponent: 200})).toBe("8888e200");
    expect(_stringifyDecimalLiteral({mantissa: "88888", exponent: 200})).toBe("88888e200");
    expect(_stringifyDecimalLiteral({mantissa: "888888", exponent: 200})).toBe("888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888", exponent: 200})).toBe("8888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888", exponent: 200})).toBe("88888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888", exponent: 200})).toBe("888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888", exponent: 200})).toBe("8888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888", exponent: 200})).toBe("88888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888", exponent: 200})).toBe("888888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888", exponent: 200})).toBe("8888888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888", exponent: 200})).toBe("88888888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "888888888888888", exponent: 200})).toBe("888888888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "8888888888888888", exponent: 200})).toBe("8888888888888888e200");
    expect(_stringifyDecimalLiteral({mantissa: "88888888888888888", exponent: 200})).toBe("88888888888888888e200");
  });
});
