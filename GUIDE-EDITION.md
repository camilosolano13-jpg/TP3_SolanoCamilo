# Guide rapide pour modifier et publier le site toi-même

## 1. Ouvrir le projet
Ouvre le dossier `D:\TP3_SOLANOcamilo` avec **VS Code** (ou l'éditeur de ton choix).

## 2. Modifier le contenu

- **Texte, liens, images** : ouvre le fichier `.html` de la page concernée
  (`index.html`, `routes.html`, `tutoriels.html`, `permis.html`, `contact.html`)
  et modifie directement le texte entre les balises.
- **Ajouter une photo** : dépose le fichier image dans le dossier `img/`, puis
  référence-le dans le HTML avec `<img src="img/ton-fichier.jpg" alt="...">`.
- **Couleurs / styles Tailwind** : si tu changes seulement des classes Tailwind
  déjà utilisées ailleurs (ex. `text-racing-red`, `col-span-6`), aucune
  recompilation n'est nécessaire — le fichier `css/styles.css` est déjà
  compilé et contient déjà tous ces styles utilisés dans le projet.
- **Si tu ajoutes une classe Tailwind qui n'apparaît nulle part ailleurs**
  dans le projet, il faut recompiler le CSS (voir étape 3).

## 3. (Optionnel) Recompiler le CSS

Seulement si tu as ajouté une classe Tailwind inédite. Ouvre un terminal dans
le dossier du projet et lance :

```bash
npm run build:css
```

## 4. Prévisualiser en local avant de publier

Comme le site utilise des chemins relatifs et un Service Worker, ouvrir les
fichiers `.html` directement (double-clic) fonctionne pour l'essentiel, mais
pour un aperçu fidèle (surtout la PWA), lance un petit serveur local :

```bash
npx serve .
```

Puis ouvre l'adresse affichée (ex. `http://localhost:3000`) dans ton
navigateur. `Ctrl+C` dans le terminal pour arrêter le serveur.

## 5. Envoyer les changements sur GitHub

Dans un terminal, à la racine du projet (`D:\TP3_SOLANOcamilo`) :

```bash
git add -A
git commit -m "Décris brièvement ton changement ici"
git push
```

C'est tout ! GitHub Pages redéploie automatiquement le site en 1 à 2 minutes.
Vérifie ensuite sur : https://camilosolano13-jpg.github.io/TP3_SolanoCamilo/

## Rappels utiles

- `git status` : voir quels fichiers ont été modifiés avant de commit.
- `git log --oneline` : voir l'historique des commits.
- Si tu casses quelque chose et veux annuler des changements **non commités** :
  `git checkout -- nom-du-fichier.html`
- Le dépôt : https://github.com/camilosolano13-jpg/TP3_SolanoCamilo
