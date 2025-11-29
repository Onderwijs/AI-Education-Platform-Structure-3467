'use client';
import { useState } from 'react';

export default function TaalcoachPage() {
  const [formData, setFormData] = useState({ zin: '', taal: 'Nederlands', uitlegNiveau: 'kort' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/taalcoach', { method: 'POST', body: JSON.stringify(formData) });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Taalcoach</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-8 space-y-4">
        <textarea className="w-full border p-2 rounded" rows={3} placeholder="Voer een zin in..." value={formData.zin} onChange={e => setFormData({...formData, zin: e.target.value})} required />
        <div className="flex gap-4">
          <select className="border p-2 rounded flex-1" value={formData.taal} onChange={e => setFormData({...formData, taal: e.target.value})}>
            <option value="Nederlands">Nederlands</option>
            <option value="Engels">Engels</option>
            <option value="Spaans">Spaans</option>
          </select>
          <select className="border p-2 rounded flex-1" value={formData.uitlegNiveau} onChange={e => setFormData({...formData, uitlegNiveau: e.target.value})}>
            <option value="kort">Korte uitleg</option>
            <option value="uitgebreid">Uitgebreide uitleg</option>
          </select>
        </div>
        <button disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Analyseren...' : 'Verbeteren'}
        </button>
      </form>

      {result && (
        <div className="bg-white p-6 shadow rounded-lg space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-sm text-gray-500 uppercase font-bold">Verbeterd</h3>
            <p className="text-xl font-medium text-gray-900">{result.verbeterd}</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Uitleg</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded">{result.uitleg}</p>
          </div>
          {result.alternatieven && (
            <div>
              <h3 className="font-bold mb-1">Alternatieven</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {result.alternatieven.map((alt: string, i: number) => <li key={i}>{alt}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}