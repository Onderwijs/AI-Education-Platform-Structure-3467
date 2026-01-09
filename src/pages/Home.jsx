import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';

const {FiTrendingUp,FiTool,FiBook,FiUsers}=FiIcons;

const Home=()=> {
  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen">
      <SEO 
        title="Onderwijs.AI – Privacy-first AI implementatie voor het onderwijs"
        description="Onderwijs.AI helpt scholen en docenten met veilige, begrijpelijke AI-oplossingen voor leren, lezen en onderwijsinnovatie. Ontdek onze tools en lessen."
        schema={{ "@type": "WebPage", "about": "AI in het onderwijs implementatie" }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <header>
              <h1 className="text-4xl md:text-6xl font-bold mb-6"> De standaard voor verantwoord AI-gebruik in het onderwijs </h1>
              <p className="text-xl mb-8 text-primary-100"> Praktische tools, lessen en trainingen, ingebed in een helder onderwijsframework voor docenten en teams. </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/framework" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                  <SafeIcon icon={FiTrendingUp} /> Ontdek het Framework™
                </Link>
                <Link to="/tools" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all flex items-center gap-2">
                  <SafeIcon icon={FiTool} /> Bekijk AI-tools
                </Link>
              </div>
            </header>
            <figure className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="Docent en leerlingen ontdekken de mogelijkheden van AI in een modern klaslokaal" 
                className="rounded-2xl shadow-2xl" 
                loading="eager"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> AI in het Onderwijs Implementeren </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> Ontdek hoe kunstmatige intelligentie de onderwijskwaliteit kan verhogen terwijl de privacy gewaarborgd blijft. </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
              <SafeIcon icon={FiBook} className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Praktische Lessen</h3>
              <p className="text-gray-600">Direct toepasbare AI-lesbrieven voor PO, VO en MBO.</p>
            </article>
            <article className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
              <SafeIcon icon={FiTool} className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">AI Tools Overzicht</h3>
              <p className="text-gray-600">Een gecureerde database van geteste tools voor docenten.</p>
            </article>
            <article className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
              <SafeIcon icon={FiUsers} className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Trainingen</h3>
              <p className="text-gray-600">Professionalisering voor teams en individuele docenten.</p>
            </article>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;