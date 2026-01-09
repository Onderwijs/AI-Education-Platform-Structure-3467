import React,{useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';

const {FiTool,FiFilter,FiStar,FiExternalLink,FiSearch}=FiIcons;

const AITools=()=> {
  const [selectedCategory,setSelectedCategory]=useState('Alle');
  const [searchTerm,setSearchTerm]=useState('');

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="AI-Tools Database voor Docenten – Onderwijs.AI"
        description="Ontdek 75+ gecureerde AI-tools voor het onderwijs. Getest op privacy en didactische waarde voor PO, VO en MBO/HBO."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity: 0,y: 50}} animate={{opacity: 1,y: 0}} className="text-center" >
            <h1 className="text-4xl md:text-5xl font-bold mb-6"> AI-Tools voor het Onderwijs </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto"> Ontdek de beste AI-tools voor docenten. Getest,beoordeeld en voorzien van praktische tips. </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search - SEO Friendly */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Zoek AI-tools..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-500" />
              <select value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2" >
                <option value="Alle">Alle Categorieën</option>
                <option value="Tekstverwerking">Tekstverwerking</option>
                <option value="Onderzoek">Onderzoek</option>
                <option value="Onderwijs">Onderwijs</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>Gebruik de filters om de meest relevante AI-oplossingen voor jouw school te vinden.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default AITools;