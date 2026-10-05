// Foreign purchaser surcharge on top of duty, state by state.
import { PRICE, STATE, run, stateOf, aud, pct } from './_kit';
import { STATE_INFO } from '../engine/params';
export default () => ({
  title: 'Foreign buyer: duty plus surcharge',
  cta: 'Compare the eight states',
  inputs: [PRICE(900000), STATE('nsw')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s), f = run(st, p, 'investor', 'established', true);
    return { head: ['Total for a foreign buyer', aud(f.total)] as [string, string], rows: [['Duty at the general scale', aud(f.duty)], [STATE_INFO[st].surchargeName ? `Surcharge (${STATE_INFO[st].surchargeName})` : 'Surcharge', f.surcharge ? aud(f.surcharge) : 'none'], ['Share of the price', p > 0 ? pct(f.total / p) : '0'] ] as [string, string][] };
  },
});
