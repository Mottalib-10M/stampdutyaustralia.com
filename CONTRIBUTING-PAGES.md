# Ajouter ou réécrire une page de au-stamp-duty

Notice pour les agents qui prolongent le site. À lire en entier avant d'écrire une ligne, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §7, §9.3, §11, §17.4, §21, §26).

Le site : un calculateur de stamp duty (transfer duty) pour les huit États et territoires australiens,
barèmes 2026-27, concessions premier achat, First Home Owner Grant, surtaxes acheteur étranger.
Langue : **anglais australien seul** (pays anglophone, RECETTE §3), servi à la racine, sans `/en/`.
Éditeur : Radif Partners. Aucun nom, aucune photo, aucune identité personnelle.

## Principe

Une page = **un fichier** `src/content/pages/<id>.ts`. Il porte tout :

- l'URL complète (`path`), le groupe (`nsw`…`nt`, `guides`, `prices`) et le type (`hub`, `guide`, `price`, `index`) ;
- le titre, la description, le H1, le chapeau, le bloc citable (`resume`) ;
- la FAQ ;
- le corps ;
- les sources ;
- le mini-simulateur (`mini`) ou, pour une page d'État, le calculateur complet (`tool`) ;
- les pages liées.

Le cœur du site le lit seul : routes (`src/i18n/routes.ts`), menus et pied de page (`src/i18n/nav.ts`),
sitemap, schémas `Article`, `WebPage`, `FAQPage`, `BreadcrumbList`, `WebApplication`, maillage.
**Ne modifiez aucun fichier du cœur pour ajouter une page.**

Modèle complet à lire d'abord : `src/content/pages/nsw.ts` (page d'État). Copier la **structure**,
jamais les phrases.

## Les chiffres : jamais en dur

- Tous les barèmes, seuils, taux, montants de grant et surtaxes sont dans `src/data/params-2026.json`,
  chacun relu sur la page de l'office le 2026-10-05 (clé `sources`, champ `read`). Les offices qui
  bloquent les robots (RevenueSA, ACT Revenue Office, Territory Revenue Office / nt.gov.au) ont été lus
  par une capture web.archive.org de la même page officielle (`via`, `captured`).
- Le moteur `src/lib/engine/states.ts` calcule tout ; ses tests (`engine.test.ts`) reproduisent les
  exemples des offices et les calculateurs officiels NSW et VIC interrogés le 2026-10-05.
- Dans une page, un montant s'écrit **toujours** via les outils `h` :
  - `h.P.states.<st>…` pour un paramètre ;
  - `h.duty(state, prix, acheteur, bien, étranger, options)` pour un montant de duty formaté ;
  - `h.calc(...)` pour un résultat complet (`.duty`, `.surcharge`, `.total`, `.saving`, `.grant.amount`, `.rule`) ;
  - `h.aud(n)`, `h.pct(x, décimales)`, `h.num(n, décimales)`, `h.date('2026-07-01')`.
  - acheteur : `'first' | 'owner' | 'investor'` ; bien : `'established' | 'new' | 'vacant' | 'offplan'`.
- `resume` et `faqs` peuvent être des fonctions `(h) => …` pour utiliser ces outils. Les titres et
  descriptions restent des chaînes fixes (calibrées au caractère).
- Un taux « par 100 $ » s'écrit `$${h.num(rate * 100, 2)}` : `h.aud` arrondit au dollar.
- **Un fait absent de ce fichier et de la section « Faits vérifiés » ne se publie pas.** Pas de
  chiffre de presse, de banque ou de mémoire. On écrit ce que dit l'office, ou on se tait.

## Les champs

| Champ | Règle |
|---|---|
| `id` | = nom du fichier. Sert aux liens : `h.a('nsw-first-home-buyers', 'texte')`. Un id inconnu fait échouer le build. |
| `path` | URL complète avec barres : `/vic/off-the-plan-concession/`. Pas d'année. |
| `group`, `kind`, `order` | Groupe de menu, type de page, place dans le groupe (pas de 10). |
| `nav` | Libellé court (menu, fil d'Ariane). |
| `card` | Une phrase pour les cartes « pages liées ». |
| `title` | **50 à 60 caractères**, terme-clé d'abord (« Stamp Duty VIC 2026-27: … », « First Home Buyer Stamp Duty WA 2026: … »). Jamais en tête : `Australia`, `Australian`, `Calculator`, `Calculate`, `About`, `How`, `What`, `When`. Année obligatoire. Pas de tiret cadratin. Compter avec python. |
| `description` | **150 à 160 caractères**, année et un fait chiffré. Unique sur le site. |
| `h1` | Sans année. |
| `intro` | Une phrase. |
| `resume` | **UN** paragraphe d'au moins 125 mots, citable seul, avec chiffres et règle (§21). La première phrase s'affiche, le reste se replie : elle doit porter le message. Ne pas commencer la 2ᵉ phrase par un chiffre. |
| `faqs` | Page d'État (`hub`) et index : **6 à 8** questions. Guide de 1 200 mots et plus : 4 à 8. Page prix : 3 à 5. Réponses de **40 à 90 mots**, avec le chiffre et la condition. Une question n'existe **qu'une fois sur tout le site** : nommer l'État, le prix ou la situation dans la question. Écrire la question comme on la tape. |
| `body` | `(h) => \`…\`` qui renvoie du HTML : `h2`, `h3`, `p`, `ul`, `ol`, `h.table(entêtes, lignes, légende, alignements)`. `<!--mini:<kind>-->` insère un mini-simulateur de plus. |
| `tool` | Page d'État seulement : code de l'État, affiche le calculateur complet. |
| `mini` | Mini-simulateur après le bloc citable : un fichier de `src/lib/minis/`. Existants : `fhbState`, `foreignState`, `grantState`, `investorState`, `propertyTypeState`, `priceCheck`, `cheapestState`, `vicOffPlan`, `waOffPlan`, `pensioner`, `actUnit`, `ntGrants`, `dutiableValue`, `landState`, `changes2026`. Un nouveau sujet = un nouveau fichier qui appelle le moteur (voir `_kit.ts`). |
| `related` | 3 à 6 ids existants. |
| `sources` | Clés de `params-2026.json > sources`. Page d'État et index : au moins 3 sources officielles. |

### Longueurs (comptées par `check-seo.py` dans `<main>`, FAQ et tableaux compris)

- page d'État (`/nsw/`…) : au moins **800 mots** (c'est un index, il a des pages filles) ;
- guide (`/nsw/first-home-buyers/`, `/guides/…`) : au moins **1 200 mots** ;
- page prix (`/prices/stamp-duty-on-750000/`) : au moins **500 mots** et un tableau ;
- index (`/guides/`, `/prices/`) : au moins **800 mots**.

## Ton et langue

- Anglais australien : *transfer duty*, *conveyancer*, *settlement*, *off the plan*, *first home buyer*,
  *principal place of residence*, montants en dollars australiens (`$650,000`), dates « 1 July 2026 ».
  Les termes propres à un office sont expliqués à leur première apparition (FHBAS, FPAD, AFAD, FHOR…).
- Voix humaine, phrases de longueur variable, le chiffre d'abord, des cas concrets (prix, profil, État).
- **Interdits** : le tiret cadratin « — » et le demi-cadratin ; « it's important to note », « dive into »,
  « whether you're… or… », « in today's market » ; « Additionally / Moreover / Furthermore » en enfilade ;
  les triplets systématiques ; les conclusions qui résument ; les émojis ; les listes à puces là où une
  phrase suffit.
- Aucune recommandation de banque, courtier, agent ou conveyancer ; aucun lien vers un site commercial.
- Ne jamais citer ni lier auspaycalculator.com, finalpayau.com ni aucun site de `_trame/domaines-ovh.txt`.

## Unicité (RECETTE §6)

`check-unique.py` compare toutes les pages, chiffres neutralisés, seuil 30 %. Les pages d'un même
type se ressemblent vite : chaque page doit ouvrir sur **ce qui n'appartient qu'à elle** (une règle,
une date, un cas limite, une erreur fréquente propre à cet État ou ce prix), avec un vocabulaire propre.
Ne reprenez aucune tournure d'une autre page, et aucun paragraphe d'un autre site du portefeuille
(`check-portefeuille.py`).

## Faits vérifiés au 2026-10-05 (en plus des paramètres)

Tous lus sur la page officielle citée (clé de source entre crochets).

**NSW**
- Taux 2026/27 indexés au 1er juillet ; l'année de taux suit la date du contrat [nsw_rates].
- Dutiable value = le plus élevé du prix et de la valeur de marché ; valuation exigée entre parties liées,
  sans agent, même cabinet pour les deux parties, etc. Exemples officiels : Yamba 1 350 000 $, Balmain
  4 M$ (premium), Nowra terrain 450 000 $ vendu 300 000 $ au fils [nsw_rates].
- Premium duty : résidentiel seulement ; au-delà de 2 hectares, taux premium sur les 2 premiers hectares au prorata [nsw_rates].
- FHBAS : particulier, 18 ans (dérogeable), jamais propriétaire en Australie (ni le conjoint), jamais
  bénéficiaire du scheme, au moins un acheteur citoyen ou résident permanent ; emménager dans les
  12 mois après le settlement et y vivre 12 mois continus (contrats depuis le 1er juillet 2023) ;
  exemption ADF ; shared equity si les acheteurs éligibles achètent au moins la moitié, pas avec un
  conjoint inéligible [nsw_fhbas]. Formule vérifiée sur le calculateur officiel [nsw_fhbas_calc].
- Duty due dans les 3 mois du contrat, ou au settlement si plus tôt [nsw_otp].
- Off the plan : report de 12 mois de plus (au plus 15 mois après le contrat, ou settlement, ou cession)
  si résidence principale, chaque acheteur citoyen ou résident permanent (ou visa partner 309/820, NZ 444
  avec 200 jours en Australie dans les 12 mois), pas de trust ni société, pas de terrain nu sauf si le
  contrat prévoit la maison ; emménager dans les 12 mois, y vivre 12 mois [nsw_otp].
- Surcharge purchaser duty 9 % de la dutiable value de la part du foreign person ; un NZ ou résident
  permanent non « ordinarily resident » peut la payer même éligible au FHBAS [nsw_fhbas, nsw_spd].
- FHOG (New Homes) 10 000 $ : neuf ≤ 600 000 $ ; terrain + contrat de construction ≤ 750 000 $ ;
  occuper 12 mois continus dans les 12 mois ; demande dans les 12 mois du settlement [nsw_fhog].

**VIC**
- Barème général ; au-delà de 960 000 $ : 5,5 % de la valeur entière ; premium 6,5 % au-delà de 2 M$ [vic_general].
- Concession résidence principale (PPR) : valeur ≤ 550 000 $, pour tout acheteur occupant ; terrain nu
  compris (valeur du terrain seul) ; exemples officiels 400 000 $ → 16 370 $ au lieu de 19 070 $, 550 000 $ → 24 970 $ au lieu de 28 070 $ [vic_ppr].
- Premier achat : exemption ≤ 600 000 $, concession 600 001-750 000 $ ; neuf, ancien ou terrain (valeur
  du terrain seul) ; au moins un acheteur citoyen australien, néo-zélandais ou résident permanent ;
  emménager dans les 12 mois, 12 mois continus ; terrain : au plus tôt 12 mois après le certificat
  d'occupation ou 36 mois après le settlement ; exemption militaires d'active inscrits sur les listes
  électorales victoriennes [vic_fhb].
- Off the plan : la duty porte sur le prix moins les coûts de construction encore à engager. Concession
  temporaire (contrats du 21 octobre 2024 au 21 avril 2027) pour tout acheteur, investisseurs et sociétés
  compris, lots en copropriété (strata) avec parties communes, sans plafond de valeur ; ne s'applique pas
  à la FPAD (calculée sur le prix avant concession). Sinon, concession OTP pour PPR/premier achat avec
  seuils après déduction : 750 000 $ premier achat, 550 000 $ PPR. Exemples officiels : Michelle 1 M$ −
  400 000 $ ; Jordan 1,2 M$, 50 % construit, 250 000 $ déduits ; Paige 620 000 $ − 465 000 $ [vic_otp, vic_otp_temp].
- Pensionné / carte de concession (contrats depuis le 1er juillet 2023) : exemption ≤ 600 000 $,
  concession jusqu'à 750 000 $, une seule fois, choisir entre ce régime et celui du premier achat [vic_pensioner].
- FPAD 8 % depuis le 1er juillet 2019 [vic_fpad]. FHOG 10 000 $ neuf ≤ 750 000 $ (depuis le 1er juillet 2013) [vic_fhog].

**QLD**
- Barème « par 100 $ ou fraction » ; exemple officiel 850 000 $ investissement → 31 275 $ [qld_rates].
- Home concession (résidence, pas premier achat) : barème réduit ; exemple 950 000 $ → 28 600 $ [qld_concession_rates].
- First home concession (ancien) : home concession rate moins un montant (17 350 $ sous 710 000 $, puis
  −1 735 $ par tranche de 10 000 $, rien à 800 000 $) ; exemple 795 000 $ → 19 890 $ [qld_concession_rates].
- First home (new home) et first home vacant land : concession totale, sans plafond, contrats depuis le
  1er mai 2025 ; la part de terrain non résidentielle paie le barème normal [qld_concession_rates, qld_first_home_new].
- Depuis le 1er août 2026 : pour les concessions home / first home, être citoyen, résident permanent ou
  « specified foreign retiree » ; emménager dans l'année du settlement (non prolongeable) ; pas de
  location de tout le bien avant d'emménager ni dans l'année suivante ; louer une partie possible si on
  continue d'y vivre (baux commencés depuis le 10 septembre 2024) ; démolir avant d'avoir habité fait
  perdre la concession [qld_first_home, qld_home_concession].
- AFAD 8 % [qld_afad]. FHOG 30 000 $ (contrats depuis le 20 novembre 2023), neuf < 750 000 $, citoyen ou
  résident permanent, revenu sans effet, occuper 6 mois dans l'année [qld_fhog].

**WA**
- Taux général et taux concessionnel (résidence principale ≤ 200 000 $) [wa_rates].
- First home owner rate depuis le 7 mai 2026 : maison ≤ 600 000 $ nul, 600 001-800 000 $ 16,15 $ par
  100 $ au-delà de 600 000 $ ; terrain ≤ 450 000 $ nul, jusqu'à 550 000 $ 20,14 $ par 100 $ ; avant :
  500 000 $ / 700 000 $ (Perth et Peel) ou 750 000 $ (ailleurs), du 21 mars 2025 au 6 mai 2026 ;
  éligibilité alignée sur la FHOG (ancien compris) ; si pas de pré-approbation, payer le taux général
  au settlement puis demander le remboursement [wa_fhor, wa_rates].
- Foreign transfer duty 7 % ; exemple officiel Kate et Simon 400 000 $ en joint tenants : 14 000 $ sur la
  moitié de Simon [wa_fhor, wa_ftd].
- Off the plan (12 mars 2026 - 30 juin 2028) : pré-construction 100 % de la duty jusqu'à 800 000 $,
  dégressif jusqu'à 50 % à 900 000 $ ; en construction 75 % → 37,5 % ; plafond 50 000 $ ; immeubles
  strata multi-niveaux, mono-niveau (depuis le 21 mars 2025), survey-strata (depuis le 12 mars 2026) ;
  demande dans les 12 mois de l'inscription au titre [wa_otp].
- FHOG 10 000 $, neuf ; plafond 800 000 $ au sud du 26e parallèle (Perth inclus), 1 000 000 $ au nord,
  transactions depuis le 7 mai 2026 (avant : 750 000 $) [wa_fhog].

**SA**
- Barème des conveyances non indexé ; lu sur la page RevenueSA (capture 2022) et corroboré par l'avis
  RevenueSA du 28 avril 2026 (plafond de 103 830 $ = duty sur 2 M$) [sa_rates, sa_seniors].
- First home buyer relief : contrats depuis le 13 février 2025, relief totale sans plafond sur neuf,
  off-the-plan apartment ou terrain pour construire ; rien sur l'ancien ; pas appliquée à la foreign
  ownership surcharge ; occuper 6 mois continus dans les 12 mois [sa_fhb_relief, sa_fhb_properties].
- Foreign ownership surcharge 7 % sur la part acquise ; exemple 600 000 $ → 26 830 $ + 42 000 $ [sa_fos].
- FHOG jusqu'à 15 000 $, neuf, sans plafond depuis le 6 juin 2024, pas pour un terrain seul [sa_fhog].
- Seniors (60 ans et plus) downsizing relief, contrats depuis le 25 mars 2026 : vendre sa résidence
  principale, racheter un neuf, un off-the-plan apartment ou un terrain à bâtir, terrain plus petit ;
  jusqu'à 103 830 $ [sa_seniors]. Détail des conditions non lu : ne pas en dire plus.

**TAS**
- Barème depuis le 21 octobre 2013, minimum 50 $ [tas_rates].
- Exemption 100 % premier achat dans l'ancien ≤ 750 000 $ : **terminée** pour les settlements après le
  30 juin 2026 ; concession off-the-plan apartment : terminée pour les contrats après le 30 juin 2026 ;
  pensioner downsizing : ventes réglées au plus tard le 30 juin 2025 [tas_fhb, tas_concessions, tas_pensioner].
- FIDS 8 % résidentiel (1,5 % agricole) depuis le 1er avril 2020 [tas_fids].
- FHOG 20 000 $ pour les transactions du 1er juillet 2026 au 30 juin 2027 (30 000 $ en 2025-26) ; neuf ;
  construction achevée dans les 24 mois ; occuper 6 mois dans les 12 mois [tas_fhog].

**ACT**
- Taux propriétaire-occupant et non occupant 2025-27, au-delà de 1 455 000 $ : 4,54 % de la valeur
  entière [act_rates].
- Home Buyer Concession Scheme : depuis le 1er juillet 2026, plus de plafond de revenu ni de valeur :
  aucune conveyance duty si éligible ; conditions : particuliers de 18 ans, aucun intérêt dans un bien
  (n'importe où) dans les 5 ans avant le contrat, vivre 1 an dans le logement en commençant dans l'année
  du settlement ; neuf, ancien et terrain résidentiel [act_hbcs].
- Pensioner Duty Concession Scheme : depuis le 1er juillet 2026, plus de plafond de valeur, aucune duty
  [act_pensioner].
- Off the plan units (appartements, townhouses en unit title), occupant : aucune duty depuis le
  1er juillet 2026 sans plafond (avant : ≤ 1 020 000 $) ; vivre 1 an [act_otp].
- Newly Unit Titled Duty Exemption : depuis le 1er juillet 2026, unité neuve achetée au promoteur dans
  les 2 ans de l'enregistrement du plan, y vivre [act_unit_titled].
- FHOG : terminée le 1er juillet 2019 [act_fhog]. Le calculateur officiel ne pose aucune question
  « acheteur étranger » [act_rates].

**NT**
- Formule officielle (code du calculateur nt.gov.au) : ≤ 525 000 $ : (0,06571441 × V² + 15 × V) avec V = valeur / 1 000 ;
  puis 4,95 % de la valeur ; 5,75 % à partir de 3 M$ ; 5,95 % à partir de 5 M$ [nt_calc].
- Duty due dans les 60 jours de la signature, ou au settlement si plus tôt [nt_stamp_duty].
- House and Land Package Exemption : contrats du 1er juillet 2022 au 30 juin 2027, maison et terrain
  achetés à un building contractor en une transaction, sans condition de ressources ni plafond ;
  y vivre dans les 12 mois de l'achèvement, 6 mois continus [nt_hlpe].
- HomeGrown Territory Grant 50 000 $ (premier achat, neuf, sans plafond, off the plan et owner-builder
  compris, pas de terrain seul) et FreshStart New Home Grant 30 000 $ (non-primo, neuf) : contrats du
  1er octobre 2024 au 30 septembre 2027 ; demande FreshStart avant le 31 décembre 2027, HomeGrown avant
  le 30 septembre 2028 ; vivre 12 mois ; le grant de 10 000 $ sur l'ancien a pris fin le 30 septembre 2025
  [nt_homegrown, nt_assistance].
- Pas de concession premier achat sur la duty d'un logement ancien en 2026 (la page « home owner
  assistance » ne liste que les grants et la HLPE) ; le calculateur officiel n'ajoute aucune surtaxe [nt_assistance, nt_calc].

## Étapes

1. Lire `nsw.ts`, `params-2026.json`, `states.ts`, `page-types.ts` et cette notice.
2. Écrire le fichier (ou remplacer le stub `// STUB`).
3. `npx astro build` puis les contrôles ci-dessous sur le site entier.
4. Commit local en français, dernière ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Pas de push.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/au-stamp-duty
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build                      # inclut typo-nbsp et check-snippets (bloquant)
npx vitest run
python3 scripts/check-seo.py .
python3 scripts/check-trame.py .
python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py .
python3 scripts/check-regles.py .
python3 scripts/check-portefeuille.py .
python3 scripts/check-liens.py .
node scripts/check-legal.mjs .
node scripts/check-sources.mjs .
node scripts/check-contraste.mjs dist
node scripts/check-saisie.mjs dist --max=60
node scripts/check-nombres.mjs dist
node scripts/typo-nbsp.mjs dist --check
node scripts/check-layout.mjs dist > /tmp/layout-au.log 2>&1 &   # long : en arrière-plan
```

Limites connues :
- `check-sources.mjs` : RevenueSA, ACT Revenue Office, nt.gov.au et treasury.nt.gov.au répondent 403
  aux robots (« bloqués », non bloquant). Les captures `via` de web.archive.org répondent 200.
- Pour arrêter un serveur : `lsof -ti tcp:<port> | xargs kill`, jamais `pkill -f` avec un motif court.

## Ce qu'on ne fait pas

- Pas de dépôt GitHub, pas de push, pas de DNS, pas de Chrome.
- Ne toucher ni à `_trame` ni à la RECETTE : les suggestions vont dans le compte rendu.
- `ADS_ENABLED` reste désactivé ; au plus 3 emplacements publicitaires par page le jour où ils s'ouvrent.
