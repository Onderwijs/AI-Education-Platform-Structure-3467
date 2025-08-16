import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getNewsletterSubmissions, exportSubmissionsAsCSV } from '../utils/adminUtils';

const { FiDownload, FiMail, FiUsers, FiCalendar } = FiIcons;

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if already authorized
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'authorized') {
      setIsAuthorized(true);
      loadSubmissions();
    }
  }, []);

  const loadSubmissions = () => {
    const data = getNewsletterSubmissions();
    setSubmissions(data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password protection (in production, use proper authentication)
    if (password === 'aionderwijs2024') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin-auth', 'authorized');
      loadSubmissions();
    } else {
      alert('Onjuist wachtwoord');
    }
  };

  const handleExport = () => {
    exportSubmissionsAsCSV();
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Nieuwsbrief Inschrijvingen
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadSubmissions}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Vernieuwen
              </button>
              <button
                onClick={handleExport}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiDownload} />
                <span>Exporteer CSV</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-50 p-6 rounded-xl">
              <div className="flex items-center">
                <SafeIcon icon={FiUsers} className="text-2xl text-primary-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-primary-900">
                    {submissions.length}
                  </div>
                  <div className="text-sm text-primary-700">Totaal inschrijvingen</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center">
                <SafeIcon icon={FiMail} className="text-2xl text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-900">
                    {submissions.filter(s => s.email).length}
                  </div>
                  <div className="text-sm text-green-700">Geldige emails</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center">
                <SafeIcon icon={FiCalendar} className="text-2xl text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">
                    {submissions.filter(s => {
                      const today = new Date();
                      const submissionDate = new Date(s.timestamp);
                      const diffTime = Math.abs(today - submissionDate);
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 7;
                    }).length}
                  </div>
                  <div className="text-sm text-blue-700">Laatste 7 dagen</div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission, index) => (
                  <tr key={submission.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {submission.role || 'Niet opgegeven'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(submission.timestamp).toLocaleDateString('nl-NL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {submissions.length === 0 && (
              <div className="text-center py-12">
                <SafeIcon icon={FiMail} className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nog geen inschrijvingen
                </h3>
                <p className="text-gray-600">
                  Inschrijvingen worden hier getoond zodra ze binnenkomen.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <SafeIcon icon={FiUsers} className="text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Ontwikkelingsmodus
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Deze data wordt lokaal opgeslagen. Voor productie gebruik wordt aanbevolen om Netlify Forms 
                    of een externe service te gebruiken om submissions direct naar je email te ontvangen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;