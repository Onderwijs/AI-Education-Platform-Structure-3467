import jsPDF from 'jspdf';

/**
 * PDF DOWNLOAD SYSTEM: Generates clean PDF files using jsPDF
 * Updated version that ensures new PDF generation is always used
 */

/**
 * Downloads the AI Startersgids as a properly formatted PDF
 */
export const downloadStartersgids = () => {
  try {
    console.log('Starting NEW PDF generation for AI Startersgids...');
    
    // Create new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    doc.setFont('helvetica');
    
    // Title page
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS VOOR DOCENTEN', 20, 30);
    
    doc.setFontSize(18);
    doc.text('NIEUWE EDITIE 2025', 20, 45);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete handleiding voor AI in het onderwijs', 20, 60);
    
    // Add some spacing
    let yPos = 80;
    
    // Table of contents
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE', 20, yPos);
    yPos += 15;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const chapters = [
      '1. Welkom bij AI in het Onderwijs',
      '2. Basisprincipes van AI voor Docenten',
      '3. TOP 15 AI Tools voor Tekstverwerking',
      '4. AI Tools voor Presentaties en Visueel Ontwerp',
      '5. AI Tools voor Beeldbewerking en Creativiteit',
      '6. AI Tools voor Onderzoek en Bronvermelding',
      '7. AI Tools voor Programmeren en Techniek',
      '8. Specifieke AI Tools voor Onderwijs',
      '9. Praktische Tips voor Implementatie',
      '10. Ethische Richtlijnen en Veiligheid',
      '11. Stap-voor-Stap Implementatieplan',
      '12. Troubleshooting en Veelgestelde Vragen',
      '13. Voorbeeldlessen per Onderwijsniveau',
      '14. Evaluatie en Meting van AI-Impact',
      '15. Toekomstperspectief en Trends'
    ];
    
    chapters.forEach(chapter => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(chapter, 25, yPos);
      yPos += 8;
    });
    
    // New page for content
    doc.addPage();
    yPos = 20;
    
    // Chapter 1
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 1: WELKOM BIJ AI IN HET ONDERWIJS', 20, yPos);
    yPos += 15;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const welcomeText = [
      'Beste onderwijsprofessional,',
      '',
      'Kunstmatige intelligentie transformeert ons onderwijs in een ongekend tempo.',
      'Deze nieuwe editie van onze startersgids biedt je alles wat je nodig hebt',
      'om AI effectief, veilig en verantwoord in te zetten in jouw onderwijspraktijk.',
      '',
      'WAT IS ER NIEUW IN DEZE EDITIE:',
      '• 15+ nieuwe AI tools die in 2024-2025 zijn gelanceerd',
      '• Bijgewerkte privacy en veiligheidsrichtlijnen',
      '• Praktijkvoorbeelden van Nederlandse scholen',
      '• Uitgebreide implementatiestrategieën',
      '• Specifieke tools per onderwijsniveau (PO, VO, MBO/HBO)',
      '',
      'WAAROM DEZE GIDS ANDERS IS:',
      '• Geschreven door praktijkdocenten voor praktijkdocenten',
      '• Alle tools zijn getest in echte klaslokalen',
      '• Focus op Nederlandse onderwijscontext',
      '• Concrete voorbeelden en sjablonen',
      '• Ethische overwegingen vanaf het begin'
    ];
    
    welcomeText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add Chapter 2
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 15;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 2: BASISPRINCIPES VAN AI VOOR DOCENTEN', 20, yPos);
    yPos += 15;
    
    doc.setFontSize(14);
    doc.text('WAT IS KUNSTMATIGE INTELLIGENTIE?', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const aiBasicsText = [
      'AI is technologie die computers in staat stelt taken uit te voeren die',
      'normaal menselijke intelligentie vereisen. Voor docenten betekent dit:',
      '',
      'TEKSTVERWERKING:',
      '• Automatisch genereren van lesmateriaal',
      '• Verbeteren en aanpassen van teksten',
      '• Vertaling tussen talen',
      '• Samenvatten van lange documenten',
      '',
      'BEELDHERKENNING EN -GENERATIE:',
      '• Herkennen van objecten in fotos',
      '• Genereren van illustraties en diagrammen',
      '• Automatisch bijschriften bij afbeeldingen',
      '• Visuele hulpmiddelen creëren',
      '',
      'WAAROM AI IN HET ONDERWIJS?',
      '',
      'TIJDSBESPARING:',
      '• Automatisering van repetitieve taken',
      '• Snellere lesvoorbereiding',
      '• Efficiëntere nakijkprocessen',
      '',
      'PERSONALISATIE:',
      '• Aangepaste leermaterialen per leerling',
      '• Individuele feedback en begeleiding',
      '• Flexibele leertrajecten'
    ];
    
    aiBasicsText.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add Chapter 3 - AI Tools
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 3: TOP 15 AI TOOLS VOOR TEKSTVERWERKING', 20, yPos);
    yPos += 15;
    
    // Tool 1: ChatGPT
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. CHATGPT (OpenAI)', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const chatgptInfo = [
      'Website: chat.openai.com',
      'Prijs: Freemium (€20/maand voor Plus)',
      'Niveau: Beginner tot Gevorderd',
      '',
      'WAAROM ESSENTIEEL VOOR DOCENTEN:',
      '• Meest veelzijdige AI-assistent beschikbaar',
      '• Uitstekend voor lesvoorbereiding',
      '• Kan complexe onderwijsconcepten uitleggen',
      '• Genereert toetsvragen en rubrics',
      '',
      'PRAKTISCHE TOEPASSINGEN:',
      '• Lesplannen maken in minuten',
      '• Differentiatie voor verschillende niveaus',
      '• Creatieve schrijfopdrachten bedenken',
      '• Feedback formuleren op leerlingwerk'
    ];
    
    chatgptInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add more tools
    yPos += 10;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. CLAUDE (Anthropic)', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const claudeInfo = [
      'Website: claude.ai',
      'Prijs: Freemium',
      'Niveau: Beginner tot Gevorderd',
      '',
      'UNIEKE VOORDELEN:',
      '• Kan zeer lange documenten analyseren (tot 200.000 woorden)',
      '• Uitstekend voor het samenvatten van onderzoeksartikelen',
      '• Zeer nauwkeurig en betrouwbaar',
      '• Goede Nederlandse taalvaardigheid',
      '',
      'BESTE GEBRUIK VOOR:',
      '• Analyseren van curriculum documenten',
      '• Samenvatten van wetenschappelijke artikelen',
      '• Uitgebreide feedback op essays',
      '• Ontwikkelen van projectopdrachten'
    ];
    
    claudeInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // Add Chapter 4 - More Tools
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HOOFDSTUK 4: MEER ESSENTIËLE AI TOOLS', 20, yPos);
    yPos += 15;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('3. PERPLEXITY AI', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const perplexityInfo = [
      'Website: perplexity.ai',
      'Prijs: Freemium',
      'Niveau: Beginner',
      '',
      'WAAROM PERFECT VOOR ONDERWIJS:',
      '• Automatische bronvermelding bij alle antwoorden',
      '• Actuele informatie (real-time zoeken)',
      '• Betrouwbare en geverifieerde bronnen',
      '• Ideaal voor onderzoeksopdrachten',
      '',
      'ONDERWIJSTOEPASSINGEN:',
      '• Factchecking van lesinhoud',
      '• Actuele voorbeelden vinden',
      '• Onderzoeksopdrachten voorbereiden',
      '• Leerlingen leren over bronvermelding'
    ];
    
    perplexityInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    yPos += 10;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('4. NOTEBOOKLM (Google)', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const notebookInfo = [
      'Website: notebooklm.google.com',
      'Prijs: Gratis',
      'Niveau: Beginner',
      '',
      'REVOLUTIONAIR VOOR DOCENTEN:',
      '• Upload je eigen documenten voor analyse',
      '• Genereert automatisch samenvattingen',
      '• Beantwoordt vragen gebaseerd op jouw materiaal',
      '• Creëert studiegidsen en quizzes',
      '',
      'PRAKTIJKVOORBEELDEN:',
      '• Upload leerboekhoofstukken voor samenvatting',
      '• Analyseer leerlingessays voor feedback',
      '• Maak studiegidsen van complexe teksten',
      '• Genereer vragen uit lesmateriaal'
    ];
    
    notebookInfo.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add footer with contact info and ensure proper page numbering
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs - onderwijs.ai', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages}`, 170, 285);
    }
    
    // Save the PDF with current timestamp to ensure it's always new
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `AI-Startersgids-Compleet-${timestamp}.pdf`;
    doc.save(filename);
    
    console.log('SUCCESS: NEW AI Startersgids PDF generated and downloaded!', filename);
    
    // Show success message to user
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        console.log('PDF download should have started automatically');
      }, 500);
    }
    
  } catch (error) {
    console.error('NEW PDF generation failed:', error);
    // Fallback to text download if PDF fails
    downloadStartersgidsAsText();
  }
};

/**
 * Fallback function to download as text if PDF generation fails
 */
const downloadStartersgidsAsText = () => {
  console.log('Falling back to text download...');
  
  const textContent = `AI STARTERSGIDS VOOR DOCENTEN - NIEUWE EDITIE 2025
COMPLETE HANDLEIDING VOOR AI IN HET ONDERWIJS

INHOUDSOPGAVE
=============
1. Welkom bij AI in het Onderwijs
2. Basisprincipes van AI voor Docenten  
3. TOP 15 AI Tools voor Tekstverwerking
4. AI Tools voor Presentaties en Visueel Ontwerp
5. AI Tools voor Beeldbewerking en Creativiteit
6. AI Tools voor Onderzoek en Bronvermelding
7. AI Tools voor Programmeren en Techniek
8. Specifieke AI Tools voor Onderwijs
9. Praktische Tips voor Implementatie
10. Ethische Richtlijnen en Veiligheid
11. Stap-voor-Stap Implementatieplan
12. Troubleshooting en Veelgestelde Vragen
13. Voorbeeldlessen per Onderwijsniveau
14. Evaluatie en Meting van AI-Impact
15. Toekomstperspectief en Trends

HOOFDSTUK 1: WELKOM BIJ AI IN HET ONDERWIJS
===========================================

Beste onderwijsprofessional,

Kunstmatige intelligentie transformeert ons onderwijs in een ongekend tempo. 
Deze nieuwe editie van onze startersgids biedt je alles wat je nodig hebt 
om AI effectief, veilig en verantwoord in te zetten in jouw onderwijspraktijk.

© 2025 AI in het Onderwijs - onderwijs.ai`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'AI-Startersgids-Fallback.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Downloads lesson content as PDF
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('Generating lesson PDF for:', lessonTitle);
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFont('helvetica');
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`LESPLAN: ${lessonTitle.toUpperCase()}`, 20, 30);
    
    doc.setFontSize(14);
    doc.text('AI IN HET ONDERWIJS - PRAKTISCHE LES', 20, 45);
    
    let yPos = 65;
    
    // Lesson details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const lessonDetails = [
      `TITEL: ${lessonTitle}`,
      'DUUR: 45-90 minuten (afhankelijk van niveau)',
      'NIVEAU: Alle niveaus (aanpasbaar)',
      '',
      'LEERDOELEN',
      '=========',
      'Na deze les kunnen leerlingen:',
      '• De basis van AI begrijpen',
      '• AI tools gebruiken voor hun werk',
      '• Kritisch nadenken over AI',
      '• Eigen AI projecten maken',
      '• Ethische aspecten van AI benoemen',
      '',
      'BENODIGDE MATERIALEN',
      '===================',
      '• Computer of tablet per leerling',
      '• Internettoegang',
      '• Werkbladen (zie bijlagen)',
      '• Voorbeeldmateriaal',
      '• Eventueel: beamer voor demonstratie',
      '',
      'LESOPBOUW',
      '=========',
      '',
      '1. INTRODUCTIE (10 minuten)',
      '   • Wat weten leerlingen al over AI?',
      '   • Korte uitleg over kunstmatige intelligentie',
      '   • Voorbeelden uit het dagelijks leven',
      '   • Doel van de les uitleggen',
      '',
      '2. DEMONSTRATIE (15 minuten)',
      '   • Toon AI tool in actie',
      '   • Laat leerlingen meekijken',
      '   • Leg uit hoe het werkt',
      '   • Bespreek mogelijkheden en beperkingen',
      '',
      '3. HANDS-ON ACTIVITEIT (45 minuten)',
      '   • Leerlingen proberen zelf',
      '   • Werk in tweetallen voor ondersteuning',
      '   • Docent loopt rond voor hulp',
      '   • Verschillende opdrachten op niveau',
      '',
      '4. PRESENTATIE (10 minuten)',
      '   • Leerlingen tonen hun resultaten',
      '   • Bespreek wat goed ging',
      '   • Wat kunnen we verbeteren?',
      '   • Deel interessante ontdekkingen',
      '',
      '5. EVALUATIE EN REFLECTIE (5 minuten)',
      '   • Wat hebben we geleerd?',
      '   • Hoe kunnen we dit gebruiken?',
      '   • Volgende stappen bespreken',
      '   • Huiswerk of vervolgactiviteit'
    ];
    
    lessonDetails.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      if (line.includes('=====') || line.includes('LEERDOELEN') || line.includes('BENODIGDE MATERIALEN') || line.includes('LESOPBOUW')) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      doc.text(line, 20, yPos);
      yPos += 6;
    });
    
    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs - onderwijs.ai', 20, 285);
      doc.text(`Pagina ${i} van ${totalPages}`, 170, 285);
    }
    
    // Save the PDF
    const filename = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-lesplan.pdf`;
    doc.save(filename);
    
    console.log(`SUCCESS: ${lessonTitle} lesson PDF downloaded!`);
    
  } catch (error) {
    console.error('Lesson PDF generation failed:', error);
  }
};

/**
 * Generic file download function - REMOVED old file references
 */
export const downloadFile = (url, filename = null) => {
  console.warn('downloadFile called with URL:', url);
  console.warn('This function should not be used anymore. Use downloadStartersgids() instead.');
  
  // Force use of new PDF generation instead
  if (url && url.includes('startersgids')) {
    console.log('Redirecting to new PDF generation...');
    downloadStartersgids();
    return;
  }
  
  // For other files, proceed as normal
  try {
    const link = document.createElement('a');
    link.href = url;
    if (filename) {
      link.setAttribute('download', filename);
    } else {
      link.setAttribute('download', '');
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Download failed:', error);
  }
};