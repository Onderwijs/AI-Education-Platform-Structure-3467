import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiHelpCircle, FiCommand, FiArrowRight } = FiIcons;

const Kennisbank = () => {
  const topics = [
    {
      title: "Wat is AI?",
      icon: FiHelpCircle,
      desc: "Basisbegrippen en uitleg voor docenten. Begrijp hoe algoritmes werken en wat termen als Machine Learning betekenen.",
      path: "/kennisbank/wat-is-ai"
    },
    {
      title: "ChatGPT in de klas",
      icon: FiBookOpen,
      desc: "Praktische handleiding voor verantwoord gebruik. Tips voor differentiatie, lesvoorbereiding en afspraken met leerlingen.",
      path: "/kennisbank/chatgpt-in-de-klas"
    },
    {
      title: "Prompt Bibliotheek",
      icon: FiCommand,
      desc: "Effectieve prompts voor onderwijstaken. Leer de 'Gouden Formule' voor betere resultaten met AI.",
      path: "/kennisbank/prompt-bibliotheek"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Kennisbank" 
        subtitle="Diepgaande informatie en handleidingen" 
        color="from-purple-600 to-pink-600" 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Link 
              key={index} 
              to={topic.path}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                <SafeIcon icon={topic.icon} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{topic.desc}</p>
              <div className="text-purple-600 text-sm font-medium flex items-center gap-1 mt-auto">
                Lees meer <SafeIcon icon={FiArrowRight} />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-blue-50 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meer weten?</h2>
          <p className="text-gray-600">Onze kennisbank wordt regelmatig aangevuld met nieuwe artikelen en inzichten.</p>
        </div>
      </div>
    </div>
  );
};

export default Kennisbank;