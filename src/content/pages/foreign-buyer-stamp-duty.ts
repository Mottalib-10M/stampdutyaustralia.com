import { definePage } from '../../lib/page-types';
import { STATES, STATE_INFO } from '../../lib/engine/params';

export default definePage({
  id: 'foreign-buyer-stamp-duty',
  path: '/guides/foreign-buyer-stamp-duty/',
  group: 'guides',
  kind: 'guide',
  order: 30,
  mini: 'foreignState',
  nav: 'Foreign buyer surcharges',
  card: 'Six surcharges from 7 % to 9 %, charged on the foreign share, and the concessions a foreign buyer gives up.',
  title: 'Foreign Buyer Stamp Duty 2026: Surcharges of 7% to 9%',
  description: 'Foreign buyer stamp duty 2026-27: surcharge of 9% in NSW, 8% in VIC, QLD and TAS, 7% in WA and SA, none added in the ACT or NT, charged on the foreign share.',
  h1: 'Foreign buyer stamp duty and surcharges',
  intro: 'Six jurisdictions add a second tax for foreign persons on top of ordinary duty; two do not, and the surcharge follows the share each buyer takes, not the whole property.',
  resume: (h) => `A foreign person buying a home in Australia in 2026-27 pays ordinary stamp duty plus a surcharge of ${h.pct(h.P.states.nsw.surcharge, 0)} in NSW, ${h.pct(h.P.states.vic.surcharge, 0)} in Victoria, Queensland and Tasmania, or ${h.pct(h.P.states.wa.surcharge, 0)} in Western Australia and South Australia, charged on the value of the share the foreign person acquires. The ACT and Northern Territory duty calculators ask no foreign buyer question and add nothing. On a ${h.aud(1000000)} established home bought outright by a foreign investor, the surcharge alone is ${h.aud(h.calc('nsw', 1000000, 'investor', 'established', true).surcharge)} in NSW and ${h.aud(h.calc('wa', 1000000, 'investor', 'established', true).surcharge)} in Western Australia, more than the duty itself in both. Each surcharge has its own name: surcharge purchaser duty, foreign purchaser additional duty, additional foreign acquirer duty, foreign transfer duty, foreign ownership surcharge and foreign investor duty surcharge. A foreign buyer also generally loses the first home and owner-occupier concessions, so the base duty is the full scale. When a citizen and a foreign person buy together, only the foreign share is surcharged.`,
  faqs: (h) => [
    { q: 'Do I pay the foreign surcharge on the whole house if my spouse is an Australian citizen?', a: `No. Every office that charges a surcharge applies it to the share the foreign person acquires. RevenueWA's own example: Kate and Simon buy a ${h.aud(400000)} home as joint tenants, and foreign transfer duty of ${h.aud(h.P.states.wa.surcharge * 400000 / 2)} is charged on Simon's half only. Ordinary duty is still charged on the whole value, and the concessions available depend on each state's rules.` },
    { q: 'Is there a foreign buyer surcharge on stamp duty in Canberra or Darwin?', a: `Not on duty. The ACT Revenue Office's conveyance duty calculator asks no question about foreign buyers and adds no surcharge, and the Northern Territory's calculator applies its formula to everyone. A foreign investor buying a ${h.aud(800000)} home pays ${h.duty('act', 800000, 'investor', 'established', true)} in the ACT and ${h.duty('nt', 800000, 'investor', 'established', true)} in the Territory, the same as a local investor.` },
    { q: 'Does the SA first home buyer relief reduce the foreign ownership surcharge?', a: `No. RevenueSA applies its first home buyer relief to stamp duty only, never to the ${h.pct(h.P.states.sa.surcharge, 0)} foreign ownership surcharge. RevenueSA's worked example for a ${h.aud(600000)} property shows ${h.aud(h.calc('sa', 600000, 'investor').duty)} of duty plus ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)} of surcharge. A part-foreign purchase that qualifies for the relief still carries the surcharge on the foreign share.` },
    { q: 'Can a New Zealand citizen living overseas be charged NSW surcharge purchaser duty?', a: `Yes. Revenue NSW states that a New Zealand citizen or a permanent resident who is not ordinarily resident in Australia can be a foreign person for surcharge purposes, even while being eligible for the First Home Buyers Assistance Scheme. The surcharge is ${h.pct(h.P.states.nsw.surcharge, 0)} of the dutiable value of their share, so ${h.aud(h.P.states.nsw.surcharge * 700000)} on a ${h.aud(700000)} home bought alone.` },
    { q: 'Does the Victorian off-the-plan concession lower foreign purchaser additional duty?', a: `No. The State Revenue Office Victoria works out foreign purchaser additional duty on the price before the off-the-plan deduction. A foreign buyer of a ${h.aud(800000)} apartment with ${h.aud(300000)} of construction still to come pays ordinary duty on the reduced value but FPAD of ${h.aud(h.calc('vic', 800000, 'investor', 'offplan', true, { vicConstruction: 300000 }).surcharge)} on the full price.` },
  ],
  body: (h) => {
    const P = h.P.states;
    const prices = [600000, 1000000, 1500000];
    return `
<h2>Six surcharges, six names</h2>
<p>The surcharge is a separate duty, assessed alongside transfer duty, and each office has given it a name of its own. Knowing the name helps when you look for it on the office's own website.</p>
${h.table(['State', 'Name', 'Rate', 'On a $1,000,000 home'], STATES.map((s) => [STATE_INFO[s].short, STATE_INFO[s].surchargeName || 'none added by the official calculator', P[s].surcharge ? h.pct(P[s].surcharge, 0) : 'none', P[s].surcharge ? h.aud(h.calc(s, 1000000, 'investor', 'established', true).surcharge) : h.aud(0)]), 'Foreign buyer surcharges on residential property, 2026-27', ['l', 'l', 'r', 'r'])}
<p>Tasmania has two rates: ${h.pct(P.tas.surcharge, 0)} for residential land and ${h.pct(0.015)} for primary production land, both since ${h.date('2020-04-01')}. Victoria's rate has been ${h.pct(P.vic.surcharge, 0)} since ${h.date('2019-07-01')}. This site only covers residential property, so the agricultural rate is not used in the calculators.</p>

<h2>What a foreign buyer pays in total</h2>
<p>For a foreign investor buying an established home outright, the base duty is the general scale and the surcharge is added on the whole value. The engine gives these totals:</p>
${h.table(['State', ...prices.map((p) => h.aud(p)), 'Share of price at $1,000,000'], STATES.map((s) => [STATE_INFO[s].short, ...prices.map((p) => h.duty(s, p, 'investor', 'established', true)), h.pct(h.calc(s, 1000000, 'investor', 'established', true).total / 1000000)]), 'Duty plus surcharge, foreign investor, established home', ['l', 'r', 'r', 'r', 'r'])}
<p>The ranking flips at the top: the ACT and the Territory go from mid-table for a local investor to the cheapest places by far for a foreign one, because nothing is added. In NSW the surcharge on a ${h.aud(1500000)} property, ${h.aud(h.calc('nsw', 1500000, 'investor', 'established', true).surcharge)}, is more than double the transfer duty of ${h.aud(h.calc('nsw', 1500000, 'investor').duty)}.</p>

<h2>Local investor against foreign investor</h2>
<p>For someone comparing the cost of buying an investment property from overseas with the cost for a resident investor, the useful number is the gap. At ${h.aud(900000)} the surcharge is the whole of the difference, because both buyers pay the general scale.</p>
${h.table(['State', 'Resident investor', 'Foreign investor', 'Extra cost'], STATES.map((s) => { const l = h.calc(s, 900000, 'investor').total, f = h.calc(s, 900000, 'investor', 'established', true).total; return [STATE_INFO[s].short, h.aud(l), h.aud(f), h.aud(f - l)]; }), 'Established home at $900,000', ['l', 'r', 'r', 'r'])}
<p>RevenueSA publishes the same arithmetic in its own words: on a ${h.aud(600000)} property, stamp duty of ${h.aud(h.calc('sa', 600000, 'investor').duty)} and a foreign ownership surcharge of ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)}, the surcharge being ${h.pct(P.sa.surcharge, 0)} of the value acquired. The surcharge outweighs the duty at every price in that table.</p>

<h2>Shared purchases: the foreign share only</h2>
<p>Couples and family groups often mix residency status. The offices all charge the surcharge on the part acquired by the foreign person. RevenueWA's fact sheet gives the clearest worked case: two buyers, a ${h.aud(400000)} home, joint tenants, one foreign. Foreign transfer duty is ${h.pct(P.wa.surcharge, 0)} of the foreign buyer's half, ${h.aud(P.wa.surcharge * 400000 / 2)}. Ordinary duty on the whole remains.</p>
${h.table(['State', 'Surcharge on a 50 % foreign share of $800,000', 'Surcharge if bought alone'], STATES.filter((s) => P[s].surcharge).map((s) => [STATE_INFO[s].short, h.aud(P[s].surcharge * 800000 / 2), h.aud(P[s].surcharge * 800000)]), 'Surcharge follows the share acquired', ['l', 'r', 'r'])}
<p>The calculators on this site treat the whole purchase as foreign or not foreign. For a mixed purchase, take the surcharge from the table above for your share and add it to the duty the calculator shows for the citizen buyer's profile, then check with the office whether the concession applies to the purchase as a whole.</p>

<h2>Concessions a foreign buyer loses</h2>
<p>The surcharge is only half the cost. Most first home and owner-occupier concessions are reserved for citizens and permanent residents. In NSW at least one buyer must be a citizen or permanent resident for the First Home Buyers Assistance Scheme. Victoria's first home exemption needs at least one Australian or New Zealand citizen or permanent resident. Queensland, since ${h.date(P.qld.citizenship_rule_from)}, requires each buyer claiming the home or first home concession to be a citizen, a permanent resident or a specified foreign retiree. South Australia's first home relief never touches the surcharge.</p>
<p>Put together, a temporary visa holder buying a ${h.aud(700000)} home to live in pays very different amounts from a citizen at the same price:</p>
${h.table(['State', 'Citizen, first home', 'Foreign buyer, own home'], STATES.map((s) => [STATE_INFO[s].short, h.duty(s, 700000, 'first'), h.duty(s, 700000, 'owner', 'established', true)]), 'Established home at $700,000', ['l', 'r', 'r'])}

<h2>Who is a foreign person</h2>
<p>The definitions are set by each state's legislation and are not identical, which is why this page sticks to what the offices publish. Revenue NSW makes a point that is easy to miss: a New Zealand citizen or permanent resident who is not ordinarily resident in Australia can be charged surcharge purchaser duty. The NSW detail is on the ${h.a('nsw-foreign-purchaser', 'NSW surcharge purchaser duty page')}, and Queensland's on the ${h.a('qld-foreign', 'AFAD page')}.</p>
`;
  },
  related: ['nsw-foreign-purchaser', 'qld-foreign', 'investor-stamp-duty', 'off-the-plan-stamp-duty', 'home'],
  sources: ['nsw_spd', 'vic_fpad', 'qld_afad', 'wa_ftd', 'sa_fos', 'tas_fids', 'act_rates', 'nt_calc'],
});
