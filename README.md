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
- **vitest** - Test unitaire
- **storybook** - Test composants
- **playwright** - Test E2E

### Spécificités

Ce projet a été déployé via un conteneur Docker sur un serveur dédié dont l'ip ne sera point montré pour éviter les fuites.

Différentes pages sont trouvables sur ce projet :

- Page Accueil avec présentation des technos utilisés
- Page Mon compte avec la possibilité de s'inscrire en anonyme ou non avec un aperçu de son image de profil à prendre du côté de la page photos
- Page Photos permettant de se prendre en photo et de sélectionner sa photo de profil
- Page Conversation permettant de rejoindre un canal textuel via socket.io
- Page Géolocalisation qui sert à se Géolocaliser
- Page Chat servant à discuter (textes, images) avec des gens après avoir choisi sa room via Page Conversation

Sur la Navbar il est censé avoir le niveau de batterie de la personne mais l'api est dépréciée.
