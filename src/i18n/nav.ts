import { route, type Locale } from './routes';
import { PAGES, pageById, inGroup } from '../lib/pages';
import { STATES, STATE_INFO } from '../lib/engine/params';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Compare all states', method: 'Methodology', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.nav ?? id;
const link = (id: string): NavLink => ({ href: route(id, 'en'), label: label(id) });
const hubs = () => STATES.map((s) => PAGES.find((p) => p.group === s && p.kind === 'hub')).filter(Boolean).map((p) => ({ href: route(p!.id, 'en'), label: `${STATE_INFO[p!.group as keyof typeof STATE_INFO].short} stamp duty calculator` }));
const firstHome = () => PAGES.filter((p) => /first-home|home-buyer-concession|homegrown/.test(p.path) && p.kind === 'guide').map((p) => link(p.id));
export function navCategories(_lang: Locale): NavCategory[] {
  return [
    { label: 'Calculators by state', links: hubs() },
    { label: 'First home buyers', links: firstHome() },
    { label: 'Guides', links: inGroup('guides').map((p) => link(p.id)) },
    { label: 'By price', links: inGroup('prices').map((p) => link(p.id)) },
  ].filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [link('method')];
export const footerColumns = (_lang: Locale): NavCategory[] => {
  const states = STATES.map((s) => ({ label: STATE_INFO[s].name, links: inGroup(s).map((p) => link(p.id)) })).filter((c) => c.links.length);
  return [...states, { label: 'Guides', links: inGroup('guides').map((p) => link(p.id)) }, { label: 'By price', links: inGroup('prices').map((p) => link(p.id)) },
    { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i)) }];
};
export const popularLinks = (_lang: Locale): NavLink[] => [];
