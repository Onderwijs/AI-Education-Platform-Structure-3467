import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacyverklaring
          </h1>
          <p className="text-indigo-600 font-medium mb-8">Onderwijs.ai</p>

          <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
            <p className="text-lg">
              Bij <strong>Onderwijs.ai</strong> vinden we privacy essentieel, zeker in een onderwijscontext. 
              Daarom verwerken en bewaren wij zo min mogelijk gegevens. Onze tools zijn ontworpen met privacy-by-design als uitgangspunt.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Persoonsgegevens</h2>
            <p>
              Onderwijs.ai verwerkt geen persoonsgegevens en slaat geen leerlinggegevens op. 
              Wij slaan onder andere <strong>niet</strong> op:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Namen van leerlingen</li>
              <li>Klassenlijsten</li>
              <li>Sociogramgegevens en sociale relaties</li>
              <li>Ingevoerde tooldata</li>
              <li>E-mailadressen</li>
              <li>Accounts of gebruikersprofielen</li>
            </ul>
            <p>
              Ingevoerde gegevens worden uitsluitend tijdelijk in het werkgeheugen van je browser gebruikt om een resultaat te tonen en worden niet bewaard op onze systemen.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Gebruik van tools</h2>
            <p>
              Onze tools (zoals het sociogram en de klassenplattegrond) werken volledig zonder account. Wij bouwen geen dossiers op over leerlingen of docenten.
            </p>
            <p>Wanneer je werkt met een sociogram in Google Sheets:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Blijft dit bestand volledig in je eigen Google Drive-omgeving staan.</li>
              <li>Maakt Onderwijs.ai geen kopie van de inhoud.</li>
              <li>Worden de gegevens niet opgeslagen op onze servers.</li>
            </ul>
            <p>Onderwijs.ai fungeert puur als hulpmiddel voor visuele weergave, niet als opslagsysteem.</p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Websitegebruik</h2>
            <p>
              Bij het bezoeken van de website verzamelen wij geen persoonsgegevens. Wij maken geen gebruik van tracking-software of externe marketing- en analysesystemen. De website functioneert volledig zonder gebruikersregistratie of dataverzameling voor profielopbouw.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Cookies</h2>
            <p>
              <strong>Onderwijs.ai gebruikt geen cookies.</strong> Wij plaatsen geen functionele, analytische of trackingcookies op je apparaat.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Delen van gegevens</h2>
            <p>Onderwijs.ai:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Deelt geen gegevens met derden.</li>
              <li>Verkoopt geen gegevens.</li>
              <li>Gebruikt geen externe marketing-, advertentie- of e-maildiensten.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">6. Bewaartermijnen</h2>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li><strong>Tool-invoer:</strong> Niet opgeslagen (wordt gewist bij het sluiten van de pagina).</li>
              <li><strong>Persoonsgegevens:</strong> Niet opgeslagen.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">7. Jouw rechten</h2>
            <p>
              Omdat Onderwijs.ai geen persoonsgegevens opslaat, zijn er in de praktijk geen gegevens om in te zien, te corrigeren of te verwijderen. 
            </p>
            <p className="mt-4">
              Heb je toch vragen over privacy of de werking van onze tools? Neem dan contact op via: <br />
              <a href="mailto:ai.onderwijs@gmail.com" className="text-indigo-600 font-bold hover:underline">ai.onderwijs@gmail.com</a>
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">8. Wijzigingen</h2>
            <p>
              Deze privacyverklaring kan worden aangepast wanneer de website of onze diensten veranderen. De meest actuele versie is altijd op deze pagina beschikbaar.
            </p>

            <p className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
              Laatste update: 1 januari 2026
            </p>
          </div>

          <div className="mt-12">
            <Link 
              to="/" 
              className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2 transition-colors"
            >
              <span>← Terug naar Home</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;