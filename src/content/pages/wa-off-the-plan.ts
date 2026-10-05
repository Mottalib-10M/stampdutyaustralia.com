import { definePage } from '../../lib/page-types';

// Start dates of the eligible scheme types, RevenueWA [wa_otp]. Multi-tier strata has no later start date.
const SINGLE_TIER_FROM = '2025-03-21';

export default definePage({
  id: 'wa-off-the-plan',
  path: '/wa/off-the-plan-concession/',
  group: 'wa',
  kind: 'guide',
  order: 30,
  mini: 'waOffPlan',
  nav: 'WA off-the-plan concession',
  card: 'Up to 100 % of duty off before construction starts, 75 % once it has, capped at $50,000, contracts to 30 June 2028.',
  title: 'Off-the-Plan Duty Concession WA 2026: Up to $50,000 Off',
  description: 'WA off-the-plan duty concession 2026: full duty off to $800,000 before building starts, 75% during construction, fading to $900,000, capped at $50,000.',
  h1: 'Off-the-plan duty concession in Western Australia',
  intro: 'A strata or survey-strata dwelling bought before or during construction can have most of its transfer duty taken off, depending on the stage reached when the contract is signed.',
  resume: (h) => {
    const o = h.P.states.wa.otp;
    const pre = (p: number) => h.calc('wa', p, 'owner', 'offplan', false, { waOtpStage: 'pre' });
    return `The WA off-the-plan duty concession removes up to the whole of the transfer duty on a dwelling in an eligible strata or survey-strata development when the contract is signed before construction is finished, for contracts from ${h.date(o.from)} to ${h.date(o.until)}. The share depends on the stage. Before construction begins, ${h.pct(o.pre.max, 0)} of the duty is waived up to ${h.aud(o.full_to)}; the share then falls in a straight line to ${h.pct(o.pre.min, 0)} at ${h.aud(o.floor_from)}. Once construction has started, the same pattern runs from ${h.pct(o.under.max, 0)} down to ${h.pct(o.under.min, 1)}. Whatever the price, the concession is capped at ${h.aud(o.cap)}. On an ${h.aud(850000)} apartment signed before the slab is poured, general duty of ${h.aud(pre(850000).generalDuty)} becomes ${h.aud(pre(850000).duty)}. Multi-tier strata schemes qualify, single-tier schemes since ${h.date(SINGLE_TIER_FROM)} and survey-strata schemes since ${h.date(o.from)}. The application must reach RevenueWA within 12 months of the dwelling's registration on title.`;
  },
  faqs: (h) => {
    const o = h.P.states.wa.otp;
    const r = (p: number, s: 'pre' | 'under') => h.calc('wa', p, 'owner', 'offplan', false, { waOtpStage: s });
    return [
      { q: 'How is the WA off-the-plan concession worked out between $800,000 and $900,000?', a: `The percentage falls evenly across the ${h.aud(o.floor_from - o.full_to)} band. Before construction it loses ${h.pct(o.pre.step_per_100, 2)} for every $100 above ${h.aud(o.full_to)}, so a ${h.aud(850000)} contract keeps ${h.pct(o.pre.max - o.pre.step_per_100 * ((850000 - o.full_to) / 100), 0)} of its duty off: ${h.aud(r(850000, 'pre').saving)}. During construction the step is ${h.pct(o.under.step_per_100, 4)} per $100, and the same price saves ${h.aud(r(850000, 'under').saving)}.` },
      { q: 'Does the WA off-the-plan concession stop above $900,000?', a: `No. Above ${h.aud(o.floor_from)} the share stays at its floor, ${h.pct(o.pre.min, 0)} before construction and ${h.pct(o.under.min, 1)} during it, and only the ${h.aud(o.cap)} cap limits it. A ${h.aud(1500000)} penthouse signed before work starts saves ${h.aud(r(1500000, 'pre').saving)}; at ${h.aud(2500000)} the cap bites and the saving stops at ${h.aud(r(2500000, 'pre').saving)}.` },
      { q: 'Are single-tier strata townhouses covered by the WA off-the-plan concession?', a: `Yes, if the contract is dated in the concession period. RevenueWA lists three kinds of scheme: multi-tier strata, single-tier strata (included since ${h.date(SINGLE_TIER_FROM)}) and survey-strata (included since ${h.date(o.from)}). A survey-strata lot with a dwelling under construction can therefore qualify at the construction-stage percentages for a contract signed from ${h.date(o.from)} onwards.` },
      { q: 'When must I apply for the WA off-the-plan duty concession?', a: `Within 12 months of the dwelling being registered on title, according to RevenueWA's application page. On an off-the-plan purchase that registration may come a year or more after the contract, so the deadline is later than the contract date suggests. The concession itself still depends on the stage the development had reached when you signed.` },
      { q: 'Is the WA off-the-plan concession better than the first home owner rate?', a: `For most first home buyers below ${h.aud(h.P.states.wa.fhor.home_exempt_to)} the first home owner rate already removes all duty, so there is nothing left to discount. Between ${h.aud(h.P.states.wa.fhor.home_exempt_to)} and ${h.aud(o.full_to)} both can lead to a low figure. This calculator does not stack them; RevenueWA decides how they interact on a given contract.` },
    ];
  },
  body: (h) => {
    const o = h.P.states.wa.otp;
    const r = (p: number, s: 'pre' | 'under') => h.calc('wa', p, 'owner', 'offplan', false, { waOtpStage: s });
    const prices = [600000, 800000, 850000, 900000, 1200000, 2000000, 2500000];
    return `
<h2>The stage on the contract date decides the percentage</h2>
<p>Most duty concessions look at the buyer. This one looks at the building site. RevenueWA asks a single question about the development at the date of the contract: had construction started, and if so, had it finished? A dwelling bought when nothing has been built yet gets the larger concession, one bought while the structure is going up gets three quarters of it, and one bought after completion gets none. The price then sets where you sit on the sliding scale.</p>
${h.table(['Stage at contract', 'Share of duty waived to ' + h.aud(o.full_to), 'Share at ' + h.aud(o.floor_from) + ' and above', 'Maximum'], [
  ['Construction not started', h.pct(o.pre.max, 0), h.pct(o.pre.min, 0), h.aud(o.cap)],
  ['Under construction', h.pct(o.under.max, 0), h.pct(o.under.min, 1), h.aud(o.cap)],
], `Off-the-plan duty concession, contracts ${h.date(o.from)} to ${h.date(o.until)}`, ['l', 'r', 'r', 'r'])}
<p>Between ${h.aud(o.full_to)} and ${h.aud(o.floor_from)} the share drops smoothly, a fraction of a percent per $100, rather than in steps. There is no ceiling on the price itself: a dwelling above ${h.aud(o.floor_from)} keeps the floor percentage, and only the dollar cap limits what you save.</p>

<h2>The concession in dollars</h2>
<p>The table applies both stages to the general rate of transfer duty, the scale every non-first-home buyer starts from, at prices that cover the full band, the sliding section and the point where the cap takes over.</p>
${h.table(['Price', 'General duty', 'Signed before construction', 'Signed during construction'], prices.map((p) => [h.aud(p), h.aud(r(p, 'pre').generalDuty), h.aud(r(p, 'pre').duty), h.aud(r(p, 'under').duty)]), 'Duty payable after the concession, Western Australia', ['l', 'r', 'r', 'r'])}
<p>Read across the ${h.aud(800000)} row: a buyer who signs before any work begins pays nothing, while the buyer of the same apartment a few months later, with cranes on site, pays ${h.aud(r(800000, 'under').duty)}. At ${h.aud(2000000)} the pre-construction concession is worth ${h.aud(r(2000000, 'pre').saving)}, which is the cap, so it no longer grows with the price. At ${h.aud(2500000)} the construction-stage saving, ${h.aud(r(2500000, 'under').saving)}, is still under the cap.</p>

<h2>Which developments are eligible</h2>
<p>The concession is for dwellings in strata or survey-strata developments. RevenueWA has widened the list over time. Multi-tier strata schemes, the classic apartment building, were the starting point. Single-tier strata schemes, typically townhouses and villas, have been included since ${h.date(SINGLE_TIER_FROM)}. Survey-strata schemes joined on ${h.date(o.from)}, which is also the start of the current concession period.</p>
<p>A house on a freestanding green title lot is not on that list. If you are a first home buyer building on your own block, the relevant relief is the ${h.a('wa-first-home-owner-rate', 'first home owner rate on vacant land')}, which uses its own thresholds.</p>

<h2>The deadline runs from registration, not from the contract</h2>
<p>The application has to reach RevenueWA within 12 months of the dwelling's registration on title. In an off-the-plan purchase, registration often comes long after the contract: the building has to be finished and the strata or survey-strata plan registered before your lot can be. That gives more time than buyers usually expect, but it also means the claim can be forgotten. The percentage itself was set by the stage the development had reached on the contract date.</p>

<h2>Testing a contract with the calculator</h2>
<p>In the calculator at the top of this page, enter the price and the stage reached when you signed. The result shows the general duty, the amount waived and the rule applied. A foreign buyer's ${h.pct(h.P.states.wa.surcharge, 0)} foreign transfer duty is a separate charge and is not reduced by this concession in the calculator.</p>
<p>Two buyers at the same ${h.aud(880000)} price show how much the stage matters. Signed off a brochure, the duty is ${h.aud(r(880000, 'pre').duty)}. Signed when the frame is up, it is ${h.aud(r(880000, 'under').duty)}. Without any concession it would be ${h.aud(r(880000, 'pre').generalDuty)}.</p>

<h2>Working one contract through by hand</h2>
<p>Take a ${h.aud(1200000)} apartment bought while the building is under construction. First, transfer duty is calculated at the general rate on the full price: ${h.aud(r(1200000, 'under').generalDuty)}. Second, the price is above ${h.aud(o.floor_from)}, so the construction-stage share is at its floor of ${h.pct(o.under.min, 1)}, which gives ${h.aud(r(1200000, 'under').saving)}. Third, that amount is compared with the ${h.aud(o.cap)} cap; here it is below, so it stands. The buyer pays ${h.aud(r(1200000, 'under').duty)}. The same steps at ${h.aud(860000)} before construction give a share of ${h.pct(o.pre.max - o.pre.step_per_100 * ((860000 - o.full_to) / 100), 0)} and duty of ${h.aud(r(860000, 'pre').duty)}.</p>
<p>The order matters. The concession is a share of the duty, never a reduction of the price, so the dutiable value stays at the contract price and the ${h.pct(h.P.states.wa.surcharge, 0)} foreign transfer duty, where it applies, is calculated on that full value.</p>

<h2>Dates at both ends of the window</h2>
<p>The concession described here applies to contracts dated from ${h.date(o.from)} to ${h.date(o.until)}. A contract signed in July 2028 falls outside it, whatever the stage of construction, unless the government extends the period. A contract signed before ${h.date(o.from)} is not covered by this version either; the earlier inclusion of single-tier schemes from ${h.date(SINGLE_TIER_FROM)} shows that a previous concession existed, but its terms are not modelled on this site.</p>

<h2>How this compares with Victoria</h2>
<p>Victoria's off-the-plan relief works differently: it takes the construction cost still to be incurred off the dutiable value, rather than taking a percentage off the duty. The outcomes can be close at mid-range prices, but the Victorian method rewards an early contract on an expensive building more directly. The ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')} works through the official examples, and the ${h.a('off-the-plan-stamp-duty', 'off-the-plan guide')} sets all eight jurisdictions side by side.</p>
`;
  },
  related: ['wa', 'wa-first-home-owner-rate', 'off-the-plan-stamp-duty', 'vic-off-the-plan', 'act-off-the-plan'],
  sources: ['wa_otp', 'wa_rates'],
});
