import React from 'react';
import {motion} from 'framer-motion';
import SEO from '../components/common/SEO';

const OverOns=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      <SEO 
        title="Over Onderwijs.AI – Onze missie en visie op AI in de klas"
        description="Maak kennis met Onderwijs.AI. Wij vertalen complexe AI-technologie naar praktische, didactisch onderbouwde tools voor docenten in heel Nederland."
      />
      
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> Over Onderwijs.AI </h1>
              <p className="text-xl text-primary-100 mb-8"> Geen hype, maar hulp in de klas. Wij maken AI toegankelijk voor elke docent. </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Het team van Onderwijs.AI werkt aan nieuwe didactische frameworks" 
                className="rounded-2xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-indigo">
          <h2 className="text-3xl font-bold text-gray-900">Onze Missie</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Onderwijs.AI is ontstaan vanuit de behoefte aan een nuchtere, didactische blik op kunstmatige intelligentie. Terwijl de techniek razendsnel gaat, blijft de kern van onderwijs hetzelfde: de relatie tussen docent en leerling. Onze tools zijn ontworpen om die relatie te versterken, niet te vervangen.
          </p>
        </div>
      </section>
    </motion.main>
  );
};

export default OverOns;