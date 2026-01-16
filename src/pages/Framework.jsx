import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from '../components/common/SimpleHero';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiLayers, FiUser, FiBookOpen, FiLock, FiCpu, FiCheckCircle, FiInfo, FiTrendingUp, FiActivity } = FiIcons;

const Framework = () => {
  useEffect(() => {
    document.title = "Het Onderwijs-AI Framework™ | Kader voor AI-implementatie";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Een onderwijskundig kader voor verantwoorde implementatie van AI op school. Van oriëntatie tot structurele borging in 6 heldere fasen.');

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Het Onderwijs-AI Framework™",
      "description": "Een groeimodel voor AI-adoptie in het onderwijs (Niveau 0–5).",
      "publisher": {
        "@type": "Organization",
        "name": "Onderwijs.ai"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'framework-schema';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById('framework-schema');
      if (oldScript) oldScript.remove();
    };
  }, []);

  const principles = [
    { title: "Mens eerst", icon: FiUser, desc: "De pedagogische relatie tussen docent en leerling vormt de essentie van het onderwijs. AI-systemen zijn ondersteunend aan dit contact, nooit een vervanging ervan." },
    { title: "Didactiek leidend", icon: FiBookOpen, desc: "De keuze voor technologie volgt altijd uit een onderwijskundig doel. De vraag is niet wat de techniek kan, maar hoe het bijdraagt aan het leerdoel." },
    { title: "Transparantie", icon: FiInfo, desc: "Gebruik van AI is open en bespreekbaar. Docenten en leerlingen zijn eerlijk over de rol van technologie in hun werk- en leerproces." },
    { title: "Privacy & Veiligheid", icon: FiLock, desc: "De bescherming van leerlinggegevens is randvoorwaardelijk. Er wordt kritisch gekeken naar datastromen en de ethische kaders van leveranciers." },
    { title: "Professionele autonomie", icon: FiShield, desc: "De docent behoudt de regie en is eindverantwoordelijk voor de inhoud, beoordeling en de pedagogische keuzes in de klas." }
  ];

  const levels = [
    { level: "Niveau 0", title: "Oriëntatie & Bewustwording", desc: "Inzicht krijgen in wat AI is, wat het betekent voor onderwijs en waar kansen en grenzen liggen.", color: "bg-gray-100 text-gray-600" },
    { level: "Niveau 1", title: "Verkenning", desc: "Eerste veilige experimenten met AI-tools binnen de onderwijspraktijk.", color: "bg-blue-50 text-blue-700" },
    { level: "Niveau 2", title: "Didactische inzet", desc: "Gerichte toepassing van AI ter ondersteuning van lessen, leerdoelen en instructie.", color: "bg-indigo-50 text-indigo-700" },
    { level: "Niveau 3", title: "Leerproces-verrijking", desc: "Inzet van AI voor differentiatie, feedback, overzicht en verdieping van het leerproces.", color: "bg-purple-50 text-purple-700" },
    { level: "Niveau 4", title: "Borging & beleid", desc: "Structurele verankering van AI-gebruik binnen team, school en onderwijsvisie.", color: "bg-emerald-50 text-emerald-700" },
    { level: "Niveau 5", title: "Evaluatie & doorontwikkeling", desc: "Datagedreven reflectie, bijsturing en duurzame doorontwikkeling van AI-gebruik.", color: "bg-amber-50 text-amber-700" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Het Onderwijs-AI Framework™" subtitle="Een onderwijskundig kader voor verantwoorde implementatie van AI op school." color="from-slate-700 to-slate-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Nieuwe Sectie: Voor organisaties & besluitvormers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mb-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm" >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voor organisaties & besluitvormers</h2>
          <p className="text-gray-700 mb-6 leading-relaxed"> Het Onderwijs.ai Didactisch AI-Framework is ontwikkeld als overdraagbaar kader voor de verantwoorde inzet van AI binnen het onderwijs. </p>
          <ul className="space-y-3 mb-6">
            {[
              "Biedt een helder groeimodel van oriëntatie (niveau 0) tot borging en doorontwikkeling (niveau 5)",
              "Verbindt AI-toepassing expliciet aan didactiek, beleid en onderwijspraktijk",
              "Ondersteunt scholen bij visievorming, professionalisering en implementatie",
              "Onafhankelijk inzetbaar binnen trainingen, platforms of onderwijsorganisaties",
              "Ontwikkeld vanuit de onderwijspraktijk, toepasbaar op schaal"
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <SafeIcon icon={FiCheckCircle} className="text-indigo-600 mt-0.5 shrink-0" /> <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-bold text-indigo-900 border-t border-indigo-100 pt-4"> Kernkwaliteit: dit framework maakt AI-gebruik in onderwijs concreet, overdraagbaar en bestuurbaar. </p>
        </motion.div>

        {/* Introductie */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Waarom een framework?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6"> De snelle opkomst van generatieve AI stelt scholen voor complexe vragen. Zonder helder kader ontstaat er een wildgroei aan gebruik, of juist een verlammende onzekerheid. Het <strong>Onderwijs-AI Framework™</strong> dient als kompas voor docenten en schoolleiders om stapsgewijs en verantwoord te groeien in AI-geletterdheid. </p>
          <p className="text-sm text-gray-500 italic"> Dit framework en de bijbehorende structuur zijn ontwikkeld voor gebruik binnen onderwijsorganisaties en kunnen worden toegepast via samenwerking, licentie of overname. </p>
        </div>

        {/* Kernprincipes */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <SafeIcon icon={FiCheckCircle} className="text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">De Vijf Kernprincipes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100" >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <SafeIcon icon={p.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* De Zes Niveaus */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <SafeIcon icon={FiLayers} className="text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Groeimodel: 6 fasen van AI-adoptie (Niveau 0–5)</h2>
          </div>
          <p className="text-gray-600 mb-12 max-w-2xl"> Dit groeimodel beschrijft zes fasen van AI-adoptie in het onderwijs, van Niveau 0 (oriëntatie) tot en met Niveau 5 (evaluatie en doorontwikkeling). Het helpt scholen bepalen waar zij nu staan en welke volgende stappen logisch zijn voor een duurzame integratie. </p>
          <div className="space-y-4">
            {levels.map((l, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-gray-100 transition-all hover:shadow-md ${l.color}`} >
                <div className="md:w-32 shrink-0">
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">{l.level}</span>
                  <h4 className="font-bold text-lg leading-tight"> {l.title} </h4>
                </div>
                <div className="flex-grow">
                  <p className="text-sm leading-relaxed opacity-90">{l.desc}</p>
                </div>
                <div className="flex items-center justify-end md:w-20">
                  <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                    <SafeIcon icon={FiTrendingUp} className="text-xs opacity-40" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hoe te gebruiken */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <SafeIcon icon={FiCpu} className="text-[300px]" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Gebruik van het Framework</h2>
            <div className="space-y-6 text-slate-300">
              <p> Het framework is bedoeld als praatplaat voor secties, bouwteams en directies. Het biedt een gemeenschappelijke taal om de visie op AI te concretiseren. </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex gap-3">
                  <SafeIcon icon={FiActivity} className="text-indigo-400 mt-1" /> <span><strong>Nulmeting:</strong> Waar bevindt onze school zich op de ladder?</span>
                </li>
                <li className="flex gap-3">
                  <SafeIcon icon={FiActivity} className="text-indigo-400 mt-1" /> <span><strong>Nascholing:</strong> Welke vaardigheden horen bij het volgende niveau?</span>
                </li>
                <li className="flex gap-3">
                  <SafeIcon icon={FiActivity} className="text-indigo-400 mt-1" /> <span><strong>Beleid:</strong> Welke afspraken maken we over privacy en toetsing?</span>
                </li>
                <li className="flex gap-3">
                  <SafeIcon icon={FiActivity} className="text-indigo-400 mt-1" /> <span><strong>Dialoog:</strong> Hoe betrekken we leerlingen bij deze ontwikkeling?</span>
                </li>
              </ul>
              <p className="text-sm text-slate-400 italic pt-6 border-t border-slate-800 mt-6"> Dit framework en de bijbehorende structuur zijn ontwikkeld voor gebruik binnen onderwijsorganisaties en kunnen worden toegepast via samenwerking, licentie of overname. </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Framework;