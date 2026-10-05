import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'guides',
  path: '/guides/',
  group: 'guides',
  kind: 'index',
  order: 1,
  mini: 'cheapestState',
  nav: 'All guides',
  card: 'Eleven cross-state guides, each built around one buyer situation and computed with the same engine as the calculators.',
  title: 'Stamp Duty Guides 2026: First Home, Grants, Investors',
  description: 'Stamp duty guides 2026-27 for all 8 states: first home buyers, grants up to $50,000, foreign surcharges to 9%, off the plan, land, investors and downsizers.',
  h1: 'Stamp duty guides',
  intro: 'Each guide takes one situation, a first home, an investment, a block of land, a downsize, and runs it through the eight state and territory rules side by side.',
  resume: (h) => `These guides compare how the eight Australian states and territories treat one kind of purchase at a time, using the 2026-27 rules read on each revenue office's site on ${h.date(h.P.retrieved_at)}. The state pages explain one jurisdiction in depth; the guides answer the question a buyer actually starts with, such as whether a new home or an older one costs less after the grant, or how much more a foreign investor pays. Every figure is produced by the same engine as the calculators, so a table in a guide and a result in a calculator always agree. Some examples of what the guides contain: a first home buyer pays no duty up to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} in NSW but faces the full scale in Tasmania; grants run from nothing in the ACT to ${h.aud(h.P.states.nt.fhog.amount)} in the Territory; foreign buyer surcharges reach ${h.pct(h.P.states.nsw.surcharge, 0)}. Start with the guide that matches your situation, then open the state page for the detail.`,
  faqs: (h) => [
    { q: 'Which stamp duty guide should I read first if I am buying my first home?', a: `Start with the first home buyer guide, which shows where each state's concession stops and what residence rule comes with it. Then read the grant guide if the home is new, because grants of up to ${h.aud(h.P.states.nt.fhog.amount)} are only paid on new homes, and the new versus established guide to net the two against each other at your price.` },
    { q: 'Are the stamp duty guides on this site for the 2026-27 financial year?', a: `Yes. Every rate, threshold and grant was read on the revenue office's own page on ${h.date(h.P.retrieved_at)} and applies to contracts from ${h.date(h.P.valid_from)} to ${h.date(h.P.valid_to)}, except where a guide gives another date for a change. The 2026 changes guide lists every rule that moved during the year with its date.` },
    { q: 'Do these guides cover commercial property, farms or purchases through a company?', a: 'No. The guides and calculators cover residential property bought by individuals, with one buyer profile for the whole purchase. Commercial land, primary production land, companies and trusts follow other rules and sometimes other rates, as Tasmania\'s separate surcharge on primary production land shows. For those purchases the revenue office\'s own assessment is the figure to rely on.' },
    { q: 'Why might a guide show a slightly different duty figure from my conveyancer\'s statement?', a: 'Three usual reasons. The dutiable value may differ from the price, for instance after a valuation or an off-the-plan deduction. Most offices round each band to the next $100, which moves the result by a few dollars. And a concession your conveyancer applies may depend on facts the guide cannot know, such as the exact contract date or your property history.' },
    { q: 'Where can I check the official source for a figure in a guide?', a: 'Each guide ends with its list of sources: the pages of Revenue NSW, the State Revenue Office Victoria, the Queensland Revenue Office, RevenueWA, RevenueSA, the State Revenue Office of Tasmania, the ACT Revenue Office and the Northern Territory Government that were read. Where an office blocks automated readers, the archived copy of the same official page is cited.' },
    { q: 'Is there a guide comparing the eight states for a property investor?', a: `Yes, the investor guide. It sorts the states into three groups: those with one scale for everyone, those where only cheaper homes get an owner-occupier rate, and the ACT and Queensland, where an investor pays more across most prices. At ${h.aud(800000)} a resident investor pays ${h.duty('act', 800000, 'investor')} in the ACT and ${h.duty('vic', 800000, 'investor')} in Victoria.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const g = (id: string, text: string) => h.a(id, text);
    return `
<h2>Find the guide for your situation</h2>
<p>The guides are grouped by the buyer, not by the state. Each one compares all eight jurisdictions and links to the state pages for the finer rules.</p>
${h.table(['If you are', 'Read', 'One figure from it'], [
  ['buying your first home', g('first-home-buyer-stamp-duty', 'First home buyer stamp duty'), `no duty to ${h.aud(P.vic.fhb.exempt_to)} in Victoria, ${h.aud(P.nsw.fhbas.home_exempt_to)} in NSW`],
  ['buying a brand new first home', g('first-home-owner-grant', 'First Home Owner Grant'), `${h.aud(P.qld.fhog.amount)} in Queensland under ${h.aud(P.qld.fhog.below)}`],
  ['choosing between new and older', g('new-vs-established', 'New vs established home'), `duty minus grant at ${h.aud(740000)} in Queensland: ${h.aud(h.calc('qld', 740000, 'first', 'new').total - h.calc('qld', 740000, 'first', 'new').grant.amount)} new`],
  ['buying a block to build on', g('vacant-land-stamp-duty', 'Stamp duty on vacant land'), `NSW land exemption to ${h.aud(P.nsw.fhbas.land_exempt_to)}`],
  ['buying a builder\'s package', g('house-and-land-package-stamp-duty', 'House and land packages'), `NSW grant if land plus build is up to ${h.aud(P.nsw.fhog.build_cap)}`],
  ['buying before it is built', g('off-the-plan-stamp-duty', 'Off-the-plan stamp duty'), `WA concession capped at ${h.aud(P.wa.otp.cap)}`],
  ['buying to rent out', g('investor-stamp-duty', 'Investor stamp duty'), `ACT investor at ${h.aud(600000)}: ${h.duty('act', 600000, 'investor')}`],
  ['not an Australian citizen or resident', g('foreign-buyer-stamp-duty', 'Foreign buyer surcharges'), `surcharge of ${h.pct(P.nsw.surcharge, 0)} in NSW`],
  ['a pensioner or downsizing', g('pensioner-downsizer-stamp-duty', 'Pensioners and downsizers'), `SA seniors relief up to ${h.aud(P.sa.seniors_max_relief)}`],
  ['buying in a family or below-market sale', g('dutiable-value', 'Dutiable value'), 'duty on the higher of price and market value in NSW'],
  ['comparing an old quote with a new one', g('stamp-duty-changes-2026', '2026 stamp duty changes'), `Tasmanian grant cut to ${h.aud(P.tas.fhog.amount)}`],
], 'Eleven guides, one per buyer situation', ['l', 'l', 'l'])}

<h2>First home buyers</h2>
<p>Three guides belong together. The ${g('first-home-buyer-stamp-duty', 'first home buyer guide')} shows the duty at five prices in each state, explains how each concession fades, and compares the residence rules that can claw the concession back. The ${g('first-home-owner-grant', 'grant guide')} lists the eight grant schemes with their caps and occupation periods. The ${g('new-vs-established', 'new versus established guide')} combines the two into one net figure per home. For a first home buyer at ${h.aud(650000)} on an established home, the duty is nil in ${STATES.filter((s) => h.calc(s, 650000, 'first').total === 0).map((s) => STATE_INFO[s].short).join(', ')} and reaches ${h.duty('nt', 650000, 'first')} in the Territory.</p>

<h2>Land, packages and off the plan</h2>
<p>A purchase that is not a finished home brings in a different set of thresholds. The ${g('vacant-land-stamp-duty', 'vacant land guide')} covers the lower land ceilings in NSW and Western Australia and the full concessions in Queensland and South Australia. The ${g('house-and-land-package-stamp-duty', 'house and land package guide')} explains why one contract and two contracts are measured differently, and covers the Territory's package exemption. The ${g('off-the-plan-stamp-duty', 'off-the-plan guide')} sets the five mechanisms side by side: Victoria's deduction, Western Australia's stage-based concession, the NSW deferral, the ACT unit exemption and Tasmania's closed scheme.</p>

<h2>Investors, foreign buyers and downsizers</h2>
<p>The ${g('investor-stamp-duty', 'investor guide')} shows where living in the property is worth something and where it makes no difference. The ${g('foreign-buyer-stamp-duty', 'foreign buyer guide')} covers the six surcharges, the share rule for mixed purchases and the concessions a foreign buyer loses. The ${g('pensioner-downsizer-stamp-duty', 'pensioner and downsizer guide')} covers the three live schemes, in Victoria, the ACT and South Australia.</p>

<h2>The rules behind every guide</h2>
<p>Two guides explain mechanics that apply everywhere. The ${g('dutiable-value', 'dutiable value guide')} covers the base the scale is applied to: market value, construction still to come, land only, and rounding. The ${g('stamp-duty-changes-2026', '2026 changes guide')} dates every rule that moved this year, so you can tell whether a figure you were quoted before ${h.date(P.wa.fhor.from)} or ${h.date(P.act.hbcs.from)} still holds.</p>

<h2>The eight scales at a glance</h2>
<p>Every guide starts from the same general scales. For reference, this is what a buyer with no concession pays at three prices.</p>
${h.table(['State', 'Revenue office', '$500,000', '$800,000', '$1,200,000'], STATES.map((s) => [h.a(s, STATE_INFO[s].short), STATE_INFO[s].office, h.duty(s, 500000, 'investor'), h.duty(s, 800000, 'investor'), h.duty(s, 1200000, 'investor')]), 'General scale, 2026-27, no concession', ['l', 'l', 'r', 'r', 'r'])}
<p>The state pages, from ${h.a('nsw', 'NSW')} to the ${h.a('nt', 'Northern Territory')}, carry the full calculator for each jurisdiction. The ${h.a('prices', 'price pages')} show the duty at common prices in every state.</p>
`;
  },
  related: ['first-home-buyer-stamp-duty', 'first-home-owner-grant', 'investor-stamp-duty', 'stamp-duty-changes-2026', 'prices', 'home'],
  sources: ['nsw_rates', 'vic_general', 'qld_rates', 'wa_rates', 'sa_rates', 'tas_rates', 'act_rates', 'nt_calc'],
});
