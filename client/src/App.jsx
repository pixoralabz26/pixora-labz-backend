import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import FloatingChat from './components/FloatingChat';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Hide Navbar on admin route */}
      {!isAdmin && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          {/* Admin — completely hidden from public nav */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>

      {/* Hide Footer on admin route */}
      {!isAdmin && <Footer />}
      
      {/* Floating Chat on all public routes */}
      {!isAdmin && <FloatingChat />}
    </>
  );
}

export default App;
