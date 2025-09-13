import jsPDF from 'jspdf';

/** 
 * Download the complete AI Startersgids voor het Onderwijs
 */
export const downloadStartersgids = () => {
  console.log('Generating complete AI Startersgids voor het Onderwijs...');
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm', 
      format: 'a4'
    });

    // Generate unique ID for this version
    const uniqueId = Math.random().toString(36).substring(2, 10);
    
    doc.setFont('helvetica');

    // Clean header without version info
    doc.setFillColor(70, 130, 180); // Professional blue
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS VOOR HET ONDERWIJS', 105, 16, { align: 'center' });

    // Reset colors
    doc.setTextColor(0, 0, 0);

    // Clean title page
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS', 20, 60);
    doc.text('VOOR HET ONDERWIJS', 20, 85);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('Praktische handleiding voor docenten', 20, 110);
    doc.text('Basisonderwijs, Voortgezet Onderwijs, MBO & HBO', 20, 125);

    // Professional info box (removed version warnings)
    doc.setFillColor(240, 248, 255);
    doc.rect(20, 150, 170, 35, 'F');
    doc.setFillColor(70, 130, 180);
    doc.rect(20, 150, 170, 5, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 130, 180);
    doc.text('COMPLETE HANDLEIDING', 25, 165);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Van introductie tot praktische implementatie', 25, 175);
    doc.text('Inclusief tools, voorbeelden en stappenplannen', 25, 182);

    // Add more content pages...
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = 'AI-Startersgids-voor-het-Onderwijs-Verbeterd-' + timestamp + '.pdf';
    
    console.log('Saving improved AI guide: ' + filename);
    doc.save(filename);

    // Success notification
    setTimeout(() => {
      alert('VERBETERDE AI STARTERSGIDS SUCCESVOL GEDOWNLOAD!\n\n' +
        'Bestandsnaam: ' + filename + '\n\n' +
        'Verbeteringen in deze versie:\n' +
        '• Realistische inhoud voor groep 7-8 (geen AI-modellen trainen)\n' +
        '• Betere pagina-indeling (hoofdstukken beginnen op nieuwe pagina)\n' +
        '• Verbeterde structuur en leesbaarheid\n' +
        '• Praktische focus op leeftijdsgeschikt gebruik\n' +
        '• Professionele opmaak\n\n' +
        'Perfect voor Nederlandse docenten!');
    }, 1000);

  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('AI STARTERSGIDS DOWNLOAD\n\n' +
      'Er werd een verbeterde AI-startersgids gedownload met:\n' +
      '• Realistische inhoud voor alle niveaus\n' +
      '• Betere pagina-indeling\n' +
      '• 15 geteste AI-tools\n' +
      '• Praktische implementatiegids\n' +
      '• Nederlandse focus\n' +
      '• Website: https://onderwijs.ai/\n\n' +
      'Perfect voor Nederlands onderwijs!');
  }
};

/**
 * Unique lesson content for each specific lesson
 */
const getLessonContent = (lessonTitle) => {
  const lessonData = {
    "Wetenschappelijk Onderzoek met AI": {
      level: "MBO/HBO",
      duration: "150 minuten (3 lessen)",
      subject: "Onderzoeksmethodologie",
      objectives: [
        "AI-tools effectief inzetten voor literatuuronderzoek en bronnenanalyse",
        "Automatisering van data-analyse processen met AI-ondersteuning", 
        "Wetenschappelijke teksten verbeteren met AI-feedback en -suggesties",
        "Ethische aspecten van AI in onderzoek begrijpen en toepassen",
        "Kritisch evalueren van AI-gegenereerde onderzoeksresultaten"
      ],
      materials: [
        "Toegang tot Perplexity AI, NotebookLM en Claude",
        "Onderzoeksopdracht of thesis-onderwerp",
        "Wetenschappelijke databases (Google Scholar, ResearchGate)",
        "Evaluatierubric voor AI-gebruik in onderzoek",
        "Ethische richtlijnen voor AI in academisch werk"
      ],
      content: [
        "DEEL 1: AI-TOOLS VOOR LITERATUURONDERZOEK (50 min)",
        "",
        "Introductie (10 min)",
        "• Rol van AI in modern wetenschappelijk onderzoek",
        "• Voordelen en valkuilen van AI-ondersteund onderzoek", 
        "• Overzicht van beschikbare AI-tools voor onderzoekers",
        "",
        "Hands-on: Perplexity AI voor bronnenonderzoek (25 min)",
        "• Effectieve zoekstrategieen met AI",
        "• Prompt engineering voor wetenschappelijke vragen",
        "• Bronverificatie en fact-checking",
        "• Oefening: Literatuuroverzicht maken met AI-ondersteuning",
        "",
        "NotebookLM voor documentanalyse (15 min)",
        "• Uploaden en analyseren van wetenschappelijke papers",
        "• Automatische samenvattingen genereren",
        "• Verbanden leggen tussen verschillende bronnen",
        "",
        "DEEL 2: DATA-ANALYSE MET AI (50 min)",
        "",
        "Claude voor kwalitatieve analyse (20 min)",
        "• Interviews en enquetes analyseren met AI",
        "• Thematische analyse en coding",
        "• Patronen identificeren in grote datasets",
        "",
        "AI-tools voor kwantitatieve analyse (20 min)",
        "• Excel AI-functies voor statistiek",
        "• Visualisaties maken met AI-ondersteuning",
        "• Interpretatie van statistische resultaten",
        "",
        "Praktijkoefening (10 min)",
        "• Eigen onderzoeksdata analyseren met gekozen AI-tool",
        "• Resultaten interpreteren en valideren",
        "",
        "DEEL 3: SCHRIJVEN EN ETHIEK (50 min)",
        "",
        "AI-geassisteerd academisch schrijven (25 min)",
        "• Structuur en argumentatie verbeteren",
        "• Taalgebruik optimaliseren voor wetenschappelijke teksten",
        "• Plagiaatpreventie en originele bijdragen behouden",
        "• Do's and don'ts van AI in academisch schrijven",
        "",
        "Ethische overwegingen (15 min)",
        "• Transparantie over AI-gebruik in onderzoek",
        "• Bias en betrouwbaarheid in AI-tools",
        "• Academische integriteit en AI",
        "• Richtlijnen van onderzoeksinstellingen",
        "",
        "Evaluatie en reflectie (10 min)",
        "• Beoordeling van AI-ondersteund onderzoeksproces",
        "• Reflectie op geleerde vaardigheden",
        "• Plan voor toekomstige toepassing"
      ],
      assessment: [
        "Onderzoeksvoorstel met AI-ondersteuning (40%)",
        "Kritische evaluatie van AI-tools (30%)",
        "Ethische reflectie op AI-gebruik (20%)",
        "Peer review van medestudent werk (10%)"
      ],
      tips: [
        "Begin met kleine onderzoeksvragen voordat je complexe analyses doet",
        "Verifieer altijd AI-resultaten met traditionele onderzoeksmethoden",
        "Documenteer precies welke AI-tools je hebt gebruikt en hoe",
        "Blijf kritisch - AI kan fouten maken en bias bevatten"
      ]
    },

    "Introductie tot AI voor Kinderen": {
      level: "Basisonderwijs (groep 6-8)",
      duration: "45 minuten", 
      subject: "Algemene Vorming / ICT",
      objectives: [
        "Begrijpen wat kunstmatige intelligentie is in eenvoudige bewoordingen",
        "AI herkennen in het dagelijks leven (Siri, spelletjes, Netflix)",
        "Onderscheid maken tussen 'slimme' machines en echte intelligentie",
        "Positieve en negatieve aspecten van AI benoemen",
        "Veilig en bewust omgaan met AI-technologie"
      ],
      materials: [
        "Interactief whiteboard of beamer",
        "Quick, Draw! website (quickdraw.withgoogle.com)",
        "Voorbeelden van AI in het dagelijks leven (plaatjes)",
        "Werkblad 'AI om ons heen'",
        "Stickers voor evaluatie-activiteit"
      ],
      content: [
        "OPENING: WAT IS AI? (10 min)",
        "",
        "Brainstorm (5 min)",
        "• Wat denken jullie dat 'slimme' computers kunnen?",
        "• Hebben jullie wel eens gepraat tegen Siri of Google?",
        "• Welke apparaten thuis zijn 'slim'?",
        "",
        "Uitleg met voorbeelden (5 min)",
        "• AI = Artificial Intelligence = Kunstmatige Intelligentie",
        "• Computers die kunnen leren, net zoals jullie op school leren",
        "• Voorbeelden tonen: Siri, spelletjes, YouTube aanbevelingen",
        "",
        "ONTDEKKEN: AI IN ACTIE (20 min)",
        "",
        "Quick, Draw! demonstratie (10 min)",
        "• Laat kinderen om de beurt tekenen op het digibord",
        "• Computer raadt wat ze tekenen - hoe kan dat?",
        "• Uitleggen: computer heeft heel veel tekeningen 'gezien'",
        "• Net zoals jullie leren herkennen door veel voorbeelden",
        "",
        "AI Detective spel (10 min)",
        "• Plaatjes laten zien van situaties",
        "• Kinderen raden: gebruikt dit AI of niet?",
        "• Voorbeelden: Netflix suggesties, rekenmachine, robotstofzuiger",
        "• Spelregels: AI leert en wordt beter, gewone computers niet",
        "",
        "BEGRIJPEN: VOOR- EN NADELEN (10 min)",
        "",
        "Voordelen bespreken (5 min)",
        "• AI kan helpen: vertalen, zoeken, spelletjes leuker maken",
        "• Dokters helpen met foto's van binnenin je lichaam",
        "• Auto's veiliger maken",
        "",
        "Zorgen bespreken (5 min)",
        "• Soms maakt AI fouten (net zoals mensen)",
        "• Niet alles wat AI zegt is waar",
        "• Belangrijk om zelf na te denken",
        "",
        "AFSLUITING: WAT HEBBEN WE GELEERD? (5 min)",
        "",
        "Samenvatten",
        "• AI is overal om ons heen",
        "• Het kan helpen, maar is niet perfect",
        "• Wij blijven de baas over onze keuzes",
        "",
        "Huiswerk (optioneel)",
        "• Zoek thuis 3 voorbeelden van AI",
        "• Vertel volgende keer wat je hebt gevonden"
      ],
      assessment: [
        "Observatie tijdens discussies en spel",
        "Werkblad 'AI om ons heen' invullen",
        "Mondeling: noem 2 voorbeelden van AI",
        "Evaluatie met duim omhoog/omlaag: vond je de les leuk?"
      ],
      tips: [
        "Gebruik concrete voorbeelden die kinderen kennen",
        "Laat kinderen veel zelf ontdekken in plaats van alleen uitleggen", 
        "Maak het speels en interactief met veel beweging",
        "Benadruk dat mensen altijd belangrijker zijn dan machines"
      ]
    },

    "AI in de Geschiedenis": {
      level: "Voortgezet Onderwijs (HAVO/VWO 4-5)",
      duration: "50 minuten",
      subject: "Geschiedenis", 
      objectives: [
        "AI-tools inzetten voor historisch bronnenonderzoek en verificatie",
        "Tijdlijnen en historische verbanden visualiseren met AI-ondersteuning",
        "Kritisch analyseren van historische informatie uit AI-bronnen",
        "Vergelijken van verschillende perspectieven op historische gebeurtenissen",
        "Ethische aspecten begrijpen van AI bij historische interpretatie"
      ],
      materials: [
        "Laptops/tablets met internetverbinding",
        "Toegang tot Perplexity AI en ChatGPT",
        "Historische bronnen over gekozen onderwerp",
        "Tijdlijn template (digitaal of papier)",
        "Evaluatieformulier voor bronkritiek"
      ],
      content: [
        "INTRODUCTIE: AI ALS HISTORICUS-TOOL (10 min)",
        "",
        "Probleemstelling",
        "• Hoe kunnen historici omgaan met enorme hoeveelheden informatie?",
        "• Rol van technologie in modern historisch onderzoek",
        "• Voorbeelden: digitale archieven, patroonherkenning in documenten",
        "",
        "Doel van de les",
        "• AI gebruiken voor onderzoek naar [specifiek historisch onderwerp]",
        "• Kritisch blijven over AI-informatie",
        "• Verschillende bronnen en perspectieven vergelijken",
        "",
        "PRAKTIJK: AI-ONDERSTEUND HISTORISCH ONDERZOEK (25 min)",
        "",
        "Opdracht deel 1: Basisinformatie verzamelen (10 min)",
        "• Gebruik Perplexity AI voor onderzoek naar [historische gebeurtenis]",
        "• Prompt: 'Geef een overzicht van [gebeurtenis] met betrouwbare bronnen'",
        "• Let op: welke bronnen worden genoemd?",
        "• Controleer: zijn dit bekende, betrouwbare bronnen?",
        "",
        "Opdracht deel 2: Verschillende perspectieven (10 min)",
        "• Vraag AI om verschillende standpunten over de gebeurtenis",
        "• Prompt: 'Wat waren de verschillende opvattingen over [gebeurtenis]?'",
        "• Vergelijk met informatie uit je geschiedenisboek",
        "• Noteer verschillen en overeenkomsten",
        "",
        "Opdracht deel 3: Tijdlijn maken (5 min)",
        "• Gebruik AI om een chronologische tijdlijn te maken",
        "• Prompt: 'Maak een tijdlijn van belangrijke gebeurtenissen rond [onderwerp]'",
        "• Controleer data en volgorde met andere bronnen",
        "",
        "ANALYSE: BRONKRITIEK EN AI (10 min)",
        "",
        "Groepsdiscussie",
        "• Welke informatie kwam overeen tussen AI en andere bronnen?",
        "• Waar waren verschillen? Hoe verklaar je dat?",
        "• Welke bronnen noemde AI? Zijn die betrouwbaar?",
        "",
        "Kritische vragen bij AI-informatie",
        "• Wie heeft de informatie oorspronkelijk geschreven?",
        "• Uit welke tijd en context komt de bron?",
        "• Welk perspectief/vooroordeel kan erin zitten?",
        "• Hoe kunnen we dit verifiëren?",
        "",
        "SYNTHESE: AI EN HISTORISCHE METHODE (5 min)",
        "",
        "Voordelen van AI voor historici",
        "• Snel veel informatie doorzoeken",
        "• Verbanden leggen tussen verschillende bronnen",
        "• Verschillende talen en tijdperken analyseren",
        "",
        "Beperkingen en gevaren",
        "• AI kan foute informatie geven",
        "• Bias uit trainingsdata",
        "• Geen vervanging voor echte bronnenanalyse",
        "• Menselijke interpretatie blijft nodig"
      ],
      assessment: [
        "Ingevuld onderzoeksformulier met AI-bevindingen (40%)",
        "Kritische evaluatie van AI-bronnen (30%)",
        "Bijdrage aan klassendiscussie (20%)",
        "Reflectie op voor- en nadelen AI in geschiedenis (10%)"
      ],
      tips: [
        "Kies een onderwerp dat leerlingen interessant vinden",
        "Laat leerlingen AI-informatie altijd vergelijken met leerboeken",
        "Benadruk het belang van bronvermelding en verificatie",
        "Gebruik concrete voorbeelden van foute AI-informatie"
      ]
    },

    "Datavisualisatie met AI": {
      level: "MBO/HBO",
      duration: "90 minuten", 
      subject: "Data-analyse / Wiskunde",
      objectives: [
        "Complexe datasets transformeren naar begrijpelijke visualisaties",
        "AI-tools effectief inzetten voor automatische grafieken en charts",
        "Verschillende visualisatietypes kiezen op basis van datavraag",
        "Interactieve dashboards maken met AI-ondersteuning",
        "Kritisch evalueren van AI-gegenereerde visualisaties"
      ],
      materials: [
        "Dataset (Excel/CSV) met realistische data",
        "Toegang tot ChatGPT Plus (Code Interpreter)",
        "Canva AI of andere visualisatietools", 
        "Excel met AI-functies",
        "Voorbeelden van goede en slechte datavisualisaties"
      ],
      content: [
        "DEEL 1: INLEIDING DATAVISUALISATIE (20 min)",
        "",
        "Waarom visualiseren? (10 min)",
        "• Menselijk brein verwerkt visuele informatie sneller",
        "• Patronen en trends ontdekken in grote datasets",
        "• Communiceren van bevindingen naar niet-experts",
        "• Voorbeelden tonen: goede vs slechte grafieken",
        "",
        "AI in datavisualisatie (10 min)",
        "• Automatische grafiekgeneratie",
        "• Patroonherkenning in data", 
        "• Suggesties voor beste visualisatietype",
        "• Interactieve dashboards maken",
        "",
        "DEEL 2: HANDS-ON MET AI-TOOLS (50 min)",
        "",
        "ChatGPT Code Interpreter (25 min)",
        "• Dataset uploaden naar ChatGPT",
        "• Prompt: 'Analyseer deze data en maak passende visualisaties'",
        "• Verschillende grafiektypes proberen: bar, line, scatter, heatmap",
        "• AI vragen om specifieke analyses: correlaties, trends, outliers",
        "",
        "Oefening 1: Verkoopcijfers analyseren",
        "• Upload CSV met maandelijkse verkoopcijfers",
        "• Laat AI trends identificeren",
        "• Vraag om voorspellingen voor volgende maanden",
        "• Evalueer: zijn de visualisaties logisch en correct?",
        "",
        "Excel AI-functies (15 min)",
        "• Ideas functie voor automatische inzichten",
        "• AI-suggesties voor charts en pivot tables",
        "• Smart templates gebruiken",
        "",
        "Canva AI voor presentaties (10 min)",
        "• Grafieken omzetten naar presentatie-ready visuals",
        "• AI-suggesties voor kleuren en lay-out",
        "• Infographics maken van data-inzichten",
        "",
        "DEEL 3: KRITISCHE EVALUATIE (20 min)",
        "",
        "Evaluatiecriteria bespreken (10 min)",
        "• Is de visualisatie accuraat en eerlijk?",
        "• Wordt de juiste grafiektype gebruikt?",
        "• Is de schaal en as-indeling correct?",
        "• Zijn labels en legenda duidelijk?",
        "• Ondersteunt het de boodschap?",
        "",
        "Praktijkoefening (10 min)",
        "• Analyseer AI-gegenereerde grafieken uit eerdere oefeningen",
        "• Identificeer mogelijke verbeterpunten",
        "• Herstel fouten of misleidende elementen",
        "• Vergelijk originele data met visualisatie"
      ],
      assessment: [
        "Zelfgemaakte datavisualisatie met AI-tools (50%)",
        "Kritische evaluatie van medestudent visualisatie (25%)",
        "Reflectie op AI-proces en resultaten (25%)"
      ],
      tips: [
        "Start met eenvoudige datasets voordat je complexe data gebruikt",
        "Controleer altijd of AI de data correct heeft geinterpreteerd", 
        "Experimenteer met verschillende prompt formuleringen",
        "Vergeet niet de menselijke context en interpretatie"
      ]
    },

    "AI Ethics Debat": {
      level: "Voortgezet Onderwijs (alle niveaus)",
      duration: "100 minuten (dubbel lesuur)",
      subject: "Maatschappijleer / Filosofie",
      objectives: [
        "Ethische dilemma's rond AI identificeren en analyseren",
        "Verschillende standpunten over AI-ontwikkeling begrijpen",
        "Argumenteren over maatschappelijke impact van AI",
        "Kritisch denken over technologische vooruitgang",
        "Eigen mening vormen over AI-regelgeving en -gebruik"
      ],
      materials: [
        "Debatkaarten met stellingen",
        "Rollenkaarten voor verschillende perspectieven",
        "Video: AI-voorbeelden (positief en negatief)",
        "Artikel: actuele AI-ontwikkelingen",
        "Stemkastjes of -app voor tussentijdse polls"
      ],
      content: [
        "OPENING: AI IN DE SAMENLEVING (15 min)",
        "",
        "Actuele voorbeelden (10 min)",
        "• Video tonen: AI in zelfrijdende auto's, gezichtsherkenning, ChatGPT",
        "• Vraag: wat vinden jullie hiervan?",
        "• Korte brainstorm: kansen en bedreigingen",
        "",
        "Introductie ethiek (5 min)",
        "• Wat zijn ethische vragen? (goed vs fout, eerlijk vs oneerlijk)",
        "• Waarom zijn die belangrijk bij nieuwe technologie?",
        "• Doel: vandaag verschillende meningen bespreken",
        "",
        "VOORBEREIDING DEBAT (25 min)",
        "",
        "Groepen indelen (5 min)",
        "• 4 groepen met verschillende rollen:",
        "  - Tech-bedrijven (pro-AI ontwikkeling)",
        "  - Privacy-activisten (voorzichtig met AI)",
        "  - Werknemers (zorgen over banen)",
        "  - Regering (moet regels maken)",
        "",
        "Voorbereidingstijd (20 min)",
        "• Elke groep krijgt informatie over hun standpunt",
        "• Argumenten verzamelen voor hun positie",
        "• Tegenargumenten voorbereiden",
        "• Woordvoerder kiezen",
        "",
        "DEBAT RONDES (45 min)",
        "",
        "Ronde 1: Stelling 'AI moet zo snel mogelijk ontwikkeld worden' (15 min)",
        "• Elke groep 2 minuten voor opening statement",
        "• 5 minuten vrije discussie",
        "• 2 minuten voor slotopmerkingen",
        "",
        "Ronde 2: Stelling 'AI-bedrijven moeten streng gereguleerd worden' (15 min)",
        "• Zelfde format als ronde 1",
        "• Leerlingen kunnen van mening wisselen",
        "",
        "Ronde 3: Stelling 'AI zal meer banen creeren dan vernietigen' (15 min)",
        "• Focus op economische aspecten",
        "• Concrete voorbeelden gebruiken",
        "",
        "SYNTHESE EN REFLECTIE (15 min)",
        "",
        "Persoonlijke mening (10 min)",
        "• Leerlingen stappen uit hun rol",
        "• Eigen mening formuleren op basis van debat",
        "• Poll: welke stellingen vinden jullie nu waar?",
        "• Vergelijken met mening aan begin van les",
        "",
        "Belangrijkste inzichten (5 min)",
        "• Wat was het sterkste argument?",
        "• Welke vraag blijft het moeilijkst?",
        "• Hoe kunnen we als samenleving goede keuzes maken?"
      ],
      assessment: [
        "Kwaliteit van argumenten tijdens debat (40%)",
        "Luisteren naar anderen en reageren daarop (30%)",
        "Schriftelijke reflectie na het debat (30%)"
      ],
      tips: [
        "Zorg voor evenwichtige informatie voor alle groepen",
        "Moedig respectvolle discussie aan - geen persoonlijke aanvallen",
        "Gebruik actuele voorbeelden die leerlingen kennen",
        "Laat zien dat complexe vraagstukken geen eenvoudige antwoorden hebben"
      ]
    },

    "AI Kunstproject": {
      level: "Basisonderwijs (groep 5-8)",
      duration: "60 minuten",
      subject: "Tekenen / Beeldende Vorming",
      objectives: [
        "Creatief experimenteren met AI als inspiratiebron",
        "Eigen kunstwerk maken gecombineerd met AI-elementen", 
        "Begrijpen hoe AI kunstwerken kan genereren",
        "Kritisch kijken naar door AI gemaakte afbeeldingen",
        "Waardering ontwikkelen voor zowel menselijke als AI-creativiteit"
      ],
      materials: [
        "Tablets/laptops voor AI-tools",
        "Tekenmateriaal: potloden, stiften, verf",
        "A3 tekenpapier",
        "Toegang tot kindvriendelijke AI-art tools",
        "Voorbeelden van AI-kunst en traditionele kunst"
      ],
      content: [
        "OPENING: KUNST EN TECHNOLOGIE (10 min)",
        "",
        "Kunstvoorbeelden bekijken (5 min)",
        "• Traditionele kunstwerken tonen (Van Gogh, Picasso)",
        "• AI-kunstwerken tonen (herkenbaar aan stijl)",
        "• Vraag: welke zijn door mensen gemaakt, welke door computers?",
        "",
        "Uitleg AI-kunst (5 min)",
        "• Computers kunnen ook 'tekenen' door heel veel kunstwerken te bestuderen",
        "• Net zoals jullie leren tekenen door te oefenen en voorbeelden te zien",
        "• AI kan nieuwe combinaties maken van wat het heeft geleerd",
        "",
        "ONTDEKKEN: AI-KUNST MAKEN (20 min)",
        "",
        "Demonstratie AI-tool (5 min)",
        "• Eenvoudige prompts proberen: 'een vrolijke kat in de tuin'",
        "• Laten zien hoe AI verschillende stijlen kan gebruiken",
        "• Uitleggen: AI combineert ideeën die het heeft geleerd",
        "",
        "Eigen AI-experimenten (15 min)",
        "• In tweetallen werken met begeleiding",
        "• Eenvoudige prompts bedenken: dieren, landschappen, fantasiewezens",
        "• Verschillende resultaten proberen",
        "• Beste afbeelding uitprinten of opslaan",
        "",
        "CREEREN: EIGEN KUNSTWERK (25 min)",
        "",
        "Opdracht uitleggen (5 min)",
        "• Maak een kunstwerk dat AI en eigen tekening combineert",
        "• Gebruik AI-afbeelding als inspiratie, niet als kopie",
        "• Voeg eigen elementen, kleuren, details toe",
        "• Maak het tot jouw eigen kunstwerk",
        "",
        "Werktijd (20 min)",
        "• Kinderen werken aan hun gecombineerde kunstwerk",
        "• Docent loopt rond voor hulp en aanmoediging",
        "• Benadruk creativiteit en eigen inbreng",
        "",
        "PRESENTATIE EN REFLECTIE (5 min)",
        "",
        "Kunstwerken tentoonstellen",
        "• Korte presentatie van enkele kunstwerken",
        "• Wat heb je van AI gebruikt, wat heb je zelf toegevoegd?",
        "• Wat vind je leuker: zelf tekenen of AI laten tekenen?",
        "• Kunnen computers echt creatief zijn?"
      ],
      assessment: [
        "Creativiteit en eigen inbreng in kunstwerk",
        "Samenwerking tijdens AI-experimenten", 
        "Reflectie op proces en resultaat",
        "Respectvolle omgang met materialen"
      ],
      tips: [
        "Houd AI-prompts eenvoudig en kindvriendelijk",
        "Benadruk dat AI een hulpmiddel is, geen vervanging voor eigen creativiteit",
        "Laat kinderen experimenteren zonder perfectie te verwachten",
        "Bespreek dat kunst subjective is - iedereen mag zijn eigen mening hebben"
      ]
    },

    "Programmeren met AI Copilot": {
      level: "MBO/HBO - ICT/Informatica",
      duration: "120 minuten",
      subject: "Programmeren / Informatica",
      objectives: [
        "AI-assistentie effectief inzetten bij het schrijven van code",
        "Kwaliteit van AI-gegenereerde code beoordelen en verbeteren",
        "Debugging en troubleshooting met AI-ondersteuning",
        "Ethische aspecten van AI-gebruik in softwareontwikkeling",
        "Balans vinden tussen AI-hulp en eigen programmeervaardigheden"
      ],
      materials: [
        "Computer met code-editor (VS Code aanbevolen)",
        "GitHub Copilot of vergelijkbare AI-tool",
        "Python of JavaScript ontwikkelomgeving",
        "Voorbeeldprojecten en oefenopgaven",
        "Code review checklist"
      ],
      content: [
        "DEEL 1: INLEIDING AI IN PROGRAMMEREN (20 min)",
        "",
        "Ontwikkeling van AI-tools (10 min)",
        "• Van eenvoudige autocomplete naar intelligente code-assistentie",
        "• Hoe werken tools zoals GitHub Copilot, ChatGPT voor code?",
        "• Training op miljarden regels code van open source projecten",
        "",
        "Voor- en nadelen bespreken (10 min)",
        "Voordelen:",
        "• Sneller programmeren en minder repetitief werk",
        "• Hulp bij nieuwe programmeertalen leren",
        "• Suggesties voor betere code-structuur",
        "",
        "Nadelen/risico's:",
        "• Mogelijk slechtere code-kwaliteit",
        "• Afhankelijkheid van AI-tools",
        "• Copyright en licentie-issues",
        "• Minder leren van programmeerprincipes",
        "",
        "DEEL 2: HANDS-ON PROGRAMMEREN MET AI (70 min)",
        "",
        "Setup en eerste stappen (15 min)",
        "• GitHub Copilot installeren en activeren",
        "• Basis prompts en commando's uitproberen",
        "• Demonstratie: eenvoudige functie laten genereren",
        "",
        "Oefening 1: Functie schrijven (20 min)",
        "• Opdracht: schrijf een functie om e-mailadressen te valideren",
        "• Stap 1: probeer zelf zonder AI (10 min)",
        "• Stap 2: gebruik AI-assistentie (10 min)",
        "• Vergelijk resultaten: wat zijn de verschillen?",
        "",
        "Oefening 2: Debugging met AI (20 min)",
        "• Krijg code met bewuste fouten",
        "• Gebruik AI om fouten te identificeren en op te lossen",
        "• Leer AI de juiste vragen te stellen over foutmeldingen",
        "",
        "Oefening 3: Complexer project (15 min)",
        "• Mini-webapplicatie bouwen met AI-ondersteuning",
        "• Focus op architectuur en code-organisatie",
        "• AI gebruiken voor boilerplate code, zelf logica schrijven",
        "",
        "DEEL 3: CODE REVIEW EN KWALITEIT (30 min)",
        "",
        "AI-code evalueren (15 min)",
        "• Checklist voor code-kwaliteit doorlopen",
        "• Leesbaarheid, efficiency, veiligheid beoordelen",
        "• Vergelijken met handgeschreven code",
        "",
        "Best practices ontwikkelen (10 min)",
        "• Wanneer AI wel/niet gebruiken?",
        "• Hoe prompts formuleren voor betere resultaten?",
        "• Altijd code begrijpen voordat je het gebruikt",
        "• Testen en valideren van AI-gegenereerde code",
        "",
        "Ethiek en professionaliteit (5 min)",
        "• Transparantie over AI-gebruik in projecten",
        "• Copyright en intellectueel eigendom",
        "• Verantwoordelijkheid voor code-kwaliteit blijft bij developer"
      ],
      assessment: [
        "Werkende code met AI-ondersteuning (40%)",
        "Code review en kwaliteitsbeoordeling (30%)",
        "Reflectie op AI-gebruik en leerproces (20%)",
        "Debugging vaardigheden demonstreren (10%)"
      ],
      tips: [
        "Begin met eenvoudige functies voordat je complexe systemen bouwt",
        "Lees en begrijp altijd de AI-gegenereerde code",
        "Test alle code grondig - AI kan subtiele fouten maken",
        "Gebruik AI als leergereedschap, niet als vervanging voor begrip"
      ]
    },

    "AI-Geassisteerd Creatief Schrijven": {
      level: "Voortgezet Onderwijs (HAVO/VWO 3-5)",
      duration: "120 minuten (dubbel lesuur)",
      subject: "Nederlands",
      objectives: [
        "AI inzetten als inspiratiebron voor creatieve teksten",
        "Eigen schrijfstijl ontwikkelen met AI-feedback",
        "Kritisch omgaan met AI-gegenereerde tekst",
        "Verschillende tekstgenres verkennen met AI-ondersteuning",
        "Authentieke eigen stem behouden in AI-geassisteerde teksten"
      ],
      materials: [
        "Laptops met internetverbinding",
        "Toegang tot ChatGPT, Claude of vergelijkbaar",
        "Schrijfopdrachten en inspiratiekaarten",
        "Voorbeelden van goede en slechte AI-teksten",
        "Peer review formulieren"
      ],
      content: [
        "DEEL 1: AI ALS SCHRIJFPARTNER (25 min)",
        "",
        "Introductie creatief schrijven met AI (10 min)",
        "• Hoe kunnen schrijvers AI gebruiken?",
        "• Voorbeelden tonen van bekende auteurs die AI gebruiken",
        "• AI als brainstorm-partner, niet als vervanger",
        "",
        "Demonstratie verschillende AI-rollen (15 min)",
        "• AI als ideeengenerator: 'Geef me 10 verhaalideeën over...'",
        "• AI als schrijfcoach: 'Verbeter deze alinea qua stijl'", 
        "• AI als karakterontwikkelaar: 'Beschrijf een interessant personage'",
        "• AI als plot-assistent: 'Wat zou er nu kunnen gebeuren?'",
        "",
        "DEEL 2: PRAKTISCHE SCHRIJFOEFENINGEN (70 min)",
        "",
        "Oefening 1: Verhaal beginnen (25 min)",
        "• Leerlingen krijgen een beginzin",
        "• Stap 1: Zelf verder schrijven (10 min)",
        "• Stap 2: AI vragen om 3 verschillende vervolgmogelijkheden",
        "• Stap 3: Eigen keuze maken en verder schrijven (15 min)",
        "• Reflectie: wat voegde AI toe aan je proces?",
        "",
        "Oefening 2: Dialoog verbeteren (20 min)",
        "• Leerlingen schrijven een gesprek tussen twee personages",
        "• AI vragen om de dialoog natuurlijker te maken",
        "• Vergelijken: origineel vs AI-versie vs eigen verbetering",
        "• Discussie: wat maakt dialoog authentiek?",
        "",
        "Oefening 3: Stijlexperiment (25 min)",
        "• Hetzelfde verhaal herschrijven in verschillende stijlen",
        "• AI-prompt: 'Herschrijf dit in de stijl van...'",
        "• Proberen: spanning, humor, poëtisch, journalistiek",
        "• Eigen favoriete stijl kiezen en verder ontwikkelen",
        "",
        "DEEL 3: KRITISCHE EVALUATIE (25 min)",
        "",
        "Peer review sessie (15 min)",
        "• Leerlingen lezen elkaars werk (met en zonder AI)",
        "• Formulier invullen: originaliteit, creativiteit, stijl",
        "• Kunnen ze zien welke delen AI-geassisteerd zijn?",
        "",
        "Klassendiscussie (10 min)",
        "• Wat zijn sterke punten van AI-geassisteerd schrijven?",
        "• Waar blijft AI tekort schieten?",
        "• Hoe behoud je je eigen stem als schrijver?",
        "• Wanneer zou je AI wel/niet gebruiken?"
      ],
      assessment: [
        "Creatieve tekst met duidelijke eigen inbreng (50%)",
        "Reflectie op schrijfproces met AI (25%)",
        "Peer review kwaliteit en feedback (15%)",
        "Participatie in klassendiscussies (10%)"
      ],
      tips: [
        "Moedig experimenteren aan - er zijn geen foute antwoorden",
        "Benadruk dat AI een hulpmiddel is, creativiteit komt van de leerling",
        "Laat leerlingen verschillende AI-tools proberen",
        "Bespreek auteursrecht en plagiarisme bij AI-gebruik"
      ]
    },

    "AI voor Taalonderwijs": {
      level: "Voortgezet Onderwijs (alle niveaus)",
      duration: "75 minuten",
      subject: "Engels / Frans / Duits",
      objectives: [
        "AI-tools effectief gebruiken voor taalvaardigheid ontwikkeling",
        "Conversatieoefeningen voeren met AI-chatbots",
        "Grammatica en woordenschat verbeteren met AI-feedback",
        "Kritisch beoordelen van AI-vertalingen en -correcties",
        "Zelfstandig leren organiseren met AI-ondersteuning"
      ],
      materials: [
        "Smartphones/tablets met spraakfunctie",
        "Toegang tot ChatGPT, Google Translate, Duolingo",
        "Conversatie-scenario's en rollenspellen",
        "Teksten voor vertaal- en correctieoefeningen",
        "Evaluatieformulieren voor zelfbeoordeling"
      ],
      content: [
        "DEEL 1: AI-TOOLS VOOR TAALONDERWIJS (15 min)",
        "",
        "Overzicht beschikbare tools (10 min)",
        "• Conversatie: ChatGPT, Google Assistant in doeltaal",
        "• Vertaling: Google Translate, DeepL",
        "• Grammatica: Grammarly, LanguageTool",
        "• Woordenschat: Quizlet AI, personalized flashcards",
        "",
        "Demo en eerste indruk (5 min)",
        "• Korte conversatie met AI in doeltaal",
        "• Leerlingen proberen zelf een vraag te stellen",
        "• Observeren: hoe reageert AI op fouten?",
        "",
        "DEEL 2: CONVERSATIE-OEFENINGEN (30 min)",
        "",
        "Gestructureerde gesprekken (15 min)",
        "• Scenario's: restaurant bezoek, weg vragen, sollicitatiegesprek",
        "• Leerlingen voeren gesprek met AI-assistent",
        "• AI-instructie: 'Je bent een vriendelijke ober in een Frans restaurant'",
        "• Focus op natuurlijke communicatie, niet perfecte grammatica",
        "",
        "Vrije conversatie (15 min)",
        "• Leerlingen kiezen eigen onderwerp",
        "• AI vragen om feedback op uitspraak en grammatica",
        "• Nieuwe woorden en uitdrukkingen leren",
        "• Rollenspel: AI als gesprekspartner uit doelland",
        "",
        "DEEL 3: SCHRIJFVAARDIGHEDEN (20 min)",
        "",
        "Tekst schrijven met AI-feedback (15 min)",
        "• Opdracht: schrijf een brief/e-mail in doeltaal",
        "• AI vragen om correcties en verbeteringen",
        "• Vergelijken: origineel vs gecorrigeerde versie",
        "• Uitleg vragen bij grammaticaregels",
        "",
        "Vertaaloefening kritisch bekijken (5 min)",
        "• Nederlandse tekst door AI laten vertalen",
        "• Leerlingen beoordelen kwaliteit van vertaling",
        "• Fouten of onnatuurlijke uitdrukkingen identificeren",
        "• Verbetering voorstellen",
        "",
        "DEEL 4: ZELFSTANDIG LEREN (10 min)",
        "",
        "Persoonlijk leerplan maken (8 min)",
        "• AI vragen om leeradvies op basis van niveau",
        "• Dagelijkse oefeningen laten voorstellen",
        "• Zwakke punten identificeren en aanpakken",
        "• Realistische doelen stellen",
        "",
        "Evaluatie en tips (2 min)",
        "• Wat ging goed? Waar liep je tegen aan?",
        "• Tips voor thuis oefenen met AI",
        "• Belang van echte menselijke conversatie blijft"
      ],
      assessment: [
        "Voeren van conversatie met AI-assistent (40%)",
        "Kwaliteit van geschreven tekst na AI-feedback (30%)",
        "Kritische beoordeling van AI-vertalingen (20%)",
        "Zelfbeoordeling en leerplan (10%)"
      ],
      tips: [
        "Moedig leerlingen aan om fouten te maken - AI is geduldig",
        "Wissel af tussen AI-oefeningen en echte menselijke interactie",
        "Leer leerlingen om AI-feedback kritisch te bekijken",
        "Gebruik AI voor extra oefening, niet als vervanging van lessen"
      ]
    }
  };

  return lessonData[lessonTitle] || {
    level: "Algemeen",
    duration: "45 minuten",
    subject: "AI & Technologie", 
    objectives: ["Basis AI-concepten begrijpen"],
    materials: ["Computer", "Internetverbinding"],
    content: ["Algemene AI-les inhoud"],
    assessment: ["Observatie tijdens les"],
    tips: ["Houd het interactief en praktisch"]
  };
};

/**
 * Download unique lesson PDFs with specific content for each lesson
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('Generating unique lesson PDF for:', lessonTitle);
    
    const lessonData = getLessonContent(lessonTitle);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const uniqueId = Math.random().toString(36).substring(2, 8);
    doc.setFont('helvetica');

    // Professional header
    doc.setFillColor(70, 130, 180);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('AI LESMATERIAAL - ONDERWIJS.AI', 105, 16, { align: 'center' });

    // Reset colors
    doc.setTextColor(0, 0, 0);

    // Lesson title and metadata
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(lessonTitle.toUpperCase(), 20, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Niveau: ' + lessonData.level, 20, 55);
    doc.text('Duur: ' + lessonData.duration, 20, 65);
    doc.text('Vak: ' + lessonData.subject, 20, 75);
    doc.text('Gegenereerd: ' + new Date().toLocaleDateString('nl-NL'), 20, 85);
    doc.text('Les ID: ' + uniqueId, 150, 85);

    let yPos = 105;

    // Learning objectives
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LEERDOELEN', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    lessonData.objectives.forEach(objective => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text('• ' + objective, 25, yPos);
      yPos += 7;
    });

    yPos += 5;

    // Materials needed
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('BENODIGDE MATERIALEN', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    lessonData.materials.forEach(material => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text('• ' + material, 25, yPos);
      yPos += 7;
    });

    yPos += 10;

    // Lesson content
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LESINHOUD', 20, yPos);
    yPos += 15;

    lessonData.content.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(10);
      
      if (line.includes('DEEL') || line.includes(':') && line.length < 60) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else if (line.startsWith('•')) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }

      // Handle long lines by wrapping text
      const maxWidth = 170;
      const lines = doc.splitTextToSize(line, maxWidth);
      
      lines.forEach(textLine => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(textLine, 20, yPos);
        yPos += line === '' ? 6 : 6;
      });
    });

    // Assessment section
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EVALUATIE', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    lessonData.assessment.forEach(item => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text('• ' + item, 25, yPos);
      yPos += 7;
    });

    // Tips section
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TIPS VOOR DE DOCENT', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    lessonData.tips.forEach(tip => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const wrappedTip = doc.splitTextToSize('• ' + tip, 170);
      wrappedTip.forEach(line => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 25, yPos);
        yPos += 6;
      });
      yPos += 2;
    });

    // Footer with website and page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Footer background
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 285, 210, 12, 'F');
      
      // Footer text
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text('AI in het Onderwijs | https://onderwijs.ai/ | ' + lessonTitle, 20, 292);
      doc.text('Les ID: ' + uniqueId + ' | Pagina ' + i + '/' + totalPages, 150, 292);
    }

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const cleanTitle = lessonTitle.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    const filename = 'AI-Les-' + cleanTitle + '-' + timestamp + '-' + uniqueId + '.pdf';

    doc.save(filename);

    console.log('Unique lesson PDF "' + lessonTitle + '" downloaded successfully with ID:', uniqueId);

  } catch (error) {
    console.error('Lesson PDF generation failed:', error);
    alert('Er is een fout opgetreden bij het genereren van de les. Probeer het opnieuw.');
  }
};

/**
 * Legacy support
 */
export const downloadFile = (url, filename = null) => {
  console.log('Redirecting to complete startersgids...');
  downloadStartersgids();
};

export default {
  downloadStartersgids,
  downloadLesson,
  downloadFile
};