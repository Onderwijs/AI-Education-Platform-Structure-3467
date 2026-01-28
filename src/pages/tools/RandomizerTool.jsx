import React, { useState } from 'react';

export default function RandomizerTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  const normalizeNames = () => {
    const names = input
      .split(/[\n,;]+/)
      .map(n => n.trim())
      .filter(Boolean);

    setResult([...new Set(names)]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Leerlingen randomizer</h1>

      <textarea
        className="w-full border rounded p-3 mb-4"
        rows={6}
        placeholder="Plak hier de namen (bijv. vanuit SOM, Magister, Excel of Word).
Nieuwe regels, komma’s en puntkomma’s worden automatisch herkend."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={normalizeNames}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Normaliseer invoer
      </button>

      {result.length > 0 && (
        <ul className="mt-6 list-disc pl-6">
          {result.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
