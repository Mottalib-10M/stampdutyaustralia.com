import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'act-off-the-plan',
  path: '/act/off-the-plan-and-new-units/',
  group: 'act',
  kind: 'guide',
  order: 30,
  mini: 'actUnit',
  nav: 'ACT off the plan and new units',
  card: 'Owner-occupiers of an off-the-plan or newly unit-titled apartment or townhouse pay no duty since 1 July 2026, at any price.',
  title: 'Off the Plan Unit Exemption ACT 2026-27: No Value Cap',
  description: 'ACT off-the-plan unit duty exemption 2026-27: owner-occupiers of a unit-titled apartment or townhouse pay nothing at any price; the $1,020,000 cap has gone.',
  h1: 'Off-the-plan and newly unit-titled exemptions in the ACT',
  intro: 'Two ACT exemptions follow a unit-titled building from the drawings to its second birthday, and both now ignore the price.',
  resume: (h) => {
    const a = h.P.states.act;
    return `An owner-occupier who buys a unit-titled apartment or townhouse off the plan in the ACT pays no conveyance duty for contracts from ${h.date(a.otp_unit.from)}, whatever the price; until then the exemption stopped at ${h.aud(a.hbcs.previous_cap)}. A second exemption picks up where the first leaves off. Under the Newly Unit Titled Duty Exemption, a new unit bought directly from the developer within ${a.unit_titled.within_years_of_plan} years of the unit plan's registration is also free of duty for a buyer who will live in it. In both cases the buyer must occupy the unit, for one year under the off-the-plan exemption. An investor buying the same unit pays the non-owner-occupier rates: ${h.duty('act', 650000, 'investor')} on a ${h.aud(650000)} two-bedroom apartment in Gungahlin, against nothing for the resident buyer. A buyer who misses both windows, for example by purchasing from the developer three years after registration, falls back to the ordinary owner-occupier rates, ${h.duty('act', 650000, 'owner')} at that price, unless another scheme applies.`;
  },
  faqs: (h) => {
    const a = h.P.states.act;
    return [
      { q: 'Is there a price cap on the ACT off-the-plan unit duty exemption in 2026?', a: `No. For contracts from ${h.date(a.otp_unit.from)} the exemption applies to an owner-occupied off-the-plan unit at any price. Before that date it was limited to units valued at up to ${h.aud(a.hbcs.previous_cap)}. A ${h.aud(1300000)} penthouse bought off the plan by a buyer who will live in it now attracts no duty, where investor rates would charge ${h.duty('act', 1300000, 'investor')}.` },
      { q: 'Can an investor use the ACT newly unit titled duty exemption?', a: `No. Both ACT unit exemptions are for buyers who will live in the unit. An investor buying a new apartment from the developer pays conveyance duty at the non-owner-occupier rates, for instance ${h.duty('act', 550000, 'investor')} on ${h.aud(550000)} or ${h.duty('act', 800000, 'investor')} on ${h.aud(800000)}. The resident neighbour pays nothing.` },
      { q: 'What is the two-year limit on ACT newly unit-titled units?', a: `The purchase has to happen within ${a.unit_titled.within_years_of_plan} years of the registration of the unit plan, and the unit has to be bought from the developer. A buyer who signs for a never-occupied unit in the third year after registration is outside the exemption and pays owner-occupier rates: ${h.duty('act', 700000, 'owner')} on a ${h.aud(700000)} unit.` },
      { q: 'Does a freestanding new house qualify for the ACT off-the-plan exemption?', a: `No. The exemption covers units under a unit title, which means apartments and unit-titled townhouses. A detached house on its own block is outside it, even if it is bought before construction. The buyer of such a house may still be eligible for the Home Buyer Concession Scheme, which covers new and established homes and land when its five-year rule is met.` },
      { q: 'How long must I live in an ACT off-the-plan unit to keep the exemption?', a: `One year. The ACT Revenue Office makes occupation a condition of the off-the-plan unit exemption, and the newly unit titled exemption also requires the buyer to live in the unit. A buyer who plans to rent the unit out from completion should budget for the non-owner-occupier rates instead, which on ${h.aud(600000)} come to ${h.duty('act', 600000, 'investor')}.` },
    ];
  },
  body: (h) => {
    const a = h.P.states.act;
    const prices = [450000, 600000, 750000, a.hbcs.previous_cap, 1300000];
    return `
<h2>One building, three moments of purchase</h2>
<p>Picture a new block of 80 apartments in Woden. Its units can be bought at three points in the building's life, and the ACT treats each differently for a buyer who plans to live there.</p>
<ol>
<li><strong>Before the unit plan is registered</strong>, while the building is still a set of drawings or a construction site. This is an off-the-plan purchase, covered by the Off the Plan Unit Duty Exemption.</li>
<li><strong>Within ${a.unit_titled.within_years_of_plan} years after the unit plan is registered</strong>, buying a new unit from the developer. This is the territory of the Newly Unit Titled Duty Exemption.</li>
<li><strong>After that</strong>, or buying from anyone other than the developer. No unit-specific exemption applies; owner-occupier rates do, unless the buyer meets the ${h.a('act-home-buyer-concession', 'Home Buyer Concession Scheme')} or the pensioner scheme.</li>
</ol>
<p>For an owner-occupier, the first two moments now cost nothing in conveyance duty at any price. The third costs the full owner-occupier rate.</p>

<h2>Off the plan: the cap that disappeared</h2>
<p>Until 30 June 2026 the off-the-plan exemption was limited to units priced at up to ${h.aud(a.hbcs.previous_cap)}. From ${h.date(a.otp_unit.from)} that ceiling is gone. A buyer who signs for an apartment or a unit-titled townhouse off the plan and lives in it for one year pays no duty, whether the unit costs ${h.aud(450000)} or ${h.aud(1500000)}.</p>
${h.table(['Unit price', 'Owner-occupier, off the plan', 'Owner-occupier, established unit', 'Investor, any stage'], prices.map((p) => [h.aud(p), h.duty('act', p, 'owner', 'offplan', false, { actUnit: true }), h.duty('act', p, 'owner'), h.duty('act', p, 'investor', 'offplan')]), 'ACT conveyance duty on a unit-titled dwelling, contracts from 1 July 2026', ['l', 'r', 'r', 'r'])}
<p>The middle column is what an owner-occupier pays for a unit that has been lived in before, with no other scheme. It is the measure of what the exemption is worth: ${h.duty('act', 750000, 'owner')} on a ${h.aud(750000)} unit.</p>

<h2>Newly unit titled: a second window after completion</h2>
<p>An off-the-plan exemption ends, by its nature, once the building is finished, yet developers often still hold unsold units at that point. The ACT covers that stage with the Newly Unit Titled Duty Exemption, in its current form from ${h.date(a.unit_titled.from)}. A new unit bought from the developer within ${a.unit_titled.within_years_of_plan} years of the registration of the unit plan carries no duty for a buyer who will live in it.</p>
<p>Two words in that rule do the work. "From the developer" excludes a unit bought from an earlier purchaser who never moved in. "Registration of the unit plan" sets the start of the clock, not the date the first resident arrived. A buyer looking at a building completed some time ago should ask when its unit plan was registered.</p>

<h2>What the two exemptions are worth</h2>
<p>Because both exemptions take duty to nil, their value is simply the duty an owner-occupier would otherwise pay on the unit. That is ${h.duty('act', 500000, 'owner')} on a ${h.aud(500000)} one-bedroom apartment, ${h.duty('act', 850000, 'owner')} on an ${h.aud(850000)} townhouse and ${h.duty('act', 1200000, 'owner')} on a ${h.aud(1200000)} apartment with views over the lake. The figures rise faster than the price because the owner-occupier table is progressive up to ${h.aud(a.owner_brackets[a.owner_brackets.length - 1].from)}.</p>

<h2>Investors pay the higher table</h2>
<p>The ACT has two scales. The non-owner-occupier table starts at $${h.num(a.investor_brackets[0].rate * 100, 2)} per $100 on the first ${h.aud(a.investor_brackets[1].from)}, against $${h.num(a.owner_brackets[0].rate * 100, 2)} for owner-occupiers on the first ${h.aud(a.owner_brackets[1].from)}. Above ${h.aud(a.investor_brackets[a.investor_brackets.length - 1].from)} both become a flat ${h.pct(a.investor_brackets[a.investor_brackets.length - 1].rate, 2)} of the whole value. Neither unit exemption is open to investors, so an investor in that Woden block pays ${h.duty('act', 620000, 'investor')} on a ${h.aud(620000)} unit while the neighbour who moves in pays nothing.</p>
<!--mini:investorState-->

<h2>Four buyers in the same block</h2>
<p>Back to Woden, with four purchases of identical ${h.aud(680000)} two-bedroom units. Maya signs off the plan before the crane arrives and moves in on completion: no duty. Tom buys a finished unit from the developer eighteen months after the unit plan is registered and lives in it: also no duty, under the newly unit titled exemption. Priya buys one from the developer as a rental: ${h.duty('act', 680000, 'investor')} at the non-owner-occupier rates. Sam buys from Maya three years later to live in, owns a house in Wagga Wagga, and meets no scheme: ${h.duty('act', 680000, 'owner')} at owner-occupier rates.</p>
<p>The four units are the same, the four duty bills are not, and none of the differences depends on price. What separates Maya and Tom from Sam is who sold the unit and when; what separates them from Priya is whether the buyer moves in.</p>

<h2>Which exemption to claim</h2>
<p>A buyer can be eligible for more than one ACT relief. Someone who has held no property in five years and buys a unit off the plan to live in meets both the Home Buyer Concession Scheme and the off-the-plan exemption; the duty is nil either way, and the ACT Revenue Office decides which applies. The difference matters only where one set of conditions is not met. Someone who owns an investment property elsewhere fails the Home Buyer Concession Scheme's five-year rule, yet can still buy a new Canberra unit off the plan, live in it, and pay nothing.</p>
<p>For buyers comparing a Canberra apartment with one in Melbourne, the ${h.a('vic-off-the-plan', 'Victorian off-the-plan concession')} reduces the dutiable value rather than removing duty, and the ${h.a('off-the-plan-stamp-duty', 'off-the-plan comparison')} runs the eight jurisdictions side by side.</p>
`;
  },
  related: ['act', 'act-home-buyer-concession', 'act-pensioner', 'off-the-plan-stamp-duty', 'vic-off-the-plan', 'wa-off-the-plan'],
  sources: ['act_otp', 'act_unit_titled', 'act_rates'],
});
