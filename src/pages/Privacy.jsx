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
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacyverklaring
          </h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              Bij AI in Onderwijs vinden we jouw privacy belangrijk. In deze privacyverklaring leggen we uit welke gegevens we verzamelen, waarom we deze verzamelen en wat we ermee doen.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Welke gegevens verzamelen we?</h2>
            <p>
              Wanneer je onze website bezoekt, verzamelen we automatisch bepaalde informatie over je apparaat, waaronder informatie over je webbrowser, IP-adres, tijdzone en sommige cookies die op je apparaat zijn geïnstalleerd.
            </p>
            <p>
              Wanneer je je inschrijft voor onze nieuwsbrief of een download aanvraagt, verzamelen we:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Onderwijstype (PO, VO, MBO/HBO)</li>
              <li>School/organisatie (optioneel)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Waarom verzamelen we deze gegevens?</h2>
            <p>
              We gebruiken deze gegevens voor:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Het versturen van onze nieuwsbrief met AI-tips en updates</li>
              <li>Het leveren van de aangevraagde materialen (downloads, lesmateriaal)</li>
              <li>Het verbeteren van onze website en diensten</li>
              <li>Het personaliseren van content op basis van je onderwijstype</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Cookies</h2>
            <p>
              We gebruiken cookies om je ervaring op onze website te verbeteren. Dit omvat:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Functionele cookies: noodzakelijk voor het functioneren van de website</li>
              <li>Analytische cookies: om het gebruik van onze website te analyseren (via Google Analytics)</li>
              <li>Marketing cookies: alleen als je hiervoor toestemming geeft</li>
            </ul>
            <p>
              Je kunt cookies op elk moment uitschakelen via je browserinstellingen.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Met wie delen we je gegevens?</h2>
            <p>
              We delen je gegevens alleen met:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Dienstverleners die ons helpen bij het verzenden van e-mails (Mailchimp)</li>
              <li>Analytische diensten (Google Analytics)</li>
            </ul>
            <p>
              We verkopen je gegevens nooit aan derden.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Hoe lang bewaren we je gegevens?</h2>
            <p>
              We bewaren je gegevens zolang als nodig is voor de doelen waarvoor we ze hebben verzameld, of om te voldoen aan wettelijke verplichtingen:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Nieuwsbrief gegevens: tot je je uitschrijft</li>
              <li>Contactformulier gegevens: maximaal 2 jaar</li>
              <li>Analytische gegevens: maximaal 2 jaar</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Jouw rechten</h2>
            <p>
              Je hebt het recht om:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Inzage te krijgen in je persoonsgegevens</li>
              <li>Je persoonsgegevens te laten corrigeren</li>
              <li>Je persoonsgegevens te laten verwijderen</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Je gegevens te laten overdragen</li>
            </ul>
            <p>
              Je kunt een verzoek indienen door een e-mail te sturen naar <span className="text-gray-500 cursor-not-allowed">ai.onderwijs@gmail.com</span>.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Wijzigingen in deze privacyverklaring</h2>
            <p>
              We kunnen deze privacyverklaring van tijd tot tijd bijwerken. De meest recente versie is altijd beschikbaar op onze website.
            </p>
            <p>
              Laatste update: 1 augustus 2025
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Contact</h2>
            <p>
              Als je vragen hebt over deze privacyverklaring, neem dan contact met ons op via:
            </p>
            <p>
              <strong>AI in Onderwijs</strong><br />
              Onderwijslaan 42<br />
              1234 AB Amsterdam<br />
              <span className="text-gray-500 cursor-not-allowed">ai.onderwijs@gmail.com</span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link to="/over-ons" className="text-primary-600 hover:underline">
              Terug naar Over Ons
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;