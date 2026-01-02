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
    slideCount: '8'
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePresentation = (e) => {
    e.preventDefault();
    const slides = [
      { number: 1, title: "Titel & Introductie" },
      { number: 2, title: "Activeren voorkennis" },
      { number: 3, title: "Kern / Uitleg" },
      { number: 4, title: "Samenvatting" }
    ];

    const outlineProposal = {
      header: `Presentatie – ${formData.subject}`,
      meta: `${formData.level} | ${formData.goal}`,
      slides: slides
    };

    const promptText = `Je bent een ervaren docent. Ontwerp een dia-indeling voor een presentatie over ${formData.topic}. Vak: ${formData.subject}. Niveau: ${formData.level}. Aantal dia's: ${formData.slideCount}.`;
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
      <SimpleHero 
        title="Presentatiegenerator (Beta)" 
        subtitle="Maak razendsnel een dia-indeling en AI-prompt voor je lespresentatie."
        color="from-blue-600 to-indigo-600"
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
                <SafeIcon icon={FiMonitor} className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Presentatie Details</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 2<br />
                Ondersteunt efficiënte lesvoorbereiding en structuur.
              </p>
            </div>

            <form onSubmit={generatePresentation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <input type="text" name="level" required value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Onderwerp</label>
                <input type="text" name="topic" required value={formData.topic} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <SafeIcon icon={FiMonitor} />
                <span>Genereer Indeling</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiMonitor} className="text-5xl mb-4 opacity-30" />
                <p>Vul links het formulier in om een opzet te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-blue-50 p-4 border-b border-blue-100">
                    <h3 className="font-bold text-blue-900 flex items-center gap-2 text-lg">
                      <SafeIcon icon={FiList} />
                      {result.outline.header}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {result.outline.slides.map((s, i) => (
                        <div key={i} className="text-sm text-gray-600">Dia {s.number}: {s.title}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-blue-400" />
                      AI-Prompt
                    </h3>
                    <button onClick={copyToClipboard} className="text-sm px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center gap-2">
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <textarea readOnly value={result.prompt} className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl resize-none" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentatieGenerator;