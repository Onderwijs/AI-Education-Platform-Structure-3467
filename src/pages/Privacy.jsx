import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

const Privacy=()=> {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen bg-gray-50 py-16" >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> Privacyverklaring </h1>
          <p className="text-indigo-600 font-medium mb-8">Onderwijs.ai</p>
          
          <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
            <p className="text-lg">
              Bij <strong>Onderwijs.ai</strong> vinden we privacy essentieel, zeker in een onderwijscontext. Daarom verwerken en bewaren wij zo min mogelijk gegevens. Onze tools zijn ontworpen met privacy-by-design als uitgangspunt.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Persoonsgegevens</h2>
            <p>
              Onderwijs.ai verwerkt geen persoonsgegevens en slaat geen leerlinggegevens op. Wij slaan onder andere <strong>niet</strong> op:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Namen van leerlingen</li>
              <li>Klassenlijsten</li>
              <li>Sociogramgegevens en sociale relaties</li>
              <li>Ingevoerde tooldata</li>
              <li>E-mailadressen (behalve bij vrijwillige aanmelding nieuwsbrief)</li>
              <li>Accounts of gebruikersprofielen</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Google Analytics</h2>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
              <p className="mb-2"><strong>Voor statistische doeleinden maakt Onderwijs.ai gebruik van Google Analytics.</strong></p>
              <p className="mb-2">Hierbij worden geanonimiseerde gegevens verzameld over het gebruik van de website.</p>
              <p className="mb-2">Deze analytische cookies worden uitsluitend geplaatst nadat de gebruiker hiervoor toestemming heeft gegeven via de cookiebanner.</p>
              <p>De gegevens worden niet gebruikt voor advertentiedoeleinden en niet gecombineerd met andere Google-diensten.</p>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Gebruik van tools</h2>
            <p>
              Onze tools (zoals het sociogram en de klassenplattegrond) werken volledig zonder account. Wij bouwen geen dossiers op over leerlingen of docenten.
            </p>
            <p>Wanneer je werkt met een sociogram in Google Sheets:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Blijft dit bestand volledig in je eigen Google Drive-omgeving staan.</li>
              <li>Maakt Onderwijs.ai geen kopie van de inhoud op onze servers.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Cookies</h2>
            <p>
              Onderwijs.ai gebruikt uitsluitend functionele cookies (om je voorkeuren te onthouden) en geanonimiseerde analytische cookies via Google Analytics (na toestemming).
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Jouw rechten</h2>
            <p>
              Omdat wij nauwelijks persoonsgegevens opslaan, zijn er in de praktijk geen gegevens om in te zien of te verwijderen. Heb je vragen? Neem contact op via: <br />
              <a href="mailto:ai.onderwijs@gmail.com" className="text-indigo-600 font-bold hover:underline">ai.onderwijs@gmail.com</a>
            </p>

            <p className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
              Laatste update: 1 februari 2026
            </p>
          </div>
          
          <div className="mt-12">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2 transition-colors" >
              <span>← Terug naar Home</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;