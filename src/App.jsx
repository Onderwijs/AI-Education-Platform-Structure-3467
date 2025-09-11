import React,{Suspense} from 'react';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load components for better performance
const Home=React.lazy(()=> import('./pages/Home'));
const PO=React.lazy(()=> import('./pages/docenten/PO'));
const VO=React.lazy(()=> import('./pages/docenten/VO'));
const MBOHBO=React.lazy(()=> import('./pages/docenten/MBOHBO'));
const AITools=React.lazy(()=> import('./pages/AITools'));
const Trainingen=React.lazy(()=> import('./pages/Trainingen'));
const LesLab=React.lazy(()=> import('./pages/LesLab'));
const Blog=React.lazy(()=> import('./pages/Blog'));
const Nieuwsbrief=React.lazy(()=> import('./pages/Nieuwsbrief'));
const OverOns=React.lazy(()=> import('./pages/OverOns'));
const Privacy=React.lazy(()=> import('./pages/Privacy'));

// Loading component
const LoadingSpinner=()=> (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voor-docenten/po" element={<PO />} />
              <Route path="/voor-docenten/vo" element={<VO />} />
              <Route path="/voor-docenten/mbo-hbo" element={<MBOHBO />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/trainingen" element={<Trainingen />} />
              <Route path="/leslab" element={<LesLab />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />
              <Route path="/nieuws" element={<Nieuwsbrief />} />
              <Route path="/over-ons" element={<OverOns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<OverOns />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;