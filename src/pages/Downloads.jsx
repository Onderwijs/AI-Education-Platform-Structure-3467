import React from 'react';
import SimpleHero from '../components/common/SimpleHero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { downloadStartersgids } from '../utils/downloadUtils';

const { FiDownload, FiFileText, FiPackage } = FiIcons;

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Downloads & Resources" subtitle="Direct bruikbare materialen voor in de klas" color="from-green-600 to-emerald-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Download */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Startersgids V9.0</h2>
                <p className="text-gray-600 mb-4">De complete handleiding voor PO, VO en MBO/HBO. Inclusief stappenplannen en tools.</p>
                <button 
                  onClick={downloadStartersgids}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} />
                  <span>Download PDF</span>
                </button>
              </div>
              <SafeIcon icon={FiFileText} className="text-5xl text-green-100" />
            </div>
          </div>

          {/* Placeholders */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 opacity-75">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lesbundels & Templates</h2>
                <p className="text-gray-600 mb-4">Kant-en-klare werkbladen en prompts.</p>
                <span className="inline-block bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium">
                  Binnenkort beschikbaar
                </span>
              </div>
              <SafeIcon icon={FiPackage} className="text-5xl text-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;