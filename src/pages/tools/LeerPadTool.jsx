import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiTarget, FiBookOpen, FiHelpCircle, FiZap, 
  FiUsers, FiStar, FiArrowRight, FiArrowLeft, 
  FiLayout, FiPlay, FiRotateCcw, FiMessageCircle,
  FiCheckCircle, FiMonitor
} = FiIcons;

const LeerPadTool = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // VASTE DIDACTISCHE CONTENT (GEEN GENERATIE)
  const steps = [
    {
      id: 1,
      title: "STARTVRAAG",
      question: "Wat weten we al over dit onderwerp?",
      regie: "Laat leerlingen 1 minuut brainstormen. Noteer kernwoorden op het bord.",
      icon: FiTarget,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      iconBg: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "BEGRIJPEN",
      question: "Wat is volgens jullie de kern van de lesstof?",
      regie: "Vat de essentie kort samen op basis van de voorkennis.",
      icon: FiBookOpen,
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
      iconBg: "bg-indigo-100 text-indigo-600"
    },
    {
      id: 3,
      title: "DENKPAUZE",
      question: "Bedenk voor jezelf: wat vind je tot nu toe het lastigst?",
      regie: "Geef 30 seconden absolute stilte. Daarna korte uitwisseling in duo's.",
      icon: FiHelpCircle,
      color: "bg-amber-50 border-amber-200 text-amber-700",
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      id: 4,
      title: "TOEPASSEN",
      question: "Hoe kunnen we dit gebruiken in een situatie buiten school?",
      regie: "Klassikale opdracht: Bedenk samen één concreet praktijkvoorbeeld.",
      icon: FiZap,
      color: "bg-rose-50 border-rose-200 text-rose-700",
      iconBg: "bg-rose-100 text-rose-600"
    },
    {
      id: 5,
      title: "DISCUSSIE",
      question: "Stelling: 'Deze kennis is voor iedereen onmisbaar.' Eens of oneens?",
      regie: "Vraag leerlingen om hun mening te motiveren. Focus op 'waarom'.",
      icon: FiUsers,
      color: "bg-purple-50 border-purple-200 text-purple-700",
      iconBg: "bg-purple-100 text-purple-600"
    },
    {
      id: 6,
      title: "REFLECTIE",
      question: "Wat is het belangrijkste dat je vandaag hebt geleerd?",
      regie: "Check-out: Laat 3 leerlingen een krachtige afsluitende zin formuleren.",
      icon: FiStar,
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
      iconBg: "bg-emerald-100 text-emerald-600"
    }
  ];

  const reset = () => {
    setActiveStep(0);
    setIsStarted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <SafeIcon icon={FiLayout} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight">LeerPad Klassikaal</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Didactische Regietool</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <SafeIcon icon={FiMonitor} /> Digibord Weergave
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto h-[calc(100-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          
          {/* LINKERKOLOM: DOCENTREGIE (3/12) */}
          <div className="lg:col-span-3 border-r border-slate-200 bg-white p-8 overflow-y-auto">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Bediening & Overzicht</h2>

            {!isStarted ? (
              <div className="space-y-8">
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-sm text-indigo-800 font-bold leading-relaxed">
                    Klaar voor de les? Klik op de knop hieronder om de 6 didactische kaarten te starten op het digibord.
                  </p>
                </div>
                <button 
                  onClick={() => setIsStarted(true)}
                  className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <SafeIcon icon={FiPlay} /> Start Les
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  {steps.map((s, i) => (
                    <button 
                      key={s.id}
                      onClick={() => setActiveStep(i)}
                      className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-center gap-4 ${activeStep === i ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-transparent hover:bg-slate-50 opacity-50'}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${s.iconBg}`}>
                        {s.id}
                      </div>
                      <span className="font-black text-xs uppercase tracking-tighter">{s.title}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => activeStep > 0 && setActiveStep(a => a - 1)}
                      disabled={activeStep === 0}
                      className="py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm disabled:opacity-30 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <SafeIcon icon={FiArrowLeft} /> Vorige
                    </button>
                    <button 
                      onClick={() => activeStep < steps.length - 1 && setActiveStep(a => a + 1)}
                      disabled={activeStep === steps.length - 1}
                      className="py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm disabled:opacity-30 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      Volgende <SafeIcon icon={FiArrowRight} />
                    </button>
                  </div>
                  <button 
                    onClick={reset}
                    className="w-full py-4 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <SafeIcon icon={FiRotateCcw} /> Les stoppen
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RECHTERKOLOM: LESKAART / DIGIBORD (9/12) */}
          <div className="lg:col-span-9 p-8 lg:p-12 flex flex-col justify-center bg-slate-50">
            <AnimatePresence mode="wait">
              {!isStarted ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[3rem] border-4 border-dashed border-slate-200 p-20 text-center flex flex-col items-center justify-center min-h-[600px]"
                >
                  <div className="w-32 h-32 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-8">
                    <SafeIcon icon={FiMonitor} className="text-6xl" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-300 tracking-tighter">Wachtend op start...</h2>
                </motion.div>
              ) : (
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-[4rem] shadow-2xl border border-slate-200 overflow-hidden min-h-[700px] flex flex-col"
                >
                  {/* KAART HEADER */}
                  <div className={`p-12 border-b-2 ${steps[activeStep].color} transition-colors duration-500`}>
                    <div className="flex items-center gap-8">
                      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-sm ${steps[activeStep].iconBg}`}>
                        <SafeIcon icon={steps[activeStep].icon} className="text-5xl" />
                      </div>
                      <div>
                        <span className="font-black uppercase tracking-[0.4em] text-sm opacity-60 mb-2 block">STAP {steps[activeStep].id} VAN 6</span>
                        <h3 className="text-6xl font-black tracking-tighter">{steps[activeStep].title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* CENTRALE VRAAG */}
                  <div className="flex-grow flex flex-col justify-center items-center text-center p-12 md:p-24 bg-white">
                    <h2 className="text-6xl md:text-8xl text-slate-900 leading-[1.05] font-black max-w-5xl tracking-tighter">
                      {steps[activeStep].question}
                    </h2>
                  </div>

                  {/* DOCENT INSTRUCTIE (ONDERAAN KAART) */}
                  <div className="bg-slate-50 p-10 flex items-center gap-8 border-t border-slate-100">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-200 shrink-0">
                      <SafeIcon icon={FiMessageCircle} className="text-4xl" />
                    </div>
                    <div className="text-left">
                      <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 block mb-2">Docent-Regie & Interactie vorm:</span>
                      <p className="text-2xl md:text-3xl font-bold text-slate-700 leading-tight tracking-tight">
                        {steps[activeStep].regie}
                      </p>
                    </div>
                    
                    <div className="ml-auto flex gap-4">
                      <button 
                        onClick={() => activeStep > 0 && setActiveStep(a => a - 1)}
                        disabled={activeStep === 0}
                        className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all disabled:opacity-20 shadow-sm"
                      >
                        <SafeIcon icon={FiArrowLeft} className="text-2xl" />
                      </button>
                      <button 
                        onClick={() => activeStep < steps.length - 1 ? setActiveStep(a => a + 1) : reset()}
                        className="px-10 h-16 bg-white border-2 border-indigo-600 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm group"
                      >
                        {activeStep === steps.length - 1 ? "Afronden" : "Volgende"}
                        <SafeIcon icon={activeStep === steps.length - 1 ? FiCheckCircle : FiArrowRight} className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeerPadTool;