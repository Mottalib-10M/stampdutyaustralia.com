import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'pensioner-downsizer-stamp-duty',
  path: '/guides/pensioner-and-downsizer-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 80,
  mini: 'pensioner',
  nav: 'Pensioners and downsizers',
  card: 'Three live schemes for older buyers in 2026 (Victoria, the ACT, South Australia), one that closed in Tasmania, and none elsewhere.',
  title: 'Pensioner Stamp Duty Concessions 2026: Downsizer Relief',
  description: 'Pensioner and downsizer stamp duty 2026-27: VIC exempts card holders to $600,000, the ACT scheme has no cap, SA seniors relief reaches $103,830, TAS has ended.',
  h1: 'Stamp duty for pensioners and downsizers',
  intro: 'Selling the family home and buying something smaller usually means paying duty again, at full price, unless you live in one of three jurisdictions.',
  resume: (h) => `Only Victoria, the ACT and South Australia offer stamp duty relief to pensioners or older downsizers in 2026-27, and each scheme works differently. Victoria's pensioner and concession card holder reduction exempts a home up to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and reduces duty up to ${h.aud(h.P.states.vic.pensioner.cap)}, once in a lifetime, for contracts from ${h.date('2023-07-01')}. The ACT's Pensioner Duty Concession Scheme has had no value cap since ${h.date(h.P.states.act.pensioner.from)}, so an eligible pensioner pays no conveyance duty at any price. South Australia introduced seniors downsizing relief for contracts from ${h.date(h.P.states.sa.seniors_from)}: buyers aged 60 or more who sell their principal residence and buy a new home, an off-the-plan apartment or land to build on, on a smaller block, can receive up to ${h.aud(h.P.states.sa.seniors_max_relief)}. Tasmania's pensioner downsizing concession closed for sales settled after ${h.date('2025-06-30')}. Queensland states that it has no additional concession for seniors or pensioner card holders, and the NSW, Western Australian and Northern Territory pages we read list none, so a downsizer there pays the ordinary rate.`,
  faqs: (h) => [
    { q: 'Can a Victorian pensioner who already used the first home exemption claim the pensioner duty reduction?', a: `The State Revenue Office Victoria allows the pensioner and concession card holder reduction only once, and a buyer has to choose between it and the first home buyer exemption or concession. Both use the same thresholds, exempt to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and reduced to ${h.aud(h.P.states.vic.pensioner.cap)}. On a ${h.aud(650000)} unit the reduction cuts duty from ${h.duty('vic', 650000, 'owner')} to ${h.duty('vic', 650000, 'owner', 'established', false, { pensioner: true })}.` },
    { q: 'Is there a price limit on the ACT pensioner stamp duty concession in 2026?', a: `No. For contracts from ${h.date(h.P.states.act.pensioner.from)} the ACT Revenue Office removed the value cap from the Pensioner Duty Concession Scheme, and an eligible pensioner pays no conveyance duty. On a ${h.aud(950000)} home that is a saving of ${h.duty('act', 950000, 'owner')} against the owner-occupier rates. The eligibility test itself is set out on the ACT Revenue Office's page.` },
    { q: 'How much is the South Australian seniors downsizing stamp duty relief?', a: `Up to ${h.aud(h.P.states.sa.seniors_max_relief)}, for contracts from ${h.date(h.P.states.sa.seniors_from)}. That figure is exactly the duty RevenueSA's scale gives on a ${h.aud(2000000)} property. It is for buyers aged 60 and over who sell their principal residence and buy a new home, an off-the-plan apartment or land to build on, with less land than before. RevenueSA lists further conditions on its notice.` },
    { q: 'Do Queensland seniors card holders get a stamp duty discount when downsizing?', a: `No. The Queensland Revenue Office states on its transfer duty rates page that there are no additional concessions for seniors card or pensioner concession card holders. A downsizer moving into a ${h.aud(600000)} unit to live in pays the home concession rate like any other owner-occupier, ${h.duty('qld', 600000, 'owner')}, against ${h.duty('qld', 600000, 'investor')} at the general rate.` },
    { q: 'Can I still claim the Tasmanian pensioner downsizing concession in 2026?', a: `No. The State Revenue Office of Tasmania's concession for pensioners downsizing to a new home applied only to sales settled by ${h.date('2025-06-30')}. A pensioner buying a ${h.aud(500000)} home in Tasmania in 2026-27 pays the general scale, ${h.duty('tas', 500000, 'owner')}. Tasmania has no owner-occupier rate either, so the figure is the same for any buyer.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const vicPrices = [500000, 600000, 650000, 700000, 750000, 800000];
    const saPrices = [700000, 1000000, 1500000, 2000000, 2500000];
    return `
<h2>Where older buyers get help</h2>
<p>The picture for older buyers is patchy, and it has moved in three jurisdictions since the middle of 2025. The table records what each office states for a pensioner or downsizer buying a home to live in.</p>
${h.table(['State', 'Scheme', 'Status in 2026-27', 'Duty on a $700,000 home'], [
  ['VIC', 'Pensioner and concession card holder duty reduction', `exempt to ${h.aud(P.vic.pensioner.exempt_to)}, reduced to ${h.aud(P.vic.pensioner.cap)}`, h.duty('vic', 700000, 'owner', 'established', false, { pensioner: true })],
  ['ACT', 'Pensioner Duty Concession Scheme', `no cap from ${h.date(P.act.pensioner.from)}`, h.duty('act', 700000, 'owner', 'established', false, { pensioner: true })],
  ['SA', 'Seniors downsizing relief (60 and over)', `up to ${h.aud(P.sa.seniors_max_relief)}, contracts from ${h.date(P.sa.seniors_from)}`, 'depends on the purchase'],
  ['TAS', 'Pensioners downsizing to a new home', `ended, sales settled by ${h.date('2025-06-30')}`, h.duty('tas', 700000, 'owner')],
  ['QLD', 'none (office statement)', 'home concession rate only', h.duty('qld', 700000, 'owner')],
  ['NSW', 'none listed', 'general scale', h.duty('nsw', 700000, 'owner')],
  ['WA', 'none listed', 'general scale', h.duty('wa', 700000, 'owner')],
  ['NT', 'none listed on the home owner assistance page', 'general formula', h.duty('nt', 700000, 'owner')],
], 'Pensioner and downsizer schemes, established home unless stated', ['l', 'l', 'l', 'r'])}

<h2>Victoria: pensioner and concession card holders</h2>
<p>For contracts from ${h.date('2023-07-01')}, the State Revenue Office Victoria gives an eligible pensioner or concession card holder buying a home a full exemption up to ${h.aud(P.vic.pensioner.exempt_to)} and a reducing concession up to ${h.aud(P.vic.pensioner.cap)}. The scheme can be used once, and anyone eligible for both it and the first home buyer exemption must choose one. Its thresholds are the same as the first home ones, so the duty is identical whichever of the two is used.</p>
${h.table(['Price', 'With the reduction', 'Without it', 'Saved'], vicPrices.map((p) => { const w = h.calc('vic', p, 'owner', 'established', false, { pensioner: true }).total, n = h.calc('vic', p, 'owner').total; return [h.aud(p), h.aud(w), h.aud(n), h.aud(n - w)]; }), 'Victorian pensioner buying an established home to live in', ['l', 'r', 'r', 'r'])}
<p>Below ${h.aud(P.vic.ppr_to)} the comparison is with the principal place of residence rate, which any owner-occupier gets; above it, with the general scale. Above ${h.aud(P.vic.pensioner.cap)} nothing is saved. The ${h.a('vic-pensioner', 'Victorian pensioner page')} has the card types and the detailed conditions.</p>

<h2>ACT: no cap since 1 July 2026</h2>
<p>The ACT Revenue Office's Pensioner Duty Concession Scheme now removes conveyance duty entirely for an eligible pensioner, whatever the price. Before ${h.date(P.act.pensioner.from)} the scheme had a value cap. The effect is largest on dearer homes: at ${h.aud(1200000)} an owner-occupier would otherwise pay ${h.duty('act', 1200000, 'owner')} under the owner-occupier rates. The ${h.a('act-pensioner', 'ACT pensioner page')} sets out who is eligible.</p>

<h2>South Australia: seniors downsizing relief</h2>
<p>RevenueSA's notice of ${h.date('2026-04-28')} describes relief for buyers aged 60 and over, for contracts from ${h.date(P.sa.seniors_from)}. The buyer sells their principal place of residence and buys a new home, an off-the-plan apartment or land to build on, with a smaller land area than the home sold. The relief is capped at ${h.aud(P.sa.seniors_max_relief)}, which is the duty on ${h.aud(2000000)} under South Australia's scale. RevenueSA's notice lists further conditions that this site has not reviewed, so the table below only shows the cap against the duty at each price, not an eligibility verdict.</p>
${h.table(['Price of the new home', 'Duty at the SA scale', 'Most the relief can cover'], saPrices.map((p) => { const d = h.calc('sa', p, 'owner', 'new').generalDuty; return [h.aud(p), h.aud(d), h.aud(Math.min(d, P.sa.seniors_max_relief))]; }), 'South Australia: duty against the relief cap', ['l', 'r', 'r'])}
<p>Up to ${h.aud(2000000)} the cap is never reached. A first home buyer is in a different scheme altogether: South Australia's first home relief already removes duty on new homes at any price.</p>

<h2>Tasmania: a concession that closed</h2>
<p>The State Revenue Office of Tasmania offered a duty concession to pensioners downsizing to a new home. It applied to sales settled by ${h.date('2025-06-30')}, and there is no replacement in 2026-27. A Tasmanian downsizer now pays ${h.duty('tas', 550000, 'owner')} on a ${h.aud(550000)} home, the same as anyone else.</p>

<h2>Everywhere else: the owner-occupier rate, if there is one</h2>
<p>In Queensland the Queensland Revenue Office says plainly that there are no additional concessions for seniors card or pensioner concession card holders. A downsizer still benefits from the home concession rate available to any owner-occupier. NSW, Western Australia and the Northern Territory publish no pensioner scheme on the pages we read, and NSW and the Territory have no owner-occupier rate either, so a pensioner pays the same as an investor. Western Australia's concessional rate for a principal place of residence is the one help a WA downsizer can count on, and it stops at ${h.aud(P.wa.concessional_cap)}: a ${h.aud(190000)} unit costs ${h.duty('wa', 190000, 'owner')} instead of ${h.duty('wa', 190000, 'investor')}. In Victoria a downsizer without a pensioner or concession card still gets the principal place of residence rate up to ${h.aud(P.vic.ppr_to)}, which is why the Victorian table above compares with that rate at the lower prices.</p>
${h.table(['State', '$500,000', '$800,000', '$1,100,000'], STATES.map((s) => [STATE_INFO[s].short, ...[500000, 800000, 1100000].map((p) => h.duty(s, p, 'owner', 'established', false, { pensioner: true }))]), 'Pensioner buying an established home to live in, where the calculator applies a pensioner scheme (VIC, ACT) and the owner-occupier rate elsewhere', ['l', 'r', 'r', 'r'])}
`;
  },
  related: ['vic-pensioner', 'act-pensioner', 'stamp-duty-changes-2026', 'investor-stamp-duty', 'home'],
  sources: ['vic_pensioner', 'act_pensioner', 'sa_seniors', 'tas_pensioner', 'qld_rates', 'nt_assistance'],
});
