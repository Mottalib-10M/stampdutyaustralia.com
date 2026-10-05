import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'first-home-buyer-stamp-duty',
  path: '/guides/first-home-buyer-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 10,
  mini: 'fhbState',
  nav: 'First home buyer stamp duty',
  card: 'Where each first home concession stops, by price and property type, and the residence rule that can claw it back.',
  title: 'First Home Buyer Stamp Duty 2026: Where Each State Stops',
  description: 'First home buyer stamp duty in 2026-27 for all 8 states: no duty to $800,000 in NSW, $600,000 in VIC and WA, any price in the ACT, nothing off in Tasmania.',
  h1: 'First home buyer stamp duty, state by state',
  intro: 'The exemption threshold is the number everyone quotes; the price where the concession runs out, and the residence rule attached to it, are the numbers that decide your bill.',
  resume: (h) => `A first home buyer in 2026-27 pays no stamp duty on an established home up to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} in NSW, ${h.aud(h.P.states.vic.fhb.exempt_to)} in Victoria and ${h.aud(h.P.states.wa.fhor.home_exempt_to)} in Western Australia, at any price in the ACT, and nothing is taken off in Tasmania, South Australia or the Northern Territory. Above those lines each state has its own fade: NSW phases the concession out by ${h.aud(h.P.states.nsw.fhbas.home_cap)}, Victoria by ${h.aud(h.P.states.vic.fhb.cap)}, Western Australia by ${h.aud(h.P.states.wa.fhor.home_cap)}, and Queensland deducts a fixed amount that reaches zero at ${h.aud(800000)}. Property type matters as much as price. Queensland and South Australia charge a first home buyer nothing on a new home or land to build on, at any value, while still charging on an established home. Every concession comes with a residence condition, usually moving in within a year and staying six or twelve months, and the office can claw the duty back if you do not.`,
  faqs: (h) => [
    { q: 'Is there any state where a first home buyer pays no stamp duty on a $1.2 million established home?', a: `Only the ACT in 2026-27. Its Home Buyer Concession Scheme has no value limit for contracts from ${h.date(h.P.states.act.hbcs.from)}, so an eligible buyer pays nothing at ${h.aud(1200000)}. In NSW the same purchase costs ${h.duty('nsw', 1200000, 'first')}, in Victoria ${h.duty('vic', 1200000, 'first')} and in Queensland ${h.duty('qld', 1200000, 'first')}, because every other concession has run out well before that price.` },
    { q: 'Why does a first home buyer in Queensland pay duty on an $800,000 established home but not on a new one?', a: `Queensland runs two first home concessions. On an established home it takes the home concession rate and deducts an amount that falls to zero at ${h.aud(800000)}, leaving ${h.duty('qld', 800000, 'first')}. On a new home or vacant land, for contracts from ${h.date('2025-05-01')}, the concession is full with no price cap, so the same buyer pays ${h.duty('qld', 800000, 'first', 'new')}.` },
    { q: 'Do South Australian first home buyers get any stamp duty relief on an existing house?', a: `No. RevenueSA's first home buyer relief, for contracts from ${h.date(h.P.states.sa.fhb_relief.from)}, applies to a new home, an off-the-plan apartment or land to build on, with no cap. An established home pays the ordinary scale: ${h.duty('sa', 600000, 'first')} at ${h.aud(600000)}. The relief also never reduces the foreign ownership surcharge, and you must live in the home for six continuous months within the first year.` },
    { q: 'What happens if I rent out my first home before living in it?', a: 'The concessions in NSW, Victoria, Queensland, South Australia and the ACT all carry a residence condition, and breaking it means the duty waived can be reassessed. In NSW and Victoria you must move in within twelve months and stay twelve continuous months. Queensland gives one year from settlement with no extension and does not allow the whole property to be rented first. South Australia asks for six continuous months within the first year.' },
    { q: 'Does my partner owning a house stop me from claiming the NSW first home exemption?', a: `Under Revenue NSW's rules neither you nor your spouse or de facto partner may have owned residential land in Australia before. A shared purchase can still qualify if the eligible buyers acquire at least half, but not when the other buyer is an ineligible spouse. Without the scheme, a ${h.aud(750000)} home costs ${h.duty('nsw', 750000, 'owner')}.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [500000, 650000, 750000, 850000, 950000];
    const stop: Record<string, string> = {
      nsw: `exempt to ${h.aud(P.nsw.fhbas.home_exempt_to)}, nothing off from ${h.aud(P.nsw.fhbas.home_cap)}`,
      vic: `exempt to ${h.aud(P.vic.fhb.exempt_to)}, nothing off above ${h.aud(P.vic.fhb.cap)}`,
      qld: `deduction of ${h.aud(P.qld.first_home_table[0].deduct)} below ${h.aud(P.qld.first_home_table[0].below)}, zero from ${h.aud(800000)}`,
      wa: `exempt to ${h.aud(P.wa.fhor.home_exempt_to)}, nothing off above ${h.aud(P.wa.fhor.home_cap)}`,
      sa: 'no relief on established homes',
      tas: `ended for settlements after ${h.date(P.tas.fhb_established_ended)}`,
      act: 'no value cap',
      nt: 'no concession on established homes',
    };
    return `
<h2>The fade above the threshold</h2>
<p>A buyer looking at a ${h.aud(650000)} unit in Melbourne and one looking at the same price in Brisbane are in very different positions, even though both are "under the threshold" in the loose way people talk about it. The first table shows duty on an established home for a first home buyer at five prices, so you can see where each concession bites and where it has gone.</p>
${h.table(['State', ...prices.map((p) => h.aud(p)), 'Where it stops'], STATES.map((s) => [h.a(s, STATE_INFO[s].short), ...prices.map((p) => h.duty(s, p, 'first')), stop[s]]), 'First home buyer, established home, 2026-27 contracts', ['l', 'r', 'r', 'r', 'r', 'r', 'l'])}
<p>The fades work differently. NSW starts from full duty and takes off a share of the duty at ${h.aud(P.nsw.fhbas.home_exempt_to)} that shrinks to nothing at ${h.aud(P.nsw.fhbas.home_cap)}. Victoria does the same between ${h.aud(P.vic.fhb.exempt_to)} and ${h.aud(P.vic.fhb.cap)}. Western Australia charges a single steep rate of $${h.num(P.wa.fhor.home_rate * 100, 2)} per $100 on the value above ${h.aud(P.wa.fhor.home_exempt_to)}, which catches up with the general rate at the cap. Queensland applies its home concession scale and then subtracts a fixed amount, ${h.aud(P.qld.first_home_table[0].deduct)} below ${h.aud(P.qld.first_home_table[0].below)}, falling by ${h.aud(P.qld.first_home_table[0].deduct - P.qld.first_home_table[1].deduct)} for each ${h.aud(10000)} band after that.</p>
<p>The practical consequence is that the marginal cost of a slightly dearer home is far higher inside a fade than outside it. In Victoria the step from ${h.aud(650000)} to ${h.aud(700000)} adds ${h.aud(h.calc('vic', 700000, 'first').total - h.calc('vic', 650000, 'first').total)} of duty; in Western Australia the same step adds ${h.aud(h.calc('wa', 700000, 'first').total - h.calc('wa', 650000, 'first').total)}.</p>

<h2>Established, new or land: the property type changes everything</h2>
<p>Three states treat a new home or a block of land more generously than an established home. At ${h.aud(700000)}, the second table runs the same first home buyer through the three property types.</p>
${h.table(['State', 'Established', 'New home', 'Vacant land'], STATES.map((s) => [STATE_INFO[s].short, h.duty(s, 700000, 'first'), h.duty(s, 700000, 'first', 'new'), h.duty(s, 700000, 'first', 'vacant')]), 'First home buyer at $700,000, duty by property type', ['l', 'r', 'r', 'r'])}
<p>Queensland and South Australia stand out: nothing on a new home or land at any price, full duty or close to it on an established home. NSW is the reverse case for land, with a lower ceiling of ${h.aud(P.nsw.fhbas.land_exempt_to)} for the exemption and ${h.aud(P.nsw.fhbas.land_cap)} for the concession. Victoria and Western Australia have separate land thresholds too; the ${h.a('vacant-land-stamp-duty', 'vacant land guide')} lists them. The Northern Territory only removes duty on a new home when house and land are bought as a single package from a building contractor, which the table does not assume.</p>

<h2>Who counts as a first home buyer</h2>
<p>The label sounds universal; the tests are not. NSW asks that you and your spouse never owned residential land in Australia, that you are at least 18 (the age can be waived), and that at least one buyer is a citizen or permanent resident. Victoria asks that at least one buyer is an Australian citizen, a New Zealand citizen or a permanent resident. The ACT's Home Buyer Concession Scheme asks instead that you held no interest in any property, anywhere, in the ${P.act.hbcs.no_property_years} years before the contract, so a former owner can qualify again. Western Australia lines its first home owner rate up with the grant rules. Queensland, since ${h.date(P.qld.citizenship_rule_from)}, requires a citizen, permanent resident or specified foreign retiree.</p>

<h2>The residence condition, compared</h2>
<p>This is where concessions are lost after the fact. Each office writes the condition differently, and the table only repeats what the office itself states.</p>
${h.table(['State', 'Move in', 'Stay', 'Other conditions on the office page'], [
  ['NSW', 'within 12 months of settlement', '12 continuous months', 'contracts from 1 July 2023; ADF members exempt'],
  ['VIC', 'within 12 months', '12 continuous months', 'land: at the latest 12 months after the occupancy certificate or 36 months after settlement'],
  ['QLD', 'within one year of settlement, no extension', 'see the office page', 'no renting the whole home first; demolishing before living there loses the concession'],
  ['WA', 'as for the grant', 'as for the grant', 'eligibility aligned with the first home owner grant'],
  ['SA', 'within the first year', '6 continuous months', 'new homes, off-the-plan apartments, land only'],
  ['TAS', 'not applicable', 'not applicable', 'no first home duty concession in 2026-27'],
  ['ACT', 'within a year of settlement', '1 year', 'no interest in any property in the previous 5 years'],
  ['NT', 'not applicable', 'not applicable', 'no first home duty concession on established homes'],
], 'First home duty concessions: residence requirements as published', ['l', 'l', 'l', 'l'])}
<p>Two details catch people. Victoria's land rule gives you longer, but only up to a fixed limit counted from the occupancy certificate or settlement. Queensland's one-year deadline cannot be extended, whatever happens with the builder. If a requirement is missed, the duty that was waived becomes payable, which is why a conveyancer will ask about your plans before lodging the concession.</p>

<h2>Grants sit on top, not instead</h2>
<p>The concessions above reduce duty. The First Home Owner Grant is a separate cash payment, only for a new home in every state that still pays it, and the ACT ended its grant on ${h.date(P.act.fhog.ceased)}. A first home buyer in Queensland at ${h.aud(700000)} on a new home pays ${h.duty('qld', 700000, 'first', 'new')} and receives ${h.aud(h.calc('qld', 700000, 'first', 'new').grant.amount)}. The ${h.a('first-home-owner-grant', 'grant guide')} compares the eight schemes, and the ${h.a('new-vs-established', 'new versus established guide')} nets duty against grant.</p>

<h2>Changes this year</h2>
<p>Tasmania closed its established-home exemption for settlements after ${h.date(P.tas.fhb_established_ended)}; Western Australia raised its thresholds on ${h.date(P.wa.fhor.from)}; the ACT removed its income and value limits on ${h.date(P.act.hbcs.from)}. The ${h.a('stamp-duty-changes-2026', '2026 changes guide')} dates them all.</p>
`;
  },
  related: ['first-home-owner-grant', 'vacant-land-stamp-duty', 'new-vs-established', 'nsw-first-home-buyers', 'vic-first-home-buyers', 'qld-first-home-buyers'],
  sources: ['nsw_fhbas', 'vic_fhb', 'qld_concession_rates', 'qld_first_home', 'wa_fhor', 'sa_fhb_relief', 'tas_fhb', 'act_hbcs', 'nt_assistance'],
});
