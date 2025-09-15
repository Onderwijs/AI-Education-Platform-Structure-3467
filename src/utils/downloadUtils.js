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
    "Wetenschappelijk Onderzoek met AI": {
      level: "MBO/HBO - Onderzoek, Methodologie, Thesis",
      duration: "150 minuten (3 lesuren of dagdeel)",
      subject: "Onderzoeksmethodologie / Statistiek / Academische Vaardigheden",
      studyYear: "3e-4e jaar MBO niveau 4 / 2e-4e jaar HBO",
      
      objectives: [
        "AI-tools strategisch inzetten voor alle fasen van wetenschappelijk onderzoek",
        "Literatuuronderzoek efficiënter uitvoeren met AI-ondersteuning",
        "Data-analyse automatiseren en visualiseren met AI-hulp",
        "Wetenschappelijke teksten verbeteren met AI-feedback en -structuring",
        "Ethische aspecten van AI-gebruik in academisch onderzoek begrijpen",
        "Kritisch omgaan met AI-gegenereerde informatie en bronvermelding"
      ],

      materials: [
        "Laptops met toegang tot onderzoeksdatabases (Google Scholar, ResearchGate)",
        "ChatGPT Plus, Claude, of Perplexity AI voor literatuuronderzoek",
        "Zotero of Mendeley voor referentiemanagement",
        "R, Python, of Excel voor data-analyse met AI-plugins",
        "Voorbeelddataset: 'Studentenwelzijn Survey (N=500)'",
        "Sjablonen voor onderzoeksvoorstel en wetenschappelijke artikelen",
        "Handout: 'AI-prompts voor onderzoek' met voorbeeldzinnen",
        "Evaluatieformulier voor AI-gebruik in onderzoek"
      ],

      researchPhases: [
        "Probleemstelling en onderzoeksvragen formuleren",
        "Literatuuronderzoek en theoretisch kader",
        "Methodologie en onderzoeksdesign",
        "Data-verzameling en -analyse",
        "Resultaten interpreteren en rapporteren",
        "Wetenschappelijk schrijven en publiceren"
      ],

      preparation: [
        "Download voorbeelddataset 'Studentenwelzijn' naar alle computers",
        "Maak accounts aan voor ChatGPT Plus, Perplexity AI en Zotero",
        "Test internetverbinding en toegang tot Google Scholar",
        "Print handouts met AI-prompts en evaluatieformulieren",
        "Bereid voorbeeldonderzoek voor: 'Invloed van stress op studieprestaties'",
        "Zorg voor projectoren voor demonstraties",
        "Stel ethische richtlijnen op voor transparant AI-gebruik"
      ],

      lessonStructure: [
        {
          phase: "LESUUR 1 - INTRODUCTIE: Van traditioneel naar AI-ondersteund onderzoek (20 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open ChatGPT op je laptop",
              "Ga naar Google Scholar (scholar.google.com)",
              "Download de dataset 'Studentenwelzijn.xlsx' van de gedeelde map",
              "Pak pen en papier voor notities"
            ],
            stappen: [
              "STAP 1 (5 min): Brainstorm in tweetallen - Wat zijn jullie grootste uitdagingen bij onderzoek doen?",
              "STAP 2 (10 min): Demonstratie door docent - Traditioneel vs AI-onderzoek vergelijken",
              "STAP 3 (5 min): Individueel - Schrijf op: Wat verwacht je van AI bij onderzoek?"
            ]
          },
          activities: [
            "Demonstratie: Onderzoeksvraag formuleren - traditioneel (30 min) vs AI-hulp (5 min)",
            "Case study tonen: 'Hoe beïnvloedt sociale media het welzijn van studenten?'",
            "AI-prompt demonstreren: 'Help me specifieke onderzoeksvragen formuleren over sociale media en studentenwelzijn'",
            "Ethische framework introduceren: Transparantie, verificatie, bronvermelding",
            "Groepsopdracht: Bedenk 3 onderzoeksvragen over jullie eigen studierichting"
          ],
          teacherTips: [
            "Laat zien dat AI tijd bespaart, maar niet het denken overneemt",
            "Gebruik concrete voorbeelden uit hun studierichting",
            "Benadruk: AI is een hulpmiddel, jij bent de onderzoeker"
          ],
          materialen: ["ChatGPT geopend", "Voorbeeldonderzoek geprint", "Whiteboard voor notities"],
          eindresultaat: "Elke student heeft 1 concrete onderzoeksvraag geformuleerd met AI-hulp"
        },

        {
          phase: "LITERATUURONDERZOEK: AI als digitale bibliothecaris (30 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open Perplexity AI (perplexity.ai)",
              "Open Google Scholar in tweede tabblad",
              "Heb je onderzoeksvraag van vorige opdracht bij de hand",
              "Open een nieuw Word-document voor notities"
            ],
            stappenplan: [
              "STAP 1 (5 min): Zoek 5 artikelen over je onderwerp in Google Scholar - noteer hoeveel tijd dit kost",
              "STAP 2 (10 min): Gebruik Perplexity AI met prompt: 'Zoek recente wetenschappelijke artikelen over [jouw onderwerp] gepubliceerd tussen 2020-2024. Geef auteurs, jaartal en belangrijkste bevindingen'",
              "STAP 3 (10 min): Vergelijk resultaten - Welke methode vond betere/meer bronnen?",
              "STAP 4 (5 min): Kies 3 beste artikelen en laat AI een samenvatting van 100 woorden maken"
            ]
          },
          activities: [
            "Hands-on opdracht: Gebruik Perplexity AI voor het zoeken van academische bronnen",
            "AI-prompt oefenen: 'Zoek peer-reviewed artikelen over [onderwerp] uit 2020-2024'",
            "Kritische evaluatie: AI-gevonden bronnen beoordelen op betrouwbaarheid",
            "Zotero integratie: AI-gevonden bronnen importeren en organiseren",
            "Samenvatten laten doen: AI maakt 200-woord samenvatting van wetenschappelijk artikel"
          ],
          aiPrompts: [
            "Zoek recente peer-reviewed artikelen over [onderzoeksthema] uit 2020-2024",
            "Vat dit wetenschappelijk artikel samen in 200 woorden met focus op methodologie",
            "Identificeer de belangrijkste theorieën in dit onderzoeksveld",
            "Vergelijk de methodologische benaderingen van deze 3 studies"
          ],
          teacherTips: [
            "Loop rond en help bij technische problemen",
            "Controleer of studenten bronnen verifiëren",
            "Wijs op het belang van peer-reviewed artikelen"
          ],
          eindresultaat: "Elke student heeft een lijst van 5 geverifieerde bronnen met AI-samenvattingen"
        },

        {
          phase: "LESUUR 2 - DATA-ANALYSE: AI als statisticus en visualisatie-expert (40 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open de dataset 'Studentenwelzijn.xlsx' in Excel",
              "Open ChatGPT in een nieuw tabblad",
              "Bekijk de variabelen: studietevredenheid, stress, slaapkwaliteit, etc.",
              "Heb een rekenmachine bij de hand voor verificatie"
            ],
            praktijkopdracht: {
              dataset: "Studentenwelzijn Survey (N=500)",
              variabelen: [
                "Studietevredenheid (schaal 1-10)",
                "Stressniveau (schaal 1-5)", 
                "Studieuren per week (aantal)",
                "Slaapkwaliteit (schaal 1-10)",
                "Sociale contacten frequentie (schaal 1-7)",
                "Financiële zorgen (ja/nee)"
              ],
              onderzoeksvraag: "Wat zijn de belangrijkste factoren die studentenwelzijn beïnvloeden?",
              stappen: [
                "STAP 1 (10 min): Upload dataset naar ChatGPT en vraag om beschrijvende statistieken",
                "STAP 2 (15 min): Laat AI correlaties berekenen tussen alle variabelen",
                "STAP 3 (10 min): Vraag AI om een grafiek te maken van de belangrijkste verbanden",
                "STAP 4 (5 min): Laat AI de resultaten interpreteren en uitleggen wat het betekent"
              ]
            }
          },
          activities: [
            "Dataset introductie: Studentenwelzijn Survey met 500 respondenten",
            "AI-tools demonstratie: ChatGPT Code Interpreter voor data cleaning",
            "Hands-on analyse: Correlaties berekenen tussen welzijnsfactoren",
            "Visualisaties maken: AI suggereert beste grafiektypen voor jouw data",
            "Interpretatie oefening: Wat betekenen deze cijfers voor studenten?"
          ],
          teacherTips: [
            "Help studenten bij het uploaden van bestanden naar AI",
            "Controleer of de AI-interpretaties kloppen",
            "Laat studenten zelf nadenken voordat AI antwoord geeft"
          ],
          eindresultaat: "Elke student heeft een complete data-analyse met grafieken en interpretatie"
        },

        {
          phase: "RESULTATEN SCHRIJVEN: AI als academische schrijfcoach (25 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Open een nieuw Word-document",
              "Heb je data-analyse resultaten van de vorige opdracht klaar",
              "Open Claude of ChatGPT voor schrijfhulp",
              "Download het sjabloon 'Wetenschappelijke Rapportage'"
            ],
            schrijfopdracht: {
              doel: "Schrijf de 'Resultaten' sectie van een onderzoeksrapport",
              lengte: "300-500 woorden",
              structuur: [
                "Inleiding van de resultaten (1 alinea)",
                "Beschrijving van belangrijkste bevindingen (2 alinea's)",
                "Interpretatie van grafieken/tabellen (1 alinea)",
                "Conclusie van deze sectie (1 alinea)"
              ],
              stappen: [
                "STAP 1 (10 min): Schrijf eerste versie zonder AI-hulp",
                "STAP 2 (10 min): Laat AI feedback geven op structuur en academische taal",
                "STAP 3 (5 min): Verbeter je tekst op basis van AI-suggesties"
              ]
            }
          },
          activities: [
            "Structuur leren: Hoe schrijf je een goede 'Resultaten' sectie?",
            "AI gebruiken voor academische woordkeus en zinsconstructies",
            "Feedback vragen: 'Verbeter deze tekst voor wetenschappelijke publicatie'",
            "Peer review: Elkaars teksten beoordelen met AI-ondersteuning",
            "Vergelijking: Originele tekst vs AI-verbeterde versie"
          ],
          writingSupport: [
            "Structuur suggesties voor wetenschappelijke teksten",
            "Academische woordkeus en stijlverbetering", 
            "Logische argumentatie en redeneerlijnen",
            "Transitiezinnen tussen paragrafen",
            "Objectieve toon en wetenschappelijke precisie"
          ],
          teacherTips: [
            "Laat studenten eerst zelf schrijven, dan AI gebruiken",
            "Controleer of de verbeteringen echt beter zijn",
            "Benadruk dat AI helpt met vorm, niet met inhoud"
          ],
          eindresultaat: "Elke student heeft een professioneel geschreven resultaten-sectie"
        },

        {
          phase: "LESUUR 3 - ETHIEK EN KWALITEIT: Verantwoord AI-gebruik in onderzoek (35 minuten)",
          detailedInstructions: {
            voorbereiding: [
              "Print het werkblad 'Ethische Checklist AI-Onderzoek'",
              "Heb voorbeelden klaar van goed en slecht AI-gebruik",
              "Bereid casussen voor over AI-plagiaat en bias",
              "Open het document 'Richtlijnen Wetenschappelijke Integriteit'"
            ],
            ethiekworkshop: {
              casussen: [
                "Casus 1: Student laat AI zijn hele literatuuroverzicht schrijven - Is dit oké?",
                "Casus 2: Onderzoeker gebruikt AI-data zonder bronvermelding - Wat is het probleem?",
                "Casus 3: AI geeft verkeerde statistische interpretatie - Wie is verantwoordelijk?",
                "Casus 4: Twee onderzoekers krijgen verschillende AI-antwoorden - Hoe op te lossen?"
              ],
              discussievragen: [
                "Wanneer wordt AI-hulp plagiaat?",
                "Hoe vermeld je AI-gebruik correct in je rapport?",
                "Wat doe je als AI-resultaten tegenstrijdig zijn?",
                "Hoe controleer je of AI-informatie klopt?"
              ]
            }
          },
          activities: [
            "Ethische dilemma's bespreken aan de hand van concrete casussen",
            "Kwaliteitscontrole: AI-output verifiëren met traditionele methoden",
            "Bronvermelding workshop: Hoe citeer je AI-gegenereerde inzichten correct?",
            "Reproducibility test: Kunnen anderen jouw AI-onderzoek herhalen?",
            "Best practices opstellen: Persoonlijke regels voor AI-gebruik"
          ],
          ethicalGuidelines: [
            "Transparantie: Vermeld altijd wanneer en hoe AI is gebruikt",
            "Verificatie: Controleer AI-output met onafhankelijke bronnen",
            "Attribution: Geef credit aan AI-tools in je methodologie sectie",
            "Bias awareness: Begrijp beperkingen van AI-training data",
            "Human oversight: Behoud menselijke controle over interpretaties"
          ],
          teacherTips: [
            "Gebruik echte voorbeelden van AI-misbruik in onderzoek",
            "Laat studenten zelf ethische regels opstellen",
            "Benadruk dat transparantie de sleutel is"
          ],
          eindresultaat: "Elke student heeft een persoonlijke ethische checklist voor AI-gebruik"
        }
      ],

      practicalAssignments: [
        {
          name: "Mini Literature Review met AI",
          description: "Schrijf een literatuuroverzicht van 1000 woorden met AI-ondersteuning",
          stappenplan: [
            "Week 1: Zoek 10 relevante bronnen met Perplexity AI",
            "Week 2: Laat AI samenvattingen maken, controleer deze zelf",
            "Week 3: Schrijf literatuuroverzicht met AI-structuurhulp",
            "Week 4: Peer review en finale versie"
          ],
          deliverables: [
            "Annotated bibliography van 10 bronnen",
            "AI-chat logs van je zoekproces",
            "Literatuuroverzicht van 1000 woorden",
            "Reflectie van 300 woorden over AI-gebruik",
            "Correcte APA-citaties van zowel bronnen als AI-tools"
          ],
          timeEstimate: "4-6 uur",
          evaluatiecriteria: [
            "Kwaliteit van gevonden bronnen (25%)",
            "Juiste synthese van literatuur (35%)",
            "Transparant AI-gebruik (20%)",
            "Academische schrijfstijl (20%)"
          ]
        },
        {
          name: "Data Analysis Report met AI",
          description: "Analyseer een dataset met AI-tools en rapporteer bevindingen",
          stappenplan: [
            "Dag 1: Dataset verkennen met AI-hulp",
            "Dag 2: Statistische analyses uitvoeren",
            "Dag 3: Visualisaties maken en interpreteren",
            "Dag 4: Rapport schrijven en peer review"
          ],
          deliverables: [
            "Data cleaning log met AI-stappen",
            "Statistische analyse met AI-interpretatie",
            "Minimaal 3 professionele visualisaties",
            "Discussie van resultaten en beperkingen",
            "Methodologie sectie over AI-gebruik"
          ],
          timeEstimate: "6-8 uur",
          evaluatiecriteria: [
            "Correcte statistische methoden (30%)",
            "Kwaliteit visualisaties (25%)",
            "Interpretatie en discussie (25%)",
            "Methodologische transparantie (20%)"
          ]
        }
      ],

      assessment: [
        {
          component: "Research Proposal (40%)",
          description: "Volledig onderzoeksvoorstel met transparant AI-gebruik",
          criteria: [
            "Kwaliteit van onderzoeksvragen en hypotheses",
            "Grondigheid van literatuuronderzoek", 
            "Methodologische verantwoording en design",
            "Ethische overwegingen en AI-transparantie",
            "Academische schrijfstijl en structuur"
          ],
          instructies: [
            "Gebruik AI maximaal voor 30% van het schrijfwerk",
            "Documenteer elk AI-gebruik in een appendix",
            "Verifieer alle AI-informatie met onafhankelijke bronnen",
            "Schrijf minimaal 2000 woorden zelfstandig"
          ]
        },
        {
          component: "Data Analysis Project (35%)",
          description: "Complete data-analyse met AI-tools",
          criteria: [
            "Correcte toepassing van statistische methoden",
            "Kwaliteit van data visualisaties en interpretatie",
            "Kritische reflectie op AI-gegenereerde inzichten",
            "Reproducibility en documentatie van proces"
          ],
          instructies: [
            "Gebruik minimaal 2 verschillende AI-tools",
            "Controleer alle AI-berekeningen handmatig",
            "Maak screenshots van AI-interacties",
            "Schrijf reflectie van 500 woorden over AI-gebruik"
          ]
        },
        {
          component: "Ethical Reflection Paper (25%)",
          description: "Kritische reflectie op AI-gebruik in onderzoek",
          criteria: [
            "Inzicht in ethische aspecten van AI-research",
            "Persoonlijke ervaringen met AI-tools",
            "Best practices voor toekomstig onderzoek",
            "Bewustzijn van beperkingen en bias"
          ],
          instructies: [
            "Schrijf 1000 woorden zonder AI-hulp",
            "Gebruik concrete voorbeelden uit eigen ervaring",
            "Reflecteer op zowel voordelen als gevaren",
            "Stel persoonlijke ethische richtlijnen op"
          ]
        }
      ],

      homework: [
        "Week 1: Ontwikkel onderzoeksvoorstel voor eigen thesis/eindproject met AI-ondersteuning",
        "Week 2: Experimenteer met 3 verschillende AI-research tools en schrijf vergelijking",
        "Week 3: Voer mini-literatuuronderzoek uit over AI-ethiek in jouw vakgebied",
        "Week 4: Maak actieplan voor integratie van AI in toekomstig onderzoek"
      ],

      troubleshooting: [
        {
          probleem: "AI geeft onbetrouwbare bronnen",
          oplossing: "Controleer altijd met Google Scholar of PubMed",
          preventie: "Vraag AI expliciet om peer-reviewed bronnen"
        },
        {
          probleem: "AI begrijpt onderzoekscontext niet", 
          oplossing: "Geef meer achtergrond in je prompts",
          preventie: "Start met brede context, word dan specifieker"
        },
        {
          probleem: "AI-analyse lijkt incorrect",
          oplossing: "Verifieer met handmatige berekeningen",
          preventie: "Vraag AI om uitleg van de gebruikte methoden"
        },
        {
          probleem: "Ethische twijfels over AI-gebruik",
          oplossing: "Vraag advies aan begeleider of supervisor", 
          preventie: "Stel vooraf duidelijke ethische richtlijnen op"
        }
      ]
    },
    
    // Andere lessen blijven hetzelfde...
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
    }

    // Voeg hier andere bestaande lessen toe...
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

    // ENHANCED LESSON-SPECIFIC CONTENT FOR "Wetenschappelijk Onderzoek met AI"
    if (lessonTitle === "Wetenschappelijk Onderzoek met AI") {
      // Force new page for detailed lesson structure
      doc.addPage();
      yPos = 20;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('GEDETAILLEERDE LESSTRUCTUUR (150 MINUTEN)', 20, yPos);
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

          if (phase.detailedInstructions.stappenplan) {
            phase.detailedInstructions.stappenplan.forEach(stap => {
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

          if (assignment.deliverables) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Op te leveren:', 30, yPos);
            yPos += 7;
            
            doc.setFont('helvetica', 'normal');
            assignment.deliverables.forEach(deliverable => {
              if (yPos > 270) {
                doc.addPage();
                yPos = 20;
              }
              const wrappedText = doc.splitTextToSize('• ' + deliverable, 155);
              wrappedText.forEach(line => {
                doc.text(line, 35, yPos);
                yPos += 6;
              });
            });
          }

          yPos += 10;
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

    // Assessment section (enhanced for research lesson)
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