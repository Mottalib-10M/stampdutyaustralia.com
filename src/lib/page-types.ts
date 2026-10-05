/**
 * One page = one data file in `src/content/pages/<id>.ts`. The file carries everything: URL, snippet,
 * H1, standfirst, quotable block, FAQ, body, sources, mini-calculator, related pages. Routes, menus,
 * footer, sitemap, schemas and internal links are built from it. Guide for agents: CONTRIBUTING-PAGES.md.
 */
import type { SourceKey, StateCode } from './engine/params';
import type { Buyer, Property, Result } from './engine/states';
import type { P } from './engine/params';

export type Group = StateCode | 'guides' | 'prices';
export type Kind = 'hub' | 'guide' | 'price' | 'index';
export interface FAQ { q: string; a: string }

export interface Helpers {
  /** Internal link by page id. An unknown id fails the page test. */
  a: (id: string, text: string) => string;
  /** Whole dollars, en-AU ("$12,345"). */
  aud: (n: number) => string;
  num: (n: number, decimals?: number) => string;
  /** Percentage from a fraction (0.055 → "5.5 %"). */
  pct: (x: number, decimals?: number) => string;
  /** ISO date written out ("1 July 2026"). */
  date: (iso: string) => string;
  /** Journal-style table. Numbers are formatted; strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to an official source of params-2026.json. */
  src: (key: SourceKey, text?: string) => string;
  /** Run the engine: every amount in a page comes from here or from P, never typed by hand. */
  calc: (state: StateCode, price: number, buyer?: Buyer, property?: Property, foreign?: boolean, options?: Record<string, unknown>) => Result;
  /** Shortcut: formatted duty payable (duty + surcharge) for a case. */
  duty: (state: StateCode, price: number, buyer?: Buyer, property?: Property, foreign?: boolean, options?: Record<string, unknown>) => string;
  P: typeof P;
}

export interface PageDef {
  id: string;
  /** Full URL path with slashes: "/nsw/first-home-buyers/". No year in the slug. */
  path: string;
  group: Group;
  kind: Kind;
  /** Order inside the group's menu (small = first). */
  order: number;
  /** Short label for menus and breadcrumb. */
  nav: string;
  /** One sentence for "related pages" cards. */
  card: string;
  /** 50 to 60 characters, key term first, year included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, year included. */
  description: string;
  h1: string;
  /** One-sentence standfirst under the H1. */
  intro: string;
  /** Quotable block: ONE paragraph of at least 120 words with the figures (RECETTE §21). */
  resume: string | ((h: Helpers) => string);
  /** Page FAQ: questions unique on the whole site, answers 40 to 90 words (RECETTE §7). */
  faqs: FAQ[] | ((h: Helpers) => FAQ[]);
  /** HTML body (h2, h3, p, ul, ol, tables via h.table). `<!--mini:kind-->` inserts another mini-calculator. */
  body: (h: Helpers) => string;
  /** Full state calculator on a state hub page. */
  tool?: StateCode;
  /** Mini-calculator placed after the quotable block: a file `src/lib/minis/<kind>.ts`. */
  mini?: string;
  /** Page the mini-calculator's link points to (default: the state hub or the home comparator). */
  miniHref?: string;
  related: string[];
  sources: SourceKey[];
}
export const definePage = (p: PageDef): PageDef => p;
