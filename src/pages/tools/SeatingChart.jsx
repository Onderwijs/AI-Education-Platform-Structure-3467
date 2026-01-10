import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadSeatingChartPDF } from '../../utils/downloadUtils';

const { 
  FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, 
  FiRefreshCw, FiDatabase, FiSliders, FiShield, FiLock, 
  FiDownload, FiLoader, FiAlertTriangle 
} = FiIcons;

const SeatingChart = () => {
  // --- STATE ---
  const [layout, setLayout] = useState('rijen'); 
  const [goal, setGoal] = useState('rust');
  const [sheetLink, setSheetLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState({ respondents: [], relations: {} });
  const [displayStudents, setDisplayStudents] = useState([]);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  // --- GRETA VALIDATION: STRICT RESPONDENT CLEANING ---
  const sanitizeRespondentName = (name) => {
    if (!name) return null;
    const forbiddenTerms = ['de hele klas', 'alle jongens', 'alle meiden', 'iedereen', 'maakt niet uit', 'niemand', 'vrij'];
    const splitRegex = /[,&;/]|\s+en\s+/i;
    
    let cleanName = name.trim();
    const lowerName = cleanName.toLowerCase();
    
    if (forbiddenTerms.some(term => lowerName.includes(term))) return null;
    
    if (splitRegex.test(cleanName)) {
      const parts = cleanName.split(splitRegex).map(p => p.trim()).filter(p => p.length > 0);
      return parts[0] || null;
    }

    return cleanName;
  };

  // --- GRETA LOGIC: SEATING ALGORITHM ---
  const applyGretaLogic = (respondents, relations, currentGoal, currentLayout) => {
    const pool = respondents
      .map(r => sanitizeRespondentName(r))
      .filter(name => name !== null);

    if (!pool.length) return [];
    
    const result = new Array(pool.length).fill(null);
    const cols = currentLayout === 'rijen' ? 6 : 4;

    const scores = pool.reduce((acc, name) => {
      const rel = relations[name] || { pos: [], neg: [] };
      const incomingPos = pool.filter(n => relations[n]?.pos.includes(name)).length;
      const incomingNeg = pool.filter(n => relations[n]?.neg.includes(name)).length;
      
      acc[name] = {
        tension: rel.neg.length + incomingNeg,
        popularity: rel.pos.length + incomingPos
      };
      return acc;
    }, {});

    if (currentGoal === 'rust') {
      const sortedByTension = [...pool].sort((a, b) => scores[b].tension - scores[a].tension);
      const corners = [0, cols - 1, pool.length - 1, pool.length - cols].filter(i => i >= 0 && i < pool.length);
      
      const placed = new Set();
      corners.forEach(idx => {
        if (sortedByTension.length > 0) {
          const student = sortedByTension.shift();
          result[idx] = student;
          placed.add(student);
        }
      });

      const remaining = pool.filter(n => !placed.has(n)).sort((a, b) => scores[a].tension - scores[b].tension);
      for (let i = 0; i < result.length; i++) {
        if (result[i] === null) result[i] = remaining.shift();
      }
    } 
    else if (currentGoal === 'samenwerking') {
      const placed = new Set();
      const pairedOrder = [];
      
      [...pool].sort((a, b) => scores[b].popularity - scores[a].popularity).forEach(name => {
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
      
      pool.forEach(n => { if(!placed.has(n)) pairedOrder.push(n); });
      return pairedOrder.slice(0, pool.length);
    }
    else {
      return [...pool].sort((a, b) => scores[b].tension - scores[a].tension);
    }

    return result.filter(n => n !== null).slice(0, pool.length);
  };

  useEffect(() => {
    if (isGenerated && originalData.respondents.length > 0) {
      const newOrder = applyGretaLogic(originalData.respondents, originalData.relations, goal, layout);
      setDisplayStudents(newOrder);
    }
  }, [goal, layout, isGenerated]);

  const fetchSheetData = async (url) => {
    const id = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!id) throw new Error("Ongeldige link. Gebruik een Google Sheets URL.");
    
    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Kon data niet ophalen. Controleer de deel-instellingen.");
    
    const text = await response.text();
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    const nameIdx = headers.findIndex(h => ['naam', 'leerling', 'student', 'hoe heet je'].some(k => h.includes(k)));
    const posIdx = headers.findIndex(h => ['vriend', 'positief', 'gezellig', 'samenwerken'].some(k => h.includes(k)));
    const negIdx = headers.findIndex(h => ['niet', 'negatief', 'lastig', 'vermijden'].some(k => h.includes(k)));

    if (nameIdx === -1) throw new Error("Geen respondent-kolom ('Naam') gevonden.");

    const respondents = [];
    const relations = {};

    lines.slice(1).forEach(line => {
      const values = line.match(/(".*?"|[^",\t;|]+)(?=\s*[,\t;|]|\s*$)/g) || [];
      const name = values[nameIdx]?.trim().replace(/"/g, '');
      
      if (name) {
        respondents.push(name);
        relations[name] = {
          pos: posIdx !== -1 ? (values[posIdx]?.replace(/"/g, '').split(',').map(s => s.trim()) || []) : [],
          neg: negIdx !== -1 ? (values[negIdx]?.replace(/"/g, '').split(',').map(s => s.trim()) || []) : []
        };
      }
    });

    return { respondents, relations };
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
        subtitle="Gevalideerd op basis van respondent-aantallen uit Google Sheets." 
        color="from-indigo-600 to-blue-700" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" /> Onderwijs.AI validatie
                </h2>
              </div>
              
              <div className="p-6 space-y-8">
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

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Optimalisatie</label>
                  <div className="space-y-2">
                    {[
                      { id: 'rust', label: 'Rust & Focus', icon: FiCoffee },
                      { id: 'samenwerking', label: 'Samenwerking', icon: FiUsers },
                      { id: 'conflicten', label: 'Veiligheid', icon: FiShield }
                    ].map(item => (
                      <button key={item.id} onClick={() => setGoal(item.id)} className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${goal === item.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-50 hover:border-indigo-100 text-gray-600 text-sm'}`}>
                        <SafeIcon icon={item.icon} className="shrink-0" />
                        <span className="font-bold">{item.label}</span>
                        {goal === item.id && <SafeIcon icon={FiCheck} className="ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Google Sheet Link</label>
                    <button onMouseEnter={() => setShowPrivacyInfo(true)} onMouseLeave={() => setShowPrivacyInfo(false)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <SafeIcon icon={FiInfo} />
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={sheetLink} 
                    onChange={(e) => setSheetLink(e.target.value)} 
                    placeholder="Link naar sociogram data..." 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs bg-gray-50"
                  />
                  {showPrivacyInfo && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-[10px] bg-gray-900 text-gray-300 p-3 rounded-lg border border-gray-700 leading-relaxed shadow-xl">
                      <SafeIcon icon={FiLock} className="inline mr-1 text-indigo-400" />
                      Greta telt exact het aantal ingevulde rijen. Namen die alleen in keuze-kolommen staan krijgen GEEN zitplaats.
                    </motion.div>
                  )}
                </div>

                <button 
                  onClick={generateChart} 
                  disabled={!sheetLink.includes('google.com') || isLoading}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${!isLoading && sheetLink.includes('google.com') ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiRefreshCw} />}
                  <span>{isLoading ? 'Greta valideert...' : 'Genereer Plattegrond'}</span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            {!isGenerated ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <SafeIcon icon={FiDatabase} className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Wachtend op data</h3>
                <p className="text-gray-400 max-w-sm text-sm italic">De plattegrond wordt exact zo groot als het aantal respondenten in de Google Sheet.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                      <h3 className="font-bold text-gray-900">Gevalideerde Plattegrond</h3>
                      <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">
                         Aantal zitplaatsen: {displayStudents.length} (Gelijk aan aantal rijen)
                      </p>
                    </div>
                    <button onClick={() => setIsGenerated(false)} className="text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-2">
                       Data resetten
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
                            className={`p-4 rounded-2xl border-2 text-center shadow-sm flex flex-col items-center justify-center bg-white h-32 ${(index % 6 === 1 || index % 6 === 3) ? 'mr-8' : ''} border-blue-50 hover:border-indigo-200 transition-colors`}
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