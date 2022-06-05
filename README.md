# minify-numeric-literal

Minifies JavaScript numeric literals. Suitable for use in JavaScript source code minifiers. Input a numeric literal, output the shortest one possible.

## Installation

```bash
npm install minify-numeric-literal
```

## Usage

```javascript
import mnl from 'minify-numeric-literal'

// Some literals are unchanged
mnl('0')                       // "0"
mnl('126')                     // "126"
mnl('100845')                  // "100845"

// Always omit a leading 0 before the decimal point
mnl('0.00783')                 // ".00783", saves 1 character

// Use exponents when appropriate
mnl('0.000783')                // "783e-6", saves 2 characters
mnl('9000')                    // "9e3", saves 1 character
mnl('1000000000000')           // "1e12", saves 9 characters

// Lose the exponent when appropriate
mnl('1.476925632985436e+10')   // "14769256329.85436", saves 4 characters

// Use hex when appropriate
mnl('10000000000000002')       // "0x2386f26fc10002", saves 1 character

// Use 0xFFFF...F when it works out the same as 0x10000...0
mnl('72057594037927936')       // "0xffffffffffffff", saves 1 character

// Lose the decimal point when possible
mnl('1.476925632985436e99')    // "1476925632985436e84", saves 1 character
mnl('2.2250738585072036e-208') // "22250738585072036e-224", saves 1 character

// Cannot produce meaningful output unless the input is a numeric literal
mnl('-7')                      // null
mnl('-0')                      // null
mnl('NaN')                     // null
mnl('Infinity')                // null
mnl('asdf')                    // null
mnl(371000)                    // null
```

If you want to pass in a number directly:

```javascript
import { fromNumber } from 'minify-numeric-literal'

// Works as normal
fromNumber(9000)      // "9e3"

// Cannot produce meaningful output unless the input is a non-negative number
fromNumber(-7)        // null
fromNumber(-0)        // null
fromNumber(-Infinity) // null
fromNumber(NaN)       // null
fromNumber('asdf')    // null

// But since there is a numeric literal for `Infinity`...
fromNumber(Infinity)  // "2e308"
```

* For an arbitrary number `x`, the longest possible output from `String(x)` is 24 characters e.g. `'-2.2250738585072036e-208'`.
* For a non-negative number `x`, the longest possible output from `String(x)` is 23 characters e.g. `'2.2250738585072036e-208'`.
* For a non-negative number `x`, the longest possible output from `fromNumber(x)` is 22 characters e.g. `'22250738585072036e-224'`.

## FAQ

### What if my numeric literal is being used in a method call context e.g. `90.0.toString()`?

In this situation, `mnl('90.0')` or `fromNumber(90.0)` both return `'90'`, which is no good for your purpose because `90.toString()` is syntactically invalid JavaScript.

You may pass in the `methodCallContext` flag, i.e. `mnl('90.0', true)` or `mnl.fromNumber(90.0, true)`. The result returned is `90.`, eventually resulting in the syntactically valid `90..toString()`.

### Why not accept negative numbers?

JavaScript does not have negative numeric literals. A JavaScript source code parser encountering an expression like `-9000` should return a unary negation operator (`-`) followed by a non-negative numeric literal `9000`, the latter of which `mnl` accepts.

### Why not accept `'Infinity'` or `'NaN'`?

`mnl` only accepts numeric literals, which `'Infinity'` and `'NaN'` are not.

`fromNumber` accepts numbers but can still only return numeric literals. In the case of `-Infinity` and `NaN` this is not possible, but `Infinity` can be represented by a numeric literal such as `'2e308'`, which we return.
