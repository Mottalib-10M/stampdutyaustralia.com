import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'wa',
  path: '/wa/',
  group: 'wa',
  kind: 'hub',
  order: 10,
  tool: 'wa',
  nav: 'WA calculator',
  card: 'Transfer duty in Western Australia: first home owner rate from 7 May 2026, off-the-plan concession, 7 % foreign duty.',
  title: 'Stamp Duty WA 2026-27: Transfer Duty and First Home Rate',
  description: 'Stamp duty WA for 2026-27: no duty on a first home to $600,000 since 7 May 2026, first home owner rate to $800,000, off-the-plan concession and 7% foreign duty.',
  h1: 'Stamp duty calculator Western Australia',
  intro: 'Transfer duty on a Western Australian purchase, with the first home owner rate as it stands since 7 May 2026, the off-the-plan concession, the concessional rate and foreign transfer duty.',
  resume: (h) => `Western Australia moved its first home thresholds on ${h.date(h.P.states.wa.fhor.from)}: a first home buyer now pays no transfer duty on a home up to ${h.aud(h.P.states.wa.fhor.home_exempt_to)} and, between that and ${h.aud(h.P.states.wa.fhor.home_cap)}, pays $${h.num(h.P.states.wa.fhor.home_rate * 100, 2)} for every $100 above ${h.aud(h.P.states.wa.fhor.home_exempt_to)}. The same rate applies to established homes, not only new ones, because RevenueWA aligns eligibility with the First Home Owner Grant rules. Land for a first home is duty free to ${h.aud(h.P.states.wa.fhor.land_exempt_to)}. Everyone else pays the general rate, which tops out at $${h.num(h.P.states.wa.brackets[4].rate * 100, 2)} per $100 above ${h.aud(h.P.states.wa.brackets[4].from)}, so a ${h.aud(700000)} house costs a repeat buyer ${h.duty('wa', 700000)}. Off-the-plan apartments and strata homes bought between ${h.date(h.P.states.wa.otp.from)} and ${h.date(h.P.states.wa.otp.until)} can have duty cut by up to ${h.aud(h.P.states.wa.otp.cap)}. Foreign buyers add ${h.pct(h.P.states.wa.surcharge, 0)} foreign transfer duty on the share they acquire.`,
  faqs: (h) => [
    { q: 'What are the WA first home owner rate thresholds from 7 May 2026?', a: `For a home: no duty up to ${h.aud(h.P.states.wa.fhor.home_exempt_to)}, then $${h.num(h.P.states.wa.fhor.home_rate * 100, 2)} per $100 above it up to ${h.aud(h.P.states.wa.fhor.home_cap)}. For vacant land: no duty up to ${h.aud(h.P.states.wa.fhor.land_exempt_to)}, then $${h.num(h.P.states.wa.fhor.land_rate * 100, 2)} per $100 above it up to ${h.aud(h.P.states.wa.fhor.land_cap)}. A ${h.aud(700000)} first home therefore carries ${h.duty('wa', 700000, 'first')} instead of ${h.duty('wa', 700000)}.` },
    { q: 'Which WA first home thresholds applied before 7 May 2026?', a: `From 21 March 2025 to 6 May 2026, the full exemption stopped at ${h.aud(500000)} and the concession at ${h.aud(700000)} in the Perth and Peel regions, or ${h.aud(750000)} elsewhere in the state. A contract signed in that window keeps those thresholds. The current figures, ${h.aud(h.P.states.wa.fhor.home_exempt_to)} and ${h.aud(h.P.states.wa.fhor.home_cap)}, apply across the whole state.` },
    { q: 'Do I get the WA first home rate at settlement or as a refund?', a: 'Either. If your eligibility has been pre-approved, the first home owner rate is applied when duty is assessed. If it has not, RevenueWA assesses duty at the general rate at settlement and you then apply for a refund of the difference once eligibility is confirmed. Your settlement figures should show which route you are on.' },
    { q: 'How does the WA off-the-plan duty concession taper above $800,000?', a: `Before construction starts, the concession is ${h.pct(h.P.states.wa.otp.pre.max, 0)} of the duty up to ${h.aud(h.P.states.wa.otp.full_to)}, falling evenly to ${h.pct(h.P.states.wa.otp.pre.min, 0)} at ${h.aud(h.P.states.wa.otp.floor_from)}. Under construction it starts at ${h.pct(h.P.states.wa.otp.under.max, 0)} and falls to ${h.pct(h.P.states.wa.otp.under.min, 1)}. The saving can never exceed ${h.aud(h.P.states.wa.otp.cap)}, so an investor paying ${h.aud(850000)} before construction pays ${h.duty('wa', 850000, 'investor', 'offplan', false, { waOtpStage: 'pre' })}.` },
    { q: 'What is the WA concessional rate for a home under $200,000?', a: `A principal place of residence valued at ${h.aud(h.P.states.wa.concessional_cap)} or less can use the concessional scale: $${h.num(h.P.states.wa.concessional_brackets[0].rate * 100, 2)} per $100 on the first ${h.aud(h.P.states.wa.concessional_brackets[1].from)}, then $${h.num(h.P.states.wa.concessional_brackets[1].rate * 100, 2)} per $100 above. On a ${h.aud(180000)} home it gives ${h.duty('wa', 180000, 'owner')}, against ${h.duty('wa', 180000, 'investor')} at the general rate.` },
    { q: 'How is WA foreign transfer duty split between joint buyers?', a: `It is charged only on the share a foreign person acquires. RevenueWA's example: Kate and Simon buy a ${h.aud(400000)} home as joint tenants and only Simon is a foreign person, so foreign transfer duty of ${h.pct(h.P.states.wa.surcharge, 0)} applies to his half, ${h.aud(h.P.states.wa.surcharge * 200000)}. Ordinary transfer duty is still charged on the whole value.` },
    { q: 'Is the WA First Home Owner Grant cap higher in the north?', a: `Yes. For transactions from ${h.date(h.P.states.wa.fhor.from)}, the ${h.aud(h.P.states.wa.fhog.amount)} grant on a new home applies up to ${h.aud(h.P.states.wa.fhog.cap_south)} south of the 26th parallel, which includes Perth, and up to ${h.aud(h.P.states.wa.fhog.cap_north)} north of it. Before that date the cap was ${h.aud(750000)}. The grant is for new homes only, unlike the duty rate.` },
  ],
  body: (h) => `
<h2>The general rate of transfer duty in WA</h2>
<p>RevenueWA charges duty per $100, or part of $100, of the dutiable value. Investors, repeat owner-occupiers above ${h.aud(h.P.states.wa.concessional_cap)}, and first home buyers above the cap all land on this table.</p>
${h.table(['Dutiable value', 'General rate'], h.P.states.wa.brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `above ${h.aud(b.from)}`, b.from === 0 ? `$${h.num(b.rate * 100, 2)} per $100` : `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 above ${h.aud(b.from)}`]), 'Western Australian transfer duty, general rate', ['l', 'l'])}
<p>A small concessional scale also exists for a home you will live in when the value is ${h.aud(h.P.states.wa.concessional_cap)} or less. At that level it means a ${h.aud(150000)} house costs an owner-occupier ${h.duty('wa', 150000, 'owner')} rather than ${h.duty('wa', 150000, 'investor')}.</p>

<h2>What a WA buyer pays at common prices</h2>
${h.table(['Price', 'Home buyer, not first', 'First home', 'First home, vacant land', 'Foreign investor'], [450000, 550000, 600000, 700000, 800000, 1000000].map((p) => [h.aud(p), h.duty('wa', p, 'owner'), h.duty('wa', p, 'first'), h.duty('wa', p, 'first', 'vacant'), h.duty('wa', p, 'investor', 'established', true)]), 'Contracts from 7 May 2026, Perth or regional', ['l', 'r', 'r', 'r', 'r'])}
<p>Look at the ${h.aud(800000)} row. The first home owner rate at its cap gives ${h.duty('wa', 800000, 'first')}, almost exactly the general duty of ${h.duty('wa', 800000)}: the rate of $${h.num(h.P.states.wa.fhor.home_rate * 100, 2)} per $100 is steep enough to catch up with the full scale by the top of the band. The concession is worth most right at ${h.aud(h.P.states.wa.fhor.home_exempt_to)}, where it removes ${h.duty('wa', 600000)} of duty, and it thins out quickly after that: a ${h.aud(650000)} first home already costs ${h.duty('wa', 650000, 'first')} instead of ${h.duty('wa', 650000)}.</p>

<h2>First home owner rate: established homes count</h2>
<p>RevenueWA ties eligibility for the rate to the First Home Owner Grant rules, yet the rate itself is not limited to new homes: an established house qualifies, which is not the case for South Australia's duty relief. Under the previous thresholds, which ran from 21 March 2025 to 6 May 2026, the exemption stopped at ${h.aud(500000)}, and the concession ended at ${h.aud(700000)} in Perth and Peel or ${h.aud(750000)} in the rest of the state. Today one set of figures covers every region. The eligibility rules and the refund route are on the ${h.a('wa-first-home-owner-rate', 'WA first home owner rate page')}.</p>

<h2>Off the plan: a concession that depends on the stage of building</h2>
<p>For contracts from ${h.date(h.P.states.wa.otp.from)} to ${h.date(h.P.states.wa.otp.until)}, RevenueWA reduces duty on new strata homes bought off the plan. A contract signed before construction begins earns the larger share; one signed while building is under way earns three quarters of that. Above ${h.aud(h.P.states.wa.otp.full_to)} the share falls in a straight line until ${h.aud(h.P.states.wa.otp.floor_from)}, and the dollar saving is capped at ${h.aud(h.P.states.wa.otp.cap)}.</p>
<!--mini:waOffPlan-->
<p>Multi-tier strata buildings qualify, single-tier strata since 21 March 2025 and survey-strata lots since 12 March 2026. The application goes in within 12 months of the transfer being registered. Worked figures by price are on the ${h.a('wa-off-the-plan', 'WA off-the-plan page')}.</p>

<h2>Foreign transfer duty</h2>
<p>A foreign person adds ${h.pct(h.P.states.wa.surcharge, 0)} of the value of the share they acquire. On a ${h.aud(1000000)} house bought outright, that is ${h.aud(h.calc('wa', 1000000, 'investor', 'established', true).surcharge)} on top of ${h.duty('wa', 1000000, 'investor')} of transfer duty.</p>

<h2>The grant, north and south of the 26th parallel</h2>
<p>The ${h.aud(h.P.states.wa.fhog.amount)} First Home Owner Grant is limited to new homes. Since ${h.date(h.P.states.wa.fhor.from)} its value cap is ${h.aud(h.P.states.wa.fhog.cap_south)} in Perth and the south and ${h.aud(h.P.states.wa.fhog.cap_north)} in the north, up from ${h.aud(750000)}. A first home buyer building or buying new at ${h.aud(600000)} therefore pays no duty and receives the grant.</p>

<h2>WA beside the other states</h2>
<p>WA sits near the middle for repeat buyers: ${h.duty('wa', 800000)} on ${h.aud(800000)}, against ${h.duty('nsw', 800000)} in NSW and ${h.duty('sa', 800000)} in South Australia. For foreign buyers its ${h.pct(h.P.states.wa.surcharge, 0)} surcharge is shared with South Australia as the lowest of the six states that charge one; the two territories charge none. Compare your own case in the ${h.a('home', 'eight-state calculator')}.</p>
`,
  related: ['wa-first-home-owner-rate', 'wa-off-the-plan', 'off-the-plan-stamp-duty', 'first-home-owner-grant', 'sa', 'price-800000'],
  sources: ['wa_rates', 'wa_fhor', 'wa_otp', 'wa_ftd', 'wa_fhog'],
});
