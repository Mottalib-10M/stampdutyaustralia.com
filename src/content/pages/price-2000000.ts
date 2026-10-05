import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'VIC'], ['qld', 'QLD'], ['wa', 'WA'], ['sa', 'SA'], ['tas', 'TAS'], ['act', 'ACT'], ['nt', 'NT']] as const;

export default definePage({
  id: 'price-2000000',
  path: '/prices/stamp-duty-on-2000000/',
  group: 'prices',
  kind: 'price',
  order: 90,
  mini: 'priceCheck',
  nav: 'Duty on $2 million',
  card: 'Stamp duty on $2 million: the start of the Victorian 6.5 % band, the SA seniors relief cap and NSW as the dearest for foreign buyers.',
  title: 'Stamp Duty on $2 Million 2026: Premium Bands by State',
  description: 'Stamp duty on $2 million in 2026: $110,000 in Victoria where the 6.5% band begins, $103,830 in SA, equal to its seniors relief cap, and $85,185 in Tasmania.',
  h1: 'Stamp duty on $2 million',
  intro: 'Two million dollars is a threshold in its own right in Victoria and, indirectly, in South Australia. What each state charges at this price and how the top of the market is taxed.',
  resume: (h) => `Two million dollars is the last price at which Victoria charges a flat ${h.pct(h.P.states.vic.brackets[3].rate)} of the value: the bill is ${h.duty('vic', 2000000)}, and from the next dollar each extra $100 costs $${h.num(h.P.states.vic.brackets[4].rate * 100, 2)} on top of that ${h.aud(h.P.states.vic.brackets[4].base)} base. South Australia gives this figure a second meaning. Its scale charges ${h.duty('sa', 2000000)} on ${h.aud(2000000)}, and that is exactly the maximum relief RevenueSA announced on 28 April 2026 for seniors downsizing into a new home, which also confirms that the SA scale has not been indexed. At this price Tasmania is the cheapest state for an Australian buyer, ${h.duty('tas', 2000000)}, thanks to a top rate of $${h.num(h.P.states.tas.brackets[6].rate * 100, 2)} per $100. Foreign buyers see the widest gap of any profile at this price: ${h.duty('act', 2000000, 'investor', 'established', true)} in the ACT, with no surcharge, against ${h.duty('nsw', 2000000, 'investor', 'established', true)} in NSW.`,
  faqs: (h) => [
    { q: 'What does the Victorian 6.5 % band mean for a home above $2 million?', a: `Up to ${h.aud(h.P.states.vic.brackets[4].from)} Victoria charges ${h.pct(h.P.states.vic.brackets[3].rate)} of the whole value, which is ${h.duty('vic', 2000000)} at that figure. Above it, duty is ${h.aud(h.P.states.vic.brackets[4].base)} plus ${h.pct(h.P.states.vic.brackets[4].rate)} of the excess, so a ${h.aud(2500000)} house costs ${h.duty('vic', 2500000)}. The join is seamless; the marginal rate simply rises by one percentage point.` },
    { q: 'Why is the SA seniors downsizing relief capped at the duty on $2 million?', a: `RevenueSA set the maximum relief at ${h.aud(h.P.states.sa.seniors_max_relief)}, and its conveyance scale gives exactly ${h.duty('sa', 2000000)} on ${h.aud(2000000)}. Whatever the policy reasoning, the effect is that the cap is tied to that price. The relief applies to contracts from ${h.date(h.P.states.sa.seniors_from)}, for buyers aged 60 or over selling their home and buying new or land to build on.` },
    { q: 'Which state charges a foreign buyer the most on a $2 million home?', a: `New South Wales, at ${h.duty('nsw', 2000000, 'investor', 'established', true)}, just ahead of Victoria's ${h.duty('vic', 2000000, 'investor', 'established', true)}. NSW's ${h.pct(h.P.states.nsw.surcharge, 0)} surcharge purchaser duty is the highest foreign surcharge of the eight, and at this price it outweighs Victoria's heavier ordinary scale. The ACT and the Northern Territory add nothing, so the same purchase costs ${h.duty('act', 2000000, 'investor', 'established', true)} and ${h.duty('nt', 2000000, 'investor', 'established', true)} there.` },
  ],
  body: (h) => `
<h2>The top of the market, state by state</h2>
${h.table(['State', 'Owner-occupier', 'Investor', 'Foreign investor', 'First home buyer, new home'], [...ST].sort((x, y) => h.calc(x[0], 2000000).total - h.calc(y[0], 2000000).total).map(([s, n]) => [n, h.duty(s, 2000000, 'owner'), h.duty(s, 2000000, 'investor'), h.duty(s, 2000000, 'investor', 'established', true), h.duty(s, 2000000, 'first', 'new')]), 'Duty on $2,000,000, 2026-27, ordered by the owner-occupier column', ['l', 'r', 'r', 'r', 'r'])}
<p>The owner-occupier spread is ${h.aud(h.calc('vic', 2000000).total - h.calc('tas', 2000000).total)}. Queensland is no longer cheapest, because its top marginal rate of $${h.num(h.P.states.qld.brackets[4].rate * 100, 2)} has been running for a full million dollars, and its home concession is worth the same fixed ${h.aud(h.calc('qld', 2000000).saving)} it was at ${h.aud(600000)}.</p>

<h2>Where the higher bands sit</h2>
<p>Three scales still have a step at or above this price. Victoria's begins here, at ${h.aud(h.P.states.vic.brackets[4].from)}. NSW's premium property duty starts much further up, at ${h.aud(h.P.states.nsw.premium_threshold)} for 2026-27, with $${h.num(h.P.states.nsw.brackets[6].rate * 100, 2)} per $100 above it. The Northern Territory raises its flat percentage at ${h.aud(h.P.states.nt.flat_bands[1].from)} and again at ${h.aud(h.P.states.nt.flat_bands[2].from)}. The other jurisdictions have no further step: South Australia's last band starts at ${h.aud(h.P.states.sa.brackets[8].from)}, Tasmania's at ${h.aud(h.P.states.tas.brackets[6].from)}, WA's at ${h.aud(h.P.states.wa.brackets[4].from)}, and the ACT is already on its flat ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)}.</p>
${h.table(['Price', 'NSW', 'VIC', 'NT'], [2000000, 3000000, 4000000, 5000000].map((p) => [h.aud(p), h.duty('nsw', p), h.duty('vic', p), h.duty('nt', p)]), 'The three scales with steps above $2 million', ['l', 'r', 'r', 'r'])}

<h2>South Australia and the seniors relief</h2>
<p>RevenueSA's notice of 28 April 2026 introduced a stamp duty relief for buyers aged 60 and over who sell their principal place of residence and buy a new home, an off-the-plan apartment or land to build on, on a smaller block, for contracts from ${h.date(h.P.states.sa.seniors_from)}. The relief is capped at ${h.aud(h.P.states.sa.seniors_max_relief)}, the duty on a ${h.aud(2000000)} purchase. We have not read the detailed conditions, so the calculator does not apply it; the ${h.a('pensioner-downsizer-stamp-duty', 'downsizer page')} sets out what is known.</p>

<h2>First home buyers at this level</h2>
<p>A first home buyer at ${h.aud(2000000)} still pays nothing on a new home in Queensland and South Australia, and on any home in the ACT if eligible for its scheme. Everywhere else the full scale applies, although the Northern Territory's ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant on a new home has no price cap, worth slightly more than half the Territory duty at this price.</p>

<h2>Lower prices</h2>
<p>The ${h.a('price-1500000', '$1.5 million page')} covers the ACT's flat rate threshold and the NSW ${h.pct(h.P.states.nsw.brackets[5].rate)} band. Every other price, from ${h.aud(500000)} up, is on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-1500000', 'prices', 'vic', 'sa', 'foreign-buyer-stamp-duty', 'pensioner-downsizer-stamp-duty'],
  sources: ['vic_general', 'sa_rates', 'sa_seniors', 'nsw_rates', 'nsw_spd', 'tas_rates', 'nt_calc'],
});
