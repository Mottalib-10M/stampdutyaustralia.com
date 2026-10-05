/**
 * Stamp duty in the eight states and territories, for a contract signed in 2026-27 (on or after
 * 1 August 2026 for Queensland's citizenship rule). One pure function per jurisdiction, all fed by
 * `params-2026.json`. Each result names the rule that produced the figure (RECETTE §17.3).
 *
 * Simplifications, all stated on the methodology page:
 *  - one buyer profile for the whole purchase (no mixed shares, no shared equity);
 *  - "foreign" means every buyer is a foreign person (no citizen or permanent resident buying);
 *  - residential property only; no primary production, no business use.
 */
import { P, type StateCode, STATE_INFO } from './params';
import { scale, perHundredAbove, cents, type Rounding } from './duty';
import type { Bracket } from './params';

export type Buyer = 'first' | 'owner' | 'investor';
export type Property = 'established' | 'new' | 'vacant' | 'offplan';

export interface Options {
  /** VIC off the plan: construction cost still to be incurred after the contract date ($). */
  vicConstruction?: number;
  /** WA off the plan: stage of the development at contract date. */
  waOtpStage?: 'none' | 'pre' | 'under';
  /** WA: home north of the 26th parallel (first home owner grant cap). */
  waNorth?: boolean;
  /** ACT: unit-titled apartment or townhouse (off-the-plan and newly unit-titled exemptions). */
  actUnit?: boolean;
  /** VIC, ACT: eligible pensioner or concession card holder buying a home. */
  pensioner?: boolean;
  /** NT: house and land package bought from a building contractor in one contract. */
  ntPackage?: boolean;
}

export interface Input { price: number; buyer: Buyer; property: Property; foreign: boolean; options?: Options }

export interface Grant { amount: number; name: string; note?: string }

export interface Result {
  state: StateCode;
  price: number;
  /** Value duty is charged on (may be lower than the price: VIC off the plan). */
  dutiable: number;
  /** Duty at the general (investor) scale, before any concession. */
  generalDuty: number;
  /** Duty actually payable after the concession, surcharge excluded. */
  duty: number;
  surcharge: number;
  total: number;
  /** What the concession saves against the general scale. */
  saving: number;
  /** The rule that produced `duty`, in plain words. */
  rule: string;
  grant: Grant;
  notes: string[];
}

const S = P.states;
const sc = (b: Bracket[], v: number, r: string, min = 0) => scale(b, v, r as Rounding, min);
const isHome = (p: Property) => p !== 'vacant';
const isNew = (p: Property) => p === 'new' || p === 'offplan';
const NO_GRANT: Grant = { amount: 0, name: '' };

function finish(state: StateCode, i: Input, dutiable: number, general: number, duty: number, surcharge: number, rule: string, grant: Grant, notes: string[]): Result {
  duty = cents(Math.max(0, duty));
  surcharge = cents(surcharge);
  general = cents(general);
  return { state, price: i.price, dutiable, generalDuty: general, duty, surcharge, total: cents(duty + surcharge), saving: cents(Math.max(0, general - duty)), rule, grant, notes };
}

export function nsw(i: Input): Result {
  const s = S.nsw, v = i.price, notes: string[] = [];
  const duty = (x: number) => sc(s.brackets, x, s.rounding, s.minimum);
  const general = duty(v);
  let d = general, rule = v > s.premium_threshold ? 'General scale with premium property duty above the premium threshold' : 'General transfer duty scale';
  const f = s.fhbas;
  if (i.buyer === 'first' && !i.foreign) {
    const [ex, cap] = isHome(i.property) ? [f.home_exempt_to, f.home_cap] : [f.land_exempt_to, f.land_cap];
    if (v <= ex) { d = 0; rule = 'First Home Buyers Assistance Scheme: full exemption'; }
    else if (v < cap) { d = general - duty(ex) * (cap - v) / (cap - ex); rule = 'First Home Buyers Assistance Scheme: concessional rate'; }
    else rule = 'Above the First Home Buyers Assistance Scheme cap: general scale';
  }
  const sur = i.foreign ? s.surcharge * v : 0;
  let grant = NO_GRANT;
  if (i.buyer === 'first' && !i.foreign) {
    if (isNew(i.property) && v <= s.fhog.new_home_cap) grant = { amount: s.fhog.amount, name: 'First Home Owner (New Homes) Grant' };
    else if (i.property === 'vacant') notes.push('Building a home on this land: the grant needs land plus building contract at or under the build cap.');
  }
  return finish('nsw', i, v, general, d, sur, rule, grant, notes);
}

export function vic(i: Input): Result {
  const s = S.vic, notes: string[] = [];
  const deduction = i.property === 'offplan' ? Math.min(Math.max(i.options?.vicConstruction ?? 0, 0), i.price) : 0;
  const dv = i.price - deduction;
  const general = sc(s.brackets, i.price, s.rounding);
  const gen = (x: number) => sc(s.brackets, x, s.rounding);
  let d = gen(dv), rule = deduction ? 'Off-the-plan concession, then general scale' : 'General land transfer duty scale';
  const phase = (ex: number, cap: number, label: string) => {
    if (dv <= ex) { d = 0; rule = `${label}: full exemption`; }
    // SRO's calculator rounds the duty to the dollar and the reduction UP to the dollar
    // ($650,000 → $11,356; $749,999 → $40,069, both checked on 5 October 2026).
    else if (dv <= cap) { const g = gen(dv); d = Math.round(g) - Math.ceil(g * (cap - dv) / (cap - ex) - 1e-9); rule = `${label}: concession`; }
  };
  if (i.buyer === 'first' && !i.foreign) phase(s.fhb.exempt_to, s.fhb.cap, 'First home buyer duty exemption or concession');
  else if (i.buyer === 'owner' && i.options?.pensioner && !i.foreign) phase(s.pensioner.exempt_to, s.pensioner.cap, 'Pensioner and concession card holder duty reduction');
  if (i.buyer !== 'investor' && d === gen(dv) && dv > s.ppr_from && dv <= s.ppr_to) {
    d = sc(s.ppr_brackets, dv, s.rounding); rule = 'Principal place of residence concession';
  }
  if (deduction) notes.push('Off the plan: duty is charged on the price less the construction cost still to come.');
  const sur = i.foreign ? s.surcharge * i.price : 0;
  const grant = i.buyer === 'first' && !i.foreign && isNew(i.property) && i.price <= s.fhog.cap ? { amount: s.fhog.amount, name: 'First Home Owner Grant' } : NO_GRANT;
  return finish('vic', i, dv, general, d, sur, rule, grant, notes);
}

export function qld(i: Input): Result {
  const s = S.qld, v = i.price, notes: string[] = [];
  const general = sc(s.brackets, v, s.rounding);
  let d = general, rule = 'General transfer duty scale';
  if (!i.foreign) {
    if (i.buyer === 'first') {
      if (i.property === 'vacant') { d = 0; rule = 'First home vacant land concession: full, no value cap'; }
      else if (isNew(i.property)) { d = 0; rule = 'First home (new home) concession: full, no value cap'; }
      else {
        const home = sc(s.home_brackets, v, s.rounding);
        const row = s.first_home_table.find((r) => v < r.below);
        d = Math.max(0, home - (row?.deduct ?? 0));
        rule = row ? 'Home concession rate less the first home concession amount' : 'Home concession rate (first home concession ends at $800,000)';
      }
    } else if (i.buyer === 'owner' && isHome(i.property)) { d = sc(s.home_brackets, v, s.rounding); rule = 'Home concession rate'; }
  } else if (i.buyer !== 'investor') notes.push('From 1 August 2026 the home concessions need an Australian citizen, permanent resident or specified foreign retiree.');
  const sur = i.foreign ? s.surcharge * v : 0;
  const grant = i.buyer === 'first' && !i.foreign && isNew(i.property) && v < s.fhog.below ? { amount: s.fhog.amount, name: 'First Home Owner Grant' } : NO_GRANT;
  return finish('qld', i, v, general, d, sur, rule, grant, notes);
}

export function wa(i: Input): Result {
  const s = S.wa, v = i.price, notes: string[] = [];
  const general = sc(s.brackets, v, s.rounding);
  let d = general, rule = 'General rate of transfer duty';
  if (i.buyer !== 'investor' && isHome(i.property) && v <= s.concessional_cap) {
    d = Math.min(d, sc(s.concessional_brackets, v, s.rounding)); rule = 'Concessional rate (principal place of residence up to the concessional cap)';
  }
  const f = s.fhor;
  if (i.buyer === 'first' && !i.foreign) {
    const [ex, cap, rate] = isHome(i.property) ? [f.home_exempt_to, f.home_cap, f.home_rate] : [f.land_exempt_to, f.land_cap, f.land_rate];
    if (v <= ex) { d = 0; rule = 'First home owner rate: no duty'; }
    else if (v <= cap) { d = perHundredAbove(v, ex, rate); rule = 'First home owner rate'; }
    else rule = 'Above the first home owner rate cap: general rate';
  } else if (i.property === 'offplan' && (i.options?.waOtpStage ?? 'none') !== 'none') {
    const o = s.otp, st = i.options!.waOtpStage === 'pre' ? o.pre : o.under;
    const share = v <= o.full_to ? st.max : v >= o.floor_from ? st.min : st.max - st.step_per_100 * ((v - o.full_to) / 100);
    const off = Math.min(d * share, o.cap);
    d -= off; rule = `Off-the-plan duty concession (${Math.round(share * 1000) / 10}% of duty, capped)`;
  }
  const sur = i.foreign ? s.surcharge * v : 0;
  const cap = i.options?.waNorth ? s.fhog.cap_north : s.fhog.cap_south;
  const grant = i.buyer === 'first' && !i.foreign && isNew(i.property) && v <= cap ? { amount: s.fhog.amount, name: 'First Home Owner Grant' } : NO_GRANT;
  if (i.buyer === 'first' && i.property === 'offplan') notes.push('A first home bought off the plan may also meet the off-the-plan concession; RevenueWA decides how the two combine.');
  return finish('wa', i, v, general, d, sur, rule, grant, notes);
}

export function sa(i: Input): Result {
  const s = S.sa, v = i.price, notes: string[] = [];
  const general = sc(s.brackets, v, s.rounding);
  let d = general, rule = 'Stamp duty scale on conveyances';
  if (i.buyer === 'first' && !i.foreign) {
    if (i.property !== 'established') { d = 0; rule = 'First home buyer relief: full, no value cap'; }
    else rule = 'No first home relief on established homes';
  }
  const sur = i.foreign ? s.surcharge * v : 0;
  let grant = NO_GRANT;
  if (i.buyer === 'first' && !i.foreign && isNew(i.property)) grant = { amount: s.fhog.amount, name: 'First Home Owner Grant' };
  if (i.buyer === 'first' && !i.foreign && i.property === 'vacant') notes.push('The grant does not apply to the land alone; a building contract can make you eligible.');
  return finish('sa', i, v, general, d, sur, rule, grant, notes);
}

export function tas(i: Input): Result {
  const s = S.tas, v = i.price, notes: string[] = [];
  const general = sc(s.brackets, v, s.rounding, s.minimum);
  const d = general;
  const rule = i.buyer === 'first' ? 'General scale: the established-home exemption ended for settlements after 30 June 2026' : 'Property transfer duty scale';
  const sur = i.foreign ? s.surcharge * v : 0;
  const grant = i.buyer === 'first' && !i.foreign && isNew(i.property) ? { amount: s.fhog.amount, name: 'First Home Owner Grant' } : NO_GRANT;
  return finish('tas', i, v, general, d, sur, rule, grant, notes);
}

export function act(i: Input): Result {
  const s = S.act, v = i.price, notes: string[] = [];
  const general = sc(s.investor_brackets, v, s.rounding);
  let d = general, rule = 'Non-owner-occupier conveyance duty rates';
  if (i.buyer !== 'investor') {
    d = sc(s.owner_brackets, v, s.rounding); rule = 'Owner-occupier conveyance duty rates';
    if (i.buyer === 'first') { d = 0; rule = 'Home Buyer Concession Scheme: full exemption, no income or value limit'; }
    else if (i.options?.pensioner) { d = 0; rule = 'Pensioner Duty Concession Scheme: full exemption'; }
    else if (i.options?.actUnit && i.property === 'offplan') { d = 0; rule = 'Off the plan unit duty exemption (owner-occupier)'; }
    else if (i.options?.actUnit && i.property === 'new') { d = 0; rule = 'Newly unit titled duty exemption (owner-occupier, bought from the developer)'; }
  }
  if (i.buyer === 'first') notes.push('The Home Buyer Concession Scheme needs no interest in any property in the 5 years before the contract.');
  return finish('act', i, v, general, d, 0, rule, NO_GRANT, notes);
}

export function ntDuty(v: number): number {
  const s = S.nt;
  if (v <= 0) return 0;
  if (v <= s.formula.upto) { const x = v / 1000; return s.formula.a * x * x + s.formula.b * x; }
  let rate = s.flat_bands[0].rate;
  for (const b of s.flat_bands) if (v >= b.from && v > s.formula.upto) rate = b.rate;
  return rate * v;
}

export function nt(i: Input): Result {
  const s = S.nt, v = i.price, notes: string[] = [];
  const general = ntDuty(v);
  let d = general, rule = 'Territory stamp duty formula';
  if (i.buyer !== 'investor' && i.property === 'new' && i.options?.ntPackage) { d = 0; rule = 'House and Land Package Exemption: no cap'; }
  let grant = NO_GRANT;
  if (!i.foreign && isNew(i.property)) {
    if (i.buyer === 'first') grant = { amount: s.fhog.amount, name: s.fhog.name };
    else if (i.buyer === 'owner') grant = { amount: s.freshstart.amount, name: 'FreshStart New Home Grant' };
  }
  return finish('nt', i, v, general, d, 0, rule, grant, notes);
}

export const CALC: Record<StateCode, (i: Input) => Result> = { nsw, vic, qld, wa, sa, tas, act, nt };

export function calculate(state: StateCode, i: Input): Result {
  return CALC[state]({ ...i, price: Math.max(0, i.price || 0) });
}

/** All eight jurisdictions for one purchase, cheapest first (total duty net of grant kept apart). */
export function compareAll(i: Input): Result[] {
  return (Object.keys(CALC) as StateCode[]).map((s) => calculate(s, i)).sort((a, b) => a.total - b.total || a.state.localeCompare(b.state));
}

export const surchargeName = (s: StateCode) => STATE_INFO[s].surchargeName;
