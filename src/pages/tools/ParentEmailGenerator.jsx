import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiUsers, FiCalendar, FiMapPin, FiList, FiUser, FiEdit3, FiCopy, FiCheck, FiSend } = FiIcons;

const ParentEmailGenerator = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    groups: '',
    dateTime: '',
    location: '',
    itemsToBring: '',
    contactPerson: '',
    description: ''
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateEmail = (e) => {
    e.preventDefault();

    // 1. Lokale Email Generatie
    const emailSubject = `Informatie: ${formData.activityName} - ${formData.dateTime}`;
    const emailBody = `Beste ouders/verzorgers,

Hierbij ontvangt u belangrijke informatie over de komende activiteit: ${formData.activityName}. Deze activiteit is bedoeld voor ${formData.groups}.

${formData.description ? formData.description : `We kijken er erg naar uit om met de leerlingen deze activiteit te ondernemen.`}

Hieronder vindt u de praktische informatie op een rij:

📅 Datum & Tijd: ${formData.dateTime}
📍 Locatie: ${formData.location}
👤 Contactpersoon: ${formData.contactPerson}

Wat is belangrijk om te weten / mee te nemen:
${formData.itemsToBring ? formData.itemsToBring : '- Geen specifieke benodigdheden.'}

Mocht u nog vragen hebben naar aanleiding van deze e-mail, neem dan gerust contact op met ${formData.contactPerson}.

Met vriendelijke groet,

${formData.contactPerson}`;

    // 2. AI Prompt Generatie
    const promptText = `Schrijf een professionele en duidelijke e-mail aan ouders over een schoolactiviteit.

Activiteit: ${formData.activityName}
Doelgroep: ${formData.groups}
Datum & Tijd: ${formData.dateTime}
Locatie: ${formData.location}
Meenemen/Actie voor ouders: ${formData.itemsToBring}
Contactpersoon: ${formData.contactPerson}
Extra toelichting: ${formData.description}

Vereisten:
- Onderwerpregel: Duidelijk en informatief
- Toon: Vriendelijk, professioneel en toegankelijk (B1-niveau)
- Structuur: Korte inleiding, overzichtelijke opsomming van praktische feiten (datum, tijd, locatie), actiepunten voor ouders, en een vriendelijke afsluiting.
- Doel: Ouders volledig informeren zodat ze precies weten waar hun kind aan toe is.`;

    setResult({
      subject: emailSubject,
      body: emailBody,
      prompt: promptText
    });
  };

  const copyPrompt = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyEmail = () => {
    if (result?.body) {
      const fullText = `Onderwerp: ${result.subject}\n\n${result.body}`;
      navigator.clipboard.writeText(fullText);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Ouder-mailgenerator" 
        subtitle="Genereer snel een duidelijke en professionele e-mail voor ouders over schoolactiviteiten."
        color="from-orange-500 to-red-500"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit"
          >
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
              <SafeIcon icon={FiMail} className="text-2xl text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Activiteit Details</h2>
            </div>
            
            <form onSubmit={generateEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naam activiteit</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiEdit3} /></span>
                  <input 
                    type="text" 
                    name="activityName" 
                    required 
                    placeholder="Bijv. Excursie Rijksmuseum" 
                    value={formData.activityName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Groepen/klassen</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiUsers} /></span>
                    <input 
                      type="text" 
                      name="groups" 
                      required 
                      placeholder="Groep 7 & 8" 
                      value={formData.groups}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Datum & Tijd</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiCalendar} /></span>
                    <input 
                      type="text" 
                      name="dateTime" 
                      required 
                      placeholder="12 mei, 09:00 - 14:00" 
                      value={formData.dateTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locatie</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiMapPin} /></span>
                  <input 
                    type="text" 
                    name="location" 
                    required 
                    placeholder="Museumplein, Amsterdam" 
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meenemen / Actie ouders</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiList} /></span>
                  <textarea 
                    name="itemsToBring" 
                    rows="2" 
                    placeholder="Bijv. Lunchpakket, OV-chipkaart, 5 euro zakgeld" 
                    value={formData.itemsToBring}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><SafeIcon icon={FiUser} /></span>
                  <input 
                    type="text" 
                    name="contactPerson" 
                    required 
                    placeholder="Mevr. Jansen" 
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Korte toelichting (optioneel)</label>
                <textarea 
                  name="description" 
                  rows="2" 
                  placeholder="Bijv. We gaan met de trein. Ouders die willen rijden kunnen zich melden." 
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-md flex items-center justify-center space-x-2 mt-4"
              >
                <SafeIcon icon={FiSend} />
                <span>Genereer Oudermail</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Results */}
          <div className="lg:col-span-7 space-y-6">
            {!result ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <SafeIcon icon={FiMail} className="text-5xl mb-4 opacity-30" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen mail gegenereerd</h3>
                <p>Vul links het formulier in om een concept te maken.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Result Block 1: Generated Email */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
                    <h3 className="font-bold text-orange-900 flex items-center gap-2 text-lg">
                      <SafeIcon icon={FiMail} />
                      Concept E-mail
                    </h3>
                    <button 
                      onClick={copyEmail}
                      className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors border ${copiedEmail ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    >
                      <SafeIcon icon={copiedEmail ? FiCheck : FiCopy} />
                      {copiedEmail ? 'Gekopieerd!' : 'Kopieer tekst'}
                    </button>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <span className="text-gray-500 text-sm font-medium">Onderwerp:</span>
                      <p className="text-gray-900 font-medium">{result.subject}</p>
                    </div>
                    <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-sans">
                      {result.body}
                    </div>
                  </div>
                </div>

                {/* Result Block 2: Prompt */}
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <SafeIcon icon={FiEdit3} className="text-orange-400" />
                      AI-Prompt voor Variaties
                    </h3>
                    <button 
                      onClick={copyPrompt}
                      className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                    >
                      <SafeIcon icon={copied ? FiCheck : FiCopy} />
                      {copied ? 'Gekopieerd!' : 'Kopieer Prompt'}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Wil je de toon aanpassen of de mail uitgebreider maken? Kopieer deze prompt naar ChatGPT.
                  </p>
                  <textarea 
                    readOnly 
                    value={result.prompt}
                    className="w-full h-48 bg-gray-800 text-gray-300 text-sm font-mono p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
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

export default ParentEmailGenerator;