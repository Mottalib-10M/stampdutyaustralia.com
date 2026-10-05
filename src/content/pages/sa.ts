import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'sa',
  path: '/sa/',
  group: 'sa',
  kind: 'hub',
  order: 10,
  tool: 'sa',
  nav: 'SA calculator',
  card: 'Stamp duty in South Australia: an unindexed scale, full first home relief on new homes, 7 % foreign surcharge.',
  title: 'Stamp Duty SA 2026-27: Conveyance Duty and First Home Relief',
  description: 'Stamp duty SA for 2026-27: an unindexed scale with 5.5% above $500,000, no duty on a first new home or land at any price, and a 7% foreign ownership surcharge.',
  h1: 'Stamp duty calculator South Australia',
  intro: 'Stamp duty on a South Australian purchase: the conveyance scale, first home buyer relief, the foreign ownership surcharge, the grant and the seniors downsizing relief.',
  resume: (h) => `South Australia charges stamp duty on property with a conveyance scale that RevenueSA does not index, so the thresholds do not move from one year to the next: everything above ${h.aud(h.P.states.sa.brackets[8].from)} is taxed at $${h.num(h.P.states.sa.brackets[8].rate * 100, 2)} per $100, and a ${h.aud(800000)} established home costs ${h.duty('sa', 800000)} whoever buys it. There is no general concession for owner-occupiers. The relief goes to first home buyers of a new home, an off-the-plan apartment or land to build on: for contracts from 13 February 2025 they pay no stamp duty at all, with no value cap. A first home buyer of an established house gets nothing and pays the full scale. Foreign buyers add a ${h.pct(h.P.states.sa.surcharge, 0)} foreign ownership surcharge on their share, which the first home relief does not remove. Separately, the First Home Owner Grant pays up to ${h.aud(h.P.states.sa.fhog.amount)} on a new home, with no price cap.`,
  faqs: (h) => [
    { q: 'Does South Australia index its stamp duty thresholds?', a: `No. The conveyance scale is not indexed, so the top threshold of ${h.aud(h.P.states.sa.brackets[8].from)} is the same as in the RevenueSA table captured in January 2022. RevenueSA's notice of 28 April 2026 confirms it indirectly: the seniors relief is capped at ${h.aud(h.P.states.sa.seniors_max_relief)}, which is exactly what the scale gives on ${h.aud(2000000)}. Every price rise therefore pushes more of the value into the ${h.pct(h.P.states.sa.brackets[8].rate)} band.` },
    { q: 'Do SA first home buyers pay stamp duty on an established house?', a: `Yes, in full. RevenueSA's first home buyer relief covers new homes, off-the-plan apartments and vacant land for building only. A first home buyer paying ${h.aud(550000)} for an existing house pays ${h.duty('sa', 550000, 'first')}, exactly what an investor pays. The same buyer choosing a new home at that price pays nothing and may also receive the grant.` },
    { q: 'Is there a price cap on SA first home buyer relief for a new home?', a: `No. For contracts signed from 13 February 2025 the relief is total and has no value cap on an eligible new home, off-the-plan apartment or block of land for building. A ${h.aud(1000000)} new house saves an eligible first home buyer ${h.aud(h.calc('sa', 1000000, 'first', 'new').saving)}. You must live in it for six continuous months, starting within 12 months.` },
    { q: 'How much is the SA foreign ownership surcharge on $600,000?', a: `${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)}, which is ${h.pct(h.P.states.sa.surcharge, 0)} of the value, on top of ${h.duty('sa', 600000, 'investor')} of ordinary stamp duty. That is RevenueSA's own example, for ${h.duty('sa', 600000, 'investor', 'established', true)} in total. When a foreign person buys only a share, the surcharge applies to that share. First home buyer relief does not reduce the surcharge.` },
    { q: 'Can I get the SA First Home Owner Grant on vacant land?', a: `Not on the land alone. The grant of up to ${h.aud(h.P.states.sa.fhog.amount)} is paid on a new home, and since 6 June 2024 there is no value cap. A buyer who signs a building contract for a new home on the land can become eligible through that contract. The land purchase itself can still be free of stamp duty under the first home buyer relief.` },
    { q: 'What is the SA seniors downsizing stamp duty relief?', a: `For contracts from ${h.date(h.P.states.sa.seniors_from)}, a person aged 60 or over who sells their principal place of residence and buys a new home, an off-the-plan apartment or land to build on, on a smaller parcel of land, can get stamp duty relief of up to ${h.aud(h.P.states.sa.seniors_max_relief)}. RevenueSA's notice sets the limit; check its full conditions before you sign.` },
  ],
  body: (h) => `
<h2>A scale that has not moved</h2>
<p>RevenueSA's conveyance table has nine bands, and its thresholds are the same today as in the version we read. We read it from RevenueSA's own page (an archived capture from January 2022, because the site refuses automated readers) and checked it against the seniors relief cap published on 28 April 2026, which matches the duty on ${h.aud(2000000)} to the dollar.</p>
${h.table(['Value', 'Stamp duty'], h.P.states.sa.brackets.map((b, i, all) => [i < all.length - 1 ? `${h.aud(b.from)} to ${h.aud(all[i + 1].from)}` : `over ${h.aud(b.from)}`, b.from === 0 ? `$${h.num(b.rate * 100, 2)} per $100` : `${h.aud(b.base)} plus $${h.num(b.rate * 100, 2)} per $100 over ${h.aud(b.from)}`]), 'South Australian stamp duty on conveyances, all buyers', ['l', 'l'])}
<p>Because the top band begins at ${h.aud(h.P.states.sa.brackets[8].from)}, most of the prices discussed on this site fall inside it. The marginal rate on the next dollar is ${h.pct(h.P.states.sa.brackets[8].rate)} from ${h.aud(h.P.states.sa.brackets[8].from)} upwards, with no higher band for luxury homes.</p>

<h2>South Australian duty by buyer and property type</h2>
${h.table(['Price', 'Established, any buyer', 'First home, new', 'First home, established', 'Foreign buyer'], [300000, 500000, 600000, 800000, 1000000, 2000000].map((p) => [h.aud(p), h.duty('sa', p, 'owner'), h.duty('sa', p, 'first', 'new'), h.duty('sa', p, 'first'), h.duty('sa', p, 'investor', 'established', true)]), 'Contracts signed in 2026-27, surcharge included in the last column', ['l', 'r', 'r', 'r', 'r'])}
<p>The two first home columns tell the whole story. On ${h.aud(600000)} the gap between a new and an established first home is ${h.duty('sa', 600000, 'first')}; on ${h.aud(1000000)} it is ${h.duty('sa', 1000000, 'first')}. That gap is what choosing an existing house costs a first home buyer in South Australia.</p>

<h2>First home buyer relief</h2>
<p>For contracts signed from 13 February 2025, an eligible first home buyer pays no stamp duty on a new home, an off-the-plan apartment or vacant land on which a home will be built, whatever the price. Established homes are excluded, and the relief never applies to the foreign ownership surcharge. You must occupy the home for a continuous six months, starting within 12 months. See the property types side by side:</p>
<!--mini:propertyTypeState-->
<p>The eligibility conditions are set out on the ${h.a('sa-first-home-buyers', 'SA first home buyer page')}.</p>

<h2>The First Home Owner Grant</h2>
<p>The grant is worth up to ${h.aud(h.P.states.sa.fhog.amount)} on a new home, and since 6 June 2024 there is no value cap. It is not paid on vacant land alone. Paired with the duty relief, a first home buyer building new at ${h.aud(700000)} saves ${h.aud(h.calc('sa', 700000, 'first', 'new').saving)} of duty and receives the grant on top.</p>

<h2>Foreign ownership surcharge</h2>
<p>A foreign person pays an extra ${h.pct(h.P.states.sa.surcharge, 0)} of the value of the interest they acquire. RevenueSA's worked example uses ${h.aud(600000)}: ${h.duty('sa', 600000, 'investor')} of duty plus ${h.aud(h.calc('sa', 600000, 'investor', 'established', true).surcharge)} of surcharge.</p>

<h2>Seniors downsizing relief from 25 March 2026</h2>
<p>Buyers aged 60 and over who sell their principal place of residence and buy a new home, an off-the-plan apartment or land to build on, on a smaller block than before, can claim relief of up to ${h.aud(h.P.states.sa.seniors_max_relief)} for contracts from ${h.date(h.P.states.sa.seniors_from)}. RevenueSA has published the cap; we have not been able to read its detailed conditions, so we do not model this relief in the calculator. The ${h.a('pensioner-downsizer-stamp-duty', 'downsizer page')} compares it with the other states.</p>

<h2>South Australia among the eight</h2>
<p>For a repeat buyer of an established home, South Australia is one of the dearer places to buy: ${h.duty('sa', 800000)} on ${h.aud(800000)}, against ${h.duty('wa', 800000)} in WA and ${h.duty('nsw', 800000)} in NSW. For a first home buyer choosing new, it is among the cheapest. The ${h.a('home', 'eight-state comparison')} shows your own case.</p>
`,
  related: ['sa-first-home-buyers', 'new-vs-established', 'first-home-owner-grant', 'foreign-buyer-stamp-duty', 'pensioner-downsizer-stamp-duty', 'wa'],
  sources: ['sa_rates', 'sa_fhb_relief', 'sa_fhb_properties', 'sa_fos', 'sa_fhog', 'sa_seniors'],
});
