import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nsw-off-the-plan',
  path: '/nsw/off-the-plan/',
  group: 'nsw',
  kind: 'guide',
  order: 40,
  mini: 'fhbState',
  nav: 'NSW off the plan',
  card: 'Defer NSW transfer duty on an off-the-plan home by up to 12 more months: who qualifies and the official cases.',
  title: 'Off the Plan Stamp Duty NSW 2026: 15-Month Duty Deferral',
  description: 'Off the plan stamp duty NSW 2026: defer transfer duty up to 15 months after the contract if you will live there. Eligibility, visas and Revenue NSW\'s own cases.',
  h1: 'Buying off the plan in NSW: when the duty is due',
  intro: 'Revenue NSW lets owner-occupiers of an off-the-plan home pay transfer duty later; this page sets out who can, how long for, and the three cases the office uses.',
  resume: (h) => `An owner-occupier who buys a home off the plan in New South Wales can pay transfer duty up to 12 months later than usual, so the duty falls due at the earliest of 15 months after the contract date, settlement, or an assignment of the contract. Without the deferral, NSW duty is due within three months of signing, or at settlement if sooner, which on an apartment that will not be finished for two years means paying long before you get the keys. The amount itself is not reduced: an ${h.aud(800000)} apartment carries ${h.duty('nsw', 800000, 'owner')} at the 2026/27 thresholds whether it is paid early or late, unless the buyer qualifies for the first home scheme, in which case it carries ${h.duty('nsw', 800000, 'first', 'offplan')}. Every purchaser must be an Australian citizen, a permanent resident or a listed visa holder, the home must become their principal place of residence within 12 months of completion, and they must live there for 12 months. Trusts, companies and investors are excluded.`,
  faqs: (h) => [
    { q: 'How long can I defer stamp duty on an off-the-plan apartment in NSW?', a: 'Up to 12 months beyond the normal three-month deadline. The deferred duty becomes payable on the first of three events: 15 months after the contract date, completion of the purchase, or an assignment of the contract to someone else. A project that settles nine months after exchange therefore gains six months, not twelve.' },
    { q: 'Can an investor defer NSW transfer duty on an off-the-plan purchase?', a: 'No. Revenue NSW limits the deferral to buyers who will live in the property as their principal place of residence. An investor, a trust or a company buying off the plan pays duty within three months of the contract, or at settlement if that comes first, even when the building has not started.' },
    { q: 'Does buying land with a house to be built qualify for the NSW deferral?', a: `Only if the contract itself provides for the residence to be built or developed before completion. A bare block bought with a separate building contract does not qualify, which is the point of the office's example of Mark and his ${h.aud(450000)} Central Coast lot.` },
    { q: 'What visas qualify for the NSW off-the-plan duty deferral?', a: 'Citizens and permanent residents qualify, as do holders of a partner visa (subclass 309 or 820) and New Zealand citizens on a special category visa (subclass 444) who have spent at least 200 days in Australia in the previous 12 months. Each buyer named on the contract must meet one of these, which is why a 482 work visa holder blocks a couple.' },
    { q: 'What happens in NSW if I deferred off-the-plan duty and then do not move in?', a: 'You lose the deferral and pay interest on the duty from the date it would normally have been due. In Revenue NSW\'s example, a buyer who exchanged in January 2024 and could no longer live in the unit after a job change was charged interest from April 2024, three months after exchange, until she paid in April 2025.' },
    { q: 'Can a first home buyer in NSW use both the FHBAS and the off-the-plan deferral?', a: `The two answer different questions. The FHBAS sets how much duty you owe; the deferral sets when you pay it. On a ${h.aud(900000)} off-the-plan apartment an eligible first home buyer owes ${h.duty('nsw', 900000, 'first', 'offplan')} rather than ${h.duty('nsw', 900000, 'owner', 'offplan')}, and if the deferral conditions are met that reduced amount can be paid later.` },
  ],
  body: (h) => `
<h2>Why timing matters more than the rate</h2>
<p>Off-the-plan sales stretch the gap between signing and settling. A buyer can exchange on a Parramatta apartment and wait eighteen months for an occupation certificate. Under the ordinary rule that buyer pays duty three months in, with a deposit already tied up and no rent saved. The ${h.src('nsw_otp', 'Revenue NSW off-the-plan page')} offers a way to move that payment closer to the move-in date. It does not change the duty scale; the bill is the same figure you would see for an established home at the same price.</p>
${h.table(['Price', 'Duty, owner-occupier', 'Duty, eligible first home buyer', 'New homes grant'], [600000, 750000, 900000, 1100000].map((p) => { const fh = h.calc('nsw', p, 'first', 'offplan'); return [h.aud(p), h.duty('nsw', p, 'owner', 'offplan'), h.aud(fh.total), fh.grant.amount ? h.aud(fh.grant.amount) : 'none']; }), 'Off-the-plan home, contracts from 1 July 2026', ['l', 'r', 'r', 'r'])}
<p>The deferral is worth the most to buyers in the right-hand columns who still owe something: a first home buyer above ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} or a previous owner at any price. Below the FHBAS threshold an eligible first buyer owes nothing, so there is nothing to defer.</p>

<h2>The deadline, step by step</h2>
<ol>
<li>Normal due date: three months after the contract, or settlement if earlier.</li>
<li>With the deferral: up to 12 further months, giving a latest possible date of 15 months after the contract.</li>
<li>Earlier triggers: settlement of the purchase, or an assignment of the contract, end the deferral at once.</li>
</ol>
<p>So the deferral can never outlast settlement. On a project that completes 11 months after exchange, duty is due at that settlement. On one that drags to 20 months, it is due at month 15, while the building is still unfinished.</p>

<h2>Who can defer</h2>
<p>Revenue NSW applies the conditions to every buyer on the contract, not just one of them:</p>
<ul>
<li>each purchaser is an Australian citizen or permanent resident, holds a partner visa (subclass 309 or 820), or is a New Zealand citizen on a subclass 444 visa who has been in Australia for at least 200 days in the 12 months before;</li>
<li>the buyers are individuals; a trust or a company cannot defer;</li>
<li>the property will be their principal place of residence: they move in within 12 months of completion and live there for 12 months;</li>
<li>vacant land qualifies only when the contract includes a residence to be built or developed before completion.</li>
</ul>

<h2>The three cases Revenue NSW uses</h2>
<h3>Sophie: eligible, then not</h3>
<p>Sophie, an Australian citizen, bought an off-the-plan unit in Parramatta for ${h.aud(950000)} in January 2024, with settlement expected in April 2025, and declared it would be her home. Before settlement her job changed and she could no longer live there. The office's conclusion: she was charged interest from the original due date, April 2024, until she paid in April 2025. At the 2026/27 thresholds the same contract would carry ${h.duty('nsw', 950000, 'owner', 'offplan')} of duty, so a year of interest on that sum is the real cost of a deferral that falls through.</p>
<h3>Mark: land without a home in the contract</h3>
<p>Mark signed in September 2024 for a ${h.aud(450000)} block of vacant land on the Central Coast. He could not defer, because the contract did not include a residence to be built before completion. Duty on the land is due on the ordinary timetable: ${h.duty('nsw', 450000, 'owner', 'vacant')} at today's thresholds, and being an eligible first home buyer would not change it (${h.duty('nsw', 450000, 'first', 'vacant')}), since ${h.aud(h.P.states.nsw.fhbas.land_cap)} is exactly where the land concession ends.</p>
<h3>Mei and David: one ineligible buyer</h3>
<p>Mei, a citizen, and David, on a temporary work visa (subclass 482), agreed to buy an off-the-plan apartment in Sydney for ${h.aud(800000)}. Because each purchaser has to meet the residency test, David's visa takes the whole contract out of the deferral. Their duty, ${h.duty('nsw', 800000, 'owner', 'offplan')} at 2026/27 thresholds before any concession, is due three months after exchange. As a temporary resident David may also face ${h.a('nsw-foreign-purchaser', 'surcharge purchaser duty')} on his share, which is assessed separately.</p>

<h2>Off the plan and the first home schemes</h2>
<p>An off-the-plan apartment is a new home, so an eligible first buyer can combine three things: the ${h.a('nsw-first-home-buyers', 'FHBAS exemption or concession')}, the payment deferral, and the ${h.src('nsw_fhog', 'First Home Owner (New Homes) Grant')} of ${h.aud(h.P.states.nsw.fhog.amount)} on a home up to ${h.aud(h.P.states.nsw.fhog.new_home_cap)}. The grant has its own occupancy rule (12 continuous months, starting within 12 months) and must be claimed within 12 months of settlement.</p>

<h2>Other states do it differently</h2>
<p>Victoria cuts the duty itself on off-the-plan purchases, by taking the construction still to come out of the dutiable value; the ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')} shows how. Western Australia grants a percentage concession on new strata homes, and the ACT exempts owner-occupied off-the-plan units entirely. NSW is the only one of these where the relief is purely a matter of when you pay. The ${h.a('off-the-plan-stamp-duty', 'national off-the-plan comparison')} sets the four side by side.</p>
`,
  related: ['nsw', 'nsw-first-home-buyers', 'vic-off-the-plan', 'off-the-plan-stamp-duty', 'nsw-foreign-purchaser', 'first-home-owner-grant'],
  sources: ['nsw_otp', 'nsw_rates', 'nsw_fhbas', 'nsw_fhog'],
});
