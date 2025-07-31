import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiCheck, FiArrowRight, FiBook, FiTool, FiUsers } = FiIcons;

const GetStartedComponent = () => {
  const steps = [
    {
      id: 1,
      title: "Ontdek AI-Tools",
      description: "Verken onze database van 50+ geteste AI-tools voor docenten",
      completed: false,
      action: "Bekijk AI-Tools",
      link: "/ai-tools"
    },
    {
      id: 2,
      title: "Download Startersgids",
      description: "Krijg toegang tot onze complete AI-toolkit voor docenten",
      completed: false,
      action: "Download Gids",
      link: "/nieuwsbrief"
    },
    {
      id: 3,
      title: "Volg een Training",
      description: "Leer AI effectief inzetten met onze praktische trainingen",
      completed: false,
      action: "Bekijk Trainingen",
      link: "/trainingen"
    },
    {
      id: 4,
      title: "Gebruik Lessen",
      description: "Probeer onze kant-en-klare AI-lessen in jouw klas",
      completed: false,
      action: "Bezoek LesLab",
      link: "/leslab"
    }
  ];

  const handleStepClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiPlay} className="text-3xl text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Jouw AI-reis begint hier
        </h2>
        <p className="text-xl text-gray-600">
          Volg deze stappen om AI succesvol te integreren in jouw onderwijs
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.completed 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-primary-100 text-primary-600'
              }`}>
                {step.completed ? (
                  <SafeIcon icon={FiCheck} className="text-xl" />
                ) : (
                  <span className="font-bold text-lg">{step.id}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                
                <button
                  onClick={() => handleStepClick(step.link)}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    step.completed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <span>{step.action}</span>
                  <SafeIcon icon={FiArrowRight} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Hulp nodig?
          </h3>
          <p className="text-gray-600 mb-6">
            Ons team staat klaar om je te helpen bij je AI-reis in het onderwijs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleStepClick('/over-ons')}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Neem Contact Op</span>
            </button>
            <button
              onClick={() => handleStepClick('/blog')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiBook} />
              <span>Lees Blog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedComponent;