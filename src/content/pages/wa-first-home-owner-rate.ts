import { definePage } from '../../lib/page-types';

// Previous first home owner rate thresholds (21 March 2025 to 6 May 2026), RevenueWA fact sheet [wa_fhor].
const OLD = { exempt: 500000, capPerthPeel: 700000, capElsewhere: 750000 };
// RevenueWA's foreign transfer duty example: Kate and Simon, joint tenants [wa_fhor, wa_ftd].
const KATE_SIMON = 400000;
// Grant cap before 7 May 2026 [wa_fhog].
const OLD_GRANT_CAP = 750000;

export default definePage({
  id: 'wa-first-home-owner-rate',
  path: '/wa/first-home-owner-rate/',
  group: 'wa',
  kind: 'guide',
  order: 20,
  mini: 'waFhor',
  nav: 'WA first home owner rate',
  card: 'Nil duty on a first home to $600,000 and on land to $450,000 since 7 May 2026, with the reduced rate above.',
  title: 'First Home Owner Rate WA 2026: Nil Duty to $600,000',
  description: 'First home owner rate WA from 7 May 2026: no transfer duty on a home up to $600,000, $16.15 per $100 above it to $800,000, land free to $450,000. Examples.',
  h1: 'First home owner rate in Western Australia',
  intro: 'Since 7 May 2026 a first home in WA carries no transfer duty up to $600,000, and a reduced rate takes over until $800,000.',
  resume: (h) => {
    const f = h.P.states.wa.fhor;
    return `A first home owner in Western Australia pays no transfer duty on a home worth up to ${h.aud(f.home_exempt_to)}, or on vacant land worth up to ${h.aud(f.land_exempt_to)}, for transactions from ${h.date(f.from)}. Above those values RevenueWA applies the first home owner rate (FHOR): $${h.num(f.home_rate * 100, 2)} for every $100 above ${h.aud(f.home_exempt_to)} on a home, up to ${h.aud(f.home_cap)}, and $${h.num(f.land_rate * 100, 2)} for every $100 above ${h.aud(f.land_exempt_to)} on land, up to ${h.aud(f.land_cap)}. Past those caps the general rate applies to the whole value. A buyer paying ${h.aud(700000)} for an existing house in Perth therefore pays ${h.duty('wa', 700000, 'first')} instead of ${h.duty('wa', 700000, 'owner')}. Eligibility follows the First Home Owner Grant rules, but established homes qualify for the rate even though they do not attract the grant. Without pre-approval, the general rate is paid at settlement and a reassessment is requested afterwards. A foreign co-buyer still pays the ${h.pct(h.P.states.wa.surcharge, 0)} foreign transfer duty on their share.`;
  },
  faqs: (h) => {
    const w = h.P.states.wa, f = w.fhor;
    return [
      { q: 'Does the WA first home owner rate cover established houses?', a: `Yes. RevenueWA aligns eligibility for the rate with the First Home Owner Grant rules, yet the rate itself is not limited to new builds. An existing ${h.aud(550000)} unit in Mandurah attracts no duty for an eligible buyer, and a ${h.aud(750000)} house attracts ${h.duty('wa', 750000, 'first')}. The grant is a different matter: it is paid only on new homes, so the established buyer receives the duty saving and nothing else.` },
      { q: 'What happens in WA if I settle without first home owner rate pre-approval?', a: `You pay transfer duty at the general rate at settlement and ask RevenueWA to reassess the transaction at the first home owner rate afterwards. On a ${h.aud(650000)} home that means finding ${h.duty('wa', 650000, 'owner')} on settlement day, of which ${h.aud(h.calc('wa', 650000, 'owner').total - h.calc('wa', 650000, 'first').total)} comes back once the reassessment is made. Arranging pre-approval before settlement avoids carrying that amount.` },
      { q: 'Is there a cliff in WA duty when a first home costs just over $800,000?', a: `Barely. The rate of $${h.num(f.home_rate * 100, 2)} per $100 works out so that duty at the cap meets the general scale: at ${h.aud(f.home_cap)} the FHOR gives ${h.duty('wa', f.home_cap, 'first')} against ${h.duty('wa', f.home_cap, 'owner')} at the general rate. One dollar more and the general rate applies, ${h.duty('wa', f.home_cap + 1, 'first')}, so the step is a few dollars rather than tens of thousands.` },
      { q: 'How much was the WA first home threshold before 7 May 2026?', a: `From 21 March 2025 to 6 May 2026 the exemption stopped at ${h.aud(OLD.exempt)} and the concession ended at ${h.aud(OLD.capPerthPeel)} in Perth and Peel, or ${h.aud(OLD.capElsewhere)} elsewhere in the state. The current figures, ${h.aud(f.home_exempt_to)} and ${h.aud(f.home_cap)}, are the same everywhere in Western Australia, so the metropolitan and regional split has gone for homes.` },
      { q: 'Can a WA first home buyer get the grant above $800,000 in the Pilbara?', a: `Yes, up to a point. For transactions from ${h.date(f.from)} the First Home Owner Grant of ${h.aud(w.fhog.amount)} applies to a new home worth up to ${h.aud(w.fhog.cap_south)} south of the 26th parallel, Perth included, and up to ${h.aud(w.fhog.cap_north)} north of it. A ${h.aud(900000)} new home in Port Hedland can attract the grant, but its duty is assessed at the general rate: ${h.duty('wa', 900000, 'first', 'new', false, { waNorth: true })}.` },
      { q: 'Does WA foreign transfer duty apply when one first home buyer is foreign?', a: `It applies to the foreign buyer's share. RevenueWA's example is Kate and Simon, who buy a ${h.aud(KATE_SIMON)} home as joint tenants, Simon being a foreign person. Foreign transfer duty of ${h.pct(w.surcharge, 0)} is charged on his half only: ${h.aud(w.surcharge * KATE_SIMON / 2)}. Kate's half is not affected by the surcharge, and the first home owner rate does not cancel the amount charged on Simon's half.` },
    ];
  },
  body: (h) => {
    const w = h.P.states.wa, f = w.fhor;
    const homes = [550000, 600000, 650000, 700000, 750000, 800000, 850000];
    const lands = [400000, 450000, 500000, 550000, 600000];
    return `
<h2>Two thresholds, two per-$100 rates</h2>
<p>The first home owner rate is not a discount on the normal scale. It replaces the scale with a much simpler one: zero up to a threshold, then a single high marginal rate on every $100 above it, until the value where the result catches up with the general rate. RevenueWA publishes one pair of figures for a home and another for a block of vacant land on which you will build.</p>
${h.table(['Purchase', 'No duty up to', 'Rate above that', 'Rate ends at'], [
  ['Home (new or established)', h.aud(f.home_exempt_to), `$${h.num(f.home_rate * 100, 2)} per $100`, h.aud(f.home_cap)],
  ['Vacant land for a first home', h.aud(f.land_exempt_to), `$${h.num(f.land_rate * 100, 2)} per $100`, h.aud(f.land_cap)],
], `First home owner rate, transactions from ${h.date(f.from)}`, ['l', 'r', 'r', 'r'])}
<p>The high marginal rate looks alarming at first glance, but it is applied only to the slice above the threshold. On a ${h.aud(700000)} home the slice is ${h.aud(700000 - f.home_exempt_to)}, which produces ${h.duty('wa', 700000, 'first')}. The general scale would charge ${h.duty('wa', 700000, 'owner')} on the same house, because it taxes the entire value from the first dollar.</p>

<h2>What a first home costs in duty, price by price</h2>
<p>The table compares the first home owner rate with the duty an owner-occupier who has owned before would pay, on an established or new home. The figures come from the engine behind the calculator, which rounds each band to the next $100 as RevenueWA does.</p>
${h.table(['Home price', 'First home owner rate', 'General rate', 'Difference'], homes.map((p) => [h.aud(p), h.duty('wa', p, 'first'), h.duty('wa', p, 'owner'), h.aud(h.calc('wa', p, 'owner').total - h.calc('wa', p, 'first').total)]), 'Western Australia, transfer duty on a home', ['l', 'r', 'r', 'r'])}
<p>The saving peaks at the exemption threshold, where a buyer pays nothing instead of ${h.duty('wa', f.home_exempt_to, 'owner')}, and then shrinks steadily. By ${h.aud(f.home_cap)} it is down to a few dollars, and at ${h.aud(850000)} there is none at all. A buyer comparing a ${h.aud(780000)} house with an ${h.aud(820000)} one should know that both now pay close to the general rate: the real value of the FHOR is concentrated between roughly ${h.aud(500000)} and ${h.aud(700000)}.</p>

<h2>Land to build on</h2>
<p>A block of vacant land bought to build a first home has its own, lower thresholds. The rate per $100 is steeper because the window is narrower: ${h.aud(f.land_cap - f.land_exempt_to)} between the nil band and the end of the concession.</p>
${h.table(['Land price', 'First home owner rate', 'General rate'], lands.map((p) => [h.aud(p), h.duty('wa', p, 'first', 'vacant'), h.duty('wa', p, 'owner', 'vacant')]), 'Western Australia, transfer duty on vacant land', ['l', 'r', 'r'])}
<p>Building later does not change the duty on the land, which is assessed on the land price alone. The home you build on it is a new home for the First Home Owner Grant, which is separate from the duty and has its own cap. To compare land in other states, the ${h.a('vacant-land-stamp-duty', 'vacant land guide')} lines up all eight.</p>
<!--mini:landState-->

<h2>What changed on 7 May 2026</h2>
<p>Between 21 March 2025 and 6 May 2026 the home thresholds were lower and depended on location: no duty to ${h.aud(OLD.exempt)}, and the concession ending at ${h.aud(OLD.capPerthPeel)} in the Perth and Peel regions or at ${h.aud(OLD.capElsewhere)} in the rest of the state. Since ${h.date(f.from)} one statewide pair applies, ${h.aud(f.home_exempt_to)} and ${h.aud(f.home_cap)}. A regional buyer looking at a ${h.aud(760000)} house was outside the concession under the old rules and is now inside it, paying ${h.duty('wa', 760000, 'first')}. A Perth buyer at ${h.aud(600000)} has gone from paying something to paying nothing.</p>
<p>The First Home Owner Grant moved on the same date. For transactions from ${h.date(f.from)} the ${h.aud(w.fhog.amount)} grant on a new home applies up to ${h.aud(w.fhog.cap_south)} south of the 26th parallel, which takes in Perth, and up to ${h.aud(w.fhog.cap_north)} north of it; before that, the cap was ${h.aud(OLD_GRANT_CAP)}. Notice that the grant cap in the north sits above the duty concession: a ${h.aud(950000)} new home in Karratha may carry the grant while its duty is assessed at the general rate.</p>

<h2>Who qualifies, and how the money moves</h2>
<p>RevenueWA ties eligibility for the first home owner rate to the First Home Owner Grant criteria, with the important difference that the property may be an established home. Those criteria are set out on the ${h.src('wa_fhog', 'RevenueWA grant page')}; this calculator assumes you meet them and does not test them.</p>
<p>Timing matters more than most buyers expect. If the transaction has not been pre-approved for the rate, transfer duty is paid at the general rate at settlement and RevenueWA reassesses it at the first home owner rate afterwards. At ${h.aud(600000)} that is ${h.duty('wa', 600000, 'owner')} paid and later returned, at ${h.aud(720000)} ${h.aud(h.calc('wa', 720000, 'owner').total - h.calc('wa', 720000, 'first').total)}. Budget for the higher figure if pre-approval is not in place before settlement.</p>

<h2>Buying with a foreign partner: the Kate and Simon example</h2>
<p>The fact sheet works through a couple, Kate and Simon, who buy a ${h.aud(KATE_SIMON)} home as joint tenants. Simon is a foreign person. Foreign transfer duty of ${h.pct(w.surcharge, 0)} is charged on the value of the interest he acquires, half the home, which comes to ${h.aud(w.surcharge * KATE_SIMON / 2)}. The surcharge is assessed on top of transfer duty and follows the share, not the couple. If every buyer is foreign the surcharge reaches ${h.aud(w.surcharge * KATE_SIMON)} on the same home and the general rate applies to the duty itself, ${h.duty('wa', KATE_SIMON, 'investor', 'established', true)} in all. The ${h.a('foreign-buyer-stamp-duty', 'foreign buyer guide')} compares the surcharges state by state.</p>

<h2>First home or off the plan?</h2>
<p>A buyer who signs for an apartment before construction may also meet the conditions of the ${h.a('wa-off-the-plan', 'WA off-the-plan concession')}. The two reliefs use different mechanics, one a separate scale, the other a percentage of general duty, and the calculator does not combine them: RevenueWA decides how they interact on a given contract. For most first home buyers under ${h.aud(f.home_exempt_to)} the question does not arise, since there is no duty to reduce.</p>
`;
  },
  related: ['wa', 'wa-off-the-plan', 'first-home-buyer-stamp-duty', 'first-home-owner-grant', 'vacant-land-stamp-duty', 'foreign-buyer-stamp-duty'],
  sources: ['wa_fhor', 'wa_rates', 'wa_ftd', 'wa_fhog'],
});
