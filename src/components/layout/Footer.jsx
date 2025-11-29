import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBrain, FiLinkedin, FiMail } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <SafeIcon icon={FiBrain} className="text-2xl text-primary-400" />
              <span className="text-xl font-bold">Onderwijs.ai</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Hét platform voor AI in het Nederlandse onderwijs. Praktische tools, lessen en trainingen voor elke docent.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiLinkedin} className="text-xl" />
              </a>
              <a href="mailto:ai.onderwijs@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiMail} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigatie */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/tools" className="hover:text-primary-400 transition-colors">AI Tools</Link></li>
              <li><Link to="/leslab" className="hover:text-primary-400 transition-colors">LesLab</Link></li>
              <li><Link to="/trainingen" className="hover:text-primary-400 transition-colors">Trainingen</Link></li>
              <li><Link to="/downloads" className="hover:text-primary-400 transition-colors">Downloads</Link></li>
            </ul>
          </div>

          {/* Column 3: Doelgroepen */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Voor Docenten</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/voor-docenten/po" className="hover:text-primary-400 transition-colors">Basisonderwijs</Link></li>
              <li><Link to="/voor-docenten/vo" className="hover:text-primary-400 transition-colors">Voortgezet Onderwijs</Link></li>
              <li><Link to="/voor-docenten/mbo-hbo" className="hover:text-primary-400 transition-colors">MBO & HBO</Link></li>
              <li><Link to="/kennisbank" className="hover:text-primary-400 transition-colors">Kennisbank</Link></li>
            </ul>
          </div>

          {/* Column 4: Juridisch */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Info & Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/over-ons" className="hover:text-primary-400 transition-colors">Over Ons</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacyverklaring</Link></li>
              <li><Link to="/cookies" className="hover:text-primary-400 transition-colors">Cookiebeleid</Link></li>
              <li><Link to="/avg" className="hover:text-primary-400 transition-colors">AVG Informatie</Link></li>
              <li><Link to="/legal/terms" className="hover:text-primary-400 transition-colors">Algemene Voorwaarden</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Onderwijs.ai. Alle rechten voorbehouden.</p>
          <div className="mt-4 md:mt-0">
            <p>Gemaakt met passie voor onderwijs ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;