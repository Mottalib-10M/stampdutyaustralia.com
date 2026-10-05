import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'house-and-land-package-stamp-duty',
  path: '/guides/house-and-land-package-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 55,
  mini: 'propertyTypeState',
  nav: 'House and land packages',
  card: 'One contract or two, land price or combined price: how each state taxes a package and where the grant cap bites.',
  title: 'House and Land Package Stamp Duty 2026: State Rules Compared',
  description: 'House and land package stamp duty 2026-27: NT exemption with no cap to June 2027, NSW grant if land plus build is up to $750,000, QLD and SA first home relief.',
  h1: 'Stamp duty on a house and land package',
  intro: 'A package can be one contract for a finished home or two contracts, one for the block and one for the build, and the revenue offices do not treat those the same way.',
  resume: (h) => `For stamp duty a house and land package is assessed differently depending on the state and on whether it is sold as one contract or as a land contract plus a building contract, and the Northern Territory is the only jurisdiction with an exemption written for packages. Its House and Land Package Exemption removes stamp duty, with no means test and no value cap, when a house and land are bought from a building contractor in a single transaction under a contract signed from ${h.date(h.P.states.nt.hlpe.from)} to ${h.date(h.P.states.nt.hlpe.until)}. Elsewhere the package falls back on the first home rules. NSW pays its ${h.aud(h.P.states.nsw.fhog.amount)} grant on land plus a building contract only if the two together come to ${h.aud(h.P.states.nsw.fhog.build_cap)} or less, against ${h.aud(h.P.states.nsw.fhog.new_home_cap)} for a finished new home. Queensland and South Australia remove duty for a first home buyer on both a new home and land to build on, at any price. The structure of the contracts therefore decides which threshold you are measured against, and it is worth settling before you sign.`,
  faqs: (h) => [
    { q: 'Who qualifies for the NT House and Land Package Exemption?', a: `The Northern Territory Government grants it to buyers of a house and land together from a building contractor in one transaction, under a contract signed from ${h.date(h.P.states.nt.hlpe.from)} to ${h.date(h.P.states.nt.hlpe.until)}. There is no means test and no value cap. You must move in within twelve months of completion and live there for six continuous months. On a ${h.aud(700000)} package it saves ${h.duty('nt', 700000, 'owner')}.` },
    { q: 'Can I get the NSW First Home Owner Grant on a $720,000 house and land package?', a: `Yes, if it is a block of land plus a contract to build and the two add up to no more than ${h.aud(h.P.states.nsw.fhog.build_cap)}. Revenue NSW applies that higher ceiling to land and building contracts, and ${h.aud(h.P.states.nsw.fhog.new_home_cap)} to a home bought already built. The grant is ${h.aud(h.P.states.nsw.fhog.amount)}, and you must live in the home for twelve continuous months.` },
    { q: 'Is a Queensland first home buyer better off buying land and building, or buying a completed new house?', a: `For duty it makes no difference at any price: the Queensland Revenue Office gives a full concession on a first home bought new and on vacant land bought to build one, both without a cap, for contracts from ${h.date('2025-05-01')}. The ${h.aud(h.P.states.qld.fhog.amount)} grant needs a new home valued under ${h.aud(h.P.states.qld.fhog.below)}.` },
    { q: 'Does South Australia charge stamp duty on a house and land package for someone downsizing at 65?', a: `RevenueSA's seniors downsizing relief, for contracts from ${h.date(h.P.states.sa.seniors_from)}, covers buyers aged 60 and over who sell their principal residence and buy a new home, an off-the-plan apartment or land to build on, with a smaller block than before. The relief is worth up to ${h.aud(h.P.states.sa.seniors_max_relief)}. RevenueSA lists further conditions that this site has not reviewed.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const land = 320000, build = 380000, total = land + build;
    return `
<h2>One contract or two</h2>
<p>Developers sell packages in two common shapes. In the first you sign a single contract for a finished house on its lot. In the second you buy the block under a land contract and sign a separate building contract with a builder. The revenue offices write their first home thresholds and grants around those shapes, so the same ${h.aud(total)} package can be measured against a land threshold, a new-home threshold or a combined land-and-build threshold.</p>
<p>The table below takes a package of ${h.aud(land)} for the land and ${h.aud(build)} for the build, bought by a first home buyer. The first column treats the purchase as a block of vacant land at the land price, the way the land thresholds are framed. The second treats the whole package as a new home at ${h.aud(total)}. How a building contract itself is treated for duty is a question for the office in your state; the calculator does not add anything for it.</p>
${h.table(['State', 'Land contract at $320,000', 'One contract at $700,000', 'Grant'], STATES.map((s) => {
  const l = h.calc(s, land, 'first', 'vacant').total, n = h.calc(s, total, 'first', 'new');
  const grant = s === 'nsw' ? (total <= P.nsw.fhog.build_cap ? P.nsw.fhog.amount : 0) : n.grant.amount;
  return [STATE_INFO[s].short, h.aud(l), h.aud(n.total), grant ? h.aud(grant) : 'none'];
}), 'First home buyer, package of $320,000 land plus $380,000 build', ['l', 'r', 'r', 'r'])}
<p>In NSW the grant column assumes land plus building contract, which is what allows the ${h.aud(P.nsw.fhog.build_cap)} ceiling; bought as a finished home at the same price it would exceed the ${h.aud(P.nsw.fhog.new_home_cap)} new-home cap. In the Territory the one-contract column does not yet apply the package exemption: it shows the duty a first home buyer would pay outside it. The next section adds it.</p>

<h2>Northern Territory: the only package exemption</h2>
<p>The House and Land Package Exemption is the Territory's main duty concession for home buyers. It applies when house and land are bought from a building contractor in a single transaction, under a contract dated from ${h.date(P.nt.hlpe.from)} to ${h.date(P.nt.hlpe.until)}. It is not means tested and has no value cap. The condition is residence: move in within twelve months of completion and stay six continuous months.</p>
${h.table(['Package price', 'Duty without the exemption', 'With the exemption', 'HomeGrown grant (first home)', 'FreshStart grant (not first home)'], [550000, 700000, 900000].map((p) => [h.aud(p), h.duty('nt', p, 'owner', 'new'), h.duty('nt', p, 'owner', 'new', false, { ntPackage: true }), h.aud(h.calc('nt', p, 'first', 'new').grant.amount), h.aud(h.calc('nt', p, 'owner', 'new').grant.amount)]), 'Northern Territory, house and land package from a building contractor', ['l', 'r', 'r', 'r', 'r'])}
<p>Combined with the ${h.aud(P.nt.fhog.amount)} HomeGrown Territory Grant for first home buyers, or the ${h.aud(P.nt.freshstart.amount)} FreshStart New Home Grant for everyone else, a Territory package can leave the buyer ahead after government charges. The grants run for contracts up to ${h.date(P.nt.fhog.until)}. The ${h.a('nt-house-and-land', 'NT house and land page')} has the detail.</p>
<!--mini:ntGrants-->

<h2>NSW: two grant ceilings</h2>
<p>Revenue NSW pays the ${h.aud(P.nsw.fhog.amount)} First Home Owner (New Homes) Grant on a new home up to ${h.aud(P.nsw.fhog.new_home_cap)}, or on land plus a building contract up to ${h.aud(P.nsw.fhog.build_cap)} combined. Duty is a separate question. For a first home buyer the land counts against the land thresholds of the First Home Buyers Assistance Scheme, exempt to ${h.aud(P.nsw.fhbas.land_exempt_to)} and phasing out at ${h.aud(P.nsw.fhbas.land_cap)}. A block at ${h.aud(380000)} therefore carries ${h.duty('nsw', 380000, 'first', 'vacant')}, while a finished house and land at ${h.aud(700000)} on a single contract is exempt under the home threshold.</p>

<h2>Queensland and South Australia: either shape works for a first home buyer</h2>
<p>The Queensland Revenue Office removes transfer duty for a first home buyer on a new home and on vacant land bought to build, both without a cap, so the choice of contract structure does not change the duty. The ${h.aud(P.qld.fhog.amount)} grant requires the home to be valued under ${h.aud(P.qld.fhog.below)}. RevenueSA's first home relief also covers both a new home and land to build on, with no cap; its grant of up to ${h.aud(P.sa.fhog.amount)} is paid for the new home, not the land alone.</p>
<p>For buyers who are not first home buyers the picture changes. In Queensland a home buyer who will live in the house can use the home concession rate on a finished home, ${h.duty('qld', 700000, 'owner', 'new')} at ${h.aud(700000)}, against ${h.duty('qld', 700000, 'investor', 'new')} at the general rate. Since ${h.date(P.qld.citizenship_rule_from)} that concession needs a citizen, permanent resident or specified foreign retiree.</p>

<h2>Victoria, Western Australia, Tasmania and the ACT</h2>
<p>Victoria applies its first home thresholds to the value of the land alone when you buy vacant land, so a ${h.aud(land)} block is exempt for a first home buyer whatever the house will cost; its ${h.aud(P.vic.fhog.amount)} grant needs a new home valued at ${h.aud(P.vic.fhog.cap)} or less. Where a single contract includes construction still to come, the State Revenue Office's off-the-plan rule taxes the price less that cost, under the conditions on the ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')}. Western Australia measures land against its own first home thresholds, ${h.aud(P.wa.fhor.land_exempt_to)} and ${h.aud(P.wa.fhor.land_cap)}, and pays its ${h.aud(P.wa.fhog.amount)} grant on a new home up to ${h.aud(P.wa.fhog.cap_south)} south of the 26th parallel or ${h.aud(P.wa.fhog.cap_north)} north of it, so a package in Perth at ${h.aud(total)} qualifies with room to spare. A buyer who signs without RevenueWA's pre-approval pays the general rate at settlement and claims the first home owner rate back as a refund. Tasmania charges its general scale on the land and pays ${h.aud(P.tas.fhog.amount)} for a new home completed within 24 months. The ACT's Home Buyer Concession Scheme covers residential land as well as homes, so an eligible buyer pays nothing on the block.</p>
`;
  },
  related: ['nt-house-and-land', 'vacant-land-stamp-duty', 'first-home-owner-grant', 'new-vs-established', 'off-the-plan-stamp-duty'],
  sources: ['nt_hlpe', 'nt_homegrown', 'nsw_fhog', 'nsw_fhbas', 'qld_first_home_new', 'sa_fhb_properties', 'sa_seniors', 'vic_fhb', 'vic_otp'],
});
