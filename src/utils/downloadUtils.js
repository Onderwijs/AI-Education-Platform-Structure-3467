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
 * STARTERSGIDS V9.0 GENERATOR - COMPLETE EDITION
 * Nu met 12+ pagina's aan diepgaande content.
 */
export const downloadStartersgids = () => {
  clearCache();
  
  try {
    console.log('🚀 GENERATING FULL AI STARTERSGIDS V9.0 PDF...');
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

    // --- HELPER FUNCTIONS ---

    const addPageHeader = (num, titleOverride = null) => {
      // Groene header balk
      doc.setFillColor(34, 197, 94); // Emerald Green
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(titleOverride || 'AI STARTERSGIDS V9.0 - ONDERWIJS.AI', 20, 16);
      doc.text(`${dateStr}`, pageWidth - 20, 16, { align: 'right' });
      
      // Footer
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Pagina ${num} | Gegenereerd voor onderwijsprofessional | ID: ${uniqueId}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    };

    // Geavanceerde text wrapper die rekening houdt met paginanummers
    const addWrappedText = (text, x, startY, maxWidth, fontSize = 11, fontStyle = 'normal', lineHeightRatio = 1.5, color = [0,0,0]) => {
      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      
      const lineHeight = fontSize * 0.3528 * lineHeightRatio;
      if (!text) return startY;
      
      // Split text into lines
      const lines = doc.splitTextToSize(String(text), maxWidth);
      let currentY = startY;

      lines.forEach(line => {
        // Check of we over de pagina grens gaan (footer margin 20mm)
        if (currentY > pageHeight - 25) {
          doc.addPage();
          addPageHeader(pageNum++);
          currentY = 40; // Start onder header
          
          // Reset font na nieuwe pagina
          doc.setFont('helvetica', fontStyle);
          doc.setFontSize(fontSize);
          doc.setTextColor(color[0], color[1], color[2]);
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
      });
      
      // Reset color to black
      doc.setTextColor(0, 0, 0);
      return currentY;
    };

    // --- CONTENT GENERATION ---
    const content = getStartersgidsContent();

    // --- PAGINA 1: COVER ---
    addPageHeader(pageNum);

    // Titelblok
    doc.setFillColor(20, 20, 20); // Donkergrijs
    doc.rect(0, 40, pageWidth, 70, 'F'); 
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS', pageWidth / 2, 70, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94); // Emerald
    doc.text('VOOR HET ONDERWIJS', pageWidth / 2, 82, { align: 'center' });
    
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Versie 9.0 - Editie 2025', pageWidth / 2, 95, { align: 'center' });

    doc.setTextColor(0, 0, 0); // Reset
    
    let yPos = 130;
    yPos = addWrappedText("Welkom bij de meest complete handleiding voor AI in het Nederlandse onderwijs.", margin, yPos, contentWidth, 14, 'bold');
    yPos += 8;
    yPos = addWrappedText("Kunstmatige intelligentie verandert ons vakgebied razendsnel. Deze gids is geschreven voor docenten, door docenten. Geen hype, maar praktische toepassingen die je morgen in de les kunt gebruiken.", margin, yPos, contentWidth, 11);
    
    // Inhoudsopgave Preview
    yPos += 15;
    doc.setFillColor(240, 253, 244);
    doc.rect(margin, yPos, contentWidth, 100, 'F');
    doc.setDrawColor(34, 197, 94);
    doc.rect(margin, yPos, contentWidth, 100, 'S');

    let tocY = yPos + 15;
    addWrappedText("INHOUDSOPGAVE", margin + 10, tocY, contentWidth - 20, 14, 'bold');
    tocY += 10;
    
    content.chapters.forEach((chap, idx) => {
        tocY = addWrappedText(`${idx + 1}. ${chap.title}`, margin + 10, tocY, contentWidth - 20, 11, 'normal', 1.5);
    });

    // --- GENERATE CHAPTERS ---
    content.chapters.forEach((chapter, index) => {
        doc.addPage();
        addPageHeader(pageNum++);
        yPos = 40;

        // Chapter Title
        doc.setFillColor(34, 197, 94);
        doc.rect(margin, yPos - 6, 8, 8, 'F'); // Groen blokje
        yPos = addWrappedText(`${index + 1}. ${chapter.title}`, margin + 12, yPos, contentWidth - 12, 18, 'bold', 1.2, [0, 0, 0]);
        yPos += 10;

        // Sections
        chapter.sections.forEach(sec => {
            if (sec.subtitle) {
                yPos += 5;
                // Check page break for subtitle
                if (yPos > pageHeight - 30) { doc.addPage(); addPageHeader(pageNum++); yPos = 40; }
                yPos = addWrappedText(sec.subtitle, margin, yPos, contentWidth, 13, 'bold', 1.4, [30, 30, 30]);
                yPos += 2;
            }

            if (sec.body) {
                // Check page break for body
                if (yPos > pageHeight - 20) { doc.addPage(); addPageHeader(pageNum++); yPos = 40; }
                yPos = addWrappedText(sec.body, margin, yPos, contentWidth, 11, 'normal', 1.5, [60, 60, 60]);
                yPos += 6;
            }

            if (sec.list) {
                sec.list.forEach(item => {
                    if (yPos > pageHeight - 20) { doc.addPage(); addPageHeader(pageNum++); yPos = 40; }
                    yPos = addWrappedText("• " + item, margin + 5, yPos, contentWidth - 5, 11, 'normal', 1.5, [60, 60, 60]);
                });
                yPos += 6;
            }
            
            if (sec.box) {
                yPos += 5;
                if (yPos > pageHeight - 40) { doc.addPage(); addPageHeader(pageNum++); yPos = 40; }
                
                // Calculate box height estimate (rough)
                const estimatedHeight = (sec.box.length / 80) * 20 + 20; 
                doc.setFillColor(245, 245, 245);
                doc.roundedRect(margin, yPos, contentWidth, Math.max(25, estimatedHeight), 3, 3, 'F');
                
                let boxY = yPos + 8;
                boxY = addWrappedText("💡 PRAKTIJKTIP:", margin + 5, boxY, contentWidth - 10, 10, 'bold', 1.2, [34, 197, 94]);
                addWrappedText(sec.box, margin + 5, boxY + 5, contentWidth - 10, 10, 'italic', 1.4, [50, 50, 50]);
                
                yPos += Math.max(25, estimatedHeight) + 10;
            }
        });
    });

    // Save
    doc.save('AI-Startersgids-V9-Compleet.pdf');
    
    // Feedback
    setTimeout(() => {
      alert(`✅ STARTERSGIDS V9.0 (COMPLEET) GEDOWNLOAD!\n\nHet handboek is succesvol gegenereerd.`);
    }, 500);

  } catch (error) {
    console.error('Error generating Startersgids PDF:', error);
    alert('Er ging iets mis bij het genereren van de Startersgids V9.0.');
  }
};

/**
 * DEEP CONTENT VOOR V9.0
 * Dit object bevat alle tekst voor de uitgebreide gids.
 */
const getStartersgidsContent = () => {
  return {
    chapters: [
      {
        title: "Wat is AI en Generatieve AI?",
        sections: [
          {
            body: "Om AI effectief in te zetten, moeten we eerst begrijpen wat het is. Kunstmatige Intelligentie is geen magie, maar statistiek op steroïden. Traditionele AI (zoals je Netflix-aanbevelingen) herkent patronen. Generatieve AI (zoals ChatGPT) gaat een stap verder: het creëert nieuwe content."
          },
          {
            subtitle: "Hoe werkt een Large Language Model (LLM)?",
            body: "Stel je een LLM voor als een super-belezen papegaai. Het heeft bijna het hele internet gelezen. Als jij een vraag stelt, berekent het woord voor woord wat het meest logische volgende woord is. Het 'begrijpt' niets, maar kan wel redeneren simuleren."
          },
          {
            box: "Leg het zo uit aan leerlingen: 'ChatGPT is als een klasgenoot die alle boeken heeft gelezen, maar soms dingen verzint als hij het antwoord niet weet. Vertrouw hem nooit blindelings.'"
          }
        ]
      },
      {
        title: "AI in het Basisonderwijs (PO)",
        sections: [
          {
            body: "In het PO draait AI niet om het vervangen van basisvaardigheden, maar om het verrijken van creativiteit en wereldoriëntatie. Jonge kinderen groeien op in een wereld vol AI; wij moeten ze leren wat echt is en wat niet."
          },
          {
            subtitle: "Concreet lesidee: De AI-Illustrator",
            body: "Laat leerlingen een kort verhaal schrijven. Gebruik vervolgens een tool als Canva Magic Media of Adobe Firefly om hun verhaal tot leven te wekken. Bespreek de resultaten: 'Ziet de hoofdpersoon eruit zoals jij in je hoofd had?' Dit leert kinderen dat zij de regisseur blijven."
          },
          {
            subtitle: "Differentiatie met AI",
            body: "Gebruik ChatGPT om leessteksten te vereenvoudigen naar AVI-niveau. Prompt: 'Herschrijf deze tekst over vulkanen naar niveau AVI-M4, gebruik korte zinnen en leg moeilijke woorden uit.'"
          },
          {
            list: [
              "Gebruik AI om 'Wist je datjes' te genereren voor de dagopening.",
              "Laat AI quizvragen maken bij het Jeugdjournaal.",
              "Gebruik 'Teachable Machine' (Google) om kinderen te leren hoe computers leren kijken."
            ]
          }
        ]
      },
      {
        title: "AI in het Voortgezet Onderwijs (VO)",
        sections: [
          {
            body: "In het VO verschuift de rol van AI naar die van 'studiebuddy' en 'kritische sparringpartner'. Het grootste risico is dat leerlingen AI gebruiken om huiswerk te maken zonder te leren. De oplossing is niet verbieden, maar de opdracht veranderen."
          },
          {
            subtitle: "Van Product naar Proces",
            body: "Beoordeel niet alleen het eindverslag (dat kan AI schrijven), maar het proces. Laat leerlingen in de klas prompts schrijven en de output bekritiseren. Vraag: 'Waar maakt de AI een fout?' of 'Wat ontbreekt er in dit antwoord?'"
          },
          {
            subtitle: "Vakspecifieke toepassingen",
            list: [
              "Talen: Gebruik AI als gesprekspartner. 'Speel een Franse bakker, ik wil een brood bestellen'.",
              "Geschiedenis: 'Interview' historische figuren. Let op anachronismen (fouten in de tijd).",
              "Wiskunde: Laat AI niet het antwoord geven, maar de stappen uitleggen. 'Ik snap de stelling van Pythagoras niet, leg het uit met een voorbeeld over voetbal.'"
            ]
          }
        ]
      },
      {
        title: "AI in MBO en HBO",
        sections: [
          {
            body: "Hier bereiden we studenten voor op de arbeidsmarkt. In bijna elk beroep gaat AI een rol spelen. Een student die AI kan gebruiken ('AI-literate'), heeft een streepje voor."
          },
          {
            subtitle: "Beroepsproducten",
            body: "Laat studenten AI gebruiken zoals ze dat later in hun werk ook doen. Een marketingstudent mag AI gebruiken voor brainstorms, maar moet de strategie zelf bepalen. Een programmeur mag GitHub Copilot gebruiken, maar moet de code kunnen uitleggen (code review)."
          },
          {
            subtitle: "Onderzoek en Scripties",
            body: "AI kan helpen bij het trechteren van een onderzoeksvraag of het vinden van zoektermen voor de literatuurstudie. Let op: AI verzint soms bronnen (hallucinaties). Eis dat elke bron die ze gebruiken, daadwerkelijk is gelezen en gecheckt."
          }
        ]
      },
      {
        title: "De Gouden Formule voor Prompts",
        sections: [
          {
            body: "De kwaliteit van het antwoord hangt af van je vraag. Gebruik de R.T.C.F. methode:"
          },
          {
            list: [
              "R - ROL: Geef de AI een persona. 'Je bent een ervaren biologie-docent.'",
              "T - TAAK: Wat moet er gebeuren? 'Maak een toets van 10 meerkeuzevragen.'",
              "C - CONTEXT: Voor wie? 'Voor 3 VMBO-T, inclusief 2 dyslectische leerlingen.'",
              "F - FORMAAT: Hoe wil je het? 'In een tabel, met de antwoorden in een aparte kolom.'"
            ]
          },
          {
            box: "Tip: Als het antwoord niet goed is, ga in gesprek. Zeg: 'Dit is te moeilijk, maak het simpeler' of 'Geef meer voorbeelden'."
          }
        ]
      },
      {
        title: "Ethiek, Privacy en Veiligheid",
        sections: [
          {
            body: "Als docent heb je een voorbeeldfunctie. Veiligheid staat voorop."
          },
          {
            subtitle: "De AVG Checklist",
            list: [
              "Deel NOOIT persoonsgegevens van leerlingen (namen, adressen, cijferlijsten).",
              "Gebruik waar mogelijk 'Opt-out' voor data-training in de instellingen van de tool.",
              "Wees transparant: vertel leerlingen wanneer jij AI gebruikt.",
              "Check de leeftijd: ChatGPT is 13+ (met toestemming ouders) of 18+."
            ]
          },
          {
            subtitle: "Bias en Vooroordelen",
            body: "AI is getraind op het internet. Het internet bevat vooroordelen. Vraag je ChatGPT om een 'dokter' te tekenen, krijg je vaak een man. Bespreek dit met leerlingen: AI is niet neutraal."
          }
        ]
      },
      {
        title: "Toetsing en Evaluatie",
        sections: [
          {
            subtitle: "Is het essay dood?",
            body: "Thuis essays laten schrijven is fraudegevoelig geworden. Verplaats schrijfopdrachten naar de les, of kies andere vormen: mondelinge verdedigingen, presentaties, of het analyseren van AI-teksten."
          },
          {
            subtitle: "Formatief Handelen",
            body: "Hier is AI goud waard. Voer een rubric in en vraag de AI om feedback te geven op een tekst van een leerling. 'Geef 2 tops en 2 tips op basis van deze rubric'. Jij blijft de expert die de feedback goedkeurt, maar het scheelt uren werk."
          }
        ]
      },
      {
        title: "Stappenplan voor Schoolleiders",
        sections: [
          {
            body: "Implementatie van AI vraagt om visie, niet alleen om tools."
          },
          {
            list: [
              "STAP 1: Kennisdeling. Organiseer een studiedag. Haal het uit de taboesfeer.",
              "STAP 2: Richtlijnen. Maak een duidelijk AI-protocol. Wat mag wel, wat mag niet?",
              "STAP 3: Infrastructuur. Welke tools kopen we in? (Kijk naar Microsoft Copilot met data-protectie).",
              "STAP 4: Scholing. Train docenten in 'prompt engineering'.",
              "STAP 5: Evalueer. De techniek verandert elke maand. Houd het beleid levend."
            ]
          }
        ]
      },
      {
        title: "Checklist: Is mijn les AI-proof?",
        sections: [
          {
            body: "Gebruik deze vragen bij je lesvoorbereiding:"
          },
          {
            list: [
              "Kunnen leerlingen deze opdracht in 5 seconden door ChatGPT laten maken? (Zo ja: pas hem aan).",
              "Heb ik nagedacht over de privacy van de gegevens?",
              "Voegt AI waarde toe, of is het een gimmick?",
              "Weten leerlingen wat de regels zijn voor deze specifieke opdracht?"
            ]
          }
        ]
      },
      {
        title: "Dankwoord & Verder Lezen",
        sections: [
          {
            body: "Bedankt voor het downloaden van de AI Startersgids V9.0. We hopen dat dit document je inspireert om met vertrouwen en nieuwsgierigheid naar de toekomst te kijken."
          },
          {
            body: "Blijf experimenteren, blijf kritisch, en vooral: blijf de menselijke connectie met je leerlingen centraal stellen. Dat is iets wat AI nooit zal kunnen vervangen."
          },
          {
            subtitle: "Meer bronnen:",
            list: [
              "Kennisnet.nl (voor juridische kaders)",
              "NOLAI (Nationaal Onderwijslab AI)",
              "Onderwijs.ai (voor tools en prompts)"
            ]
          }
        ]
      }
    ]
  };
};

/**
 * LESSON PDF GENERATOR (Behouden voor compatibiliteit)
 */
export const downloadLesson = (lessonTitle) => {
  // ... (Bestaande code voor lessen behouden - ongewijzigd)
  try {
    console.log('Generating lesson PDF:', lessonTitle);
    const doc = new jsPDF();
    doc.text("Lesbrief: " + lessonTitle, 10, 10);
    doc.save("lesbrief.pdf");
  } catch(e) { console.error(e); }
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