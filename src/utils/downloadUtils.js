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
 * STARTERSGIDS DOWNLOAD V9.0 (VOLLEDIGE UITGEBREIDE VERSIE)
 */
export const downloadStartersgids = () => {
  clearCache();
  
  try {
    const doc = new jsPDF();
    
    // CONFIGURATIE (Identiek aan lesbrieven layout)
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
      
      // Blauwe balk voor Startersgids stijl
      doc.setFillColor(239, 246, 255); // Blue-50
      doc.rect(marginX, cursorY, contentWidth, 10, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 64, 175); // Blue-800
      doc.text(title.toUpperCase(), marginX + 3, cursorY + 7);
      
      cursorY += 16;
      resetFont();
    };

    // HELPER: Subkop
    const addSubHeader = (title) => {
      checkPageBreak(15);
      cursorY += 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(title, marginX, cursorY);
      cursorY += 6;
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
    doc.text("Versie 9.0 - Het complete handboek voor docenten", marginX, 45);

    cursorY = 80;

    resetFont();
    addParagraph("Welkom bij de vernieuwde AI Startersgids. Deze gids is speciaal ontwikkeld voor docenten in het PO, VO, en MBO/HBO die op zoek zijn naar praktische handvatten om Kunstmatige Intelligentie (AI) veilig en effectief in te zetten. Geen ingewikkelde theorie, maar direct toepasbare scenario's, prompts en workflows.");
    
    cursorY += 10;

    // ==========================================
    // HOOFDSTUK 1: INLEIDING - WAT IS AI?
    // ==========================================
    addSectionHeader("1. Inleiding: Wat is AI precies?");
    
    addSubHeader("Wat AI wel en niet is");
    addParagraph("Veel mensen dichten menselijke eigenschappen toe aan AI, maar in de kern is het statistiek. Een Large Language Model (zoals ChatGPT) is eigenlijk een zeer geavanceerde 'woord-voorspeller'. Het berekent op basis van miljarden teksten welk woord logischerwijs volgt op het vorige.");
    addBulletList([
      "AI is GEEN kennisbank: Het 'weet' niets feitelijk, maar genereert tekst die waarschijnlijk klinkt.",
      "AI is GEEN mens: Het heeft geen normen, waarden, gevoelens of bewustzijn.",
      "AI is WEL een patroonherkenner: Het is extreem goed in het herkennen en repliceren van structuren in taal, code en beeld."
    ]);

    addSubHeader("Waarom is dit relevant voor u?");
    addParagraph("De impact van AI op het onderwijs is vergelijkbaar met de introductie van het internet. Het verandert hoe we informatie zoeken, verwerken en creëren. Voor docenten biedt dit kansen voor:");
    addBulletList([
      "Enorme tijdsbesparing bij administratie en voorbereiding.",
      "Personalisatie van lesmateriaal (differentiatie).",
      "Het voorbereiden van leerlingen op een veranderende arbeidsmarkt."
    ]);

    // ==========================================
    // HOOFDSTUK 2: AI IN DE DAGELIJKSE PRAKTIJK
    // ==========================================
    addSectionHeader("2. AI in de dagelijkse praktijk: 5 Scenario's");
    
    addParagraph("Hoe gebruikt u AI morgen in de les? Hier zijn 5 realistische scenario's.");

    // Scenario 1
    addSubHeader("Scenario 1: De Creatieve Lesstarter");
    addParagraph("U zoekt een originele manier om een saai onderwerp te introduceren.");
    addPromptBox("Prompt: Lesidee", "Bedenk 3 creatieve, activerende werkvormen van max 10 minuten om de les over [ONDERWERP] te starten voor [DOELGROEP]. Gebruik geen beeldschermen, maar focus op beweging of discussie.");
    
    // Scenario 2
    addSubHeader("Scenario 2: Differentiatie in een handomdraai");
    addParagraph("U heeft een complexe tekst, maar enkele leerlingen beheersen de taal nog niet goed.");
    addPromptBox("Prompt: Vereenvoudigen", "Herschrijf de onderstaande tekst naar taanniveau A2/1F. Behoud de vakspecifieke termen [TERM 1, TERM 2], maar leg deze tussen haakjes uit. Zorg voor korte zinnen.");

    // Scenario 3
    addSubHeader("Scenario 3: Rubrics & Beoordeling");
    addParagraph("Het maken van een goede rubric kost vaak uren. Met AI minuten.");
    addPromptBox("Prompt: Rubric", "Maak een beoordelingsrubriek in tabelvorm voor een [OPDRACHT TYPE]. Criteria: Inhoud, Vormgeving, Samenwerking. Niveaus: Onvoldoende, Voldoende, Goed, Excellent. Maak de beschrijvingen concreet en observeerbaar.");

    // Scenario 4
    addSubHeader("Scenario 4: Oudercommunicatie");
    addParagraph("Een lastige mail sturen vraagt om de juiste toon.");
    addPromptBox("Prompt: E-mail", "Schrijf een concept-mail aan ouders over [SITUATIE]. De toon moet professioneel, empathisch maar duidelijk zijn. Nodig uit voor een gesprek, maar geef aan dat de grens bereikt is.");

    // Scenario 5
    addSubHeader("Scenario 5: Toetsvragen Genereren");
    addParagraph("Snel een formatieve check of quiz maken.");
    addPromptBox("Prompt: Quiz", "Genereer 5 meerkeuzevragen over [HOOFDSTUK]. Geef bij elke vraag aan wat het goede antwoord is én waarom de foute antwoorden aannemelijke denkfouten zijn.");

    // ==========================================
    // HOOFDSTUK 3: AI-WIJZER (ETHIEK & GRENZEN)
    // ==========================================
    addSectionHeader("3. AI-Wijzer: Ethiek & Grenzen");
    
    addParagraph("Als docent heeft u een voorbeeldfunctie. Gebruik AI verantwoord.");

    addSubHeader("Privacy: De Gouden Regel");
    addParagraph("Voer NOOIT persoonsgegevens van leerlingen in (namen, adressen, specifieke situaties). AI-modellen kunnen deze data gebruiken voor training. Anonimiseer altijd: gebruik 'Leerling A' of 'de klas'.");

    addSubHeader("Hallucinaties & Fact-checking");
    addParagraph("AI kan zeer overtuigend liegen. Dit noemen we 'hallucineren'. Controleer altijd:");
    addBulletList([
      "Feitelijke data (jaartallen, formules, namen).",
      "Bronnen (AI verzint vaak niet-bestaande boektitels).",
      "Biases (AI kan stereotyperende voorbeelden geven)."
    ]);

    addSubHeader("De Menselijke Maat");
    addParagraph("Laat AI nooit beslissingen nemen over beoordeling of overgang. AI is een adviseur, u bent de beslisser.");

    // ==========================================
    // HOOFDSTUK 4: OVERZICHT VAN AI TOOLS
    // ==========================================
    addSectionHeader("4. Overzicht van AI Tools");
    addParagraph("Welke tool gebruikt u waarvoor? Een kort overzicht van de marktleiders.");

    addSubHeader("1. ChatGPT (OpenAI) / Claude (Anthropic)");
    addParagraph("De 'alleskunners'. Ideaal voor tekstgeneratie, brainstormen, vertalen en programmeren. Claude staat bekend om een natuurlijkere schrijfstijl en grotere veiligheid.");

    addSubHeader("2. Google Gemini");
    addParagraph("Sterk geïntegreerd met Google Workspace. Kan direct informatie uit uw Google Docs of Drive halen (let op privacy-instellingen!).");

    addSubHeader("3. NotebookLM (Google)");
    addParagraph("Revolutionair voor bronnenonderzoek. U uploadt uw eigen PDF's (bijv. schoolbeleid of lesboek) en u kunt vragen stellen puur op basis van DIE bronnen. Geen hallucinaties buiten de bron om.");

    addSubHeader("4. Beeldgeneratoren (DALL-E, Midjourney)");
    addParagraph("Voor het maken van uniek beeldmateriaal voor presentaties, zonder auteursrechtproblemen.");

    // ==========================================
    // HOOFDSTUK 5: PROMPTBIBLIOTHEEK
    // ==========================================
    addSectionHeader("5. Promptbibliotheek voor Docenten");
    addParagraph("Goede output begint met een goede input. Gebruik de formule: ROL + TAAK + CONTEXT + FORMAAT.");

    addPromptBox("Uitleg met Analogie", "Je bent een docent natuurkunde. Leg het concept 'elektrische stroom' uit aan een brugklasser. Gebruik een analogie van water dat door buizen stroomt. Eindig met 3 controle-vragen.");

    addPromptBox("Dyslexie-ondersteuning", "Herschrijf deze tekst zodat hij makkelijker leesbaar is voor leerlingen met dyslexie. Gebruik kortere zinnen, actieve vorm en duidelijke tussenkopjes.");

    addPromptBox("NT2-ondersteuning", "Maak een woordenlijst van de 10 moeilijkste woorden uit deze tekst. Geef per woord: de definitie in eenvoudig Nederlands, een voorbeeldzin, en de vertaling naar het [TAAL].");

    addPromptBox("Socratische Coach", "Ik ben een leerling en ik snap [ONDERWERP] niet. Geef niet direct het antwoord, maar stel mij vragen waardoor ik zelf tot de oplossing kom. Coach mij stap voor stap.");

    // ==========================================
    // HOOFDSTUK 6: AI-WORKFLOWS VOOR TIJDSWINST
    // ==========================================
    addSectionHeader("6. AI-Workflows voor Tijdswinst");

    addSubHeader("Workflow A: Een volledige les in 5 minuten");
    addBulletList([
      "Stap 1: Vraag ChatGPT om leerdoelen voor [ONDERWERP].",
      "Stap 2: Vraag om een lesopzet (opening, kern, slot) op basis van die doelen.",
      "Stap 3: Vraag om een directe instructie-tekst voor de kern.",
      "Stap 4: Vraag om een verwerkingsopdracht + antwoordmodel.",
      "Stap 5: Kopieer alles naar een document en pas aan waar nodig."
    ]);

    addSubHeader("Workflow B: SE/Profielwerkstuk Begeleiden");
    addBulletList([
      "Stap 1: Laat de leerling zijn hoofdvraag invoeren in AI voor feedback (niet voor het antwoord).",
      "Stap 2: Gebruik AI om de structuur van het verslag te controleren.",
      "Stap 3: Laat AI kritische tegenvragen genereren om de leerling voor te bereiden op de verdediging."
    ]);

    // ==========================================
    // HOOFDSTUK 7: AI & LEERLINGEN
    // ==========================================
    addSectionHeader("7. AI & Leerlingen");
    
    addParagraph("Het verbieden van AI is een achterhoedegevecht. We moeten leerlingen leren er mee om te gaan.");

    addSubHeader("Veilige Introductie");
    addParagraph("Bespreek AI openlijk. Laat zien hoe het fouten maakt. Doe een 'mens vs machine' wedstrijdje in de klas.");

    addSubHeader("Wat mag wel/niet?");
    addParagraph("Stel duidelijke regels:");
    addBulletList([
      "AI als ideeëngenerator: JA.",
      "AI als eindredacteur (feedback op taal): JA.",
      "AI als schrijver van je hele werkstuk: NEE.",
      "Bronvermelding: Verplicht (Bijv: 'Gegenereerd met ChatGPT op [DATUM], prompt: ...')."
    ]);

    addSubHeader("Misbruik Detecteren");
    addParagraph("AI-detectoren werken slecht en geven vaak valse beschuldigingen. Focus op het proces: vraag leerlingen om tussenversies, of laat ze hun werk mondeling toelichten. Als ze het niet kunnen uitleggen, hebben ze het niet zelf begrepen.");

    // ==========================================
    // HOOFDSTUK 8: STAP-VOOR-STAP OPDRACHT
    // ==========================================
    addSectionHeader("8. Stap-voor-stap Opdracht: Uw Eerste Assistent");
    
    addParagraph("Heeft u nog nooit echt met AI gewerkt? Doe dit nu:");
    addBulletList([
      "1. Maak een account aan op ChatGPT (OpenAI) of gebruik Gemini (Google).",
      "2. Start een nieuwe chat en typ: 'Ik wil dat je mijn onderwijsassistent bent. Ik geef het vak [VAK]. Stel mij 5 vragen om mijn stijl en leerlingen beter te leren kennen.'",
      "3. Beantwoord de vragen.",
      "4. Vraag nu: 'Bedankt. Bedenk nu 3 lesideeën voor volgende week over [ONDERWERP].'",
      "5. Kies de leukste en vraag: 'Werk idee 2 uit tot een stappenplan van 50 minuten.'",
      "6. Print het uit en probeer het in de klas!"
    ]);

    // ==========================================
    // HOOFDSTUK 9: FAQ VOOR DOCENTEN
    // ==========================================
    addSectionHeader("9. Veelgestelde Vragen (FAQ)");

    addSubHeader("Gaat AI mijn baan overnemen?");
    addParagraph("Nee. Onderwijs draait om relatie, motivatie en pedagogisch contact. Dat kan AI niet. AI neemt wel het saaie werk over (administratie, nakijken), zodat u meer tijd heeft voor de leerling.");

    addSubHeader("Is het gebruik van AI fraude?");
    addParagraph("Niet als het transparant gebeurt en binnen de afgesproken kaders. Het is fraude als een leerling doet alsof AI-werk zijn eigen werk is.");

    addSubHeader("Kost het geld?");
    addParagraph("De basisversies van ChatGPT, Gemini en Claude zijn gratis. Voor geavanceerde functies (zoals afbeeldingen maken of grote documenten uploaden) is soms een betaald abonnement nodig.");

    // ==========================================
    // HOOFDSTUK 10: CHECKLIST (1 PAGINA)
    // ==========================================
    addSectionHeader("10. AI-Checklist voor de Docent");
    
    addParagraph("Print deze pagina uit en hang hem boven uw bureau.");
    
    doc.setFillColor(240, 253, 244); // Green-50
    doc.rect(marginX, cursorY, contentWidth, 60, 'F');
    cursorY += 5;
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    doc.text("CHECKLIST VOOR GEBRUIK", marginX + 5, cursorY + 5);
    
    cursorY += 10;
    resetFont();
    doc.setTextColor(22, 101, 52);
    
    const checklistItems = [
      "□ PRIVACY: Heb ik alle namen en persoonsgegevens verwijderd?",
      "□ CHECK: Heb ik de output gecontroleerd op feitelijke onjuistheden?",
      "□ DOEL: Helpt dit het leerproces, of is het een 'trucje'?",
      "□ TRANSPARANTIE: Weten mijn leerlingen/collega's dat ik AI gebruik?",
      "□ MENS: Ben ik nog steeds de eindverantwoordelijke voor de inhoud?"
    ];

    checklistItems.forEach(item => {
      doc.text(item, marginX + 5, cursorY);
      cursorY += 8;
    });

    cursorY += 10;
    addParagraph("Deze gids is een levend document. AI verandert snel. Blijf nieuwsgierig, experimenteer, en deel uw ervaringen met collega's.", 11, "italic", [100, 100, 100]);

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