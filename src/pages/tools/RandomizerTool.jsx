import React, { useState, useMemo } from "react";

/**
 * Helpers
 */
function normalizeNames(input) {
  return Array.from(
    new Set(
      input
        .split(/[\n,;]+/)
        .map(n => n.trim())
        .filter(Boolean)
    )
  );
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makePairs(names) {
  const shuffled = shuffle(names);
  const result = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    result.push(shuffled.slice(i, i + 2));
  }
  return result;
}

function makeGroups(names, size = 3) {
  const shuffled = shuffle(names);
  const result = [];
  for (let i = 0; i < shuffled.length; i += size) {
    result.push(shuffled.slice(i, i + size));
  }
  return result;
}

/**
 * Component
 */
export default function RandomizerTool() {
  const [rawInput, setRawInput] = useState("");
  const [mode, setMode] = useState("pairs"); // pairs | groups | order
  const [result, setResult] = useState(null);

  const names = useMemo(() => normalizeNames(rawInput), [rawInput]);

  function handleShuffle() {
    if (names.length === 0) return;

    if (mode === "pairs") {
      setResult(makePairs(names));
    } else if (mode === "groups") {
      setResult(makeGroups(names, 3));
    } else if (mode === "order") {
      setResult(shuffle(names));
    }
  }

  function clearAll() {
    setRawInput("");
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">Leerlingen randomizer</h1>

          <div className="text-sm text-gray-600 mb-3">
            Input accepteert:
            <ul className="list-disc ml-5">
              <li>nieuwe regels</li>
              <li>komma’s</li>
              <li>puntkomma’s</li>
            </ul>
          </div>

          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Plak hier de namen (bijv. vanuit SOM, Magister, Excel of Word)"
            className="w-full h-40 border rounded-lg p-3 text-sm"
          />

          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{names.length} unieke leerlingen</span>
            <button onClick={clearAll} className="text-red-500 hover:underline">
              Leegmaken
            </button>
          </div>

          {/* SETTINGS */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Instellingen</h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode("pairs")}
                className={`px-4 py-2 rounded-lg border ${
                  mode === "pairs"
                    ? "bg-purple-600 text-white"
                    : "bg-white"
                }`}
              >
                Duo’s
              </button>

              <button
                onClick={() => setMode("groups")}
                className={`px-4 py-2 rounded-lg border ${
                  mode === "groups"
                    ? "bg-purple-600 text-white"
                    : "bg-white"
                }`}
              >
                Groepen
              </button>

              <button
                onClick={() => setMode("order")}
                className={`px-4 py-2 rounded-lg border ${
                  mode === "order"
                    ? "bg-purple-600 text-white"
                    : "bg-white"
                }`}
              >
                Volgorde
              </button>
            </div>

            <button
              onClick={handleShuffle}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold"
            >
              🔀 Husselen!
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
          {!result && (
            <div className="h-full flex items-center justify-center text-gray-400 text-center">
              Klaar om te husselen<br />
              Voer namen in en kies een modus
            </div>
          )}

          {result && (
            <div>
              <h2 className="font-semibold mb-4">Resultaat</h2>

              {Array.isArray(result[0]) ? (
                <div className="space-y-3">
                  {result.map((group, i) => (
                    <div key={i} className="border rounded-lg p-3">
                      <strong>Groep {i + 1}</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {group.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ol className="list-decimal ml-5">
                  {result.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
