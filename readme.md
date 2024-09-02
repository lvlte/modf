# modf

> Get the integral and fractional parts of a given number, without loss of precision.

## Install

```sh
npm install @lvlte/modf
```

## Usage

Import :

```js
// ESM
import { modf } from '@lvlte/modf';
```
Or
```js
// CJS
const { modf } = require('@lvlte/modf');
```

Example :

```js
const x = 1.3;

// We are used to :
console.log(Math.trunc(x));     // (integer part)     1
console.log(x - Math.trunc(x)); // (fractional part)  0.30000000000000004
console.log(x % 1);             // (fractional part)  0.30000000000000004

// But we can use modf() to avoid precision loss :
const [ipart, fpart] = modf(x);
console.log(ipart);             // (integer part)     1
console.log(fpart);             // (fractional part)  0.3
```
