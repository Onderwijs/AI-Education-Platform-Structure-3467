import jsPDF from 'jspdf';
import { lessons } from '../data/lessons';

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
 * KLASSENPLATTEGROND PDF GENERATOR
 * Ondersteunt Strikte 2-2-2 layout en 2x2 Eilandjes met Restgroep logica
 */
export const downloadSeatingChartPDF = (students, layout, goal) => {
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

    cursorY += 15;

    // 3. Render Logic
    if (layout === 'rijen') {
      const cols = 6;
      const horizontalGap = 10;
      const deskWidth = (contentWidth - (2 * horizontalGap)) / 6;
      const deskHeight = 18;

      students.forEach((name, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const pairIndex = Math.floor(col / 2);
        const xOffset = pairIndex * horizontalGap;
        
        const x = margin + (col * deskWidth) + xOffset;
        const y = cursorY + (row * (deskHeight + 4));

        doc.setDrawColor(219, 234, 254);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(x, y, deskWidth, deskHeight, 1.5, 1.5, 'FD');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(31, 41, 55);
        const cleanName = normalizeLessonText(name);
        const truncated = cleanName.length > 12 ? cleanName.substring(0, 10) + ".." : cleanName;
        doc.text(truncated, x + (deskWidth / 2), y + (deskHeight * 0.55), { align: 'center' });
      });
    } else {
      // ISLANDS LAYOUT (2x2 Chunks)
      const islandSize = 4;
      const desksPerRow = 2; // 2 islands per row
      const islandWidth = 45; // Width of one 2x2 block
      const islandHeight = 40;
      const gapBetweenIslands = 15;
      const miniGap = 1.5;
      
      const deskWidth = (islandWidth - miniGap) / 2;
      const deskHeight = (islandHeight - miniGap) / 2;

      for (let i = 0; i < students.length; i += islandSize) {
        const island = students.slice(i, i + islandSize);
        const islandIndex = Math.floor(i / islandSize);
        const isRestIsland = island.length < 4;
        
        const islandCol = islandIndex % desksPerRow;
        const islandRow = Math.floor(islandIndex / desksPerRow);
        
        const islandX = margin + (islandCol * (islandWidth + gapBetweenIslands));
        const islandY = cursorY + (islandRow * (islandHeight + gapBetweenIslands));

        // Optional: Draw rest island indicator
        if (isRestIsland) {
          doc.setDrawColor(200, 200, 200);
          doc.setLineDash([2, 2]);
          doc.roundedRect(islandX - 2, islandY - 2, islandWidth + 4, islandHeight + 4, 3, 3, 'D');
          doc.setLineDash([]);
          doc.setFontSize(5);
          doc.setTextColor(150, 150, 150);
          doc.text("RESTGROEP", islandX + (islandWidth / 2), islandY - 4, { align: 'center' });
        }

        island.forEach((name, sIdx) => {
          const deskCol = sIdx % 2;
          const deskRow = Math.floor(sIdx / 2);
          
          const x = islandX + (deskCol * (deskWidth + miniGap));
          const y = islandY + (deskRow * (deskHeight + miniGap));

          doc.setDrawColor(isRestIsland ? 229 : 219, isRestIsland ? 231 : 234, isRestIsland ? 235 : 254);
          doc.setFillColor(isRestIsland ? 249 : 255, isRestIsland ? 250 : 255, isRestIsland ? 251 : 255);
          doc.roundedRect(x, y, deskWidth, deskHeight, 1.5, 1.5, 'FD');

          doc.setFont("helvetica", "bold");
          doc.setFontSize(6);
          doc.setTextColor(31, 41, 55);
          const truncated = name.length > 10 ? name.substring(0, 8) + ".." : name;
          doc.text(truncated, x + (deskWidth / 2), y + (deskHeight * 0.6), { align: 'center' });
        });
      }
    }

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

export const downloadStartersgids = () => { /* ... */ };
export const downloadFile = (url, filename) => { /* ... */ };
export const downloadLesson = (lessonTitle) => { /* ... */ };