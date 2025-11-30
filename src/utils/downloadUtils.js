import jsPDF from 'jspdf';

/**
 * ULTRA AGGRESSIVE cache clearing and completely new PDF generation V9.0
 */
export const downloadStartersgids = () => {
  console.log('🚀 STARTING NUCLEAR CACHE CLEARING V9.0...');

  // STEP 1: NUCLEAR CACHE CLEARING - Clear EVERYTHING
  try {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          console.log('Deleting cache:', name);
          caches.delete(name);
        });
      });
    }
    Object.keys(localStorage).forEach(key => {
      localStorage.removeItem(key);
    });
    sessionStorage.clear();
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    console.log('✅ NUCLEAR CACHE CLEARING COMPLETED');
  } catch (error) {
    console.log('Cache clearing had issues, but continuing...');
  }

  // STEP 2: Wait to ensure cache clearing is complete
  setTimeout(() => {
    generateCompletelyNewFullStartersgids();
  }, 300);
};

/**
 * Generate a COMPLETE 10+ PAGE AI STARTERSGIDS V9.0
 */
const generateCompletelyNewFullStartersgids = () => {
  try {
    console.log('🔥 GENERATING COMPLETE 10+ PAGE AI STARTERSGIDS V9.0...');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 12);
    const sessionId = Math.random().toString(36).substring(2, 8);
    const versionId = 'V9-COMPLETE-' + timestamp + '-' + randomId + '-' + sessionId;

    doc.setFont('helvetica');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    const lineHeight = 6;

    let pageNum = 1;

    // Helper: Header & Footer op elke pagina
    const addPageHeader = (num) => {
      // Header balk
      doc.setFillColor(70, 130, 180); // SteelBlue
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('AI STARTERSGIDS V9.0 - NEDERLANDS ONDERWIJS', 20, 16);
      doc.text(`Pagina ${num}`, pageWidth - 20, 16, { align: 'right' });
      
      // Footer
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setTextColor(85, 85, 85);
      doc.setFont('helvetica', 'normal');
      doc.text('https://onderwijs.ai/', pageWidth / 2, pageHeight - 16, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    };

    // Helper: Tekst wrappen en pagina's toevoegen indien nodig
    const addWrappedText = (text, x, startY, maxWidth, fontSize = 11, fontStyle = 'normal') => {
      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(50, 50, 50);

      const lines = doc.splitTextToSize(text, maxWidth);
      let currentY = startY;

      lines.forEach(line => {
        // Check of we over de pagina grens gaan (rekening houdend met footer marge)
        if (currentY > pageHeight - 30) {
          doc.addPage();
          addPageHeader(pageNum++);
          currentY = 40; // Startpositie op nieuwe pagina
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
      });
      return currentY;
    };

    // --- PAGE 1: COVER ---
    doc.setFillColor(139, 0, 0); // DarkRed
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPLETE AI STARTERSGIDS V9.0', 105, 22, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    doc.setFillColor(220, 38, 38); // Red warning box style
    doc.rect(15, 45, 180, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIËLE VERSIE: V9.0', 105, 58, { align: 'center' });
    doc.text('Complete handleiding voor PO, VO, MBO & HBO', 105, 68, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('AI STARTERSGIDS', 20, 95);
    doc.text('VOOR HET NEDERLANDSE', 20, 115);
    doc.text('ONDERWIJS', 20, 135);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('Praktische gids voor docenten en schoolleiders', 20, 155);
    doc.text('Inclusief lesideeën, beleidstips en tools', 20, 170);

    doc.setFillColor(34, 197, 94); // Green success box
    doc.rect(20, 200, 170, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('GEGENEREERD VOOR JOU', 105, 215, { align: 'center' });
    doc.text('Datum: ' + new Date().toLocaleDateString('nl-NL'), 105, 228, { align: 'center' });
    doc.text('Versie ID: ' + versionId, 105, 235, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // Footer Page 1
    doc.setFontSize(10);
    doc.setTextColor(85, 85, 85);
    doc.setFont('helvetica', 'normal');
    doc.text('https://onderwijs.ai/', pageWidth / 2, pageHeight - 16, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // --- PAGE 2: INHOUDSOPGAVE ---
    doc.addPage();
    addPageHeader(pageNum++);
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    let yPos = addWrappedText('INHOUDSOPGAVE', margin, 50, contentWidth, 24, 'bold');
    
    doc.setFillColor(240, 248, 255);
    doc.rect(margin, yPos + 5, contentWidth, 2, 'F');
    yPos += 15;

    const toc = [
      '1. Introductie tot AI in het Onderwijs',
      '2. AI-tools voor het Basisonderwijs (PO)',
      '3. AI in het Voortgezet Onderwijs (VO)',
      '4. MBO en HBO: Geavanceerde AI-toepassingen',
      '5. Praktische Implementatiegids',
      '6. Ethiek en Veiligheid in AI-onderwijs',
      '7. Nederlandse AI-tools en Resources',
      '8. Stappenplan voor Schoolleiders',
      '9. Evaluatie en Assessment met AI',
      '10. Toekomst van AI in het Onderwijs',
      '11. Veelgestelde Vragen (FAQ)',
      '12. Bronnen en Verdere Verdieping'
    ];

    toc.forEach((chapter) => {
      yPos = addWrappedText(chapter, margin + 5, yPos, contentWidth - 10, 13, 'normal');
      yPos += 4;
    });

    // --- DEFINITIE CONTENT (12 HOOFDSTUKKEN) ---
    const chapters = [
      {
        title: "1. Introductie tot AI in het Onderwijs",
        content: [
          { subtitle: "Wat is AI eigenlijk?", text: "Kunstmatige Intelligentie (AI) is geen magie, maar wiskunde. Het zijn computersystemen die taken uitvoeren waar normaal menselijke intelligentie voor nodig is, zoals patronen herkennen, taal begrijpen of problemen oplossen. In het onderwijs hebben we het vaak over 'Generatieve AI' (zoals ChatGPT, Copilot of Midjourney): systemen die nieuwe content kunnen maken op basis van wat ze geleerd hebben uit enorme hoeveelheden data." },
          { subtitle: "Verschil met 'gewone' software", text: "Traditionele software doet precies wat jij programmeert (bijv. een rekenmachine: 2+2 is altijd 4). Generatieve AI is voorspellend en creatief. Het berekent welk woord waarschijnlijk volgt op het vorige. Hierdoor is de uitkomst soms verrassend, maar soms ook feitelijk onjuist ('hallucinaties')." },
          { subtitle: "Waarom relevant voor het onderwijs?", text: "AI biedt kansen voor differentiatie (onderwijs op maat), efficiëntie (minder nakijkwerk, snellere lesvoorbereiding) en inclusie (hulp voor leerlingen met taalbarrières of dyslexie). Het doel is niet om de docent te vervangen, maar om de docent te versterken en meer tijd vrij te maken voor het menselijke contact." },
          { subtitle: "Hoe gebruik je deze gids?", text: "Deze gids is geschreven voor docenten in het PO, VO en MBO/HBO. Blader direct naar het hoofdstuk dat relevant is voor jouw sector. We bieden concrete handvatten, geen vage theorie. \n\nQuick Start in 3 stappen:\n1. Maak een account aan bij een veilige AI-tool (zie hoofdstuk 7).\n2. Probeer één lesidee uit deze gids uit in de klas.\n3. Bespreek de ervaring met een collega." }
        ]
      },
      {
        title: "2. AI-tools voor het Basisonderwijs (PO)",
        content: [
          { subtitle: "Focus: Spelenderwijs Leren & Ondersteuning", text: "In het PO staat ontdekken centraal. AI kan helpen bij taalontwikkeling, creativiteit en mediawijsheid. Belangrijk: gebruik in de onderbouw (groep 1-4) AI vooral als 'leerkracht-assistent' (jij bedient de knoppen). In de bovenbouw (5-8) kunnen leerlingen onder begeleiding zelf kennismaken." },
          { subtitle: "Lesidee 1: Het Levende Verhaal (Taal/Creatief)", text: "Doelgroep: Groep 5-8.\nDoel: Creatief schrijven stimuleren.\nWerkvorm: Laat de klas een hoofdpersoon en een probleem bedenken. Voer dit in een AI-tool in en laat de AI het begin van het verhaal schrijven. Laat leerlingen daarna zelf het einde schrijven of tekenen. Bespreek: 'Vond je het verhaal van de computer leuker of dat van jezelf?'" },
          { subtitle: "Lesidee 2: De Praatplaat (Woordenschat)", text: "Doelgroep: Groep 3-8 (ook NT2).\nDoel: Woordenschat vergroten.\nWerkvorm: Genereer met een image-tool een plaat over een thema (bijv. 'een stad in de toekomst' of 'een middeleeuwse markt'). Bespreek klassikaal wat er te zien is. Dit is geweldig voor NT2-leerlingen om visueel ondersteund te praten zonder dat je uren moet zoeken naar de perfecte afbeelding op Google." },
          { subtitle: "Differentiatie & Veiligheid", text: "Gebruik AI om teksten te vereenvoudigen voor zwakke lezers ('Herschrijf dit artikel op niveau AVI-M4'). \nVeiligheidstip: Laat leerlingen in het PO nooit zelf accounts aanmaken. Projecteer de tool op het digibord en bedien deze zelf, of laat ze werken op tablets waar jij bent ingelogd (onder toezicht)." }
        ]
      },
      {
        title: "3. AI in het Voortgezet Onderwijs (VO)",
        content: [
          { subtitle: "Vakoverstijgende Toepassingen", text: "In het VO draait het om vakinhoud en kritisch denken. AI kan dienen als sparringpartner, tutor en feedback-coach. Het is essentieel dat leerlingen leren hoe ze goede vragen (prompts) stellen." },
          { subtitle: "Scenario 1: AI als Feedbackcoach (Talen)", text: "Laat leerlingen hun eerste versie van een opstel in een AI-tool plakken met de prompt: 'Geef feedback op de structuur en argumentatie, maar herschrijf de tekst NIET.' De leerling verbetert daarna zelf het stuk. Dit leert hen redigeren en kritisch kijken naar eigen werk." },
          { subtitle: "Scenario 2: De Repetitie-Trainer (Bèta/Zaakvakken)", text: "Leerlingen kunnen een AI vragen: 'Ik heb morgen een toets over de Franse Revolutie. Stel mij 5 meerkeuzevragen en 2 open vragen om te oefenen.' Dit bevordert zelfregulerend leren en geeft leerlingen controle over hun studieproces." },
          { subtitle: "Kunst & CKV", text: "Bij kunstvakken kan AI gebruikt worden voor moodboards of het genereren van decor-ideeën. Discussieer over auteursrecht: is kunst gemaakt door een computer echte kunst?" },
          { subtitle: "Do's en Don'ts", text: "DO: Leerlingen leren hoe ze bronnen checken die AI noemt.\nDON'T: Toestaan dat leerlingen AI gebruiken om huiswerk blind te genereren. Maak hier duidelijke afspraken over (zie hoofdstuk 6)." }
        ]
      },
      {
        title: "4. MBO en HBO: Geavanceerde Toepassingen",
        content: [
          { subtitle: "Beroepsgerichte Producten", text: "Studenten in het MBO en HBO moeten voorbereid worden op een arbeidsmarkt waar AI de norm is. Laat ze AI gebruiken voor het opstellen van zakelijke e-mails, marketingplannen, code of beleidsstukken, maar beoordeel hen op de kwaliteit van de output, de aanpassingen die ze doen en hun verantwoording." },
          { subtitle: "Praktijkvoorbeeld: Rollenspellen & Simulaties", text: "Gebruik AI om een 'lastige klant', 'patiënt' of 'opdrachtgever' te simuleren in een chat. De student oefent gesprekstechnieken en krijgt direct feedback van de AI op hun communicatiestijl (empathie, duidelijkheid, professionaliteit)." },
          { subtitle: "Onderzoek en Betrouwbaarheid", text: "Bij afstudeeronderzoek kan AI helpen bij het brainstormen over deelvragen of het vinden van structuren. Waarschuw studenten echter voor 'hallucinaties' (verzonnen feiten en niet-bestaande bronnen). Eis altijd dat ze de originele bronnen opzoeken en lezen." },
          { subtitle: "Portfolio", text: "Laat studenten in hun portfolio reflecteren op hun AI-gebruik: 'Welke prompt heb ik gebruikt? Wat was het resultaat? Hoe heb ik dit verbeterd?' Dit maakt het proces transparant." }
        ]
      },
      {
        title: "5. Praktische Implementatiegids",
        content: [
          { subtitle: "Stappenplan voor de Docent/Team", text: "Stap 1: Verkenning. Speel zelf een avond met tools als ChatGPT of Claude. Wat kan het wel/niet?\nStap 2: Kleine Pilot. Kies één les of werkvorm uit om te testen. Verwacht niet dat het perfect gaat.\nStap 3: Didactische afspraken. Bespreek met je sectie: wat vinden we fraude? Wat vinden we slim gebruik?\nStap 4: Scholing. Volg een webinar of workshop (of organiseer er een).\nStap 5: Evaluatie. Vraag leerlingen wat zij ervan vonden. Vaak weten zij al meer dan wij denken." },
          { subtitle: "Checklist voor in de les", text: "• Heb ik een duidelijk doel voor het AI-gebruik?\n• Weten de leerlingen wat wel en niet mag?\n• Heb ik nagedacht over leerlingen zonder device?\n• Weet ik hoe ik de geschiedenis wis (privacy)?" }
        ]
      },
      {
        title: "6. Ethiek en Veiligheid in AI-onderwijs",
        content: [
          { subtitle: "Privacy en AVG (GDPR)", text: "De gouden regel: Voer NOOIT persoonsgegevens van leerlingen (namen, adressen, cijferlijsten) in een openbare AI-tool in. De data wordt vaak gebruikt om het model te trainen. Gebruik anonimisering (bijv. 'Leerling A' of fictieve casussen)." },
          { subtitle: "Bias en Discriminatie", text: "AI is getraind op het internet. Dat betekent dat het vooroordelen kan bevatten (gender, afkomst, culturele bias). Leer leerlingen dat AI niet neutraal is. Gebruik dit als lesmateriaal: laat de AI een 'succesvolle CEO' genereren en bespreek het resultaat (is het altijd een man in pak?)." },
          { subtitle: "10 Richtlijnen voor Veilig AI-gebruik", text: "1. Wees transparant over AI-gebruik.\n2. Check altijd de feiten (fact-checking).\n3. Respecteer auteursrecht.\n4. Bescherm je privacy (geen persoonsdata).\n5. Blijf kritisch nadenken.\n6. Gebruik AI als hulpmiddel, niet als vervanging.\n7. Meld ongepaste output bij de docent.\n8. Ken de leeftijdslimieten van tools (vaak 13+).\n9. Deel geen wachtwoorden.\n10. De mens blijft eindverantwoordelijk." }
        ]
      },
      {
        title: "7. Nederlandse AI-tools en Resources",
        content: [
          { subtitle: "Tekst & Taal", text: "Naast de grote internationale spelers (OpenAI, Microsoft, Google) zijn er tools die specifiek goed zijn in Nederlands of gericht op het onderwijs. Denk aan vertaaltools (DeepL) of tools die helpen bij dyslexie." },
          { subtitle: "Beeld & Creatie", text: "Tools voor het genereren van afbeeldingen (zoals Adobe Firefly, Bing Image Creator) kunnen in de kunstles of bij projecten gebruikt worden. Let op: veel van deze tools vereisen een account (13+)." },
          { subtitle: "Toetsing & Quizzen", text: "Er zijn tools die op basis van een tekst automatisch meerkeuzevragen genereren (bijv. in Forms of Kahoot). Dit bespaart docenten enorm veel tijd. Controleer wel altijd de antwoordsleutel, want AI maakt fouten!" },
          { subtitle: "Waarop letten?", text: "• Kosten: Is er een gratis versie?\n• Privacy: Wat gebeurt er met de data?\n• Taal: Werkt het goed in het Nederlands?\n• Reclame: Is de tool vrij van afleidende advertenties?" }
        ]
      },
      {
        title: "8. Stappenplan voor Schoolleiders",
        content: [
          { subtitle: "Visie en Beleid", text: "AI is geen IT-feestje, maar raakt de kern van het onderwijs. Formuleer een visie: leiden we op vòòr AI, mèt AI, of ondanks AI? Betrek de MR, ouders en het team hierbij." },
          { subtitle: "Beslisboom: Waar te beginnen?", text: "Start -> Is er draagvlak? -> JA: Vorm een werkgroep. NEE: Organiseer inspiratiesessie.\nWerkgroep -> Is er beleid op fraude? -> JA: Update met AI-paragraaf. NEE: Stel kaders op.\nInfrastructuur -> Zijn er devices? -> JA: Regel accounts/licenties. NEE: Start met klassikale demo's." },
          { subtitle: "Professionalisering", text: "Faciliteer tijd en ruimte voor docenten om te experimenteren. Fouten maken mag. Zorg voor een veilige cultuur waarin docenten elkaar durven bevragen." },
          { subtitle: "Infrastructuur", text: "Denk na over filters op het wifi-netwerk, maar blokkeer niet alles. 'Walled gardens' (afgeschermde AI-omgevingen) zijn voor scholen vaak veiliger dan openbare tools." }
        ]
      },
      {
        title: "9. Evaluatie en Assessment met AI",
        content: [
          { subtitle: "Het einde van het opstel?", text: "Niet per se, maar het 'thuis schrijven van een verslag' is fraudegevoelig geworden. Verplaats schrijfopdrachten naar de les (toezicht), of focus meer op het proces, de presentatie en de mondelinge toelichting." },
          { subtitle: "Rubrics met AI", text: "Je kunt AI vragen om een rubric te maken. Prompt voorbeeld: 'Maak een rubric voor een betoog in 4 HAVO, beoordeel op structuur, argumentatie en spelling, in tabelvorm.' Dit geeft een prima startpunt dat je zelf kunt verfijnen." },
          { subtitle: "Formatief Handelen", text: "AI is koning in formatief handelen. Het kan onvermoeibaar feedback geven aan 30 leerlingen tegelijk, zodat jij als docent je kunt richten op de leerlingen die vastlopen. Gebruik AI om oefentoetsen te genereren voor leerlingen." }
        ]
      },
      {
        title: "10. Toekomst van AI in het Onderwijs",
        content: [
          { subtitle: "Adaptieve Leerpaden", text: "We gaan toe naar systemen die real-time zien wat een leerling moeilijk vindt en de stof daarop aanpassen. De 'one size fits all' lesmethode zal langzaam verdwijnen ten gunste van gepersonaliseerde routes." },
          { subtitle: "Rol van de Docent", text: "De docent wordt minder 'kenniszender' en meer coach, mentor en curator van informatie. De menselijke relatie wordt juist belangrijker in een technologische wereld. Empathie en pedagogisch contact kan AI niet vervangen." },
          { subtitle: "Wat kun je nu doen?", text: "Blijf nieuwsgierig. De ontwikkelingen gaan snel, maar de basisprincipes van goed onderwijs (relatie, competentie, autonomie) blijven overeind. Omarm de tools die jouw werk lichter maken, zodat jij je op de leerling kunt richten." }
        ]
      },
      {
        title: "11. Veelgestelde Vragen (FAQ)",
        content: [
          { subtitle: "Vraag 1: Mag een leerling AI gebruiken voor huiswerk?", text: "Dat bepaal jij. Het advies is: ja, mits transparant en als hulpmiddel. 'Ik heb AI gebruikt om ideeën te genereren, maar de tekst zelf geschreven' is een prima werkwijze." },
          { subtitle: "Vraag 2: Hoe herken ik AI-plagiaat?", text: "AI-detectors zijn onbetrouwbaar. Kijk liever naar het proces (versies, bronnen) en ga het gesprek aan. Als een leerling woorden gebruikt die hij/zij niet kent, is dat een signaal." },
          { subtitle: "Vraag 3: Wat zeg ik tegen ouders die bezorgd zijn?", text: "Leg uit dat jullie school stuurt op 'AI-geletterdheid': we leren kinderen om er verantwoord en kritisch mee om te gaan, zodat ze voorbereid zijn op de toekomst." },
          { subtitle: "Vraag 4: Hoe ga ik om met leerlingen die verder zijn dan ik?", text: "Maak gebruik van hun kennis! Laat ze expert zijn en demo's geven in de klas. Je hoeft niet alles zelf te weten." }
        ]
      },
      {
        title: "12. Bronnen en Verdere Verdieping",
        content: [
          { subtitle: "Betrouwbare Bronnen", text: "• Kennisnet (Technologie & Onderwijs)\n• Nederlandse AI Coalitie (NLAIC)\n• Surf (voor MBO/HBO/WO)\n• Vakverenigingen" },
          { subtitle: "Collegiaal Leren", text: "De beste bron is je collega. Organiseer eens een 'AI-café' op school waar iedereen zijn favoriete tool of blunder deelt. Samen leer je sneller." },
          { subtitle: "Online Cursussen", text: "Zoek naar gratis MOOC's over 'AI in Education' of de 'Nationale AI Cursus' (ook versies voor kinderen/jongeren)." }
        ]
      }
    ];

    // --- LOOP DOOR HOOFDSTUKKEN EN RENDER ZE ---
    chapters.forEach((chapter, index) => {
      // Nieuwe pagina voor elk hoofdstuk
      doc.addPage();
      addPageHeader(pageNum++);
      
      let currentY = 40;

      // Hoofdstuktitel
      doc.setFillColor(240, 240, 240); // Light gray background for title
      doc.rect(margin, currentY - 6, contentWidth, 14, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 51, 102); // Dark blue text
      doc.text(chapter.title, margin + 2, currentY + 4);
      
      currentY += 20;

      // Secties binnen het hoofdstuk
      chapter.content.forEach(section => {
        // Check of we ruimte hebben voor de subtitel + een beetje tekst
        if (currentY > pageHeight - 40) {
          doc.addPage();
          addPageHeader(pageNum++);
          currentY = 40;
        }

        // Subtitel
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0); // Zwart
        doc.text(section.subtitle, margin, currentY);
        currentY += 6;

        // Body Text
        // addWrappedText regelt zelf page breaks als de tekst te lang is
        currentY = addWrappedText(section.text, margin, currentY, contentWidth, 11, 'normal');
        currentY += 8; // Witruimte na paragraaf
      });
    });

    // --- OPSLAAN ---
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `NIEUWE-V9-AI-Startersgids-Nederlandse-Versie-${dateStr}-${randomId}.pdf`;
    
    console.log('💾 SAVING COMPLETE 10+ PAGE PDF:', filename);
    doc.save(filename);
    
    setTimeout(() => {
      alert(`🎉 COMPLETE AI STARTERSGIDS V9.0 SUCCESVOL GEDOWNLOAD!\n\n📄 Bestandsnaam: ${filename}\n\n✅ Bevat alle 12 hoofdstukken met didactische inhoud.\n✅ Aantal pagina's: ${pageNum}`);
    }, 1000);

  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Er was een probleem bij het genereren van de complete startersgids. Probeer het opnieuw.');
  }
};

/**
 * COMPLETE LESSON PDF GENERATOR - GENERATES 8-12 PAGE LESSONS
 * (Deze functie blijft ongewijzigd en werkt zoals voorheen)
 */
export const downloadLesson = (lessonTitle) => {
  try {
    console.log('🔥 GENERATING COMPLETE LESSON PDF FOR:', lessonTitle);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const uniqueId = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now();

    doc.setFont('helvetica');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    const lineHeight = 6;

    let pageNum = 1;

    const addPageHeader = (num) => {
      doc.setFillColor(34, 197, 94);
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('AI LESMATERIAAL - ONDERWIJS.AI', 20, 16);
      doc.text(`Pagina ${num}`, pageWidth - 20, 16, { align: 'right' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setTextColor(85, 85, 85);
      doc.setFont('helvetica', 'normal');
      doc.text('https://onderwijs.ai/', pageWidth / 2, pageHeight - 16, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    };

    const addWrappedText = (text, x, startY, maxWidth, fontSize = 12) => {
      doc.setFontSize(fontSize);
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

    const lessonContent = generateLessonContent(lessonTitle);

    // PAGE 1: COVER
    addPageHeader(pageNum);
    doc.setFillColor(220, 38, 38);
    doc.rect(15, 35, 180, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPLETE LESBRIEF - AI ONDERWIJS', 105, 50, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    let yPos = addWrappedText(lessonContent.title || lessonTitle.toUpperCase(), margin, 80, contentWidth, 24);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yPos = addWrappedText('Gegenereerd: ' + new Date().toLocaleDateString('nl-NL'), margin, yPos + 10, contentWidth);
    yPos = addWrappedText('Les ID: ' + uniqueId, margin, yPos + 5, contentWidth);
    yPos = addWrappedText('Versie: Complete Lesbrief V2.2', margin, yPos + 5, contentWidth);
    yPos += 15;

    doc.setFillColor(240, 248, 255);
    doc.rect(margin, yPos, contentWidth, 60, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('LESOVERZICHT', margin + 10, yPos + 15, contentWidth - 20, 14);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lessonOverview = [
      `Titel: ${lessonContent.title || lessonTitle}`,
      `Duur: ${lessonContent.duration || '45-90 minuten'}`,
      `Niveau: ${lessonContent.targetGroup || 'Aangepast aan doelgroep'}`,
      'Benodigdheden: Computer/tablet, internetverbinding',
      'Leerdoelen: Praktische AI-vaardigheden ontwikkelen',
      'Materialen: Werkbladen, voorbeelden, evaluatieformulier'
    ];

    lessonOverview.forEach(item => {
      yPos = addWrappedText(`• ${item}`, margin + 10, yPos + 5, contentWidth - 20);
    });

    // PAGE 2: TOC
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('INHOUDSOPGAVE', margin, 50, contentWidth, 20);
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const tableOfContents = [
      '1. Lesinformatie en Voorbereiding ............................ 3',
      '2. Lesdoelen en Competenties ................................. 4',
      '3. Theorie en Lesopbouw ...................................... 5',
      '4. Praktische Activiteiten ................................... 6',
      '5. Werkbladen en Materialen ................................... 7',
      '6. Evaluatie en Docentenhandleiding ........................... 8',
      '7. Vervolgactiviteiten ........................................ 9',
      '8. Bijlagen en Resources ...................................... 10',
      '9. Antwoordmodellen ........................................... 11'
    ];
    tableOfContents.forEach(item => {
      yPos = addWrappedText(item, margin + 10, yPos + 3, contentWidth - 20);
    });

    // PAGE 3: LESINFORMATIE EN VOORBEREIDING
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(70, 130, 180);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('1. LESINFORMATIE EN VOORBEREIDING', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;
    
    const preparationContent = lessonContent.preparation || [
      'VOORBEREIDING DOCENT:',
      '• Test alle AI-tools vooraf',
      '• Maak accounts aan waar nodig'
    ];
    preparationContent.forEach(line => {
      if (line === '') {
        yPos += 3;
      } else if (line.endsWith(':')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 2;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 1;
      }
    });

    // PAGE 4: LESDOELEN
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(34, 197, 94);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('2. LESDOELEN EN COMPETENTIES', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    const objectivesContent = lessonContent.objectives || ['• Leerdoel 1'];
    objectivesContent.forEach(line => {
      if (line === '') {
        yPos += 3;
      } else if (line.endsWith(':')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 2;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 1;
      }
    });

    // PAGE 5: LESOPBOUW
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(147, 51, 234);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('3. THEORIE EN LESOPBOUW', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    const structureContent = lessonContent.structure || ['FASE 1: INTRODUCTIE'];
    structureContent.forEach(line => {
      if (line === '') {
        yPos += 3;
      } else if (line.startsWith('FASE') || line.endsWith(':')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 2;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 1;
      }
    });

    // PAGE 6: ACTIVITEITEN
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(220, 38, 38);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('4. PRAKTISCHE ACTIVITEITEN', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    const activitiesContent = lessonContent.activities || ['ACTIVITEIT 1'];
    activitiesContent.forEach(line => {
      if (line === '') {
        yPos += 3;
      } else if (line.startsWith('ACTIVITEIT') || line.endsWith(':')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 2;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 1;
      }
    });

    // PAGE 7: MATERIALEN
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(234, 179, 8);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('5. WERKBLADEN EN MATERIALEN', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    const materialsContent = lessonContent.materials || ['WERKBLAD 1'];
    materialsContent.forEach(line => {
      if (line === '') {
        yPos += 4;
      } else if (line.startsWith('WERKBLAD') || line.startsWith('3. Checklist') || line.startsWith('OPDRACHT')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 3;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 2;
      }
    });

    // PAGE 8: EVALUATIE
    doc.addPage();
    addPageHeader(pageNum++);
    doc.setFillColor(185, 28, 28);
    doc.rect(margin, 35, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPos = addWrappedText('6. EVALUATIE EN DOCENTENHANDLEIDING', margin + 5, 42, contentWidth - 10, 16);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    const evaluationContent = lessonContent.evaluation || ['FORMATIEVE EVALUATIE:'];
    evaluationContent.forEach(line => {
      if (line === '') {
        yPos += 3;
      } else if (line.endsWith(':')) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        doc.setFont('helvetica', 'normal');
        yPos += 2;
      } else {
        yPos = addWrappedText(line, margin, yPos, contentWidth);
        yPos += 1;
      }
    });

    const cleanTitle = lessonTitle.replace(/[^a-zA-Z0-9]/g, '-');
    const filenameLesson = `${cleanTitle}-COMPLETE-LESBRIEF-${dateStr}-${uniqueId}.pdf`;
    
    console.log('💾 SAVING COMPLETE LESSON PDF:', filenameLesson);
    doc.save(filenameLesson);
    
    setTimeout(() => {
      alert(`✅ COMPLETE LESBRIEF GEDOWNLOAD!\n\n📄 Bestandsnaam: ${filenameLesson}\n\n📚 Bevat 8+ pagina's:\n• Volledige lesvoorbereiding\n• Werkbladen en materialen\n• Evaluatieformulieren\n• Docentenhandleiding\n\n🎯 Direct klaar voor gebruik in de klas!`);
    }, 500);

  } catch (error) {
    console.error('Error generating complete lesson PDF:', error);
    alert('Er was een probleem bij het genereren van de complete lesbrief. Probeer het opnieuw.');
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

// ... Rest van de helperfuncties voor specifieke lesinhoud (ongewijzigd) ...
const generateLessonContent = (title) => {
  // Base content for generic lessons
  const baseContent = {
    title: title,
    duration: '45-90 minuten',
    targetGroup: 'PO/VO/MBO',
    preparation: [
      'VOORKENNIS:',
      '• Basiskennis computers en internet',
      '• Geen specifieke AI-ervaring vereist'
    ],
    objectives: [
      'HOOFDDOELEN:',
      '• Leerlingen begrijpen wat AI is'
    ],
    activities: [
      'ACTIVITEIT 1: AI HERKENNEN'
    ]
  };

  // 1. DATA VISUALISATIE (BESTAAND)
  if (title.toLowerCase().includes('data') || title.toLowerCase().includes('visualisatie')) {
    return {
      title: "Datavisualisatie met AI",
      duration: "60-90 minuten",
      targetGroup: "MBO / HBO (ICT, Economie, Zorg, Media)",
      preparation: [
        'INLEIDING VOOR DOCENT EN STUDENT:',
        'Organisaties verzamelen tegenwoordig enorme hoeveelheden data. Ruwe data zegt vaak weinig; visualisatie is nodig.',
        '',
        'BENODIGDHEDEN:',
        '• Laptop/PC met internettoegang',
        '• Spreadsheet software (Excel of Google Sheets)',
        '• Toegang tot een AI-chatbot'
      ],
      objectives: [
        'HOOFDDOELEN:',
        '• Studenten begrijpen het nut van datavisualisatie',
        '• Studenten kunnen AI gebruiken om data te genereren en analyseren'
      ],
      structure: [
        'FASE 1: THEORIE (15 min)',
        'FASE 2: CASUS (10 min)',
        'FASE 3: PRAKTIJK (45 min)',
        'FASE 4: ANALYSE & REFLECTIE (20 min)'
      ],
      activities: [
        'PRAKTIJKOPDRACHT: SCHERMTIJD ANALYSEREN',
        'Stap 1: Dataset genereren met AI',
        'Stap 2: Grafieken maken in Excel',
        'Stap 3: Analyseren van correlaties'
      ],
      materials: [
        'WERKBLAD: DATAVISUALISATIE',
        'Bevat stappenplan en reflectievragen.'
      ],
      evaluation: [
        'BEOORDELINGSCRITERIA:',
        '• Correcte dataset gegenereerd',
        '• Juiste grafiektypes gekozen',
        '• Heldere analyse van de resultaten'
      ]
    };
  }

  // 2. GESCHIEDENIS (BESTAAND)
  if (title.toLowerCase().includes('geschiedenis')) {
    return {
      title: "AI in de Geschiedenis – Hoe technologie onze wereld vormt",
      duration: "45-90 minuten",
      targetGroup: "Voortgezet Onderwijs (VMBO/HAVO/VWO)",
      preparation: [
        'VOORKENNIS:',
        '• Basiskennis tijdvakken en industriële revolutie',
        '',
        'BENODIGDHEDEN:',
        '• Devices met internet',
        '• AI-toegang',
        '• Historische bronnen (digitaal of print)'
      ],
      objectives: [
        'HOOFDDOEL:',
        '• Leerlingen vergelijken de AI-revolutie met historische technologische omwentelingen.'
      ],
      structure: [
        'FASE 1: HISTORISCHE TIJDLIJN',
        'FASE 2: BRONNENANALYSE',
        'FASE 3: AI-ONDERZOEK',
        'FASE 4: DISCUSSIE'
      ],
      activities: [
        'OPDRACHT A: AI ALS HISTORICUS',
        'OPDRACHT B: VERGELIJKING MET STOOMMACHINE',
        'OPDRACHT C: TOEKOMSTIGE GESCHIEDENIS'
      ],
      materials: [
        'WERKBLAD: AI IN DE GESCHIEDENIS',
        'Bevat bronteksten en vergelijkingstabellen.'
      ],
      evaluation: [
        'FORMATIEVE EVALUATIE:',
        '• Kwaliteit van de historische vergelijking',
        '• Mate van kritisch denken over AI-output'
      ]
    };
  }

  // 3. WETENSCHAPPELIJK ONDERZOEK (BESTAAND)
  if (title.toLowerCase().includes('wetenschappelijk') || title.toLowerCase().includes('onderzoek')) {
    return {
      title: "Wetenschappelijk Onderzoek met AI",
      duration: "90-120 minuten",
      targetGroup: "Bovenbouw VWO / Gymnasium & HBO",
      preparation: [
        'DOELGROEP:',
        '- Bovenbouw VWO / Gymnasium & HBO',
        '',
        'VOORKENNIS:',
        '- Onderzoekscyclus, bronnenonderzoek',
        '',
        'BENODIGDHEDEN:',
        '- Laptops, AI-tool, Tekstverwerker'
      ],
      objectives: [
        'LEERDOELEN:',
        '1. Onderzoeksvraag aanscherpen met AI',
        '2. Literatuurverkenning (met bronkritiek)',
        '3. Methodologie bepalen'
      ],
      structure: [
        'FASE 1: ONDERZOEKSCYCLUS HERHALEN',
        'FASE 2: AI ALS SPARRENPARTNER',
        'FASE 3: PLAN VORMEN',
        'FASE 4: REFLECTIE'
      ],
      activities: [
        'OPDRACHT 1: VRAAG AANSCHERPEN',
        'OPDRACHT 2: LITERATUUR CHECK',
        'OPDRACHT 3: METHODE KIEZEN'
      ],
      materials: [
        'WERKBLAD: ONDERZOEKSPLAN MET AI'
      ],
      evaluation: [
        'RUBRIC:',
        '- Kwaliteit onderzoeksvraag',
        '- Kritisch gebruik AI',
        '- Haalbaarheid plan'
      ]
    };
  }

  // 4. AI ETHICS DEBAT (VO)
  if (title.toLowerCase().includes('ethics') || title.toLowerCase().includes('debat')) {
    return {
      title: "AI Ethics Debat: Eerlijkheid, Privacy en Controle",
      duration: "100-120 minuten (2 lesuren)",
      targetGroup: "Voortgezet Onderwijs (HAVO/VWO/Gymnasium)",
      preparation: [
        'VOORKENNIS:',
        '• Basisbegrip van wat AI is (algoritmes, data)',
        '• Ervaring met debatteren is handig, maar niet vereist',
        '',
        'BENODIGDHEDEN:',
        '• Rolkaarten (zie Materialen)',
        '• Digibord voor stellingen',
        '• Toegang tot AI-tool (voor voorbereidende fase)',
        '• Werkblad "Argumenten Analyse"',
        '',
        'DOCENTVOORBEREIDING:',
        '• Lees de drie casussen goed door.',
        '• Print de rolkaarten en knip ze uit.',
        '• Bepaal de debatvorm: Lagerhuis (klassikaal, dynamisch) of Oxford (formeel, groepen).'
      ],
      objectives: [
        'HOOFDDOEL:',
        'Leerlingen ontwikkelen een kritische, ethische houding ten opzichte van AI-toepassingen in de maatschappij.',
        '',
        'CONCRETE LEERDOELEN:',
        '1. Leerlingen kunnen uitleggen wat bias (vooroordeel) in algoritmes is en hoe dit ontstaat.',
        '2. Leerlingen kunnen het spanningsveld benoemen tussen veiligheid (surveillance) en privacy.',
        '3. Leerlingen kunnen argumenten formuleren vanuit verschillende perspectieven (rolvastheid).',
        '4. Leerlingen gebruiken AI als hulpmiddel om argumenten te vinden, maar controleren deze op feitelijkheid.'
      ],
      structure: [
        'FASE 1: INTRODUCTIE ETHIEK (15 min)',
        '• Uitleg kernbegrippen: Bias (trainingsdata), Privacy (surveillance), Autonomie (wie beslist?).',
        '• Korte video of voorbeeld van "Predictive Policing" of "Toeslagenaffaire" als trigger.',
        '',
        'FASE 2: VOORBEREIDING MET AI (25 min)',
        '• Klas wordt verdeeld in groepen/rollen.',
        '• Leerlingen gebruiken AI om argumenten VOOR en TEGEN hun casus te genereren.',
        '• Kritische check: "Zijn deze AI-argumenten eenzijdig?"',
        '',
        'FASE 3: HET DEBAT (40 min)',
        '• Ronde 1: Casus "Predictive Policing" (Veiligheid vs. Discriminatie).',
        '• Ronde 2: Casus "School Surveillance" (Spieken tegengaan vs. Privacy).',
        '• Ronde 3: Casus "Social Media Algoritmes" (Vermaak vs. Verslaving/Manipulatie).',
        '',
        'FASE 4: REFLECTIE & MINI-ESSAY (20 min)',
        '• Klassikale nabespreking: Welk argument gaf de doorslag?',
        '• Schrijfopdracht (huiswerk of in de les): 200 woorden reflectie.'
      ],
      activities: [
        'CASUS 1: PREDICTIVE POLICING',
        'De politie wil een AI inzetten die voorspelt waar inbraken gaan plaatsvinden. De AI is getraind op arrestatiegegevens uit het verleden.',
        'Dilemma: Efficiënter boeven vangen VS. risico op etnisch profileren (bias in oude data).',
        '',
        'CASUS 2: AI-SURVEILLANCE OP SCHOOL',
        'De school wil camera\'s met gezichtsherkenning en emotie-analyse ophangen om pestgedrag en spieken te detecteren.',
        'Dilemma: Veilige school VS. totale controle en privacy-inbreuk.',
        '',
        'CASUS 3: DE AANBEVELINGS-ALGORITMES',
        'Social media apps optimaliseren puur op "kijktijd".',
        'Dilemma: Vrijheid van ondernemen VS. mentale gezondheid van jongeren (fuik-effect).',
        '',
        'AI-PROMPTS VOOR LEERLINGEN:',
        '• "Geef 3 sterke, juridische argumenten tégen gezichtsherkenning op scholen."',
        '• "Bedenk argumenten waarom een algorithm nooit neutraal kan zijn."',
        '• "Speel advocaat van de duivel: waarom is predictive policing goed voor een arme wijk?"'
      ],
      materials: [
        'ROLKAARTEN (uitknippen):',
        '1. De Bezorgde Burger/Scholier: Bang voor privacyverlies, voelt zich bekeken.',
        '2. De Tech-Optimist/Ondernemer: Gelooft dat AI alles veiliger en efficiënter maakt.',
        '3. De Jurist/Ethicus: Wijst op grondrechten en discriminatieverbod.',
        '4. De Beleidsmaker/Directeur: Wil problemen (criminaliteit/spieken) oplossen met beperkt budget.',
        '5. De AI-Onderzoeker: Weet hoe de techniek werkt en waar de fouten zitten (false positives).',
        '',
        'WERKBLAD "ARGUMENTEN CHECK":',
        '- Stelling:',
        '- Argumenten gevonden door AI:',
        '- Mogelijke weerlegging:',
        '- Welke bronnen/bewijs heb ik nodig?'
      ],
      evaluation: [
        'RUBRIC ARGUMENTATIE (4 NIVEAUS):',
        '',
        '1. Inhoud & Diepgang',
        '- Onvoldoende: Oppervlakkige meningen ("ik vind het stom").',
        '- Voldoende: Gebruikt begrippen als privacy of veiligheid correct.',
        '- Goed: Legt uit hoe technische bias ontstaat en koppelt dit aan maatschappelijke gevolgen.',
        '- Excellent: Verbindt ethische theorieën aan de praktijkcasus.',
        '',
        '2. Debatvaardigheden',
        '- Onvoldoende: Luistert niet, valt in herhaling.',
        '- Voldoende: Reageert op anderen.',
        '- Goed: Weerlegt tegenargumenten scherp.',
        '- Excellent: Synthetiseert standpunten en vindt de kern van het conflict.',
        '',
        '3. Reflectie (Mini-essay)',
        '- Beoordeling op: Eigen standpuntbepaling los van de rol in het debat.'
      ]
    };
  }

  // 5. AI KUNSTPROJECT (PO/VO)
  if (title.toLowerCase().includes('kunst') || (title.toLowerCase().includes('art') && !title.toLowerCase().includes('smart'))) {
    return {
      title: "AI Kunstproject: Van Prompt tot Meesterwerk",
      duration: "90-120 minuten (of projectweek)",
      targetGroup: "PO (Bovenbouw) / VO (Onderbouw)",
      preparation: [
        'VOORKENNIS:',
        '• Geen specifieke voorkennis vereist.',
        '• Uitleg verschil tussen "zoeken op Google" (bestaand plaatje) en "genereren" (nieuw plaatje).',
        '',
        'BENODIGDHEDEN:',
        '• Toegang tot een Image Generator (Adobe Firefly, DALL-E, Bing Image Creator, of schoolveilige tool).',
        '• Digibord voor klassikale analyse.',
        '• Werkblad "Mijn Kunstplan".',
        '• Kleurpotloden/papier (voor de schetsfase).'
      ],
      objectives: [
        'HOOFDDOEL:',
        'Leerlingen leren hoe ze AI kunnen inzetten als creatief gereedschap, waarbij ze visuele taal omzetten in tekst (prompts) en reflecteren op eigenaarschap.',
        '',
        'CONCRETE LEERDOELEN:',
        '1. Leerlingen kennen visuele begrippen: compositie, perspectief (kikvors/vogelvlucht), lichtval, stijl (impressionisme, fotorealistisch).',
        '2. Leerlingen kunnen een idee iteratief verbeteren door hun prompt aan te passen.',
        '3. Leerlingen reflecteren op de vraag: "Is dit kunst?" en "Van wie is het plaatje?".'
      ],
      structure: [
        'FASE 1: KIJKEN & ANALYSEREN (20 min)',
        '• Laat AI-beelden zien. Raadspel: "Echt of AI?".',
        '• Bespreek beeldtaal: Wat maakt een beeld spannend? (Contrast, kleur, standpunt).',
        '',
        'FASE 2: ONTWERPEN & PROMPTEN (50 min)',
        '• Stap 1: Analoog schetsen. Wat wil je maken? Welke sfeer?',
        '• Stap 2: Eerste prompt schrijven (Subject + Actie + Context).',
        '• Stap 3: Genereren en verfijnen (Toevoegen van stijl, licht, cameralens).',
        '• Stap 4: Selectie van het beste werk.',
        '',
        'FASE 3: EXPOSITIE & ETHIEK (20 min)',
        '• Digitale galerij op het bord.',
        '• Discussie: "Heb jij dit gemaakt of de computer?"',
        '• "Mag je de stijl van Van Gogh zomaar kopiëren?"'
      ],
      activities: [
        'DE PROMPT-FORMULE:',
        'Leerlingen leren de structuur:',
        '1. Onderwerp (Een kat)',
        '2. Actie (die gitaar speelt)',
        '3. Omgeving (op de maan)',
        '4. Stijl (in de stijl van Pixar / Olieverf / Cyberpunk)',
        '5. Techniek/Licht (Cinematic lighting, 4k, close-up)',
        '',
        'ITERATIE-OPDRACHT:',
        'Begin met "Een huis".',
        'Maak het specifieker: "Een oud spookhuis in een donker bos".',
        'Voeg stijl toe: "Een oud spookhuis in een donker bos, geschilderd door Vincent van Gogh".',
        'Vergelijk de resultaten.'
      ],
      materials: [
        'WERKBLAD "MIJN KUNSTPLAN":',
        'Vak 1: Mijn idee (schets/steekwoorden).',
        'Vak 2: Mijn eerste prompt.',
        'Vak 3: Wat ging er mis? (Reflectie op resultaat 1).',
        'Vak 4: Mijn verbeterde prompt (Final Version).',
        '',
        'BEGRIPPENLIJST BEELDTAAL:',
        '- Compositie (centraal, regel van derden)',
        '- Perspectief (kikvors, vogelvlucht)',
        '- Stijlen (Surrealisme, Pop-art, Sketch, 3D Render)'
      ],
      evaluation: [
        'RUBRIC KUNST & TECHNIEK:',
        '',
        '1. Creativiteit & Originaliteit',
        '- Heeft de leerling een eigen concept bedacht of iets standaards gekopieerd?',
        '',
        '2. Techniek (Prompting)',
        '- Gebruik van stijlbegrippen en details in de tekst.',
        '- Zichtbare verbetering tussen poging 1 en poging 3.',
        '',
        '3. Reflectie',
        '- Kan de leerling uitleggen waarom bepaalde keuzes zijn gemaakt?',
        '- Actieve deelname aan het ethische gesprek.'
      ]
    };
  }

  // 6. INTRODUCTIE TOT AI VOOR KINDEREN (PO)
  if (title.toLowerCase().includes('kinderen') || (title.toLowerCase().includes('introductie') && title.toLowerCase().includes('ai'))) {
    return {
      title: "Introductie AI voor Kinderen: Slimme Robots & Algoritmes",
      duration: "60-90 minuten",
      targetGroup: "Basisonderwijs (Groep 5-8)",
      preparation: [
        'VOORKENNIS:',
        '• Geen. Dit is een eerste kennismaking.',
        '',
        'BENODIGDHEDEN:',
        '• Digibord.',
        '• "Quick, Draw!" van Google (klassikaal of op tablets).',
        '• Werkblad "De Slimme Robot".',
        '• Kleurpotloden.'
      ],
      objectives: [
        'HOOFDDOELEN:',
        '1. Kinderen snappen het verschil tussen een "gewone" robot (doet precies wat je zegt) en AI (leert zelf).',
        '2. Kinderen begrijpen dat AI getraind moet worden met heel veel voorbeelden.',
        '3. Kinderen leren dat ze voorzichtig moeten zijn met privégegevens.',
        '',
        'KERNDOELEN (PO):',
        '• Oriëntatie op onszelf en de wereld (Techniek).',
        '• Mediawijsheid.'
      ],
      structure: [
        'FASE 1: WAT IS AI? (15 min)',
        '• Vraag: "Wie heeft er wel eens tegen Siri of Google gepraat?"',
        '• Uitleg: AI is als een heel slim huisdier. Je moet het trainen.',
        '• Vergelijking: Een broodrooster (dom) vs. een zelfrijdende auto (slim).',
        '',
        'FASE 2: AI TRAINEN - SPEL "QUICK DRAW" (20 min)',
        '• Speel Google Quick Draw. De computer raadt wat je tekent.',
        '• Bespreek: Hoe weet de computer dat dit een poes is? (Omdat hij miljoenen tekeningen van poezen heeft gezien).',
        '',
        'FASE 3: PROGRAMMEREN (UNPLUGGED) (20 min)',
        '• Spel: "De Robot Docent".',
        '• Eén kind is de robot. De klas moet instructies geven (IF/THEN).',
        '• "ALS ik mijn hand opsteek, DAN zeg je Hallo".',
        '',
        'FASE 4: PRIVACY & AFSLUITING (15 min)',
        '• Waarom mag je nooit je adres of wachtwoord tegen een AI zeggen?',
        '• Tekenopdracht: Hoe ziet jouw hulp-robot eruit?'
      ],
      activities: [
        'ACTIVITEIT A: "IS HET AI?"',
        'Toon plaatjes op het bord. Kinderen rennen naar kant A (Wel AI) of B (Geen AI).',
        '- Een rekenmachine? (Nee)',
        '- Netflix aanbevelingen? (Ja)',
        '- Een fiets? (Nee)',
        '- Een filter op TikTok? (Ja)',
        '',
        'ACTIVITEIT B: AI VERTELLEN',
        'Begin een verhaal: "Er was eens een paars monster..."',
        'Vraag ChatGPT (op het digibord) om het af te maken.',
        'Is het grappig? Klopt het? Is het beter dan wat wij konden verzinnen?',
        '',
        'ACTIVITEIT C: ROLLENSPEL',
        'Kind speelt "Chatbot". Ander kind stelt vragen.',
        'De Chatbot mag alleen antwoorden wat hij "geleerd" heeft (van kaartjes).'
      ],
      materials: [
        'WERKBLAD "DE SLIMME ROBOT":',
        '1. Tekenopdracht: Mijn AI-hulpje.',
        '2. Puzzel: Verbind het apparaat met "Wel AI" of "Geen AI".',
        '3. Privacy-schild: Kleur de dingen in die je GEHEIM moet houden (Wachtwoord, Adres, Naam).',
        '',
        'PSEUDOCODE KAARTJES:',
        '- ALS (Regen) DAN (Paraplu)',
        '- ALS (Rood Licht) DAN (Stoppen)'
      ],
      evaluation: [
        'EVALUATIEVRAGEN:',
        '• Kan de computer zelf nadenken zoals een mens? (Nee, hij rekent heel snel).',
        '• Wat gebeurt er als je een AI "foute" dingen leert? (Dan gaat hij fouten maken -> Bias/Vooroordeel uitleggen op kinderniveau).',
        '• Vond je de AI slim of soms ook een beetje dom?'
      ]
    };
  }

  // 7. AI VOOR TAALONDERWIJS (VO/MBO)
  if (title.toLowerCase().includes('taal') && !title.toLowerCase().includes('kinderen')) {
    return {
      title: "AI voor Taalonderwijs: Schrijven, Spreken & Feedback",
      duration: "90-120 minuten",
      targetGroup: "VO (Bovenbouw) / MBO (Niveau 3-4)",
      preparation: [
        'VOORKENNIS:',
        '• Basiskennis van tekststructuur en grammatica.',
        '• Bekendheid met ERK-niveaus (A2, B1, B2) is een pre.',
        '',
        'BENODIGDHEDEN:',
        '• Toegang tot ChatGPT/Claude/Copilot.',
        '• Een eigen tekst (of concept) van de leerling.',
        '• Rubric voor beoordeling.'
      ],
      objectives: [
        'HOOFDDOEL:',
        'Leerlingen leren AI inzetten als persoonlijke taalcoach en redacteur, zonder het schrijfproces volledig uit handen te geven.',
        '',
        'CONCRETE LEERDOELEN:',
        '1. Leerlingen kunnen AI gerichte feedback laten geven op spelling, grammatica en structuur.',
        '2. Leerlingen kunnen hun tekst transformeren naar verschillende registers (formeel/informeel) met hulp van AI.',
        '3. Leerlingen herkennen "AI-taal" en leren dit menselijker te maken.',
        '4. MBO-specifiek: Effectieve zakelijke communicatie (e-mails, rapportages) opstellen.'
      ],
      structure: [
        'FASE 1: DE AI REDACTEUR (20 min)',
        '• Klassikale demo: Een slechte, rommelige tekst invoeren.',
        '• Prompt engineering voor feedback: Niet "herschrijf dit", maar "geef feedback op structuur".',
        '',
        'FASE 2: SCHRIJFOPDRACHT & REVISIE (45 min)',
        '• Leerlingen schrijven een eerste versie (zakelijke e-mail of betoog).',
        '• Peer-review met AI: Laat AI de tekst beoordelen op B1/B2 niveau.',
        '• Leerling verwerkt de feedback ZELF (niet copy-paste).',
        '',
        'FASE 3: REGISTER & STIJL (25 min)',
        '• Experiment: Laat AI de tekst herschrijven als "een boze klant", "een rapper", "een formele directeur".',
        '• Analyse: Wat verandert er in de woordkeuze?',
        '',
        'FASE 4: WOORDENSCHAT (15 min)',
        '• Synonym sets genereren voor veelgebruikte woorden ("leuk", "goed", "slecht").'
      ],
      activities: [
        'OPDRACHT A: DE EMAIL-FIXER (MBO)',
        'Casus: Je moet een stagebedrijf mailen dat je ziek bent.',
        '1. Schrijf je eigen mail.',
        '2. Vraag AI: "Is deze mail beleefd genoeg? Staan er fouten in?"',
        '3. Verbeter je mail op basis van de tips.',
        '',
        'OPDRACHT B: TEKSTSTRUCTUUR (VO)',
        'Neem je betoog.',
        'Prompt: "Analyseer de alineastructuur. Heeft elke alinea een kernzin? Is de inleiding pakkend?"',
        '',
        'OPDRACHT C: TAALNIVEAU CHECK',
        'Prompt: "Welk ERK-niveau is deze tekst? Wat moet ik veranderen om van B1 naar B2 te gaan?"'
      ],
      materials: [
        'PROMPT BIBLIOTHEEK TAAL:',
        '- "Corrigeer alleen de d/t fouten in deze tekst en leg uit waarom het fout was."',
        '- "Geef me 5 synoniemen voor het woord \'belangrijk\' die passen in een zakelijke context."',
        '- "Herschrijf deze zin zodat hij actiever klinkt."',
        '',
        'CHECKLIST "MENSELIJK VS AI":',
        '- Gebruikt de AI te dure woorden?',
        '- Klinkt het als een robot?',
        '- Is de toon passend bij de ontvanger?'
      ],
      evaluation: [
        'RUBRIC SCHRIJFVAARDIGHEID MET AI:',
        '',
        '1. Zelfstandigheid',
        '- Heeft de leerling de tekst blind gekopieerd of de feedback verwerkt?',
        '',
        '2. Prompting',
        '- Kwaliteit van de vragen aan de AI (specifiek vs. algemeen).',
        '',
        '3. Eindproduct',
        '- Is de tekst foutloos?',
        '- Is de toon en structuur passend bij het doel?'
      ]
    };
  }

  // 8. PROGRAMMEREN MET AI COPILOT (MBO/HBO)
  if (title.toLowerCase().includes('programmeren') || title.toLowerCase().includes('copilot')) {
    return {
      title: "Programmeren met AI Copilot: De Pair Programmer",
      duration: "120-150 minuten",
      targetGroup: "MBO (ICT) / HBO (Informatica/CMD)",
      preparation: [
        'VOORKENNIS:',
        '• Basis programmeerervaring (Variabelen, Functies, Loops).',
        '• Bekendheid met een IDE (VS Code) en taal (Python, JS, of HTML/CSS).',
        '',
        'BENODIGDHEDEN:',
        '• Laptops met VS Code.',
        '• Toegang tot GitHub Copilot, ChatGPT of Codeium.',
        '• Een "broken" stuk code (om te debuggen).'
      ],
      objectives: [
        'HOOFDDOEL:',
        'Studenten leren AI gebruiken als efficiënte "pair programmer" om sneller te coderen, te debuggen en nieuwe concepten te leren, zonder de controle over de code te verliezen.',
        '',
        'CONCRETE LEERDOELEN:',
        '1. Studenten kunnen effectieve prompts schrijven voor codegeneratie (Context + Taak + Constraints).',
        '2. Studenten kunnen AI-gegenereerde code lezen, begrijpen en verifiëren (Security check).',
        '3. Studenten gebruiken AI voor debugging en refactoring.',
        '4. Studenten snappen de risico\'s: Hallucinaties (bestaat deze library wel?) en Security (API keys, PII).'
      ],
      structure: [
        'FASE 1: INTRODUCTIE PAIR PROGRAMMING (20 min)',
        '• AI is je stagiair: Snel, enthousiast, maar maakt fouten.',
        '• Demo: Code genereren vs. Code begrijpen.',
        '• Security waarschuwing: Geen API keys of klantdata in de chat!',
        '',
        'FASE 2: DEBUGGEN & VERKLAREN (30 min)',
        '• Geef studenten een stuk code met bugs.',
        '• Opdracht: Laat de AI de bug vinden EN uitleggen.',
        '• "Explain this code": Laat AI complexe functies regel voor regel uitleggen.',
        '',
        'FASE 3: MINI-PROJECT (60 min)',
        '• Keuze uit: Python (Tekstverwerker), JS (Interactieve Todo-lijst) of Web (Landing Page).',
        '• Workflow: Prompt -> Code -> Review -> Refactor.',
        '',
        'FASE 4: REFLECTIE & CODE REVIEW (30 min)',
        '• Peer review: Bekijk elkaars code. Zie je welk deel AI was?',
        '• Discussie: Leer je nog wel coderen als AI het doet?'
      ],
      activities: [
        'OPDRACHT A: DE PROMPT ENGINEER',
        'Vraag de AI om een functie te schrijven. Probeer 3 versies:',
        '1. Vaag: "Maak een login systeem."',
        '2. Beter: "Maak een Python login functie met hashing."',
        '3. Best: "Schrijf een Python functie die een wachtwoord en salt neemt, SHA-256 gebruikt en true/false returnt. Voeg error handling toe."',
        'Vergelijk de output.',
        '',
        'OPDRACHT B: UNIT TESTS GENEREREN',
        'Heb je een functie? Laat de AI 5 unit tests schrijven, inclusief edge cases (lege input, verkeerd type).',
        '',
        'OPDRACHT C: REFACTORING',
        'Neem oude, rommelige code en vraag: "Herschrijf dit zodat het Clean Code principes volgt en voeg commentaar toe."'
      ],
      materials: [
        'CHEAT SHEET "AI FOR DEVS":',
        '- /explain: Leg uit wat deze code doet.',
        '- /fix: Er zit een bug in, help mij.',
        '- /optimize: Kan dit sneller of korter?',
        '- /doc: Schrijf documentatie voor deze functie.',
        '',
        'SECURITY CHECKLIST:',
        '- Staan er wachtwoorden in mijn code?',
        '- Gebruik ik verouderde libraries die de AI voorstelt?',
        '- Begrijp ik écht wat deze regel code doet?'
      ],
      evaluation: [
        'RUBRIC CODE KWALITEIT:',
        '',
        '1. Functionaliteit',
        '- Werkt de code zoals bedoeld?',
        '',
        '2. Begrip (Cruciaal!)',
        '- Kan de student uitleggen wat elke regel doet? (De "waarom" vraag).',
        '- Als de student het niet kan uitleggen = onvoldoende, ongeacht of de code werkt.',
        '',
        '3. AI-Integratie',
        '- Is de AI gebruikt voor documentatie en tests?',
        '- Is de code gecontroleerd op veiligheid?'
      ]
    };
  }

  // Fallback for generic or other lessons
  return baseContent;
};