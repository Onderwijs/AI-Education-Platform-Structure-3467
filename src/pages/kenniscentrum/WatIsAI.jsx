import React from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiActivity, FiAlertTriangle, FiCheckCircle, FiHelpCircle } = FiIcons;

const WatIsAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Wat is AI?" 
        subtitle="Basisbegrippen en uitleg voor het onderwijs" 
        color="from-purple-600 to-indigo-600" 
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
              <SafeIcon icon={FiHelpCircle} className="text-purple-600" />
              Introductie
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kunstmatige Intelligentie (AI) lijkt soms magie, maar is in de kern wiskunde en statistiek. 
              Voor docenten is het belangrijk om te begrijpen dat AI geen bewustzijn heeft, maar patronen herkent in enorme hoeveelheden data. 
              Het is een hulpmiddel dat taken kan automatiseren, content kan genereren en kan helpen bij differentiëren.
            </p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Basisbegrippen */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiCpu} className="text-purple-600" />
              Belangrijke Begrippen
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900">Algoritme</h3>
                <p className="text-sm text-purple-800">Een recept of set regels die een computer volgt om een probleem op te lossen.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900">Machine Learning</h3>
                <p className="text-sm text-purple-800">Computers die leren van data zonder expliciet geprogrammeerd te zijn voor elke specifieke taak.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900">Large Language Model (LLM)</h3>
                <p className="text-sm text-purple-800">Een AI-model (zoals ChatGPT) getraind op enorme hoeveelheden tekst om menselijke taal te begrijpen en te genereren.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900">Bias (Vooroordeel)</h3>
                <p className="text-sm text-purple-800">Als de data waarmee AI leert bevooroordeeld is, zal de AI ook bevooroordeelde antwoorden geven.</p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Wat kan AI wel en niet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <SafeIcon icon={FiCheckCircle} /> Wat AI goed kan
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Patronen herkennen in data</li>
                <li>Teksten samenvatten of herschrijven</li>
                <li>Inspiratie en ideeën genereren</li>
                <li>Repetitieve taken automatiseren</li>
                <li>Programmeren en vertalen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center gap-2">
                <SafeIcon icon={FiAlertTriangle} /> Wat AI niet kan
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Echt begrijpen wat het schrijft</li>
                <li>Empathie of emotie voelen</li>
                <li>Altijd de waarheid spreken (hallucinaties)</li>
                <li>Morele oordelen vellen</li>
                <li>De rol van de docent vervangen</li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Uitleggen aan leerlingen */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiActivity} className="text-purple-600" />
              Hoe leg ik dit uit aan mijn leerlingen?
            </h2>
            <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <ul className="space-y-3 text-gray-700">
                <li>🎯 <strong>Vergelijk het met een papegaai:</strong> Een slimme papegaai die heel veel boeken heeft gelezen en zinnen kan maken die logisch klinken, maar niet altijd weet of het waar is.</li>
                <li>🎯 <strong>Het is een assistent, geen expert:</strong> Gebruik AI als een hulpje om mee te brainstormen, niet als een encyclopedie die altijd gelijk heeft.</li>
                <li>🎯 <strong>Blijf zelf de baas:</strong> Jij moet controleren wat de AI zegt. Jij bent verantwoordelijk voor je werk, niet de computer.</li>
              </ul>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default WatIsAI;