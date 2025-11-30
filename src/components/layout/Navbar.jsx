import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMenu, FiX, FiChevronDown, FiBrain } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRefs = useRef({});
  const buttonRefs = useRef({});

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown) {
        const dropdownRef = dropdownRefs.current[activeDropdown];
        const buttonRef = buttonRefs.current[activeDropdown];
        if (dropdownRef && !dropdownRef.contains(event.target) && buttonRef && !buttonRef.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Reset on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  
  const isParentActive = (item) => {
    if (item.dropdown) {
      return item.dropdown.some(sub => location.pathname.startsWith(sub.path));
    }
    return location.pathname === item.path;
  };

  // NIEUWE NAVIGATIE STRUCTUUR 2025
  const navItems = [
    { path: '/', label: 'Home' },
    { 
      id: 'tools', 
      label: 'Tools', 
      dropdown: [
        { path: '/tools', label: 'Interactieve Tools (Overzicht)', color: 'bg-indigo-50 text-indigo-600' },
        { path: '/tools/lesgenerator', label: 'Lesgenerator', color: 'hover:bg-indigo-50 text-gray-700' },
        { path: '/tools/rubriekmaker', label: 'Rubriekmaker', color: 'hover:bg-indigo-50 text-gray-700' },
        { path: '/tools/toetsvragenmaker', label: 'Toetsvragenmaker', color: 'hover:bg-indigo-50 text-gray-700' },
        { path: '/tools/taalcoach', label: 'Taalcoach', color: 'hover:bg-indigo-50 text-gray-700' },
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
      id: 'leslab', 
      label: 'Lesmateriaal', 
      dropdown: [
        { path: '/leslab', label: 'LesLab (Archief)', color: 'hover:bg-emerald-50 hover:text-emerald-600' },
        { path: '/downloads', label: 'Downloads & Startersgids', color: 'hover:bg-emerald-50 hover:text-emerald-600' },
      ]
    },
    { 
      id: 'kenniscentrum', 
      label: 'Kenniscentrum', 
      dropdown: [
        { path: '/ai-tools', label: 'AI Tool Database', color: 'hover:bg-yellow-50 hover:text-yellow-600' },
        { path: '/blog', label: 'Blog & Nieuws', color: 'hover:bg-yellow-50 hover:text-yellow-600' },
        { path: '/kennisbank', label: 'Kennisbank', color: 'hover:bg-yellow-50 hover:text-yellow-600' },
      ]
    },
    { path: '/trainingen', label: 'Trainingen' },
  ];

  const toggleDropdown = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDownloadClick = () => {
    window.open('/downloads', '_self');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <SafeIcon icon={FiBrain} className="text-2xl text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AI in het Onderwijs</span>
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
                      className={`flex items-center space-x-1 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 ${isParentActive(item) ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                    >
                      <span>{item.label}</span>
                      <SafeIcon icon={FiChevronDown} className={`transition-transform duration-200 ${activeDropdown === `desktop-${item.id}` ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === `desktop-${item.id}` && (
                        <motion.div
                          ref={el => dropdownRefs.current[`desktop-${item.id}`] = el}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link 
                              key={subIndex} 
                              to={subItem.path} 
                              className={`block px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${subItem.color || ''}`}
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
                    className={`transition-colors py-2 px-2 rounded-md hover:bg-gray-50 ${isActive(item.path) ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-primary-600'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <button 
              onClick={handleDownloadClick}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold shadow-sm"
            >
              Downloads
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-200 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.dropdown ? (
                    <div>
                      <button 
                        ref={el => buttonRefs.current[`mobile-${item.id}`] = el}
                        className="flex items-center w-full text-left text-gray-700 font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={(e) => toggleDropdown(`mobile-${item.id}`, e)}
                      >
                        <span>{item.label}</span>
                        <SafeIcon icon={FiChevronDown} className={`ml-2 transition-transform duration-200 ${activeDropdown === `mobile-${item.id}` ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === `mobile-${item.id}` && (
                          <motion.div 
                            ref={el => dropdownRefs.current[`mobile-${item.id}`] = el}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 rounded-md mx-2 mt-2"
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <Link 
                                key={subIndex} 
                                to={subItem.path} 
                                className="block px-6 py-3 text-sm text-gray-600 hover:text-primary-600"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsOpen(false);
                                }}
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
                      className="block px-4 py-2 text-gray-700 hover:text-primary-600 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <button 
                onClick={() => {
                  handleDownloadClick();
                  setIsOpen(false);
                }}
                className="block mx-4 mt-4 bg-primary-600 text-white px-4 py-3 rounded-lg text-center font-semibold w-auto"
              >
                Downloads
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;