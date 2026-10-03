# Tisy Clean — Site vitrine

Site vitrine pour **Tisy Clean**, nettoyage automobile et canapé à domicile (La Réunion).

## Stack technique

- HTML / CSS / JavaScript (site statique)
- Serveur local Node.js (`server.js`)

## Prérequis

- Node.js >= 14.x (ou le binaire local `.node-local/bin/node`)

## Développement

```bash
export PATH="$(pwd)/.node-local/bin:$PATH"   # si Node n'est pas installé globalement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Sections principales :

| Section | URL |
|---------|-----|
| Accueil | [http://localhost:3000](http://localhost:3000) |
| Tarifs | [http://localhost:3000/#tarifs](http://localhost:3000/#tarifs) |
| Contact | [http://localhost:3000/#contact](http://localhost:3000/#contact) |

## Structure du projet

```
/
├── index.html      # Page principale (one-page)
├── style.css       # Styles
├── script.js       # Interactions (menu, FAQ, formulaire, slider)
├── server.js       # Serveur local port 3000
├── scripts/build.js # Build statique → dist/ (Vercel)
├── images/         # Photos et logos
├── robots.txt
└── sitemap.xml
```

## Déploiement

Déployez le dossier racine (`index.html`, `style.css`, `script.js`, `images/`) sur n'importe quel hébergeur statique :

- [Netlify](https://netlify.com) — publish: racine du projet
- [GitHub Pages](https://pages.github.com)
- Hébergement classique (Apache / Nginx)

## Contact

- Téléphone : 06 93 47 43 65
- Zone : Tampon, Saint-Louis, Saint-Pierre, Saint-Joseph
