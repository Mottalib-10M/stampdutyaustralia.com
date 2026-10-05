import { definePage } from '../../lib/page-types';

// Contract window and application deadlines, Northern Territory Government [nt_homegrown, nt_assistance].
const CONTRACTS_FROM = '2024-10-01';
const FRESHSTART_APPLY_BY = '2027-12-31';
const HOMEGROWN_APPLY_BY = '2028-09-30';
// The $10,000 grant on established homes ended on this date [nt_assistance].
const ESTABLISHED_GRANT = { amount: 10000, ended: '2025-09-30' };

export default definePage({
  id: 'nt-homegrown-grant',
  path: '/nt/homegrown-territory-grant/',
  group: 'nt',
  kind: 'guide',
  order: 20,
  mini: 'ntGrants',
  nav: 'NT HomeGrown Territory Grant',
  card: '$50,000 for a first home and $30,000 for other buyers of a new home, contracts to 30 September 2027, no price cap.',
  title: 'HomeGrown Territory Grant NT 2026: $50,000 New Homes',
  description: 'NT HomeGrown Territory Grant 2026: $50,000 for a first home buyer of a new home, $30,000 FreshStart for others, no price cap, contracts to 30 September 2027.',
  h1: 'HomeGrown Territory Grant and FreshStart',
  intro: 'In the Northern Territory the help for buyers comes as cash for a new home, not as a cut in stamp duty.',
  resume: (h) => {
    const n = h.P.states.nt;
    return `The HomeGrown Territory Grant pays ${h.aud(n.fhog.amount)} to a first home buyer who buys or builds a new home in the Northern Territory, and the FreshStart New Home Grant pays ${h.aud(n.freshstart.amount)} to a buyer who has owned before, for contracts from ${h.date(CONTRACTS_FROM)} to ${h.date(n.fhog.until)}. Neither grant has a price cap. HomeGrown covers off-the-plan purchases and owner-builders, but never land bought alone. Applications close later than contracts: FreshStart claims must be lodged before ${h.date(FRESHSTART_APPLY_BY)}, HomeGrown claims before ${h.date(HOMEGROWN_APPLY_BY)}. Recipients must live in the home for 12 months. On a ${h.aud(600000)} new house in Palmerston, stamp duty comes to ${h.duty('nt', 600000, 'first', 'new')}, so HomeGrown more than covers it, with ${h.aud(n.fhog.amount - h.calc('nt', 600000, 'first', 'new').total)} left over. Established homes are a different story: the ${h.aud(ESTABLISHED_GRANT.amount)} grant on them ended on ${h.date(ESTABLISHED_GRANT.ended)}, and the Territory offers no first home concession on stamp duty for an established home in 2026.`;
  },
  faqs: (h) => {
    const n = h.P.states.nt;
    return [
      { q: 'Is there a price limit on the NT HomeGrown Territory Grant?', a: `No. The Northern Territory Government pays the ${h.aud(n.fhog.amount)} grant on an eligible new home whatever its price. A ${h.aud(1100000)} new house in Darwin's northern suburbs attracts the same ${h.aud(n.fhog.amount)} as a ${h.aud(450000)} apartment. Stamp duty, on the other hand, rises with the price: ${h.duty('nt', 1100000, 'first', 'new')} on the dearer home against ${h.duty('nt', 450000, 'first', 'new')} on the apartment.` },
      { q: 'Can I get the NT HomeGrown grant on a block of land?', a: `Not on the land alone. HomeGrown is for a new home: buying one, including off the plan, or building one, including as an owner-builder. Buying a block and then contracting a builder brings the finished home within the grant. Buying the land and the house together from a building contractor may also exempt the purchase from stamp duty under the House and Land Package Exemption.` },
      { q: 'When is the deadline to apply for the NT FreshStart New Home Grant?', a: `The contract must be signed between ${h.date(CONTRACTS_FROM)} and ${h.date(n.freshstart.until)}, and the application lodged before ${h.date(FRESHSTART_APPLY_BY)}. HomeGrown has a longer tail: applications before ${h.date(HOMEGROWN_APPLY_BY)}. The later dates allow for homes still being built when the contract window closes. Both grants require the buyer to live in the home for 12 months.` },
      { q: 'Is there still a grant for established homes in the NT?', a: `No. The ${h.aud(ESTABLISHED_GRANT.amount)} grant for buyers of established homes ended on ${h.date(ESTABLISHED_GRANT.ended)}. In 2026 the Territory's home owner assistance lists only the new home grants and the House and Land Package Exemption. A first home buyer of an existing ${h.aud(500000)} unit therefore pays full stamp duty, ${h.duty('nt', 500000, 'first')}, with no grant to offset it.` },
      { q: 'Does the NT charge foreign buyers extra stamp duty?', a: `The Territory's official calculator adds no surcharge, and none appears in the formula it uses. A foreign buyer of a ${h.aud(700000)} home is shown ${h.duty('nt', 700000, 'investor', 'established', true)}, the same as any other buyer. The HomeGrown and FreshStart grants have their own eligibility rules on the Territory's pages, which this calculator does not test.` },
    ];
  },
  body: (h) => {
    const n = h.P.states.nt;
    const prices = [450000, 525000, 600000, 750000, 900000, 1200000];
    return `
<h2>Cash in the hand instead of a duty concession</h2>
<p>Most jurisdictions help first home buyers mainly through the duty bill. The Northern Territory does it the other way round: stamp duty is charged on the normal formula, and a large grant arrives for a new home. The HomeGrown Territory Grant, at ${h.aud(n.fhog.amount)}, is the largest first home grant in the country in 2026-27, and FreshStart extends ${h.aud(n.freshstart.amount)} to people who have owned property before. Both apply to contracts dated from ${h.date(CONTRACTS_FROM)} to ${h.date(n.fhog.until)}.</p>
${h.table(['Grant', 'Amount', 'For', 'Apply before'], [
  [n.fhog.name, h.aud(n.fhog.amount), 'First home buyers, new home', h.date(HOMEGROWN_APPLY_BY)],
  ['FreshStart New Home Grant', h.aud(n.freshstart.amount), 'Buyers who have owned before, new home', h.date(FRESHSTART_APPLY_BY)],
], `Northern Territory new home grants, contracts ${h.date(CONTRACTS_FROM)} to ${h.date(n.fhog.until)}`, ['l', 'r', 'l', 'r'])}

<h2>Grant against duty, price by price</h2>
<p>Because the grant does not change with price and stamp duty does, the net effect falls as the home gets dearer. The table nets the two for a first home buyer and for a FreshStart buyer, on a new home bought without the house and land package route.</p>
${h.table(['New home price', 'Stamp duty', 'HomeGrown less duty', 'FreshStart less duty'], prices.map((p) => { const d = h.calc('nt', p, 'first', 'new').total; return [h.aud(p), h.aud(d), h.aud(n.fhog.amount - d), h.aud(n.freshstart.amount - d)]; }), 'Northern Territory, new home, grant minus stamp duty', ['l', 'r', 'r', 'r'])}
<p>For a first home buyer the grant exceeds the duty up to about ${h.aud(1000000)}: at ${h.aud(1000000)} the duty is ${h.duty('nt', 1000000, 'first', 'new')}. For a FreshStart buyer the crossover comes much earlier, between ${h.aud(600000)} and ${h.aud(650000)}, where duty reaches ${h.duty('nt', 600000, 'owner', 'new')} and ${h.duty('nt', 650000, 'owner', 'new')}. A buyer who can structure the purchase as a house and land package from one builder may escape the duty altogether and keep the whole grant; the ${h.a('nt-house-and-land', 'House and Land Package Exemption')} page explains when.</p>

<h2>What counts as a new home for HomeGrown</h2>
<p>The Territory's page lists the routes into the grant: buying a newly built home, buying off the plan, contracting a builder, or building as an owner-builder. What it excludes is just as clear: buying vacant land on its own does not qualify, though the home you later build on it can. The grant does not depend on a price cap, which removes the threshold arithmetic that buyers in Queensland or New South Wales have to do.</p>
<p>The one condition after the purchase is residence: the home must be lived in for 12 months.</p>

<h2>Land first, or a package: one couple, two routes</h2>
<p>Consider a couple buying their first home in Zuccoli, on the edge of Palmerston. Route one: they buy a ${h.aud(260000)} block from a land developer, pay stamp duty of ${h.duty('nt', 260000, 'first', 'vacant')} on it, then sign with a builder. The land alone earns no grant, but the finished home brings HomeGrown's ${h.aud(n.fhog.amount)}. Route two: they buy a ${h.aud(640000)} house and land package from a building contractor in a single transaction. If it meets the House and Land Package Exemption, there is no duty at all, where the formula would otherwise give ${h.duty('nt', 640000, 'first', 'new')}, and the grant is the same ${h.aud(n.fhog.amount)}.</p>
<p>The second route is simpler and cheaper in duty; the first gives more freedom over the builder and the design. Either way the couple must live in the home for 12 months to keep the grant.</p>

<h2>Against Queensland, the nearest comparison</h2>
<p>Queensland is the other state that pairs a large grant with new homes. Its first home owner grant of ${h.aud(h.P.states.qld.fhog.amount)} is limited to new homes under ${h.aud(h.P.states.qld.fhog.below)}, and a first home buyer there pays no duty on a new home. On a ${h.aud(700000)} new home the Queensland buyer receives ${h.aud(h.calc('qld', 700000, 'first', 'new').grant.amount)} and pays ${h.duty('qld', 700000, 'first', 'new')}; the Territory buyer receives ${h.aud(n.fhog.amount)} and pays ${h.duty('nt', 700000, 'first', 'new')}, unless the package exemption applies.</p>

<h2>Timing: contracts close before applications do</h2>
<p>The contract window ends on ${h.date(n.fhog.until)}. The application windows run longer, to ${h.date(FRESHSTART_APPLY_BY)} for FreshStart and ${h.date(HOMEGROWN_APPLY_BY)} for HomeGrown, which allows for builds that are under way when contracts close. Signing a building contract in September 2027 is therefore in time; signing one in October 2027 is not, whatever the completion date.</p>

<h2>The established home gap</h2>
<p>The ${h.aud(ESTABLISHED_GRANT.amount)} grant for buyers of established homes ended on ${h.date(ESTABLISHED_GRANT.ended)}, and the Territory has no first home concession on the stamp duty of an existing home in 2026. A first home buyer choosing between an existing ${h.aud(550000)} house in Alice Springs and a new one at the same price faces ${h.duty('nt', 550000, 'first')} in duty either way, but only the new one comes with ${h.aud(n.fhog.amount)}.</p>
<!--mini:grantState-->
<p>Choose the Northern Territory in the grant calculator above to set the HomeGrown figure against another state's grant for the same price. The ${h.a('first-home-owner-grant', 'First Home Owner Grant guide')} compares all eight.</p>

<h2>Paying the duty</h2>
<p>NT stamp duty is due within ${n.payment_days} days of signing, or at settlement if that is earlier. The grant is a separate payment, not a deduction from the duty assessment, so plan to fund the duty on that timetable even when the grant will more than cover it. The ${h.a('nt', 'NT stamp duty calculator')} shows the formula behind the figures on this page.</p>
`;
  },
  related: ['nt', 'nt-house-and-land', 'first-home-owner-grant', 'new-vs-established', 'first-home-buyer-stamp-duty'],
  sources: ['nt_homegrown', 'nt_assistance', 'nt_calc', 'nt_stamp_duty'],
});
