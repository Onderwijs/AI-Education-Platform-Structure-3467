import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBookOpen, FiSearch, FiHelpCircle, FiCpu, FiMessageSquare } = FiIcons;

const Kennisbank = () => {
  const articles = [
    { title: "Wat is Generatieve AI?", category: "Basis", icon: FiCpu },
    { title: "ChatGPT in de klas: Do's & Don'ts", category: "Praktijk", icon: FiMessageSquare },
    { title: "Prompt Engineering voor Docenten", category: "Vaardigheden", icon: FiEdit3 },
    { title: "Privacy & AVG Checklist", category: "Juridisch", icon: FiList },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kennisbank</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Alles wat je moet weten over AI in het onderwijs. Van basisbegrippen tot geavanceerde prompts.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Zoek in de kennisbank..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm text-lg"
            />
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:border-primary-500 transition-colors cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-lg group-hover:bg-primary-100 transition-colors">
                  <SafeIcon icon={FiBookOpen} className="text-primary-600 text-xl" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{article.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600">Lees dit artikel voor meer inzicht en praktische tips.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for icon definition
const FiEdit3 = FiIcons.FiEdit3;
const FiList = FiIcons.FiList;

export default Kennisbank;