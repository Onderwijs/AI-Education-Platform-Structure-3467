import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiGrid, FiUsers, FiTarget, FiInfo, FiCheck, 
  FiLayout, FiCoffee, FiAlertCircle, FiRefreshCw,
  FiArrowRight, FiClipboard, FiEdit3, FiSliders
} = FiIcons;

const SeatingChart = () => {
  // --- STATE ---
  const [step, setStep] = useState(1);
  const [layout, setLayout] = useState('rijen'); // rijen, eilandjes
  const [goal, setGoal] = useState('rust'); // rust, samenwerking, conflicten
  const [studentInput, setStudentInput] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  // --- LOGIC: SEATING ALGORITHM (SIMULATED) ---
  const students = useMemo(() => {
    return studentInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 30);
  }, [studentInput]);

  const generateChart = () => {
    if (students.length === 0) return;
    setIsGenerated(true);
    setStep(3);
  };

  const handleReset = () => {
    setIsGenerated(false);
    setStep(1);
  };

  // --- RENDER HELPERS ---
  const renderDesks = () => {
    const gridClasses = layout === 'rijen' 
      ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" 
      : "grid-cols-2 md:grid-cols-3 gap-8";

    return (
      <div className={`grid ${gridClasses}`}>
        {students.map((name, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border-2 text-center shadow-sm flex flex-col items-center justify-center min-h-[100px] ${
              layout === 'rijen' ? 'bg-white border-blue-100' : 'bg-indigo-50 border-indigo-200'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <SafeIcon icon={FiUsers} className="text-gray-400 text-xs" />
            </div>
            <span className="text-xs font-bold text-gray-800 truncate w-full px-1">{name}</span>
            <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
               <div className={`h-full ${index % 5 === 0 ? 'w-1/3 bg-orange-400' : 'w-full bg-green-400'}`}></div>
            </div>
          </motion.div>
        ))}
        {/* Placeholder for empty seats if needed */}
        {Array.from({ length: Math.max(0, (layout === 'rijen' ? 24 : 18) - students.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="p-4 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[100px] opacity-30">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Leeg</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Klassenplattegrond" 
        subtitle="Zet sociale inzichten om in een rustige en veilige klasopstelling." 
        color="from-indigo-600 to-blue-700" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" /> Configuratie
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
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 2 – Wat is het doel?</label>
                  <div className="space-y-2">
                    {[
                      { id: 'rust', label: 'Rust in de klas', icon: FiCoffee },
                      { id: 'samenwerking', label: 'Samenwerking stimuleren', icon: FiUsers },
                      { id: 'conflicten', label: 'Conflicten voorkomen', icon: FiAlertCircle }
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

                {/* Input Data */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stap 3 – Leerlinggegevens</label>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-3">
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      <SafeIcon icon={FiInfo} className="inline mr-1" />
                      Heb je al een sociogram gemaakt? Plak hier de namen van je leerlingen onder elkaar.
                    </p>
                  </div>
                  <textarea 
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="Anna&#10;Pietje&#10;Klaasje..."
                    className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-sans text-sm bg-gray-50"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 italic text-center">Maximaal 30 leerlingen voor een optimaal resultaat.</p>
                </div>

                <button 
                  onClick={generateChart}
                  disabled={students.length === 0}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${students.length > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <SafeIcon icon={FiRefreshCw} />
                  <span>Genereer Plattegrond</span>
                </button>
              </div>
            </motion.div>

            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <SafeIcon icon={FiInfo} className="text-indigo-300" /> Goed om te weten
              </h3>
              <p className="text-xs text-indigo-100 leading-relaxed opacity-80">
                In een klas van 25–30 leerlingen is het niet altijd mogelijk om alle voorkeuren te honoreren. 
                Deze tool maakt een pedagogisch verantwoorde afweging, waarbij veiligheid en rust zwaarder wegen dan voorkeur.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-8">
            {!isGenerated ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[600px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <SafeIcon icon={FiGrid} className="text-4xl text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">Nog geen plattegrond gegenereerd</h3>
                <p className="text-gray-400 max-w-sm text-sm">Vul de configuratie aan de linkerkant in om je klassenindeling te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                      <h3 className="font-bold text-gray-900">Klassenplattegrond: {layout.charAt(0).toUpperCase() + layout.slice(1)}</h3>
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <SafeIcon icon={FiCheck} /> Indeling geoptimaliseerd voor {goal}
                      </p>
                    </div>
                    <button onClick={handleReset} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <SafeIcon icon={FiRefreshCw} /> Opnieuw
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50/50">
                    {/* Teacher's desk indicator */}
                    <div className="mb-12 flex justify-center">
                      <div className="w-48 py-3 bg-gray-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold text-center rounded-b-xl shadow-md border-t-4 border-indigo-500">
                        Bureau Docent / Digibord
                      </div>
                    </div>

                    {renderDesks()}
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-indigo-50/20">
                    <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <SafeIcon icon={FiInfo} className="text-indigo-600" /> Waarom deze indeling?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      Deze opstelling is gebaseerd op sociale voorkeuren, vermijdingen en de gekozen klasopstelling. 
                      Waar nodig zijn concessies gedaan om rust en veiligheid te waarborgen. Gebruik dit als een beredeneerd uitgangspunt en pas aan waar jouw klaspraktijk dat vraagt.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div> Match met voorkeur
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div> Pedagogische plaatsing
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                      <SafeIcon icon={FiEdit3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Zelf aanpassen?</h4>
                      <p className="text-xs text-gray-500">Gebruik deze plattegrond als basis in programma's zoals ParnasSys of Magister.</p>
                    </div>
                  </div>
                  <button className="bg-gray-100 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold cursor-not-allowed flex items-center gap-2">
                    <SafeIcon icon={FiArrowRight} /> Binnenkort: Verslepen
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