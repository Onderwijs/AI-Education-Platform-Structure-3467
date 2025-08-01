import React from 'react';
import {Link} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiBrain,FiLinkedin}=FiIcons;

const Footer=()=> {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiBrain} className="text-2xl text-primary-400" />
              <span className="text-xl font-bold">AI in het Onderwijs</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Praktische AI-tools en lessen voor moderne docenten. Maak onderwijs effectiever met kunstmatige intelligentie.
            </p>
          </div>

          {/* Voor Docenten */}
          <div>
            <h3 className="font-semibold mb-4">Voor Docenten</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/voor-docenten/po" className="text-gray-300 hover:text-white transition-colors">Basisonderwijs</Link></li>
              <li><Link to="/voor-docenten/vo" className="text-gray-300 hover:text-white transition-colors">Voortgezet Onderwijs</Link></li>
              <li><Link to="/voor-docenten/mbo-hbo" className="text-gray-300 hover:text-white transition-colors">MBO & HBO</Link></li>
              <li><Link to="/ai-tools" className="text-gray-300 hover:text-white transition-colors">AI Tools</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/leslab" className="text-gray-300 hover:text-white transition-colors">LesLab</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/trainingen" className="text-gray-300 hover:text-white transition-colors">Trainingen</Link></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/over-ons" className="text-gray-300 hover:text-white transition-colors">Over Ons</Link></li>
              <li><Link to="/nieuws" className="text-gray-300 hover:text-white transition-colors">Nieuwsbrief</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link></li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.linkedin.com/in/maikewarner/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <SafeIcon icon={FiLinkedin} className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy;2025 AI in het Onderwijs. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;