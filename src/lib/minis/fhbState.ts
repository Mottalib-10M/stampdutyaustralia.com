// First home buyer vs ordinary home buyer in a chosen state: what the first home concession saves.
import { PRICE, STATE, run, stateOf, aud, PROPS, propOf } from './_kit';
export default () => ({
  title: 'What the first home concession is worth in your state',
  cta: 'Open the full calculator',
  inputs: [PRICE(700000), STATE('nsw'), { id: 't', label: 'Property', def: 1, options: PROPS }],
  run: ({ p, s, t }: Record<string, number>) => {
    const st = stateOf(s), prop = propOf(t);
    const fh = run(st, p, 'first', prop), oo = run(st, p, 'owner', prop);
    return { head: ['First home buyer pays', aud(fh.total)] as [string, string], rows: [['Same purchase, not a first home', aud(oo.total)], ['Saved by being a first home buyer', aud(Math.max(0, oo.total - fh.total))], ['Rule applied', fh.rule], ...(fh.grant.amount ? [[fh.grant.name, aud(fh.grant.amount)]] : [])] as [string, string][] };
  },
});
