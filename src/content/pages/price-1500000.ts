import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'New South Wales'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'Western Australia'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'Australian Capital Territory'], ['nt', 'Northern Territory']] as const;

export default definePage({
  id: 'price-1500000',
  path: '/prices/stamp-duty-on-1500000/',
  group: 'prices',
  kind: 'price',
  order: 80,
  mini: 'priceCheck',
  nav: 'Duty on $1.5 million',
  card: 'Stamp duty on $1.5 million: the ACT flat rate above $1,455,000, the NSW 5.5 % band and Tasmania as the cheapest for investors.',
  title: 'Stamp Duty on $1.5 Million 2026: ACT Flat Rate and More',
  description: 'Stamp duty on $1.5 million in 2026: a flat 4.54% of the whole value in the ACT above $1,455,000, $63,787 in NSW, and Tasmania cheapest for investors at $62,685.',
  h1: 'Stamp duty on $1.5 million',
  intro: 'At $1.5 million the ACT has switched to a single rate for every buyer and NSW is in its 5.5 % band. Here is the full comparison.',
  resume: (h) => `In the ACT a ${h.aud(1500000)} home costs the same conveyance duty whether you live in it or rent it out: above ${h.aud(h.P.states.act.owner_brackets[6].from)} both ACT scales give way to a flat ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)} of the whole value, here ${h.duty('act', 1500000)}. That switch has a side effect owner-occupiers should know about. Just below the line, at ${h.aud(h.P.states.act.owner_brackets[6].from)}, an owner-occupier pays ${h.duty('act', 1455000)}; a few thousand dollars higher, at ${h.aud(1460000)}, the bill is ${h.duty('act', 1460000)}, because the owner-occupier discount disappears in one step. Elsewhere, New South Wales has moved into its $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} band, which starts at ${h.aud(h.P.states.nsw.brackets[5].from)} in 2026-27, for ${h.duty('nsw', 1500000)}. Tasmania, whose top rate is only $${h.num(h.P.states.tas.brackets[6].rate * 100, 2)} per $100, becomes the cheapest state for an investor at ${h.duty('tas', 1500000, 'investor')}. Victoria remains the dearest at ${h.duty('vic', 1500000)}, and only Queensland still gives a lower rate to people who live in the home.`,
  faqs: (h) => [
    { q: 'Why does an ACT owner-occupier pay more just above $1,455,000?', a: `Because the owner-occupier and investor scales merge into a flat ${h.pct(h.P.states.act.owner_brackets[6].rate, 2)} of the whole value above that figure. At ${h.aud(h.P.states.act.owner_brackets[6].from)} an owner-occupier still uses the lower marginal scale and pays ${h.duty('act', 1455000)}. At ${h.aud(1460000)} the flat rate applies to everything: ${h.duty('act', 1460000)}. For an investor the two methods give almost the same figure, so there is no jump.` },
    { q: 'Which state is cheapest for an investor buying at $1.5 million?', a: `Tasmania, at ${h.duty('tas', 1500000, 'investor')}. Its scale tops out at $${h.num(h.P.states.tas.brackets[6].rate * 100, 2)} per $100 above ${h.aud(h.P.states.tas.brackets[6].from)}, the lowest top rate of the eight. NSW is next at ${h.duty('nsw', 1500000, 'investor')}, then Queensland at ${h.duty('qld', 1500000, 'investor')}. Victoria charges ${h.duty('vic', 1500000, 'investor')}, which is ${h.aud(h.calc('vic', 1500000, 'investor').total - h.calc('tas', 1500000, 'investor').total)} more than Tasmania for exactly the same purchase.` },
    { q: 'How much NSW transfer duty is payable on a $1.5 million house in 2026-27?', a: `${h.duty('nsw', 1500000)}. The 2026/27 scale charges ${h.aud(h.P.states.nsw.brackets[5].base)} at ${h.aud(h.P.states.nsw.brackets[5].from)} plus $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} for every $100 or part of $100 above it. No NSW concession applies at this price to a first home buyer, so the figure is the same for every Australian buyer. A foreign person adds ${h.pct(h.P.states.nsw.surcharge, 0)} surcharge purchaser duty, for ${h.duty('nsw', 1500000, 'investor', 'established', true)}.` },
  ],
  body: (h) => `
<h2>Every state at $1,500,000</h2>
${h.table(['', 'Lives in the home', 'Investor', 'Foreign investor', 'First home, established'], ST.map(([s, n]) => [n, h.duty(s, 1500000, 'owner'), h.duty(s, 1500000, 'investor'), h.duty(s, 1500000, 'investor', 'established', true), h.duty(s, 1500000, 'first')]), 'Contracts in 2026-27; the ACT first home figure assumes eligibility for the Home Buyer Concession Scheme', ['l', 'r', 'r', 'r', 'r'])}
<p>Queensland is now the only state where living in the home still lowers the duty, by the same ${h.aud(h.calc('qld', 1500000).saving)} it saves at any price above ${h.aud(540000)}. In the ACT the owner-occupier and investor figures have converged.</p>

<h2>Inside the ACT flat rate</h2>
<p>The ACT Revenue Office's 2026-27 tables have two marginal scales below ${h.aud(h.P.states.act.owner_brackets[6].from)}. Above it, both are replaced by one percentage of the whole value. For an investor, that is a smooth join: ${h.duty('act', 1455000, 'investor')} just below, ${h.duty('act', 1460000, 'investor')} just above. For an owner-occupier it is a step of about ${h.aud(h.calc('act', 1460000).total - h.calc('act', 1455000).total)} on a ${h.aud(5000)} price difference. A buyer negotiating around ${h.aud(1460000)} in Canberra should know that the last few thousand dollars carry a large amount of duty.</p>
${h.table(['ACT price', 'Owner-occupier', 'Non-owner-occupier'], [1400000, 1455000, 1460000, 1500000, 1600000].map((p) => [h.aud(p), h.duty('act', p, 'owner'), h.duty('act', p, 'investor')]), 'Either side of the flat rate threshold', ['l', 'r', 'r'])}
<p>An eligible buyer under the Home Buyer Concession Scheme pays nothing either way, since the scheme has had no value cap since ${h.date(h.P.states.act.hbcs.from)}. The ${h.a('act', 'ACT calculator')} handles both cases.</p>

<h2>NSW's second-highest band</h2>
<p>In New South Wales this price sits in the $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} band, which runs from ${h.aud(h.P.states.nsw.brackets[5].from)} to the premium threshold of ${h.aud(h.P.states.nsw.premium_threshold)}. The ${h.aud(1500000 - h.P.states.nsw.brackets[5].from)} of this purchase above the band floor costs ${h.aud(h.calc('nsw', 1500000).total - h.P.states.nsw.brackets[5].base)}. For an Australian buyer, NSW is still cheaper than WA, South Australia, the Territory and Victoria at this level.</p>

<h2>A foreign buyer at $1.5 million</h2>
<p>Surcharges turn the order upside down. The ACT and the Northern Territory charge none, so a foreign investor pays ${h.duty('act', 1500000, 'investor', 'established', true)} in Canberra and ${h.duty('nt', 1500000, 'investor', 'established', true)} in Darwin, against ${h.duty('vic', 1500000, 'investor', 'established', true)} in Victoria.</p>

<h2>Nearby prices</h2>
<p>For the ranking just before NSW's higher band, see the ${h.a('price-1200000', '$1.2 million page')}. For Victoria's ${h.pct(h.P.states.vic.brackets[4].rate)} band and South Australia's seniors relief cap, see the ${h.a('price-2000000', '$2 million page')}. The ${h.a('prices', 'duty by price index')} has the others.</p>
`,
  related: ['price-1200000', 'price-2000000', 'act', 'act-home-buyer-concession', 'investor-stamp-duty', 'prices'],
  sources: ['act_rates', 'act_hbcs', 'nsw_rates', 'tas_rates', 'qld_concession_rates', 'vic_general'],
});
