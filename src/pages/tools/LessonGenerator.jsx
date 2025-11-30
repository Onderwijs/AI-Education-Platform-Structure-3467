import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiCopy, FiCheck, FiClock, FiTarget, FiBook, FiLayers, FiList, FiActivity } = FiIcons;

const LessonGenerator = () => {
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    duration: '50',
    goal: ''
  });
  
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate content (Client-side logic)
  const generateLesson = (e) => {
    e.preventDefault();
    
    // Calculate phases based on duration
    const durationNum = parseInt(formData.duration) || 50;
    const startDuration = Math.max(5, Math.round(durationNum * 0.15));
    const endDuration = Math.max(5, Math.round(durationNum * 0.15));
    const coreDuration = durationNum - startDuration - endDuration;

    // Create readable lesson object
    const lessonContent = {
      title: `Lesconcept: ${formData.subject}`,
      subtitle: `Niveau: ${formData.level} | Duur: ${formData.duration} minuten`,
      intro: `In deze les gaan leerlingen aan de slag met ${formData.subject}. De focus ligt op het behalen van het volgende leerdoel: "${formData.goal}".`,
      objectives: [
        `De leerling kan de kern van ${formData.subject} in eigen woorden uitleggen.`,
        `De leerling kan de behandelde stof toepassen in een opdracht.`,
        `Hoofddoel behaald: ${formData.goal}`
      ],
      materials: ["Digibord / Presentatiescherm", "Schrijfgerief voor leerlingen", "Eventuele devices (laptops/tablets)", "Werkbladen (indien van toepassing)"],
      schedule: [
        { 
          phase: "Start / Introductie", 
          time: `${startDuration} min`, 
          activity: "Ontvangst, voorkennis activeren en bespreken van het leerdoel." 
        },
        { 
          phase: "Kern / Instructie & Verwerking", 
          time: `${coreDuration} min`, 
          activity: "Korte instructie gevolgd door zelfstandige verwerking of groepswerk gericht op het leerdoel." 
        },
        { 
          phase: "Afsluiting / Evaluatie", 
          time: `${endDuration} min`, 
          activity: "Klassikale nabespreking, reflectie op het leerdoel en vooruitblik." 
        }
      ],
      evaluation: "Controleer begrip door middel van een exit-ticket, een korte quiz of door 3 willekeurige leerlingen te vragen het leerdoel samen te vatten."
    };

    // Create AI Prompt string
    const promptText = `Je bent een ervaren docent. Maak een complete les.

Vak: ${formData.subject}
Niveau: ${formData.level}
Tijdsduur: ${formData.duration} minuten
Leerdoel: ${formData.goal}

Lever de les aan met:
- Korte inleiding
- Concrete leerdoelen
- Benodigde materialen
- Lesverloop (start, kern, afsluiting)
- Suggesties voor differentiatie
- Manier om te evalueren of het leerdoel is behaald`;

    setResult({ lesson: lessonContent, prompt: promptText });
  };

  const copyToClipboard = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Lesgenerator (Beta)" 
        subtitle="Maak razendsnel een basis lesopzet en genereer een AI-prompt." 
        color="from-indigo-600 to-blue-500" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
              <SafeIcon icon={FiCpu} className="text-2xl text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Les Details</h2>
            </div>

            <form onSubmit={generateLesson} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vakgebied</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiBook} /></span>
                  <input 
                    type="text" 
                    name="subject" 
                    required
                    placeholder="Bijv. Geschiedenis, Wiskunde, Biologie" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiLayers} /></span>
                    <input 
                      type="text" 
                      name="level" 
                      required
                      placeholder="Bijv. 3 HAVO" 
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tijdsduur (min)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiClock} /></span>
                    <input 
                      type="number" 
                      name="duration" 
                      required
                      min="10"
                      max="180"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leerdoel</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400"><SafeIcon icon={FiTarget} /></span>
                  <textarea 
                    name="goal" 
                    required
                    rows="3"
                    placeholder="Wat moeten de leerlingen aan het einde van de les kennen of kunnen?" 
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiCpu} />
                <span>Genereer Lesconcept</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-6">
            {!result ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400">
                <SafeIcon icon={FiActivity} className="text-4xl mb-3 opacity-50" />
                <p>Vul het formulier in om je les te genereren.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Generated Lesson View */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-indigo-50 p-4 border-b border-indigo-100">
                    <h3 className="font-bold text-indigo-900 text-lg">{result.lesson.title}</h3>
                    <p className="text-indigo-600 text-sm">{result.lesson.subtitle}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-gray-700 italic border-l-4 border-indigo-300 pl-4 bg-gray-50 py-2">
                      {result.lesson.intro}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <SafeIcon icon={FiTarget} className="text-indigo-500" /> Leerdoelen
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {result.lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <SafeIcon icon={FiList} className="text-indigo-500" /> Lesverloop
                      </h4>
                      <div className="space-y-3">
                        {result.lesson.schedule.map((item, i) => (
                          <div key={i} className="flex gap-3 text-sm">
                            <span className="font-mono font-bold text-indigo-600 w-16 shrink-0 bg-indigo-50 px-2 py-1 rounded text-center h-fit">
                              {item.time}
                            </span>
                            <div>
                              <span className="font-semibold text-gray-900 block">{item.phase}</span>
                              <span className="text-gray-600">{item.activity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-100">
                      <strong>Evaluatie:</strong> {result.lesson.evaluation}
                    </div>
                  </div>
                </div>

                {/* Copy Prompt Section */}
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-purple-400" />
                      AI-Prompt
                    </h3>
                    <button 
                      onClick={copyToClipboard}
                      className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                    >
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopiëren'}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Kopieer deze tekst naar ChatGPT, Claude of Gemini voor een volledig uitgewerkt lesplan.
                  </p>
                  <textarea 
                    readOnly
                    value={result.prompt}
                    className="w-full h-48 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonGenerator;