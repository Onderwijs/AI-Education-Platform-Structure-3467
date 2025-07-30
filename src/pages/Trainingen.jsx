import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiUsers,FiCalendar,FiBook,FiCertificate,FiCheck,FiExternalLink,FiMail}=FiIcons;

const Trainingen=()=> {
  const trainings=[ 
    {
      title: "AI-geletterdheid in het VO en MBO",
      level: "Beginner",
      duration: "4 daagse training",
      format: "Blended Learning",
      audience: "Docenten VO & MBO",
      topics: [ 
        "De basis van AI begrijpen",
        "Effectief werken met AI-tools",
        "AI inzetten voor leeractiviteiten",
        "AI-tools beoordelen op kwaliteit" 
      ],
      price: "€2299",
      nextDates: ["27 oktober - 8 december 2025"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      link: "https://www.sbo.nl/onderwijs/ai-geletterdheid-vo-mbo/?utm_source=adwords&utm_medium=cpc&gad_source=1&gad_campaignid=22685281594&gbraid=0AAAAACe7qgq29d_j5EkmQLFfavKJ-IINy&gclid=Cj0KCQjwhafEBhCcARIsAEGZEKLICj1n3maa-DTYAMs2khE2PVXuSOAiBnWEdHn7_6CljWX_eMVjUU8aAhrfEALw_wcB",
      isExternal: true,
      organizer: "Studiecentrum SBO"
    },
    {
      title: "Werk slim met AI",
      level: "Beginner",
      duration: "3 dagen",
      format: "Live",
      audience: "Docenten & Schoolleiders",
      topics: [ 
        "Praktische AI-toepassingen",
        "AI-tools leren gebruiken",
        "AI-prompts schrijven",
        "Ethische aspecten van AI" 
      ],
      price: "Prijs op aanvraag",
      nextDates: ["Meerdere data beschikbaar"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      link: "https://onderwijs-ai.nl/opleidingen/werk-slim-met-ai",
      isExternal: true,
      organizer: "Onderwijs-AI"
    },
    {
      title: "ChatGPT en AI in de klas",
      level: "Beginner",
      duration: "Online training",
      format: "Online",
      audience: "Docenten alle niveaus",
      topics: [ 
        "Praktische toepassing van ChatGPT",
        "AI-tools voor lesvoorbereiding",
        "Veilig gebruik van AI in onderwijs",
        "Hands-on oefeningen en voorbeelden" 
      ],
      price: "€195",
      nextDates: ["Continu beschikbaar"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      link: "https://www.docentenbijscholing.nl/chatgpt-en-ai-in-de-klas/",
      isExternal: true,
      organizer: "Docentenbijscholing.nl"
    } 
  ];

  const benefits=[ 
    {
      title: "Praktijkgericht",
      description: "Direct toepasbaar in jouw lessen en onderwijscontext"
    },
    {
      title: "Persoonlijke begeleiding",
      description: "Kleine groepen met ruimte voor individuele vragen"
    },
    {
      title: "Inclusief materialen",
      description: "Toegang tot onze complete toolkit en lesideeën"
    },
    {
      title: "Certificering",
      description: "Erkend certificaat voor je professionele ontwikkeling"
    } 
  ];

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return ( 
    <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      className="min-h-screen" 
    > 
      {/* Hero Section */} 
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <motion.div 
              initial={{opacity: 0,x: -50}} 
              animate={{opacity: 1,x: 0}} 
            > 
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> 
                AI Trainingen voor Onderwijsprofessionals 
              </h1> 
              <p className="text-xl text-blue-100 mb-8"> 
                Praktische workshops en cursussen om AI effectief te integreren in jouw onderwijspraktijk. Voor alle niveaus en onderwijslagen. 
              </p> 
              <div className="flex flex-col sm:flex-row gap-4"> 
                <a 
                  href="#trainingen" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2" 
                > 
                  <SafeIcon icon={FiCalendar} /> 
                  <span>Bekijk Trainingen</span> 
                </a> 
              </div> 
            </motion.div> 
            <motion.div 
              initial={{opacity: 0,x: 50}} 
              animate={{opacity: 1,x: 0}} 
              transition={{delay: 0.2}} 
            > 
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="AI training voor docenten" 
                className="rounded-2xl shadow-2xl" 
              /> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Benefits Section */} 
      <section className="py-16 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-12" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Trainingen? 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Wij geloven in praktijkgericht leren met direct toepasbare kennis en vaardigheden 
            </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {benefits.map((benefit,index)=> ( 
              <motion.div 
                key={index} 
                initial={{opacity: 0,y: 50}} 
                whileInView={{opacity: 1,y: 0}} 
                viewport={{once: true}} 
                transition={{delay: index * 0.1}} 
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow text-center" 
              > 
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"> 
                  <SafeIcon icon={FiCheck} className="text-xl text-blue-600" /> 
                </div> 
                <h3 className="text-xl font-semibold text-gray-900 mb-2"> 
                  {benefit.title} 
                </h3> 
                <p className="text-gray-600"> 
                  {benefit.description} 
                </p> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Trainings Section */} 
      <section id="trainingen" className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-16" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Onze Trainingen 
            </h2> 
            <p className="text-xl text-gray-600"> 
              Van beginnende tot ervaren AI-gebruikers in het onderwijs 
            </p> 
          </motion.div> 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> 
            {trainings.map((training,index)=> ( 
              <motion.div 
                key={index} 
                initial={{opacity: 0,y: 50}} 
                whileInView={{opacity: 1,y: 0}} 
                viewport={{once: true}} 
                transition={{delay: index * 0.1}} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" 
              > 
                <img 
                  src={training.image} 
                  alt={training.title} 
                  className="w-full h-48 object-cover" 
                /> 
                <div className="p-6"> 
                  <div className="flex items-center justify-between mb-3"> 
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"> 
                      {training.level} 
                    </span> 
                    <div className="flex items-center space-x-2 text-sm text-gray-500"> 
                      <SafeIcon icon={FiCalendar} className="text-gray-400" /> 
                      <span>{training.duration}</span> 
                    </div> 
                  </div> 
                  <h3 className="text-xl font-semibold text-gray-900 mb-2"> 
                    {training.title} 
                  </h3> 
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4"> 
                    <SafeIcon icon={FiUsers} className="text-gray-400" /> 
                    <span>{training.audience}</span> 
                    <span className="text-gray-300">•</span> 
                    <span>{training.format}</span> 
                  </div> 
                  <div className="mb-4"> 
                    <div className="text-sm font-medium text-gray-700 mb-2">Wat je leert:</div> 
                    <ul className="space-y-1"> 
                      {training.topics.map((topic,topicIndex)=> ( 
                        <li key={topicIndex} className="text-sm text-gray-600 flex items-start space-x-2"> 
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div> 
                          <span>{topic}</span> 
                        </li> 
                      ))} 
                    </ul> 
                  </div> 
                  <div className="mb-4"> 
                    <div className="text-sm font-medium text-gray-700 mb-2">Komende data:</div> 
                    <ul className="space-y-1"> 
                      {training.nextDates.map((date,dateIndex)=> ( 
                        <li key={dateIndex} className="text-sm text-gray-600"> 
                          {date} 
                        </li> 
                      ))} 
                    </ul> 
                  </div> 
                  <div className="flex items-center justify-between pt-4 border-t"> 
                    <div className="text-xl font-bold text-gray-900"> 
                      {training.price}
                      {training.isExternal && training.price !== "Prijs op aanvraag" && (
                        <span className="text-sm text-gray-500 block">excl. BTW</span>
                      )}
                    </div> 
                    {training.isExternal ? (
                      <button 
                        onClick={() => handleExternalLink(training.link)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <span>Inschrijven</span>
                        <SafeIcon icon={FiExternalLink} className="text-sm" />
                      </button>
                    ) : (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"> 
                        Inschrijven 
                      </button>
                    )}
                  </div>
                  {training.organizer && (
                    <div className="mt-3 text-sm text-gray-500">
                      Georganiseerd door {training.organizer}
                    </div>
                  )}
                </div> 
              </motion.div> 
            ))} 
          </div> 

          {/* Contact Text for Training Providers */}
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="mt-16 text-center"
          > 
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <SafeIcon icon={FiMail} className="text-xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Voor Trainingsaanbieders
                </h3>
              </div>
              <p className="text-gray-700 mb-6">
                Wil je ook jouw training hier vermeld zien? We helpen graag andere onderwijsprofessionals 
                om de juiste AI-training te vinden.
              </p>
              <Link 
                to="/over-ons#contact" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiMail} />
                <span>Stuur een bericht</span>
              </Link>
            </div>
          </motion.div>
        </div> 
      </section> 

      {/* CTA Section */} 
      <section className="py-20 bg-blue-600"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"> 
              Klaar om AI te integreren in jouw onderwijs? 
            </h2> 
            <p className="text-xl text-blue-100 mb-8"> 
              Schrijf je in voor een training of vraag meer informatie aan 
            </p> 
            <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
              <a 
                href="#trainingen" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" 
              > 
                Bekijk trainingen 
              </a> 
            </div> 
          </motion.div> 
        </div> 
      </section> 
    </motion.div> 
  );
};

export default Trainingen;