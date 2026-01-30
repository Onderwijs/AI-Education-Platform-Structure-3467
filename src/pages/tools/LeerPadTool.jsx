import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiTarget, FiBookOpen, FiHelpCircle, FiZap,
  FiUsers, FiStar, FiArrowRight,
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
      question: "Wat vind je tot nu toe het lastigst?",
      regie: "30 seconden stilte, daarna kort bespreken.",
      icon: FiHelpCircle,
      color: "bg-amber-50 border-amber-200 text-amber-700",
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      id: 4,
      title: "TOEPASSEN",
      question: "Hoe kun je dit buiten school gebruiken?",
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
      question: "Wat neem je vandaag mee?",
      regie: "Laat 3 leerlingen afsluiten met één zin.",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* HEADER (ENIGE TOEVOEGING) */}
      <div className="bg-white border-b border-slate-200 px-8 py-5">
        <h1 className="text-xl font-black">LeerPad Klassikaal</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Vast didactisch denk- en gesprekskader voor klassikale lessen.
          Geen invoer, geen AI — jij houdt de regie.
        </p>
      </div>

      {/* BESTAANDE TOOL */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12">

        {/* LINKERKOLOM */}
        <aside className="lg:col-span-3 border-r border-slate-200 bg-white p-8 overflow-y-auto">
          {!isStarted ? (
            <button
              onClick={() => setIsStarted(true)}
              className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3"
            >
              <SafeIcon icon={FiPlay} /> Start les
            </button>
          ) : (
            <div className="space-y-3">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(i)}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 ${
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
        </aside>

        {/* RECHTERKOLOM */}
        <section className="lg:col-span-9 p-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl border-4 border-dashed border-slate-200 p-20 text-center"
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
                className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-6xl overflow-hidden"
              >
                <div className={`p-10 border-b ${steps[activeStep].color}`}>
                  <h3 className="text-5xl font-black">{steps[activeStep].title}</h3>
                </div>

                <div className="p-20 text-center">
                  <h2 className="text-6xl font-black">
                    {steps[activeStep].question}
                  </h2>
                </div>

                <div className="bg-slate-50 p-8 border-t flex justify-between items-center">
                  <p className="text-xl font-bold text-slate-700 max-w-3xl">
                    {steps[activeStep].regie}
                  </p>

                  <button
                    onClick={() =>
                      activeStep < steps.length - 1
                        ? setActiveStep(a => a + 1)
                        : reset()
                    }
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black"
                  >
                    {activeStep === steps.length - 1 ? "Afronden" : "Volgende"}
                    <SafeIcon
                      icon={activeStep === steps.length - 1 ? FiCheckCircle : FiArrowRight}
                      className="inline ml-3"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
};

export default LeerPadTool;
