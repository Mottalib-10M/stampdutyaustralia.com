import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'New South Wales'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'Western Australia'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'Australian Capital Territory'], ['nt', 'Northern Territory']] as const;

export default definePage({
  id: 'price-800000',
  path: '/prices/stamp-duty-on-800000/',
  group: 'prices',
  kind: 'price',
  order: 40,
  mini: 'priceCheck',
  nav: 'Duty on $800,000',
  card: 'Stamp duty on $800,000: the last dollar of the NSW exemption, the end of two Queensland and WA concessions.',
  title: 'Stamp Duty on $800,000 2026: NSW, QLD and WA Thresholds',
  description: 'Stamp duty on $800,000 in 2026: nil for a NSW first home buyer, the end of the QLD and WA first home concessions, and $21,850 for a Queensland owner-occupier.',
  h1: 'Stamp duty on $800,000',
  intro: 'At $800,000 the NSW first home exemption reaches its limit and two other states close their first home concessions. The figures for every state, and why they diverge.',
  resume: (h) => `${h.aud(800000)} is the top of the NSW first home exemption: an eligible buyer of a new or established home in New South Wales pays no transfer duty up to and including ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}, and from the next dollar the concession starts to fade. The same price marks the end of first home help in two other states. Queensland's first home concession on an established home has shrunk to nothing, leaving the home concession rate of ${h.duty('qld', 800000, 'first')}. In Western Australia the first home owner rate reaches its cap of ${h.aud(h.P.states.wa.fhor.home_cap)}, where it gives ${h.duty('wa', 800000, 'first')}, a few dollars short of the general ${h.duty('wa', 800000)}. WA's ${h.aud(h.P.states.wa.fhog.amount)} grant still applies at this price in Perth and the south. For a repeat owner-occupier, duty ranges from ${h.duty('qld', 800000)} in Queensland to ${h.duty('vic', 800000)} in Victoria, nearly double.`,
  faqs: (h) => [
    { q: 'Is an $800,000 first home still exempt from NSW transfer duty?', a: `Yes. The NSW First Home Buyers Assistance Scheme exempts a home valued at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} or less, so this price is the last one with no duty. Above it the concession fades in a straight line until ${h.aud(h.P.states.nsw.fhbas.home_cap)}: an ${h.aud(850000)} first home already costs ${h.duty('nsw', 850000, 'first')}, against ${h.duty('nsw', 850000)} without the scheme.` },
    { q: 'Does a WA investor pay duty on an $800,000 off-the-plan apartment bought before construction?', a: `No, if the purchase qualifies for the off-the-plan concession. Before construction starts, the concession covers ${h.pct(h.P.states.wa.otp.pre.max, 0)} of the duty up to ${h.aud(h.P.states.wa.otp.full_to)}, capped at ${h.aud(h.P.states.wa.otp.cap)}, which leaves ${h.duty('wa', 800000, 'investor', 'offplan', false, { waOtpStage: 'pre' })} to pay. Signed while building is under way, the share drops to ${h.pct(h.P.states.wa.otp.under.max, 0)} and the buyer pays ${h.duty('wa', 800000, 'investor', 'offplan', false, { waOtpStage: 'under' })}.` },
    { q: 'Why is the WA first home owner rate worth so little at $800,000?', a: `Because the rate of $${h.num(h.P.states.wa.fhor.home_rate * 100, 2)} per $100 above ${h.aud(h.P.states.wa.fhor.home_exempt_to)} is designed to catch up with the general scale by the cap. At ${h.aud(800000)} it gives ${h.duty('wa', 800000, 'first')}, only ${h.aud(h.calc('wa', 800000, 'first').saving)} less than the general ${h.duty('wa', 800000)}. The real benefit for a first home buyer at this price in Perth is the ${h.aud(h.P.states.wa.fhog.amount)} grant on a new home.` },
    { q: 'Which state is cheapest for a repeat buyer on an $800,000 home?', a: `Queensland, at ${h.duty('qld', 800000)}, thanks to its home concession rate for anyone who lives in the home. The ACT's owner-occupier scale is close behind at ${h.duty('act', 800000)}. Victoria is the dearest at ${h.duty('vic', 800000)}, because its principal place of residence rate stops at ${h.aud(h.P.states.vic.ppr_to)} and its general scale is steep.` },
  ],
  body: (h) => `
<h2>Eight answers for an $800,000 home</h2>
${h.table(['Jurisdiction', 'First home buyer', 'Owner-occupier', 'Investor', 'Foreign investor'], ST.map(([s, n]) => [n, h.duty(s, 800000, 'first'), h.duty(s, 800000, 'owner'), h.duty(s, 800000, 'investor'), h.duty(s, 800000, 'investor', 'established', true)]), 'Established home, contracts in 2026-27', ['l', 'r', 'r', 'r', 'r'])}
<p>Only two jurisdictions still charge a first home buyer nothing at this price, NSW and the ACT, and only the ACT keeps doing so above it. Queensland's first home figure now equals its owner-occupier figure, which is the visible sign that its first home concession has run out.</p>

<h2>Three limits that meet at $800,000</h2>
<h3>NSW: end of the exemption, start of the fade</h3>
<p>Revenue NSW exempts first homes up to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and reduces duty up to ${h.aud(h.P.states.nsw.fhbas.home_cap)}. The fade is linear, so the first ${h.aud(50000)} above this price costs ${h.duty('nsw', 850000, 'first')}. The ${h.a('nsw-first-home-buyers', 'NSW first home buyer page')} gives the formula.</p>
<h3>Queensland: the deduction reaches zero</h3>
<p>The Queensland first home concession on an established home is a deduction from the home concession duty, ${h.aud(h.P.states.qld.first_home_table[h.P.states.qld.first_home_table.length - 1].deduct)} in the last band below ${h.aud(800000)} and nothing from ${h.aud(800000)}. A new first home is a different matter: no duty, at any price.</p>
<h3>WA: the first home owner rate cap and the grant cap</h3>
<p>Western Australia's first home owner rate ends at ${h.aud(h.P.states.wa.fhor.home_cap)}, and its grant cap south of the 26th parallel is the same figure. The off-the-plan concession is also at full strength up to ${h.aud(h.P.states.wa.otp.full_to)}, which is why an investor buying an apartment off the plan before construction can pay less than a first home buyer at this price.</p>
<!--mini:waOffPlan-->

<h2>The surcharge picture</h2>
<p>In all six states a foreign investor pays more than twice the ordinary duty. Western Australia's ${h.pct(h.P.states.wa.surcharge, 0)} gives the lowest state total, ${h.duty('wa', 800000, 'investor', 'established', true)}; Victoria's general scale plus ${h.pct(h.P.states.vic.surcharge, 0)} gives the highest, ${h.duty('vic', 800000, 'investor', 'established', true)}. The ACT and the Northern Territory charge no surcharge.</p>

<h2>Prices on either side</h2>
<p>One step down, the ${h.a('price-750000', '$750,000 page')} looks at Victoria's caps and the grant limits. One step up, the ${h.a('price-900000', '$900,000 page')} sits in the middle of the NSW fade. The full list is on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-750000', 'price-900000', 'nsw-first-home-buyers', 'qld-first-home-buyers', 'wa-first-home-owner-rate', 'prices'],
  sources: ['nsw_fhbas', 'qld_concession_rates', 'wa_fhor', 'wa_fhog', 'wa_otp', 'vic_general'],
});
