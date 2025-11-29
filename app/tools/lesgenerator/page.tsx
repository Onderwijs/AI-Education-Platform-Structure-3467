'use client';

import { useState } from 'react';

interface LessonPlan {
  titel: string;
  intro: string;
  leerdoelen: string[];
  benodigde_materialen: string[];
  lesverloop: {
    start: string;
    kern: string;
    afsluiting: string;
  };
  differentiatie: {
    basis: string;
    verdieping: string;
  };
  evaluatie: string;
}

export default function LesgeneratorPage() {
  const [formData, setFormData] = useState({
    vak: '',
    niveau: '',
    tijdsduur: 50,
    leerdoel: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LessonPlan | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/lesgenerator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Er ging iets mis bij het genereren.');

      const data = await res.json();
      if (data.lesson) {
        setResult(data.lesson);
      } else {
        setError('Kon het resultaat niet verwerken.');
      }
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Lesgenerator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vak</label>
            <input 
              type="text" required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.vak}
              onChange={e => setFormData({...formData, vak: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau</label>
            <input 
              type="text" required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={formData.niveau}
              onChange={e => setFormData({...formData, niveau: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tijdsduur (minuten)</label>
          <input 
            type="number" required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={formData.tijdsduur}
            onChange={e => setFormData({...formData, tijdsduur: parseInt(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Leerdoel</label>
          <textarea 
            required rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={formData.leerdoel}
            onChange={e => setFormData({...formData, leerdoel: e.target.value})}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Les wordt gegenereerd...' : 'Genereer les'}
        </button>
      </form>

      {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {result && (
        <div className="mt-8 bg-white p-8 shadow rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">{result.titel}</h2>
          
          <div>
            <h3 className="font-semibold text-lg">Introductie</h3>
            <p className="text-gray-700">{result.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg">Leerdoelen</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {result.leerdoelen.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Materialen</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {result.benodigde_materialen.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Lesverloop</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Start:</span> {result.lesverloop.start}</p>
              <p><span className="font-medium">Kern:</span> {result.lesverloop.kern}</p>
              <p><span className="font-medium">Afsluiting:</span> {result.lesverloop.afsluiting}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Differentiatie</h3>
            <p><span className="font-medium">Basis:</span> {result.differentiatie.basis}</p>
            <p><span className="font-medium">Verdieping:</span> {result.differentiatie.verdieping}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Evaluatie</h3>
            <p className="text-gray-700">{result.evaluatie}</p>
          </div>
        </div>
      )}
    </div>
  );
}