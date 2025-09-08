import jsPDF from 'jspdf';

/** 
 * Enhanced download system V5.0 - Now with static PDF fallback
 * Users get either the static PDF or dynamically generated content
 */

/** 
 * Download the static AI Startersgids PDF from public folder
 */
export const downloadStartersgids = () => {
  console.log('📥 Downloading AI Startersgids PDF from public folder...');
  
  try {
    // Create download link for the static PDF
    const link = document.createElement('a');
    link.href = '/downloads/AI-Startersgids-Nieuwe-Versie.pdf';
    link.download = 'AI-Startersgids-Nieuwe-Versie-2025.pdf';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Static PDF download initiated successfully');
    
    // User feedback
    setTimeout(() => {
      alert(`📚 AI STARTERSGIDS PDF GEDOWNLOAD!

📄 Bestandsnaam: AI-Startersgids-Nieuwe-Versie-2025.pdf
📖 Inhoud: Complete handleiding voor AI in het onderwijs
🎯 15 hoofdstukken met praktische tips en tools
🇳🇱 Nederlandse focus en voorbeelden

Dit is de nieuwste versie van onze AI-startersgids!`);
    }, 500);
    
  } catch (error) {
    console.error('❌ Static PDF download failed, falling back to dynamic generation:', error);
    // Fallback to dynamic PDF generation
    generateDynamicPDF();
  }
};

/**
 * Fallback: Generate PDF dynamically if static file fails
 */
const generateDynamicPDF = () => {
  console.log('🔄 Generating dynamic PDF as fallback...');
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm', 
      format: 'a4'
    });
    
    doc.setFont('helvetica');
    
    // Title page
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS VOOR DOCENTEN', 20, 30);
    
    doc.setFontSize(16);
    doc.text('NIEUWE EDITIE 2025', 20, 45);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete handleiding voor AI in het onderwijs', 20, 60);
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const filename = `AI-Startersgids-Fallback-${timestamp}.pdf`;
    
    doc.save(filename);
    
    console.log('✅ Dynamic PDF fallback generated successfully');
    
  } catch (error) {
    console.error('❌ Dynamic PDF generation also failed:', error);
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
      '• Werkbladen (bijgevoegd)',
      '',
      '⏱️ TIJDSDUUR: 45-90 minuten',
      '👥 DOELGROEP: Alle onderwijsniveaus',
      '🌟 NIVEAU: Aanpasbaar'
    ];
    
    lessonContent.forEach(line => {
      if (yPos > 275) {
        doc.addPage();
        yPos = 20;
      }
      
      if (line.includes('🎯') || line.includes('📋')) {
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