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
              Bij <strong>Onderwijs.ai</strong> vinden we privacy en de zorgvuldige omgang met gegevens essentieel, zeker in een onderwijscontext. Wij streven ernaar om zo min mogelijk gegevens te verwerken zodat docenten veilig gebruik kunnen maken van onze hulpmiddelen.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Verwerking van persoonsgegevens</h2>
            <p>
              Onderwijs.ai verwerkt geen leerlinggegevens en slaat geen persoonsgegevens op bij het gebruik van de tools. 
              Wij slaan onder andere <strong>niet</strong> op:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Namen van leerlingen</li>
              <li>Klassenlijsten</li>
              <li>Sociogramgegevens</li>
              <li>Sociale relaties</li>
              <li>Ingevoerde tooldata</li>
            </ul>
            <p>
              Ingevoerde gegevens worden uitsluitend tijdelijk in het geheugen van je eigen browser gebruikt om een resultaat (zoals een plattegrond of netwerk) te tonen en worden niet bewaard op onze systemen.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Gebruik van tools</h2>
            <p>
              Onze interactieve tools (zoals de sociogram-visualisatie en klassenplattegrond) werken zonder gebruikersaccount en zonder centrale opslag van gegevens.
            </p>
            <p>Wanneer je werkt met een sociogram in Google Sheets:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Blijft dit bestand volledig in je eigen Google Drive-omgeving staan.</li>
              <li>Behouden wij geen kopie van de inhoud.</li>
              <li>Worden gegevens niet opgeslagen op de servers van Onderwijs.ai.</li>
            </ul>
            <p>Onderwijs.ai fungeert uitsluitend als lokaal hulpmiddel voor visuele weergave, niet als opslag- of dossiersysteem.</p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Websitebezoek</h2>
            <p>
              Bij het bezoeken van de website kunnen beperkte technische gegevens automatisch worden verwerkt om de site goed te laten functioneren, zoals:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Type browser en apparaat</li>
              <li>Geanonimiseerd IP-adres</li>
              <li>Tijdstip van bezoek</li>
              <li>Functionele cookies</li>
            </ul>
            <p>Deze technische gegevens zijn niet herleidbaar tot individuele personen.</p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Cookies</h2>
            <p>Onderwijs.ai maakt gebruik van:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li><strong>Functionele cookies:</strong> Noodzakelijk voor het technisch functioneren van de website.</li>
              <li><strong>Beperkte analytische cookies:</strong> Om anoniem inzicht te krijgen in het algemene gebruik van de site.</li>
            </ul>
            <p>Wij gebruiken geen marketing- of trackingcookies voor commerciële doeleinden.</p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Delen van gegevens</h2>
            <p>Onderwijs.ai:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Verkoopt geen gegevens aan derden.</li>
              <li>Deelt geen persoonsgegevens met externe partijen.</li>
              <li>Bouwt geen gebruikersprofielen op.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">6. Bewaartermijnen</h2>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li><strong>Tool-invoer:</strong> Wordt niet opgeslagen en verdwijnt zodra de pagina wordt gesloten of ververst.</li>
              <li><strong>Technische en analytische gegevens:</strong> Maximaal 2 jaar, uitsluitend in geanonimiseerde vorm.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">7. Jouw rechten</h2>
            <p>
              Omdat wij nauwelijks persoonsgegevens verwerken, is identificatie vaak niet mogelijk. Echter heb je altijd het recht om:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Inzage te vragen in persoonsgegevens (voor zover van toepassing).</li>
              <li>Gegevens te laten corrigeren of verwijderen.</li>
              <li>Bezwaar te maken tegen verwerking.</li>
            </ul>
            <p className="mt-4">
              Vragen over privacy kun je stellen via: <br />
              <a href="mailto:ai.onderwijs@gmail.com" className="text-indigo-600 font-bold hover:underline">ai.onderwijs@gmail.com</a>
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">8. Wijzigingen</h2>
            <p>
              Deze privacyverklaring kan worden aangepast wanneer onze diensten of relevante wetgeving veranderen. De meest actuele versie is altijd beschikbaar op deze website.
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