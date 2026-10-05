import { definePage } from '../../lib/page-types';

export default definePage({
  id: 'nt-house-and-land',
  path: '/nt/house-and-land-package-exemption/',
  group: 'nt',
  kind: 'guide',
  order: 30,
  mini: 'ntGrants',
  nav: 'NT house and land exemption',
  card: 'No stamp duty on a house and land package bought from a building contractor in one deal, contracts to 30 June 2027.',
  title: 'House and Land Package Exemption NT 2026: No Duty, No Cap',
  description: 'NT House and Land Package Exemption 2026: no stamp duty on a house and land bought from a builder in one deal, no means test or cap, contracts to 30 June 2027.',
  h1: 'House and Land Package Exemption in the Northern Territory',
  intro: 'Buy the block and the new house together from a building contractor, live in it, and the Territory charges no stamp duty on the purchase.',
  resume: (h) => {
    const n = h.P.states.nt;
    return `The Northern Territory's House and Land Package Exemption removes all stamp duty when a home and the land under it are bought together from a building contractor in a single transaction, for contracts from ${h.date(n.hlpe.from)} to ${h.date(n.hlpe.until)}. There is no means test and no price cap. The buyer has to move in within 12 months of the home's completion and live there for six continuous months. The saving is the duty the Territory's formula would otherwise charge on the full package price: ${h.duty('nt', 550000, 'owner', 'new')} on a ${h.aud(550000)} package in Palmerston, ${h.duty('nt', 800000, 'owner', 'new')} on an ${h.aud(800000)} one in Darwin. The exemption is not limited to first home buyers, so it stacks with either new home grant: ${h.aud(n.fhog.amount)} HomeGrown for a first home or ${h.aud(n.freshstart.amount)} FreshStart for anyone else, for contracts to ${h.date(n.fhog.until)}. Buying the land from one party and the house from another, or buying an established home, falls outside it, and stamp duty is then due within ${n.payment_days} days of signing or at settlement if earlier.`;
  },
  faqs: (h) => {
    const n = h.P.states.nt;
    return [
      { q: 'Do I need to be a first home buyer for the NT House and Land Package Exemption?', a: `No. The exemption has no first home requirement and no means test. A family upgrading from an older house in Nightcliff to a ${h.aud(720000)} package in Muirhead qualifies on the same terms as a first buyer, saving ${h.duty('nt', 720000, 'owner', 'new')} in duty. What matters is the structure of the deal and living in the home afterwards, not the buyer's history.` },
      { q: 'Does the NT house and land exemption apply if I buy the land and house from different companies?', a: `No. The Territory's condition is that the house and land are bought from a building contractor in one transaction. Buying a block from a land developer and then signing a separate building contract with a builder is two transactions, and duty is charged on the land purchase: ${h.duty('nt', 280000, 'owner', 'vacant')} on a ${h.aud(280000)} lot.` },
      { q: 'How long must I live in an NT house and land package to keep the exemption?', a: `Six continuous months, starting within 12 months of the home's completion. The clock starts at completion of the dwelling rather than at the contract, which suits a package where the home may take a year or more to build. An investor who lets the house from completion does not meet the condition and pays duty on the formula, ${h.duty('nt', 650000, 'investor', 'new')} on ${h.aud(650000)}.` },
      { q: 'Is there a maximum price for the NT House and Land Package Exemption?', a: `No. The exemption has no value cap, so a ${h.aud(1200000)} package is exempt just like a ${h.aud(500000)} one. On the dearer package that is ${h.duty('nt', 1200000, 'owner', 'new')} of duty removed. The only time limit is the contract date, which must fall between ${h.date(n.hlpe.from)} and ${h.date(n.hlpe.until)}.` },
      { q: 'Can I still sign an NT house and land package after 30 June 2027?', a: `You can sign, but the exemption only covers contracts dated from ${h.date(n.hlpe.from)} to ${h.date(n.hlpe.until)}. A later package is assessed on the Territory formula unless the scheme is extended: ${h.duty('nt', 600000, 'owner', 'new')} on a ${h.aud(600000)} package. The HomeGrown and FreshStart grants run a little longer, to contracts dated ${h.date(n.fhog.until)}, so a grant may still be available when the duty exemption is not.` },
    ];
  },
  body: (h) => {
    const n = h.P.states.nt, f = n.formula;
    const prices = [400000, 500000, f.upto, 650000, 800000, 1000000];
    return `
<h2>One seller, one contract, one dwelling to live in</h2>
<p>The exemption turns on how the purchase is put together rather than on who the buyer is. The Territory sets three conditions. The house and land have to be bought from a building contractor. They have to be bought in one transaction, not as a land contract followed by a build contract with someone else. And the buyer has to live in the home, moving in within 12 months of completion and staying for six continuous months. Income, price and past ownership are not tested. Contracts must be dated between ${h.date(n.hlpe.from)} and ${h.date(n.hlpe.until)}.</p>
<p>The calculator above shows the effect: set the price, answer whether this is a first home, and switch the house and land package question to Yes. The duty line drops to zero and the grant line stays where it was.</p>

<h2>The duty you avoid: the Territory formula</h2>
<p>Northern Territory stamp duty is not built from bands like the other states. Up to ${h.aud(f.upto)}, the official calculator applies a quadratic formula: with V equal to the value divided by 1,000, duty is (${h.num(f.a, 8)} × V²) + ${h.num(f.b)} × V. Above ${h.aud(f.upto)} it switches to a flat percentage of the whole value: ${h.pct(n.flat_bands[0].rate, 2)}, rising to ${h.pct(n.flat_bands[1].rate, 2)} from ${h.aud(n.flat_bands[1].from)} and ${h.pct(n.flat_bands[2].rate, 2)} from ${h.aud(n.flat_bands[2].from)}. The two parts meet exactly at ${h.aud(f.upto)}, where both give ${h.duty('nt', f.upto, 'owner')}.</p>
${h.table(['Package price', 'Duty on the formula', 'With the exemption', 'Effective rate avoided'], prices.map((p) => { const r = h.calc('nt', p, 'owner', 'new'); return [h.aud(p), h.aud(r.total), h.duty('nt', p, 'owner', 'new', false, { ntPackage: true }), h.pct(r.total / p, 2)]; }), 'Northern Territory stamp duty on a new house and land package', ['l', 'r', 'r', 'r'])}
<p>The effective rate climbs smoothly up to ${h.aud(f.upto)} and then holds at ${h.pct(n.flat_bands[0].rate, 2)}. Between ${h.aud(500000)} and ${h.aud(800000)}, the range of many new homes on the edge of Darwin and Palmerston, the exemption is worth between ${h.duty('nt', 500000, 'owner', 'new')} and ${h.duty('nt', 800000, 'owner', 'new')}.</p>

<h2>Adding the grant</h2>
<p>The exemption and the new home grants answer different questions, so a buyer can have both. A first home buyer taking a ${h.aud(600000)} package keeps the full ${h.aud(n.fhog.amount)} HomeGrown grant and pays no duty, where buying the same house on a separately purchased lot would mean paying duty on the land. A buyer who has owned before receives ${h.aud(n.freshstart.amount)} under FreshStart on the same terms. Both grants need contracts by ${h.date(n.fhog.until)}, three months after the package exemption's own deadline of ${h.date(n.hlpe.until)}.</p>
${h.table(['Package price', 'First home: grant, no duty', 'Not a first home: grant, no duty', 'Investor: duty, no grant'], [500000, 650000, 800000].map((p) => [h.aud(p), h.aud(h.calc('nt', p, 'first', 'new', false, { ntPackage: true }).grant.amount), h.aud(h.calc('nt', p, 'owner', 'new', false, { ntPackage: true }).grant.amount), h.duty('nt', p, 'investor', 'new')]), 'Northern Territory, house and land package, contracts to 30 June 2027', ['l', 'r', 'r', 'r'])}
<p>The investor column is there for contrast: without the residence condition, the package is taxed on the formula and no grant is paid.</p>

<h2>A package priced line by line</h2>
<p>Take a ${h.aud(680000)} four-bedroom package in Zuccoli, bought by a couple who have never owned a home. Under the exemption the stamp duty line on their settlement statement is nil instead of ${h.duty('nt', 680000, 'first', 'new')}. HomeGrown adds ${h.aud(n.fhog.amount)}. Had they bought a ${h.aud(270000)} lot from a developer and signed separately with a builder, the land contract alone would have carried ${h.duty('nt', 270000, 'first', 'vacant')} of duty, payable within ${n.payment_days} days, long before the slab was poured. The grant would be the same on either route; the duty is what differs.</p>
<p>For a buyer selling an older home to move into a new package, the arithmetic is similar with FreshStart's ${h.aud(n.freshstart.amount)} in place of HomeGrown. On an ${h.aud(850000)} package the duty saved, ${h.duty('nt', 850000, 'owner', 'new')}, is larger than the grant itself.</p>

<h2>Where buyers lose the exemption</h2>
<p>Three situations fall outside it. The first is splitting the deal: land from a developer, house from a builder, two contracts. The exemption's wording requires one transaction with a building contractor. The second is an established home, bought from its owner rather than from a building contractor. The third is timing on the other end: a buyer who does not move in within 12 months of completion, or moves out before six continuous months, no longer meets the residence condition. For each, the duty is the formula figure in the first table.</p>
<p>A deadline is also approaching. The exemption covers contracts to ${h.date(n.hlpe.until)}. A package signed after that date is assessed on the formula unless the Territory extends the scheme; check the official page before relying on a later contract.</p>

<h2>When duty is payable</h2>
<p>For purchases outside the exemption, Territory stamp duty is due within ${n.payment_days} days of signing, or at settlement if that comes first. For land bought on its own to build a first home, that means finding the land duty well before the house is finished. The ${h.a('nt', 'NT stamp duty calculator')} handles every case; the ${h.a('house-and-land-package-stamp-duty', 'house and land package guide')} explains how the other states assess the same kind of purchase.</p>
`;
  },
  related: ['nt', 'nt-homegrown-grant', 'house-and-land-package-stamp-duty', 'new-vs-established', 'vacant-land-stamp-duty'],
  sources: ['nt_hlpe', 'nt_calc', 'nt_stamp_duty', 'nt_homegrown'],
});
