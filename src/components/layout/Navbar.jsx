import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMenu, FiX, FiChevronDown, FiBrain, FiBook, FiUsers, FiTool } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      label: 'Home'
    },
    {
      label: 'Voor Docenten',
      dropdown: [
        {
          path: '/voor-docenten/po',
          label: 'Basisonderwijs (PO)'
        },
        {
          path: '/voor-docenten/vo',
          label: 'Voortgezet Onderwijs (VO)'
        },
        {
          path: '/voor-docenten/mbo-hbo',
          label: 'MBO & HBO'
        },
      ]
    },
    {
      path: '/ai-tools',
      label: 'AI Tools'
    },
    {
      path: '/leslab',
      label: 'LesLab'
    },
    {
      path: '/trainingen',
      label: 'Trainingen'
    },
    {
      path: '/blog',
      label: 'Blog'
    },
  ];

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = (e) => {
    // Don't stop propagation here to allow link navigation
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <SafeIcon icon={FiBrain} className="text-2xl text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AI in Onderwijs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={handleDropdownToggle} 
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors py-2"
                    >
                      <span>{item.label}</span>
                      <SafeIcon 
                        icon={FiChevronDown} 
                        className={`text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {/* Use fixed positioning instead of absolute for dropdown menu */}
                    {dropdownOpen && (
                      <div 
                        className="fixed mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] py-1"
                        style={{
                          top: dropdownRef.current?.getBoundingClientRect().bottom || 0,
                          left: dropdownRef.current?.getBoundingClientRect().left || 0
                        }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            to={subItem.path} 
                            onClick={handleDropdownItemClick}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`text-gray-700 hover:text-primary-600 transition-colors py-2 ${isActive(item.path) ? 'text-primary-600 font-medium' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              to="/nieuwsbrief" 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Gratis Download
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={handleMobileMenuToggle} 
            className="md:hidden p-2"
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
              className="md:hidden py-4 border-t"
            >
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.dropdown ? (
                    <div>
                      <div className="text-gray-700 font-medium px-4 py-2">{item.label}</div>
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex} 
                          to={subItem.path} 
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                          onClick={handleDropdownItemClick}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link 
                      to={item.path} 
                      className="block px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={handleDropdownItemClick}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link 
                to="/nieuwsbrief" 
                className="block mx-4 mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg text-center hover:bg-primary-700 transition-colors"
                onClick={handleDropdownItemClick}
              >
                Gratis Download
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;