import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import * as XLSX from 'xlsx';
import ForceGraph2D from 'react-force-graph-2d';

const { FiUpload, FiClipboard, FiSettings, FiActivity, FiDownload, FiSearch, FiEye, FiAlertTriangle, FiCheck, FiUsers, FiGrid, FiXCircle, FiInfo, FiFileText, FiHelpCircle, FiDatabase, FiExternalLink, FiChevronDown, FiChevronUp, FiFilter, FiMaximize2, FiSend, FiCheckCircle, FiCopy, FiTerminal, FiShare2 } = FiIcons;

const Sociogram = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [mapping, setMapping] = useState({ name: '', socialPos: '', socialNeg: '', workPos: '', workNeg: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Interactief Sociogram" 
        subtitle="Visualiseer de sociale dynamiek en samenwerkingsvoorkeuren in jouw klas."
        color="from-blue-600 to-indigo-700"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><SafeIcon icon={FiActivity} className="text-xl" /></div>
            <h2 className="text-2xl font-bold text-gray-900">Interactief Sociogram</h2>
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-tight mb-6 ml-12">
            Framework-niveau: Level 3–4<br />
            Ondersteunt inzicht in groepsdynamiek zonder te diagnosticeren.
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <p className="text-gray-600 mb-6">Gebruik deze tool om sociale data uit je klas te vertalen naar een visueel netwerk.</p>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsGenerated(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
              >
                Start met Data-invoer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sociogram;