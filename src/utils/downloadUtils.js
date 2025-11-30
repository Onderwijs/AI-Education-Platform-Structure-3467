import jsPDF from 'jspdf';

/**
 * ULTRA AGGRESSIVE cache clearing helper
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
 * STARTERSGIDS V9.0 GENERATOR
 * Vervangt de placeholder met echte PDF generatie logica.
 */
export const downloadStartersgids = () => {
  clearCache();
  
  try {
    console.log('🚀 GENERATING AI STARTERSGIDS V9.0 PDF...');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const dateStr = new Date().toLocaleDateString('nl-NL');

    doc.setFont('helvetica');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    let pageNum = 1;

    // Helper voor tekst wrapping (consistent met downloadLesson)
    const addWrappedText = (text, x, startY, maxWidth, fontSize = 11, fontStyle = 'normal', lineHeightRatio = 1.4) => {
      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      const lineHeight = fontSize * 0.3528 * lineHeightRatio;
      if (typeof text !== 'string') text = String(text || '');
      
      const lines = doc.splitTextToSize(text, maxWidth);
      let currentY = startY;

      lines.forEach(line => {
        if (currentY > pageHeight - 25) {
          doc.addPage();
          addPageHeader(pageNum++);
          currentY = 40;
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
      });
      return currentY;
    };

    // Header functie
    const addPageHeader = (num) => {
      // Groene header balk
      doc.setFillColor(34, 197, 94); // Emerald Green
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('AI STARTERSGIDS - ONDERWIJS.AI', 20, 16);
      doc.text(`Versie 9.0 - ${dateStr}`, pageWidth - 20, 16, { align: 'right' });
      
      // Footer
      doc.setTextColor(85, 85, 85);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Pagina ${num} - Gegenereerd voor docent`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    };

    // --- PAGINA 1: COVER ---
    addPageHeader(pageNum);

    // Titelblok
    doc.setFillColor(0, 0, 0); // Zwart
    doc.rect(margin, 40, contentWidth, 60, 'F'); // Zwart vlak
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS', pageWidth / 2, 65, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(34, 197, 94); // Emerald tekst
    doc.text('VERSIE 9.0 (2025)', pageWidth / 2, 75, { align: 'center' });
    
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('De complete handleiding voor PO, VO en MBO/HBO', pageWidth / 2, 85, { align: 'center' });

    doc.setTextColor(0, 0, 0); // Terug naar zwart voor body tekst
    
    let yPos = 120;
    yPos = addWrappedText("Beste onderwijsprofessional,", margin, yPos, contentWidth, 12, 'bold');
    yPos += 5;
    yPos = addWrappedText("Welkom bij de volledig vernieuwde AI Startersgids V9.0. Deze gids is speciaal samengesteld om je wegwijs te maken in de wereld van kunstmatige intelligentie in het Nederlandse onderwijs.", margin, yPos, contentWidth, 11);
    yPos += 5;
    yPos = addWrappedText("In deze gids vind je geen ingewikkelde technische termen, maar praktische handvatten, concrete prompts en direct toepasbare werkvormen. We focussen op kansen, maar sluiten onze ogen niet voor de risico's.", margin, yPos, contentWidth, 11);

    // Inhoudsopgave Box
    yPos += 15;
    doc.setFillColor(240, 253, 244); // Lichtgroen
    doc.rect(margin, yPos, contentWidth, 80, 'F');
    doc.setDrawColor(34, 197, 94);
    doc.rect(margin, yPos, contentWidth, 80, 'S');

    let tocY = yPos + 15;
    addWrappedText("INHOUD VAN DEZE GIDS", margin + 10, tocY, contentWidth - 20, 14, 'bold');
    tocY += 10;
    
    const chapters = [
      "1. Wat is AI nu eigenlijk? (Uitleg voor in de klas)",
      "2. De Gouden Formule voor Prompts",
      "3. ChatGPT, Claude & Gemini: De verschillen",
      "4. Privacy & AVG Checklist",
      "5. 10 Kant-en-klare Lesideeën",
      "6. Toetsing & Fraudebeleid"
    ];

    chapters.forEach(chap => {
      tocY = addWrappedText(chap, margin + 10, tocY, contentWidth - 20, 11, 'normal', 1.5);
    });

    // --- PAGINA 2: WAT IS AI ---
    doc.addPage();
    addPageHeader(pageNum++);
    yPos = 40;

    yPos = addWrappedText("1. Wat is AI nu eigenlijk?", margin, yPos, contentWidth, 18, 'bold');
    yPos += 10;
    yPos = addWrappedText("AI (Artificial Intelligence) is geen magie, maar wiskunde. Het zijn computersystemen die taken uitvoeren waar normaal menselijke intelligentie voor nodig is, zoals het herkennen van patronen, het begrijpen van taal en het oplossen van problemen.", margin, yPos, contentWidth);
    yPos += 5;
    yPos = addWrappedText("Generatieve AI (zoals ChatGPT) kan nieuwe content maken op basis van alles wat het heeft 'gelezen' op het internet. Vergelijk het met een super-belezen papegaai: hij weet heel veel en kan zinnen maken die logisch klinken, maar hij 'begrijpt' de inhoud niet zoals een mens dat doet.", margin, yPos, contentWidth);

    yPos += 10;
    doc.setFillColor(239, 246, 255); // Lichtblauw
    doc.rect(margin, yPos, contentWidth, 35, 'F');
    addWrappedText("TIP VOOR IN DE KLAS:", margin + 5, yPos + 10, contentWidth - 10, 12, 'bold');
    addWrappedText("Laat leerlingen AI zien als een 'stagiair': heel snel en enthousiast, maar je moet het werk ALTIJD controleren op fouten.", margin + 5, yPos + 20, contentWidth - 10, 11, 'italic');
    yPos += 45;

    // --- PAGINA 3: DE GOUDEN FORMULE ---
    yPos = addWrappedText("2. De Gouden Formule voor Prompts", margin, yPos, contentWidth, 18, 'bold');
    yPos += 10;
    yPos = addWrappedText("De kwaliteit van je output hangt af van je input (Garbage in = Garbage out). Gebruik deze structuur voor de beste resultaten:", margin, yPos, contentWidth);
    yPos += 5;
    
    const formula = [
      "ROL: Wie moet de AI zijn? (Bijv. 'Je bent een ervaren geschiedenisdocent')",
      "TAAK: Wat moet hij doen? (Bijv. 'Maak een lesplan van 50 minuten')",
      "CONTEXT: Voor wie is het? (Bijv. 'Voor 3 HAVO, leerlingen vinden het saai')",
      "FORMAAT: Hoe wil je het hebben? (Bijv. 'In een tabel met tijdsindicatie')"
    ];

    formula.forEach(item => {
      yPos = addWrappedText("• " + item, margin + 5, yPos, contentWidth - 5, 11, 'bold');
    });

    // --- PAGINA 4: TOOLS ---
    doc.addPage();
    addPageHeader(pageNum++);
    yPos = 40;
    yPos = addWrappedText("3. Handige Tools voor Docenten", margin, yPos, contentWidth, 18, 'bold');
    yPos += 10;
    
    const tools = [
      { name: "ChatGPT (OpenAI)", desc: "De alleskunner. Goed voor teksten, lesideeën en brainstormen." },
      { name: "Claude (Anthropic)", desc: "Veiliger, schrijft menselijker en kan grote bestanden lezen. Aanrader voor docenten." },
      { name: "Perplexity AI", desc: "Zoekmachine die bronnen geeft. Ideaal voor feitenonderzoek." },
      { name: "Gamma.app", desc: "Maakt complete presentaties (PowerPoints) in seconden." }
    ];

    tools.forEach(tool => {
      yPos = addWrappedText(tool.name, margin, yPos, contentWidth, 12, 'bold');
      yPos = addWrappedText(tool.desc, margin, yPos, contentWidth, 11);
      yPos += 5;
    });

    // --- PAGINA 5: PRIVACY ---
    doc.addPage();
    addPageHeader(pageNum++);
    yPos = 40;
    yPos = addWrappedText("4. Privacy & Veiligheid", margin, yPos, contentWidth, 18, 'bold');
    yPos += 10;
    
    doc.setDrawColor(220, 38, 38); // Rood
    doc.setLineWidth(1);
    doc.rect(margin, yPos, contentWidth, 40, 'S');
    
    let warnY = yPos + 10;
    addWrappedText("⚠️ BELANGRIJKE WAARSCHUWING", margin + 5, warnY, contentWidth - 10, 12, 'bold');
    warnY += 8;
    addWrappedText("Voer NOOIT persoonsgegevens van leerlingen in (namen, cijferlijsten, adressen).", margin + 5, warnY, contentWidth - 10, 11);
    warnY += 8;
    addWrappedText("Gebruik termen als 'Leerling A' of anonimiseer data voordat je het uploadt.", margin + 5, warnY, contentWidth - 10, 11);

    // Save
    doc.save('AI-Startersgids-V9-OnderwijsAI.pdf');
    
    // Feedback aan gebruiker
    setTimeout(() => {
      alert(`✅ STARTERSGIDS V9.0 GEDOWNLOAD!\n\nVeel succes met het toepassen van AI in je onderwijs.`);
    }, 500);

  } catch (error) {
    console.error('Error generating Startersgids PDF:', error);
    alert('Er ging iets mis bij het genereren van de Startersgids V9.0. Probeer het opnieuw.');
  }
};

/**
 * COMPLETE LESSON PDF GENERATOR
 * Reused from existing logic, maintained for compatibility.
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('🔥 GENERATING FIXED LAYOUT LESSON PDF FOR:', lessonTitle);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const uniqueId = Math.random().toString(36).substring(2, 8);
    const dateStr = new Date().toLocaleDateString('nl-NL');

    doc.setFont('helvetica');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    let pageNum = 1;

    // Verbeterde text wrapper met dynamische line-height
    const addWrappedText = (text, x, startY, maxWidth, fontSize = 11, fontStyle = 'normal', lineHeightRatio = 1.4) => {
      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      const lineHeight = fontSize * 0.3528 * lineHeightRatio;
      if (typeof text !== 'string') text = String(text || '');
      const lines = doc.splitTextToSize(text, maxWidth);
      let currentY = startY;
      lines.forEach(line => {
        if (currentY > pageHeight - 30) {
          doc.addPage();
          addPageHeader(pageNum++);
          currentY = 40;
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
      });
      return currentY;
    };

    const addPageHeader = (num) => {
      doc.setFillColor(34, 197, 94); // Emerald Green
      doc.rect(0, 0, pageWidth, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('AI LESMATERIAAL - ONDERWIJS.AI', 20, 16);
      doc.text(`Pagina ${num}`, pageWidth - 20, 16, { align: 'right' });
      doc.setTextColor(85, 85, 85);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('https://onderwijs.ai/', pageWidth / 2, pageHeight - 16, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    };

    const lessonContent = generateLessonContent(lessonTitle);

    addPageHeader(pageNum);
    
    // 1. RODE BOX (Subheader)
    doc.setFillColor(220, 38, 38); 
    doc.rect(15, 40, 180, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPLETE LESBRIEF - AI ONDERWIJS', 105, 53, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // 2. HOOFDTITEL
    let yPos = 75;
    yPos = addWrappedText(lessonContent.title.toUpperCase(), margin, yPos, contentWidth, 24, 'bold', 1.3);
    yPos += 15;
    
    // 3. META INFORMATIE
    yPos = addWrappedText(`Gegenereerd op: ${dateStr}`, margin, yPos, contentWidth, 12, 'normal', 1.5);
    yPos = addWrappedText(`Les ID: ${uniqueId}`, margin, yPos, contentWidth, 12, 'normal', 1.5);
    yPos = addWrappedText(`Niveau: ${lessonContent.targetGroup}`, margin, yPos, contentWidth, 12, 'normal', 1.5);
    yPos = addWrappedText(`Duur: ${lessonContent.duration}`, margin, yPos, contentWidth, 12, 'normal', 1.5);
    yPos += 10;

    // 4. SAMENVATTING BOX
    doc.setFillColor(240, 248, 255);
    doc.rect(margin, yPos, contentWidth, 70, 'F');
    doc.setTextColor(0, 0, 0);
    let boxTextY = yPos + 15;
    boxTextY = addWrappedText('LESOVERZICHT', margin + 10, boxTextY, contentWidth - 20, 14, 'bold');
    boxTextY += 5;
    const summaryPoints = lessonContent.summary || [
        `Doelgroep: ${lessonContent.targetGroup}`,
        `Tijdsduur: ${lessonContent.duration}`, 
        "Deze lesbrief bevat een volledig uitgewerkt lesplan, inclusief theorie, werkvormen en evaluatiemateriaal."
    ];
    summaryPoints.forEach(item => {
      boxTextY = addWrappedText(`• ${item}`, margin + 10, boxTextY, contentWidth - 20, 11, 'normal', 1.5);
    });

    // --- PAGE 2: INHOUDSOPGAVE ---
    doc.addPage();
    addPageHeader(pageNum++);
    yPos = 40;
    yPos = addWrappedText('INHOUDSOPGAVE', margin, yPos, contentWidth, 20, 'bold');
    yPos += 10;
    
    const tableOfContents = [
      '1. Lesinformatie en Voorbereiding',
      '2. Lesdoelen en Competenties',
      '3. Theorie en Lesopbouw',
      '4. Praktische Activiteiten',
      '5. Werkbladen en Materialen',
      '6. Evaluatie en Docentenhandleiding'
    ];
    
    if (lessonContent.extras) {
        lessonContent.extras.forEach((extra, idx) => {
            tableOfContents.push(`${7 + idx}. ${extra.title}`);
        });
    }

    tableOfContents.forEach((item, index) => {
      yPos = addWrappedText(item, margin + 10, yPos, contentWidth - 20, 12, 'normal', 1.6);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin + 10, yPos - 2, contentWidth - 10, yPos - 2);
    });

    const renderSection = (title, contentArray, color = [70, 130, 180], sectionNum) => {
        doc.addPage();
        addPageHeader(pageNum++);
        doc.setFillColor(color[0], color[1], color[2]);
        doc.rect(margin, 35, contentWidth, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(`${sectionNum}. ${title.toUpperCase()}`, margin + 5, 42);
        doc.setTextColor(0, 0, 0);
        yPos = 55;

        if (!contentArray || contentArray.length === 0) {
            addWrappedText("(Geen inhoud beschikbaar voor deze sectie)", margin, yPos, contentWidth);
            return;
        }

        contentArray.forEach(line => {
            if (line === '') {
                yPos += 4;
            } else if (line.endsWith(':')) {
                yPos += 4;
                yPos = addWrappedText(line, margin, yPos, contentWidth, 12, 'bold', 1.4);
            } else if (line.startsWith('•') || line.startsWith('-')) {
                yPos = addWrappedText(line, margin + 5, yPos, contentWidth - 5, 11, 'normal', 1.4);
            } else {
                yPos = addWrappedText(line, margin, yPos, contentWidth, 11, 'normal', 1.4);
            }
            yPos += 1;
        });
    };

    renderSection('Lesinformatie en Voorbereiding', lessonContent.preparation, [70, 130, 180], 1);
    renderSection('Lesdoelen en Competenties', lessonContent.objectives, [34, 197, 94], 2);
    renderSection('Theorie en Lesopbouw', lessonContent.structure, [147, 51, 234], 3);
    renderSection('Praktische Activiteiten', lessonContent.activities, [220, 38, 38], 4);
    renderSection('Werkbladen en Materialen', lessonContent.materials, [234, 179, 8], 5);
    renderSection('Evaluatie en Docentenhandleiding', lessonContent.evaluation, [185, 28, 28], 6);

    if (lessonContent.extras && lessonContent.extras.length > 0) {
        lessonContent.extras.forEach((extra, idx) => {
            const colors = [[79, 70, 229], [236, 72, 153], [14, 165, 233]];
            const color = colors[idx % colors.length] || [70, 130, 180];
            renderSection(extra.title, extra.content, color, 7 + idx);
        });
    }

    const cleanTitle = lessonContent.title.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 50);
    const filenameLesson = `${cleanTitle}-COMPLETE-LESBRIEF.pdf`;
    doc.save(filenameLesson);
    
    setTimeout(() => {
        alert(`✅ COMPLETE LESBRIEF GEDOWNLOAD!\n\nDe lesbrief "${lessonContent.title}" is succesvol gegenereerd.`);
    }, 500);

  } catch (error) {
    console.error('Error generating lesson PDF:', error);
    alert('Er was een probleem bij het genereren van de lesbrief. Probeer het opnieuw.');
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

/**
 * GENERATE DEEP LESSON CONTENT
 */
const generateLessonContent = (title) => {
  const t = title.toLowerCase();

  if (t.includes('data') || t.includes('visualisatie')) {
    return {
      title: "Datavisualisatie met AI: Van Ruwe Data naar Inzicht",
      duration: "90-120 minuten",
      targetGroup: "MBO Niveau 4 / HBO (ICT, Economie, marketing)",
      summary: [
        "In deze les leren studenten hoe ze AI kunnen inzetten om data te analyseren en te visualiseren.",
        "Focus op kritisch denken: klopt de visualisatie met de werkelijkheid?",
        "Praktische opdracht: Dataset genereren, opschonen en presenteren."
      ],
      preparation: [
        "CONTEXT VOOR DE DOCENT:",
        "Data is overal, maar ruwe data is voor mensen lastig te interpreteren. Visualisatie is de brug tussen cijfers en inzicht. AI-tools zoals ChatGPT of Claude kunnen hierbij enorm helpen, maar brengen ook risico's met zich mee.",
        "",
        "BENODIGDHEDEN:",
        "• Laptops met internettoegang.",
        "• Toegang tot een AI-tool (ChatGPT, Claude, of Gemini).",
        "• Spreadsheet software (Excel)."
      ],
      objectives: [
        "LEERDOELEN:",
        "• De student kan uitleggen waarom datavisualisatie essentieel is.",
        "• De student kan effectieve prompts schrijven voor data-analyse.",
        "• De student kan kritisch reflecteren op de output van AI."
      ],
      structure: [
        "FASE 1: INTRODUCTIE (15 min)",
        "Toon een enorme tabel met ruwe cijfers. Vraag wie het inzicht ziet.",
        "",
        "FASE 2: THEORIE & DEMO (20 min)",
        "Uitleg over 'Data Storytelling'. Demo met ChatGPT csv generatie.",
        "",
        "FASE 3: PRAKTIJKOPDRACHT (45 min)",
        "Studenten voeren de data-analyse cyclus uit met AI."
      ],
      activities: [
        "OPDRACHT: DE DATA ANALYST",
        "Scenario A (Marketing): Je lanceert een nieuwe frisdrank.",
        "1. Prompten: Vraag de AI om een realistische dataset.",
        "2. Valideren: Kijk naar de data.",
        "3. Visualiseren: Importeer in Excel."
      ],
      materials: [
        "WERKBLAD 'DATA REFLECTIE':",
        "Vragen over de prompt en de gevonden fouten."
      ],
      evaluation: [
        "RUBRIC:",
        "• Voldoende: Dataset is bruikbaar en grafiek klopt.",
        "• Goed: Data is kritisch bekeken (cleaning)."
      ]
    };
  }

  if (t.includes('geschiedenis')) {
    return {
      title: "AI in de Geschiedenis: Bronnen, Bias en Toekomst",
      duration: "50-100 minuten",
      targetGroup: "VO Bovenbouw (HAVO/VWO)",
      summary: [
        "Leerlingen onderzoeken hoe AI historische bronnen kan simuleren.",
        "Focus op bronkritiek en bias."
      ],
      preparation: [
        "CONTEXT:",
        "AI kan nieuwe bronnen genereren. Dit biedt kansen voor empathie, maar risico's op vervalsing."
      ],
      objectives: [
        "LEERDOELEN:",
        "• De leerling begrijpt dat AI-tekst geen primaire bron is.",
        "• De leerling kan anachronismen opsporen."
      ],
      structure: [
        "FASE 1: OPENING",
        "Toon een 'historische foto' die nep is.",
        "FASE 2: DE TIJDMACHINE",
        "Interview een historisch figuur via AI."
      ],
      activities: [
        "OPDRACHT: FACT-CHECK DE AI",
        "Laat de AI een verhaal schrijven en zoek de fouten."
      ],
      materials: [
        "WERKBLAD BRONNENKRITIEK 2.0"
      ],
      evaluation: [
        "EVALUATIE:",
        "Beoordeel op de gevonden fouten en reflectie."
      ]
    };
  }
  
  // Default fallback
  return {
    title: title || "Algemene AI Lesbrief",
    duration: "50 minuten",
    targetGroup: "Algemeen",
    summary: ["Algemene structuur voor een AI-les."],
    preparation: ["Zorg voor internettoegang."],
    objectives: ["• Kennismaking met AI."],
    structure: ["1. Introductie", "2. Kern", "3. Afsluiting"],
    activities: ["Bespreek een nieuwsbericht."],
    materials: ["Geen."],
    evaluation: ["Klassikale nabespreking."]
  };
};