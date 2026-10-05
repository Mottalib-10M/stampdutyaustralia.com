import { definePage } from '../../lib/page-types';

// First Home Owner Grant cap removed for contracts from this date, RevenueSA [sa_fhog].
const FHOG_NO_CAP_FROM = '2024-06-06';

export default definePage({
  id: 'sa-first-home-buyers',
  path: '/sa/first-home-buyers/',
  group: 'sa',
  kind: 'guide',
  order: 20,
  mini: 'propertyTypeState',
  nav: 'SA first home buyers',
  card: 'No stamp duty on a new home, an off-the-plan apartment or land to build, at any price; full duty on an established one.',
  title: 'First Home Buyer Stamp Duty SA 2026: New Homes, No Cap',
  description: 'SA first home buyer stamp duty 2026: full relief on new homes, off-the-plan apartments and land to build, at any price; established homes pay the full scale.',
  h1: 'First home buyer stamp duty in South Australia',
  intro: 'South Australia gives its first home buyers a complete stamp duty exemption on new property, with no price limit, and nothing at all on an existing home.',
  resume: (h) => {
    const s = h.P.states.sa;
    return `A first home buyer in South Australia pays no stamp duty on a new home, an off-the-plan apartment or a block of land to build on, whatever the price, for contracts from ${h.date(s.fhb_relief.from)}; on an established home the full conveyance scale applies. The contrast is stark at ordinary prices. A ${h.aud(650000)} new townhouse in Adelaide costs a first buyer ${h.duty('sa', 650000, 'first', 'new')} in duty, while a ${h.aud(650000)} older house costs ${h.duty('sa', 650000, 'first')}. RevenueSA removed the value cap in 2025, so a ${h.aud(1200000)} new house is just as exempt. The relief does not touch the ${h.pct(s.surcharge, 0)} foreign ownership surcharge, which remains payable on any share bought by a foreign person. The home has to be occupied as the principal place of residence for six continuous months, starting within twelve months. On top of the duty relief, the First Home Owner Grant pays up to ${h.aud(s.fhog.amount)} on a new home with no price cap, though never on land bought alone. The SA scale itself is not indexed, so these figures hold from year to year.`;
  },
  faqs: (h) => {
    const s = h.P.states.sa;
    return [
      { q: 'Do first home buyers pay stamp duty on an established house in SA?', a: `Yes, in full. RevenueSA's relief covers new homes, off-the-plan apartments and vacant land to build on, and established homes are expressly outside it. A first home buyer paying ${h.aud(550000)} for a 1970s house in Salisbury pays ${h.duty('sa', 550000, 'first')}, exactly what an investor would pay for it. South Australia has no separate first home rate for existing property.` },
      { q: 'Is there a price limit on SA first home buyer stamp duty relief?', a: `Not for contracts from ${h.date(s.fhb_relief.from)}. The value thresholds that used to limit the relief were removed, so the exemption is total on an eligible new home or block of land at any price. A ${h.aud(1500000)} new home would otherwise carry ${h.duty('sa', 1500000, 'owner', 'new')} in duty; a first home buyer who meets the conditions pays nothing.` },
      { q: 'Does SA first home relief cover the foreign ownership surcharge?', a: `No. RevenueSA applies the relief to stamp duty only, and the ${h.pct(s.surcharge, 0)} foreign ownership surcharge is charged separately on the share acquired by a foreign person. On RevenueSA's ${h.aud(600000)} example the duty is ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).duty)} and the surcharge ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)}. A citizen buying jointly with a foreign partner should expect the surcharge on that partner's share.` },
      { q: 'Can I get the SA First Home Owner Grant on a block of land?', a: `Not on the land alone. The grant of up to ${h.aud(s.fhog.amount)} is for a new home, and RevenueSA has paid it without a price cap since ${h.date(FHOG_NO_CAP_FROM)}. Buying land and building on it can bring the finished home within the grant, while the land purchase itself already benefits from the stamp duty relief when it is bought to build a first home.` },
      { q: 'How long must I live in my first home to keep SA stamp duty relief?', a: `Six continuous months as your principal place of residence, with the occupation starting within twelve months. RevenueSA attaches this condition to the relief on every eligible property type: new home, off-the-plan apartment and land to build on. The calculator assumes it will be met.` },
    ];
  },
  body: (h) => {
    const s = h.P.states.sa;
    const prices = [400000, 500000, 650000, 800000, 1000000, 1200000];
    return `
<h2>New, off the plan or land: three doors in, one shut</h2>
<p>South Australia draws its line by the age of the dwelling, not by its price. RevenueSA lists three kinds of eligible property: a new home, an apartment bought off the plan, and vacant land on which you will build your first home. An established home is the door that stays shut. There is no partial concession for it, no reduced rate and no threshold below which it becomes free.</p>
<p>That makes the decision between a new and an older home unusually expensive in SA. The table puts numbers on it, using the ordinary conveyance scale for the established column.</p>
${h.table(['Price', 'Established home', 'New home or off the plan', 'Land to build on'], prices.map((p) => [h.aud(p), h.duty('sa', p, 'first'), h.duty('sa', p, 'first', 'new'), h.duty('sa', p, 'first', 'vacant')]), 'Stamp duty for an eligible first home buyer in South Australia', ['l', 'r', 'r', 'r'])}
<p>At ${h.aud(500000)} the older home costs ${h.duty('sa', 500000, 'first')} more in duty. At ${h.aud(800000)} the gap is ${h.duty('sa', 800000, 'first')}. Add the grant of up to ${h.aud(s.fhog.amount)} on the new home and the difference grows again.</p>

<h2>Why the price no longer matters</h2>
<p>The relief started with value thresholds. For contracts from ${h.date(s.fhb_relief.from)} those limits were removed, and the exemption is now total on an eligible property at any value. The calculator treats a new home at ${h.aud(2000000)} the same way it treats one at ${h.aud(450000)}: no duty for the first home buyer. Without the relief, the ${h.aud(2000000)} home would carry ${h.duty('sa', 2000000, 'owner', 'new')}.</p>
<p>The SA scale itself is not indexed. RevenueSA's top rate of $${h.num(s.brackets[s.brackets.length - 1].rate * 100, 2)} per $100 starts at ${h.aud(s.brackets[s.brackets.length - 1].from)}, so every dollar of a typical family home above that value is taxed at the top rate. The ${h.a('sa', 'SA stamp duty calculator')} shows the full scale band by band.</p>

<h2>What the relief leaves untouched</h2>
<p>Two charges survive. The first is the foreign ownership surcharge: ${h.pct(s.surcharge, 0)} of the value of any share acquired by a foreign person, charged on top of stamp duty and not covered by the first home relief. RevenueSA's worked example at ${h.aud(600000)} gives ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).duty)} of duty and ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)} of surcharge, ${h.duty('sa', 600000, 'investor', 'established', true)} in total. For a couple where one partner is foreign, the surcharge falls on that partner's share; the ${h.a('foreign-buyer-stamp-duty', 'foreign buyer guide')} explains how shares are counted elsewhere.</p>
<p>The second is the occupancy condition. The property must become your principal place of residence for at least six continuous months, starting within twelve months. A plan to let a new apartment for its first year and move in afterwards would miss that window.</p>

<h2>The grant that sits beside the relief</h2>
<p>The First Home Owner Grant is a payment rather than a duty saving. In South Australia it is worth up to ${h.aud(s.fhog.amount)} for a new home and, since ${h.date(FHOG_NO_CAP_FROM)}, has no price cap either. It is not paid on vacant land purchased by itself. On a ${h.aud(700000)} new home, the duty relief saves ${h.duty('sa', 700000, 'owner', 'new')} and the grant adds ${h.aud(h.calc('sa', 700000, 'first', 'new').grant.amount)}, which together approach ${h.aud(h.calc('sa', 700000, 'owner', 'new').total + h.calc('sa', 700000, 'first', 'new').grant.amount)} of support for one purchase.</p>
<!--mini:grantState-->
<p>The grant calculator above opens on South Australia: enter your own price to see the grant against the duty, then switch to Queensland, which caps its grant on price, to see the difference.</p>

<h2>Land now, house later</h2>
<p>Buying a block to build on is covered by the duty relief at the time of the land purchase, assessed on the land price. The grant comes into play only for the home itself. A buyer paying ${h.aud(300000)} for land in a growth suburb north of Adelaide saves ${h.duty('sa', 300000, 'owner', 'vacant')} in duty on the block. The ${h.a('vacant-land-stamp-duty', 'vacant land guide')} compares how each state treats land bought by a first home buyer, several of which, unlike SA, still apply a value limit.</p>

<h2>Where SA sits among the states</h2>
<p>For a new home, South Australia is among the most generous jurisdictions: a first home buyer at ${h.aud(900000)} pays nothing here, ${h.duty('qld', 900000, 'first', 'new')} in Queensland, ${h.duty('nsw', 900000, 'first', 'new')} in New South Wales and ${h.duty('vic', 900000, 'first', 'new')} in Victoria. For an established home the ranking flips. At ${h.aud(600000)} the SA buyer pays ${h.duty('sa', 600000, 'first')}, where the same buyer in Victoria or New South Wales pays ${h.duty('vic', 600000, 'first')} and ${h.duty('nsw', 600000, 'first')}. The ${h.a('first-home-buyer-stamp-duty', 'first home buyer comparison')} runs the eight jurisdictions for any price.</p>

<h2>Downsizing seniors: a separate relief</h2>
<p>South Australia also introduced a relief for people aged 60 and over, for contracts from ${h.date(s.seniors_from)}. It applies when a senior sells their principal place of residence and buys a new home, an off-the-plan apartment or land to build on, on a smaller block. The relief is worth up to ${h.aud(s.seniors_max_relief)}, which is the duty this scale gives at ${h.aud(2000000)}. RevenueSA's notice sets out the conditions in more detail than we have verified, so the calculator does not model it; the ${h.a('pensioner-downsizer-stamp-duty', 'pensioner and downsizer guide')} compares the states that still offer something.</p>
`;
  },
  related: ['sa', 'first-home-buyer-stamp-duty', 'new-vs-established', 'first-home-owner-grant', 'vacant-land-stamp-duty', 'pensioner-downsizer-stamp-duty'],
  sources: ['sa_fhb_relief', 'sa_fhb_properties', 'sa_fos', 'sa_fhog', 'sa_seniors', 'sa_rates'],
});
