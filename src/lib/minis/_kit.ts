/** Shared bits for mini-calculators (ignored by the registry: "_" prefix). */
import { formatMoney, formatPercent, formatNumber } from '../format';
import { calculate, type Buyer, type Property } from '../engine/states';
import type { StateCode } from '../engine/params';
export const aud = (x: number) => formatMoney(Math.round(x), 0);
export const pct = (x: number, d = 1) => formatPercent(x, d);
export const num = (x: number, d = 0) => formatNumber(x, d);
export const BUYERS = [{ value: '1', label: 'First home buyer' }, { value: '2', label: 'Home buyer (not first)' }, { value: '3', label: 'Investor' }];
export const PROPS = [{ value: '1', label: 'Established home' }, { value: '2', label: 'New home' }, { value: '3', label: 'Vacant land' }, { value: '4', label: 'Off the plan' }];
export const buyerOf = (n: number): Buyer => (n === 1 ? 'first' : n === 2 ? 'owner' : 'investor');
export const propOf = (n: number): Property => (n === 2 ? 'new' : n === 3 ? 'vacant' : n === 4 ? 'offplan' : 'established');
export const run = (state: StateCode, price: number, buyer: Buyer, property: Property = 'established', foreign = false, options = {}) => calculate(state, { price, buyer, property, foreign, options });
export const PRICE = (def: number, label = 'Purchase price') => ({ id: 'p', label, def, unit: '$', max: 50_000_000 });
import { STATES, STATE_INFO } from '../engine/params';
export const STATE_OPTS = STATES.map((s, i) => ({ value: String(i + 1), label: STATE_INFO[s].name }));
export const stateOf = (n: number): StateCode => STATES[Math.min(Math.max(Math.round(n) - 1, 0), STATES.length - 1)];
export const STATE = (def: StateCode) => ({ id: 's', label: 'State or territory', def: STATES.indexOf(def) + 1, options: STATE_OPTS });
export const YESNO = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
