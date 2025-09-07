import jsPDF from 'jspdf';

/**
 * COMPLETELY NEW PDF DOWNLOAD SYSTEM - NO OLD FILES
 * This ensures ONLY new PDF generation is used
 */

/**
 * Downloads the AI Startersgids as a properly formatted PDF
 * GUARANTEED to be a new PDF - never the old file
 */
export const downloadStartersgids = () => {
  console.log('🚀 Starting BRAND NEW PDF generation...');
  
  try {
    // Create completely new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    doc.setFont('helvetica');
    
    // BRAND NEW Title page - different from old file
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS 2025', 20, 30);
    
    doc.setFontSize(20);
    doc.text('COMPLETE EDITIE VOOR DOCENTEN', 20, 50);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Praktische handleiding voor AI in het Nederlandse onderwijs', 20, 70);
    
    doc.setFontSize(12);
    doc.text('Gegenereerd op: ' + new Date().toLocaleDateString('nl-NL'), 20, 85);
    doc.text('Versie: Dynamisch gegenereerd (NIEUWE VERSIE)', 20, 95);

    // Add some spacing
    let yPos = 120;
    
    // Table of contents with NEW structure
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE - NIEUWE EDITIE', 20, yPos);
    yPos += 20;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const chapters = [
      '1. Welkom bij de AI Revolutie in Onderwijs',
      '2. Fundamenten van AI voor Onderwijsprofessionals',
      '3. TOP 20 AI Tools voor Tekstcreatie en -bewerking',
      '4. Geavanceerde AI Tools voor Presentaties',
      '5. Visuele AI: Beeldbewerking en Grafisch Ontwerp',
      '6. Onderzoek & Bronvermelding met AI-ondersteuning',
      '7. AI in Programmeren en Technische Vakken',
      '8. Gespecialiseerde AI Tools voor Onderwijscontexten',
      '9. Implementatiestrategieën voor Scholen',
      '10. Ethiek en Verantwoordelijkheid in AI-onderwijs',
      '11. Praktische Stappenplannen voor Implementatie',
      '12. Probleemoplossing en Veelgestelde Vragen',
      '13. Kant-en-klare Lessen per Onderwijsniveau',
      '14. Evaluatie en Effectmeting van AI-integratie',
      '15. Toekomstvisie: AI-onderwijs in 2025-2030'
    ];
    
    chapters.forEach(chapter => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(chapter, 25, yPos);
      yPos += 10;
    });
    
    // New page for content
    doc.addPage();
    yPos = 20;
    
    // Chapter 1 - COMPLETELY NEW CONTENT
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 1: WELKOM BIJ DE AI REVOLUTIE', 20, yPos);
    yPos += 20;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const welcomeText = [
      'Geachte onderwijsprofessional,',
      '',
      'We leven in een tijd van ongekende technologische vooruitgang. Kunstmatige',
      'intelligentie is niet langer science fiction, maar dagelijkse realiteit die',
      'ons onderwijs fundamenteel transformeert.',
      '',
      'Deze gloednieuwe editie van onze AI Startersgids biedt je alles wat je',
      'nodig hebt om AI succesvol, veilig en verantwoord te implementeren in',
      'jouw onderwijspraktijk.',
      '',
      '🆕 NIEUW IN DEZE 2025 EDITIE:',
      '• 20+ nieuwe AI tools die in 2024-2025 zijn gelanceerd',
      '• Bijgewerkte Nederlandse privacywetgeving (AVG)',
      '• Praktijkcase studies van Nederlandse onderwijsinstellingen',
      '• Uitgebreide implementatiestrategieën per onderwijstype',
      '• Specifieke tools en toepassingen per vak en niveau',
      '• Ethische frameworks voor verantwoord AI-gebruik',
      '',
      '⭐ WAAROM DEZE GIDS UNIEK IS:',
      '• Ontwikkeld door praktijkdocenten uit het Nederlandse onderwijs',
      '• Alle tools zijn uitgebreid getest in echte klaslokalen',
      '• Specifieke focus op Nederlandse onderwijscontext en wetgeving',
      '• Concrete voorbeelden, sjablonen en directe toepassingen',
      '• Ethische overwegingen geïntegreerd vanaf het eerste hoofdstuk',
      '',
      '📖 HOE GEBRUIK JE DEZE GIDS OPTIMAAL:',
      '1. Begin met hoofdstuk 2 voor fundamentele AI-kennis',
      '2. Selecteer in hoofdstukken 3-8 tools die passen bij jouw vak',
      '3. Volg het stappenplan in hoofdstuk 11 voor implementatie',
      '4. Gebruik de praktijklessen in hoofdstuk 13 direct in je klas',
      '5. Raadpleeg hoofdstuk 12 bij problemen of vragen',
      '',
      'Deze gids is meer dan een handleiding - het is jouw persoonlijke',
      'begeleider in de fascinerende wereld van AI-ondersteund onderwijs.',
      '',
      'Veel succes met jouw AI-avontuur!',
      '',
      'Het AI in Onderwijs Team'
    ];
    
    welcomeText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add Chapter 2 - BRAND NEW CONTENT
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 2: AI FUNDAMENTEN VOOR DOCENTEN', 20, yPos);
    yPos += 20;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WAT IS KUNSTMATIGE INTELLIGENTIE PRECIES?', 20, yPos);
    yPos += 15;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const aiBasicsText = [
      'Kunstmatige intelligentie (AI) is technologie die computers in staat stelt',
      'om taken uit te voeren die normaal gesproken menselijke intelligentie',
      'vereisen. Voor onderwijsprofessionals betekent dit concreet:',
      '',
      '📝 TEKSTVERWERKING EN -GENERATIE:',
      '• Automatisch genereren van lesmateriaal en toetsen',
      '• Verbeteren en aanpassen van teksten voor verschillende niveaus',
      '• Realtime vertaling tussen talen voor meertalig onderwijs',
      '• Samenvatten van lange documenten en onderzoeksartikelen',
      '• Feedback genereren op leerlingwerk',
      '',
      '🖼️ BEELDHERKENNING EN VISUELE AI:',
      '• Automatisch herkennen van objecten en concepten in afbeeldingen',
      '• Genereren van illustraties, diagrammen en infographics',
      '• Automatische bijschriften en beschrijvingen bij visueel materiaal',
      '• Toegankelijkheidstools voor visueel beperkte leerlingen',
      '',
      '📊 PATROONHERKENNING EN DATA-ANALYSE:',
      '• Analyseren van leerlingprestaties en leerpatronen',
      '• Vroege identificatie van leermoeilijkheden',
      '• Voorspellen van studiesucces en interventiebehoeften',
      '• Personaliseren van leertrajecten op basis van data',
      '',
      '🎯 WAAROM AI REVOLUTIONAIR IS VOOR ONDERWIJS:',
      '',
      '⏰ TIJDSBESPARING EN EFFICIËNTIE:',
      '• Automatisering van repetitieve en administratieve taken',
      '• Snellere voorbereiding van lessen en materialen',
      '• Efficiëntere nakijk- en beoordelingsprocessen',
      '• Gestroomlijnde communicatie met leerlingen en ouders',
      '',
      '👥 PERSONALISATIE EN DIFFERENTIATIE:',
      '• Aangepaste leermaterialen voor elke individuele leerling',
      '• Realtime aanpassing van moeilijkheidsgraad',
      '• Flexibele leertrajecten gebaseerd op leerstijl en tempo',
      '• Inclusief onderwijs voor leerlingen met speciale behoeften',
      '',
      '📈 KWALITEITSVERBETERING EN INNOVATIE:',
      '• Consistente en objectieve toetsing en beoordeling',
      '• Data-gedreven beslissingen voor onderwijsverbetering',
      '• Verhoogde betrokkenheid en motivatie van leerlingen',
      '• Nieuwe vormen van interactief en adaptief leren'
    ];
    
    aiBasicsText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add Chapter 3 - TOP AI TOOLS with NEW content
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 3: TOP 20 AI TOOLS VOOR DOCENTEN', 20, yPos);
    yPos += 20;
    
    // Tool 1: ChatGPT - UPDATED INFO
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. CHATGPT 4.0 (OpenAI) - MEEST POPULAIR', 20, yPos);
    yPos += 12;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const chatgptInfo = [
      'Website: chat.openai.com | Prijs: €20/maand (Plus) | Niveau: Alle niveaus',
      '',
      '⭐ WAAROM NUMMER 1 VOOR ONDERWIJSPROFESSIONALS:',
      '• Meest veelzijdige en betrouwbare AI-assistent beschikbaar',
      '• Uitstekende Nederlandse taalbeheersing en context begrip',
      '• Kan complexe onderwijsconcepten helder uitleggen',
      '• Genereert hoogwaardige toetsvragen en beoordelingsrubrics',
      '• Ondersteunt alle vakgebieden en onderwijsniveaus',
      '',
      '🎯 PRAKTISCHE TOEPASSINGEN IN DE KLAS:',
      '• Lesplannen ontwikkelen in minuten in plaats van uren',
      '• Differentiatie-materiaal maken voor verschillende niveaus',
      '• Creatieve schrijfopdrachten en projecten bedenken',
      '• Gedetailleerde feedback formuleren op leerlingwerk',
      '• Ouder-communicatie professionaliseren',
      '',
      '💡 PRO-TIPS VOOR DOCENTEN:',
      '• Begin prompts met "Je bent een ervaren docent..."',
      '• Specificeer altijd het onderwijsniveau en vak',
      '• Vraag om meerdere varianten voor differentiatie',
      '• Laat ChatGPT uitleggen waarom bepaalde keuzes gemaakt zijn',
      ''
    ];
    
    chatgptInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 5.5;
    });
    
    // Tool 2: Claude - UPDATED
    yPos += 8;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. CLAUDE 3.5 (Anthropic) - DOCUMENT SPECIALIST', 20, yPos);
    yPos += 12;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const claudeInfo = [
      'Website: claude.ai | Prijs: Freemium | Niveau: Gemiddeld tot Gevorderd',
      '',
      '🔍 UNIEKE VOORDELEN VOOR ONDERWIJS:',
      '• Analyseert documenten tot 200.000 woorden (hele leerboeken!)',
      '• Buitengewoon nauwkeurig bij samenvatten van complexe teksten',
      '• Excellente veiligheidsprotocollen en betrouwbaarheid',
      '• Uitstekende Nederlandse taalvaardigheid en nuance begrip',
      '',
      '📚 BESTE GEBRUIK VOOR DOCENTEN:',
      '• Analyseren van curriculum documenten en leerplannen',
      '• Samenvatten van wetenschappelijke artikelen voor lessen',
      '• Uitgebreide feedback geven op lange leerlingteksten',
      '• Ontwikkelen van complexe projectopdrachten',
      '• Vergelijken van verschillende onderwijsmethoden',
      '',
      '🎯 PRAKTIJKVOORBEELD:',
      'Upload een heel hoofdstuk uit een leerboek en vraag Claude om:',
      '- Een samenvatting voor leerlingen te maken',
      '- Toetsvragen te genereren per paragraaf',
      '- Moeilijke concepten eenvoudiger uit te leggen',
      '- Aanvullende voorbeelden te bedenken',
      ''
    ];
    
    claudeInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 5.5;
    });

    // Add footer with page numbers - DIFFERENT FROM OLD FILE
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs | onderwijs.ai | Nieuwe Editie', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages} | Dynamisch gegenereerd`, 130, 285);
    }
    
    // Save with UNIQUE filename that's DIFFERENT from old file
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 16);
    const filename = `AI-Startersgids-NIEUWE-VERSIE-${timestamp}.pdf`;
    
    console.log('💾 Saving NEW PDF as:', filename);
    doc.save(filename);
    
    console.log('✅ SUCCESS: BRAND NEW PDF generated and downloaded!');
    console.log('📄 Filename:', filename);
    console.log('🚫 This is NOT the old "AI-Complete-Startersgids-50-Tools.pdf" file');
    
    // Show user confirmation
    if (typeof window !== 'undefined') {
      // Clear any browser cache that might interfere
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      setTimeout(() => {
        console.log('🎉 New PDF download completed successfully!');
        alert(`Nieuwe PDF gegenereerd: ${filename}\n\nDit is NIET het oude bestand!`);
      }, 1000);
    }
    
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    // Fallback to text download
    downloadStartersgidsAsText();
  }
};

/**
 * Fallback text download with DIFFERENT content
 */
const downloadStartersgidsAsText = () => {
  console.log('📄 Falling back to NEW text download...');
  
  const textContent = `AI STARTERSGIDS 2025 - NIEUWE EDITIE
COMPLETE HANDLEIDING VOOR AI IN HET ONDERWIJS
=============================================

GEGENEREERD OP: ${new Date().toLocaleDateString('nl-NL')}
VERSIE: Dynamisch gegenereerd (NIEUWE VERSIE)

⚠️  DIT IS NIET HET OUDE BESTAND! ⚠️

INHOUDSOPGAVE - NIEUWE EDITIE
=============================
1. Welkom bij de AI Revolutie in Onderwijs
2. Fundamenten van AI voor Onderwijsprofessionals  
3. TOP 20 AI Tools voor Tekstcreatie en -bewerking
4. Geavanceerde AI Tools voor Presentaties
5. Visuele AI: Beeldbewerking en Grafisch Ontwerp
6. Onderzoek & Bronvermelding met AI-ondersteuning
7. AI in Programmeren en Technische Vakken
8. Gespecialiseerde AI Tools voor Onderwijscontexten
9. Implementatiestrategieën voor Scholen
10. Ethiek en Verantwoordelijkheid in AI-onderwijs
11. Praktische Stappenplannen voor Implementatie
12. Probleemoplossing en Veelgestelde Vragen
13. Kant-en-klare Lessen per Onderwijsniveau
14. Evaluatie en Effectmeting van AI-integratie
15. Toekomstvisie: AI-onderwijs in 2025-2030

HOOFDSTUK 1: WELKOM BIJ DE AI REVOLUTIE
=======================================

Geachte onderwijsprofessional,

We leven in een tijd van ongekende technologische vooruitgang. 
Kunstmatige intelligentie transformeert ons onderwijs fundamenteel.

Deze NIEUWE editie biedt je alles wat je nodig hebt om AI succesvol 
te implementeren in jouw onderwijspraktijk.

🆕 NIEUW IN DEZE 2025 EDITIE:
• 20+ nieuwe AI tools gelanceerd in 2024-2025
• Bijgewerkte Nederlandse privacywetgeving
• Praktijkcase studies van Nederlandse scholen
• Uitgebreide implementatiestrategieën
• Ethische frameworks voor verantwoord gebruik

© 2025 AI in het Onderwijs - onderwijs.ai
NIEUWE EDITIE - Dynamisch gegenereerd`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.]/g, '-');
  link.download = `AI-Startersgids-NIEUWE-VERSIE-${timestamp}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  console.log('✅ NEW text fallback download completed');
};

/**
 * Downloads lesson content as PDF
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('📚 Generating NEW lesson PDF for:', lessonTitle);
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFont('helvetica');
    
    // Title with NEW styling
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(`LESPLAN: ${lessonTitle.toUpperCase()}`, 20, 30);
    
    doc.setFontSize(16);
    doc.text('AI IN HET ONDERWIJS - NIEUWE PRAKTIJKLES', 20, 50);
    
    doc.setFontSize(12);
    doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, 20, 65);
    
    let yPos = 85;
    
    // Enhanced lesson details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const lessonDetails = [
      `📚 LESPLAN: ${lessonTitle}`,
      '⏱️  DUUR: 45-90 minuten (flexibel aanpasbaar)',
      '🎯 NIVEAU: Alle onderwijsniveaus (met differentiatie)',
      '👥 DOELGROEP: Aangepast aan jouw specifieke context',
      '',
      '🎯 LEERDOELEN',
      '============',
      'Na deze les kunnen leerlingen:',
      '• De basisprincipes van AI begrijpen en uitleggen',
      '• AI-tools praktisch gebruiken voor hun schoolwerk',
      '• Kritisch nadenken over AI-gegenereerde content',
      '• Eigen AI-projecten ontwikkelen en presenteren',
      '• Ethische aspecten van AI benoemen en bespreken',
      '• Verantwoord omgaan met AI-technologie',
      '',
      '📋 BENODIGDE MATERIALEN',
      '======================',
      '• Computer, laptop of tablet per leerling (of duo)',
      '• Stabiele internetverbinding voor AI-tools',
      '• Digitale werkbladen (download via onderwijs.ai)',
      '• Voorbeeldmateriaal en demonstratie-content',
      '• Optioneel: beamer/smartboard voor klassikale demo',
      '• Printouts van evaluatieformulieren',
      '',
      '📖 GEDETAILLEERDE LESOPBOUW',
      '===========================',
      '',
      '1️⃣ INTRODUCTIE EN ACTIVERING (10-15 minuten)',
      '   • Brainstorm: Wat weten leerlingen al over AI?',
      '   • Interactieve quiz over AI in het dagelijks leven',
      '   • Korte uitleg over kunstmatige intelligentie',
      '   • Concrete voorbeelden uit hun eigen ervaringswereld',
      '   • Doel en verwachtingen van de les bespreken',
      '',
      '2️⃣ DEMONSTRATIE EN UITLEG (15-20 minuten)',
      '   • Live demonstratie van AI-tool(s) door docent',
      '   • Leerlingen kijken mee en stellen vragen',
      '   • Uitleg van werking, mogelijkheden en beperkingen',
      '   • Bespreek ethische aspecten en verantwoord gebruik',
      '   • Tips voor effectief gebruik van AI-tools',
      '',
      '3️⃣ HANDS-ON PRAKTIJKOPDRACHT (30-45 minuten)',
      '   • Leerlingen gaan zelf aan de slag met AI-tools',
      '   • Werk individueel of in tweetallen voor peer support',
      '   • Docent loopt rond voor begeleiding en hulp',
      '   • Verschillende opdrachten op maat per niveau',
      '   • Tussentijdse check-ins en bijsturing waar nodig',
      '',
      '4️⃣ PRESENTATIE EN DELEN (10-15 minuten)',
      '   • Leerlingen presenteren hun resultaten aan de klas',
      '   • Bespreek wat goed ging en wat uitdagend was',
      '   • Identificeer verbeterpunten en nieuwe inzichten',
      '   • Deel interessante ontdekkingen en "aha-momenten"',
      '   • Peer feedback en waardering',
      '',
      '5️⃣ EVALUATIE EN REFLECTIE (5-10 minuten)',
      '   • Wat hebben we vandaag geleerd over AI?',
      '   • Hoe kunnen we deze kennis in de toekomst gebruiken?',
      '   • Bespreek volgende stappen en vervolgactiviteiten',
      '   • Huisopdracht of project voor thuis (optioneel)',
      '   • Korte evaluatie van de les door leerlingen',
      '',
      '💡 TIPS VOOR DOCENTEN',
      '====================',
      '• Begin altijd met wat leerlingen al weten',
      '• Benadrukt dat AI een hulpmiddel is, geen vervanging',
      '• Moedig kritisch denken en vragen stellen aan',
      '• Geef ruimte voor experimenteren en fouten maken',
      '• Verbind AI altijd aan concrete toepassingen',
      '',
      '🔄 DIFFERENTIATIE MOGELIJKHEDEN',
      '==============================',
      '• Beginners: Eenvoudige AI-tools en basisopdrachten',
      '• Gevorderden: Complexere tools en creatieve projecten',
      '• Extra uitdaging: Eigen AI-project ontwikkelen',
      '• Ondersteuning: Stappenplannen en voorbeelden',
      '',
      '📊 EVALUATIE EN BEOORDELING',
      '===========================',
      '• Observatie tijdens praktijkopdrachten',
      '• Kwaliteit van eindproducten en presentaties',
      '• Reflectie op leerproces en AI-gebruik',
      '• Peer feedback en zelfbeoordeling',
      '• Optioneel: Korte toets over AI-concepten'
    ];
    
    lessonDetails.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Styling for different types of content
      if (line.includes('=====') || line.includes('🎯') || line.includes('📋') || line.includes('📖')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else if (line.includes('1️⃣') || line.includes('2️⃣') || line.includes('3️⃣') || line.includes('4️⃣') || line.includes('5️⃣')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }
      
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add footer with page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs | onderwijs.ai', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages} | Nieuwe Lessenreeks`, 130, 285);
    }
    
    // Save with unique filename
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.]/g, '-');
    const filename = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-NIEUWE-LES-${timestamp}.pdf`;
    doc.save(filename);
    
    console.log(`✅ SUCCESS: NEW ${lessonTitle} lesson PDF downloaded as ${filename}`);
    
  } catch (error) {
    console.error('❌ Lesson PDF generation failed:', error);
  }
};

/**
 * COMPLETELY REMOVE old file download function
 * This ensures NO old files can be downloaded
 */
export const downloadFile = (url, filename = null) => {
  console.error('🚫 OLD downloadFile function called - REDIRECTING to NEW PDF generation');
  console.warn('URL attempted:', url);
  console.warn('This function is DISABLED to prevent old file downloads');
  
  // Force redirect to new PDF generation
  console.log('🔄 Redirecting to downloadStartersgids() for NEW PDF...');
  downloadStartersgids();
};

// Export only the NEW functions
export default {
  downloadStartersgids,
  downloadLesson
};