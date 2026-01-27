import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiUserPlus, FiList, FiRefreshCw, FiTrash2, FiCopy, FiCheck } = FiIcons;

const RandomizerTool = () => {
  const [namesInput, setNamesInput] = useState('');
  const [mode, setMode] = useState('pairs'); // 'pairs', 'groups', 'order'
  const [groupConfig, setGroupConfig] = useState({ type: 'size', value: 3 });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Fisher-Yates Shuffle Algorithm
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  /**
   * FUNCTIONELE EIS: De invoer wordt eerst genormaliseerd voordat enige randomisatie plaatsvindt
   * (splitten op nieuwe regels, komma's, puntkomma's, trimmen en dedupliceren).
   */
  const getCleanNames = () => {
    if (!namesInput) return [];
    // Split op nieuwe regel, komma of puntkomma
    const rawNames = namesInput.split(/[\n,;]/);
    const cleaned = rawNames
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    // Dedupliceren: unieke namen
    return [...new Set(cleaned)];
  };

  const handleRandomize = () => {
    const names = getCleanNames();
    if (names.length === 0) return;

    const shuffled = shuffle(names);
    let output = [];

    if (mode === 'pairs') {
      for (let i = 0; i < shuffled.length; i += 2) {
        if (i === shuffled.length - 3) {
          output.push(`${shuffled[i]} – ${shuffled[i+1]} – ${shuffled[i+2]}`);
          break;
        }
        if (i === shuffled.length - 1) {
          output.push(shuffled[i]);
        } else {
          output.push(`${shuffled[i]} – ${shuffled[i+1]}`);
        }
      }
    } else if (mode === 'groups') {
      let numGroups;
      if (groupConfig.type === 'size') {
        numGroups = Math.max(1, Math.floor(shuffled.length / groupConfig.value));
      } else {
        numGroups = Math.max(1, groupConfig.value);
      }

      const groups = Array.from({ length: numGroups }, () => []);
      shuffled.forEach((name, index) => {
        groups[index % numGroups].push(name);
      });

      if (groups.length > 1) {
        const lastGroup = groups[groups.length - 1];
        if (lastGroup.length === 1 && groups.length > 1) {
          const solo = groups.pop()[0];
          groups[0].push(solo);
        }
      }
      output = groups;
    } else if (mode === 'order') {
      output = shuffled;
    }

    setResult(output);
  };

  const handleClear = () => {
    setNamesInput('');
    setResult(null);
  };

  const copyToClipboard = () => {
    if (!result) return;
    let text = "";
    if (mode === 'groups') {
      text = result.map((g, i) => `Groep ${i+1}:\n${g.join('\n')}`).join('\n\n');
    } else if (mode === 'order') {
      text = result.map((n, i) => `${i+1}. ${n}`).join('\n');
    } else {
      text = result.join('\n');
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Randomizer" subtitle="Tweetallen, groepjes of een willekeurige volgorde voor je klas." color="from-purple-600 to-indigo-700" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SafeIcon icon={FiList} className="text-purple-600" /> Leerlingenlijst
              </h3>
              
              <div className="mb-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="font-bold mb-1">Input accepteert:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>nieuwe regels</li>
                  <li>komma’s</li>
                  <li>puntkomma’s</li>
                </ul>
                <p className="mt-1 italic">De tool normaliseert dit automatisch naar één lijst met unieke namen.</p>
              </div>

              <textarea
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                placeholder="Plak hier de namen (bijv. vanuit SOM, Magister, Excel of Word). Nieuwe regels, komma’s en puntkomma’s worden automatisch herkend."
                className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sans text-sm resize-none"
                aria-label="Leerlingenlijst invoerveld"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                <span>{getCleanNames().length} unieke leerlingen</span>
                <button onClick={handleClear} className="text-red-500 hover:underline flex items-center gap-1">
                  <SafeIcon icon={FiTrash2} /> Leegmaken
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Instellingen</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: 'pairs', icon: FiUserPlus, label: 'Duo\'s' },
                  { id: 'groups', icon: FiUsers, label: 'Groepen' },
                  { id: 'order', icon: FiList, label: 'Volgorde' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setMode(item.id); setResult(null); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${mode === item.id ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                  >
                    <SafeIcon icon={item.icon} className="text-xl mb-1" />
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                ))}
              </div>

              {mode === 'groups' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={groupConfig.type === 'size'} onChange={() => setGroupConfig({ ...groupConfig, type: 'size' })} className="text-purple-600" />
                      <span className="text-sm">Grootte (lln per groep)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={groupConfig.type === 'count'} onChange={() => setGroupConfig({ ...groupConfig, type: 'count' })} className="text-purple-600" />
                      <span className="text-sm">Aantal groepjes</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    min="2"
                    value={groupConfig.value}
                    onChange={(e) => setGroupConfig({ ...groupConfig, value: parseInt(e.target.value) || 2 })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </motion.div>
              )}

              <button
                onClick={handleRandomize}
                disabled={getCleanNames().length === 0}
                className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SafeIcon icon={FiRefreshCw} />
                <span>{result ? 'Opnieuw husselen' : 'Husselen!'}</span>
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-center p-10">
                  <SafeIcon icon={FiRefreshCw} className="text-5xl text-gray-200 mb-4 animate-spin-slow" />
                  <h4 className="text-xl font-bold text-gray-400">Klaar om te husselen</h4>
                  <p className="text-gray-400 text-sm max-w-xs">Voer namen in de leerlingenlijst in en kies een modus om resultaten te zien.</p>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="text-xl font-bold text-gray-900">Resultaat</h3>
                    <button onClick={copyToClipboard} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd' : 'Lijst kopiëren'}
                    </button>
                  </div>

                  {mode === 'groups' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.map((group, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="bg-white p-5 rounded-2xl shadow-sm border border-purple-100">
                          <h5 className="text-purple-600 font-black uppercase tracking-widest text-xs mb-3">Groep {idx + 1}</h5>
                          <ul className="space-y-1">
                            {group.map((name, sIdx) => (
                              <li key={sIdx} className="text-gray-800 font-medium">{name}</li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-8 space-y-3">
                        {result.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                            {mode === 'order' && <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">{idx + 1}</span>}
                            <span className="text-gray-800 font-bold text-lg">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomizerTool;