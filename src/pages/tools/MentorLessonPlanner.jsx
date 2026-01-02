import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiHeart, FiClock, FiTarget, FiActivity, FiMessageCircle, FiCpu, FiCopy, FiCheck, FiList } = FiIcons;

const MentorLessonPlanner = () => {
  const [formData, setFormData] = useState({
    classLevel: '',
    groupSize: '25',
    theme: 'Groepsvorming & sfeer',
    customTheme: '',
    goal: 'De groep hechter maken en elkaar beter leren kennen.',
    duration: '50',
    workFormat: 'Kringgesprek',
    sensitivity: 'Laag',
    context: ''
  });

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const themes = [
    "Groepsvorming & sfeer",
    "Pesten / sociale veiligheid",
    "Social media & telefoongebruik",
    "Welbevinden & mentale gezondheid",
    "Studievaardigheden & planning",
    "Huiswerk & motivatie",
    "Studiekeuze / loopbaan",
    "Online gedrag (cyberpesten, gaming)",
    "Klassenafspraken / regels",
    "Vrij thema"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateLesson = (e) => {
    e.preventDefault();

    const actualTheme = formData.theme === 'Vrij thema' ? formData.customTheme : formData.theme;
    
    // 1. LOGICA: Mentorles opzet genereren
    
    // Bepaal toon op basis van gevoeligheid
    let checkInActivity = "Korte energizer of 'hoe zit je erbij' rondje.";
    let reflectionTone = "Open en activerend.";
    let mentorTips = ["Zorg voor een open houding.", "Geef iedereen de ruimte."];

    if (formData.sensitivity === 'Gemiddeld') {
      checkInActivity = "Rustige start, bijvoorbeeld met stellingen of een gevoels-thermometer.";
      reflectionTone = "Persoonlijk maar respectvol.";
      mentorTips.push("Let op non-verbale signalen van leerlingen.");
      mentorTips.push("Kap negatieve reacties direct maar vriendelijk af.");
    } else if (formData.sensitivity === 'Hoog') {
      checkInActivity = "Zeer veilige start. Benadruk dat niets moet en alles binnen de muren blijft.";
      reflectionTone = "Voorzichtig, focus op veiligheid en gevoel.";
      mentorTips.push("Maak duidelijke afspraken over vertrouwelijkheid.");
      mentorTips.push("Dwing niemand om iets te zeggen.");
      mentorTips.push("Wees alert op signalen van onveiligheid of emotie.");
    }

    // Bepaal kernactiviteit suggestie op basis van werkvorm
    let coreActivity = `Een activiteit rondom '${actualTheme}' waarbij de werkvorm '${formData.workFormat}' centraal staat.`;
    if (formData.workFormat.includes('Kringgesprek')) {
      coreActivity = `Gezamenlijk gesprek over ${actualTheme}. Gebruik een praatstok of beurtkaarten om structuur te houden.`;
    } else if (formData.workFormat.includes('Duo')) {
      coreActivity = `Laat leerlingen in tweetallen uitwisselen over ${actualTheme}. Wissel eventueel halverwege van partner.`;
    } else if (formData.workFormat.includes('Spel')) {
      coreActivity = `Een actief spel of werkvorm die ${actualTheme} zichtbaar maakt (bijv. over de streep, samenwerkingsopdracht).`;
    }

    const lessonProposal = {
      meta: `${formData.classLevel} | ${formData.groupSize} lln | ${formData.duration} min`,
      phases: [
        {
          title: "Fase 1: Check-in / Start",
          time: "5-10 min",
          content: checkInActivity,
          question: "Vraag: 'Met welk cijfer (1-10) start je deze les?' of 'Wat hoop je dit uur te doen?'"
        },
        {
          title: "Fase 2: Kernactiviteit",
          time: `${parseInt(formData.duration) - 20} min`,
          content: coreActivity,
          question: `Focus: ${formData.goal}`
        },
        {
          title: "Fase 3: Nabespreking",
          time: "10 min",
          content: `Reflectie op de activiteit. ${reflectionTone}`,
          question: "Vragen: 'Wat viel je op?', 'Wat hebben we hieraan?', 'Hoe voelde dit?'"
        },
        {
          title: "Fase 4: Afsluiting",
          time: "5 min",
          content: "Korte check-out en vooruitblik. Bedank de groep voor hun inzet.",
          question: "Vraag: 'Geef in één woord aan hoe je de les vond.'"
        }
      ],
      tips: mentorTips
    };

    // 2. LOGICA: AI Prompt genereren
    const contextText = formData.context.trim() 
      ? formData.context 
      : "(geen extra context opgegeven)";

    const promptText = `Je bent een ervaren mentor in het voortgezet onderwijs én expert in groepsdynamiek.

Ik wil dat je een uitgewerkte mentorles maakt.

Klas / niveau: ${formData.classLevel}
Groepsgrootte: ${formData.groupSize} leerlingen
Thema: ${actualTheme}
Doel van de mentorles: ${formData.goal}
Tijdsduur: ${formData.duration} minuten
Gewenste werkvorm: ${formData.workFormat}
Gevoeligheid van het onderwerp: ${formData.sensitivity} (laag / gemiddeld / hoog)

Context/situatie in deze klas:
${contextText}

Ontwerp een mentorles met de volgende structuur:
1. Korte start / check-in (ongeveer 5–10 minuten)
2. Hoofdactiviteit passend bij het thema en de werkvorm
3. Nabespreking / reflectie
4. Afsluiting en eventueel een vervolgactie

Voor elke fase:
- Beschrijf concreet wat de docent zegt of doet.
- Beschrijf wat leerlingen moeten doen.
- Geef voorbeeldvragen voor het gesprek.
- Houd rekening met de genoemde gevoeligheid (${formData.sensitivity}):
  ${formData.sensitivity === 'Hoog' ? '- Bij ‘hoog’: zorg voor veiligheid, vrijwilligheid en respectvolle toon.' : '- Zorg voor een actieve en betrokken houding.'}

Lever de uitwerking als:
- een helder stappenplan voor de docent;
- met tijdsindicatie per fase;
- met concrete voorbeeldvragen of opdrachten;
- in begrijpelijke taal voor VO-docenten.`;

    setResult({ lesson: lessonProposal, prompt: promptText });
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
        title="Mentorlesplanner (Beta)" 
        subtitle="Ontwerp snel een veilige en effectieve mentorles voor jouw klas." 
        color="from-teal-600 to-green-600" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
              <SafeIcon icon={FiUsers} className="text-2xl text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Les Configuratie</h2>
            </div>

            <form onSubmit={generateLesson} className="space-y-4">
              
              {/* Klas & Grootte */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Klas / Niveau</label>
                  <input type="text" name="classLevel" placeholder="Bijv. 2 HAVO" required value={formData.classLevel} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aantal lln</label>
                  <input type="number" name="groupSize" placeholder="25" required value={formData.groupSize} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>

              {/* Thema */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thema</label>
                <select name="theme" value={formData.theme} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white">
                  {themes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {formData.theme === 'Vrij thema' && (
                  <input type="text" name="customTheme" placeholder="Vul eigen thema in..." value={formData.customTheme} onChange={handleChange} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                )}
              </div>

              {/* Doel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doel van de les</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiTarget} /></span>
                  <textarea name="goal" rows="2" placeholder="Wat wil je bereiken?" required value={formData.goal} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"></textarea>
                </div>
              </div>

              {/* Werkvorm & Tijd */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Werkvorm</label>
                  <select name="workFormat" value={formData.workFormat} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white">
                    <option>Kringgesprek</option>
                    <option>Duo-gesprek</option>
                    <option>Kleine groepjes</option>
                    <option>Individuele reflectie</option>
                    <option>Mix: gesprek + opdracht</option>
                    <option>Spel / energizer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duur (min)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiClock} /></span>
                    <input type="number" name="duration" min="10" max="120" value={formData.duration} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
              </div>

              {/* Gevoeligheid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gevoeligheid onderwerp</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiHeart} /></span>
                  <select name="sensitivity" value={formData.sensitivity} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white">
                    <option value="Laag">Laag (luchtig, veilig)</option>
                    <option value="Gemiddeld">Gemiddeld (persoonlijk)</option>
                    <option value="Hoog">Hoog (kwetsbaar/emotioneel)</option>
                  </select>
                </div>
              </div>

              {/* Context */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Context (optioneel)</label>
                <textarea name="context" rows="2" placeholder="Wat speelt er in de klas?" value={formData.context} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center space-x-2 mt-4"
              >
                <SafeIcon icon={FiActivity} />
                <span>Genereer Mentorles & Prompt</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiUsers} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen les gegenereerd</h3>
                <p>Vul links het formulier in om een mentorles te ontwerpen.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Result Block 1: Outline */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-teal-50 p-4 border-b border-teal-100">
                    <h3 className="font-bold text-teal-900 flex items-center gap-2 text-lg">
                      <SafeIcon icon={FiList} /> Mentorles Opzet
                    </h3>
                    <p className="text-sm text-teal-700 mt-1 ml-7">{result.lesson.meta}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {result.lesson.phases.map((phase, idx) => (
                        <div key={idx} className="border-l-4 border-teal-200 pl-4 py-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-gray-900">{phase.title}</h4>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{phase.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{phase.content}</p>
                          <p className="text-teal-700 text-sm italic flex items-start gap-2">
                             <SafeIcon icon={FiMessageCircle} className="mt-1 flex-shrink-0" />
                             "{phase.question}"
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <SafeIcon icon={FiHeart} className="text-pink-500" /> Aandachtspunten Mentor
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {result.lesson.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Result Block 2: Prompt */}
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiCpu} className="text-teal-400" />
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
                    Kopieer deze prompt naar ChatGPT of Gemini voor een volledig uitgewerkte lesbrief met werkbladen.
                  </p>
                  <textarea 
                    readOnly
                    value={result.prompt}
                    className="w-full h-64 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
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

export default MentorLessonPlanner;