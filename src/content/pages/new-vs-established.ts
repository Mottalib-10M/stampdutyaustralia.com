import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'new-vs-established',
  path: '/guides/new-home-vs-established-home/',
  group: 'guides',
  kind: 'guide',
  order: 70,
  mini: 'newVsEstablished',
  nav: 'New vs established home',
  card: 'Duty minus grant on a brand new home against an older one at the same price, for each state.',
  title: 'New vs Established Home Stamp Duty 2026: Net Cost by State',
  description: 'New vs established home 2026-27: duty minus grant for a first home buyer in each state, from a $50,000 NT grant on a new build to no help on older homes in SA.',
  h1: 'New home or established home: the duty and grant difference',
  intro: 'For a first home buyer the choice between a new build and an older home is partly a tax decision, and the answer flips at the border.',
  resume: (h) => `For a first home buyer in 2026-27, a new home is never dearer than an established one once duty and grants are counted, and in the Northern Territory, South Australia and Queensland it is cheaper by tens of thousands of dollars. Grants are only paid on new homes, and two states also remove duty only on new homes. At ${h.aud(740000)} a Queensland first home buyer pays ${h.duty('qld', 740000, 'first')} on an established home but ${h.duty('qld', 740000, 'first', 'new')} on a new one, and receives a ${h.aud(h.P.states.qld.fhog.amount)} grant. In South Australia the gap at that price is ${h.duty('sa', 740000, 'first')} of duty plus a grant of up to ${h.aud(h.P.states.sa.fhog.amount)}. The Territory charges the same duty on both but pays ${h.aud(h.P.states.nt.fhog.amount)} on the new home. In NSW, Victoria and Western Australia duty is the same on both kinds of home, so the difference is the ${h.aud(h.P.states.nsw.fhog.amount)} grant, and only below each state's cap. Tasmania gives no duty help on either and pays ${h.aud(h.P.states.tas.fhog.amount)} on new homes. The ACT treats both alike: no duty for an eligible buyer, and no grant.`,
  faqs: (h) => [
    { q: 'In which state does buying a new home instead of an established one save a first home buyer the most?', a: `At ${h.aud(740000)} three states stand out. The Territory charges ${h.duty('nt', 740000, 'first')} either way but pays the ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant only on the new home. South Australia charges ${h.duty('sa', 740000, 'first')} on the established home and nothing on the new one, plus a grant. Queensland charges ${h.duty('qld', 740000, 'first')} on the established home, nothing on the new one, and pays ${h.aud(h.P.states.qld.fhog.amount)}.` },
    { q: 'Does a new home cost less stamp duty than an established home in NSW?', a: `Not for duty. Revenue NSW applies the same First Home Buyers Assistance Scheme thresholds to new and existing homes, exempt to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}. The difference is the ${h.aud(h.P.states.nsw.fhog.amount)} grant, paid only on a new home up to ${h.aud(h.P.states.nsw.fhog.new_home_cap)}. A ${h.aud(650000)} new home is over that cap, so a first home buyer gets the same result as on an established home.` },
    { q: 'Is there anything for a second-time buyer who chooses a new home?', a: `In the Northern Territory, yes: the FreshStart New Home Grant pays ${h.aud(h.P.states.nt.freshstart.amount)} to buyers who are not first home owners, for contracts up to ${h.date(h.P.states.nt.freshstart.until)}. In the ACT an owner-occupier buying a new off-the-plan or newly unit-titled apartment pays no duty since ${h.date(h.P.states.act.otp_unit.from)}. Elsewhere a second-time buyer pays the same duty on new and established homes.` },
    { q: 'Why does South Australia charge first home buyers full duty on an older house?', a: `RevenueSA's first home buyer relief, for contracts from ${h.date(h.P.states.sa.fhb_relief.from)}, was written for new homes, off-the-plan apartments and land to build on, and it says plainly that established homes are not covered. A first home buyer of a ${h.aud(550000)} older house pays ${h.duty('sa', 550000, 'first')}, while the same buyer pays nothing on a new home at any price.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [550000, 700000, 900000];
    const net = (s: typeof STATES[number], p: number, t: 'established' | 'new') => { const r = h.calc(s, p, 'first', t); return r.total - r.grant.amount; };
    return `
<h2>The net position at three prices</h2>
<p>Duty is paid out; a grant is paid in. Subtracting one from the other gives a single figure per home, which is the fairest way to compare a new townhouse with an older house at the same price. A negative number means the grant is larger than the duty.</p>
${h.table(['State', ...prices.flatMap((p) => [`Established ${h.aud(p)}`, `New ${h.aud(p)}`])], STATES.map((s) => [STATE_INFO[s].short, ...prices.flatMap((p) => [h.aud(net(s, p, 'established')), h.aud(net(s, p, 'new'))])]), 'First home buyer: duty minus grant, 2026-27', ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Read across a row and the pattern for each state is clear. Queensland and South Australia have a large, steady advantage for new homes because duty goes to zero on them at any price. The Territory's advantage is the grant alone, and it is the largest grant in the country. In NSW the advantage disappears above ${h.aud(P.nsw.fhog.new_home_cap)}, in Victoria above ${h.aud(P.vic.fhog.cap)}, in Western Australia above ${h.aud(P.wa.fhog.cap_south)} in the south of the state. The ACT is level because the Home Buyer Concession Scheme treats both the same and there is no grant.</p>

<h2>Just under or just over a grant cap</h2>
<p>Four grants stop dead at a price ceiling, so two new homes ${h.aud(20000)} apart can be ${h.aud(P.qld.fhog.amount)} apart once the grant is counted. The table puts a new home either side of each cap.</p>
${h.table(['State', 'New home under the cap', 'Duty minus grant', 'New home over the cap', 'Duty minus grant'], ([['nsw', P.nsw.fhog.new_home_cap], ['vic', P.vic.fhog.cap], ['qld', P.qld.fhog.below], ['wa', P.wa.fhog.cap_south]] as const).map(([s, cap]) => { const lo = cap - 10000, hi = cap + 10000; return [STATE_INFO[s].short, h.aud(lo), h.aud(net(s, lo, 'new')), h.aud(hi), h.aud(net(s, hi, 'new'))]; }), 'First home buyer, new home, either side of the grant ceiling', ['l', 'r', 'r', 'r', 'r'])}
<p>Queensland's jump is the largest because its grant is the largest of the four. In Victoria the step is steeper than the grant alone, because the first home concession is also running out at that price. When a price sits near a ceiling, a small difference in the value of the home decides whether the grant is paid at all.</p>

<h2>Why the rules lean towards new homes</h2>
<p>Every revenue office that still pays a First Home Owner Grant limits it to new homes, and two states have moved their duty relief the same way. Queensland's first home (new home) concession, for contracts from ${h.date('2025-05-01')}, is full with no cap, while its established-home concession runs out at ${h.aud(800000)}. South Australia's relief from ${h.date(P.sa.fhb_relief.from)} excludes established homes altogether. Tasmania went further in 2026 by ending its established-home exemption for settlements after ${h.date(P.tas.fhb_established_ended)}, while keeping a ${h.aud(P.tas.fhog.amount)} grant for new homes. The ${h.a('stamp-duty-changes-2026', '2026 changes guide')} dates each of these moves.</p>

<h2>State by state</h2>
<h3>Queensland</h3>
<p>Established: home concession rate less a first home amount, ${h.duty('qld', 750000, 'first')} at ${h.aud(750000)}. New: no duty, and a ${h.aud(P.qld.fhog.amount)} grant below ${h.aud(P.qld.fhog.below)}. At ${h.aud(750000)} exactly the new home misses the grant but still pays no duty.</p>
<h3>South Australia</h3>
<p>Established: full scale, ${h.duty('sa', 600000, 'first')} at ${h.aud(600000)}. New: no duty at any price and a grant of up to ${h.aud(P.sa.fhog.amount)} with no value cap.</p>
<h3>Northern Territory</h3>
<p>Duty is the same on both, ${h.duty('nt', 600000, 'first')} at ${h.aud(600000)}, unless a new house and land are bought as one package from a building contractor, in which case the House and Land Package Exemption removes it. The ${h.aud(P.nt.fhog.amount)} HomeGrown grant is paid on the new home, off the plan or owner-built included; the ${h.aud(10000)} grant on established homes ended on ${h.date('2025-09-30')}.</p>
<h3>NSW, Victoria and Western Australia</h3>
<p>The duty concessions do not distinguish new from established. The grant of ${h.aud(P.nsw.fhog.amount)} does, and each state caps it differently: ${h.aud(P.nsw.fhog.new_home_cap)} in NSW, ${h.aud(P.vic.fhog.cap)} in Victoria, ${h.aud(P.wa.fhog.cap_south)} south of the 26th parallel in Western Australia. Victoria's off-the-plan rules can also lower the dutiable value of a new apartment bought before completion; the ${h.a('off-the-plan-stamp-duty', 'off-the-plan guide')} explains how.</p>
<h3>Tasmania</h3>
<p>No duty concession either way in 2026-27: ${h.duty('tas', 600000, 'first')} at ${h.aud(600000)}. The ${h.aud(P.tas.fhog.amount)} grant for a new home, finished within 24 months, is the only difference.</p>
<h3>ACT</h3>
<p>No duty on either for an eligible buyer under the Home Buyer Concession Scheme, and no grant since ${h.date(P.act.fhog.ceased)}. For buyers outside the scheme, owner-occupiers of new off-the-plan or newly unit-titled units pay no duty either.</p>
<!--mini:propertyTypeState-->

<h2>Buyers who are not first home buyers</h2>
<p>For a second-time buyer the choice rarely changes the duty. The exceptions are the Territory's ${h.aud(P.nt.freshstart.amount)} FreshStart grant on a new home and the ACT's exemptions for new units bought to live in.</p>
${h.table(['State', 'Established $700,000', 'New $700,000, after any grant'], STATES.map((s) => { const e = h.calc(s, 700000, 'owner'), n = h.calc(s, 700000, 'owner', 'new', false, s === 'act' ? { actUnit: true } : {}); return [STATE_INFO[s].short, h.aud(e.total), h.aud(n.total - n.grant.amount)]; }), 'Owner-occupier who is not a first home buyer; ACT figure for a newly unit-titled home bought from the developer', ['l', 'r', 'r'])}
<p>The ${h.a('first-home-owner-grant', 'grant guide')} lists every scheme's conditions, and the ${h.a('house-and-land-package-stamp-duty', 'house and land guide')} covers buying the block and the build separately.</p>
`;
  },
  related: ['first-home-owner-grant', 'first-home-buyer-stamp-duty', 'house-and-land-package-stamp-duty', 'qld-first-home-buyers', 'sa-first-home-buyers', 'nt-homegrown-grant'],
  sources: ['qld_first_home_new', 'qld_fhog', 'sa_fhb_relief', 'sa_fhog', 'nt_homegrown', 'nt_hlpe', 'nsw_fhog', 'vic_fhog', 'wa_fhog', 'tas_fhog', 'act_hbcs', 'act_unit_titled'],
});
