// WA first home owner rate (from 7 May 2026): home or land, with the grant cap south or north of the 26th parallel.
import { aud, run, YESNO } from './_kit';
export default () => ({
  title: 'WA first home owner rate on your price',
  cta: 'WA stamp duty calculator',
  inputs: [
    { id: 'p', label: 'Price', def: 700000, unit: '$', max: 50_000_000 },
    { id: 't', label: 'Buying', def: 1, options: [{ value: '1', label: 'Established home' }, { value: '2', label: 'New home' }, { value: '3', label: 'Vacant land to build on' }] },
    { id: 'n', label: 'North of the 26th parallel?', def: 0, options: YESNO },
  ],
  run: ({ p, t, n }: Record<string, number>) => {
    const prop = t === 2 ? 'new' : t === 3 ? 'vacant' : 'established';
    const r = run('wa', p, 'first', prop, false, { waNorth: !!n }), o = run('wa', p, 'owner', prop);
    return {
      head: ['Duty at the first home owner rate', aud(r.total)] as [string, string],
      rows: [['Same purchase at the general rate', aud(o.total)], ['Saved', aud(Math.max(0, o.total - r.total))], ['Rule', r.rule], ['First home owner grant', aud(r.grant.amount)]] as [string, string][],
    };
  },
});
