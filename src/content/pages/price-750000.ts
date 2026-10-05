import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'VIC'], ['qld', 'QLD'], ['wa', 'WA'], ['sa', 'SA'], ['tas', 'TAS'], ['act', 'ACT'], ['nt', 'NT']] as const;

export default definePage({
  id: 'price-750000',
  path: '/prices/stamp-duty-on-750000/',
  group: 'prices',
  kind: 'price',
  order: 30,
  mini: 'priceCheck',
  nav: 'Duty on $750,000',
  card: 'Stamp duty on $750,000: where the Victorian concession ends and four grant limits meet.',
  title: 'Stamp Duty on $750,000 2026: Concession Caps and Grants',
  description: 'Stamp duty on $750,000 in 2026: a Victorian first home buyer pays the full $40,070, the QLD grant needs a lower price, and NSW and the ACT still charge nothing.',
  h1: 'Stamp duty on $750,000',
  intro: 'Three quarters of a million is where several concessions and grants reach their ceilings. What each state charges a first home buyer and an investor at this price.',
  resume: (h) => `For a first home buyer, ${h.aud(750000)} is the price where Victoria stops helping with duty: its first home concession tapers to nothing at ${h.aud(h.P.states.vic.fhb.cap)}, so the buyer pays the full ${h.duty('vic', 750000, 'first')}. The same figure caps four other schemes. Victoria's ${h.aud(h.P.states.vic.fhog.amount)} First Home Owner Grant is still paid on a new home at exactly this price; Queensland's ${h.aud(h.P.states.qld.fhog.amount)} grant is not, because the home must be valued below ${h.aud(h.P.states.qld.fhog.below)}. In NSW the grant applies to land plus a building contract up to ${h.aud(h.P.states.nsw.fhog.build_cap)}. Victoria's pensioner reduction also ends at this price. Meanwhile NSW and the ACT still charge an eligible first home buyer nothing, Queensland charges ${h.duty('qld', 750000, 'first')} on an established home, and Western Australia ${h.duty('wa', 750000, 'first')}. An investor pays between ${h.duty('act', 750000, 'investor')} in the ACT and ${h.duty('vic', 750000, 'investor')} in Victoria.`,
  faqs: (h) => [
    { q: 'Does a $750,000 new home get the Queensland First Home Owner Grant?', a: `No. Queensland pays its ${h.aud(h.P.states.qld.fhog.amount)} grant only when the new home is valued below ${h.aud(h.P.states.qld.fhog.below)}, so a contract at exactly that figure misses out. At ${h.aud(749000)} it is paid. The duty is unaffected either way: a first home buyer pays ${h.duty('qld', 750000, 'first', 'new')} on a new home in Queensland at any price, under the first home (new home) concession.` },
    { q: 'Why does a Victorian first home buyer pay full duty on a $750,000 home?', a: `Because the concession is a sliding scale that reaches zero at ${h.aud(h.P.states.vic.fhb.cap)}. Between ${h.aud(h.P.states.vic.fhb.exempt_to)} and that cap the reduction shrinks with every dollar, and at the cap nothing is left, so the duty is the general ${h.duty('vic', 750000)}. A new home at this price still brings the ${h.aud(h.P.states.vic.fhog.amount)} grant, which is capped at the same figure but inclusive.` },
    { q: 'Can a NSW first home buyer get the grant on a $750,000 house and land contract?', a: `Yes, if the land and the building contract together come to ${h.aud(h.P.states.nsw.fhog.build_cap)} or less. The ${h.aud(h.P.states.nsw.fhog.amount)} First Home Owner (New Homes) Grant has two caps: ${h.aud(h.P.states.nsw.fhog.new_home_cap)} for a completed new home and ${h.aud(h.P.states.nsw.fhog.build_cap)} for land plus construction. Duty on the land itself follows the separate vacant land thresholds of the first home scheme.` },
    { q: 'What did a $750,000 first home cost in Tasmanian duty before July 2026?', a: `Nothing, if it was an established home and settled on or before ${h.date(h.P.states.tas.fhb_established_ended)}: the exemption covered established homes up to ${h.aud(h.P.states.tas.fhb_established_cap_until_end)}. For settlements after that date the full scale applies, ${h.duty('tas', 750000, 'first')} at this price. The top of the old exemption and today's price meet exactly, which makes this the costliest case of the change.` },
  ],
  body: (h) => `
<h2>First home buyers and investors at $750,000</h2>
${h.table(['State', 'First home, established', 'First home, new: duty', 'First home, new: grant', 'Investor'], ST.map(([s, n]) => [n, h.duty(s, 750000, 'first'), h.duty(s, 750000, 'first', 'new'), h.aud(h.calc(s, 750000, 'first', 'new').grant.amount), h.duty(s, 750000, 'investor')]), 'Contracts in 2026-27; WA grant figure for Perth and the south', ['l', 'r', 'r', 'r', 'r'])}
<p>Victoria and Western Australia treat a new and an established first home alike at this price, because their concessions do not distinguish between them; Tasmania and the Territory do too, by giving no duty concession to either. Queensland and South Australia are the opposite: a new first home is duty free at any price, an established one is not.</p>

<h2>Five ceilings at the same number</h2>
<p>Victoria writes ${h.aud(750000)} into three separate rules: the first home concession cap, the pensioner reduction cap and the grant cap. Queensland uses it as the grant limit, NSW as the grant limit for land plus building. Two of those limits include the figure itself (Victoria's grant, the NSW build cap), one excludes it (Queensland's grant), and in Victoria's two duty concessions the reduction has simply reached zero.</p>
<p>It was also, until recently, the cap of two concessions that have now changed. Tasmania exempted established first homes up to ${h.aud(h.P.states.tas.fhb_established_cap_until_end)} for settlements to ${h.date(h.P.states.tas.fhb_established_ended)}. Western Australia's first home concession ended at ${h.aud(750000)} outside Perth and Peel between 21 March 2025 and 6 May 2026, and its grant cap was ${h.aud(750000)} before ${h.date(h.P.states.wa.fhor.from)}.</p>

<h2>How Queensland gets to its figure</h2>
<p>Queensland's ${h.duty('qld', 750000, 'first')} for an established first home is not a separate scale. The home concession rate at this price is ${h.duty('qld', 750000, 'owner')}, and the first home concession takes off a fixed ${h.aud(h.calc('qld', 750000, 'owner').total - h.calc('qld', 750000, 'first').total)}, an amount that falls by ${h.aud(h.P.states.qld.first_home_table[0].deduct - h.P.states.qld.first_home_table[1].deduct)} for each ${h.aud(10000)} band until it disappears at ${h.aud(800000)}. The ${h.a('qld-first-home-buyers', 'Queensland first home page')} has the full table.</p>

<h2>A repeat buyer living in the home</h2>
<p>Without any first home benefit, an owner-occupier at ${h.aud(750000)} pays ${h.duty('qld', 750000, 'owner')} in Queensland and ${h.duty('act', 750000, 'owner')} in the ACT, the two places with an owner-occupier rate at this level, against ${h.duty('nsw', 750000, 'owner')} in NSW and ${h.duty('vic', 750000, 'owner')} in Victoria.</p>

<h2>Either side of $750,000</h2>
<p>The ${h.a('price-600000', '$600,000 page')} covers the price where the Victorian and WA tapers start. At ${h.a('price-800000', '$800,000')}, the next step, the NSW exemption and the Queensland established-home concession both end. Every price is listed on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-600000', 'price-800000', 'vic-first-home-buyers', 'first-home-owner-grant', 'qld-first-home-buyers', 'prices'],
  sources: ['vic_fhb', 'vic_fhog', 'qld_fhog', 'nsw_fhog', 'qld_concession_rates', 'tas_fhb'],
});
