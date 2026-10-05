import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nt',
  path: '/nt/',
  group: 'nt',
  kind: 'hub',
  order: 10,
  tool: 'nt',
  nav: 'NT calculator',
  card: 'Stamp duty in the Northern Territory: the formula below $525,000, the house and land exemption and the $50,000 HomeGrown grant.',
  title: 'Stamp Duty NT 2026-27: Formula, HLPE and HomeGrown Grant',
  description: 'Stamp duty NT for 2026-27: a formula up to $525,000 then 4.95% of the value, payable within 60 days, no duty on a house and land package and a $50,000 grant.',
  h1: 'Stamp duty calculator Northern Territory',
  intro: 'Stamp duty on a Northern Territory purchase, worked out with the Territory Revenue Office formula, with the House and Land Package Exemption and the HomeGrown and FreshStart grants.',
  resume: (h) => `The Northern Territory does not use tax brackets for homes up to ${h.aud(h.P.states.nt.formula.upto)}. Its calculator applies a curve instead: take the value in thousands of dollars, V, and duty is ${h.num(h.P.states.nt.formula.a, 8)} times V squared plus ${h.P.states.nt.formula.b} times V. On ${h.aud(400000)} that gives ${h.duty('nt', 400000)}. Above ${h.aud(h.P.states.nt.formula.upto)} the curve gives way to a flat ${h.pct(h.P.states.nt.flat_bands[0].rate, 2)} of the whole value, rising to ${h.pct(h.P.states.nt.flat_bands[1].rate, 2)} from ${h.aud(h.P.states.nt.flat_bands[1].from)} and ${h.pct(h.P.states.nt.flat_bands[2].rate, 2)} from ${h.aud(h.P.states.nt.flat_bands[2].from)}. Duty is due within ${h.P.states.nt.payment_days} days of signing, or at settlement if that is earlier. There is no first home concession on an established home. Help goes to new homes: a house and land package bought from a builder in one contract is exempt, and the HomeGrown Territory Grant pays first home buyers ${h.aud(h.P.states.nt.fhog.amount)} on a new home with no price cap.`,
  faqs: (h) => [
    { q: 'How is NT stamp duty calculated on a $500,000 home?', a: `With the Territory formula, because the value is below ${h.aud(h.P.states.nt.formula.upto)}. V is the value divided by 1,000, so 500 here. Duty is ${h.num(h.P.states.nt.formula.a, 8)} × 500 × 500 plus ${h.P.states.nt.formula.b} × 500, which comes to ${h.duty('nt', 500000)}. The rate on each extra dollar keeps rising through the formula range, which is why there is no single marginal rate to quote.` },
    { q: 'When must NT stamp duty be paid after signing a contract?', a: `Within ${h.P.states.nt.payment_days} days of signing the contract, or at settlement if settlement comes first. That is a much shorter window than the three months allowed in NSW, so on a long settlement the duty can fall due weeks before you get the keys. On a ${h.aud(600000)} home that means having ${h.duty('nt', 600000)} ready early.` },
    { q: 'Who can use the NT House and Land Package Exemption?', a: `A buyer who will live in the home and buys house and land together from a building contractor in a single transaction, for contracts from ${h.date(h.P.states.nt.hlpe.from)} to ${h.date(h.P.states.nt.hlpe.until)}. There is no means test and no value cap. You must move in within 12 months of the home being completed and live there for six continuous months. Buying the land and signing a building contract separately does not qualify.` },
    { q: 'Can I get the $50,000 NT HomeGrown grant and the house and land exemption together?', a: `They are two separate schemes: the grant is paid on a new first home, and the exemption removes duty on a package bought from a builder. This calculator applies both, so a first home buyer on a ${h.aud(650000)} package pays no duty and is shown the ${h.aud(h.P.states.nt.fhog.amount)} grant. Check with the Territory Revenue Office before you count on receiving both.` },
    { q: 'Is there a first home buyer stamp duty concession on an established NT home?', a: `No. In 2026 the Territory's home owner assistance page lists only grants and the house and land exemption. A first home buyer of an established ${h.aud(450000)} unit pays the same ${h.duty('nt', 450000, 'first')} as any other buyer. The ${h.aud(10000)} grant that used to apply to established homes ended on 30 September 2025.` },
    { q: 'Does the Northern Territory charge foreign buyers extra stamp duty?', a: `The Territory's official calculator adds no surcharge for foreign buyers, and neither does ours. A foreign investor buying a ${h.aud(800000)} property in Darwin therefore pays ${h.duty('nt', 800000, 'investor', 'established', true)}, the same as an Australian investor. Every state charges foreign buyers a surcharge of ${h.pct(h.P.states.wa.surcharge, 0)} or more, so the gap is large.` },
  ],
  body: (h) => `
<h2>A formula instead of brackets</h2>
<p>The Territory Revenue Office's online calculator contains the formula that this page uses, read from its code. For values up to ${h.aud(h.P.states.nt.formula.upto)}:</p>
<p><strong>duty = ${h.num(h.P.states.nt.formula.a, 8)} × V² + ${h.P.states.nt.formula.b} × V</strong>, where V is the value divided by 1,000.</p>
<p>Above that point the method changes to a single percentage of the whole value, stepping up twice at the very top of the market.</p>
${h.table(['Value', 'Stamp duty'], [[`up to ${h.aud(h.P.states.nt.formula.upto)}`, 'formula above'], ...h.P.states.nt.flat_bands.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `${h.aud(b.from)} and over`, `${h.pct(b.rate, 2)} of the whole value`])], 'Northern Territory stamp duty on conveyances', ['l', 'l'])}
<p>The formula and the flat rate meet almost exactly at ${h.aud(h.P.states.nt.formula.upto)}, so there is no jump at the join. Because the formula has a squared term, the effective rate climbs steadily: ${h.pct(h.calc('nt', 200000).total / 200000, 2)} at ${h.aud(200000)}, ${h.pct(h.calc('nt', 400000).total / 400000, 2)} at ${h.aud(400000)}, then the flat ${h.pct(h.P.states.nt.flat_bands[0].rate, 2)} from ${h.aud(h.P.states.nt.formula.upto)}.</p>

<h2>Duty and grants at Northern Territory prices</h2>
${h.table(['Price', 'Established, any buyer', 'New home, first buyer: grant', 'New home, other buyer: grant', 'House and land package: duty'], [350000, 450000, 525000, 650000, 800000, 1000000].map((p) => [h.aud(p), h.duty('nt', p), h.aud(h.calc('nt', p, 'first', 'new').grant.amount), h.aud(h.calc('nt', p, 'owner', 'new').grant.amount), h.duty('nt', p, 'owner', 'new', false, { ntPackage: true })]), 'Contracts in 2026-27; duty on a new home bought outside a package is the same as on an established one', ['l', 'r', 'r', 'r', 'r'])}
<p>The table shows where Territory support goes. On an established home nobody gets a break. On a new one, the HomeGrown grant is larger than the duty at every price in the table, and a package bought from a builder removes the duty too.</p>

<h2>The House and Land Package Exemption</h2>
<p>For contracts from ${h.date(h.P.states.nt.hlpe.from)} to ${h.date(h.P.states.nt.hlpe.until)}, there is no stamp duty when you buy a house and land package from a building contractor in one transaction. It has no means test and no value cap, and it is not limited to first home buyers. You must live in the home within 12 months of completion, for six continuous months. The ${h.a('nt-house-and-land', 'NT house and land page')} covers what counts as a package.</p>

<h2>HomeGrown Territory and FreshStart grants</h2>
<p>For contracts from 1 October 2024 to ${h.date(h.P.states.nt.fhog.until)}, the HomeGrown Territory Grant pays ${h.aud(h.P.states.nt.fhog.amount)} to first home buyers of a new home, including off the plan and owner-builders, with no price cap. Vacant land alone does not qualify. Buyers who have owned before can claim the FreshStart New Home Grant of ${h.aud(h.P.states.nt.freshstart.amount)} on a new home over the same period. Both require you to live in the home for 12 months. Applications close on 30 September 2028 for HomeGrown and 31 December 2027 for FreshStart. Run your own case:</p>
<!--mini:ntGrants-->
<p>The full conditions are on the ${h.a('nt-homegrown-grant', 'NT HomeGrown grant page')}.</p>

<h2>Paying within 60 days</h2>
<p>Territory duty falls due ${h.P.states.nt.payment_days} days after the contract is signed, or at settlement if earlier. On a contract with a long settlement, for example a home still being built, that date can arrive well before the keys. Budget for it from the day you sign.</p>

<h2>The Territory among the states</h2>
<p>For a repeat buyer of an established home the NT is one of the dearer places: ${h.duty('nt', 600000)} on ${h.aud(600000)}, against ${h.duty('qld', 600000)} in Queensland and ${h.duty('wa', 600000)} in WA. For foreign buyers it is among the cheapest, with no surcharge. The ${h.a('home', 'eight-state comparison')} shows where your price lands.</p>
`,
  related: ['nt-homegrown-grant', 'nt-house-and-land', 'house-and-land-package-stamp-duty', 'first-home-owner-grant', 'act', 'foreign-buyer-stamp-duty'],
  sources: ['nt_calc', 'nt_stamp_duty', 'nt_hlpe', 'nt_homegrown', 'nt_assistance'],
});
