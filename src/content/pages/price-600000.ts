import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'Western Australia'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'ACT'], ['nt', 'Northern Territory']] as const;

export default definePage({
  id: 'price-600000',
  path: '/prices/stamp-duty-on-600000/',
  group: 'prices',
  kind: 'price',
  order: 20,
  mini: 'priceCheck',
  nav: 'Duty on $600,000',
  card: 'Stamp duty on $600,000: the last price before the Victorian and WA first home exemptions start to taper.',
  title: 'Stamp Duty on $600,000 2026: First Home Limits by State',
  description: 'Stamp duty on $600,000 in 2026: the exact limit of the VIC and WA first home exemptions and of the NSW new home grant; a repeat buyer pays $31,070 in Victoria.',
  h1: 'Stamp duty on $600,000',
  intro: 'Six hundred thousand dollars is the top of several first home exemptions at once. Here is what each state charges at that price, and what changes one step above it.',
  resume: (h) => `${h.aud(600000)} is the highest price at which a first home buyer still pays no duty in both Victoria and Western Australia: Victoria's exemption ends at ${h.aud(h.P.states.vic.fhb.exempt_to)}, and WA's first home owner rate has charged nothing up to ${h.aud(h.P.states.wa.fhor.home_exempt_to)} since ${h.date(h.P.states.wa.fhor.from)}. It is also the ceiling for the NSW First Home Owner (New Homes) Grant on a new home, and for Victoria's pensioner duty exemption. Go one step higher and the picture moves fast: at ${h.aud(650000)} a Victorian first home buyer pays ${h.duty('vic', 650000, 'first')} and a West Australian one ${h.duty('wa', 650000, 'first')}. For a buyer who has owned before, ${h.aud(600000)} costs between ${h.duty('act', 600000)} in the ACT and ${h.duty('vic', 600000)} in Victoria, where the principal place of residence rate has already stopped at ${h.aud(h.P.states.vic.ppr_to)}. A foreign buyer pays up to ${h.duty('vic', 600000, 'investor', 'established', true)}.`,
  faqs: (h) => [
    { q: 'What happens to first home duty in Victoria and WA just above $600,000?', a: `Both states switch from exemption to a tapering charge. In Victoria the concession runs to ${h.aud(h.P.states.vic.fhb.cap)} and a ${h.aud(650000)} first home costs ${h.duty('vic', 650000, 'first')}. In WA the rate is $${h.num(h.P.states.wa.fhor.home_rate * 100, 2)} per $100 above ${h.aud(h.P.states.wa.fhor.home_exempt_to)}, so the same price costs ${h.duty('wa', 650000, 'first')}. Negotiating the price down to ${h.aud(600000)} is worth the whole of that amount.` },
    { q: 'Is a $600,000 new home eligible for the NSW First Home Owner Grant?', a: `Yes, just. The NSW First Home Owner (New Homes) Grant of ${h.aud(h.P.states.nsw.fhog.amount)} applies to a new home valued at ${h.aud(h.P.states.nsw.fhog.new_home_cap)} or less, so this price is the limit. Above it the grant is lost entirely, unless you are buying land and building, where the combined cap is ${h.aud(h.P.states.nsw.fhog.build_cap)}. The duty on the same home is nil under the NSW first home scheme.` },
    { q: 'Does a Victorian pensioner pay stamp duty on a $600,000 home?', a: `Not if they are eligible for the pensioner and concession card holder reduction: it exempts a home up to ${h.aud(h.P.states.vic.pensioner.exempt_to)}, so this price is the last one with no duty. Above it the reduction tapers to nothing at ${h.aud(h.P.states.vic.pensioner.cap)}. Without it, a pensioner would pay ${h.duty('vic', 600000)}. The benefit can be used once, and not together with the first home concession.` },
    { q: 'Which state charges a foreign buyer the most on a $600,000 home?', a: `Victoria, at ${h.duty('vic', 600000, 'investor', 'established', true)}, because its general scale is already high at this price and foreign purchaser additional duty adds ${h.pct(h.P.states.vic.surcharge, 0)}. NSW follows at ${h.duty('nsw', 600000, 'investor', 'established', true)}. The ACT and the Northern Territory add no surcharge, so the same foreign buyer pays ${h.duty('act', 600000, 'investor', 'established', true)} and ${h.duty('nt', 600000, 'investor', 'established', true)} there.` },
  ],
  body: (h) => `
<h2>$600,000 across Australia</h2>
${h.table(['Where', 'First home, established', 'Grant on a new first home', 'Owner-occupier', 'Foreign investor'], ST.map(([s, n]) => [n, h.duty(s, 600000, 'first'), h.aud(h.calc(s, 600000, 'first', 'new').grant.amount), h.duty(s, 600000, 'owner'), h.duty(s, 600000, 'investor', 'established', true)]), 'Duty at $600,000 and grant on a new home at the same price, 2026-27', ['l', 'r', 'r', 'r', 'r'])}
<p>The first column splits the country in two. Five jurisdictions charge nothing; South Australia, Tasmania and the Northern Territory charge their full scale because none of them relieves an established first home. The grant column runs the other way: the three states that tax the established first home are among the most generous on a new one.</p>

<h2>Thresholds that land on this exact figure</h2>
<p>Four separate limits are set at ${h.aud(600000)}:</p>
<ul>
<li>the Victorian first home buyer exemption, ${h.aud(h.P.states.vic.fhb.exempt_to)};</li>
<li>the Western Australian first home owner rate exemption, ${h.aud(h.P.states.wa.fhor.home_exempt_to)} since ${h.date(h.P.states.wa.fhor.from)};</li>
<li>the NSW First Home Owner (New Homes) Grant cap on a new home, ${h.aud(h.P.states.nsw.fhog.new_home_cap)};</li>
<li>the Victorian pensioner and concession card holder exemption, ${h.aud(h.P.states.vic.pensioner.exempt_to)}.</li>
</ul>
<p>Each of them is inclusive: a contract at exactly ${h.aud(600000)} is inside the limit. A dollar more and the Victorian and WA buyers start paying on a taper, while the NSW grant disappears outright.</p>

<h2>Fifty thousand dollars higher</h2>
<p>The jump from ${h.aud(600000)} to ${h.aud(650000)} shows how steep the tapers are. A Victorian first home buyer goes from nothing to ${h.duty('vic', 650000, 'first')}; the general duty at that price is ${h.duty('vic', 650000)}, so the concession still removes most of it, but the first ${h.aud(50000)} above the line costs nearly a quarter of its own value in duty. In WA the first home owner rate gives ${h.duty('wa', 650000, 'first')} for the same step. NSW and Queensland are unaffected: the NSW exemption runs to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}, and a Queensland first home buyer of an established home still pays ${h.duty('qld', 650000, 'first')} at ${h.aud(650000)}.</p>

<h2>A repeat buyer at $600,000</h2>
<p>Victoria's principal place of residence concession stops at ${h.aud(h.P.states.vic.ppr_to)}, so a repeat buyer here pays the general scale, ${h.duty('vic', 600000)}, the highest of the eight. Queensland's home concession rate keeps its owner-occupier at ${h.duty('qld', 600000)}, and the ACT's owner-occupier scale gives ${h.duty('act', 600000)}. South Australia's example for its foreign ownership surcharge also uses this price: ${h.duty('sa', 600000)} of duty plus ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)}.</p>

<h2>Neighbouring prices</h2>
<p>Go down to the ${h.a('price-500000', '$500,000 page')} for the price where more first home schemes overlap, or up to the ${h.a('price-750000', '$750,000 page')}, where the Victorian taper ends and several grants stop. The ${h.a('vic-first-home-buyers', 'Victorian first home buyer page')} and the ${h.a('wa-first-home-owner-rate', 'WA first home owner rate page')} explain the two tapers in detail.</p>
`,
  related: ['price-500000', 'price-750000', 'vic-first-home-buyers', 'wa-first-home-owner-rate', 'vic-pensioner', 'prices'],
  sources: ['vic_fhb', 'wa_fhor', 'nsw_fhog', 'vic_pensioner', 'sa_fos', 'vic_general'],
});
