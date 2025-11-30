export const lessons = [
  // ----------------------------------------------------------------------
  // UITGELICHT: MBO/HBO - WETENSCHAPPELIJK ONDERZOEK
  // ----------------------------------------------------------------------
  {
    id: "wetenschappelijk-onderzoek-ai",
    title: "Wetenschappelijk Onderzoek met AI",
    month: "december 2025",
    level: "MBO/HBO",
    target: "HBO Bachelor / MBO Niveau 4",
    subject: "Onderzoeksvaardigheden",
    duration: "150 minuten (3 lesuren)",
    rating: 4.9,
    downloads: 1250,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    summary: "Studenten leren AI-tools ethisch inzetten voor literatuuronderzoek en data-analyse, waarbij de focus ligt op verificatie en methodologische verantwoording.",
    description: "In deze module leren studenten hoe ze AI (zoals ChatGPT, Consensus, en Elicit) kunnen gebruiken als onderzoeksassistent zonder hun eigen kritische denkvermogen uit te schakelen. We behandelen de 'Literature Matrix' methode met AI en het detecteren van hallucinaties in bronvermeldingen.",
    objectives: [
      "De student kan AI-tools (Consensus/Perplexity) gebruiken om relevante wetenschappelijke bronnen te vinden.",
      "De student kan een 'Literature Matrix' genereren en verifiëren op basis van gevonden papers.",
      "De student herkent 'AI-hallucinaties' (verzonnen bronnen) en weet hoe deze te fact-checken.",
      "De student kan in het methodologie-hoofdstuk correct verantwoorden hoe AI is gebruikt."
    ],
    materials: [
      "Toegang tot internet & ChatGPT/Perplexity",
      "Format: Literature Matrix (Excel/Notion)",
      "Checklist: 'AI Hallucinatie Detective'",
      "Voorbeeld onderzoeksvragen"
    ],
    lessonPhases: [
      {
        title: "Fase 1: De AI-Onderzoeksvraag (30 min)",
        description: "Studenten leren hoe ze een vage interesse omzetten naar een scherpe onderzoeksvraag m.b.v. AI.",
        teacherActions: "Demonstreer hoe je met een LLM kunt sparren om een hoofdvraag af te bakenen (trechteren).",
        studentActivities: "Studenten voeren een dialoog met AI om hun onderzoeksvraag SMART te maken en pitchen deze aan hun buurman."
      },
      {
        title: "Fase 2: Bronnenjacht & Verificatie (60 min)",
        description: "Het verschil tussen 'Google Scholar' en 'AI Search'.",
        teacherActions: "Leg het risico van verzonnen bronnen uit. Introduceer tools die gelinkt zijn aan echte databases (zoals Consensus.app).",
        studentActivities: "Studenten zoeken 5 bronnen. Ze moeten van elke bron de DOI (Digital Object Identifier) verifiëren. Als de AI een bron verzint, moeten ze dit documenteren."
      },
      {
        title: "Fase 3: Synthese & Matrix (45 min)",
        description: "Informatie verwerken tot inzichten.",
        teacherActions: "Uitleg over de synthese-matrix: auteurs horizontaal, thema's verticaal.",
        studentActivities: "Laat AI de abstracten van de gevonden papers samenvatten op specifieke thema's. Studenten vullen de matrix en schrijven zelf de conclusie."
      },
      {
        title: "Fase 4: Verantwoording (15 min)",
        description: "Ethisch kader en plagiaat.",
        teacherActions: "Bespreken van de schoolregels omtrent AI.",
        studentActivities: "Studenten schrijven een paragraaf voor hun methodologie: 'Gebruik van Generatieve AI'."
      }
    ],
    differentiation: [
      "Expert-studenten: Laat ze een Python-script (via ChatGPT) schrijven om data te visualiseren.",
      "Startende studenten: Bied een kant-en-klare prompt-template aan voor het samenvatten van teksten."
    ],
    assessment: [
      "Formatief: De ingevulde Literature Matrix met geverifieerde bronnen.",
      "Summatief: De verantwoording in het methodologie-hoofdstuk."
    ]
  },

  // ----------------------------------------------------------------------
  // PO - BOVENBOUW
  // ----------------------------------------------------------------------
  {
    id: "introductie-ai-po",
    title: "De Robot-Detective: Hoe leert een computer?",
    month: "oktober 2025",
    level: "PO",
    target: "Groep 6-8",
    subject: "Digitale Geletterdheid / Techniek",
    duration: "60 minuten",
    rating: 4.8,
    downloads: 850,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
    summary: "Een speelse, unplugged én digitale les waarin leerlingen ontdekken dat AI leert van voorbeelden (data) en dat die voorbeelden soms niet kloppen (bias).",
    description: "Leerlingen worden 'Data Detectives'. Ze beginnen met een sorteerspel in de klas om te begrijpen hoe een algoritme werkt. Daarna trainen ze hun eigen 'machine' met Google's Teachable Machine om het verschil te zien tussen bijvoorbeeld een banaan en een appel, of blije en boze gezichten.",
    objectives: [
      "De leerling kan in eigen woorden uitleggen dat een computer leert van voorbeelden (training data).",
      "De leerling ervaart hoe een computer in de war raakt als de voorbeelden onduidelijk zijn.",
      "De leerling maakt kennis met het begrip 'algoritme' als een stappenplan."
    ],
    materials: [
      "Digibord",
      "Chromebooks/Tablets (1 per 2 lln)",
      "Website: Teachable Machine",
      "Werkblad 'Mijn Eerste Algoritme'"
    ],
    lessonPhases: [
      {
        title: "Intro: De Sorteer-Robot (15 min)",
        description: "Unplugged activiteit.",
        teacherActions: "Jij bent de robot. Laat leerlingen regels verzinnen om jou objecten te laten sorteren (bijv. rood vs blauw).",
        studentActivities: "Leerlingen geven instructies. Ze merken dat als ze niet specifiek zijn, de robot fouten maakt."
      },
      {
        title: "Kern: Teachable Machine (30 min)",
        description: "Zelf een AI trainen.",
        teacherActions: "Demonstreer Teachable Machine. Train een model op 'Hand omhoog' vs 'Hand omlaag'.",
        studentActivities: "Leerlingen werken in duo's. Ze trainen de webcam om twee objecten of gezichtsuitdrukkingen te onderscheiden."
      },
      {
        title: "Afsluiting: Wat ging er mis? (15 min)",
        description: "Reflectie op Bias.",
        teacherActions: "Vraag wie er een foutje had in de herkenning. Hoe kwam dat?",
        studentActivities: "Discussiëren: 'Als we de computer alleen maar plaatjes van rode appels laten zien, herkent hij dan een groene appel?'"
      }
    ],
    differentiation: [
      "Snelle leerlingen: Laat ze een derde categorie toevoegen (bijv. 'Hand zijwaarts').",
      "Ondersteuning: Werk met vaste voorwerpen (pen vs potlood) in plaats van bewegingen."
    ]
  },

  // ----------------------------------------------------------------------
  // VO - ONDERBOUW/BOVENBOUW
  // ----------------------------------------------------------------------
  {
    id: "ai-geschiedenis-vo",
    title: "Historisch Onderzoek 2.0: Feit of Fictie?",
    month: "november 2025",
    level: "VO",
    target: "Klas 2-4 HAVO/VWO",
    subject: "Geschiedenis / Mens & Maatschappij",
    duration: "50 minuten",
    rating: 4.7,
    downloads: 890,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    summary: "Leerlingen 'interviewen' een historisch figuur via AI en controleren de antwoorden aan de hand van primaire bronnen en het schoolboek.",
    description: "Generatieve AI kan geweldige rollenspellen spelen, maar maakt ook historische fouten (anachronismen). In deze les simuleren leerlingen een gesprek met bijvoorbeeld Napoleon of Cleopatra. Ze moeten de AI betrappen op onwaarheden door fysieke bronnen te raadplegen.",
    objectives: [
      "De leerling kan een effectieve prompt schrijven om een persona aan te nemen.",
      "De leerling kan kritisch analyseren of de AI-output historisch accuraat is.",
      "De leerling begrijpt het begrip 'hallucinatie' in de context van LLMs."
    ],
    materials: [
      "Laptops",
      "Geschiedenisboek / Bronnenboek",
      "ChatGPT / Claude account (docent of lln)"
    ],
    lessonPhases: [
      {
        title: "Start: Wie ben ik? (10 min)",
        description: "Introductie Persona.",
        teacherActions: "Laat een AI-chat zien met een mysterieus historisch figuur. De klas raadt wie het is.",
        studentActivities: "Observeren en raden."
      },
      {
        title: "Kern: Het Interview (25 min)",
        description: "De Chat-opdracht.",
        teacherActions: "Geef de prompt-structuur: 'Jij bent [NAAM], de datum is [JAARTAL]. Ik ga je interviewen over [GEBEURTENIS].'",
        studentActivities: "Leerlingen voeren het gesprek. Ze proberen de AI iets te laten zeggen wat nog niet bestond (bijv. over een telefoon of auto)."
      },
      {
        title: "Check: De Factchecker (15 min)",
        description: "Verificatie.",
        teacherActions: "Bespreek de resultaten. Waar ging de AI de mist in?",
        studentActivities: "Leerlingen leggen één AI-uitspraak naast hun tekstboek en markeren: Waar of Onwaar."
      }
    ]
  },

  // ----------------------------------------------------------------------
  // VO - BOVENBOUW
  // ----------------------------------------------------------------------
  {
    id: "ai-ethics-debat",
    title: "Het Grote AI Ethiek Debat",
    month: "december 2025",
    level: "VO",
    target: "Bovenbouw HAVO/VWO",
    subject: "Maatschappijleer / Filosofie",
    duration: "100 minuten (2 lesuren)",
    rating: 4.6,
    downloads: 1100,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=300&h=200&fit=crop",
    summary: "Een Lagerhuis-debat over stellingen als 'AI moet verboden worden bij examens' en 'AI kunst is geen echte kunst'.",
    description: "Leerlingen bereiden zich voor met behulp van AI (om argumenten vóór en tegen te genereren) en gaan daarna 'offline' het debat aan. Het doel is om nuance te vinden in het zwart-wit denken over technologie.",
    objectives: [
      "De leerling kan ethische dilemma's rondom AI benoemen.",
      "De leerling kan AI gebruiken om snel diverse perspectieven te verzamelen.",
      "De leerling ontwikkelt een eigen, onderbouwde mening los van de AI-output."
    ],
    materials: ["Stellingenlijst", "Debat-opstelling in de klas"],
    lessonPhases: [
      {
        title: "Prep: AI als Sparringpartner",
        description: "Argumenten verzamelen.",
        teacherActions: "Verdeel de klassen in VOOR en TEGEN groepen.",
        studentActivities: "Gebruik ChatGPT om 5 sterke argumenten voor jouw kant te vinden. Bedenk daarna zelf 1 'killer argument' dat de AI niet noemde."
      },
      {
        title: "Action: Het Debat",
        description: "Debatteren zonder schermen.",
        teacherActions: "Leid het debat (Lagerhuis stijl).",
        studentActivities: "Debatteren op basis van de voorbereiding."
      }
    ]
  },

  // ----------------------------------------------------------------------
  // MBO - TECHNIEK / ICT
  // ----------------------------------------------------------------------
  {
    id: "programmeren-ai-copilot",
    title: "Pair Programming met een AI",
    month: "januari 2025",
    level: "MBO/HBO",
    target: "MBO Niveau 4 / HBO ICT",
    subject: "Informatica / App Development",
    duration: "120 minuten",
    rating: 4.9,
    downloads: 750,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop",
    summary: "Leerlingen bouwen een eenvoudige website of script, waarbij ze AI (Copilot/ChatGPT) gebruiken als 'junior developer' die zij moeten aansturen en corrigeren.",
    description: "De focus ligt niet op het typen van code, maar op het 'reviewen' van code. Studenten leren dat AI vaak werkende maar onveilige of inefficiënte code schrijft. Zij zijn de 'Senior Dev' die de kwaliteit moet bewaken.",
    objectives: [
      "De student kan code genereren, lezen en debuggen met AI-hulp.",
      "De student herkent beveiligingsrisico's in AI-gegenereerde code.",
      "De student begrijpt de rolverandering van 'schrijver' naar 'reviewer'."
    ],
    lessonPhases: [
      {
        title: "Opdracht: De Buggy Code",
        description: "Debuggen.",
        teacherActions: "Geef studenten een stuk code met een opzettelijke fout.",
        studentActivities: "Vraag de AI om de fout te vinden. Klopt de uitleg?"
      },
      {
        title: "Project: Bouw een Landing Page",
        description: "Genereren.",
        teacherActions: "Geef specificaties voor een HTML/CSS pagina.",
        studentActivities: "Genereer de code. Pas de styling handmatig aan zodat het uniek is."
      }
    ]
  },

  // ----------------------------------------------------------------------
  // OVERIGE LESSEN (Kortere summaries voor archief)
  // ----------------------------------------------------------------------
  {
    id: "datavisualisatie-ai",
    title: "Datavisualisatie met AI",
    month: "december 2025",
    level: "MBO/HBO",
    subject: "Wiskunde/Data",
    duration: "90 min",
    rating: 4.8,
    downloads: 650,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    summary: "Complexe datasets uploaden en visualiseren met tools als ChatGPT Data Analysis.",
    description: "Van ruwe Excel-data naar inzichten in 10 minuten."
  },
  {
    id: "ai-kunstproject-po",
    title: "AI Kunst: De Nieuwe Rembrandt?",
    month: "december 2025",
    level: "PO",
    subject: "Tekenen / CKV",
    duration: "60 min",
    rating: 4.5,
    downloads: 800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop",
    summary: "Creatieve kunstwerken maken met prompts. Wat is 'stijl'?",
    description: "Leerlingen leren beschrijvende woorden (adjectieven) gebruiken om beelden te genereren."
  },
  {
    id: "ai-taalonderwijs-vo",
    title: "Jouw Persoonlijke Franse Tutor",
    month: "januari 2025",
    level: "VO",
    subject: "Engels/Frans/Duits",
    duration: "75 min",
    rating: 4.7,
    downloads: 920,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
    summary: "Spreekvaardigheid oefenen zonder angst.",
    description: "Gebruik de 'Voice Mode' van AI-apps om gesprekken te voeren in de doeltaal."
  }
];