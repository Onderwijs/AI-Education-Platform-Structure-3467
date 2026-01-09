import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';

const {FiMail,FiMapPin}=FiIcons;

const OverOns=()=> {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Onderwijs.ai",
    "description": "Expertisecentrum voor de implementatie van verantwoorde AI in het Nederlandse onderwijsveld.",
    "email": "ai.onderwijs@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amsterdam",
      "addressCountry": "NL"
    }
  };

  const scrollToContact=()=> {
    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="Over Onderwijs.ai | Missie voor Verantwoorde AI Innovatie" 
        description="Leer meer over de missie van Onderwijs.ai: het toegankelijk en veilig maken van kunstmatige intelligentie voor elke onderwijsprofessional in Nederland."
        jsonLd={orgSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity: 0,x: -50}} animate={{opacity: 1,x: 0}} >
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> Missie: Veilig en Effectief AI-onderwijs </h1>
              <p className="text-xl text-primary-100 mb-4"> Als ervaren onderwijsprofessional is mijn missie om AI-technologie begrijpelijk en direct inzetbaar te maken, met behoud van de menselijke maat. </p>
              <button onClick={scrollToContact} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg" > Interesse in samenwerking? </button>
            </motion.div>
            <motion.div initial={{opacity: 0,x: 50}} animate={{opacity: 1,x: 0}} transition={{delay: 0.2}} >
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="Innovatie en samenwerking in het moderne onderwijs" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity: 0,x: -50}} whileInView={{opacity: 1,x: 0}} viewport={{once: true}} >
              <h3 className="text-2xl font-bold text-gray-900 mb-6"> Expertise uit de Praktijk </h3>
              <p className="text-gray-600 mb-4"> Onderwijs.ai is ontstaan vanuit de behoefte om de kloof tussen complexe AI-technologie en de dagelijkse onderwijspraktijk te overbruggen. </p>
              <p className="text-gray-600"> Door didactische kaders te combineren met praktische tools, helpen wij scholen bij een verantwoorde transitie naar een AI-ondersteunde leeromgeving. </p>
            </motion.div>
            <motion.div initial={{opacity: 0,x: 50}} whileInView={{opacity: 1,x: 0}} viewport={{once: true}} className="relative" >
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" alt="Docent die AI instrumenten exploreert" className="rounded-2xl shadow-lg relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6"> Neem contact op </h2>
              <p className="text-primary-600 font-semibold mb-8"> Voor pilots, licenties van het framework of algemene vragen over AI in het klaslokaal. </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiMail} className="text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">E-mail</div>
                    <a href="mailto:ai.onderwijs@gmail.com" className="text-gray-600 hover:text-primary-600">ai.onderwijs@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OverOns;