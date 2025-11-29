'use client';
import { useState } from 'react';

interface RubricRow {
  criterium: string;
  onvoldoende: string;
  voldoende: string;
  goed: string;
  uitstekend: string;
}

export default function RubriekPage() {
  const [formData, setFormData] = useState({
    vak: '', niveau: '', taakOmschrijving: '', aantalCriteria: 4
  });
  const [loading, setLoading] = useState(false);
  const [rubric, setRubric] = useState<RubricRow[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setRubric([]);
    try {
      const res = await fetch('/api/rubriekmaker', { method: 'POST', body: JSON.stringify(formData) });
      const data = await res.json();
      setRubric(data.rubric || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Rubriekmaker</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Vak" value={formData.vak} onChange={e => setFormData({...formData, vak: e.target.value})} required/>
          <input className="border p-2 rounded" placeholder="Niveau" value={formData.niveau} onChange={e => setFormData({...formData, niveau: e.target.value})} required/>
        </div>
        <textarea className="border p-2 rounded w-full" rows={3} placeholder="Taakomschrijving" value={formData.taakOmschrijving} onChange={e => setFormData({...formData, taakOmschrijving: e.target.value})} required/>
        <div className="flex items-center gap-2">
          <label>Aantal criteria:</label>
          <input type="number" className="border p-2 rounded w-20" min={2} max={10} value={formData.aantalCriteria} onChange={e => setFormData({...formData, aantalCriteria: parseInt(e.target.value)})} />
        </div>
        <button disabled={loading} className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Genereren...' : 'Genereer Rubriek'}
        </button>
      </form>

      {rubric.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">Criterium</th>
                <th className="px-4 py-3 text-left font-medium text-red-600 uppercase">Onvoldoende</th>
                <th className="px-4 py-3 text-left font-medium text-yellow-600 uppercase">Voldoende</th>
                <th className="px-4 py-3 text-left font-medium text-green-600 uppercase">Goed</th>
                <th className="px-4 py-3 text-left font-medium text-blue-600 uppercase">Uitstekend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rubric.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-4 font-medium text-gray-900">{row.criterium}</td>
                  <td className="px-4 py-4 text-gray-600 bg-red-50/20">{row.onvoldoende}</td>
                  <td className="px-4 py-4 text-gray-600 bg-yellow-50/20">{row.voldoende}</td>
                  <td className="px-4 py-4 text-gray-600 bg-green-50/20">{row.goed}</td>
                  <td className="px-4 py-4 text-gray-600 bg-blue-50/20">{row.uitstekend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}