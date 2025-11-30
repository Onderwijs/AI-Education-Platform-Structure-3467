import React from 'react';
import SimpleHero from '../../components/common/SimpleHero';

const LegalPage = ({ title, content }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title={title} subtitle="Juridische Informatie" color="from-gray-700 to-gray-900" />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg prose max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;