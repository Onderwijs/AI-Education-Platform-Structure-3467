import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';

const Privacy=()=> {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen bg-gray-50 py-16" >
      <SEO 
        title="Privacy & Veiligheid bij AI-gebruik" 
        description="Lees hoe Onderwijs.ai omgaat met privacy, AVG-wetgeving en de beveiliging van gegevens bij het gebruik van AI in het onderwijs."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> Privacyverklaring & Veiligheid </h1>
          <p className="text-indigo-600 font-medium mb-8">Privacy-first AI voor het onderwijs</p>
          
          <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
            <p className="text-lg">
              Bij <strong>Onderwijs.ai</strong> vinden we privacy essentieel. Onze tools zijn ontworpen met privacy-by-design als uitgangspunt om veilig AI-gebruik in de klas mogelijk te maken.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Privacy in het Klaslokaal</h2>
            <p>
              Onderwijs.ai verwerkt geen persoonsgegevens en slaat geen leerlinggegevens op. Wij hanteren een strikt 'geen data-opslag' beleid voor alle interactieve tools, zoals het sociogram en de klassenplattegrond.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Verantwoord gebruik van Google Analytics</h2>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
              <p className="mb-2"><strong>Voor statistische doeleinden maakt Onderwijs.ai gebruik van Google Analytics.</strong></p>
              <p className="mb-2">Deze geanonimiseerde data helpt ons de relevantie voor docenten te verbeteren.</p>
              <p>Analytische cookies worden uitsluitend geplaatst na expliciete toestemming via de cookiebanner.</p>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Uw Rechten en AVG</h2>
            <p>
              Wij ondersteunen scholen bij het voldoen aan de AVG-richtlijnen door transparant te zijn over AI-algoritmes en dataverwerking. Voor vragen kunt u direct contact opnemen via: <br />
              <a href="mailto:ai.onderwijs@gmail.com" className="text-indigo-600 font-bold hover:underline">ai.onderwijs@gmail.com</a>
            </p>

            <p className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
              Laatste update: 1 februari 2026
            </p>
          </div>
          
          <div className="mt-12">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2 transition-colors" >
              <span>← Terug naar de Homepagina</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;