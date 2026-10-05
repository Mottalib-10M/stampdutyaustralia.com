import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'vic-pensioner',
  path: '/vic/pensioner-concession/',
  group: 'vic',
  kind: 'guide',
  order: 40,
  mini: 'pensioner',
  nav: 'VIC pensioner concession',
  card: 'Card holders pay no duty on a home to $600,000 and less to $750,000, once in a lifetime.',
  title: 'Pensioner Stamp Duty Concession VIC 2026: $0 to $600,000',
  description: 'Pensioner stamp duty concession Victoria 2026: card holders pay no duty to $600,000 and a reduced amount to $750,000. Once only, not with first home relief.',
  h1: 'Victoria\'s pensioner and concession card holder duty reduction',
  intro: 'For contracts from 1 July 2023, eligible pension and concession card holders buying a home in Victoria can cut or remove land transfer duty once; this page shows the figures and the choices involved.',
  resume: (h) => `A pensioner or concession card holder buying a home in Victoria pays no land transfer duty when the dutiable value is ${h.aud(h.P.states.vic.pensioner.exempt_to)} or less, under the State Revenue Office reduction that applies to contracts signed from 1 July 2023. Between ${h.aud(h.P.states.vic.pensioner.exempt_to)} and ${h.aud(h.P.states.vic.pensioner.cap)} the reduction tapers away evenly, so a downsizer paying ${h.aud(680000)} owes ${h.duty('vic', 680000, 'owner', 'established', false, { pensioner: true })} rather than ${h.duty('vic', 680000, 'owner')}, and at ${h.aud(h.P.states.vic.pensioner.cap)} or above the full general scale applies. These are the same thresholds as the first home buyer scheme, but the two cannot be combined, and the pensioner reduction can be claimed only once in a lifetime. A retiree who sells the family home and buys a smaller unit is the typical user; one who buys above ${h.aud(h.P.states.vic.pensioner.cap)} gets no benefit at all and pays ${h.duty('vic', 800000, 'owner')} on an ${h.aud(800000)} purchase. Every figure on this page is produced by the same engine as the Victorian calculator.`,
  faqs: (h) => [
    { q: 'How much duty does a Victorian pensioner pay on a $700,000 unit?', a: `${h.duty('vic', 700000, 'owner', 'established', false, { pensioner: true })}, if the purchase qualifies for the pensioner and concession card holder reduction. Without it, the same unit would cost ${h.duty('vic', 700000, 'owner')}. The price sits two thirds of the way into the taper between ${h.aud(h.P.states.vic.pensioner.exempt_to)} and ${h.aud(h.P.states.vic.pensioner.cap)}, so one third of the general duty is removed.` },
    { q: 'Can I use the Victorian pensioner duty reduction twice?', a: `No. The State Revenue Office allows the reduction once only for contracts from 1 July 2023. If you move again later, the next purchase is assessed without it, and the principal place of residence concession is the general relief left for an owner-occupier, available up to a dutiable value of ${h.aud(h.P.states.vic.ppr_to)}.` },
    { q: 'Is a Victorian downsizer on a pension better off claiming first home buyer relief?', a: `Only a pensioner who has never owned a home faces the choice, and the numbers are identical: both schemes exempt up to ${h.aud(h.P.states.vic.fhb.exempt_to)} and taper to ${h.aud(h.P.states.vic.fhb.cap)}. You must pick one. Claiming the first home benefit leaves the once-only pensioner reduction unused for a future move.` },
    { q: 'Does the Victorian pensioner reduction apply to a purchase over $750,000?', a: `No. At ${h.aud(h.P.states.vic.pensioner.cap)} the reduction has reached zero, and above it the general scale applies in full. A downsizer moving from a large house into a ${h.aud(850000)} townhouse pays ${h.duty('vic', 850000, 'owner')}. The single use is not spent on that purchase, because nothing was reduced.` },
    { q: 'What does a Victorian card holder pay on a home priced at exactly $600,000?', a: `Nothing. The exemption covers a dutiable value of ${h.aud(h.P.states.vic.pensioner.exempt_to)} or less, so the limit itself is inside it. The same home bought by an owner-occupier without the reduction costs ${h.duty('vic', 600000, 'owner')}, and by an investor ${h.duty('vic', 600000, 'investor')}. One dollar more and the taper begins, although the duty on the first few thousand dollars above the limit is small.` },
    { q: 'Do pensioners pay less stamp duty in the ACT than in Victoria?', a: `From 1 July 2026, yes. The ACT Pensioner Duty Concession Scheme removes conveyance duty for eligible pensioners with no value cap, so a ${h.aud(900000)} home costs nothing there, against ${h.duty('vic', 900000, 'owner')} in Victoria, where the reduction ends at ${h.aud(h.P.states.vic.pensioner.cap)}. Each territory and state sets its own eligibility list.` },
  ],
  body: (h) => `
<h2>Where the reduction starts and stops</h2>
<p>The pensioner reduction is built around two numbers. At ${h.aud(h.P.states.vic.pensioner.exempt_to)} or less there is no duty at all. Above ${h.aud(h.P.states.vic.pensioner.cap)} there is no reduction at all. In between, the duty you pay is the general duty multiplied by how far the price has travelled into the ${h.aud(h.P.states.vic.pensioner.cap - h.P.states.vic.pensioner.exempt_to)} band.</p>
${h.table(['Price of the home', 'With the pensioner reduction', 'Owner-occupier without it', 'Reduction'], [450000, 600000, 640000, 680000, 720000, 750000, 800000].map((p) => { const r = h.calc('vic', p, 'owner', 'established', false, { pensioner: true }); const n = h.calc('vic', p, 'owner'); return [h.aud(p), h.aud(r.total), h.aud(n.total), h.aud(n.total - r.total)]; }), 'Land transfer duty in Victoria, contracts from 1 July 2023', ['l', 'r', 'r', 'r'])}
<p>The third column is not the investor rate. Below ${h.aud(h.P.states.vic.ppr_to)} an owner-occupier already gets the ${h.a('vic-ppr', 'principal place of residence concession')}, so the pensioner reduction at ${h.aud(450000)} saves ${h.aud(h.calc('vic', 450000, 'owner').total)} against the PPR rate, and more against the ${h.duty('vic', 450000, 'investor')} an investor would pay. From ${h.aud(h.P.states.vic.ppr_to)} upward, the comparison is with the general scale.</p>
<!--mini:priceCheck-->

<h2>The taper, step by step</h2>
<p>The SRO works out the reduced amount in three moves. First, the general duty is calculated on the dutiable value as if no concession existed. Second, that duty is multiplied by (${h.aud(h.P.states.vic.pensioner.cap)} − value) ÷ ${h.aud(h.P.states.vic.pensioner.cap - h.P.states.vic.pensioner.exempt_to)}, which gives the reduction. Third, the reduction is taken off. On ${h.aud(660000)}: the general duty is ${h.duty('vic', 660000, 'owner')}, the fraction is ${h.num((h.P.states.vic.pensioner.cap - 660000) / (h.P.states.vic.pensioner.cap - h.P.states.vic.pensioner.exempt_to), 2)}, and the duty payable is ${h.duty('vic', 660000, 'owner', 'established', false, { pensioner: true })}. The SRO's calculator rounds the reduction up to the whole dollar, and so does this one.</p>

<h2>A worked downsize</h2>
<p>Consider a couple on the age pension selling a four-bedroom house and buying a ${h.aud(640000)} two-bedroom unit near the shops, to live in. Without any concession the unit would cost them ${h.duty('vic', 640000, 'owner')} in land transfer duty. With the pensioner reduction they pay ${h.duty('vic', 640000, 'owner', 'established', false, { pensioner: true })}, a saving of ${h.aud(h.calc('vic', 640000, 'owner').total - h.calc('vic', 640000, 'owner', 'established', false, { pensioner: true }).total)}. Had they found a similar unit for ${h.aud(595000)}, the duty would have been ${h.duty('vic', 595000, 'owner', 'established', false, { pensioner: true })}. Those few tens of thousands on the price are worth an extra ${h.duty('vic', 640000, 'owner', 'established', false, { pensioner: true })} in duty, which is the kind of gap worth bringing to a negotiation.</p>

<h2>What "once only" means in practice</h2>
<p>The ${h.src('vic_pensioner', 'SRO page for contracts from 1 July 2023')} limits the reduction to a single use. That makes timing a real decision for people expecting to move twice in retirement, perhaps from the family house to a townhouse, then later to a smaller unit closer to family or care. Using the reduction on the first move makes sense when the first purchase is inside the ${h.aud(h.P.states.vic.pensioner.exempt_to)} exemption, because that is where it saves the most. Using it on a purchase just under ${h.aud(h.P.states.vic.pensioner.cap)} spends the single entitlement on a modest saving: at ${h.aud(740000)} it removes ${h.aud(h.calc('vic', 740000, 'owner').total - h.calc('vic', 740000, 'owner', 'established', false, { pensioner: true }).total)}.</p>
${h.table(['Price', 'Saving from the reduction', 'As a share of the general duty'], [600000, 650000, 700000, 740000].map((p) => { const n = h.calc('vic', p, 'owner').total; const r = h.calc('vic', p, 'owner', 'established', false, { pensioner: true }).total; return [h.aud(p), h.aud(n - r), h.pct((n - r) / n, 0)]; }), 'What the single use is worth at different prices', ['l', 'r', 'r'])}

<h2>Pensioner reduction or first home benefit</h2>
<p>A card holder who has never owned a home qualifies for both the pensioner reduction and the ${h.a('vic-first-home-buyers', 'first home buyer exemption or concession')}. The thresholds match, so on the purchase itself the duty is the same either way. The SRO requires you to choose one, and since the first home benefit is by nature used once anyway, claiming it keeps the pensioner reduction in reserve. The first home route also opens the ${h.aud(h.P.states.vic.fhog.amount)} First Home Owner Grant on a new home up to ${h.aud(h.P.states.vic.fhog.cap)}.</p>

<h2>Downsizing in other states</h2>
<p>Relief for older buyers varies widely across Australia. The figures below use the same ${h.aud(700000)} purchase.</p>
<ul>
<li><strong>ACT.</strong> From 1 July 2026 the ${h.src('act_pensioner', 'Pensioner Duty Concession Scheme')} has no value cap and an eligible pensioner pays no duty: ${h.duty('act', 700000, 'owner', 'established', false, { pensioner: true })}, compared with ${h.duty('act', 700000, 'owner')} for another owner-occupier. See the ${h.a('act-pensioner', 'ACT pensioner page')}.</li>
<li><strong>South Australia.</strong> For contracts from ${h.date(h.P.states.sa.seniors_from)}, buyers aged 60 or over who sell their home and buy a new home, an off-the-plan apartment or land to build on, on a smaller block, can receive relief of up to ${h.aud(h.P.states.sa.seniors_max_relief)}.</li>
<li><strong>Tasmania.</strong> The pensioner downsizing concession applied only to sales settled by 30 June 2025, so a Tasmanian downsizer now pays the ordinary scale: ${h.duty('tas', 700000, 'owner')}.</li>
</ul>
<p>The ${h.a('pensioner-downsizer-stamp-duty', 'national downsizer guide')} compares the schemes side by side.</p>

<h2>Points to settle before signing</h2>
<p>The reduction works on the dutiable value, which is the contract price unless the market value is higher; a sale between relatives at a discount is assessed on the market value. Off-the-plan purchases have their own deduction, described on the ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')}, and how it combines with the pensioner reduction on a particular contract is a question for the SRO. Finally, a buyer who is a foreign purchaser pays foreign purchaser additional duty of ${h.pct(h.P.states.vic.surcharge, 0)} on top, whatever the age.</p>
`,
  related: ['vic', 'vic-ppr', 'vic-first-home-buyers', 'act-pensioner', 'pensioner-downsizer-stamp-duty', 'vic-off-the-plan'],
  sources: ['vic_pensioner', 'vic_general', 'vic_ppr', 'act_pensioner', 'sa_seniors'],
});
