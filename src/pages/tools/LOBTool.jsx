import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBriefcase, FiClock, FiLayers, FiCopy, FiCheck, FiCpu, FiList, FiCompass, FiUsers } = FiIcons;

const LOBTool = () => {
  const [formData, setFormData] = useState({
    level: 'HAVO 4',
    domain: 'Kwaliteitenreflectie',
    goal: 'Leerlingen ontdekken hun kernkwaliteiten via feedback van klasgenoten.',
    duration: '50',
    workFormat: 'individueel',
    context: ''
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const domains = [
    "Kwaliteitenreflectie (Wie ben ik, wat kan ik?)",
    "Motievenreflectie (Wat wil ik, wat drijft mij?)",
    "Werkexploratie (Welk soort werk past bij mij?)",
    "Loopbaansturing (Hoe bereik ik mijn doel?)",
    "Netwerken (Wie kan mij helpen?)"
  ];

  const workFormats = [
    { id: 'individueel', label: 'Individueel' },
    { id: 'duo', label: 'Duo' },
    { id: 'groep', label: 'Groep' },
    { id: 'klassikaal', label: 'Klassikaal' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateLOB = (e) => {
    e.preventDefault();
    
    const activityProposal = {
      title: `LOB-activiteit: ${formData.domain.split(' (')[0]}`,
      meta: `${formData.level} | ${formData.duration} min | ${formData.workFormat}`,
      phases: [
        { title: "Start: Introductie", time: "10 min", desc: `Korte uitleg over ${formData.domain.toLowerCase()}.` },
        { title: "Kern: Uitvoering", time: `${parseInt(formData.duration) - 20} min`, desc: `Uitvoering van de opdracht (${formData.workFormat}) gericht op: ${formData.goal}` },
        { title: "Slot: Reflectie", time: "10 min", desc: "Vastleggen van inzichten in het loopbaandossier." }
      ]
    };

    const promptText = `Je bent een LOB-expert. Ontwerp een gedetailleerde LOB-les.
Niveau: ${formData.level}
LOB-domein: ${formData.domain}
Leerdoel: ${formData.goal}
Tijdsduur: ${formData.duration} minuten
Werkvorm: ${formData.workFormat}
Context: ${formData.context || 'Standaard klasgroep'}

Zorg voor een concreet stappenplan voor de werkvorm '${formData.workFormat}' en een reflectieopdracht voor het LOB-plusportfolio.`;

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
      <SimpleHero title="Mentoraat - LOB" subtitle="Ontwerp effectieve loopbaanlessen en reflectie-activiteiten." color="from-blue-700 to-indigo-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit">
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
              <SafeIcon icon={FiCompass} className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">LOB Configuratie</h2>
            </div>
            <form onSubmit={generateLOB} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <input type="text" name="level" required value={formData.level} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duur (min)</label>
                  <input type="number" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LOB Competentie</label>
                <select name="domain" value={formData.domain} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                  {domains.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Werkvorm (Optioneel)</label>
                <div className="grid grid-cols-2 gap-2">
                  {workFormats.map(format => (
                    <label key={format.id} className={`flex items-center justify-center py-2 px-3 border rounded-lg cursor-pointer transition-colors text-sm ${formData.workFormat === format.id ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      <input type="radio" name="workFormat" value={format.id} checked={formData.workFormat === format.id} onChange={handleChange} className="hidden" />
                      <span>{format.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specifiek Leerdoel</label>
                <textarea name="goal" rows="2" required value={formData.goal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <SafeIcon icon={FiCpu} /> <span>Genereer LOB-opzet</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiBriefcase} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Wachtend op configuratie</h3>
                <p>Vul de gegevens in om een LOB-activiteit te ontwerpen.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-blue-50 p-4 border-b border-blue-100">
                    <h3 className="font-bold text-blue-900 flex items-center gap-2 text-lg"><SafeIcon icon={FiList} /> {result.proposal.title}</h3>
                    <p className="text-sm text-blue-700 mt-1 ml-7 uppercase tracking-wider font-bold">{result.proposal.meta}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {result.proposal.phases.map((p, i) => (
                      <div key={i} className="border-l-4 border-blue-200 pl-4">
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-1">
                          <span>{p.title}</span>
                          <span>{p.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2"><SafeIcon icon={FiCpu} className="text-blue-400" /> AI-Prompt</h3>
                    <button onClick={copyToClipboard} className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                      <SafeIcon icon={copied ? FiCheck : FiCopy} /> {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <textarea readOnly value={result.prompt} className="w-full h-48 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none resize-none" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LOBTool;