/** 
 * Utility functions for handling file downloads 
 * FINAL FIX: Complete removal of all PDF files and special characters
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
 * COMPLETELY CLEAN - NO SPECIAL CHARACTERS AT ALL
 */
export const downloadStartersgids = () => {
  try {
    // Create absolutely clean content with ONLY basic ASCII characters
    const cleanContent = `AI STARTERSGIDS VOOR DOCENTEN
COMPLETE HANDLEIDING VOOR AI IN HET ONDERWIJS

========================================
INHOUDSOPGAVE
========================================

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

========================================
HOOFDSTUK 1: WELKOM BIJ AI IN HET ONDERWIJS
========================================

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
- Begin met hoofdstuk 2 voor de basisprincipes
- Kies tools die passen bij jouw vakgebied
- Start klein met een tool per week
- Gebruik de praktische tips voor implementatie
- Raadpleeg de ethische richtlijnen bij twijfel

========================================
TOP 10 AI TOOLS VOOR DOCENTEN
========================================

1. ChatGPT
   - Tekstgeneratie en vraag beantwoording
   - Gratis versie beschikbaar
   - Ideaal voor lesvoorbereiding

2. Claude  
   - Uitgebreide tekstanalyse en hulp
   - Excellent voor lange documenten
   - Goede Nederlandse ondersteuning

3. Perplexity AI
   - Onderzoek met bronvermelding
   - Actuele informatie
   - Betrouwbare bronnen

4. NotebookLM
   - Document analyse en samenvatting  
   - Gratis van Google
   - Perfect voor onderzoek

5. Gamma
   - Snelle presentaties maken
   - AI-gegenereerde layouts
   - Professionele templates

6. Canva AI
   - Visueel ontwerp en afbeeldingen
   - Eenvoudig te gebruiken
   - Veel gratis functies

7. Quillbot
   - Tekst verbetering en parafrasering
   - Grammatica controle
   - Verschillende stijlen

8. Brisk Teaching
   - Snelle feedback op leerlingwerk
   - Chrome extensie
   - Direct in Google Docs

9. Teachable Machine
   - AI leren aan kinderen
   - Gratis van Google
   - Visueel en toegankelijk

10. GitHub Copilot
    - Programmeren met AI hulp
    - Gratis voor studenten
    - Ondersteunt vele talen

========================================
PRAKTISCHE TIPS VOOR DOCENTEN
========================================

BEGIN KLEIN
- Start met een tool die je direct kunt gebruiken
- Probeer eerst ChatGPT voor lesvoorbereiding
- Neem de tijd om te experimenteren

TEST EERST ZELF  
- Probeer alles uit voordat je het in de klas gebruikt
- Maak notities van wat wel en niet werkt
- Bereid alternatieve plannen voor

BLIJF KRITISCH
- AI is een hulpmiddel, geen vervanging
- Controleer altijd de output van AI
- Leer leerlingen ook kritisch te zijn

DEEL KENNIS
- Help collega's ook aan de slag
- Organiseer mini-workshops op school
- Deel successen en uitdagingen

VOLG ONTWIKKELINGEN
- AI verandert snel
- Blijf op de hoogte van nieuwe tools
- Meld je aan voor onze nieuwsbrief

========================================
ETHISCHE RICHTLIJNEN
========================================

PRIVACY EERST
- Deel geen gevoelige leerlinggegevens
- Gebruik geen echte namen in voorbeelden
- Check de privacy policy van tools

TRANSPARANTIE
- Vertel leerlingen wanneer je AI gebruikt
- Leg uit hoe AI werkt
- Wees open over beperkingen

CONTROLE BEHOUDEN
- Controleer altijd AI output
- Laat AI niet beslissingen nemen
- Blijf de eindverantwoordelijke

BIAS BEWUSTZIJN
- AI kan vooroordelen bevatten
- Test met verschillende voorbeelden
- Bespreek dit met leerlingen

LEERPROCES ONDERSTEUNEN
- AI moet leren ondersteunen, niet vervangen
- Focus op begrip, niet op antwoorden
- Stimuleer creativiteit en kritisch denken

========================================
IMPLEMENTATIEPLAN - 10 WEKEN
========================================

WEEK 1-2: Kennismaking
- Download en installeer ChatGPT
- Probeer een paar simpele vragen
- Maak je eerste lesplan met AI hulp

WEEK 3-4: Uitbreiding
- Voeg Canva AI toe voor visuele materialen
- Experimenteer met verschillende prompts
- Deel eerste ervaringen met collega's

WEEK 5-6: Integratie
- Gebruik AI in echte lessen
- Laat leerlingen ook experimenteren
- Evalueer wat werkt en wat niet

WEEK 7-8: Verdieping
- Probeer gespecialiseerde tools
- Ontwikkel AI-beleid voor je klas
- Train collega's in basis gebruik

WEEK 9-10: Evaluatie en uitbreiding
- Evalueer de impact op je werk
- Plan vervolgstappen
- Deel kennis met de school

========================================
VEELGESTELDE VRAGEN
========================================

Q: Is AI veilig voor leerlingen?
A: Ja, mits je de juiste voorzorgsmaatregelen neemt. Gebruik geen 
   persoonlijke gegevens en begeleid leerlingen bij het gebruik.

Q: Vervangen AI tools de docent?
A: Nee, AI ondersteunt en versterkt je als docent. De menselijke 
   interactie en begeleiding blijven essentieel.

Q: Wat als AI fouten maakt?
A: Controleer altijd de output en leer leerlingen kritisch te zijn. 
   AI is een hulpmiddel, geen orakel.

Q: Hoe begin ik?
A: Start met ChatGPT voor lesvoorbereiding. Stel simpele vragen en 
   bouw langzaam je vaardigheden op.

Q: Kost AI veel geld?
A: Veel tools hebben gratis versies. Begin daarmee en upgrade alleen 
   als je echt meerwaarde ziet.

Q: Hoe leg ik AI uit aan leerlingen?
A: Begin met simpele voorbeelden uit hun dagelijks leven. Laat ze 
   zelf experimenteren onder begeleiding.

========================================
TROUBLESHOOTING
========================================

PROBLEEM: AI geeft slechte antwoorden
OPLOSSING: Verbeter je prompts. Wees specifieker en geef meer context.

PROBLEEM: Leerlingen gebruiken AI om vals te spelen  
OPLOSSING: Maak duidelijke regels en focus op proces ipv eindresultaat.

PROBLEEM: Collega's zijn sceptisch
OPLOSSING: Start klein, toon concrete voordelen, deel successen.

PROBLEEM: Technische problemen
OPLOSSING: Heb altijd een backup plan zonder AI klaar liggen.

========================================
MEER INFORMATIE EN ONDERSTEUNING
========================================

Website: onderwijs.ai
Email: ai.onderwijs@gmail.com
Nieuwsbrief: Wekelijkse tips en updates
Trainingen: Op locatie of online beschikbaar

Volg ons ook op sociale media voor dagelijkse tips en inspiratie.

========================================
BIJLAGEN
========================================

BIJLAGE A: Lijst van alle 50+ AI tools
BIJLAGE B: Voorbeeldprompts per vakgebied  
BIJLAGE C: Lesplannen templates
BIJLAGE D: Evaluatieformulieren
BIJLAGE E: Beleidstemplates voor scholen

========================================

2025 AI in het Onderwijs
Alle rechten voorbehouden

Deze gids wordt regelmatig bijgewerkt met nieuwe tools en inzichten.
Bezoek onze website voor de meest recente versie.

SUCCES MET AI IN JOUW ONDERWIJS!

========================================`;

    // Create blob with UTF-8 encoding but only ASCII characters
    const blob = new Blob([cleanContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI-Startersgids-Definitief-SCHOON.txt';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    console.log('SUCCESS: Download gestart - 100% SCHOON tekstbestand zonder speciale tekens!');
    
  } catch (error) {
    console.error('Download failed:', error);
  }
};

/**
 * Downloads lesson content as clean text (NO PDF)
 * @param {string} lessonTitle - The title of the lesson to download
 */
export const downloadLesson = (lessonTitle) => {
  try {
    // Create completely clean lesson content
    const cleanLessonContent = `LESPLAN: ${lessonTitle.toUpperCase()}

========================================
AI IN HET ONDERWIJS - PRAKTISCHE LES  
========================================

TITEL: ${lessonTitle}
DUUR: 45-90 minuten (afhankelijk van niveau)
NIVEAU: Alle niveaus (aanpasbaar)

========================================
LEERDOELEN
========================================

Na deze les kunnen leerlingen:
- De basis van AI begrijpen
- AI tools gebruiken voor hun werk
- Kritisch nadenken over AI
- Eigen AI projecten maken
- Ethische aspecten van AI benoemen

========================================
BENODIGDE MATERIALEN
========================================

- Computer of tablet per leerling
- Internettoegang  
- Werkbladen (zie bijlagen)
- Voorbeeldmateriaal
- Eventueel: beamer voor demonstratie

========================================
LESOPBOUW
========================================

1. INTRODUCTIE (10 minuten)
   - Wat weten leerlingen al over AI?
   - Korte uitleg over kunstmatige intelligentie
   - Voorbeelden uit het dagelijks leven
   - Doel van de les uitleggen

2. DEMONSTRATIE (15 minuten)  
   - Toon AI tool in actie
   - Laat leerlingen meekijken
   - Leg uit hoe het werkt
   - Bespreek mogelijkheden en beperkingen

3. HANDS-ON ACTIVITEIT (45 minuten)
   - Leerlingen proberen zelf
   - Werk in tweetallen voor ondersteuning
   - Docent loopt rond voor hulp
   - Verschillende opdrachten op niveau

4. PRESENTATIE (10 minuten)
   - Leerlingen tonen hun resultaten
   - Bespreek wat goed ging
   - Wat kunnen we verbeteren?
   - Deel interessante ontdekkingen

5. EVALUATIE EN REFLECTIE (5 minuten)
   - Wat hebben we geleerd?
   - Hoe kunnen we dit gebruiken?
   - Volgende stappen bespreken
   - Huiswerk of vervolgactiviteit

========================================
TIPS VOOR DOCENTEN
========================================

VOORBEREIDING:
- Test de tools zelf eerst grondig
- Heb een backup plan klaar voor technische problemen
- Bereid verschillende niveaus voor
- Maak duidelijke tijdsindeling

TIJDENS DE LES:
- Benadruk ethisch gebruik vanaf het begin
- Laat leerlingen veel experimenteren
- Wees geduldig met technische problemen
- Stimuleer samenwerking

NA DE LES:
- Deel ervaringen met collega's
- Noteer wat goed werkte
- Vraag feedback van leerlingen
- Plan vervolgactiviteiten

========================================
UITBREIDINGSMOGELIJKHEDEN
========================================

KORTE TERMIJN:
- Huiswerkopdracht met AI
- Extra oefeningen voor snelle leerlingen
- Hulp voor leerlingen die achterlopen

LANGE TERMIJN:
- Project over langere periode
- Samenwerking met andere vakken
- Presentatie voor andere klassen
- Deelname aan AI wedstrijden

========================================
EVALUATIECRITERIA
========================================

KENNIS (25%):
- Begrip van AI concepten
- Kunnen uitleggen hoe AI werkt
- Kennis van mogelijkheden en beperkingen

VAARDIGHEDEN (25%):
- Praktisch gebruik van tools
- Probleemoplossend vermogen
- Technische vaardigheden

HOUDING (25%):
- Kritische reflectie
- Ethisch bewustzijn
- Bereidheid tot experimenteren

SAMENWERKING (25%):
- Hulp aan medestudenten
- Constructieve feedback
- Actieve deelname

========================================
DIFFERENTIATIETIPS
========================================

VOOR SNELLE LEERLINGEN:
- Extra uitdagende opdrachten
- Laat ze anderen helpen
- Geavanceerdere tools introduceren

VOOR LEERLINGEN DIE HULP NODIG HEBBEN:
- Stap-voor-stap begeleiding
- Visuele hulpmiddelen
- Samenwerken met sterkere leerlingen

VOOR VERSCHILLENDE LEERSTIJLEN:
- Visuele voorbeelden
- Hands-on activiteiten  
- Discussie en reflectie
- Creatieve opdrachten

========================================
BRONNEN EN LINKS
========================================

Websites:
- onderwijs.ai - Hoofdwebsite
- Lijst met AI tools voor onderwijs
- Extra oefenmateriaal
- Handleidingen voor leerlingen

Boeken:
- "AI voor Beginners" 
- "Ethiek in de Digitale Tijd"
- "Toekomst van het Onderwijs"

========================================
BIJLAGEN
========================================

BIJLAGE 1: Werkblad AI Basiskennis
- Wat is kunstmatige intelligentie?
- Voorbeelden uit het dagelijks leven
- Voor- en nadelen van AI

BIJLAGE 2: Praktische Oefening  
- Stap-voor-stap instructies
- Voorbeeldopdrachten
- Tips voor gebruik

BIJLAGE 3: Reflectievragen
- Wat heb je geleerd?
- Hoe ga je AI gebruiken?
- Welke vragen heb je nog?

BIJLAGE 4: Antwoordenblad voor Docent
- Uitwerkingen van opdrachten
- Veelgemaakte fouten
- Extra uitleg waar nodig

========================================

Voor meer lessen en materialen:
Bezoek onderwijs.ai

2025 AI in het Onderwijs
Alle rechten voorbehouden

========================================`;

    // Create and download as clean text file
    const blob = new Blob([cleanLessonContent], { 
      type: 'text/plain;charset=utf-8' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-lesplan-SCHOON.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log(`SUCCESS: ${lessonTitle} downloaded as 100% SCHOON text file!`);
    
  } catch (error) {
    console.error('Download failed:', error);
  }
};

// Remove all PDF-related mappings and functions
// NO MORE PDFS - ONLY CLEAN TEXT FILES
export const lessonFileMap = null; // Disabled
export const getLessonFileUrl = null; // Disabled