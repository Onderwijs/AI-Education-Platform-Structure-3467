import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Existing Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import PO from './pages/docenten/PO';
import VO from './pages/docenten/VO';
import MBOHBO from './pages/docenten/MBOHBO';
import AITools from './pages/AITools';
import LesLab from './pages/LesLab';
import Blog from './pages/Blog';
import Trainingen from './pages/Trainingen';
import Nieuwsbrief from './pages/Nieuwsbrief';
import OverOns from './pages/OverOns';
import Privacy from './pages/Privacy';

// Tools
import ToolsOverview from './pages/tools/ToolsOverview';
import ToolPlaceholder from './pages/tools/ToolPlaceholder';
import LessonGenerator from './pages/tools/LessonGenerator';
import RubricMaker from './pages/tools/RubricMaker';
import TestQuestionMaker from './pages/tools/TestQuestionMaker';
import Taalcoach from './pages/tools/Taalcoach';
import PresentatieGenerator from './pages/tools/PresentatieGenerator';
import MentorLessonPlanner from './pages/tools/MentorLessonPlanner';
import ParentEmailGenerator from './pages/tools/ParentEmailGenerator';

// Kenniscentrum (NEW IMPORTS)
import Kennisbank from './pages/kenniscentrum/Kennisbank';
import WatIsAI from './pages/kenniscentrum/WatIsAI';
import ChatGPTInDeKlas from './pages/kenniscentrum/ChatGPTInDeKlas';
import PromptBibliotheek from './pages/kenniscentrum/PromptBibliotheek';
import Downloads from './pages/Downloads';
import TrainingDetail from './pages/trainingen/TrainingDetail';
import LegalPage from './pages/legal/LegalPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              {/* 1. Algemeen */}
              <Route path="/" element={<Home />} />
              <Route path="/over-ons" element={<OverOns />} />
              
              {/* 2. AI Tools (Interactive) */}
              <Route path="/tools" element={<ToolsOverview />} />
              <Route path="/tools/lesgenerator" element={<LessonGenerator />} />
              <Route path="/tools/rubriekmaker" element={<RubricMaker />} />
              <Route path="/tools/toetsvragenmaker" element={<TestQuestionMaker />} />
              <Route path="/tools/taalcoach" element={<Taalcoach />} />
              <Route path="/tools/presentatiegenerator" element={<PresentatieGenerator />} />
              <Route path="/tools/mentorles" element={<MentorLessonPlanner />} />
              <Route path="/tools/oudermailgenerator" element={<ParentEmailGenerator />} />
              
              {/* 3. Voor Docenten */}
              <Route path="/voor-docenten/po" element={<PO />} />
              <Route path="/voor-docenten/vo" element={<VO />} />
              <Route path="/voor-docenten/mbo-hbo" element={<MBOHBO />} />

              {/* 4. Lesmateriaal & Downloads */}
              <Route path="/leslab" element={<LesLab />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/lesmateriaal/downloads" element={<Downloads />} />

              {/* 5. Kenniscentrum */}
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/kennisbank" element={<Kennisbank />} />
              
              {/* NIEUWE KENNISBANK ROUTES */}
              <Route path="/kennisbank/wat-is-ai" element={<WatIsAI />} />
              <Route path="/kennisbank/chatgpt-in-de-klas" element={<ChatGPTInDeKlas />} />
              <Route path="/kennisbank/prompt-bibliotheek" element={<PromptBibliotheek />} />

              {/* 6. Trainingen */}
              <Route path="/trainingen" element={<Trainingen />} />
              <Route path="/trainingen/chatgpt-in-de-klas" element={<TrainingDetail 
                title="ChatGPT in de klas" 
                description="Leer hoe je ChatGPT veilig en effectief inzet als onderwijsassistent." 
              />} />
              <Route path="/trainingen/ai-differentiatie" element={<TrainingDetail 
                title="Differentiëren met AI" 
                description="Maak onderwijs op maat voor elke leerling met behulp van AI-tools." 
              />} />
              <Route path="/trainingen/gemini-voor-docenten" element={<TrainingDetail 
                title="Gemini voor Docenten" 
                description="Haal het maximale uit Google's AI-modellen in je lespraktijk." 
              />} />
              <Route path="/trainingen/ai-en-privacy-avg" element={<TrainingDetail 
                title="AI, Privacy & AVG" 
                description="Juridische en ethische kaders voor veilig gebruik van AI op school." 
              />} />

              {/* 7. Nieuwsbrief/Downloads */}
              <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />

              {/* 8. Juridisch */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<LegalPage title="Cookiebeleid" content={<p>Wij gebruiken functionele cookies om de website te laten werken. Analytische cookies worden anoniem verwerkt.</p>} />} />
              <Route path="/avg" element={<LegalPage title="AVG Verklaring" content={<p>Wij voldoen aan de AVG richtlijnen. Gegevens worden niet gedeeld met derden zonder toestemming.</p>} />} />
              <Route path="/legal/terms" element={<LegalPage title="Algemene Voorwaarden" content={<p>Op al onze diensten zijn onze algemene voorwaarden van toepassing.</p>} />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;