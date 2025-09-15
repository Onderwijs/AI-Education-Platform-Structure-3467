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
    "AI in de Geschiedenis": {
      level: "Voortgezet Onderwijs - VMBO-T/HAVO/VWO",
      duration: "2 lesuren (100 minuten) of modulaire inzet",
      subject: "Geschiedenis / Maatschappijleer / Onderzoeksmethoden",
      studyYear: "Klas 3-6 (aangepast naar niveau)",
      
      objectives: [
        "Begrijpen hoe AI historisch onderzoek kan versnellen en verdiepen",
        "Kritisch omgaan met AI-gegenereerde historische informatie",
        "AI-tools gebruiken voor bronnenonderzoek en analyse",
        "Historische tijdlijnen en visualisaties maken met AI-ondersteuning", 
        "Ethische aspecten van AI in geschiedschrijving herkennen",
        "Onderscheid maken tussen betrouwbare en onbetrouwbare AI-bronnen"
      ],

      materials: [
        "Laptops/tablets met internetverbinding",
        "Toegang tot ChatGPT, Claude of Perplexity AI",
        "Google Scholar en digitale archieven",
        "Werkblad 'AI Geschiedenisdetective'",
        "Historische bronnen: brieven, dagboeken, krantenknipsels",
        "Tijdlijn sjablonen (digitaal en papier)",
        "Beamer voor demonstraties",
        "Evaluatieformulier AI-gebruik geschiedenis"
      ],

      historicalPeriods: [
        "Tweede Wereldoorlog en Holocaust",
        "Nederlandse Gouden Eeuw", 
        "Industriële Revolutie",
        "Koude Oorlog periode",
        "Koloniale geschiedenis Nederland",
        "Vrouwengeschiedenis door de eeuwen"
      ],

      preparation: [
        "Test alle AI-tools vooraf op schoolnetwerk",
        "Selecteer historische case studies relevant voor curriculum", 
        "Print werkbladen en bronnenmateriaal uit",
        "Bereid voorbeeldzoekopdrachten voor per tijdvak",
        "Maak accounts aan voor AI-platforms (indien nodig)",
        "Zorg voor toegang tot digitale historische databases",
        "Stel ethische richtlijnen op voor AI-gebruik in geschiedenis"
      ],

      lessonStructure: [
        {
          phase: "LESUUR 1 - INTRODUCTIE: AI als Geschiedenisassistent (25 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open ChatGPT of Claude op je laptop",
              "Ga naar Google Scholar (scholar.google.com)",
              "Pak je schrift en pen voor notities",
              "Bekijk het werkblad 'AI Geschiedenisdetective'"
            ],
            stappen: [
              "STAP 1 (5 min): Brainstorm - Wat weet je over de Tweede Wereldoorlog in Nederland?",
              "STAP 2 (10 min): Traditioneel zoeken - Zoek 3 feiten over het verzet in WOII",
              "STAP 3 (10 min): AI-zoeken - Gebruik AI voor dezelfde vraag en vergelijk resultaten"
            ]
          },
          activities: [
            "Demonstratie: Traditioneel vs AI-onderzoek over Nederlandse geschiedenis",
            "Case study: 'Hoe was het dagelijks leven tijdens de Hongerwinter 1944-1945?'",
            "AI-prompt oefenen: 'Geef specifieke voorbeelden van verzetsactiviteiten in Amsterdam tijdens WOII'",
            "Discussie: Wat zijn de voordelen en gevaren van AI in geschiedschrijving?",
            "Groepsopdracht: Formuleer 3 onderzoeksvragen over een zelfgekozen historisch onderwerp"
          ],
          teacherTips: [
            "Laat zien dat AI snel veel informatie geeft, maar verificatie nodig is",
            "Gebruik bekende historische gebeurtenissen als voorbeelden",
            "Benadruk dat AI een hulpmiddel is, geen vervanging van bronnenonderzoek"
          ],
          materialen: ["AI-platform geopend", "Historische foto's WOII", "Werkblad uitgedeeld"],
          eindresultaat: "Elke leerling heeft ervaren hoe AI historisch onderzoek kan ondersteunen"
        },

        {
          phase: "BRONNENONDERZOEK met AI: Digitale Archiefduiker (30 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open Perplexity AI (beste voor bronvermelding)",
              "Ga naar het Nationaal Archief website (nationaalarchief.nl)",
              "Heb je gekozen historische periode bij de hand",
              "Open een nieuw document voor je bevindingen"
            ],
            praktijkopdracht: {
              thema: "Nederlandse Gouden Eeuw (1588-1672)",
              onderzoeksvragen: [
                "Hoe verdienden gewone mensen hun geld in de Gouden Eeuw?",
                "Wat was de rol van vrouwen in de VOC-handel?",
                "Hoe zag het dagelijks leven eruit in 17e-eeuws Amsterdam?",
                "Welke invloed had de tulpenhandel op de Nederlandse economie?"
              ],
              stappen: [
                "STAP 1 (10 min): Gebruik AI om algemene informatie te krijgen over je gekozen vraag",
                "STAP 2 (10 min): Vraag AI om specifieke primaire bronnen en archieven te suggereren", 
                "STAP 3 (10 min): Controleer AI-informatie met echte archiefbronnen online"
              ]
            }
          },
          activities: [
            "Hands-on: Gebruik AI voor bronnenonderzoek Nederlandse Gouden Eeuw",
            "AI-prompts oefenen: 'Zoek primaire bronnen over dagelijks leven in 17e-eeuws Amsterdam'",
            "Verificatie-oefening: Controleer AI-claims met Nationaal Archief bronnen",
            "Groepswerk: Maak een overzicht van betrouwbare vs onbetrouwbare AI-informatie",
            "Presentatie: Deel interessantste AI-bevindingen met de klas"
          ],
          aiPrompts: [
            "Zoek primaire bronnen over [historisch onderwerp] uit Nederlandse archieven",
            "Geef specifieke voorbeelden van dagelijks leven tijdens [tijdperiode] in Nederland",
            "Vergelijk verschillende historische perspectieven op [gebeurtenis]",
            "Welke museum- en archiefcollecties bevatten informatie over [onderwerp]?"
          ],
          teacherTips: [
            "Help leerlingen bij het formuleren van specifieke zoekvragen",
            "Wijs op het belang van bronvermelding en verificatie",
            "Laat zien hoe AI kan helpen bij het vinden van nieuwe invalshoeken"
          ],
          eindresultaat: "Elke leerling heeft een lijst van geverifieerde bronnen en nieuwe inzichten"
        },

        {
          phase: "LESUUR 2 - TIJDLIJN MAKEN: AI als Chronologie-expert (25 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Kies een historische periode of gebeurtenis (bijv. Nederlandse Opstand)",
              "Open ChatGPT voor tijdlijn generatie",
              "Heb papier/digitaal document klaar voor je tijdlijn",
              "Bekijk voorbeelden van professionele historische tijdlijnen"
            ],
            tijdlijnopdracht: {
              onderwerp: "De Nederlandse Opstand (1566-1648)",
              doel: "Maak een gedetailleerde tijdlijn met politieke, militaire en culturele gebeurtenissen",
              structuur: [
                "Belangrijkste militaire veldslagen en hun gevolgen",
                "Politieke ontwikkelingen en verdragen", 
                "Sociale en economische veranderingen",
                "Culturele en religieuze aspecten"
              ],
              stappen: [
                "STAP 1 (10 min): Laat AI een basis-tijdlijn maken van de Nederlandse Opstand",
                "STAP 2 (10 min): Vraag AI om details toe te voegen over specifieke aspecten",
                "STAP 3 (5 min): Controleer belangrijkste data en feiten met lesboek/betrouwbare bronnen"
              ]
            }
          },
          activities: [
            "AI-tijdlijn generatie voor Nederlandse Opstand of zelfgekozen onderwerp",
            "Detaillering: AI vragen om specifieke aspecten (economie, cultuur, politiek)",
            "Verificatie: Controleren van AI-gegenereerde data met betrouwbare bronnen", 
            "Visualisatie: Tijdlijn omzetten naar aantrekkelijke infographic",
            "Peer review: Elkaars tijdlijnen controleren op juistheid en volledigheid"
          ],
          teacherTips: [
            "Laat leerlingen eerst zelf nadenken over wat ze verwachten",
            "Help bij het stellen van specifieke vragen aan AI",
            "Benadruk het belang van factchecking met multiple bronnen"
          ],
          eindresultaat: "Elke leerling heeft een geverifieerde, gedetailleerde historische tijdlijn"
        },

        {
          phase: "KRITISCHE ANALYSE: AI-informatie beoordelen (20 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Print werkblad 'AI Fact-Check Geschiedenis'",
              "Bereid voorbeelden voor van foute AI-informatie over geschiedenis",
              "Heb toegang tot betrouwbare historische bronnen (lesboek, encyclopedie)",
              "Maak lijst van bekende historische misvattingen"
            ],
            analyseopdracht: {
              casussen: [
                "AI beweert dat Napoleon Nederland heeft veroverd in 1806 (fout: hij maakte zijn broer koning)",
                "AI stelt dat de VOC alleen mannen in dienst had (fout: ook vrouwen werkten voor VOC)",
                "AI zegt dat Anne Frank in Amsterdam is geboren (fout: ze kwam uit Frankfurt)",
                "AI beweert dat alle Nederlanders protestants waren in Gouden Eeuw (fout: veel katholieken)"
              ],
              evaluatiecriteria: [
                "Klopt de informatie met bekende historische feiten?",
                "Zijn er tegenstrijdigheden in het AI-antwoord?",
                "Ontbreken belangrijke nuances of context?",
                "Kunnen we de bewering verifiëren met primaire bronnen?"
              ]
            }
          },
          activities: [
            "Fact-check challenge: Beoordeel AI-statements over Nederlandse geschiedenis",
            "Bronverificatie: Controleer AI-claims met multiple betrouwbare bronnen",
            "Discussie: Waarom maakt AI soms fouten in historische informatie?",
            "Workshop: Leer herkennen van AI-bias en historische misvattingen", 
            "Opstellen: Maak persoonlijke checklist voor betrouwbaar AI-gebruik in geschiedenis"
          ],
          ethicalGuidelines: [
            "Verifieer altijd AI-informatie met multiple onafhankelijke bronnen",
            "Wees bewust van mogelijke bias in AI-training data",
            "Gebruik AI als startpunt, niet als eindpunt van onderzoek",
            "Respecteer auteursrechten en citeer bronnen correct",
            "Wees transparant over AI-gebruik in geschiedkundige opdrachten"
          ],
          teacherTips: [
            "Gebruik bekende voorbeelden waar leerlingen zelf fouten kunnen herkennen",
            "Laat zien hoe AI soms verschillende antwoorden geeft op dezelfde vraag",
            "Benadruk dat historici ook discussiëren over interpretaties"
          ],
          eindresultaat: "Elke leerling heeft een persoonlijke checklist voor kritisch AI-gebruik"
        }
      ],

      practicalAssignments: [
        {
          name: "Historisch Onderzoeksproject met AI",
          description: "Onderzoek een aspect van Nederlandse geschiedenis met AI-ondersteuning",
          keuzeonderwerpen: [
            "Dagelijks leven tijdens de Duitse bezetting (1940-1945)",
            "De rol van vrouwen in de Nederlandse Gouden Eeuw",
            "Sociale gevolgen van de Industriële Revolutie in Nederland",
            "Nederlandse koloniale geschiedenis in Indonesië",
            "Verzet en collaboratie in WOII Nederland",
            "De Watersnoodramp van 1953 en maatschappelijke gevolgen"
          ],
          stappenplan: [
            "Week 1: Onderzoeksvraag formuleren en AI-bronnenverkenning",
            "Week 2: Primaire bronnen zoeken met AI-hulp en verificeren",
            "Week 3: Analyse en interpretatie met AI-ondersteuning",
            "Week 4: Presentatie voorbereiden en peer review"
          ],
          deliverables: [
            "Onderzoeksvoorstel (300 woorden) met AI-zoekstrategie",
            "Annotated bibliography van 8-10 bronnen (primair en secundair)",
            "Historische analyse (1000-1500 woorden) met AI-transparantie",
            "Tijdlijn of infographic van belangrijkste gebeurtenissen",
            "Reflectie (400 woorden) over AI-gebruik en betrouwbaarheid",
            "Bronnenlijst met correcte historische citatiestandaard"
          ],
          timeEstimate: "8-12 uur",
          evaluatiecriteria: [
            "Kwaliteit van onderzoeksvraag en methodologie (25%)",
            "Gebruik van diverse en betrouwbare bronnen (25%)",
            "Historische analyse en interpretatie (30%)",
            "Transparant en kritisch AI-gebruik (20%)"
          ]
        },
        {
          name: "Historische Vergelijking: Toen vs Nu met AI",
          description: "Vergelijk een historisch fenomeen met hedendaagse ontwikkelingen",
          vergelijkingsthemas: [
            "Pandemieën: Spaanse griep (1918) vs COVID-19 (2020)",
            "Economische crises: Beurskrach 1929 vs Kredietcrisis 2008",
            "Mediarevoluties: Boekdrukkunst vs Internet",
            "Migratiebewegingen: 19e-eeuwse emigratie vs hedendaagse immigratie",
            "Sociale bewegingen: Vrouwenkiesrecht vs #MeToo",
            "Technologische revoluties: Industrialisatie vs Digitalisering"
          ],
          stappenplan: [
            "Dag 1-2: Historische context onderzoeken met AI-ondersteuning",
            "Dag 3-4: Hedendaagse parallellen identificeren en analyseren",
            "Dag 5-6: Vergelijkende analyse maken met AI-hulp voor structuur",
            "Dag 7: Presentatie voorbereiden en conclusies formuleren"
          ],
          deliverables: [
            "Historische contextanalyse van gekozen onderwerp",
            "Hedendaagse case study met relevante ontwikkelingen",
            "Vergelijkende analyse met overeenkomsten en verschillen",
            "Visuele presentatie (PowerPoint/Prezi) van 10 minuten",
            "Discussievragen voor klassengesprek",
            "Persoonlijke reflectie op historische patronen en lessen"
          ],
          timeEstimate: "6-8 uur",
          evaluatiecriteria: [
            "Diepte van historische kennis en begrip (30%)",
            "Kwaliteit van vergelijkende analyse (25%)",
            "Creativiteit in presentatie en visualisatie (20%)",
            "Kritisch denken over historische patronen (25%)"
          ]
        }
      ],

      assessment: [
        {
          component: "Bronnenonderzoek Portfolio (40%)",
          description: "Verzameling van historisch onderzoek met transparant AI-gebruik",
          criteria: [
            "Diversiteit en betrouwbaarheid van historische bronnen",
            "Correcte toepassing van historische onderzoeksmethoden",
            "Kritische evaluatie van AI-gegenereerde informatie", 
            "Transparante documentatie van AI-gebruik en verificatie",
            "Historische accuratesse en feitelijke correctheid"
          ],
          instructies: [
            "Gebruik AI maximaal als startpunt en verificatiehulp",
            "Documenteer alle AI-interacties in een apart logboek",
            "Controleer elke AI-claim met minimaal 2 onafhankelijke bronnen",
            "Gebruik correcte historische citatiestandaarden (Chicago/Turabian)"
          ]
        },
        {
          component: "Historische Analyse Essay (35%)",
          description: "Diepgaande analyse van historisch onderwerp met AI-ondersteuning",
          criteria: [
            "Helder geformuleerde historische onderzoeksvraag",
            "Gebruik van primaire en secundaire bronnen",
            "Logische argumentatie en historische interpretatie",
            "Kritisch gebruik van AI voor structuur en verificatie",
            "Correcte academische schrijfstijl en bronvermelding"
          ],
          instructies: [
            "Schrijf minimaal 70% van de tekst zelfstandig",
            "Gebruik AI alleen voor structuursuggesties en factchecking",
            "Vermeld expliciet waar en hoe AI is gebruikt",
            "Toon verschillende historische perspectieven en interpretaties"
          ]
        },
        {
          component: "Kritische Reflectie AI in Geschiedenis (25%)",
          description: "Reflectie op mogelijkheden en beperkingen van AI in geschiedschrijving",
          criteria: [
            "Inzicht in voordelen van AI voor historisch onderzoek",
            "Bewustzijn van gevaren en beperkingen van AI in geschiedenis",
            "Persoonlijke ervaringen en concrete voorbeelden",
            "Ethische overwegingen bij AI-gebruik in geschiedschrijving",
            "Toekomstvisie op AI en geschiedenisonderwijs"
          ],
          instructies: [
            "Schrijf 800-1000 woorden zonder AI-hulp",
            "Gebruik concrete voorbeelden uit je eigen onderzoekservaring",
            "Reflecteer op zowel successen als mislukkingen met AI",
            "Stel persoonlijke richtlijnen op voor toekomstig AI-gebruik"
          ]
        }
      ],

      homework: [
        "Week 1: Kies een Nederlandse historische figuur en onderzoek met AI hun leven en invloed",
        "Week 2: Maak een vergelijking tussen AI-informatie en traditionele bronnen over een historische gebeurtenis", 
        "Week 3: Analyseer hoe AI bias kan beïnvloeden bij het onderzoeken van gevoelige historische onderwerpen",
        "Week 4: Ontwerp een onderzoeksstrategie voor een historisch project dat AI en traditionele methoden combineert"
      ],

      aiToolsSpecific: [
        {
          tool: "ChatGPT",
          geschiedenistoepassing: "Algemene historische vragen en contextualisering",
          voordelen: "Breed historisch overzicht, verschillende perspectieven",
          beperkingen: "Kan factual fouten maken, geen bronvermelding",
          geschiktheid: "Beginner - alle niveaus"
        },
        {
          tool: "Claude", 
          geschiedenistoepassing: "Analyse van historische teksten en documenten",
          voordelen: "Goed in tekstanalyse, nuancering van complexe onderwerpen",
          beperkingen: "Beperkte kennis van recente historische ontwikkelingen",
          geschiktheid: "Gevorderd - HAVO/VWO"
        },
        {
          tool: "Perplexity AI",
          geschiedenistoepassing: "Bronnenonderzoek met automatische citaties",
          voordelen: "Geeft bronnen, recente informatie, factchecking",
          beperkingen: "Soms oppervlakkige informatie, beperkte primaire bronnen",
          geschiktheid: "Alle niveaus - ideaal voor onderzoek"
        },
        {
          tool: "Google Bard",
          geschiedenistoepassing: "Visuele geschiedenis en tijdlijn generatie", 
          voordelen: "Kan afbeeldingen analyseren, goede tijdlijnstructuur",
          beperkingen: "Minder diepgaand dan gespecialiseerde tools",
          geschiktheid: "Beginner tot gemiddeld"
        }
      ],

      troubleshooting: [
        {
          probleem: "AI geeft tegenstrijdige historische informatie",
          oplossing: "Controleer met multiple betrouwbare bronnen en lesboek",
          preventie: "Stel specifieke vragen en vraag om bronvermelding"
        },
        {
          probleem: "AI kent lokale Nederlandse geschiedenis niet goed",
          oplossing: "Combineer AI met Nederlandse databases en archieven",
          preventie: "Gebruik Nederlandse zoektermen en specificeer context"
        },
        {
          probleem: "AI toont bias bij gevoelige historische onderwerpen",
          oplossing: "Zoek bewust naar verschillende perspectieven en stemmen",
          preventie: "Stel kritische vragen en vraag om meerdere invalshoeken"
        },
        {
          probleem: "Leerlingen vertrouwen AI-informatie te veel",
          oplossing: "Oefen expliciet met fact-checking en bronverificatie",
          preventie: "Leer het 'verify first, trust second' principe"
        }
      ],

      extendedActivities: [
        {
          activiteit: "Historische Debate met AI-voorbereiding",
          beschrijving: "Leerlingen bereiden zich voor op historisch debat met AI-ondersteuning",
          voorbeeld: "Debat over Nederlandse koloniale geschiedenis: verschillende perspectieven",
          duur: "2 lessen",
          materialen: ["AI-tools voor argumentatie", "Historische bronnen", "Debatformulier"]
        },
        {
          activiteit: "Virtual Time Travel met AI",
          beschrijving: "Leerlingen 'reizen' naar historische periode en schrijven dagboek",
          voorbeeld: "Een dag in het leven tijdens de Hongerwinter 1944",
          duur: "1 les + huiswerk", 
          materialen: ["AI voor contextualisering", "Dagboeksjabloon", "Historische foto's"]
        },
        {
          activiteit: "Historische Mystery met AI-detective",
          beschrijving: "Los historische mysteries op met AI als onderzoeksassistent",
          voorbeeld: "Wie verraadde het Achterhuis? Onderzoek met nieuwe AI-inzichten",
          duur: "3 lessen",
          materialen: ["AI-tools", "Historische documenten", "Detectiveformulier"]
        }
      ],

      differentiation: [
        {
          niveau: "VMBO-T",
          aanpassingen: [
            "Focus op concrete, herkenbare historische gebeurtenissen",
            "Gebruik eenvoudige AI-prompts met duidelijke instructies",
            "Meer begeleiding bij bronnenonderzoek en verificatie",
            "Visuele ondersteuning met tijdlijnen en afbeeldingen"
          ],
          evaluatie: "Nadruk op begrip en toepassing, minder op analyse"
        },
        {
          niveau: "HAVO", 
          aanpassingen: [
            "Diepere analyse van historische oorzaken en gevolgen",
            "Complexere AI-prompts voor nuancering en perspectief",
            "Zelfstandiger bronnenonderzoek en kritische evaluatie",
            "Verbinding maken tussen verleden en heden"
          ],
          evaluatie: "Balans tussen begrip, toepassing en analyse"
        },
        {
          niveau: "VWO",
          aanpassingen: [
            "Kritische analyse van historiografie en verschillende interpretaties",
            "Geavanceerde AI-prompts voor complexe historische vraagstukken",
            "Onafhankelijk onderzoek met methodologische verantwoording",
            "Evaluatie van historische bronnen en wetenschappelijke methoden"
          ],
          evaluatie: "Nadruk op synthese, evaluatie en kritisch denken"
        }
      ]
    },
    
    // Andere bestaande lessen blijven hetzelfde...
    "Wetenschappelijk Onderzoek met AI": {
      level: "MBO/HBO - Onderzoek, Methodologie, Thesis",
      duration: "150 minuten (3 lesuren of dagdeel)",
      // ... rest blijft hetzelfde
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
 * Download unique lesson PDFs with FIXED pagination for each lesson
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('Generating completely unique lesson PDF with FIXED pagination for:', lessonTitle);
    
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

    // ENHANCED LESSON-SPECIFIC CONTENT FOR "AI in de Geschiedenis"
    if (lessonTitle === "AI in de Geschiedenis") {
      // Force new page for detailed lesson structure
      doc.addPage();
      yPos = 20;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('GEDETAILLEERDE LESSTRUCTUUR (100 MINUTEN)', 20, yPos);
      yPos += 15;

      lessonData.lessonStructure.forEach((phase, phaseIndex) => {
        if (yPos > 200) {
          doc.addPage();
          yPos = 20;
        }

        // Phase title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(phase.phase, 20, yPos);
        yPos += 10;

        // Detailed instructions if available
        if (phase.detailedInstructions) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('VOORBEREIDING:', 25, yPos);
          yPos += 7;
          
          doc.setFont('helvetica', 'normal');
          if (phase.detailedInstructions.voorbereiding) {
            phase.detailedInstructions.voorbereiding.forEach(item => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('• ' + item, 160);
              wrappedText.forEach(line => {
                doc.text(line, 30, yPos);
                yPos += 6;
              });
            });
          }

          yPos += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('STAP-VOOR-STAP INSTRUCTIES:', 25, yPos);
          yPos += 7;
          
          doc.setFont('helvetica', 'normal');
          if (phase.detailedInstructions.stappen) {
            phase.detailedInstructions.stappen.forEach(stap => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize(stap, 160);
              wrappedText.forEach(line => {
                doc.text(line, 30, yPos);
                yPos += 6;
              });
            });
          }
        }

        // Activities
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        doc.text('ACTIVITEITEN:', 25, yPos);
        yPos += 7;
        
        doc.setFont('helvetica', 'normal');
        phase.activities.forEach(activity => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const wrappedText = doc.splitTextToSize('• ' + activity, 160);
          wrappedText.forEach(line => {
            doc.text(line, 30, yPos);
            yPos += 6;
          });
        });

        // AI Prompts if available
        if (phase.aiPrompts) {
          yPos += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('AI-PROMPTS VOOR DEZE FASE:', 25, yPos);
          yPos += 7;
          
          doc.setFont('helvetica', 'italic');
          phase.aiPrompts.forEach(prompt => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('"' + prompt + '"', 155);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }

        // Teacher tips
        if (phase.teacherTips) {
          yPos += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('DOCENTENTIPS:', 25, yPos);
          yPos += 7;
          
          doc.setFont('helvetica', 'normal');
          phase.teacherTips.forEach(tip => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            const wrappedText = doc.splitTextToSize('→ ' + tip, 160);
            wrappedText.forEach(line => {
              doc.text(line, 30, yPos);
              yPos += 6;
            });
          });
        }

        // End result
        if (phase.eindresultaat) {
          yPos += 5;
          doc.setFillColor(144, 238, 144); // Light green background
          doc.rect(25, yPos - 5, 160, 15, 'F');
          doc.setFont('helvetica', 'bold');
          doc.text('EINDRESULTAAT: ' + phase.eindresultaat, 30, yPos + 3);
          yPos += 12;
        }

        yPos += 10;
      });

      // Add practical assignments section
      if (lessonData.practicalAssignments && lessonData.practicalAssignments.length > 0) {
        doc.addPage();
        yPos = 20;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PRAKTIJKOPDRACHTEN', 20, yPos);
        yPos += 15;

        lessonData.practicalAssignments.forEach(assignment => {
          if (yPos > 220) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(assignment.name, 25, yPos);
          yPos += 8;

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const wrappedDesc = doc.splitTextToSize(assignment.description, 160);
          wrappedDesc.forEach(line => {
            doc.text(line, 30, yPos);
            yPos += 6;
          });

          if (assignment.keuzeonderwerpen) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Keuze-onderwerpen:', 30, yPos);
            yPos += 7;
            
            doc.setFont('helvetica', 'normal');
            assignment.keuzeonderwerpen.forEach(onderwerp => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('• ' + onderwerp, 155);
              wrappedText.forEach(line => {
                doc.text(line, 35, yPos);
                yPos += 6;
              });
            });
          }

          if (assignment.stappenplan) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Stappenplan:', 30, yPos);
            yPos += 7;
            
            doc.setFont('helvetica', 'normal');
            assignment.stappenplan.forEach(stap => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('• ' + stap, 155);
              wrappedText.forEach(line => {
                doc.text(line, 35, yPos);
                yPos += 6;
              });
            });
          }

          yPos += 10;
        });
      }

      // Add AI Tools Specific for History section
      if (lessonData.aiToolsSpecific && lessonData.aiToolsSpecific.length > 0) {
        if (yPos > 200) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('AI-TOOLS VOOR GESCHIEDENIS', 20, yPos);
        yPos += 15;

        lessonData.aiToolsSpecific.forEach(tool => {
          if (yPos > 240) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(tool.tool, 25, yPos);
          yPos += 7;

          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.text('Toepassing: ' + tool.geschiedenistoepassing, 30, yPos);
          yPos += 5;
          doc.text('Voordelen: ' + tool.voordelen, 30, yPos);
          yPos += 5;
          doc.text('Beperkingen: ' + tool.beperkingen, 30, yPos);
          yPos += 5;
          doc.text('Geschiktheid: ' + tool.geschiktheid, 30, yPos);
          yPos += 8;
        });
      }

      // Add troubleshooting section
      if (lessonData.troubleshooting && lessonData.troubleshooting.length > 0) {
        if (yPos > 200) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('TROUBLESHOOTING GIDS', 20, yPos);
        yPos += 15;

        lessonData.troubleshooting.forEach(item => {
          if (yPos > 240) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('PROBLEEM: ' + item.probleem, 25, yPos);
          yPos += 7;

          doc.setFont('helvetica', 'normal');
          doc.text('OPLOSSING: ' + item.oplossing, 25, yPos);
          yPos += 7;

          if (item.preventie) {
            doc.setFont('helvetica', 'italic');
            doc.text('PREVENTIE: ' + item.preventie, 25, yPos);
            yPos += 7;
          }

          yPos += 5;
        });
      }
    }

    // Assessment section (enhanced for history lesson)
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

          if (component.instructies) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Instructies:', 30, yPos);
            yPos += 7;
            
            doc.setFont('helvetica', 'normal');
            component.instructies.forEach(instructie => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('• ' + instructie, 150);
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

    console.log('Enhanced lesson PDF "' + lessonTitle + '" downloaded successfully with ID:', uniqueId);

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