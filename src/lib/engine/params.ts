/** Typed access to `src/data/params-2026.json`. Pages and components read values here, never in the JSON directly. */
import raw from '../../data/params-2026.json';

export interface Bracket { from: number; base: number; rate: number; flat?: boolean }
export interface Source { url: string; label: string; read: string; via?: string; captured?: string; note?: string }

export const P = raw as typeof raw;
export type SourceKey = keyof typeof raw.sources;
export const SOURCES = raw.sources as Record<SourceKey, Source>;

export const STATES = ['nsw', 'vic', 'qld', 'wa', 'sa', 'tas', 'act', 'nt'] as const;
export type StateCode = (typeof STATES)[number];

/** Names and offices, written the way each office writes itself. */
export const STATE_INFO: Record<StateCode, { name: string; short: string; office: string; dutyName: string; surchargeName: string }> = {
  nsw: { name: 'New South Wales', short: 'NSW', office: 'Revenue NSW', dutyName: 'transfer duty', surchargeName: 'surcharge purchaser duty' },
  vic: { name: 'Victoria', short: 'VIC', office: 'State Revenue Office Victoria', dutyName: 'land transfer duty', surchargeName: 'foreign purchaser additional duty' },
  qld: { name: 'Queensland', short: 'QLD', office: 'Queensland Revenue Office', dutyName: 'transfer duty', surchargeName: 'additional foreign acquirer duty' },
  wa: { name: 'Western Australia', short: 'WA', office: 'RevenueWA', dutyName: 'transfer duty', surchargeName: 'foreign transfer duty' },
  sa: { name: 'South Australia', short: 'SA', office: 'RevenueSA', dutyName: 'stamp duty', surchargeName: 'foreign ownership surcharge' },
  tas: { name: 'Tasmania', short: 'TAS', office: 'State Revenue Office of Tasmania', dutyName: 'property transfer duty', surchargeName: 'foreign investor duty surcharge' },
  act: { name: 'Australian Capital Territory', short: 'ACT', office: 'ACT Revenue Office', dutyName: 'conveyance duty', surchargeName: '' },
  nt: { name: 'Northern Territory', short: 'NT', office: 'Territory Revenue Office', dutyName: 'stamp duty', surchargeName: '' },
};
