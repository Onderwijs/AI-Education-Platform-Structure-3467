import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEO from '../components/common/SEO';

const {FiTrendingUp,FiTool,FiBook,FiUsers}=FiIcons;

const Home=()=> {
  const navigate=useNavigate();
  const features=[
    {icon: FiBook,title: "Praktische Lessen",description: "Direct toepasbare AI-lessen voor elke onderwijslaag. Voor Levels 1–3 van het Onderwijs-AI Framework™",path: "/leslab"},
    {icon: FiTool,title: "AI Tools Overzicht",description: "Uitgebreide database van geteste AI-tools voor docenten. Voor Levels 2–4 van het Onderwijs-AI Framework™",path: "/tools"},
    {icon: FiUsers,title: "Trainingen & Workshops",description: "Persoonlijke begeleiding en teamtrainingen. Voor Levels 3–5 van het Onderwijs-AI Framework™",path: "/trainingen"}
  ];

  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen">
      <SEO 
        title="Onderwijs.AI – Privacy-first AI implementatie voor het onderwijs"
        description="Onderwijs.AI helpt scholen en docenten met veilige, begrijpelijke AI-oplossingen voor leren, lezen en onderwijsinnovatie. Ontdek onze tools en lessen."
      />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity: 0,x: -50}} animate={{opacity: 1,x: 0}}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6"> De standaard voor verantwoord AI-gebruik in het onderwijs </h1>
              <p className="text-xl mb-8 text-primary-100"> Praktische tools, lessen en trainingen, ingebed in een helder onderwijsframework voor docenten, teams en scholen. </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/framework" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg border-2 border-white" >
                  <SafeIcon icon={FiTrendingUp} /> <span>Ontdek het Framework™</span>
                </Link>
                <Link to="/tools" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2" >
                  <SafeIcon icon={FiTool} /> <span>AI-tools overzicht</span>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{opacity: 0,x: 50}} animate={{opacity: 1,x: 0}} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="Docent en leerlingen gebruiken AI op laptops in een modern klaslokaal" 
                className="rounded-2xl shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> AI in het Onderwijs Implementeren </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> Kunstmatige intelligentie biedt ongekende mogelijkheden om onderwijs persoonlijker, effectiever en toegankelijker te maken. </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature,index)=> (
              <article key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow cursor-pointer border border-gray-100" onClick={()=> navigate(feature.path)} >
                <SafeIcon icon={feature.icon} className="text-4xl text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3"> {feature.title} </h3>
                <p className="text-gray-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;