import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import PO from './pages/docenten/PO';
import VO from './pages/docenten/VO';
import MBOHBO from './pages/docenten/MBOHBO';
import AITools from './pages/AITools'; // Dit is nu onderdeel van Kenniscentrum
import LesLab from './pages/LesLab';
import Blog from './pages/Blog';
import Trainingen from './pages/Trainingen';
import Nieuwsbrief from './pages/Nieuwsbrief';
import OverOns from './pages/OverOns';
import Privacy from './pages/Privacy';

// New Pages
import ToolsOverview from './pages/ToolsOverview';
import ToolDetail from './pages/ToolDetail';
import Kennisbank from './pages/Kennisbank';
import Downloads from './pages/Downloads';
import TrainingDetail from './pages/trainingen/TrainingDetail';
import Cookies from './pages/legal/Cookies';
import AVG from './pages/legal/AVG';
import Terms from './pages/legal/Terms';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-slate-50">
        <Navbar />
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <Routes>
              {/* 1. Algemeen */}
              <Route path="/" element={<Home />} />
              <Route path="/over-ons" element={<OverOns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/avg" element={<AVG />} />
              
              {/* Juridisch Submap */}
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/terms" element={<Terms />} />

              {/* 2. AI Tools (Interne tools) */}
              <Route path="/tools" element={<ToolsOverview />} />
              <Route path="/tools/:toolId" element={<ToolDetail />} />

              {/* 3. Voor Docenten */}
              <Route path="/voor-docenten/po" element={<PO />} />
              <Route path="/voor-docenten/vo" element={<VO />} />
              <Route path="/voor-docenten/mbo-hbo" element={<MBOHBO />} />

              {/* 4. Lesmateriaal */}
              <Route path="/leslab" element={<LesLab />} />
              <Route path="/lesmateriaal/downloads" element={<Downloads />} />
              
              {/* 5. Kenniscentrum */}
              <Route path="/ai-tools" element={<AITools />} /> {/* Database */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/kennisbank" element={<Kennisbank />} />

              {/* 6. Trainingen */}
              <Route path="/trainingen" element={<Trainingen />} />
              <Route path="/trainingen/:slug" element={<TrainingDetail />} />

              {/* 7. Downloads & Nieuwsbrief */}
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />

            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;