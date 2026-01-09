import React,{useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';
import {lessons} from '../data/lessons';

const {FiDownload,FiCheck,FiList,FiActivity,FiFilter,FiUsers}=FiIcons;

const LesLab=()=> {
  const [selectedMonth,setSelectedMonth]=useState('Alle');
  const [selectedLevel,setSelectedLevel]=useState('Alle');
  const currentLesson=lessons[0];

  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="AI Lesmateriaal & Lesbrieven voor het Onderwijs"
        description="Download kant-en-klare lesbrieven over AI voor PO, VO en MBO. Didactisch onderbouwde lessen die direct inzetbaar zijn in de klas. Privacy-first."
      />

      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6"> LesLab: AI-Lessen </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto"> Professioneel lesmateriaal voor elke onderwijslaag. Direct inzetbaar en didactisch verantwoord. </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src={currentLesson.image} 
                alt={`Voorbeeld van de AI-les: ${currentLesson.title}`} 
                className="rounded-2xl shadow-2xl w-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{currentLesson.title}</h2>
              <p className="text-gray-600 text-lg mb-6">{currentLesson.summary}</p>
              {/* ... CTA button ... */}
            </div>
          </article>
        </div>
      </section>
    </motion.main>
  );
};

export default LesLab;