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
    level: 'Basisschool (bovenbouw)',
    skill: 'Spreken',
    theme: '',
    duration: '20'
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateActivity = (e) => {
    e.preventDefault();
    const activityProposal = {
      title: `Taalactiviteit – ${formData.language} (${formData.level})`,
      goal: `Leerlingen oefenen ${formData.skill} rond het thema '${formData.theme}'.`,
      steps: ["Introductie", "Kern", "Afsluiting"]
    };

    const promptText = `Je bent een ervaren taalcoach. Ontwerp een taalactiviteit voor ${formData.targetGroup}. Taal: ${formData.language}. Niveau: ${formData.level}. Vaardigheid: ${formData.skill}. Thema: ${formData.theme}. Tijdsduur: ${formData.duration} minuten.`;
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
      <SimpleHero 
        title="Taalcoach (Beta)" 
        subtitle="Stel snel een taalactiviteit samen en genereer direct lesmateriaal met AI."
        color="from-cyan-600 to-blue-600"
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
                <SafeIcon icon={FiMessageSquare} className="text-2xl text-cyan-600" />
                <h2 className="text-xl font-bold text-gray-900">Configuratie</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 2–3<br />
                Ondersteunt taalactiviteiten en differentiatie in de les.
              </p>
            </div>

            <form onSubmit={generateActivity} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taal</label>
                  <input type="text" name="language" required value={formData.language} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duur (min)</label>
                  <input type="number" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thema</label>
                <input type="text" name="theme" required placeholder="Bijv. Vakantie" value={formData.theme} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <SafeIcon icon={FiEdit3} />
                <span>Genereer Taalactiviteit</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiMessageSquare} className="text-5xl mb-4 opacity-30" />
                <p>Vul links het formulier in om een voorstel te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-cyan-50 p-4 border-b border-cyan-100">
                    <h3 className="font-bold text-cyan-900 flex items-center gap-2 text-lg">
                      <SafeIcon icon={FiList} />
                      {result.proposal.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 font-medium italic">{result.proposal.goal}</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-cyan-400" />
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

export default Taalcoach;