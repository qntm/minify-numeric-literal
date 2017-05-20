# minify-numeric-literal

Minifies JavaScript numeric literals. Suitable for use in JavaScript source code minifiers. Input a numeric literal, output the shortest one possible.

## Installation

```bash
npm install minify-numeric-literal
```

## Usage

```javascript
const mnl = require("minify-numeric-literal")

// Some literals are unchanged
mnl("0")                     // "0"
mnl("0.78")                  // "0.78"
mnl("126")                   // "126"

// Use exponents when appropriate
mnl("0.000783")              // "783e-6", saves 2 characters
mnl("9000")                  // "9e3", saves 1 character
mnl("1000000000000")         // "1e12", saves 9 characters

// Lose the exponent when appropriate
mnl("1.476925632985436e+10") // "14769256329.85436", saves 4 characters

// Use hex when appropriate
mnl("10000000000000002")     // "0x2386f26fc10002", saves 1 character

// Use 0xFFFF...F when it works out the same as 0x10000...0
mnl("4.722366482869645e+21") // "0xffffffffffffffffff", saves 1 character

// Lose the decimal point when possible
mnl("1.476925632985436e+99") // "1476925632985436e84", saves 1 character

// Cannot produce meaningful output unless the input is a numeric literal
mnl("-7")                    // null
mnl("-0")                    // null
mnl("NaN")                   // null
mnl("Infinity")              // null
mnl("asdf")                  // null
```

If you want to pass in a number directly:

```javascript
const fromNumber = require("minify-numeric-literal").fromNumber

// Works as normal
fromNumber(9000)        // "9e3"

// Cannot produce meaningful output unless the input is a non-negative number
fromNumber(-7)          // null
fromNumber(-0)          // null
fromNumber(-Infinity)   // null
fromNumber(NaN)         // null
fromNumber("asdf")      // null

// But since there is a numeric literal for `Infinity`...
fromNumber(Infinity)    // "2e308"
```

## FAQ

### Why not accept negative numbers?

JavaScript does not have negative numeric literals. A JavaScript source code parser encountering an expression like `-9000` should return a unary negation operator (`-`) followed by a non-negative numeric literal `9000`, the latter of which `mnl` accepts.

### Why not accept `"Infinity"` or `"NaN"`?

`mnl` only accepts numeric literals, which `"Infinity"` and `"NaN"` are not.

`fromNumber` accepts numbers but can still only return numeric literals. In the case of `-Infinity` and `NaN` this is not possible, but `Infinity` can be represented by a numeric literal such as `"2e308"`, which we return.

## License

MIT
