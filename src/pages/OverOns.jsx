import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiMail,FiMapPin}=FiIcons;

const OverOns=()=> {
  const [formData,setFormData]=React.useState({name: '',email: '',subject: '',message: ''});

  const handleSubmit=async (e)=> {
    e.preventDefault();
    // Send email to ai.onderwijs@gmail.com 
    const mailtoLink=`mailto:ai.onderwijs@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Naam: ${formData.name}\nEmail: ${formData.email}\n\nBericht:\n${formData.message}`)}`;
    window.location.href=mailtoLink;
  };

  const handleChange=(e)=> {
    const {name,value}=e.target;
    setFormData(prevState=> ({...prevState,[name]: value}));
  };

  const teamMembers=[ 
    {
      name: "Maike",
      role: "Oprichter & Docent",
      bio: "Docent Kunst & Vormgeving aan het Teylingen College Leeuwenhorst met een passie voor technologie.",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753861745628-MaikeFoto.jpg"
    },
    {
      name: "Nieuw teamlid?",
      role: "Naam?",
      bio: "Ben jij een onderwijsprofessional met passie voor AI en innovatie? Neem contact op!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "Join",
      role: "Naam?",
      bio: "Ben je een enthousiaste professional die wil bijdragen aan de toekomst van het onderwijs?",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    } 
  ];

  const values=[ 
    {
      title: "Praktijkgericht",
      description: "We geloven in concrete,toepasbare kennis in plaats van theoretische concepten."
    },
    {
      title: "Ethisch verantwoord",
      description: "Verantwoord gebruik van AI staat centraal in al onze materialen en trainingen."
    },
    {
      title: "Toegankelijk",
      description: "AI moet beschikbaar zijn voor alle docenten,ongeacht technische achtergrond."
    },
    {
      title: "Toekomstgericht",
      description: "We bereiden docenten en leerlingen voor op een wereld waarin AI centraal staat."
    } 
  ];

  return ( 
    <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      className="min-h-screen" 
    > 
      {/* Hero Section */} 
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <motion.div 
              initial={{opacity: 0,x: -50}} 
              animate={{opacity: 1,x: 0}} 
            > 
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> 
                Over AI in Onderwijs 
              </h1> 
              <p className="text-xl text-primary-100 mb-8"> 
                Wij zijn een team van ervaren docenten en AI-experts met één missie: kunstmatige intelligentie toegankelijk maken voor alle onderwijsprofessionals. 
              </p> 
              <div className="flex flex-wrap gap-4"> 
                <Link 
                  to="/voor-scholen" 
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" 
                > 
                  Werk met ons samen 
                </Link> 
                <a 
                  href="#contact" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors" 
                > 
                  Neem contact op 
                </a> 
              </div> 
            </motion.div> 
            <motion.div 
              initial={{opacity: 0,x: 50}} 
              animate={{opacity: 1,x: 0}} 
              transition={{delay: 0.2}} 
            > 
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="AI in onderwijs team" 
                className="rounded-2xl shadow-2xl" 
              /> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Our Story */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-16" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Ons Verhaal 
            </h2> 
          </motion.div> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <motion.div 
              initial={{opacity: 0,x: -50}} 
              whileInView={{opacity: 1,x: 0}} 
              viewport={{once: true}} 
            > 
              <h3 className="text-2xl font-bold text-gray-900 mb-6"> 
                Wie ben ik 
              </h3> 
              <p className="text-gray-600 mb-4"> 
                Als docent Kunst & Vormgeving combineer ik creativiteit met technologie. Ik onderzoek hoe AI onderwijs kan verrijken en ik probeer complexe tools naar praktische toepassingen in de klas te vertalen. 
              </p> 
              <p className="text-gray-600 mb-4"> 
                Naarmate de interesse groeide,ontstond het idee om een platform te creëren dat docenten helpt om AI effectief en verantwoord in te zetten in het onderwijs. 
              </p> 
              <p className="text-gray-600"> 
                Missie van deze website: AI toegankelijk maken voor alle onderwijsprofessionals,ongeacht hun technische achtergrond. 
              </p> 
            </motion.div> 
            <motion.div 
              initial={{opacity: 0,x: 50}} 
              whileInView={{opacity: 1,x: 0}} 
              viewport={{once: true}} 
              className="relative" 
            > 
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-lg z-0"></div> 
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary-100 rounded-lg z-0"></div> 
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="AI in onderwijs beginnings" 
                className="rounded-2xl shadow-lg relative z-10" 
              /> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Our Values */} 
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-16" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Onze Waarden 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Deze principes staan centraal in alles wat we doen 
            </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {values.map((value,index)=> ( 
              <motion.div 
                key={index} 
                initial={{opacity: 0,y: 50}} 
                whileInView={{opacity: 1,y: 0}} 
                viewport={{once: true}} 
                transition={{delay: index * 0.1}} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" 
              > 
                <h3 className="text-xl font-semibold text-gray-900 mb-3"> 
                  {value.title} 
                </h3> 
                <p className="text-gray-600"> 
                  {value.description} 
                </p> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Team Section */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-16" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Team 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Ervaren onderwijsprofessionals met een passie voor technologie 
            </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {teamMembers.map((member,index)=> ( 
              <motion.div 
                key={index} 
                initial={{opacity: 0,y: 50}} 
                whileInView={{opacity: 1,y: 0}} 
                viewport={{once: true}} 
                transition={{delay: index * 0.1}} 
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" 
              > 
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover" 
                /> 
                <div className="p-6"> 
                  <h3 className="text-xl font-semibold text-gray-900 mb-1"> 
                    {member.name} 
                  </h3> 
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p> 
                  <p className="text-gray-600">{member.bio}</p> 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Contact Section */} 
      <section id="contact" className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
            className="text-center mb-16" 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Contact 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Heb je vragen of wil je samenwerken? Stuur een berichtje! 
            </p> 
          </motion.div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> 
            <motion.div 
              initial={{opacity: 0,x: -50}} 
              whileInView={{opacity: 1,x: 0}} 
              viewport={{once: true}} 
            > 
              <div className="bg-white p-8 rounded-2xl shadow-lg"> 
                <h3 className="text-2xl font-bold text-gray-900 mb-6"> 
                  Stuur ons een bericht 
                </h3> 
                <form onSubmit={handleSubmit}> 
                  <div className="space-y-4"> 
                    <div> 
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> 
                        Naam 
                      </label> 
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      /> 
                    </div> 
                    <div> 
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> 
                        E-mailadres 
                      </label> 
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      /> 
                    </div> 
                    <div> 
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1"> 
                        Onderwerp 
                      </label> 
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      /> 
                    </div> 
                    <div> 
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1"> 
                        Bericht 
                      </label> 
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={4} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                      ></textarea> 
                    </div> 
                  </div> 
                  <button 
                    type="submit" 
                    className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors" 
                  > 
                    Verstuur bericht 
                  </button> 
                </form> 
              </div> 
            </motion.div> 
            <motion.div 
              initial={{opacity: 0,x: 50}} 
              whileInView={{opacity: 1,x: 0}} 
              viewport={{once: true}} 
            > 
              <div className="bg-white p-8 rounded-2xl shadow-lg"> 
                <h3 className="text-2xl font-bold text-gray-900 mb-6"> 
                  Contactgegevens 
                </h3> 
                <div className="space-y-6 mb-8"> 
                  <div className="flex items-start space-x-4"> 
                    <SafeIcon icon={FiMail} className="text-primary-600 mt-1" /> 
                    <div> 
                      <div className="font-medium text-gray-900">E-mail</div> 
                      <a 
                        href="mailto:ai.onderwijs@gmail.com" 
                        className="text-primary-600 hover:underline" 
                      > 
                        ai.onderwijs@gmail.com 
                      </a> 
                    </div> 
                  </div> 
                  <div className="flex items-start space-x-4"> 
                    <SafeIcon icon={FiMapPin} className="text-primary-600 mt-1" /> 
                    <div> 
                      <div className="font-medium text-gray-900">Adres</div> 
                      <p className="text-gray-600"> 
                        Amsterdam<br /> 
                        Nederland 
                      </p> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* CTA Section */} 
      <section className="py-20 bg-primary-600"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
          <motion.div 
            initial={{opacity: 0,y: 50}} 
            whileInView={{opacity: 1,y: 0}} 
            viewport={{once: true}} 
          > 
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"> 
              Klaar om te beginnen met AI in jouw onderwijs? 
            </h2> 
            <p className="text-xl text-primary-100 mb-8"> 
              Download onze gratis startgids en begin vandaag nog 
            </p> 
            <Link 
              to="/nieuwsbrief" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors" 
            > 
              Gratis Download 
            </Link> 
          </motion.div> 
        </div> 
      </section> 
    </motion.div> 
  );
};

export default OverOns;