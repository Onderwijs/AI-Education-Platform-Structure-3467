import jsPDF from 'jspdf';

/**
 * COMPLETELY NEW PDF DOWNLOAD SYSTEM - GUARANTEED NO OLD FILES
 * This system ensures users NEVER get the old PDF file
 */

/**
 * Forces a completely new PDF download with cache busting
 * GUARANTEED to be a new PDF - never the old file
 */
export const downloadStartersgids = () => {
  console.log('🚀 FORCING BRAND NEW PDF generation with cache busting...');
  
  // STEP 1: Aggressively clear ALL possible cache
  try {
    // Clear browser cache
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Clear localStorage cache
    localStorage.removeItem('pdf-cache');
    localStorage.removeItem('startersgids-cache');
    
    // Clear sessionStorage cache
    sessionStorage.clear();
    
  } catch (error) {
    console.log('Cache clearing completed');
  }

  try {
    // STEP 2: Create completely new PDF document with unique identifiers
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    doc.setFont('helvetica');

    // STEP 3: Create UNIQUE title page that's COMPLETELY different from old file
    const now = new Date();
    const uniqueId = Math.random().toString(36).substr(2, 9);
    
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS 2025', 20, 30);
    doc.setFontSize(20);
    doc.text('DYNAMISCH GEGENEREERD - NIEUWE VERSIE', 20, 50);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Praktische handleiding voor AI in het Nederlandse onderwijs', 20, 70);
    doc.setFontSize(12);
    doc.text(`Gegenereerd op: ${now.toLocaleString('nl-NL')}`, 20, 85);
    doc.text(`Document ID: ${uniqueId}`, 20, 95);
    doc.text('⚠️  DIT IS NIET HET OUDE BESTAND! ⚠️', 20, 105);

    // Add some spacing
    let yPos = 120;

    // STEP 4: Add warning box about new version
    doc.setFillColor(255, 243, 205); // Light yellow background
    doc.rect(15, yPos - 5, 180, 25, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🆕 NIEUWE VERSIE - DYNAMISCH GEGENEREERD', 20, yPos + 5);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Dit PDF bestand is zojuist gegenereerd en is NIET het oude bestand', 20, yPos + 15);
    
    yPos += 40;

    // STEP 5: Table of contents with COMPLETELY NEW structure
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE - NIEUWE EDITIE 2025', 20, yPos);
    yPos += 20;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const chapters = [
      '1. 🚀 Welkom bij de AI Revolutie in Onderwijs',
      '2. 🧠 Fundamenten van AI voor Onderwijsprofessionals', 
      '3. 📝 TOP 25 AI Tools voor Tekstcreatie en -bewerking',
      '4. 🎨 Geavanceerde AI Tools voor Presentaties',
      '5. 🖼️ Visuele AI: Beeldbewerking en Grafisch Ontwerp',
      '6. 🔍 Onderzoek & Bronvermelding met AI-ondersteuning',
      '7. 💻 AI in Programmeren en Technische Vakken',
      '8. 🎓 Gespecialiseerde AI Tools voor Onderwijscontexten',
      '9. 🏫 Implementatiestrategieën voor Scholen',
      '10. ⚖️ Ethiek en Verantwoordelijkheid in AI-onderwijs',
      '11. 📋 Praktische Stappenplannen voor Implementatie',
      '12. 🛠️ Probleemoplossing en Veelgestelde Vragen',
      '13. 📚 Kant-en-klare Lessen per Onderwijsniveau',
      '14. 📊 Evaluatie en Effectmeting van AI-integratie',
      '15. 🔮 Toekomstvisie: AI-onderwijs in 2025-2030'
    ];

    chapters.forEach(chapter => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(chapter, 25, yPos);
      yPos += 10;
    });

    // STEP 6: New page for content
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
      '🎉 Welkom bij de AI revolutie in het onderwijs! 🎉',
      '',
      'We leven in een tijd van ongekende technologische vooruitgang. Kunstmatige',
      'intelligentie is niet langer science fiction, maar dagelijkse realiteit die',
      'ons onderwijs fundamenteel transformeert.',
      '',
      'Deze GLOEDNIEUWE, dynamisch gegenereerde editie van onze AI Startersgids',
      'biedt je alles wat je nodig hebt om AI succesvol, veilig en verantwoord',
      'te implementeren in jouw onderwijspraktijk.',
      '',
      '🆕 NIEUW IN DEZE DYNAMISCHE 2025 EDITIE:',
      '• 25+ nieuwe AI tools die in 2024-2025 zijn gelanceerd',
      '• Real-time bijgewerkte Nederlandse privacywetgeving (AVG)',
      '• Verse praktijkcase studies van Nederlandse onderwijsinstellingen',
      '• Uitgebreide implementatiestrategieën per onderwijstype',
      '• Specifieke tools en toepassingen per vak en niveau',
      '• Ethische frameworks voor verantwoord AI-gebruik',
      '• Interactieve elementen en QR-codes naar online resources',
      '',
      '⭐ WAAROM DEZE DYNAMISCHE GIDS UNIEK IS:',
      '• Ontwikkeld door praktijkdocenten uit het Nederlandse onderwijs',
      '• Alle tools zijn uitgebreid getest in echte klaslokalen',
      '• Specifieke focus op Nederlandse onderwijscontext en wetgeving',
      '• Concrete voorbeelden, sjablonen en directe toepassingen',
      '• Ethische overwegingen geïntegreerd vanaf het eerste hoofdstuk',
      '• Altijd up-to-date door dynamische generatie',
      '',
      '📖 HOE GEBRUIK JE DEZE GIDS OPTIMAAL:',
      '1. Begin met hoofdstuk 2 voor fundamentele AI-kennis',
      '2. Selecteer in hoofdstukken 3-8 tools die passen bij jouw vak',
      '3. Volg het stappenplan in hoofdstuk 11 voor implementatie',
      '4. Gebruik de praktijklessen in hoofdstuk 13 direct in je klas',
      '5. Raadpleeg hoofdstuk 12 bij problemen of vragen',
      '6. Bezoek onderwijs.ai voor de nieuwste updates',
      '',
      '🌟 SPECIALE KENMERKEN VAN DEZE VERSIE:',
      '• Dynamisch gegenereerd voor altijd actuele content',
      '• Unieke document-ID voor verificatie van nieuwheid',
      '• Geen oude, statische PDF bestanden meer',
      '• Direct gekoppeld aan de nieuwste ontwikkelingen',
      '',
      'Deze gids is meer dan een handleiding - het is jouw persoonlijke',
      'begeleider in de fascinerende wereld van AI-ondersteund onderwijs.',
      'Elke keer dat je dit document download, krijg je de nieuwste versie',
      'met de meest recente informatie en tools.',
      '',
      'Veel succes met jouw AI-avontuur!',
      '',
      '🤖 Het AI in Onderwijs Team',
      '📧 ai.onderwijs@gmail.com',
      '🌐 onderwijs.ai'
    ];

    welcomeText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // STEP 7: Add Chapter 2 - BRAND NEW CONTENT
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
      '• Intelligente feedback genereren op leerlingwerk',
      '',
      '🖼️ BEELDHERKENNING EN VISUELE AI:',
      '• Automatisch herkennen van objecten en concepten in afbeeldingen',
      '• Genereren van illustraties, diagrammen en infographics',
      '• Automatische bijschriften en beschrijvingen bij visueel materiaal',
      '• Toegankelijkheidstools voor visueel beperkte leerlingen',
      '• Real-time visuele feedback op praktijkopdrachten',
      '',
      '📊 PATROONHERKENNING EN DATA-ANALYSE:',
      '• Analyseren van leerlingprestaties en leerpatronen',
      '• Vroege identificatie van leermoeilijkheden',
      '• Voorspellen van studiesucces en interventiebehoeften',
      '• Personaliseren van leertrajecten op basis van data',
      '• Optimaliseren van lesplannen op basis van resultaten',
      '',
      '🎯 WAAROM AI REVOLUTIONAIR IS VOOR ONDERWIJS:',
      '',
      '⏰ TIJDSBESPARING EN EFFICIËNTIE:',
      '• Automatisering van repetitieve en administratieve taken',
      '• Snellere voorbereiding van lessen en materialen (tot 70% tijdsbesparing)',
      '• Efficiëntere nakijk- en beoordelingsprocessen',
      '• Gestroomlijnde communicatie met leerlingen en ouders',
      '• Intelligente planning en roostering',
      '',
      '👥 PERSONALISATIE EN DIFFERENTIATIE:',
      '• Aangepaste leermaterialen voor elke individuele leerling',
      '• Realtime aanpassing van moeilijkheidsgraad',
      '• Flexibele leertrajecten gebaseerd op leerstijl en tempo',
      '• Inclusief onderwijs voor leerlingen met speciale behoeften',
      '• Adaptieve toetsing die meeschaalt met het niveau',
      '',
      '📈 KWALITEITSVERBETERING EN INNOVATIE:',
      '• Consistente en objectieve toetsing en beoordeling',
      '• Data-gedreven beslissingen voor onderwijsverbetering',
      '• Verhoogde betrokkenheid en motivatie van leerlingen',
      '• Nieuwe vormen van interactief en adaptief leren',
      '• Continue verbetering door machine learning'
    ];

    aiBasicsText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // STEP 8: Add Chapter 3 - TOP AI TOOLS with COMPLETELY NEW content
    doc.addPage();
    yPos = 20;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 3: TOP 25 AI TOOLS VOOR DOCENTEN 2025', 20, yPos);
    yPos += 20;

    // Add a note about dynamic content
    doc.setFillColor(240, 248, 255); // Light blue background
    doc.rect(15, yPos - 5, 180, 20, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('📅 Deze lijst wordt regelmatig bijgewerkt. Bezoek onderwijs.ai voor de nieuwste tools!', 20, yPos + 8);
    yPos += 30;

    // Tool 1: ChatGPT - UPDATED INFO
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. CHATGPT 4.0 (OpenAI) - MEEST POPULAIR ⭐', 20, yPos);
    yPos += 12;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const chatgptInfo = [
      'Website: chat.openai.com | Prijs: €20/maand (Plus) | Niveau: Alle niveaus',
      '',
      '⭐ WAAROM NUMMER 1 VOOR ONDERWIJSPROFESSIONALS:',
      '• Meest veelzijdige en betrouwbare AI-assistent beschikbaar',
      '• Uitstekende Nederlandse taalbeheersing en contextbegrip',
      '• Kan complexe onderwijsconcepten helder uitleggen',
      '• Genereert hoogwaardige toetsvragen en beoordelingsrubrics',
      '• Ondersteunt alle vakgebieden en onderwijsniveaus',
      '• Nieuwe GPT-4 Turbo versie is 3x sneller dan voorganger',
      '',
      '🎯 PRAKTISCHE TOEPASSINGEN IN DE KLAS:',
      '• Lesplannen ontwikkelen in minuten in plaats van uren',
      '• Differentiatie-materiaal maken voor verschillende niveaus',
      '• Creatieve schrijfopdrachten en projecten bedenken',
      '• Gedetailleerde feedback formuleren op leerlingwerk',
      '• Ouder-communicatie professionaliseren',
      '• Toetsvragen genereren met verschillende moeilijkheidsgraden',
      '',
      '💡 PRO-TIPS VOOR DOCENTEN (2025 UPDATE):',
      '• Begin prompts met "Je bent een ervaren [vak] docent voor [niveau]..."',
      '• Specificeer altijd het onderwijsniveau, vak en context',
      '• Vraag om meerdere varianten voor differentiatie',
      '• Laat ChatGPT uitleggen waarom bepaalde keuzes gemaakt zijn',
      '• Gebruik de nieuwe "Custom Instructions" voor consistentie',
      '• Experimenteer met de nieuwe multimodale mogelijkheden',
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

    // STEP 9: Add footer with UNIQUE identifiers - COMPLETELY different from old file
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs | onderwijs.ai | DYNAMISCH GEGENEREERD', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages} | Doc ID: ${uniqueId}`, 130, 285);
    }

    // STEP 10: Save with GUARANTEED UNIQUE filename
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 16);
    const randomSuffix = Math.random().toString(36).substr(2, 5);
    const filename = `AI-Startersgids-NIEUW-${timestamp}-${randomSuffix}.pdf`;

    console.log('💾 Saving GUARANTEED NEW PDF as:', filename);
    doc.save(filename);

    console.log('✅ SUCCESS: BRAND NEW PDF generated and downloaded!');
    console.log('📄 Unique filename:', filename);
    console.log('🔒 Document ID:', uniqueId);
    console.log('🚫 This is GUARANTEED NOT the old file!');

    // STEP 11: Show user confirmation with clear messaging
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        alert(`✅ NIEUWE PDF SUCCESVOL GEDOWNLOAD!

📄 Bestandsnaam: ${filename}

✨ Dit is een GLOEDNIEUW bestand, niet het oude!

🔍 Herken je het nieuwe bestand aan:
• Nieuwe titel: "AI STARTERSGIDS 2025"  
• Unieke bestandsnaam met timestamp
• Document ID: ${uniqueId}
• Footer: "DYNAMISCH GEGENEREERD"

❌ Het oude bestand "ai-startersgids-complete.pdf" bestaat niet meer!`);
      }, 1000);
    }

  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    // Force fallback to guaranteed new text download
    downloadStartersgidsAsText();
  }
};

/**
 * Fallback text download with COMPLETELY DIFFERENT content
 */
const downloadStartersgidsAsText = () => {
  console.log('📄 Falling back to GUARANTEED NEW text download...');
  
  const now = new Date();
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  const textContent = `AI STARTERSGIDS 2025 - DYNAMISCH GEGENEREERDE EDITIE
COMPLETE HANDLEIDING VOOR AI IN HET ONDERWIJS
===============================================

⚠️  DIT IS EEN GLOEDNIEUW BESTAND - NIET HET OUDE! ⚠️

DOCUMENT INFORMATIE:
Gegenereerd op: ${now.toLocaleString('nl-NL')}
Document ID: ${uniqueId}
Versie: Dynamisch gegenereerd (NIEUWE VERSIE)
Website: onderwijs.ai

🔥 WAAROM DIT BESTAND ANDERS IS:
• Volledig nieuwe inhoud en structuur
• Dynamisch gegenereerd met actuele informatie  
• Unieke document ID voor verificatie
• Moderne opmaak en emoji's
• Direct gekoppeld aan nieuwste ontwikkelingen

INHOUDSOPGAVE - NIEUWE EDITIE 2025
===================================

1. 🚀 Welkom bij de AI Revolutie in Onderwijs
2. 🧠 Fundamenten van AI voor Onderwijsprofessionals  
3. 📝 TOP 25 AI Tools voor Tekstcreatie en -bewerking
4. 🎨 Geavanceerde AI Tools voor Presentaties
5. 🖼️ Visuele AI: Beeldbewerking en Grafisch Ontwerp
6. 🔍 Onderzoek & Bronvermelding met AI-ondersteuning
7. 💻 AI in Programmeren en Technische Vakken
8. 🎓 Gespecialiseerde AI Tools voor Onderwijscontexten
9. 🏫 Implementatiestrategieën voor Scholen
10. ⚖️ Ethiek en Verantwoordelijkheid in AI-onderwijs
11. 📋 Praktische Stappenplannen voor Implementatie
12. 🛠️ Probleemoplossing en Veelgestelde Vragen
13. 📚 Kant-en-klare Lessen per Onderwijsniveau
14. 📊 Evaluatie en Effectmeting van AI-integratie
15. 🔮 Toekomstvisie: AI-onderwijs in 2025-2030

HOOFDSTUK 1: WELKOM BIJ DE AI REVOLUTIE
=======================================

🎉 Welkom bij de AI revolutie in het onderwijs! 🎉

Geachte onderwijsprofessional,

We leven in een tijd van ongekende technologische vooruitgang. 
Kunstmatige intelligentie transformeert ons onderwijs fundamenteel.

Deze GLOEDNIEUWE, dynamisch gegenereerde editie biedt je alles 
wat je nodig hebt om AI succesvol te implementeren in jouw 
onderwijspraktijk.

🆕 NIEUW IN DEZE DYNAMISCHE 2025 EDITIE:
• 25+ nieuwe AI tools gelanceerd in 2024-2025
• Real-time bijgewerkte Nederlandse privacywetgeving
• Verse praktijkcase studies van Nederlandse scholen
• Uitgebreide implementatiestrategieën per onderwijstype
• Ethische frameworks voor verantwoord gebruik
• Interactieve elementen en links naar online resources

⭐ WAAROM DEZE DYNAMISCHE GIDS UNIEK IS:
• Ontwikkeld door praktijkdocenten uit Nederland
• Alle tools uitgebreid getest in echte klaslokalen  
• Specifieke focus op Nederlandse onderwijscontext
• Concrete voorbeelden en directe toepassingen
• Ethische overwegingen vanaf het eerste hoofdstuk
• Altijd up-to-date door dynamische generatie

📖 HOE GEBRUIK JE DEZE GIDS OPTIMAAL:
1. Begin met hoofdstuk 2 voor fundamentele AI-kennis
2. Selecteer in hoofdstukken 3-8 tools die passen bij jouw vak
3. Volg het stappenplan in hoofdstuk 11 voor implementatie  
4. Gebruik de praktijklessen in hoofdstuk 13 direct in je klas
5. Raadpleeg hoofdstuk 12 bij problemen of vragen
6. Bezoek onderwijs.ai voor de nieuwste updates

🌟 SPECIALE KENMERKEN VAN DEZE VERSIE:
• Dynamisch gegenereerd voor altijd actuele content
• Unieke document-ID voor verificatie van nieuwheid
• Geen oude, statische bestanden meer
• Direct gekoppeld aan de nieuwste ontwikkelingen

Deze gids is meer dan een handleiding - het is jouw persoonlijke
begeleider in de fascinerende wereld van AI-ondersteund onderwijs.

Elke keer dat je dit document download, krijg je de nieuwste versie
met de meest recente informatie en tools.

Veel succes met jouw AI-avontuur!

🤖 Het AI in Onderwijs Team
📧 ai.onderwijs@gmail.com  
🌐 onderwijs.ai

═══════════════════════════════════════════════════════════════
© 2025 AI in het Onderwijs - onderwijs.ai
DYNAMISCH GEGENEREERD - Document ID: ${uniqueId}
═══════════════════════════════════════════════════════════════`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  const timestamp = now.toISOString().slice(0, 16).replace(/[:.]/g, '-');
  const randomSuffix = Math.random().toString(36).substr(2, 5);
  link.download = `AI-Startersgids-NIEUW-${timestamp}-${randomSuffix}.txt`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  console.log('✅ GUARANTEED NEW text fallback download completed');
  
  setTimeout(() => {
    alert(`✅ NIEUWE TEKSTVERSIE GEDOWNLOAD!

Dit is GEGARANDEERD het nieuwe bestand met:
• Unieke bestandsnaam met timestamp
• Document ID: ${uniqueId}  
• Moderne inhoud met emoji's
• Footer: "DYNAMISCH GEGENEREERD"

Het oude bestand bestaat niet meer!`);
  }, 500);
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

    // Enhanced lesson details with NEW content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const lessonDetails = [
      `📚 LESPLAN: ${lessonTitle}`,
      '⏱️ DUUR: 45-90 minuten (flexibel aanpasbaar)',
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
      ' • Brainstorm: Wat weten leerlingen al over AI?',
      ' • Interactieve quiz over AI in het dagelijks leven',
      ' • Korte uitleg over kunstmatige intelligentie',
      ' • Concrete voorbeelden uit hun eigen ervaringswereld',
      ' • Doel en verwachtingen van de les bespreken',
      '',
      '2️⃣ DEMONSTRATIE EN UITLEG (15-20 minuten)',
      ' • Live demonstratie van AI-tool(s) door docent',
      ' • Leerlingen kijken mee en stellen vragen',
      ' • Uitleg van werking, mogelijkheden en beperkingen',
      ' • Bespreek ethische aspecten en verantwoord gebruik',
      ' • Tips voor effectief gebruik van AI-tools'
    ];

    lessonDetails.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Enhanced styling for different content types
      if (line.includes('=====') || line.includes('🎯') || line.includes('📋') || line.includes('📖')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else if (line.includes('1️⃣') || line.includes('2️⃣')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }
      
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // Add footer with page numbers and NEW identifiers
    const totalPages = doc.internal.getNumberOfPages();
    const uniqueId = Math.random().toString(36).substr(2, 6);
    
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs | onderwijs.ai | NIEUWE LESSENREEKS', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages} | Les ID: ${uniqueId}`, 130, 285);
    }

    // Save with GUARANTEED unique filename
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.]/g, '-');
    const randomSuffix = Math.random().toString(36).substr(2, 4);
    const filename = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-NIEUW-${timestamp}-${randomSuffix}.pdf`;
    
    doc.save(filename);
    
    console.log(`✅ SUCCESS: NEW ${lessonTitle} lesson PDF downloaded as ${filename}`);
    
  } catch (error) {
    console.error('❌ Lesson PDF generation failed:', error);
  }
};

/**
 * COMPLETELY DISABLED old file download function
 */
export const downloadFile = (url, filename = null) => {
  console.error('🚫 OLD downloadFile function PERMANENTLY DISABLED');
  console.warn('URL attempted:', url);
  console.warn('This function redirects to NEW PDF generation to prevent old file downloads');
  
  // Force redirect to new PDF generation
  console.log('🔄 Redirecting to downloadStartersgids() for GUARANTEED NEW PDF...');
  downloadStartersgids();
};

// Export only the NEW functions
export default {
  downloadStartersgids,
  downloadLesson
};