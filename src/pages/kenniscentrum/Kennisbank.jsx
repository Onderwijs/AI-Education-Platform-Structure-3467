import React from 'react';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiHelpCircle, FiCommand } = FiIcons;

const Kennisbank = () => {
  const topics = [
    { title: "Wat is AI?", icon: FiHelpCircle, desc: "Basisbegrippen uitgelegd voor docenten." },
    { title: "ChatGPT in de klas", icon: FiBookOpen, desc: "Handleidingen voor verantwoord gebruik." },
    { title: "Prompt Bibliotheek", icon: FiCommand, desc: "Effectieve prompts voor onderwijstaken." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Kennisbank" subtitle="Diepgaande informatie en handleidingen" color="from-purple-600 to-pink-600" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                <SafeIcon icon={topic.icon} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-4">{topic.desc}</p>
              <span className="text-purple-600 text-sm font-medium">Lees meer &rarr;</span>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-blue-50 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meer weten?</h2>
          <p className="text-gray-600">Onze kennisbank wordt wekelijks aangevuld met nieuwe artikelen.</p>
        </div>
      </div>
    </div>
  );
};

export default Kennisbank;