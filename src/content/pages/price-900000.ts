import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'NSW'], ['vic', 'VIC'], ['qld', 'QLD'], ['wa', 'WA'], ['sa', 'SA'], ['tas', 'TAS'], ['act', 'ACT'], ['nt', 'NT']] as const;

export default definePage({
  id: 'price-900000',
  path: '/prices/stamp-duty-on-900000/',
  group: 'prices',
  kind: 'price',
  order: 50,
  mini: 'priceCheck',
  nav: 'Duty on $900,000',
  card: 'Stamp duty on $900,000: halfway through the NSW first home fade and at the floor of the WA off-the-plan taper.',
  title: 'Stamp Duty on $900,000 2026: Duty in All Eight States',
  description: 'Stamp duty on $900,000 in 2026: $19,594 for a NSW first home buyer halfway through the fade, WA off-the-plan relief at its 50% floor, and $49,070 in Victoria.',
  h1: 'Stamp duty on $900,000',
  intro: 'At $900,000 most first home concessions have ended, the NSW one is half spent, and the WA off-the-plan concession reaches its lowest share. A state-by-state reading.',
  resume: (h) => `On a ${h.aud(900000)} home a first home buyer in New South Wales sits exactly halfway through the concession: the scheme removes ${h.aud(h.calc('nsw', 900000, 'first').saving)}, half of the duty that would apply at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}, so the bill is ${h.duty('nsw', 900000, 'first')} instead of ${h.duty('nsw', 900000)}. Outside NSW, only the ACT still cuts first home duty on an established home at this price, and it removes all of it for an eligible buyer. For anyone else the general or owner-occupier scales apply, which puts a repeat buyer between ${h.duty('qld', 900000)} in Queensland and ${h.duty('vic', 900000)} in Victoria. In Western Australia ${h.aud(h.P.states.wa.otp.floor_from)} is the floor of the off-the-plan taper: a contract signed before construction still has ${h.pct(h.P.states.wa.otp.pre.min, 0)} of its duty waived, leaving ${h.duty('wa', 900000, 'investor', 'offplan', false, { waOtpStage: 'pre' })}. Victoria's whole-value rate starts a little higher, at ${h.aud(h.P.states.vic.brackets[3].from)}, so this price is still on its marginal scale.`,
  faqs: (h) => [
    { q: 'How much does a NSW first home buyer save on a $900,000 home?', a: `${h.aud(h.calc('nsw', 900000, 'first').saving)}. The First Home Buyers Assistance Scheme takes the duty at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and removes a share of it that falls from all at that price to none at ${h.aud(h.P.states.nsw.fhbas.home_cap)}. At ${h.aud(900000)} the share is exactly half, so the buyer pays ${h.duty('nsw', 900000, 'first')} instead of ${h.duty('nsw', 900000)}. On vacant land the thresholds are lower and this price gets no concession.` },
    { q: 'What is the WA off-the-plan concession on a $900,000 apartment?', a: `It is at its floor. Signed before construction, the concession is ${h.pct(h.P.states.wa.otp.pre.min, 0)} of the duty, so the buyer pays ${h.duty('wa', 900000, 'investor', 'offplan', false, { waOtpStage: 'pre' })} instead of ${h.duty('wa', 900000)}. Signed during construction it is ${h.pct(h.P.states.wa.otp.under.min, 1)}, leaving ${h.duty('wa', 900000, 'investor', 'offplan', false, { waOtpStage: 'under' })}. Above ${h.aud(h.P.states.wa.otp.floor_from)} the share stays at those minimums, subject to the ${h.aud(h.P.states.wa.otp.cap)} cap.` },
    { q: 'Is a $900,000 home in Victoria taxed at 5.5 % of the whole price?', a: `Not yet. Below ${h.aud(h.P.states.vic.brackets[3].from)} Victoria still uses its marginal scale: ${h.aud(h.P.states.vic.brackets[2].base)} plus ${h.pct(h.P.states.vic.brackets[2].rate)} of the value above ${h.aud(h.P.states.vic.brackets[2].from)}, which gives ${h.duty('vic', 900000)} here, an effective ${h.pct(h.calc('vic', 900000).total / 900000, 2)}. From ${h.aud(h.P.states.vic.brackets[3].from)} the whole value is charged at ${h.pct(h.P.states.vic.brackets[3].rate)}, so the switch itself is smooth.` },
  ],
  body: (h) => `
<h2>Cheapest to dearest at $900,000</h2>
<p>This table is sorted by what a repeat owner-occupier pays, from the lowest to the highest, with the first home and investor figures alongside.</p>
${h.table(['', 'Owner-occupier', 'First home, established', 'Investor', 'Foreign investor'], [...ST].sort((x, y) => h.calc(x[0], 900000).total - h.calc(y[0], 900000).total).map(([s, n]) => [n, h.duty(s, 900000, 'owner'), h.duty(s, 900000, 'first'), h.duty(s, 900000, 'investor'), h.duty(s, 900000, 'investor', 'established', true)]), 'Established home, contracts in 2026-27, sorted by the owner-occupier column', ['l', 'r', 'r', 'r', 'r'])}
<p>The spread for a repeat buyer is ${h.aud(h.calc('vic', 900000).total - h.calc('qld', 900000).total)} between the top and bottom of the table. Queensland stays cheapest because its home concession rate removes a fixed amount for anyone who lives in the home, and the ACT follows with its own owner-occupier scale.</p>

<h2>The middle of the NSW fade</h2>
<p>Revenue NSW reduces first home duty between ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and ${h.aud(h.P.states.nsw.fhbas.home_cap)} by a share of the duty at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}, which is ${h.duty('nsw', 800000)}. At ${h.aud(900000)} the share is one half, and every further ${h.aud(10000)} adds roughly ${h.aud((h.calc('nsw', 1000000, 'first').total - h.calc('nsw', 900000, 'first').total) / 10)} of duty until the concession disappears.</p>

<h2>WA off-the-plan: the bottom of the slope</h2>
<p>Western Australia's off-the-plan concession for contracts from ${h.date(h.P.states.wa.otp.from)} is a slope: full strength to ${h.aud(h.P.states.wa.otp.full_to)}, then falling evenly to its minimum at ${h.aud(h.P.states.wa.otp.floor_from)}. This is the price where the minimum applies. A buyer paying ${h.aud(900000)} for an apartment off the plan before construction pays ${h.duty('wa', 900000, 'investor', 'offplan', false, { waOtpStage: 'pre' })}; the same purchase at ${h.aud(850000)} would cost ${h.duty('wa', 850000, 'investor', 'offplan', false, { waOtpStage: 'pre' })}. The ${h.a('wa-off-the-plan', 'WA off-the-plan page')} has the conditions.</p>

<h2>First home buyers at $900,000 elsewhere</h2>
<p>Victoria's first home concession ended at ${h.aud(h.P.states.vic.fhb.cap)}, Queensland's at ${h.aud(800000)}, Western Australia's first home owner rate at ${h.aud(h.P.states.wa.fhor.home_cap)}. The exceptions are new homes: an eligible first home buyer pays nothing on a new home at this price in Queensland and South Australia, and nothing on any home in the ACT. A foreign buyer, by contrast, pays ${h.duty('nsw', 900000, 'investor', 'established', true)} in NSW once surcharge purchaser duty is added.</p>

<h2>Where to look next</h2>
<p>The ${h.a('price-800000', '$800,000 page')} shows the start of the NSW fade and the end of the Queensland and WA first home concessions. The ${h.a('price-1000000', '$1 million page')} shows its end. Other prices are on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-800000', 'price-1000000', 'nsw-first-home-buyers', 'wa-off-the-plan', 'vic', 'prices'],
  sources: ['nsw_fhbas', 'nsw_rates', 'wa_otp', 'vic_general', 'qld_concession_rates'],
});
