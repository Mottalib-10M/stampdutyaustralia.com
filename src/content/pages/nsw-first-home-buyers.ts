import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nsw-first-home-buyers',
  path: '/nsw/first-home-buyers/',
  group: 'nsw',
  kind: 'guide',
  order: 20,
  mini: 'fhbState',
  nav: 'NSW first home buyers',
  card: 'FHBAS exemption to $800,000, the fade to $1 million, land thresholds, residence rules and the $10,000 grant.',
  title: 'First Home Buyer Stamp Duty NSW 2026: FHBAS to $800,000',
  description: 'First home buyer stamp duty NSW 2026: no transfer duty to $800,000 on a home or $350,000 on land, a sliding concession above, and the $10,000 new homes grant.',
  h1: 'First home buyer stamp duty in NSW',
  intro: 'How the First Home Buyers Assistance Scheme removes or trims transfer duty, who qualifies, and what the residence rule asks of you after settlement.',
  resume: (h) => `A first home buyer in New South Wales pays no transfer duty on a home valued up to ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}, or on vacant land up to ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)}, under the First Home Buyers Assistance Scheme (FHBAS) run by Revenue NSW. Above those figures the relief does not stop at once: it tapers, so a ${h.aud(900000)} home costs a first buyer ${h.duty('nsw', 900000, 'first')} instead of ${h.duty('nsw', 900000, 'owner')}, and the benefit disappears at ${h.aud(h.P.states.nsw.fhbas.home_cap)} for a home and ${h.aud(h.P.states.nsw.fhbas.land_cap)} for land. To qualify you must be an individual aged 18 or over, neither you nor your spouse may have owned residential property in Australia, and at least one buyer must be an Australian citizen or permanent resident. You then have to move in within 12 months of settlement and stay for ${h.P.states.nsw.fhbas.residence_months} continuous months. A new home priced up to ${h.aud(h.P.states.nsw.fhog.new_home_cap)} can also attract the ${h.aud(h.P.states.nsw.fhog.amount)} First Home Owner (New Homes) Grant.`,
  faqs: (h) => [
    { q: 'How much NSW transfer duty does a first home buyer pay on $850,000?', a: `${h.duty('nsw', 850000, 'first')}, against ${h.duty('nsw', 850000, 'owner')} for a buyer who has owned before. The price is ${h.aud(50000)} past the exemption threshold, so the FHBAS still removes three quarters of the duty that applies at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)}. The formula behind it is the one we matched against Revenue NSW's own First Home Buyers Assistance calculator.` },
    { q: 'Can I get the NSW first home exemption if my partner owned a flat before?', a: 'No, not under the FHBAS as Revenue NSW describes it. The rule looks at both of you: neither the buyer nor the buyer\'s spouse or de facto partner may have held residential property in Australia before. A partner who sold a property years ago still counts as a former owner, and a home owned overseas is not part of the test.' },
    { q: 'What happens in NSW if I do not move into my first home within 12 months?', a: `The concession depends on a promise to live there. For contracts from 1 July 2023 you must start living in the home within 12 months of settlement and keep it as your residence for ${h.P.states.nsw.fhbas.residence_months} months in a row. Miss it and the concession rests on a condition you no longer meet, so Revenue NSW can reassess at the ordinary scale, which on a ${h.aud(800000)} home is ${h.duty('nsw', 800000, 'owner')}.` },
    { q: 'Does the NSW first home scheme apply when buying with a parent?', a: 'It can, through the shared equity rules. If the eligible first home buyers acquire at least half of the property, the concession is applied to their share. The remaining share can be taken by someone else, such as a parent who already owns a home. The arrangement is not available when the other buyer is your own spouse and that spouse is not eligible.' },
    { q: 'Is a block of land in NSW treated like a house for first home duty?', a: `No. Land has its own lower thresholds: full exemption to ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)}, a concession up to ${h.aud(h.P.states.nsw.fhbas.land_cap)}. On a ${h.aud(400000)} lot a first home buyer pays ${h.duty('nsw', 400000, 'first', 'vacant')}, where the same price for a finished home would be free of duty. You must intend to build and live there.` },
    { q: 'Do NSW first home buyers in the Defence Force have to live in the home?', a: 'Members of the Australian Defence Force are exempt from the residence requirement of the FHBAS, so a posting elsewhere does not cost them the concession. Everything else still applies in full: being 18 or over, never having owned residential property in Australia, and having at least one citizen or permanent resident among the buyers.' },
  ],
  body: (h) => `
<h2>Three price zones, two property types</h2>
<p>The FHBAS divides every first purchase into three zones. Below the exemption threshold the duty is nil. Between the threshold and the cap it is reduced. At the cap and above, the ordinary scale applies and being a first buyer makes no difference to the duty. The thresholds are not the same for an established or new dwelling and for vacant land on which you will build, and the land figures are far lower than the home figures.</p>
${h.table(['', 'Home (new or existing)', 'Vacant land to build on'], [['No duty up to', h.aud(h.P.states.nsw.fhbas.home_exempt_to), h.aud(h.P.states.nsw.fhbas.land_exempt_to)], ['Concession up to', h.aud(h.P.states.nsw.fhbas.home_cap), h.aud(h.P.states.nsw.fhbas.land_cap)], ['Duty at the threshold if you were not eligible', h.duty('nsw', h.P.states.nsw.fhbas.home_exempt_to, 'owner'), h.duty('nsw', h.P.states.nsw.fhbas.land_exempt_to, 'owner', 'vacant')]], 'FHBAS thresholds for contracts from 1 July 2026', ['l', 'r', 'r'])}

<h2>The taper, worked out the way Revenue NSW does it</h2>
<p>Inside the concession zone there is no separate rate table. The office starts with the full duty on your price, then subtracts a slice of the duty that would apply at the exemption threshold. The slice is largest just above the threshold and shrinks evenly to nothing at the cap. Written out for a home: saving = duty on ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} × (${h.aud(h.P.states.nsw.fhbas.home_cap)} − price) ÷ ${h.aud(h.P.states.nsw.fhbas.home_cap - h.P.states.nsw.fhbas.home_exempt_to)}. For land, swap in ${h.aud(h.P.states.nsw.fhbas.land_exempt_to)} and ${h.aud(h.P.states.nsw.fhbas.land_cap)}.</p>
<p>We ran that formula against the ${h.src('nsw_fhbas_calc', 'Revenue NSW First Home Buyers Assistance calculator')} at eight prices on 5 October 2026 and it agreed to the cent each time. The table below comes from the same engine.</p>
${h.table(['Price of the home', 'First home buyer', 'Previous owner', 'FHBAS saving'], [700000, 800000, 850000, 900000, 950000, 990000].map((p) => [h.aud(p), h.duty('nsw', p, 'first'), h.duty('nsw', p, 'owner'), h.aud(h.calc('nsw', p, 'first').saving)]), 'Transfer duty on a home, 2026/27 thresholds', ['l', 'r', 'r', 'r'])}
<p>Read the last column from top to bottom. At ${h.aud(800000)} the scheme saves ${h.aud(h.calc('nsw', 800000, 'first').saving)}; at ${h.aud(900000)} it saves ${h.aud(h.calc('nsw', 900000, 'first').saving)}, half of that; at ${h.aud(990000)} only ${h.aud(h.calc('nsw', 990000, 'first').saving)} is left. Each extra ${h.aud(10000)} on the contract inside this band therefore costs the buyer the ordinary duty on ${h.aud(10000)} plus about ${h.aud(h.calc('nsw', 800000, 'first').saving / 20)} of lost concession, which is why negotiating a few thousand dollars off a price just above ${h.aud(800000)} is worth more to a first buyer than to anyone else.</p>

<h2>Land: lower numbers, same mechanics</h2>
<p>On vacant land the duty itself is modest, but the window is narrow. A ${h.aud(350000)} block carries no duty for an eligible buyer, a ${h.aud(400000)} block carries ${h.duty('nsw', 400000, 'first', 'vacant')}, and at ${h.aud(450000)} the concession is gone: ${h.duty('nsw', 450000, 'first', 'vacant')}, exactly what a previous owner pays.</p>
<!--mini:landState-->

<h2>Who the scheme is for</h2>
<p>Revenue NSW's ${h.src('nsw_fhbas', 'scheme page')} lists the conditions. Every buyer claiming it must:</p>
<ul>
<li>be an individual, not a company or a trustee, and be 18 or older (the office can waive the age rule);</li>
<li>never have owned residential property in Australia, and neither may a spouse or de facto partner;</li>
<li>not have received the benefit of the scheme before;</li>
<li>buy with at least one co-buyer who is an Australian citizen or permanent resident, or be one.</li>
</ul>
<p>Ownership overseas does not count against you; the test is about Australian residential property. A foreign co-buyer can sit alongside an eligible citizen, but the scheme does not touch the ${h.pct(h.P.states.nsw.surcharge, 0)} surcharge charged on that person's share, which is covered on the ${h.a('nsw-foreign-purchaser', 'NSW surcharge purchaser duty page')}.</p>

<h3>The residence promise</h3>
<p>For contracts dated 1 July 2023 or later, you must move in within 12 months of settlement and then live there for ${h.P.states.nsw.fhbas.residence_months} months without a break. Members of the Australian Defence Force are exempt from this part. Renting the place out from the start, or leaving before the period runs, breaks the condition the concession was granted on.</p>

<h3>Shared equity and buying with family</h3>
<p>A first home buyer who cannot fund the purchase alone can still use the FHBAS if the eligible buyers together take at least half of the property. The concession is then applied to their share only. Shared equity is not available when the co-buyer is a spouse or partner who fails the tests.</p>

<h2>Adding the grant on a new home</h2>
<p>The ${h.src('nsw_fhog', 'First Home Owner (New Homes) Grant')} is a separate payment of ${h.aud(h.P.states.nsw.fhog.amount)}. It covers a new home with a value up to ${h.aud(h.P.states.nsw.fhog.new_home_cap)}, or land plus a building contract with a combined value up to ${h.aud(h.P.states.nsw.fhog.build_cap)}. You have to occupy the home for 12 continuous months starting within 12 months, and apply within 12 months of settlement. A new ${h.aud(600000)} apartment is therefore duty free and brings ${h.aud(h.calc('nsw', 600000, 'first', 'new').grant.amount)} back; a new ${h.aud(650000)} one is still duty free but misses the grant. Established homes never qualify for it. The national picture is on the ${h.a('first-home-owner-grant', 'grant comparison page')}.</p>

<h2>Paying, and what happens off the plan</h2>
<p>When the price is above the exemption, the reduced duty is due on the usual NSW timetable: three months from the contract, or at settlement if earlier. An off-the-plan first home can push that date out by up to 12 more months; the conditions differ from the FHBAS and are on the ${h.a('nsw-off-the-plan', 'NSW off-the-plan page')}.</p>
`,
  related: ['nsw', 'nsw-off-the-plan', 'nsw-foreign-purchaser', 'first-home-owner-grant', 'first-home-buyer-stamp-duty', 'vic-first-home-buyers'],
  sources: ['nsw_fhbas', 'nsw_fhbas_calc', 'nsw_fhog', 'nsw_rates'],
});
