// WA off-the-plan duty concession by stage (contracts from 12 March 2026).
import { aud, run } from './_kit';
export default () => ({
  title: 'WA off-the-plan concession by stage',
  cta: 'WA stamp duty calculator',
  inputs: [{ id: 'p', label: 'Price of the new dwelling', def: 850000, unit: '$', max: 50_000_000 }, { id: 'g', label: 'Stage at contract', def: 1, options: [{ value: '1', label: 'Construction not started' }, { value: '2', label: 'Under construction' }] }],
  run: ({ p, g }: Record<string, number>) => {
    const r = run('wa', p, 'investor', 'offplan', false, { waOtpStage: g === 2 ? 'under' : 'pre' });
    return { head: ['Duty after the concession', aud(r.duty)] as [string, string], rows: [['General rate of duty', aud(r.generalDuty)], ['Concession', aud(r.saving)], ['Rule', r.rule]] as [string, string][] };
  },
});
