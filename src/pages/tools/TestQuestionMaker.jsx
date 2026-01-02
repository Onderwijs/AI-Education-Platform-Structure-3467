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
    sourceType: 'text',
    sourceText: ''
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, types: { ...prev.types, [name]: checked } }));
  };

  const generateQuiz = (e) => {
    e.preventDefault();
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
      if (remainder > 0) { count++; remainder--; }
      structure.push({ type: typeLabels[type], count });
    });

    let promptText = `Je bent een ervaren docent. Maak toetsvragen voor mijn leerlingen`;
    if (formData.sourceType === 'upload') {
      promptText += ` op basis van een document dat ik zo upload.`;
    } else {
      promptText += `.`;
    }
    
    promptText += `\n\nContext:\n- Vak: ${formData.subject}\n- Niveau / leerjaar: ${formData.level}\n- Onderwerp: ${formData.topic}\n- Doel van de toets: ${formData.goal}\n- Totaal aantal vragen: ${formData.count}\nGewenste vraagtypes: ${activeTypes.map(t => `- ${typeLabels[t]}`).join('\n')}\nFocus de vragen vooral op het niveau: ${formData.difficulty}.`;

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
      <SimpleHero 
        title="Toetsvragenmaker (Beta)" 
        subtitle="Genereer in seconden een toetsopzet en AI-prompt."
        color="from-green-600 to-teal-500"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2 mb-1">
                <SafeIcon icon={FiSettings} className="text-2xl text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Toets Instellingen</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 2–3<br />
                Ondersteunt het ontwerpen van toetsen passend bij leerdoelen.
              </p>
            </div>

            <form onSubmit={generateQuiz} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label>
                  <input 
                    type="text" name="subject" required placeholder="Bijv. Aardrijkskunde"
                    value={formData.subject} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <input 
                    type="text" name="level" required placeholder="Bijv. VMBO-T 3"
                    value={formData.level} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp / Thema</label>
                <input 
                  type="text" name="topic" required placeholder="Bijv. Klimaatverandering"
                  value={formData.topic} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doel</label>
                  <select 
                    name="goal" value={formData.goal} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="Oefentoets">Oefentoets</option>
                    <option value="Formatief">Formatief</option>
                    <option value="Summatief">Summatief</option>
                    <option value="Diagnostisch">Diagnostisch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aantal vragen</label>
                  <input 
                    type="number" name="count" required min="1" max="50"
                    value={formData.count} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vraagtypes</label>
                <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" name="multipleChoice" checked={formData.types.multipleChoice} 
                      onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" 
                    />
                    <span className="text-sm text-gray-700">Meerkeuze</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" name="open" checked={formData.types.open} 
                      onChange={handleTypeChange} className="rounded text-green-600 focus:ring-green-500" 
                    />
                    <span className="text-sm text-gray-700">Open vragen</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiEdit3} />
                <span>Genereer Toetsopzet & Prompt</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiCpu} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen toets gegenereerd</h3>
                <p>Vul het formulier in om een structuur en AI-prompt te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-green-50 p-4 border-b border-green-100">
                    <h3 className="font-bold text-green-900 flex items-center gap-2">
                      <SafeIcon icon={FiList} />
                      Voorstel Toetsstructuur
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {result.structure.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <span className="font-medium text-gray-800">{item.type}</span>
                          <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
                            {item.count} vragen
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-purple-400" />
                      AI-Prompt
                    </h3>
                    <button 
                      onClick={copyToClipboard}
                      className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                    >
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <textarea 
                    readOnly 
                    value={result.prompt}
                    className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionMaker;