import React from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiBookOpen, FiShield, FiUserCheck, FiList } = FiIcons;

const ChatGPTInDeKlas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="ChatGPT in de klas" 
        subtitle="Kansen, uitdagingen en praktische tips" 
        color="from-teal-600 to-emerald-600" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          {/* Introductie */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiMessageSquare} className="text-teal-600" />
              Wat is ChatGPT?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ChatGPT is een taalmodel ontwikkeld door OpenAI. Het kan vragen beantwoorden, teksten schrijven, samenvatten en zelfs programmeren in een menselijke conversatiestijl. 
              Voor het onderwijs biedt dit enorme kansen, maar het vraagt ook om nieuwe afspraken.
            </p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Toepassingen */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiBookOpen} className="text-teal-600" />
              Mogelijke toepassingen in de les
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-bold text-teal-900 mb-2">Voor de Docent</h3>
                <ul className="list-disc list-inside text-sm text-teal-800 space-y-1">
                  <li>Lesplannen en werkvormen genereren</li>
                  <li>Toetsvragen en rubrieken maken</li>
                  <li>Differentiatie-materiaal schrijven</li>
                  <li>E-mails en nieuwsbrieven opstellen</li>
                </ul>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-bold text-teal-900 mb-2">Voor de Leerling</h3>
                <ul className="list-disc list-inside text-sm text-teal-800 space-y-1">
                  <li>Uitleg vragen over moeilijke stof</li>
                  <li>Brainstormen voor een opstel of project</li>
                  <li>Feedback krijgen op eigen teksten</li>
                  <li>Oefenen met vreemde talen</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Afspraken & Grenzen */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiShield} className="text-teal-600" />
              Afspraken & Grenzen
            </h2>
            <p className="text-gray-600 mb-4">
              Het is essentieel om duidelijk te zijn over wanneer AI wel en niet gebruikt mag worden.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 mt-1"><SafeIcon icon={FiUserCheck} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Plagiaat vs. Hulpmiddel</h4>
                  <p className="text-sm text-gray-600">Leer leerlingen bronvermelding toe te passen, ook bij AI. "Gegenereerd met ChatGPT" is een eerlijke vermelding.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600 mt-1"><SafeIcon icon={FiUserCheck} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">Privacy</h4>
                  <p className="text-sm text-gray-600">Voer nooit namen van leerlingen, cijferlijsten of persoonlijke gegevens in ChatGPT in. De data wordt gebruikt om het model te trainen.</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Praktische Tips */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiList} className="text-teal-600" />
              5 Tips voor veilig gebruik
            </h2>
            <ul className="bg-gray-50 p-6 rounded-xl space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><span className="text-teal-500 font-bold">1.</span> Bespreek AI open in de klas; verbieden werkt vaak averechts.</li>
              <li className="flex items-center gap-2"><span className="text-teal-500 font-bold">2.</span> Laat leerlingen altijd controleren (fact-checken) wat de AI zegt.</li>
              <li className="flex items-center gap-2"><span className="text-teal-500 font-bold">3.</span> Focus op het proces, niet alleen op het eindproduct.</li>
              <li className="flex items-center gap-2"><span className="text-teal-500 font-bold">4.</span> Gebruik AI om het begin te maken (de 'blank page' angst), niet het einde.</li>
              <li className="flex items-center gap-2"><span className="text-teal-500 font-bold">5.</span> Blijf kritisch denken stimuleren.</li>
            </ul>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ChatGPTInDeKlas;