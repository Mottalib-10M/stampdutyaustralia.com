// Ranking for one price and profile: where duty is lowest and highest.
import { PRICE, aud, BUYERS, buyerOf } from './_kit';
import { compareAll } from '../engine/states';
import { STATE_INFO } from '../engine/params';
export default () => ({
  title: 'Cheapest and dearest state for this purchase',
  cta: 'See all eight states',
  inputs: [PRICE(800000), { id: 'b', label: 'Buyer', def: 2, options: BUYERS }],
  run: ({ p, b }: Record<string, number>) => {
    const rows = compareAll({ price: p, buyer: buyerOf(b), property: 'established', foreign: false });
    const lo = rows[0], hi = rows[rows.length - 1];
    return { head: [`Lowest: ${STATE_INFO[lo.state].short}`, aud(lo.total)] as [string, string], rows: [[`Highest: ${STATE_INFO[hi.state].short}`, aud(hi.total)], ['Gap', aud(hi.total - lo.total)], ['Median of the eight', aud((rows[3].total + rows[4].total) / 2)]] as [string, string][] };
  },
});
