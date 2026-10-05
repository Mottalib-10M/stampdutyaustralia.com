import { definePage } from '../../lib/page-types';

const ST = [['nsw', 'New South Wales'], ['vic', 'Victoria'], ['qld', 'Queensland'], ['wa', 'Western Australia'], ['sa', 'South Australia'], ['tas', 'Tasmania'], ['act', 'ACT'], ['nt', 'Northern Territory']] as const;

export default definePage({
  id: 'price-1000000',
  path: '/prices/stamp-duty-on-1000000/',
  group: 'prices',
  kind: 'price',
  order: 60,
  mini: 'priceCheck',
  nav: 'Duty on $1 million',
  card: 'Stamp duty on a $1 million home: the NSW first home cap, a new Queensland band and Victoria at 5.5 % of the whole price.',
  title: 'Stamp Duty on $1 Million 2026: State by State Figures',
  description: 'Stamp duty on a $1 million home in 2026: $55,000 in Victoria, $30,850 for a Queensland owner-occupier, full duty for a NSW first home buyer, a 5.75% QLD band.',
  h1: 'Stamp duty on $1 million',
  intro: 'A million dollars is where the NSW first home concession runs out and where Queensland and the ACT move into their top marginal bands. Here is the bill in each state.',
  resume: (h) => `A ${h.aud(1000000)} purchase is the point where the last of the price-capped first home duty concessions closes. In New South Wales the First Home Buyers Assistance Scheme has faded to nothing at its ${h.aud(h.P.states.nsw.fhbas.home_cap)} cap, so a first home buyer pays the full ${h.duty('nsw', 1000000, 'first')}. From here on, only schemes without a value cap still help a first home buyer: Queensland and South Australia on new homes, and the ACT's Home Buyer Concession Scheme on any home. Two scales step up at this exact figure. Queensland's top marginal rate of $${h.num(h.P.states.qld.brackets[4].rate * 100, 2)} per $100 starts at ${h.aud(h.P.states.qld.brackets[4].from)}, and so does the ACT's band of $${h.num(h.P.states.act.owner_brackets[5].rate * 100, 2)} per $100. Victoria is already charging ${h.pct(h.P.states.vic.brackets[3].rate)} on the whole price: ${h.duty('vic', 1000000)}. A repeat owner-occupier pays the least in Queensland, ${h.duty('qld', 1000000)}.`,
  faqs: (h) => [
    { q: 'Does a NSW first home buyer pay full duty on a $1 million home?', a: `Yes. The NSW concession fades from a full exemption at ${h.aud(h.P.states.nsw.fhbas.home_exempt_to)} to nothing at ${h.aud(h.P.states.nsw.fhbas.home_cap)}, and the cap itself is outside the scheme. A first home buyer therefore pays the general ${h.duty('nsw', 1000000, 'first')}, the same as any other buyer. At ${h.aud(990000)} the concession would still be worth ${h.aud(h.calc('nsw', 990000, 'first').saving)}.` },
    { q: 'What marginal rate applies above $1 million in Queensland?', a: `$${h.num(h.P.states.qld.brackets[4].rate * 100, 2)} for every $100, or part of $100, above ${h.aud(h.P.states.qld.brackets[4].from)}, on both the general and the home concession scales. Below that line the rate is $${h.num(h.P.states.qld.brackets[3].rate * 100, 2)}. An owner-occupier at ${h.aud(1000000)} pays ${h.duty('qld', 1000000)}; at ${h.aud(1100000)} the bill is ${h.duty('qld', 1100000)}, so that extra ${h.aud(100000)} costs the full top rate.` },
    { q: 'Can a first home buyer in northern WA get the grant on a $1 million new home?', a: `Yes. Since ${h.date(h.P.states.wa.fhor.from)} the ${h.aud(h.P.states.wa.fhog.amount)} WA grant applies to a new home up to ${h.aud(h.P.states.wa.fhog.cap_north)} north of the 26th parallel, and ${h.aud(h.P.states.wa.fhog.cap_south)} in Perth and the south. The duty is a different story: the first home owner rate stops at ${h.aud(h.P.states.wa.fhor.home_cap)}, so the buyer pays the general ${h.duty('wa', 1000000, 'first', 'new')}.` },
    { q: 'Which states charge no duty on a new $1 million first home?', a: `Queensland, South Australia and the ACT, for an eligible first home buyer. Queensland's first home (new home) concession and South Australia's relief have no value cap, and the ACT scheme has had none since ${h.date(h.P.states.act.hbcs.from)}. In the Northern Territory a house and land package from a builder is exempt too, and the ${h.aud(h.P.states.nt.fhog.amount)} HomeGrown grant exceeds the ${h.duty('nt', 1000000, 'first', 'new')} duty otherwise payable.` },
  ],
  body: (h) => `
<h2>A million dollars, four buyers</h2>
${h.table(['State or territory', 'Owner-occupier', 'Investor', 'First home buyer, new home', 'Foreign investor'], ST.map(([s, n]) => [n, h.duty(s, 1000000, 'owner'), h.duty(s, 1000000, 'investor'), h.duty(s, 1000000, 'first', 'new'), h.duty(s, 1000000, 'investor', 'established', true)]), 'Duty on $1,000,000, contracts in 2026-27; new home figures exclude any grant', ['l', 'r', 'r', 'r', 'r'])}
<p>The investor column ranges from ${h.duty('act', 1000000, 'investor')} in the ACT to ${h.duty('vic', 1000000, 'investor')} in Victoria. The owner-occupier column differs from it in only two places, Queensland and the ACT, and by a fixed amount in each: ${h.aud(h.calc('qld', 1000000).saving)} in Queensland and ${h.aud(h.calc('act', 1000000, 'investor').total - h.calc('act', 1000000).total)} in the ACT.</p>

<h2>What starts or stops at $1,000,000</h2>
<p>Revenue NSW's first home concession reaches its cap. Queensland's top band begins, and the ACT moves from $${h.num(h.P.states.act.owner_brackets[4].rate * 100, 2)} to $${h.num(h.P.states.act.owner_brackets[5].rate * 100, 2)} per $100, a band that lasts only until ${h.aud(h.P.states.act.owner_brackets[6].from)}, where its flat rate takes over. Western Australia's grant cap for homes north of the 26th parallel is also ${h.aud(h.P.states.wa.fhog.cap_north)}.</p>
<p>Victoria crossed its own line earlier, at ${h.aud(h.P.states.vic.brackets[3].from)}. A Victorian buyer at ${h.aud(1000000)} pays a straight ${h.pct(h.P.states.vic.brackets[3].rate)} of the price, which is why the figure is so round. The Northern Territory works the same way above ${h.aud(h.P.states.nt.formula.upto)}, at ${h.pct(h.P.states.nt.flat_bands[0].rate, 2)}: ${h.duty('nt', 1000000)}.</p>

<h2>First home buyers past the caps</h2>
<p>Above this price no jurisdiction except the ACT gives an established first home anything more than its ordinary owner-occupier rate. That makes the choice between new and established decisive in three places. In Queensland, a new home saves ${h.duty('qld', 1000000, 'first')} compared with an established one at the same price; in South Australia, ${h.duty('sa', 1000000, 'first')}. The ${h.a('new-vs-established', 'new versus established guide')} works through the trade-off.</p>

<h2>Foreign buyers at seven figures</h2>
<p>With surcharges included, NSW charges a foreign investor ${h.duty('nsw', 1000000, 'investor', 'established', true)} and Victoria ${h.duty('vic', 1000000, 'investor', 'established', true)}. The territories charge no surcharge, so the gap between Canberra or Darwin and the rest is at its widest for this buyer. The ${h.a('foreign-buyer-stamp-duty', 'foreign buyer guide')} lists the surcharge rates.</p>

<h2>Close by</h2>
<p>Below this, the ${h.a('price-900000', '$900,000 page')} sits in the middle of the NSW fade. Above, the ${h.a('price-1200000', '$1.2 million page')} looks at what is left once every capped concession is gone. All nine prices are on the ${h.a('prices', 'duty by price index')}.</p>
`,
  related: ['price-900000', 'price-1200000', 'nsw-first-home-buyers', 'new-vs-established', 'qld', 'prices'],
  sources: ['nsw_fhbas', 'qld_rates', 'act_rates', 'wa_fhog', 'vic_general', 'nt_calc'],
});
