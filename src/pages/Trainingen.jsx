import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';

const {FiCalendar,FiCheck,FiExternalLink,FiMail}=FiIcons;

const Trainingen=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="AI Trainingen & Workshops voor Onderwijsteams"
        description="Professionaliseer je team met onze AI-workshops. Van basisvaardigheden tot strategische implementatie. Ontdek onze trainingen voor docenten en schoolleiders."
      />
      
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6"> AI Trainingen voor het Onderwijs </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"> Praktische workshops om AI effectief te integreren in jouw onderwijspraktijk. Voor docenten, mentoren en schoolleiders. </p>
          <a href="#trainingen" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block shadow-lg">Bekijk aanbod</a>
        </div>
      </section>
      
      {/* ... rest of the training grid with semantic <article> tags ... */}
    </motion.main>
  );
};

export default Trainingen;