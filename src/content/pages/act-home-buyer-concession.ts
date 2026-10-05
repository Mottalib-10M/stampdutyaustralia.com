import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'act-home-buyer-concession',
  path: '/act/home-buyer-concession-scheme/',
  group: 'act',
  kind: 'guide',
  order: 20,
  mini: 'investorState',
  nav: 'ACT Home Buyer Concession Scheme',
  card: 'Since 1 July 2026: zero conveyance duty for eligible buyers, with no income test and no property value limit.',
  title: 'Home Buyer Concession Scheme ACT 2026-27: No Income Test',
  description: 'ACT Home Buyer Concession Scheme from 1 July 2026: zero conveyance duty at any price and any income, if you held no property in the 5 years before the contract.',
  h1: 'ACT Home Buyer Concession Scheme',
  intro: 'Canberra dropped both the income test and the value limit on 1 July 2026, so an eligible buyer now pays no conveyance duty at all.',
  resume: (h) => {
    const a = h.P.states.act, s = a.hbcs;
    return `From ${h.date(s.from)} the ACT Home Buyer Concession Scheme charges no conveyance duty to an eligible buyer, with no household income test and no limit on the property's value. The old ceiling of ${h.aud(s.previous_cap)} has gone, so a ${h.aud(1400000)} house in the inner north is as exempt as a ${h.aud(500000)} flat in Belconnen. The scheme is wider than a first home concession: what it asks is that no buyer has held an interest in any property, anywhere, during the ${s.no_property_years} years before the contract. A former owner who sold six years ago can qualify. Buyers must be individuals aged 18 or over and must live in the home for one year, starting within a year of settlement. New homes, established homes and residential land are all covered. The saving equals the owner-occupier duty the buyer would otherwise pay: ${h.duty('act', 750000, 'owner')} at ${h.aud(750000)}, ${h.duty('act', 1000000, 'owner')} at ${h.aud(1000000)}. The ACT stopped paying a First Home Owner Grant in 2019.`;
  },
  faqs: (h) => {
    const a = h.P.states.act, s = a.hbcs;
    return [
      { q: 'Can I use the ACT Home Buyer Concession Scheme if I owned a home before?', a: `Yes, if the ownership ended long enough ago. The test is that no buyer held an interest in any property, in Australia or overseas, in the ${s.no_property_years} years before the contract date. Someone who sold a Sydney apartment seven years ago and has rented since can buy in Canberra without conveyance duty, for example saving ${h.duty('act', 850000, 'owner')} on an ${h.aud(850000)} townhouse.` },
      { q: 'Is there still an income limit on the ACT Home Buyer Concession Scheme?', a: `No. From ${h.date(s.from)} the ACT Revenue Office removed the household income test along with the property value limit. A high-earning couple buying for ${h.aud(1100000)} pays no conveyance duty if the other conditions are met, where before that date the purchase would have been above the ${h.aud(s.previous_cap)} value limit and would have carried ${h.duty('act', 1100000, 'owner')}.` },
      { q: 'How long do I have to live in a home bought under the ACT concession scheme?', a: `One continuous year, with the occupation starting within one year of settlement. It sits alongside the five-year test as a condition of the exemption, not an optional extra. If you are buying residential land to build on, plan the build with that window in mind, because the residence has to begin within the year.` },
      { q: 'Does the ACT Home Buyer Concession Scheme cover vacant land?', a: `Yes. Residential land is eligible alongside new and established homes. On a ${h.aud(450000)} block in a new Whitlam or Taylor release, an eligible buyer pays no conveyance duty instead of ${h.duty('act', 450000, 'owner', 'vacant')} at owner-occupier rates. The scheme's residence condition still applies, so the home has to be built and lived in within the timeframe.` },
      { q: 'Can I buy under the ACT Home Buyer Concession Scheme with a co-buyer who owns a rental?', a: `Not with that co-buyer on the contract. The ${s.no_property_years}-year test applies to the buyers, and an interest in a rental property held now, or at any time in the ${s.no_property_years} years before the contract, fails it. Buying in your own name alone is a different purchase, with its own finance consequences, and the ACT Revenue Office assesses each case on the people named. Ineligible joint buyers of a ${h.aud(800000)} home pay ${h.duty('act', 800000, 'owner')} at owner-occupier rates.` },
      { q: 'Is there a First Home Owner Grant in the ACT in 2026?', a: `No. The ACT's First Home Owner Grant ceased on ${h.date(a.fhog.ceased)}. Support for buyers in Canberra now comes through conveyance duty instead, chiefly this scheme. On a ${h.aud(650000)} purchase the exemption is worth ${h.duty('act', 650000, 'owner')}, which is more than most state grants would pay on a home at that price.` },
    ];
  },
  body: (h) => {
    const a = h.P.states.act, s = a.hbcs;
    const prices = [450000, 600000, 750000, 900000, s.previous_cap, 1200000, 1600000];
    return `
<h2>Five years without property, not "never owned"</h2>
<p>Most first home schemes ask whether you have ever owned a home. The ACT asks a narrower question: did any buyer hold an interest in property, of any kind and in any place, during the ${s.no_property_years} years before the contract? That window is what makes the scheme unusual. A divorced parent who transferred their share of the family home a decade ago, a returning expatriate whose overseas flat was sold years back, a couple who sold a farm before moving to Canberra and have rented since: each can qualify, provided the ${s.no_property_years}-year gap is clean for every person on the contract.</p>
<p>The flip side is that a small holding still counts. An interest in an investment unit interstate, a share of a holiday house, or land held overseas inside the window will rule a buyer out, because the rule covers property anywhere.</p>

<h2>What changed on ${h.date(s.from)}</h2>
<p>Until 30 June 2026 the scheme had two filters that blocked many buyers: a household income test and a property value limit of ${h.aud(s.previous_cap)}. Both were removed for contracts from ${h.date(s.from)}. For an eligible buyer the result is now nothing at all, whatever the price.</p>
${h.table(['Price', 'Owner-occupier duty without the scheme', 'With the scheme', 'Non-owner-occupier duty'], prices.map((p) => [h.aud(p), h.duty('act', p, 'owner'), h.duty('act', p, 'first'), h.duty('act', p, 'investor')]), 'ACT conveyance duty, contracts from 1 July 2026', ['l', 'r', 'r', 'r'])}
<p>The ${h.aud(s.previous_cap)} row is the old boundary. A buyer just above it used to pay full owner-occupier duty; now that buyer pays nothing, and so does the buyer at ${h.aud(1600000)}, where duty would otherwise be ${h.duty('act', 1600000, 'owner')}. Above ${h.aud(a.owner_brackets[a.owner_brackets.length - 1].from)} the owner-occupier table switches to a flat ${h.pct(a.owner_brackets[a.owner_brackets.length - 1].rate, 2)} of the whole value, which is why the saving keeps climbing.</p>

<h2>The conditions, in the ACT Revenue Office's terms</h2>
<p>The list is short. Buyers must be individuals, not a company or a trust, and each must be at least 18. None may have held an interest in property in the ${s.no_property_years} years before the contract. The property must be a home, new or established, or residential land. And the buyers must live in it for one year, beginning within one year of settlement. Nothing in the 2026-27 version looks at income, at the price, or at whether the dwelling is new.</p>
<p>The residence year is the condition with the longest tail. On land it means the home has to be finished and occupied inside that first year after settlement, which is a tight schedule for a custom build.</p>

<h2>How much it is worth against an investor purchase</h2>
<p>The ACT runs two conveyance duty tables: owner-occupier rates and higher rates for everyone else. The calculator above sets them side by side for any price. For an eligible buyer under the scheme, the relevant comparison is with the owner-occupier column, since that is what a home buyer outside the scheme pays. At ${h.aud(700000)} the gap between the scheme and an investor buying the same house is ${h.duty('act', 700000, 'investor')}; between the scheme and an ineligible owner-occupier, ${h.duty('act', 700000, 'owner')}.</p>

<h2>Canberra against the states for a first purchase</h2>
<p>Combined with the end of the value limit, the scheme puts the ACT at the bottom of the national table for many first purchases. The calculator below lists, for the price you enter, which jurisdictions charge an eligible first home buyer nothing. At ${h.aud(1000000)} on an established home, the ACT charges ${h.duty('act', 1000000, 'first')}, New South Wales ${h.duty('nsw', 1000000, 'first')} and Victoria ${h.duty('vic', 1000000, 'first')}.</p>
<!--mini:changes2026-->
<p>Two cautions. The ACT has no First Home Owner Grant since ${h.date(a.fhog.ceased)}, so a new home buyer in Queensland or the Northern Territory may come out ahead once the grant is counted. And the ACT Revenue Office's calculator does not ask whether a buyer is foreign, so no surcharge is shown here; that is a description of the official tool, not advice that none can ever apply.</p>

<h2>A buyer who missed out before July 2026</h2>
<p>Consider a couple who looked at a ${h.aud(1150000)} house in Ainslie in early 2026. Their combined income was above the old threshold and the price above ${h.aud(s.previous_cap)}, so the scheme was closed to them on two counts. Signing the same contract after ${h.date(s.from)}, with neither of them holding property in the previous ${s.no_property_years} years, they pay no conveyance duty instead of ${h.duty('act', 1150000, 'owner')}.</p>

<h2>Other ACT exemptions</h2>
<p>Buyers who do not meet the ${s.no_property_years}-year test may still have an exemption open to them: the ${h.a('act-off-the-plan', 'off-the-plan and newly unit-titled exemptions')} for apartments and townhouses, or the ${h.a('act-pensioner', 'Pensioner Duty Concession Scheme')}. Each has its own conditions, set out on its page.</p>
`;
  },
  related: ['act', 'act-off-the-plan', 'act-pensioner', 'first-home-buyer-stamp-duty', 'investor-stamp-duty', 'stamp-duty-changes-2026'],
  sources: ['act_hbcs', 'act_rates', 'act_fhog'],
});
