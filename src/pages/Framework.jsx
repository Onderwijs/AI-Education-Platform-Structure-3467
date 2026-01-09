import React from 'react';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiLayers,FiCheckCircle,FiCpu,FiActivity}=FiIcons;

const Framework=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="Het Onderwijs-AI Framework™ – Strategische Implementatie"
        description="Een onderwijskundig kader voor de verantwoorde implementatie van AI op school. Van oriëntatie (niveau 0) tot volledige borging (niveau 5)."
      />
      
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6"> Het Onderwijs-AI Framework™ </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto"> Een kompas voor docenten en schoolleiders om stapsgewijs en verantwoord te groeien in AI-geletterdheid. </p>
        </div>
      </section>

      {/* ... Content ... */}
    </motion.main>
  );
};

export default Framework;