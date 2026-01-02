import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiHeart, FiClock, FiTarget, FiActivity, FiMessageCircle, FiCpu, FiCopy, FiCheck, FiList } = FiIcons;

const MentorLessonPlanner = () => {
  const [formData, setFormData] = useState({
    classLevel: '',
    theme: 'Groepsvorming & sfeer',
    goal: 'De groep hechter maken.',
    duration: '50'
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateLesson = (e) => {
    e.preventDefault();
    const lessonProposal = {
      meta: `${formData.classLevel} | ${formData.duration} min`,
      phases: [
        { title: "Check-in", time: "5-10 min", content: "Korte start." },
        { title: "Kern", time: "30 min", content: "Hoofdactiviteit." }
      ]
    };

    const promptText = `Je bent een ervaren mentor. Ontwerp een mentorles over ${formData.theme}. Doel: ${formData.goal}. Tijdsduur: ${formData.duration} minuten.`;
    setResult({ lesson: lessonProposal, prompt: promptText });
  };

  const copyToClipboard = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Mentorlesplanner (Beta)" 
        subtitle="Ontwerp snel een veilige en effectieve mentorles voor jouw klas."
        color="from-teal-600 to-green-600"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2 mb-1">
                <SafeIcon icon={FiUsers} className="text-2xl text-teal-600" />
                <h2 className="text-xl font-bold text-gray-900">Les Configuratie</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 3<br />
                Ondersteunt gestructureerde mentorlessen en reflectie.
              </p>
            </div>

            <form onSubmit={generateLesson} className="space-y-4">
              <input type="text" name="classLevel" required placeholder="Bijv. 2 HAVO" value={formData.classLevel} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" name="theme" required value={formData.theme} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <SafeIcon icon={FiActivity} />
                <span>Genereer Mentorles</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiUsers} className="text-5xl mb-4 opacity-30" />
                <p>Vul links het formulier in om een mentorles te ontwerpen.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-teal-50 p-4 border-b border-teal-100">
                    <h3 className="font-bold text-teal-900 flex items-center gap-2 text-lg">
                      <SafeIcon icon={FiList} />
                      Mentorles Opzet
                    </h3>
                  </div>
                  <div className="p-6">
                    {result.lesson.phases.map((p, i) => <div key={i} className="text-sm mb-2 font-bold text-gray-800">{p.title} ({p.time})</div>)}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-teal-400" />
                      AI-Prompt
                    </h3>
                    <button onClick={copyToClipboard} className="text-sm px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center gap-2">
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <textarea readOnly value={result.prompt} className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl resize-none" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorLessonPlanner;