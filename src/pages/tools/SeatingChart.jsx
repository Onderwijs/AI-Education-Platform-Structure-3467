import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadSeatingChartPDF } from '../../utils/downloadUtils';

const { FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, FiAlertCircle, FiRefreshCw, FiArrowRight, FiLink, FiDatabase, FiSliders, FiShield, FiLock, FiDownload, FiLoader } = FiIcons;

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

  // --- SEATING LOGIC ALGORITHM ---
  const applySeatingLogic = (names, relations, currentGoal, currentLayout) => {
    if (!names.length) return [];
    
    let sorted = [...names];
    const cols = currentLayout === 'rijen' ? 4 : 3;

    if (currentGoal === 'samenwerking') {
      // Greedy clustering: probeer positieve relaties naast elkaar te zetten
      const placed = new Set();
      const newOrder = [];
      
      sorted.forEach(name => {
        if (placed.has(name)) return;
        newOrder.push(name);
        placed.add(name);
        
        // Zoek een vriend die nog niet geplaatst is
        const friends = relations[name]?.pos || [];
        const bestFriend = friends.find(f => !placed.has(f));
        if (bestFriend) {
          newOrder.push(bestFriend);
          placed.add(bestFriend);
        }
      });
      sorted = newOrder;
    } 
    else if (currentGoal === 'rust') {
      // Plaats leerlingen met veel negatieve relaties (onruststokers/gevoelig) aan de randen
      const tensionScores = names.map(name => {
        const negCount = (relations[name]?.neg?.length || 0) + 
                         Object.values(relations).filter(r => r.neg.includes(name)).length;
        return { name, score: negCount };
      }).sort((a, b) => b.score - a.score);

      const highTension = tensionScores.filter(s => s.score > 0).map(s => s.name);
      const lowTension = tensionScores.filter(s => s.score === 0).map(s => s.name);
      
      // Verdeel highTension over hoek-indices (0, cols-1, etc)
      const result = new Array(names.length).fill(null);
      const cornerIndices = [0, cols - 1, names.length - 1, names.length - cols];
      
      let cornerIdx = 0;
      highTension.forEach(name => {
        if (cornerIdx < cornerIndices.length) {
          result[cornerIndices[cornerIdx]] = name;
          cornerIdx++;
        } else {
          lowTension.push(name); // De rest vult de gaten
        }
      });

      let lowIdx = 0;
      for (let i = 0; i < result.length; i++) {
        if (result[i] === null) {
          result[i] = lowTension[lowIdx] || "";
          lowIdx++;
        }
      }
      sorted = result.filter(n => n !== "");
    }
    else if (currentGoal === 'conflicten') {
      // Zorg voor afstand tussen negatieve relaties
      const result = [];
      const remaining = [...names];
      
      while (remaining.length > 0) {
        const current = remaining.shift();
        result.push(current);
        
        // Als de volgende in de rij een conflict heeft met de huidige, verplaats naar achteren
        if (remaining.length > 0) {
          const next = remaining[0];
          const hasConflict = (relations[current]?.neg || []).includes(next) || 
                              (relations[next]?.neg || []).includes(current);
          
          if (hasConflict) {
            const conflict = remaining.shift();
            remaining.push(conflict); // Verplaats naar het einde van de wachtrij
          }
        }
      }
      sorted = result;
    }

    return sorted;
  };

  // Re-run logic when goal or layout changes
  useEffect(() => {
    if (isGenerated && originalData.names.length > 0) {
      const newOrder = applySeatingLogic(originalData.names, originalData.relations, goal, layout);
      setDisplayStudents(newOrder);
    }
  }, [goal, layout, isGenerated]);

  // --- DATA FETCHING ---
  const fetchSheetData = async (url) => {
    const id = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!id) throw new Error("Ongeldige link.");
    
    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Kon data niet ophalen. Is de sheet openbaar?");
    
    const text = await response.text();
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    const nameIdx = headers.findIndex(h => ['naam', 'leerling', 'student', 'hoe heet je'].some(k => h.includes(k)));
    const posIdx = headers.findIndex(h => ['vriend', 'positief', 'gezellig', 'samenwerken'].some(k => h.includes(k)));
    const negIdx = headers.findIndex(h => ['niet', 'negatief', 'lastig', 'vermijden'].some(k => h.includes(k)));

    if (nameIdx === -1) throw new Error("Geen kolom 'Naam' gevonden.");

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
      const initialOrder = applySeatingLogic(data.names, data.relations, goal, layout);
      setDisplayStudents(initialOrder);
      setIsGenerated(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsGenerated(false);
    setDisplayStudents([]);
  };

  const handleDownload = () => {
    const goalLabel = goal === 'rust' ? 'Rust in de klas' : goal === 'samenwerking' ? 'Samenwerking stimuleren' : 'Conflicten voorkomen';
    downloadSeatingChartPDF(displayStudents, layout, goalLabel);
  };

  const isFormValid = sheetLink.includes('google.com/spreadsheets');

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero
        title="Klassenplattegrond"
        subtitle="Zet je sociogram om in een praktische klassenplattegrond op basis van sociale veiligheid."
        color="from-indigo-600 to-blue-700"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" />
                  Configuratie
                </h2>
              </div>

              <div className="p-6 space-y-8">
                {/* Step 1: Layout */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 1 – Kies je klasopstelling</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLayout('rijen')}
                      className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${layout === 'rijen' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                    >
                      <SafeIcon icon={FiLayout} className={layout === 'rijen' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`text-sm font-bold ${layout === 'rijen' ? 'text-indigo-900' : 'text-gray-600'}`}>Rijen</span>
                      <span className="text-[10px] text-gray-400 leading-tight">Focus & Rust</span>
                    </button>
                    <button
                      onClick={() => setLayout('eilandjes')}
                      className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${layout === 'eilandjes' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                    >
                      <SafeIcon icon={FiGrid} className={layout === 'eilandjes' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`text-sm font-bold ${layout === 'eilandjes' ? 'text-indigo-900' : 'text-gray-600'}`}>Eilandjes</span>
                      <span className="text-[10px] text-gray-400 leading-tight">Samenwerking</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Goal */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 2 – Wat is het doel van deze indeling?</label>
                  <div className="space-y-2">
                    {[
                      { id: 'rust', label: 'Rust in de klas', icon: FiCoffee },
                      { id: 'samenwerking', label: 'Samenwerking stimuleren', icon: FiUsers },
                      { id: 'conflicten', label: 'Conflicten voorkomen', icon: FiShield }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setGoal(item.id)}
                        className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${goal === item.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-50 hover:border-indigo-100 text-gray-600'}`}
                      >
                        <SafeIcon icon={item.icon} className="shrink-0" />
                        <span className="text-sm font-bold">{item.label}</span>
                        {goal === item.id && <SafeIcon icon={FiCheck} className="ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Sociogram Data */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      Stap 3 – Sociogramgegevens <span className="text-red-500">(verplicht)</span>
                    </label>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setShowPrivacyInfo(true)}
                        onMouseLeave={() => setShowPrivacyInfo(false)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <SafeIcon icon={FiInfo} />
                      </button>
                      {showPrivacyInfo && (
                        <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-[10px] p-3 rounded-xl shadow-xl z-20 leading-relaxed border border-gray-700">
                          <p className="font-bold mb-1 flex items-center gap-1 text-indigo-400 uppercase tracking-wider">
                            <SafeIcon icon={FiLock} /> Privacy & gegevens
                          </p>
                          Je sociogram blijft in je eigen Google Drive. Wij slaan geen leerlingnamen of sociale relaties op.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-bold text-gray-700 leading-tight">Link naar je sociogram (Google Sheet – alleen bekijken)</label>
                        <SafeIcon icon={FiLink} className="text-gray-400 text-xs shrink-0 ml-2" />
                      </div>
                      <input
                        type="text"
                        value={sheetLink}
                        onChange={(e) => setSheetLink(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/..."
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans text-xs bg-gray-50 mb-2"
                      />
                      <div className="space-y-2">
                        <p className="text-[10px] text-gray-500 leading-relaxed italic">
                          Koppel een Google Sheet met minimaal een kolom 'Naam'. Voor betere resultaten voeg kolommen toe voor 'Vrienden' en 'Niet samenwerken'.
                        </p>
                        <p className="text-[10px] text-indigo-600 font-medium leading-relaxed bg-indigo-50 p-2 rounded-lg border border-indigo-100/50">
                          <SafeIcon icon={FiShield} className="inline mr-1" /> Onderwijs.ai slaat geen leerlinggegevens op. Uw data wordt uitsluitend lokaal in de browser gebruikt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateChart}
                  disabled={!isFormValid || isLoading}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isFormValid && !isLoading ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiRefreshCw} />}
                  <span>{isLoading ? 'Gegevens ophalen...' : 'Genereer Plattegrond'}</span>
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
                <h3 className="text-xl font-bold text-gray-400 mb-2">Wachtend op sociogramgegevens</h3>
                <p className="text-gray-400 max-w-sm text-sm">Koppel je Google Sheet aan de linkerkant om de echte namen te vertalen naar een plattegrond.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                      <h3 className="font-bold text-gray-900">Gegenereerde Plattegrond</h3>
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <SafeIcon icon={FiCheck} /> Indeling geoptimaliseerd voor {goal === 'rust' ? 'Rust' : goal === 'samenwerking' ? 'Samenwerking' : 'Conflictpreventie'}
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <SafeIcon icon={FiRefreshCw} /> Andere data
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50/50">
                    <div className="mb-12 flex justify-center">
                      <div className="w-48 py-3 bg-gray-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold text-center rounded-b-xl shadow-md border-t-4 border-indigo-500">
                        Bureau Docent / Digibord
                      </div>
                    </div>
                    
                    <div className={`grid ${layout === 'rijen' ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" : "grid-cols-2 md:grid-cols-3 gap-8"}`}>
                      {displayStudents.map((name, index) => (
                        <motion.div
                          key={`${name}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.02 }}
                          className={`p-4 rounded-xl border-2 text-center shadow-sm flex flex-col items-center justify-center min-h-[100px] ${layout === 'rijen' ? 'bg-white border-blue-100' : 'bg-indigo-50 border-indigo-200'}`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <SafeIcon icon={FiUsers} className="text-gray-400 text-xs" />
                          </div>
                          <span className="text-sm font-bold text-gray-800 truncate w-full px-1">{name}</span>
                          <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${index % 7 === 0 ? 'w-1/3 bg-orange-400' : 'w-full bg-green-400'}`}></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-indigo-50/20">
                    <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <SafeIcon icon={FiInfo} className="text-indigo-600" />
                      Toelichting bij deze indeling
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {goal === 'rust' && "Leerlingen met een hogere sociale dynamiek zijn naar de buitenranden verplaatst om de rust in het midden van de groep te maximaliseren."}
                      {goal === 'samenwerking' && "De tool heeft groepjes gevormd op basis van de positieve voorkeuren in uw sociogram, voor een betere interactie."}
                      {goal === 'conflicten' && "Er is extra afstand gecreëerd tussen leerlingen die als negatieve keuze zijn gemarkeerd in de brongegevens."}
                    </p>
                  </div>
                </div>

                {/* Download Section */}
                <div className="text-center space-y-4 py-8">
                  <button
                    onClick={handleDownload}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>Download als A4 (PDF)</span>
                  </button>
                  <p className="text-xs text-gray-500 font-medium">
                    Geschikt voor printen op A4 – gegevens worden niet opgeslagen
                  </p>
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