import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTool, FiFilter, FiStar, FiExternalLink, FiSearch } = FiIcons;

const AITools = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedLevel, setSelectedLevel] = useState('Alle');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Alle', 'Tekstverwerking', 'Presentaties', 'Beeldbewerking', 
    'Onderzoek', 'Programmeren', 'Creatief'
  ];
  
  const levels = ['Alle', 'Beginner', 'Gemiddeld', 'Gevorderd'];

  const tools = [
    {
      name: "ChatGPT",
      category: "Tekstverwerking",
      level: "Beginner",
      rating: 4.8,
      description: "Veelzijdige AI-assistent voor tekst generatie, bewerking en conversatie",
      features: ["Tekstgeneratie", "Vraag & antwoord", "Code schrijven", "Vertalingen"],
      pricing: "Freemium",
      education: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      useCase: "Lesvoorbereiding, feedback op teksten, brainstormsessies",
      link: "https://chat.openai.com"
    },
    {
      name: "Canva AI",
      category: "Beeldbewerking",
      level: "Beginner",
      rating: 4.6,
      description: "Grafisch ontwerp met AI-ondersteuning voor presentaties en lesmateriaal",
      features: ["Design templates", "AI afbeeldingen", "Presentaties", "Infographics"],
      pricing: "Freemium",
      education: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      useCase: "Visuele lesmateriaal, posters, presentaties",
      link: "https://www.canva.com"
    },
    {
      name: "Gamma",
      category: "Presentaties",
      level: "Beginner",
      rating: 4.5,
      description: "AI-powered presentaties maken in enkele minuten",
      features: ["Auto-layout", "Content suggesties", "Templates", "Collaboratie"],
      pricing: "Freemium",
      education: true,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      useCase: "Snelle presentaties, lesplannen, student projecten",
      link: "https://gamma.app"
    },
    {
      name: "Perplexity AI",
      category: "Onderzoek",
      level: "Gemiddeld",
      rating: 4.7,
      description: "AI zoekengine met bronvermelding voor betrouwbaar onderzoek",
      features: ["Bronvermelding", "Real-time info", "Samenvatting", "Follow-up vragen"],
      pricing: "Freemium",
      education: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      useCase: "Onderzoeksopdrachten, fact-checking, bronnen zoeken",
      link: "https://www.perplexity.ai"
    },
    {
      name: "GitHub Copilot",
      category: "Programmeren",
      level: "Gevorderd",
      rating: 4.4,
      description: "AI code assistent voor programmeeronderwijs",
      features: ["Code completion", "Functie suggesties", "Debugging", "Code uitleg"],
      pricing: "Gratis voor studenten",
      education: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      useCase: "Programmeren leren, code review, debugging",
      link: "https://github.com/features/copilot"
    },
    {
      name: "DALL-E 3",
      category: "Creatief",
      level: "Gemiddeld",
      rating: 4.6,
      description: "AI beeldgeneratie voor creatieve projecten",
      features: ["Tekst naar beeld", "Hoge kwaliteit", "Stijl variaties", "Bewerkingen"],
      pricing: "Betaald",
      education: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      useCase: "Illustraties maken, creatieve opdrachten, conceptvisualisatie",
      link: "https://openai.com/dall-e-3"
    },
    {
      name: "Quillbot",
      category: "Tekstverwerking",
      level: "Beginner",
      rating: 4.3,
      description: "AI parafrasering en grammatica controle tool",
      features: ["Parafrasering", "Grammatica check", "Samenvatting", "Citatie hulp"],
      pricing: "Freemium",
      education: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      useCase: "Tekst verbeteren, plagiaatpreventie, schrijfhulp",
      link: "https://quillbot.com"
    },
    {
      name: "Synthesia",
      category: "Presentaties",
      level: "Gevorderd",
      rating: 4.2,
      description: "AI video's maken met virtuele presentatoren",
      features: ["AI avatars", "Meertalig", "Custom branding", "Templates"],
      pricing: "Betaald",
      education: true,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      useCase: "Instructievideo's, online lessen, presentaties",
      link: "https://www.synthesia.io"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'Alle' || tool.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Alle' || tool.level === selectedLevel;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Tools voor het Onderwijs
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Ontdek de beste AI-tools voor docenten. Getest, beoordeeld en voorzien van praktische tips voor gebruik in de klas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek AI-tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Niveau:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={tool.image} alt={tool.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {tool.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{tool.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{tool.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="text-yellow-400 text-sm" />
                      <span className="text-sm font-medium">{tool.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Functies:</div>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.slice(0, 3).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{tool.features.length - 3} meer</span>
                      )}
                    </div>
                  </div>

                  {/* Use Case */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Gebruik in onderwijs:</div>
                    <p className="text-sm text-gray-600">{tool.useCase}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tool.pricing === 'Freemium' || tool.pricing === 'Gratis voor studenten'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {tool.pricing}
                      </span>
                      {tool.education && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Onderwijs
                        </span>
                      )}
                    </div>
                    <a 
                      href={tool.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 transition-colors p-2 rounded-full hover:bg-indigo-50"
                      aria-label={`Bezoek ${tool.name} website`}
                    >
                      <SafeIcon icon={FiExternalLink} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiTool} className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Geen tools gevonden</h3>
              <p className="text-gray-600">Probeer andere filters of zoektermen</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mis je een AI-tool?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Laat ons weten welke tools je graag toegevoegd zou zien
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Suggereer een Tool
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AITools;