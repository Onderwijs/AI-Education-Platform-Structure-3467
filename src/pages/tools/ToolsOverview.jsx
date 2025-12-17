import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiMonitor, FiCpu, FiMessageSquare, FiGrid, FiUsers, FiMail } = FiIcons;

const ToolsOverview = () => {
  const tools = [
    {
      name: "Lesgenerator",
      path: "/tools/lesgenerator",
      icon: FiCpu,
      desc: "Genereer complete lesplannen met AI."
    },
    {
      name: "Toetsvragenmaker",
      path: "/tools/toetsvragenmaker",
      icon: FiEdit3,
      desc: "Maak toetsvragen op elk niveau."
    },
    {
      name: "Rubriekmaker",
      path: "/tools/rubriekmaker",
      icon: FiGrid,
      desc: "Stel beoordelingsrubrieken samen."
    },
    {
      name: "Taalcoach",
      path: "/tools/taalcoach",
      icon: FiMessageSquare,
      desc: "Ontwerp taalactiviteiten en oefeningen."
    },
    {
      name: "Presentatiegenerator",
      path: "/tools/presentatiegenerator",
      icon: FiMonitor,
      desc: "Maak outlines en dia-indelingen voor presentaties."
    },
    {
      name: "Mentorlesplanner",
      path: "/tools/mentorles",
      icon: FiUsers,
      desc: "Bedenk snel een veilige en gestructureerde mentorles."
    },
    {
      name: "Ouder-mailgenerator",
      path: "/tools/oudermailgenerator",
      icon: FiMail,
      desc: "Genereer snel een duidelijke en professionele e-mail voor ouders over schoolactiviteiten."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Interactieve AI Tools" 
        subtitle="Genereer direct content voor je lessen"
        color="from-indigo-600 to-cyan-600"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.path}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                <SafeIcon icon={tool.icon} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsOverview;