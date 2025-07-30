import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import {downloadLesson} from '../../utils/downloadUtils';

const {FiBook,FiTool,FiDownload,FiStar,FiTrendingUp,FiArrowRight}=FiIcons;

const VO=()=> {
  const subjects=[ 
    {
      name: "Nederlands",
      tools: ["AI Tekstanalyse","Schrijfassistent","Literatuuronderzoek"],
      icon: FiBook,
      color: "bg-red-100 text-red-600"
    },
    {
      name: "Wiskunde",
      tools: ["AI Probleemoplosser","Grafiekgenerator","Statistiek Tools"],
      icon: FiTrendingUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Geschiedenis",
      tools: ["Tijdlijn Generator","Bronnenanalyse","Virtual Reality Tours"],
      icon: FiBook,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      name: "Biologie",
      tools: ["3D Modellen","Data Visualisatie","Simulaties"],
      icon: FiTool,
      color: "bg-green-100 text-green-600"
    } 
  ];

  const lessons=[ 
    {
      title: "AI en Ethiek",
      level: "HAVO/VWO 4-6",
      subject: "Maatschappijleer",
      duration: "2 lesuren",
      description: "Discussie over de impact van AI op de samenleving",
      skills: ["Kritisch denken","Debatteren","Onderzoek"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop"
    },
    {
      title: "ChatGPT voor Onderzoek",
      level: "VMBO-VWO 3-6",
      subject: "Alle vakken",
      duration: "1 lesuur",
      description: "Effectief gebruik van AI voor schoolonderzoek",
      skills: ["Bronvermelding","Fact-checking","Onderzoeksvaardigheden"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
    },
    {
      title: "AI in de Creatieve Vakken",
      level: "VMBO-VWO 1-6",
      subject: "CKV/Tekenen",
      duration: "3 lesuren",
      description: "Kunstwerken maken met AI-ondersteuning",
      skills: ["Creativiteit","Techniek","Reflectie"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    } 
  ];

  const examPrep=[ 
    {
      subject: "Nederlands",
      tools: ["Essay feedback","Woordenschat trainer","Literatuur quiz"],
      improvement: "25% betere cijfers"
    },
    {
      subject: "Wiskunde",
      tools: ["Stap-voor-stap uitleg","Oefenopgaven","Formule helper"],
      improvement: "30% minder fouten"
    },
    {
      subject: "Engels",
      tools: ["Conversatie bot","Grammatica checker","Vocabulaire spellen"],
      improvement: "40% beter begrip"
    } 
  ];
  
  const handleDownloadLesson = (lessonTitle) => {
    downloadLesson(lessonTitle);
  };

  return ( 
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" > 
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <motion.div initial={{opacity: 0,x: -50}} animate={{opacity: 1,x: 0}} > 
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> AI in het Voortgezet Onderwijs </h1> 
              <p className="text-xl text-purple-100 mb-8"> Bereid leerlingen voor op de toekomst met praktische AI-toepassingen voor alle vakken en niveaus. </p> 
              <div className="flex flex-col sm:flex-row gap-4"> 
                <Link to="/ai-tools" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2" > 
                  <SafeIcon icon={FiTool} /> 
                  <span>Bekijk Tools</span> 
                </Link> 
                <Link to="/trainingen" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors flex items-center space-x-2" > 
                  <SafeIcon icon={FiBook} /> 
                  <span>VO Trainingen</span> 
                </Link> 
              </div> 
            </motion.div> 
            <motion.div initial={{opacity: 0,x: 50}} animate={{opacity: 1,x: 0}} transition={{delay: 0.2}} > 
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="VO leerlingen met AI" className="rounded-2xl shadow-2xl" /> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Subject-specific Tools */}
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> AI-Tools per Vak </h2> 
            <p className="text-xl text-gray-600"> Vakspecifieke AI-toepassingen voor het VO </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
            {subjects.map((subject,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow" > 
                <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center mb-4`}> 
                  <SafeIcon icon={subject.icon} className="text-xl" /> 
                </div> 
                <h3 className="text-xl font-semibold text-gray-900 mb-3"> {subject.name} </h3> 
                <ul className="space-y-2"> 
                  {subject.tools.map((tool,toolIndex)=> ( 
                    <li key={toolIndex} className="text-sm text-gray-600 flex items-center space-x-2"> 
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div> 
                      <span>{tool}</span> 
                    </li> 
                  ))} 
                </ul> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Lesson Examples */}
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Praktische AI-Lessen </h2> 
            <p className="text-xl text-gray-600"> Ready-to-use lessen voor verschillende niveaus </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {lessons.map((lesson,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" > 
                <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" /> 
                <div className="p-6"> 
                  <div className="flex items-center justify-between mb-3"> 
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"> {lesson.level} </span> 
                    <span className="text-sm text-gray-500">{lesson.duration}</span> 
                  </div> 
                  <h3 className="text-xl font-semibold text-gray-900 mb-2"> {lesson.title} </h3> 
                  <p className="text-sm text-gray-600 mb-3">{lesson.subject}</p> 
                  <p className="text-gray-600 mb-4">{lesson.description}</p> 
                  <div className="mb-4"> 
                    <div className="text-sm font-medium text-gray-700 mb-2">Vaardigheden:</div> 
                    <div className="flex flex-wrap gap-2"> 
                      {lesson.skills.map((skill,skillIndex)=> ( 
                        <span key={skillIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full" > {skill} </span> 
                      ))} 
                    </div> 
                  </div> 
                  <button 
                    onClick={() => handleDownloadLesson(lesson.title)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                  > 
                    <SafeIcon icon={FiDownload} /> 
                    <span>Download Les</span> 
                  </button> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Exam Preparation */}
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> AI voor Examenvoorbereiding </h2> 
            <p className="text-xl text-gray-600"> Verbeter resultaten met slimme AI-ondersteuning </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {examPrep.map((prep,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl" > 
                <h3 className="text-xl font-semibold text-gray-900 mb-4"> {prep.subject} </h3> 
                <ul className="space-y-2 mb-4"> 
                  {prep.tools.map((tool,toolIndex)=> ( 
                    <li key={toolIndex} className="text-gray-600 flex items-center space-x-2"> 
                      <SafeIcon icon={FiStar} className="text-yellow-400 text-sm" /> 
                      <span>{tool}</span> 
                    </li> 
                  ))} 
                </ul> 
                <div className="bg-white p-3 rounded-lg"> 
                  <div className="text-sm font-medium text-gray-700 mb-1">Resultaat:</div> 
                  <div className="text-green-600 font-semibold">{prep.improvement}</div> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* CTA Section */}
      <section className="py-20 bg-purple-600"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} > 
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"> Transformeer jouw VO-lessen met AI </h2> 
            <p className="text-xl text-purple-100 mb-8"> Download onze complete VO-toolkit en start vandaag nog </p> 
            <Link to="/nieuwsbrief" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2" > 
              <SafeIcon icon={FiDownload} /> 
              <span>Gratis VO Toolkit</span> 
            </Link> 
          </motion.div> 
        </div> 
      </section> 
    </motion.div> 
  );
};

export default VO;