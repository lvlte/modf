import { modf } from '../src/index';

const fixture = {
  integers: [
    0,
    1,
    42,
    3141592653589793,
    1e21,
    9.123456789e21,
    1.414213562373095e42,
    3.141592653589793e256,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_VALUE,
  ],

  floats0: [
    0.1,
    0.0000000000000001,
    0.8333333333333334,
    0.9999999999999999,
    1.414213562373095e-7,
    3.141592653589793e-56,
    Math.LOG10E,
    Math.LN2,
    Math.SQRT1_2,
    Number.MIN_VALUE,
  ],

  // prettier-ignore
  floats1: [
    [1.1,                  1,                 0.1],
    [1.2,                  1,                 0.2],
    [100.3,                100,               0.3],
    [1.000000000000001,    1,                 0.000000000000001],
    [1.1666666666666667,   1,                 0.1666666666666667],
    [9.999999999999998,    9,                 0.999999999999998],
    [123456789.12345678,   123456789,         0.12345678],
    [999999999999999.9,    999999999999999,   0.9],
    [900719925474099.1,    900719925474099,   0.1],
    [Math.LOG2E,           1,                 0.4426950408889634],
    [Math.SQRT2,           1,                 0.4142135623730951],
    [Math.LN10,            2,                 0.302585092994046],
    [Math.E,               2,                 0.718281828459045],
    [Math.PI,              3,                 0.141592653589793],
  ],

  wrongTypes: [
    null,
    undefined,
    true,
    false,
    '42',
    42n,
    [42],
    { 42: 42 },
    () => 42,
    Symbol(42),
    new Date(42),
    new Number(42),
  ],

  edgeCases: [NaN, Infinity, -Infinity],
};

describe('Integers', () => {
  test.each(fixture.integers)('±%s', (x: number) => {
    x = Math.abs(x);
    expect(Number.isInteger(x)).toBe(true);
    expect(modf(x)).toStrictEqual([x, 0]);
    expect(modf(-x)).toStrictEqual([-x, -0]);
  });
});

describe('Floats with no integer part', () => {
  test.each(fixture.floats0)('±%s', (x: number) => {
    x = Math.abs(x);
    expect(Number.isInteger(x)).toBe(false);
    expect(x).toBeLessThan(1);
    expect(modf(x)).toStrictEqual([0, x]);
    expect(modf(-x)).toStrictEqual([-0, -x]);
  });
});

describe('Floats with non-zero integer part and fractional part', () => {
  test.each<number[]>(fixture.floats1)('±%s', (x, int, frac) => {
    x = Math.abs(x);
    expect(Number.isInteger(x)).toBe(false);
    expect(x).toBeGreaterThan(1);
    expect(modf(x)).toStrictEqual([int, frac]);
    expect(modf(-x)).toStrictEqual([-int, -frac]);
  });
});

describe('Wrong types', () => {
  test.each(fixture.wrongTypes)('%s', (x: any) => {
    expect(typeof x).not.toBe('number');
    expect(modf(x)).toStrictEqual([NaN, NaN]);
  });
});

describe('Edge cases', () => {
  test.each(fixture.edgeCases)('%s', (x: number) => {
    expect(Number.isFinite(x)).toBe(false);
    expect(modf(x)).toStrictEqual([NaN, NaN]);
  });
});
