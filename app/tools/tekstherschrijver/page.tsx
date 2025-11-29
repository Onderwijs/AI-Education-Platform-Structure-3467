'use client';
import { useState } from 'react';
import { Copy } from 'lucide-react';

export default function TekstHerschrijverPage() {
  const [formData, setFormData] = useState({ oorspronkelijkeTekst: '', niveau: 'B1', toon: 'formeel' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/tekstherschrijver', { method: 'POST', body: JSON.stringify(formData) });
    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Tekstherschrijver</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            className="w-full border p-3 rounded-lg shadow-sm h-64" 
            placeholder="Plak hier je tekst..." 
            value={formData.oorspronkelijkeTekst}
            onChange={e => setFormData({...formData, oorspronkelijkeTekst: e.target.value})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <select className="border p-2 rounded" value={formData.niveau} onChange={e => setFormData({...formData, niveau: e.target.value})}>
              <option value="B1">Niveau B1</option>
              <option value="C1">Niveau C1</option>
              <option value="leerlingvriendelijk">Leerlingvriendelijk</option>
            </select>
            <select className="border p-2 rounded" value={formData.toon} onChange={e => setFormData({...formData, toon: e.target.value})}>
              <option value="formeel">Formeel</option>
              <option value="informeel">Informeel</option>
              <option value="docententaal">Docententaal</option>
            </select>
          </div>
          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Herschrijven...' : 'Herschrijf tekst'}
          </button>
        </form>

        <div className="bg-white p-4 border rounded-lg shadow-sm h-64 md:h-auto overflow-y-auto relative">
          {result ? (
            <>
              <p className="whitespace-pre-wrap text-gray-800">{result}</p>
              <button onClick={copyToClipboard} className="absolute top-2 right-2 p-2 bg-gray-100 rounded hover:bg-gray-200">
                <Copy size={16} />
              </button>
            </>
          ) : (
            <p className="text-gray-400 italic">Het resultaat verschijnt hier...</p>
          )}
        </div>
      </div>
    </div>
  );
}