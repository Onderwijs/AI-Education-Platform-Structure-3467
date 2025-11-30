import React from 'react';
import SimpleHero from '../../components/common/SimpleHero';
import { Link } from 'react-router-dom';

const ToolPlaceholder = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title={title} subtitle="Interactieve Tool" color="from-indigo-600 to-blue-500" />
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚧 {title} in ontwikkeling</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <p className="text-sm text-gray-500 mb-8">
            Deze functionaliteit wordt binnenkort toegevoegd. Hier komt de interface om direct met AI aan de slag te gaan.
          </p>
          <Link to="/tools" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Terug naar overzicht
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolPlaceholder;