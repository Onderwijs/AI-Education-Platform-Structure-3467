'use client';

import { useState } from 'react';

interface Question {
  vraag: string;
  type: string;
  opties: string[];
  antwoord: string;
}

export default function ToetsvragenPage() {
  const [formData, setFormData] = useState({
    vak: '', niveau: '', onderwerp: '', aantalVragen: 5, typeVragen: 'mix'
  });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setQuestions([]);
    try {
      const res = await fetch('/api/toetsvragenmaker', {
        method: 'POST', body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Fout bij genereren');
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err: any) { setError(err.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Toetsvragenmaker</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Vak" className="border p-2 rounded" required value={formData.vak} onChange={e => setFormData({...formData, vak: e.target.value})} />
          <input placeholder="Niveau" className="border p-2 rounded" required value={formData.niveau} onChange={e => setFormData({...formData, niveau: e.target.value})} />
        </div>
        <input placeholder="Onderwerp" className="border p-2 rounded w-full" required value={formData.onderwerp} onChange={e => setFormData({...formData, onderwerp: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Aantal" className="border p-2 rounded" min={1} max={20} required value={formData.aantalVragen} onChange={e => setFormData({...formData, aantalVragen: parseInt(e.target.value)})} />
          <select className="border p-2 rounded" value={formData.typeVragen} onChange={e => setFormData({...formData, typeVragen: e.target.value})}>
            <option value="meerkeuze">Meerkeuze</option>
            <option value="open">Open vragen</option>
            <option value="mix">Mix</option>
          </select>
        </div>
        <button disabled={loading} className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Genereren...' : 'Maak toetsvragen'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="bg-white p-6 shadow rounded-lg border-l-4 border-primary">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-lg">Vraag {i + 1}</span>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{q.type}</span>
            </div>
            <p className="text-gray-800 mb-4 font-medium">{q.vraag}</p>
            {q.opties && q.opties.length > 0 && (
              <ul className="list-[upper-alpha] list-inside space-y-1 mb-4 text-gray-600">
                {q.opties.map((opt, idx) => <li key={idx}>{opt}</li>)}
              </ul>
            )}
            <div className="bg-green-50 p-3 rounded text-sm text-green-800">
              <strong>Antwoord:</strong> {q.antwoord}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}