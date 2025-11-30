import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { downloadLesson } from '../utils/downloadUtils';
import { lessons } from '../data/lessons';

const { FiBook, FiDownload, FiCalendar, FiFilter, FiStar, FiClock, FiUsers, FiCheck, FiList, FiActivity } = FiIcons;

const LesLab = () => {
  const [selectedMonth, setSelectedMonth] = useState('Alle');
  const [selectedLevel, setSelectedLevel] = useState('Alle');
  const [downloadStarted, setDownloadStarted] = useState(false);

  const months = ['Alle', 'oktober 2025', 'november 2025', 'december 2025', 'januari 2025'];
  const levels = ['Alle', 'PO', 'VO', 'MBO/HBO'];

  // Haal de "Hero" les op (de eerste in de array, of specifiek op ID)
  const currentLesson = lessons[0];

  // De rest van de lessen voor het archief
  const archive = lessons.slice(1);

  const filteredLessons = archive.filter(lesson => {
    const matchesMonth = selectedMonth === 'Alle' || (lesson.month && lesson.month.includes(selectedMonth));
    const matchesLevel = selectedLevel === 'Alle' || lesson.level === selectedLevel;
    return matchesMonth && matchesLevel;
  });

  const handleDownload = (lessonTitle) => {
    setDownloadStarted(true);
    // Nu roepen we de geüpdatete functie aan die de CONTENT ophaalt
    downloadLesson(lessonTitle);
    
    setTimeout(() => {
      setDownloadStarted(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              LesLab: AI-Lessen
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Professioneel lesmateriaal voor PO, VO en MBO/HBO. Didactisch onderbouwd en direct inzetbaar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Lesson Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uitgelicht: Onderzoek & AI
            </h2>
            <p className="text-xl text-gray-600">
              Een diepgaande module voor MBO/HBO over bronverificatie en methodologie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={currentLesson.image} 
                alt={currentLesson.title} 
                className="rounded-2xl shadow-2xl mb-6 w-full object-cover"
              />
              {/* Preview of Phases */}
              {currentLesson.lessonPhases && (
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <SafeIcon icon={FiList} /> Lesopbouw
                  </h4>
                  <div className="space-y-4">
                    {currentLesson.lessonPhases.slice(0, 3).map((phase, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{phase.title}</span>
                          <span className="text-gray-600">{phase.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentLesson.level}
                </span>
                <span className="text-gray-500">{currentLesson.subject}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{currentLesson.duration}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {currentLesson.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {currentLesson.description}
              </p>

              {currentLesson.goals && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="text-emerald-600" /> Leerdoelen:
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.goals.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentLesson.materials && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Inclusief materialen:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.materials.map((material, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => handleDownload(currentLesson.title)}
                disabled={downloadStarted}
                className={`bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${downloadStarted ? 'opacity-75' : ''}`}
              >
                <SafeIcon icon={downloadStarted ? FiCheck : FiDownload} />
                <span>{downloadStarted ? 'Download gestart...' : 'Download Complete Lesbrief (PDF)'}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-20 bg-gray-50 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lesarchief
            </h2>
            <p className="text-xl text-gray-600">
              Alle beschikbare lessen uit het LesLab
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-500" />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiUsers} className="text-gray-500" />
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {filteredLessons.map((lesson, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                    {lesson.level}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    <span>{lesson.subject}</span>
                    <span>{lesson.month}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
                    {lesson.summary || lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="text-yellow-400" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDownload(lesson.title)}
                    className="w-full bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2 font-medium border border-emerald-100"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>Download Lesbrief</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12 mb-32">
              <SafeIcon icon={FiBook} className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Geen lessen gevonden</h3>
              <p className="text-gray-600">Probeer andere filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 pt-32 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mis nooit meer een nieuwe les
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Laat weten welke les je graag toegevoegd zou zien. Suggereer een les.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-not-allowed" disabled>
              ai.onderwijs@gmail.com
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default LesLab;