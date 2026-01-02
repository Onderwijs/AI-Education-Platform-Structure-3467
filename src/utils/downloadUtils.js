import jsPDF from 'jspdf';
import {lessons} from '../data/lessons';

const normalizeLessonText=(raw)=> {
  if (!raw) return "";
  let text=String(raw);
  text=text.replace(/%¡/g,"");
  text=text.replace(/!’/g,"");
  text=text.replace(/^\s*\?\s*/,"");
  text=text.replace(/^\s*[-•]\s*/,"");
  text=text.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g,"");
  text=text.replace(/\s{2,}/g," ");
  return text.trim();
};

/**
 * KLASSENPLATTEGROND PDF GENERATOR
 * Strikte 2-2-2 layout voor A4 download
 */
export const downloadSeatingChartPDF=(students,layout,goal)=> {
  if (!students || students.length === 0) return;

  try {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
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
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(`Datum: ${new Date().toLocaleDateString('nl-NL')} | Doel: ${goal} | Opstelling: ${layout}`, margin, cursorY);

    cursorY += 10;

    // 2. Teacher Desk
    doc.setFillColor(31, 41, 55);
    doc.roundedRect(pageWidth / 2 - 25, cursorY, 50, 8, 1.5, 1.5, 'F');
    doc.setFillColor(79, 70, 229);
    doc.rect(pageWidth / 2 - 25, cursorY, 50, 0.8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.text("BUREAU DOCENT / DIGIBORD", pageWidth / 2, cursorY + 5, { align: 'center' });

    cursorY += 20;

    // 3. Grid Logic (2-2-2 Pattern)
    const isRowLayout = layout === 'rijen';
    const cols = isRowLayout ? 6 : 3;
    const rows = Math.ceil(students.length / cols);
    
    // Gaps in mm
    const horizontalGapBetweenPairs = isRowLayout ? 10 : 8; // De "loopruimte"
    const verticalGap = isRowLayout ? 5 : 10;
    
    // Calculate desk width
    // contentWidth = (6 * deskWidth) + (2 * gapBetweenPairs)
    const deskWidth = isRowLayout 
      ? (contentWidth - (2 * horizontalGapBetweenPairs)) / 6
      : (contentWidth - (2 * horizontalGapBetweenPairs)) / 3;

    const baseDeskHeight = isRowLayout ? 18 : 26;
    
    // Scaling to fit page
    const totalNeededHeight = (rows * baseDeskHeight) + ((rows - 1) * verticalGap);
    const availableHeight = pageHeight - cursorY - 15;
    const scale = totalNeededHeight > availableHeight ? availableHeight / totalNeededHeight : 1;
    
    const finalDeskHeight = baseDeskHeight * scale;
    const finalVerticalGap = verticalGap * scale;

    // 4. Render Tables
    students.forEach((name, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      // Calculate X with 2-2-2 grouping
      let xOffset = 0;
      if (isRowLayout) {
        const pairIndex = Math.floor(col / 2); // 0, 1, or 2
        xOffset = pairIndex * horizontalGapBetweenPairs;
      } else {
        xOffset = col * horizontalGapBetweenPairs;
      }
      
      const x = margin + (col * deskWidth) + xOffset;
      const y = cursorY + (row * (finalDeskHeight + finalVerticalGap));

      // Table Shape
      doc.setDrawColor(219, 234, 254);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, deskWidth, finalDeskHeight, 1.5, 1.5, 'FD');

      // Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(Math.max(5, 7 * scale));
      doc.setTextColor(31, 41, 55);
      const cleanName = normalizeLessonText(name);
      const truncated = cleanName.length > 12 ? cleanName.substring(0, 10) + ".." : cleanName;
      doc.text(truncated, x + (deskWidth / 2), y + (finalDeskHeight * 0.55), { align: 'center' });

      // Mini progress line
      const isOrange = index % 7 === 0;
      doc.setFillColor(229, 231, 235);
      doc.rect(x + 2, y + finalDeskHeight - 3, deskWidth - 4, 0.8, 'F');
      doc.setFillColor(isOrange ? 251 : 74, isOrange ? 146 : 222, isOrange ? 60 : 128);
      doc.rect(x + 2, y + finalDeskHeight - 3, isOrange ? (deskWidth - 4) / 3 : (deskWidth - 4), 0.8, 'F');
    });

    // 5. Footer
    doc.setFontSize(6);
    doc.setTextColor(156, 163, 175);
    doc.text("Gegenereerd door Onderwijs.ai - Alle data wordt uitsluitend lokaal verwerkt.", pageWidth / 2, pageHeight - 10, { align: 'center' });

    doc.save(`Klassenplattegrond-222-${new Date().getTime()}.pdf`);
  } catch (e) {
    console.error(e);
    alert("Fout bij PDF export.");
  }
};

export const downloadStartersgids=()=> { /* ... bestaande code ... */ };
export const downloadFile=(url,filename)=> { /* ... bestaande code ... */ };
export const downloadLesson=(lessonTitle)=> { /* ... bestaande code ... */ };