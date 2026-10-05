/**
 * Reference cases. Each expected value comes from an official source, named in the comment:
 * either a worked example printed by the revenue office, or the office's own calculator queried
 * on 5 October 2026 (Revenue NSW eRevenue calculators, SRO Victoria calculator service).
 */
import { describe, expect, it } from 'vitest';
import { calculate, compareAll, ntDuty, type Input } from './states';

const inv = (price: number, extra: Partial<Input> = {}): Input => ({ price, buyer: 'investor', property: 'established', foreign: false, ...extra });
const near = (a: number, b: number, tol = 0.5) => expect(Math.abs(a - b)).toBeLessThanOrEqual(tol);

describe('NSW (Revenue NSW examples and calculators, 2026/27)', () => {
  it('auction example $1,350,000 → $55,537', () => near(calculate('nsw', inv(1350000)).duty, 55537));
  it('premium example $4,000,000 → $203,237', () => near(calculate('nsw', inv(4000000)).duty, 203237));
  it('family transfer example $450,000 → $14,437', () => near(calculate('nsw', inv(450000)).duty, 14437));
  it('calculator: $500,050 → $16,691.50 (each $100 or part)', () => near(calculate('nsw', inv(500050)).duty, 16691.5, 0.01));
  it('FHBAS calculator: existing home $900,000 → $19,593.50', () => near(calculate('nsw', inv(900000, { buyer: 'first' })).duty, 19593.5, 0.01));
  it('FHBAS calculator: home $850,050 → $9,808.80', () => near(calculate('nsw', inv(850050, { buyer: 'first' })).duty, 9808.8, 0.05));
  it('FHBAS calculator: vacant land $400,000 → $7,033.50', () => near(calculate('nsw', inv(400000, { buyer: 'first', property: 'vacant' })).duty, 7033.5, 0.01));
  it('FHBAS calculator: vacant land $360,000 → $1,380.70', () => near(calculate('nsw', inv(360000, { buyer: 'first', property: 'vacant' })).duty, 1380.7, 0.05));
  it('FHBAS calculator: vacant land $420,000 → $9,994.90', () => near(calculate('nsw', inv(420000, { buyer: 'first', property: 'vacant' })).duty, 9994.9, 0.05));
  it('FHBAS: $800,000 exempt, $1,000,000 full duty', () => {
    expect(calculate('nsw', inv(800000, { buyer: 'first' })).duty).toBe(0);
    near(calculate('nsw', inv(1000000, { buyer: 'first' })).duty, 39187);
  });
  it('calculator grid (5 October 2026)', () => {
    const grid: Array<[number, number]> = [[15000, 187.5], [37999, 525], [250123, 6814], [386999, 11602], [640321, 23005], [999999, 39187], [1290001, 52242.5], [2750000, 132537], [3870000, 194137]];
    for (const [v, d] of grid) near(calculate('nsw', inv(v)).duty, d, 0.01);
    near(calculate('nsw', inv(812345, { buyer: 'first' })).duty, 2421.29, 0.05);
    near(calculate('nsw', inv(955555, { buyer: 'first' })).duty, 30480.69, 0.05);
    near(calculate('nsw', inv(351234, { buyer: 'first', property: 'vacant' })).duty, 172.69, 0.05);
    near(calculate('nsw', inv(449000, { buyer: 'first', property: 'vacant' })).duty, 14288.93, 0.05);
  });
  it('surcharge purchaser duty 9%', () => near(calculate('nsw', inv(1000000, { foreign: true })).surcharge, 90000));
  it('FHOG $10,000 on a new home at $600,000, none at $600,001', () => {
    expect(calculate('nsw', inv(600000, { buyer: 'first', property: 'new' })).grant.amount).toBe(10000);
    expect(calculate('nsw', inv(600001, { buyer: 'first', property: 'new' })).grant.amount).toBe(0);
  });
});

describe('VIC (SRO Victoria calculator and examples)', () => {
  it('general $700,000 → $37,070', () => near(calculate('vic', inv(700000)).duty, 37070));
  it('general $700,055 → $37,073', () => near(calculate('vic', inv(700055)).duty, 37073, 0.5));
  it('general $77,777 → $1,617', () => near(calculate('vic', inv(77777)).duty, 1617, 0.5));
  it('general $1,500,000 → $82,500 (5.5% of the whole value)', () => near(calculate('vic', inv(1500000)).duty, 82500));
  it('general $2,500,000 → $142,500', () => near(calculate('vic', inv(2500000)).duty, 142500));
  it('PPR $500,000 → $21,970', () => near(calculate('vic', inv(500000, { buyer: 'owner' })).duty, 21970));
  it('PPR example $400,000 → $16,370 instead of $19,070', () => {
    const r = calculate('vic', inv(400000, { buyer: 'owner' }));
    near(r.duty, 16370); near(r.generalDuty, 19070);
  });
  it('PPR example $550,000 → $24,970', () => near(calculate('vic', inv(550000, { buyer: 'owner' })).duty, 24970));
  it('first home $700,000 → $24,713', () => near(calculate('vic', inv(700000, { buyer: 'first' })).duty, 24713, 0.5));
  it('first home $612,345 → $2,618', () => near(calculate('vic', inv(612345, { buyer: 'first' })).duty, 2618, 0.5));
  it('calculator grid (5 October 2026)', () => {
    near(calculate('vic', inv(1000000)).duty, 55000); near(calculate('vic', inv(1999999)).duty, 110000);
    near(calculate('vic', inv(2000001)).duty, 110000); near(calculate('vic', inv(129999, { buyer: 'owner' })).duty, 2870);
    near(calculate('vic', inv(300000, { buyer: 'owner' })).duty, 11370); near(calculate('vic', inv(549999, { buyer: 'owner' })).duty, 24970);
    expect(calculate('vic', inv(650000, { buyer: 'first' })).duty).toBe(11356);
    expect(calculate('vic', inv(749999, { buyer: 'first' })).duty).toBe(40069);
    expect(calculate('vic', inv(350000, { buyer: 'first' })).duty).toBe(0);
    near(calculate('vic', inv(800000, { buyer: 'first', foreign: true })).total, 107070);
  });
  it('first home $600,000 → nil', () => expect(calculate('vic', inv(600000, { buyer: 'first' })).duty).toBe(0));
  it('FPAD $700,000 investor → $93,070 with duty', () => near(calculate('vic', inv(700000, { foreign: true })).total, 93070));
  it('off the plan example: $1,000,000 less $400,000 construction → duty on $600,000', () => {
    const r = calculate('vic', inv(1000000, { property: 'offplan', options: { vicConstruction: 400000 } }));
    expect(r.dutiable).toBe(600000); near(r.duty, 31070);
  });
  it('FPAD is charged on the price before the off-the-plan deduction', () => near(calculate('vic', inv(1200000, { property: 'offplan', foreign: true, options: { vicConstruction: 250000 } })).surcharge, 96000));
});

describe('QLD (Queensland Revenue Office examples)', () => {
  it('investment house $850,000 → $31,275', () => near(calculate('qld', inv(850000)).duty, 31275));
  it('home concession $950,000 → $28,600', () => near(calculate('qld', inv(950000, { buyer: 'owner' })).duty, 28600));
  it('first home $795,000 → $19,890', () => near(calculate('qld', inv(795000, { buyer: 'first' })).duty, 19890));
  it('home concession example $550,000 → $10,600', () => near(calculate('qld', inv(550000, { buyer: 'owner' })).duty, 10600));
  it('first home (new home) $1,230,000 → nil', () => expect(calculate('qld', inv(1230000, { buyer: 'first', property: 'new' })).duty).toBe(0));
  it('AFAD 8% and no concession for a foreign first home buyer', () => {
    const r = calculate('qld', inv(600000, { buyer: 'first', foreign: true }));
    near(r.surcharge, 48000); near(r.duty, r.generalDuty);
  });
  it('FHOG $30,000 below $750,000 only', () => {
    expect(calculate('qld', inv(749999, { buyer: 'first', property: 'new' })).grant.amount).toBe(30000);
    expect(calculate('qld', inv(750000, { buyer: 'first', property: 'new' })).grant.amount).toBe(0);
  });
});

describe('WA (RevenueWA rates of duty)', () => {
  it('general rate $725,000 → $28,452.25 band top', () => near(calculate('wa', inv(725000)).duty, 28452.5, 1));
  it('first home owner rate: $600,000 nil, $700,000 → $16,150', () => {
    expect(calculate('wa', inv(600000, { buyer: 'first' })).duty).toBe(0);
    near(calculate('wa', inv(700000, { buyer: 'first' })).duty, 16150);
  });
  it('first home vacant land $500,000 → $10,070', () => near(calculate('wa', inv(500000, { buyer: 'first', property: 'vacant' })).duty, 10070));
  it('foreign transfer duty example: 7% of $200,000 → $14,000', () => near(calculate('wa', inv(200000, { foreign: true })).surcharge, 14000));
  it('off the plan pre-construction ≤ $800,000: 100% off, capped at $50,000', () => {
    const r = calculate('wa', inv(780000, { property: 'offplan', options: { waOtpStage: 'pre' } }));
    expect(r.duty).toBe(0);
  });
  it('off the plan pre-construction $900,000: 50% off', () => {
    const r = calculate('wa', inv(900000, { property: 'offplan', options: { waOtpStage: 'pre' } }));
    near(r.duty, r.generalDuty / 2, 1);
  });
});

describe('SA (RevenueSA examples)', () => {
  it('$600,000 → $26,830', () => near(calculate('sa', inv(600000)).duty, 26830));
  it('$650,000 → $29,580; $670,000 → $30,680', () => { near(calculate('sa', inv(650000)).duty, 29580); near(calculate('sa', inv(670000)).duty, 30680); });
  it('$400,000 → $16,330', () => near(calculate('sa', inv(400000)).duty, 16330));
  it('$300,000 → $11,330', () => near(calculate('sa', inv(300000)).duty, 11330));
  it('seniors relief cap $103,830 = duty on $2,000,000', () => near(calculate('sa', inv(2000000)).duty, 103830));
  it('foreign ownership surcharge 7% of $600,000 → $42,000', () => near(calculate('sa', inv(600000, { foreign: true })).surcharge, 42000));
  it('first home relief: new home nil at any value, established full duty', () => {
    expect(calculate('sa', inv(1500000, { buyer: 'first', property: 'new' })).duty).toBe(0);
    near(calculate('sa', inv(600000, { buyer: 'first' })).duty, 26830);
  });
});

describe('TAS (SRO Tasmania scale)', () => {
  it('$3,000 → $50 minimum', () => expect(calculate('tas', inv(3000)).duty).toBe(50));
  it('band tops: $375,000 → $12,935; $725,000 → $27,810', () => { near(calculate('tas', inv(375000)).duty, 12935); near(calculate('tas', inv(725000)).duty, 27810); });
  it('FIDS 8%', () => near(calculate('tas', inv(500000, { foreign: true })).surcharge, 40000));
  it('FHOG $20,000 for new homes in 2026-27', () => expect(calculate('tas', inv(500000, { buyer: 'first', property: 'new' })).grant.amount).toBe(20000));
});

describe('ACT (ACT Revenue Office 2026-27 rate tables)', () => {
  it('owner-occupier $750,000 → $19,208', () => near(calculate('act', inv(750000, { buyer: 'owner' })).duty, 19208));
  it('owner-occupier $1,000,000 → $33,958', () => near(calculate('act', inv(1000000, { buyer: 'owner' })).duty, 33958));
  it('non-owner-occupier $500,000 → $11,400', () => near(calculate('act', inv(500000)).duty, 11400));
  it('above $1,455,000: 4.54% of the whole value', () => near(calculate('act', inv(2000000, { buyer: 'owner' })).duty, 90800));
  it('Home Buyer Concession Scheme from 1 July 2026: nil at $2,000,000', () => expect(calculate('act', inv(2000000, { buyer: 'first' })).duty).toBe(0));
  it('no surcharge for foreign buyers', () => expect(calculate('act', inv(800000, { foreign: true })).surcharge).toBe(0));
});

describe('NT (Territory formula from the official calculator)', () => {
  it('$525,000 → formula band top', () => near(ntDuty(525000), 0.06571441 * 525 * 525 + 15 * 525, 0.01));
  it('$500,000 → $23,928.60', () => near(ntDuty(500000), 23928.6, 0.01));
  it('$600,000 → 4.95% = $29,700', () => near(ntDuty(600000), 29700));
  it('$3,000,000 → 5.75%; $5,000,000 → 5.95%', () => { near(ntDuty(3000000), 172500); near(ntDuty(5000000), 297500); });
  it('house and land package exemption and HomeGrown grant', () => {
    const r = calculate('nt', inv(700000, { buyer: 'first', property: 'new', options: { ntPackage: true } }));
    expect(r.duty).toBe(0); expect(r.grant.amount).toBe(50000);
  });
  it('FreshStart $30,000 for an existing owner buying new', () => expect(calculate('nt', inv(700000, { buyer: 'owner', property: 'new' })).grant.amount).toBe(30000));
});

describe('comparator', () => {
  it('returns the eight jurisdictions sorted by total', () => {
    const rows = compareAll(inv(800000, { buyer: 'owner' }));
    expect(rows).toHaveLength(8);
    for (let k = 1; k < rows.length; k++) expect(rows[k].total).toBeGreaterThanOrEqual(rows[k - 1].total);
  });
  it('never returns a negative or NaN amount', () => {
    for (const price of [0, 1, 5000, 99999, 525001, 999999, 1455001, 3870001, 12000000])
      for (const buyer of ['first', 'owner', 'investor'] as const)
        for (const property of ['established', 'new', 'vacant', 'offplan'] as const)
          for (const r of compareAll({ price, buyer, property, foreign: false })) {
            expect(Number.isFinite(r.total)).toBe(true); expect(r.duty).toBeGreaterThanOrEqual(0);
          }
  });
});
