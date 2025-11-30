import React from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCommand, FiTerminal, FiLayers, FiCopy } = FiIcons;

const PromptBibliotheek = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Prompt Bibliotheek" 
        subtitle="Effectief leren communiceren met AI" 
        color="from-blue-600 to-cyan-600" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          {/* Wat is een prompt */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiCommand} className="text-blue-600" />
              Wat is een prompt?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Een 'prompt' is de tekstuele instructie die je aan een AI-model (zoals ChatGPT) geeft. 
              De kwaliteit van het antwoord hangt sterk af van de kwaliteit van je prompt. 
              <span className="italic"> "Garbage in, garbage out"</span> geldt hier zeker.
            </p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* De Gouden Formule */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SafeIcon icon={FiLayers} className="text-blue-600" />
              De Gouden Formule
            </h2>
            <p className="text-gray-600 mb-4">Een goede prompt bevat meestal deze vier elementen:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1">1. Rol (Wie?)</span>
                <span className="text-sm text-blue-800">"Je bent een ervaren biologie docent..."</span>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1">2. Context (Waarom?)</span>
                <span className="text-sm text-blue-800">"Ik geef les aan een 3 HAVO klas die moeite heeft met..."</span>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1">3. Taak (Wat?)</span>
                <span className="text-sm text-blue-800">"Maak een uitleg van 3 alinea's over fotosynthese..."</span>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1">4. Output (Hoe?)</span>
                <span className="text-sm text-blue-800">"Gebruik jip-en-janneketaal en voeg 3 quizvragen toe."</span>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Voorbeeld Prompts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <SafeIcon icon={FiTerminal} className="text-blue-600" />
              Voorbeeld Prompts
            </h2>

            {/* Prompt 1 */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Lesontwerp</h3>
              <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm shadow-inner relative group">
                <p>
                  "Je bent een onderwijskundige. Ontwerp een lesplan van 50 minuten voor [VAK] in [KLAS/NIVEAU] over [ONDERWERP].<br/><br/>
                  Zorg voor:<br/>
                  1. Een pakkende introductie (5 min)<br/>
                  2. Een actieve werkvorm voor de kern (30 min)<br/>
                  3. Een formatieve check aan het einde (15 min)<br/>
                  Houd rekening met leerlingen die visueel zijn ingesteld."
                </p>
              </div>
            </div>

            {/* Prompt 2 */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Toetsvragen maken</h3>
              <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm shadow-inner">
                <p>
                  "Genereer 5 meerkeuzevragen over [ONDERWERP] voor [NIVEAU].<br/>
                  Geef bij elke vraag aan wat het juiste antwoord is en WAAROM de foute antwoorden fout zijn (zodat ik veelgemaakte denkfouten kan bespreken)."
                </p>
              </div>
            </div>

            {/* Prompt 3 */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Uitleg vereenvoudigen</h3>
              <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm shadow-inner">
                <p>
                  "Ik plak hieronder een tekst uit een wetenschappelijk artikel. Herschrijf deze tekst zodat een leerling uit groep 8 het kan begrijpen. Gebruik analogieën uit de belevingswereld van een 11-jarige."
                </p>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default PromptBibliotheek;