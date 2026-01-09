import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';

const Privacy=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen bg-gray-50 py-16" >
      <SEO 
        title="Privacy & Veiligheid – Onderwijs.AI"
        description="Hoe Onderwijs.AI omgaat met uw gegevens. Lees onze privacy-first benadering voor AI-gebruik in het onderwijs."
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> Privacyverklaring </h1>
          <p className="text-indigo-600 font-medium mb-8 text-sm">Onderwijs.ai – Laatst bijgewerkt: 1 februari 2026</p>
          
          <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed text-sm">
            <p className="text-lg text-gray-800"> Bij <strong>Onderwijs.ai</strong> vinden we privacy essentieel. Wij verwerken en bewaren zo min mogelijk gegevens. </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Persoonsgegevens</h2>
            <p> Wij slaan onder andere <strong>niet</strong> op: namen van leerlingen, klassenlijsten of sociogramgegevens. Alle berekeningen gebeuren lokaal in uw browser. </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Cookies</h2>
            <p> Wij gebruiken alleen noodzakelijke functionele cookies en geanonimiseerde statistieken via Google Analytics (alleen na uw uitdrukkelijke toestemming). </p>
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
              ← Terug naar Home
            </Link>
          </div>
        </article>
      </div>
    </motion.main>
  );
};

export default Privacy;