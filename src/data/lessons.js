export const lessons = [
  // ==============================================================================================
  // 1. HBO / WO / VWO - WETENSCHAPPELIJK ONDERZOEK
  // ==============================================================================================
  {
    id: "wetenschappelijk-onderzoek-ai",
    title: "Wetenschappelijk Onderzoek met AI",
    month: "december 2025",
    level: "HBO/WO",
    target: "HBO Bachelor / WO / VWO 6",
    subject: "Onderzoeksvaardigheden",
    duration: "150 minuten (3 lesuren)",
    durationMinutes: 150,
    rating: 4.9,
    downloads: 1250,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    summary: "Een gevorderde module waarin studenten leren hoe ze Generatieve AI (zoals ChatGPT, Consensus en Elicit) ethisch en methodologisch correct inzetten voor literatuuronderzoek, zonder hun kritische blik te verliezen.",
    description: "In deze module transformeren we de rol van de student van 'informatiezoeker' naar 'research director'. We behandelen het trechteren van onderzoeksvragen, het genereren van een Literature Matrix en het kritisch verifiëren van bronnen om hallucinaties te voorkomen.",
    goals: [
      "De student kan AI-tools (zoals Consensus/Perplexity) inzetten om relevante, peer-reviewed bronnen te vinden.",
      "De student kan een 'Literature Matrix' genereren om patronen en hiaten in de literatuur te identificeren.",
      "De student kan 'AI-hallucinaties' (gefingeerde bronnen) herkennen door DOI-verificatie toe te passen.",
      "De student kan in een methodologie-paragraaf transparant verantwoorden hoe AI is gebruikt in het onderzoeksproces."
    ],
    materials: [
      "Laptops met internettoegang",
      "Toegang tot AI-tools: ChatGPT (gratis/plus) en Consensus.app of Perplexity",
      "Toegang tot schoolmediatheek/databanken (voor verificatie)",
      "Format: Literature Matrix (Excel of Notion template)"
    ],
    lessonPhases: [
      {
        title: "Fase 1: De AI-Onderzoeksvraag",
        time: "30 min",
        description: "Van interesse naar onderzoekbare vraag. Studenten gebruiken AI als sparringpartner om hun onderwerp af te bakenen.",
        teacherActions: "Demonstreer live hoe je een brede vraag (bijv. 'iets met duurzaamheid') via prompts kunt trechteren naar een specifieke hoofdvraag. Bespreek de criteria van een goede onderzoeksvraag.",
        studentActivities: "Studenten voeren een dialoog met de AI om hun onderzoeksvraag SMART te maken. Ze pitchen de aangescherpte vraag aan hun buurman/vrouw."
      },
      {
        title: "Fase 2: Bronnenjacht & Hallucinatie-Check",
        time: "60 min",
        description: "Het verschil tussen 'AI Search' en academische databases. Focus op validatie.",
        teacherActions: "Leg het risico van hallucinaties uit (AI die titels verzint). Introduceer tools die gelinkt zijn aan echte databases (zoals Consensus).",
        studentActivities: "Studenten zoeken 5-10 bronnen via AI. Cruciale stap: Ze moeten van elke bron de DOI (Digital Object Identifier) verifiëren in een echte database. Bron niet gevonden? Dan wordt deze gemarkeerd als hallucinatie."
      },
      {
        title: "Fase 3: Synthese & Matrix",
        time: "45 min",
        description: "Informatie verwerken tot inzichten. Niet kopiëren, maar synthetiseren.",
        teacherActions: "Leg de Literature Matrix uit (Auteurs verticaal, Concepten horizontaal). Toon hoe je AI kunt vragen om samenvattingen te maken per concept.",
        studentActivities: "Studenten vullen de matrix, deels met AI-hulp voor samenvattingen, maar schrijven zelf de overkoepelende conclusie (synthesis) in hun eigen woorden."
      },
      {
        title: "Fase 4: Verantwoording",
        time: "15 min",
        description: "Ethisch kader en transparantie.",
        teacherActions: "Bespreek het plagiaatbeleid van de instelling. Hoe citeer je AI?",
        studentActivities: "Studenten schrijven een concept-paragraaf voor hun methodologiehoofdstuk: 'Gebruik van Generatieve AI', waarin ze hun werkwijze en verificatiestappen toelichten."
      }
    ],
    differentiation: [
      "Advanced: Laat studenten met Python (via ChatGPT Code Interpreter) hun data visualiseren.",
      "Scaffolding: Bied een kant-en-klare 'Prompt Library' aan voor studenten die moeite hebben met het formuleren van goede instructies.",
      "Groepswerk: Laat studenten elkaars AI-gevonden bronnen 'auditen' op echtheid."
    ],
    assessment: [
      "Product: De ingevulde Literature Matrix met minimaal 5 geverifieerde bronnen.",
      "Proces: De reflectieparagraaf over AI-gebruik in het methodologiehoofdstuk.",
      "Check: Steekproefsgewijze controle op hallucinaties in de bronnenlijst."
    ],
    reflectionQuestions: [
      "Op welk moment in het proces merkte je dat de AI de mist in ging?",
      "Hoe verandert jouw rol als onderzoeker als de AI het zoekwerk doet?",
      "Zou je een onderzoek vertrouwen dat volledig door AI is geschreven? Waarom wel/niet?",
      "Welke menselijke vaardigheden blijven onmisbaar bij literatuuronderzoek?"
    ]
  },

  // ==============================================================================================
  // 2. PO - INTRODUCTIE AI (Wat is AI?)
  // ==============================================================================================
  {
    id: "wat-is-ai-po",
    title: "Wat is Kunstmatige Intelligentie?",
    month: "oktober 2025",
    level: "PO",
    target: "Groep 6-8",
    subject: "Digitale Geletterdheid / Techniek",
    duration: "60 minuten",
    durationMinutes: 60,
    rating: 4.8,
    downloads: 850,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
    summary: "Een basisles waarin leerlingen op een speelse manier ontdekken dat computers niet 'slim' zijn zoals mensen, maar leren door heel veel voorbeelden te bekijken (patroonherkenning).",
    description: "Leerlingen ontdekken wat AI wel en niet is. We gebruiken de analogie van een 'slimme papegaai' of een huisdier dat je kunstjes leert. De les bevat een unplugged activiteit (sorteren) en een digitale demo.",
    goals: [
      "De leerling kan in eigen woorden uitleggen dat AI leert van voorbeelden (data).",
      "De leerling kan drie voorbeelden noemen van apparaten die 'slim' lijken.",
      "De leerling begrijpt dat een computer alleen doet wat hem is geleerd (geen eigen wil)."
    ],
    materials: [
      "Digibord",
      "Werkblad 'Slim of Niet Slim?' (afbeeldingen van broodrooster, robot, rekenmachine, hond)",
      "YouTube video: 'Wat is AI?' (bijv. van Schooltv of Klokhuis)"
    ],
    lessonPhases: [
      {
        title: "Intro: De Robotquiz",
        time: "10 min",
        description: "Voorkennis activeren.",
        teacherActions: "Toon plaatjes op het bord (wasmachine, smartphone, zelfrijdende auto). Vraag: 'Wie of wat is hier slim?'",
        studentActivities: "Leerlingen steken handen op en discussiëren. Is een rekenmachine slim? Waarom wel/niet?"
      },
      {
        title: "Kern 1: Hoe leert een computer?",
        time: "15 min",
        description: "Analogie uitleg.",
        teacherActions: "Leg uit: Een computer is als een puppy. Je moet hem 1000 keer een bal laten zien voordat hij snapt wat een bal is.",
        studentActivities: "Luisteren en voorbeelden bedenken van dingen die zij hebben moeten leren door veel te oefenen (fietsen, lezen)."
      },
      {
        title: "Kern 2: Quick, Draw!",
        time: "25 min",
        description: "Actieve werkvorm met Google's Quick, Draw!",
        teacherActions: "Open de website 'Quick, Draw!'. Laat zien hoe de computer probeert te raden wat je tekent.",
        studentActivities: "Leerlingen spelen (in duo's op tablets of klassikaal op digibord) het spel. Ze ervaren dat de AI patronen herkent in hun tekeningen."
      },
      {
        title: "Afsluiting: De slimme papegaai",
        time: "10 min",
        description: "Reflectie.",
        teacherActions: "Conclusie: De computer raadt het, omdat hij miljoenen tekeningen heeft gezien. Niet omdat hij weet wat een 'fiets' echt is.",
        studentActivities: "Invullen van een korte exit-ticket: Eén ding dat ik heb geleerd over computers."
      }
    ],
    differentiation: [
      "Onderbouw/Middenbouw: Focus puur op het spel en de verwondering.",
      "Bovenbouw/Plusklas: Discussie over 'fouten'. Waarom raadde de computer het niet? (Bias/onduidelijke data).",
      "Taalzwak: Gebruik meer pictogrammen bij de uitleg."
    ],
    assessment: [
      "Observatie: Doen leerlingen actief mee met het raden?",
      "Product: Werkblad waarop ze apparaten inkleuren die AI gebruiken.",
      "Mondeling: Vraag aan het eind: 'Hoe leert een AI-robot wat een kat is?' (Antwoord moet richting 'voorbeelden' of 'plaatjes' gaan)."
    ],
    reflectionQuestions: [
      "Kan een computer verliefd worden?",
      "Als jij een tekening maakt die niemand snapt, kan de computer het dan wel raden?",
      "Vind je het fijn dat de computer met je meedenkt, of een beetje gek?"
    ]
  },

  // ==============================================================================================
  // 3. PO - AI IN ONS DAGELIJKS LEVEN
  // ==============================================================================================
  {
    id: "ai-dagelijks-leven-po",
    title: "AI in Ons Dagelijks Leven",
    month: "november 2025",
    level: "PO",
    target: "Groep 6-8",
    subject: "Mediawijsheid / Burgerschap",
    duration: "45 minuten",
    durationMinutes: 45,
    rating: 4.7,
    downloads: 720,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    summary: "Leerlingen worden zich bewust van de onzichtbare AI om hen heen (YouTube aanbevelingen, filters, Siri) en leren dat deze systemen bedoeld zijn om hun aandacht vast te houden.",
    description: "AI is niet alleen robots in films; het zit in onze broekzak. In deze les gaan leerlingen op 'AI Safari' in hun eigen belevingswereld. We bespreken aanbevelingsalgoritmen (Netflix/TikTok) en spraakassistenten.",
    goals: [
      "De leerling herkent AI in dagelijkse apps (YouTube, TikTok, Games).",
      "De leerling begrijpt waarom apps 'aanbevelingen' doen (om je langer te laten kijken).",
      "De leerling kan kritisch nadenken over of een aanbeveling echt leuk is, of alleen maar verslavend."
    ],
    materials: [
      "Werkblad 'Mijn Digitale Dag'",
      "Stickers of stiften",
      "Digibord met afbeeldingen van bekende apps (Netflix, YouTube, Snapchat)"
    ],
    lessonPhases: [
      {
        title: "Start: De AI Safari",
        time: "10 min",
        description: "Brainstorm.",
        teacherActions: "Vraag: 'Wie heeft er vandaag al een computer of app gebruikt?'",
        studentActivities: "Leerlingen noemen voorbeelden. Docent vraagt door: 'Wist die app wat jij leuk vond?'"
      },
      {
        title: "Kern: Het YouTube-raadsel",
        time: "20 min",
        description: "Uitleg algoritmes.",
        teacherActions: "Leg uit: 'Het Algoritme'. Als jij kattenfilmpjes kijkt, geeft de app er nòg 10. Waarom? (Reclame/geld).",
        studentActivities: "Opdracht in duo's: Bedenk wat het algoritme jou zou aanraden als je gisteren de hele dag naar voetbal hebt gekeken."
      },
      {
        title: "Verwerking: Ontwerp je eigen app",
        time: "10 min",
        description: "Creatieve opdracht.",
        teacherActions: "Daag uit: Bedenk een app die NIET probeert je verslaafd te maken.",
        studentActivities: "Leerlingen tekenen/schrijven een idee voor een 'Eerlijke App'."
      },
      {
        title: "Afsluiting",
        time: "5 min",
        description: "Korte kringgesprek.",
        teacherActions: "Samenvatten: Jij bent de baas, niet het algoritme.",
        studentActivities: "Hand opsteken: Wie gaat er vandaag opletten of YouTube een trucje uithaalt?"
      }
    ],
    differentiation: [
      "Visueel ingesteld: Laat leerlingen logo's van apps tekenen waar AI in zit.",
      "Verdieping: Laat leerlingen hun eigen YouTube-homepage vergelijken met die van een ander (thuisopdracht). Waarom zijn ze anders?"
    ],
    assessment: [
      "Gesprek: Kan de leerling uitleggen waarom Netflix een bepaalde film aanraadt?",
      "Product: Het ingevulde werkblad 'Mijn Digitale Dag'."
    ],
    reflectionQuestions: [
      "Vind je het handig dat TikTok weet wat je leuk vindt, of irritant?",
      "Is Siri een echt mens? Waarom klinkt ze wel zo?",
      "Wat zou er gebeuren als de computer denkt dat jij alleen maar van zielige filmpjes houdt?"
    ]
  },

  // ==============================================================================================
  // 4. PO - VRIENDELIJKE ROBOTS (ETHIEK)
  // ==============================================================================================
  {
    id: "vriendelijke-robots-po",
    title: "Vriendelijke Robots: Ethiek voor Kids",
    month: "december 2025",
    level: "PO",
    target: "Groep 4-6",
    subject: "Sociaal-Emotioneel / Techniek",
    duration: "50 minuten",
    durationMinutes: 50,
    rating: 4.6,
    downloads: 600,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
    summary: "Een creatieve les waarin leerlingen nadenken over wat robots wel en niet mogen doen. Ze ontwerpen een 'Hulp-Robot' en stellen regels op (bijv. 'Een robot mag nooit pesten').",
    description: "Kinderen hebben vaak een magisch beeld van robots. In deze les koppelen we techniek aan gedragsregels. Wat als een robot jouw kamer moet opruimen, maar per ongeluk je favoriete tekening weggooit? We introduceren simpele ethische regels (zoals de wetten van Asimov, maar dan voor kinderen).",
    goals: [
      "De leerling kan een taak bedenken die een robot goed zou kunnen overnemen.",
      "De leerling kan één regel bedenken waaraan een robot zich moet houden (veiligheid/aardig zijn).",
      "De leerling kan uitleggen dat een robot geen gevoelens heeft, ook al lijkt dat zo."
    ],
    materials: [
      "Tekenpapier (A3)",
      "Kleurpotloden/stiften",
      "Plaatjes van verschillende robots (Wall-E, stofzuigerrobot, robotarm in fabriek)"
    ],
    lessonPhases: [
      {
        title: "Start: Robot Emoties?",
        time: "10 min",
        description: "Filosofisch gesprek.",
        teacherActions: "Toon een plaatje van een zielige robot (bijv. Wall-E). Vraag: 'Heeft hij verdriet?'",
        studentActivities: "Gesprek. Conclusie: Wij projecteren gevoelens op de robot, maar het is metaal en code."
      },
      {
        title: "Kern: De Hulp-Robot Ontwerpen",
        time: "25 min",
        description: "Ontwerpopdracht.",
        teacherActions: "Opdracht: Ontwerp een robot die een klusje in huis doet. Maar... hij mag niks kapot maken!",
        studentActivities: "Leerlingen tekenen hun robot. Ze schrijven erbij: 1. Wat doet hij? 2. Wat is de belangrijkste regel voor de robot?"
      },
      {
        title: "Presentatie: De Robot-Regels",
        time: "15 min",
        description: "Delen en bespreken.",
        teacherActions: "Laat een paar leerlingen vertellen. Vraag bijv: 'Wat als de robot de kat wil aaien, maar hij is te sterk?'",
        studentActivities: "Presenteren en meedenken over elkaars regels."
      }
    ],
    differentiation: [
      "Motorisch: Gebruik bouwblokken (Lego/Duplo) in plaats van tekenen.",
      "Uitdaging: Laat leerlingen een 'noodstop-knop' tekenen en uitleggen wanneer je die moet indrukken."
    ],
    assessment: [
      "Product: De robot-tekening met ten minste één geschreven regel.",
      "Inzicht: Kan de leerling benoemen dat de robot geprogrammeerd moet worden om veilig te zijn?"
    ],
    reflectionQuestions: [
      "Zou jij een robot als beste vriend willen?",
      "Mag een robot straf krijgen als hij iets fout doet?",
      "Wie is er de schuldige als de robot een glas omstoot: de robot of de maker?"
    ]
  },

  // ==============================================================================================
  // 5. VO - AI IN DE GESCHIEDENIS
  // ==============================================================================================
  {
    id: "ai-geschiedenis-vo",
    title: "Historisch Onderzoek 2.0: Feit of Fictie?",
    month: "november 2025",
    level: "VO",
    target: "Klas 2-4 HAVO/VWO",
    subject: "Geschiedenis",
    duration: "50 minuten",
    durationMinutes: 50,
    rating: 4.7,
    downloads: 890,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    summary: "Leerlingen 'interviewen' een historisch figuur via AI en controleren de antwoorden aan de hand van primaire bronnen en het schoolboek om anachronismen en hallucinaties te betrappen.",
    description: "Generatieve AI kan geweldige rollenspellen spelen, maar maakt ook historische fouten (anachronismen). In deze les simuleren leerlingen een gesprek met bijvoorbeeld Napoleon, Cleopatra of Willem van Oranje. Ze moeten de AI betrappen op onwaarheden door fysieke bronnen te raadplegen.",
    goals: [
      "De leerling kan een effectieve 'persona prompt' schrijven om een historische simulatie te starten.",
      "De leerling kan kritisch analyseren of de AI-output historisch accuraat is (fact-checking).",
      "De leerling herkent anachronismen (zaken die niet in de tijd passen) in de gegenereerde tekst.",
      "De leerling kan primaire/secundaire bronnen gebruiken om AI-claims te verifiëren."
    ],
    materials: [
      "Laptops/Tablets met toegang tot ChatGPT/Claude/Gemini",
      "Geschiedenisboek of goedgekeurde bronnenbank",
      "Werkblad 'De Factchecker'"
    ],
    lessonPhases: [
      {
        title: "Start: Wie ben ik?",
        time: "10 min",
        description: "Introductie Persona.",
        teacherActions: "Laat een AI-chat zien op het bord met een mysterieus figuur (zonder de naam te noemen). De klas raadt wie het is o.b.v. antwoorden.",
        studentActivities: "Observeren, analyseren van taalgebruik en historische hints."
      },
      {
        title: "Kern 1: Het Interview",
        time: "20 min",
        description: "Chat-opdracht.",
        teacherActions: "Geef de prompt-structuur: 'Jij bent [NAAM], de datum is [JAARTAL]. Ik interview je over [GEBEURTENIS]. Weet alleen wat je toen kon weten.'",
        studentActivities: "Leerlingen kiezen een figuur uit het huidige hoofdstuk. Ze stellen 5 dieptevragen. Ze proberen de AI te 'tricksen' (bijv. vragen naar een telefoon of auto)."
      },
      {
        title: "Kern 2: De Factcheck",
        time: "15 min",
        description: "Verificatie met boek.",
        teacherActions: "Opdracht: Leg het schoolboek ernaast. Klopt de datum? Klopt de redenatie?",
        studentActivities: "Leerlingen markeren in de chat-tekst: Groen = Feit (gevonden in boek), Rood = Fout/Hallucinatie, Geel = Twijfel."
      },
      {
        title: "Afsluiting",
        time: "5 min",
        description: "Klassikale oogst.",
        teacherActions: "Vraag naar de gekste AI-fouten.",
        studentActivities: "Delen van anachronismen (bijv. 'Napoleon had het over pizza')."
      }
    ],
    differentiation: [
      "VWO/Gymnasium: Laat de leerlingen vragen naar de *motivatie* van de historische figuur en dit vergelijken met verschillende historische interpretaties (standplaatsgebondenheid).",
      "VMBO/Onderbouw: Geef een vaste lijst met figuren en kant-en-klare startvragen."
    ],
    assessment: [
      "Product: Het werkblad waarop 1 feit is bevestigd en 1 potentiële fout is aangewezen.",
      "Inzicht: Kan de leerling uitleggen waarom AI soms dingen verzint (het is een taalmodel, geen encyclopedie)?"
    ],
    reflectionQuestions: [
      "Vond je het antwoord van de AI geloofwaardig klinken?",
      "Wat is het gevaar als we geschiedenis leren van een AI zonder te checken?",
      "Hoe zou dit figuur *echt* gepraat hebben (taalgebruik)?"
    ]
  },

  // ==============================================================================================
  // 6. VO - AI ETHICS DEBAT
  // ==============================================================================================
  {
    id: "ai-ethics-debat",
    title: "Het Grote AI Ethiek Debat",
    month: "december 2025",
    level: "VO",
    target: "Bovenbouw HAVO/VWO",
    subject: "Maatschappijleer / Filosofie / Burgerschap",
    duration: "100 minuten (2 lesuren)",
    durationMinutes: 100,
    rating: 4.6,
    downloads: 1100,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=300&h=200&fit=crop",
    summary: "Een Lagerhuis-debat waarin leerlingen AI gebruiken om argumenten te verzamelen, maar zelf het debat voeren. Ze ervaren hoe AI nuance kan missen of juist nieuwe perspectieven biedt.",
    description: "Leerlingen bereiden zich voor met behulp van AI (om argumenten vóór en tegen te genereren over stellingen als 'AI-kunst is diefstal' of 'Robots mogen rechters vervangen') en gaan daarna 'offline' het debat aan. Het doel is om nuance te vinden en eigen oordeelsvorming te trainen.",
    goals: [
      "De leerling kan ethische dilemma's rondom AI (privacy, bias, autonomie) benoemen.",
      "De leerling kan AI inzetten als research-tool om snel diverse perspectieven te verzamelen.",
      "De leerling kan een eigen, onderbouwde mening formuleren en verdedigen, los van de AI-output.",
      "De leerling kan reflecteren op de kwaliteit van AI-argumenten (zijn ze logisch? zijn ze menselijk?)."
    ],
    materials: [
      "Stellingenlijst (bijv. 'AI moet verboden worden bij eindexamens')",
      "Laptops voor voorbereiding",
      "Debat-opstelling in de klas (tafels aan de kant)"
    ],
    lessonPhases: [
      {
        title: "Prep: AI als Sparringpartner",
        time: "30 min",
        description: "Argumenten verzamelen.",
        teacherActions: "Verdeel de klas in VOOR en TEGEN groepen per stelling. Geef instructie: 'Vraag ChatGPT om 5 sterke argumenten voor jouw kant, én 3 tegenargumenten om te weerleggen'.",
        studentActivities: "Prompts schrijven, argumenten selecteren en vertalen naar eigen spreektaal."
      },
      {
        title: "Human Touch: Het 'Killer Argument'",
        time: "15 min",
        description: "Eigen inbreng.",
        teacherActions: "Opdracht: Bedenk nu ZELF één emotioneel of persoonlijk argument dat de AI niet heeft genoemd.",
        studentActivities: "Brainstormen in groepjes. Wat raakt mensen echt?"
      },
      {
        title: "Action: Het Debat",
        time: "40 min",
        description: "Debatteren zonder schermen.",
        teacherActions: "Leid het debat (Lagerhuis of Amerikaans parlementair). Let op drogredenen.",
        studentActivities: "Debatteren. Luisteren naar de tegenpartij. Reageren."
      },
      {
        title: "Evaluatie",
        time: "15 min",
        description: "AI vs Mens.",
        teacherActions: "Nabespreking: Welke argumenten werkten het best? Die van de AI of de eigen verzonnen argumenten?",
        studentActivities: "Klassikale reflectie."
      }
    ],
    differentiation: [
      "Introverte leerlingen: Laat ze de rol van 'AI-factchecker' of 'Notulist' aannemen tijdens het debat.",
      "Sterke sprekers: Geef ze de opdracht om een openingspleidooi te houden zonder spiekbriefje."
    ],
    assessment: [
      "Observatie: Deelname aan het debat (kwaliteit van argumentatie).",
      "Product: Een ingevuld voorbereidingsformulier met AI-argumenten + eigen toevoeging."
    ],
    reflectionQuestions: [
      "Wanneer vind jij het acceptabel dat AI beslissingen neemt over mensen, en wanneer niet?",
      "Was de AI beter in logische feiten of in gevoelsargumenten?",
      "Wie is verantwoordelijk als een AI-tool een racistisch argument geeft?"
    ]
  },

  // ==============================================================================================
  // 7. VO - AI VOOR TAALONDERWIJS
  // ==============================================================================================
  {
    id: "ai-taalonderwijs-vo",
    title: "Jouw Persoonlijke Franse Tutor",
    month: "januari 2025",
    level: "VO",
    target: "Klas 2-4 (MVT)",
    subject: "Engels / Frans / Duits / Spaans",
    duration: "75 minuten",
    durationMinutes: 75,
    rating: 4.7,
    downloads: 920,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
    summary: "Leerlingen gebruiken de 'Voice Mode' of chat-functie van AI om spreek- en schrijfvaardigheid te oefenen in een veilige omgeving, met directe feedback op grammatica en woordenschat.",
    description: "Spreekangst is een groot probleem bij Moderne Vreemde Talen. AI oordeelt niet. In deze les simuleren leerlingen een situatie (bijv. in een restaurant of bij de dokter) met een AI-bot die de rol van local speelt. De AI geeft na afloop feedback op fouten.",
    goals: [
      "De leerling kan een gesprek voeren in de doeltaal over een alledaags onderwerp.",
      "De leerling durft vrijer te oefenen omdat de gesprekspartner een machine is (verlaging drempel).",
      "De leerling kan feedback van de AI (op grammatica/vocabulaire) begrijpen en toepassen in een tweede poging."
    ],
    materials: [
      "Telefoons met ChatGPT app (Voice mode) of laptops met microfoon/headset",
      "Scenario-kaarten (bijv. 'Je bestelt een pizza', 'Je bent je tas kwijt')",
      "Woordenboek (fysiek of digitaal)"
    ],
    lessonPhases: [
      {
        title: "Instructie: De Prompt",
        time: "15 min",
        description: "Setting the scene.",
        teacherActions: "Leg uit hoe je de AI instrueert: 'Wil je met mij in het Frans oefenen? Jij bent de ober, ik ben de klant. Verbeter me pas áchteraf.'",
        studentActivities: "Leerlingen installeren zich in duo's of individueel (in stilteruimte of met koptelefoon)."
      },
      {
        title: "Oefening: Het Gesprek",
        time: "30 min",
        description: "Roleplay.",
        teacherActions: "Rondlopen en helpen bij technische issues of drempelvrees.",
        studentActivities: "Leerlingen voeren het gesprek (mondeling of schriftelijk). Ze proberen het gesprek 5 minuten gaande te houden."
      },
      {
        title: "Analyse: De Feedback",
        time: "15 min",
        description: "Leren van fouten.",
        teacherActions: "Laat leerlingen vragen: 'Welke 3 fouten maakte ik? En hoe zeg ik het beter?'",
        studentActivities: "Leerlingen noteren hun fouten en de verbetering in hun schrift."
      },
      {
        title: "Herkansing",
        time: "15 min",
        description: "Toepassen.",
        teacherActions: "Opdracht: Doe het gesprek opnieuw, maar nu foutloos.",
        studentActivities: "Tweede ronde roleplay."
      }
    ],
    differentiation: [
      "Niveau-aanpassing: Laat de AI het niveau aanpassen ('Praat tegen mij alsof ik A2 niveau heb').",
      "Ondersteuning: Geef leerlingen een spiekbriefje met standaardzinnen."
    ],
    assessment: [
      "Formatief: De notities van de leerling met de feedback van de AI.",
      "Vaardigheid: Durft de leerling te spreken/typen?"
    ],
    reflectionQuestions: [
      "Vond je het makkelijker om tegen een computer te praten dan tegen een klasgenoot? Waarom?",
      "Heeft de AI je goed begrepen?",
      "Wat leer je wel van een docent en niet van de AI?"
    ]
  },

  // ==============================================================================================
  // 8. MBO / HBO - DATAVISUALISATIE
  // ==============================================================================================
  {
    id: "datavisualisatie-ai",
    title: "Datavisualisatie met AI",
    month: "december 2025",
    level: "MBO/HBO",
    target: "MBO 4 / HBO Propedeuse",
    subject: "Wiskunde / Data-analyse / Economie",
    duration: "90 minuten",
    durationMinutes: 90,
    rating: 4.8,
    downloads: 650,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    summary: "Studenten leren hoe ze ruwe datasets kunnen uploaden in AI-tools (zoals ChatGPT Data Analyst) om snel inzichten te krijgen, en leren kritisch kijken naar de gegenereerde grafieken.",
    description: "Data is het nieuwe goud, maar ruwe Excel-sheets zijn saai. In deze les leren studenten hoe ze met één druk op de knop (en een goede prompt) data kunnen visualiseren. Maar let op: is de schaalverdeling wel eerlijk? Kiest de AI de juiste grafiekvorm?",
    goals: [
      "De student kan een dataset (CSV/Excel) opschonen en uploaden in een AI-analysetool.",
      "De student kan gerichte prompts schrijven om specifieke visualisaties te genereren (bijv. scatterplot, bar chart).",
      "De student kan kritisch beoordelen of een grafiek een eerlijk beeld geeft van de data (misleiding herkennen).",
      "De student kan uitleggen welke grafiekvorm past bij welk type data."
    ],
    materials: [
      "Dataset (bijv. CBS cijfers, verkoopcijfers fictief bedrijf)",
      "Toegang tot ChatGPT Plus (Data Analyst) of Julius.ai (of Excel met Copilot)",
      "Checklist 'Eerlijke Grafieken'"
    ],
    lessonPhases: [
      {
        title: "Intro: Data Storytelling",
        time: "15 min",
        description: "Waarom visualiseren?",
        teacherActions: "Toon een saaie tabel en een flitsende grafiek van dezelfde data. Welke overtuigt?",
        studentActivities: "Analyseren van voorbeelden."
      },
      {
        title: "Instructie: Upload & Prompt",
        time: "20 min",
        description: "Hands-on demo.",
        teacherActions: "Demonstreer hoe je een file uploadt en vraagt: 'Geef me 3 interessante inzichten en visualiseer deze'.",
        studentActivities: "Meekijken en notities maken over de prompts."
      },
      {
        title: "Uitvoering: De Analyst",
        time: "40 min",
        description: "Zelf aan de slag.",
        teacherActions: "Deel de dataset. Opdracht: Maak een dashboard voor de directie met 3 grafieken.",
        studentActivities: "Studenten werken met de AI. Ze moeten de AI corrigeren ('Pas de kleur aan', 'Zet de jaartallen op de x-as')."
      },
      {
        title: "Presentatie & Kritiek",
        time: "15 min",
        description: "Peer review.",
        teacherActions: "Laat studenten elkaars grafieken beoordelen. Is de as-indeling correct?",
        studentActivities: "Feedback geven."
      }
    ],
    differentiation: [
      "HBO: Vraag om statistische significantie te berekenen via de AI.",
      "MBO: Focus op heldere, leesbare grafieken en presentatie."
    ],
    assessment: [
      "Product: Een one-pager (PDF) met 3 grafieken en korte toelichting.",
      "Reflectie: Verantwoording van de gekozen grafiektypes."
    ],
    reflectionQuestions: [
      "Was het makkelijker dan zelf doen in Excel?",
      "Heb je de data gecontroleerd voordat je de grafiek geloofde?",
      "Hoe kan je met een grafiek liegen?"
    ]
  },

  // ==============================================================================================
  // 9. MBO / HBO - PROGRAMMEREN MET COPILOT
  // ==============================================================================================
  {
    id: "programmeren-ai-copilot",
    title: "Pair Programming met een AI",
    month: "januari 2025",
    level: "MBO/HBO",
    target: "MBO Niveau 4 / HBO ICT",
    subject: "Informatica / Software Development",
    duration: "120 minuten",
    durationMinutes: 120,
    rating: 4.9,
    downloads: 750,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop",
    summary: "Studenten leren de rol van 'Senior Developer' aan te nemen terwijl AI (Copilot/ChatGPT) de 'Junior' is. Focus op code review, security en debugging.",
    description: "Programmeren verandert. Het gaat minder om syntax typen en meer om architectuur en controle. In deze les bouwen studenten een eenvoudige webpagina of script, maar... ze mogen zelf bijna niet typen. Ze moeten de AI aansturen. Werkt de code? Is hij veilig? Is hij efficiënt?",
    goals: [
      "De student kan code genereren met natuurlijke taal (prompts).",
      "De student kan AI-gegenereerde code lezen, begrijpen en uitleggen (niet blind copy-pasten).",
      "De student herkent beveiligingsrisico's (zoals SQL injection) in gegenereerde code.",
      "De student begrijpt de rolverandering van 'schrijver' naar 'reviewer'."
    ],
    materials: [
      "Code editor (VS Code)",
      "Toegang tot GitHub Copilot of ChatGPT",
      "Opdrachtomschrijving (bijv. 'Maak een login-formulier')"
    ],
    lessonPhases: [
      {
        title: "Intro: De Junior Developer",
        time: "15 min",
        description: "De nieuwe werkwijze.",
        teacherActions: "Leg uit: AI is je stagiair. Hij werkt snel, maar maakt fouten en let niet op veiligheid.",
        studentActivities: "Discussie: Wat zijn de risico's van copy-paste code?"
      },
      {
        title: "Opdracht 1: The Bug Hunt",
        time: "30 min",
        description: "Debuggen met AI.",
        teacherActions: "Geef een stuk code met een logische fout (geen syntax fout).",
        studentActivities: "Vraag de AI om de fout te vinden. Klopt de uitleg? Repareer het."
      },
      {
        title: "Opdracht 2: Build it",
        time: "60 min",
        description: "Genereren en verfijnen.",
        teacherActions: "Opdracht: Bouw een 'To-Do list app' in HTML/JS.",
        studentActivities: "Studenten prompten de structuur. Ze moeten de code regel voor regel commentariëren (laten uitleggen door AI) om te bewijzen dat ze het snappen."
      },
      {
        title: "Code Review",
        time: "15 min",
        description: "Kwaliteitscontrole.",
        teacherActions: "Bekijk klassikaal één oplossing. Is de code DRY (Don't Repeat Yourself)?",
        studentActivities: "Peer review bij de buurman."
      }
    ],
    differentiation: [
      "Expert: Vraag om de code te refactoren naar een ander framework (bijv. van Vanilla JS naar React).",
      "Starter: Focus op het begrijpen van de HTML/CSS structuur die eruit rolt."
    ],
    assessment: [
      "Product: Werkende applicatie.",
      "Mondeling: De docent wijst een willekeurige regel code aan en de student moet uitleggen wat die doet (anti-fraude check)."
    ],
    reflectionQuestions: [
      "Heb je sneller gewerkt met AI of had je het sneller zelf kunnen typen?",
      "Wat doe je als de AI code geeft die je niet begrijpt?",
      "Ben jij nog wel de programmeur als de AI alles schrijft?"
    ]
  },

  // ==============================================================================================
  // OVERIGE LESSEN (Kortere summaries voor archief)
  // ==============================================================================================
  {
    id: "ai-kunstproject-po",
    title: "AI Kunst: De Nieuwe Rembrandt?",
    month: "december 2025",
    level: "PO",
    subject: "Tekenen / CKV",
    duration: "60 min",
    durationMinutes: 60,
    rating: 4.5,
    downloads: 800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop",
    summary: "Creatieve kunstwerken maken met prompts. Wat is 'stijl'?",
    description: "Leerlingen leren beschrijvende woorden (adjectieven) gebruiken om beelden te genereren.",
    goals: ["Creativiteit stimuleren", "Leren prompten"],
    lessonPhases: [],
    materials: ["Tablets", "Bing Image Creator"]
  }
];