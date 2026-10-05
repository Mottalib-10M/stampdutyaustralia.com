// Pensioner concessions where they exist in 2026-27 (VIC, ACT).
import { aud, run } from './_kit';
export default () => ({
  title: 'Pensioner buying a home: VIC and ACT',
  cta: 'Compare all states',
  inputs: [{ id: 'p', label: 'Price of the new home', def: 680000, unit: '$', max: 50_000_000 }],
  run: ({ p }: Record<string, number>) => {
    const v = run('vic', p, 'owner', 'established', false, { pensioner: true }), vn = run('vic', p, 'owner');
    const a = run('act', p, 'owner', 'established', false, { pensioner: true }), an = run('act', p, 'owner');
    return { head: ['Victoria, pensioner reduction', aud(v.total)] as [string, string], rows: [['Victoria without it', aud(vn.total)], ['ACT, pensioner scheme', aud(a.total)], ['ACT without it', aud(an.total)]] as [string, string][] };
  },
});
