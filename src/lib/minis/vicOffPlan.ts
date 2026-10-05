// Victoria off the plan: construction cost still to come is taken off the dutiable value.
import { aud, run, YESNO } from './_kit';
export default () => ({
  title: 'Victorian off-the-plan concession',
  cta: 'Victorian stamp duty calculator',
  inputs: [{ id: 'p', label: 'Contract price', def: 800000, unit: '$', max: 50_000_000 }, { id: 'c', label: 'Construction cost still to come', def: 320000, unit: '$', max: 50_000_000 }, { id: 'h', label: 'First home buyer?', def: 0, options: YESNO }],
  run: ({ p, c, h }: Record<string, number>) => {
    const r = run('vic', p, h ? 'first' : 'investor', 'offplan', false, { vicConstruction: c });
    const plain = run('vic', p, h ? 'first' : 'investor', 'established');
    return { head: ['Duty off the plan', aud(r.total)] as [string, string], rows: [['Dutiable value', aud(r.dutiable)], ['Duty without the concession', aud(plain.total)], ['Saved', aud(Math.max(0, plain.total - r.total))]] as [string, string][] };
  },
});
