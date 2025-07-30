import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import {downloadLesson} from '../../utils/downloadUtils';

const {FiBook,FiPlay,FiDownload,FiStar,FiUsers,FiArrowRight,FiExternalLink,FiFlag}=FiIcons;

const PO=()=> {
  const internationalTools=[ 
    {
      name: "Scratch for Educators",
      description: "Programmeren en algoritme-denken voor kinderen",
      grade: "Groep 6-8",
      subject: "ICT/Techniek",
      difficulty: "Beginner",
      url: "https://scratch.mit.edu/educators",
      tips: "Begin met eenvoudige animaties en bouw langzaam op naar interactieve verhalen"
    },
    {
      name: "Teachable Machine",
      description: "Kinderen leren AI-modellen maken zonder code",
      grade: "Groep 7-8",
      subject: "ICT/Wetenschap",
      difficulty: "Gemiddeld",
      url: "https://teachablemachine.withgoogle.com",
      tips: "Laat kinderen hun eigen beelden,geluiden of poses classificeren"
    },
    {
      name: "Quick,Draw!",
      description: "AI-spel dat tekeningen herkent",
      grade: "Groep 3-8",
      subject: "Tekenen/ICT",
      difficulty: "Beginner",
      url: "https://quickdraw.withgoogle.com",
      tips: "Geweldig om uit te leggen hoe AI patronen herkent en leert"
    },
    {
      name: "MIT App Inventor",
      description: "Eenvoudige apps maken met AI-componenten",
      grade: "Groep 7-8",
      subject: "ICT/Techniek",
      difficulty: "Gevorderd",
      url: "https://appinventor.mit.edu",
      tips: "Begin met eenvoudige apps voordat je AI-componenten toevoegt"
    } 
  ];

  const dutchTools=[ 
    {
      name: "CWI Informatica Actief",
      description: "Nederlandse AI-activiteiten zonder computer",
      grade: "Groep 4-8",
      subject: "Wiskunde/Logica",
      difficulty: "Beginner",
      url: "https://www.informatica-actief.nl",
      tips: "Perfect voor scholen met beperkte ICT-middelen"
    },
    {
      name: "Nationale AI-Cursus Kids",
      description: "Nederlandse versie van de Finse AI-cursus voor kinderen",
      grade: "Groep 6-8",
      subject: "Algemeen",
      difficulty: "Beginner",
      url: "https://course.elementsofai.com/nl",
      tips: "Gebruik hoofdstukken als basis voor klassendiscussies"
    },
    {
      name: "Robomind Academy",
      description: "Nederlandse robot-programmeer omgeving met AI",
      grade: "Groep 6-8",
      subject: "ICT/Techniek",
      difficulty: "Gemiddeld",
      url: "https://www.robomindacademy.com",
      tips: "Ideaal voor kennismaking met robotica en AI-concepten"
    },
    {
      name: "Code.org Nederlands",
      description: "Gratis programmeer- en AI-lessen in het Nederlands",
      grade: "Groep 3-8",
      subject: "ICT/Techniek",
      difficulty: "Beginner",
      url: "https://code.org/international/netherlands",
      tips: "Uitgebreide Nederlandse vertaling en lokale voorbeelden"
    },
    {
      name: "Digitale Geletterdheid",
      description: "Nederlandse platform voor digitale vaardigheden en AI",
      grade: "Groep 5-8",
      subject: "Mediawijsheid",
      difficulty: "Beginner",
      url: "https://www.digitalegeletterdheid.nl",
      tips: "Focus op veilig en bewust omgaan met AI-technologie"
    } 
  ];

  const lessons=[ 
    {
      title: "Wat is Kunstmatige Intelligentie?",
      description: "Introductie les over AI voor groep 6-8",
      duration: "45 minuten",
      materials: ["Werkblad","Video","Discussievragen"],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop"
    },
    {
      title: "AI in Ons Dagelijks Leven",
      description: "Herkennen van AI om ons heen",
      duration: "30 minuten",
      materials: ["Zoekspel","Poster","Huiswerkopdracht"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
    },
    {
      title: "Vriendelijke Robots",
      description: "Ethiek en veiligheid rond AI",
      duration: "60 minuten",
      materials: ["Rollenspel","Werkblad","Reflectievragen"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    } 
  ];

  const dutchExamples=[ 
    {
      title: "AI-Detectief in Amsterdam",
      description: "Groep 7 van BS De Regenboog gebruikt AI om verkeersdrukte te analyseren in hun buurt",
      result: "Leerlingen begrijpen nu hoe slimme verkeerslichten werken",
      school: "BS De Regenboog,Amsterdam",
      link: "https://www.aiinonderwijs.nl/blog/ai-detectief-amsterdam-project"
    },
    {
      title: "Dierenpark AI-Project",
      description: "Leerlingen trainen AI om dieren te herkennen in Artis met Teachable Machine",
      result: "Verhoogde interesse in biologie en technologie",
      school: "BS Het Kompas,Utrecht",
      link: "https://www.aiinonderwijs.nl/blog/dierenpark-ai-project-artis"
    },
    {
      title: "Weer Voorspellen met AI",
      description: "Groep 8 maakt weersverwachtingen en vergelijkt met AI-voorspellingen",
      result: "Beter begrip van patronen en voorspellingen",
      school: "BS De Klimop,Rotterdam",
      link: "https://www.aiinonderwijs.nl/blog/weer-voorspellen-ai-project"
    } 
  ];

  const examples=[ 
    {
      title: "Rekenen met Patronen",
      description: "Leerlingen ontdekken hoe AI patronen herkent in getallen en vormen",
      result: "80% beter begrip van wiskundige patronen"
    },
    {
      title: "Creatief Vertellen",
      description: "AI-tools als inspiratie voor eigen verhalen en karakters",
      result: "Meer motivatie en originelere verhalen"
    },
    {
      title: "Dieren Classificeren",
      description: "Teachable Machine gebruiken om dieren te sorteren",
      result: "Verhoogde nieuwsgierigheid naar biologie"
    } 
  ];

  const handleDownloadLesson = (lessonTitle) => {
    downloadLesson(lessonTitle);
  };

  return ( 
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" > 
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <motion.div initial={{opacity: 0,x: -50}} animate={{opacity: 1,x: 0}} > 
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> AI in het Basisonderwijs </h1> 
              <p className="text-xl text-blue-100 mb-8"> Maak kennis met kunstmatige intelligentie op een speelse en veilige manier. Perfect voor groep 1 t/m 8,met speciale aandacht voor Nederlandse tools en voorbeelden. </p> 
              <div className="flex flex-col sm:flex-row gap-4"> 
                <Link to="/leslab" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2" > 
                  <SafeIcon icon={FiBook} /> 
                  <span>Bekijk Lessen</span> 
                </Link> 
                <Link to="/nieuwsbrief" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2" > 
                  <SafeIcon icon={FiDownload} /> 
                  <span>Gratis Download</span> 
                </Link> 
              </div> 
            </motion.div> 
            <motion.div initial={{opacity: 0,x: 50}} animate={{opacity: 1,x: 0}} transition={{delay: 0.2}} > 
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" alt="Kinderen leren met AI" className="rounded-2xl shadow-2xl" /> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Nederlandse AI Tools Section */}
      <section className="py-20 bg-orange-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <div className="flex items-center justify-center space-x-2 mb-4"> 
              <SafeIcon icon={FiFlag} className="text-2xl text-orange-600" /> 
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900"> Nederlandse AI-Tools </h2> 
            </div> 
            <p className="text-xl text-gray-600"> Speciaal ontwikkeld voor het Nederlandse basisonderwijs </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {dutchTools.map((tool,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500" > 
                <div className="flex items-start justify-between mb-4"> 
                  <div className="flex items-center space-x-2"> 
                    <SafeIcon icon={FiFlag} className="text-orange-600" /> 
                    <h3 className="text-xl font-semibold text-gray-900"> {tool.name} </h3> 
                  </div> 
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors p-2 rounded-full hover:bg-orange-50" aria-label={`Bezoek ${tool.name} website`} > 
                    <SafeIcon icon={FiExternalLink} /> 
                  </a> 
                </div> 
                <p className="text-gray-600 mb-4">{tool.description}</p> 
                <div className="space-y-2 text-sm mb-4"> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Groep:</span> 
                    <span className="font-medium">{tool.grade}</span> 
                  </div> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Vak:</span> 
                    <span className="font-medium">{tool.subject}</span> 
                  </div> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Niveau:</span> 
                    <span className="font-medium">{tool.difficulty}</span> 
                  </div> 
                </div> 
                <div className="bg-orange-50 p-3 rounded-lg mb-4"> 
                  <div className="text-sm font-medium text-orange-900 mb-1">Nederlandse tip:</div> 
                  <div className="text-sm text-orange-800">{tool.tips}</div> 
                </div> 
                <div className="flex items-center justify-between"> 
                  <Link to="/ai-tools" className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center space-x-1" > 
                    <span>Meer info</span> 
                    <SafeIcon icon={FiArrowRight} /> 
                  </Link> 
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium inline-flex items-center space-x-2" > 
                    <span>Bezoek site</span> 
                    <SafeIcon icon={FiExternalLink} /> 
                  </a> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
          <div className="text-center mt-12"> 
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-6 max-w-4xl mx-auto"> 
              <div className="flex items-start space-x-3"> 
                <div className="bg-orange-200 p-2 rounded-full"> 
                  <SafeIcon icon={FiFlag} className="text-orange-700" /> 
                </div> 
                <div className="text-left"> 
                  <h3 className="font-semibold text-orange-800 mb-2">Voordelen van Nederlandse AI-tools</h3> 
                  <p className="text-orange-700 text-sm"> Nederlandse AI-tools zijn vaak beter afgestemd op ons onderwijssysteem,bevatten Nederlandse voorbeelden en zijn ontwikkeld met Nederlandse privacy-wetgeving in gedachten. Veel tools zijn ook gratis beschikbaar voor Nederlandse scholen. </p> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Internationale AI Tools Section */}
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Internationale AI-Tools </h2> 
            <p className="text-xl text-gray-600"> Bewezen effectieve AI-tools van over de hele wereld </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {internationalTools.map((tool,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow" > 
                <div className="flex items-start justify-between mb-4"> 
                  <h3 className="text-xl font-semibold text-gray-900"> {tool.name} </h3> 
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50" aria-label={`Bezoek ${tool.name} website`} > 
                    <SafeIcon icon={FiExternalLink} /> 
                  </a> 
                </div> 
                <p className="text-gray-600 mb-4">{tool.description}</p> 
                <div className="space-y-2 text-sm mb-4"> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Groep:</span> 
                    <span className="font-medium">{tool.grade}</span> 
                  </div> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Vak:</span> 
                    <span className="font-medium">{tool.subject}</span> 
                  </div> 
                  <div className="flex justify-between"> 
                    <span className="text-gray-500">Niveau:</span> 
                    <span className="font-medium">{tool.difficulty}</span> 
                  </div> 
                </div> 
                <div className="bg-blue-50 p-3 rounded-lg mb-4"> 
                  <div className="text-sm font-medium text-blue-900 mb-1">Tip voor docenten:</div> 
                  <div className="text-sm text-blue-800">{tool.tips}</div> 
                </div> 
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center justify-center space-x-2" > 
                  <span>Probeer nu</span> 
                  <SafeIcon icon={FiExternalLink} /> 
                </a> 
              </motion.div> 
            ))} 
          </div> 
          <div className="text-center mt-12"> 
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-4xl mx-auto"> 
              <div className="flex items-start space-x-3"> 
                <div className="bg-yellow-100 p-2 rounded-full"> 
                  <SafeIcon icon={FiUsers} className="text-yellow-600" /> 
                </div> 
                <div className="text-left"> 
                  <h3 className="font-semibold text-yellow-800 mb-2">Belangrijk voor PO-docenten</h3> 
                  <p className="text-yellow-700 text-sm"> Begeleid kinderen altijd bij het gebruik van AI-tools. Leg uit hoe AI werkt en bespreek wat ze zien. Gebruik AI als hulpmiddel,niet als vervanging voor eigen denken en creativiteit. Controleer altijd of content geschikt is voor de leeftijd. </p> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Lesson Examples */}
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Kant-en-klare Lessen </h2> 
            <p className="text-xl text-gray-600"> Direct inzetbare AI-lessen voor jouw klas </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {lessons.map((lesson,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" > 
                <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" /> 
                <div className="p-6"> 
                  <h3 className="text-xl font-semibold text-gray-900 mb-3"> {lesson.title} </h3> 
                  <p className="text-gray-600 mb-4">{lesson.description}</p> 
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4"> 
                    <span>{lesson.duration}</span> 
                    <div className="flex items-center space-x-1"> 
                      <SafeIcon icon={FiStar} className="text-yellow-400" /> 
                      <span>4.8</span> 
                    </div> 
                  </div> 
                  <div className="space-y-2 mb-4"> 
                    <div className="text-sm font-medium text-gray-700">Inclusief:</div> 
                    <div className="flex flex-wrap gap-2"> 
                      {lesson.materials.map((material,materialIndex)=> ( 
                        <span key={materialIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full" > 
                          {material} 
                        </span> 
                      ))} 
                    </div> 
                  </div> 
                  <button 
                    onClick={() => handleDownloadLesson(lesson.title)} 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
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

      {/* Nederlandse Success Stories */}
      <section className="py-20 bg-orange-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <div className="flex items-center justify-center space-x-2 mb-4"> 
              <SafeIcon icon={FiFlag} className="text-2xl text-orange-600" /> 
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900"> Nederlandse Praktijkvoorbeelden </h2> 
            </div> 
            <p className="text-xl text-gray-600"> Hoe Nederlandse PO-docenten AI succesvol inzetten </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {dutchExamples.map((example,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500" > 
                <div className="flex items-start justify-between mb-3"> 
                  <h3 className="text-xl font-semibold text-gray-900"> {example.title} </h3> 
                  <a href={example.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors p-2 rounded-full hover:bg-orange-50" aria-label={`Lees artikel over ${example.title}`} > 
                    <SafeIcon icon={FiExternalLink} /> 
                  </a> 
                </div> 
                <p className="text-gray-600 mb-4">{example.description}</p> 
                <div className="bg-orange-50 p-3 rounded-lg mb-3"> 
                  <div className="text-sm font-medium text-orange-900 mb-1">Resultaat:</div> 
                  <div className="text-orange-800 font-semibold">{example.result}</div> 
                </div> 
                <div className="flex items-center justify-between"> 
                  <div className="text-sm text-gray-500 font-medium"> {example.school} </div> 
                  <a href={example.link} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center space-x-1" > 
                    <span>Lees meer</span> 
                    <SafeIcon icon={FiArrowRight} /> 
                  </a> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* International Success Stories */}
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> Internationale Voorbeelden </h2> 
            <p className="text-xl text-gray-600"> Inspiratie van over de hele wereld </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {examples.map((example,index)=> ( 
              <motion.div key={index} initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} transition={{delay: index * 0.1}} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl" > 
                <h3 className="text-xl font-semibold text-gray-900 mb-3"> {example.title} </h3> 
                <p className="text-gray-600 mb-4">{example.description}</p> 
                <div className="bg-white p-3 rounded-lg"> 
                  <div className="text-sm font-medium text-gray-700 mb-1">Resultaat:</div> 
                  <div className="text-green-600 font-semibold">{example.result}</div> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* CTA Section */}
      <section className="py-20 bg-blue-600"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} > 
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"> Start met AI in jouw PO-klas </h2> 
            <p className="text-xl text-blue-100 mb-8"> Download onze complete startersgids voor AI in het Nederlandse basisonderwijs </p> 
            <Link to="/nieuwsbrief" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2" > 
              <SafeIcon icon={FiDownload} /> 
              <span>Gratis PO Startersgids</span> 
            </Link> 
          </motion.div> 
        </div> 
      </section> 
    </motion.div> 
  );
};

export default PO;