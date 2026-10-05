import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'vacant-land-stamp-duty',
  path: '/guides/vacant-land-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 50,
  mini: 'landState',
  nav: 'Stamp duty on land',
  card: 'A block bought to build on: lower ceilings in NSW and WA, no cap in Queensland and South Australia, no grant on the land alone.',
  title: 'Vacant Land Stamp Duty 2026: First Home Blocks by State',
  description: 'Vacant land stamp duty 2026-27 for first home buyers: exempt to $350,000 in NSW and $450,000 in WA, no cap in QLD and SA, nothing off in Tasmania or the NT.',
  h1: 'Stamp duty on vacant land',
  intro: 'A block of land is taxed under the same scale as a house, but the first home concessions treat it as a different product, with lower ceilings in some states and none at all in others.',
  resume: (h) => `A first home buyer purchasing a block of land to build on in 2026-27 pays no duty at any price in Queensland, South Australia and the ACT, but faces lower ceilings than for a house in NSW and Western Australia and no concession in Tasmania or the Northern Territory. In NSW the land exemption stops at ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)} and the concession at ${h.aud(h.P.states.nsw.fhbas.land_cap)}, against ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and ${h.aud(h.P.states.nsw.fhbas.home_cap)} for a home. Western Australia exempts land to ${h.aud(h.P.states.wa.fhor.land_exempt_to)} and charges $${h.num(h.P.states.wa.fhor.land_rate * 100, 2)} per $100 above that up to ${h.aud(h.P.states.wa.fhor.land_cap)}. Victoria applies its first home thresholds to the value of the land alone. Queensland's first home vacant land concession has no cap for contracts from ${h.date('2025-05-01')}. No state pays a grant on land on its own; the grant follows the home that is built. Several land concessions also come with a deadline to build and move in, counted from settlement or from the occupancy certificate.`,
  faqs: (h) => [
    { q: 'Why does a first home buyer pay NSW duty on a $400,000 block but not on a $400,000 unit?', a: `Revenue NSW uses lower thresholds for vacant land. The exemption ends at ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)} for land and ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} for a home, so a ${h.aud(400000)} block falls inside the land concession band and carries ${h.duty('nsw', 400000, 'first', 'vacant')}, while a unit at the same price is exempt. From ${h.aud(h.P.states.nsw.fhbas.land_cap)} a block pays the full ${h.duty('nsw', h.P.states.nsw.fhbas.land_cap, 'owner', 'vacant')}.` },
    { q: 'How long do I have to build and move in on Victorian land bought with the first home exemption?', a: 'The State Revenue Office Victoria requires you to move in at the latest twelve months after the occupancy certificate is issued or thirty-six months after settlement, and then to live there for twelve continuous months. The exemption is assessed on the value of the land alone, so a block under the threshold is exempt even if the finished house will cost far more.' },
    { q: 'Is there a price cap on the Queensland first home vacant land concession?', a: `No. For contracts from ${h.date('2025-05-01')} the Queensland Revenue Office gives a full concession on vacant land bought to build a first home, at any price. Only the part of the land that is not used for the residence is charged at the normal rate. Without it, an ${h.aud(500000)} block would carry ${h.duty('qld', 500000, 'investor', 'vacant')} of transfer duty.` },
    { q: 'Does the ACT Home Buyer Concession Scheme cover a block of residential land?', a: `Yes. The ACT Revenue Office lists residential land alongside new and established homes, and since ${h.date(h.P.states.act.hbcs.from)} there is no value or income limit. An eligible buyer of a ${h.aud(600000)} block pays nothing instead of ${h.duty('act', 600000, 'owner', 'vacant')}. You must have held no interest in any property in the previous ${h.P.states.act.hbcs.no_property_years} years and live in the home for a year.` },
    { q: 'Do I get the First Home Owner Grant when I buy land in South Australia or the Territory?', a: `Not for the land itself. RevenueSA pays its grant of up to ${h.aud(h.P.states.sa.fhog.amount)} only on a new home, and the Northern Territory's ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant excludes land on its own. Signing a building contract is what brings the grant into play. In South Australia the block itself can still be free of duty under the first home relief.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [300000, 400000, 500000, 600000];
    return `
<h2>Land against house at the same price</h2>
<p>Ask a revenue office about a block and a house at the same price and you can get two different answers. The table compares a first home buyer paying ${h.aud(450000)} for each.</p>
${h.table(['State', 'Block of land', 'Established home', 'Difference'], STATES.map((s) => { const l = h.calc(s, 450000, 'first', 'vacant').total, e = h.calc(s, 450000, 'first').total; return [STATE_INFO[s].short, h.aud(l), h.aud(e), h.aud(l - e)]; }), 'First home buyer at $450,000', ['l', 'r', 'r', 'r'])}
<p>NSW and Western Australia set land ceilings well below their home ceilings, so land can cost more even though it is the cheaper asset. Queensland and South Australia go the other way: their land concessions are full and uncapped, while an established home is charged. Victoria, the ACT, Tasmania and the Territory treat the two alike at this price.</p>

<h2>First home buyer blocks at four prices</h2>
${h.table(['State', ...prices.map((p) => h.aud(p))], STATES.map((s) => [STATE_INFO[s].short, ...prices.map((p) => h.duty(s, p, 'first', 'vacant'))]), 'Duty on vacant land for a first home buyer who will build', ['l', 'r', 'r', 'r', 'r'])}
<p>Western Australia's land rate, $${h.num(P.wa.fhor.land_rate * 100, 2)} per $100 above ${h.aud(P.wa.fhor.land_exempt_to)}, is steeper than its home rate because the band is only ${h.aud(P.wa.fhor.land_cap - P.wa.fhor.land_exempt_to)} wide. A ${h.aud(500000)} block there costs ${h.duty('wa', 500000, 'first', 'vacant')}; by ${h.aud(P.wa.fhor.land_cap)} the buyer pays the general rate, ${h.duty('wa', P.wa.fhor.land_cap, 'investor', 'vacant')}. The NSW land fade works the same way as its home fade, in a narrower ${h.aud(P.nsw.fhbas.land_cap - P.nsw.fhbas.land_exempt_to)} band.</p>
<!--mini:fhbState-->

<h2>State notes for land buyers</h2>
<h3>NSW</h3>
<p>The First Home Buyers Assistance Scheme treats land as a separate category with its own ceiling. The residence rule still applies: once the home is built you must move in within twelve months and stay twelve continuous months. The ${h.a('nsw-first-home-buyers', 'NSW first home page')} has the full test.</p>
<h3>Victoria</h3>
<p>The State Revenue Office Victoria applies the first home exemption up to ${h.aud(P.vic.fhb.exempt_to)} and the concession up to ${h.aud(P.vic.fhb.cap)} to the land's value. The principal place of residence concession up to ${h.aud(P.vic.ppr_to)} also covers vacant land for buyers who are not first home buyers, again on the land alone. On a ${h.aud(450000)} block that buyer pays ${h.duty('vic', 450000, 'owner', 'vacant')} instead of ${h.duty('vic', 450000, 'investor', 'vacant')}.</p>
<h3>Queensland</h3>
<p>The first home vacant land concession is full with no cap, for contracts from ${h.date('2025-05-01')}. Since ${h.date(P.qld.citizenship_rule_from)} the buyer must be a citizen, permanent resident or specified foreign retiree, and demolishing an existing building before living on the land loses the concession. Any part of the land not used for the home pays the general rate.</p>
<h3>Western Australia</h3>
<p>For transactions from ${h.date(P.wa.fhor.from)} land is exempt to ${h.aud(P.wa.fhor.land_exempt_to)} and charged at the first home owner rate to ${h.aud(P.wa.fhor.land_cap)}. Eligibility follows the grant rules. If no pre-approval was obtained, RevenueWA asks for the general rate at settlement and refunds the difference afterwards.</p>
<h3>South Australia</h3>
<p>RevenueSA's first home buyer relief, for contracts from ${h.date(P.sa.fhb_relief.from)}, covers land bought to build a home on, with no cap. You must occupy the home for six continuous months within the first year. The relief does not apply to the foreign ownership surcharge.</p>
<h3>ACT</h3>
<p>The Home Buyer Concession Scheme covers residential land as well as homes, with no value limit since ${h.date(P.act.hbcs.from)}. The one-year residence requirement starts once you live there, beginning within a year of settlement.</p>
<h3>Tasmania and the Northern Territory</h3>
<p>Neither has a first home duty concession on land in 2026-27. A ${h.aud(350000)} block costs ${h.duty('tas', 350000, 'first', 'vacant')} in Tasmania and ${h.duty('nt', 350000, 'first', 'vacant')} in the Territory, whoever buys it.</p>

<h2>Home buyers who are not first home buyers</h2>
<p>A second-time buyer planning to build gets little help on land. Victoria is the clearest case where help exists: the State Revenue Office says its principal place of residence concession covers vacant land, assessed on the land alone. The table shows what the calculator applies in each jurisdiction for that buyer.</p>
${h.table(['State', 'Owner who will build', 'Investor', 'Gap'], STATES.map((s) => { const o = h.calc(s, 400000, 'owner', 'vacant').total, i = h.calc(s, 400000, 'investor', 'vacant').total; return [STATE_INFO[s].short, h.aud(o), h.aud(i), h.aud(i - o)]; }), 'Block of land at $400,000, buyer who is not a first home buyer', ['l', 'r', 'r', 'r'])}
<p>Queensland's home concession is for a home, so a second-time buyer pays the general rate on land, ${h.duty('qld', 400000, 'owner', 'vacant')} at ${h.aud(400000)}. Western Australia's concessional rate for a principal place of residence stops at ${h.aud(P.wa.concessional_cap)}, far below any of these prices.</p>

<h2>Investors and land</h2>
<p>An investor buying land pays the general scale everywhere, and in the ACT the higher non-owner-occupier rates: ${h.duty('act', 450000, 'investor', 'vacant')} on a ${h.aud(450000)} block, against ${h.duty('act', 450000, 'owner', 'vacant')} for an owner who will build. The ${h.a('investor-stamp-duty', 'investor guide')} compares the scales.</p>

<h2>Grants come with the building contract</h2>
<p>The First Home Owner Grant is paid for a new home, not for a block. NSW caps a land-plus-building purchase at ${h.aud(P.nsw.fhog.build_cap)} in total for its ${h.aud(P.nsw.fhog.amount)} grant. South Australia and the Territory say plainly that land alone does not qualify. The ${h.a('house-and-land-package-stamp-duty', 'house and land package guide')} explains how the two contracts interact.</p>
`;
  },
  related: ['first-home-buyer-stamp-duty', 'house-and-land-package-stamp-duty', 'first-home-owner-grant', 'wa-first-home-owner-rate', 'vic-ppr', 'home'],
  sources: ['nsw_fhbas', 'vic_fhb', 'vic_ppr', 'qld_first_home_new', 'qld_concession_rates', 'wa_fhor', 'sa_fhb_properties', 'sa_fhog', 'act_hbcs', 'nt_homegrown'],
});
