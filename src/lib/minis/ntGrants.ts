// NT: duty on a new home and the HomeGrown / FreshStart grants.
import { aud, run, YESNO } from './_kit';
export default () => ({
  title: 'Northern Territory new home: duty and grant',
  cta: 'NT stamp duty calculator',
  inputs: [{ id: 'p', label: 'Price of the new home', def: 620000, unit: '$', max: 50_000_000 }, { id: 'f', label: 'First home?', def: 1, options: YESNO }, { id: 'k', label: 'House and land package from a builder?', def: 0, options: YESNO }],
  run: ({ p, f, k }: Record<string, number>) => {
    const r = run('nt', p, f ? 'first' : 'owner', 'new', false, { ntPackage: !!k });
    return { head: [r.grant.name || 'Grant', aud(r.grant.amount)] as [string, string], rows: [['Stamp duty', aud(r.total)], ['Grant minus duty', aud(r.grant.amount - r.total)], ['Duty rule', r.rule]] as [string, string][] };
  },
});
