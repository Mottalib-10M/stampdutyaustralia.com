// Dutiable value: the higher of the price and the market value.
import { aud, STATE, stateOf, run } from './_kit';
export default () => ({
  title: 'Price or market value: which one is taxed',
  cta: 'Open the state calculator',
  inputs: [{ id: 'p', label: 'Price you pay', def: 500000, unit: '$', max: 50_000_000 }, { id: 'm', label: 'Market value (valuation)', def: 620000, unit: '$', max: 50_000_000 }, STATE('nsw')],
  run: ({ p, m, s }: Record<string, number>) => {
    const st = stateOf(s), dv = Math.max(p, m), onPrice = run(st, p, 'investor'), r = run(st, dv, 'investor');
    return { head: ['Duty on the dutiable value', aud(r.total)] as [string, string], rows: [['Dutiable value', aud(dv)], ['Duty if only the price counted', aud(onPrice.total)], ['Extra duty from the valuation', aud(r.total - onPrice.total)]] as [string, string][] };
  },
});
