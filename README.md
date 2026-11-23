# CV – Léo Monsterleet

CV en ligne réalisé avec Next.js (export statique), déployé sur GitHub Pages.

- Contenu du CV : `app/data.ts`
- Mise en page : `app/page.tsx` et `app/globals.css`

## Lancer en local

```bash
npm install
npm run dev
```

## Déploiement

Automatique à chaque push sur `main` (workflow `.github/workflows/deploy.yml`).
À activer une fois : Settings → Pages → Source : **GitHub Actions**.
