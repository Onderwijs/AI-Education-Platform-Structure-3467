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
  text = text.replace(/^\s*[-•]\s*/, ""); // Strip bullets at start
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
 * Genereert een A4 PDF die visueel identiek is aan de interface
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

    const today = new Date().toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // 1. Header (MATCH UI)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(17, 24, 39); // Gray-900
    doc.text("Klassenplattegrond", margin, cursorY);
    
    cursorY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text(`Datum: ${today} | Indeling: ${layout.charAt(0).toUpperCase() + layout.slice(1)} | Optimalisatie: ${goal}`, margin, cursorY);

    cursorY += 10;

    // 2. Teacher Desk (MATCH UI EXACTLY)
    doc.setFillColor(31, 41, 55); // Gray-800
    doc.roundedRect(pageWidth / 2 - 25, cursorY, 50, 10, 2, 2, 'F');
    // Indigo accent line on top of desk
    doc.setFillColor(79, 70, 229); // Indigo-600
    doc.rect(pageWidth / 2 - 25, cursorY, 50, 1, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text("BUREAU DOCENT / DIGIBORD", pageWidth / 2, cursorY + 6.5, { align: 'center' });

    cursorY += 22;

    // 3. Grid Calculation
    const cols = layout === 'rijen' ? 6 : 3;
    const rows = Math.ceil(students.length / cols);
    const spacing = layout === 'rijen' ? 4 : 8;
    
    // Calculate sizes to fit page
    const availableHeight = pageHeight - cursorY - 20;
    const baseDeskWidth = (contentWidth - (cols - 1) * spacing) / cols;
    const baseDeskHeight = layout === 'rijen' ? 22 : 30;
    
    // Scale factor if content is too tall
    const totalNeededHeight = (rows * baseDeskHeight) + ((rows - 1) * spacing);
    const scale = totalNeededHeight > availableHeight ? availableHeight / totalNeededHeight : 1;
    
    const deskWidth = baseDeskWidth;
    const deskHeight = baseDeskHeight * scale;
    const gridSpacing = spacing * scale;

    // 4. Render Student Cards (MATCH UI CARDS)
    students.forEach((name, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = margin + (col * (deskWidth + spacing));
      const y = cursorY + (row * (deskHeight + gridSpacing));

      // Card Background & Border
      if (layout === 'rijen') {
        doc.setDrawColor(219, 234, 254); // blue-100
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setDrawColor(199, 210, 254); // indigo-200
        doc.setFillColor(238, 242, 255); // indigo-50
      }
      doc.roundedRect(x, y, deskWidth, deskHeight, 2, 2, 'FD');

      // User Icon Placeholder (Simple circle like UI)
      doc.setFillColor(243, 244, 246); // Gray-100
      doc.circle(x + (deskWidth / 2), y + (deskHeight * 0.3), 3 * scale, 'F');

      // Student Name
      doc.setFont("helvetica", "bold");
      const fontSize = Math.max(6, 9 * scale);
      doc.setFontSize(fontSize);
      doc.setTextColor(31, 41, 55);
      
      const cleanName = normalizeLessonText(name);
      const displayName = cleanName.length > 15 ? cleanName.substring(0, 13) + ".." : cleanName;
      doc.text(displayName, x + (deskWidth / 2), y + (deskHeight * 0.65), { align: 'center' });
      
      // Bottom accent line (The "Progress bar" from UI)
      const isOrange = index % 7 === 0;
      doc.setFillColor(229, 231, 235); // gray-200 (track)
      doc.rect(x + 4, y + deskHeight - 5 * scale, deskWidth - 8, 1.2 * scale, 'F');
      
      doc.setFillColor(isOrange ? 251 : 74, isOrange ? 146 : 222, isOrange ? 60 : 128); // orange-400 or green-400
      const barWidth = isOrange ? (deskWidth - 8) / 3 : (deskWidth - 8);
      doc.rect(x + 4, y + deskHeight - 5 * scale, barWidth, 1.2 * scale, 'F');
    });

    // 5. Footer
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text("Gegenereerd door Onderwijs.ai – De plattegrond is lokaal verwerkt voor privacy.", pageWidth / 2, pageHeight - 10, { align: 'center' });

    const timestamp = new Date().getTime();
    doc.save(`Klassenplattegrond-${timestamp}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Fout bij het maken van de PDF.");
  }
};

/**
 * STARTERSGIDS DOWNLOAD V9.0 (ROBUUSTE VERSIE - 8-10 PAGINA'S)
 */
export const downloadStartersgids = () => {
  clearCache();
  try {
    const doc = new jsPDF();
    // CONFIGURATIE
    const marginX = 20;
    const marginTop = 20;
    const marginBottom = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (marginX * 2);
    let cursorY = marginTop;

    // --- HELPERS ---
    const checkPageBreak = (heightNeeded) => {
      if (cursorY + heightNeeded > pageHeight - marginBottom) {
        doc.addPage();
        cursorY = marginTop;
        return true;
      }
      return false;
    };

    const forcePageBreak = () => {
      doc.addPage();
      cursorY = marginTop;
    };

    const resetFont = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    };

    // Robuuste paragraaf functie
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

    // Sectie Kop (Met geforceerde witruimte)
    const addSectionHeader = (title, forceNewPage = false) => {
      if (forceNewPage) {
        forcePageBreak();
      } else {
        checkPageBreak(35);
      }
      cursorY += 5;
      // Blauwe balk
      doc.setFillColor(239, 246, 255); // Blue-50
      doc.rect(marginX, cursorY, contentWidth, 12, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30, 64, 175); // Blue-800
      doc.text(title.toUpperCase(), marginX + 4, cursorY + 8);
      cursorY += 18;
      resetFont();
    };

    // Subkop
    const addSubHeader = (title) => {
      checkPageBreak(20);
      cursorY += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(title, marginX, cursorY);
      cursorY += 8;
      resetFont();
    };

    // Bullet List (Tekent rondjes i.p.v. tekst bullets om errors te voorkomen)
    const addBulletList = (items) => {
      if (!items || !items.length) return;
      resetFont();
      items.forEach(item => {
        const cleanText = normalizeLessonText(item);
        const bulletIndent = 6;
        const textWidth = contentWidth - bulletIndent;
        const lines = doc.splitTextToSize(cleanText, textWidth);
        const heightNeeded = lines.length * 5;
        checkPageBreak(heightNeeded + 3);
        // Teken bullet rondje
        doc.setFillColor(0, 0, 0);
        doc.circle(marginX + 2, cursorY - 1, 1, 'F');
        doc.text(lines, marginX + bulletIndent, cursorY);
        cursorY += heightNeeded + 2;
      });
      cursorY += 4;
    };

    // Prompt Box
    const addPromptBox = (title, promptText) => {
      const cleanPrompt = normalizeLessonText(promptText);
      const padding = 6;
      doc.setFont("courier", "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(cleanPrompt, contentWidth - (padding * 2));
      const heightNeeded = (lines.length * 4) + 20;
      checkPageBreak(heightNeeded);
      // Grijs kader
      doc.setFillColor(248, 250, 252); // Slate-50
      doc.setDrawColor(203, 213, 225); // Slate-300
      doc.roundedRect(marginX, cursorY, contentWidth, heightNeeded, 3, 3, 'FD');
      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("PROMPT:", marginX + padding, cursorY + 8);
      // Titel
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(title, marginX + padding + 18, cursorY + 8);
      // Prompt tekst
      doc.setFont("courier", "normal");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(lines, marginX + padding, cursorY + 16);
      cursorY += heightNeeded + 8;
      resetFont();
    };

    // Checkbox Item (Tekent vierkantje)
    const addCheckboxItem = (text) => {
      checkPageBreak(12);
      doc.setDrawColor(100, 100, 100);
      doc.setFillColor(255, 255, 255);
      doc.rect(marginX, cursorY - 4, 5, 5); // Vierkantje
      const cleanText = normalizeLessonText(text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(cleanText, marginX + 8, cursorY);
      cursorY += 8;
    };

    //==========================================
    // PAGINA 1: TITEL & VOORWOORD
    //==========================================
    doc.setFillColor(37, 99, 235); // Blue-600
    doc.rect(0, 0, pageWidth, 80, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.text("AI STARTERSGIDS", marginX, 40);
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("Versie 9.0 - Handboek voor het Onderwijs", marginX, 55);
    doc.setFontSize(12);
    doc.text("PO | VO | MBO | HBO", marginX, 65);

    cursorY = 100;
    resetFont();
    addParagraph("Beste onderwijsprofessional,", 12, "bold");
    cursorY += 5;
    addParagraph("Voor u ligt de vernieuwde AI Startersgids (V9.0). De ontwikkelingen rondom Kunstmatige Intelligentie gaan razendsnel. Waar we vorig jaar nog spraken over 'leuke experimentjes', zien we nu dat AI een structureel onderdeel wordt van onze samenleving en dus ook van ons onderwijs.");
    addParagraph("Deze gids is niet geschreven voor techneuten, maar voor de docent voor de klas. We slaan de ingewikkelde theorie over en focussen op wat u morgen direct kunt toepassen. Van concrete prompts tot ethische kaders en tijdsbesparende workflows.");
    addParagraph("Veel succes en plezier met ontdekken!", 11, "italic");

    cursorY += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(marginX, cursorY, contentWidth + marginX, cursorY);
    cursorY += 15;

    // Korte inhoudsopgave
    doc.setFont("helvetica", "bold");
    doc.text("Inhoudsopgave", marginX, cursorY);
    cursorY += 10;
    const chapters = ["1. Wat is AI?", "2. Scenario's", "3. Ethiek", "4. Tools", "5. Prompts", "6. Workflows", "7. Leerlingen", "8. Startopdracht", "9. FAQ", "10. Checklist"];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    chapters.forEach(c => {
      doc.text(c, marginX, cursorY);
      cursorY += 6;
    });

    //==========================================
    // PAGINA 2: HOOFDSTUK 1 
    //==========================================
    addSectionHeader("1. Inleiding: Wat is AI precies?", true);
    addSubHeader("De kern: Patroonherkenning");
    addParagraph("Veel mensen dichten menselijke eigenschappen toe aan AI. Ze zeggen: 'De computer denkt...' of 'De software begrijpt...'. Dit is een misvatting. In de kern is AI, en specifiek Generatieve AI (zoals ChatGPT), niets meer dan zeer geavanceerde statistiek.");
    addParagraph("Een Large Language Model (LLM) is getraind op miljarden teksten. Het model leert welke woorden logischerwijs op elkaar volgen. Als u typt: 'De hoofdstad van Nederland is...', berekent het model razendsnel dat 'Amsterdam' de grootste statistische kans heeft om te volgen.");
    addSubHeader("Wat AI wel en niet is");
    addParagraph("Het is cruciaal om dit onderscheid te maken in de klas:");
    addBulletList([
      "AI is GEEN kennisbank: In tegenstelling tot Wikipedia 'weet' een AI niks. Het genereert tekst die waarschijnlijk klinkt. Daarom kan het feiten verzinnen (hallucineren).",
      "AI is GEEN mens: Het heeft geen normen, waarden, gevoelens of bewustzijn. Het kan niet 'beledigd' zijn of 'blij' worden.",
      "AI is WEL een creatieve motor: Het is extreem goed in het combineren van ideeën, stijlen en concepten die het heeft gezien in zijn trainingsdata."
    ]);
    addSubHeader("Relevantie voor het onderwijs");
    addParagraph("Waarom moeten we hier iets mee? Omdat AI de 'cognitieve belasting' van taken verandert. Schrijven, samenvatten en programmeren worden deels geautomatiseerd. Ons onderwijs verschuift van 'productgericht' (het essay) naar 'procesgericht' (hoe kom je tot het essay?).");

    //==========================================
    // PAGINA 3: HOOFDSTUK 2 (DEEL 1)
    //==========================================
    addSectionHeader("2. AI in de dagelijkse praktijk (Deel 1)", true);
    addParagraph("Laten we concreet worden. Hier zijn de eerste 3 scenario's om AI direct in te zetten.");
    addSubHeader("Scenario 1: De Creatieve Lesstarter");
    addParagraph("U zoekt een originele manier om een 'saai' onderwerp te introduceren en de voorkennis te activeren.");
    addPromptBox("Lesidee Generator", "Bedenk 3 creatieve, activerende werkvormen van max 10 minuten om de les over [ONDERWERP] te starten voor [DOELGROEP]. Gebruik geen beeldschermen, maar focus op beweging of discussie in de klas.");
    addParagraph("Tip: Vraag de AI specifiek om 'geen beeldschermen' als u de leerlingen even uit de digitale modus wilt halen.", 10, "italic", [80, 80, 80]);

    addSubHeader("Scenario 2: Differentiatie & Niveau");
    addParagraph("U heeft een interessante tekst uit de krant, maar deze is te moeilijk voor een deel van de klas (bijv. NT2-leerlingen of laaggeletterden).");
    addPromptBox("Tekst Vereenvoudiger", "Herschrijf de onderstaande tekst naar taalniveau A2/1F. Behoud de vakspecifieke termen [TERM 1, TERM 2], maar leg deze tussen haakjes uit in eenvoudige woorden. Zorg voor korte zinnen en duidelijke tussenkopjes.");
    addParagraph("Tip: U kunt de AI ook vragen om een 'woordenlijst' te genereren van de moeilijke woorden uit de tekst.", 10, "italic", [80, 80, 80]);

    addSubHeader("Scenario 3: Beoordelingsrubrieken");
    addParagraph("Het maken van een goede rubric kost vaak uren. Een AI doet het in seconden, waarna u het alleen nog hoeft te finetunen.");
    addPromptBox("Rubric Maker", "Maak een beoordelingsrubriek in tabelvorm voor een [OPDRACHT TYPE]. Criteria: Inhoud, Vormgeving, Samenwerking. Niveaus: Onvoldoende, Voldoende, Goed, Excellent. Maak de beschrijvingen per cel concreet en observeerbaar.");

    //==========================================
    // PAGINA 4: HOOFDSTUK 2 (DEEL 2)
    //==========================================
    addSectionHeader("2. AI in de dagelijkse praktijk (Deel 2)", true);
    addSubHeader("Scenario 4: Professionele Communicatie");
    addParagraph("Een lastige e-mail naar ouders of een collega? AI helpt om de juiste toon te vinden zonder dat u emotioneel betrokken raakt bij het typen.");
    addPromptBox("E-mail Assistent", "Schrijf een concept-mail aan ouders over [SITUATIE]. De toon moet professioneel, empathisch maar duidelijk zijn. Nodig uit voor een gesprek op school, maar geef aan dat de grens bereikt is wat betreft [GEDRAG].");

    addSubHeader("Scenario 5: Toetsvragen & Quizzen");
    addParagraph("Snel een formatieve check aan het einde van de les? Laat AI de vragen bedenken inclusief de 'afleiders' (foute antwoorden).");
    addPromptBox("Quiz Generator", "Genereer 5 meerkeuzevragen over [HOOFDSTUK/ONDERWERP]. Geef bij elke vraag aan wat het goede antwoord is én waarom de foute antwoorden aannemelijke denkfouten zijn voor leerlingen van dit niveau.");
    addParagraph("Let op: Controleer altijd de antwoorden! AI kan soms een fout antwoord als 'goed' markeren.", 10, "bold", [200, 0, 0]);

    //==========================================
    // PAGINA 5: HOOFDSTUK 3 & 4
    //==========================================
    addSectionHeader("3. AI-Wijzer: Ethiek & Grenzen", true);
    addSubHeader("Privacy: De Gouden Regel");
    addParagraph("Dit is de belangrijkste regel uit deze gids: Voer NOOIT persoonsgegevens van leerlingen in. Geen namen, geen adressen, geen specifieke medische of thuissituaties. AI-modellen (zoals ChatGPT) kunnen deze data gebruiken om hun systeem te trainen. Als u een casus wilt bespreken, anonimiseer deze dan volledig (gebruik 'Leerling A').");
    addSubHeader("Hallucinaties");
    addParagraph("AI kan zeer overtuigend liegen. Als een AI het antwoord niet weet, 'gokt' hij het meest waarschijnlijke woord. Dit resulteert soms in niet-bestaande feiten, jaartallen of boektitels. Dit noemen we 'hallucineren'. Controleer altijd de output voordat u deze in de klas gebruikt.");

    addSectionHeader("4. Overzicht van AI Tools");
    addParagraph("Welke tool is nu waarvoor geschikt? Een kort overzicht.");
    addBulletList([
      "ChatGPT (OpenAI): De bekendste allrounder. Goed in tekst, brainstormen en code. De gratis versie is prima, de betaalde versie is slimmer.",
      "Claude (Anthropic): Staat bekend om veiligheid en een natuurlijkere, menselijkere schrijfstijl. Erg goed in het schrijven van langere teksten.",
      "Google Gemini: Sterk geïntegreerd met Google Workspace (Docs, Drive). Handig als uw school al met Google werkt.",
      "NotebookLM (Google): Een aanrader voor docenten! U uploadt uw eigen PDF's (bijv. lesmethodes) en kunt vragen stellen puur op basis van DIE bronnen. Dit voorkomt hallucinaties.",
      "Perplexity: Een AI-zoekmachine die wél bronvermelding geeft. Ideaal voor onderzoek."
    ]);

    //==========================================
    // PAGINA 6: HOOFDSTUK 5
    //==========================================
    addSectionHeader("5. Prompt Bibliotheek", true);
    addParagraph("Goede output begint met een goede input. Hier zijn 4 geavanceerde prompts voor specifiek onderwijsgebruik.");
    addPromptBox("De Analogie-Bouwer", "Je bent een expert in didactiek. Ik wil het concept '[MOEILIJK BEGRIP]' uitleggen aan leerlingen van [LEEFTIJD]. Bedenk een heldere analogie uit hun belevingswereld (bijv. sport, gaming, social media) om dit uit te leggen. Geef ook aan waar de analogie 'mank gaat'.");
    addPromptBox("De Socratische Coach (voor leerlingen)", "Ik ben een leerling en ik snap [ONDERWERP] niet. Geef mij niet direct het antwoord, maar stel mij sturende vragen waardoor ik zelf stap-voor-stap tot de oplossing kom. Als ik vastloop, geef je een kleine hint.");
    addPromptBox("Dyslexie-Check", "Ik plak hieronder een tekst. Analyseer deze op leesbaarheid voor leerlingen met dyslexie. Geef concrete verbetertips op het gebied van: zinslengte, woordkeuze, lay-out en lijdende vorm. Herschrijf daarna de tekst volgens deze tips.");
    addPromptBox("Het Debat-Panel", "Ik wil in de klas een debat voeren over [STELLING]. Genereer 3 sterke voor-argumenten en 3 sterke tegen-argumenten. Geef bij elk argument een concreet voorbeeld of feit dat de leerlingen kunnen gebruiken.");

    //==========================================
    // PAGINA 7: HOOFDSTUK 6
    //==========================================
    addSectionHeader("6. Workflows voor Tijdswinst", true);
    addParagraph("AI werkt het best als u het ziet als een proces-versneller.");
    addSubHeader("Workflow A: De '5-minuten-lesvoorbereiding'");
    addCheckboxItem("Stap 1: Vraag AI om de leerdoelen voor [ONDERWERP].");
    addCheckboxItem("Stap 2: Vraag om een lesopzet (opening, kern, slot) o.b.v. die doelen.");
    addCheckboxItem("Stap 3: Vraag om een 'directe instructie' tekst voor the kern.");
    addCheckboxItem("Stap 4: Vraag om 3 verwerkingsopdrachten (makkelijk/gemiddeld/moeilijk).");
    addCheckboxItem("Stap 5: Kopieer alles naar Word/Docs en maak het definitief.");

    addSubHeader("Workflow B: Profielwerkstuk / Scriptie Begeleiden");
    addParagraph("Leerlingen lopen vaak vast bij de hoofdvraag. Laat AI helpen, niet door het te schrijven, maar door te sparren.");
    addCheckboxItem("Stap 1: Laat de leerling zijn onderwerp invoeren in AI.");
    addCheckboxItem("Stap 2: Prompt: 'Bedenk 5 onderzoeksvragen bij dit onderwerp die SMART zijn'.");
    addCheckboxItem("Stap 3: Leerling kiest de beste en past deze aan.");
    addCheckboxItem("Stap 4: Laat AI kritische tegenvragen stellen op het plan van aanpak.");

    //==========================================
    // PAGINA 8: HOOFDSTUK 7 & 8
    //==========================================
    addSectionHeader("7. AI & Leerlingen", true);
    addParagraph("Het verbieden van AI is in de praktijk onmogelijk en wenselijk. We leiden leerlingen op voor de toekomst, en daar hoort AI bij.");
    addSubHeader("Beleid: Wat mag wel/niet?");
    addParagraph("Wees duidelijk. 'Je mag AI gebruiken' is te vaag. Gebruik het stoplicht-model:");
    addBulletList([
      "GROEN: AI gebruiken voor brainstormen, spellingcheck, uitleg vragen.",
      "ORANJE: AI gebruiken voor structuur of feedback (alleen met toestemming).",
      "ROOD: AI de tekst laten schrijven en inleveren als eigen werk (fraude)."
    ]);
    addSubHeader("Misbruik detecteren");
    addParagraph("AI-detectoren (software die zegt: 'dit is 80% AI') zijn onbetrouwbaar. Ze geven vaak valse beschuldigingen. Vertrouw liever op uw eigen intuïtie: gebruikt de leerling woorden die hij normaal niet kent? Is de stijl plotseling anders? Ga het gesprek aan: 'Leg eens uit wat 'intrinsieke motivatie' betekent, want dat woord gebruik je hier'.");

    addSectionHeader("8. Stap-voor-stap Startopdracht");
    addParagraph("Heeft u nog nooit écht met AI gewerkt? Doe dit nu, het kost 5 minuten.");
    addCheckboxItem("1. Maak een gratis account op ChatGPT of Gemini.");
    addCheckboxItem("2. Typ: 'Ik wil dat je mijn onderwijsassistent bent. Ik geef het vak [VAK].'");
    addCheckboxItem("3. Typ: 'Bedenk 3 grappige quizvragen over de stof van vorige week.'");
    addCheckboxItem("4. Lees het resultaat. Klopt het?");
    addCheckboxItem("5. Typ: 'Maak vraag 2 iets moeilijker.'");

    //==========================================
    // PAGINA 9: FAQ
    //==========================================
    addSectionHeader("9. Veelgestelde Vragen (FAQ)", true);
    addSubHeader("Q: Gaat AI mijn baan overnemen?");
    addParagraph("A: Nee. Onderwijs draait om relatie, motivatie en pedagogisch contact. Dat kan AI niet. AI neemt wel het 'saaie' werk over (administratie, nakijken), zodat u meer tijd heeft voor de leerling.");
    addSubHeader("Q: Is de data die ik invoer veilig?");
    addParagraph("A: Bij de gratis versies van veel tools wordt de data gebruikt om het model te trainen. Voer dus nooit staatsgeheimen of privacygevoelige info in. Bij zakelijke licenties is de data vaak wel afgeschermd.");
    addSubHeader("Q: Mijn leerlingen gebruiken het toch wel. Wat nu?");
    addParagraph("A: Maak het bespreekbaar. Laat ze zien dat AI ook fouten maakt. Doe een wedstrijdje 'Wie schrijft de betere alinea: Pietje of de Robot?'. Laat zien dat de menselijke 'touch' (humor, creativiteit) vaak ontbreekt bij AI.");
    addSubHeader("Q: Kost het geld?");
    addParagraph("A: De basisversies van ChatGPT, Gemini en Claude zijn gratis en voor 90% van de onderwijstaken goed genoeg. Betaalde versies zijn sneller en kunnen betere afbeeldingen maken.");

    //==========================================
    // PAGINA 10: CHECKLIST (Aangepast Layout)
    //==========================================
    addSectionHeader("10. AI-Checklist voor de Docent", true);
    addParagraph("Print deze pagina uit en hang hem boven uw bureau.");

    // AANGEPAST: Tekst verkort zoals gevraagd
    // Verbeterde Layout voor de Checklist
    const boxHeight = 150;
    doc.setFillColor(240, 253, 244); // Green-50
    // Teken box met afgeronde hoeken
    doc.roundedRect(marginX, cursorY, contentWidth, boxHeight, 3, 3, 'F');
    // Sla startpositie op voor notities later
    const boxStartY = cursorY;
    cursorY += 12; // Eerste padding in de box

    const checklistItems = [
      "PRIVACY CHECK: Heb ik alle namen van leerlingen verwijderd?",
      "FACT CHECK: Heb ik de output gecontroleerd op onzin/fouten?",
      "DOEL CHECK: Helpt dit het leerproces of is het een 'trucje'?",
      "TRANSPARANTIE: Weten mijn leerlingen dat ik AI gebruik?",
      "EIGENAARSCHAP: Ben ik nog steeds de baas over de inhoud?",
      "BIAS CHECK: Zitten er vooroordelen in de tekst?",
      "BRONVERMELDING: Heb ik aangegeven dat AI is gebruikt?",
      "MENSELIJKE MAAT: Heb ik mijn eigen 'tone of voice' toegevoegd?"
    ];

    checklistItems.forEach(item => {
      // Handmatige rendering van checkboxes om pageBreaks in the box te voorkomen
      // en om zeker te zijn van schone tekst zonder %¡
      doc.setDrawColor(22, 101, 52); // Groene rand (Green-800)
      doc.setFillColor(255, 255, 255); // Wit vlak
      doc.rect(marginX + 6, cursorY - 4, 5, 5, 'FD'); // Checkbox tekenen

      // Extra beveiliging tegen %¡ tekens
      const cleanText = normalizeLessonText(item).replace(/%¡/g, "");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(22, 101, 52); // Groene tekst
      doc.text(cleanText, marginX + 16, cursorY);
      cursorY += 14; // Ruimere regelafstand voor A4 formaat
    });

    // Cursor onder de box plaatsen voor de notities
    cursorY = boxStartY + boxHeight + 10;
    addParagraph("Notities:", 12, "bold");
    doc.setDrawColor(150, 150, 150);
    doc.line(marginX, cursorY + 10, contentWidth + marginX, cursorY + 10);
    doc.line(marginX, cursorY + 20, contentWidth + marginX, cursorY + 20);
    doc.line(marginX, cursorY + 30, contentWidth + marginX, cursorY + 30);

    //==========================================
    // FOOTER (Paginanummering)
    //==========================================
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

    // Unieke bestandsnaam om caching te voorkomen
    const timestamp = new Date().getTime();
    doc.save(`AI-Startersgids-V9-Volledig-${timestamp}.pdf`);
  } catch (error) {
    console.error("Startersgids Generation Error:", error);
    alert("Er ging iets mis bij het genereren van de Startersgids. Probeer het opnieuw.");
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
 * GENERATE LESSON PDF (BESTAANDE FUNCTIE)
 */
export const downloadLesson = (lessonTitle) => {
  clearCache();
  const lesson = lessons.find(l => l.title === lessonTitle);
  if (!lesson) {
    alert("Sorry, de inhoud van deze les kon niet worden geladen.");
    return;
  }

  try {
    const doc = new jsPDF();
    const marginX = 20;
    const marginTop = 20;
    const marginBottom = 25;
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

    const resetFont = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
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

    const addSectionHeader = (title) => {
      checkPageBreak(25);
      cursorY += 5;
      doc.setFillColor(240, 253, 244); // Emerald-50
      doc.rect(marginX, cursorY, contentWidth, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(22, 101, 52); // Emerald-800
      doc.text(title.toUpperCase(), marginX + 3, cursorY + 7);
      cursorY += 16;
      resetFont();
    };

    const addBulletList = (items) => {
      if (!items || !items.length) return;
      resetFont();
      items.forEach(item => {
        const cleanText = normalizeLessonText(item);
        const bulletIndent = 6;
        const textWidth = contentWidth - bulletIndent;
        const lines = doc.splitTextToSize(cleanText, textWidth);
        const heightNeeded = lines.length * 5;
        checkPageBreak(heightNeeded + 2);
        // Teken bullet rondje ipv tekst
        doc.setFillColor(0, 0, 0);
        doc.circle(marginX + 2, cursorY - 1, 1, 'F');
        doc.text(lines, marginX + bulletIndent, cursorY);
        cursorY += heightNeeded + 2;
      });
      cursorY += 4;
    };

    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("LESBRIEF", marginX, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(normalizeLessonText(lesson.title), marginX, 30);

    cursorY = 55;
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Niveau: ${lesson.level || '-'}`, marginX, cursorY);
    doc.text(`Duur: ${lesson.duration || '-'}`, marginX + 60, cursorY);
    doc.text(`Vak: ${lesson.subject || '-'}`, marginX + 120, cursorY);

    cursorY += 15;
    addSectionHeader("Inleiding");
    addParagraph(lesson.introduction || lesson.summary);

    if (lesson.goals && lesson.goals.length > 0) {
      addSectionHeader("Leerdoelen");
      addBulletList(lesson.goals);
    }

    if (lesson.materials && lesson.materials.length > 0) {
      addSectionHeader("Benodigdheden");
      addBulletList(lesson.materials);
    }

    if (lesson.lessonPhases && lesson.lessonPhases.length > 0) {
      addSectionHeader("Lesverloop");
      lesson.lessonPhases.forEach((phase, index) => {
        checkPageBreak(30);
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
        if (phase.description) addParagraph(phase.description, 10, "italic", [80, 80, 80]);
        if (phase.teacherActions) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          checkPageBreak(10);
          doc.text("Docent:", marginX, cursorY);
          cursorY += 5;
          addParagraph(phase.teacherActions, 10);
        }
        if (phase.studentActivities) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          checkPageBreak(10);
          doc.text("Leerling:", marginX, cursorY);
          cursorY += 5;
          addParagraph(phase.studentActivities, 10);
        }
        cursorY += 4;
      });
    }

    if (lesson.differentiation && lesson.differentiation.length > 0) {
      addSectionHeader("Differentiatie");
      addBulletList(lesson.differentiation);
    }

    const reflectionItems = [...(lesson.assessment || []), ...(lesson.reflectionQuestions || [])];
    if (reflectionItems.length > 0) {
      addSectionHeader("Reflectie & Evaluatie");
      addBulletList(reflectionItems);
    }

    // Page numbering logic for lessons
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(200, 200, 200);
      doc.line(marginX, pageHeight - 20, pageWidth - marginX, pageHeight - 20);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text("Onderwijs.ai - Praktische AI voor Docenten", marginX, pageHeight - 12);
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