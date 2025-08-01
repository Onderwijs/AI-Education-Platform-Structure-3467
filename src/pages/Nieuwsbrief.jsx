import React,{useState} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {downloadStartersgids} from '../utils/downloadUtils';

const {FiMail,FiDownload,FiCheck,FiGift,FiUsers,FiTrendingUp}=FiIcons;

const Nieuwsbrief=()=> {
  const [formData,setFormData]=useState({email: '',role: ''});
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [isSubscribed,setIsSubscribed]=useState(false);

  const benefits=[ 
    {icon: FiDownload,title: "Gratis AI Startersgids",description: "Complete gids met 50+ AI-tools voor docenten"},
    {icon: FiMail,title: "Tips",description: "Praktische AI-tips direct in je inbox"},
    {icon: FiUsers,title: "Exclusieve Content",description: "Vroege toegang tot nieuwe lessen en tools"},
    {icon: FiTrendingUp,title: "Trends & Updates",description: "Blijf op de hoogte van de nieuwste ontwikkelingen"} 
  ];

  const freebies=[ 
    {title: "AI in 30 Dagen Challenge",description: "Dagelijkse opdrachten om AI te integreren in je onderwijs",format: "PDF Workbook + Email Serie"},
    {title: "ChatGPT Prompt Library",description: "100+ geteste prompts voor verschillende vakken",format: "Digitale Database"},
    {title: "AI Ethics Lesplan",description: "Complete les over ethiek en AI voor alle niveaus",format: "Lesplan + Materialen"} 
  ];

  const handleInputChange=(e)=> {
    const {name,value}=e.target;
    setFormData(prev=> ({...prev,[name]: value}));
  };

  const handleSubmit=async (e)=> {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create email content for notification 
      const subject=encodeURIComponent('Nieuwe nieuwsbrief inschrijving - AI in het Onderwijs');
      const body=encodeURIComponent(` 
        Nieuwe nieuwsbrief inschrijving: 
        Email: ${formData.email} 
        Rol: ${formData.role || 'Niet opgegeven'} 

        Deze persoon wil zich inschrijven voor de nieuwsbrief en de gratis AI startersgids ontvangen. 
        Verzonden via onderwijs.ai nieuwsbrief pagina 
      `);

      // Send notification email using mailto 
      const mailtoLink=`mailto:ai.onderwijs@gmail.com?subject=${subject}&body=${body}`;

      // Open email client in background 
      const emailWindow=window.open(mailtoLink,'_blank');

      // Close the email window after a short delay (if it opened) 
      if (emailWindow) {
        setTimeout(()=> {
          try {
            emailWindow.close();
          } catch (e) {
            // Ignore errors when closing
          }
        },1000);
      }

      // Download the startersgids immediately 
      downloadStartersgids();

      // Show success message 
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error submitting form:',error);
      
      // Still download the guide even if email fails 
      downloadStartersgids();
      setIsSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center" >
        <div className="max-w-md mx-auto text-center px-4">
          <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.2}} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6" >
            <SafeIcon icon={FiCheck} className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Download gestart!
          </h1>
          <p className="text-gray-600 mb-6">
            Je AI Startersgids wordt nu gedownload. Je gegevens zijn ook verstuurd voor nieuwsbrief inschrijving. Check ook je downloads map als de download niet automatisch start.
          </p>
          <div className="space-y-4">
            <button onClick={()=> downloadStartersgids()} className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2" >
              <SafeIcon icon={FiDownload} />
              <span>Download opnieuw</span>
            </button>
            <button onClick={()=> setIsSubscribed(false)} className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors" >
              Terug naar overzicht
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="min-h-screen" >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity: 0,y: 50}} animate={{opacity: 1,y: 0}} >
            <SafeIcon icon={FiGift} className="text-6xl mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gratis AI Startersgids
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Ontvang direct onze complete AI-toolkit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <motion.div initial={{opacity: 0,x: -50}} animate={{opacity: 1,x: 0}} transition={{delay: 0.2}} >
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Start vandaag met AI in jouw onderwijs
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email adres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="jouw@email.nl"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Ik ben... (optioneel)
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecteer je rol</option>
                      <option value="po-docent">PO Docent</option>
                      <option value="vo-docent">VO Docent</option>
                      <option value="mbo-docent">MBO Docent</option>
                      <option value="hbo-docent">HBO Docent</option>
                      <option value="schoolleider">Schoolleider</option>
                      <option value="ict-coordinator">ICT Coördinator</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>{isSubmitting ? 'Bezig...' : 'Download Gratis Startersgids'}</span>
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  Door je in te schrijven ga je akkoord met onze{' '}
                  <a href="/privacy" className="text-primary-600 hover:underline">
                    privacyverklaring
                  </a>
                  . Je kunt je altijd uitschrijven.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Benefits */}
            <motion.div initial={{opacity: 0,x: 50}} animate={{opacity: 1,x: 0}} transition={{delay: 0.4}} >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Wat krijg je?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit,index)=> (
                  <motion.div
                    key={index}
                    initial={{opacity: 0,y: 20}}
                    animate={{opacity: 1,y: 0}}
                    transition={{delay: 0.6 + index * 0.1}}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={benefit.icon} className="text-xl text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Freebies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} className="text-center mb-16" >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gratis Downloads voor Abonnees
            </h2>
            <p className="text-xl text-gray-600">
              Exclusieve materialen om direct mee aan de slag te gaan
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {freebies.map((freebie,index)=> (
              <motion.div
                key={index}
                initial={{opacity: 0,y: 50}}
                whileInView={{opacity: 1,y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {freebie.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {freebie.description}
                </p>
                <div className="bg-primary-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-primary-700">
                    {freebie.format}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Sluit je aan bij 2.500+ docenten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">2.500+</div>
                <div className="text-gray-600">Nieuwsbrief abonnees</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
                <div className="text-gray-600">Gemiddelde beoordeling</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-gray-600">Leest elke week mee</div>
              </div>
            </div>
            <blockquote className="text-xl text-gray-600 italic mb-4">
              "Dankzij de AI-tips van deze nieuwsbrief heb ik mijn lesvoorbereiding gehalveerd en mijn leerlingen zijn veel meer betrokken."
            </blockquote>
            <cite className="text-gray-500">- Marieke,VO Docent Nederlands</cite>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity: 0,y: 50}} whileInView={{opacity: 1,y: 0}} viewport={{once: true}} >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Stuur een berichtje.
            </p>
            <button 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 cursor-not-allowed"
              disabled
            >
              <SafeIcon icon={FiMail} />
              <span>ai.onderwijs@gmail.com</span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Nieuwsbrief;