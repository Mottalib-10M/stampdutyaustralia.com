/**
 * Sliding-scale arithmetic shared by every state.
 *
 * `per100`: the office's schedule says "for every $100, or part of $100": the amount above the
 * band's lower limit is rounded UP to the next whole $100 before the rate applies. Checked against
 * Revenue NSW's own calculator on 5 October 2026: $500,050 gives $16,691.50, i.e. 1,131 hundreds,
 * not 1,130.5. `exact`: the rate applies to the exact dollar amount (Victoria's SRO calculator
 * returns $37,073 for $700,055).
 */
import type { Bracket } from './params';

export type Rounding = 'per100' | 'exact';

export function bracketFor(brackets: Bracket[], value: number): Bracket {
  let b = brackets[0];
  for (const x of brackets) if (value > x.from) b = x;
  return b;
}

export function scale(brackets: Bracket[], value: number, rounding: Rounding, minimum = 0): number {
  if (value <= 0) return 0;
  const b = bracketFor(brackets, value);
  let duty: number;
  if (b.flat) duty = b.rate * value;
  else {
    const excess = value - b.from;
    const units = rounding === 'per100' ? Math.ceil(excess / 100) * 100 : excess;
    duty = b.base + b.rate * units;
  }
  return Math.max(duty, minimum);
}

/** Linear phase-in rate charged on each $100 or part above a threshold (WA first home owner rate). */
export function perHundredAbove(value: number, threshold: number, ratePerDollar: number): number {
  if (value <= threshold) return 0;
  return Math.ceil((value - threshold) / 100) * 100 * ratePerDollar;
}

/** Round a duty to cents, as the offices print it. Display code then drops the cents (RECETTE §4.1). */
export const cents = (x: number) => Math.round(x * 100) / 100;
