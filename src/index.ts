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

  const str = x.toString();
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
    // NB. Exponential notation with positive exponent (≥ e+21) implies that
    // there is no room for the significand to encode a fractional part, any
    // number represented that way is an integer (1st condition).
    // If represented with a negative exponent (≤ 1e-7), then its integer part
    // equals ±0 (2nd condition).
    // When neither condition is satisfied then the string representation takes
    // the form `<ipart>.<fpart>`.
    fpart = sign * +`.${str.split('.')[1]}`;
  }

  return [ipart, fpart];
}
