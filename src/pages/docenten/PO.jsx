import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import SEO from '../../components/common/SEO';

const {FiBook,FiDownload,FiFlag,FiExternalLink,FiArrowRight,FiStar}=FiIcons;

const PO=()=> {
  // ... (data arrays blijven hetzelfde)

  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="AI in het Basisonderwijs (PO) – Tools & Lessen"
        description="Ontdek hoe AI het basisonderwijs verrijkt. Praktische lessen voor groep 1-8, Nederlandse AI-tools en didactische tips voor docenten in het PO."
      />
      
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6"> AI in het Basisonderwijs </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"> Maak kennis met kunstmatige intelligentie op een speelse en veilige manier. Perfect voor groep 1 t/m 8, met speciale aandacht voor Nederlandse tools. </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/leslab" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Bekijk Lessen</Link>
          </div>
        </div>
      </section>

      {/* SEO optimalisatie: Alt tags toevoegen aan bestaande afbeeldingen */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-center space-x-2 mb-12">
             <SafeIcon icon={FiFlag} className="text-2xl text-orange-600" />
             <h2 className="text-3xl font-bold">Nederlandse AI-Tools voor PO</h2>
           </div>
           {/* ... rest of the grid ... */}
        </div>
      </section>
    </motion.main>
  );
};

export default PO;