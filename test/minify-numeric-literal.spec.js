/* eslint-env mocha */

import assert from 'assert'

import minifyNumericLiteral, {
  _toString,
  _parseDecimalLiteral,
  _decimalLiteral,
  _hexLiteral,
  _parseNumericLiteral,
  fromNumber
} from '../src/minify-numeric-literal.js'

describe('minify-numeric-literal', () => {
  describe('_toString', () => {
    it('works', () => {
      assert.strictEqual(_toString(8), '8')
      assert.strictEqual(_toString(8.99), '8.99')
      assert.strictEqual(_toString(4e56), '4e+56')
      assert.strictEqual(_toString(0.0042), '0.0042')
    })

    it('method call context', () => {
      assert.strictEqual(_toString(8, true), '8.')
      assert.strictEqual(_toString(8.99, true), '8.99')
      assert.strictEqual(_toString(4e56, true), '4e+56')
      assert.strictEqual(_toString(0.0042, true), '0.0042')
    })
  })

  describe('_parseDecimalLiteral', () => {
    it('works', () => {
      assert.deepStrictEqual(_parseDecimalLiteral('7'), { mantissa: '7', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.04'), { mantissa: '4', exponent: -2 })
      assert.deepStrictEqual(_parseDecimalLiteral('7800'), { mantissa: '78', exponent: 2 })
      assert.deepStrictEqual(_parseDecimalLiteral('7800.1'), { mantissa: '78001', exponent: -1 })
      assert.deepStrictEqual(_parseDecimalLiteral('7800.01'), { mantissa: '780001', exponent: -2 })
      assert.deepStrictEqual(_parseDecimalLiteral('1.476925632985436e-86'), { mantissa: '1476925632985436', exponent: -101 })
      assert.deepStrictEqual(_parseDecimalLiteral('100.476925632985436e-86'), { mantissa: '100476925632985436', exponent: -101 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.00014e86'), { mantissa: '14', exponent: 81 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.00014e-86'), { mantissa: '14', exponent: -91 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.000783'), { mantissa: '783', exponent: -6 })
      assert.deepStrictEqual(_parseDecimalLiteral('1.000'), { mantissa: '1', exponent: 0 })
    })

    it('handles "0"', () => {
      assert.deepStrictEqual(_parseDecimalLiteral('0'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.000'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0e12'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0e-19'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.00000e7'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0.00000e-7'), { mantissa: '', exponent: 0 })
      assert.deepStrictEqual(_parseDecimalLiteral('0e0'), { mantissa: '', exponent: 0 })
    })
  })

  describe('_decimalLiteral', () => {
    // Sanity checked version
    const test = (x, methodCallContext) => {
      const result = _decimalLiteral(x, methodCallContext)
      // eslint-disable-next-line no-new-func
      assert.strictEqual(Function(`'use strict'; return ${result}`)(), x)
      return result
    }

    it('returns the original number most of the time', () => {
      assert.strictEqual(test(0), '0')
      assert.strictEqual(test(1), '1')
      assert.strictEqual(test(2), '2')
      assert.strictEqual(test(16), '16')
    })

    it('suppresses "e+" in favour of "e"', () => {
      assert.strictEqual(test(1e34), '1e34')
      assert.strictEqual(test(1e+34), '1e34')
      assert.strictEqual(test(1e-34), '1e-34')
    })

    it('uses "e" and "e-" when appropriate', () => {
      assert.strictEqual(test(100), '100')
      assert.strictEqual(test(900), '900')
      assert.strictEqual(test(1000), '1e3')
      assert.strictEqual(test(9000), '9e3')
      assert.strictEqual(test(9100), '9100')
      assert.strictEqual(test(10000), '1e4')
      assert.strictEqual(test(56000), '56e3')
      assert.strictEqual(test(100000), '1e5')
      assert.strictEqual(test(145000), '145e3')
      assert.strictEqual(test(1.45e6), '145e4')
      assert.strictEqual(test(1450000), '145e4')
    })

    it('removes the decimal when possible', () => {
      assert.strictEqual(test(0.7e8), '7e7')
      assert.strictEqual(test(1.476925632985436e10), '14769256329.85436')
      assert.strictEqual(test(1.476925632985436e19), '1476925632985436e4')
      assert.strictEqual(test(1.476925632985436e20), '1476925632985436e5')
      assert.strictEqual(test(1.476925632985436e84), '1476925632985436e69')
      assert.strictEqual(test(1.476925632985436e85), '1476925632985436e70')
      assert.strictEqual(test(1.476925632985436e86), '1476925632985436e71')
      assert.strictEqual(test(1.476925632985436e99), '1476925632985436e84')
      assert.strictEqual(test(1.476925632985436e100), '1476925632985436e85')
      assert.strictEqual(test(1.476925632985436e308), '1476925632985436e293')

      assert.strictEqual(test(6.736e109), '6736e106')
      assert.strictEqual(test(2.225073858507202e-308), '2225073858507202e-323')

      assert.strictEqual(test(0.1476925632985436e-9), '1476925632985436e-25')
      assert.strictEqual(test(1.476925632985436e-10), '1476925632985436e-25')
      assert.strictEqual(test(1.476925632985436e-69), '1476925632985436e-84')
      assert.strictEqual(test(1.476925632985436e-84), '1476925632985436e-99')
      assert.strictEqual(test(1.476925632985436e-85), '1476925632985436e-100')
      assert.strictEqual(test(1.476925632985436e-86), '1476925632985436e-101')
      assert.strictEqual(test(1.476925632985436e-99), '1476925632985436e-114')
      assert.strictEqual(test(1.4e-99), '14e-100')
      assert.strictEqual(test(1.476925632985436e-100), '1476925632985436e-115')
      assert.strictEqual(test(1.476925632985436e-308), '1476925632985436e-323')
    })

    it('truncates the optional leading "0"', () => {
      assert.strictEqual(test(0.1), '.1')
      assert.strictEqual(test(0.7), '.7')
      assert.strictEqual(test(0.03476991), '.03476991')
    })

    it('removes the decimal for very small numbers when possible', () => {
      assert.strictEqual(test(0.07), '.07')
      assert.strictEqual(test(0.007), '.007')
      assert.strictEqual(test(0.0007), '7e-4')
      assert.strictEqual(test(0.000783), '783e-6')
      assert.strictEqual(test(0.7e-8), '7e-9')
    })

    describe('method call context', () => {
      it('works', () => {
        assert.strictEqual(test(434e-1, true), '43.4')
        assert.strictEqual(test(434, true), '434.')
        assert.strictEqual(test(4340, true), '4340.')
        assert.strictEqual(test(43400, true), '434e2')
        assert.strictEqual(test(434000, true), '434e3')
        assert.strictEqual(test(434e15, true), '434e15')
      })
    })
  })

  describe('_hexLiteral', () => {
    // Sanity checked version
    const test = x => {
      const result = _hexLiteral(x)
      if (result !== null) {
        // eslint-disable-next-line no-new-func
        assert.strictEqual(Function(`'use strict'; return ${result}`)(), x)
      }
      return result
    }

    it('refuses non-integers', () => {
      assert.strictEqual(test(0.14), null)
      assert.strictEqual(test(Math.PI), null)
      assert.strictEqual(test(17701.9), null)
    })

    it('refuses numbers whose hex representation would be 22+ characters', () => {
      // There are no floats between these that I can find
      assert.strictEqual('0x' + 0xfffffffffffff800000.toString(16), '0xfffffffffffff800000') // 21 chars
      assert.strictEqual(test(0xfffffffffffff800000), '0xfffffffffffff800000') // 21 chars

      assert.strictEqual('0x' + 0x10000000000000000000.toString(16), '0x10000000000000000000') // 22 chars
      assert.strictEqual(test(0x10000000000000000000), '0xfffffffffffffffffff') // 21 chars still

      assert.strictEqual('0x' + 0x10000000000001000000.toString(16), '0x10000000000001000000') // 22 chars
      assert.strictEqual(test(0x10000000000001000000), '0x10000000000001000000') // 21 chars still
      // eslint-disable-next-line no-loss-of-precision
      assert.strictEqual(test(0x10000000000003411142), '0x10000000000003000000')
    })

    it('returns the hexadecimal representation', () => {
      /* eslint-disable no-loss-of-precision */
      assert.strictEqual(test(0), '0x0')

      assert.strictEqual(test(1099511627774), '0xfffffffffe')
      assert.strictEqual(test(1099511627775), '0xffffffffff')
      assert.strictEqual(test(1099511627776), '0x10000000000')

      assert.strictEqual(test(17592186044414), '0xffffffffffe')
      assert.strictEqual(test(17592186044415), '0xfffffffffff')
      assert.strictEqual(test(17592186044416), '0x100000000000')

      assert.strictEqual(test(281474976710654), '0xfffffffffffe')
      assert.strictEqual(test(281474976710655), '0xffffffffffff')
      assert.strictEqual(test(281474976710656), '0x1000000000000')

      assert.strictEqual(test(4503599627370494), '0xffffffffffffe')
      assert.strictEqual(test(4503599627370495), '0xfffffffffffff')
      assert.strictEqual(test(4503599627370496), '0x10000000000000')

      // At this point the floats are spaced apart by 2, not 1.
      assert.strictEqual(test(9999999999999998), '0x2386f26fc0fffe')
      assert.strictEqual(test(9999999999999999), '0x2386f26fc10000')
      assert.strictEqual(test(10000000000000000), '0x2386f26fc10000')
      assert.strictEqual(test(10000000000000001), '0x2386f26fc10000')
      assert.strictEqual(test(10000000000000002), '0x2386f26fc10002')

      // Here the floats are spaced 8 apart.
      assert.strictEqual(test(72057594037927928), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927929), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927930), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927931), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927932), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927933), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927934), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927935), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927936), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927937), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927938), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927939), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927940), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927941), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927942), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927943), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927944), '0xffffffffffffff') // not 0x100000000000000
      assert.strictEqual(test(72057594037927945), '0x100000000000010')
      assert.strictEqual(test(72057594037927946), '0x100000000000010')
      assert.strictEqual(test(72057594037927947), '0x100000000000010')
      assert.strictEqual(test(72057594037927948), '0x100000000000010')
      assert.strictEqual(test(72057594037927949), '0x100000000000010')
      assert.strictEqual(test(72057594037927950), '0x100000000000010')

      assert.strictEqual(test(100000000000000008), '0x16345785d8a0000')
      assert.strictEqual(test(100000000000000009), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000010), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000011), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000016), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000017), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000023), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000024), '0x16345785d8a0020')
      /* eslint-enable no-loss-of-precision */
    })

    it('returns all Fs where this saves a character', () => {
      /* eslint-disable no-loss-of-precision */
      assert.strictEqual(0xffffffffffffff, 0x100000000000000)
      assert.strictEqual(test(0x100000000000000), '0xffffffffffffff')

      assert.strictEqual(0xfffffffffffffff, 0x1000000000000000)
      assert.strictEqual(test(0x1000000000000000), '0xfffffffffffffff')

      assert.strictEqual(0xffffffffffffffff, 0x10000000000000000)
      assert.strictEqual(test(0x10000000000000000), '0xffffffffffffffff')

      assert.strictEqual(0xfffffffffffffffff, 0x100000000000000000)
      assert.strictEqual(test(0x100000000000000000), '0xfffffffffffffffff')

      assert.strictEqual(0xffffffffffffffffff, 0x1000000000000000000)
      assert.strictEqual(test(0x1000000000000000000), '0xffffffffffffffffff')

      assert.strictEqual(0xfffffffffffffffffff, 0x10000000000000000000)
      assert.strictEqual(test(0x10000000000000000000), '0xfffffffffffffffffff')

      assert.strictEqual(0xffffffffffffffffffff, 0x100000000000000000000)
      assert.strictEqual(test(0x100000000000000000000), '0x100000000000000000000')
      /* eslint-enable no-loss-of-precision */
    })
  })

  describe('fromNumber', () => {
    // Wrap every call in this test
    const test = (x, methodCallContext) => {
      const result = fromNumber(x, methodCallContext)
      if (result !== null) {
        // eslint-disable-next-line no-new-func
        assert.strictEqual(x, Function(`'use strict'; return ${result}`)())
      }
      return result
    }

    it('returns the original number most of the time', () => {
      assert.strictEqual(test(0), '0')
      assert.strictEqual(test(1), '1')
      assert.strictEqual(test(2), '2')
      assert.strictEqual(test(16), '16')
    })

    it('suppresses "e+" in favour of "e"', () => {
      assert.strictEqual(test(1e34), '1e34')
    })

    it('returns the hexadecimal representation when appropriate', () => {
      /* eslint-disable no-loss-of-precision */
      assert.strictEqual(test(0), '0')
      assert.strictEqual(test(999999999999), '999999999999')
      assert.strictEqual(test(1000000000000), '1e12')
      assert.strictEqual(test(1099511627775), '0xffffffffff')
      assert.strictEqual(test(1099511627776), '1099511627776')
      assert.strictEqual(test(9999999999999), '9999999999999')
      assert.strictEqual(test(10000000000000), '1e13')
      assert.strictEqual(test(17592186044415), '0xfffffffffff')
      assert.strictEqual(test(17592186044416), '17592186044416')
      assert.strictEqual(test(99999999999999), '99999999999999')
      assert.strictEqual(test(100000000000000), '1e14')
      assert.strictEqual(test(281474976710655), '0xffffffffffff')
      assert.strictEqual(test(281474976710656), '281474976710656')
      assert.strictEqual(test(999999999999999), '999999999999999')
      assert.strictEqual(test(1000000000000000), '1e15')
      assert.strictEqual(test(4503599627370495), '0xfffffffffffff')
      assert.strictEqual(test(4503599627370496), '4503599627370496')
      assert.strictEqual(test(9999999999999998), '9999999999999998')
      assert.strictEqual(test(9999999999999999), '1e16')
      assert.strictEqual(test(10000000000000000), '1e16')
      assert.strictEqual(test(10000000000000001), '1e16')
      assert.strictEqual(test(10000000000000002), '0x2386f26fc10002')
      assert.strictEqual(test(72057594037927928), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927929), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927930), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927931), '0xfffffffffffff8')
      assert.strictEqual(test(72057594037927932), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927933), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927934), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927935), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927936), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927937), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927938), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927939), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927940), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927941), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927942), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927943), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927944), '0xffffffffffffff')
      assert.strictEqual(test(72057594037927945), '72057594037927950')
      assert.strictEqual(test(72057594037927946), '72057594037927950')
      assert.strictEqual(test(72057594037927947), '72057594037927950')
      assert.strictEqual(test(72057594037927948), '72057594037927950')
      assert.strictEqual(test(72057594037927949), '72057594037927950')
      assert.strictEqual(test(72057594037927950), '72057594037927950')
      assert.strictEqual(test(99999999999999980), '99999999999999980')
      assert.strictEqual(test(99999999999999981), '99999999999999980')
      assert.strictEqual(test(99999999999999991), '99999999999999980')
      assert.strictEqual(test(99999999999999992), '1e17')
      assert.strictEqual(test(99999999999999993), '1e17')
      assert.strictEqual(test(99999999999999999), '1e17')
      assert.strictEqual(test(100000000000000000), '1e17')
      assert.strictEqual(test(100000000000000001), '1e17')
      assert.strictEqual(test(100000000000000008), '1e17')
      assert.strictEqual(test(100000000000000009), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000010), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000011), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000016), '0x16345785d8a0010')
      assert.strictEqual(test(100000000000000000000), '1e20')
      assert.strictEqual(test(999999999999999000000), '999999999999999e6')
      assert.strictEqual(test(999999999999999900000), '9999999999999999e5')
      assert.strictEqual(test(999999999999999934463), '9999999999999999e5')
      assert.strictEqual(test(999999999999999934464), '1e21')
      /* eslint-enable no-loss-of-precision */
    })

    it('uses "e" and "e-" when appropriate', () => {
      assert.strictEqual(test(100), '100')
      assert.strictEqual(test(900), '900')
      assert.strictEqual(test(1000), '1e3')
      assert.strictEqual(test(9000), '9e3')
      assert.strictEqual(test(9100), '9100')
      assert.strictEqual(test(10000), '1e4')
      assert.strictEqual(test(56000), '56e3')
      assert.strictEqual(test(100000), '1e5')
      assert.strictEqual(test(145000), '145e3')
      assert.strictEqual(test(1.45e6), '145e4')
      assert.strictEqual(test(1450000), '145e4')
    })

    it('removes the decimal when possible', () => {
      assert.strictEqual(test(0.7e8), '7e7')
      assert.strictEqual(test(1.476925632985436e+10), '14769256329.85436')
      assert.strictEqual(test(1.476925632985436e+20), '1476925632985436e5')
      assert.strictEqual(test(1.476925632985436e+84), '1476925632985436e69')
      assert.strictEqual(test(1.476925632985436e+85), '1476925632985436e70')
      assert.strictEqual(test(1.476925632985436e+86), '1476925632985436e71')
      assert.strictEqual(test(1.476925632985436e+99), '1476925632985436e84')
      assert.strictEqual(test(1.476925632985436e+100), '1476925632985436e85')
      assert.strictEqual(test(1.476925632985436e+308), '1476925632985436e293')

      assert.strictEqual(test(6.736e109), '6736e106')
      assert.strictEqual(test(2.225073858507202e-308), '2225073858507202e-323')

      assert.strictEqual(test(1.476925632985436e-10), '1476925632985436e-25')
      assert.strictEqual(test(1.476925632985436e-69), '1476925632985436e-84')
      assert.strictEqual(test(1.476925632985436e-84), '1476925632985436e-99')
      assert.strictEqual(test(1.476925632985436e-85), '1.476925632985436e-85') // Saves nothing here...
      assert.strictEqual(test(1.476925632985436e-86), '1.476925632985436e-86') // And here
      assert.strictEqual(test(1.476925632985436e-99), '1.476925632985436e-99') // And here
      assert.strictEqual(test(1.4e-99), '1.4e-99') // And here
      assert.strictEqual(test(1.476925632985436e-100), '1476925632985436e-115')
      assert.strictEqual(test(1.476925632985436e-308), '1476925632985436e-323')
    })

    it('truncates the optional leading "0"', () => {
      assert.strictEqual(test(0.1), '.1')
      assert.strictEqual(test(0.7), '.7')
      assert.strictEqual(test(0.03476991), '.03476991')
    })

    it('removes the decimal for very small numbers when possible', () => {
      assert.strictEqual(test(0.007), '.007')
      assert.strictEqual(test(0.0007), '7e-4')
      assert.strictEqual(test(0.000783), '783e-6')
      assert.strictEqual(test(0.7e-8), '7e-9')
    })

    it('returns a representation of `Infinity`', () => {
      assert.strictEqual(test(Infinity), '2e308')
    })

    it('refuses some numbers', () => {
      assert.strictEqual(test(-244), null)
      assert.strictEqual(test(-0), null)
      assert.strictEqual(test(-Infinity), null)
      assert.strictEqual(test(NaN), null)
      assert.strictEqual(test('abc'), null)
    })

    describe('method call context', () => {
      it('works', () => {
        assert.strictEqual(test(434e-1, true), '43.4')
        assert.strictEqual(test(434, true), '434.')
        assert.strictEqual(test(4340, true), '4340.')
        assert.strictEqual(test(43400, true), '434e2')
        assert.strictEqual(test(434000, true), '434e3')
        assert.strictEqual(test(434e15, true), '434e15')
      })
    })
  })

  describe('parse-numeric-literal', () => {
    it('refuses some invalid inputs', () => {
      assert.strictEqual(_parseNumericLiteral('-244'), null)
      assert.strictEqual(_parseNumericLiteral('-0'), null)
      assert.strictEqual(_parseNumericLiteral('Infinity'), null)
      assert.strictEqual(_parseNumericLiteral('-Infinity'), null)
      assert.strictEqual(_parseNumericLiteral('NaN'), null)
    })

    it('refuses leading or trailing whitespace', () => {
      assert.strictEqual(_parseNumericLiteral(' 0b101'), null)
      assert.strictEqual(_parseNumericLiteral('0b101 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0B101 '), null)
      assert.strictEqual(_parseNumericLiteral('0o '), null)
      assert.strictEqual(_parseNumericLiteral('0o0 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0o0 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0O1 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0o0'), null)
      assert.strictEqual(_parseNumericLiteral('0x1 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0x1'), null)
      assert.strictEqual(_parseNumericLiteral(' 0X1'), null)
      assert.strictEqual(_parseNumericLiteral(' 7'), null)
      assert.strictEqual(_parseNumericLiteral('89.1 '), null)
      assert.strictEqual(_parseNumericLiteral(' 0 '), null)
    })

    it('refuses a leading 0-something with no digits', () => {
      assert.strictEqual(_parseNumericLiteral('0b'), null)
      assert.strictEqual(_parseNumericLiteral('0B'), null)
      assert.strictEqual(_parseNumericLiteral('0o'), null)
      assert.strictEqual(_parseNumericLiteral('0O'), null)
      assert.strictEqual(_parseNumericLiteral('0x'), null)
      assert.strictEqual(_parseNumericLiteral('0X'), null)
    })

    it('refuses leading zero with extras', () => {
      assert.strictEqual(_parseNumericLiteral('00B101'), null)
      assert.strictEqual(_parseNumericLiteral('00o18'), null)
      assert.strictEqual(_parseNumericLiteral('00x01'), null)
      assert.strictEqual(_parseNumericLiteral('01x01'), null)
      assert.strictEqual(_parseNumericLiteral('1x01'), null)
      assert.strictEqual(_parseNumericLiteral('1b01'), null)
      assert.strictEqual(_parseNumericLiteral('2o01'), null)
      assert.strictEqual(_parseNumericLiteral('00.1'), null)
    })

    it('refuses duplicate or odd letters', () => {
      assert.strictEqual(_parseNumericLiteral('0c0'), null)
      assert.strictEqual(_parseNumericLiteral('0b b0'), null)
      assert.strictEqual(_parseNumericLiteral('0XX0'), null)
    })

    it('refuses unrecognised digits', () => {
      assert.strictEqual(_parseNumericLiteral('0b1012'), null)
      assert.strictEqual(_parseNumericLiteral('0O18'), null)
      assert.strictEqual(_parseNumericLiteral('1O18'), null)
      assert.strictEqual(_parseNumericLiteral('0x1g'), null)
      assert.strictEqual(_parseNumericLiteral('1a.9'), null)
    })

    it('refuses odd decimals', () => {
      assert.strictEqual(_parseNumericLiteral('.'), null)
      assert.strictEqual(_parseNumericLiteral('.e7'), null)
      assert.strictEqual(_parseNumericLiteral('1243..e-71'), null)
      assert.strictEqual(_parseNumericLiteral('1243.1.e-71'), null)
    })

    it('works the rest of the time', () => {
      /* eslint-disable no-loss-of-precision, no-floating-decimal */
      assert.strictEqual(_parseNumericLiteral('0b1001'), 0b1001)
      assert.strictEqual(_parseNumericLiteral('0B0001001'), 0B0001001)
      assert.strictEqual(_parseNumericLiteral('0o777'), 0o777)
      assert.strictEqual(_parseNumericLiteral('0xabcde'), 0xabcde)
      assert.strictEqual(_parseNumericLiteral('123'), 123)
      assert.strictEqual(_parseNumericLiteral('123.456'), 123.456)
      assert.strictEqual(_parseNumericLiteral('.456'), .456)
      assert.strictEqual(_parseNumericLiteral('.456e+789'), .456e+789)
      assert.strictEqual(_parseNumericLiteral('123e+789'), 123e+789)
      assert.strictEqual(_parseNumericLiteral('123.456e+789'), 123.456e+789)
      /* eslint-enable no-loss-of-precision, no-floating-decimal */
    })
  })

  describe('[[call]]', () => {
    // Wrap every test in this test
    const test = (str, methodCallContext) => {
      const result = minifyNumericLiteral(str, methodCallContext)
      if (result !== null) {
        assert.strictEqual(
          /* eslint-disable no-new-func */
          Function(`'use strict'; return ${str}`)(),
          Function(`'use strict'; return ${result}`)()
          /* eslint-disable no-new-func */
        )
      }
      return result
    }

    it('returns the original number most of the time', () => {
      assert.strictEqual(test('0'), '0')
      assert.strictEqual(test('1'), '1')
      assert.strictEqual(test('2'), '2')
      assert.strictEqual(test('16'), '16')
    })

    it('suppresses "e+" in favour of "e"', () => {
      assert.strictEqual(test('1e34'), '1e34')
    })

    it('returns the hexadecimal representation when appropriate', () => {
      assert.strictEqual(test('0'), '0')
      assert.strictEqual(test('999999999999'), '999999999999')
      assert.strictEqual(test('1000000000000'), '1e12')
      assert.strictEqual(test('1099511627775'), '0xffffffffff')
      assert.strictEqual(test('1099511627776'), '1099511627776')
      assert.strictEqual(test('9999999999999'), '9999999999999')
      assert.strictEqual(test('10000000000000'), '1e13')
      assert.strictEqual(test('17592186044415'), '0xfffffffffff')
      assert.strictEqual(test('17592186044416'), '17592186044416')
      assert.strictEqual(test('99999999999999'), '99999999999999')
      assert.strictEqual(test('100000000000000'), '1e14')
      assert.strictEqual(test('281474976710655'), '0xffffffffffff')
      assert.strictEqual(test('281474976710656'), '281474976710656')
      assert.strictEqual(test('999999999999999'), '999999999999999')
      assert.strictEqual(test('1000000000000000'), '1e15')
      assert.strictEqual(test('4503599627370495'), '0xfffffffffffff')
      assert.strictEqual(test('4503599627370496'), '4503599627370496')
      assert.strictEqual(test('9999999999999998'), '9999999999999998')
      assert.strictEqual(test('9999999999999999'), '1e16')
      assert.strictEqual(test('10000000000000000'), '1e16')
      assert.strictEqual(test('10000000000000001'), '1e16')
      assert.strictEqual(test('10000000000000002'), '0x2386f26fc10002')
      assert.strictEqual(test('72057594037927928'), '0xfffffffffffff8')
      assert.strictEqual(test('72057594037927929'), '0xfffffffffffff8')
      assert.strictEqual(test('72057594037927930'), '0xfffffffffffff8')
      assert.strictEqual(test('72057594037927931'), '0xfffffffffffff8')
      assert.strictEqual(test('72057594037927932'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927933'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927934'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927935'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927936'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927937'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927938'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927939'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927940'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927941'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927942'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927943'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927944'), '0xffffffffffffff')
      assert.strictEqual(test('72057594037927945'), '72057594037927950')
      assert.strictEqual(test('72057594037927946'), '72057594037927950')
      assert.strictEqual(test('72057594037927947'), '72057594037927950')
      assert.strictEqual(test('72057594037927948'), '72057594037927950')
      assert.strictEqual(test('72057594037927949'), '72057594037927950')
      assert.strictEqual(test('72057594037927950'), '72057594037927950')
      assert.strictEqual(test('99999999999999980'), '99999999999999980')
      assert.strictEqual(test('99999999999999981'), '99999999999999980')
      assert.strictEqual(test('99999999999999991'), '99999999999999980')
      assert.strictEqual(test('99999999999999992'), '1e17')
      assert.strictEqual(test('99999999999999993'), '1e17')
      assert.strictEqual(test('99999999999999999'), '1e17')
      assert.strictEqual(test('100000000000000000'), '1e17')
      assert.strictEqual(test('100000000000000001'), '1e17')
      assert.strictEqual(test('100000000000000008'), '1e17')
      assert.strictEqual(test('100000000000000009'), '0x16345785d8a0010')
      assert.strictEqual(test('100000000000000010'), '0x16345785d8a0010')
      assert.strictEqual(test('100000000000000011'), '0x16345785d8a0010')
      assert.strictEqual(test('100000000000000016'), '0x16345785d8a0010')
      assert.strictEqual(test('100000000000000000000'), '1e20')
      assert.strictEqual(test('999999999999999000000'), '999999999999999e6')
      assert.strictEqual(test('999999999999999900000'), '9999999999999999e5')
      assert.strictEqual(test('999999999999999934463'), '9999999999999999e5')
      assert.strictEqual(test('999999999999999934464'), '1e21')
    })

    it('uses "e" and "e-" when appropriate', () => {
      assert.strictEqual(test('100'), '100')
      assert.strictEqual(test('900'), '900')
      assert.strictEqual(test('1000'), '1e3')
      assert.strictEqual(test('9000'), '9e3')
      assert.strictEqual(test('9100'), '9100')
      assert.strictEqual(test('10000'), '1e4')
      assert.strictEqual(test('56000'), '56e3')
      assert.strictEqual(test('100000'), '1e5')
      assert.strictEqual(test('145000'), '145e3')
      assert.strictEqual(test('1.45e6'), '145e4')
      assert.strictEqual(test('1450000'), '145e4')
    })

    it('removes the decimal when possible', () => {
      assert.strictEqual(test('0.7e8'), '7e7')
      assert.strictEqual(test('1.476925632985436e+10'), '14769256329.85436')
      assert.strictEqual(test('1.476925632985436e+20'), '1476925632985436e5')
      assert.strictEqual(test('1.476925632985436e+84'), '1476925632985436e69')
      assert.strictEqual(test('1.476925632985436e+85'), '1476925632985436e70')
      assert.strictEqual(test('1.476925632985436e+86'), '1476925632985436e71')
      assert.strictEqual(test('1.476925632985436e+99'), '1476925632985436e84')
      assert.strictEqual(test('1.476925632985436e+100'), '1476925632985436e85')
      assert.strictEqual(test('1.476925632985436e+308'), '1476925632985436e293')

      assert.strictEqual(test('6.736e109'), '6736e106')
      assert.strictEqual(test('2.225073858507202e-308'), '2225073858507202e-323')

      assert.strictEqual(test('1.476925632985436e-10'), '1476925632985436e-25')
      assert.strictEqual(test('1.476925632985436e-69'), '1476925632985436e-84')
      assert.strictEqual(test('1.476925632985436e-84'), '1476925632985436e-99')
      assert.strictEqual(test('1.476925632985436e-85'), '1.476925632985436e-85') // Saves nothing here...
      assert.strictEqual(test('1.476925632985436e-86'), '1.476925632985436e-86') // And here
      assert.strictEqual(test('1.476925632985436e-99'), '1.476925632985436e-99') // And here
      assert.strictEqual(test('1.4e-99'), '1.4e-99') // And here
      assert.strictEqual(test('1.476925632985436e-100'), '1476925632985436e-115')
      assert.strictEqual(test('1.476925632985436e-308'), '1476925632985436e-323')
      assert.strictEqual(test('2.2250738585072036e-208'), '22250738585072036e-224')
    })

    it('truncates the optional leading "0"', () => {
      assert.strictEqual(test('0.1'), '.1')
      assert.strictEqual(test('0.7'), '.7')
      assert.strictEqual(test('0.03476991'), '.03476991')
    })

    it('removes the decimal for very small numbers when possible', () => {
      assert.strictEqual(test('0.007'), '.007')
      assert.strictEqual(test('0.0007'), '7e-4')
      assert.strictEqual(test('0.000783'), '783e-6')
      assert.strictEqual(test('0.7e-8'), '7e-9')
    })

    it('refuses some invalid inputs', () => {
      assert.strictEqual(test('-244'), null)
      assert.strictEqual(test('-0'), null)
      assert.strictEqual(test('Infinity'), null)
      assert.strictEqual(test('-Infinity'), null)
      assert.strictEqual(test('NaN'), null)
      assert.strictEqual(test(371000), null)
    })

    describe('method test context', () => {
      it('works', () => {
        assert.strictEqual(test('434e-1', true), '43.4')
        assert.strictEqual(test('434', true), '434.')
        assert.strictEqual(test('4340', true), '4340.')
        assert.strictEqual(test('43400', true), '434e2')
        assert.strictEqual(test('434000', true), '434e3')
        assert.strictEqual(test('434e15', true), '434e15')
      })
    })
  })
})
