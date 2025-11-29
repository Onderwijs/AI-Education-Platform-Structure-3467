'use client';
import { useState } from 'react';

export default function PresentatiePage() {
  const [formData, setFormData] = useState({ onderwerp: '', niveau: '', aantalSlides: 5 });
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/presentatiegenerator', { method: 'POST', body: JSON.stringify(formData) });
    const data = await res.json();
    setSlides(data.slides || []);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Presentatie Generator</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Onderwerp" value={formData.onderwerp} onChange={e => setFormData({...formData, onderwerp: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Niveau" value={formData.niveau} onChange={e => setFormData({...formData, niveau: e.target.value})} required />
        </div>
        <div>
          <label className="mr-2">Aantal slides:</label>
          <input type="number" className="border p-2 rounded w-20" min={3} max={15} value={formData.aantalSlides} onChange={e => setFormData({...formData, aantalSlides: parseInt(e.target.value)})} />
        </div>
        <button disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Genereren...' : 'Maak Outline'}
        </button>
      </form>

      <div className="grid gap-6">
        {slides.map((slide, i) => (
          <div key={i} className="bg-white p-6 shadow-lg rounded-xl border border-gray-100 aspect-video flex flex-col justify-center">
            <div className="text-sm text-gray-400 font-mono mb-2">Slide {i + 1}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{slide.titel}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {slide.bulletpoints?.map((bp: string, idx: number) => (
                <li key={idx}>{bp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}