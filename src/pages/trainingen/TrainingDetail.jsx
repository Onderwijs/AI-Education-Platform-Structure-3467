import React from 'react';
import SimpleHero from '../../components/common/SimpleHero';
import { Link } from 'react-router-dom';

const TrainingDetail = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title={title} subtitle="Professionalisering" color="from-blue-600 to-indigo-700" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Over deze training</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Wat je leert:</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>Praktische toepassing in de les</li>
              <li>Hands-on oefeningen met tools</li>
              <li>Werken aan eigen casussen</li>
            </ul>
          </div>

          <Link to="/over-ons#contact" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Neem contact op voor info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;