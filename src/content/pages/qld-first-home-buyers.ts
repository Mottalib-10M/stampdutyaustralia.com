import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'qld-first-home-buyers',
  path: '/qld/first-home-buyers/',
  group: 'qld',
  kind: 'guide',
  order: 20,
  mini: 'grantState',
  nav: 'QLD first home buyers',
  card: 'No duty on a new first home or land at any price, a stepped concession on established homes, and the $30,000 grant.',
  title: 'First Home Buyer Stamp Duty QLD 2026: New Homes Duty Free',
  description: 'First home buyer stamp duty Queensland 2026: no duty on a new home or land at any price, a concession on established homes to $800,000 and a $30,000 grant.',
  h1: 'First home buyer duty in Queensland',
  intro: 'Queensland treats a first home very differently depending on whether it is new, established or a block of land; here are the three regimes and the rules that apply from 1 August 2026.',
  resume: (h) => `A first home buyer in Queensland pays no transfer duty at all on a new home or on vacant land to build a first home on, whatever the price, for contracts signed from 1 May 2025, while an established first home still pays duty, reduced by the first home concession up to ${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].below)}. On an established home the Queensland Revenue Office starts from the home concession rate and subtracts a fixed amount: ${h.aud(h.P.states.qld.first_home_table[0].deduct)} below ${h.aud(h.P.states.qld.first_home_table[0].below)}, then ${h.aud(h.P.states.qld.first_home_table[0].deduct - h.P.states.qld.first_home_table[1].deduct)} less for each further ${h.aud(10000)}. The office's own example, a ${h.aud(795000)} home, comes to ${h.duty('qld', 795000, 'first')}. For contracts from ${h.date(h.P.states.qld.citizenship_rule_from)}, buyers must be Australian citizens, permanent residents or specified foreign retirees, must move in within one year of settlement with no extension, and must not rent out the whole home before moving in or during the year after. A new home under ${h.aud(h.P.states.qld.fhog.below)} also attracts the ${h.aud(h.P.states.qld.fhog.amount)} First Home Owner Grant, so a ${h.aud(650000)} new townhouse costs nothing in duty and brings in ${h.aud(h.calc('qld', 650000, 'first', 'new').grant.amount)}.`,
  faqs: (h) => [
    { q: 'Is there a price cap on the Queensland first home new home concession?', a: `No. For contracts from 1 May 2025 the first home (new home) concession is a full concession with no value limit. A first buyer of a new ${h.aud(1200000)} house pays ${h.duty('qld', 1200000, 'first', 'new')} in duty, where a buyer who has owned before and will live there pays ${h.duty('qld', 1200000, 'owner', 'new')} at the home concession rate.` },
    { q: 'How much duty does a first home buyer pay on a $750,000 established home in Queensland?', a: `${h.duty('qld', 750000, 'first')}. The home concession rate gives ${h.duty('qld', 750000, 'owner')}, and the first home concession amount for a value from ${h.aud(750000)} to just under ${h.aud(760000)} is ${h.aud(h.P.states.qld.first_home_table.find((r) => 750000 < r.below)!.deduct)}. An investor would pay ${h.duty('qld', 750000, 'investor')} on the same home, and a first buyer choosing a new home at the same price would pay nothing.` },
    { q: 'Can I rent out a room in my Queensland first home and keep the concession?', a: 'Yes, within limits. You may rent out part of the home provided you keep living there and the lease started on or after 10 September 2024. What breaks the concession is renting out the whole property before you move in, or within the year after you move in. The rule applies to the first home and home concessions alike.' },
    { q: 'Do I lose the Queensland first home concession if I knock down the house?', a: 'You do if you demolish before you have made it your home. The Queensland Revenue Office lists demolition before occupation among the things that end the concession. The same rule applies to the ordinary home concession, so a knock-down plan needs to be costed at the general scale.' },
    { q: 'Does a foreign citizen lose the Queensland first home concession from August 2026?', a: `For contracts from ${h.date(h.P.states.qld.citizenship_rule_from)}, yes, unless they are a permanent resident or a specified foreign retiree. The home concessions, including the first home ones, now require Australian citizenship, permanent residency or that retiree status. A foreign buyer instead pays the general scale plus additional foreign acquirer duty of ${h.pct(h.P.states.qld.surcharge, 0)}.` },
    { q: 'Is the Queensland First Home Owner Grant means tested?', a: `No. Income has no effect on the ${h.aud(h.P.states.qld.fhog.amount)} grant. The conditions are about the home and the buyer: a new home valued under ${h.aud(h.P.states.qld.fhog.below)}, a contract from 20 November 2023, Australian citizenship or permanent residency, and living in the home for six months within the first year.` },
  ],
  body: (h) => `
<h2>Three regimes for three kinds of first home</h2>
<p>Several states give a first home buyer one concession with one cap. Queensland gives three, and they are very unequal. The ${h.src('qld_first_home_new', 'first home (new home) concession')} and the first home vacant land concession remove all duty, with no ceiling. The ${h.src('qld_first_home', 'first home concession')} on an established home is a fixed deduction that runs out at ${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].below)}. At the same ${h.aud(850000)}, the gap between the two is the whole of the duty:</p>
${h.table(['Price', 'New home or land', 'Established home', 'Investor'], [500000, 650000, 700000, 750000, 850000, 1000000].map((p) => [h.aud(p), h.duty('qld', p, 'first', 'new'), h.duty('qld', p, 'first'), h.duty('qld', p, 'investor')]), 'Transfer duty for a first home buyer in Queensland, contracts from 1 August 2026', ['l', 'r', 'r', 'r'])}

<h2>Established homes: the stepped deduction</h2>
<p>The ${h.src('qld_concession_rates', 'concession rates page')} sets out the method. First, duty is worked out at the home concession rate, the reduced scale every owner-occupier gets. Then the first home concession amount for the price band is subtracted. The amount is ${h.aud(h.P.states.qld.first_home_table[0].deduct)} for any home under ${h.aud(h.P.states.qld.first_home_table[0].below)} and falls by ${h.aud(h.P.states.qld.first_home_table[0].deduct - h.P.states.qld.first_home_table[1].deduct)} for each ${h.aud(10000)} step above that.</p>
${h.table(['Home value', 'First home concession amount'], h.P.states.qld.first_home_table.map((r, i, all) => [i === 0 ? `under ${h.aud(r.below)}` : `${h.aud(all[i - 1].below)} to under ${h.aud(r.below)}`, h.aud(r.deduct)]).concat([[`${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].below)} or more`, h.aud(0)]]), 'First home concession amounts on established homes', ['l', 'r'])}
<p>Because ${h.aud(h.P.states.qld.first_home_table[0].deduct)} is exactly the home concession duty on ${h.aud(700000)}, a first home up to that value pays nothing. Between ${h.aud(700000)} and ${h.aud(h.P.states.qld.first_home_table[0].below)} a small amount appears: ${h.duty('qld', 705000, 'first')} at ${h.aud(705000)}. The steps then make the duty jump at each ${h.aud(10000)} line, so ${h.aud(709999)} costs ${h.duty('qld', 709999, 'first')} and ${h.aud(710000)} costs ${h.duty('qld', 710000, 'first')}. The office's worked example, ${h.aud(795000)}, is home concession duty of ${h.duty('qld', 795000, 'owner')} less ${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].deduct)}, giving ${h.duty('qld', 795000, 'first')}.</p>

<h2>New homes and vacant land: full, uncapped</h2>
<p>For contracts from 1 May 2025, a first home buyer of a new home, or of vacant land on which to build a first home, pays no transfer duty regardless of value. One detail matters on larger blocks: if part of the land is not used for residential purposes, that part is assessed at the normal scale.</p>

<h2>New or established: what the choice is worth</h2>
<p>For a first buyer with a budget around ${h.aud(800000)}, the property type now decides the duty far more than the price does. An established house at ${h.aud(800000)} carries ${h.duty('qld', 800000, 'first')}, because the first home concession amount has run out; a new house or townhouse at the same price carries ${h.duty('qld', 800000, 'first', 'new')}. A buyer who prefers an older home in an established suburb is effectively paying that duty for the location. Below ${h.aud(700000)}, by contrast, the choice is neutral on duty, and only the grant on new homes still tilts the balance. The ${h.a('new-vs-established', 'new versus established comparison')} runs the same test across every state.</p>

<h2>The rules from 1 August 2026</h2>
<p>Queensland tightened the conditions for all home concessions, first home ones included, for contracts entered into on or after ${h.date(h.P.states.qld.citizenship_rule_from)}.</p>
<ul>
<li><strong>Who:</strong> each buyer claiming the concession must be an Australian citizen, a permanent resident or a specified foreign retiree.</li>
<li><strong>Moving in:</strong> within one year of settlement. The deadline cannot be extended.</li>
<li><strong>Renting:</strong> you cannot rent out the whole home before you move in, nor in the year after. Renting part of it is allowed if you keep living there and the lease started on or after 10 September 2024.</li>
<li><strong>Demolition:</strong> knocking the house down before you have lived in it as your home costs you the concession.</li>
</ul>
<p>The Queensland Revenue Office's own example of a mixed couple, where only one partner meets the citizenship test, is worked through on the ${h.a('qld-foreign', 'Queensland foreign acquirer page')}.</p>

<h2>The ${h.aud(h.P.states.qld.fhog.amount)} grant</h2>
<p>The ${h.src('qld_fhog', 'Queensland First Home Owner Grant')} pays ${h.aud(h.P.states.qld.fhog.amount)} for contracts from 20 November 2023 on a new home valued under ${h.aud(h.P.states.qld.fhog.below)}. The grant requires Australian citizenship or permanent residency, income is irrelevant, and the home has to be occupied for six months within the first year. Combined with the uncapped new home concession, a first buyer of a ${h.aud(700000)} new home pays ${h.duty('qld', 700000, 'first', 'new')} in duty and receives ${h.aud(h.calc('qld', 700000, 'first', 'new').grant.amount)}; at ${h.aud(780000)} the duty is still nil but the grant is gone. The ${h.a('first-home-owner-grant', 'grant comparison')} shows how Queensland's grant ranks nationally.</p>
<p>A buyer who fails the first home test, for example because they owned a home years ago, still gets the ${h.a('qld-home-concession', 'home concession rate')} on a home they will live in.</p>
`,
  related: ['qld', 'qld-home-concession', 'qld-foreign', 'first-home-owner-grant', 'new-vs-established', 'vacant-land-stamp-duty'],
  sources: ['qld_first_home', 'qld_first_home_new', 'qld_concession_rates', 'qld_fhog'],
});
