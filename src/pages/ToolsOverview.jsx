import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCpu, FiEdit3, FiList, FiMic, FiMonitor, FiArrowRight } = FiIcons;

const ToolsOverview = () => {
  const tools = [
    {
      id: 'lesgenerator',
      name: "Lesgenerator",
      desc: "Genereer complete lesplannen op basis van onderwerp en niveau.",
      icon: FiCpu,
      color: "bg-indigo-100 text-indigo-600",
      status: "Beschikbaar"
    },
    {
      id: 'toetsvragenmaker',
      name: "Toetsvragen Maker",
      desc: "Maak direct multiple choice of open vragen voor je toetsen.",
      icon: FiList,
      color: "bg-blue-100 text-blue-600",
      status: "Beschikbaar"
    },
    {
      id: 'rubriekmaker',
      name: "Rubriek Maker",
      desc: "Ontwerp beoordelingsrubrieken in enkele seconden.",
      icon: FiEdit3,
      color: "bg-emerald-100 text-emerald-600",
      status: "Binnenkort"
    },
    {
      id: 'tekstherschrijver',
      name: "Tekst Herschrijver",
      desc: "Vereenvoudig complexe teksten naar B1 of A2 niveau.",
      icon: FiEdit3,
      color: "bg-orange-100 text-orange-600",
      status: "Binnenkort"
    },
    {
      id: 'taalcoach',
      name: "AI Taalcoach",
      desc: "Oefen gesprekken en krijg feedback op grammatica.",
      icon: FiMic,
      color: "bg-pink-100 text-pink-600",
      status: "In ontwikkeling"
    },
    {
      id: 'presentatiegenerator',
      name: "Presentatie Generator",
      desc: "Van onderwerp naar slide-structuur.",
      icon: FiMonitor,
      color: "bg-purple-100 text-purple-600",
      status: "In ontwikkeling"
    }
    {
      id: 'randomizer',
      name: "Randomizer",
      desc: "Maak willekeurige tweetallen, groepjes of een volgorde voor je klas.",
      icon: FiList,
      color: "bg-violet-100 text-violet-600",
      status: "Beschikbaar"
}

  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Onze AI Tools</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Praktische micro-tools ontwikkeld om jouw docenttaken te versnellen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link 
              to={`/tools/${tool.id}`} 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <SafeIcon icon={tool.icon} className="text-2xl" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                {tool.status !== "Beschikbaar" && (
                  <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    {tool.status}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-6 min-h-[3rem]">{tool.desc}</p>
              <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Open Tool</span>
                <SafeIcon icon={FiArrowRight} className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsOverview;
