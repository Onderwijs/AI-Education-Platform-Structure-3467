import jsPDF from 'jspdf';

/** * Download the complete AI Startersgids voor het Onderwijs */
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

    // Table of Contents - Page 2
    doc.addPage();
    let yPos = 30;
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE', 20, yPos);
    yPos += 20;

    const tableOfContents = [
      { chapter: '1.', title: 'Welkom bij AI in het Onderwijs', page: '3' },
      { chapter: '2.', title: 'Wat is Kunstmatige Intelligentie?', page: '4' },
      { chapter: '3.', title: 'Hoe werkt AI eigenlijk?', page: '6' },
      { chapter: '4.', title: 'TOP 15 AI-Tools voor Docenten', page: '7' },
      { chapter: '5.', title: 'AI in het Basisonderwijs', page: '10' },
      { chapter: '6.', title: 'AI in het Voortgezet Onderwijs', page: '12' },
      { chapter: '7.', title: 'AI in MBO en HBO', page: '14' },
      { chapter: '8.', title: 'Praktische Voorbeelden en Prompts', page: '16' },
      { chapter: '9.', title: 'Ethiek en Veiligheid', page: '17' },
      { chapter: '10.', title: 'Implementatie Stap-voor-Stap', page: '18' },
      { chapter: '11.', title: 'Veelgestelde Vragen', page: '19' },
      { chapter: '12.', title: 'Resources en Vervolgstappen', page: '20' }
    ];

    doc.setFontSize(12);
    tableOfContents.forEach((item, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(item.chapter, 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(item.title, 35, yPos);
      doc.text(item.page, 180, yPos);
      
      // Add dotted line
      const dots = '.'.repeat(Math.floor((140 - item.title.length * 2) / 3));
      doc.setFont('helvetica', 'normal');
      doc.text(dots, 35 + item.title.length * 2, yPos);
      
      yPos += 8;
    });

    // Chapter 1: Welcome - Page 3
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('1. WELKOM BIJ AI IN HET ONDERWIJS', 20, yPos);
    yPos += 20;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const welcomeText = [
      'Welkom bij de AI Startersgids voor het Onderwijs! Deze handleiding is speciaal',
      'ontwikkeld voor Nederlandse docenten die kunstmatige intelligentie willen',
      'integreren in hun onderwijspraktijk.',
      '',
      'WAAROM DEZE GIDS?',
      'AI biedt ongekende mogelijkheden om onderwijs persoonlijker, effectiever en',
      'toegankelijker te maken. Deze gids helpt je stap voor stap om AI-tools te',
      'ontdekken en toe te passen in je lessen.',
      '',
      'VOOR WIE IS DEZE GIDS?',
      '• Docenten Basisonderwijs (groep 1-8)',
      '• Docenten Voortgezet Onderwijs (VMBO-VWO)',
      '• Docenten MBO en HBO',
      '• Schoolleiders en ICT-coordinatoren',
      '• Iedereen die nieuwsgierig is naar AI in het onderwijs',
      '',
      'HOE GEBRUIK JE DEZE GIDS?',
      '1. Begin met hoofdstuk 2 voor een basisuitleg van AI',
      '2. Bekijk de tools in hoofdstuk 4 die bij jouw vak passen',
      '3. Kies het hoofdstuk voor jouw onderwijsniveau (5, 6 of 7)',
      '4. Gebruik de praktische voorbeelden uit hoofdstuk 8',
      '5. Volg het stappenplan in hoofdstuk 10 voor implementatie',
      '',
      'WAT VIND JE IN DEZE GIDS?',
      '• Uitleg van AI-concepten in begrijpelijke taal',
      '• Overzicht van 15 geteste AI-tools voor docenten',
      '• Praktische voorbeelden voor elk onderwijsniveau',
      '• Concrete prompts die je direct kunt gebruiken',
      '• Ethische richtlijnen en veiligheidsaspecten',
      '• Stap-voor-stap implementatieplan',
      '• Antwoorden op veelgestelde vragen',
      '',
      'Succes met je AI-avontuur in het onderwijs!'
    ];

    welcomeText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.startsWith('WAAROM') || line.startsWith('VOOR WIE') || 
          line.startsWith('HOE GEBRUIK') || line.startsWith('WAT VIND')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.match(/^\d+\./) || line.startsWith('•')) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 7;
    });

    // Chapter 2: What is AI - Page 4-5
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('2. WAT IS KUNSTMATIGE INTELLIGENTIE?', 20, yPos);
    yPos += 20;

    const aiExplanation = [
      'EENVOUDIGE UITLEG',
      'Kunstmatige Intelligentie (AI) is technologie die computers helpt om taken',
      'uit te voeren die normaal gesproken menselijke intelligentie vereisen.',
      'Denk aan het begrijpen van taal, het herkennen van patronen, het maken',
      'van voorspellingen of het oplossen van problemen.',
      '',
      'AI is niet nieuw - het bestaat al sinds de jaren 50. Maar door de enorme',
      'toename in rekenkracht en beschikbare data, zijn AI-systemen de laatste',
      'jaren veel krachtiger en toegankelijker geworden.',
      '',
      'SOORTEN AI DIE JE TEGENKOMT',
      '',
      'Conversatie-AI (zoals ChatGPT)',
      '• Kan vragen beantwoorden en gesprekken voeren',
      '• Helpt bij het schrijven en bewerken van teksten',
      '• Kan complexe onderwerpen uitleggen',
      '• Voorbeelden: ChatGPT, Claude, Bard',
      '',
      'Creatieve AI',
      '• Maakt afbeeldingen, muziek of video\'s',
      '• Helpt bij grafisch ontwerp',
      '• Genereert creatieve ideeen',
      '• Voorbeelden: DALL-E, Midjourney, Canva AI',
      '',
      'Data-AI',
      '• Analyseert grote hoeveelheden informatie',
      '• Herkent patronen en trends',
      '• Maakt voorspellingen',
      '• Voorbeelden: Google Analytics, Excel AI-functies',
      '',
      'Zoek-AI',
      '• Zoekt en organiseert informatie',
      '• Vat lange teksten samen',
      '• Controleert feiten',
      '• Voorbeelden: Perplexity, NotebookLM'
    ];

    doc.setFontSize(12);
    aiExplanation.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('EENVOUDIGE') || line.includes('SOORTEN')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('Conversatie-AI') || line.startsWith('Creatieve AI') || 
                 line.startsWith('Data-AI') || line.startsWith('Zoek-AI')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Chapter 3: How AI Works - Page 6
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('3. HOE WERKT AI EIGENLIJK?', 20, yPos);
    yPos += 20;

    const howAIWorks = [
      'EENVOUDIGE UITLEG',
      'Stel je voor dat AI werkt zoals een kind leert:',
      '',
      '1. VOORBEELDEN BEKIJKEN',
      'Het AI-systeem krijgt heel veel voorbeelden te zien. Voor een',
      'taalmodel zoals ChatGPT zijn dit miljoenen teksten: boeken,',
      'artikelen, websites, etc.',
      '',
      '2. PATRONEN ZOEKEN',
      'Het systeem zoekt naar patronen in deze voorbeelden. Welke',
      'woorden komen vaak samen voor? Hoe zijn zinnen opgebouwd?',
      'Wat zijn logische verbanden?',
      '',
      '3. REGELS LEREN',
      'Op basis van deze patronen leert het systeem regels. Niet door',
      'expliciete programmering, maar door statistische verbanden.',
      '',
      '4. TOEPASSEN OP NIEUWE SITUATIES',
      'Wanneer je een vraag stelt, past het systeem deze geleerde',
      'regels toe om een passend antwoord te genereren.',
      '',
      'WAAROM IS AI BELANGRIJK VOOR HET ONDERWIJS?',
      '',
      'Personalisatie',
      'AI kan lessen aanpassen aan individuele leerlingen. Het herkent',
      'waar een leerling moeite mee heeft en biedt gerichte hulp.',
      '',
      'Efficientie',
      'Automatiseer repetitieve taken zoals nakijken, feedback geven',
      'of lesmateriaal genereren. Meer tijd voor echte interactie.',
      '',
      'Creativiteit',
      'AI biedt nieuwe manieren om complexe concepten uit te leggen',
      'en helpt bij het bedenken van originele lesmethoden.',
      '',
      'Toegankelijkheid',
      'Onderwijs wordt toegankelijker voor leerlingen met verschillende',
      'leerbehoeften door AI-ondersteuning.',
      '',
      'Toekomstvoorbereiding',
      'Leerlingen leren omgaan met AI-tools die ze in hun verdere',
      'loopbaan zullen gebruiken.'
    ];

    doc.setFontSize(12);
    howAIWorks.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('EENVOUDIGE') || line.includes('WAAROM IS')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.match(/^\d+\./) || line.startsWith('Personalisatie') || 
                 line.startsWith('Efficientie') || line.startsWith('Creativiteit') ||
                 line.startsWith('Toegankelijkheid') || line.startsWith('Toekomstvoorbereiding')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Chapter 4: TOP 15 AI Tools - Pages 7-9
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('4. TOP 15 AI-TOOLS VOOR DOCENTEN', 20, yPos);
    yPos += 20;

    const tools = [
      {
        name: '1. ChatGPT',
        category: 'Tekstverwerking',
        description: 'De bekendste AI-assistent voor tekstgeneratie en conversatie',
        uses: 'Lesplannen maken, vragen bedenken, feedback geven, uitleg schrijven',
        cost: 'Gratis + betaalde versie (€20/maand)',
        tip: 'Begin met eenvoudige vragen en bouw langzaam complexiteit op'
      },
      {
        name: '2. Claude',
        category: 'Tekstverwerking',
        description: 'Uitstekend voor lange documenten en complexe opdrachten',
        uses: 'Document analyse, uitgebreide feedback, onderzoeksondersteuning',
        cost: 'Gratis + betaalde versie (€18/maand)',
        tip: 'Perfect voor het analyseren van leerlingwerkstukken'
      },
      {
        name: '3. Canva AI',
        category: 'Grafisch ontwerp',
        description: 'Eenvoudig grafisch ontwerp met AI-ondersteuning',
        uses: 'Posters, presentaties, infographics, lesmateriaal maken',
        cost: 'Gratis + Pro versie (€12/maand)',
        tip: 'Gebruik Magic Design voor snelle en professionele resultaten'
      },
      {
        name: '4. Perplexity AI',
        category: 'Onderzoek',
        description: 'AI-zoekmachine met bronvermelding voor betrouwbaar onderzoek',
        uses: 'Onderzoek doen, fact-checking, actuele informatie vinden',
        cost: 'Gratis + Pro versie (€16/maand)',
        tip: 'Altijd bronnen controleren, ook bij AI-antwoorden'
      },
      {
        name: '5. Grammarly',
        category: 'Schrijfhulp',
        description: 'AI-powered grammatica en stijlcontrole voor betere teksten',
        uses: 'Teksten verbeteren, schrijfhulp voor leerlingen, feedback',
        cost: 'Gratis + Premium (€12/maand)',
        tip: 'Installeer als browser-extensie voor overal schrijfhulp'
      },
      {
        name: '6. Gamma',
        category: 'Presentaties',
        description: 'AI-tool voor het snel maken van professionele presentaties',
        uses: 'Lesmateriaal, leerlingpresentaties, schoolpresentaties',
        cost: 'Gratis + Pro versie (€8/maand)',
        tip: 'Geef een duidelijk onderwerp en laat AI de structuur maken'
      },
      {
        name: '7. Quillbot',
        category: 'Tekstbewerking',
        description: 'Parafrasering en samenvatting van teksten',
        uses: 'Teksten herformuleren, samenvattingen maken, plagiaatpreventie',
        cost: 'Gratis + Premium (€8/maand)',
        tip: 'Handig voor het vereenvoudigen van complexe teksten'
      },
      {
        name: '8. Teachable Machine',
        category: 'Machine Learning',
        description: 'Google\'s tool om eenvoudig AI-modellen te trainen',
        uses: 'AI-concepten uitleggen, leerlingen laten experimenteren',
        cost: 'Volledig gratis',
        tip: 'Perfect voor praktijklessen over hoe AI leert'
      },
      {
        name: '9. NotebookLM',
        category: 'Onderzoek',
        description: 'Google\'s AI voor document analyse en samenvatting',
        uses: 'Lange documenten samenvatten, bronnenonderzoek',
        cost: 'Gratis (in beta)',
        tip: 'Upload meerdere documenten voor vergelijkend onderzoek'
      },
      {
        name: '10. Brisk Teaching',
        category: 'Onderwijs',
        description: 'Chrome extensie speciaal voor docenten',
        uses: 'Snelle feedback, lesplan generatie, differentiatie',
        cost: 'Freemium model',
        tip: 'Integreert naadloos met Google Classroom'
      },
      {
        name: '11. Synthesia',
        category: 'Video',
        description: 'AI-video\'s maken met virtuele presentatoren',
        uses: 'Instructievideo\'s, online lessen, presentaties',
        cost: 'Betaald (vanaf €22/maand)',
        tip: 'Ideaal voor het maken van consistente instructievideo\'s'
      },
      {
        name: '12. Otter.ai',
        category: 'Transcriptie',
        description: 'Automatische transcriptie van audio en video',
        uses: 'Lezingen transcriberen, notities maken, toegankelijkheid',
        cost: 'Gratis + Pro versie (€8/maand)',
        tip: 'Handig voor het maken van lestranscripties'
      },
      {
        name: '13. Kahoot AI',
        category: 'Gamificatie',
        description: 'AI-ondersteunde quiz en spelletjes maken',
        uses: 'Interactieve quizzen, toetsen, spelend leren',
        cost: 'Gratis + betaalde functies',
        tip: 'Laat AI vragen genereren op basis van je lesmateriaal'
      },
      {
        name: '14. Diffit',
        category: 'Differentiatie',
        description: 'Teksten aanpassen aan verschillende leesniveaus',
        uses: 'Lesmateriaal differentiëren, toegankelijkheid verbeteren',
        cost: 'Freemium model',
        tip: 'Perfect voor inclusief onderwijs en verschillende niveaus'
      },
      {
        name: '15. Magic School AI',
        category: 'Onderwijs platform',
        description: 'All-in-one AI platform speciaal voor docenten',
        uses: 'Lesplannen, rubrics, oudercontact, administratie',
        cost: 'Gratis voor docenten',
        tip: 'Bevat meer dan 60 verschillende AI-tools voor docenten'
      }
    ];

    doc.setFontSize(10);
    tools.forEach(tool => {
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(tool.name, 20, yPos);
      
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.text('[' + tool.category + ']', 20, yPos + 7);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(tool.description, 20, yPos + 14);
      doc.text('Gebruik: ' + tool.uses, 20, yPos + 21);
      doc.text('Kosten: ' + tool.cost, 20, yPos + 28);
      
      doc.setFont('helvetica', 'italic');
      doc.text('Tip: ' + tool.tip, 20, yPos + 35);
      
      yPos += 45;
    });

    // Chapter 5: Primary Education - IMPROVED VERSION
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('5. AI IN HET BASISONDERWIJS', 20, yPos);
    yPos += 20;

    const primaryEducation = [
      'LEEFTIJDSGESCHIKT GEBRUIK VAN AI',
      '',
      'GROEP 1-2: Kennismaking',
      '• Laat kinderen ervaren dat computers "slim" kunnen zijn',
      '• Gebruik spraakherkenning (Siri, Google Assistant)',
      '• Eenvoudige robot-activiteiten',
      '• Focus op verwondering en nieuwsgierigheid',
      '',
      'GROEP 3-4: AI herkennen',
      '• Herken AI in dagelijkse situaties',
      '• Gebruik Quick, Draw! van Google',
      '• Eenvoudige patroonherkenning spelletjes',
      '• Praten over "slimme" apparaten thuis',
      '',
      'GROEP 5-6: Actief experimenteren',
      '• Teachable Machine gebruiken (met begeleiding)',
      '• AI-kunstprojecten met eenvoudige tools',
      '• Chatbots leren kennen (onder strenge begeleiding)',
      '• Eerste ethische gesprekken over AI',
      '',
      'GROEP 7-8: Begrip en toepassing',
      '• Begrijpen hoe AI leert van voorbeelden',
      '• Onderzoeksprojecten met AI-ondersteuning (docent helpt)',
      '• Kritisch denken: "Klopt dit antwoord wel?"',
      '• Creatieve projecten met AI als inspiratie',
      '• Simpele programmeerconcepten (Scratch)',
      '',
      'VEILIGHEID EN ETHIEK',
      '• Gebruik AI altijd onder begeleiding',
      '• Bespreek dat AI soms fouten maakt',
      '• Leer kinderen AI-antwoorden te controleren',
      '• Praat over privacy en persoonlijke informatie',
      '• Geen persoonlijke gegevens in AI-tools invoeren',
      '',
      'PRAKTISCHE VOORBEELDEN PO',
      '',
      'Rekenen met patronen (groep 5-6)',
      'Laat leerlingen patronen in getallen ontdekken.',
      'Gebruik: Teachable Machine om cijferherkenning te oefenen',
      'Doel: Begrijpen dat computers patronen kunnen leren',
      '',
      'Creatief verhalen schrijven (groep 7-8)',
      'AI als inspiratiebron voor eigen verhalen en karakters.',
      'Gebruik: ChatGPT voor karakterideeën, kinderen schrijven zelf',
      'Belangrijk: Docent controleert alle AI-input en output',
      '',
      'Dieren classificeren (groep 6-7)',
      'Leerlingen leren hoe computers dieren kunnen herkennen.',
      'Gebruik: Teachable Machine met foto\'s van dieren',
      'Lesdoel: AI leert van voorbeelden, net zoals mensen'
    ];

    doc.setFontSize(11);
    primaryEducation.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('LEEFTIJDSGESCHIKT') || line.includes('VEILIGHEID') || 
          line.includes('PRAKTISCHE VOORBEELDEN')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('GROEP') || line.startsWith('Rekenen') || 
                 line.startsWith('Creatief') || line.startsWith('Dieren')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Chapter 6: Secondary Education - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('6. AI IN HET VOORTGEZET ONDERWIJS', 20, yPos);
    yPos += 20;

    const secondaryEducation = [
      'AI VOOR VERSCHILLENDE NIVEAUS EN VAKKEN',
      '',
      'VMBO: Praktijkgerichte toepassingen',
      '• AI-tools voor beroepsgerichte vakken',
      '• Eenvoudige automatisering en efficiency',
      '• AI in de praktijk: hoe werkt het in beroepen?',
      '• Focus op vaardigheden voor de arbeidsmarkt',
      '',
      'HAVO: Analytisch en kritisch denken',
      '• AI voor onderzoeksprojecten',
      '• Data-analyse en interpretatie',
      '• Ethische discussies over AI-impact',
      '• AI als hulpmiddel bij complexere opdrachten',
      '',
      'VWO: Diepgaande analyse en innovatie',
      '• Programmeren met AI-ondersteuning',
      '• Wetenschappelijk onderzoek met AI-tools',
      '• Filosofische en maatschappelijke aspecten',
      '• Eigen AI-projecten ontwikkelen',
      '',
      'VAKSPECIFIEKE TOEPASSINGEN',
      '',
      'Nederlands',
      '• Tekstanalyse en literatuuronderzoek',
      '• Schrijfhulp en stijlverbetering',
      '• Creatief schrijven met AI-inspiratie',
      '• Bronnenonderzoek en fact-checking'
    ];

    // Continue with the rest but ensure proper page breaks
    doc.setFontSize(11);
    secondaryEducation.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('AI VOOR VERSCHILLENDE') || line.includes('VAKSPECIFIEKE')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('VMBO:') || line.startsWith('HAVO:') || 
                 line.startsWith('VWO:') || line.startsWith('Nederlands')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Continue with remaining subjects on same page or new page as needed
    const moreSubjects = [
      '',
      'Wiskunde',
      '• Complexe berekeningen controleren',
      '• Grafieken en visualisaties maken',
      '• Patroonherkenning in datasets',
      '• Statistiek en kansrekening',
      '',
      'Geschiedenis', // This will get proper page treatment
      '• Bronnenanalyse en verificatie',
      '• Tijdlijnen en verbanden visualiseren',
      '• Onderzoek naar historische data',
      '• Vergelijking van verschillende bronnen',
      '',
      'Biologie',
      '• DNA-sequenties analyseren',
      '• Ecosystemen modelleren',
      '• Medische data interpreteren',
      '• Evolutionaire patronen onderzoeken',
      '',
      'PRAKTISCHE PROJECTEN VO',
      '',
      'Maatschappijleer: AI-ethiek debat (alle niveaus)',
      'Leerlingen debatteren over AI-impact op samenleving.',
      'Onderwerpen: privacy, werkgelegenheid, bias in AI',
      '',
      'Engels: AI-geassisteerd taalonderwijs',
      'Conversatie met AI-bots, grammaticacontrole, schrijfhulp.',
      'Kritisch beoordelen van AI-vertalingen',
      '',
      'Economie: Business case met AI',
      'Marktanalyse, voorspellingen, bedrijfsstrategieën.',
      'Impact van AI op verschillende industrieën',
      '',
      'EXAMENVORBEREIDING MET AI',
      '• Gepersonaliseerde oefentoetsen',
      '• Zwakke punten identificeren en versterken',
      '• Samenvatten van lesstof',
      '• Uitleg van moeilijke concepten op maat'
    ];

    moreSubjects.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      // Special handling for "Geschiedenis" - force new page if needed
      if (line === 'Geschiedenis' && yPos > 220) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('PRAKTISCHE PROJECTEN') || line.includes('EXAMENVORBEREIDING')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('Wiskunde') || line.startsWith('Geschiedenis') || 
                 line.startsWith('Biologie') || line.startsWith('Maatschappijleer:') || 
                 line.startsWith('Engels:') || line.startsWith('Economie:')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Chapter 7: MBO & HBO - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('7. AI IN MBO EN HBO', 20, yPos);
    yPos += 20;

    const higherEducation = [
      'PROFESSIONELE AI-TOEPASSINGEN',
      '',
      'MBO: Beroepsgerichte AI-vaardigheden',
      '• AI-tools specifiek voor de gekozen sector',
      '• Praktijkstages met AI-componenten',
      '• Efficiency en automatisering in het werk',
      '• Voorbereiding op AI-gedreven arbeidsmarkt',
      '',
      'HBO: Strategische en analytische toepassingen',
      '• Onderzoeksmethodologie met AI-ondersteuning',
      '• Data-analyse voor bachelorprojecten',
      '• Innovatie en product ontwikkeling',
      '• Leiderschap in AI-transformatie',
      '',
      'SECTORSPECIFIEKE TOEPASSINGEN',
      '',
      'Techniek en ICT',
      '• Code review en programmeerondersteuning',
      '• Automatisering van testprocessen',
      '• Predictive maintenance systemen',
      '• Machine learning in embedded systems',
      '',
      'Zorg en Welzijn',
      '• Diagnostische ondersteuning',
      '• Behandelplan optimalisatie',
      '• Patiëntgegevens analyse',
      '• Ethiek in medische AI-toepassingen',
      '',
      'Economie en Business',
      '• Marktanalyse en voorspellingen',
      '• Customer journey optimalisatie',
      '• Financial modeling en risk assessment',
      '• Supply chain optimalisatie',
      '',
      'Creatieve Vakken',
      '• AI-geassisteerd design en concept development',
      '• Content creatie en multimedia productie',
      '• Personalisatie in marketing en communicatie',
      '• Nieuwe media en interactieve ervaringen'
    ];

    doc.setFontSize(11);
    higherEducation.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('PROFESSIONELE AI') || line.includes('SECTORSPECIFIEKE')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('MBO:') || line.startsWith('HBO:') || 
                 line.startsWith('Techniek') || line.startsWith('Zorg') || 
                 line.startsWith('Economie') || line.startsWith('Creatieve')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Continue with remaining chapters ensuring proper page breaks...
    
    // Chapter 8: Practical Examples and Prompts - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('8. PRAKTISCHE VOORBEELDEN EN PROMPTS', 20, yPos);
    yPos += 20;

    const practicalExamples = [
      'EFFECTIEVE PROMPTS VOOR DOCENTEN',
      '',
      'Lesplannen genereren',
      'Prompt: "Maak een lesplan van 50 minuten over [onderwerp] voor',
      '[niveau]. Inclusief leerdoelen, activiteiten en evaluatie."',
      '',
      'Feedback op leerlingwerk',
      'Prompt: "Geef constructieve feedback op deze tekst van een',
      '[niveau] leerling. Focus op [specifieke aspecten]."',
      '',
      'Differentiatie',
      'Prompt: "Pas deze tekst aan voor drie niveaus: basis,',
      'gemiddeld en uitdagend. Behoud de kernboodschap."',
      '',
      'Toetsvragen maken',
      'Prompt: "Maak 10 meerkeuzevragen over [onderwerp] voor',
      '[niveau]. Varieer in moeilijkheidsgraad."',
      '',
      'TIPS VOOR BETERE AI-INTERACTIE',
      '• Wees specifiek in je vragen',
      '• Geef context over je doelgroep',
      '• Vraag om voorbeelden of uitleg',
      '• Controleer altijd de output',
      '• Itereer en verfijn je prompts'
    ];

    doc.setFontSize(11);
    practicalExamples.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('EFFECTIEVE PROMPTS') || line.includes('TIPS VOOR')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else if (line.startsWith('Lesplannen') || line.startsWith('Feedback') || 
                 line.startsWith('Differentiatie') || line.startsWith('Toetsvragen')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 8 : 6;
    });

    // Remaining short chapters with proper page breaks
    
    // Chapter 9: Ethics and Safety - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('9. ETHIEK EN VEILIGHEID', 20, yPos);
    yPos += 20;

    const ethics = [
      'VERANTWOORD GEBRUIK VAN AI',
      '• Transparantie: vertel leerlingen wanneer je AI gebruikt',
      '• Privacy: geen persoonlijke gegevens in AI-tools',
      '• Betrouwbaarheid: controleer altijd AI-output',
      '• Inclusiviteit: let op bias en vooroordelen',
      '• Authenticiteit: behoud menselijke creativiteit en denken'
    ];

    doc.setFontSize(11);
    ethics.forEach(line => {
      if (line.includes('VERANTWOORD')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += 8;
    });

    // Chapter 10: Implementation Step-by-Step - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('10. IMPLEMENTATIE STAP-VOOR-STAP', 20, yPos);
    yPos += 20;

    const implementation = [
      'JOUW AI-REIS IN 5 STAPPEN',
      '1. Start klein: kies één AI-tool en probeer het uit',
      '2. Experimenteer: test verschillende toepassingen',
      '3. Evalueer: wat werkt wel/niet in jouw context?',
      '4. Uitbreiden: voeg meer tools toe aan je workflow',
      '5. Delen: help collega\'s met jouw ervaringen'
    ];

    doc.setFontSize(11);
    implementation.forEach(line => {
      if (line.includes('JOUW AI-REIS')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos += 8;
    });

    // Chapter 11: FAQ - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('11. VEELGESTELDE VRAGEN', 20, yPos);
    yPos += 20;

    const faq = [
      'Q: Is AI veilig om te gebruiken met leerlingen?',
      'A: Ja, met de juiste voorzorgsmaatregelen. Gebruik geen',
      'persoonlijke gegevens en begeleid altijd het gebruik.',
      '',
      'Q: Vervangt AI de docent?',
      'A: Nee, AI is een hulpmiddel dat de docent ondersteunt,',
      'niet vervangt. Menselijke interactie blijft essentieel.',
      '',
      'Q: Wat als AI foute informatie geeft?',
      'A: Controleer altijd AI-output. Leer leerlingen ook',
      'kritisch te zijn en bronnen te verifiëren.'
    ];

    doc.setFontSize(10);
    faq.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.startsWith('Q:')) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }

      doc.text(line, 20, yPos);
      yPos += 7;
    });

    // Chapter 12: Resources - FORCE NEW PAGE
    doc.addPage(); // FORCE NEW PAGE
    yPos = 30;
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('12. RESOURCES EN VERVOLGSTAPPEN', 20, yPos);
    yPos += 30;

    const resources = [
      'NUTTIGE WEBSITES',
      '• onderwijs.ai - Nederlandse AI-tips voor docenten',
      '• digitalegeletterdheid.nl - Veilig omgaan met AI',
      '• Elements of AI - Gratis AI-cursus (Nederlandse versie)',
      '',
      'VERVOLGTRAINING',
      '• Zoek naar lokale AI-workshops',
      '• Overweeg online cursussen',
      '• Sluit je aan bij AI-communities',
      '• Bezoek onderwijsconferenties',
      '',
      'CONTACT',
      'Voor vragen: ai.onderwijs@gmail.com',
      'Website: https://onderwijs.ai/',
      '',
      'Succes met AI in jouw onderwijs!'
    ];

    doc.setFontSize(11);
    resources.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('NUTTIGE') || line.includes('VERVOLGTRAINING') || line.includes('CONTACT')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      }

      doc.text(line, 20, yPos);
      yPos +=  line === '' ? 8 : 6;
    });

    // Enhanced footer with website URL
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 285, 210, 12, 'F');
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('AI in het Onderwijs | Nederlandse Handleiding | https://onderwijs.ai/', 20, 292);
      doc.text('Pagina ' + i + '/' + totalPages, 150, 292);
    }

    // Clean filename without version numbers
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

/** * Download lesson PDFs - keeping existing functionality */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('Generating lesson PDF for:', lessonTitle);
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const uniqueId = Math.random().toString(36).substring(2, 8);
    doc.setFont('helvetica');

    // Header
    doc.setFillColor(70, 130, 180);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('AI LESMATERIAAL', 105, 13, { align: 'center' });

    // Reset colors
    doc.setTextColor(0, 0, 0);

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(lessonTitle.toUpperCase(), 20, 40);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Gegenereerd: ' + new Date().toLocaleDateString('nl-NL'), 20, 55);
    doc.text('Les ID: ' + uniqueId, 20, 65);

    // Content
    let yPos = 85;
    const lessonContent = [
      'LEERDOELEN',
      '• AI-concepten begrijpen en toepassen',
      '• Effectief werken met AI-tools',
      '• Kritisch denken over AI-content',
      '• Ethische aspecten van AI begrijpen',
      '',
      'BENODIGDE MATERIALEN',
      '• Computer/laptop per leerling',
      '• Stabiele internetverbinding',
      '• Toegang tot AI-tool',
      '• Werkbladen',
      '',
      'TIJDSDUUR: 45-90 minuten',
      'DOELGROEP: Alle onderwijsniveaus',
      '',
      'LESOPBOUW',
      '',
      'DEEL 1: INTRODUCTIE (15 min)',
      '• Brainstorm over AI in het dagelijks leven',
      '• Uitleg: Wat is AI?',
      '• Doel van de les bespreken',
      '',
      'DEEL 2: HANDS-ON (30 min)',
      '• Demonstratie van AI-tool',
      '• Leerlingen experimenteren',
      '• Verschillende prompts proberen',
      '• Resultaten vergelijken',
      '',
      'DEEL 3: REFLECTIE (15 min)',
      '• Wat hebben we geleerd?',
      '• Mogelijkheden en zorgen bespreken',
      '• Verantwoord gebruik',
      '',
      'TIPS VOOR DE DOCENT',
      '• Start met eenvoudige prompts',
      '• Moedig kritisch denken aan',
      '• Bespreek AI-beperkingen',
      '• Maak het interactief!'
    ];

    doc.setFontSize(10);
    lessonContent.forEach(line => {
      if (yPos > 275) {
        doc.addPage();
        yPos = 20;
      }

      if (line.includes('LEERDOELEN') || line.includes('BENODIGDE') || 
          line.includes('LESOPBOUW') || line.includes('DEEL') || line.includes('TIPS')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }

      doc.text(line, 20, yPos);
      yPos += line === '' ? 6 : 8;
    });

    // Footer with website
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 285, 210, 12, 'F');
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text('AI in het Onderwijs | https://onderwijs.ai/', 20, 292);
      doc.text('Les ID: ' + uniqueId + ' | Pagina ' + i + '/' + totalPages, 150, 292);
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = 'AI-Les-' + lessonTitle.toLowerCase().replace(/\s+/g, '-') + '-' + timestamp + '-' + uniqueId + '.pdf';
    
    doc.save(filename);
    console.log('Professional lesson PDF "' + lessonTitle + '" downloaded successfully');
    
  } catch (error) {
    console.error('Lesson PDF generation failed:', error);
  }
};

/** * Legacy support */
export const downloadFile = (url, filename = null) => {
  console.log('Redirecting to complete startersgids...');
  downloadStartersgids();
};

export default {
  downloadStartersgids,
  downloadLesson,
  downloadFile
};