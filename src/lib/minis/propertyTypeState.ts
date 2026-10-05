// Same first home budget, three property types: established, new, vacant land.
import { PRICE, STATE, run, stateOf, aud } from './_kit';
export default () => ({
  title: 'Established, new or land: duty for a first home',
  cta: 'Open the state calculator',
  inputs: [PRICE(600000), STATE('sa')],
  run: ({ p, s }: Record<string, number>) => {
    const st = stateOf(s);
    const e = run(st, p, 'first', 'established'), n = run(st, p, 'first', 'new'), v = run(st, p, 'first', 'vacant');
    return { head: ['New home', aud(n.total)] as [string, string], rows: [['Established home', aud(e.total)], ['Vacant land at this price', aud(v.total)], ['Grant on the new home', aud(n.grant.amount)]] as [string, string][] };
  },
});
