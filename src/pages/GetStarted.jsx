import React from 'react';
import { motion } from 'framer-motion';
import GetStartedComponent from '../components/quest/GetStartedComponent';

const GetStarted = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welkom bij AI in Onderwijs
            </h1>
            <p className="text-xl text-primary-100">
              Volg deze stappen om het maximale uit onze platform te halen
            </p>
          </motion.div>
        </div>
      </section>

      {/* GetStarted Component */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GetStartedComponent />
        </div>
      </section>
    </motion.div>
  );
};

export default GetStarted;