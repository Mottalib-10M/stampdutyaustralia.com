import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'investor-stamp-duty',
  path: '/guides/investor-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 60,
  mini: 'investorState',
  nav: 'Investor stamp duty',
  card: 'Rental property duty in every state, the owner-occupier discount an investor misses, and the two concessions investors can use.',
  title: 'Investor Stamp Duty 2026: Rental Property Duty by State',
  description: 'Investor stamp duty 2026-27: the ACT and QLD charge investors more than owner-occupiers, NSW, SA, TAS and NT charge the same, VIC and WA differ on cheap homes.',
  h1: 'Stamp duty for property investors',
  intro: 'A buyer who will rent the property out pays the full scale everywhere, and in some states a visibly higher one than the neighbour who moves in.',
  resume: (h) => `An investor buying a rental property in 2026-27 pays the general stamp duty scale in every state, and in the ACT and Queensland that scale is noticeably dearer than the one an owner-occupier gets. On an ${h.aud(800000)} established home the ACT charges an investor ${h.duty('act', 800000, 'investor')} under its non-owner-occupier rates against ${h.duty('act', 800000, 'owner')} for someone moving in, and Queensland charges ${h.duty('qld', 800000, 'investor')} against ${h.duty('qld', 800000, 'owner')} under its home concession rate. Victoria gives owner-occupiers a lower rate only up to ${h.aud(h.P.states.vic.ppr_to)}, and Western Australia only up to ${h.aud(h.P.states.wa.concessional_cap)}. NSW, South Australia, Tasmania and the Northern Territory make no distinction at all: the investor and the home buyer who is not a first home buyer pay the same. Two concessions are open to investors, both for new apartments: Victoria's temporary off-the-plan strata concession and Western Australia's off-the-plan concession. A foreign investor adds a surcharge of up to ${h.pct(h.P.states.nsw.surcharge, 0)} on top.`,
  faqs: (h) => [
    { q: 'How much more stamp duty does an investor pay in the ACT than an owner-occupier?', a: `It depends on the price, because the ACT has two full rate tables. At ${h.aud(600000)} an investor pays ${h.duty('act', 600000, 'investor')} and an owner-occupier ${h.duty('act', 600000, 'owner')}. The gap narrows as price rises and disappears above ${h.aud(h.P.states.act.investor_brackets[6].from)}, where both tables charge ${h.pct(h.P.states.act.investor_brackets[6].rate, 2)} of the whole value.` },
    { q: 'What is the official Queensland transfer duty on an $850,000 investment property?', a: `The Queensland Revenue Office's own worked example gives ${h.duty('qld', 850000, 'investor')} for an ${h.aud(850000)} investment property at the general rate, which charges $${h.num(h.P.states.qld.brackets[3].rate * 100, 2)} for each $100 or part of $100 above ${h.aud(h.P.states.qld.brackets[3].from)}. A buyer who lives in the same property and qualifies for the home concession pays ${h.duty('qld', 850000, 'owner')}.` },
    { q: 'Can an investor use the Victorian off-the-plan concession on a new apartment?', a: `Yes, under the temporary concession for strata apartments, units and townhouses with common property, for contracts from ${h.date(h.P.states.vic.otp_temp.from)} to ${h.date(h.P.states.vic.otp_temp.until)}. Investors and companies qualify and there is no value cap. Duty is charged on the price less construction costs still to come: an ${h.aud(700000)} apartment with ${h.aud(250000)} still to build costs ${h.duty('vic', 700000, 'investor', 'offplan', false, { vicConstruction: 250000 })} instead of ${h.duty('vic', 700000, 'investor')}.` },
    { q: 'Is there any stamp duty discount for property investors in South Australia in 2026?', a: `Not on an established property. RevenueSA applies one conveyance scale to every buyer, so a ${h.aud(550000)} rental house costs ${h.duty('sa', 550000, 'investor')} whoever buys it. The first home relief requires you to live in the home, the seniors downsizing relief is for people selling their own residence, and a foreign investor adds the ${h.pct(h.P.states.sa.surcharge, 0)} foreign ownership surcharge on the share acquired.` },
    { q: 'Do I pay more NSW stamp duty buying an investment unit than buying a home to live in?', a: `No. Revenue NSW has a single transfer duty scale for both. A ${h.aud(750000)} unit costs ${h.duty('nsw', 750000, 'investor')} whether you rent it out or live in it, unless you are a first home buyer, in which case the First Home Buyers Assistance Scheme can reduce it. A foreign investor adds surcharge purchaser duty of ${h.pct(h.P.states.nsw.surcharge, 0)}.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [450000, 650000, 900000, 1300000];
    return `
<h2>Three groups of states</h2>
<p>For a property investor the eight jurisdictions fall into three groups. In NSW, South Australia, Tasmania and the Northern Territory there is one scale and the investor pays it like anyone else who is not a first home buyer. In Victoria and Western Australia the owner-occupier gets a lower rate only on cheaper homes, so above those values the investor is no worse off. In the ACT and Queensland the gap runs across most of the price range.</p>
${h.table(['State', ...prices.map((p) => h.aud(p))], STATES.map((s) => [STATE_INFO[s].short, ...prices.map((p) => { const i = h.calc(s, p, 'investor').total, o = h.calc(s, p, 'owner').total; return i > o ? `${h.aud(i)} <span class="text-navy-600">(+${h.aud(i - o)})</span>` : h.aud(i); })]), 'Investor duty on an established home; the extra cost against an owner-occupier in brackets', ['l', 'r', 'r', 'r', 'r'])}

<h2>ACT: two complete rate tables</h2>
<p>The ACT Revenue Office publishes separate owner-occupier and non-owner-occupier tables for 2025-27. The investor table starts at ${h.pct(P.act.investor_brackets[0].rate, 1)} on the first ${h.aud(P.act.investor_brackets[1].from)}; the owner-occupier table at ${h.pct(P.act.owner_brackets[0].rate, 2)} on the first ${h.aud(P.act.owner_brackets[1].from)}. From ${h.aud(P.act.investor_brackets[2].from)} the marginal rates are the same, which is why the dollar gap stays fixed over a wide middle range and then disappears above ${h.aud(P.act.investor_brackets[6].from)}, where both tables switch to ${h.pct(P.act.investor_brackets[6].rate, 2)} of the whole value. The ACT is also one of the two jurisdictions where a foreign investor pays no surcharge on duty. The ${h.a('act', 'ACT calculator')} applies both tables.</p>

<h2>Queensland: the home concession an investor cannot claim</h2>
<p>Queensland's home concession is a separate scale for a home you will live in: ${h.pct(P.qld.home_brackets[0].rate, 0)} on the first ${h.aud(P.qld.home_brackets[1].from)}, then rates that converge with the general scale above ${h.aud(P.qld.home_brackets[2].from)}. Because the general scale starts higher and the bands differ, the investor's extra cost is ${h.aud(h.calc('qld', 540000, 'investor').total - h.calc('qld', 540000, 'owner').total)} at ${h.aud(540000)} and stays at ${h.aud(h.calc('qld', 950000, 'investor').total - h.calc('qld', 950000, 'owner').total)} for every price above that. The Queensland Revenue Office's examples confirm both scales: ${h.duty('qld', 850000, 'investor')} on an ${h.aud(850000)} investment and ${h.duty('qld', 950000, 'owner')} on a ${h.aud(950000)} home. The office also states that the whole property cannot be rented out before you move in or in the year after, so the line between home and investment is policed.</p>

<h2>Victoria and Western Australia: only at the lower end</h2>
<p>Victoria's principal place of residence concession runs from ${h.aud(P.vic.ppr_from)} to ${h.aud(P.vic.ppr_to)}. The State Revenue Office's examples: ${h.duty('vic', 400000, 'owner')} instead of ${h.duty('vic', 400000, 'investor')} at ${h.aud(400000)}, and ${h.duty('vic', 550000, 'owner')} instead of ${h.duty('vic', 550000, 'investor')} at ${h.aud(550000)}. Above that value an investor and an owner-occupier pay the same general scale, which becomes ${h.pct(P.vic.brackets[3].rate, 1)} of the entire value once the price passes ${h.aud(P.vic.brackets[3].from)}.</p>
<p>Western Australia's concessional rate for a principal place of residence stops at ${h.aud(P.wa.concessional_cap)}. At ${h.aud(180000)} an owner-occupier pays ${h.duty('wa', 180000, 'owner')} and an investor ${h.duty('wa', 180000, 'investor')}; above the cap the difference is gone.</p>

<h2>NSW, South Australia, Tasmania and the Territory: one scale for all</h2>
<p>In these four jurisdictions the owner-occupier and the investor meet the same table, and the only buyers who pay less are first home buyers (in NSW, and in South Australia on new homes) or, in the Territory, buyers of a house and land package from a builder. The scales themselves differ in character. Revenue NSW indexes its bands every 1 July, and an investor signing in 2026/27 uses thresholds that end the $${h.num(P.nsw.brackets[4].rate * 100, 2)} band at ${h.aud(P.nsw.brackets[5].from)}. South Australia's conveyance scale is not indexed at all, so its top rate of $${h.num(P.sa.brackets[8].rate * 100, 2)} per $100 starts at ${h.aud(P.sa.brackets[8].from)} and has not moved since RevenueSA last published the table. Tasmania's scale has applied since ${h.date('2013-10-21')} with a minimum of ${h.aud(P.tas.minimum)}. The Territory uses a formula up to ${h.aud(P.nt.formula.upto)} and then a flat ${h.pct(P.nt.flat_bands[0].rate, 2)} of the whole value.</p>
${h.table(['Price', 'NSW', 'SA', 'TAS', 'NT'], [400000, 600000, 1000000].map((p) => [h.aud(p), h.duty('nsw', p, 'investor'), h.duty('sa', p, 'investor'), h.duty('tas', p, 'investor'), h.duty('nt', p, 'investor')]), 'Investor duty in the four single-scale jurisdictions', ['l', 'r', 'r', 'r', 'r'])}

<h2>Concessions investors can use</h2>
<p>Two schemes reward investors who buy new apartments. Victoria's temporary off-the-plan concession for strata developments, open to investors and companies with no value cap, applies to contracts up to ${h.date(P.vic.otp_temp.until)} and deducts the construction cost still to come from the dutiable value. Western Australia's off-the-plan concession, for contracts up to ${h.date(P.wa.otp.until)}, removes up to ${h.pct(P.wa.otp.pre.max, 0)} of the duty on a strata dwelling bought before construction starts, capped at ${h.aud(P.wa.otp.cap)}.</p>
${h.table(['Investor buying a new apartment', 'Without the concession', 'With it'], [
  [`VIC, ${h.aud(700000)}, ${h.aud(300000)} still to build`, h.duty('vic', 700000, 'investor'), h.duty('vic', 700000, 'investor', 'offplan', false, { vicConstruction: 300000 })],
  [`WA, ${h.aud(700000)}, before construction`, h.duty('wa', 700000, 'investor'), h.duty('wa', 700000, 'investor', 'offplan', false, { waOtpStage: 'pre' })],
  [`WA, ${h.aud(700000)}, under construction`, h.duty('wa', 700000, 'investor'), h.duty('wa', 700000, 'investor', 'offplan', false, { waOtpStage: 'under' })],
], 'Off-the-plan concessions open to investors', ['l', 'r', 'r'])}
<p>The ${h.a('off-the-plan-stamp-duty', 'off-the-plan guide')} sets out the other conditions. Neither scheme affects the foreign buyer surcharges, which the ${h.a('foreign-buyer-stamp-duty', 'foreign buyer guide')} covers.</p>
<!--mini:waOffPlan-->

<h2>Where an investor pays least</h2>
<p>For a resident investor buying an established home at ${h.aud(800000)}, the ACT and Queensland are the cheapest of the eight even with their higher investor scales, and Victoria and the Northern Territory the dearest. The ranking changes with price, so run your own figure through the ${h.a('home', 'eight-state comparison')}.</p>
${h.table(['State', 'Investor at $800,000'], [...STATES].sort((a, b) => h.calc(a, 800000, 'investor').total - h.calc(b, 800000, 'investor').total).map((s) => [STATE_INFO[s].name, h.duty(s, 800000, 'investor')]), 'Resident investor, established home, cheapest first', ['l', 'r'])}
`;
  },
  related: ['act', 'qld-home-concession', 'vic-ppr', 'off-the-plan-stamp-duty', 'foreign-buyer-stamp-duty', 'home'],
  sources: ['act_rates', 'qld_rates', 'qld_concession_rates', 'qld_home_concession', 'vic_general', 'vic_ppr', 'vic_otp_temp', 'wa_rates', 'wa_otp'],
});
