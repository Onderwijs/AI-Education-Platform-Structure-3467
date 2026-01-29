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
  FiUserPlus,
  FiMinus,
  FiPlus
} = FiIcons;

const RandomizerTool = () => {
  const [rawInput, setRawInput] = useState('');
  const [students, setStudents] = useState([]);
  const [mode, setMode] = useState('duos');
  const [groupSize, setGroupSize] = useState(3);
  const [result, setResult] = useState(null);

  /* -------------------------------
     1. Input normaliseren (Greta)
  --------------------------------*/
  const normalizeInput = (input) => {
    return [...new Set(
      input
        .split(/[\n,;]+/)
        .map(n => n.trim())
        .filter(Boolean)
    )];
  };

  /* -------------------------------
     2. Shuffle helper
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
     3. Duo-logica (ALTIJD 2)
  --------------------------------*/
  const createDuos = (names) => {
    const shuffled = shuffle(names);
    const duos = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      duos.push(shuffled.slice(i, i + 2));
    }

    return duos;
  };

  /* -------------------------------
     4. Groepen-logica (instelbaar)
  --------------------------------*/
  const createGroups = (names, size) => {
    const shuffled = shuffle(names);
    const groups = [];

    for (let i = 0; i < shuffled.length; i += size) {
      groups.push(shuffled.slice(i, i + size));
    }

    return groups;
  };

  /* -------------------------------
     5. Husselen
  --------------------------------*/
  const hussel = () => {
    const normalized = normalizeInput(rawInput);
    setStudents(normalized);

    if (normalized.length === 0) return;

    if (mode === 'volgorde') {
      setResult(shuffle(normalized));
    }

    if (mode === 'duos') {
      setResult(createDuos(normalized));
    }

    if (mode === 'groepen') {
      setResult(createGroups(normalized, groupSize));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero
        title="Leerlingen randomizer"
        subtitle="Maak willekeurige duo’s, groepen of een volgorde"
        color="from-purple-600 to-indigo-600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiUserPlus} className="text-2xl text-purple-600" />
                <h2 className="text-xl font-bold">Leerlingenlijst</h2>
              </div>
            </div>

            <textarea
              rows={6}
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Plak hier de namen (nieuwe regels, komma’s of puntkomma’s)"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">
                {normalizeInput(rawInput).length} unieke leerlingen
              </span>
              <button
                onClick={() => {
                  setRawInput('');
                  setStudents([]);
                  setResult(null);
                }}
                className="text-red-500 flex items-center gap-1"
              >
                <SafeIcon icon={FiX} /> Leegmaken
              </button>
            </div>

            {/* MODES */}
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
                        : 'border-gray-200'}
                    `}
                  >
                    <SafeIcon icon={m.icon} className="text-xl" />
                    {m.label}
                  </button>
                ))}
              </div>

              {/* GROUP SIZE */}
              {mode === 'groepen' && (
                <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Leerlingen per groep
                  </label>

                  <div className="flex gap-2">
                  {[3, 4, 5, 6].map(size => (
              <button
                key={size}
                onClick={() => setGroupSize(size)}
                className={`px-4 py-2 rounded-lg font-semibold border
                ${groupSize === size
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'}
              `}
              >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}


              <button
                onClick={hussel}
                className="w-full mt-4 bg-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600"
              >
                <SafeIcon icon={FiShuffle} />
                Husselen!
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          {/* RIGHT */}
<div className="lg:col-span-7 space-y-4">

  {/* PRINT BUTTON – alleen zichtbaar als er resultaat is */}
  {result && (
    <div className="flex justify-end print:hidden">
      <button
        onClick={() => window.print()}
        className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-lg"
      >
        Afdrukken / PDF
      </button>
    </div>
  )}

  {!result ? (
 
        </div>
          {/* RIGHT */}
<div className="lg:col-span-7 space-y-4">

  {result && (
    <div className="flex justify-end print:hidden">
      <button
        onClick={() => window.print()}
        className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-lg"
      >
        Afdrukken / PDF
      </button>
    </div>
  )}

  {!result ? (
    <div className="bg-white border-2 border-dashed rounded-2xl p-10 text-center text-gray-400 min-h-[400px] flex flex-col items-center justify-center">
      <SafeIcon icon={FiShuffle} className="text-5xl mb-4 opacity-30" />
      <p>Klaar om te husselen</p>
    </div>
  ) : Array.isArray(result[0]) ? (
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
        <li key={i}>{name}</li>
      ))}
    </ol>
  )}
</div>

             <div className="bg-white border-2 border-dashed rounded-2xl p-10 text-center text-gray-400 min-h-[400px] flex flex-col items-center justify-center">
                <SafeIcon icon={FiShuffle} className="text-5xl mb-4 opacity-30" />
                <p>Klaar om te husselen</p>
              </div>
            ) : Array.isArray(result[0]) ? (
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
                  <li key={i}>{name}</li>
                ))}
              </ol>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RandomizerTool;
