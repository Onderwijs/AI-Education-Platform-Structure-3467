import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGrid, FiCopy, FiCheck, FiLayers, FiType, FiFileText, FiList, FiActivity, FiEdit3 } = FiIcons;

const RubricMaker = () => {
  const [formData, setFormData] = useState({ title: '', subject: '', level: '', criteriaCount: '4', description: '' });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate content (Client-side logic)
  const generateRubric = (e) => {
    e.preventDefault();
    // Generic criteria based on count to simulate a result
    const genericCriteria = [
      "Inhoud & Kwaliteit",
      "Structuur & Opbouw",
      "Taalgebruik & Verzorging",
      "Proces & Aanpak",
      "Creativiteit & Originaliteit"
    ];
    const count = parseInt(formData.criteriaCount) || 4;
    const activeCriteria = genericCriteria.slice(0, count);

    // Create rubric object structure
    const rubricContent = {
      title: formData.title,
      meta: `${formData.subject} | ${formData.level}`,
      description: formData.description,
      headers: ["Onvoldoende (1-5)", "Voldoende (6-7)", "Goed (8)", "Uitstekend (9-10)"],
      rows: activeCriteria.map(criterion => ({
        name: criterion,
        cells: [
          `De ${criterion.toLowerCase()} voldoet niet aan de basiseisen. Er ontbreken essentiële onderdelen.`,
          `De ${criterion.toLowerCase()} voldoet grotendeels aan de eisen, maar kan op punten verbeterd worden.`,
          `De ${criterion.toLowerCase()} is goed uitgewerkt en voldoet aan alle gestelde eisen.`,
          `De ${criterion.toLowerCase()} is excellent uitgewerkt en toont diepgaand inzicht boven verwachting.`
        ]
      }))
    };

    // Create AI Prompt string
    const promptText = `Je bent een ervaren docent. Ontwerp een beoordelingsrubriek voor de volgende opdracht. Titel van de opdracht: ${formData.title} Vak / context: ${formData.subject} Niveau / klas: ${formData.level} Beschrijving van de opdracht: ${formData.description} Maak een rubriek met ${formData.criteriaCount} criteria. Voor elk criterium: - Geef een naam - Voeg een korte beschrijving toe - Beschrijf 4 prestatieniveaus (Onvoldoende, Voldoende, Goed, Uitstekend) - Maak de beschrijvingen concreet en observeerbaar. Lever de rubriek aan in een duidelijk gestructureerde tabel.`;

    setResult({ rubric: rubricContent, prompt: promptText });
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
      <SimpleHero title="Rubriekmaker (Beta)" subtitle="Ontwerp razendsnel beoordelingsrubrieken voor elke opdracht." color="from-pink-600 to-rose-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input Form (4 cols) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit" >
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGrid} className="text-2xl text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Opdracht Details</h2>
              </div>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Level 2–3</span>
            </div>
            <form onSubmit={generateRubric} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel van de opdracht</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiType} /></span>
                  <input type="text" name="title" required placeholder="Bijv. Essay Gouden Eeuw" value={formData.title} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiEdit3} /></span>
                    <input type="text" name="subject" required placeholder="Geschiedenis" value={formData.subject} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiLayers} /></span>
                    <input type="text" name="level" required placeholder="HAVO 4" value={formData.level} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aantal criteria</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiList} /></span>
                  <select name="criteriaCount" value={formData.criteriaCount} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white" > <option value="3">3 Criteria</option> <option value="4">4 Criteria</option> <option value="5">5 Criteria</option> </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Korte beschrijving</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiFileText} /></span>
                  <textarea name="description" required rows="4" placeholder="Wat moeten de leerlingen doen? Wat zijn de belangrijkste eisen?" value={formData.description} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" ></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-md flex items-center justify-center space-x-2" >
                <SafeIcon icon={FiGrid} /> <span>Genereer Rubriek</span>
              </button>
            </form>
          </motion.div>
          {/* RIGHT COLUMN: Results (8 cols) */}
          <div className="lg:col-span-8 space-y-6"> {!result ? ( <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]"> <SafeIcon icon={FiActivity} className="text-5xl mb-4 opacity-30" /> <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen rubriek gegenereerd</h3> <p>Vul het formulier in om een basisrubriek en AI-prompt te maken.</p> </div> ) : ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6" > {/* Generated Rubric View */} <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"> <div className="bg-pink-50 p-6 border-b border-pink-100"> <h3 className="font-bold text-gray-900 text-xl mb-1">Beoordelingsrubriek: {result.rubric.title}</h3> <div className="flex flex-wrap gap-2 text-sm text-pink-700 font-medium mb-3"> <span className="bg-pink-100 px-2 py-1 rounded">{result.rubric.meta}</span> </div> <p className="text-gray-600 text-sm italic">"{result.rubric.description}"</p> </div> <div className="overflow-x-auto"> <table className="min-w-full divide-y divide-gray-200"> <thead className="bg-gray-50"> <tr> <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/5"> Criterium </th> {result.rubric.headers.map((header, i) => ( <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/5"> {header} </th> ))} </tr> </thead> <tbody className="bg-white divide-y divide-gray-200"> {result.rubric.rows.map((row, rowIndex) => ( <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}> <td className="px-6 py-4 text-sm font-bold text-gray-900 align-top"> {row.name} </td> {row.cells.map((cell, cellIndex) => ( <td key={cellIndex} className="px-6 py-4 text-sm text-gray-600 align-top"> {cell} </td> ))} </tr> ))} </tbody> </table> </div> <div className="p-4 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-100"> * Dit is een conceptrubriek. Pas de criteria aan op basis van jouw specifieke leerdoelen. </div> </div> {/* Copy Prompt Section */} <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white"> <div className="flex items-center justify-between mb-4"> <h3 className="font-bold flex items-center gap-2"> <SafeIcon icon={FiActivity} className="text-pink-400" /> AI-Prompt voor Verfijning </h3> <button onClick={copyToClipboard} className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`} > <SafeIcon icon={copied ? FiCheck : FiCopy} /> {copied ? 'Gekopieerd!' : 'Kopiëren'} </button> </div> <p className="text-gray-400 text-sm mb-3"> Wil je een meer gedetailleerde rubriek? Kopieer deze prompt naar ChatGPT of Gemini. </p> <textarea readOnly value={result.prompt} className="w-full h-48 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" /> </div> </motion.div> )} </div>
        </div>
      </div>
    </div>
  );
};

export default RubricMaker;