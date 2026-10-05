// First Home Owner Grant (and NT grants) by state for a new home.
import { PRICE, STATE, run, stateOf, aud } from './_kit';
export default () => ({
  title: 'Grant on a new home in your state',
  cta: 'See the full state calculator',
  inputs: [PRICE(650000, 'Price of the new home'), STATE('qld')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s), r = run(st, p, 'first', 'new');
    return { head: [r.grant.amount ? r.grant.name : 'Grant', aud(r.grant.amount)] as [string, string], rows: [['Duty on this new first home', aud(r.total)], ['Duty minus grant', aud(r.total - r.grant.amount)], ['Duty rule', r.rule]] as [string, string][], note: r.grant.amount ? undefined : 'No grant at this price or in this jurisdiction.' };
  },
});
