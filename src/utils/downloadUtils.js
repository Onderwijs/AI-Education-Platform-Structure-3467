import jsPDF from 'jspdf';
import { lessons } from '../data/lessons';

/**
 * TEXT NORMALIZER
 * Verwijdert rommel-karakters, normaliseert witruimte en stript bullets uit de brontekst
 * zodat we ze zelf netjes kunnen renderen.
 */
const normalizeLessonText = (raw) => {
  if (!raw) return "";

  let text = String(raw);

  // 1. Vervang specifieke rommel-karakters met 'niets' (wij doen zelf bullets)
  text = text.replace(/%¡/g, "");
  text = text.replace(/!’/g, "");
  
  // 2. Verwijder vraagtekens aan het begin van een zin (vaak gebruikt als bullet in oude data)
  text = text.replace(/^\s*\?\s*/, "");
  
  // 3. Verwijder standaard bullets als ze er al in staan (wij voegen ze zelf toe)
  text = text.replace(/^\s*[-•]\s*/, "");

  // 4. Verwijder niet-afdrukbare characters (control chars)
  text = text.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "");

  // 5. Normaliseer witruimte (geen dubbele spaties)
  text = text.replace(/\s{2,}/g, " ");

  return text.trim();
};

/**
 * CACHE CLEARING
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
 * STARTERSGIDS DOWNLOAD (Placeholder)
 */
export const downloadStartersgids = () => {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("AI Startersgids V9.0", 20, 30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Deze gids wordt binnenkort geüpdatet.", 20, 50);
  doc.save("AI-Startersgids.pdf");
};

/**
 * FILE DOWNLOAD HELPER
 */
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

/**
 * GENERATE LESSON PDF
 * De vernieuwde engine voor strakke lesbrieven.
 */
export const downloadLesson = (lessonTitle) => {
  clearCache();

  // 1. Zoek de les
  const lesson = lessons.find(l => l.title === lessonTitle);

  if (!lesson) {
    alert("Sorry, de inhoud van deze les kon niet worden geladen.");
    return;
  }

  try {
    const doc = new jsPDF();
    
    // CONFIGURATIE
    const marginX = 20;       // 20mm marge links/rechts
    const marginTop = 20;
    const marginBottom = 25;  // Ruimte voor footer
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (marginX * 2);
    
    let cursorY = marginTop;

    // HELPER: Controleer of we naar een nieuwe pagina moeten
    const checkPageBreak = (heightNeeded) => {
      if (cursorY + heightNeeded > pageHeight - marginBottom) {
        doc.addPage();
        cursorY = marginTop;
        return true;
      }
      return false;
    };

    // HELPER: Reset Font naar standaard
    const resetFont = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    };

    // HELPER: Tekst Paragraaf toevoegen
    const addParagraph = (text, fontSize = 11, fontStyle = "normal", color = [0,0,0]) => {
      if (!text) return;
      
      const cleanText = normalizeLessonText(text);
      if (!cleanText) return;

      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);

      const lines = doc.splitTextToSize(cleanText, contentWidth);
      const heightNeeded = lines.length * (fontSize * 0.45); // Line height factor

      checkPageBreak(heightNeeded + 5);

      doc.text(lines, marginX, cursorY);
      cursorY += heightNeeded + 4; // Extra spacing na paragraaf
    };

    // HELPER: Sectie Kop
    const addSectionHeader = (title) => {
      checkPageBreak(25); // Altijd wat ruimte nodig voor een header + inhoud
      cursorY += 5;
      
      // Groene balk achtergrond
      doc.setFillColor(240, 253, 244); // Emerald-50
      doc.rect(marginX, cursorY, contentWidth, 10, 'F');
      
      // Tekst
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(22, 101, 52); // Emerald-800
      doc.text(title.toUpperCase(), marginX + 3, cursorY + 7);
      
      cursorY += 16;
      resetFont();
    };

    // HELPER: Bullet List
    const addBulletList = (items) => {
      if (!items || !items.length) return;

      resetFont();
      
      items.forEach(item => {
        const cleanText = normalizeLessonText(item);
        if (!cleanText) return;

        const bulletIndent = 5;
        const textWidth = contentWidth - bulletIndent;
        const lines = doc.splitTextToSize(cleanText, textWidth);
        const heightNeeded = lines.length * 5; // ~5mm per regel bij font 11

        checkPageBreak(heightNeeded + 2);

        // Teken bullet
        doc.text("•", marginX, cursorY);
        
        // Teken tekst
        doc.text(lines, marginX + bulletIndent, cursorY);
        
        cursorY += heightNeeded + 2; // Spacing tussen items
      });
      cursorY += 4; // Spacing na de lijst
    };

    // ==========================================
    // SECTIE 1: HEADER & TITEL
    // ==========================================
    
    // Groene Header Balk
    doc.setFillColor(22, 163, 74); // Emerald-600
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("LESBRIEF", marginX, 20);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(normalizeLessonText(lesson.title), marginX, 30);

    cursorY = 55;

    // ==========================================
    // SECTIE 2: META DATA
    // ==========================================
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Niveau: ${lesson.level || '-'}`, marginX, cursorY);
    doc.text(`Duur: ${lesson.duration || '-'}`, marginX + 60, cursorY);
    doc.text(`Vak: ${lesson.subject || '-'}`, marginX + 120, cursorY);
    cursorY += 15;

    // ==========================================
    // SECTIE 3: INLEIDING
    // ==========================================
    addSectionHeader("Inleiding");
    // Gebruik introduction, fallback naar summary
    const intro = lesson.introduction || lesson.summary;
    addParagraph(intro);

    // ==========================================
    // SECTIE 4: LEERDOELEN
    // ==========================================
    if (lesson.goals && lesson.goals.length > 0) {
      addSectionHeader("Leerdoelen");
      addBulletList(lesson.goals);
    }

    // ==========================================
    // SECTIE 5: BENODIGDHEDEN
    // ==========================================
    if (lesson.materials && lesson.materials.length > 0) {
      addSectionHeader("Benodigdheden");
      addBulletList(lesson.materials);
    }

    // ==========================================
    // SECTIE 6: LESVERLOOP
    // ==========================================
    if (lesson.lessonPhases && lesson.lessonPhases.length > 0) {
      addSectionHeader("Lesverloop");
      
      lesson.lessonPhases.forEach((phase, index) => {
        // Bereken ruimte: Titel + Description + Teacher + Student
        // Dit is een schatting, we checken per onderdeel
        checkPageBreak(30); 

        // Fase grijs blokje
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(marginX, cursorY, contentWidth, 8, 1, 1, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        const title = normalizeLessonText(phase.title);
        doc.text(`${index + 1}. ${title}`, marginX + 3, cursorY + 5.5);

        // Tijd rechts
        if (phase.time || phase.timingMinutes) {
          const time = normalizeLessonText(phase.time || `${phase.timingMinutes} min`);
          doc.setFont("helvetica", "normal");
          doc.text(time, pageWidth - marginX - 5, cursorY + 5.5, { align: 'right' });
        }
        
        cursorY += 14;

        // Beschrijving (italic)
        if (phase.description) {
          addParagraph(phase.description, 10, "italic", [80, 80, 80]);
        }

        // Docent acties
        if (phase.teacherActions) {
           doc.setFont("helvetica", "bold");
           doc.setFontSize(10);
           doc.setTextColor(0,0,0);
           checkPageBreak(10);
           doc.text("Docent:", marginX, cursorY);
           cursorY += 5;
           addParagraph(phase.teacherActions, 10);
        }

        // Leerling acties
        if (phase.studentActivities) {
           doc.setFont("helvetica", "bold");
           doc.setFontSize(10);
           doc.setTextColor(0,0,0);
           checkPageBreak(10);
           doc.text("Leerling:", marginX, cursorY);
           cursorY += 5;
           addParagraph(phase.studentActivities, 10);
        }

        cursorY += 4; // Extra witruimte na fase
      });
    }

    // ==========================================
    // SECTIE 7: DIFFERENTIATIE
    // ==========================================
    if (lesson.differentiation && lesson.differentiation.length > 0) {
      addSectionHeader("Differentiatie");
      addBulletList(lesson.differentiation);
    }

    // ==========================================
    // SECTIE 8: REFLECTIE & ASSESSMENT
    // ==========================================
    const reflectionItems = [
      ...(lesson.assessment || []),
      ...(lesson.reflectionQuestions || [])
    ];

    if (reflectionItems.length > 0) {
      addSectionHeader("Reflectie & Evaluatie");
      addBulletList(reflectionItems);
    }

    // ==========================================
    // FOOTER (Paginanummering)
    // ==========================================
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(marginX, pageHeight - 20, pageWidth - marginX, pageHeight - 20);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);

      const footerLeft = "Onderwijs.ai - Praktische AI voor Docenten";
      doc.text(footerLeft, marginX, pageHeight - 12);

      const footerRight = `Pagina ${i} van ${pageCount}`;
      const textWidth = doc.getTextWidth(footerRight);
      doc.text(footerRight, pageWidth - marginX - textWidth, pageHeight - 12);
    }

    // SAVE
    const filename = `Lesbrief-${lessonTitle.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    doc.save(filename);

  } catch (e) {
    console.error("PDF Generation Error:", e);
    alert("Er ging iets mis bij het genereren van de PDF.");
  }
};