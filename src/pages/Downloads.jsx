import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { downloadStartersgids } from '../utils/downloadUtils';

const { FiDownload, FiFileText, FiPackage, FiCheck } = FiIcons;

const Downloads = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Downloads & Materialen</h1>
          <p className="text-xl text-gray-600">
            De centrale plek voor al je AI-lesmateriaal en handleidingen.
          </p>
        </div>

        {/* Featured Download */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-primary-100">
          <div className="bg-primary-600 p-8 text-center text-white">
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold mb-4">MEEST POPULAIR</span>
            <h2 className="text-3xl font-bold mb-2">AI Startersgids V9.0</h2>
            <p className="opacity-90">De complete handleiding voor Nederlands onderwijs</p>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <ul className="space-y-3 flex-1">
                <li className="flex items-center text-gray-700">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2" /> 14+ Pagina's content
                </li>
                <li className="flex items-center text-gray-700">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2" /> Inclusief stappenplannen
                </li>
                <li className="flex items-center text-gray-700">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2" /> PO, VO, MBO & HBO specifiek
                </li>
              </ul>
              <button 
                onClick={downloadStartersgids}
                className="w-full md:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <SafeIcon icon={FiDownload} className="text-xl" />
                <span>Nu Downloaden</span>
              </button>
            </div>
          </div>
        </div>

        {/* Other Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiPackage} className="text-2xl text-emerald-600" />
              <h3 className="text-xl font-bold">Lesbundels</h3>
            </div>
            <p className="text-gray-600 mb-4">Complete lessenreeksen over AI Ethiek en ChatGPT.</p>
            <button disabled className="text-gray-400 font-medium cursor-not-allowed">Binnenkort beschikbaar</button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiFileText} className="text-2xl text-blue-600" />
              <h3 className="text-xl font-bold">Templates</h3>
            </div>
            <p className="text-gray-600 mb-4">Handige formats voor beleidsplannen en ouderbrieven.</p>
            <button disabled className="text-gray-400 font-medium cursor-not-allowed">Binnenkort beschikbaar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;