/**
 * The home page tool: one purchase, eight jurisdictions, ranked. Same engine as the state calculators.
 * First render = build defaults; the shared link is applied in useEffect (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { compareAll, type Buyer, type Property } from '../../lib/engine/states';
import { STATE_INFO } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

interface Props { hubHrefs: Record<string, string>; methodHref: string }
const aud = (x: number) => formatMoney(Math.round(x), 0);

export default function Comparator({ hubHrefs, methodHref }: Props) {
  const [price, setPrice] = useState(800000);
  const [buyer, setBuyer] = useState<Buyer>('owner');
  const [property, setProperty] = useState<Property>('established');
  const [foreign, setForeign] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    if (!u.toString()) return;
    setPrice(num(u, 'p', 800000));
    const b = str(u, 'b', 'owner'); if (['first', 'owner', 'investor'].includes(b)) setBuyer(b as Buyer);
    const t = str(u, 't', 'established'); if (['established', 'new', 'vacant', 'offplan'].includes(t)) setProperty(t as Property);
    setForeign(str(u, 'f', 'n') === 'y');
  }, []);
  const rows = useMemo(() => compareAll({ price, buyer, property, foreign }), [price, buyer, property, foreign]);
  useEffect(() => { updateURL({ p: price, b: buyer, t: property, f: foreign ? 'y' : undefined }); }, [price, buyer, property, foreign]);
  const max = Math.max(1, ...rows.map((r) => r.total));
  const spread = rows[rows.length - 1].total - rows[0].total;

  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome data-outil>
      <form className="grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
        <NumberField id="cmp-price" label="Purchase price" value={price} onChange={setPrice} unit="$" max={50_000_000} />
        <SelectField id="cmp-buyer" label="Buyer" value={buyer} onChange={(v) => setBuyer(v as Buyer)} options={[{ value: 'first', label: 'First home buyer' }, { value: 'owner', label: 'Home buyer, not first' }, { value: 'investor', label: 'Investor' }]} />
        <SelectField id="cmp-type" label="Property" value={property} onChange={(v) => setProperty(v as Property)} options={[{ value: 'established', label: 'Established home' }, { value: 'new', label: 'New home' }, { value: 'vacant', label: 'Vacant land' }, { value: 'offplan', label: 'Off the plan' }]} />
        <Toggle id="cmp-foreign" label="Foreign buyer?" options={[{ value: 'n', label: 'No' }, { value: 'y', label: 'Yes' }]} value={foreign ? 'y' : 'n'} onChange={(v) => setForeign(v === 'y')} />
      </form>
      <div aria-live="polite" className="mt-6 overflow-x-auto">
        <table className="journal w-full text-sm">
          <caption className="mb-2 text-left text-sm text-navy-700">Duty on {aud(price)}, cheapest first. Gap between the cheapest and dearest jurisdiction: <strong className="text-navy-900">{aud(spread)}</strong>.</caption>
          <thead><tr>
            <th scope="col" className="px-2 py-2 text-left">State</th>
            <th scope="col" className="px-2 py-2 text-right">Duty</th>
            <th scope="col" className="hidden px-2 py-2 text-right sm:table-cell">Surcharge</th>
            <th scope="col" className="px-2 py-2 text-right">Total</th>
            <th scope="col" className="hidden w-1/4 px-2 py-2 md:table-cell"><span className="sr-only">Scale</span></th>
            <th scope="col" className="px-2 py-2 text-right">Grant</th>
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.state} className="border-b border-navy-100 align-top">
                <td className="px-2 py-2"><a href={hubHrefs[r.state]} className="state-tag text-accent-700 underline-offset-2 hover:underline">{STATE_INFO[r.state].short}</a><span className="mt-0.5 block text-xs text-navy-600">{r.rule}</span></td>
                <td className="tabular-nums px-2 py-2 text-right text-navy-900">{aud(r.duty)}</td>
                <td className="tabular-nums hidden px-2 py-2 text-right text-navy-900 sm:table-cell">{r.surcharge ? aud(r.surcharge) : '·'}</td>
                <td className="tabular-nums px-2 py-2 text-right font-semibold text-navy-900">{aud(r.total)}</td>
                <td className="hidden px-2 py-3 md:table-cell"><div className={`ledger-bar ${r.total === 0 ? 'is-zero' : ''}`} style={{ width: `${Math.max(2, (r.total / max) * 100)}%` }} /></td>
                <td className="tabular-nums px-2 py-2 text-right text-green-800">{r.grant.amount ? aud(r.grant.amount) : '·'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-navy-700">Contract signed in 2026-27, residential property, one buyer profile. Grants are paid to you and are not deducted from duty. Each state's own options (off-the-plan stage, pensioner card, unit title, house and land package) are in its calculator. <a href={methodHref} className="underline">Method and limits</a></p>
      </div>
    </div>
  );
}
