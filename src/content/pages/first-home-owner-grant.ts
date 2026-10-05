import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'first-home-owner-grant',
  path: '/guides/first-home-owner-grant/',
  group: 'guides',
  kind: 'guide',
  order: 20,
  mini: 'grantState',
  nav: 'First Home Owner Grant',
  card: 'Eight grant schemes side by side: amount, price cap, the new-home rule and how long you must live there.',
  title: 'First Home Owner Grant 2026: Every State, $10,000 to $50,000',
  description: 'First Home Owner Grant 2026-27 by state: $50,000 in the NT, $30,000 in QLD, $20,000 in TAS, $15,000 in SA, $10,000 elsewhere, none in the ACT since 2019.',
  h1: 'First Home Owner Grant in every state and territory',
  intro: 'A one-off payment for building or buying a brand new first home, paid by the state, with an amount and a price ceiling that change at each border.',
  resume: (h) => `The First Home Owner Grant in 2026-27 ranges from ${h.aud(h.P.states.nt.fhog.amount)} in the Northern Territory to nothing in the ACT, and in every jurisdiction that still pays it the home must be new. The Territory's HomeGrown Territory Grant pays ${h.aud(h.P.states.nt.fhog.amount)} with no price cap for contracts up to ${h.date(h.P.states.nt.fhog.until)}. Queensland pays ${h.aud(h.P.states.qld.fhog.amount)} on a new home under ${h.aud(h.P.states.qld.fhog.below)}, Tasmania ${h.aud(h.P.states.tas.fhog.amount)} for transactions from ${h.date(h.P.states.tas.fhog.from)} (down from ${h.aud(h.P.states.tas.fhog.previous_amount)}), and South Australia up to ${h.aud(h.P.states.sa.fhog.amount)} with no cap. NSW, Victoria and Western Australia pay ${h.aud(h.P.states.nsw.fhog.amount)}, each with its own ceiling: ${h.aud(h.P.states.nsw.fhog.new_home_cap)} in NSW, ${h.aud(h.P.states.vic.fhog.cap)} in Victoria and ${h.aud(h.P.states.wa.fhog.cap_south)} in Perth and the south of WA. The ACT stopped paying the grant on ${h.date(h.P.states.act.fhog.ceased)}. A grant is not a duty discount: it is paid to you, and you must then live in the home for six or twelve months depending on the state.`,
  faqs: (h) => [
    { q: 'Can I get the First Home Owner Grant on an established house in 2026?', a: `Not in any state. Every 2026-27 scheme requires a new home, or one being built. The Northern Territory paid ${h.aud(10000)} on established homes until ${h.date('2025-09-30')}, and that ended. A first home buyer of an established home can still get a duty concession in NSW, Victoria, Queensland, Western Australia and the ACT, but no grant.` },
    { q: 'Is the Queensland $30,000 grant affected by my income?', a: `No. The Queensland Revenue Office states that income has no effect on eligibility for the ${h.aud(h.P.states.qld.fhog.amount)} grant, which applies to contracts from ${h.date('2023-11-20')}. The conditions are a new home valued under ${h.aud(h.P.states.qld.fhog.below)}, buyers who are citizens or permanent residents, and living in the home for six continuous months within the first year.` },
    { q: 'What is the WA First Home Owner Grant cap north of the 26th parallel?', a: `For transactions from ${h.date(h.P.states.wa.fhor.from)}, RevenueWA caps the ${h.aud(h.P.states.wa.fhog.amount)} grant at ${h.aud(h.P.states.wa.fhog.cap_north)} for a new home north of the 26th parallel and ${h.aud(h.P.states.wa.fhog.cap_south)} south of it, Perth included. Before that date the cap was ${h.aud(750000)}. Above the relevant cap no grant is paid at all; it does not taper.` },
    { q: 'Can I claim the NT FreshStart grant if I have owned a home before?', a: `Yes, that is its purpose. The FreshStart New Home Grant pays ${h.aud(h.P.states.nt.freshstart.amount)} to buyers who are not first home owners, for a new home, on contracts from ${h.date('2024-10-01')} to ${h.date(h.P.states.nt.freshstart.until)}. The application must be made by ${h.date('2027-12-31')}, and you must live in the home for twelve months. First home buyers get the ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant instead.` },
    { q: 'Does South Australia pay the grant if I only buy a block of land?', a: `Not for the land alone. RevenueSA pays up to ${h.aud(h.P.states.sa.fhog.amount)} for a new home, with no value cap since ${h.date('2024-06-06')}, and a block becomes eligible only together with a contract to build. The first home buyer duty relief is different: it does cover vacant land, so the block itself can be duty free.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [550000, 700000, 790000, 900000, 1200000];
    return `
<h2>The eight schemes on one table</h2>
<p>Grant rules are short, but the short version hides the part that decides whether you get paid: the price ceiling and the occupation period. This table lists what each office states for contracts or transactions in 2026-27.</p>
${h.table(['State', 'Grant', 'Value cap', 'Live in it', 'Notes from the office'], [
  ['NSW', h.aud(P.nsw.fhog.amount), `${h.aud(P.nsw.fhog.new_home_cap)}; land plus build ${h.aud(P.nsw.fhog.build_cap)}`, '12 continuous months, starting within 12 months', 'apply within 12 months of settlement'],
  ['VIC', h.aud(P.vic.fhog.amount), h.aud(P.vic.fhog.cap), 'see the office page', 'amount unchanged since 1 July 2013'],
  ['QLD', h.aud(P.qld.fhog.amount), `under ${h.aud(P.qld.fhog.below)}`, '6 continuous months in the first year', 'contracts from 20 November 2023; income not tested'],
  ['WA', h.aud(P.wa.fhog.amount), `${h.aud(P.wa.fhog.cap_south)} south, ${h.aud(P.wa.fhog.cap_north)} north of the 26th parallel`, 'see the office page', `caps from ${h.date(P.wa.fhor.from)}`],
  ['SA', `up to ${h.aud(P.sa.fhog.amount)}`, 'none since 6 June 2024', 'see the office page', 'not for land alone'],
  ['TAS', h.aud(P.tas.fhog.amount), 'none stated', '6 months within the first 12', `${h.date(P.tas.fhog.from)} to ${h.date(P.tas.fhog.until)}; build finished within 24 months`],
  ['ACT', 'none', 'not applicable', 'not applicable', `ceased ${h.date(P.act.fhog.ceased)}`],
  ['NT', h.aud(P.nt.fhog.amount), 'none', '12 months', `HomeGrown Territory Grant, contracts to ${h.date(P.nt.fhog.until)}`],
], 'First Home Owner Grant, 2026-27', ['l', 'r', 'l', 'l', 'l'])}

<h2>What the cap does at different prices</h2>
<p>A grant cap is a cliff, not a slope. One dollar over the ceiling and the full amount is gone. The table below asks the engine for the grant on a new home at five prices, for a first home buyer in each jurisdiction (Western Australia south of the 26th parallel).</p>
${h.table(['State', ...prices.map((p) => h.aud(p))], STATES.map((s) => [STATE_INFO[s].short, ...prices.map((p) => { const g = h.calc(s, p, 'first', 'new').grant.amount; return g ? h.aud(g) : 'none'; })]), 'Grant on a new home, first home buyer', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>NSW is the tightest: a new apartment or house above ${h.aud(P.nsw.fhog.new_home_cap)} does not qualify, though a land and building contract together may reach ${h.aud(P.nsw.fhog.build_cap)}. Queensland's limit is "less than" ${h.aud(P.qld.fhog.below)}, so a home at exactly that figure misses out. South Australia, Tasmania and the Northern Territory set no ceiling, which makes their grants the only ones that a buyer of an expensive new home can count on.</p>

<h2>The new-home condition</h2>
<p>Every surviving scheme pays only on a home that has not been lived in before, whether bought finished, bought off the plan, or built on land you own. The Northern Territory's HomeGrown grant explicitly includes off-the-plan purchases and owner-builders, and excludes land on its own. South Australia also excludes land alone; a block becomes eligible with a building contract. In Tasmania construction has to be completed within 24 months. These conditions are why the grant pairs naturally with the duty concessions for new homes in Queensland and South Australia, covered in the ${h.a('new-vs-established', 'new versus established guide')}.</p>

<h2>Duty and grant together</h2>
<p>The grant is paid to you; duty is paid by you. Netting one against the other is the fairest way to compare states for a first home buyer choosing a new home. At ${h.aud(650000)}:</p>
${h.table(['State', 'Duty', 'Grant', 'Duty minus grant'], STATES.map((s) => { const r = h.calc(s, 650000, 'first', 'new'); return [STATE_INFO[s].short, h.aud(r.total), r.grant.amount ? h.aud(r.grant.amount) : 'none', h.aud(r.total - r.grant.amount)]; }), 'First home buyer, new home at $650,000; a negative figure means the grant exceeds the duty', ['l', 'r', 'r', 'r'])}
<p>The Territory's figure is striking because its HomeGrown grant is larger than the duty at that price, even though the Territory has no first home duty concession on a home bought outside a builder's package. In Queensland and South Australia the grant arrives on top of a zero duty bill.</p>

<h2>Applying on time</h2>
<p>Missing a deadline costs the whole grant, and the deadlines are not the same everywhere. Revenue NSW wants the application within twelve months of settlement, and the home must be occupied for twelve continuous months starting within the first year. Queensland and Tasmania ask for six months of occupation within the first year, the Territory for twelve. Where the office page we read gives no occupation period, the table says so rather than guessing. A NSW buyer of a ${h.aud(580000)} new apartment who meets every rule ends up with no transfer duty under the first home scheme (${h.duty('nsw', 580000, 'first', 'new')}) and a grant of ${h.aud(h.calc('nsw', 580000, 'first', 'new').grant.amount)}, which is the best combination NSW offers.</p>

<h2>Tasmania and the Territory: grants with an end date</h2>
<p>Two schemes are explicitly temporary. Tasmania's ${h.aud(P.tas.fhog.amount)} covers transactions from ${h.date(P.tas.fhog.from)} to ${h.date(P.tas.fhog.until)}, after a year at ${h.aud(P.tas.fhog.previous_amount)}. In the Northern Territory both the HomeGrown and FreshStart grants apply to contracts from ${h.date('2024-10-01')} to ${h.date(P.nt.fhog.until)}; HomeGrown applications close on ${h.date('2028-09-30')} and FreshStart applications on ${h.date('2027-12-31')}. The ${h.a('nt-homegrown-grant', 'NT HomeGrown page')} goes into the Territory's schemes.</p>
<!--mini:ntGrants-->

<h2>The ACT: concession instead of grant</h2>
<p>The ACT Revenue Office closed its grant on ${h.date(P.act.fhog.ceased)} and puts its help into duty instead. Since ${h.date(P.act.hbcs.from)} the Home Buyer Concession Scheme removes conveyance duty entirely for an eligible buyer at any price, new or established. On a ${h.aud(900000)} home that is worth ${h.duty('act', 900000, 'owner')}, more than any grant in the country at that price.</p>
`;
  },
  related: ['first-home-buyer-stamp-duty', 'new-vs-established', 'house-and-land-package-stamp-duty', 'nt-homegrown-grant', 'qld-first-home-buyers', 'home'],
  sources: ['nsw_fhog', 'vic_fhog', 'qld_fhog', 'wa_fhog', 'sa_fhog', 'tas_fhog', 'act_fhog', 'nt_homegrown', 'nt_assistance'],
});
