# Onderwijs.ai Platform
Een uitgebreid platform voor Nederlandse docenten om AI verantwoord en effectief in te zetten in de lespraktijk.

## 🚀 Deployment & Beheer
Voor een schone deployment op Netlify of Vercel:
1. Wis de browsercache of gebruik Incognito modus.
2. Gebruik `npm run build` voor productie-output.
3. PDF-bestanden worden dynamisch gegenereerd om cache-problemen te voorkomen.

### GitHub Push Instructies
Download het project als ZIP en voer lokaal uit:
```bash
git init
git remote add origin [URL]
git add .
git commit -m "Optimize structure"
git push -u origin main
```

### Netlify Fixes
Als de site niet laadt, controleer de `dist` folder en zorg dat de build settings in Netlify overeenkomen met:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## 🛠 Architectuur
Dit project is geoptimaliseerd naar 48 bestanden door consolidatie van documentatie, CSS en het verwijderen van ongebruikte boilerplate-componenten. Alle tools en content blijven 100% functioneel.