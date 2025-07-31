import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { questConfig } from './config/questConfig';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import VoorDocenten from './pages/VoorDocenten';
import PO from './pages/docenten/PO';
import VO from './pages/docenten/VO';
import MBOHBO from './pages/docenten/MBOHBO';
import AITools from './pages/AITools';
import Trainingen from './pages/Trainingen';
import LesLab from './pages/LesLab';
import Blog from './pages/Blog';
import Quiz from './pages/Quiz';
import VoorScholen from './pages/VoorScholen';
import Nieuwsbrief from './pages/Nieuwsbrief';
import OverOns from './pages/OverOns';
import Privacy from './pages/Privacy';
import GetStarted from './pages/GetStarted';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voor-docenten" element={<VoorDocenten />} />
              <Route path="/voor-docenten/po" element={<PO />} />
              <Route path="/voor-docenten/vo" element={<VO />} />
              <Route path="/voor-docenten/mbo-hbo" element={<MBOHBO />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/trainingen" element={<Trainingen />} />
              <Route path="/leslab" element={<LesLab />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/voor-scholen" element={<VoorScholen />} />
              <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />
              <Route path="/over-ons" element={<OverOns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<OverOns />} />
              <Route path="/get-started" element={<GetStarted />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </QuestProvider>
  );
}

export default App;