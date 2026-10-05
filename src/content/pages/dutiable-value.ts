import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'dutiable-value',
  path: '/guides/dutiable-value/',
  group: 'guides',
  kind: 'guide',
  order: 90,
  mini: 'dutiableValue',
  nav: 'Dutiable value',
  card: 'Price or market value, land only or land and building, before or after construction: what the duty is actually charged on.',
  title: 'Dutiable Value 2026: Price, Market Value and Valuations',
  description: 'Dutiable value in 2026-27: NSW taxes the higher of price and market value, so $450,000 land sold for $300,000 pays on $450,000; VIC deducts build cost to come.',
  h1: 'Dutiable value: the figure duty is charged on',
  intro: 'Every duty scale is applied to a number, and that number is not always the price on the contract.',
  resume: (h) => `The dutiable value is the amount a state's duty scale is applied to, and in NSW it is the higher of the price you pay and the market value of the property, so a sale below value is taxed on the value. Revenue NSW's own example is land in Nowra worth ${h.aud(450000)} sold to the seller's son for ${h.aud(300000)}: duty is assessed on ${h.aud(450000)}, ${h.duty('nsw', 450000, 'investor')}, not on the price, which would give ${h.duty('nsw', 300000, 'investor')}. Revenue NSW expects a formal valuation when the parties are related, when no agent is involved, or when the same firm acts for buyer and seller. Victoria shows the dutiable value can also be lower than the price: an off-the-plan contract is charged on the price less the construction cost still to come, and a first home buyer of vacant land is assessed on the land alone. Rounding also changes the base. Most offices charge each band per $100 or part of $100, so the value above a band floor is rounded up before the rate applies.`,
  faqs: (h) => [
    { q: 'Do I pay NSW stamp duty on the price or the valuation if my parents sell me their house cheaply?', a: `On the higher of the two. Revenue NSW's example: land worth ${h.aud(450000)} sold to a son for ${h.aud(300000)} is assessed on ${h.aud(450000)}, giving ${h.duty('nsw', 450000, 'investor')} instead of ${h.duty('nsw', 300000, 'investor')}. A sale between related people is one of the situations where Revenue NSW asks for a formal valuation, so the difference is unlikely to go unnoticed.` },
    { q: 'When does Revenue NSW ask for a valuation before assessing transfer duty?', a: 'Revenue NSW lists situations where the price may not reflect market value: the buyer and seller are related, no real estate agent was involved, the same firm acts for both parties, among others. In those cases it can ask for a formal valuation and assess duty on the market value if it is higher than the price written in the contract.' },
    { q: 'Is Victorian first home buyer duty on vacant land worked out on the land price only?', a: `Yes. The State Revenue Office Victoria applies the first home buyer exemption and concession to the value of the land alone when you buy vacant land to build on, and the same applies to the principal place of residence concession. A ${h.aud(500000)} block is therefore exempt for an eligible first home buyer, whatever the house built on it later costs.` },
    { q: 'Why is my Victorian off-the-plan dutiable value lower than the contract price?', a: `Because the State Revenue Office Victoria deducts the construction costs still to be incurred after the contract date. Paige, in the office's example, signs for ${h.aud(620000)} with ${h.aud(465000)} of building still to come, so her dutiable value is ${h.aud(620000 - 465000)}. Foreign purchaser additional duty, however, is always charged on the full price before the deduction.` },
  ],
  body: (h) => {
    const P = h.P.states;
    return `
<h2>The number before the scale</h2>
<p>People usually check the rate table first. The base matters as much: a scale of ${h.pct(0.055)} applied to the wrong figure gives the wrong answer however carefully the bands are read. There are four ways the base can differ from the price written in the contract, and each is backed by an office's own words.</p>
<ol>
<li><strong>Market value above the price.</strong> NSW charges duty on the higher of the two.</li>
<li><strong>Part of the price is not taxed yet.</strong> Victoria removes construction still to come in an off-the-plan contract.</li>
<li><strong>Only the land counts.</strong> Victoria's first home and residence concessions on vacant land look at the land value alone; Queensland charges the normal rate on any part of the land not used for the home.</li>
<li><strong>Rounding.</strong> Most offices round the value inside each band up to the next $100.</li>
</ol>

<h2>NSW: the higher of price and market value</h2>
<p>Revenue NSW defines the dutiable value as the greater of the price paid and the market value. Between strangers who negotiated through an agent these are the same. They part ways in family transfers and private deals, which is why Revenue NSW names the situations in which it expects a valuation: related parties, no agent, the same firm acting for both sides.</p>
${h.table(['Revenue NSW example', 'Value used', 'Duty'], [
  [`Yamba, purchase at ${h.aud(1350000)}`, h.aud(1350000), h.duty('nsw', 1350000, 'investor')],
  [`Balmain, ${h.aud(4000000)} pre-auction offer (premium duty)`, h.aud(4000000), h.duty('nsw', 4000000, 'investor')],
  [`Nowra, land worth ${h.aud(450000)} sold to a son for ${h.aud(300000)}`, h.aud(450000), h.duty('nsw', 450000, 'investor')],
  ['Nowra, if the price had been used', h.aud(300000), h.duty('nsw', 300000, 'investor')],
], 'Worked examples published by Revenue NSW, at the 2026/27 rates', ['l', 'r', 'r'])}
<p>The Nowra case shows the cost of a family discount: ${h.aud(h.calc('nsw', 450000, 'investor').total - h.calc('nsw', 300000, 'investor').total)} more duty than the price alone would suggest. The Balmain case shows the other end of the scale, where a value above ${h.aud(P.nsw.premium_threshold)} moves into premium duty at $${h.num(P.nsw.brackets[6].rate * 100, 2)} per $100. Premium duty only applies to residential land, and on a holding above two hectares Revenue NSW applies the premium rate to the first two hectares on a proportional basis.</p>
<!--mini:priceCheck-->

<h2>What a below-market price is worth in each scale</h2>
<p>The NSW rule is the one this site has read in full. As a measure of how much is at stake, the table runs the same two figures through each of the eight general scales: the duty on ${h.aud(300000)} and on ${h.aud(450000)}. If an office assesses on the market value, the right-hand column is the one you pay.</p>
${h.table(['State', 'Duty on $300,000', 'Duty on $450,000', 'Difference'], STATES.map((s) => { const a = h.calc(s, 300000, 'investor').total, b = h.calc(s, 450000, 'investor').total; return [STATE_INFO[s].short, h.aud(a), h.aud(b), h.aud(b - a)]; }), 'General scale, buyer with no concession', ['l', 'r', 'r', 'r'])}

<h2>Victoria: a value below the price</h2>
<p>The State Revenue Office Victoria takes the construction cost still to be incurred after the contract date off the dutiable value of an off-the-plan purchase. In its example, Michelle contracts at ${h.aud(1000000)} with ${h.aud(400000)} still to be built: the dutiable value is ${h.aud(600000)}, and duty at the general scale falls from ${h.duty('vic', 1000000, 'investor')} to ${h.duty('vic', 1000000, 'investor', 'offplan', false, { vicConstruction: 400000 })}. The concession thresholds are then tested against that reduced value, except for the foreign purchaser additional duty, which is charged on the price before the deduction. The ${h.a('off-the-plan-stamp-duty', 'off-the-plan guide')} sets out who can use it.</p>
<p>For vacant land, Victoria assesses the first home buyer exemption and the principal place of residence concession on the land's value alone. A first home buyer who pays ${h.aud(550000)} for a block pays ${h.duty('vic', 550000, 'first', 'vacant')}; the cost of the house built later never enters the calculation.</p>

<h2>Queensland: residential and non-residential land</h2>
<p>Queensland's first home (new home) and first home vacant land concessions are full, but only on the part of the land used as the residence. The Queensland Revenue Office charges the normal rate on any part of the land that is not, so a larger property can carry duty even for an eligible first home buyer. The ${h.a('qld-first-home-buyers', 'Queensland first home page')} has the detail.</p>

<h2>Rounding: per $100 or part of $100</h2>
<p>Six offices write their rates "for every $100, or part of $100". The calculator rounds the amount above each band floor up to the next hundred before applying the rate; Victoria and the Northern Territory apply their rate to the exact amount.</p>
${h.table(['State', 'Rounding', 'Duty on $500,050', 'Duty on $500,000'], STATES.map((s) => [STATE_INFO[s].short, P[s].rounding === 'per100' ? 'per $100 or part' : 'exact', h.duty(s, 500050, 'investor'), h.duty(s, 500000, 'investor')]), 'The effect of fifty dollars above a round price', ['l', 'l', 'r', 'r'])}
<p>The differences are small, but they explain why an online estimate can be a few dollars off the assessment. Revenue NSW's own calculator returns the same figure as this site for ${h.aud(500050)}.</p>

<h2>Using the calculators with a valuation</h2>
<p>The calculators on this site take the figure you type as the dutiable value. For a sale below market value, enter the market value. For a Victorian off-the-plan purchase, use the ${h.a('vic', 'Victorian calculator')}, which asks for the construction cost still to come. For anything involving a mixed-use property, a farm or a company, the office's own assessment is the only reliable figure.</p>
`;
  },
  related: ['nsw', 'off-the-plan-stamp-duty', 'vic-off-the-plan', 'vacant-land-stamp-duty', 'home'],
  sources: ['nsw_rates', 'vic_otp', 'vic_fhb', 'vic_ppr', 'qld_first_home_new', 'qld_rates'],
});
