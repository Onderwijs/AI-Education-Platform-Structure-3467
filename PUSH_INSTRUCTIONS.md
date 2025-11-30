# 🚀 PUSH INSTRUCTIES VOOR WEB ENVIRONMENTS

**LET OP:** Je werkt in een browser-omgeving (WebContainer). Hier is **geen Git** beschikbaar. Je kunt niet direct pushen naar GitHub.

## Hoe krijg ik mijn code op GitHub?

### Stap 1: Download de code
1. Klik met de rechtermuisknop op de root folder in de bestandsverkenner links (of gebruik het download icoon van de editor).
2. Kies **Download Project** (of exporteer als ZIP).

### Stap 2: Lokaal uitpakken
1. Pak het ZIP-bestand uit op je eigen computer.
2. Open de map in je lokale terminal of VS Code.

### Stap 3: Push vanaf je computer
Voer de volgende commando's uit in je lokale terminal:

```bash
# 1. Initialiseer git (als dat nog niet gebeurd is)
git init

# 2. Voeg je remote toe (vervang URL met jouw repo)
git remote add origin https://github.com/JOUW_NAAM/JOUW_REPO.git

# 3. Voeg bestanden toe
git add .

# 4. Commit je wijzigingen
git commit -m "Update lesbrieven en content"

# 5. Push naar GitHub
git push -u origin main
```

## Wat is er gewijzigd?
- ✅ Alle lesbrieven in `src/data/lessons.js` zijn inhoudelijk verdiept.
- ✅ Weergavefout in LesLab opgelost (introductie tekst is nu zichtbaar).
- ✅ PDF generator geüpdatet om de nieuwe introducties mee te nemen.