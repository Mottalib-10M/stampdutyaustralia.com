import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'VIC'], ['qld', 'QLD'], ['wa', 'WA'], ['sa', 'SA'], ['tas', 'TAS'], ['act', 'ACT'], ['nt', 'NT']] as const;
const PRICES = [500000, 600000, 750000, 800000, 900000, 1000000, 1200000, 1500000, 2000000];
const PAGE: Record<number, string> = { 500000: 'price-500000', 600000: 'price-600000', 750000: 'price-750000', 800000: 'price-800000', 900000: 'price-900000', 1000000: 'price-1000000', 1200000: 'price-1200000', 1500000: 'price-1500000', 2000000: 'price-2000000' };

export default definePage({
  id: 'prices',
  path: '/prices/',
  group: 'prices',
  kind: 'index',
  order: 1,
  mini: 'cheapestState',
  nav: 'Duty by price',
  card: 'Stamp duty at nine common prices from $500,000 to $2 million, in all eight states and territories.',
  title: 'Stamp Duty by Price 2026: Nine Prices in Eight States',
  description: 'Stamp duty by price for 2026-27: what a home buyer pays at nine prices from $500,000 to $2 million in each state, from $8,408 in the ACT to $110,000 in VIC.',
  h1: 'Stamp duty by price',
  intro: 'Nine common purchase prices, eight states and territories, and the thresholds that make the figures jump. Each price has its own page with the full breakdown.',
  resume: (h) => `Stamp duty does not rise in a straight line with the price, and the ranking of the states changes as you climb. For a home buyer who has owned before and will live in the property, the ACT is cheapest at ${h.aud(500000)} with ${h.duty('act', 500000)}, Queensland takes over from ${h.aud(800000)} thanks to its home concession rate, and Tasmania is cheapest at ${h.aud(2000000)} with ${h.duty('tas', 2000000)}. Victoria is the dearest at every price from ${h.aud(600000)} up, reaching ${h.duty('vic', 2000000)} at the top of the range. For first home buyers the prices that matter most are the concession limits: ${h.aud(600000)} in Victoria and Western Australia, ${h.aud(750000)} where Victoria's taper ends, ${h.aud(800000)} for the NSW exemption and ${h.aud(1000000)} where the NSW concession runs out. Every figure on these pages comes from the same engine as the calculators, at 2026-27 rates, and each price has its own page with four buyer profiles.`,
  faqs: (h) => [
    { q: 'Which state has the lowest stamp duty for a home buyer between $500,000 and $2 million?', a: `It depends on the price. For an owner-occupier who has bought before, the ACT is cheapest up to ${h.aud(750000)} (${h.duty('act', 750000)} there), Queensland from ${h.aud(800000)} to ${h.aud(1500000)} (${h.duty('qld', 1000000)} at ${h.aud(1000000)}), and Tasmania at ${h.aud(2000000)}. The order changes because each state's bands and concessions end at different points.` },
    { q: 'Are the figures on the stamp duty price pages based on 2026-27 rates?', a: 'Yes. They apply to contracts signed from 1 July 2026, with Queensland\'s citizenship rule for its concessions from 1 August 2026 and Western Australia\'s first home thresholds from 7 May 2026. The engine reproduces the worked examples published by each office, and we tested it against the official NSW and Victorian calculators on 5 October 2026.' },
    { q: 'How much more does a foreign buyer pay on a $1 million home?', a: `In the six states, between ${h.aud(h.calc('wa', 1000000, 'investor', 'established', true).surcharge)} and ${h.aud(h.calc('nsw', 1000000, 'investor', 'established', true).surcharge)} on top of ordinary duty, depending on whether the surcharge is ${h.pct(h.P.states.wa.surcharge, 0)}, ${h.pct(h.P.states.vic.surcharge, 0)} or ${h.pct(h.P.states.nsw.surcharge, 0)}. The ACT and the Northern Territory add nothing. The full figures for each state are on the ${'$'}1 million page.` },
    { q: 'Which price thresholds matter most for a first home buyer in 2026?', a: `Four. ${h.aud(600000)} is the top of the Victorian and WA exemptions and the NSW grant on a new home. ${h.aud(750000)} ends the Victorian concession. ${h.aud(800000)} ends the NSW exemption, the Queensland established-home concession and the WA first home owner rate. ${h.aud(1000000)} is the NSW cap. Above that, only uncapped schemes help: new homes in Queensland and South Australia, and the ACT scheme.` },
    { q: 'Does stamp duty rise in proportion to the purchase price?', a: `No. Most scales are marginal, so the effective rate rises with the price. In NSW a ${h.aud(500000)} purchase costs ${h.pct(h.calc('nsw', 500000).total / 500000, 2)} of its value and a ${h.aud(2000000)} one ${h.pct(h.calc('nsw', 2000000).total / 2000000, 2)}. Victoria above ${h.aud(h.P.states.vic.brackets[3].from)}, the ACT above ${h.aud(h.P.states.act.owner_brackets[6].from)} and the Northern Territory above ${h.aud(h.P.states.nt.formula.upto)} are the exceptions: a single percentage of the whole value.` },
    { q: 'What if my purchase price falls between two of the price pages?', a: `Use the calculator for your state, or the comparison tool above, with your exact figure. Do not average two neighbouring pages: around a threshold the change can be abrupt. A Victorian first home buyer pays nothing at ${h.aud(600000)} but ${h.duty('vic', 700000, 'first')} at ${h.aud(700000)}, and an ACT owner-occupier's bill jumps just above ${h.aud(h.P.states.act.owner_brackets[6].from)}.` },
  ],
  body: (h) => `
<h2>Home buyers: the nine prices at a glance</h2>
<p>The table shows the duty for an owner-occupier who is not a first home buyer, on an established home, at 2026-27 rates. Each price links to its own page.</p>
${h.table(['Price', ...ST.map(([, n]) => n)], PRICES.map((p) => [h.a(PAGE[p], h.aud(p)), ...ST.map(([s]) => h.duty(s, p, 'owner'))]), 'Owner-occupier, established home, no foreign buyer', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Queensland and the ACT sit at the bottom of most rows, because they keep a separate rate for owner-occupiers. Tasmania, whose top marginal rate is the lowest in the country, closes the gap as prices rise and is the cheapest at ${h.aud(2000000)}. Victoria's column is the highest from ${h.aud(600000)}, the point where its principal place of residence rate no longer applies.</p>

<h2>First home buyers: the same prices, a different map</h2>
${h.table(['Price', ...ST.map(([, n]) => n)], PRICES.map((p) => [h.a(PAGE[p], h.aud(p)), ...ST.map(([s]) => h.duty(s, p, 'first'))]), 'Eligible first home buyer, established home', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Read this one column by column. The ACT stays at zero all the way, because its Home Buyer Concession Scheme has had no value cap since ${h.date(h.P.states.act.hbcs.from)}. NSW holds zero to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and then fades. Victoria and WA start charging above ${h.aud(600000)}. South Australia, Tasmania and the Northern Territory charge the full scale from the first dollar on an established home; on a new home South Australia charges nothing.</p>

<h2>What each price page focuses on</h2>
<ul>
<li>${h.a('price-500000', '$500,000')}: the price where five jurisdictions still exempt a first home and South Australia's top band begins.</li>
<li>${h.a('price-600000', '$600,000')}: the last dollar of the Victorian and WA first home exemptions and of the NSW new home grant.</li>
<li>${h.a('price-750000', '$750,000')}: the end of the Victorian taper, and grant caps that include or exclude this figure.</li>
<li>${h.a('price-800000', '$800,000')}: the NSW exemption limit and the end of the Queensland and WA first home concessions.</li>
<li>${h.a('price-900000', '$900,000')}: halfway through the NSW fade and the floor of the WA off-the-plan concession.</li>
<li>${h.a('price-1000000', '$1 million')}: the NSW cap, Queensland's top band and Victoria at a flat ${h.pct(h.P.states.vic.brackets[3].rate)}.</li>
<li>${h.a('price-1200000', '$1.2 million')}: past every capped concession, with NSW the cheapest for an investor.</li>
<li>${h.a('price-1500000', '$1.5 million')}: the ACT's flat ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)} and the step it creates for owner-occupiers.</li>
<li>${h.a('price-2000000', '$2 million')}: Victoria's ${h.pct(h.P.states.vic.brackets[4].rate)} band and the South Australian seniors relief cap.</li>
</ul>

<h2>How the figures are produced</h2>
<p>Every amount on these pages is calculated, not typed. The engine reads each office's 2026-27 scale and applies its own rounding: NSW, Queensland, WA, South Australia, Tasmania and the ACT charge per $100 or part of $100, Victoria works to the dollar, and the Northern Territory uses a formula up to ${h.aud(h.P.states.nt.formula.upto)}. Concessions are applied as each office describes them, and the figures assume one buyer profile for the whole purchase. Mixed ownership, such as an Australian and a foreign buyer together, changes the surcharge share and needs the state calculator. The sources below are the rate pages we read.</p>

<h2>Other ways in</h2>
<p>If you already know the state, its calculator is the quickest route: ${h.a('nsw', 'NSW')}, ${h.a('vic', 'Victoria')}, ${h.a('qld', 'Queensland')}, ${h.a('wa', 'Western Australia')}, ${h.a('sa', 'South Australia')}, ${h.a('tas', 'Tasmania')}, ${h.a('act', 'ACT')} and ${h.a('nt', 'Northern Territory')}. The ${h.a('guides', 'guides')} cover first home buyers, foreign buyers, investors and off-the-plan purchases across all eight.</p>
`,
  related: ['price-500000', 'price-800000', 'price-1000000', 'price-2000000', 'first-home-buyer-stamp-duty', 'guides'],
  sources: ['nsw_rates', 'vic_general', 'qld_rates', 'qld_concession_rates', 'wa_rates', 'sa_rates', 'tas_rates', 'act_rates', 'nt_calc'],
});
