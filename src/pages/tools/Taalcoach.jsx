import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiGlobe, FiUser, FiClock, FiLayers, FiEdit3, FiCopy, FiCheck, FiCpu, FiList } = FiIcons;

const Taalcoach = () => {
  const [formData, setFormData] = useState({
    targetGroup: 'Leerling (individueel)',
    language: 'Nederlands',
    customLanguage: '',
    level: 'Basisschool (bovenbouw)',
    skill: 'Spreken',
    theme: '',
    profile: 'Algemeen',
    duration: '20',
    activityType: 'Korte oefening',
    sourceType: 'ai', // 'ai' or 'user'
    sourceText: ''
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateActivity = (e) => {
    e.preventDefault();
    const lang = formData.language === 'Anders (specificeer)' ? formData.customLanguage : formData.language;

    // 1. Genereer Activiteit Voorstel (Logica)
    let steps = [];
    // Basis stappen op basis van vaardigheid
    if (formData.skill === 'Woordenschat') {
      steps = [
        `Introductie (5 min): Activeer voorkennis over '${formData.theme}'.`,
        `Kern (10 min): Aanbieden nieuwe woorden via contextzinnen of matching-oefening.`,
        `Verwerking (${parseInt(formData.duration) - 20} min): Spellement (bijv. verboden woord, memory) of gatentekst.`,
        `Afsluiting (5 min): Korte quiz of 'exit ticket' met 3 nieuwe woorden.`
      ];
    } else if (formData.skill === 'Lezen') {
      steps = [
        `Pre-reading (5 min): Voorspel de inhoud op basis van de titel/plaatjes rond '${formData.theme}'.`,
        `Reading (${parseInt(formData.duration) - 15} min): Tekst lezen met gerichte zoekvragen (scannen/skimmen).`,
        `Post-reading (10 min): Inhoudelijke vragen beantwoorden of samenvatten.`,
      ];
    } else if (formData.skill === 'Spreken') {
      steps = [
        `Warming-up (5 min): Korte stelling of beeldspraak over '${formData.theme}'.`,
        `Instructie (5 min): Uitleg van de spreektak/rollenspel en succescriteria.`,
        `Uitvoering (${parseInt(formData.duration) - 15} min): Gesprek voeren in duo's of presentatie.`,
        `Feedback (5 min): Peer-feedback en nabespreking.`
      ];
    } else {
      // Default / Overig
      steps = [
        `Start (5 min): Introductie van het onderwerp '${formData.theme}'.`,
        `Kern (${parseInt(formData.duration) - 10} min): Gerichte oefening gericht op ${formData.skill.toLowerCase()}.`,
        `Evaluatie (5 min): Terugblik op het leerdoel.`
      ];
    }

    // Differentiatie tips
    let differentiation = [];
    if (formData.profile.includes('NT2')) {
      differentiation.push("Gebruik veel visuele ondersteuning (afbeeldingen, pictogrammen).");
      differentiation.push("Sta toe dat leerlingen zoekmachines/vertaalapps gebruiken voor kernwoorden.");
    } else if (formData.profile.includes('Taalzwak')) {
      differentiation.push("Bied structuur aan via stappenplannen.");
      differentiation.push("Vergroot de tekst of bied voorleesmogelijkheid aan.");
    } else if (formData.profile.includes('Hoogbegaafd')) {
      differentiation.push("Voeg een creatieve component toe (bijv. 'ontwerp een...').");
      differentiation.push("Laat ze de regels/woorden toepassen in een complexere, nieuwe context.");
    } else {
      differentiation.push("Zorg voor extra oefenmateriaal voor snelle leerlingen.");
    }

    const activityProposal = {
      title: `Taalactiviteit – ${lang} (${formData.level})`,
      goal: `Leerlingen oefenen ${formData.skill} rond het thema '${formData.theme}' op niveau ${formData.level}.`,
      steps: steps,
      differentiation: differentiation,
      materials: ["Bord / Digibord", "Werkbladen of schrift", "Eventueel woordenboek / device"]
    };

    // 2. Genereer AI Prompt
    let promptText = `Je bent een ervaren taalcoach en docent ${lang}.\n\n`;
    if (formData.sourceType === 'user') {
      promptText += `Ik wil dat je een taalactiviteit ontwerpt op basis van een tekst of woordenlijst die ik hieronder meegeef.`;
    } else {
      promptText += `Ik wil dat je een taalactiviteit ontwerpt voor mijn leerlingen.`;
    }

    promptText += `\n\nSpecificaties: - Taal: ${lang} - Niveau: ${formData.level} - Doelgroep: ${formData.targetGroup} - Leerlingprofiel: ${formData.profile} - Vaardigheid: ${formData.skill} - Thema / Context: ${formData.theme} - Tijdsduur: ${formData.duration} minuten - Type activiteit: ${formData.activityType} Ontwerp een activiteit die: - past bij het niveau en profiel van de leerling(en); - duidelijk legt uit wat de leerling moet doen; - concrete instructies geeft voor de docent; - een logische opbouw heeft (introductie, kern, afsluiting); - specifiek gericht is op het oefenen van ${formData.skill}.`;

    if (formData.sourceType === 'user') {
      promptText += `\n\nGebruik de onderstaande tekst/woordenlijst als basis voor de oefening:\n\n"""\n${formData.sourceText || '[PLAK HIER JE TEKST]'}\n"""`;
    } else {
      promptText += `\n\nKies ZELF een passende tekst, dialoog of set woorden die perfect aansluit bij niveau ${formData.level} en het thema '${formData.theme}'.`;
    }

    setResult({ proposal: activityProposal, prompt: promptText });
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
      <SimpleHero title="Taalcoach (Beta)" subtitle="Stel snel een taalactiviteit samen en genereer direct lesmateriaal met AI." color="from-cyan-600 to-blue-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input Form (5 cols) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit" >
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMessageSquare} className="text-2xl text-cyan-600" />
                <h2 className="text-xl font-bold text-gray-900">Configuratie</h2>
              </div>
              <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Level 2–3</span>
            </div>
            <form onSubmit={generateActivity} className="space-y-4">
              {/* Doelgroep & Niveau */}
              <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Doelgroep</label> <select name="targetGroup" value={formData.targetGroup} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"> <option>Leerling (individueel)</option> <option>Groep / klas</option> </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label> <select name="level" value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white" > <option value="Basisschool (bovenbouw)">Basisschool (bovenbouw)</option> <option value="VMBO basis">VMBO basis</option> <option value="VMBO kader">VMBO kader</option> <option value="VMBO gemengd">VMBO gemengd</option> <option value="VMBO theoretisch">VMBO theoretisch</option> <option value="HAVO">HAVO</option> <option value="VWO">VWO</option> <option value="Gymnasium">Gymnasium</option> <option value="MBO niveau 2">MBO niveau 2</option> <option value="MBO niveau 3">MBO niveau 3</option> <option value="MBO niveau 4">MBO niveau 4</option> <option value="HBO">HBO</option> <option value="Universiteit">Universiteit</option> </select> </div> </div>
              {/* Taal */}
              <div> <label className="block text-sm font-medium text-gray-700 mb-1">Taal</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiGlobe} /></span> <select name="language" value={formData.language} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"> <option>Nederlands</option> <option>Engels</option> <option>Duits</option> <option>Frans</option> <option>Spaans</option> <option>Anders (specificeer)</option> </select> </div> {formData.language === 'Anders (specificeer)' && ( <input type="text" name="customLanguage" placeholder="Welke taal?" value={formData.customLanguage} onChange={handleChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" /> )} </div>
              {/* Vaardigheid & Tijd */}
              <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Vaardigheid</label> <select name="skill" value={formData.skill} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"> <option>Spreken</option> <option>Luisteren</option> <option>Lezen</option> <option>Schrijven</option> <option>Woordenschat</option> <option>Grammatica</option> </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Duur (min)</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiClock} /></span> <input type="number" name="duration" min="5" max="120" required value={formData.duration} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" /> </div> </div> </div>
              {/* Thema */}
              <div> <label className="block text-sm font-medium text-gray-700 mb-1">Thema / Context</label> <input type="text" name="theme" placeholder="Bijv. Vakantie, Solliciteren" required value={formData.theme} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" /> </div>
              {/* Profiel & Type */}
              <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Leerlingprofiel</label> <div className="relative"> <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiUser} /></span> <select name="profile" value={formData.profile} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"> <option>Algemeen</option> <option>NT2 / Anderstalig</option> <option>Taalzwak / Dyslexie</option> <option>Hoogbegaafd</option> </select> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Activiteit</label> <select name="activityType" value={formData.activityType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"> <option>Korte oefening</option> <option>Volledige lesactiviteit</option> <option>Huiswerkopdracht</option> </select> </div> </div>
              {/* Bron Keuze */}
              <div className="pt-2"> <label className="block text-sm font-medium text-gray-700 mb-2">Inhoud / Bron</label> <div className="space-y-2"> <label className="flex items-center space-x-2 cursor-pointer"> <input type="radio" name="sourceType" value="ai" checked={formData.sourceType === 'ai'} onChange={handleChange} className="text-cyan-600 focus:ring-cyan-500" /> <span className="text-sm text-gray-700">AI bedenkt passende tekst/woorden</span> </label> <label className="flex items-center space-x-2 cursor-pointer"> <input type="radio" name="sourceType" value="user" checked={formData.sourceType === 'user'} onChange={handleChange} className="text-cyan-600 focus:ring-cyan-500" /> <span className="text-sm text-gray-700">Ik plak zelf een tekst of woordenlijst</span> </label> </div> {formData.sourceType === 'user' && ( <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2"> <textarea name="sourceText" rows="3" placeholder="Plak hier je tekst of woordenlijst..." value={formData.sourceText} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm" ></textarea> </motion.div> )} </div> <button type="submit" className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-md flex items-center justify-center space-x-2 mt-4" > <SafeIcon icon={FiEdit3} /> <span>Genereer Taalactiviteit & Prompt</span> </button>
            </form>
          </motion.div>
          {/* RIGHT COLUMN: Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6"> {!result ? ( <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]"> <SafeIcon icon={FiMessageSquare} className="text-5xl mb-4 opacity-30" /> <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen activiteit gegenereerd</h3> <p>Vul links het formulier in om een voorstel te maken.</p> </div> ) : ( <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6" > {/* Result Block 1: Proposal */} <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"> <div className="bg-cyan-50 p-4 border-b border-cyan-100"> <h3 className="font-bold text-cyan-900 flex items-center gap-2 text-lg"> <SafeIcon icon={FiList} /> {result.proposal.title} </h3> </div> <div className="p-6"> <p className="text-gray-700 font-medium mb-4 italic"> {result.proposal.goal} </p> <div className="mb-4"> <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Activiteit Opbouw</h4> <ul className="space-y-2"> {result.proposal.steps.map((step, idx) => ( <li key={idx} className="flex items-start gap-2 text-sm text-gray-700"> <span className="bg-cyan-100 text-cyan-800 font-bold w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{idx + 1}</span> <span>{step}</span> </li> ))} </ul> </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100"> <div> <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Differentiatie ({formData.profile})</h4> <ul className="list-disc list-inside text-sm text-gray-600 space-y-1"> {result.proposal.differentiation.map((tip, idx) => ( <li key={idx}>{tip}</li> ))} </ul> </div> <div> <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Benodigdheden</h4> <ul className="list-disc list-inside text-sm text-gray-600 space-y-1"> {result.proposal.materials.map((mat, idx) => ( <li key={idx}>{mat}</li> ))} </ul> </div> </div> </div> </div> {/* Result Block 2: Prompt */} <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white"> <div className="flex items-center justify-between mb-4"> <h3 className="font-bold flex items-center gap-2"> <SafeIcon icon={FiCpu} className="text-cyan-400" /> AI-Prompt </h3> <button onClick={copyToClipboard} className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`} > <SafeIcon icon={copied ? FiCheck : FiCopy} /> {copied ? 'Gekopieerd!' : 'Kopiëren'} </button> </div> <p className="text-gray-400 text-sm mb-3"> Kopieer deze prompt naar ChatGPT of Gemini om de volledige les/materialen te genereren. </p> <textarea readOnly value={result.prompt} className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" /> </div> </motion.div> )} </div>
        </div>
      </div>
    </div>
  );
};

export default Taalcoach;