import { definePage } from '../../lib/page-types';

// Tasmania's pensioner downsizing concession covered sales settled on or before this date [tas_pensioner].
const TAS_PENSIONER_LAST = '2025-06-30';

export default definePage({
  id: 'act-pensioner',
  path: '/act/pensioner-duty-concession/',
  group: 'act',
  kind: 'guide',
  order: 40,
  mini: 'pensioner',
  nav: 'ACT pensioner concession',
  card: 'Eligible pensioners pay no conveyance duty in the ACT from 1 July 2026, with the value limit removed.',
  title: 'Pensioner Duty Concession ACT 2026-27: No Value Limit',
  description: 'ACT Pensioner Duty Concession Scheme 2026-27: from 1 July 2026 eligible pensioners pay no conveyance duty on a home at any value. Compared with Victoria.',
  h1: 'Pensioner Duty Concession Scheme in the ACT',
  intro: 'A Canberra pensioner who moves house in 2026-27 can do so without conveyance duty, and the price of the new home no longer matters.',
  resume: (h) => {
    const a = h.P.states.act;
    return `Since ${h.date(a.pensioner.from)} an eligible pensioner buying a home in the ACT pays no conveyance duty under the Pensioner Duty Concession Scheme, and the scheme no longer has a property value limit. That changes the arithmetic of moving in retirement. A pensioner who sells a large family house in Kambah and buys a ${h.aud(900000)} single-level townhouse in Weston would otherwise pay ${h.duty('act', 900000, 'owner')} at owner-occupier rates; under the scheme the figure is nil. The removal of the limit also means the scheme is not confined to cheaper homes: a ${h.aud(1500000)} purchase, which would carry ${h.duty('act', 1500000, 'owner')}, is treated the same way. Buyers who are not eligible pay the ordinary owner-occupier rates, or the higher non-owner-occupier rates if they will not live in the home. Victoria is the only other jurisdiction where this calculator models a pensioner reduction, and there the exemption stops at ${h.aud(h.P.states.vic.pensioner.exempt_to)} with a concession up to ${h.aud(h.P.states.vic.pensioner.cap)}.`;
  },
  faqs: (h) => {
    const a = h.P.states.act, v = h.P.states.vic.pensioner;
    return [
      { q: 'Is there a property value limit on the ACT pensioner duty concession in 2026-27?', a: `No. From ${h.date(a.pensioner.from)} the ACT Revenue Office removed the value limit, and an eligible pensioner pays no conveyance duty. On a ${h.aud(1100000)} home that is a saving of ${h.duty('act', 1100000, 'owner')} against the owner-occupier rates. The eligibility conditions themselves are set out on the scheme's page, which we cite below; this calculator assumes they are met when you select the pensioner option.` },
      { q: 'What does a pensioner pay on a Canberra home without the concession?', a: `Owner-occupier conveyance duty, from the ACT's 2026-27 table. That is ${h.duty('act', 600000, 'owner')} on ${h.aud(600000)}, ${h.duty('act', 800000, 'owner')} on ${h.aud(800000)} and ${h.duty('act', 1000000, 'owner')} on ${h.aud(1000000)}. A pensioner buying a property to rent out rather than to live in pays the higher non-owner-occupier rates: ${h.duty('act', 600000, 'investor')} on the ${h.aud(600000)} example.` },
      { q: 'How does the ACT pensioner scheme compare with Victoria in 2026?', a: `The ACT is more generous above ${h.aud(v.exempt_to)}. Victoria exempts an eligible pensioner up to ${h.aud(v.exempt_to)} and gives a sliding concession to ${h.aud(v.cap)}, once only, and the buyer must choose between it and the first home buyer scheme. At ${h.aud(700000)} a Victorian pensioner pays ${h.duty('vic', 700000, 'owner', 'established', false, { pensioner: true })}; an ACT pensioner pays nothing at any price.` },
      { q: 'Does an ACT pensioner pay conveyance duty when selling the family home?', a: `No. Conveyance duty in the ACT is paid by the buyer, so the sale of the old house does not cost the pensioner any duty; the buyer of that house pays it at their own rates. The Pensioner Duty Concession Scheme matters only on the purchase of the next home, where it removes duty such as the ${h.duty('act', 750000, 'owner')} owner-occupier rate on ${h.aud(750000)}.` },
      { q: 'Can an ACT pensioner use the Home Buyer Concession Scheme instead?', a: `Only if no buyer has held an interest in any property in the five years before the contract, which most pensioners selling a home will not meet. The pensioner scheme does not depend on that five-year gap. For a pensioner who has been renting for longer than five years, both schemes lead to nil duty since ${h.date(a.pensioner.from)}, and the ACT Revenue Office decides which one is applied.` },
    ];
  },
  body: (h) => {
    const a = h.P.states.act, v = h.P.states.vic.pensioner, sa = h.P.states.sa;
    const prices = [500000, 650000, 800000, 1000000, 1300000, 1600000];
    return `
<h2>From a limit to no limit</h2>
<p>Until 30 June 2026 the Pensioner Duty Concession Scheme carried a property value limit, which kept it to the more modest end of the Canberra market. From ${h.date(a.pensioner.from)} the limit is gone and an eligible pensioner pays no conveyance duty whatever the value. The practical effect is largest for people who have lived for decades in a Canberra house that is now worth a great deal, and who want to move to something easier to manage that is not necessarily cheaper: a new townhouse near the shops, an apartment with a lift, a smaller block closer to family.</p>
<p>The table shows the duty an eligible pensioner no longer pays, at owner-occupier rates, and what the same purchase would cost a buyer who intends to let it.</p>
${h.table(['Home price', 'Owner-occupier rates', 'Eligible pensioner', 'Non-owner-occupier rates'], prices.map((p) => [h.aud(p), h.duty('act', p, 'owner'), h.duty('act', p, 'owner', 'established', false, { pensioner: true }), h.duty('act', p, 'investor')]), 'ACT conveyance duty, contracts from 1 July 2026', ['l', 'r', 'r', 'r'])}
<p>Above ${h.aud(a.owner_brackets[a.owner_brackets.length - 1].from)} the owner-occupier table switches to a flat ${h.pct(a.owner_brackets[a.owner_brackets.length - 1].rate, 2)} of the whole value, so the saving on a ${h.aud(1600000)} home reaches ${h.duty('act', 1600000, 'owner')}.</p>

<h2>The owner-occupier table the scheme replaces</h2>
<p>To see what the concession is worth on a particular home, it helps to know the table it switches off. The ACT's owner-occupier rates for 2026-27 work in bands, each charged per $100 or part of $100 above its floor, until the flat rate takes over on the whole value.</p>
${h.table(['Value from', 'Owner-occupier duty'], a.owner_brackets.map((b) => [h.aud(b.from), b.flat ? `${h.pct(b.rate, 2)} of the whole value` : `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 above ${h.aud(b.from)}`]), 'ACT owner-occupier conveyance duty, 2026-27', ['l', 'l'])}
<p>Take a widow selling in Kambah and buying an ${h.aud(820000)} apartment in the city. The price sits in the band that starts at ${h.aud(a.owner_brackets[4].from)}: ${h.aud(a.owner_brackets[4].base)} plus $${h.num(a.owner_brackets[4].rate * 100, 2)} on each of the ${h.num((820000 - a.owner_brackets[4].from) / 100)} hundreds above it, ${h.duty('act', 820000, 'owner')} in all. If she is an eligible pensioner, the figure is nil. That is money left in the proceeds of the sale rather than spent on the move, which for many retirees is the point of moving at all.</p>

<h2>Who is an eligible pensioner</h2>
<p>The ACT Revenue Office sets out on its scheme page which pensions and concession cards qualify and what the buyer must do with the property. We have not reproduced those conditions here, because only the change of ${h.date(a.pensioner.from)} has been checked for this site: no value limit, no duty for an eligible buyer. Before relying on the scheme, read the office's page, linked in the sources, against your own situation. The calculators on this page simply let you switch the concession on and see the result.</p>

<h2>The ACT next to Victoria</h2>
<p>Victoria is the other jurisdiction where this site models a pensioner duty reduction for 2026-27. Its design is very different: a full exemption up to ${h.aud(v.exempt_to)}, a concession that fades to nothing at ${h.aud(v.cap)}, available once, with the buyer choosing between it and the first home buyer scheme.</p>
${h.table(['Home price', 'ACT, eligible pensioner', 'Victoria, eligible pensioner', 'Victoria, no concession'], [550000, 650000, 750000, 900000].map((p) => [h.aud(p), h.duty('act', p, 'owner', 'established', false, { pensioner: true }), h.duty('vic', p, 'owner', 'established', false, { pensioner: true }), h.duty('vic', p, 'owner')]), 'Pensioner buying an established home to live in', ['l', 'r', 'r', 'r'])}
<p>Up to ${h.aud(v.exempt_to)} the two give the same answer, nil. In between, the Victorian buyer pays part of the duty; at ${h.aud(v.cap)} and above, all of it. A retired couple deciding between a ${h.aud(900000)} home in Wodonga and one in Canberra faces a duty gap of ${h.duty('vic', 900000, 'owner')}. The ${h.a('vic-pensioner', 'Victorian pensioner page')} details its scheme.</p>
<!--mini:priceCheck-->

<h2>What the other states offer older buyers</h2>
<p>Tasmania had a duty concession for pensioners downsizing to a new home, but it applied only to sales settled on or before ${h.date(TAS_PENSIONER_LAST)}. South Australia introduced a seniors downsizing relief for buyers aged 60 and over, for contracts from ${h.date(sa.seniors_from)}, worth up to ${h.aud(sa.seniors_max_relief)} when a principal place of residence is sold and a new home, an off-the-plan apartment or land to build on is bought on a smaller block. Its detailed conditions are on RevenueSA's notice. The ${h.a('pensioner-downsizer-stamp-duty', 'downsizer guide')} brings these together.</p>

<h2>Selling and buying in the same year</h2>
<p>Conveyance duty falls on the buyer, so the sale of the old house carries none for the pensioner. The concession matters only on the purchase side. For a pensioner who will not live in the new property, the scheme is not the relevant one: the non-owner-occupier rates apply, ${h.duty('act', 700000, 'investor')} on ${h.aud(700000)}. And for a pensioner who has rented for more than five years, the ${h.a('act-home-buyer-concession', 'Home Buyer Concession Scheme')} also reaches nil duty, by a different route. Off-the-plan apartments have their own owner-occupier exemption, explained on the ${h.a('act-off-the-plan', 'ACT off-the-plan page')}.</p>
`;
  },
  related: ['act', 'act-home-buyer-concession', 'act-off-the-plan', 'vic-pensioner', 'pensioner-downsizer-stamp-duty'],
  sources: ['act_pensioner', 'act_rates', 'vic_pensioner', 'tas_pensioner', 'sa_seniors'],
});
