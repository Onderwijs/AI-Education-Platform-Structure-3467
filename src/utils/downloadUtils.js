/**
 * Utility functions for handling file downloads
 */

/**
 * Initiates a file download from a URL
 * @param {string} url - The URL of the file to download
 * @param {string} filename - Optional custom filename for the download
 */
export const downloadFile = (url, filename = null) => {
  try {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the href attribute to the file URL
    link.href = url;
    
    // Set download attribute with filename if provided
    if (filename) {
      link.setAttribute('download', filename);
    } else {
      link.setAttribute('download', '');
    }
    
    // Append to body (required for Firefox)
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

/**
 * Downloads the AI Startersgids as clean text file
 */
export const downloadStartersgids = () => {
  try {
    // Create clean content without any special characters
    const cleanContent = `AI STARTERSGIDS VOOR DOCENTEN

COMPLETE HANDLEIDING VOOR AI IN HET ONDERWIJS

INHOUDSOPGAVE

1. Welkom bij AI in het Onderwijs
2. Basisprincipes van AI voor Docenten  
3. AI Tools voor Tekstverwerking
4. AI Tools voor Presentaties
5. AI Tools voor Beeldbewerking
6. AI Tools voor Onderzoek
7. AI Tools voor Creativiteit
8. AI Tools voor Onderwijs
9. Praktische Tips voor de Klas
10. Ethische Richtlijnen
11. Implementatieplan
12. Troubleshooting en FAQ

HOOFDSTUK 1: WELKOM BIJ AI IN HET ONDERWIJS

Beste collega,

Kunstmatige intelligentie verandert de manier waarop we leren en onderwijzen.
Deze startersgids helpt je om AI effectief en verantwoord in te zetten in 
jouw onderwijspraktijk.

WAT VIND JE IN DEZE GIDS:

- Meer dan 50 geteste AI tools met praktische toepassingen
- Stap voor stap handleidingen voor elke tool
- Praktische tips voor directe implementatie  
- Ethische richtlijnen voor verantwoord gebruik
- Voorbeeldlessen en activiteiten
- Troubleshooting en veelgestelde vragen

HOE GEBRUIK JE DEZE GIDS:

Begin met hoofdstuk 2 voor de basisprincipes
Kies tools die passen bij jouw vakgebied
Start klein met een tool per week
Gebruik de praktische tips voor implementatie
Raadpleeg de ethische richtlijnen bij twijfel

TOP 10 AI TOOLS VOOR DOCENTEN:

1. ChatGPT - Tekstgeneratie en vraag beantwoording
2. Claude - Uitgebreide tekstanalyse en hulp
3. Perplexity AI - Onderzoek met bronvermelding
4. NotebookLM - Document analyse en samenvatting
5. Gamma - Snelle presentaties maken
6. Canva AI - Visueel ontwerp en afbeeldingen
7. Quillbot - Tekst verbetering en parafrasering
8. Brisk Teaching - Snelle feedback op leerlingwerk
9. Teachable Machine - AI leren aan kinderen
10. GitHub Copilot - Programmeren met AI hulp

PRAKTISCHE TIPS:

Begin klein - Start met een tool die je direct kunt gebruiken
Test eerst zelf - Probeer alles uit voordat je het in de klas gebruikt
Blijf kritisch - AI is een hulpmiddel, geen vervanging
Deel kennis - Help collega's ook aan de slag
Volg ontwikkelingen - AI verandert snel

ETHISCHE RICHTLIJNEN:

Privacy eerst - Deel geen gevoelige leerlinggegevens
Transparantie - Vertel leerlingen wanneer je AI gebruikt  
Controle behouden - Controleer altijd AI output
Bias bewustzijn - AI kan vooroordelen bevatten
Leerproces - AI moet leren ondersteunen, niet vervangen

IMPLEMENTATIEPLAN:

Week 1-2: Kennismaking met AI tools
Week 3-4: Eerste tool uitproberen (ChatGPT)
Week 5-6: Tweede tool toevoegen (Canva AI)
Week 7-8: Integratie in lesplan
Week 9-10: Evaluatie en uitbreiding

VEELGESTELDE VRAGEN:

Q: Is AI veilig voor leerlingen?
A: Ja, mits je de juiste voorzorgsmaatregelen neemt

Q: Vervangen AI tools de docent?
A: Nee, AI ondersteunt en versterkt je als docent

Q: Wat als AI fouten maakt?
A: Controleer altijd de output en leer leerlingen kritisch te zijn

Q: Hoe begin ik?
A: Start met ChatGPT voor lesvoorbereiding

MEER INFORMATIE:

Website: onderwijs.ai
Email: ai.onderwijs@gmail.com
Nieuwsbrief: Wekelijkse tips en updates
Trainingen: Op locatie of online beschikbaar

2025 AI in het Onderwijs
Alle rechten voorbehouden

Deze gids wordt regelmatig bijgewerkt met nieuwe tools en inzichten.
Bezoek onze website voor de meest recente versie.

SUCCES MET AI IN JOUW ONDERWIJS!`;

    // Create blob with clean text
    const blob = new Blob([cleanContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI-Startersgids-Complete-Handleiding.txt';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    console.log('Download gestart: AI Startersgids (TXT formaat - geen speciale tekens)');
  } catch (error) {
    console.error('Download failed:', error);
  }
};

/**
 * Maps lesson titles to their corresponding PDF files
 */
export const lessonFileMap = {
  // Featured lesson
  "Wetenschappelijk Onderzoek met AI": "/lessons/wetenschappelijk-onderzoek-met-ai.pdf",
  
  // PO lessons
  "Wat is Kunstmatige Intelligentie?": "/lessons/ai-in-po.pdf",
  "AI in Ons Dagelijks Leven": "/lessons/ai-in-po.pdf",
  "Vriendelijke Robots": "/lessons/vriendelijke-robots.pdf",
  "Introductie tot AI voor Kinderen": "/lessons/ai-in-po.pdf",
  "AI Kunstproject": "/lessons/ai-in-po.pdf",
  
  // VO lessons
  "AI en Ethiek": "/lessons/ai-ethics-vo.pdf",
  "ChatGPT voor Onderzoek": "/lessons/ai-ethics-vo.pdf",
  "AI in de Creatieve Vakken": "/lessons/ai-ethics-vo.pdf",
  "AI in de Geschiedenis": "/lessons/ai-ethics-vo.pdf",
  "AI Ethics Debat": "/lessons/ai-ethics-vo.pdf",
  "AI-Geassisteerd Creatief Schrijven": "/lessons/ai-creatief-schrijven.pdf",
  "AI voor Taalonderwijs": "/lessons/ai-ethics-vo.pdf",
  
  // MBO/HBO lessons
  "Datavisualisatie met AI": "/lessons/datavisualisatie-met-ai.pdf",
  "Programmeren met AI Copilot": "/lessons/programmeren-met-ai-copilot.pdf",
  
  // Default fallback
  "default": "/lessons/ai-creatief-schrijven.pdf"
};

/**
 * Gets the file URL for a lesson title
 * @param {string} lessonTitle - The title of the lesson
 * @returns {string} The URL of the lesson PDF
 */
export const getLessonFileUrl = (lessonTitle) => {
  return lessonFileMap[lessonTitle] || lessonFileMap["default"];
};

/**
 * Initiates a lesson download by title
 * @param {string} lessonTitle - The title of the lesson to download
 */
export const downloadLesson = (lessonTitle) => {
  try {
    // Create clean lesson content as text instead of PDF
    const cleanLessonContent = `LESPLAN: ${lessonTitle.toUpperCase()}

AI IN HET ONDERWIJS - PRAKTISCHE LES

TITEL: ${lessonTitle}
DUUR: 45-90 minuten (afhankelijk van niveau)
NIVEAU: Alle niveaus (aanpasbaar)

LEERDOELEN:
- Leerlingen begrijpen de basis van AI
- Leerlingen kunnen AI tools gebruiken
- Leerlingen denken kritisch over AI
- Leerlingen maken eigen AI projecten

BENODIGDE MATERIALEN:
- Computer of tablet per leerling
- Internettoegang
- Werkbladen (zie bijlagen)
- Voorbeeldmateriaal

LESOPBOUW:

1. INTRODUCTIE (10 minuten)
- Wat weten leerlingen al over AI?
- Korte uitleg over kunstmatige intelligentie
- Voorbeelden uit het dagelijks leven

2. DEMONSTRATIE (15 minuten)
- Toon AI tool in actie
- Laat leerlingen meekijken
- Leg uit hoe het werkt

3. HANDS-ON ACTIVITEIT (45 minuten)
- Leerlingen proberen zelf
- Werk in tweetallen
- Docent loopt rond voor hulp

4. PRESENTATIE (10 minuten)
- Leerlingen tonen hun resultaten
- Bespreek wat goed ging
- Wat kunnen we verbeteren?

5. EVALUATIE (5 minuten)
- Wat hebben we geleerd?
- Hoe kunnen we dit gebruiken?
- Volgende stappen

TIPS VOOR DOCENTEN:
- Test de tools zelf eerst
- Heb een backup plan klaar
- Benadruk ethisch gebruik
- Laat leerlingen experimenteren
- Deel ervaringen met collega's

UITBREIDINGSMOGELIJKHEDEN:
- Huiswerkopdracht met AI
- Project over langere periode
- Samenwerking met andere vakken
- Presentatie voor andere klassen

EVALUATIECRITERIA:
- Begrip van AI concepten
- Praktisch gebruik van tools
- Kritische reflectie
- Creativiteit in toepassing
- Samenwerking met anderen

BRONNEN EN LINKS:
- onderwijs.ai
- Voorbeeldtools lijst
- Extra oefenmateriaal
- Handleidingen voor leerlingen

BIJLAGEN:
- Werkblad 1: AI Basiskennis
- Werkblad 2: Praktische Oefening  
- Werkblad 3: Reflectie
- Antwoordenblad voor docent

Voor meer lessen en materialen:
Bezoek onderwijs.ai

2025 AI in het Onderwijs`;

    // Create and download as text file
    const blob = new Blob([cleanLessonContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-lesplan.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
    
    console.log(`Download gestart: ${lessonTitle} (TXT formaat - geen speciale tekens)`);
  } catch (error) {
    console.error('Download failed:', error);
  }
};