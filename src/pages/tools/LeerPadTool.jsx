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
      regie: "Geef 30 seconden stilte. Daarna korte uitwisseling in duo’s.",
      icon: FiHelpCircle,
      color: "bg-amber-50 border-amber-200 text-amber-700",
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      id: 4,
      title: "TOEPASSEN",
      question: "Hoe kunnen we dit gebruiken in een situatie buiten school?",
      regie: "Bedenk samen één concreet praktijkvoorbeeld.",
      icon: FiZap,
      color: "bg-rose-50 border-rose-200 text-rose-700",
      iconBg: "bg-rose-100 text-rose-600"
    },
    {
      id: 5,
      title: "DISCUSSIE",
      question: "Deze kennis is voor iedereen onmisbaar. Eens of oneens?",
      regie: "Laat leerlingen hun mening beargumenteren.",
      icon: FiUsers,
      color: "bg-purple-50 border-purple-200 text-purple-700",
      iconBg: "bg-purple-100 text-purple-600"
    },
    {
      id: 6,
      title: "REFLECTIE",
      question: "Wat is het belangrijkste dat je vandaag hebt geleerd?",
      regie: "Laat 3 leerlingen een afsluitende zin formuleren.",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">

      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">
        <div className="max-w-2xl">
          <h1 className="text-xl font-black">LeerPad Klassikaal</h1>
          <p className="text-sm text-slate-500 mt-1">
            Vast didactisch denk- en gesprekskader voor klassikale lessen.
            Geen invoer, geen AI — jij houdt de regie.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <SafeIcon icon={FiMonitor} /> Digibord
          </div>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <SafeIcon icon={FiLayout} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

          {/* LINKERKOLOM */}
          <div className="lg:col-span-3 border-r border-slate-200 bg-white p-8 overflow-y-auto">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">
              Bediening & Overzicht
            </h2>

            {!isStarted ? (
              <button
                onClick={() => setIsStarted(true)}
                className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl flex items-center justify-center gap-3"
              >
                <SafeIcon icon={FiPlay} /> Start les
              </button>
            ) : (
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 ${
                      activeStep === i
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-transparent opacity-50 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                      {s.id}
                    </div>
                    <span className="font-black text-xs uppercase">{s.title}</span>
                  </button>
                ))}

                <button
                  onClick={reset}
                  className="w-full mt-6 py-3 text-red-500 font-black text-xs uppercase hover:bg-red-50 rounded-xl"
                >
                  <SafeIcon icon={FiRotateCcw} /> Les stoppen
                </button>
              </div>
            )}
          </div>

          {/* RECHTERKOLOM */}
          <div className="lg:col-span-9 p-8 lg:p-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isStarted ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[3rem] border-4 border-dashed border-slate-200 p-20 text-center"
                >
                  <SafeIcon icon={FiMonitor} className="text-6xl text-slate-300 mb-6" />
                  <h2 className="text-4xl font-black text-slate-300">
                    Wachtend op start…
                  </h2>
                </motion.div>
              ) : (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[4rem] shadow-2xl border border-slate-200 w-full max-w-6xl"
                >
                  <div className={`p-12 border-b-2 ${steps[activeStep].color}`}>
                    <h3 className="text-6xl font-black">
                      {steps[activeStep].title}
                    </h3>
                  </div>

                  <div className="p-24 text-center">
                    <h2 className="text-7xl font-black">
                      {steps[activeStep].question}
                    </h2>
                  </div>

                  <div className="bg-slate-50 p-10 border-t flex justify-between items-center">
                    <p className="text-2xl font-bold text-slate-700">
                      {steps[activeStep].regie}
                    </p>

                    <button
                      onClick={() =>
                        activeStep < steps.length - 1
                          ? setActiveStep(a => a + 1)
                          : reset()
                      }
                      className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black"
                    >
                      {activeStep === steps.length - 1 ? "Afronden" : "Volgende"}
                    </button>
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
