import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      loadGA();
    }
  }, []);

  const loadGA = () => {
    if (window.gtag_loaded) return;
    
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-7ZGKELGBFJ';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-7ZGKELGBFJ', { 
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });
    window.gtag_loaded = true;
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadGA();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 z-[9999] py-3 px-4 shadow-none"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-700 text-sm font-sans">
              <strong className="mr-2">Cookies</strong>
              Onderwijs.ai gebruikt functionele cookies en analytische cookies van derden om het gebruik van de website te verbeteren.
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Weigeren
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1 text-xs font-bold bg-gray-800 text-white rounded hover:bg-black transition-colors"
              >
                Accepteren
              </button>
              <Link
                to="/privacy"
                className="px-3 py-1 text-xs font-medium text-blue-600 hover:underline"
              >
                Privacy
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;