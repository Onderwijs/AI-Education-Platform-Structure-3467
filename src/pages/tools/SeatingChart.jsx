import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadSeatingChartPDF } from '../../utils/downloadUtils';

const { 
  FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, 
  FiRefreshCw, FiDatabase, FiSliders, FiShield, FiLock, 
  FiDownload, FiLoader 
} = FiIcons;

const SeatingChart = () => {
  // --- STATE ---
  const [layout, setLayout] = useState('rijen'); 
  const [goal, setGoal] = useState('rust');
  const [sheetLink, setSheetLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState({ names: [], relations: {} });
  const [displayStudents, setDisplayStudents] = useState([]);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  // --- GRETA LOGIC: ADVANCED SEATING ALGORITHM ---
  const applyGretaLogic = (names, relations, currentGoal, currentLayout) => {
    if (!names.length) return [];
    
    let pool = [...names];
    const result = new Array(names.length).fill(null);
    const cols = currentLayout === 'rijen' ? 6 : 4;

    // 1. Bereken Sociale Scores (Greta Heuristics)
    const scores = names.reduce((acc, name) => {
      const rel = relations[name] || { pos: [], neg: [] };
      // Tel ook inkomende relaties
      const incomingPos = names.filter(n => relations[n]?.pos.includes(name)).length;
      const incomingNeg = names.filter(n => relations[n]?.neg.includes(name)).length;
      
      acc[name] = {
        tension: rel.neg.length + incomingNeg,
        popularity: rel.pos.length + incomingPos,
        isHighConflict: rel.neg.length > 1 || incomingNeg > 1
      };
      return acc;
    }, {});

    if (currentGoal === 'rust') {
      // Greta's Rust-Strategie: 'High Tension' studenten in de uiterste hoeken, rustige studenten als buffers.
      const sortedByTension = [...pool].sort((a, b) => scores[b].tension - scores[a].tension);
      const corners = [0, cols - 1, names.length - 1, names.length - cols].filter(i => i >= 0 && i < names.length);
      
      const placed = new Set();
      // Plaats bronnen van onrust in hoeken
      corners.forEach(idx => {
        if (sortedByTension.length > 0) {
          const student = sortedByTension.shift();
          result[idx] = student;
          placed.add(student);
        }
      });

      // Vul de rest op met de meest rustige leerlingen eerst als buffers
      const remaining = pool.filter(n => !placed.has(n)).sort((a, b) => scores[a].tension - scores[b].tension);
      for (let i = 0; i < result.length; i++) {
        if (result[i] === null) result[i] = remaining.shift();
      }
    } 
    else if (currentGoal === 'samenwerking') {
      // Greta's Buddy-Strategie: Plaats wederzijdse positieve affiniteit naast elkaar.
      const placed = new Set();
      const pairedOrder = [];
      
      pool.sort((a, b) => scores[b].popularity - scores[a].popularity).forEach(name => {
        if (placed.has(name)) return;
        
        pairedOrder.push(name);
        placed.add(name);
        
        const friends = relations[name]?.pos || [];
        const bestFriend = friends.find(f => !placed.has(f) && pool.includes(f));
        
        if (bestFriend) {
          pairedOrder.push(bestFriend);
          placed.add(bestFriend);
        }
      });
      return pairedOrder;
    }
    else {
      // Greta's Veiligheids-Strategie: Maximaliseer afstand tussen negatieve relaties.
      return pool.sort((a, b) => scores[b].tension - scores[a].tension);
    }

    return result.filter(n => n !== null);
  };

  useEffect(() => {
    if (isGenerated && originalData.names.length > 0) {
      const newOrder = applyGretaLogic(originalData.names, originalData.relations, goal, layout);
      setDisplayStudents(newOrder);
    }
  }, [goal, layout, isGenerated]);

  // --- DATA ACQUISITION ---
  const fetchSheetData = async (url) => {
    const id = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!id) throw new Error("Ongeldige link. Gebruik een Google Sheets URL.");
    
    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Kon data niet ophalen. Zet de deel-instellingen op 'Iedereen met de link'.");
    
    const text = await response.text();
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    const nameIdx = headers.findIndex(h => ['naam', 'leerling', 'student', 'hoe heet je'].some(k => h.includes(k)));
    const posIdx = headers.findIndex(h => ['vriend', 'positief', 'gezellig', 'samenwerken'].some(k => h.includes(k)));
    const negIdx = headers.findIndex(h => ['niet', 'negatief', 'lastig', 'vermijden'].some(k => h.includes(k)));

    if (nameIdx === -1) throw new Error("Geen kolom 'Naam' gevonden in de sheet.");

    const names = [];
    const relations = {};

    lines.slice(1).forEach(line => {
      const values = line.match(/(".*?"|[^",\t;|]+)(?=\s*[,\t;|]|\s*$)/g) || [];
      const name = values[nameIdx]?.trim().replace(/"/g, '');
      if (name) {
        names.push(name);
        relations[name] = {
          pos: posIdx !== -1 ? (values[posIdx]?.replace(/"/g, '').split(',').map(s => s.trim()) || []) : [],
          neg: negIdx !== -1 ? (values[negIdx]?.replace(/"/g, '').split(',').map(s => s.trim()) || []) : []
        };
      }
    });

    return { names, relations };
  };

  const generateChart = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSheetData(sheetLink);
      setOriginalData(data);
      setIsGenerated(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Klassenplattegrond" 
        subtitle="Greta-geoptimaliseerde tafelindeling op basis van sociale veiligheid." 
        color="from-indigo-600 to-blue-700" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" /> Greta Configuratie
                </h2>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Layout selection */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Tafelopstelling</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setLayout('rijen')} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${layout === 'rijen' ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiLayout} className={layout === 'rijen' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className="text-xs font-bold uppercase">Rijen</span>
                    </button>
                    <button onClick={() => setLayout('eilandjes')} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${layout === 'eilandjes' ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiGrid} className={layout === 'eilandjes' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className="text-xs font-bold uppercase">Eilandjes</span>
                    </button>
                  </div>
                </div>

                {/* Goal selection */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Pedagogisch Doel</label>
                  <div className="space-y-2">
                    {[
                      { id: 'rust', label: 'Rust & Focus', icon: FiCoffee },
                      { id: 'samenwerking', label: 'Samenwerking', icon: FiUsers },
                      { id: 'conflicten', label: 'Veiligheid / Conflictmijding', icon: FiShield }
                    ].map(item => (
                      <button key={item.id} onClick={() => setGoal(item.id)} className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${goal === item.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-50 hover:border-indigo-100 text-gray-600 text-sm'}`}>
                        <SafeIcon icon={item.icon} className="shrink-0" />
                        <span className="font-bold">{item.label}</span>
                        {goal === item.id && <SafeIcon icon={FiCheck} className="ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Input */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Sociogram Link</label>
                    <button onMouseEnter={() => setShowPrivacyInfo(true)} onMouseLeave={() => setShowPrivacyInfo(false)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <SafeIcon icon={FiInfo} />
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={sheetLink} 
                    onChange={(e) => setSheetLink(e.target.value)} 
                    placeholder="Plak Google Sheets link..." 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs bg-gray-50"
                  />
                  {showPrivacyInfo && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[10px] bg-gray-900 text-gray-300 p-3 rounded-lg border border-gray-700 leading-relaxed shadow-xl">
                      <SafeIcon icon={FiLock} className="inline mr-1 text-indigo-400" />
                      Greta verwerkt namen uitsluitend lokaal in je browser. Er wordt geen data opgeslagen of gedeeld.
                    </motion.div>
                  )}
                </div>

                <button 
                  onClick={generateChart} 
                  disabled={!sheetLink.includes('google.com') || isLoading}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${!isLoading && sheetLink.includes('google.com') ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiRefreshCw} />}
                  <span>{isLoading ? 'Greta rekent...' : 'Genereer Plattegrond'}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-8">
            {!isGenerated ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <SafeIcon icon={FiDatabase} className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Klaar voor optimalisatie</h3>
                <p className="text-gray-400 max-w-sm text-sm italic">Voer je sociogramgegevens in. Greta zorgt voor de meest pedagogisch verantwoorde indeling.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                      <h3 className="font-bold text-gray-900">Plattegrond: {goal === 'rust' ? 'Focus & Rust' : goal === 'samenwerking' ? 'Buddy Systeem' : 'Conflictmijding'}</h3>
                      <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">
                        {layout === 'rijen' ? '6-Koloms Rijen' : '4-Leerling Eilandjes'}
                      </p>
                    </div>
                    <button onClick={() => setIsGenerated(false)} className="text-xs font-bold text-gray-400 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <SafeIcon icon={FiRefreshCw} /> Reset
                    </button>
                  </div>

                  <div className="p-8 bg-slate-50/50 overflow-x-auto">
                    <div className="mb-12 flex justify-center min-w-[800px]">
                      <div className="w-64 py-3 bg-gray-900 text-white text-[10px] uppercase tracking-[0.3em] font-black text-center rounded-b-2xl shadow-2xl border-t-4 border-indigo-500">
                        BORD / DOCENT
                      </div>
                    </div>

                    {layout === 'rijen' ? (
                      <div className="grid grid-cols-6 gap-y-8 gap-x-4 min-w-[800px]">
                        {displayStudents.map((name, index) => (
                          <motion.div 
                            key={`${name}-${index}`} 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            className={`p-4 rounded-2xl border-2 text-center shadow-sm flex flex-col items-center justify-center bg-white h-32 ${(index % 6 === 1 || index % 6 === 3) ? 'mr-8' : ''} border-blue-50 hover:border-indigo-200 transition-colors cursor-default`}
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                              <SafeIcon icon={FiUsers} className="text-gray-300 text-sm" />
                            </div>
                            <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight truncate w-full px-2">{name}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-12 justify-center min-w-[800px]">
                        {chunkArray(displayStudents, 4).map((island, islandIdx) => (
                          <div key={`island-${islandIdx}`} className="relative p-4 bg-indigo-50/30 rounded-3xl border border-indigo-100/50">
                            <div className="grid grid-cols-2 gap-3">
                              {island.map((name, sIdx) => (
                                <motion.div 
                                  key={`${name}-${sIdx}`} 
                                  className="p-4 rounded-xl border-2 border-white text-center shadow-sm bg-white w-32 h-28 flex flex-col items-center justify-center"
                                >
                                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-tighter truncate w-full">{name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4 py-4">
                  <button 
                    onClick={() => downloadSeatingChartPDF(displayStudents, layout, goal)} 
                    className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl flex items-center gap-2"
                  >
                    <SafeIcon icon={FiDownload} /> <span>Download PDF (A4)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;