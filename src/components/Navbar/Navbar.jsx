import React, { useEffect, useState, useContext } from 'react'
import './Navbar.css'
import logooo from '../../assets/logooo.png'
import { ThemeContext } from '../../ThemeContext'
import { Link } from 'react-scroll';

const Navbar = () => {

  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  return (
    <nav className={`app-container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logooo} alt="" className='logo' />
      <ul className={mobileMenu ? 'show-mobile-menu' : ''}> 
        <li><Link to='front' smooth={true} offset={0} duration={500} onClick={() => setMobileMenu(false)}>Home</Link></li>
        <li><Link to='programs' smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Programs</Link></li>
        <li><Link to='about' smooth={true} offset={-150} duration={500} onClick={() => setMobileMenu(false)}>About us</Link></li>
        <li><Link to='campus' smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Campus</Link></li>
        <li><Link to='testimonials' smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Testimonials</Link></li>
        <li><Link to='contact' smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Contact us</Link></li>
      </ul>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
