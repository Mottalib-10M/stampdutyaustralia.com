// Vacant land: duty for an investor vs a first home buyer who will build.
import { PRICE, STATE, run, stateOf, aud } from './_kit';
export default () => ({
  title: 'Duty on a block of land',
  cta: 'Open the state calculator',
  inputs: [PRICE(400000, 'Land price'), STATE('wa')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s), fh = run(st, p, 'first', 'vacant'), inv = run(st, p, 'investor', 'vacant');
    return { head: ['First home buyer building', aud(fh.total)] as [string, string], rows: [['Buyer who is not a first home buyer', aud(run(st, p, 'owner', 'vacant').total)], ['Investor', aud(inv.total)], ['Rule for the first home buyer', fh.rule]] as [string, string][] };
  },
});
