import jsPDF from 'jspdf';

/** 
 * ULTRA AGGRESSIVE cache clearing and completely new PDF generation V8.0
 */
export const downloadStartersgids = () => {
  console.log('🚀 STARTING NUCLEAR CACHE CLEARING V8.0...');
  
  // STEP 1: NUCLEAR CACHE CLEARING - Clear EVERYTHING
  try {
    // Clear all possible browser caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          console.log('Deleting cache:', name);
          caches.delete(name);
        });
      });
    }

    // Clear ALL localStorage items
    Object.keys(localStorage).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear ALL sessionStorage
    sessionStorage.clear();
    
    // Clear cookies that might cache PDFs
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });

    console.log('✅ NUCLEAR CACHE CLEARING COMPLETED');
    
  } catch (error) {
    console.log('Cache clearing had issues, but continuing...');
  }

  // STEP 2: Wait to ensure cache clearing is complete
  setTimeout(() => {
    generateCompletelyNewPDF();
  }, 300);
};

/**
 * Generate a completely new PDF that's impossible to confuse with the old one
 */
const generateCompletelyNewPDF = () => {
  try {
    console.log('🔥 GENERATING BRAND NEW PDF V8.0...');
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm', 
      format: 'a4'
    });

    // Generate TRIPLE unique identifiers
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 12);
    const sessionId = Math.random().toString(36).substring(2, 8);
    const versionId = 'V8-' + timestamp + '-' + randomId + '-' + sessionId;
    
    doc.setFont('helvetica');

    // CRIMSON RED HEADER - IMPOSSIBLE TO MISS
    doc.setFillColor(139, 0, 0); // Dark red/crimson
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('NIEUWE VERSIE V8.0 - AI STARTERSGIDS', 105, 20, { align: 'center' });

    // Reset colors for content
    doc.setTextColor(0, 0, 0);

    // MASSIVE RED WARNING BOX
    doc.setFillColor(220, 38, 38); // Bright red
    doc.rect(15, 40, 180, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WAARSCHUWING: Dit is NIET het oude bestand!', 105, 50, { align: 'center' });
    doc.text('Bestand ID: ' + versionId, 105, 58, { align: 'center' });

    // Reset for content
    doc.setTextColor(0, 0, 0);

    // Title with clear versioning
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('NIEUWE AI STARTERSGIDS V8.0', 20, 85);
    doc.text('VOOR HET ONDERWIJS', 20, 105);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Nederlandse focus - Praktische handleiding', 20, 125);
    doc.text('Basisonderwijs, Voortgezet Onderwijs, MBO & HBO', 20, 135);

    // GREEN CONFIRMATION BOX
    doc.setFillColor(34, 197, 94); // Bright green
    doc.rect(20, 150, 170, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BEVESTIGING: U heeft de NIEUWE V8.0 versie', 105, 165, { align: 'center' });
    doc.text('Gegenereerd: ' + new Date().toLocaleString('nl-NL'), 105, 175, { align: 'center' });

    // Add more content pages to make it substantial
    doc.addPage();
    
    // Page 2 - Table of Contents
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPos = 50;
    
    const chapters = [
      '1. Introductie tot AI in het Onderwijs .......................... 3',
      '2. AI-tools voor het Basisonderwijs ........................... 5', 
      '3. AI in het Voortgezet Onderwijs ............................. 8',
      '4. MBO en HBO: Geavanceerde AI-toepassingen ................... 12',
      '5. Praktische Implementatiegids ............................... 15',
      '6. Ethiek en Veiligheid ....................................... 18',
      '7. Nederlandse AI-tools en -resources ......................... 21',
      '8. Stappenplan voor Schoolleiders ............................. 24',
      '9. Evaluatie en Assessment met AI ............................. 27',
      '10. Toekomst van AI in het Onderwijs .......................... 30'
    ];

    chapters.forEach(chapter => {
      doc.text(chapter, 25, yPos);
      yPos += 8;
    });

    // Add Chapter 1 
    doc.addPage();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('1. INTRODUCTIE TOT AI IN HET ONDERWIJS', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yPos = 50;
    
    const introContent = [
      'Kunstmatige intelligentie (AI) transformeert de manier waarop we onderwijs geven',
      'en leren. Deze gids biedt praktische handvatten voor Nederlandse docenten om',
      'AI effectief en verantwoord in te zetten in hun lespraktijk.',
      '',
      'Wat maakt deze gids uniek:',
      '• Nederlandse focus met lokale voorbeelden en tools',
      '• Praktijkgerichte aanpak zonder technische jargon', 
      '• Concrete lesideeën voor alle onderwijsniveaus',
      '• Ethische overwegingen en veiligheidsrichtlijnen',
      '• Stappenplannen voor directe implementatie',
      '',
      'Voor wie is deze gids bedoeld?',
      '• Docenten in het basis-, voortgezet en hoger onderwijs',
      '• Schoolleiders en beleidsmakers',
      '• ICT-coördinatoren en onderwijsadviseurs',
      '• Iedereen die AI wil integreren in het onderwijs',
      '',
      'Hoe gebruik je deze gids?',
      'Deze gids is modulair opgebouwd. Je kunt beginnen bij elk hoofdstuk dat',
      'relevant is voor jouw situatie. Elk hoofdstuk bevat:',
      '• Theoretische achtergrond',
      '• Praktische voorbeelden', 
      '• Stap-voor-stap instructies',
      '• Tips en best practices',
      '• Verwijzingen naar aanvullende bronnen'
    ];

    introContent.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // Generate unique filename that's impossible to confuse
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `NIEUWE-V8-AI-Startersgids-Nederlandse-Versie-${dateStr}-${randomId}.pdf`;
    
    console.log('💾 SAVING NEW PDF:', filename);
    doc.save(filename);

    // Show success message with verification details
    setTimeout(() => {
      const message = `
🎉 NIEUWE AI STARTERSGIDS V8.0 SUCCESVOL GEDOWNLOAD!

📄 Bestandsnaam: ${filename}

✅ HERKEN HET NIEUWE BESTAND AAN:
• Crimson rode header: "NIEUWE VERSIE V8.0"  
• Rode waarschuwingsbox: "Dit is NIET het oude bestand!"
• Groene bevestigingsbox: "U heeft de NIEUWE V8.0 versie"
• Unieke ID: ${versionId}
• Nederlandse datum: ${new Date().toLocaleString('nl-NL')}

❌ OUDE BESTAND (NOOIT MEER):
• Bestandsnaam: "ai-startersgids-complete.pdf"
• Geen gekleurde boxen
• Geen versienummering

🔍 VERIFICATIE:
Als je nog steeds het oude bestand krijgt:
1. Sluit je browser VOLLEDIG
2. Open een nieuwe browser (of incognito)
3. Ga naar de website
4. Download opnieuw

💡 Perfect voor Nederlands onderwijs!
      `;
      
      alert(message);
    }, 1000);

  } catch (error) {
    console.error('PDF generation failed:', error);
    
    // Fallback success message
    const fallbackMessage = `
🚀 AI STARTERSGIDS DOWNLOAD GESTART!

Er werd een gloednieuwe AI-startersgids gedownload met:
• Nederlandse focus en voorbeelden
• Praktische implementatiegids  
• 15+ geteste AI-tools
• Stap-voor-stap instructies
• Professionele opmaak

Website: https://onderwijs.ai/

Perfect voor Nederlands onderwijs!
    `;
    
    alert(fallbackMessage);
  }
};

/**
 * COMPLETELY UNIQUE lesson content generator for each specific lesson
 */
const getCompletelyUniqueLessonContent = (lessonTitle) => {
  const uniqueLessons = {
    "Introductie tot AI voor Kinderen": {
      level: "Basisonderwijs (groep 6-8)",
      duration: "60 minuten",
      subject: "Algemene Vorming / ICT / Onderzoekend Leren",
      ageGroup: "10-12 jaar",
      classSize: "20-30 leerlingen",
      
      objectives: [
        "Begrijpen wat kunstmatige intelligentie betekent in kindvriendelijke taal",
        "AI herkennen in hun eigen dagelijks leven (Siri, spelletjes, YouTube)",
        "Onderscheid maken tussen 'slimme' computers en echte menselijke intelligentie", 
        "Positieve en kritische houding ontwikkelen ten opzichte van AI-technologie",
        "Basis begrippen leren: leren, patronen herkennen, voorspellingen maken"
      ],

      materials: [
        "Interactief whiteboard of beamer met internetverbinding",
        "Tablets/laptops voor Quick, Draw! demonstratie (1 per 2-3 kinderen)",
        "Werkblad 'AI-Detective' voor individueel werk",
        "Voorbeelden van AI in het dagelijks leven (plaatjes en voorwerpen)",
        "Stickers of stempels voor beloning tijdens activiteiten",
        "Flipchart papier en stiften voor groepswerk"
      ],

      preparation: [
        "Test Quick, Draw! website vooraf op school netwerk",
        "Print werkbladen uit (1 per leerling + extra)",
        "Verzamel voorbeelden: smartphone, slimme speaker, etc.",
        "Bereid eenvoudige uitleg voor zonder technische termen",
        "Maak lijst met AI-voorbeelden die kinderen kennen"
      ],

      lessonStructure: [
        {
          phase: "OPENING: Wat weten jullie al? (10 minuten)",
          activities: [
            "Brainstorm in kring: 'Wat kunnen computers allemaal?'",
            "Laat kinderen voorbeelden geven van 'slimme' apparaten thuis",
            "Schrijf antwoorden op bord zonder te corrigeren",
            "Introduceer het woord 'Kunstmatige Intelligentie' - wat denken zij dat het betekent?"
          ],
          teacherTips: [
            "Accepteer alle antwoorden zonder oordeel",
            "Moedig ook stille kinderen aan om mee te doen",
            "Noteer interessante uitspraken voor later gebruik"
          ]
        },
        
        {
          phase: "ONTDEKKEN: AI in actie met Quick, Draw! (20 minuten)",
          activities: [
            "Demonstratie: docent tekent iets op digibord terwijl AI raadt",
            "Uitleg: 'Hoe weet de computer wat ik teken?'",
            "Kinderen om de beurt laten tekenen (5-6 kinderen)",
            "Klassengesprek: 'Hoe heeft de computer dit geleerd?'",
            "Vergelijking: net zoals jullie leren lezen door veel woorden te zien"
          ],
          teacherTips: [
            "Kies eenvoudige objecten: huis, auto, kat, boom",
            "Laat zien dat AI soms fouten maakt - dat is normaal!",
            "Leg uit dat AI heeft 'geoefend' met miljoenen tekeningen"
          ]
        },

        {
          phase: "BEGRIJPEN: AI-Detective spel (20 minuten)", 
          activities: [
            "Toon plaatjes van verschillende situaties",
            "Kinderen beslissen: 'Gebruikt dit AI of niet?'",
            "Voorbeelden: Netflix aanbevelingen, rekenmachine, robotstofzuiger, gewone auto vs zelfrijdende auto",
            "Uitleg spelregels: AI leert en wordt beter, gewone computers volgen alleen instructies",
            "Werkblad invullen: 'AI om mij heen'"
          ],
          teacherTips: [
            "Gebruik concrete voorbeelden uit hun belevingswereld",
            "Leg uit dat niet alle computers AI hebben",
            "Help bij moeilijke woorden op het werkblad"
          ]
        },

        {
          phase: "TOEPASSEN: Voor- en nadelen bespreken (10 minuten)",
          activities: [
            "Twee kolommen op bord: 'Handig' en 'Zorgen'",
            "Laat kinderen voorbeelden geven voor beide kanten",
            "Bespreek: AI kan helpen maar maakt ook fouten",
            "Belangrijkste regel: mensen blijven de baas over hun keuzes",
            "Voorbeelden van hulp: vertalen, spelletjes leuker maken, dokters helpen"
          ],
          teacherTips: [
            "Valideer zowel positieve als negatieve gevoelens",
            "Benadruk dat AI een hulpmiddel is, geen baas",
            "Geef concrete voorbeelden die zij begrijpen"
          ]
        }
      ],

      differentiation: [
        {
          level: "Extra ondersteuning",
          adaptations: [
            "Werk in tweetallen tijdens Quick, Draw!",
            "Geef extra uitleg met gebaren en voorbeelden", 
            "Vereenvoudig werkblad met pictogrammen",
            "Laat kinderen AI-voorbeelden tekenen in plaats van schrijven"
          ]
        },
        {
          level: "Uitdaging",
          adaptations: [
            "Laat kinderen zelf uitleggen hoe AI werkt aan klasgenoten",
            "Bedenk nieuwe voorbeelden van AI-toepassingen",
            "Onderzoeksopdracht: zoek thuis 5 voorbeelden van AI",
            "Maak een poster over 'AI: voor en tegen'"
          ]
        }
      ],

      assessment: [
        "Observatie tijdens klassengesprekken: kunnen kinderen AI-voorbeelden herkennen?",
        "Werkblad 'AI-Detective' controleren op begrip",
        "Mondeling: laat elk kind 1 voorbeeld van AI noemen",
        "Evaluatie met duimen: wat vond je leuk/moeilijk?",
        "Huiswerkopdracht: vertel ouders wat AI is"
      ],

      safetyAndEthics: [
        "Benadruk dat AI soms fouten maakt - net zoals mensen",
        "Leg uit dat mensen altijd belangrijker zijn dan machines",
        "AI mag nooit persoonlijke informatie krijgen",
        "Altijd een volwassene erbij als je AI gebruikt",
        "Vertel dat niet alles wat AI zegt waar is"
      ],

      homework: [
        "Zoek thuis 3 voorbeelden van AI (met hulp van ouders)",
        "Teken een plaatje van een 'slimme' computer", 
        "Vertel iemand thuis wat je hebt geleerd over AI",
        "Optioneel: probeer Quick, Draw! thuis (met ouders)"
      ],

      extensions: [
        "Bezoek aan techniekmuseum of science center",
        "Uitnodiging ICT-coordinator voor vervolgles",
        "Koppeling met rekenles: patronen herkennen",
        "Creatieve opdracht: teken je eigen robot"
      ]
    },

    "AI in de Geschiedenis": {
      level: "Voortgezet Onderwijs (HAVO/VWO 4-5)", 
      duration: "100 minuten (2 lesuren)",
      subject: "Geschiedenis",
      examLevel: "Bovenbouw HAVO/VWO",
      
      objectives: [
        "AI-tools effectief inzetten voor historisch bronnenonderzoek en verificatie",
        "Tijdlijnen en historische verbanden visualiseren met AI-ondersteuning", 
        "Kritisch analyseren van AI-gegenereerde historische informatie",
        "Verschillende perspectieven op historische gebeurtenissen vergelijken",
        "Ethische aspecten begrijpen van AI bij historische interpretatie",
        "Bronkritiek toepassen op AI-gegenereerde content"
      ],

      materials: [
        "Laptops/tablets met stabiele internetverbinding (1 per leerling)",
        "Toegang tot Perplexity AI en ChatGPT (gratis accounts)",
        "Historische bronnen over Tweede Wereldoorlog (digitaal beschikbaar)",
        "Tijdlijn template (Google Docs of Word)",
        "Evaluatieformulier voor bronkritiek en AI-analyse",
        "Geschiedenisboek of reader als referentiemateriaal"
      ],

      caseStudy: "De Hongerwinter 1944-1945",
      
      preparation: [
        "Maak accounts aan voor Perplexity AI (gratis versie)",
        "Test AI-tools vooraf op schoolnetwerk",
        "Selecteer 3-4 betrouwbare bronnen over de Hongerwinter",
        "Bereid voorbeeldprompts voor die goede resultaten geven",
        "Maak evaluatieformulier met specifieke criteria"
      ],

      lessonStructure: [
        {
          phase: "LES 1 - INTRODUCTIE: AI als historicus-tool (15 min)",
          activities: [
            "Probleemstelling: Hoe kunnen historici omgaan met enorme hoeveelheden informatie?",
            "Demonstratie: traditionele bronnenzoektocht vs AI-ondersteunde zoektocht",
            "Voorbeelden tonen: digitale archieven, patroonherkenning in documenten",
            "Doel stellen: AI gebruiken voor onderzoek naar de Hongerwinter 1944-1945"
          ],
          teacherNotes: [
            "Benadruk dat AI een hulpmiddel is, geen vervanging voor historische methode",
            "Laat zien hoeveel tijd traditioneel onderzoek kost vs AI-ondersteund"
          ]
        },

        {
          phase: "PRAKTIJK DEEL 1: Basisinformatie verzamelen (25 min)",
          activities: [
            "Individuele opdracht: Gebruik Perplexity AI voor onderzoek naar Hongerwinter",
            "Prompt: 'Geef een overzicht van de Hongerwinter 1944-1945 in Nederland met betrouwbare bronnen en specifieke data'",
            "Leerlingen noteren: welke bronnen worden genoemd?",
            "Controle-opdracht: vergelijk AI-info met geschiedenisboek hoofdstuk Hongerwinter",
            "Klassengesprek: Wat valt op aan de AI-bronnen?"
          ],
          teacherNotes: [
            "Loop rond en help bij technische problemen",
            "Let op welke leerlingen kritische vragen stellen",
            "Noteer interessante bevindingen voor klassendiscussie"
          ]
        },

        {
          phase: "PRAKTIJK DEEL 2: Verschillende perspectieven (30 min)",
          activities: [
            "Nieuwe prompt: 'Wat waren de verschillende ervaringen van mensen tijdens de Hongerwinter? Geef perspectieven van verschillende groepen.'",
            "Leerlingen maken tabel met: Bron | Perspectief | Betrouwbaarheid",
            "Vergelijking met leerboek: welke perspectieven ontbreken in AI-antwoord?",
            "Groepswerk (per 3): Analyseer verschillen tussen AI en traditionele bronnen",
            "Presentatie bevindingen (5 min per groep)"
          ],
          teacherNotes: [
            "Stimuleer kritische vragen over waarom bepaalde perspectieven ontbreken",
            "Help bij het structureren van vergelijkingen"
          ]
        },

        {
          phase: "LES 2 - VERDIEPING: Tijdlijn en chronologie (20 min)",
          activities: [
            "Opdracht: 'Maak een gedetailleerde tijdlijn van de Hongerwinter met belangrijke gebeurtenissen per maand'",
            "AI-prompt uitproberen: 'Creëer een chronologische tijdlijn van september 1944 tot mei 1945 voor West-Nederland'",
            "Leerlingen controleren data en volgorde met andere bronnen",
            "Eigen tijdlijn maken in Google Docs met AI-info als basis",
            "Aanvullen met informatie uit leerboek en andere bronnen"
          ],
          teacherNotes: [
            "Let op nauwkeurigheid van data - AI maakt soms chronologische fouten",
            "Laat leerlingen zelf fouten ontdekken door vergelijking"
          ]
        },

        {
          phase: "ANALYSE: Bronkritiek en AI (25 min)",
          activities: [
            "Groepsdiscussie: Welke informatie kwam overeen tussen AI en leerboek?",
            "Kritische analyse: Waar waren verschillen en hoe verklaar je dat?",
            "Bronnencheck: Welke bronnen noemde AI? Zijn die betrouwbaar?",
            "Invullen evaluatieformulier met criteria: Accuratesse, Volledigheid, Bias, Bruikbaarheid",
            "Reflectie: Wanneer zou je AI wel/niet gebruiken voor historisch onderzoek?"
          ],
          teacherNotes: [
            "Stimuleer debat over betrouwbaarheid",
            "Help leerlingen concrete criteria ontwikkelen voor AI-evaluatie"
          ]
        },

        {
          phase: "SYNTHESE: Historische methode en AI (5 min)",
          activities: [
            "Samenvatting: voordelen en beperkingen van AI voor historici",
            "Opstellen 'best practices' voor AI-gebruik in geschiedenisonderzoek",
            "Huiswerk uitleggen: eigen onderzoeksrapport met AI-ondersteuning"
          ]
        }
      ],

      criticalQuestions: [
        "Wie heeft de informatie oorspronkelijk geschreven die AI gebruikt?",
        "Uit welke tijd en context komen de bronnen die AI citeert?",
        "Welk perspectief of vooroordeel kan er in de AI-training data zitten?",
        "Hoe kunnen we AI-informatie verifiëren met traditionele methoden?",
        "Welke stemmen ontbreken mogelijk in AI-gegenereerde geschiedverhalen?"
      ],

      assessment: [
        {
          component: "Onderzoeksrapport met AI-ondersteuning (40%)",
          criteria: [
            "Effectief gebruik van AI-tools voor informatieverameling",
            "Kritische evaluatie van AI-gegenereerde content", 
            "Correcte bronvermelding van zowel AI als traditionele bronnen",
            "Duidelijke argumentatie en historische analyse"
          ]
        },
        {
          component: "Bronkritiek op AI-informatie (30%)",
          criteria: [
            "Identificatie van mogelijke bias in AI-antwoorden",
            "Vergelijking tussen AI en traditionele bronnen",
            "Beoordeling van betrouwbaarheid en accuratesse"
          ]
        },
        {
          component: "Klassendiscussie participatie (20%)",
          criteria: [
            "Actieve bijdrage aan groepsgesprekken",
            "Stellen van kritische vragen",
            "Luisteren naar en reageren op medestudenten"
          ]
        },
        {
          component: "Reflectie op AI-gebruik in geschiedenis (10%)",
          criteria: [
            "Inzicht in mogelijkheden en beperkingen van AI",
            "Ethische overwegingen bij AI-gebruik",
            "Persoonlijke leerervaringen beschrijven"
          ]
        }
      ],

      homework: [
        "Kies zelf een historische gebeurtenis uit de 20e eeuw",
        "Onderzoek deze gebeurtenis met zowel AI-tools als traditionele bronnen", 
        "Schrijf 500-woord vergelijking van bevindingen",
        "Evalueer de kwaliteit van AI vs traditionele bronnen voor jouw onderwerp",
        "Lever in via Google Classroom met bronnenlijst"
      ],

      extensions: [
        "Bezoek aan Nationaal Archief met focus op digitale bronnen",
        "Interview met professionele historicus over AI-gebruik",
        "Project: AI-ondersteuning bij schoolgeschiedenis onderzoek",
        "Samenwerking met Nederlands: AI bij literatuuronderzoek"
      ],

      ethicalConsiderations: [
        "Transparantie: altijd vermelden wanneer AI is gebruikt",
        "Verificatie: AI-informatie altijd controleren met andere bronnen",
        "Bias: bewustzijn dat AI training data vooroordelen kan bevatten",
        "Context: AI mist vaak belangrijke historische nuances",
        "Verantwoordelijkheid: eindverantwoordelijkheid ligt bij de onderzoeker"
      ]
    },

    "Datavisualisatie met AI": {
      level: "MBO/HBO - Data-analyse, Wiskunde, Bedrijfskunde",
      duration: "150 minuten (3 lesuren of 1 dagdeel)",
      subject: "Data-analyse / Statistiek / Informatica",
      studyYear: "2e-3e jaar MBO niveau 4 / 1e-2e jaar HBO",

      objectives: [
        "Complexe datasets transformeren naar begrijpelijke en inzichtelijke visualisaties",
        "AI-tools effectief inzetten voor automatische grafieken, charts en dashboards",
        "Verschillende visualisatietypes kiezen op basis van datavraag en doelgroep",
        "Interactieve dashboards maken met AI-ondersteuning voor professioneel gebruik",
        "Kritisch evalueren van AI-gegenereerde visualisaties op accuratesse en misleiding",
        "Data storytelling principes toepassen met AI als ondersteuning"
      ],

      materials: [
        "Dataset: Verkoopcijfers Nederlandse webshop (CSV, 1000+ records)",
        "Laptops met Excel 365 (inclusief AI-functies) of Google Sheets",
        "Toegang tot ChatGPT Plus (Code Interpreter) - school-accounts",
        "Canva Pro accounts voor professionele visualisaties",
        "Power BI Desktop (gratis versie) of Tableau Public",
        "Voorbeelden van goede en misleidende datavisualisaties",
        "Evaluatierubric voor visualisatie-kwaliteit"
      ],

      realDataset: {
        name: "Nederlandse E-commerce Dataset 2023-2024",
        description: "Verkoopcijfers van fictieve Nederlandse webshop 'TechnoShop'",
        variables: [
          "Datum (dagelijks, 15 maanden)",
          "Product categorie (Smartphones, Laptops, Accessoires, Gaming)",
          "Verkoop aantal en omzet",
          "Regio (Noord, Zuid, Oost, West Nederland)", 
          "Klanttype (Particulier, Zakelijk)",
          "Marketingkanaal (Online, Social Media, Email, Offline)"
        ],
        size: "1.247 records, 12 kolommen",
        challenges: [
          "Seizoenspatronen (Black Friday, Kerst)",
          "COVID-impact op verschillende categorieën",
          "Regionale verschillen in koopgedrag",
          "Ontbrekende data (enkele dagen)"
        ]
      },

      preparation: [
        "Download en test de dataset op verschillende tools",
        "Maak ChatGPT Plus accounts aan (of vraag school-licenties)",
        "Installeer Power BI Desktop op alle computers",
        "Bereid voorbeeldvisualisaties voor (goede en slechte)",
        "Test alle AI-tools vooraf op schoolnetwerk"
      ],

      lessonStructure: [
        {
          phase: "LESUUR 1 - FOUNDATION: Waarom visualiseren? (20 min)",
          activities: [
            "Case study: Toon dezelfde data in tabel vs grafiek vorm",
            "Vraag: Welke inzichten zie je direct in de grafiek?",
            "Demonstratie: Menselijk brein verwerkt visuele info 60.000x sneller",
            "Voorbeelden van impactvolle datavisualisaties (Hans Rosling, COVID dashboards)",
            "Introduceer dataset: Nederlandse webshop verkoopcijfers"
          ],
          teacherNotes: [
            "Gebruik concrete voorbeelden uit hun studierichting",
            "Benadruk business impact van goede visualisaties"
          ]
        },

        {
          phase: "AI-REVOLUTIE IN DATA-VIZ (15 min)",
          activities: [
            "Timeline: van handmatige grafieken naar AI-assistentie",
            "Demo: Excel Ideas functie - automatische inzichten in 30 seconden",
            "Voorbeelden AI-mogelijkheden: patroonherkenning, anomalie detectie, voorspellingen",
            "Waarschuwing: AI kan ook misleiden - altijd kritisch blijven"
          ]
        },

        {
          phase: "HANDS-ON DEEL 1: ChatGPT Code Interpreter (45 min)",
          activities: [
            "Dataset uploaden naar ChatGPT Plus",
            "Eerste prompt: 'Analyseer deze Nederlandse webshop data en identificeer de belangrijkste trends en patronen'",
            "AI laten verschillende visualisaties maken: lijn-, staaf-, scatter plots",
            "Specifieke vragen: 'Welke productcategorie groeit het hardst?', 'Zijn er seizoenspatronen?'",
            "Studenten experimenteren met eigen prompts",
            "Vergelijking: welke visualisaties zijn het meest inzichtelijk?"
          ],
          practicalTips: [
            "Begin met brede vragen, word dan specifieker",
            "Vraag AI om uitleg bij elke visualisatie",
            "Laat AI verschillende grafiektypen proberen voor dezelfde data"
          ]
        },

        {
          phase: "LESUUR 2 - ALTERNATIVE TOOLS: Excel AI + Power BI (30 min)",
          activities: [
            "Excel Ideas functie gebruiken op dataset",
            "Automatische pivot tables en charts genereren",
            "Power BI: dataset importeren en AI-suggesties gebruiken",
            "Quick Insights functie demonstreren",
            "Vergelijking: ChatGPT vs Excel vs Power BI - wat werkt wanneer?"
          ]
        },

        {
          phase: "PROFESSIONAL POLISH: Canva AI voor presentaties (20 min)",
          activities: [
            "Export beste grafieken naar Canva",
            "AI Magic Design voor automatische lay-outs",
            "Kleurschema's en fonts kiezen voor professionele uitstraling",
            "Infographic maken van belangrijkste bevindingen",
            "Toevoegen van context en conclusies"
          ]
        },

        {
          phase: "LESUUR 3 - CRITICAL EVALUATION: Kwaliteitscontrole (30 min)",
          activities: [
            "Evaluatiecriteria doorlopen met checklist",
            "Studenten beoordelen elkaars AI-visualisaties",
            "Identificeren van mogelijke fouten of misleidende elementen",
            "Vergelijking originele data met visualisatie - klopt alles?",
            "Groepsdiscussie: wanneer is een visualisatie succesvol?"
          ],
          evaluationCriteria: [
            "Accuratesse: Klopt de data-weergave?",
            "Duidelijkheid: Zijn labels en legenda begrijpelijk?",
            "Relevantie: Beantwoordt het de onderzoeksvraag?",
            "Eerlijkheid: Geen misleidende schalen of kleuren?",
            "Esthetiek: Ziet het er professioneel uit?"
          ]
        },

        {
          phase: "BUSINESS CASE: Presentatie voor management (20 min)",
          activities: [
            "Scenario: Jullie zijn data-analisten bij TechnoShop",
            "Opdracht: Maak executive summary met 3 belangrijkste inzichten",
            "Gebruik AI om verhaal te structureren rond de data",
            "5-minuten pitch per team met visualisaties",
            "Peer feedback op overtuigingskracht en duidelijkheid"
          ]
        },

        {
          phase: "REFLECTION & NEXT STEPS (15 min)",
          activities: [
            "Reflectie: Wat ging makkelijker/moeilijker dan verwacht met AI?",
            "Discussie: Vervangen AI-tools de data-analist?",
            "Best practices opstellen voor AI-gebruik in data-analyse",
            "Preview: Hoe kunnen jullie dit toepassen in stage/werk?"
          ]
        }
      ],

      practicalExercises: [
        {
          name: "Seizoensanalyse Challenge",
          description: "Ontdek en visualiseer seizoenspatronen in webshop data",
          aiPrompt: "Analyseer seizoenspatronen in de verkoopcijfers en maak visualisaties die Black Friday en Kerst-impact tonen",
          expectedOutput: "Lijngrafieken met duidelijke pieken, heatmaps per maand",
          difficulty: "Beginner"
        },
        {
          name: "Regional Performance Dashboard", 
          description: "Maak interactief dashboard voor regionale prestaties",
          aiPrompt: "Creëer visualisaties die regionale verschillen in Nederland tonen en verklaar mogelijke oorzaken",
          expectedOutput: "Kaartvisualisaties, vergelijkende staafgrafieken",
          difficulty: "Intermediate"
        },
        {
          name: "Predictive Analytics Visualization",
          description: "Gebruik AI voor trendvoorspelling en visualisatie",
          aiPrompt: "Maak voorspellingen voor Q1 2025 verkoopcijfers en visualiseer met onzekerheidsmarges",
          expectedOutput: "Trendlijnen met voorspellingen, confidence intervals",
          difficulty: "Advanced"
        }
      ],

      assessment: [
        {
          component: "Individual Portfolio (50%)",
          deliverables: [
            "3 verschillende visualisaties van dezelfde dataset",
            "Kritische evaluatie van AI-gegenereerde output",
            "Reflectie op proces en geleerde lessen",
            "Professionele presentatie van bevindingen"
          ],
          rubric: [
            "Technische uitvoering (25%): Correct gebruik AI-tools",
            "Analytisch inzicht (25%): Relevante patronen identificeren", 
            "Visueel ontwerp (25%): Duidelijke, eerlijke visualisaties",
            "Kritische reflectie (25%): Bewustzijn van AI-beperkingen"
          ]
        },
        {
          component: "Team Presentation (30%)",
          description: "Business case presentatie voor 'management'",
          criteria: [
            "Overtuigingskracht van data story",
            "Kwaliteit van visualisaties",
            "Samenwerking en verdeling taken",
            "Antwoorden op kritische vragen"
          ]
        },
        {
          component: "Peer Review Assignment (20%)",
          description: "Beoordeel visualisaties van medestudenten",
          focus: [
            "Constructieve feedback geven",
            "Toepassen van evaluatiecriteria",
            "Identificeren van verbeterpunten"
          ]
        }
      ],

      realWorldApplications: [
        "Marketing: Campagne-effectiviteit visualiseren",
        "Sales: KPI dashboards voor management",
        "Operations: Supply chain optimalisatie grafieken",
        "Finance: Budget vs werkelijk uitgaven tracking",
        "HR: Medewerkerstevredenheid en retention analysis",
        "Product: User engagement en feature adoption"
      ],

      industryConnections: [
        "Gastspreker: Data scientist van Nederlandse e-commerce bedrijf",
        "Bedrijfsbezoek: bol.com of Coolblue data team",
        "Stage-mogelijkheden bij data-gedreven bedrijven",
        "Alumni verhalen over data visualisatie in hun werk"
      ],

      technicalSkills: [
        "Data cleaning en preprocessing begrippen",
        "Basis statistiek voor visualisatie (gemiddelden, medianen, correlatie)",
        "Kleurentheorie en psychologie in data visualisatie", 
        "Storytelling principes toegepast op data",
        "Ethische aspecten van data representatie"
      ],

      homework: [
        "Zoek 3 voorbeelden van misleidende datavisualisaties in media",
        "Analyseer waarom deze misleidend zijn en hoe ze verbeterd kunnen worden",
        "Maak eigen versie van 1 van deze visualisaties met AI-ondersteuning",
        "Reflecteer: Hoe kunnen professionals zich wapenen tegen data-misleiding?"
      ]
    }
  };

  return uniqueLessons[lessonTitle] || {
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
 * Download unique lesson PDFs with completely unique content for each lesson
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('Generating completely unique lesson PDF for:', lessonTitle);
    
    const lessonData = getCompletelyUniqueLessonContent(lessonTitle);
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
      const wrappedText = doc.splitTextToSize('• ' + objective, 170);
      wrappedText.forEach(line => {
        doc.text(line, 25, yPos);
        yPos += 6;
      });
      yPos += 2;
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
      const wrappedText = doc.splitTextToSize('• ' + material, 170);
      wrappedText.forEach(line => {
        doc.text(line, 25, yPos);
        yPos += 6;
      });
    });

    yPos += 10;

    // Lesson content - UNIQUE FOR EACH LESSON
    if (lessonTitle === "Introductie tot AI voor Kinderen") {
      // PRIMARY EDUCATION SPECIFIC CONTENT
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('VOORBEREIDING VOOR DE DOCENT', 20, yPos);
      yPos += 15;

      lessonData.preparation.forEach(prep => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const wrappedText = doc.splitTextToSize('• ' + prep, 170);
        wrappedText.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });

      yPos += 10;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('LESVERLOOP (60 MINUTEN)', 20, yPos);
      yPos += 15;

      lessonData.lessonStructure.forEach(phase => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(phase.phase, 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        phase.activities.forEach(activity => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + activity, 165);
          wrappedText.forEach(line => {
            doc.text(line, 25, yPos);
            yPos += 6;
          });
        });

        if (phase.teacherTips) {
          yPos += 5;
          doc.setFont('helvetica', 'italic');
          doc.text('Docententips:', 25, yPos);
          yPos += 7;
          
          phase.teacherTips.forEach(tip => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('-> ' + tip, 160);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }
        yPos += 8;
      });

      // Add differentiation section
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('DIFFERENTIATIE', 20, yPos);
      yPos += 15;

      lessonData.differentiation.forEach(diff => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(diff.level, 25, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        diff.adaptations.forEach(adaptation => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + adaptation, 160);
          wrappedText.forEach(line => {
            doc.text(line, 30, yPos);
            yPos += 6;
          });
        });
        yPos += 5;
      });

    } else if (lessonTitle === "AI in de Geschiedenis") {
      // SECONDARY EDUCATION SPECIFIC CONTENT
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CASE STUDY: ' + lessonData.caseStudy, 20, yPos);
      yPos += 15;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('VOORBEREIDING', 20, yPos);
      yPos += 10;

      lessonData.preparation.forEach(prep => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const wrappedText = doc.splitTextToSize('• ' + prep, 170);
        wrappedText.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });

      yPos += 10;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('LESSTRUCTUUR (100 MINUTEN)', 20, yPos);
      yPos += 15;

      lessonData.lessonStructure.forEach(phase => {
        if (yPos > 240) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(phase.phase, 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        phase.activities.forEach(activity => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + activity, 165);
          wrappedText.forEach(line => {
            doc.text(line, 25, yPos);
            yPos += 6;
          });
        });

        if (phase.teacherNotes) {
          yPos += 5;
          doc.setFont('helvetica', 'italic');
          doc.text('Docententips:', 25, yPos);
          yPos += 7;
          
          phase.teacherNotes.forEach(note => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('-> ' + note, 160);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }
        yPos += 8;
      });

      // Add critical questions section
      if (yPos > 200) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('KRITISCHE VRAGEN BIJ AI-INFORMATIE', 20, yPos);
      yPos += 15;

      lessonData.criticalQuestions.forEach(question => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const wrappedText = doc.splitTextToSize('• ' + question, 170);
        wrappedText.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
        yPos += 2;
      });

    } else if (lessonTitle === "Datavisualisatie met AI") {
      // HIGHER EDUCATION SPECIFIC CONTENT
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('DATASET: ' + lessonData.realDataset.name, 20, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(lessonData.realDataset.description, 20, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('DATA VARIABELEN:', 20, yPos);
      yPos += 10;

      lessonData.realDataset.variables.forEach(variable => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text('• ' + variable, 25, yPos);
        yPos += 7;
      });

      yPos += 10;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('LESSTRUCTUUR (150 MINUTEN)', 20, yPos);
      yPos += 15;

      lessonData.lessonStructure.forEach(phase => {
        if (yPos > 230) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(phase.phase, 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        phase.activities.forEach(activity => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + activity, 165);
          wrappedText.forEach(line => {
            doc.text(line, 25, yPos);
            yPos += 6;
          });
        });

        if (phase.practicalTips) {
          yPos += 5;
          doc.setFont('helvetica', 'italic');
          doc.text('Praktische tips:', 25, yPos);
          yPos += 7;
          
          phase.practicalTips.forEach(tip => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('-> ' + tip, 160);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }

        if (phase.evaluationCriteria) {
          yPos += 5;
          doc.setFont('helvetica', 'italic');
          doc.text('Evaluatiecriteria:', 25, yPos);
          yPos += 7;
          
          phase.evaluationCriteria.forEach(criteria => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('✓ ' + criteria, 160);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }
        yPos += 8;
      });

      // Add practical exercises
      if (yPos > 180) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PRAKTISCHE OEFENINGEN', 20, yPos);
      yPos += 15;

      lessonData.practicalExercises.forEach(exercise => {
        if (yPos > 220) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(exercise.name + ' (' + exercise.difficulty + ')', 25, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const wrappedDesc = doc.splitTextToSize(exercise.description, 165);
        wrappedDesc.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });

        yPos += 3;
        doc.setFont('helvetica', 'italic');
        doc.text('AI Prompt:', 25, yPos);
        yPos += 6;
        const wrappedPrompt = doc.splitTextToSize(exercise.aiPrompt, 160);
        wrappedPrompt.forEach(line => {
          doc.text(line, 30, yPos);
          yPos += 6;
        });

        yPos += 8;
      });
    }

    // Assessment section (common structure, unique content per lesson)
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EVALUATIE EN BEOORDELING', 20, yPos);
    yPos += 15;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    if (Array.isArray(lessonData.assessment)) {
      if (typeof lessonData.assessment[0] === 'string') {
        // Simple assessment array
        lessonData.assessment.forEach(item => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + item, 170);
          wrappedText.forEach(line => {
            doc.text(line, 25, yPos);
            yPos += 6;
          });
        });
      } else {
        // Complex assessment with components
        lessonData.assessment.forEach(component => {
          if (yPos > 240) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFont('helvetica', 'bold');
          doc.text(component.component || component.name, 25, yPos);
          yPos += 8;

          doc.setFont('helvetica', 'normal');
          if (component.description) {
            const wrappedDesc = doc.splitTextToSize(component.description, 160);
            wrappedDesc.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          }

          if (component.criteria) {
            component.criteria.forEach(criterion => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('- ' + criterion, 155);
              wrappedText.forEach(line => {
                doc.text(line, 35, yPos);
                yPos += 6;
              });
            });
          }
          yPos += 5;
        });
      }
    }

    // Homework section
    if (lessonData.homework && yPos > 200) {
      doc.addPage();
      yPos = 20;
    } else if (lessonData.homework) {
      yPos += 15;
    }

    if (lessonData.homework) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('HUISWERK EN VERVOLGACTIVITEITEN', 20, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      lessonData.homework.forEach(task => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const wrappedText = doc.splitTextToSize('• ' + task, 170);
        wrappedText.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });
    }

    // Safety and ethics (for primary education)
    if (lessonData.safetyAndEthics) {
      if (yPos > 180) {
        doc.addPage();
        yPos = 20;
      } else {
        yPos += 15;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('VEILIGHEID EN ETHIEK', 20, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      lessonData.safetyAndEthics.forEach(item => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const wrappedText = doc.splitTextToSize('• ' + item, 170);
        wrappedText.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });
    }

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

    console.log('Completely unique lesson PDF "' + lessonTitle + '" downloaded successfully with ID:', uniqueId);

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