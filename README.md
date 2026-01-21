This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prérequis

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# PWA APP

Ce projet fût une ouverture à de nouvelles technologies, permettant d'éveiller notre âme de développeur à de nouvelles possibilités

## Qu'est-ce qu'une PWA ?

Une PWA (pour Progressive Web Application) est une application web compatible pour tous les OS et tous les navigateurs (sauf Safari), ayant comme obligations de :

- Être disponible hors-ligne
- Être téléchargeable
- Être synchronisé à tout moment (si accès internet il y a)

C'est une solution ayant ses avantages et ses inconvénients comme par exemple
le fait qu'elle soit très légère bien plus qu'une application dure ou mobile
mais en contrepartie l'accès au côté matériel d'un outil (pc, mobile,etc ...) est amoindrie.

## Outils Utilisés

- Typescript
- React
- Next.js
- Socket.io
- Claude AI

## Next.js, c'est quoi ?

Next.js est un framework React permettant de construire des applications web modernes et performantes. Il simplifie le développement en fournissant une structure de projet optimisée et des fonctionnalités essentielles intégrées.

C'est une solution très complète ayant comme avantages :

- Un rendu côté serveur et génération statique flexible selon vos besoins
- Un routing automatique basé sur le système de fichiers sans configuration complexe
- Une optimisation des performances intégrée (code splitting, image optimization, lazy loading)
- La possibilité de créer des API routes directement dans l'application
- Un support natif des PWA avec service workers et manifests
- Un déploiement simplifié sur Vercel ou tout serveur Node.js

En contrepartie, Next.js peut être plus complexe à mettre en place pour des petits projets simples et nécessite une bonne compréhension de React pour en tirer le meilleur parti.

## Le but de ce projet

Le but de celui-ci était de découvrir les deux technologies détaillées plus haut à savoir la PWA et Next.js, à travers un TP ayant plusieurs étapes à la clés, dès à présent voici les explications pour savoir comment déployer celui-ci

### ÉTAPE 1 Installation du projet

### Installation de Node.js et npm

Pour commencer, téléchargez et installez Node.js et npm à partir de ce lien https://nodejs.org/en/download (version LTS, c'est la dernière version stable)

Ensuite, vérifiez l'installation :

```bash
node --version
npm --version
```

### Installation du Projet Next.js

Après avoir récupérer ce projet, vous devez faire depuis un terminal, dans le dossier du projet :

```bash
npm install
```

Cela va installer tout ce dont a besoin le projet pour fonctionner

### Dépendances du Projet

Ainsi ces dépendances seront installées durant le npm install :

- **next** - Framework React
- **react** & **react-dom** - Interface utilisateur
- **next-pwa** - Support PWA
- **@heroui/react** - Composants UI
- **framer-motion** - Animations
- **socket.io** & **socket.io-client** - Communication temps réel
- **@vis.gl/react-google-maps** - Google Maps
- **tailwindcss** - Framework CSS
- **typescript** - Typage statique

