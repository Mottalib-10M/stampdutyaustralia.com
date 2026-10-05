import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'off-the-plan-stamp-duty',
  path: '/guides/off-the-plan-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 40,
  mini: 'vicOffPlan',
  nav: 'Off-the-plan stamp duty',
  card: 'Victoria deducts building costs, WA cuts duty by stage, NSW lets you pay later, the ACT exempts units, Tasmania closed its scheme.',
  title: 'Off the Plan Stamp Duty 2026: VIC, WA, NSW and ACT Rules',
  description: 'Off the plan stamp duty in 2026-27: Victoria taxes the price less building costs to come, WA cuts duty up to $50,000, the ACT exempts owner-occupied units.',
  h1: 'Stamp duty when you buy off the plan',
  intro: 'Buying before the building exists changes the duty in five jurisdictions, each in a different way: a smaller taxable value, a percentage off, a later due date or no duty at all.',
  resume: (h) => `Buying off the plan lowers or delays stamp duty in Victoria, Western Australia, NSW and the ACT, but each uses a different mechanism and Tasmania closed its scheme for contracts after ${h.date(h.P.states.tas.otp_ended)}. Victoria charges duty on the contract price minus the construction cost still to be incurred after the contract date, and its temporary concession for strata apartments and townhouses lets any buyer, investors included, use that deduction with no value cap for contracts signed up to ${h.date(h.P.states.vic.otp_temp.until)}. Western Australia takes a share off the duty itself, from ${h.pct(h.P.states.wa.otp.pre.max, 0)} before construction starts on a dwelling up to ${h.aud(h.P.states.wa.otp.full_to)}, capped at ${h.aud(h.P.states.wa.otp.cap)}, for contracts to ${h.date(h.P.states.wa.otp.until)}. NSW does not reduce the amount but lets an owner-occupier pay up to fifteen months after the contract. In the ACT an owner-occupier buying an off-the-plan unit pays no duty at any price from ${h.date(h.P.states.act.otp_unit.from)}. Queensland and South Australia reach a similar result for first home buyers through their new-home rules.`,
  faqs: (h) => [
    { q: 'How is the Victorian off-the-plan deduction worked out on a $1.2 million apartment that is half built?', a: `The State Revenue Office Victoria deducts only the construction cost still to be incurred after the contract date. In its own example, Jordan signs for ${h.aud(1200000)} when the building is half finished and ${h.aud(250000)} is deducted, leaving a dutiable value of ${h.aud(1200000 - 250000)}. At the general scale that is ${h.duty('vic', 1200000, 'investor', 'offplan', false, { vicConstruction: 250000 })} instead of ${h.duty('vic', 1200000, 'investor')}.` },
    { q: 'Can an investor get the WA off-the-plan duty concession?', a: `Yes. RevenueWA's concession for contracts from ${h.date(h.P.states.wa.otp.from)} to ${h.date(h.P.states.wa.otp.until)} is not limited to owner-occupiers. An investor buying an ${h.aud(850000)} apartment before construction starts pays ${h.aud(h.calc('wa', 850000, 'investor', 'offplan', false, { waOtpStage: 'pre' }).duty)} instead of ${h.aud(h.calc('wa', 850000, 'investor').duty)}. The application must be made within twelve months of the strata title being registered.` },
    { q: 'How long can I defer NSW stamp duty on an off-the-plan unit I will live in?', a: 'Revenue NSW allows up to twelve extra months: duty becomes due at the earliest of fifteen months after the contract, settlement, or an assignment of the contract. Every buyer must be a citizen or permanent resident, or hold certain partner or New Zealand visas, no trust or company may be involved, and you must move in within twelve months and stay twelve months.' },
    { q: 'Is a Tasmanian off-the-plan apartment bought in August 2026 still eligible for a duty concession?', a: `No. The State Revenue Office of Tasmania's off-the-plan apartment concession does not apply to contracts after ${h.date(h.P.states.tas.otp_ended)}. A ${h.aud(550000)} apartment contracted in August 2026 pays the full scale, ${h.duty('tas', 550000, 'investor', 'offplan')}. A first home buyer may still receive the ${h.aud(h.P.states.tas.fhog.amount)} grant on a new home, which is separate from duty.` },
    { q: 'Does the ACT off-the-plan unit exemption have a price limit in 2026?', a: `Not any more. For contracts from ${h.date(h.P.states.act.otp_unit.from)} an owner-occupier buying an off-the-plan apartment or unit-titled townhouse pays no conveyance duty at any price; the previous limit was ${h.aud(1020000)}. You must live in it for a year. An investor buying the same ${h.aud(900000)} unit still pays ${h.duty('act', 900000, 'investor', 'offplan')}.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const wa = (p: number, st: 'pre' | 'under') => h.calc('wa', p, 'investor', 'offplan', false, { waOtpStage: st });
    const waPrices = [700000, 800000, 850000, 900000, 1500000];
    return `
<h2>Five mechanisms, one per jurisdiction</h2>
<p>"Off-the-plan concession" sounds like one thing. It is really five unrelated rules that happen to share a name, and they reward different buyers. The summary below is the shortest honest version.</p>
${h.table(['Where', 'Mechanism', 'Who can use it', 'Window'], [
  ['VIC', 'duty on price less construction cost still to come', `any buyer for strata lots (temporary); otherwise home buyers under ${h.aud(750000)} or ${h.aud(P.vic.ppr_to)} after deduction`, `contracts ${h.date(P.vic.otp_temp.from)} to ${h.date(P.vic.otp_temp.until)}`],
  ['WA', `share of duty removed, capped at ${h.aud(P.wa.otp.cap)}`, 'any buyer, strata developments', `contracts ${h.date(P.wa.otp.from)} to ${h.date(P.wa.otp.until)}`],
  ['NSW', 'payment deferred up to 12 extra months', 'owner-occupiers who are citizens or permanent residents', 'ongoing'],
  ['ACT', 'no duty on the unit', 'owner-occupiers', `from ${h.date(P.act.otp_unit.from)}, no cap`],
  ['TAS', 'apartment concession', 'closed', `ended for contracts after ${h.date(P.tas.otp_ended)}`],
], 'Off-the-plan duty rules in 2026-27', ['l', 'l', 'l', 'l'])}
<p>Queensland, South Australia and the Northern Territory have no off-the-plan rule as such, but their new-home rules reach off-the-plan buyers: South Australia's first home relief names off-the-plan apartments, and the Territory's HomeGrown grant includes off-the-plan purchases.</p>

<h2>Victoria: a smaller taxable value</h2>
<p>The State Revenue Office Victoria charges duty on the contract price less the construction costs that will be incurred after the contract date. The earlier you sign, the larger the deduction. Its published examples: Michelle contracts for ${h.aud(1000000)} with ${h.aud(400000)} of construction still to come, so duty is assessed on ${h.aud(1000000 - 400000)}; Paige buys at ${h.aud(620000)} with ${h.aud(465000)} deducted, a dutiable value of ${h.aud(620000 - 465000)}.</p>
${h.table(['Construction cost still to come', 'Dutiable value', 'Investor', 'First home buyer'], [0, 150000, 300000, 450000].map((c) => [h.aud(c), h.aud(800000 - c), h.duty('vic', 800000, 'investor', 'offplan', false, { vicConstruction: c }), h.duty('vic', 800000, 'first', 'offplan', false, { vicConstruction: c })]), 'Victorian strata apartment at $800,000 under the temporary concession, duty by stage of construction', ['l', 'r', 'r', 'r'])}
<p>Two restrictions apply. Outside the temporary strata concession, the deduction is only available to a buyer who will live in the home and whose dutiable value after the deduction is no more than ${h.aud(750000)} for a first home buyer or ${h.aud(P.vic.ppr_to)} for another owner-occupier. And the foreign purchaser additional duty is always worked out on the price before the deduction. The ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')} covers the details.</p>

<h2>Western Australia: a share off the duty, by stage</h2>
<p>RevenueWA does not shrink the value; it removes a percentage of the duty. Before construction starts the concession is ${h.pct(P.wa.otp.pre.max, 0)} for a dwelling up to ${h.aud(P.wa.otp.full_to)}, sliding to ${h.pct(P.wa.otp.pre.min, 0)} at ${h.aud(P.wa.otp.floor_from)} and above. Once construction is under way it runs from ${h.pct(P.wa.otp.under.max, 0)} down to ${h.pct(P.wa.otp.under.min, 1)}. Either way the reduction is capped at ${h.aud(P.wa.otp.cap)}.</p>
${h.table(['Price', 'General duty', 'Before construction', 'Under construction'], waPrices.map((p) => [h.aud(p), h.aud(wa(p, 'pre').generalDuty), h.aud(wa(p, 'pre').duty), h.aud(wa(p, 'under').duty)]), 'Western Australia, off-the-plan strata dwelling, duty after the concession', ['l', 'r', 'r', 'r'])}
<p>The scheme covers multi-tier strata, single-tier strata (since ${h.date('2025-03-21')}) and survey-strata (since ${h.date('2026-03-12')}). The claim is lodged after the fact, within twelve months of the strata title being registered. A first home buyer may also qualify for the first home owner rate; RevenueWA decides how the two combine, so the calculator shows them separately.</p>
<!--mini:waOffPlan-->

<h2>NSW: same amount, later date</h2>
<p>Revenue NSW normally wants duty within three months of the contract, or at settlement if sooner. For an off-the-plan home you will live in, it can wait up to twelve months more: the due date becomes the earliest of fifteen months after the contract, settlement, or an assignment of the contract. The duty itself is unchanged, ${h.duty('nsw', 900000)} on a ${h.aud(900000)} unit for a buyer who is not a first home buyer. Each buyer must be a citizen or permanent resident, or hold a partner visa (subclass 309 or 820) or a New Zealand special category visa (subclass 444) with at least 200 days in Australia in the previous twelve months. Trusts and companies are excluded, and vacant land qualifies only if the contract includes building the home. See the ${h.a('nsw-off-the-plan', 'NSW off-the-plan page')}.</p>

<h2>ACT: owner-occupied units pay nothing</h2>
<p>From ${h.date(P.act.otp_unit.from)} an owner-occupier buying an off-the-plan apartment or unit-titled townhouse pays no conveyance duty, whatever the price; until then the exemption stopped at ${h.aud(1020000)}. You must live in the unit for a year. A separate exemption covers a newly unit-titled home bought from the developer within ${P.act.unit_titled.within_years_of_plan} years of the units plan. An investor pays the non-owner-occupier rates either way.</p>
<!--mini:actUnit-->

<h2>Queensland, South Australia and the Territory</h2>
<p>A first home buyer of a new home in Queensland pays no transfer duty at any price under the first home (new home) concession, and in South Australia the first home relief names off-the-plan apartments among the eligible properties. For an ${h.aud(750000)} apartment the engine gives ${h.duty('qld', 750000, 'first', 'offplan')} in Queensland and ${h.duty('sa', 750000, 'first', 'offplan')} in South Australia, against ${h.duty('qld', 750000, 'investor')} and ${h.duty('sa', 750000, 'investor')} for an investor. In the Territory duty is unchanged, but the ${h.aud(P.nt.fhog.amount)} HomeGrown grant is paid on an off-the-plan first home.</p>
`;
  },
  related: ['vic-off-the-plan', 'wa-off-the-plan', 'nsw-off-the-plan', 'act-off-the-plan', 'investor-stamp-duty', 'house-and-land-package-stamp-duty'],
  sources: ['vic_otp', 'vic_otp_temp', 'wa_otp', 'nsw_otp', 'act_otp', 'act_unit_titled', 'tas_concessions', 'sa_fhb_properties'],
});
