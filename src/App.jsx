import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Skill from './Components/Skill';
import Services from './Components/Services';
import Projects from './Components/Projects';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import PDF from './Components/PDF';
import ThemeSwitcher from './Commons/ThemeSwitcher';
import Apps from './Components/Apps';
import Chat4 from './Components/Chat/Chat4';

const MainPage = () => (
  <>
    <Hero />
    <About />
    <Skill />
    <Services />
    <Projects />
    <Testimonials />
    <Contact />
  </>
);

function App() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-in-sine"
    });
  }, []);

  const location = useLocation();

  // Check if the current path is the chat route
  const isChatRoute = location.pathname === '/chatgpt4o';

  return (
    <>
      <ThemeSwitcher />
      {!isChatRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/e-book" element={<PDF />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/chatgpt4o" element={<Chat4 />} />
      </Routes>
      {!isChatRoute && <Footer />}
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;