import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiShuffle,
  FiUsers,
  FiList,
  FiX,
  FiUserPlus
} = FiIcons;

const RandomizerTool = () => {
  const [rawInput, setRawInput] = useState('');
  const [students, setStudents] = useState([]);
  const [mode, setMode] = useState('duos');
  const [result, setResult] = useState(null);

  /* -------------------------------
     1. Input normaliseren (Greta)
  --------------------------------*/
  const normalizeInput = () => {
    const list = rawInput
      .split(/[\n,;]+/)
      .map(n => n.trim())
      .filter(Boolean);

    const unique = [...new Set(list)];
    setStudents(unique);
    setResult(null);
  };

  /* -------------------------------
     2. Shuffle helpers
  --------------------------------*/
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  /* -------------------------------
     3. Hussel-logica (Greta)
  --------------------------------*/
  const hussel = () => {
    if (students.length === 0) return;

    const shuffled = shuffle(students);

    if (mode === 'volgorde') {
      setResult(shuffled);
      return;
    }

    if (mode === 'duos') {
      const duos = [];
      for (let i = 0; i < shuffled.length; i += 2) {
        duos.push(shuffled.slice(i, i + 2));
      }
      setResult(duos);
      return;
    }

    if (mode === 'groepen') {
      const size = 3;
      const groepen = [];
      for (let i = 0; i < shuffled.length; i += size) {
        groepen.push(shuffled.slice(i, i + size));
      }
      setResult(groepen);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HEADER (zoals Presentatiegenerator) */}
      <SimpleHero
        title="Leerlingen randomizer"
        subtitle="Maak willekeurige duo’s, groepen of een volgorde"
        color="from-purple-600 to-indigo-600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ================= LEFT: INPUT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiUserPlus} className="text-2xl text-purple-600" />
                <h2 className="text-xl font-bold">Leerlingenlijst</h2>
              </div>
              <span className="text-xs font-bold uppercase bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                Input
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Input accepteert: nieuwe regels, komma’s en puntkomma’s.
            </p>

            <textarea
              rows={6}
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Plak hier de namen (bijv. vanuit SOM, Magister, Excel of Word)"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-gray-500">
                {students.length} unieke leerlingen
              </span>
              <button
                onClick={() => {
                  setRawInput('');
                  setStudents([]);
                  setResult(null);
                }}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <SafeIcon icon={FiX} /> Leegmaken
              </button>
            </div>

            <button
              onClick={normalizeInput}
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700"
            >
              Normaliseer invoer
            </button>

            {/* ===== MODES ===== */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Instellingen</h3>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'duos', label: "Duo's", icon: FiUsers },
                  { id: 'groepen', label: 'Groepen', icon: FiUsers },
                  { id: 'volgorde', label: 'Volgorde', icon: FiList }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`border rounded-xl p-3 text-sm font-semibold flex flex-col items-center gap-1
                      ${mode === m.id
                        ? 'border-purple-600 text-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <SafeIcon icon={m.icon} className="text-xl" />
                    {m.label}
                  </button>
                ))}
              </div>

              {/* ✅ Husselen: WIT ICON, GEEN BLAUWE BG */}
              <button
                onClick={hussel}
                className="w-full mt-4 bg-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600"
              >
                <SafeIcon icon={FiShuffle} className="text-white" />
                Husselen!
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT: RESULT ================= */}
          <div className="lg:col-span-7">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiShuffle} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Klaar om te husselen
                </h3>
                <p>Voer namen in en kies een modus.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {Array.isArray(result[0]) ? (
                  result.map((group, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow border">
                      <h4 className="font-bold mb-2">
                        {mode === 'duos' ? `Duo ${i + 1}` : `Groep ${i + 1}`}
                      </h4>
                      <ul className="list-disc list-inside text-sm">
                        {group.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <ol className="bg-white rounded-xl p-6 shadow border list-decimal list-inside">
                    {result.map((name, i) => (
                      <li key={i} className="py-1">{name}</li>
                    ))}
                  </ol>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RandomizerTool;
