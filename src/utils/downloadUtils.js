import jsPDF from 'jspdf';
import {lessons} from '../data/lessons';

/**
 * TEXT NORMALIZER
 * Verwijdert rommel-karakters en normaliseert tekst.
 */
const normalizeLessonText = (raw) => {
  if (!raw) return "";
  let text = String(raw);
  text = text.replace(/%¡/g, "");
  text = text.replace(/!’/g, "");
  text = text.replace(/^\s*\?\s*/, "");
  text = text.replace(/^\s*[-•]\s*/, "");
  text = text.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "");
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
 * KLASSENPLATTEGROND PDF GENERATOR
 * Genereert een A4 PDF die visueel identiek is aan de interface met vaste tussenruimtes
 */
export const downloadSeatingChartPDF = (students, layout, goal) => {
  if (!students || students.length === 0) {
    alert("Geen data om te downloaden.");
    return;
  }

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let cursorY = margin;

    // 1. Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39);
    doc.text("Klassenplattegrond", margin, cursorY);
    
    cursorY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    const today = new Date().toLocaleDateString('nl-NL');
    doc.text(`Datum: ${today} | Doel: ${goal} | Opstelling: ${layout}`, margin, cursorY);

    cursorY += 10;

    // 2. Teacher Desk (Separated from grid)
    doc.setFillColor(31, 41, 55);
    doc.roundedRect(pageWidth / 2 - 25, cursorY, 50, 8, 1.5, 1.5, 'F');
    doc.setFillColor(79, 70, 229);
    doc.rect(pageWidth / 2 - 25, cursorY, 50, 0.8, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(255, 255, 255);
    doc.text("BUREAU DOCENT / DIGIBORD", pageWidth / 2, cursorY + 5, { align: 'center' });

    cursorY += 20;

    // 3. Grid Configuration (Matching UI)
    const cols = layout === 'rijen' ? 6 : 3;
    const rows = Math.ceil(students.length / cols);
    
    // Fixed spacing in mm (represents the "loopruimte")
    const horizontalGap = layout === 'rijen' ? 3 : 6;
    const verticalGap = layout === 'rijen' ? 4 : 8;
    
    // Calculate desk dimensions
    const deskWidth = (contentWidth - (cols - 1) * horizontalGap) / cols;
    const baseDeskHeight = layout === 'rijen' ? 20 : 28;
    
    // Safety check for page height
    const totalNeededHeight = (rows * baseDeskHeight) + ((rows - 1) * verticalGap);
    const availableHeight = pageHeight - cursorY - 15;
    const scale = totalNeededHeight > availableHeight ? availableHeight / totalNeededHeight : 1;
    
    const finalDeskHeight = baseDeskHeight * scale;
    const finalVerticalGap = verticalGap * scale;

    // 4. Render Tables
    students.forEach((name, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = margin + (col * (deskWidth + horizontalGap));
      const y = cursorY + (row * (finalDeskHeight + finalVerticalGap));

      // Table Shape
      if (layout === 'rijen') {
        doc.setDrawColor(219, 234, 254); // blue-100
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setDrawColor(199, 210, 254); // indigo-200
        doc.setFillColor(249, 250, 251); // gray-50
      }
      doc.roundedRect(x, y, deskWidth, finalDeskHeight, 2, 2, 'FD');

      // Student Name (Centered)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(Math.max(5, 8 * scale));
      doc.setTextColor(31, 41, 55);
      const cleanName = normalizeLessonText(name);
      const truncatedName = cleanName.length > 14 ? cleanName.substring(0, 12) + ".." : cleanName;
      doc.text(truncatedName, x + (deskWidth / 2), y + (finalDeskHeight * 0.55), { align: 'center' });

      // Mini indicator (Progress bar from UI)
      const isOrange = index % 7 === 0;
      doc.setFillColor(229, 231, 235);
      doc.rect(x + 3, y + finalDeskHeight - 4, deskWidth - 6, 1, 'F');
      doc.setFillColor(isOrange ? 251 : 74, isOrange ? 146 : 222, isOrange ? 60 : 128);
      doc.rect(x + 3, y + finalDeskHeight - 4, isOrange ? (deskWidth - 6) / 3 : (deskWidth - 6), 1, 'F');
    });

    // 5. Footer
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("© Onderwijs.ai - Alle leerlinggegevens worden uitsluitend lokaal verwerkt.", pageWidth / 2, pageHeight - margin, { align: 'center' });

    doc.save(`Klassenplattegrond-${layout}-${new Date().getTime()}.pdf`);
  } catch (error) {
    console.error("PDF Error:", error);
    alert("Fout bij genereren PDF.");
  }
};

/**
 * STARTERSGIDS DOWNLOAD
 */
export const downloadStartersgids = () => {
  clearCache();
  try {
    const doc = new jsPDF();
    const marginX = 20;
    const marginTop = 20;
    const marginBottom = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (marginX * 2);
    let cursorY = marginTop;

    const checkPageBreak = (heightNeeded) => {
      if (cursorY + heightNeeded > pageHeight - marginBottom) {
        doc.addPage();
        cursorY = marginTop;
        return true;
      }
      return false;
    };

    const addParagraph = (text, fontSize = 11, fontStyle = "normal", color = [0, 0, 0]) => {
      if (!text) return;
      const cleanText = normalizeLessonText(text);
      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(cleanText, contentWidth);
      const heightNeeded = lines.length * (fontSize * 0.45);
      checkPageBreak(heightNeeded + 5);
      doc.text(lines, marginX, cursorY);
      cursorY += heightNeeded + 4;
    };

    const addSectionHeader = (title, forceNewPage = false) => {
      if (forceNewPage) { doc.addPage(); cursorY = marginTop; }
      else { checkPageBreak(35); }
      cursorY += 5;
      doc.setFillColor(239, 246, 255);
      doc.rect(marginX, cursorY, contentWidth, 12, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30, 64, 175);
      doc.text(title.toUpperCase(), marginX + 4, cursorY + 8);
      cursorY += 18;
    };

    const addBulletList = (items) => {
      if (!items) return;
      items.forEach(item => {
        const lines = doc.splitTextToSize(normalizeLessonText(item), contentWidth - 6);
        checkPageBreak(lines.length * 5 + 3);
        doc.setFillColor(0, 0, 0);
        doc.circle(marginX + 2, cursorY - 1, 1, 'F');
        doc.text(lines, marginX + 6, cursorY);
        cursorY += lines.length * 5 + 2;
      });
    };

    const addPromptBox = (title, promptText) => {
      const lines = doc.splitTextToSize(normalizeLessonText(promptText), contentWidth - 12);
      const h = lines.length * 4 + 20;
      checkPageBreak(h);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(marginX, cursorY, contentWidth, h, 3, 3, 'F');
      doc.setFont("helvetica", "bold");
      doc.text(title, marginX + 6, cursorY + 8);
      doc.setFont("courier", "normal");
      doc.setFontSize(9);
      doc.text(lines, marginX + 6, cursorY + 16);
      cursorY += h + 8;
    };

    // Header Page 1
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 80, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.text("AI STARTERSGIDS", marginX, 40);
    doc.setFontSize(18);
    doc.text("Versie 9.0 - Handboek voor het Onderwijs", marginX, 55);

    cursorY = 100;
    addParagraph("Beste onderwijsprofessional,", 12, "bold");
    addParagraph("Voor u ligt de vernieuwde AI Startersgids (V9.0). De ontwikkelingen rondom Kunstmatige Intelligentie gaan razendsnel. Deze gids focust op wat u morgen direct kunt toepassen.");

    addSectionHeader("1. Wat is AI?", true);
    addParagraph("AI is in de kern geavanceerde statistiek en patroonherkenning. Het leert van miljarden teksten om te voorspellen welk woord logischerwijs volgt.");
    addBulletList(["AI is GEEN kennisbank","AI is GEEN mens","AI is WEL een creatieve motor"]);

    addSectionHeader("2. Scenario's in de klas", true);
    addPromptBox("Lesidee Generator", "Bedenk 3 creatieve werkvormen voor een les over [ONDERWERP] voor [DOELGROEP].");
    addPromptBox("E-mail Assistent", "Schrijf een vriendelijke e-mail aan ouders over [SITUATIE].");

    addSectionHeader("3. Checklist", true);
    const checklist = ["Privacy: Geen leerlingnamen?","Fact-check: Klopt de inhoud?","Eigenaarschap: Ben ik de baas?"];
    checklist.forEach(item => {
      checkPageBreak(10);
      doc.rect(marginX, cursorY - 4, 4, 4);
      doc.text(item, marginX + 8, cursorY);
      cursorY += 10;
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Pagina ${i} van ${pageCount} - onderwijs.ai`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    doc.save(`AI-Startersgids-V9-${new Date().getTime()}.pdf`);
  } catch (e) {
    alert("Fout bij genereren startersgids.");
  }
};

/**
 * FILE DOWNLOAD HELPER
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * GENERATE LESSON PDF
 */
export const downloadLesson = (lessonTitle) => {
  const lesson = lessons.find(l => l.title === lessonTitle);
  if (!lesson) return;

  try {
    const doc = new jsPDF();
    const marginX = 20;
    let cursorY = 50;

    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("LESBRIEF", marginX, 20);
    doc.setFontSize(12);
    doc.text(normalizeLessonText(lesson.title), marginX, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Niveau: ${lesson.level}`, marginX, cursorY);
    cursorY += 10;
    
    const intro = doc.splitTextToSize(normalizeLessonText(lesson.introduction || lesson.summary), 170);
    doc.text(intro, marginX, cursorY);
    
    doc.save(`Lesbrief-${lessonTitle.replace(/\s+/g, '-')}.pdf`);
  } catch (e) {
    alert("Fout bij genereren lesbrief.");
  }
};