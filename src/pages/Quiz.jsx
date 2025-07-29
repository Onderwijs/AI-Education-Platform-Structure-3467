import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiCheck, FiDownload, FiUser, FiBook, FiTool, FiStar } = FiIcons;

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'experience',
      question: 'Hoeveel ervaring heb je met AI tools?',
      options: [
        { value: 'beginner', label: 'Ik ben een beginner', description: 'Ik heb nog weinig of geen ervaring' },
        { value: 'intermediate', label: 'Ik heb wat ervaring', description: 'Ik gebruik soms AI tools' },
        { value: 'advanced', label: 'Ik ben ervaren', description: 'Ik gebruik regelmatig AI tools' }
      ]
    },
    {
      id: 'education_level',
      question: 'In welke onderwijslaag ben je werkzaam?',
      options: [
        { value: 'po', label: 'Primair Onderwijs (PO)', description: 'Basisschool' },
        { value: 'vo', label: 'Voortgezet Onderwijs (VO)', description: 'Middelbare school' },
        { value: 'mbo', label: 'MBO', description: 'Middelbaar beroepsonderwijs' },
        { value: 'hbo', label: 'HBO/WO', description: 'Hoger onderwijs' }
      ]
    },
    {
      id: 'goal',
      question: 'Wat wil je vooral bereiken met AI?',
      options: [
        { value: 'time', label: 'Tijd besparen', description: 'Efficiënter werken en administratie verminderen' },
        { value: 'personalize', label: 'Onderwijs personaliseren', description: 'Maatwerk bieden aan leerlingen' },
        { value: 'creativity', label: 'Creativiteit stimuleren', description: 'Nieuwe lesvormen en projecten ontwikkelen' },
        { value: 'skills', label: 'Digitale vaardigheden', description: 'Leerlingen voorbereiden op de toekomst' }
      ]
    },
    {
      id: 'challenges',
      question: 'Wat is je grootste uitdaging met AI?',
      options: [
        { value: 'knowledge', label: 'Gebrek aan kennis', description: 'Ik weet niet goed hoe ik moet beginnen' },
        { value: 'time_to_learn', label: 'Tijd om te leren', description: 'Ik heb weinig tijd om me te verdiepen' },
        { value: 'ethics', label: 'Ethische zorgen', description: 'Ik maak me zorgen over privacy en bias' },
        { value: 'integration', label: 'Integratie in curriculum', description: 'Ik weet niet hoe ik AI kan inpassen' }
      ]
    }
  ];

  const handleAnswerSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendedTools = () => {
    // Simple logic to determine recommendations based on answers
    const tools = [];
    
    if (answers.experience === 'beginner') {
      tools.push({
        name: "ChatGPT",
        description: "De perfecte AI-assistent voor beginners",
        category: "Tekstverwerking"
      });
    }
    
    if (answers.education_level === 'po') {
      tools.push({
        name: "AI Story Creator",
        description: "Ontwikkel verhalen en lesmateriaal voor jonge leerlingen",
        category: "Creativiteit"
      });
    } else if (answers.education_level === 'vo' || answers.education_level === 'mbo') {
      tools.push({
        name: "Quillbot",
        description: "Schrijfhulp en grammaticacontrole voor leerlingen",
        category: "Tekstverwerking"
      });
    }
    
    if (answers.goal === 'time') {
      tools.push({
        name: "Gamma",
        description: "Snelle en professionele presentaties maken",
        category: "Presentaties"
      });
    } else if (answers.goal === 'creativity') {
      tools.push({
        name: "DALL-E",
        description: "Genereer afbeeldingen voor creatieve lessen",
        category: "Beeldgeneratie"
      });
    }
    
    // Add a default option if not enough recommendations
    if (tools.length < 3) {
      tools.push({
        name: "Perplexity AI",
        description: "Onderzoek met bronvermelding voor alle onderwijsniveaus",
        category: "Onderzoek"
      });
    }
    
    return tools;
  };

  const renderQuizContent = () => {
    if (showResult) {
      const recommendedTools = getRecommendedTools();
      
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCheck} className="text-3xl text-indigo-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Jouw persoonlijke AI-advies
            </h2>
            <p className="text-gray-600">
              Gebaseerd op je antwoorden hebben we de volgende AI-tools geselecteerd
            </p>
          </div>
          
          <div className="space-y-6 mb-8">
            {recommendedTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <SafeIcon icon={FiTool} className="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-xl font-semibold text-gray-900 mr-2">{tool.name}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ontvang je volledige AI-advies
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                We sturen je een uitgebreid advies met lesvoorbeelden en handleidingen
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/ai-tools"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex-1 text-center"
              >
                Bekijk alle AI-tools
              </Link>
              <Link
                to="/nieuwsbrief"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex-1 text-center flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiDownload} />
                <span>Ontvang advies</span>
              </Link>
            </div>
          </div>
        </motion.div>
      );
    }
    
    const currentQuestion = questions[currentStep];
    
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Vraag {currentStep + 1} van {questions.length}</span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => (
            <div
              key={option.value}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                answers[currentQuestion.id] === option.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
              onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
            >
              <div className="flex items-start">
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === option.value && (
                    <SafeIcon icon={FiCheck} className="text-xs text-white" />
                  )}
                </div>
                <div>
                  <span className="block font-medium text-gray-900">{option.label}</span>
                  <span className="text-sm text-gray-500">{option.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handlePrevStep}
              className="text-gray-600 hover:text-gray-900"
            >
              Vorige
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={handleNextStep}
            disabled={!answers[currentQuestion.id]}
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              answers[currentQuestion.id]
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === questions.length - 1 ? 'Resultaten bekijken' : 'Volgende'}</span>
            <SafeIcon icon={FiArrowRight} />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ontdek welke AI-tools bij jou passen
          </h1>
          <p className="text-xl text-gray-600">
            Beantwoord enkele vragen en krijg een persoonlijk advies
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {renderQuizContent()}
        </AnimatePresence>
        
        {!showResult && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Je ontvangt een op maat gemaakt advies op basis van jouw antwoorden.
              We sturen je ook voorbeeldlessen en handleidingen die passen bij jouw situatie.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;