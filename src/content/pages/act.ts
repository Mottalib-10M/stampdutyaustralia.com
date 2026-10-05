import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'act',
  path: '/act/',
  group: 'act',
  kind: 'hub',
  order: 10,
  tool: 'act',
  nav: 'ACT calculator',
  card: 'Conveyance duty in the ACT: owner-occupier and investor rates, the uncapped Home Buyer Concession Scheme from 1 July 2026.',
  title: 'Stamp Duty ACT 2026-27: Conveyance Duty and HBCS Changes',
  description: 'Stamp duty ACT for 2026-27: owner-occupier and investor rates, flat 4.54% above $1,455,000, and no duty under the Home Buyer Concession Scheme with no caps.',
  h1: 'Stamp duty calculator ACT',
  intro: 'Conveyance duty on a Canberra purchase, with the separate owner-occupier and investor scales, the Home Buyer Concession Scheme without caps, and the unit and pensioner exemptions.',
  resume: (h) => `Since ${h.date(h.P.states.act.hbcs.from)} the ACT has removed every income and property value cap from its Home Buyer Concession Scheme: an eligible buyer pays no conveyance duty at all, whether the home costs ${h.aud(600000)} or ${h.aud(2000000)}. Eligibility does not depend on being a first home buyer in the usual sense. The test is that no buyer has held an interest in any property, anywhere, in the ${h.P.states.act.hbcs.no_property_years} years before the contract, and that you live in the home for a year, starting within a year of settlement. Everyone else pays one of two scales: an owner-occupier rate and a higher rate for buyers who will not live there, the gap between them being ${h.aud(h.calc('act', 600000, 'investor').total - h.calc('act', 600000, 'owner').total)} on a ${h.aud(600000)} purchase. Above ${h.aud(h.P.states.act.owner_brackets[6].from)} both scales become a flat ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)} of the whole value. Owner-occupiers buying a new unit off the plan, and eligible pensioners, are also exempt without a cap.`,
  faqs: (h) => [
    { q: 'Do I qualify for the ACT Home Buyer Concession Scheme if I owned a house ten years ago?', a: `Yes, on that point. The scheme asks that you have had no interest in any property, in Australia or overseas, in the ${h.P.states.act.hbcs.no_property_years} years before the contract, not that you have never owned one. You must also be an individual aged 18 or over and live in the home for a year, starting within a year of settlement. Since ${h.date(h.P.states.act.hbcs.from)}, there is no income or price limit.` },
    { q: 'Why is ACT duty lower for an owner-occupier than for an investor?', a: `The ACT Revenue Office publishes two scales. The owner-occupier rate starts at $${h.num(h.P.states.act.owner_brackets[0].rate * 100, 2)} per $100 against $${h.num(h.P.states.act.investor_brackets[0].rate * 100, 2)} for other buyers, and the gap carries through the bands. On ${h.aud(500000)} an owner-occupier pays ${h.duty('act', 500000, 'owner')} and an investor ${h.duty('act', 500000, 'investor')}. The two scales merge above ${h.aud(h.P.states.act.owner_brackets[6].from)}.` },
    { q: 'What happens to ACT conveyance duty above $1,455,000?', a: `The marginal scale stops and duty becomes ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)} of the entire value, for owner-occupiers and investors alike. A ${h.aud(1500000)} house therefore costs ${h.duty('act', 1500000, 'investor')} either way. Just below the line, the top marginal rate of $${h.num(h.P.states.act.owner_brackets[5].rate * 100, 2)} per $100 means owner-occupiers still pay less than investors.` },
    { q: 'Is there a cap on the ACT off-the-plan unit duty exemption in 2026-27?', a: `Not any more. From ${h.date(h.P.states.act.otp_unit.from)} an owner-occupier buying an apartment or unit-titled townhouse off the plan pays no duty at any price; before that date the exemption stopped at ${h.aud(h.P.states.act.hbcs.previous_cap)}. You must live in the unit for a year. A separate exemption covers a newly unit-titled home bought from the developer within ${h.P.states.act.unit_titled.within_years_of_plan} years of the plan.` },
    { q: 'Does the ACT still pay a First Home Owner Grant?', a: `No. The ACT's First Home Owner Grant ended on 1 July 2019, and nothing has replaced it as a cash payment. Assistance now comes through the duty itself: an eligible buyer under the Home Buyer Concession Scheme saves the whole of the owner-occupier duty, which on a ${h.aud(800000)} home is ${h.duty('act', 800000, 'owner')}.` },
    { q: 'Do ACT pensioners pay conveyance duty when they downsize in 2026?', a: `Not if they are eligible for the Pensioner Duty Concession Scheme. Since ${h.date(h.P.states.act.pensioner.from)} that scheme has no value cap, so an eligible pensioner pays no duty on the home they buy at any price. Without it, the same purchase at ${h.aud(700000)} would cost ${h.duty('act', 700000, 'owner')} at the owner-occupier rate.` },
  ],
  body: (h) => `
<h2>The end of the HBCS caps on 1 July 2026</h2>
<p>Before ${h.date(h.P.states.act.hbcs.from)}, the Home Buyer Concession Scheme was limited by household income and by the value of the home. Both limits are gone. An eligible purchase of a new home, an established home or residential land now attracts no conveyance duty, and the ACT is the only jurisdiction on this site where a buyer can pay nothing on an established ${h.aud(1500000)} house. The conditions that remain are about the buyers, not the property:</p>
<ul>
<li>every buyer is an individual aged 18 or over;</li>
<li>no buyer has held an interest in any property, anywhere, in the ${h.P.states.act.hbcs.no_property_years} years before the contract;</li>
<li>you live in the home for a year, starting within a year of settlement.</li>
</ul>
<p>The five-year look-back is wider than a first home test. Someone who sold a flat in another state seven years ago can qualify; someone who still holds a share in an investment property cannot. Details are on the ${h.a('act-home-buyer-concession', 'ACT Home Buyer Concession Scheme page')}.</p>

<h2>Owner-occupier and investor scales side by side</h2>
<p>For buyers outside the scheme, the ACT Revenue Office applies one of the two tables below. We read them from the rate tables behind its own calculator for 2026-27. Duty is charged per $100 or part of $100.</p>
${h.table(['Value from', 'Owner-occupier', 'Non-owner-occupier'], h.P.states.act.owner_brackets.map((b, i) => { const v = h.P.states.act.investor_brackets[i]; const f = (x: { from: number; base: number; rate: number; flat?: boolean }) => (x.flat ? `${h.pct(x.rate, 2)} of the whole value` : x.from === 0 ? `$${h.num(x.rate * 100, 2)} per $100` : `${h.aud(x.base)} plus $${h.num(x.rate * 100, 2)} per $100 over ${h.aud(x.from)}`); return [b.from === v.from ? h.aud(b.from) : `${h.aud(b.from)} / ${h.aud(v.from)}`, f(b), f(v)]; }), 'ACT conveyance duty, 2026-27 rate tables', ['l', 'l', 'l'])}
<p>The second band starts at ${h.aud(h.P.states.act.owner_brackets[1].from)} for owner-occupiers and ${h.aud(h.P.states.act.investor_brackets[1].from)} for others; from ${h.aud(h.P.states.act.owner_brackets[2].from)} upwards the marginal rates are the same and only the base amount differs. That makes the investor premium a fixed ${h.aud(h.calc('act', 600000, 'investor').total - h.calc('act', 600000, 'owner').total)} across most of the range, until the flat rate takes over and erases it.</p>

<h2>ACT duty at common prices</h2>
${h.table(['Price', 'Owner-occupier', 'HBCS eligible', 'Investor', 'Owner-occupier, off-the-plan unit'], [400000, 600000, 750000, 1000000, 1455000, 2000000].map((p) => [h.aud(p), h.duty('act', p, 'owner'), h.duty('act', p, 'first'), h.duty('act', p, 'investor'), h.duty('act', p, 'owner', 'offplan', false, { actUnit: true })]), 'Contracts from 1 July 2026', ['l', 'r', 'r', 'r', 'r'])}
<p>The off-the-plan column is the second big change of July 2026. An owner-occupier buying a unit-titled apartment or townhouse off the plan pays nothing, whatever the price, where the old exemption stopped at ${h.aud(h.P.states.act.hbcs.previous_cap)}. Try a unit price below:</p>
<!--mini:actUnit-->
<p>The ${h.a('act-off-the-plan', 'ACT off-the-plan page')} also covers the Newly Unit Titled Duty Exemption, which applies to a new unit bought from the developer within ${h.P.states.act.unit_titled.within_years_of_plan} years of the units plan being registered.</p>

<h2>Pensioners</h2>
<p>The Pensioner Duty Concession Scheme also lost its value cap on ${h.date(h.P.states.act.pensioner.from)}. An eligible pensioner pays no duty on the home they buy. The ${h.a('act-pensioner', 'ACT pensioner page')} sets out who counts as eligible.</p>

<h2>No grant, and no foreign question</h2>
<p>The First Home Owner Grant has not been paid in the ACT since 1 July 2019. The ACT Revenue Office's calculator asks no question about foreign buyers, and this calculator adds no foreign surcharge to an ACT purchase.</p>

<h2>Canberra against the states</h2>
<p>Without any concession, an owner-occupier at ${h.aud(800000)} pays ${h.duty('act', 800000)} in the ACT, close to Queensland's ${h.duty('qld', 800000)} and well below Victoria's ${h.duty('vic', 800000)}. With the scheme, an eligible buyer pays nothing at any price, so the ACT is never beaten on duty for that buyer. The ${h.a('home', 'eight-state comparison')} ranks your own purchase.</p>
`,
  related: ['act-home-buyer-concession', 'act-off-the-plan', 'act-pensioner', 'stamp-duty-changes-2026', 'nt', 'price-1500000'],
  sources: ['act_rates', 'act_hbcs', 'act_otp', 'act_unit_titled', 'act_pensioner', 'act_fhog'],
});
