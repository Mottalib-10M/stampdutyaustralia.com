import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'WA'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'ACT'], ['nt', 'NT']] as const;

export default definePage({
  id: 'price-1200000',
  path: '/prices/stamp-duty-on-1200000/',
  group: 'prices',
  kind: 'price',
  order: 70,
  mini: 'priceCheck',
  nav: 'Duty on $1.2 million',
  card: 'Stamp duty on $1.2 million: every capped concession is gone and NSW becomes the cheapest state for an investor.',
  title: 'Stamp Duty on $1.2 Million 2026: Above First Home Caps',
  description: 'Stamp duty on $1.2 million in 2026: no capped first home concession is left, NSW is cheapest for investors at $48,187 and Victoria charges local buyers $66,000.',
  h1: 'Stamp duty on $1.2 million',
  intro: 'At $1.2 million the price-capped concessions are behind you. What remains is the raw scale of each state, and the ranking changes in ways that surprise people.',
  resume: (h) => `At ${h.aud(1200000)} the ranking of the states turns over for investors. New South Wales charges the least of all eight: ${h.duty('nsw', 1200000, 'investor')}, because its $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} band does not start until ${h.aud(h.P.states.nsw.brackets[5].from)} in 2026-27. Queensland and the ACT, cheaper at lower prices, are now in their top marginal bands and charge an investor ${h.duty('qld', 1200000, 'investor')} and ${h.duty('act', 1200000, 'investor')}. Victoria takes ${h.pct(h.P.states.vic.brackets[3].rate)} of the whole price, ${h.duty('vic', 1200000, 'investor')}. No price-capped first home concession reaches this far. A first home buyer still pays nothing on a new home in Queensland and South Australia, and on any home in the ACT if eligible for the uncapped Home Buyer Concession Scheme. For an owner-occupier who has bought before, Queensland's home concession rate keeps it the cheapest state at ${h.duty('qld', 1200000)}, with the ACT's owner-occupier scale next at ${h.duty('act', 1200000)}.`,
  faqs: (h) => [
    { q: 'Which state is cheapest for an investor buying at $1.2 million?', a: `New South Wales, at ${h.duty('nsw', 1200000, 'investor')}. Its marginal rate is still $${h.num(h.P.states.nsw.brackets[4].rate * 100, 2)} per $100 at this price, while Queensland and the ACT are charging $${h.num(h.P.states.qld.brackets[4].rate * 100, 2)} and $${h.num(h.P.states.act.investor_brackets[5].rate * 100, 2)} on the slice above ${h.aud(1000000)}. Tasmania is a close second at ${h.duty('tas', 1200000, 'investor')}. Victoria, at ${h.duty('vic', 1200000, 'investor')}, is the dearest.` },
    { q: 'Does the NSW 5.5 % band apply to a $1.2 million purchase in 2026-27?', a: `No. For contracts from 1 July 2026 the $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} band starts at ${h.aud(h.P.states.nsw.brackets[5].from)}, after indexation, so a ${h.aud(1200000)} purchase is charged ${h.aud(h.P.states.nsw.brackets[4].base)} plus $${h.num(h.P.states.nsw.brackets[4].rate * 100, 2)} per $100 above ${h.aud(h.P.states.nsw.brackets[4].from)}. That gives ${h.duty('nsw', 1200000)}. At ${h.aud(1300000)} the first dollars of the higher band appear.` },
    { q: 'Which first home schemes still work on a $1.2 million purchase?', a: `Only those without a value cap. Queensland's first home (new home) concession and South Australia's first home relief remove all duty on a new home or land. The ACT's Home Buyer Concession Scheme removes it on any home for an eligible buyer. The Northern Territory's ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant on a new home has no price cap either, though the duty itself, ${h.duty('nt', 1200000, 'first', 'new')}, is still payable.` },
  ],
  body: (h) => `
<h2>The ranking at $1.2 million</h2>
<p>Here are the four buyer profiles that matter at this price. The established first home column is shown to make a point: in most of the country it is now identical to the owner-occupier one.</p>
${h.table(['Buyer', ...ST.map(([, n]) => n)], [['Owner-occupier', 'owner', 'established'], ['Investor', 'investor', 'established'], ['First home, established', 'first', 'established'], ['First home, new', 'first', 'new']].map(([label, b, p]) => [label, ...ST.map(([s]) => h.duty(s, 1200000, b as 'owner', p as 'new'))]), 'Duty on $1,200,000 by state (columns) and buyer (rows), 2026-27', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>The investor row runs from ${h.duty('nsw', 1200000, 'investor')} to ${h.duty('vic', 1200000, 'investor')}, a gap of ${h.aud(h.calc('vic', 1200000, 'investor').total - h.calc('nsw', 1200000, 'investor').total)} on the same purchase. For owner-occupiers the gap is wider still because Queensland and the ACT keep their owner-occupier discount.</p>

<h2>Why NSW comes out ahead here</h2>
<p>NSW indexes its thresholds each 1 July, and for 2026-27 the $${h.num(h.P.states.nsw.brackets[4].rate * 100, 2)} band runs from ${h.aud(h.P.states.nsw.brackets[4].from)} to ${h.aud(h.P.states.nsw.brackets[5].from)}. Queensland's ${h.pct(h.P.states.qld.brackets[4].rate, 2)} band starts at ${h.aud(h.P.states.qld.brackets[4].from)}, so it already applies to the last ${h.aud(200000)} of this purchase. The ACT's investor scale charges $${h.num(h.P.states.act.investor_brackets[5].rate * 100, 2)} per $100 over ${h.aud(h.P.states.act.investor_brackets[5].from)}. The result is that an NSW investor who would have paid more than a Queensland one at ${h.aud(800000)} pays less at this price.</p>
<p>The effect does not last forever. Above ${h.aud(h.P.states.nsw.brackets[5].from)} NSW moves to $${h.num(h.P.states.nsw.brackets[5].rate * 100, 2)} per $100; the ${h.a('price-1500000', '$1.5 million page')} shows where that leaves it.</p>

<h2>First home buyers with a bigger budget</h2>
<p>A first home buyer at ${h.aud(1200000)} has three ways to avoid duty: buy new in Queensland or South Australia, or qualify for the ACT scheme, which needs no property interest in the previous ${h.P.states.act.hbcs.no_property_years} years. Everywhere else the buyer pays what an owner-occupier pays. The ${h.a('first-home-buyer-stamp-duty', 'first home buyer guide')} compares the schemes, and the ${h.a('act-home-buyer-concession', 'ACT scheme page')} covers its conditions.</p>

<h2>Neighbouring pages</h2>
<p>The ${h.a('price-1000000', '$1 million page')} covers the price where the last capped concession, NSW's, ends. Above, the ${h.a('price-1500000', '$1.5 million page')} looks at the ACT's flat rate. The ${h.a('prices', 'duty by price index')} lists the rest.</p>
`,
  related: ['price-1000000', 'price-1500000', 'investor-stamp-duty', 'first-home-buyer-stamp-duty', 'nsw', 'prices'],
  sources: ['nsw_rates', 'qld_rates', 'act_rates', 'vic_general', 'act_hbcs', 'qld_first_home_new'],
});
