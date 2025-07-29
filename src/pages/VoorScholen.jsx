import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiCalendar, FiBook, FiAward, FiCheck, FiSend } = FiIcons;

const VoorScholen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    phoneNumber: '',
    interest: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send data to an API
    console.log('Form data:', formData);
    setFormSubmitted(true);
  };

  const packages = [
    {
      title: "Introductie Workshop",
      description: "Een inspirerende workshop om kennis te maken met AI in onderwijs",
      duration: "Halve dag (3 uur)",
      participants: "Max. 30 deelnemers",
      price: "€895",
      features: [
        "Introductie tot AI in onderwijs",
        "Demonstratie van populaire AI-tools",
        "Hands-on oefeningen",
        "Materialen en naslagwerk",
      ]
    },
    {
      title: "Intensief Programma",
      description: "Complete training voor scholen die AI willen implementeren",
      duration: "2 dagen (verspreid)",
      participants: "Max. 20 deelnemers",
      price: "€2.495",
      features: [
        "Uitgebreide AI-tools training",
        "Praktijksessies per vakgebied",
        "Implementatieplan voor school",
        "6 maanden ondersteuning",
        "Toegang tot alle lesmateriaal"
      ],
      popular: true
    },
    {
      title: "Maatwerk Traject",
      description: "Op maat gemaakt trainingsprogramma voor jouw school of bestuur",
      duration: "In overleg",
      participants: "Onbeperkt",
      price: "Op aanvraag",
      features: [
        "Volledig aangepast aan jullie behoeften",
        "Begeleiding bij beleidsvorming",
        "Training voor alle medewerkers",
        "Continue ondersteuning",
        "Evaluatie en bijsturing"
      ]
    }
  ];

  const benefits = [
    {
      title: "Praktijkgericht",
      description: "Geen theoretische verhalen maar praktische toepassingen die direct werken in de klas"
    },
    {
      title: "Vakspecifiek",
      description: "Trainingen aangepast aan verschillende vakgebieden en onderwijsniveaus"
    },
    {
      title: "Stap-voor-stap",
      description: "Duidelijke structuur waarbij we iedereen meenemen, ongeacht voorkennis"
    },
    {
      title: "Blijvend effect",
      description: "Inclusief implementatieplan en materialen om zelfstandig verder te gaan"
    }
  ];

  const references = [
    {
      school: "Montessori Lyceum Amsterdam",
      quote: "De training heeft ons team enorm geholpen om AI verantwoord te integreren in ons onderwijs.",
      person: "Jolanda Verbeek, Teamleider"
    },
    {
      school: "Basisschool De Zonnewijzer",
      quote: "Zelfs onze meest sceptische collega's zijn nu enthousiast over de mogelijkheden van AI.",
      person: "Peter Jansen, Directeur"
    }
  ];

  if (formSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-20"
      >
        <div className="max-w-md mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SafeIcon icon={FiCheck} className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Aanvraag ontvangen!
          </h1>
          <p className="text-gray-600 mb-8">
            Bedankt voor je interesse in onze schooltrainingen. We nemen binnen 1 werkdag contact met je op om de mogelijkheden te bespreken.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Terug naar overzicht
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI-Trainingen voor Scholen en Besturen
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Bereid je hele team voor op de toekomst met praktische AI-trainingen op locatie. 
                Voor PO, VO en MBO/HBO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pakketten"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiBook} />
                  <span>Bekijk Pakketten</span>
                </a>
                <a
                  href="#aanvraag"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiCalendar} />
                  <span>Training Aanvragen</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Schooltraining AI"
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
              Waarom kiezen voor onze trainingen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Onze trainingen zijn ontwikkeld door ervaren docenten en AI-experts
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
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={FiCheck} className="text-xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
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

      {/* Packages Section */}
      <section id="pakketten" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Trainingspakketten
            </h2>
            <p className="text-xl text-gray-600">
              Kies het pakket dat het beste past bij de behoeften van jouw school
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  pkg.popular ? 'border-2 border-blue-500 relative' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                    Populair
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <SafeIcon icon={FiCalendar} className="text-blue-500" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <SafeIcon icon={FiUsers} className="text-blue-500" />
                      <span>{pkg.participants}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-4 mb-6">
                    <div className="text-3xl font-bold text-gray-900 text-center">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      Excl. BTW, inclusief materialen
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Inbegrepen:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <SafeIcon icon={FiCheck} className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href="#aanvraag"
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                      pkg.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <span>Offerte aanvragen</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12 text-gray-600">
            <p>Alle trainingen zijn inclusief materialen, certificaten en 30 dagen ondersteuning na afloop.</p>
            <p className="mt-2">Prijzen zijn exclusief reiskosten. Meerdaagse trainingen kunnen worden verspreid over een langere periode.</p>
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
              Wat scholen zeggen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {references.map((reference, index) => (
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
                  {reference.quote}
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{reference.person}</div>
                  <div className="text-sm text-gray-500">{reference.school}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="aanvraag" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Vraag een training aan
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Interesse in een AI-training voor jouw school of bestuur? Vul het formulier in en we nemen binnen 1 werkdag contact met je op.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <SafeIcon icon={FiCalendar} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Flexibele planning</div>
                    <div className="text-gray-600">We plannen de training op een moment dat het jullie uitkomt</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <SafeIcon icon={FiUsers} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Voor alle niveaus</div>
                    <div className="text-gray-600">Of je team nu beginner of gevorderd is, we passen de training aan</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <SafeIcon icon={FiAward} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Certificering</div>
                    <div className="text-gray-600">Alle deelnemers ontvangen een certificaat na afloop</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Naam
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                      School/Organisatie
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefoonnummer
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                      Ik ben geïnteresseerd in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecteer een optie</option>
                      <option value="introductie">Introductie Workshop</option>
                      <option value="intensief">Intensief Programma</option>
                      <option value="maatwerk">Maatwerk Traject</option>
                      <option value="other">Anders / weet ik nog niet</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Bericht (optioneel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSend} />
                  <span>Verstuur aanvraag</span>
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  Door dit formulier te versturen ga je akkoord met onze privacyvoorwaarden.
                  We gebruiken je gegevens alleen om contact met je op te nemen over de training.
                </p>
              </form>
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
              Bereid je school voor op de toekomst
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Vraag vandaag nog een vrijblijvende offerte aan voor jouw school
            </p>
            <a
              href="#aanvraag"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <SafeIcon icon={FiCalendar} />
              <span>Plan een gesprek</span>
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default VoorScholen;