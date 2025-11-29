import React from 'react';
import { useParams, Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiTool } = FiIcons;

const ToolDetail = () => {
  const { toolId } = useParams();

  // In a real app, fetch tool config based on ID
  const toolName = toolId.charAt(0).toUpperCase() + toolId.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/tools" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <SafeIcon icon={FiArrowLeft} className="mr-2" />
          Terug naar overzicht
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiTool} className="text-4xl text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {toolName}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Deze tool is momenteel in ontwikkeling. Binnenkort kun je hier gebruik van maken!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-bold text-blue-900 mb-2">Verwachte functionaliteit:</h3>
            <p className="text-blue-800">
              Generatieve AI integratie voor het automatiseren van specifieke onderwijstaken gerelateerd aan {toolName.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;