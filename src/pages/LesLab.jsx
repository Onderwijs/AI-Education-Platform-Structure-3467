import React,{useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {downloadLesson} from '../utils/downloadUtils';

const {FiBook,FiDownload,FiCalendar,FiFilter,FiStar,FiClock,FiUsers,FiCheck}=FiIcons;

const LesLab=()=> {
  const [selectedMonth,setSelectedMonth]=useState('Alle');
  const [selectedLevel,setSelectedLevel]=useState('Alle');
  const [downloadStarted,setDownloadStarted]=useState(false);

  const months=['Alle','Januari','Februari','Maart','April','Mei','Juni'];
  const levels=['Alle','PO','VO','MBO/HBO'];

  const currentLesson={
    title: "AI-Geassisteerd Creatief Schrijven",
    month: "Augustus 2025",
    level: "VO",
    subject: "Nederlands",
    duration: "2 lesuren",
    description: "Leerlingen gebruiken AI-tools om hun creativiteit te stimuleren en betere verhalen te schrijven.",
    objectives: [ 
      "Begrijpen hoe AI kan helpen bij creatieve processen",
      "Ethisch gebruik van AI bij schrijfopdrachten",
      "Ontwikkelen van eigen schrijfstijl met AI-ondersteuning" 
    ],
    materials: ["Lesplan","Werkbladen","AI-prompt templates","Beoordelingsrubric"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
  };

  const archive=[ 
    {
      title: "Introductie tot AI voor Kinderen",
      month: "Augustus 2025",
      level: "PO",
      subject: "Algemeen",
      duration: "45 min",
      rating: 4.9,
      downloads: 1250,
      description: "Speelse kennismaking met AI-concepten voor groep 6-8",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop"
    },
    {
      title: "AI in de Geschiedenis",
      month: "Augustus 2025",
      level: "VO",
      subject: "Geschiedenis",
      duration: "50 min",
      rating: 4.7,
      downloads: 890,
      description: "Hoe AI historisch onderzoek kan ondersteunen",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
    },
    {
      title: "Datavisualisatie met AI",
      month: "Augustus 2025",
      level: "MBO/HBO",
      subject: "Wiskunde/Data",
      duration: "90 min",
      rating: 4.8,
      downloads: 650,
      description: "Complexe data begrijpelijk maken met AI-tools",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
    },
    {
      title: "AI Ethics Debat",
      month: "Augustus 2025",
      level: "VO",
      subject: "Maatschappijleer",
      duration: "100 min",
      rating: 4.6,
      downloads: 1100,
      description: "Discussie over ethische aspecten van AI",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=300&h=200&fit=crop"
    },
    {
      title: "AI Kunstproject",
      month: "Augustus 2025",
      level: "PO",
      subject: "Tekenen",
      duration: "60 min",
      rating: 4.5,
      downloads: 800,
      description: "Creatieve kunstwerken maken met AI-ondersteuning",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop"
    },
    {
      title: "Programmeren met AI Copilot",
      month: "Augustus 2025",
      level: "MBO/HBO",
      subject: "Informatica",
      duration: "120 min",
      rating: 4.9,
      downloads: 750,
      description: "Leren programmeren met AI-assistentie",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop"
    } 
  ];

  const filteredLessons=archive.filter(lesson=> {
    const matchesMonth=selectedMonth==='Alle' || lesson.month.includes(selectedMonth);
    const matchesLevel=selectedLevel==='Alle' || lesson.level===selectedLevel;
    return matchesMonth && matchesLevel;
  });

  const handleDownload=(lessonTitle)=> {
    setDownloadStarted(true);
    downloadLesson(lessonTitle);
    // Reset the download state after a delay for UI feedback
    setTimeout(()=> {
      setDownloadStarted(false);
    },2000);
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity: 0,y: 50}} animate={{opacity: 1,y: 0}} className="text-center" >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              LesLab: AI-Lessen
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Kant-en-klare AI-lessen. Compleet met lesplan,materialen en docentenhandleiding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Lesson Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uitgelicht: Nieuwe Les
            </h2>
            <p className="text-xl text-gray-600">
              Vers uit het LesLab en direct te gebruiken
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity: 0,x: -50}} whileInView={{opacity: 1,x: 0}} viewport={{once: true}} >
              <img src={currentLesson.image} alt={currentLesson.title} className="rounded-2xl shadow-2xl" />
            </motion.div>
            <motion.div initial={{opacity: 0,x: 50}} whileInView={{opacity: 1,x: 0}} viewport={{once: true}} >
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
              <p className="text-gray-600 mb-6">
                {currentLesson.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Leerdoelen:</h4>
                <ul className="space-y-2">
                  {currentLesson.objectives.map((objective,index)=> (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Inclusief materialen:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentLesson.materials.map((material,index)=> (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm" >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={()=> handleDownload(currentLesson.title)}
                disabled={downloadStarted}
                className={`bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 ${downloadStarted ? 'opacity-75' : ''}`}
              >
                <SafeIcon icon={downloadStarted ? FiCheck : FiDownload} />
                <span>{downloadStarted ? 'Download gestart...' : 'Download Complete Les'}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lesarchief
            </h2>
            <p className="text-xl text-gray-600">
              Alle voorgaande lessen uit het LesLab
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-500" />
              <select
                value={selectedMonth}
                onChange={(e)=> setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {months.map(month=> (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiUsers} className="text-gray-500" />
              <select
                value={selectedLevel}
                onChange={(e)=> setSelectedLevel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {levels.map(level=> (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLessons.map((lesson,index)=> (
              <motion.div
                key={index}
                initial={{opacity: 0,y: 50}}
                whileInView={{opacity: 1,y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                      {lesson.level}
                    </span>
                    <span className="text-sm text-gray-500">{lesson.month}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{lesson.subject}</p>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="text-yellow-400" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {lesson.downloads} downloads
                    </span>
                    <button
                      onClick={()=> handleDownload(lesson.title)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiDownload} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLessons.length===0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiBook} className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Geen lessen gevonden</h3>
              <p className="text-gray-600">Probeer andere filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mis nooit meer een nieuwe les
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Laat weten welke les je graag toegevoegd zou zien. Suggereer een les.
            </p>
            <button 
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-not-allowed"
              disabled
            >
              ai.onderwijs@gmail.com
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default LesLab;
