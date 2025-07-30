import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { downloadStartersgids } from '../utils/downloadUtils';

const { FiDownload, FiBook, FiUsers, FiTool, FiTrendingUp, FiAward, FiPlay, FiArrowRight } = FiIcons;

const Home = () => {
  const features = [
    {
      icon: FiBook,
      title: "Praktische Lessen",
      description: "Direct toepasbare AI-lessen voor elke onderwijslaag"
    },
    {
      icon: FiTool,
      title: "AI Tools Overzicht",
      description: "Uitgebreide database van geteste AI-tools voor docenten"
    },
    {
      icon: FiUsers,
      title: "Trainingen & Workshops",
      description: "Persoonlijke begeleiding en teamtrainingen"
    }
  ];

  const highlights = [
    {
      category: "Voor Docenten",
      title: "AI in het Basisonderwijs",
      description: "Ontdek hoe AI het leren van jonge kinderen kan ondersteunen",
      link: "/voor-docenten/po",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop"
    },
    {
      category: "LesLab",
      title: "AI-Lessen",
      description: "Kant-en-klare AI-lessen voor jouw klas",
      link: "/leslab",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      category: "AI Tools",
      title: "AI Tool Database",
      description: "Ontdek de beste AI-tools voor jouw vakgebied",
      link: "/ai-tools",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    }
  ];

  const handleDownloadClick = () => {
    downloadStartersgids();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI in het <span className="text-primary-200">Onderwijs</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Ontdek hoe kunstmatige intelligentie jouw onderwijs kan verbeteren. Praktische tools, lessen en trainingen voor moderne docenten.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleDownloadClick}
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} />
                  <span>Gratis Download</span>
                </button>
                <Link
                  to="/quiz"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlay} />
                  <span>Start Quiz</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-primary-200">Docenten</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-primary-200">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm text-primary-200">Lessen</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
                alt="AI in onderwijs"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom AI in het Onderwijs?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kunstmatige intelligentie biedt ongekende mogelijkheden om onderwijs persoonlijker, effectiever en toegankelijker te maken.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <SafeIcon icon={feature.icon} className="text-4xl text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ontdek Onze Highlights
            </h2>
            <p className="text-xl text-gray-600">
              Van praktische lessen tot complete trainingen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">
                    {highlight.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{highlight.description}</p>
                  <Link
                    to={highlight.link}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span>Meer info</span>
                    <SafeIcon icon={FiArrowRight} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start vandaag met AI in jouw onderwijs
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Download gratis onze AI-toolkit en ontvang nieuwe lessen en tips
            </p>
            <button
              onClick={handleDownloadClick}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} />
              <span>Gratis Download + Nieuwsbrief</span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;