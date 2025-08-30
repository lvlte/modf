# modf

> Get the integral and fractional parts of a given number, without floating-point rounding error.

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
const x = 1.3;
console.log(modf(x));   // [1, 0.3]
console.log(ipart(x));  // 1
console.log(fpart(x));  // 0.3
```

## Why ?

Getting the integer part of a number is trivial. However when it comes to the
fractional part, we usually substract from the given number its integer part, or
take the remainder left over after integer division by 1. Both methods involve
an operation, which can induce a tiny error due to floating-point rounding.
Since the magnitude of such error grows with the magnitude of the integer part,
unintuitive situations can arise. Using `modf()` or `fpart()` can prevent that :

```js
let x = 1.2;
console.log(x - Math.trunc(x));         // 0.19999999999999996
console.log(x % 1);                     // 0.19999999999999996
console.log(fpart(x));                  // 0.2

x = 2.2;
console.log(x - Math.trunc(x));         // 0.20000000000000018
console.log(x % 1);                     // 0.20000000000000018
console.log(fpart(x));                  // 0.2

x = 2**48 + 0.2;
console.log(10 * (x - Math.trunc(x)));  // 1.875
console.log(10 * (x % 1));              // 1.875
console.log(10 * fpart(x));             // 2
```
