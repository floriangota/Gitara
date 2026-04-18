import React, { useContext, useState } from "react";
import { ThemeContext } from './ThemeContext';
import Navbar from './components/Navbar/Navbar'
import Front from './components/Navbar/front/front'
import Programs from './components/Navbar/programs/programs'
import Tittle from './components/Navbar/Tittle/tittle'
import About from './components/Navbar/About/About'
import Campus from "./components/Navbar/Campus/Campus";
import Testimonials from "./components/Navbar/Testimonials/Testimonials";
import Contact from "./components/Navbar/Contact/Contact";
import Foter from "./components/Navbar/Foter/Foter";
import Loader from "./components/Loader/Loader";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <Front />
      <div className="app-container">
        <div id="programs">
          <Tittle subtitle="Our Programs" title="What We Offer" />
          <Programs />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="campus">
          <Tittle subtitle="Gallery" title="Campus Photos" />
          <Campus />
        </div>
        <div id="testimonials">
          <Tittle subtitle="TESTIMONIALS" title="What Our Students Say" />
          <Testimonials />
        </div>
        <div id="contact">
          <Tittle subtitle="Contact Us" title="Get in Touch" />
          <Contact />
        </div>
        <Foter />
      </div>

    </div>
  )
}

export default App