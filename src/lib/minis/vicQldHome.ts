// Owner-occupier concessions side by side: Victoria (PPR, first home) and Queensland (home, first home).
import { PRICE, aud, BUYERS, buyerOf, PROPS, propOf, run } from './_kit';
export default () => ({
  title: 'Living in it: Victoria and Queensland side by side',
  cta: 'Compare all eight states',
  inputs: [PRICE(550000), { id: 'b', label: 'Buyer', def: 2, options: BUYERS }, { id: 't', label: 'Property', def: 1, options: PROPS.slice(0, 3) }],
  run: ({ p, b, t }: Record<string, number>) => {
    const buyer = buyerOf(b), prop = propOf(t);
    const v = run('vic', p, buyer, prop), q = run('qld', p, buyer, prop);
    const vi = run('vic', p, 'investor', prop), qi = run('qld', p, 'investor', prop);
    return {
      head: ['Victoria', aud(v.total)] as [string, string],
      rows: [['Victorian rule', v.rule], ['Queensland', aud(q.total)], ['Queensland rule', q.rule], ['Investor at this price (VIC / QLD)', `${aud(vi.total)} / ${aud(qi.total)}`]] as [string, string][],
    };
  },
});
