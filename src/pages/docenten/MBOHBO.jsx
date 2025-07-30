import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import {downloadFile} from '../../utils/downloadUtils';

const {FiTool, FiTrendingUp, FiDownload, FiBriefcase, FiUsers, FiArrowRight} = FiIcons;

const MBOHBO = () => {
  const sectors = [
    {
      name: "Techniek & ICT",
      applications: ["Code Review AI", "Projectmanagement", "Data Analyse", "Prototyping"],
      icon: FiTool,
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Zorg & Welzijn",
      applications: ["Diagnostiek ondersteuning", "Behandelplannen", "Casus analyse", "Ethiek training"],
      icon: FiUsers,
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Economie & Business",
      applications: ["Marktanalyse", "Business modelling", "Financial forecasting", "Customer insights"],
      icon: FiBriefcase,
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Creatieve Vakken",
      applications: ["Design assistentie", "Content creatie", "Concept development", "Portfolio review"],
      icon: FiTrendingUp,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const projects = [
    {
      title: "AI-gedreven Marktonderzoek",
      sector: "Business Studies",
      level: "HBO Bachelor",
      duration: "8 weken",
      description: "Studenten gebruiken AI-tools voor uitgebreid marktonderzoek en business planning",
      skills: ["Data analyse", "Strategisch denken", "Presenteren", "AI-tools"],
      deliverables: ["Marktrapport", "Business plan", "Pitch presentatie"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      projectFile: "/projects/ai-gedreven-marktonderzoek.pdf"
    },
    {
      title: "Smart Healthcare Solutions",
      sector: "Zorg & Welzijn",
      level: "MBO 4 / HBO",
      duration: "12 weken",
      description: "Ontwikkeling van AI-ondersteunde zorgoplossingen voor praktijkproblemen",
      skills: ["Probleemanalyse", "Ethiek", "Technologie", "Samenwerken"],
      deliverables: ["Prototype", "Ethische analyse", "Implementatieplan"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      projectFile: "/projects/smart-healthcare-solutions.pdf"
    },
    {
      title: "Creative AI Portfolio",
      sector: "Media & Design",
      level: "MBO 3-4",
      duration: "6 weken",
      description: "Portfolio ontwikkeling met AI-tools voor grafisch ontwerp en content creatie",
      skills: ["Creativiteit", "Technische vaardigheden", "Kritisch denken", "Portfolio ontwikkeling"],
      deliverables: ["Digital portfolio", "Proces documentatie", "Reflectie rapport"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    }
  ];

  const professionalSkills = [
    {
      skill: "AI Literacy",
      description: "Begrip van AI-mogelijkheden en beperkingen",
      importance: "Essentieel voor toekomstige professionals"
    },
    {
      skill: "Ethisch Denken",
      description: "Verantwoord omgaan met AI-technologie",
      importance: "Cruciaal voor vertrouwen in AI"
    },
    {
      skill: "Data Analyse",
      description: "Interpreteren en gebruiken van AI-gegenereerde data",
      importance: "Kernvaardigheid in data-gedreven wereld"
    },
    {
      skill: "Kritisch Evalueren",
      description: "AI-output beoordelen en valideren",
      importance: "Noodzakelijk voor kwaliteitsborging"
    }
  ];

  const handleDownloadProject = (projectFile, projectTitle) => {
    if (projectFile) {
      const filename = `${projectTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      downloadFile(projectFile, filename);
    }
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{opacity: 0, x: -50}}
              animate={{opacity: 1, x: 0}}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI in MBO & HBO
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Bereid studenten voor op de arbeidsmarkt van de toekomst met praktijkgerichte AI-toepassingen en professionele vaardigheden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-tools"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiTool} />
                  <span>AI Tools</span>
                </Link>
                <Link
                  to="/nieuwsbrief"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} />
                  <span>Gratis Download</span>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, x: 50}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.2}}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="MBO HBO studenten met AI"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sector Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI per Sector
            </h2>
            <p className="text-xl text-gray-600">
              Praktijkgerichte AI-toepassingen voor verschillende beroepsrichtingen
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 rounded-2xl ${sector.color} flex items-center justify-center mb-6`}>
                  <SafeIcon icon={sector.icon} className="text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {sector.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sector.applications.map((app, appIndex) => (
                    <div key={appIndex} className="bg-white p-3 rounded-lg text-sm text-gray-700 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Examples */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Praktijkprojecten met AI
            </h2>
            <p className="text-xl text-gray-600">
              Uitdagende projecten die studenten voorbereiden op de praktijk
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {project.level}
                    </span>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{project.sector}</p>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Vaardigheden:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Oplevering:</div>
                    <ul className="space-y-1">
                      {project.deliverables.map((deliverable, delIndex) => (
                        <li key={delIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleDownloadProject(project.projectFile, project.title)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>Download Project</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              21e Eeuwse Vaardigheden
            </h2>
            <p className="text-xl text-gray-600">
              Essentiële AI-vaardigheden voor de arbeidsmarkt
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalSkills.map((item, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.skill}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-1">Waarom belangrijk:</div>
                  <div className="text-green-600 font-medium">{item.importance}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Implementeer AI in jouw MBO/HBO programma
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Krijg toegang tot onze complete toolkit voor beroepsonderwijs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/nieuwsbrief"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiDownload} />
                <span>Gratis MBO/HBO Toolkit</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default MBOHBO;