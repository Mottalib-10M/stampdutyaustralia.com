import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'qld',
  path: '/qld/',
  group: 'qld',
  kind: 'hub',
  order: 10,
  tool: 'qld',
  nav: 'QLD calculator',
  card: 'Transfer duty in Queensland: home concession rate, first home concessions, AFAD and the $30,000 grant.',
  title: 'Stamp Duty QLD 2026-27: Home Concession and Transfer Duty',
  description: 'Stamp duty QLD for 2026-27: home concession rate for owner-occupiers, no duty on a first new home, 8% AFAD and the citizenship rule from 1 August 2026.',
  h1: 'Stamp duty calculator Queensland',
  intro: 'Transfer duty on a Queensland purchase under the general and home concession scales, with the first home concessions, the foreign acquirer duty and the First Home Owner Grant.',
  resume: (h) => `Queensland discounts transfer duty for anyone who moves into the home they buy, not only for first home buyers: the home concession rate is open to every owner-occupier, whatever they owned before. On a ${h.aud(950000)} home the Queensland Revenue Office's own example comes to ${h.duty('qld', 950000, 'owner')}, where an investor pays ${h.duty('qld', 950000, 'investor')}. First home buyers go further: nothing at all on a new home or on vacant land for a home, with no value cap, for contracts from 1 May 2025, and a fixed reduction on an established home that shrinks to nothing at ${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].below)}. Since ${h.date(h.P.states.qld.citizenship_rule_from)} each of those concessions needs the buyer to be an Australian citizen, a permanent resident or a specified foreign retiree, and to move in within a year of settlement. Foreign buyers add additional foreign acquirer duty of ${h.pct(h.P.states.qld.surcharge, 0)} of the value.`,
  faqs: (h) => [
    { q: 'Who can use the Queensland home concession rate?', a: `Any individual buying a home they will live in, whether or not they have owned property before. From ${h.date(h.P.states.qld.citizenship_rule_from)} the buyer must also be an Australian citizen, a permanent resident or a specified foreign retiree. On ${h.aud(700000)} the home concession rate gives ${h.duty('qld', 700000, 'owner')}, against ${h.duty('qld', 700000, 'investor')} at the general rate, a saving of ${h.aud(h.calc('qld', 700000, 'owner').saving)}.` },
    { q: 'What changed for Queensland duty concessions on 1 August 2026?', a: 'Contracts from that date need every buyer claiming the home or first home concessions to be an Australian citizen, a permanent resident or a specified foreign retiree. The buyer must move in within one year of settlement, a deadline that cannot be extended, and must not rent out the whole property before moving in or during the following year. Renting out part of the home is allowed while you keep living there.' },
    { q: 'How much duty is there on an $850,000 investment property in Queensland?', a: `${h.duty('qld', 850000, 'investor')}, which is the Queensland Revenue Office's own worked example. The general scale applies because the buyer will not live there: ${h.aud(h.P.states.qld.brackets[3].base)} plus ${h.pct(h.P.states.qld.brackets[3].rate)} of every $100, or part of $100, above ${h.aud(h.P.states.qld.brackets[3].from)}. If the same buyer moved in, the home concession rate would bring it down to ${h.duty('qld', 850000, 'owner')}.` },
    { q: 'Does a Queensland first home buyer pay duty on a new $1.2 million house?', a: `No. For contracts from 1 May 2025 the first home (new home) concession removes the whole of the duty, with no value cap, so a ${h.aud(1200000)} new house carries no transfer duty for an eligible first home buyer. On an established house at the same price, the buyer would pay the home concession rate, ${h.duty('qld', 1200000, 'first')}, because the established-home concession ends at ${h.aud(800000)}.` },
    { q: 'Can I lose the Queensland home concession after settlement?', a: 'Yes. You can lose it if you do not move in within one year of settlement, if you rent out the whole property before moving in or within the first year, or if you demolish the house before living in it. Breaking any of these conditions means the concession no longer applies to the purchase, so it is worth planning the move before you sign.' },
    { q: 'Does the Queensland First Home Owner Grant depend on my income?', a: `No. The ${h.aud(h.P.states.qld.fhog.amount)} grant, available for contracts from 20 November 2023, is not means tested. It is paid on a new home valued below ${h.aud(h.P.states.qld.fhog.below)}, to Australian citizens or permanent residents who live in it for six months within the first year. Combined with the full first home duty concession, a ${h.aud(700000)} new home brings ${h.aud(h.calc('qld', 700000, 'first', 'new').grant.amount)} and no duty.` },
    { q: 'How is AFAD added to Queensland transfer duty?', a: `Additional foreign acquirer duty is ${h.pct(h.P.states.qld.surcharge, 0)} of the value of the residential land a foreign person acquires, paid on top of transfer duty at the general rate. When a foreign investor buys a unit for ${h.aud(800000)}, the total is ${h.duty('qld', 800000, 'investor', 'established', true)}, of which ${h.aud(h.calc('qld', 800000, 'investor', 'established', true).surcharge)} is AFAD.` },
  ],
  body: (h) => `
<h2>Two Queensland scales, and which one you are on</h2>
<p>Like the ACT, Queensland runs a separate scale for people who will live in the property, and it applies to repeat buyers as much as to first-timers. Which one applies depends on how the property will be used, not on your history as a buyer. Both are charged on each $100 of value, or part of $100, above the threshold.</p>
${h.table(['Dutiable value', 'General rate', 'Home concession rate'], [0, 5000, 75000, 350000, 540000, 1000000].map((from) => {
  const g = [...h.P.states.qld.brackets].reverse().find((b) => b.from <= from)!;
  const c = [...h.P.states.qld.home_brackets].reverse().find((b) => b.from <= from)!;
  const fmt = (b: { from: number; base: number; rate: number }) => (b.rate === 0 ? 'nil' : b.from === 0 || b.base === 0 ? `$${h.num(b.rate * 100, 2)} per $100${b.from ? ` over ${h.aud(b.from)}` : ''}` : `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 over ${h.aud(b.from)}`);
  return [`from ${h.aud(from)}`, fmt(g), fmt(c)];
}), 'Queensland transfer duty, contracts in 2026-27', ['l', 'l', 'l'])}
<p>The home concession scale is lighter at the bottom, ${h.pct(h.P.states.qld.home_brackets[0].rate)} on the first ${h.aud(h.P.states.qld.home_brackets[1].from)}, and then follows the general scale's marginal rates with a lower base. That is why the gap between the two columns grows to ${h.aud(h.calc('qld', 540000, 'owner').saving)} by ${h.aud(540000)} and then stays fixed at that amount for every price above it. A ${h.aud(3000000)} home you live in still saves exactly the same as a ${h.aud(600000)} one.</p>

<h2>Queensland duty for five buyers at common prices</h2>
${h.table(['Price', 'Investor', 'Owner-occupier', 'First home, established', 'First home, new', 'Foreign investor'], [500000, 700000, 795000, 850000, 1000000, 1500000].map((p) => [h.aud(p), h.duty('qld', p, 'investor'), h.duty('qld', p, 'owner'), h.duty('qld', p, 'first'), h.duty('qld', p, 'first', 'new'), h.duty('qld', p, 'investor', 'established', true)]), 'Duty plus AFAD where it applies; first home columns assume the buyer is eligible', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The ${h.aud(795000)} row is the Queensland Revenue Office's example for an established first home: ${h.duty('qld', 795000, 'first')}, the home concession duty less the last step of the first home reduction. At ${h.aud(800000)} the reduction is gone and the buyer is back on the plain home concession rate.</p>

<h2>First home buyers: new home, land or established</h2>
<p>On an established home the first home concession is not a separate rate. The QRO works out the home concession duty and subtracts a fixed amount: ${h.aud(h.P.states.qld.first_home_table[0].deduct)} below ${h.aud(h.P.states.qld.first_home_table[0].below)}, then ${h.aud(h.P.states.qld.first_home_table[0].deduct - h.P.states.qld.first_home_table[1].deduct)} less for each ${h.aud(10000)} band until nothing is left at ${h.aud(800000)}. Below ${h.aud(h.P.states.qld.first_home_table[0].below)} that deduction wipes out the duty completely.</p>
<p>For a new home, or vacant land on which you will build your first home, contracts signed from 1 May 2025 carry no duty at all, without a value cap. If part of the land is not used for residential purposes, that part still pays the general rate. The ${h.a('qld-first-home-buyers', 'Queensland first home buyer page')} goes through each case and the ${h.a('qld-home-concession', 'home concession page')} covers owner-occupiers buying again.</p>

<h2>The residence rules since 1 August 2026</h2>
<p>For contracts from ${h.date(h.P.states.qld.citizenship_rule_from)}, the home and first home concessions are limited to Australian citizens, permanent residents and specified foreign retirees. You must move in within one year of settlement, and that year cannot be extended. You cannot rent out the whole home before moving in or during the year after, although renting part of it is allowed if you keep living there (for leases starting from 10 September 2024). Demolishing the house before living in it ends the concession.</p>

<h2>The $30,000 grant on new homes</h2>
<p>Alongside the duty concession, the First Home Owner Grant pays ${h.aud(h.P.states.qld.fhog.amount)} on a new home valued below ${h.aud(h.P.states.qld.fhog.below)}, for contracts from 20 November 2023. Income does not matter, but you must be a citizen or permanent resident and live in the home for six months within the first year. Test a price here:</p>
<!--mini:grantState-->

<h2>Foreign buyers and AFAD</h2>
<p>A foreign person pays additional foreign acquirer duty of ${h.pct(h.P.states.qld.surcharge, 0)} on top of general-rate transfer duty. Since the citizenship rule, a foreign buyer who intends to live in the home no longer gets the home concession either, unless they are a specified foreign retiree. Who counts as foreign, and how shares are treated, is on the ${h.a('qld-foreign', 'Queensland foreign buyer page')}.</p>

<h2>Queensland in the national picture</h2>
<p>For a repeat owner-occupier, Queensland is usually among the cheapest places to buy: ${h.duty('qld', 800000)} on ${h.aud(800000)} against ${h.duty('vic', 800000)} in Victoria and ${h.duty('nsw', 800000)} in NSW. Above ${h.aud(1000000)}, where the ${h.pct(h.P.states.qld.brackets[4].rate)} band starts, the advantage narrows. The ${h.a('home', 'eight-state comparison')} shows where your own price falls.</p>
`,
  related: ['qld-first-home-buyers', 'qld-home-concession', 'qld-foreign', 'nsw', 'first-home-owner-grant', 'price-800000'],
  sources: ['qld_rates', 'qld_concession_rates', 'qld_first_home', 'qld_first_home_new', 'qld_home_concession', 'qld_afad', 'qld_fhog'],
});
