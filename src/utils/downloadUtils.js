import jsPDF from 'jspdf';
import { lessons } from '../data/lessons';

/**
 * TEXT NORMALIZER
 * Verwijdert rommel-karakters, normaliseert witruimte en stript bullets uit de brontekst.
 */
const normalizeLessonText = (raw) => {
  if (!raw) return "";

  let text = String(raw);

  // 1. Vervang specifieke rommel-karakters
  text = text.replace(/%¡/g, "");
  text = text.replace(/!’/g, "");
  
  // 2. Verwijder vraagtekens aan het begin van een zin
  text = text.replace(/^\s*\?\s*/, "");
  
  // 3. Verwijder standaard bullets
  text = text.replace(/^\s*[-•]\s*/, "");

  // 4. Verwijder niet-afdrukbare characters
  text = text.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "");

  // 5. Normaliseer witruimte
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
 * STARTERSGIDS DOWNLOAD V9.0 (VOLLEDIGE VERSIE)
 */
export const downloadStartersgids = () => {
  clearCache();
  
  try {
    const doc = new jsPDF();
    
    // CONFIGURATIE (Identiek aan lesbrieven)
    const marginX = 20;       
    const marginTop = 20;
    const marginBottom = 25;  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (marginX * 2);
    
    let cursorY = marginTop;

    // HELPER: Paginering
    const checkPageBreak = (heightNeeded) => {
      if (cursorY + heightNeeded > pageHeight - marginBottom) {
        doc.addPage();
        cursorY = marginTop;
        return true;
      }
      return false;
    };

    // HELPER: Reset Font
    const resetFont = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    };

    // HELPER: Paragraaf
    const addParagraph = (text, fontSize = 11, fontStyle = "normal", color = [0,0,0]) => {
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

    // HELPER: Sectie Kop
    const addSectionHeader = (title) => {
      checkPageBreak(30);
      cursorY += 5;
      
      // Blauwe balk ipv groen voor Startersgids onderscheid
      doc.setFillColor(239, 246, 255); // Blue-50
      doc.rect(marginX, cursorY, contentWidth, 10, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 64, 175); // Blue-800
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
        const bulletIndent = 5;
        const textWidth = contentWidth - bulletIndent;
        const lines = doc.splitTextToSize(cleanText, textWidth);
        const heightNeeded = lines.length * 5;

        checkPageBreak(heightNeeded + 2);

        doc.text("•", marginX, cursorY);
        doc.text(lines, marginX + bulletIndent, cursorY);
        cursorY += heightNeeded + 2;
      });
      cursorY += 4;
    };

    // HELPER: Code Block / Prompt Box
    const addPromptBox = (title, promptText) => {
      const cleanPrompt = normalizeLessonText(promptText);
      const padding = 5;
      doc.setFont("courier", "normal");
      doc.setFontSize(10);
      
      const lines = doc.splitTextToSize(cleanPrompt, contentWidth - (padding * 2));
      const heightNeeded = (lines.length * 4) + 15; // + title space

      checkPageBreak(heightNeeded);

      // Grijs kader
      doc.setFillColor(245, 245, 245);
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(marginX, cursorY, contentWidth, heightNeeded, 2, 2, 'FD');

      // Titel
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text(title, marginX + padding, cursorY + 7);

      // Prompt tekst
      doc.setFont("courier", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(lines, marginX + padding, cursorY + 14);

      cursorY += heightNeeded + 6;
      resetFont();
    };

    // ==========================================
    // TITEL PAGINA
    // ==========================================
    doc.setFillColor(37, 99, 235); // Blue-600
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.text("AI STARTERSGIDS", marginX, 30);
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Versie 9.0 - Handboek voor PO, VO, MBO & HBO", marginX, 45);

    cursorY = 80;

    // Inleiding
    resetFont();
    addParagraph("Welkom bij de vernieuwde AI Startersgids. Kunstmatige Intelligentie (AI) ontwikkelt zich razendsnel. Voor het onderwijs biedt dit enorme kansen, maar ook uitdagingen. Deze gids biedt concrete handvatten, prompts en kaders om AI verantwoord en effectief in te zetten in uw lespraktijk.");
    
    cursorY += 10;

    // ==========================================
    // SECTIE 1: WAAROM AI IN HET ONDERWIJS?
    // ==========================================
    addSectionHeader("1. Introductie: Waarom AI?");
    addParagraph("AI is geen tijdelijke hype, maar een fundamentele technologische verschuiving vergelijkbaar met de komst van het internet. Voor docenten betekent dit:");
    addBulletList([
      "Tijdsbesparing: Automatiseer administratie, lesvoorbereiding en basis-feedback.",
      "Differentiatie: Genereer met één klik materiaal op drie verschillende niveaus.",
      "Inspiratie: Gebruik AI als sparringpartner voor werkvormen en projecten.",
      "Toekomstgerichtheid: Leerlingen moeten leren werken met de tools van hun toekomst."
    ]);

    // ==========================================
    // SECTIE 2: BASISBEGRIPPEN
    // ==========================================
    addSectionHeader("2. AI Basisbegrippen voor Docenten");
    
    addParagraph("Om AI goed te gebruiken, moet u de basis begrijpen:", "bold");
    addBulletList([
      "LLM (Large Language Model): Een systeem getraind op enorme hoeveelheden tekst (zoals ChatGPT of Claude). Het 'begrijpt' geen tekst, maar voorspelt het volgende woord.",
      "Prompt: De instructie die u aan de AI geeft. Hoe specifieker de prompt, hoe beter het resultaat.",
      "Hallucinaties: AI kan feiten verzinnen die zeer overtuigend klinken. Controleer altijd de output!",
      "Biases (Vooroordelen): AI neemt de vooroordelen over uit de data waarop het getraind is."
    ]);

    // ==========================================
    // SECTIE 3: PRAKTISCHE CLASSROOM PROMPTS
    // ==========================================
    addSectionHeader("3. Praktische Classroom Prompts");
    addParagraph("Kopieer en pas deze prompts aan voor uw eigen vak:");

    addPromptBox("Lesvoorbereiding (Algemeen)", "Je bent een ervaren onderwijskundige. Ontwerp een lesplan van 50 minuten voor [NIVEAU/KLAS] over [ONDERWERP]. Zorg voor: 1) Een pakkende introductie, 2) Een activerende werkvorm, 3) Een formatieve check aan het einde.");
    
    addPromptBox("Differentiatie (Taal/Zaakvakken)", "Ik heb een tekst over [ONDERWERP]. Herschrijf deze tekst op drie niveaus: 1) Voor leerlingen met een taalachterstand (A2), 2) Gemiddeld niveau, 3) Uitdagend niveau met academisch taalgebruik.");
    
    addPromptBox("Toetsvragen (Wiskunde/Exact)", "Genereer 5 meerkeuzevragen over [ONDERWERP]. Geef bij elke vraag aan wat het juiste antwoord is én waarom de foute antwoorden veelgemaakte denkfouten zijn.");

    // ==========================================
    // SECTIE 4: AI IN HET LESONTWERP
    // ==========================================
    addSectionHeader("4. AI in het Lesontwerp");
    addParagraph("Gebruik het 'Backward Design' principe in combinatie met AI:");
    addBulletList([
      "Stap 1: Doelen bepalen. Vraag AI: 'Wat zijn de kerndoelen voor [VAK] in leerjaar [X]?'",
      "Stap 2: Evaluatie bepalen. Vraag AI: 'Maak een rubriek om [VAARDIGHEID] te beoordelen.'",
      "Stap 3: Leeractiviteiten. Vraag AI: 'Bedenk 3 creatieve werkvormen om dit doel te bereiken zonder beeldscherm.'"
    ]);

    // ==========================================
    // SECTIE 5: FORMATIEF EVALUEREN
    // ==========================================
    addSectionHeader("5. AI voor Formatief Evalueren");
    addParagraph("AI is een krachtige feedback-assistent. Laat AI nooit het cijfer bepalen, maar gebruik het voor snelle feedback loops.");
    addPromptBox("Feedback Prompt", "Hier is een essay van een leerling. Geef feedback op: 1) Structuur, 2) Argumentatie. Geef GEEN cijfer, maar geef 3 concrete tips ter verbetering.");

    // ==========================================
    // SECTIE 6: ETHISCHE RICHTLIJNEN
    // ==========================================
    addSectionHeader("6. Ethische Richtlijnen & Veiligheid");
    addBulletList([
      "Geen persoonsgegevens: Voer nooit namen of privégegevens van leerlingen in.",
      "Transparantie: Wees open naar leerlingen wanneer u AI gebruikt.",
      "Menselijke eindverantwoordelijkheid: U bent de expert. Accepteer geen AI-output zonder review.",
      "Bronvermelding: Leer leerlingen dat 'ChatGPT' geen bron is, maar een hulpmiddel."
    ]);

    // ==========================================
    // SECTIE 7: WERKVORMEN PER NIVEAU
    // ==========================================
    addSectionHeader("7. Werkvormen per Onderwijsniveau");
    
    addParagraph("Primair Onderwijs (PO):", "bold");
    addBulletList([
      "De 'Weet-niet-alles' machine: Laat AI een fout antwoord geven en laat leerlingen het corrigeren.",
      "Verhalenbouwer: Leerlingen bedenken personages, AI genereert het verhaal."
    ]);

    addParagraph("Voortgezet Onderwijs (VO):", "bold");
    addBulletList([
      "Socratisch Gesprek: Leerlingen debatteren met de AI over een stelling.",
      "Fact-Checker: Laat AI een tekst genereren over een historisch event en laat leerlingen de fouten zoeken met hun boek."
    ]);

    addParagraph("MBO / HBO:", "bold");
    addBulletList([
      "Code Review: Laat AI code genereren en laat studenten deze optimaliseren en beveiligen.",
      "Sollicitatie-training: Simuleer een sollicitatiegesprek met AI als recruiter."
    ]);

    // ==========================================
    // SECTIE 8: CHECKLIST VOOR SCHOLEN
    // ==========================================
    addSectionHeader("8. Checklist voor Implementatie");
    addBulletList([
      "Is er een duidelijk AI-beleid (wat mag wel/niet)?",
      "Zijn docenten getraind in basis-prompting?",
      "Zijn leerlingen/studenten op de hoogte van de privacy-regels?",
      "Wordt er niet alleen gefocust op tools, maar ook op didactiek?",
      "Is er ruimte voor experimenteren en fouten maken?"
    ]);

    cursorY += 10;
    addParagraph("Deze gids is met zorg samengesteld door Onderwijs.ai. Blijf kritisch, blijf leren en zet de mens altijd centraal.", 10, "italic", [80, 80, 80]);

    // ==========================================
    // FOOTER (Paginanummering)
    // ==========================================
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();
      
      // Footer lijn
      doc.setDrawColor(200, 200, 200);
      doc.line(marginX, h - 20, w - marginX, h - 20);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);

      // Linker footer
      const url = "https://onderwijs.ai";
      doc.text(url, marginX, h - 12);

      // Rechter footer
      const label = `Pagina ${i} van ${pageCount}`;
      const labelWidth = doc.getTextWidth(label);
      doc.text(label, w - marginX - labelWidth, h - 12);
    }

    doc.save("AI-Startersgids-V9.pdf");

  } catch (error) {
    console.error("Startersgids Generation Error:", error);
    alert("Er ging iets mis bij het genereren van de Startersgids.");
  }
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
 * GENERATE LESSON PDF (BESTAANDE FUNCTIE - NIET AANPASSEN)
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
    const marginX = 20;       
    const marginTop = 20;
    const marginBottom = 25;  
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
      const heightNeeded = lines.length * (fontSize * 0.45); 

      checkPageBreak(heightNeeded + 5);

      doc.text(lines, marginX, cursorY);
      cursorY += heightNeeded + 4; 
    };

    // HELPER: Sectie Kop
    const addSectionHeader = (title) => {
      checkPageBreak(25); 
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
        const heightNeeded = lines.length * 5; 

        checkPageBreak(heightNeeded + 2);

        // Teken bullet
        doc.text("•", marginX, cursorY);
        
        // Teken tekst
        doc.text(lines, marginX + bulletIndent, cursorY);
        
        cursorY += heightNeeded + 2; 
      });
      cursorY += 4; 
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
        checkPageBreak(30); 

        // Fase grijs blokje
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(marginX, cursorY, contentWidth, 8, 1, 1, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        const title = normalizeLessonText(phase.title);
        doc.text(`${index + 1}. ${title}`, marginX + 3, cursorY + 5.5);

        if (phase.time || phase.timingMinutes) {
          const time = normalizeLessonText(phase.time || `${phase.timingMinutes} min`);
          doc.setFont("helvetica", "normal");
          doc.text(time, pageWidth - marginX - 5, cursorY + 5.5, { align: 'right' });
        }
        
        cursorY += 14;

        if (phase.description) {
          addParagraph(phase.description, 10, "italic", [80, 80, 80]);
        }

        if (phase.teacherActions) {
           doc.setFont("helvetica", "bold");
           doc.setFontSize(10);
           doc.setTextColor(0,0,0);
           checkPageBreak(10);
           doc.text("Docent:", marginX, cursorY);
           cursorY += 5;
           addParagraph(phase.teacherActions, 10);
        }

        if (phase.studentActivities) {
           doc.setFont("helvetica", "bold");
           doc.setFontSize(10);
           doc.setTextColor(0,0,0);
           checkPageBreak(10);
           doc.text("Leerling:", marginX, cursorY);
           cursorY += 5;
           addParagraph(phase.studentActivities, 10);
        }

        cursorY += 4; 
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

    const filename = `Lesbrief-${lessonTitle.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    doc.save(filename);

  } catch (e) {
    console.error("PDF Generation Error:", e);
    alert("Er ging iets mis bij het genereren van de PDF.");
  }
};