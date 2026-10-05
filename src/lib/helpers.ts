/** Writing tools (`Helpers`) handed to every page body. */
import { route, ROUTES } from '../i18n/routes';
import { P, SOURCES, type SourceKey, type StateCode } from './engine/params';
import { calculate, type Buyer, type Property } from './engine/states';
import type { Helpers } from './page-types';
import { formatMoney, formatNumber, formatPercent, displayDate } from './format';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');

export function helpers(): Helpers {
  const calc = (state: StateCode, price: number, buyer: Buyer = 'owner', property: Property = 'established', foreign = false, options: Record<string, unknown> = {}) =>
    calculate(state, { price, buyer, property, foreign, options });
  return {
    P,
    a: (id, text) => {
      if (!ROUTES.some((r) => r.id === id)) throw new Error(`Unknown page id in a link: ${id}`);
      return `<a href="${route(id, 'en')}">${text}</a>`;
    },
    aud: (n) => formatMoney(Math.round(n), 0),
    num: (n, d = 0) => formatNumber(n, d),
    pct: (x, d = 1) => formatPercent(x, d),
    date: (iso) => displayDate(iso, 'en-AU'),
    src: (key: SourceKey, text?: string) => { const s = SOURCES[key]; if (!s) throw new Error(`Unknown source: ${key}`); return `<a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? s.label}</a>`; },
    calc,
    duty: (state, price, buyer = 'owner', property = 'established', foreign = false, options = {}) => formatMoney(Math.round(calc(state, price, buyer, property, foreign, options).total), 0),
    table: (headers, rows, caption, align = []) => {
      const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
      return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    },
  };
}
