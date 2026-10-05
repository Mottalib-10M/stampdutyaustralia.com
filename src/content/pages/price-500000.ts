import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'New South Wales'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'Western Australia'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'ACT'], ['nt', 'Northern Territory']] as const;

export default definePage({
  id: 'price-500000',
  path: '/prices/stamp-duty-on-500000/',
  group: 'prices',
  kind: 'price',
  order: 10,
  mini: 'priceCheck',
  nav: 'Duty on $500,000',
  card: 'Stamp duty on a $500,000 home in each state: where first home buyers pay nothing and where they pay in full.',
  title: 'Stamp Duty on $500,000 2026: Every State and Territory',
  description: 'Stamp duty on $500,000 in 2026: from $8,408 in the ACT to $23,929 in the NT for a home buyer, and nothing for a first home buyer in five of eight jurisdictions.',
  h1: 'Stamp duty on $500,000',
  intro: 'What a $500,000 home or unit costs in transfer duty in each state and territory, for the buyers most likely to be paying that price.',
  resume: (h) => `At ${h.aud(500000)} the answer depends less on the state than on whether the buyer is a first home buyer in a state that still exempts established homes. In New South Wales, Victoria, Queensland, Western Australia and the ACT an eligible first home buyer pays no duty at this price, new or established. In South Australia, Tasmania and the Northern Territory the same buyer pays the full scale on an established home: ${h.duty('sa', 500000, 'first')}, ${h.duty('tas', 500000, 'first')} and ${h.duty('nt', 500000, 'first')}. For an owner-occupier who has bought before, duty runs from ${h.duty('act', 500000)} in the ACT and ${h.duty('qld', 500000)} in Queensland, both of which have a lower rate for people who live in the home, up to ${h.duty('nt', 500000)} in the Territory. Five hundred thousand dollars is also exactly where South Australia's top band begins, and it was Western Australia's first home exemption limit until 6 May 2026.`,
  faqs: (h) => [
    { q: 'Which states charge no stamp duty on a $500,000 first home?', a: `For an established home, five: NSW, Victoria, Queensland, Western Australia and the ACT, where an eligible first home buyer pays nothing at ${h.aud(500000)}. On a new home, South Australia joins them. Tasmania charges ${h.duty('tas', 500000, 'first', 'new')} and the Northern Territory ${h.duty('nt', 500000, 'first', 'new')}, although their grants of ${h.aud(h.P.states.tas.fhog.amount)} and ${h.aud(h.P.states.nt.fhog.amount)} on a new home outweigh that duty.` },
    { q: 'How much stamp duty is there on a $500,000 investment property?', a: `Between ${h.duty('act', 500000, 'investor')} in the ACT and ${h.duty('vic', 500000, 'investor')} in Victoria. An investor gets none of the owner-occupier or first home concessions, so the general scale applies everywhere. Queensland charges ${h.duty('qld', 500000, 'investor')} and NSW ${h.duty('nsw', 500000, 'investor')}. A foreign investor adds a surcharge of ${h.pct(h.P.states.wa.surcharge, 0)} to ${h.pct(h.P.states.nsw.surcharge, 0)} of the price in every state, though not in the two territories.` },
    { q: 'Did the WA first home threshold change for a $500,000 purchase in 2026?', a: `It changed where the line sits, not the result at this price. From 21 March 2025 to 6 May 2026 the full exemption stopped at ${h.aud(500000)}; since ${h.date(h.P.states.wa.fhor.from)} it reaches ${h.aud(h.P.states.wa.fhor.home_exempt_to)}. A ${h.aud(500000)} first home is duty free under both rules, while a ${h.aud(550000)} first home, which used to pay part of the ${h.duty('wa', 550000)} general duty, is now exempt as well.` },
  ],
  body: (h) => `
<h2>Four buyers, eight jurisdictions, one price</h2>
<p>Each row below is computed by the engine behind the site's calculators, at the 2026-27 rates. "Owner-occupier" means someone who will live in the home but has owned property before.</p>
${h.table(['State or territory', 'Owner-occupier', 'Investor', 'First home, established', 'First home, new'], ST.map(([s, n]) => [n, h.duty(s, 500000, 'owner'), h.duty(s, 500000, 'investor'), h.duty(s, 500000, 'first'), h.duty(s, 500000, 'first', 'new')]), 'Duty on a $500,000 purchase, contracts in 2026-27, no foreign buyer', ['l', 'r', 'r', 'r', 'r'])}
<p>Only three jurisdictions charge an owner-occupier less than an investor at this price. Victoria applies its principal place of residence rate up to ${h.aud(h.P.states.vic.ppr_to)}, which saves ${h.aud(h.calc('vic', 500000, 'owner').saving)} here. Queensland's home concession saves ${h.aud(h.calc('qld', 500000, 'owner').saving)}. The ACT's owner-occupier table saves ${h.aud(h.calc('act', 500000, 'owner').saving)}. Everywhere else a repeat buyer living in the home pays exactly what an investor pays.</p>

<h2>Why $500,000 is a border price</h2>
<p>Several thresholds sit at or just around this figure. South Australia's conveyance scale moves into its top band, $${h.num(h.P.states.sa.brackets[8].rate * 100, 2)} per $100, at precisely ${h.aud(h.P.states.sa.brackets[8].from)}, so every dollar over this price costs a South Australian buyer more than every dollar under it. The Northern Territory formula runs until ${h.aud(h.P.states.nt.formula.upto)}, which puts ${h.aud(500000)} near the end of the curve: its effective rate here is ${h.pct(h.calc('nt', 500000).total / 500000, 2)}, close to the flat ${h.pct(h.P.states.nt.flat_bands[0].rate, 2)} that follows. Victoria's PPR rate stops at ${h.aud(h.P.states.vic.ppr_to)}, ${h.aud(h.P.states.vic.ppr_to - 500000)} above this price.</p>
<p>Western Australia is the state where this number used to matter most. Its first home exemption ended at ${h.aud(500000)} until 6 May 2026 and now reaches ${h.aud(h.P.states.wa.fhor.home_exempt_to)}, so a West Australian buying their first home at ${h.aud(500000)} was duty free before the change and still is.</p>

<h2>The three places where a first home still costs duty</h2>
<p>South Australia gives its first home relief only on new homes, off-the-plan apartments and land, so ${h.aud(500000)} for an established house costs ${h.duty('sa', 500000, 'first')}. Tasmania's exemption for established homes ended for settlements after ${h.date(h.P.states.tas.fhb_established_ended)}, leaving ${h.duty('tas', 500000, 'first')}. The Northern Territory has no first home duty concession on established homes at all: ${h.duty('nt', 500000, 'first')}.</p>
<p>On a new home the picture flips in two of the three. South Australia waives the duty entirely, and Tasmania's grant of ${h.aud(h.P.states.tas.fhog.amount)} more than covers its duty. In the Territory the ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant is roughly twice the duty, and a house and land package bought from a builder carries no duty at all.</p>

<h2>Grants on a $500,000 new home</h2>
<p>A new home at this price is under every grant cap. A first home buyer would receive ${h.aud(h.calc('nsw', 500000, 'first', 'new').grant.amount)} in NSW, ${h.aud(h.calc('vic', 500000, 'first', 'new').grant.amount)} in Victoria, ${h.aud(h.calc('qld', 500000, 'first', 'new').grant.amount)} in Queensland, ${h.aud(h.calc('wa', 500000, 'first', 'new').grant.amount)} in WA and up to ${h.aud(h.calc('sa', 500000, 'first', 'new').grant.amount)} in South Australia. The ACT pays no grant. Eligibility rules differ; the ${h.a('first-home-owner-grant', 'grant guide')} sets them side by side.</p>

<h2>Moving up the price ladder</h2>
<p>At ${h.aud(600000)} two exemption limits are reached at once, Victoria's and Western Australia's; the ${h.a('price-600000', '$600,000 page')} shows what that does to the table. All nine prices are compared on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-600000', 'prices', 'first-home-buyer-stamp-duty', 'new-vs-established', 'sa', 'nt'],
  sources: ['nsw_rates', 'vic_ppr', 'qld_concession_rates', 'wa_fhor', 'sa_rates', 'tas_fhb', 'act_rates', 'nt_calc'],
});
