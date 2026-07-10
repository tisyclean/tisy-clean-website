# Tisy Clean — Site vitrine Next.js

Site vitrine moderne pour **Tisy Clean**, nettoyage automobile et canapé à domicile (La Réunion).

## Stack technique

- Next.js 13.4.12
- React 18.2.0
- Tailwind CSS 3.2
- Lucide React (icônes)

## Prérequis

- Node.js >= 14.x
- npm

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Structure du projet

```
/
├── components/          # Composants UI réutilisables
│   ├── HeroSlider.js    # Slider plein écran avec CTA
│   ├── StorySection.js  # Section histoire / à propos
│   ├── ReviewSection.js # Témoignages clients
│   ├── MenuPage.js      # Grille tarifs & prestations
│   ├── Navigation.js    # Navigation sticky responsive
│   ├── Footer.js        # Pied de page
│   ├── Logo.js          # Logo texte en couches
│   ├── ContactSection.js
│   └── StrengthsSection.js
├── pages/               # Pages Next.js
│   ├── index.js         # Accueil
│   └── services.js      # Tarifs & prestations
├── public/images/       # Assets statiques
├── styles/globals.css   # Styles globaux + Tailwind
└── utils/ThemeContext.js
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil — hero, histoire, points forts, témoignages, contact |
| `/services` | Tarifs & prestations détaillés |

## Déploiement

- [Vercel](https://vercel.com) — importez le repo (recommandé pour Next.js)
- [Netlify](https://netlify.com) — build command: `npm run build`, publish: `.next`

## Contact

- Téléphone : 06 93 47 43 65
- Zone : Tampon, Saint-Louis, Saint-Pierre, Saint-Joseph
