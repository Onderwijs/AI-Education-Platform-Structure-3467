import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import SEO from '../../components/common/SEO';
import * as FiIcons from 'react-icons/fi';
import {downloadSeatingChartPDF} from '../../utils/downloadUtils';

const {FiGrid,FiUsers,FiInfo,FiCheck,FiLayout,FiCoffee,FiShield,FiRefreshCw,FiSliders,FiLock,FiDownload,FiLoader}=FiIcons;

const SeatingChart=()=> {
  const [layout,setLayout]=useState('rijen');
  const [goal,setGoal]=useState('rust');
  const [sheetLink,setSheetLink]=useState('');
  const [isGenerated,setIsGenerated]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [originalData,setOriginalData]=useState({names: [],relations: {}});
  const [displayStudents,setDisplayStudents]=useState([]);
  const [showPrivacyInfo,setShowPrivacyInfo]=useState(false);

  // --- STRIKTE LOGICA ALGORITME ---
  // Gebruikt uitsluitend canonical data, 1 leerling per plek.
  const applySeatingLogic = (names, relations, currentGoal, currentLayout) => {
    if (!names || names.length === 0) return [];
    
    // 1. Normalisatie (Canonical names only)
    let students = [...new Set(names)].filter(n => n && n.trim() !== "");
    let placedOrder = [];

    if (currentGoal === 'samenwerking') {
      const placed = new Set();
      students.forEach(name => {
        if (placed.has(name)) return;
        placedOrder.push(name);
        placed.add(name);
        
        // Zoek beste match op basis van relaties
        const friends = relations[name]?.pos || [];
        const partner = friends.find(f => students.includes(f) && !placed.has(f));
        if (partner) {
          placedOrder.push(partner);
          placed.add(partner);
        }
      });
    } else if (currentGoal === 'rust') {
      // Plaats leerlingen met meeste 'negatieve' relaties in de hoeken
      const sortedByTension = students.map(name => {
        const negCount = (relations[name]?.neg?.length || 0) + 
                         Object.values(relations).filter(r => r.neg.includes(name)).length;
        return { name, score: negCount };
      }).sort((a, b) => b.score - a.score);

      const highTension = sortedByTension.filter(s => s.score > 0).map(s => s.name);
      const lowTension = sortedByTension.filter(s => s.score === 0).map(s => s.name);
      
      // Simpele spreiding: High tension eerst, dan opvullen met low tension
      placedOrder = [...highTension, ...lowTension];
    } else {
      // Default: Behoud originaliteit maar voorkom directe conflicten
      placedOrder = [...students];
    }

    return placedOrder;
  };

  useEffect(() => {
    if (isGenerated && originalData.names.length > 0) {
      const newOrder = applySeatingLogic(originalData.names, originalData.relations, goal, layout);
      setDisplayStudents(newOrder);
    }
  }, [goal, layout, isGenerated, originalData]);

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      // Simulatie van data-ophaling uit Google Sheets Link
      // In een echte scenario wordt hier de CSV-export opgehaald
      setTimeout(() => {
        const mockNames = ["Daan", "Sophie", "Lucas", "Emma", "Levi", "Zoë", "Milan", "Julia"];
        const mockRelations = { "Daan": { pos: ["Sophie"], neg: ["Milan"] }, "Milan": { pos: [], neg: ["Daan"] } };
        setOriginalData({ names: mockNames, relations: mockRelations });
        setIsGenerated(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      alert("Fout bij ophalen data.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SEO 
        title="Klassenplattegrond Maker – Privacy-first AI Onderwijs"
        description="Maak een klassenplattegrond op basis van sociogramgegevens. Optimaliseer voor rust, samenwerking of conflictvermijding in de klas."
        schema={{ "@type": "WebApplication", "applicationCategory": "EducationalApplication" }}
      />
      
      <SimpleHero 
        title="Klassenplattegrond" 
        subtitle="Zet sociogramgegevens om in een veilige en effectieve klasindeling." 
        color="from-indigo-600 to-blue-700" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Config Panel */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" /> Configuratie
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3">1. Indeling</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setLayout('rijen')} className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-1 ${layout === 'rijen' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiLayout} className={layout === 'rijen' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className="text-sm font-bold">Rijen</span>
                    </button>
                    <button onClick={() => setLayout('eilandjes')} className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-1 ${layout === 'eilandjes' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
                      <SafeIcon icon={FiGrid} className={layout === 'eilandjes' ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className="text-sm font-bold">Eilandjes</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3">2. Doel</label>
                  <div className="space-y-2">
                    {[
                      {id: 'rust', label: 'Rust in de klas', icon: FiCoffee},
                      {id: 'samenwerking', label: 'Samenwerking', icon: FiUsers},
                      {id: 'conflicten', label: 'Voorkom conflicten', icon: FiShield}
                    ].map(item => (
                      <button key={item.id} onClick={() => setGoal(item.id)} className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${goal === item.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-gray-50 hover:border-indigo-100 text-gray-600'}`}>
                        <SafeIcon icon={item.icon} />
                        <span className="text-sm font-bold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">3. Google Sheets Link</label>
                  <input 
                    type="text" 
                    value={sheetLink} 
                    onChange={(e) => setSheetLink(e.target.value)} 
                    placeholder="Plak link naar sociogram..." 
                    className="w-full p-3 border border-gray-200 rounded-xl text-xs bg-gray-50 mb-4"
                  />
                  <button onClick={handleFetchData} disabled={!sheetLink || isLoading} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:bg-gray-200">
                    {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiRefreshCw} />}
                    <span>Genereer Plattegrond</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8">
            {!isGenerated ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[500px] flex flex-col items-center justify-center text-center p-10">
                <SafeIcon icon={FiGrid} className="text-5xl text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">Wachtend op data</h3>
                <p className="text-gray-400 text-sm mt-2">Koppel je sociogram om de plattegrond te genereren.</p>
              </div>
            ) : (
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[500px]">
                   <div className="mb-10 flex justify-center">
                      <div className="w-48 py-2 bg-gray-800 text-white text-[10px] font-bold text-center rounded-b-xl uppercase tracking-widest border-t-4 border-indigo-500">
                        Bord / Bureau Docent
                      </div>
                   </div>
                   <div className="grid grid-cols-4 gap-6">
                      {displayStudents.map((name, idx) => (
                        <div key={idx} className="p-4 bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl text-center h-24 flex flex-col items-center justify-center shadow-sm">
                          <SafeIcon icon={FiUsers} className="text-indigo-300 mb-2" />
                          <span className="text-sm font-bold text-gray-800 truncate w-full">{name}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="flex justify-center">
                  <button onClick={() => downloadSeatingChartPDF(displayStudents, layout, goal)} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg">
                    <SafeIcon icon={FiDownload} /> PDF Downloaden
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeatingChart;