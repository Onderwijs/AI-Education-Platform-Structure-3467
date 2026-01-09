import React from 'react';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';

const OverOns=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="Over Onderwijs.AI – Onze visie op AI in het onderwijs"
        description="Maak kennis met het team achter Onderwijs.AI. Wij vertalen complexe AI-technologie naar praktische, didactisch onderbouwde tools voor docenten."
        schema={{ "@type": "AboutPage" }}
      />
      
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <header>
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> Onze Missie </h1>
              <p className="text-xl text-primary-100 mb-8"> Wij geloven dat AI de docent moet versterken, niet vervangen. Privacy-first en didactisch onderbouwd. </p>
            </header>
            <figure>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Het team van Onderwijs.AI ontwikkelt nieuwe onderwijsmethoden" 
                className="rounded-2xl shadow-2xl" 
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default OverOns;