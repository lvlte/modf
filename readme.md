# modf

```ts
function modf(x: number, literal: boolean = false): [number, number]
```
> Return the integral and fractional parts of the given number. Both parts have
> the same sign as the input.
>
> If `literal` is set to `true` the fractional part is reinterpreted by reading
> the decimals in the base 10 string representation of `x` (safe when `x` is a
> number literal, or if its value is deterministic, and if its representation
> matches exactly the value to be used).
>
> _@param_ `x` - The input number.  
> _@param_ `literal` - Whether to read `x` as a base 10 literal (default: `false`).  
> _@returns_ A tuple `[ipart, fpart]`, respectively the integral and fractional
> parts of `x`, or `[NaN, NaN]` if `x` is not a finite number.


## Install

```sh
npm install @lvlte/modf
```

## Usage

```js
// ESM
import { modf, ipart, fpart } from '@lvlte/modf';
```
```js
// CJS
const { modf, ipart, fpart } = require('@lvlte/modf');
```
```js
const x = 1.3; // 1.3000000000000000(444089209850062616169452667236328125)

// True value, equivalent to [ Math.trunc(x), x % 1 ]
let [xi, xf] = modf(x);   // [1, 0.30000000000000004]
xi = ipart(x);            // 1
xf = fpart(x);            // 0.30000000000000004

// Reinterpret
[xi, xf] = modf(x, true); // [1, 0.3]
xf = fpart(x, true);      // 0.3
```

## Why ?

Getting the integer part of a number is trivial. However when it comes to the
fractional part, we usually substract from the given number its integer part,
or take the remainder left over after integer division by 1. For terminating
decimals that have an infinite place-value representation in binary, these
operations can "reveal" the tiny error induced by floating-point rounding, as
substracting the higher bits representing the integral part and left-shifting
the mantissa by the number of leading zeros makes that error more significant
in the result :
```
(float64 mantissa can hold 53 bits)

     17.3 = 10001.010011001100110011001100110011001100110011001101₂ + ԑ
            ^---^ ^----------------------------------------------^
              5                          48

17.3 - 17 =     0.010011001100110011001100110011001100110011001101000000₂ + ԑ
                  -^----------------------------------------------|----^
                                         48                          5

      0.3 =     0.010011001100110011001100110011001100110011001100110011₂ + ԑԑ
                   ^---------------------------------------------------^
                                         53

       ԑԑ < ԑ

The fractional part of  0.3 has 53 bits of precision
The fractional part of  1.3 has 52 bits of precision
The fractional part of 17.3 has 48 bits of precision
...
```

Since the magnitude of such error grows with the magnitude of the integer part,
unintuitive situations can arise.

When `x` is a (terminating decimal) number literal, or when its decimals are
deterministically fixed, and when its base 10 representation matches exactly
the value to be used, then you can set the `literal` parameter to `true` to make
modf/fpart reinterpret the decimals of `x` in order to get the most accurate
fractional part, eg.

```js
let x, xf;

x = 1.2;
xf = fpart(x));             // 0.19999999999999996
xf = fpart(x, true));       // 0.2

x = 2.2;
xf = fpart(x);              // 0.20000000000000018
xf = fpart(x, true);        // 0.2

x = 2**48 + 0.2;
xf = 10 * fpart(x));        // 1.875
xf = 10 * fpart(x, true));  // 2
```

**Always leave the `literal` parameter to `false` when `x` is the result of
previous calculations (except for rare cases where its value is deterministic
like in the last example above).**
