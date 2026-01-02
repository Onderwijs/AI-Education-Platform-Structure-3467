import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadSeatingChartPDF } from '../../utils/downloadUtils';

const { FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, FiAlertCircle, FiRefreshCw, FiArrowRight, FiLink, FiDatabase, FiSliders, FiShield, FiLock, FiDownload } = FiIcons;

const SeatingChart = () => {
  // --- STATE ---
  const [layout, setLayout] = useState('rijen');
  const [goal, setGoal] = useState('rust');
  const [sheetLink, setSheetLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  // --- LOGIC ---
  const dummyStudents = [
    "Anna", "Bram", "Casper", "Daan", "Emma", "Fleur",
    "Gijs", "Hanna", "Isabel", "Jasper", "Klaas", "Lisa",
    "Meis", "Noah", "Olivia", "Piet", "Quinten", "Roos",
    "Sem", "Tess", "Umar", "Vera", "Willem", "Xander"
  ];

  const generateChart = () => {
    if (!sheetLink.includes('google.com/spreadsheets')) {
      alert("Voer een geldige Google Sheets link in van je sociogram.");
      return;
    }
    setIsGenerated(true);
  };

  const handleReset = () => {
    setIsGenerated(false);
  };

  const handleDownload = () => {
    const goalText = goal === 'rust' ? 'Rust in de klas' : goal === 'samenwerking' ? 'Samenwerking stimuleren' : 'Conflicten voorkomen';
    downloadSeatingChartPDF(dummyStudents, layout, goalText);
  };

  const isFormValid = sheetLink.length > 10;

  // --- RENDER HELPERS ---
  const renderDesks = () => {
    const gridClasses = layout === 'rijen' ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" : "grid-cols-2 md:grid-cols-3 gap-8";
    return (
      <div className={`grid ${gridClasses}`}>
        {dummyStudents.map((name, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className={`p-4 rounded-xl border-2 text-center shadow-sm flex flex-col items-center justify-center min-h-[100px] ${layout === 'rijen' ? 'bg-white border-blue-100' : 'bg-indigo-50 border-indigo-200'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <SafeIcon icon={FiUsers} className="text-gray-400 text-xs" />
            </div>
            <span className="text-xs font-bold text-gray-800 truncate w-full px-1">{name}</span>
            <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${index % 7 === 0 ? 'w-1/3 bg-orange-400' : 'w-full bg-green-400'}`}></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

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
                          Deel hier de bekijklink van je sociogram in Google Sheets. Het bestand hoeft niet openbaar te zijn — alleen toegankelijk via de link.
                        </p>
                        <p className="text-[10px] text-indigo-600 font-medium leading-relaxed bg-indigo-50 p-2 rounded-lg border border-indigo-100/50">
                          <SafeIcon icon={FiShield} className="inline mr-1" /> Onderwijs.ai slaat geen leerlinggegevens op. De sociogramgegevens worden alleen gebruikt om deze klassenplattegrond te maken en worden niet bewaard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateChart}
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isFormValid ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <SafeIcon icon={FiRefreshCw} />
                  <span>Genereer Plattegrond</span>
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
                <p className="text-gray-400 max-w-sm text-sm">Koppel je Google Sheet aan de linkerkant om de sociale data te vertalen naar een plattegrond.</p>
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
                      <h3 className="font-bold text-gray-900">Plattegrond op basis van Sociogram</h3>
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <SafeIcon icon={FiCheck} /> Indeling geoptimaliseerd voor {goal}
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
                    {renderDesks()}
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-indigo-50/20">
                    <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <SafeIcon icon={FiInfo} className="text-indigo-600" />
                      Waarom deze indeling?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      Deze opstelling is gebaseerd op sociogramgegevens en het gekozen doel. De tool heeft leerlingen met wederzijdse positieve keuzes strategisch geplaatst, terwijl vermijdingen zijn gerespecteerd om conflicten te minimaliseren.
                      <br /><br />
                      Waar nodig zijn concessies gedaan om rust en sociale veiligheid te waarborgen. Gebruik dit als een beredeneerd uitgangspunt.
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