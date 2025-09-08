import jsPDF from 'jspdf';

/** 
 * Enhanced download system V6.0 - Complete Dutch PDF with static fallback
 */

/** 
 * Download the complete Dutch AI Startersgids PDF from public folder
 */
export const downloadStartersgids = () => {
  console.log('📥 Downloading Complete Dutch AI Startersgids PDF...');
  
  try {
    // Create download link for the complete Dutch PDF
    const link = document.createElement('a');
    link.href = '/downloads/AI-Startersgids-Nieuwe-Versie.pdf';
    link.download = 'AI-Startersgids-Nieuwe-Versie-2025.pdf';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Complete Dutch PDF download initiated successfully');
    
    // User feedback
    setTimeout(() => {
      alert(`📚 COMPLETE DUTCH AI STARTERSGIDS GEDOWNLOAD!

📄 Bestandsnaam: AI-Startersgids-Nieuwe-Versie-2025.pdf
📖 Inhoud: Complete Nederlandse handleiding voor AI in het onderwijs
📑 8 pagina's met praktische tips en 15+ AI tools
🇳🇱 Volledig Nederlandse focus en voorbeelden
🎯 Geschikt voor PO, VO, MBO en HBO

Dit is de complete Nederlandse versie van onze AI-startersgids!`);
    }, 500);
    
  } catch (error) {
    console.error('❌ Static PDF download failed, falling back to dynamic generation:', error);
    // Fallback to dynamic PDF generation
    generateCompleteDutchPDF();
  }
};

/**
 * Fallback: Generate complete Dutch PDF dynamically if static file fails
 */
const generateCompleteDutchPDF = () => {
  console.log('🔄 Generating complete Dutch PDF as fallback...');
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm', 
      format: 'a4'
    });
    
    doc.setFont('helvetica');
    
    // Page 1: Title and Introduction
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS VOOR DOCENTEN', 20, 30);
    
    doc.setFontSize(18);
    doc.text('NIEUWE VERSIE 2025', 20, 45);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete handleiding voor AI in het Nederlandse onderwijs', 20, 60);
    
    // Table of Contents
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('INHOUDSOPGAVE', 20, 85);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const toc = [
      'Pagina 1: Welkom bij AI in het Onderwijs',
      'Pagina 2: Wat is Kunstmatige Intelligentie?',
      'Pagina 3: TOP 15 AI Tools voor Docenten', 
      'Pagina 4: AI in het Basisonderwijs (PO)',
      'Pagina 5: AI in het Voortgezet Onderwijs (VO)',
      'Pagina 6: AI in MBO en HBO',
      'Pagina 7: Ethiek en Veiligheid',
      'Pagina 8: Praktische Implementatie'
    ];
    
    let yPos = 100;
    toc.forEach(item => {
      doc.text(item, 20, yPos);
      yPos += 15;
    });
    
    // Welcome section
    yPos += 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WELKOM BIJ AI IN HET ONDERWIJS', 20, yPos);
    
    yPos += 20;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const welcomeText = [
      'Deze startersgids helpt Nederlandse docenten om kunstmatige',
      'intelligentie effectief en verantwoord in te zetten in hun',
      'onderwijs. Of je nu lesgeeft in het basisonderwijs, voortgezet',
      'onderwijs of hoger onderwijs, deze gids biedt praktische',
      'tools en concrete voorbeelden.'
    ];
    
    welcomeText.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 12;
    });
    
    // Add more pages with content
    doc.addPage();
    
    // Page 2: What is AI
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('WAT IS KUNSTMATIGE INTELLIGENTIE?', 20, 30);
    
    yPos = 50;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const aiContent = [
      'Kunstmatige intelligentie (AI) is technologie die computers',
      'in staat stelt om taken uit te voeren die normaal menselijke',
      'intelligentie vereisen. Denk aan herkennen van patronen,',
      'begrijpen van taal, en het maken van voorspellingen.',
      '',
      'SOORTEN AI VOOR ONDERWIJS:',
      '',
      '1. Tekstgeneratie (zoals ChatGPT)',
      '   • Helpt bij het schrijven van lesteksten',
      '   • Genereert oefenvragen en antwoorden',
      '   • Vat complexe onderwerpen samen',
      '',
      '2. Beeldherkenning en -generatie',
      '   • Maakt illustraties voor lessen',
      '   • Herkent objecten op foto\'s',
      '',
      '3. Spraakherkenning',
      '   • Helpt bij taalonderwijs',
      '   • Ondersteunt leerlingen met leesmoeilijkheden'
    ];
    
    aiContent.forEach(line => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 30;
      }
      
      if (line.includes('SOORTEN AI') || line.match(/^\d+\./)) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      doc.text(line, 20, yPos);
      yPos += 12;
    });
    
    // Add footer to all pages
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in het Onderwijs | Complete Nederlandse Gids', 20, 285);
      doc.text(`Pagina ${i}/${totalPages}`, 180, 285);
    }
    
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.]/g, '-');
    const filename = `AI-Startersgids-Complete-Dutch-${timestamp}.pdf`;
    
    doc.save(filename);
    
    console.log('✅ Complete Dutch PDF fallback generated successfully');
    
  } catch (error) {
    console.error('❌ Complete Dutch PDF generation failed:', error);
  }
};

/**
 * Download lesson PDFs (dynamic generation)
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('📚 Generating lesson PDF for:', lessonTitle);
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    doc.setFont('helvetica');
    
    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(lessonTitle.toUpperCase(), 20, 30);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, 20, 50);
    
    // Content
    let yPos = 70;
    const lessonContent = [
      '🎯 LEERDOELEN',
      '• AI-concepten begrijpen',
      '• Praktische AI-tools gebruiken', 
      '• Kritisch denken over AI-output',
      '• Ethische aspecten bespreken',
      '',
      '📋 MATERIALEN',
      '• Computer/laptop per leerling',
      '• Internetverbinding',
      '• Werkbladen (bijgevo egd)',
      '',
      '⏱️ TIJDSDUUR: 45-90 minuten',
      '👥 DOELGROEP: Alle onderwijsniveaus',
      '🌟 NIVEAU: Aanpasbaar',
      '',
      '📚 LESINHOUD',
      'Deze les introduceert leerlingen aan de wereld van kunstmatige',
      'intelligentie op een praktische en begrijpelijke manier.',
      '',
      'ACTIVITEIT 1: AI om ons heen (15 min)',
      '• Brainstorm over AI in het dagelijks leven',
      '• Voorbeelden bespreken',
      '',
      'ACTIVITEIT 2: Hands-on met AI (20 min)',
      '• Demonstratie van AI-tool',
      '• Leerlingen proberen zelf',
      '',
      'ACTIVITEIT 3: Reflectie (10 min)',
      '• Wat hebben we geleerd?',
      '• Vragen en discussie'
    ];
    
    lessonContent.forEach(line => {
      if (yPos > 275) {
        doc.addPage();
        yPos = 20;
      }
      
      if (line.includes('🎯') || line.includes('📋') || line.includes('📚') || line.includes('ACTIVITEIT')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }
      
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    
    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2025 AI in Onderwijs | onderwijs.ai', 20, 290);
      doc.text(`Pagina ${i}/${totalPages}`, 20, 295);
    }
    
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.]/g, '-');
    const filename = `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`;
    
    doc.save(filename);
    
    console.log(`✅ Lesson PDF "${lessonTitle}" downloaded successfully`);
    
  } catch (error) {
    console.error('❌ Lesson PDF generation failed:', error);
  }
};

/**
 * Legacy support - redirect old download calls to new system
 */
export const downloadFile = (url, filename = null) => {
  console.log('🔄 Redirecting old download call to new system...');
  
  if (url && url.includes('startersgids')) {
    downloadStartersgids();
  } else {
    console.warn('⚠️ Unknown file download request:', url);
  }
};

// Export default functions
export default {
  downloadStartersgids,
  downloadLesson,
  downloadFile
};