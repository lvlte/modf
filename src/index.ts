/**
 * Return the integral and fractional parts of the given number. Both parts
 * have the same sign as the input.
 *
 * If `literal` is set to `true` the fractional part is reinterpreted by reading
 * the decimals in the base 10 string representation of `x` (safe if `x` is a
 * number literal or if its value is deterministic, and if its representation
 * matches exactly the value to be used).
 *
 * @param x - The input number.
 * @param literal - Whether to read `x` as a base 10 literal (default: `false`).
 * @returns A tuple `[ipart, fpart]`, respectively the integral and fractional
 * parts of `x`, or `[NaN, NaN]` if `x` is not a finite number.
 */
export function modf(x: number, literal: boolean = false): [number, number] {
  if (!Number.isFinite(x)) {
    return [NaN, NaN];
  }

  const sign = Math.sign(x);
  const ipart = Math.trunc(x);
  let fpart: number;

  if (ipart === x) {
    fpart = sign * 0;
  }
  else if (ipart === 0) {
    fpart = x;
  }
  else if (literal) {
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
  else {
    fpart = x - ipart;
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
 * @param x - The input number.
 * @param literal - Whether to read `x` as a base 10 literal (default: `false`).
 * @returns The fractional part of `x`.
 * @see {@link modf} for further information.
 */
export const fpart = (x: number, literal: boolean = false): number => {
  if (literal) {
    return modf(x, true)[1];
  }
  return Number.isFinite(x) ? x % 1 : NaN;
}
