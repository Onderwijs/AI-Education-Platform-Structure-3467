import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { downloadStartersgids } from '../utils/downloadUtils';

const { FiMail, FiDownload, FiCheck, FiGift, FiUsers, FiTrendingUp } = FiIcons;

const Nieuwsbrief = () => {
  const [formData, setFormData] = useState({
    email: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const benefits = [
    { icon: FiDownload, title: "🆕 GLOEDNIEUWE AI Startersgids V9.0", description: "Compleet vernieuwde gids met 12 hoofdstukken en Nederlandse focus!" },
    { icon: FiUsers, title: "Exclusieve Content", description: "Vroege toegang tot nieuwe lessen en tools" },
    { icon: FiTrendingUp, title: "Trends & Updates", description: "Blijf op de hoogte van de nieuwste ontwikkelingen" }
  ];

  const freebies = [
    { title: "AI in 30 Dagen Challenge", description: "Dagelijkse opdrachten om AI te integreren in je onderwijs", format: "PDF Workbook + Email Serie" },
    { title: "ChatGPT Prompt Library", description: "100+ geteste prompts voor verschillende vakken", format: "PDF Database" },
    { title: "AI Ethics Lesplan", description: "Complete les over ethiek en AI voor alle niveaus", format: "Professionele PDF" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Prepare Mailto Link (Fallback Reliability)
      const subject = encodeURIComponent("Aanvraag AI Startersgids V9.0");
      const body = encodeURIComponent(
        `Beste AI in het Onderwijs,\n\n` +
        `Hierbij vraag ik de AI Startersgids aan.\n\n` +
        `Mijn gegevens:\n` +
        `Email: ${formData.email}\n` +
        `Rol: ${formData.role}\n\n` +
        `Met vriendelijke groet,\n` +
        `${formData.email}`
      );
      
      const mailtoLink = `mailto:ai.onderwijs@gmail.com?subject=${subject}&body=${body}`;

      // 2. Trigger Mailto (User sends email via their client)
      // We use a small timeout to allow UI update before window location change
      setTimeout(() => {
         window.location.href = mailtoLink;
      }, 500);

      // 3. Force Cache Clear & Download PDF
      if ('caches' in window) {
        try {
           const names = await caches.keys();
           names.forEach(name => caches.delete(name));
        } catch(e) { console.log('Cache clear error', e); }
      }
      
      // Clear storage
      localStorage.removeItem('startersgids_cache');
      
      // 4. Trigger Download & Update UI
      setTimeout(() => {
        console.log('📥 Starting PDF V9.0 download...');
        downloadStartersgids();
        setIsSubscribed(true); // Show Thank You screen
        setIsSubmitting(false);
      }, 1500); // Wait a bit for mailto to trigger first

    } catch (error) {
      console.error('Error in submission flow:', error);
      // Fallback: Just download
      downloadStartersgids();
      setIsSubscribed(true);
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center"
      >
        <div className="max-w-md mx-auto text-center px-4">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SafeIcon icon={FiCheck} className="text-3xl text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bedankt! Download Gestart
          </h1>
          
          <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-bold text-green-800 mb-2">🚀 Wat gebeurt er nu?</h3>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <SafeIcon icon={FiCheck} className="text-green-500 mt-0.5" />
                <span>De <strong>Startersgids V9.0 PDF</strong> wordt nu gedownload naar je apparaat.</span>
              </li>
              <li className="flex items-start gap-2">
                <SafeIcon icon={FiMail} className="text-blue-500 mt-0.5" />
                <span>Je e-mailprogramma is geopend om je inschrijving te bevestigen (klik op verzenden!).</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => downloadStartersgids()}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiDownload} />
              <span>Download PDF opnieuw</span>
            </button>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Terug naar formulier
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
            <SafeIcon icon={FiGift} className="text-6xl mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nieuw: AI Startersgids V9.0
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Het complete handboek (12+ pagina's) voor PO, VO en MBO. Direct gratis te downloaden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Vraag de gratis gids aan
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email adres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="jouw@email.nl"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Ik ben... (optioneel)
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecteer je rol</option>
                      <option value="po-docent">PO Docent</option>
                      <option value="vo-docent">VO Docent</option>
                      <option value="mbo-docent">MBO Docent</option>
                      <option value="hbo-docent">HBO Docent</option>
                      <option value="schoolleider">Schoolleider</option>
                      <option value="ict-coordinator">ICT Coördinator</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>
                      {isSubmitting ? 'Bezig met verwerken...' : 'Download Gids & Verstuur Aanvraag'}
                    </span>
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Door te klikken open je jouw mailprogramma om de aanvraag te versturen en start direct de download.
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Wat zit er in Versie 9.0?
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={benefit.icon} className="text-xl text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                 <h4 className="font-bold text-yellow-800 mb-2">Bonussen:</h4>
                 <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    {freebies.map((freebie, idx) => (
                        <li key={idx}>{freebie.title}</li>
                    ))}
                 </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Nieuwsbrief;