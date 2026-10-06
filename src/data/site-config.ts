/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://stampdutyaustralia.com";
export const SITE_NAMES: Record<string, string> = {"en": "Stamp Duty Australia"};
export const LANG_TAGS: Record<string, string> = {"en": "en-AU"};
export const OG_LOCALES: Record<string, string> = {"en": "en_AU"};
export const LOCALE_TAG = 'en-AU';
export const CURRENCY = 'AUD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-05';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Publisher of the eight-state stamp duty calculator and its guides"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners maintains a single calculator for transfer duty in all eight Australian states and territories. Every rate, threshold, first home concession, grant and foreign buyer surcharge is read on the revenue office's own page, dated, and tested against that office's published examples or calculator before it goes live."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["Transfer duty (stamp duty) in the Australian states and territories", "First home buyer duty exemptions and concessions", "First Home Owner Grants", "Foreign purchaser duty surcharges", "Off-the-plan duty concessions", "Pensioner and downsizer duty concessions", "Dutiable value of residential property"]};
export const CONTACT_EMAIL = "contact@stampdutyaustralia.com";
export const THEME_COLOR = '#012169';
export const LOGO_SYMBOL = 'maison';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime de consentement : 'opt-in' = rien avant l'accord (UE, Suisse) ;
 *  'notice' = mesure d'audience active avec information préalable et retrait (CA, AU). */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'notice';
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif). Vide = aucun traceur ni bandeau. */
export const CLARITY_ID = 'ytm607rula';
export const INDEXNOW_KEY = 'f3756853d4a630b5b50d8b89676b2222';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur du portefeuille (RECETTE §8)
  legalForm: '',             // vide : publication à titre personnel
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
