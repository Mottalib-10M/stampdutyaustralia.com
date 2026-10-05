// ACT unit-titled exemptions for owner-occupiers from 1 July 2026.
import { aud, run } from './_kit';
export default () => ({
  title: 'ACT apartment or townhouse, owner-occupier',
  cta: 'ACT stamp duty calculator',
  inputs: [{ id: 'p', label: 'Price', def: 720000, unit: '$', max: 50_000_000 }, { id: 't', label: 'Bought', def: 1, options: [{ value: '1', label: 'Off the plan' }, { value: '2', label: 'New, from the developer' }, { value: '3', label: 'Established' }] }],
  run: ({ p, t }: Record<string, number>) => {
    const prop = t === 1 ? 'offplan' : t === 2 ? 'new' : 'established';
    const r = run('act', p, 'owner', prop, false, { actUnit: true }), inv = run('act', p, 'investor', prop);
    return { head: ['Owner-occupier pays', aud(r.total)] as [string, string], rows: [['Rule', r.rule], ['Investor, same unit', aud(inv.total)]] as [string, string][] };
  },
});
