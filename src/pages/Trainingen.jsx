import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiCalendar, FiBook, FiCertificate, FiCheck, FiDownload } = FiIcons;

const Trainingen = () => {
  const trainings = [
    {
      title: "AI Basis Masterclass",
      level: "Beginner",
      duration: "1 dag",
      format: "Live + Online",
      audience: "Alle docenten",
      topics: [
        "Introductie tot AI in onderwijs",
        "ChatGPT effectief gebruiken",
        "Lesmateriaal maken met AI",
        "Praktische implementatie"
      ],
      price: "€295",
      nextDates: ["15 april 2024", "12 mei 2024", "9 juni 2024"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      title: "AI voor Schoolleiders",
      level: "Gevorderd",
      duration: "2 dagen",
      format: "Live",
      audience: "Directie & MT",
      topics: [
        "Strategische implementatie",
        "Beleidsontwikkeling",
        "Teamtraining faciliteren",
        "Ethiek & privacy"
      ],
      price: "€595",
      nextDates: ["22-23 april 2024", "17-18 juni 2024"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      title: "AI Onderwijsinnovatie",
      level: "Gevorderd",
      duration: "6 weken",
      format: "Blended",
      audience: "Docenten & ICT",
      topics: [
        "Geavanceerde AI-tools",
        "Curriculumontwikkeling",
        "Gepersonaliseerd leren",
        "Projectgebaseerd leren"
      ],
      price: "€795",
      nextDates: ["Start 1 mei 2024", "Start 1 sept 2024"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    }
  ];

  const benefits = [
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

  const testimonials = [
    {
      quote: "Deze training heeft mijn manier van lesgeven compleet veranderd. Ik bespaar nu uren tijd en mijn leerlingen zijn meer betrokken dan ooit.",
      author: "Martijn de Vries",
      role: "Docent Nederlands, RSG Enkhuizen"
    },
    {
      quote: "Eindelijk een praktische AI-training zonder technisch jargon. Ik kon de volgende dag al aan de slag met wat ik geleerd had.",
      author: "Annemieke Jansen",
      role: "Juf groep 7, BS De Wegwijzer"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI Trainingen voor Onderwijsprofessionals
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Praktische workshops en cursussen om AI effectief te integreren in jouw onderwijspraktijk. 
                Voor alle niveaus en onderwijslagen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#trainingen"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiCalendar} />
                  <span>Bekijk Trainingen</span>
                </a>
                <a
                  href="#incompany"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiUsers} />
                  <span>In-company</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom onze trainingen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wij geloven in praktijkgericht leren met direct toepasbare kennis en vaardigheden
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            {trainings.map((training, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
                      {training.topics.map((topic, topicIndex) => (
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
                      {training.nextDates.map((date, dateIndex) => (
                        <li key={dateIndex} className="text-sm text-gray-600">
                          {date}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xl font-bold text-gray-900">
                      {training.price}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Inschrijven
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Prijzen zijn exclusief BTW. Onderwijsinstellingen zijn vrijgesteld van BTW.</p>
            <Link to="/nieuwsbrief" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center space-x-2">
              <span>Download trainingsbrochure</span>
              <SafeIcon icon={FiDownload} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wat deelnemers zeggen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="text-4xl text-blue-300 mb-4">"</div>
                <p className="text-lg text-gray-600 italic mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-company Section */}
      <section id="incompany" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Op maat gemaakte trainingen
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                We bieden ook trainingen op maat voor jouw school of onderwijsinstelling. 
                Perfect voor studiedagen of teamontwikkeling.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="text-green-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Aangepast aan jullie behoeften</div>
                    <div className="text-gray-600">Volledig op maat voor jouw team en context</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="text-green-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Op locatie of online</div>
                    <div className="text-gray-600">Flexibele opties die bij jullie passen</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="text-green-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Volledige implementatie</div>
                    <div className="text-gray-600">Van strategie tot praktische toepassing</div>
                  </div>
                </div>
              </div>
              
              <Link to="/voor-scholen" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
                <span>Vraag een offerte aan</span>
                <SafeIcon icon={FiCalendar} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="In-company training"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              <Link
                to="/nieuwsbrief"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Download brochure
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Trainingen;