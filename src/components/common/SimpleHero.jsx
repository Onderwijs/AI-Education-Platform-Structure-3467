import React from 'react';
import { motion } from 'framer-motion';

const SimpleHero = ({ title, subtitle, color = "from-blue-600 to-purple-600" }) => {
  return (
    <section className={`bg-gradient-to-br ${color} text-white py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl opacity-90 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleHero;