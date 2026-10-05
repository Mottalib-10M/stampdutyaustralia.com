import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'vic',
  path: '/vic/',
  group: 'vic',
  kind: 'hub',
  order: 10,
  tool: 'vic',
  nav: 'VIC calculator',
  card: 'Land transfer duty in Victoria: general scale, PPR rate, first home exemption and the 8 % FPAD.',
  title: 'Stamp Duty VIC 2026-27: Land Transfer Duty Calculator',
  description: 'Stamp duty VIC calculator for 2026-27: 5.5% of the whole value above $960,000, first home exemption to $600,000, PPR rate to $550,000 and the 8% FPAD.',
  h1: 'Stamp duty calculator Victoria',
  intro: 'Land transfer duty on a Victorian purchase, with the principal place of residence rate, the first home buyer exemption, off-the-plan deductions and the foreign purchaser additional duty.',
  resume: (h) => `Victoria stops charging land transfer duty band by band once the dutiable value passes ${h.aud(h.P.states.vic.brackets[3].from)}: from there the State Revenue Office applies ${h.pct(h.P.states.vic.brackets[3].rate)} to the entire value, so a ${h.aud(1000000)} house carries ${h.duty('vic', 1000000, 'investor')} whoever buys it, before any foreign surcharge. Below that line the scale is marginal and the buyer's situation matters a great deal. Anyone who will live in the home, first purchase or not, gets the principal place of residence (PPR) rate up to ${h.aud(h.P.states.vic.ppr_to)}; the SRO's own example puts ${h.aud(400000)} at ${h.duty('vic', 400000, 'owner')} instead of ${h.duty('vic', 400000, 'investor')}. First home buyers pay nothing up to ${h.aud(h.P.states.vic.fhb.exempt_to)} and a reduced amount up to ${h.aud(h.P.states.vic.fhb.cap)}. Off the plan, duty is charged on the price less the construction still to come. Above ${h.aud(h.P.states.vic.brackets[4].from)} the marginal rate climbs to ${h.pct(h.P.states.vic.brackets[4].rate)}, and a foreign purchaser adds ${h.pct(h.P.states.vic.surcharge, 0)} of the price as foreign purchaser additional duty.`,
  faqs: (h) => [
    { q: 'Why does a Victorian home over $960,000 pay 5.5 % on the whole price?', a: `Because the Victorian scale switches method at ${h.aud(h.P.states.vic.brackets[3].from)}. Below that value duty is a base amount plus a rate on the slice above each threshold. Above it the State Revenue Office simply multiplies the full dutiable value by ${h.pct(h.P.states.vic.brackets[3].rate)}, which gives ${h.duty('vic', 1200000, 'investor')} on ${h.aud(1200000)}. Concessions for home buyers have all run out well before that point.` },
    { q: 'Does the Victorian PPR concession apply if I have owned a home before?', a: `Yes. The principal place of residence concession is not a first home benefit. Any buyer who will live in the property qualifies when the dutiable value is ${h.aud(h.P.states.vic.ppr_to)} or less. At that ceiling the SRO's example gives ${h.duty('vic', 550000, 'owner')} instead of ${h.duty('vic', 550000, 'investor')}. One dollar above it, the general scale applies to the whole amount again.` },
    { q: 'How much duty does a first home buyer pay on $700,000 in Victoria?', a: `${h.duty('vic', 700000, 'first')}. Up to ${h.aud(h.P.states.vic.fhb.exempt_to)} there is no duty at all; between that and ${h.aud(h.P.states.vic.fhb.cap)} the general duty is reduced on a sliding scale that reaches zero at the cap. On ${h.aud(700000)} the general duty would be ${h.duty('vic', 700000, 'investor')}, so the concession removes about a third of it.` },
    { q: 'Is Victorian stamp duty charged on the full off-the-plan contract price?', a: `Not always. For a contract signed before building is finished, Victoria charges duty on the price less the construction costs still to be incurred after the contract date. Under the temporary concession for strata apartments and townhouses, open to investors too until ${h.date(h.P.states.vic.otp_temp.until)}, the deduction has no value cap. The foreign purchaser additional duty is still worked out on the price before the deduction.` },
    { q: 'Can a Victorian pensioner and a first home buyer concession be combined?', a: `No. The pensioner and concession card holder reduction mirrors the first home thresholds, an exemption to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and a concession to ${h.aud(h.P.states.vic.pensioner.cap)}, but it can be used once only, and a buyer who qualifies for both must choose one of them. These are the limits for contracts signed from 1 July 2023.` },
    { q: 'What does a foreign buyer pay on a $900,000 Melbourne apartment?', a: `${h.duty('vic', 900000, 'investor', 'established', true)} in total: ${h.duty('vic', 900000, 'investor')} of land transfer duty plus foreign purchaser additional duty at ${h.pct(h.P.states.vic.surcharge, 0)} of the price, which Victoria has charged at that rate since 1 July 2019. A foreign buyer cannot use the first home or PPR concessions, so the general scale applies before the surcharge is added.` },
    { q: 'Does the Victorian First Home Owner Grant apply to an established house?', a: `No. The ${h.aud(h.P.states.vic.fhog.amount)} grant is paid only on a new home valued at ${h.aud(h.P.states.vic.fhog.cap)} or less, a rule in place since 1 July 2013. An established house can still be duty free for a first home buyer under the exemption, but it brings no grant. A new home at ${h.aud(600000)} can therefore attract both the full duty exemption and the grant.` },
  ],
  body: (h) => `
<h2>Victoria's scale, and where it stops being marginal</h2>
<p>The State Revenue Office (SRO) publishes two current-rate tables: the general one, used by investors and by anyone above the concession limits, and a principal place of residence table that only reaches ${h.aud(h.P.states.vic.ppr_to)}. The figures below are the rates the SRO lists as current for contracts signed in 2026-27.</p>
${h.table(['Dutiable value', 'General rate'], h.P.states.vic.brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `over ${h.aud(b.from)}`, b.flat ? `${h.pct(b.rate)} of the whole value` : b.from === 0 ? `${h.pct(b.rate)} of the value` : `${h.aud(b.base)} plus ${h.pct(b.rate)} of the value above ${h.aud(b.from)}`]), 'Victorian land transfer duty, non-principal place of residence', ['l', 'l'])}
<p>Read the fourth row carefully. Between ${h.aud(h.P.states.vic.brackets[3].from)} and ${h.aud(h.P.states.vic.brackets[4].from)} there is no base amount and no threshold to subtract: the percentage hits every dollar. The top row adds ${h.pct(h.P.states.vic.brackets[4].rate)} on each dollar over ${h.aud(h.P.states.vic.brackets[4].from)} to a fixed ${h.aud(h.P.states.vic.brackets[4].base)}.</p>

<h3>The owner-occupier table</h3>
${h.table(['Dutiable value', 'PPR rate'], h.P.states.vic.ppr_brackets.filter((b) => b.from >= h.P.states.vic.ppr_from).map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `${h.aud(b.from)} to ${h.aud(h.P.states.vic.ppr_to)}`, `${h.aud(b.base)} plus ${h.pct(b.rate)} of the value above ${h.aud(b.from)}`]), 'Principal place of residence concession, home you will live in', ['l', 'l'])}
<p>Where the PPR rate of ${h.pct(h.P.states.vic.ppr_brackets[2].rate)} replaces ${h.pct(h.P.states.vic.brackets[2].rate)}, the saving builds up quickly; it reaches ${h.aud(h.calc('vic', 440000, 'owner').saving)} at ${h.aud(440000)} and stays at that figure up to the ceiling. It also covers vacant land on which you will build your home, in which case only the land value is counted. The detailed conditions are on the ${h.a('vic-ppr', 'Victorian PPR concession page')}.</p>

<h2>Victorian duty at typical prices</h2>
<p>Each figure below comes from the engine behind the calculator, which we tested against the SRO's online duty calculator on 5 October 2026. For a ${h.aud(650000)} first home, for instance, both return ${h.duty('vic', 650000, 'first')}.</p>
${h.table(['Price', 'Investor', 'Owner-occupier', 'First home buyer', 'Foreign purchaser'], [400000, 550000, 600000, 700000, 750000, 1000000, 2500000].map((p) => [h.aud(p), h.duty('vic', p, 'investor'), h.duty('vic', p, 'owner'), h.duty('vic', p, 'first'), h.duty('vic', p, 'investor', 'established', true)]), 'Established property, contracts signed in 2026-27', ['l', 'r', 'r', 'r', 'r'])}
<p>The owner-occupier column rejoins the investor column at ${h.aud(600000)}: past ${h.aud(h.P.states.vic.ppr_to)} there is no general relief for people who live in their home. The first home column jumps from nothing at ${h.aud(600000)} to ${h.duty('vic', 750000, 'first')} at ${h.aud(750000)}, which means each extra ${h.aud(10000)} of price inside that window costs a first home buyer well over ${h.aud(2000)} in duty.</p>

<h2>First home buyers in Victoria</h2>
<p>The exemption applies to new homes, established homes and land, as long as at least one buyer is an Australian citizen, a New Zealand citizen or a permanent resident. You need to move in within 12 months and stay for 12 continuous months; on land, the timing runs from the occupancy certificate of the home you build. Members of the defence force on active duty who are on the Victorian electoral roll are exempt from the residence requirement. Eligibility, timing and the land rules are on the ${h.a('vic-first-home-buyers', 'Victorian first home buyer page')}.</p>

<h2>Off the plan: duty on what exists at signing</h2>
<p>Off the plan, a Victorian buyer can lower the dutiable value itself: the SRO deducts the construction cost still to be incurred after the contract date. In its own example, a ${h.aud(1000000)} contract with ${h.aud(400000)} of building to come is assessed on ${h.aud(600000)}. Try your own contract here:</p>
<!--mini:vicOffPlan-->
<p>Until ${h.date(h.P.states.vic.otp_temp.until)}, the temporary concession lets anyone, including investors and companies, deduct the full remaining construction cost on a strata apartment or townhouse with common property, without a value ceiling. Outside it, the deduction is limited to principal place of residence and first home purchases under the thresholds. Worked cases are on the ${h.a('vic-off-the-plan', 'Victorian off-the-plan page')}.</p>

<h2>Pensioners and concession card holders</h2>
<p>For contracts from 1 July 2023, an eligible pensioner pays no duty on a home up to ${h.aud(h.P.states.vic.pensioner.exempt_to)} and a reduced amount up to ${h.aud(h.P.states.vic.pensioner.cap)}. It is a one-off benefit and cannot be stacked with the first home concession. See the ${h.a('vic-pensioner', 'Victorian pensioner duty page')}.</p>

<h2>Foreign purchaser additional duty</h2>
<p>A foreign purchaser pays an extra ${h.pct(h.P.states.vic.surcharge, 0)} of the price on top of the general scale. On a ${h.aud(2500000)} house that is ${h.aud(h.calc('vic', 2500000, 'investor', 'established', true).surcharge)} more, and the off-the-plan deduction does not reduce it because the surcharge is worked out on the price before any concession.</p>

<h2>Victoria against the other states</h2>
<p>For an owner-occupier who is not a first home buyer, Victoria is the dearest of the eight jurisdictions at most prices above ${h.aud(h.P.states.vic.ppr_to)}. At ${h.aud(800000)} the duty here is ${h.duty('vic', 800000)}, against ${h.duty('nsw', 800000)} in NSW and ${h.duty('qld', 800000)} in Queensland. The ${h.a('home', 'eight-state comparison')} ranks every state for your own figures.</p>
`,
  related: ['vic-first-home-buyers', 'vic-ppr', 'vic-off-the-plan', 'vic-pensioner', 'nsw', 'first-home-owner-grant'],
  sources: ['vic_general', 'vic_ppr', 'vic_fhb', 'vic_otp', 'vic_otp_temp', 'vic_pensioner', 'vic_fpad', 'vic_fhog', 'vic_calc'],
});
