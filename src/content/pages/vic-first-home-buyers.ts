import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'vic-first-home-buyers',
  path: '/vic/first-home-buyers/',
  group: 'vic',
  kind: 'guide',
  order: 20,
  mini: 'fhbState',
  nav: 'VIC first home buyers',
  card: 'No duty to $600,000, a sliding concession to $750,000, land and residence rules, and the $10,000 grant.',
  title: 'First Home Buyer Stamp Duty VIC 2026: Exempt to $600,000',
  description: 'First home buyer stamp duty Victoria 2026: no duty up to $600,000, a concession to $750,000, land valued alone, and the $10,000 grant on new homes to $750,000.',
  h1: 'First home buyer duty in Victoria',
  intro: 'How the State Revenue Office exempts or discounts land transfer duty on a first home, what counts as the value, and the move-in deadlines for houses and land.',
  resume: (h) => `In Victoria a first home buyer pays no land transfer duty when the dutiable value is ${h.aud(h.P.states.vic.fhb.exempt_to)} or less, and a reduced amount up to ${h.aud(h.P.states.vic.fhb.cap)}, after which the full general scale returns. The discount shrinks evenly across that ${h.aud(h.P.states.vic.fhb.cap - h.P.states.vic.fhb.exempt_to)} band: a ${h.aud(650000)} home costs ${h.duty('vic', 650000, 'first')} instead of ${h.duty('vic', 650000, 'owner')}, a ${h.aud(700000)} home ${h.duty('vic', 700000, 'first')}, and at ${h.aud(750000)} the buyer pays the same ${h.duty('vic', 750000, 'first')} as anyone else. The State Revenue Office applies it to new homes, established homes and vacant land, where only the land value counts. At least one buyer must be an Australian or New Zealand citizen or a permanent resident, and the buyer has to move in within 12 months and stay for 12 continuous months; land buyers get longer to build. Defence force members on active service who are enrolled to vote in Victoria are exempt from that residence rule. A new home up to ${h.aud(h.P.states.vic.fhog.cap)} can add the ${h.aud(h.P.states.vic.fhog.amount)} First Home Owner Grant.`,
  faqs: (h) => [
    { q: 'How much stamp duty does a Victorian first home buyer pay on $650,000?', a: `${h.duty('vic', 650000, 'first')}. The price is a third of the way into the concession band, so the State Revenue Office takes two thirds off the general duty of ${h.duty('vic', 650000, 'owner')}. The office's own calculator returns the same figure, because it rounds the reduction up to the whole dollar exactly as this site does.` },
    { q: 'How much does the Victorian first home concession save just under $750,000?', a: `Very little. At ${h.aud(749000)} the concession is almost exhausted: duty is ${h.duty('vic', 749000, 'first')}, against ${h.duty('vic', 749000, 'owner')} for a previous owner. At ${h.aud(760000)} it is ${h.duty('vic', 760000, 'first')}, the general scale. Near the top of the band the concession saves very little, so the bigger cliff in Victoria is around ${h.aud(h.P.states.vic.fhb.exempt_to)}, where the duty starts from zero.` },
    { q: 'Can a New Zealand citizen get the Victorian first home buyer exemption?', a: 'Yes. The State Revenue Office accepts Australian citizens, New Zealand citizens and Australian permanent residents, and only one of the buyers needs to hold one of those statuses. All buyers still need to be first home buyers and meet the residence requirement.' },
    { q: 'When must I move in after buying land for a first home in Victoria?', a: 'Land buyers do not have to move in within 12 months of settlement, because there is nothing to live in yet. Instead the deadline runs from the build: you must move in by the earlier of 12 months after the certificate of occupancy and 36 months after settlement of the land, then live there for 12 continuous months.' },
    { q: 'Should a Victorian pensioner buying a first home claim the pensioner or the first home concession?', a: `One or the other, not both. The two schemes share the same thresholds, exemption to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and concession to ${h.aud(h.P.states.vic.pensioner.cap)}, so the duty works out the same. The pensioner reduction can be used only once, which is a reason some buyers keep it for later and claim the first home benefit now.` },
    { q: 'Do I get the Victorian First Home Owner Grant on top of the duty exemption?', a: `On a new home, yes. The ${h.aud(h.P.states.vic.fhog.amount)} grant applies to a new home valued at ${h.aud(h.P.states.vic.fhog.cap)} or less, and the duty exemption is assessed separately. A new ${h.aud(580000)} townhouse can therefore be duty free and attract the grant. An established home gets the duty relief but never the grant.` },
  ],
  body: (h) => `
<h2>A ${h.aud(h.P.states.vic.fhb.cap - h.P.states.vic.fhb.exempt_to)} band where every dollar counts twice</h2>
<p>Victoria's first home concession has one feature that buyers notice only at the contract stage. Between ${h.aud(h.P.states.vic.fhb.exempt_to)} and ${h.aud(h.P.states.vic.fhb.cap)} the general duty is already at its ${h.pct(h.P.states.vic.brackets[2].rate, 0)} marginal rate, and the concession is withdrawn evenly at the same time. Each extra ${h.aud(10000)} on the price raises the ordinary duty and takes away another fifteenth of the discount, so the duty a first buyer pays climbs much faster than the price.</p>
${h.table(['Dutiable value', 'First home buyer', 'Previous owner living there', 'Investor'], [550000, 600000, 625000, 650000, 700000, 725000, 750000].map((p) => [h.aud(p), h.duty('vic', p, 'first'), h.duty('vic', p, 'owner'), h.duty('vic', p, 'investor')]), 'Victorian land transfer duty, established home, 2026', ['l', 'r', 'r', 'r'])}
<p>From ${h.aud(600000)} to ${h.aud(650000)} the first home duty goes from zero to ${h.duty('vic', 650000, 'first')}; from ${h.aud(700000)} to ${h.aud(750000)} it rises by ${h.aud(h.calc('vic', 750000, 'first').total - h.calc('vic', 700000, 'first').total)}. A buyer who can keep the price at the exemption threshold, or win a few thousand off a price just above it, gains more than the headline saving suggests. The middle column also shows why the band matters even below ${h.aud(h.P.states.vic.fhb.exempt_to)}: a previous owner at ${h.aud(550000)} uses the principal place of residence concession, explained on the ${h.a('vic-ppr', 'PPR concession page')}, and still pays ${h.duty('vic', 550000, 'owner')}.</p>

<h2>How the reduction is calculated</h2>
<p>The SRO takes the general duty on the dutiable value and reduces it by a fraction: (${h.aud(h.P.states.vic.fhb.cap)} − value) ÷ ${h.aud(h.P.states.vic.fhb.cap - h.P.states.vic.fhb.exempt_to)}. At ${h.aud(675000)} the fraction is one half, so the buyer pays half of ${h.duty('vic', 675000, 'owner')}, which comes to ${h.duty('vic', 675000, 'first')}. We compared the method with the ${h.src('vic_calc', 'State Revenue Office calculator')} on 5 October 2026: its result rounds the duty to the dollar and the reduction up to the next dollar, and the engine behind this page does the same.</p>

<h2>Which properties qualify</h2>
<p>The ${h.src('vic_fhb', 'SRO first home buyer page')} covers three kinds of purchase. An established house or apartment and a new home are both valued at the dutiable value of the contract. Vacant land on which you will build is valued on the land alone, so the building contract that follows does not push you over ${h.aud(h.P.states.vic.fhb.exempt_to)}. A ${h.aud(450000)} lot in a growth suburb is therefore duty free for an eligible first buyer, whatever the house will cost.</p>
${h.table(['Vacant land value', 'First home buyer', 'Anyone else'], [400000, 600000, 700000].map((p) => [h.aud(p), h.duty('vic', p, 'first', 'vacant'), h.duty('vic', p, 'investor', 'vacant')]), 'Land bought to build a first home', ['l', 'r', 'r'])}

<h2>Eligibility in plain terms</h2>
<p>You must be buying your first home, and at least one of the buyers must be an Australian citizen, a New Zealand citizen or an Australian permanent resident. The home must become your principal place of residence: you move in within 12 months of settlement and live there for at least 12 continuous months.</p>
<h3>Deadlines on land</h3>
<p>Land buyers cannot move in at settlement, so the SRO sets the deadline at the earlier of two dates: 12 months after the certificate of occupancy for the new home, or 36 months after settlement of the land. A slow build therefore has a hard stop; if the house is not finished three years after the land settles, the 36-month date governs.</p>
<h3>Defence force members</h3>
<p>Members of the defence force on active service who are enrolled on the Victorian electoral roll are exempt from the residence requirement, so a posting interstate does not cost them the concession.</p>

<h2>Pensioner or first home buyer?</h2>
<p>A buyer who holds an eligible pension or concession card and is also buying a first home meets two schemes with the same numbers. The ${h.a('vic-pensioner', 'pensioner and concession card holder reduction')} also exempts up to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and tapers to ${h.aud(h.P.states.vic.pensioner.cap)}, but it can be used once only and the two cannot be stacked. Claiming the first home benefit keeps the pensioner reduction available for a later move.</p>

<h2>The grant on a new home</h2>
<p>Since 1 July 2013 the ${h.src('vic_fhog', 'First Home Owner Grant')} in Victoria has been paid only on new homes, at ${h.aud(h.P.states.vic.fhog.amount)} for a value up to ${h.aud(h.P.states.vic.fhog.cap)}. It sits beside the duty relief rather than replacing it.</p>
${h.table(['New home value', 'Duty, first home buyer', 'Grant', 'Net position'], [550000, 650000, 740000, 800000].map((p) => { const r = h.calc('vic', p, 'first', 'new'); return [h.aud(p), h.aud(r.total), h.aud(r.grant.amount), r.grant.amount >= r.total ? `${h.aud(r.grant.amount - r.total)} ahead` : `${h.aud(r.total - r.grant.amount)} to pay`]; }), 'New home bought by an eligible first home buyer', ['l', 'r', 'r', 'r'])}
<p>A new apartment bought off the plan can also use the off-the-plan deduction, which lowers the dutiable value before the first home thresholds are applied. That combination is set out on the ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')}. A group of buyers with no citizen or permanent resident among them falls outside the scheme altogether, and foreign purchaser additional duty of ${h.pct(h.P.states.vic.surcharge, 0)} is then added to the general scale.</p>
`,
  related: ['vic', 'vic-ppr', 'vic-pensioner', 'vic-off-the-plan', 'first-home-owner-grant', 'nsw-first-home-buyers'],
  sources: ['vic_fhb', 'vic_calc', 'vic_fhog', 'vic_general'],
});
