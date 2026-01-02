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
 * Ondersteunt Strikte 2-2-2 layout en 2x2 Eilandjes
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

    // 3. Grid Logic
    const isRowLayout = layout === 'rijen';
    const isIslandLayout = layout === 'eilandjes';
    
    // Config per layout
    const cols = isRowLayout ? 6 : 4;
    const rows = Math.ceil(students.length / cols);
    
    // Gaps in mm
    const horizontalGapBetweenIslands = isRowLayout ? 10 : 12; // De "loopruimte"
    const verticalGapBetweenIslands = isRowLayout ? 5 : 12;
    const miniGap = 1.5; // Binnen een eiland of duo
    
    // Calculate desk width
    // Voor rijen: contentWidth = (6 * deskWidth) + (2 * gap)
    // Voor eilanden: contentWidth = (4 * deskWidth) + (1 * gap) + (2 * miniGap)
    const deskWidth = isRowLayout 
      ? (contentWidth - (2 * horizontalGapBetweenIslands)) / 6
      : (contentWidth - (1 * horizontalGapBetweenIslands) - (2 * miniGap)) / 4;

    const baseDeskHeight = isRowLayout ? 18 : 24;
    
    // Scaling to fit page
    const totalNeededHeight = (rows * baseDeskHeight) + ((rows / 2) * verticalGapBetweenIslands);
    const availableHeight = pageHeight - cursorY - 15;
    const scale = totalNeededHeight > availableHeight ? availableHeight / totalNeededHeight : 1;
    
    const finalDeskHeight = baseDeskHeight * scale;

    // 4. Render Tables
    students.forEach((name, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      let xOffset = 0;
      let yOffset = 0;

      if (isRowLayout) {
        const pairIndex = Math.floor(col / 2); // 0, 1, or 2
        xOffset = pairIndex * horizontalGapBetweenIslands;
      } else if (isIslandLayout) {
        // Horizontal: Pair desks (0,1) and (2,3)
        const islandGroupX = Math.floor(col / 2); // 0 or 1
        xOffset = (islandGroupX * horizontalGapBetweenIslands) + ((col % 2) * miniGap);
        
        // Vertical: Pair rows (0,1) and (2,3)
        const islandGroupY = Math.floor(row / 2);
        yOffset = (islandGroupY * verticalGapBetweenIslands) + ((row % 2) * miniGap);
      }
      
      const x = margin + (col * deskWidth) + xOffset;
      const y = cursorY + (row * finalDeskHeight) + yOffset;

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

    doc.save(`Klassenplattegrond-${layout}-${new Date().getTime()}.pdf`);
  } catch (e) {
    console.error(e);
    alert("Fout bij PDF export.");
  }
};

export const downloadStartersgids=()=> { /* ... */ };
export const downloadFile=(url,filename)=> { /* ... */ };
export const downloadLesson=(lessonTitle)=> { /* ... */ };