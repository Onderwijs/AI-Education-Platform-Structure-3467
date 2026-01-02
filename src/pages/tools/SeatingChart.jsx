import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGrid, FiUsers, FiInfo, FiCheck, FiLayout, FiCoffee, FiAlertCircle, FiRefreshCw, FiArrowRight, FiLink, FiDatabase, FiSliders, FiShield, FiLock } = FiIcons;

const SeatingChart = () => {
  const [sheetLink, setSheetLink] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Klassenplattegrond" 
        subtitle="Zet je sociogram om in een praktische klassenplattegrond op basis van sociale veiligheid."
        color="from-indigo-600 to-blue-700"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <SafeIcon icon={FiSliders} className="text-indigo-600" />
                  Configuratie
                </h2>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">
                  Framework-niveau: Level 3–4<br />
                  Ondersteunt didactische keuzes rond rust, veiligheid en samenwerking.
                </p>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Link naar sociogram</label>
                <input 
                  type="text" value={sheetLink} onChange={(e) => setSheetLink(e.target.value)} 
                  placeholder="https://docs.google.com/spreadsheets/..."
                  className="w-full p-2 border rounded-lg text-xs"
                />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 h-[500px] flex flex-col items-center justify-center text-center">
              <SafeIcon icon={FiDatabase} className="text-4xl text-gray-200 mb-4" />
              <p className="text-gray-400">Wachtend op data...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;