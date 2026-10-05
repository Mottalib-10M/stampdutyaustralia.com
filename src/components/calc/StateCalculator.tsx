/**
 * Full calculator for one state or territory (state hub pages and the embed). Every figure comes from
 * `lib/engine/states.ts`. Hydration (RECETTE §17.5): first render uses the build defaults; the shared
 * link is read in useEffect only. The state written to the address bar never leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import StackedBar from '../ui/StackedBar';
import { calculate, type Buyer, type Property, type Options } from '../../lib/engine/states';
import { STATE_INFO, type StateCode } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

interface Props { state: StateCode; methodHref: string; defaultPrice?: number; defaultBuyer?: Buyer; defaultProperty?: Property }
const aud = (x: number) => formatMoney(Math.round(x), 0);
const BUYER_OPTS = [{ value: 'first', label: 'First home buyer' }, { value: 'owner', label: 'Home buyer, not my first' }, { value: 'investor', label: 'Investor' }];
const PROP_OPTS = [{ value: 'established', label: 'Established home' }, { value: 'new', label: 'New home (never lived in)' }, { value: 'vacant', label: 'Vacant land to build on' }, { value: 'offplan', label: 'Off the plan' }];
const YN = [{ value: 'n', label: 'No' }, { value: 'y', label: 'Yes' }];

export default function StateCalculator({ state, methodHref, defaultPrice = 750000, defaultBuyer = 'owner', defaultProperty = 'established' }: Props) {
  const info = STATE_INFO[state];
  const [price, setPrice] = useState(defaultPrice);
  const [buyer, setBuyer] = useState<Buyer>(defaultBuyer);
  const [property, setProperty] = useState<Property>(defaultProperty);
  const [foreign, setForeign] = useState(false);
  const [construction, setConstruction] = useState(0);
  const [stage, setStage] = useState<'none' | 'pre' | 'under'>('none');
  const [north, setNorth] = useState(false);
  const [unit, setUnit] = useState(false);
  const [pensioner, setPensioner] = useState(false);
  const [pkg, setPkg] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const u = readParams(window.location.search);
    if (!u.toString()) return;
    setPrice(num(u, 'p', defaultPrice));
    const b = str(u, 'b', defaultBuyer); if (['first', 'owner', 'investor'].includes(b)) setBuyer(b as Buyer);
    const t = str(u, 't', defaultProperty); if (['established', 'new', 'vacant', 'offplan'].includes(t)) setProperty(t as Property);
    setForeign(str(u, 'f', 'n') === 'y'); setConstruction(num(u, 'c', 0));
    const s = str(u, 's', 'none'); if (['none', 'pre', 'under'].includes(s)) setStage(s as 'none' | 'pre' | 'under');
    setNorth(str(u, 'north', 'n') === 'y'); setUnit(str(u, 'unit', 'n') === 'y'); setPensioner(str(u, 'pen', 'n') === 'y'); setPkg(str(u, 'pkg', 'n') === 'y');
  }, []);

  const options: Options = { vicConstruction: construction, waOtpStage: stage, waNorth: north, actUnit: unit, pensioner, ntPackage: pkg };
  const r = useMemo(() => calculate(state, { price, buyer, property, foreign, options }), [state, price, buyer, property, foreign, construction, stage, north, unit, pensioner, pkg]);
  useEffect(() => { updateURL({ p: price, b: buyer, t: property, f: foreign ? 'y' : undefined, c: construction || undefined, s: stage !== 'none' ? stage : undefined, north: north ? 'y' : undefined, unit: unit ? 'y' : undefined, pen: pensioner ? 'y' : undefined, pkg: pkg ? 'y' : undefined }); }, [price, buyer, property, foreign, construction, stage, north, unit, pensioner, pkg]);

  const showVicOtp = state === 'vic' && property === 'offplan';
  const showPensioner = (state === 'vic' || state === 'act') && buyer === 'owner';
  const showWaStage = state === 'wa' && property === 'offplan' && buyer !== 'first';
  const showWaNorth = state === 'wa' && buyer === 'first' && (property === 'new' || property === 'offplan');
  const showActUnit = state === 'act' && buyer === 'owner' && (property === 'new' || property === 'offplan');
  const showNtPkg = state === 'nt' && buyer !== 'investor' && property === 'new';
  const effective = r.price > 0 ? r.total / r.price : 0;

  const copy = async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard refused: the address bar still holds the link */ } };

  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <form className="grid gap-x-4 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <NumberField id={`${state}-price`} label="Price or market value, whichever is higher" value={price} onChange={setPrice} unit="$" max={50_000_000} />
        <SelectField id={`${state}-buyer`} label="Who is buying" value={buyer} onChange={(v) => setBuyer(v as Buyer)} options={BUYER_OPTS} />
        <SelectField id={`${state}-type`} label="What you are buying" value={property} onChange={(v) => setProperty(v as Property)} options={PROP_OPTS} />
        <Toggle id={`${state}-foreign`} label="Every buyer a foreign person?" options={YN} value={foreign ? 'y' : 'n'} onChange={(v) => setForeign(v === 'y')} />
        {showVicOtp && <NumberField id="vic-construction" label="Construction cost still to come at contract" value={construction} onChange={setConstruction} unit="$" max={50_000_000} help="Your vendor's figure. It is taken off the price before duty." />}
        {showPensioner && <Toggle id={`${state}-pensioner`} label="Eligible pensioner or concession card?" options={YN} value={pensioner ? 'y' : 'n'} onChange={(v) => setPensioner(v === 'y')} />}
        {showWaStage && <SelectField id="wa-stage" label="Off-the-plan stage at contract" value={stage} onChange={(v) => setStage(v as 'none' | 'pre' | 'under')} options={[{ value: 'none', label: 'Not eligible or not sure' }, { value: 'pre', label: 'Construction not started' }, { value: 'under', label: 'Under construction' }]} />}
        {showWaNorth && <Toggle id="wa-north" label="Home north of the 26th parallel?" options={YN} value={north ? 'y' : 'n'} onChange={(v) => setNorth(v === 'y')} />}
        {showActUnit && <Toggle id="act-unit" label="Unit-titled apartment or townhouse?" options={YN} value={unit ? 'y' : 'n'} onChange={(v) => setUnit(v === 'y')} />}
        {showNtPkg && <Toggle id="nt-package" label="House and land package from a builder?" options={YN} value={pkg ? 'y' : 'n'} onChange={(v) => setPkg(v === 'y')} />}
      </form>

      <div aria-live="polite" className="mt-6 rounded-lg border-l-4 border-accent-500 bg-accent-50/60 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-700">{info.short} {info.dutyName}{r.surcharge > 0 ? ` and ${info.surchargeName}` : ''}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{aud(r.total)}</p>
        <p className="mt-1 text-sm text-navy-700">{r.rule}{r.price > 0 ? ` · ${(effective * 100).toLocaleString('en-AU', { maximumFractionDigits: 2 })} % of the price` : ''}</p>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {r.dutiable !== r.price && <tr><td className="py-1.5 pr-3 text-navy-700">Dutiable value after the off-the-plan deduction</td><td className="tabular-nums py-1.5 text-right text-navy-900">{aud(r.dutiable)}</td></tr>}
          <tr><td className="py-1.5 pr-3 text-navy-700">Duty at the general scale</td><td className="tabular-nums py-1.5 text-right text-navy-900">{aud(r.generalDuty)}</td></tr>
          {r.saving > 0 && <tr><td className="py-1.5 pr-3 text-navy-700">Saved by the concession</td><td className="tabular-nums py-1.5 text-right text-green-800">−{aud(r.saving)}</td></tr>}
          <tr><td className="py-1.5 pr-3 text-navy-700">Duty payable</td><td className="tabular-nums py-1.5 text-right text-navy-900">{aud(r.duty)}</td></tr>
          {r.surcharge > 0 && <tr><td className="py-1.5 pr-3 text-navy-700">{info.surchargeName[0].toUpperCase() + info.surchargeName.slice(1)}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{aud(r.surcharge)}</td></tr>}
          <tr className="font-semibold"><td className="py-1.5 pr-3 text-navy-900">Total to the revenue office</td><td className="tabular-nums py-1.5 text-right text-navy-900">{aud(r.total)}</td></tr>
          {r.grant.amount > 0 && <tr><td className="py-1.5 pr-3 text-navy-700">{r.grant.name} (paid to you, separate)</td><td className="tabular-nums py-1.5 text-right text-green-800">+{aud(r.grant.amount)}</td></tr>}
        </tbody></table>
        {r.total > 0 && r.surcharge > 0 && <div className="mt-4"><StackedBar ariaPrefix="Split of what you pay" total={r.total} segments={[{ label: 'Duty', value: r.duty, color: '#012169' }, { label: 'Surcharge', value: r.surcharge, color: '#b45309' }]} /></div>}
        {r.notes.map((n) => <p key={n} className="mt-2 text-xs text-navy-700">{n}</p>)}
        <p className="mt-3 text-xs text-navy-700">Contract signed in 2026-27, residential property, one buyer profile for the whole purchase. <a href={methodHref} className="underline">How this is calculated</a></p>
        <div className="no-print mt-3 flex flex-wrap gap-3 text-sm">
          <button type="button" onClick={copy} className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">{copied ? 'Link copied' : 'Copy link to this result'}</button>
          <button type="button" onClick={() => window.print()} className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">Print</button>
        </div>
      </div>
    </div>
  );
}
