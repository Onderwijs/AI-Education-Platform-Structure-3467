import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGrid, FiCopy, FiCheck, FiLayers, FiType, FiFileText, FiList, FiActivity, FiEdit3 } = FiIcons;

const RubricMaker = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    level: '',
    criteriaCount: '4',
    description: ''
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRubric = (e) => {
    e.preventDefault();
    const genericCriteria = [ "Inhoud & Kwaliteit", "Structuur & Opbouw", "Taalgebruik & Verzorging", "Proces & Aanpak" ];
    const count = parseInt(formData.criteriaCount) || 4;
    const activeCriteria = genericCriteria.slice(0, count);

    const rubricContent = {
      title: formData.title,
      meta: `${formData.subject} | ${formData.level}`,
      headers: ["Onvoldoende", "Voldoende", "Goed", "Uitstekend"],
      rows: activeCriteria.map(criterion => ({
        name: criterion,
        cells: [
          `De ${criterion.toLowerCase()} voldoet niet aan de eisen.`,
          `De ${criterion.toLowerCase()} voldoet grotendeels aan de eisen.`,
          `De ${criterion.toLowerCase()} is goed uitgewerkt.`,
          `De ${criterion.toLowerCase()} is excellent uitgewerkt.`
        ]
      }))
    };

    const promptText = `Je bent een ervaren docent. Ontwerp een beoordelingsrubriek voor de volgende opdracht. Titel: ${formData.title} Vak: ${formData.subject} Niveau: ${formData.level} Beschrijving: ${formData.description}. Maak een rubriek met ${formData.criteriaCount} criteria en 4 niveaus.`;
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
      <SimpleHero 
        title="Rubriekmaker (Beta)" 
        subtitle="Ontwerp razendsnel beoordelingsrubrieken voor elke opdracht."
        color="from-pink-600 to-rose-500"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2 mb-1">
                <SafeIcon icon={FiGrid} className="text-2xl text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Opdracht Details</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 2–3<br />
                Ondersteunt transparante beoordeling en formatief handelen.
              </p>
            </div>

            <form onSubmit={generateRubric} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel van de opdracht</label>
                <input 
                  type="text" name="title" required placeholder="Bijv. Essay Gouden Eeuw"
                  value={formData.title} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vak</label>
                  <input 
                    type="text" name="subject" required placeholder="Geschiedenis"
                    value={formData.subject} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <input 
                    type="text" name="level" required placeholder="HAVO 4"
                    value={formData.level} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiGrid} />
                <span>Genereer Rubriek</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-8 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiActivity} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen rubriek gegenereerd</h3>
                <p>Vul het formulier in om een basisrubriek en AI-prompt te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-pink-50 p-6 border-b border-pink-100">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">Beoordelingsrubriek: {result.rubric.title}</h3>
                    <span className="bg-pink-100 px-2 py-1 rounded text-xs text-pink-700 font-medium">{result.rubric.meta}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                        <tr>
                          <th className="px-6 py-3 text-left">Criterium</th>
                          {result.rubric.headers.map((h, i) => <th key={i} className="px-6 py-3 text-left">{h}</th>)}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {result.rubric.rows.map((row, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                            {row.cells.map((cell, ci) => <td key={ci} className="px-6 py-4 text-gray-600">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiActivity} className="text-pink-400" />
                      AI-Prompt
                    </h3>
                    <button onClick={copyToClipboard} className="text-sm px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center gap-2">
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <textarea readOnly value={result.prompt} className="w-full h-48 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl resize-none" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricMaker;