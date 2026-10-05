import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nsw-foreign-purchaser',
  path: '/nsw/foreign-purchaser-surcharge/',
  group: 'nsw',
  kind: 'guide',
  order: 30,
  mini: 'foreignState',
  nav: 'NSW foreign purchaser surcharge',
  card: 'Surcharge purchaser duty at 9 % of the foreign buyer\'s share, on top of transfer duty, with joint purchase cases.',
  title: 'Surcharge Purchaser Duty NSW 2026: 9% for Foreign Buyers',
  description: 'Surcharge purchaser duty NSW 2026: 9% of the value of a foreign person\'s share, on top of transfer duty and not removed by the first home scheme. Worked cases.',
  h1: 'Surcharge purchaser duty for foreign buyers in NSW',
  intro: 'What a foreign person adds to the ordinary transfer duty when acquiring residential land in New South Wales, and how a mixed couple is charged.',
  resume: (h) => `Surcharge purchaser duty adds ${h.pct(h.P.states.nsw.surcharge, 0)} of the dutiable value to every NSW residential purchase made by a foreign person, charged on the share that person acquires and paid as well as ordinary transfer duty, not instead of it. On a ${h.aud(1000000)} house bought outright by a foreign investor the bill is ${h.duty('nsw', 1000000, 'investor', 'established', true)}: ${h.aud(h.calc('nsw', 1000000, 'investor', 'established', true).duty)} of transfer duty and ${h.aud(h.calc('nsw', 1000000, 'investor', 'established', true).surcharge)} of surcharge. Revenue NSW applies the surcharge to the foreign buyer's interest only, so where an Australian citizen and a foreign partner buy as equal joint tenants, the ${h.pct(h.P.states.nsw.surcharge, 0)} falls on half the value. The First Home Buyers Assistance Scheme can remove the transfer duty for an eligible couple, but it never removes the surcharge. A New Zealand citizen or a permanent resident who is not ordinarily resident in Australia can be charged surcharge duty even while qualifying for the first home scheme, a trap that catches buyers returning from abroad.`,
  faqs: (h) => [
    { q: 'How much surcharge purchaser duty is payable on a $750,000 NSW apartment?', a: `If one foreign person buys it alone, ${h.aud(h.calc('nsw', 750000, 'investor', 'established', true).surcharge)}, which is ${h.pct(h.P.states.nsw.surcharge, 0)} of the dutiable value. Transfer duty of ${h.aud(h.calc('nsw', 750000, 'investor').duty)} comes on top, for ${h.duty('nsw', 750000, 'investor', 'established', true)} in all. If the apartment is bought with an Australian citizen holding half, the surcharge halves and the transfer duty stays the same.` },
    { q: 'Can a permanent resident living overseas pay the NSW foreign surcharge?', a: 'Yes. Revenue NSW treats a permanent resident, or a New Zealand citizen, who is not ordinarily resident in Australia as a buyer who can be liable for surcharge purchaser duty. The same person may still meet the first home scheme tests, because those look at citizenship or residency status rather than where you live at the time. Both outcomes can arrive in the same assessment.' },
    { q: 'Does the NSW first home exemption cancel surcharge duty for my foreign partner?', a: `No. The FHBAS removes or reduces transfer duty; it has no effect on the surcharge. A citizen and a foreign partner buying a ${h.aud(700000)} first home as equal joint tenants may owe no transfer duty if every other condition is met, but the partner's half still carries ${h.aud(h.P.states.nsw.surcharge * 700000 / 2)} of surcharge.` },
    { q: 'Is NSW surcharge duty charged on premium property above the premium threshold?', a: `Yes, the surcharge rate is flat and sits on top of whatever the transfer duty scale produces, premium band included. At ${h.aud(4000000)} a foreign buyer pays ${h.aud(h.calc('nsw', 4000000, 'investor', 'established', true).duty)} of transfer duty, with the premium rate above ${h.aud(h.P.states.nsw.premium_threshold)}, plus ${h.aud(h.calc('nsw', 4000000, 'investor', 'established', true).surcharge)} of surcharge.` },
    { q: 'Can a foreign buyer defer NSW duty on an off-the-plan apartment?', a: 'No. The off-the-plan deferral requires every purchaser to be an Australian citizen or permanent resident, or to hold one of the visas Revenue NSW lists: a partner visa (subclass 309 or 820) or a New Zealand special category visa (subclass 444) with 200 days in Australia in the previous 12 months. A buyer who pays surcharge duty usually falls outside that list.' },
  ],
  body: (h) => `
<h2>Two duties on one contract</h2>
<p>The surcharge is easy to underestimate because it looks like a small rate next to the transfer duty scale. It is not small. Transfer duty in NSW works out at roughly ${h.pct(h.calc('nsw', 1000000, 'investor').duty / 1000000)} of the price on a ${h.aud(1000000)} home; the surcharge is a flat ${h.pct(h.P.states.nsw.surcharge, 0)} of the dutiable value from the first dollar, with no threshold and no taper. For a foreign buyer it is usually the larger of the two amounts.</p>
${h.table(['Price', 'Transfer duty', 'Surcharge purchaser duty', 'Total', 'Share of the price'], [500000, 750000, 1000000, 1500000, 2500000, 4000000].map((p) => { const r = h.calc('nsw', p, 'investor', 'established', true); return [h.aud(p), h.aud(r.duty), h.aud(r.surcharge), h.aud(r.total), h.pct(r.total / p)]; }), 'Foreign person buying alone, contracts from 1 July 2026', ['l', 'r', 'r', 'r', 'r'])}
<p>The last column is the useful one. A foreign buyer of a ${h.aud(500000)} unit hands over about ${h.pct(h.calc('nsw', 500000, 'investor', 'established', true).total / 500000, 0)} of the price in duty; above the premium threshold the combined figure passes ${h.pct(h.calc('nsw', 4000000, 'investor', 'established', true).total / 4000000, 0)}.</p>

<h2>The base is the dutiable value</h2>
<p>Revenue NSW calculates the surcharge on the same dutiable value as transfer duty, which is the higher of the price and the market value. A discounted sale between relatives does not shrink the surcharge any more than it shrinks the transfer duty; the office can ask for a valuation and charge both on it. The ${h.a('dutiable-value', 'dutiable value guide')} explains when a valuation is requested.</p>

<h2>Joint purchases: the share decides</h2>
<p>The ${h.src('nsw_spd', 'Revenue NSW surcharge page')} applies the ${h.pct(h.P.states.nsw.surcharge, 0)} to the dutiable value of the interest the foreign person acquires. Transfer duty, by contrast, is assessed on the whole property. A mixed couple therefore pays full transfer duty on the property and a surcharge on part of it.</p>
${h.table(['Price', 'Transfer duty (whole property)', 'Surcharge, foreign half', 'Surcharge, foreign quarter'], [600000, 900000, 1200000].map((p) => [h.aud(p), h.aud(h.calc('nsw', p, 'investor').duty), h.aud(h.P.states.nsw.surcharge * p / 2), h.aud(h.P.states.nsw.surcharge * p / 4)]), 'Mixed ownership, buyers who are not first home buyers', ['l', 'r', 'r', 'r'])}
<p>The share is the interest the foreign buyer actually takes. Equal joint tenants each hold half, which is why the half column is the one most couples need; a parent helping an adult child from overseas with a quarter stake sits in the right-hand column.</p>

<h2>The first home scheme and the surcharge</h2>
<p>Couples are often told that the FHBAS makes their first purchase duty free. For a citizen and a temporary visa holder, that is only half true. The ${h.src('nsw_fhbas', 'first home scheme')} needs at least one buyer to be an Australian citizen or permanent resident, so the couple can qualify and see transfer duty disappear below ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}. The surcharge on the foreign partner's share is a different tax and stays.</p>
${h.table(['First home price', 'Transfer duty if eligible for the FHBAS', 'Surcharge on the foreign half', 'Total payable'], [650000, 800000, 900000].map((p) => { const fh = h.calc('nsw', p, 'first'); const sur = h.P.states.nsw.surcharge * p / 2; return [h.aud(p), h.aud(fh.duty), h.aud(sur), h.aud(fh.duty + sur)]; }), 'Citizen and foreign partner as equal joint tenants, all other conditions met', ['l', 'r', 'r', 'r'])}
<p>At ${h.aud(800000)} the transfer duty is nil, yet the couple still owes ${h.aud(h.P.states.nsw.surcharge * 800000 / 2)}. Budgeting for a free first home and finding that figure on the settlement statement is the most expensive misunderstanding on this page.</p>

<h3>Citizens and residents who live abroad</h3>
<p>Revenue NSW flags a second situation. A New Zealand citizen, or an Australian permanent resident, who is not ordinarily resident in Australia can be liable for surcharge purchaser duty while still meeting the FHBAS tests, which focus on citizenship and residency status. Someone buying from overseas before relocating should therefore check the surcharge rules as carefully as the concession rules.</p>

<h2>Three buyers, one ${h.aud(900000)} terrace</h2>
<p>Put three different households in front of the same terrace and the gap becomes concrete. A Sydney couple who have owned before pay ordinary transfer duty of ${h.aud(h.calc('nsw', 900000, 'owner').duty)}. A temporary resident buying alone pays that same transfer duty and ${h.aud(h.calc('nsw', 900000, 'investor', 'established', true).surcharge)} of surcharge, ${h.duty('nsw', 900000, 'investor', 'established', true)} in total. A first home couple made up of a citizen and a partner on a work visa, buying in equal shares, pays ${h.aud(h.calc('nsw', 900000, 'first').duty)} of reduced transfer duty under the FHBAS and ${h.aud(h.P.states.nsw.surcharge * 900000 / 2)} of surcharge on the partner's half. The middle case pays more than twice what the first one does for an identical property, and the difference is entirely the surcharge.</p>

<h2>What the surcharge does not change</h2>
<p>The off-the-plan payment deferral is closed to anyone who is not a citizen or permanent resident (or one of the listed visa holders), as set out on the ${h.a('nsw-off-the-plan', 'NSW off-the-plan page')}. The transfer duty scale itself is identical for local and foreign buyers; only the surcharge separates them.</p>

<h2>Comparing NSW with other states</h2>
<p>Six of the eight jurisdictions charge a foreign purchaser surcharge; the official ACT and Northern Territory calculators add none. At ${h.pct(h.P.states.nsw.surcharge, 0)}, NSW has the highest rate of the six. On ${h.aud(1000000)} the total for a foreign buyer is ${h.duty('nsw', 1000000, 'investor', 'established', true)} in NSW, ${h.duty('vic', 1000000, 'investor', 'established', true)} in Victoria and ${h.duty('qld', 1000000, 'investor', 'established', true)} in Queensland. The ${h.a('foreign-buyer-stamp-duty', 'national foreign buyer guide')} lines up all eight.</p>
`,
  related: ['nsw', 'nsw-first-home-buyers', 'foreign-buyer-stamp-duty', 'qld-foreign', 'dutiable-value', 'nsw-off-the-plan'],
  sources: ['nsw_spd', 'nsw_fhbas', 'nsw_rates'],
});
