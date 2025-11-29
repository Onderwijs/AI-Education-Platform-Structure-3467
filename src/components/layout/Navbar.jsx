import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMenu, FiX, FiChevronDown, FiBrain, FiDownload } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRefs = useRef({});
  const buttonRefs = useRef({});

  // Handle outside clicks for any dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown) {
        const dropdownRef = dropdownRefs.current[activeDropdown];
        const buttonRef = buttonRefs.current[activeDropdown];
        if (
          dropdownRef &&
          !dropdownRef.contains(event.target) &&
          buttonRef &&
          !buttonRef.contains(event.target)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Reset all dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Updated Nav Structure based on Sitemap
  const navItems = [
    { path: '/', label: 'Home' },
    { 
      id: 'tools', 
      label: 'AI Tools', 
      dropdown: [
        { path: '/tools', label: 'Overzicht Tools', color: 'hover:bg-indigo-50 hover:text-indigo-600' },
        { path: '/tools/lesgenerator', label: 'Lesgenerator', color: 'hover:bg-indigo-50 hover:text-indigo-600' },
        { path: '/tools/toetsvragenmaker', label: 'Toetsvragen Maker', color: 'hover:bg-indigo-50 hover:text-indigo-600' },
        { path: '/tools/rubriekmaker', label: 'Rubriek Maker', color: 'hover:bg-indigo-50 hover:text-indigo-600' },
      ]
    },
    { 
      id: 'voor-docenten', 
      label: 'Voor Docenten', 
      dropdown: [
        { path: '/voor-docenten/po', label: 'Basisonderwijs (PO)', color: 'hover:bg-blue-50 hover:text-blue-600' },
        { path: '/voor-docenten/vo', label: 'Voortgezet Onderwijs (VO)', color: 'hover:bg-purple-50 hover:text-purple-600' },
        { path: '/voor-docenten/mbo-hbo', label: 'MBO & HBO', color: 'hover:bg-green-50 hover:text-green-600' },
      ]
    },
    {
      id: 'lesmateriaal',
      label: 'Lesmateriaal',
      dropdown: [
        { path: '/leslab', label: 'LesLab (Archief)', color: 'hover:bg-emerald-50 hover:text-emerald-600' },
        { path: '/downloads', label: 'Downloads & Bundels', color: 'hover:bg-emerald-50 hover:text-emerald-600' },
      ]
    },
    {
      id: 'kenniscentrum',
      label: 'Kenniscentrum',
      dropdown: [
        { path: '/ai-tools', label: 'Tool Database', color: 'hover:bg-orange-50 hover:text-orange-600' },
        { path: '/kennisbank', label: 'Kennisbank', color: 'hover:bg-orange-50 hover:text-orange-600' },
        { path: '/blog', label: 'Blog & Nieuws', color: 'hover:bg-orange-50 hover:text-orange-600' },
      ]
    },
    { 
      id: 'trainingen', 
      label: 'Trainingen',
      dropdown: [
        { path: '/trainingen', label: 'Alle Trainingen', color: 'hover:bg-pink-50 hover:text-pink-600' },
        { path: '/trainingen/chatgpt-in-de-klas', label: 'ChatGPT in de Klas', color: 'hover:bg-pink-50 hover:text-pink-600' },
        { path: '/trainingen/ai-differentiatie', label: 'Differentiatie met AI', color: 'hover:bg-pink-50 hover:text-pink-600' },
      ]
    },
  ];

  const toggleDropdown = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-primary-600 p-2 rounded-lg">
              <SafeIcon icon={FiBrain} className="text-2xl text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">Onderwijs.ai</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">AI VOOR DOCENTEN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      ref={el => buttonRefs.current[`desktop-${item.id}`] = el}
                      onClick={(e) => toggleDropdown(`desktop-${item.id}`, e)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 font-medium text-sm"
                      aria-expanded={activeDropdown === `desktop-${item.id}`}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <SafeIcon 
                        icon={FiChevronDown} 
                        className={`transition-transform duration-200 text-xs ${activeDropdown === `desktop-${item.id}` ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === `desktop-${item.id}` && (
                        <motion.div
                          ref={el => dropdownRefs.current[`desktop-${item.id}`] = el}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`block px-5 py-3 text-sm transition-colors ${subItem.color}`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-gray-700 hover:text-primary-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 text-sm font-medium ${isActive(item.path) ? 'text-primary-600' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <Link 
              to="/downloads" 
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors text-sm font-bold shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} />
              <span>Gids V9.0</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div className="py-2">
                      <button
                        ref={el => buttonRefs.current[`mobile-${item.id}`] = el}
                        className="flex items-center justify-between w-full text-left text-gray-800 font-semibold px-2 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={(e) => toggleDropdown(`mobile-${item.id}`, e)}
                        aria-expanded={activeDropdown === `mobile-${item.id}`}
                      >
                        <span>{item.label}</span>
                        <SafeIcon 
                          icon={FiChevronDown} 
                          className={`transition-transform duration-200 ${activeDropdown === `mobile-${item.id}` ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === `mobile-${item.id}` && (
                          <motion.div
                            ref={el => dropdownRefs.current[`mobile-${item.id}`] = el}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 rounded-lg mt-1 ml-2 border-l-2 border-gray-200"
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                className={`block px-4 py-3 text-sm font-medium ${subItem.color}`}
                                onClick={() => { setActiveDropdown(null); setIsOpen(false); }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-2 py-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg transition-colors ${isActive(item.path) ? 'text-primary-600 bg-primary-50' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link 
                  to="/downloads" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary-600 text-white px-4 py-3 rounded-xl text-center font-bold shadow-md"
                >
                  Download Startersgids V9.0
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;