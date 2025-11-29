import React from 'react';
import { useParams, Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiClock, FiMapPin, FiCheckCircle } = FiIcons;

const TrainingDetail = () => {
  const { slug } = useParams();
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
            TRAINING
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-pink-100">
            Een intensieve sessie om je vaardigheden naar een hoger niveau te tillen.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Over deze training</h2>
              <p className="text-gray-600 leading-relaxed">
                In deze training leer je praktisch aan de slag te gaan met AI. We behandelen de theorie, maar focussen vooral op de praktijk. Je gaat naar huis met concrete materialen die je morgen in de les kunt gebruiken.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wat je gaat leren:</h3>
              <ul className="space-y-3">
                {[1,2,3,4].map(i => (
                  <li key={i} className="flex items-start">
                    <SafeIcon icon={FiCheckCircle} className="text-pink-600 mt-1 mr-3 shrink-0" />
                    <span className="text-gray-700">Leerdoel {i}: Praktische toepassing van tools</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-700">
                <SafeIcon icon={FiClock} className="mr-3 text-pink-600" /> 3 uur
              </div>
              <div className="flex items-center text-gray-700">
                <SafeIcon icon={FiCalendar} className="mr-3 text-pink-600" /> Op aanvraag
              </div>
              <div className="flex items-center text-gray-700">
                <SafeIcon icon={FiMapPin} className="mr-3 text-pink-600" /> Online of op locatie
              </div>
            </div>
            <Link to="/over-ons#contact" className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors">
              Offerte Aanvragen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;