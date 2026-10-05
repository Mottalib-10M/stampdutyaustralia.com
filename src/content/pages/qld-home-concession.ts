import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'qld-home-concession',
  path: '/qld/home-concession/',
  group: 'qld',
  kind: 'guide',
  order: 30,
  mini: 'vicQldHome',
  nav: 'QLD home concession',
  card: 'The reduced rate for anyone buying a Queensland home to live in: a fixed saving at every price above $540,000.',
  title: 'Home Concession QLD 2026: Owner-Occupier Transfer Duty',
  description: 'Home concession Queensland 2026: owner-occupiers pay a reduced duty rate at any price, $28,600 on a $950,000 home. Rules for contracts from 1 August 2026.',
  h1: 'The Queensland home concession rate',
  intro: 'Queensland\'s reduced duty scale for people who buy a home to live in, first home or not, and the stricter conditions attached to it since 1 August 2026.',
  resume: (h) => `Queensland charges transfer duty at a lower home concession rate when you buy a home to live in, even if you have owned many homes before, and unlike Victoria's owner-occupier concession it has no price ceiling. The Queensland Revenue Office's example is a ${h.aud(950000)} residence: ${h.duty('qld', 950000, 'owner')} at the home concession rate against ${h.duty('qld', 950000, 'investor')} at the general scale. Its second example, a ${h.aud(550000)} home, comes to ${h.duty('qld', 550000, 'owner')} instead of ${h.duty('qld', 550000, 'investor')}. From ${h.aud(h.P.states.qld.home_brackets[1].from)} upward the two scales rise at the same marginal rates, so the saving is a flat ${h.aud(h.calc('qld', 600000, 'investor').total - h.calc('qld', 600000, 'owner').total)} at every price from there on, whether the home costs ${h.aud(600000)} or ${h.aud(3000000)}. For contracts from ${h.date(h.P.states.qld.citizenship_rule_from)} the buyer must be an Australian citizen, permanent resident or specified foreign retiree, move in within one year of settlement, and not rent out the whole home before moving in or in the following year. Demolishing the house before living in it also forfeits the concession.`,
  faqs: (h) => [
    { q: 'How much does the Queensland home concession save on a $1.5 million house?', a: `${h.aud(h.calc('qld', 1500000, 'investor').total - h.calc('qld', 1500000, 'owner').total)}, the same as on any home from ${h.aud(h.P.states.qld.home_brackets[1].from)} up. The owner-occupier pays ${h.duty('qld', 1500000, 'owner')} and an investor ${h.duty('qld', 1500000, 'investor')}. As a share of the price the saving shrinks as values rise, but in dollars it never disappears, which sets Queensland apart from Victoria's PPR concession.` },
    { q: 'Do I need to be a first home buyer for the Queensland home concession?', a: 'No. The home concession is for anyone buying a residence to live in as their home, including people who have owned before, upgraders and downsizers. First home buyers have their own, larger concessions; buyers who do not qualify for those fall back on the home concession rate if they meet its conditions.' },
    { q: 'Can I rent my Queensland home out after claiming the home concession?', a: 'Not the whole of it within the first year after you move in, and not before you move in. Renting out part of the home, such as a room or a self-contained section, is allowed if you continue to live there and the lease started on or after 10 September 2024. Renting the entire property inside that period breaches the conditions.' },
    { q: 'What is the Queensland home concession rate on the first $350,000?', a: `${h.pct(h.P.states.qld.home_brackets[0].rate, 0)} for every $100 or part of $100, which gives ${h.duty('qld', 350000, 'owner')} at ${h.aud(350000)}. The general scale on the same value gives ${h.duty('qld', 350000, 'investor')}. Above ${h.aud(350000)} the home rate rises to $${h.num(h.P.states.qld.home_brackets[1].rate * 100, 2)} per $100 until ${h.aud(h.P.states.qld.home_brackets[2].from)}, so the lowest band is where the concession does most of its work.` },
    { q: 'Does the Queensland home concession apply to a block of vacant land?', a: `Not as a home concession: the reduced rate is for buying a residence to live in, and this calculator applies it to homes only. A buyer of vacant land who is not a first home buyer pays the general scale, ${h.duty('qld', 400000, 'owner', 'vacant')} on a ${h.aud(400000)} block. A first home buyer building on the land is in a better position, because the first home vacant land concession is a full one with no cap.` },
    { q: 'Can a temporary visa holder claim the Queensland home concession after 1 August 2026?', a: `Not on their own share. For contracts from ${h.date(h.P.states.qld.citizenship_rule_from)}, the concession needs an Australian citizen, a permanent resident or a specified foreign retiree. A buyer on a temporary visa pays the general scale on their interest and, as a foreign person, additional foreign acquirer duty of ${h.pct(h.P.states.qld.surcharge, 0)} as well.` },
  ],
  body: (h) => `
<h2>The rate table</h2>
<p>The ${h.src('qld_concession_rates', 'home concession rates')} are a scale of their own, charged per $100 or part of $100 like the general scale. They are lower at the bottom and identical in slope from ${h.aud(h.P.states.qld.home_brackets[1].from)}:</p>
${h.table(['Dutiable value', 'Home concession rate'], h.P.states.qld.home_brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `over ${h.aud(b.from)}`, `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 above ${h.aud(b.from)}`]), 'Queensland home concession scale', ['l', 'l'])}
<p>The general scale has a nil band to ${h.aud(h.P.states.qld.brackets[1].from)} and then charges $${h.num(h.P.states.qld.brackets[1].rate * 100, 2)} and $${h.num(h.P.states.qld.brackets[2].rate * 100, 2)} per $100, while the home scale charges $${h.num(h.P.states.qld.home_brackets[0].rate * 100, 2)} from the first dollar. At ${h.aud(100000)} the home scale gives ${h.duty('qld', 100000, 'owner')} and the general scale ${h.duty('qld', 100000, 'investor')}. The gap widens up to ${h.aud(h.P.states.qld.home_brackets[1].from)}, where the home scale moves to the same $${h.num(h.P.states.qld.home_brackets[1].rate * 100, 2)} per $100 as the general scale; from there the two run in parallel, both stepping up to $${h.num(h.P.states.qld.home_brackets[2].rate * 100, 2)} at ${h.aud(h.P.states.qld.home_brackets[2].from)}, and the gap is frozen.</p>

<h2>A fixed saving, whatever the price</h2>
${h.table(['Price', 'Home concession', 'General scale', 'Saving'], [300000, 450000, 550000, 750000, 950000, 1200000, 2000000].map((p) => [h.aud(p), h.duty('qld', p, 'owner'), h.duty('qld', p, 'investor'), h.aud(h.calc('qld', p, 'investor').total - h.calc('qld', p, 'owner').total)]), 'Owner-occupier versus investor, Queensland, 2026', ['l', 'r', 'r', 'r'])}
<p>The saving column stops moving at ${h.aud(h.calc('qld', 550000, 'investor').total - h.calc('qld', 550000, 'owner').total)}. On a ${h.aud(550000)} home that is ${h.pct((h.calc('qld', 550000, 'investor').total - h.calc('qld', 550000, 'owner').total) / h.calc('qld', 550000, 'investor').total, 0)} of the general duty; on a ${h.aud(2000000)} home it is ${h.pct((h.calc('qld', 2000000, 'investor').total - h.calc('qld', 2000000, 'owner').total) / h.calc('qld', 2000000, 'investor').total, 0)}. For an investor deciding whether to live in a property for a while before renting it, this is the number to put against the occupancy conditions below.</p>

<h2>Three Queensland buyers who are not first home buyers</h2>
<p>The home concession is the relief left to owner-occupiers who are not first home buyers. Three ordinary cases show its weight at different points of the market.</p>
${h.table(['Situation', 'Price', 'Duty with the concession', 'Without it'], [['Family upgrading in Logan', 720000], ['Couple relocating from Sydney to the Gold Coast', 1100000], ['Retiree downsizing in Hervey Bay', 480000]].map(([n, p]) => [String(n), h.aud(Number(p)), h.duty('qld', Number(p), 'owner'), h.duty('qld', Number(p), 'investor')]), 'Home concession, contracts from 1 August 2026', ['l', 'r', 'r', 'r'])}
<p>The couple arriving from New South Wales is a useful reminder that the concession has nothing to do with where you lived before or what you owned there. What counts is that the Queensland home will be their home, that they move in within the year, and that they hold the required status. The retiree, whose price is well under ${h.aud(h.P.states.qld.home_brackets[2].from)}, saves ${h.aud(h.calc('qld', 480000, 'investor').total - h.calc('qld', 480000, 'owner').total)}, exactly as much as the two others, because every price above ${h.aud(h.P.states.qld.home_brackets[1].from)} sits on the fixed maximum.</p>

<h2>The office's two examples</h2>
<p>The ${h.aud(950000)} example works like this: ${h.aud(h.P.states.qld.home_brackets[2].base)} for the first ${h.aud(h.P.states.qld.home_brackets[2].from)}, plus $${h.num(h.P.states.qld.home_brackets[2].rate * 100, 2)} for every $100 of the ${h.aud(950000 - h.P.states.qld.home_brackets[2].from)} above it, which is ${h.aud(h.P.states.qld.home_brackets[2].rate * (950000 - h.P.states.qld.home_brackets[2].from))}, for a total of ${h.duty('qld', 950000, 'owner')}. The ${h.aud(550000)} example on the ${h.src('qld_home_concession', 'home concession page')} gives ${h.duty('qld', 550000, 'owner')}, against ${h.duty('qld', 550000, 'investor')} without the concession. Our engine reproduces both.</p>

<h2>Conditions for contracts from 1 August 2026</h2>
<p>For a contract entered into on or after ${h.date(h.P.states.qld.citizenship_rule_from)}, the Queensland Revenue Office lists these conditions:</p>
<ol>
<li>Status: Australian citizen, permanent resident or specified foreign retiree.</li>
<li>Occupation: you move in within one year of settlement, and that year cannot be extended.</li>
<li>Letting: no renting the whole property before you move in, or during the year after. Part of the home may be let if you live there and the lease began on or after 10 September 2024.</li>
<li>Demolition: knocking the house down before it has been your home loses the concession.</li>
</ol>
<p>A buyer who is part citizen, part not, as a couple, keeps the concession on the eligible partner's share only. The Queensland Revenue Office's example of Fiona and Mark is worked through on the ${h.a('qld-foreign', 'additional foreign acquirer duty page')}.</p>

<h2>How it compares with Victoria</h2>
<p>Victoria's principal place of residence concession does a similar job with a different design. It cuts duty by a larger share of the bill at low values but stops dead at ${h.aud(h.P.states.vic.ppr_to)}. On a ${h.aud(500000)} home an owner-occupier pays ${h.duty('vic', 500000, 'owner')} in Victoria and ${h.duty('qld', 500000, 'owner')} in Queensland; at ${h.aud(800000)} the figures are ${h.duty('vic', 800000, 'owner')} and ${h.duty('qld', 800000, 'owner')}. The calculator at the top of this page compares both for any price. The ${h.a('vic-ppr', 'Victorian PPR page')} has the detail.</p>
<p>First home buyers in Queensland start from this same scale: the established-home first home concession is the home concession duty minus a fixed amount, and new homes and vacant land are fully exempt. Those rules are on the ${h.a('qld-first-home-buyers', 'Queensland first home buyer page')}.</p>
`,
  related: ['qld', 'qld-first-home-buyers', 'qld-foreign', 'vic-ppr', 'investor-stamp-duty'],
  sources: ['qld_home_concession', 'qld_concession_rates', 'qld_rates'],
});
