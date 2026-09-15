# camibike360 — TP3_SolanoCamilo

Site web personnel réalisé dans le cadre du **Travail Pratique 3** du cours *Technique d'intégration des interfaces Web 2*.

camibike360 est le site compagnon d'une chaîne YouTube consacrée à la moto : routes recommandées au Québec, tutoriels d'entretien et de conduite, sécurité, et réglementation du permis moto.

- **Dépôt Git :** https://github.com/camilosolano13-jpg/TP3_SolanoCamilo
- **Site hébergé (GitHub Pages) :** https://camilosolano13-jpg.github.io/TP3_SolanoCamilo/

## Aperçu des pages

| Page | Fichier | Sections principales |
|---|---|---|
| Accueil | `index.html` | Hero + dernières vidéos (4 cards) + à propos court |
| Routes | `routes.html` | Intro + galerie de 6 routes (difficulté/distance) + vidéo vedette |
| Tutoriels & Conseils | `tutoriels.html` | Catégories filtrables (Entretien / Conduite / Sécurité) + 9 cards vidéo + conseils rapides |
| Permis & Réglementation | `permis.html` | Étapes (timeline) + coûts + FAQ en accordéon |
| À propos / Contact | `contact.html` | Histoire personnelle + réseaux sociaux + formulaire (9 champs) + liens du projet |

## Stack technique

- **HTML5** sémantique, validé sans erreur par le [validateur W3C](https://validator.w3.org/nu/).
- **Tailwind CSS 3** compilé en CSS statique via la CLI (pas de CDN en production, pour éviter l'avertissement console et garder un bundle propre).
- **Méthodologie BEM** pour tous les composants personnalisés (`.card__title`, `.navbar__link--active`, `.accordion__panel--open`, etc.), combinée aux classes utilitaires Tailwind pour la mise en page (grille 12 colonnes).
- **JavaScript natif (vanilla)**, sans framework, réparti en `js/main.js` (navigation, révélation au scroll, accordéon, filtre, PWA) et `js/validation.js` (validation du formulaire).
- **PWA** : manifest, Service Worker, cache, mode hors-ligne.

## Installation et build

Le CSS de production (`css/styles.css`) est déjà généré et versionné dans le dépôt : le site fonctionne tel quel sur GitHub Pages sans étape de build. Pour modifier le style :

```bash
npm install
npm run watch:css   # recompile css/styles.css à chaque modification de src/input.css
npm run build:css   # build minifié unique
```

## Grille Tailwind responsive à 12 colonnes

Toutes les mises en page principales (navbar, hero, grilles de cards, footer, formulaire) utilisent `grid grid-cols-12` avec des `col-span-*` responsives (`col-span-12 sm:col-span-6 lg:col-span-4`, etc.). Le site a été testé et reste pleinement utilisable jusqu'à ~500px de large, sans défilement horizontal.

## Composantes Tailwind (minimum 3 requis)

Composants construits à la main en classes BEM stylées avec `@apply` (Tailwind), inspirés des patrons suivants :

1. **Navbar responsive avec menu mobile** (`.navbar`, `.navbar__toggle`, `.navbar__menu`) — présente sur les 5 pages.
   Source d'inspiration : [Flowbite Navbar](https://flowbite.com/docs/components/navbar/)
2. **Cards vidéo/route** (`.card`, `.card__media`, `.card__body`, `.card__footer`) — utilisées sur `index.html`, `routes.html`, `tutoriels.html`.
   Source d'inspiration : [Flowbite Card](https://flowbite.com/docs/components/card/)
3. **Accordéon FAQ** (`.accordion__item`, `.accordion__button`, `.accordion__panel`) — utilisé sur `permis.html`.
   Source d'inspiration : [Flowbite Accordion](https://flowbite.com/docs/components/accordion/)
4. *(bonus)* **Formulaire structuré** (`.form__group`, `.form__input`, `.form__error`) — utilisé sur `contact.html`.
   Source d'inspiration : [Tailwind CSS — Forms plugin patterns](https://tailwindcss.com/docs/plugin#adding-component-classes)

## Animations (minimum 3 requis)

1. **Révélation au défilement** (`.reveal` / `.reveal--visible`, dans `js/main.js`) : les sections apparaissent en fondu + translation via `IntersectionObserver`, sur les 5 pages.
   Technique inspirée de l'article [*Animate elements as they scroll into view* — web.dev](https://web.dev/articles/intersectionobserver-v2).
2. **Accordéon FAQ animé** (`permis.html`) : transition CSS fluide de `grid-template-rows` (0fr → 1fr) pour ouvrir/fermer chaque réponse, technique du ["CSS grid trick" pour animer une hauteur automatique](https://css-tricks.com/using-css-transitions-auto-dimensions/).
3. **Pulsation lumineuse du bouton principal** (`animate-pulse-glow`, `tailwind.config.js`) : keyframe Tailwind personnalisée simulant un halo qui pulse, sur le bouton d'appel à l'action de la page d'accueil.
4. *(bonus)* **Lignes de vitesse animées** dans le hero de l'accueil (`.speed-lines`, keyframe `speed-lines`) et effet de survol des cards (translation + bordure), créations personnelles inspirées de l'esthétique course automobile/moto.

Toutes les animations respectent `prefers-reduced-motion` implicitement via des durées courtes ; le contenu reste visible sans JavaScript grâce à une règle `<noscript>` qui neutralise l'effet de révélation.

## PWA (Progressive Web App)

- **Manifest** (`manifest.json`) : nom, nom court, description, `start_url`, `display: standalone`, couleurs de fond/thème, une capture d'écran (`screenshots/accueil.png`), et 5 icônes dont 3 **maskables** (144×144, 192×192, 512×512) générées en interne (`icons/`).
- **Service Worker** (`sw.js`) : précache l'app shell (pages HTML, CSS, JS, icônes) à l'installation, stratégie *network-first* avec repli sur le cache pour la navigation, *cache-first* pour les ressources statiques, et page `offline.html` affichée si une page non mise en cache est demandée hors-ligne.
- **Mode hors-ligne** : une fois le site visité une première fois, il reste consultable sans connexion.

> Remarque : le Service Worker nécessite un contexte sécurisé (HTTPS ou `localhost`). Il fonctionnera pleinement une fois le site publié sur GitHub Pages (HTTPS par défaut).

## Formulaire et validation JavaScript personnalisée

Le formulaire de contact (`contact.html`) contient **9 champs** (prénom, nom, courriel, téléphone, ville, sujet, type de moto, message, infolettre, conditions).

- L'attribut `novalidate` est présent sur le `<form>` : **la validation HTML5 native est désactivée**.
- Toute la validation est faite « à la main » dans `js/validation.js` : expressions régulières pour le courriel et le téléphone, longueur minimale pour les champs texte, case à cocher obligatoire pour les conditions, avec retour visuel immédiat (bordure rouge + message d'erreur) au *blur* et à la soumission, et focus automatique sur le premier champ invalide.

## Accessibilité de base

- Structure sémantique (`header`, `nav`, `main`, `section`, `footer`), une seule balise `h1` par page, hiérarchie de titres respectée.
- Lien d'évitement (« Aller au contenu principal ») en haut de chaque page.
- Tous les champs de formulaire ont un `<label>` associé ; messages d'erreur liés via `aria-describedby`.
- `aria-expanded` / `aria-controls` sur le menu mobile et l'accordéon ; `aria-current="page"` sur le lien de navigation actif.
- Contraste texte/fond conforme (texte clair `#F5F5F5` sur fond sombre `#0D0D0D` / `#1A1A1A`).
- Icônes décoratives marquées `aria-hidden="true"`; icônes interactives accompagnées d'un `aria-label`.

## Git

Le dépôt a été initialisé dès le début du développement, avec des commits réguliers correspondant aux grandes étapes du projet (configuration initiale, structure HTML, PWA/JS, corrections de validation W3C, etc.) — voir l'historique des commits.

## Auteur

Camilo Solano — Projet réalisé avec l'aide d'un outil d'intelligence artificielle (Claude), tel qu'autorisé par les consignes du travail.
