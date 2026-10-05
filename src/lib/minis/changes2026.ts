// 2026 changes: the same first home in each state, before vs after the 2026 rule (current rule shown).
import { PRICE, aud, PROPS, propOf } from './_kit';
import { compareAll } from '../engine/states';
import { STATE_INFO } from '../engine/params';
export default () => ({
  title: 'First home buyer in 2026-27: duty in every state',
  cta: 'Compare all states',
  inputs: [PRICE(750000), { id: 't', label: 'Property', def: 1, options: PROPS }],
  run: ({ p, t }: Record<string, number>) => {
    const rows = compareAll({ price: p, buyer: 'first', property: propOf(t), foreign: false });
    const zero = rows.filter((r) => r.total === 0).map((r) => STATE_INFO[r.state].short);
    return { head: ['States charging nothing', zero.length ? zero.join(', ') : 'none'] as [string, string], rows: rows.filter((r) => r.total > 0).slice(0, 4).map((r) => [STATE_INFO[r.state].name, aud(r.total)]) as [string, string][] };
  },
});
