/**
 * Return the integral and fractional parts of the given number.
 *
 * @param x - The input number.
 * @returns A tuple `[ipart, fpart]`, respectively the integral and fractional
 * parts of `x`.
 */
export function modf(x: number): [number, number] {
  if (!Number.isFinite(x)) {
    return [NaN, NaN];
  }

  const sign = Math.sign(x);
  const ipart = Math.trunc(x);
  let fpart;

  if (ipart === x) {
    fpart = sign * 0;
  }
  else if (ipart === 0) {
    fpart = x;
  }
  else {
    // NB. Exponential notation with a positive exponent (|x| ≥ 1e+21) implies
    // there is no room for the significand to encode a fractional part, so any
    // number represented that way is an integer (1st condition).
    // If represented with a negative exponent (|x| < 1e-6), then the integer
    // part of the number always equals ±0 (2nd condition).
    // When neither condition is satisfied then the string representation always
    // takes the form `${ipart}.${decimals}`.
    const decimals = x.toString().split('.')[1];
    fpart = sign * Number(`0.${decimals}`);
  }

  return [ipart, fpart];
}

/**
 * Return the integral part of the given number.
 *
 * @param x - The input number.
 * @returns The integer part of `x`.
 */
export const ipart = (x: number): number => {
  if (Number.isFinite(x)) {
    return Math.trunc(x);
  }
  return NaN;
}

/**
 * Return the fractional part of the given number.
 *
 * @param x - The input number
 * @returns The fractional part of `x`.
 */
export const fpart = (x: number): number => modf(x)[1];
