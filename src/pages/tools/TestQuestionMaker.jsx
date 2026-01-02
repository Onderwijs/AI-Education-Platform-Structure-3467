import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiCopy, FiCheck, FiSettings, FiList, FiFileText, FiCpu, FiType } = FiIcons;

const TestQuestionMaker = () => {
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    topic: '',
    goal: 'Oefentoets',
    count: 10,
    types: { multipleChoice: true, open: true, trueFalse: false, fillIn: false },
    difficulty: 'Begrijpen',
    sourceType: 'text', // 'text' or 'upload'
    sourceText: ''
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle text/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes for question types
  const handleTypeChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, types: { ...prev.types, [name]: checked } }));
  };

  // Generate content (Client-side logic)
  const generateQuiz = (e) => {
    e.preventDefault();
    // 1. Calculate Structure
    const activeTypes = Object.entries(formData.types)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    const typeLabels = {
      multipleChoice: "Meerkeuzevragen",
      open: "Open vragen",
      trueFalse: "Stellingen (Juist/Onjuist)",
      fillIn: "Invulvragen / Gatentekst"
    };

    if (activeTypes.length === 0) {
      alert("Selecteer ten minste één vraagtype.");
      return;
    }

    let structure = [];
    const totalQuestions = parseInt(formData.count) || 10;
    const baseCount = Math.floor(totalQuestions / activeTypes.length);
    let remainder = totalQuestions % activeTypes.length;

    activeTypes.forEach(type => {
      let count = baseCount;
      if (remainder > 0) {
        count++;
        remainder--;
      }
      structure.push({ type: typeLabels[type], count });
    });

    // 2. Generate Prompt
    let promptText = `Je bent een ervaren docent. Maak toetsvragen voor mijn leerlingen`;
    if (formData.sourceType === 'upload') {
      promptText += ` op basis van een document dat ik zo upload.`;
    } else {
      promptText += `.`;
    }

    promptText += `\n\nContext: - Vak: ${formData.subject} - Niveau / leerjaar: ${formData.level} - Onderwerp: ${formData.topic} - Doel van de toets: ${formData.goal} - Totaal aantal vragen: ${formData.count} Gewenste vraagtypes: ${activeTypes.map(t => `- ${typeLabels[t]}`).join('\n')} Focus de vragen vooral op het niveau: ${formData.difficulty}. Instructies: 1. Maak de vragen concreet en passend bij het niveau. 2. Lever eerst alleen de vragen, duidelijk genummerd. 3. Geef daarna in een apart blok de modelantwoorden (correctiemodel).`;

    if (formData.sourceType === 'upload') {
      promptText += `\n\nIk zal nu het bronbestand uploaden (PDF/Word). Lees dit eerst goed door en genereer daarna de vragen volgens bovenstaande specificaties. Wacht met antwoorden tot ik het bestand heb geüpload.`;
    } else {
      promptText += `\n\nGebruik de onderstaande tekst als bron voor de vragen:\n\n"""\n${formData.sourceText || '[HIER PLAK IK MIJN TEKST]'}\n"""`;
    }

    setResult({ structure, prompt: promptText });
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
      <SimpleHero title="Toetsvragenmaker (Beta)" subtitle="Genereer in seconden een toetsopzet en AI-prompt." color="from-green-600 to-teal-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input Form (5 cols) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit" >
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiSettings} className="text-2xl text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Toets Instellingen</h2>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Level 2–3</span>
            </div>
            <form onSubmit={generateQuiz} className="space-y-5">
              {/* Basis Info */}
              <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label> <input type="text" name="subject" required placeholder="Bijv. Aardrijkskunde" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label> <input type="text" name="level" required placeholder="Bijv. VMBO-T 3" value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp / Thema</label> <input type="text" name="topic" required placeholder="Bijv. Klimaatverandering" value={formData.topic} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /> </div> <div className="grid grid-cols-2 gap-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Doel</label> <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" > <option value="Oefentoets">Oefentoets</option> <option value="Formatief">Formatief</option> <option value="Summatief">Summatief</option> <option value="Diagnostisch">Diagnostisch</option> </select> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Aantal vragen</label> <input type="number" name="count" required min="1" max="50" value={formData.count} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /> </div> </div>
              {/* Vraagtypes */}
              <div> <label className="block text-sm font-medium text-gray-700 mb-2">Vraagtypes</label> <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200"> <label className="flex items-center space-x-2 cursor-pointer"> <input type="checkbox" name="multipleChoice" checked={formData.types.multipleChoice} onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" /> <span className="text-sm text-gray-700">Meerkeuze</span> </label> <label className="flex items-center space-x-2 cursor-pointer"> <input type="checkbox" name="open" checked={formData.types.open} onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" /> <span className="text-sm text-gray-700">Open vragen</span> </label> <label className="flex items-center space-x-2 cursor-pointer"> <input type="checkbox" name="trueFalse" checked={formData.types.trueFalse} onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" /> <span className="text-sm text-gray-700">Stellingen (Juist/Onjuist)</span> </label> <label className="flex items-center space-x-2 cursor-pointer"> <input type="checkbox" name="fillIn" checked={formData.types.fillIn} onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" /> <span className="text-sm text-gray-700">Invulvragen / Gatentekst</span> </label> </div> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-1">Moeilijkheid (Taxonomie)</label> <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" > <option value="Onthouden">Vooral onthouden (Kennis)</option> <option value="Begrijpen">Begrijpen (Inzicht)</option> <option value="Toepassen">Toepassen</option> <option value="Analyseren">Analyseren & Evalueren</option> </select> </div>
              {/* Bron Keuze */}
              <div> <label className="block text-sm font-medium text-gray-700 mb-2">Bronmateriaal</label> <div className="flex space-x-4 mb-3"> <label className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${formData.sourceType === 'text' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}> <input type="radio" name="sourceType" value="text" checked={formData.sourceType === 'text'} onChange={handleChange} className="hidden" /> <SafeIcon icon={FiType} /> <span className="text-sm font-medium">Eigen tekst</span> </label> <label className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${formData.sourceType === 'upload' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}> <input type="radio" name="sourceType" value="upload" checked={formData.sourceType === 'upload'} onChange={handleChange} className="hidden" /> <SafeIcon icon={FiFileText} /> <span className="text-sm font-medium">PDF / Bestand</span> </label> </div> {formData.sourceType === 'text' && ( <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}> <textarea name="sourceText" rows="4" placeholder="Plak hier de tekst waarover de vragen moeten gaan..." value={formData.sourceText} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" ></textarea> </motion.div> )} {formData.sourceType === 'upload' && ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-gray-500 bg-blue-50 p-3 rounded border border-blue-100"> ℹ️ Je uploadt het bestand straks zelf direct in ChatGPT of Gemini. Wij sturen geen bestanden door. </motion.div> )} </div> <button type="submit" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center space-x-2" > <SafeIcon icon={FiEdit3} /> <span>Genereer Toetsopzet & Prompt</span> </button>
            </form>
          </motion.div>
          {/* RIGHT COLUMN: Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6"> {!result ? ( <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]"> <SafeIcon icon={FiCpu} className="text-5xl mb-4 opacity-30" /> <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen toets gegenereerd</h3> <p>Vul het formulier in om een structuur en AI-prompt te maken.</p> </div> ) : ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" > {/* Result Block 1: Structure */} <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"> <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center"> <h3 className="font-bold text-green-900 flex items-center gap-2"> <SafeIcon icon={FiList} /> Voorstel Toetsstructuur </h3> </div> <div className="p-6"> <div className="mb-4 text-sm text-gray-600"> <p><strong>Titel:</strong> Toets {formData.subject} – {formData.topic}</p> <p><strong>Focus:</strong> {formData.difficulty}</p> </div> <div className="space-y-2"> {result.structure.map((item, index) => ( <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"> <span className="font-medium text-gray-800">{item.type}</span> <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm"> {item.count} vragen </span> </div> ))} </div> <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 italic"> Dit is een adviesverdeling. De AI kan hier licht van afwijken afhankelijk van de inhoud. </div> </div> </div> {/* Result Block 2: Prompt */} <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white"> <div className="flex items-center justify-between mb-4"> <h3 className="font-bold flex items-center gap-2"> <SafeIcon icon={FiCpu} className="text-purple-400" /> AI-Prompt </h3> <button onClick={copyToClipboard} className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`} > <SafeIcon icon={copied ? FiCheck : FiCopy} /> {copied ? 'Gekopieerd!' : 'Kopiëren'} </button> </div> <p className="text-gray-400 text-sm mb-3"> {formData.sourceType === 'upload' ? "Kopieer deze prompt naar ChatGPT/Gemini en upload daarna direct je bestand." : "Kopieer deze prompt (inclusief je tekst) naar ChatGPT/Gemini."} </p> <textarea readOnly value={result.prompt} className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" /> </div> </motion.div> )} </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionMaker;