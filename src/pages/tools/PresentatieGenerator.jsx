import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMonitor, FiLayers, FiList, FiClock, FiTarget, FiEdit3, FiCpu, FiCopy, FiCheck, FiBook } = FiIcons;

const PresentatieGenerator = () => {
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    topic: '',
    goal: 'Uitleg nieuwe stof',
    targetGroup: 'Hele klas',
    duration: '15',
    slideCount: '8',
    style: 'Overzichtelijk & eenvoudig',
    extraInput: ''
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePresentation = (e) => {
    e.preventDefault();
    // 1. LOGICA: Dia-indeling genereren
    const totalSlides = parseInt(formData.slideCount) || 8;
    const slides = [];

    // Dia 1: Titel
    slides.push({ number: 1, title: "Titel & Introductie", content: [`Titel: ${formData.subject} - ${formData.topic}`, `Doel: ${formData.goal}`, "Korte agenda van de les"] });
    // Dia 2: Activering
    slides.push({ number: 2, title: "Activeren voorkennis", content: ["1-2 vragen over wat the leerlingen al weten", "Korte stelling of beeld om interesse te wekken"] });

    const fixedSlides = 3;
    const coreSlidesCount = Math.max(1, totalSlides - fixedSlides);
    const explanationCount = Math.ceil(coreSlidesCount * 0.6);
    const practiceCount = coreSlidesCount - explanationCount;

    for (let i = 0; i < explanationCount; i++) {
      slides.push({ number: slides.length + 1, title: `Kernbegrippen & Uitleg (Deel ${i + 1})`, content: ["Uitleg van theorie", "Definities en kernwoorden", "Visuele ondersteuning"] });
    }

    if (practiceCount > 0) {
      slides.push({ number: slides.length + 1, title: "Voorbeeld & Toepassing", content: ["Casus of voorbeeldsom", "Gezamenlijk uitwerken", "Checkvragen voor begrip"] });
      for (let i = 1; i < practiceCount; i++) {
        slides.push({ number: slides.length + 1, title: "Oefenopdracht", content: ["Zelfstandig of in duo's werken", "Korte opdracht", "Bespreking"] });
      }
    }

    slides.push({ number: slides.length + 1, title: "Samenvatting & Afsluiting", content: ["3 belangrijkste kernpunten", "Ruimte voor vragen", "Vervolgstappen / huiswerk"] });

    while (slides.length < totalSlides) {
      const lastSlide = slides.pop();
      slides.push({ number: slides.length + 1, title: "Extra Verdieping / Oefening", content: ["Verdiepingsvraag", "Extra casus"] });
      lastSlide.number = slides.length + 1;
      slides.push(lastSlide);
    }

    const outlineProposal = {
      header: `Presentatie – ${formData.subject}: ${formData.topic}`,
      meta: `${formData.level} | ${formData.duration} min | ${formData.goal}`,
      slides: slides
    };

    // 2. LOGICA: AI Prompt genereren
    const extraInputText = formData.extraInput.trim() ? formData.extraInput : "(Geen extra input, kies zelf passende kernbegrippen op dit niveau.)";
    const promptText = `Je bent een ervaren docent en presentatie-ontwerper. Ik wil dat je een uitgewerkte presentatie maakt voor leerlingen. Vak: ${formData.subject} Niveau / leerjaar: ${formData.level} Onderwerp / thema: ${formData.topic} Doel van de presentatie: ${formData.goal} Doelgroep: ${formData.targetGroup} Tijdsduur: ${formData.duration} minuten Gewenst aantal dia’s: ${formData.slideCount} Stijl: ${formData.style} Ontwerp een dia-indeling met ongeveer ${formData.slideCount} dia’s, met voor elke dia: - een pakkende titel, - kernpunten (bullet points) die de inhoud dekken, - eventueel een vraag, voorbeeld of spreker-notitie. Richt je vooral op duidelijke uitleg voor leerlingen op het genoemde niveau (${formData.level}). Als extra input heb ik deze kernpunten / begrippen / paragrafen: ${extraInputText} Maak de output als een lijst per dia, bijvoorbeeld: Dia 1: [Titel] ... Dia 2: [Titel] ... enzovoort.`;

    setResult({ outline: outlineProposal, prompt: promptText });
  };

  const copyToClipboard = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Presentatiegenerator (Beta)" subtitle="Maak razendsnel een dia-indeling en AI-prompt voor je lespresentatie." color="from-blue-600 to-indigo-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input Form (5 cols) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit" >
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMonitor} className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Presentatie Details</h2>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Level 2</span>
            </div>
            <form onSubmit={generatePresentation} className="space-y-4">
              {/* Vak & Niveau */}
              <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiBook} /></span> <input type="text" name="subject" placeholder="Bijv. Geschiedenis" required value={formData.subject} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label> <input type="text" name="level" placeholder="Bijv. HAVO 4" required value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp / Thema</label> <input type="text" name="topic" placeholder="Bijv. De Industriële Revolutie" required value={formData.topic} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /> </div> <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Doel</label> <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"> <option>Uitleg nieuwe stof</option> <option>Herhaling / samenvatting</option> <option>Toetsvoorbereiding</option> <option>Projectpitch</option> </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Doelgroep</label> <select name="targetGroup" value={formData.targetGroup} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"> <option>Hele klas</option> <option>Kleine groep</option> <option>Individueel</option> <option>Ouderavond / Collega's</option> </select> </div> </div> <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Duur (min)</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiClock} /></span> <input type="number" name="duration" min="5" max="120" value={formData.duration} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Aantal dia's</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiLayers} /></span> <input type="number" name="slideCount" min="3" max="50" value={formData.slideCount} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /> </div> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Gewenste Stijl</label> <select name="style" value={formData.style} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"> <option>Overzichtelijk & eenvoudig</option> <option>Visueel / veel voorbeelden</option> <option>Meer tekst & uitleg</option> <option>Interactief / met vragen</option> </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Extra input (optioneel)</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiEdit3} /></span> <textarea name="extraInput" rows="3" placeholder="Belangrijke begrippen, paragraafnummers of kernpunten..." value={formData.extraInput} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" ></textarea> </div> </div> <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2 mt-4" > <SafeIcon icon={FiMonitor} /> <span>Genereer Indeling & Prompt</span> </button>
            </form>
          </motion.div>
          {/* RIGHT COLUMN: Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6"> {!result ? ( <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]"> <SafeIcon icon={FiMonitor} className="text-5xl mb-4 opacity-30" /> <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen presentatie gegenereerd</h3> <p>Vul links het formulier in om een opzet te maken.</p> </div> ) : ( <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6" > {/* Result Block 1: Outline */} <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"> <div className="bg-blue-50 p-4 border-b border-blue-100"> <h3 className="font-bold text-blue-900 flex items-center gap-2 text-lg"> <SafeIcon icon={FiList} /> {result.outline.header} </h3> <p className="text-sm text-blue-700 mt-1 ml-7">{result.outline.meta}</p> </div> <div className="p-6"> <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Voorstel Dia-indeling</h4> <div className="space-y-4"> {result.outline.slides.map((slide, idx) => ( <div key={idx} className="flex gap-3"> <div className="flex-shrink-0 w-16 text-right"> <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded"> Dia {slide.number} </span> </div> <div> <h5 className="font-bold text-gray-900 text-sm">{slide.title}</h5> <ul className="list-disc list-inside text-sm text-gray-600 mt-1"> {slide.content.map((item, i) => ( <li key={i}>{item}</li> ))} </ul> </div> </div> ))} </div> </div> </div> {/* Result Block 2: Prompt */} <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white"> <div className="flex items-center justify-between mb-4"> <h3 className="font-bold flex items-center gap-2"> <SafeIcon icon={FiCpu} className="text-blue-400" /> AI-Prompt </h3> <button onClick={copyToClipboard} className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`} > <SafeIcon icon={copied ? FiCheck : FiCopy} /> {copied ? 'Gekopieerd!' : 'Kopiëren'} </button> </div> <p className="text-gray-400 text-sm mb-3"> Kopieer deze prompt naar ChatGPT of Gemini om de volledige presentatie-inhoud te genereren. </p> <textarea readOnly value={result.prompt} className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" /> </div> </motion.div> )} </div>
        </div>
      </div>
    </div>
  );
};

export default PresentatieGenerator;