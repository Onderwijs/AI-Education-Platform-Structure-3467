import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiBook, FiTrendingUp, FiArrowRight } = FiIcons;

const VoorDocenten = () => {
  const sectors = [
    {
      id: 'po',
      title: 'Basisonderwijs (PO)',
      description: 'AI-tools en lessen speciaal ontworpen voor groep 1 t/m 8',
      features: [
        'Spelenderwijs leren met AI',
        'Differentiatie tools',
        'Creatieve opdrachten',
        'Digitale vaardigheden'
      ],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      link: '/voor-docenten/po'
    },
    {
      id: 'vo',
      title: 'Voortgezet Onderwijs (VO)',
      description: 'Praktische AI-toepassingen voor alle vakken in het VO',
      features: [
        'Vakspecifieke AI-tools',
        'Onderzoeksvaardigheden',
        'Kritisch denken',
        'Examenvoorbereiding'
      ],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      link: '/voor-docenten/vo'
    },
    {
      id: 'mbo-hbo',
      title: 'MBO & HBO',
      description: 'Geavanceerde AI-toepassingen voor beroepsonderwijs',
      features: [
        'Praktijkgerichte projecten',
        'Professionele tools',
        'Arbeidsmarktvoorbereiding',
        'Innovatie & ondernemerschap'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      link: '/voor-docenten/mbo-hbo'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI voor Elke Onderwijslaag
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Ontdek hoe AI jouw specifieke onderwijscontext kan verbeteren. 
              Van basisonderwijs tot hoger onderwijs, wij hebben de tools en kennis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {sector.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {sector.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={sector.link}
                    className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <span>Ontdek meer</span>
                    <SafeIcon icon={FiArrowRight} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom AI in Jouw Onderwijs?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI biedt concrete voordelen voor docenten en leerlingen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Meer Tijd voor Leerlingen
              </h3>
              <p className="text-gray-600">
                Automatiseer routinetaken en besteed meer tijd aan persoonlijke begeleiding
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiBook} className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Gepersonaliseerd Leren
              </h3>
              <p className="text-gray-600">
                Pas onderwijs aan op individuele behoeften en leerstijlen van leerlingen
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiTrendingUp} className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Betere Leerresultaten
              </h3>
              <p className="text-gray-600">
                Gebruik data-gedreven inzichten om leerprocessen te optimaliseren
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Download onze gratis startersgids en begin vandaag met AI in jouw klas
            </p>
            <Link
              to="/nieuwsbrief"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Download Gratis Gids</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default VoorDocenten;