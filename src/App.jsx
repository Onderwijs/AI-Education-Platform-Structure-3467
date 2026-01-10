import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Common
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieBanner from './components/common/CookieBanner';

// Main Pages
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
import Downloads from './pages/Downloads';
import Framework from './pages/Framework';

// Tools
import ToolsOverview from './pages/tools/ToolsOverview';
import LessonGenerator from './pages/tools/LessonGenerator';
import RubricMaker from './pages/tools/RubricMaker';
import TestQuestionMaker from './pages/tools/TestQuestionMaker';
import Taalcoach from './pages/tools/Taalcoach';
import PresentatieGenerator from './pages/tools/PresentatieGenerator';
import MentorLessonPlanner from './pages/tools/MentorLessonPlanner';
import ParentEmailGenerator from './pages/tools/ParentEmailGenerator';
import Sociogram from './pages/tools/Sociogram';
import SeatingChart from './pages/tools/SeatingChart';

// Kenniscentrum
import Kennisbank from './pages/kenniscentrum/Kennisbank';
import WatIsAI from './pages/kenniscentrum/WatIsAI';
import ChatGPTInDeKlas from './pages/kenniscentrum/ChatGPTInDeKlas';
import PromptBibliotheek from './pages/kenniscentrum/PromptBibliotheek';

import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/over-ons" element={<OverOns />} />
              
              <Route path="/tools" element={<ToolsOverview />} />
              <Route path="/tools/lesgenerator" element={<LessonGenerator />} />
              <Route path="/tools/rubriekmaker" element={<RubricMaker />} />
              <Route path="/tools/toetsvragenmaker" element={<TestQuestionMaker />} />
              <Route path="/tools/taalcoach" element={<Taalcoach />} />
              <Route path="/tools/presentatiegenerator" element={<PresentatieGenerator />} />
              <Route path="/tools/mentorles" element={<MentorLessonPlanner />} />
              <Route path="/tools/oudermailgenerator" element={<ParentEmailGenerator />} />
              <Route path="/tools/sociogram" element={<Sociogram />} />
              <Route path="/tools/klassenplattegrond" element={<SeatingChart />} />

              <Route path="/voor-docenten/po" element={<PO />} />
              <Route path="/voor-docenten/vo" element={<VO />} />
              <Route path="/voor-docenten/mbo-hbo" element={<MBOHBO />} />

              <Route path="/leslab" element={<LesLab />} />
              <Route path="/downloads" element={<Downloads />} />

              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/kennisbank" element={<Kennisbank />} />
              <Route path="/kennisbank/wat-is-ai" element={<WatIsAI />} />
              <Route path="/kennisbank/chatgpt-in-de-klas" element={<ChatGPTInDeKlas />} />
              <Route path="/kennisbank/prompt-bibliotheek" element={<PromptBibliotheek />} />
              <Route path="/framework" element={<Framework />} />

              <Route path="/trainingen" element={<Trainingen />} />
              <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal/privacy" element={<Privacy />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;