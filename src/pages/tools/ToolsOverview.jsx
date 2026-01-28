import React from 'react';
import { Link } from 'react-router-dom';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiMonitor, FiCpu, FiMessageSquare, FiGrid, FiUsers, FiMail, FiActivity, FiLayout, FiBriefcase, FiShuffle } = FiIcons;

const ToolsOverview = () => {
  const tools = [
    { name: "Lesgenerator", path: "/tools/lesgenerator", icon: FiCpu, desc: "Genereer complete lesplannen met AI.", level: "Level 2–3" },
    { name: "Toetsvragenmaker", path: "/tools/toetsvragenmaker", icon: FiEdit3, desc: "Maak toetsvragen op elk niveau.", level: "Level 2–3" },
    { name: "Rubriekmaker", path: "/tools/rubriekmaker", icon: FiGrid, desc: "Stel beoordelingsrubrieken samen.", level: "Level 2–3" },
    { name: "Taalcoach", path: "/tools/taalcoach", icon: FiMessageSquare, desc: "Ontwerp taalactiviteiten en oefeningen.", level: "Level 2–3" },
    { name: "Presentatiegenerator", path: "/tools/presentatiegenerator", icon: FiMonitor, desc: "Maak outlines en dia-indelingen voor presentaties.", level: "Level 2" },
    { name: "Mentorlesplanner", path: "/tools/mentorles", icon: FiUsers, desc: "Bedenk snel een veilige en gestructureerde mentorles.", level: "Level 3" },
    { name: "Mentoraat - LOB", path: "/tools/lob", icon: FiBriefcase, desc: "Ontwerp LOB-activiteiten en gesprekken voor loopbaanbegeleiding.", level: "Level 2–3" },
    { name: "Ouder-mailgenerator", path: "/tools/oudermailgenerator", icon: FiMail, desc: "Genereer snel een duidelijke en professionele e-mail voor ouders over schoolactiviteiten.", level: "Level 2" },
    { name: "Randomizer", path: "/tools/randomizer", icon: FiShuffle, desc: "Maak willekeurige groepen, duo’s of volgordes.", level: "Level 3–4" },
    { name: "Interactief Sociogram", path: "/tools/sociogram", icon: FiActivity, desc: "Maak een netwerkvisualisatie van klaskeuzes (gezellig, niet gezellig, samenwerken, niet samenwerken).", level: "Level 3–4" },
    { name: "Klassenplattegrond", path: "/tools/klassenplattegrond", icon: FiLayout, desc: "Zet je sociogram om in een praktische klassenplattegrond op basis van sociale veiligheid.", level: "Level 3–4" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Interactieve AI Tools" subtitle="Genereer direct content voor je lessen" color="from-indigo-600 to-cyan-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} to={tool.path} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <SafeIcon icon={tool.icon} className="text-2xl" />
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {tool.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsOverview;
