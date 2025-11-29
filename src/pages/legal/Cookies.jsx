import React from 'react';

const Cookies = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Cookieverklaring</h1>
      <p className="text-gray-600 mb-4">
        Onderwijs.ai gebruikt functionele en analytische cookies om de website goed te laten werken en het gebruik te meten. 
        Wij plaatsen geen marketingcookies zonder uw toestemming.
      </p>
      <h2 className="text-xl font-bold mt-8 mb-4">Welke cookies gebruiken wij?</h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li><strong>Noodzakelijk:</strong> Voor het onthouden van sessies en voorkeuren.</li>
        <li><strong>Analytisch:</strong> Google Analytics (geanonimiseerd).</li>
      </ul>
    </div>
  );
};

export default Cookies;