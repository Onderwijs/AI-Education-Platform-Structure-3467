import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiUsers, FiCalendar, FiMapPin, FiList, FiUser, FiEdit3, FiCopy, FiCheck, FiSend, FiClock } = FiIcons;

const ParentEmailGenerator = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    groups: '',
    date: '',
    time: '',
    location: '',
    contactPerson: ''
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateEmail = (e) => {
    e.preventDefault();
    const emailBody = `Beste ouders/verzorgers,\n\nHierbij informatie over: ${formData.activityName}.`;
    const promptText = `Schrijf een professionele e-mail aan ouders over ${formData.activityName} op ${formData.date}.`;
    setResult({ subject: `Informatie: ${formData.activityName}`, body: emailBody, prompt: promptText });
  };

  const copyPrompt = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Ouder-mailgenerator" 
        subtitle="Genereer snel een duidelijke en professionele e-mail voor ouders over schoolactiviteiten."
        color="from-orange-500 to-red-500"
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
                <SafeIcon icon={FiMail} className="text-2xl text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Activiteit Details</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Framework-niveau: Level 2<br />
                Ondersteunt professionele en duidelijke communicatie met ouders.
              </p>
            </div>

            <form onSubmit={generateEmail} className="space-y-4">
              <input type="text" name="activityName" required placeholder="Bijv. Excursie" value={formData.activityName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <SafeIcon icon={FiSend} />
                <span>Genereer Oudermail</span>
              </button>
            </form>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiMail} className="text-5xl mb-4 opacity-30" />
                <p>Vul links het formulier in om een concept te maken.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-700 text-sm whitespace-pre-wrap">{result.body}</div>
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white text-sm">
                  <div className="flex justify-between mb-2"><h3 className="font-bold">AI-Prompt</h3><button onClick={copyPrompt}>{copied ? 'Gekopieerd' : 'Kopieer'}</button></div>
                  <textarea readOnly value={result.prompt} className="w-full bg-gray-800 p-2 rounded" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentEmailGenerator;