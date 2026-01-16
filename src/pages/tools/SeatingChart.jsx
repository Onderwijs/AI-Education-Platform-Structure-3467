import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadSeatingChartPDF } from '../../utils/downloadUtils';

const { FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, FiShield, FiRefreshCw, FiDatabase, FiSliders, FiLock, FiDownload, FiLoader, FiAlertTriangle } = FiIcons;

const SeatingChart = () => {
  const [layout, setLayout] = useState('rijen');
  const [goal, setGoal] = useState('rust');
  const [sheetLink, setSheetLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [displayStudents, setDisplayStudents] = useState([]);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const applySeatingLogic = (students, currentGoal, currentLayout) => {
    if (!students || students.length === 0) return [];
    
    const result = new Array(students.length).fill(null);
    const remaining = [...students];
    const cols = currentLayout === 'rijen' ? 6 : 4;

    const getNeighbors = (idx) => {
      const neighbors = [];
      if (idx % cols !== 0) neighbors.push(idx - 1);
      if (idx % cols !== cols - 1) neighbors.push(idx + 1);
      if (idx >= cols) neighbors.push(idx - cols);
      if (idx + cols < students.length) neighbors.push(idx + cols);
      return neighbors;
    };

    const normalize = (name) => name?.trim().toLowerCase() || "";

    const calculateScore = (student, spotIdx) => {
      let score = 0;
      const neighbors = getNeighbors(spotIdx);
      neighbors.forEach(nIdx => {
        const neighbor = result[nIdx];
        if (!neighbor) return;
        
        const neighborName = normalize(neighbor.name);
        const studentName = normalize(student.name);
        
        const hasNeg = student.neg.some(n => normalize(n) === neighborName) || 
                       neighbor.neg.some(n => normalize(n) === studentName);
        const hasPos = student.pos.some(p => normalize(p) === neighborName) || 
                       neighbor.pos.some(p => normalize(p) === studentName);

        if (currentGoal === 'rust' || currentGoal === 'conflicten') {
          if (hasNeg) score -= 100;
          if (hasPos) score += 1;
        } else if (currentGoal === 'samenwerking') {
          if (hasPos) score += 50;
          if (hasNeg) score -= 20;
        }
      });
      return score;
    };

    for (let i = 0; i < students.length; i++) {
      let bestSpot = -1;
      let maxScore = -Infinity;
      const currentStudent = remaining.shift();
      
      for (let s = 0; s < result.length; s++) {
        if (result[s] === null) {
          const score = calculateScore(currentStudent, s);
          if (score > maxScore) {
            maxScore = score;
            bestSpot = s;
          }
        }
      }
      if (bestSpot !== -1) result[bestSpot] = currentStudent;
    }

    return result.map(s => s?.name || "");
  };

  useEffect(() => {
    if (isGenerated && studentData.length > 0) {
      const newOrder = applySeatingLogic(studentData, goal, layout);
      setDisplayStudents(newOrder);
    }
  }, [goal, layout, isGenerated]);

  const fetchSheetData = async (url) => {
    const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!idMatch) throw new Error("Plak de volledige URL van je Google Sheet.");
    
    const id = idMatch[1];
    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    
    try {
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error("De spreadsheet is niet bereikbaar.");
      
      const text = await response.text();
      if (text.includes('<!DOCTYPE') || text.includes('html')) {
        throw new Error("Zet de deel-instellingen op 'Iedereen met de link'.");
      }

      const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length <= 1) throw new Error("Geen leerlingen gevonden vanaf rij 2.");
      
      const firstLine = lines[0];
      const separator = firstLine.includes(';') ? ';' : ',';

      const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') inQuotes = !inQuotes;
          else if (char === separator && !inQuotes) {
            result.push(current);
            current = '';
          } else current += char;
        }
        result.push(current);
        return result.map(val => val.replace(/^"|"$/g, '').trim());
      };

      const dataRows = lines.slice(1);
      
      return dataRows.map(line => {
        const values = parseCSVLine(line);
        
        /**
         * 3️⃣ RENDERING GUARD (ULTRA HARD FIX):
         * Pak Kolom C (index 2). 
         * ALS er een separator in staat (komma, ampersand, plus of ' en ') 
         * -> pak alleen het EERSTE deel.
         */
        const rawName = values[2] || "";
        const name = rawName.split(/[|,&+]| en /i)[0].trim();
        
        if (!name) return null;

        return {
          name: name,
          pos: [...(values[3] || "").split(','), ...(values[5] || "").split(',')].filter(n => n.trim() !== ""),
          neg: [...(values[4] || "").split(','), ...(values[6] || "").split(',')].filter(n => n.trim() !== "")
        };
      }).filter(Boolean);
    } catch (err) {
      throw err;
    }
  };

  const generateChart = async () => {
    if (isLoading) return;
    setErrorMessage('');
    setIsLoading(true);
    try {
      if (!sheetLink.trim()) throw new Error("Voer eerst een Google Sheet link in.");
      const data = await fetchSheetData(sheetLink);
      if (data.length === 0) throw new Error("Geen leerlingen gevonden in kolom C.");
      setStudentData(data);
      const initialOrder = applySeatingLogic(data, goal, layout);
      setDisplayStudents(initialOrder);
      setIsGenerated(true);
    } catch (err) {
      setErrorMessage(err.message);
      setIsGenerated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const goalLabel = goal === 'rust' ? 'Rust in de klas' : goal === 'samenwerking' ? 'Samenwerking' : 'Conflicten voorkomen';
    downloadSeatingChartPDF(displayStudents, layout, goalLabel);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Klassenplattegrond" 
        subtitle="Vertaal spreadsheetgegevens direct naar een veilige tafelopstelling. Exact één leerling per tafel." 
        color="from-indigo-600 to-blue-700" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* CONFIGURATION */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" /> Configuratie
                </h2>
              </div>
              <div className="p-6 space-y-8">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 1 – Kies opstelling</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setLayout('rijen')} className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${layout === 'rijen' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiLayout} className={layout === 'rijen' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`text-sm font-bold ${layout === 'rijen' ? 'text-indigo-900' : 'text-gray-600'}`}>Rijen</span>
                    </button>
                    <button onClick={() => setLayout('eilandjes')} className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${layout === 'eilandjes' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiGrid} className={layout === 'eilandjes' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`text-sm font-bold ${layout === 'eilandjes' ? 'text-indigo-900' : 'text-gray-600'}`}>Eilandjes</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 2 – Wat is het doel?</label>
                  <div className="space-y-2">
                    {[
                      { id: 'rust', label: 'Rust in de klas', icon: FiCoffee },
                      { id: 'samenwerking', label: 'Samenwerking stimuleren', icon: FiUsers },
                      { id: 'conflicten', label: 'Conflicten voorkomen', icon: FiShield }
                    ].map(item => (
                      <button key={item.id} onClick={() => setGoal(item.id)} className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${goal === item.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-50 hover:border-indigo-100 text-gray-600'}`}>
                        <SafeIcon icon={item.icon} className="shrink-0" />
                        <span className="text-sm font-bold">{item.label}</span>
                        {goal === item.id && <SafeIcon icon={FiCheck} className="ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Stap 3 – Google Sheet Link</label>
                    <button onMouseEnter={() => setShowPrivacyInfo(true)} onMouseLeave={() => setShowPrivacyInfo(false)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <SafeIcon icon={FiInfo} />
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={sheetLink} 
                    onChange={(e) => setSheetLink(e.target.value)} 
                    placeholder="Plak link naar spreadsheet..." 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans text-xs bg-gray-50" 
                  />
                  {showPrivacyInfo && (
                    <div className="mt-2 p-3 bg-gray-900 text-white text-[10px] rounded-xl leading-relaxed border border-gray-700">
                      <p className="font-bold mb-1 text-indigo-400"><SafeIcon icon={FiLock} className="inline mr-1" /> PRIVACY</p>
                      Wij gebruiken Kolom C voor de namen. Elke rij krijgt exact één eigen tafel.
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={generateChart} 
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${isLoading ? 'bg-indigo-400 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiRefreshCw} />}
                    <span>{isLoading ? 'Verwerken...' : 'Genereer Plattegrond'}</span>
                  </button>

                  {errorMessage && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <SafeIcon icon={FiAlertTriangle} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-8">
            {!isGenerated ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <SafeIcon icon={FiDatabase} className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Wachtend op data</h3>
                <p className="text-gray-400 max-w-sm text-sm">Elke rij in Kolom C krijgt een eigen tafel op de plattegrond.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-white">
                    <h3 className="font-bold text-gray-900">Gegenereerde Plattegrond</h3>
                    <p className="text-xs text-indigo-600 font-medium">Strikte 1-op-1 weergave van Kolom C</p>
                  </div>
                  <div className="p-8 bg-gray-50/50 overflow-x-auto">
                    <div className="mb-12 flex justify-center min-w-[800px]">
                      <div className="w-48 py-3 bg-gray-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold text-center rounded-b-xl shadow-md border-t-4 border-indigo-500">
                        Bureau Docent / Digibord
                      </div>
                    </div>
                    
                    {layout === 'rijen' ? (
                      <div className="grid grid-cols-6 gap-y-6 gap-x-0 min-w-[800px]">
                        {displayStudents.map((name, index) => (
                          <motion.div 
                            key={`${name}-${index}`} 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className={`p-3 rounded-xl border-2 text-center shadow-sm flex flex-col items-center justify-center transition-all w-full h-28 shrink-0 bg-white border-blue-100 ${(index % 6 === 1 || index % 6 === 3) ? 'mr-12' : ''}`}
                          >
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                              <SafeIcon icon={FiUsers} className="text-gray-400 text-[10px]" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-800 truncate w-full px-1">{name}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-12 justify-center min-w-[800px]">
                        {chunkArray(displayStudents, 4).map((island, islandIdx) => (
                          <div key={`island-${islandIdx}`} className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-indigo-50/30">
                            {island.map((name, sIdx) => (
                              <motion.div key={`${name}-${sIdx}`} className="p-3 rounded-xl border-2 text-center shadow-sm flex flex-col items-center justify-center w-32 h-28 bg-white border-indigo-100">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                  <SafeIcon icon={FiUsers} className="text-gray-400 text-[10px]" />
                                </div>
                                <span className="text-[11px] font-bold text-gray-800 truncate w-full px-1">{name}</span>
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button onClick={handleDownload} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg flex items-center justify-center gap-2 mx-auto">
                    <SafeIcon icon={FiDownload} /> <span>Download als PDF</span>
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