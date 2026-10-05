// Price pages: one state, one price, the four buyer profiles side by side.
import { PRICE, STATE, run, stateOf, aud } from './_kit';
export default () => ({
  title: 'This price in one state, four buyer profiles',
  cta: 'Compare all states',
  inputs: [PRICE(750000), STATE('vic')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s);
    return { head: ['Investor', aud(run(st, p, 'investor').total)] as [string, string], rows: [['Home buyer, not first', aud(run(st, p, 'owner').total)], ['First home buyer, established', aud(run(st, p, 'first').total)], ['First home buyer, new home', aud(run(st, p, 'first', 'new').total)], ['Foreign investor', aud(run(st, p, 'investor', 'established', true).total)]] as [string, string][] };
  },
});
