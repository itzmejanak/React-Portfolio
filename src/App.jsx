import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Layout = () => (
  <div>
    <Navbar />
    <div className="content">
      {/* render route-specific components here */}
      {props.children}
    </div>
    <Footer />
  </div>
);

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

  return (
    <Router>
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<Layout><MainPage /></Layout>} />
        <Route path="/e-book" element={<Layout><PDF /></Layout>} />
        <Route path="/apps" element={<Layout><Apps /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;