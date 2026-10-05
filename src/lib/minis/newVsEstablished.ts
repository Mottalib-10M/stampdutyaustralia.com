// New home vs established home in one state: duty, grant and the net difference for the same budget.
import { PRICE, STATE, run, stateOf, aud, YESNO } from './_kit';
export default () => ({
  title: 'New or established: net cost after duty and grant',
  cta: 'Open the state calculator',
  inputs: [PRICE(650000), STATE('qld'), { id: 'f', label: 'First home buyer?', def: 1, options: YESNO }],
  run: ({ p, s, f }: Record<string, number>) => {
    const st = stateOf(s), b = f ? 'first' : 'owner';
    const e = run(st, p, b, 'established'), n = run(st, p, b, 'new');
    const netNew = n.total - n.grant.amount, netOld = e.total - e.grant.amount;
    return { head: ['New home is better by', aud(netOld - netNew)] as [string, string], rows: [['Established: duty', aud(e.total)], ['New: duty', aud(n.total)], ['New: grant', aud(n.grant.amount)], ['New: duty minus grant', aud(netNew)]] as [string, string][], note: netOld - netNew < 0 ? 'A negative figure means the established home costs less in duty.' : undefined };
  },
});
