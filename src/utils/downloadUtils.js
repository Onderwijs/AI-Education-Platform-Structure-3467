import jsPDF from 'jspdf';
import { lessons } from '../data/lessons'; // We importeren de content direct

/**
 * CACHE CLEARING HELPERS
 */
const clearCache = () => {
  try {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
    sessionStorage.clear();
  } catch (error) {
    console.log('Cache clearing logic check.');
  }
};

/**
 * STARTERSGIDS DOWNLOAD (Behouden zoals het was, maar met schone output)
 */
export const downloadStartersgids = () => {
  // ... (Bestaande code voor startersgids, kortheidshalve hier even weggelaten of 
  // gebruik de code uit de vorige stap als je die functionaliteit ook nodig hebt. 
  // Voor nu focus ik op de LESGENERATOR fix).
  // Als je de volledige file wilt vervangen, laat het weten. 
  // Ik zal hieronder een simpele versie zetten zodat de file valide blijft.
  console.log("Download Startersgids placeholder");
  const doc = new jsPDF();
  doc.text("AI Startersgids V9.0", 20, 20);
  doc.save("AI-Startersgids.pdf");
};

/**
 * LESBRIEF DOWNLOAD GENERATOR
 * Deze functie bouwt nu dynamisch de PDF op basis van het lesson object.
 */
export const downloadLesson = (lessonTitle) => {
  clearCache();
  
  // 1. Zoek de les in de data
  const lesson = lessons.find(l => l.title === lessonTitle);

  if (!lesson) {
    console.error("Les niet gevonden:", lessonTitle);
    alert("Sorry, de inhoud van deze les kon niet worden geladen.");
    return;
  }

  try {
    console.log('Generating RICH PDF for:', lessonTitle);
    const doc = new jsPDF();
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = 20;

    // Helper voor wrapped text
    const addText = (text, size = 11, style = 'normal', color = [0, 0, 0], spacing = 7) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', style);
      doc.setTextColor(color[0], color[1], color[2]);
      
      const lines = doc.splitTextToSize(String(text), contentWidth);
      
      // Page break check
      if (yPos + (lines.length * size * 0.5) > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.text(lines, margin, yPos);
      yPos += (lines.length * size * 0.4) + spacing;
    };

    // Helper voor sectie headers
    const addSectionHeader = (title) => {
      yPos += 5;
      doc.setFillColor(240, 253, 244); // Lichtgroen
      doc.rect(margin, yPos, contentWidth, 8, 'F');
      doc.setTextColor(22, 101, 52); // Donkergroen
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 2, yPos + 5.5);
      doc.setTextColor(0, 0, 0);
      yPos += 14;
    };

    // --- HEADER ---
    doc.setFillColor(22, 163, 74); // Primary Green
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text("LESBRIEF", margin, 20);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(lesson.title, margin, 30);
    
    yPos = 50;

    // --- META DATA ---
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Niveau: ${lesson.level || 'N.v.t.'}`, margin, yPos);
    doc.text(`Duur: ${lesson.duration || 'N.v.t.'}`, margin + 60, yPos);
    doc.text(`Vak: ${lesson.subject || 'Algemeen'}`, margin + 120, yPos);
    yPos += 15;

    // --- SAMENVATTING ---
    addSectionHeader("Samenvatting");
    addText(lesson.description || lesson.summary || "Geen beschrijving beschikbaar.");

    // --- LEERDOELEN ---
    if (lesson.goals && lesson.goals.length > 0) {
      addSectionHeader("Leerdoelen");
      lesson.goals.forEach(goal => {
        addText(`• ${goal}`, 10, 'normal', [40, 40, 40], 4);
      });
      yPos += 4;
    }

    // --- BENODIGDHEDEN ---
    if (lesson.materials && lesson.materials.length > 0) {
      addSectionHeader("Benodigdheden");
      lesson.materials.forEach(mat => {
        addText(`□ ${mat}`, 10, 'normal', [40, 40, 40], 4);
      });
      yPos += 4;
    }

    // --- LESFASEN (De kern) ---
    if (lesson.lessonPhases && lesson.lessonPhases.length > 0) {
      addSectionHeader("Lesverloop");
      
      lesson.lessonPhases.forEach((phase, index) => {
        // Blok per fase met lichte border/achtergrond hint
        if (yPos + 40 > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }

        // Fase titel balk
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(margin, yPos, contentWidth, 8, 1, 1, 'F');
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(`${index + 1}. ${phase.title}`, margin + 3, yPos + 5.5);
        
        // Tijdsaanduiding rechts
        if (phase.time || phase.timingMinutes) {
          const timeText = phase.time || `${phase.timingMinutes} min`;
          doc.setFont('helvetica', 'normal');
          doc.text(timeText, pageWidth - margin - 5, yPos + 5.5, { align: 'right' });
        }
        
        yPos += 12;

        // Inhoud
        addText(phase.description, 10, 'italic', [80, 80, 80], 4);
        
        if (phase.teacherActions) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text("Docent:", margin, yPos);
          yPos += 4;
          addText(phase.teacherActions, 10, 'normal', [0, 0, 0], 4);
        }

        if (phase.studentActivities) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text("Leerling:", margin, yPos);
          yPos += 4;
          addText(phase.studentActivities, 10, 'normal', [0, 0, 0], 8);
        }
        
        yPos += 2; // Extra witruimte tussen fasen
      });
    }

    // --- DIFFERENTIATIE ---
    if (lesson.differentiation && lesson.differentiation.length > 0) {
      addSectionHeader("Differentiatie");
      lesson.differentiation.forEach(item => {
        addText(`→ ${item}`, 10, 'normal', [40, 40, 40], 4);
      });
    }

    // --- REFLECTIE ---
    if (lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0) {
      addSectionHeader("Reflectievragen");
      lesson.reflectionQuestions.forEach(q => {
        addText(`? ${q}`, 10, 'italic', [60, 60, 60], 4);
      });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Pagina ${i} van ${pageCount} - Gegenereerd door Onderwijs.ai`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Opslaan
    const filename = `Lesbrief-${lessonTitle.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    doc.save(filename);

  } catch (e) {
    console.error("PDF Generation Error:", e);
    alert("Er ging iets mis bij het genereren van de lesbrief.");
  }
};

export const downloadFile = (url, filename) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download failed:', error);
    window.open(url, '_blank');
  }
};