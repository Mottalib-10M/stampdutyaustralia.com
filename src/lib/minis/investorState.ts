// Investor vs owner-occupier in one state: what living in the property is worth.
import { PRICE, STATE, run, stateOf, aud } from './_kit';
export default () => ({
  title: 'Investor or owner-occupier: the duty gap',
  cta: 'Open the state calculator',
  inputs: [PRICE(650000), STATE('act')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s), inv = run(st, p, 'investor'), own = run(st, p, 'owner');
    return { head: ['Investor pays', aud(inv.total)] as [string, string], rows: [['Owner-occupier, not first home', aud(own.total)], ['Gap', aud(inv.total - own.total)], ['Owner-occupier rule', own.rule]] as [string, string][] };
  },
});
