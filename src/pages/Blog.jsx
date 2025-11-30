import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiCalendar, FiUser, FiTag, FiArrowRight, FiExternalLink, FiGlobe } = FiIcons;

const Blog = () => {
  const featuredPost = {
    title: "Google I/O 2025: AI en de toekomst van onderwijs",
    excerpt: "Ontdek de nieuwste AI-ontwikkelingen van Google I/O 2025 en wat dit betekent voor de toekomst van het onderwijs.",
    date: "15 mei 2025",
    author: "AI voor Onderwijs Team",
    category: "AI Trends",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=400&fit=crop",
    readTime: "6 min",
    url: "https://aivooronderwijs.nl/google-i-o-2025-ai-en-de-toekomst-van-onderwijs/"
  };

  // Posts sorted by date (newest first)
  const posts = [
    // NIEUWE ARTIKELEN (Najaar 2025)
    {
      title: "AI: Hype of Adoptie?",
      excerpt: "Een compacte analyse over de vraag of AI in het onderwijs een vluchtige hype is of blijvende verandering. Inclusief concrete voorbeelden uit Nederlandse scholen.",
      date: "17 november 2025",
      sortDate: "2025-11-17",
      author: "Onderwijs-AI",
      category: "Opinie",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      readTime: "6 min",
      url: "https://onderwijs-ai.nl/blog/ai-hype-of-adoptie"
    },
    {
      title: "Monitor Digitalisering Onderwijs 2025",
      excerpt: "Een diepgaand onderzoek naar de digitaliseringskloof tussen beleidsmakers en docenten in de klas. Relevante inzichten voor AI-invoering op school.",
      date: "13 november 2025",
      sortDate: "2025-11-13",
      author: "Kennisnet",
      category: "Onderzoek",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      readTime: "15 min",
      url: "https://www.kennisnet.nl/onderzoek/monitor-digitalisering-onderwijs-2025-kloof-tussen-beleid-en-praktijk/"
    },
    {
      title: "Een goede AI-strategie is voor iedere school een noodzaak",
      excerpt: "Kennisnet beschrijft waarom scholen niet meer om een integrale en doordachte AI-strategie heen kunnen en hoe bestuurders hiermee aan de slag kunnen.",
      date: "1 oktober 2025",
      sortDate: "2025-10-01",
      author: "Kennisnet",
      category: "Strategie",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      readTime: "8 min",
      url: "https://www.kennisnet.nl/opinie/een-goede-ai-strategie-is-voor-iedere-school-een-noodzaak/"
    },
    // BESTAANDE ARTIKELEN (Mei - April 2025)
    {
      title: "Schoolafspraken over het gebruik van generatieve AI",
      excerpt: "Praktische richtlijnen voor scholen om gezamenlijke afspraken te maken over het gebruik van generatieve AI-tools in het onderwijs.",
      date: "15 mei 2025",
      sortDate: "2025-05-15",
      author: "Kennisnet",
      category: "Beleid",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      readTime: "8 min",
      url: "https://www.kennisnet.nl/artificial-intelligence/schoolafspraken-over-het-gebruik-van-generatieve-ai/"
    },
    {
      title: "Maak aanpasbare grafieken, figuren en formules met AI",
      excerpt: "Leer hoe je AI kunt gebruiken om dynamische en interactieve grafieken, figuren en formules te maken voor je lessen.",
      date: "10 mei 2025",
      sortDate: "2025-05-10",
      author: "AI voor Onderwijs",
      category: "AI Tools",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      readTime: "7 min",
      url: "https://aivooronderwijs.nl/maak-aanpasbare-grafieken-figuren-en-formules-met-ai/"
    },
    {
      title: "Onderwijsbeleid en regelgeving rond AI",
      excerpt: "Een overzicht van het huidige beleid en de regelgeving rond AI in het onderwijs en wat dit betekent voor docenten.",
      date: "5 mei 2025",
      sortDate: "2025-05-05",
      author: "Beleidsexperts",
      category: "Beleid",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      readTime: "9 min",
      url: "https://aivooronderwijs.nl/category/onderwijsbeleid-en-regelgeving/"
    },
    {
      title: "AI voor schoolleiders: strategische implementatie",
      excerpt: "Hoe schoolleiders AI strategisch kunnen implementeren en welke stappen nodig zijn voor succesvolle adoptie.",
      date: "28 april 2025",
      sortDate: "2025-04-28",
      author: "Onderwijs-AI",
      category: "Management",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      readTime: "8 min",
      url: "https://onderwijs-ai.nl/blog/ai-voor-schoolleiders"
    },
    {
      title: "Kritisch denken in het AI-tijdperk",
      excerpt: "Waarom kritisch denken belangrijker dan ooit is en hoe we leerlingen kunnen leren omgaan met AI-informatie.",
      date: "22 april 2025",
      sortDate: "2025-04-22",
      author: "Onderwijs-AI",
      category: "Vaardigheden",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      readTime: "6 min",
      url: "https://onderwijs-ai.nl/blog/kritisch-denken"
    },
    {
      title: "Pleidooi voor AI-richtlijnen in het onderwijs",
      excerpt: "Een uitgebreid pleidooi voor duidelijke richtlijnen rond het gebruik van AI in onderwijsinstellingen.",
      date: "15 april 2025",
      sortDate: "2025-04-15",
      author: "Adwise Academy",
      category: "Richtlijnen",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      readTime: "10 min",
      url: "https://www.adwiseacademy.nl/stories/pleidooi-voor-ai-richtlijnen-in-het-onderwijs"
    },
    {
      title: "AI in het onderwijs: praktische toepassingen",
      excerpt: "Een praktische gids voor het implementeren van AI-tools in verschillende onderwijscontexten en vakgebieden.",
      date: "8 april 2025",
      sortDate: "2025-04-08",
      author: "Advantive",
      category: "Implementatie",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      readTime: "7 min",
      url: "https://www.advantive.nl/ai-in-het-onderwijs/"
    },
    // OUDERE ARTIKELEN (Maart 2025 - Geüpdatet van 2024 voor consistentie)
    {
      title: "Privacy en AI: hier moeten scholen op letten",
      excerpt: "Uitgebreide gids over privacy-aspecten bij het gebruik van AI in het onderwijs en welke maatregelen scholen moeten nemen.",
      date: "20 maart 2025",
      sortDate: "2025-03-20",
      author: "Kennisnet",
      category: "Privacy & Veiligheid",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      readTime: "10 min",
      url: "https://www.kennisnet.nl/artificial-intelligence/privacy-en-ai-hier-moeten-scholen-op-letten/"
    },
    {
      title: "Problemen met generatieve AI in het onderwijs",
      excerpt: "Een uitgebreid overzicht van de uitdagingen en problemen die generatieve AI met zich meebrengt in onderwijsomgevingen en hoe deze aan te pakken.",
      date: "5 maart 2025",
      sortDate: "2025-03-05",
      author: "Universiteit Utrecht",
      category: "Uitdagingen",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1757628282057-universiteit-utrecht.jpg",
      readTime: "8 min",
      url: "https://www.uu.nl/onderwijs/onderwijsadvies-training/kennisdossiers/themadossier-generatieve-ai-in-het-onderwijs/problemen-met-generatieve-ai-in-het-onderwijs"
    }
  ];

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  const internationalPosts = [
    {
      title: "AI Teacher Assistants Promote Racial Bias, Study Finds",
      excerpt: "A new study reveals concerning evidence that AI teacher assistants may perpetuate racial stereotypes and bias in educational settings, raising important questions about AI implementation in schools.",
      date: "6 augustus 2025",
      sortDate: "2025-08-06",
      author: "Chalkbeat",
      category: "Research",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
      readTime: "6 min",
      url: "https://www.chalkbeat.org/2025/08/06/ai-teacher-assistants-promote-racial-bias-study-finds/",
      country: "🇺🇸 Verenigde Staten"
    },
    {
      title: "AI in Finland Education: A Global Model",
      excerpt: "How Finland has become a leader in ethical AI integration in education, offering lessons for countries worldwide on responsible implementation.",
      date: "15 juli 2025",
      sortDate: "2025-07-15",
      author: "The AI Track",
      category: "Case Study",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=250&fit=crop",
      readTime: "8 min",
      url: "https://theaitrack.com/ai-in-finland-education-global-model/",
      country: "🇫🇮 Finland"
    },
    {
      title: "The Future is Already Here: AI and Education in 2025",
      excerpt: "Stanford researchers examine how AI is transforming education today and what we can expect in the near future, with practical insights for educators.",
      date: "10 juni 2025",
      sortDate: "2025-06-10",
      author: "Stanford Accelerate Learning",
      category: "Future Trends",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
      readTime: "12 min",
      url: "https://acceleratelearning.stanford.edu/story/the-future-is-already-here-ai-and-education-in-2025/",
      country: "🇺🇸 Verenigde Staten"
    }
  ];

  // Sort international posts by date (newest first)
  const sortedInternationalPosts = internationalPosts.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  const categories = [
    "Alle categorieën",
    "AI Tools",
    "AI Trends",
    "Beleid",
    "Management",
    "Vaardigheden",
    "Richtlijnen",
    "Implementatie",
    "Uitdagingen",
    "Privacy & Veiligheid"
  ];

  const handleArticleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog: AI in het Onderwijs
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Praktische tips, inzichten en ervaringen over het gebruik van AI in het onderwijs
            </p>
            <div className="max-w-xl mx-auto relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek in artikelen..."
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Uitgelicht artikel
            </h2>
          </motion.div>

          <div
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleArticleClick(featuredPost.url)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-64 lg:h-auto"
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <SafeIcon icon={FiCalendar} className="mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
                    <span className="text-sm text-gray-600">{featuredPost.author}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{featuredPost.readTime} leestijd</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center space-x-1">
                    <span>Lees artikel</span>
                    <SafeIcon icon={FiExternalLink} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Nederlandse Blog Posts - Now sorted by date */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nederlandse Artikelen
            </h2>
            <p className="text-xl text-gray-600">
              Praktische inzichten van Nederlandse AI-experts in het onderwijs (nieuwste eerst)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleArticleClick(post.url)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  {/* NEW badge for the newest posts */}
                  {index < 3 && (
                    <div className="absolute top-0 left-0 m-4">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        NIEUW
                      </span>
                    </div>
                  )}
                  {/* Kennisnet badge for Kennisnet articles */}
                  {post.author === "Kennisnet" && (
                    <div className="absolute bottom-0 left-0 m-4">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        KENNISNET
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <SafeIcon icon={FiCalendar} />
                    <span>{post.date}</span>
                    <span className="text-gray-300">•</span>
                    <span>{post.readTime} leestijd</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 inline-flex items-center space-x-1">
                      <SafeIcon icon={FiExternalLink} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Articles Section - Also sorted by date */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiGlobe} className="text-2xl text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Internationale Artikelen
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Wereldwijde inzichten en trends in AI-onderwijs (nieuwste eerst)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedInternationalPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleArticleClick(post.url)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 m-4">
                    <SafeIcon icon={FiGlobe} className="text-white bg-indigo-600 p-2 rounded-full text-xl" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <SafeIcon icon={FiCalendar} />
                      <span>{post.date}</span>
                      <span className="text-gray-300">•</span>
                      <span>{post.readTime} leestijd</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-indigo-600">{post.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 inline-flex items-center space-x-1">
                      <SafeIcon icon={FiExternalLink} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Meer artikelen laden
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blijf op de hoogte
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Laat weten welke blog je graag toegevoegd zou zien. Suggereer een blog.
            </p>
            <button
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-not-allowed"
              disabled
            >
              ai.onderwijs@gmail.com
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog;