import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'tas',
  path: '/tas/',
  group: 'tas',
  kind: 'hub',
  order: 10,
  tool: 'tas',
  nav: 'TAS calculator',
  card: 'Property transfer duty in Tasmania after the end of the first home exemption, with the $20,000 grant and the 8 % FIDS.',
  title: 'Stamp Duty TAS 2026-27: Transfer Duty After the Exemption',
  description: 'Stamp duty TAS for 2026-27: the first home exemption on established homes ended 30 June 2026, the grant is $20,000 on new homes and foreign buyers pay 8% FIDS.',
  h1: 'Stamp duty calculator Tasmania',
  intro: 'Property transfer duty on a Tasmanian purchase in 2026-27, now that the established-home exemption has closed, with the First Home Owner Grant and the foreign investor duty surcharge.',
  resume: (h) => `Tasmania no longer exempts first home buyers from property transfer duty: the 100 % exemption on established homes up to ${h.aud(h.P.states.tas.fhb_established_cap_until_end)} ended for settlements after ${h.date(h.P.states.tas.fhb_established_ended)}, and the off-the-plan apartment concession closed for contracts after the same date. In 2026-27 every buyer, first home or not, pays the same scale, which the State Revenue Office of Tasmania has used since 21 October 2013. A ${h.aud(600000)} home in Hobart or Launceston therefore costs ${h.duty('tas', 600000, 'first')} in duty for a first home buyer, the same as for an investor. What remains for first home buyers is the First Home Owner Grant on a new home, ${h.aud(h.P.states.tas.fhog.amount)} for transactions from ${h.date(h.P.states.tas.fhog.from)} to ${h.date(h.P.states.tas.fhog.until)}, down from ${h.aud(h.P.states.tas.fhog.previous_amount)} the year before. Foreign buyers pay the foreign investor duty surcharge of ${h.pct(h.P.states.tas.surcharge, 0)} on residential land.`,
  faqs: (h) => [
    { q: 'Is there still a first home buyer stamp duty exemption in Tasmania?', a: `No. The exemption for first home buyers of established homes up to ${h.aud(h.P.states.tas.fhb_established_cap_until_end)} applies only to settlements on or before ${h.date(h.P.states.tas.fhb_established_ended)}. A first home bought in 2026-27 pays the full scale: ${h.duty('tas', 500000, 'first')} on ${h.aud(500000)}. If your contract was signed before July but settled after 30 June 2026, the exemption does not apply, because the cut-off is the settlement date.` },
    { q: 'Does Tasmania charge less duty on a new home in 2026?', a: `Not on the duty itself. New, established and off-the-plan homes all pay the same scale in 2026-27; the off-the-plan apartment concession ended for contracts after ${h.date(h.P.states.tas.otp_ended)}. A new home does bring the ${h.aud(h.P.states.tas.fhog.amount)} First Home Owner Grant to an eligible first home buyer, which more than covers the duty on a home priced at ${h.aud(500000)} or less.` },
    { q: 'Why did the Tasmanian new home grant drop for 2026-27 transactions?', a: `${h.aud(h.P.states.tas.fhog.amount)} for transactions from ${h.date(h.P.states.tas.fhog.from)} to ${h.date(h.P.states.tas.fhog.until)}, after ${h.aud(h.P.states.tas.fhog.previous_amount)} in 2025-26. It is paid on a new home, construction must be completed within 24 months, and you must live in the home for six months within the first 12 months. It is a payment, not a duty reduction: duty is still charged in full.` },
    { q: 'What is the minimum property transfer duty in Tasmania?', a: `${h.aud(h.P.states.tas.minimum)}. Any transfer up to ${h.aud(h.P.states.tas.brackets[1].from)} pays that flat amount, and above it duty is ${h.aud(h.P.states.tas.brackets[1].base)} plus a rate on the excess. The minimum only matters for very small transfers; on an ordinary home the upper bands of the scale do all the work.` },
    { q: 'How much FIDS does a foreign buyer pay on a Tasmanian home?', a: `The foreign investor duty surcharge is ${h.pct(h.P.states.tas.surcharge, 0)} of the value of residential land, and ${h.pct(0.015)} on primary production land, a regime in force since 1 April 2020. On a ${h.aud(700000)} house the surcharge is ${h.aud(h.calc('tas', 700000, 'investor', 'established', true).surcharge)}, which brings the total to ${h.duty('tas', 700000, 'investor', 'established', true)}.` },
    { q: 'Can a Tasmanian pensioner still get a downsizing duty concession?', a: `No. The pensioner downsizing concession covered sales settled on or before 30 June 2025, so a pensioner buying in 2026-27 pays the ordinary scale. On a ${h.aud(450000)} unit that is ${h.duty('tas', 450000)}. Victoria and the ACT still offer pensioner duty relief, with very different limits, as the cross-state pensioner page explains.` },
  ],
  body: (h) => `
<h2>What closed on 30 June 2026</h2>
<p>Three Tasmanian schemes have ended, two of them on 30 June 2026, and each has its own cut-off. Whether the test is the contract or the settlement matters as much as the date:</p>
<ul>
<li>first home buyers of established homes up to ${h.aud(h.P.states.tas.fhb_established_cap_until_end)}: 100 % exemption, for settlements up to ${h.date(h.P.states.tas.fhb_established_ended)};</li>
<li>off-the-plan apartments: concession for contracts up to ${h.date(h.P.states.tas.otp_ended)};</li>
<li>pensioners downsizing to a new home: concession for sales settled by 30 June 2025.</li>
</ul>
<p>The first is the one that catches people out. The test is the settlement date, so a contract signed in May 2026 and settled in August 2026 pays full duty. The ${h.a('tas-first-home-buyers', 'Tasmanian first home buyer page')} works through the timing.</p>

<h2>The Tasmanian scale</h2>
<p>With the concessions gone, every buyer uses this table. Duty is charged per $100, or part of $100, above each threshold.</p>
${h.table(['Dutiable value', 'Duty'], h.P.states.tas.brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `over ${h.aud(b.from)}`, b.rate === 0 ? `${h.aud(b.base)} (minimum)` : `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 over ${h.aud(b.from)}`]), 'Tasmanian property transfer duty, in force since 21 October 2013', ['l', 'l'])}
<p>The top rate, $${h.num(h.P.states.tas.brackets[6].rate * 100, 2)} per $100 above ${h.aud(h.P.states.tas.brackets[6].from)}, is modest by national standards. That is why Tasmania can be cheaper than Victoria or South Australia for a repeat buyer even with no concession at all.</p>

<h2>Tasmanian duty at a range of prices</h2>
${h.table(['Price', 'Any buyer, duty', 'First home buyer, new home: duty less grant', 'Foreign buyer, with FIDS'], [350000, 450000, 600000, 750000, 1000000, 1500000].map((p) => { const r = h.calc('tas', p, 'first', 'new'); return [h.aud(p), h.duty('tas', p), h.aud(r.total - r.grant.amount), h.duty('tas', p, 'investor', 'established', true)]; }), 'Contracts settling in 2026-27; a negative figure means the grant exceeds the duty', ['l', 'r', 'r', 'r'])}
<p>The middle column is a way of reading the grant, not an official figure: duty is still assessed in full and the grant is paid separately. At ${h.aud(450000)} the grant is still larger than the duty; by ${h.aud(600000)} the duty has overtaken it.</p>

<h2>The First Home Owner Grant</h2>
<p>For transactions from ${h.date(h.P.states.tas.fhog.from)} to ${h.date(h.P.states.tas.fhog.until)}, the grant is ${h.aud(h.P.states.tas.fhog.amount)} on a new home. In 2025-26 it was ${h.aud(h.P.states.tas.fhog.previous_amount)}. Building must be finished within 24 months and you must live in the home for six months within the first 12. Check what the grant does to your own numbers:</p>
<!--mini:grantState-->

<h2>Foreign investor duty surcharge</h2>
<p>A foreign person buying residential land pays the foreign investor duty surcharge, ${h.pct(h.P.states.tas.surcharge, 0)} of the value, since 1 April 2020. Primary production land carries a much lower ${h.pct(0.015)}. The surcharge is added to the ordinary scale: on ${h.aud(1000000)}, ${h.duty('tas', 1000000)} of duty plus ${h.aud(h.calc('tas', 1000000, 'investor', 'established', true).surcharge)} of surcharge.</p>

<h2>Tasmania compared</h2>
<p>For a repeat buyer at ${h.aud(600000)}, Tasmania charges ${h.duty('tas', 600000)}, against ${h.duty('sa', 600000)} in South Australia and ${h.duty('vic', 600000)} in Victoria. For a first home buyer it has become one of the most expensive places to buy since July, because every mainland state except South Australia and the Northern Territory still exempts an established first home below some threshold. The ${h.a('home', 'eight-state comparison')} puts your price in context.</p>
`,
  related: ['tas-first-home-buyers', 'first-home-owner-grant', 'stamp-duty-changes-2026', 'foreign-buyer-stamp-duty', 'vic', 'sa'],
  sources: ['tas_rates', 'tas_fhb', 'tas_concessions', 'tas_pensioner', 'tas_fids', 'tas_fhog'],
});
