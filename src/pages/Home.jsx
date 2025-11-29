import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { downloadStartersgids } from '../utils/downloadUtils';

const { FiDownload, FiBook, FiUsers, FiTool, FiTrendingUp, FiArrowRight, FiCheck, FiStar } = FiIcons;

const Home = () => {
  const topTools = [
    { name: "ChatGPT", category: "Algemeen", desc: "De basis voor elke docent.", link: "/tools/chatgpt" },
    { name: "Claude", category: "Analyse", desc: "Sterk in grote teksten.", link: "/tools/claude" },
    { name: "Gamma", category: "Presentatie", desc: "Maak slides in seconden.", link: "/tools/gamma" }
  ];

  const topLessons = [
    { title: "Introductie AI", level: "PO/VO", link: "/leslab" },
    { title: "ChatGPT Prompting", level: "VO/MBO", link: "/leslab" },
    { title: "AI Ethiek", level: "Alle niveaus", link: "/leslab" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block py-1 px-3 rounded-full bg-primary-500/30 border border-primary-400 text-primary-100 text-sm font-semibold mb-6">
                NIEUW: Lesmateriaal 2025
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                AI in het Onderwijs
                <span className="block text-primary-200 text-3xl md:text-4xl mt-2 font-bold">Tools, Lessen & Trainingen</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-lg leading-relaxed">
                Het centrale platform voor docenten. Ontdek praktische tools, download kant-en-klare lessen en volg professionele trainingen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={downloadStartersgids}
                  className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 transform hover:-translate-y-1"
                >
                  <SafeIcon icon={FiDownload} className="text-xl" />
                  <span>Download Gids V9.0</span>
                </button>
                <Link 
                  to="/tools" 
                  className="bg-primary-800/50 backdrop-blur-sm border-2 border-primary-400 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700/50 transition-all flex items-center justify-center space-x-3"
                >
                  <SafeIcon icon={FiTool} />
                  <span>Probeer AI Tools</span>
                </Link>
              </div>

              <div className="mt-10 flex items-center space-x-6 text-sm font-medium text-primary-100">
                <div className="flex items-center"><SafeIcon icon={FiCheck} className="mr-2" /> 2.500+ Docenten</div>
                <div className="flex items-center"><SafeIcon icon={FiCheck} className="mr-2" /> 100% Gratis materiaal</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-primary-500/30 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                alt="AI in Education" 
                className="rounded-2xl shadow-2xl border-4 border-primary-400/30 relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top 3 Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Top 3 Tools */}
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="bg-indigo-600 p-2 rounded-lg mr-3">
                    <SafeIcon icon={FiTool} className="text-white" />
                  </span>
                  Populaire AI Tools
                </h2>
                <Link to="/ai-tools" className="text-indigo-600 font-semibold hover:underline">Alle tools &rarr;</Link>
              </div>
              <div className="space-y-4">
                {topTools.map((tool, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.desc}</p>
                    </div>
                    <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">{tool.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 3 Lessons */}
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="bg-emerald-600 p-2 rounded-lg mr-3">
                    <SafeIcon icon={FiBook} className="text-white" />
                  </span>
                  Uitgelicht Lesmateriaal
                </h2>
                <Link to="/leslab" className="text-emerald-600 font-semibold hover:underline">Naar LesLab &rarr;</Link>
              </div>
              <div className="space-y-4">
                {topLessons.map((lesson, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                      <div className="flex items-center mt-1">
                        <SafeIcon icon={FiStar} className="text-yellow-400 text-xs mr-1" />
                        <span className="text-sm text-gray-500">Meest gedownload</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">{lesson.level}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Direct aan de slag</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/tools" className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-b-4 border-indigo-500">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <SafeIcon icon={FiTool} className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interne Tools</h3>
              <p className="text-gray-600 mb-4">Gebruik onze lesgenerator, toetsvragenmaker en meer.</p>
              <span className="text-indigo-600 font-medium group-hover:translate-x-2 transition-transform inline-block">&rarr;</span>
            </Link>

            <Link to="/leslab" className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-b-4 border-emerald-500">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <SafeIcon icon={FiBook} className="text-2xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">LesLab</h3>
              <p className="text-gray-600 mb-4">Download complete lesbrieven en werkbladen.</p>
              <span className="text-emerald-600 font-medium group-hover:translate-x-2 transition-transform inline-block">&rarr;</span>
            </Link>

            <Link to="/trainingen" className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-b-4 border-pink-500">
              <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <SafeIcon icon={FiUsers} className="text-2xl text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trainingen</h3>
              <p className="text-gray-600 mb-4">Professionaliseer jezelf en je team met AI kennis.</p>
              <span className="text-pink-600 font-medium group-hover:translate-x-2 transition-transform inline-block">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;