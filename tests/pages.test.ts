/**
 * Every content page file, checked without a build (CONTRIBUTING-PAGES.md).
 * One page only: PAGE_FILES=vic-first-home-buyers npx vitest run tests/pages.test.ts
 * (comma-separated ids allowed). The site-wide checks (check-seo, check-unique…) still run on dist/.
 */
import { describe, expect, it } from 'vitest';
import { PAGES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
import { resume, faqs } from '../src/lib/resolve';
import { SOURCES } from '../src/lib/engine/params';
import { MINIS } from '../src/lib/mini-specs';

const only = (process.env.PAGE_FILES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const pages = PAGES.filter((p) => !only.length || only.includes(p.id));
const words = (html: string) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const MIN = { hub: 800, index: 800, guide: 1200, price: 500 } as const;
const BANNED = [/—/, /–/, /it['’]s important to note/i, /dive into/i, /whether you['’]re/i, /in today['’]s/i, /\bMoreover\b/, /\bFurthermore\b/, /\bAdditionally\b/];

const allQuestions = new Map<string, string>();
for (const p of PAGES) for (const f of faqs(p)) {
  const k = f.q.toLowerCase().replace(/[?!. ]+$/, '');
  if (allQuestions.has(k) && allQuestions.get(k) !== p.id) allQuestions.set(k, `${allQuestions.get(k)} + ${p.id}`); else allQuestions.set(k, p.id);
}

describe.each(pages.map((p) => [p.id, p] as const))('%s', (_id, p) => {
  const h = helpers();
  const body = p.body(h);
  const r = resume(p);
  const q = faqs(p);
  it('is not a stub', () => { expect(body).not.toMatch(/STUB/); expect(p.title).not.toMatch(/STUB/); });
  it('title 50-60 chars, key term first, year', () => {
    expect(p.title.length, p.title).toBeGreaterThanOrEqual(50); expect(p.title.length, p.title).toBeLessThanOrEqual(60);
    expect(p.title).toMatch(/20\d\d/);
    expect(p.title).not.toMatch(/^(Australia|Australian|Calculator|Calculate|About|How|What|When)\b/i);
  });
  it('description 150-160 chars with the year', () => {
    expect(p.description.length, p.description).toBeGreaterThanOrEqual(150); expect(p.description.length, p.description).toBeLessThanOrEqual(160);
    expect(p.description).toMatch(/20\d\d/);
  });
  it('quotable block of 125 words or more, one paragraph', () => { expect(words(r)).toBeGreaterThanOrEqual(125); expect(r).not.toMatch(/\n\s*\n/); });
  it('FAQ count and answer length', () => {
    const [lo, hi] = p.kind === 'hub' || p.kind === 'index' ? [6, 8] : p.kind === 'price' ? [3, 5] : [4, 8];
    expect(q.length).toBeGreaterThanOrEqual(lo); expect(q.length).toBeLessThanOrEqual(hi);
    for (const f of q) { const n = words(f.a); expect(n, f.q).toBeGreaterThanOrEqual(40); expect(n, f.q).toBeLessThanOrEqual(90); }
  });
  it('FAQ questions unique on the site', () => {
    for (const f of q) { const k = f.q.toLowerCase().replace(/[?!. ]+$/, ''); expect(allQuestions.get(k), f.q).toBe(p.id); }
  });
  it('length target (body + quotable block + FAQ)', () => {
    const n = words(body) + words(r) + q.reduce((s, f) => s + words(f.q) + words(f.a), 0);
    expect(n).toBeGreaterThanOrEqual(MIN[p.kind] + 60);
  });
  it('banned phrases and dashes', () => {
    const all = [p.title, p.description, p.h1, p.intro, r, body, ...q.flatMap((f) => [f.q, f.a])].join(' ');
    for (const b of BANNED) expect(all, String(b)).not.toMatch(b);
  });
  it('sources, related pages and mini-calculator exist', () => {
    for (const s of p.sources) expect(SOURCES[s], s).toBeTruthy();
    expect(p.sources.length).toBeGreaterThanOrEqual(p.kind === 'hub' || p.kind === 'index' ? 3 : 2);
    expect(p.related.length).toBeGreaterThanOrEqual(3);
    for (const id of p.related) expect(PAGES.some((x) => x.id === id) || ['home', 'method', 'about'].includes(id), id).toBe(true);
    if (p.mini) expect(MINIS[p.mini], p.mini).toBeTruthy();
    for (const m of body.matchAll(/<!--mini:([A-Za-z0-9_]+)-->/g)) expect(MINIS[m[1]], m[1]).toBeTruthy();
    expect(!!p.tool || !!p.mini).toBe(true);
  });
  it('price pages carry a table', () => { if (p.kind === 'price') expect(body).toMatch(/<table/); });
});

it('titles and descriptions are unique across pages', () => {
  const t = new Set<string>(), d = new Set<string>();
  for (const p of PAGES.filter((x) => !x.title.startsWith("STUB"))) { expect(t.has(p.title), p.title).toBe(false); t.add(p.title); expect(d.has(p.description), p.description).toBe(false); d.add(p.description); }
});
