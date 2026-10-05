import { definePage } from '../../lib/page-types';

// Foreign investor duty surcharge in force since this date, SRO Tasmania [tas_fids].
const FIDS_FROM = '2020-04-01';
// Current Tasmanian scale in force since this date [tas_rates].
const SCALE_FROM = '2013-10-21';
// Pensioner downsizing concession: sales settled on or before this date only [tas_pensioner].
const PENSIONER_LAST = '2025-06-30';

export default definePage({
  id: 'tas-first-home-buyers',
  path: '/tas/first-home-buyers/',
  group: 'tas',
  kind: 'guide',
  order: 20,
  mini: 'changes2026',
  nav: 'TAS first home buyers',
  card: 'The established-home exemption ended with settlements after 30 June 2026; the grant is $20,000 for 2026-27.',
  title: 'First Home Buyer Stamp Duty TAS 2026: Exemption Ended',
  description: 'Tasmania first home buyer duty 2026: the exemption on established homes to $750,000 ended for settlements after 30 June 2026. Full scale now; $20,000 grant.',
  h1: 'First home buyer stamp duty in Tasmania',
  intro: 'For a settlement after 30 June 2026, a Tasmanian first home buyer pays the same property transfer duty as anyone else.',
  resume: (h) => {
    const t = h.P.states.tas;
    return `Tasmania's full duty exemption for first home buyers of established homes up to ${h.aud(t.fhb_established_cap_until_end)} ended for settlements after ${h.date(t.fhb_established_ended)}, so a first home bought today pays property transfer duty at the ordinary scale. What counts is the settlement date, not the contract: a buyer who signed in May 2026 but settled in July 2026 falls outside the exemption. On a ${h.aud(550000)} house in Launceston the duty is now ${h.duty('tas', 550000, 'first')}; at ${h.aud(700000)} it is ${h.duty('tas', 700000, 'first')}. The off-the-plan apartment concession closed for contracts after the same date. The remaining help is the First Home Owner Grant on a new home, worth ${h.aud(t.fhog.amount)} for transactions from ${h.date(t.fhog.from)} to ${h.date(t.fhog.until)}, down from ${h.aud(t.fhog.previous_amount)} in 2025-26. The new home must be completed within 24 months and occupied for six months within twelve. A foreign buyer adds the ${h.pct(t.surcharge, 0)} foreign investor duty surcharge on residential land.`;
  },
  faqs: (h) => {
    const t = h.P.states.tas;
    return [
      { q: 'I signed before 30 June 2026 and settled after: is my Tasmanian first home exempt?', a: `No. The State Revenue Office of Tasmania ties the end of the established-home exemption to settlement, and settlements after ${h.date(t.fhb_established_ended)} are outside it. A ${h.aud(600000)} contract signed in June 2026 and settled in August 2026 therefore pays ${h.duty('tas', 600000, 'first')}. The signing date only helped where settlement also took place by ${h.date(t.fhb_established_ended)}.` },
      { q: 'How much is the Tasmanian First Home Owner Grant in 2026-27?', a: `${h.aud(t.fhog.amount)} for transactions from ${h.date(t.fhog.from)} to ${h.date(t.fhog.until)}, against ${h.aud(t.fhog.previous_amount)} in 2025-26. It is paid on a new home, not an established one. Construction has to be completed within 24 months, and the buyer must occupy the home for at least six months, starting within twelve months. The grant does not reduce duty; it is paid separately.` },
      { q: 'Is there any stamp duty concession left for first home buyers in Tasmania?', a: `Not on the duty itself for 2026-27. The established-home exemption ended for settlements after ${h.date(t.fhb_established_ended)} and the off-the-plan apartment concession for contracts after the same date. A first home buyer now pays the ordinary scale, for example ${h.duty('tas', 450000, 'first')} on ${h.aud(450000)}. The First Home Owner Grant on a new home is the support that remains.` },
      { q: 'What surcharge does a foreign buyer pay on a Tasmanian home?', a: `The foreign investor duty surcharge, or FIDS, of ${h.pct(t.surcharge, 0)} of the value of residential land, in force since ${h.date(FIDS_FROM)}. It is added to property transfer duty. A foreign buyer of a ${h.aud(500000)} home in Hobart pays ${h.duty('tas', 500000, 'investor')} of duty and ${h.aud(h.calc('tas', 500000, 'investor', 'established', true).surcharge)} of surcharge, ${h.duty('tas', 500000, 'investor', 'established', true)} in all.` },
      { q: 'Does a pensioner downsizing in Tasmania still get a duty concession?', a: `Not on a new sale. The pensioners downsizing concession applied only to sales settled on or before ${h.date(PENSIONER_LAST)}. A pensioner buying a smaller home in 2026-27 pays the ordinary scale: ${h.duty('tas', 400000, 'owner')} on a ${h.aud(400000)} unit. The ${h.a('pensioner-downsizer-stamp-duty', 'downsizer guide')} lists the states where a concession still exists.` },
      { q: 'Do first home buyers pay duty on vacant land in Tasmania in 2026-27?', a: `Yes, at the ordinary scale. No first home concession on duty remains in Tasmania for 2026-27, for land or for homes. A ${h.aud(220000)} block in Kingston costs ${h.duty('tas', 220000, 'first', 'vacant')} in property transfer duty. The First Home Owner Grant can still apply to the home built on it, provided construction is completed within 24 months and the six-month occupancy condition is met.` },
    ];
  },
  body: (h) => {
    const t = h.P.states.tas;
    const prices = [350000, 450000, 550000, 650000, 750000, 900000];
    return `
<h2>A settlement date, not a signing date</h2>
<p>Tasmania's end-date for the established-home exemption was written around settlement, not around the contract, and that is the detail most likely to catch out a buyer who signed in June 2026. A contract signed in the last weeks of June, with a normal settlement period of a month or more, landed after ${h.date(t.fhb_established_ended)} and lost the exemption. The off-the-plan apartment concession was closed differently, for contracts after that date, which makes sense for a purchase whose settlement may be years away.</p>
<p>Before it ended, the exemption removed all duty on an established home up to ${h.aud(t.fhb_established_cap_until_end)}. For a first home buyer that was worth ${h.duty('tas', 600000, 'first')} at ${h.aud(600000)} and ${h.duty('tas', t.fhb_established_cap_until_end, 'first')} at the cap.</p>

<h2>What a first home costs in duty now</h2>
<p>The table shows property transfer duty on the Tasmanian scale, in force since ${h.date(SCALE_FROM)}, with its minimum of ${h.aud(t.minimum)}. The first home buyer column and the investor column are identical, because no first home concession remains on the duty.</p>
${h.table(['Price', 'First home buyer', 'Any other buyer', 'Foreign buyer (with FIDS)'], prices.map((p) => [h.aud(p), h.duty('tas', p, 'first'), h.duty('tas', p, 'owner'), h.duty('tas', p, 'investor', 'established', true)]), 'Tasmanian property transfer duty, 2026-27', ['l', 'r', 'r', 'r'])}
<p>The top marginal rate, $${h.num(t.brackets[t.brackets.length - 1].rate * 100, 2)} per $100, starts at ${h.aud(t.brackets[t.brackets.length - 1].from)}. New South Wales and Western Australia, by contrast, still exempt first home buyers on established homes below their thresholds, so at ${h.aud(600000)} the Tasmanian buyer pays ${h.duty('tas', 600000, 'first')} where a Perth buyer pays ${h.duty('wa', 600000, 'first')}.</p>

<h2>Working out the duty band by band</h2>
<p>With no concession to subtract, the whole calculation is the scale itself. Each band has a fixed amount for the value below it and a rate per $100 for the part above its floor, and the State Revenue Office counts every $100 or part of $100.</p>
${h.table(['Value from', 'Duty'], t.brackets.slice(1).map((b) => [h.aud(b.from), `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 above ${h.aud(b.from)}`]), `Tasmanian property transfer duty scale (minimum ${h.aud(t.minimum)})`, ['l', 'l'])}
<p>A worked case: a couple buying their first home in Devonport for ${h.aud(520000)}. The price falls in the band starting at ${h.aud(t.brackets[5].from)}, so the duty is ${h.aud(t.brackets[5].base)} plus $${h.num(t.brackets[5].rate * 100, 2)} on each of the ${h.num((520000 - t.brackets[5].from) / 100)} hundreds above it, which gives ${h.duty('tas', 520000, 'first')}. Under the old exemption they would have paid nothing, provided settlement happened by ${h.date(t.fhb_established_ended)}. That sum now has to be budgeted next to the deposit, since duty is paid by the buyer on top of the price.</p>

<h2>Comparing your first home with other states</h2>
<p>The calculator below runs the same first home purchase in all eight jurisdictions and lists those where the duty is zero. For an established home at ${h.aud(550000)}, Tasmania now sits among the jurisdictions that charge, with ${h.duty('tas', 550000, 'first')}, while New South Wales charges ${h.duty('nsw', 550000, 'first')} and the ACT ${h.duty('act', 550000, 'first')} to an eligible buyer.</p>

<h2>The grant: lower in 2026-27, new homes only</h2>
<p>The First Home Owner Grant survives, but it was cut. Transactions from ${h.date(t.fhog.from)} to ${h.date(t.fhog.until)} attract ${h.aud(t.fhog.amount)}, compared with ${h.aud(t.fhog.previous_amount)} the year before. The grant is for a new home: buying or building one, not an established house. If you are building, construction has to be completed within 24 months, and once you move in you must live there for at least six months, with the occupation beginning within twelve months.</p>
${h.table(['New home price', 'Transfer duty', 'Grant', 'Duty less grant'], [400000, 550000, 700000].map((p) => { const r = h.calc('tas', p, 'first', 'new'); return [h.aud(p), h.aud(r.total), h.aud(r.grant.amount), h.aud(r.total - r.grant.amount)]; }), 'Tasmania, new first home in 2026-27', ['l', 'r', 'r', 'r'])}
<p>On a ${h.aud(400000)} new home the grant still more than covers the duty. At ${h.aud(700000)} it pays for less than three quarters of it.</p>
<!--mini:grantState-->

<h2>Foreign buyers and the FIDS</h2>
<p>A foreign person buying residential land in Tasmania pays the foreign investor duty surcharge, known as FIDS, at ${h.pct(t.surcharge, 0)} of the value, on top of property transfer duty. It has applied since ${h.date(FIDS_FROM)}. On a ${h.aud(650000)} home the surcharge alone is ${h.aud(h.calc('tas', 650000, 'investor', 'established', true).surcharge)}. The ${h.a('foreign-buyer-stamp-duty', 'foreign buyer guide')} sets Tasmania's surcharge against those of the other states.</p>

<h2>Other Tasmanian concessions that have closed</h2>
<p>The end of June 2026 was not the first closure. The pensioners downsizing to a new home concession applied only to sales settled on or before ${h.date(PENSIONER_LAST)}. The off-the-plan apartment concession closed for contracts after ${h.date(t.otp_ended)}. The State Revenue Office's concessions page is the place to check whether anything new has been announced since we read it; the ${h.a('stamp-duty-changes-2026', 'changes in 2026')} page tracks what moved across the country this year.</p>
`;
  },
  related: ['tas', 'first-home-owner-grant', 'first-home-buyer-stamp-duty', 'stamp-duty-changes-2026', 'foreign-buyer-stamp-duty', 'pensioner-downsizer-stamp-duty'],
  sources: ['tas_fhb', 'tas_concessions', 'tas_fhog', 'tas_fids', 'tas_rates', 'tas_pensioner'],
});
