import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nsw',
  path: '/nsw/',
  group: 'nsw',
  kind: 'hub',
  order: 10,
  tool: 'nsw',
  nav: 'NSW calculator',
  card: 'Transfer duty, premium duty, FHBAS and the 9 % surcharge, at 2026/27 thresholds.',
  title: 'Stamp Duty Calculator NSW 2026-27: Transfer Duty, FHBAS',
  description: 'Stamp duty calculator NSW for contracts from 1 July 2026: Revenue NSW 2026/27 thresholds, first home exemption to $800,000, 9% surcharge and $10,000 grant.',
  h1: 'Stamp duty calculator NSW',
  intro: 'Transfer duty on a New South Wales purchase at the 2026/27 thresholds, with the first home scheme, premium duty and the foreign purchaser surcharge.',
  resume: (h) => `Transfer duty in New South Wales is charged on the dutiable value, the higher of the price and the market value, on a sliding scale that Revenue NSW indexes to the CPI every 1 July. For a contract signed in 2026/27 the top general band starts at ${h.aud(h.P.states.nsw.brackets[5].from)} and premium duty starts at ${h.aud(h.P.states.nsw.premium_threshold)}. Each band applies to every $100 or part of $100, so ${h.aud(500050)} is charged on 1,131 hundreds, not 1,130.5: Revenue NSW's own calculator returns $16,691.50 for it, and so does this one. A first home buyer pays nothing up to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} on a home and ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)} on vacant land; the concession then fades to full duty at ${h.aud(h.P.states.nsw.fhbas.home_cap)} and ${h.aud(h.P.states.nsw.fhbas.land_cap)}. A foreign person adds surcharge purchaser duty of ${h.pct(h.P.states.nsw.surcharge, 0)} of the whole value. Duty is due within three months of exchange, or at settlement if that comes first.`,
  faqs: (h) => [
    { q: 'Why did my NSW transfer duty change after 1 July 2026 when the price did not?', a: `Revenue NSW moves the thresholds with the CPI each 1 July and the rate year follows the contract date. A ${h.aud(900000)} contract signed in June 2026 used the 2025/26 thresholds; the same contract signed in July 2026 uses the 2026/27 table on this page, where the $4.50 band now ends at ${h.aud(h.P.states.nsw.brackets[5].from)}. On a mid-range home the difference is usually a few hundred dollars.` },
    { q: 'Do I pay NSW duty on the price or on the valuation?', a: `On the dutiable value, which Revenue NSW defines as the higher of the price you agreed and the market value. Between unrelated parties at auction the two are normally the same. In a family sale below market value, such as land sold to a son for ${h.aud(300000)} when it is worth ${h.aud(450000)}, duty is assessed on ${h.aud(450000)}, ${h.duty('nsw', 450000, 'investor')}, and a formal valuation is usually requested.` },
    { q: 'What is premium property duty in NSW?', a: `It is a higher marginal rate on residential property above the premium threshold, ${h.aud(h.P.states.nsw.premium_threshold)} for 2026/27. Above that value duty is ${h.aud(h.P.states.nsw.brackets[6].base)} plus $7 for every $100. Revenue NSW's own example, a ${h.aud(4000000)} pre-auction offer in Balmain, comes to ${h.duty('nsw', 4000000, 'investor')} in total. Land over two hectares pays the premium rate on the first two hectares only, proportionally.` },
    { q: 'Can I pay NSW stamp duty later when I buy off the plan?', a: 'Yes, if you will live in it. An off-the-plan purchase of a home you will occupy can defer the duty for up to 12 months beyond the usual three, so it falls due at the earliest of 15 months after the contract, settlement, or an assignment. Every buyer must be a citizen or permanent resident; companies, trusts and investors cannot defer.' },
    { q: 'Is the NSW first home buyer exemption the same on land and on a house?', a: `No. On a new or existing home the full exemption runs to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} and the concession to just under ${h.aud(h.P.states.nsw.fhbas.home_cap)}. On vacant land where you will build, the exemption stops at ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)} and the concession at ${h.aud(h.P.states.nsw.fhbas.land_cap)}. A ${h.aud(400000)} block therefore still carries ${h.duty('nsw', 400000, 'first', 'vacant')} of duty for a first home buyer, as Revenue NSW's calculator confirms.` },
    { q: 'Does the 9 % NSW surcharge apply if only one of us is a foreign person?', a: 'It applies to the share the foreign person acquires. If an Australian citizen and a temporary visa holder buy as equal joint tenants, surcharge purchaser duty is charged on half the value, on top of transfer duty on the whole. Being eligible for the first home scheme does not remove the surcharge for the foreign co-buyer.' },
  ],
  body: (h) => `
<h2>The 2026/27 scale, band by band</h2>
<p>Every NSW purchase starts from the same table. The concessions further down change the result, but they are all expressed against this scale, so it is worth reading once. These are the thresholds Revenue NSW publishes for the 2026/27 rate year, which covers contracts dated from 1 July 2026 to 30 June 2027.</p>
${h.table(['Dutiable value', 'Duty'], h.P.states.nsw.brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `over ${h.aud(b.from)} (premium)`, `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 above ${h.aud(b.from)}`]), 'NSW transfer duty and premium duty, contracts from 1 July 2026', ['l', 'l'])}
<p>The minimum duty is ${h.aud(h.P.states.nsw.minimum)}. Each band is charged per $100 <em>or part of</em> $100, which is why the calculator rounds the amount above the band's floor up to the next hundred before applying the rate. That detail is invisible on round prices and worth a few dollars on the others; it is also the first place where online estimates disagree with the official assessment.</p>

<h2>What the scale means at common NSW prices</h2>
<p>The table below is produced by the same engine as the calculator above, for an owner-occupier who is not a first home buyer, a first home buyer, and a foreign investor. In NSW the first two columns are identical: unlike Victoria or Queensland, NSW has no general concession for people who live in their home, only the first home scheme.</p>
${h.table(['Price', 'Home buyer', 'First home buyer', 'Foreign investor'], [500000, 750000, 900000, 1000000, 1500000].map((p) => [h.aud(p), h.duty('nsw', p, 'owner'), h.duty('nsw', p, 'first'), h.duty('nsw', p, 'investor', 'established', true)]), 'Duty plus surcharge where it applies', ['l', 'r', 'r', 'r'])}
<p>Two figures stand out. At ${h.aud(900000)} the first home buyer pays ${h.duty('nsw', 900000, 'first')} instead of ${h.duty('nsw', 900000, 'owner')}, because the concession is still halfway through its fade. At ${h.aud(1000000)} the concession has gone entirely. The foreign column shows how the surcharge dwarfs the duty itself: on a ${h.aud(1000000)} home it adds ${h.aud(h.calc('nsw', 1000000, 'investor', 'established', true).surcharge)}.</p>

<h2>How the first home concession fades between $800,000 and $1 million</h2>
<p>The First Home Buyers Assistance Scheme does not use a separate rate table. Revenue NSW starts from the full duty at your price and takes off a share of the duty that would apply at the exemption threshold, a share that shrinks to nothing at the cap. For a home, the saving is the duty on ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} multiplied by (${h.aud(h.P.states.nsw.fhbas.home_cap)} minus your price) divided by ${h.aud(h.P.states.nsw.fhbas.home_cap - h.P.states.nsw.fhbas.home_exempt_to)}. We checked the formula against Revenue NSW's First Home Buyers Assistance calculator at eight prices on 5 October 2026; it matches to the cent.</p>
<!--mini:fhbState-->
<p>The practical effect: every $10,000 above ${h.aud(800000)} costs a first home buyer roughly ${h.aud(h.calc('nsw', 810000, 'first').total)} at the start of the fade and more towards the top, because the full duty itself is rising at ${h.pct(0.045)} while the saving shrinks. The full rules, the vacant land thresholds and the residence requirement are on the ${h.a('nsw-first-home-buyers', 'NSW first home buyer page')}.</p>

<h2>Foreign buyers and the 9 % surcharge</h2>
<p>A foreign person who acquires residential-related property pays surcharge purchaser duty of ${h.pct(h.P.states.nsw.surcharge, 0)} of the dutiable value of their share, in addition to transfer duty. New Zealand citizens and permanent residents who are not ordinarily resident in Australia can be caught even when they qualify for the first home scheme. Who counts as foreign, and the 200-day test, are explained on the ${h.a('nsw-foreign-purchaser', 'NSW surcharge purchaser duty page')}.</p>

<h2>Paying, and paying later off the plan</h2>
<p>Duty is normally due within three months of exchange, or at settlement if that is sooner, and your conveyancer usually pays it through the settlement. Buying a home off the plan that you will live in allows a deferral of up to twelve more months; the conditions are on the ${h.a('nsw-off-the-plan', 'NSW off-the-plan page')}. Late payment draws interest from the original due date, not from settlement.</p>

<h2>How NSW compares</h2>
<p>NSW sits in the upper half of the eight jurisdictions for a home buyer who is not a first home buyer, because it has no owner-occupier rate. On ${h.aud(800000)} the duty here is ${h.duty('nsw', 800000)}, against ${h.duty('qld', 800000)} for the same buyer in Queensland and ${h.duty('act', 800000)} in the ACT. The ${h.a('home', 'eight-state comparison')} shows the ranking for your own price.</p>
`,
  related: ['nsw-first-home-buyers', 'nsw-foreign-purchaser', 'nsw-off-the-plan', 'vic', 'qld', 'first-home-owner-grant'],
  sources: ['nsw_rates', 'nsw_fhbas', 'nsw_fhbas_calc', 'nsw_spd', 'nsw_otp', 'nsw_fhog'],
});
