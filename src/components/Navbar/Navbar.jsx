import React, { useEffect, useState, useContext } from 'react'
import './Navbar.css'
import logooo from '../../assets/logooo.png'
import { ThemeContext } from '../../ThemeContext'

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
        <li><a href='#front' onClick={() => setMobileMenu(false)}>Home</a></li>
        <li><a href='#programs' onClick={() => setMobileMenu(false)}>Programs</a></li>
        <li><a href='#about' onClick={() => setMobileMenu(false)}>About us</a></li>
        <li><a href='#campus' onClick={() => setMobileMenu(false)}>Campus</a></li>
        <li><a href='#testimonials' onClick={() => setMobileMenu(false)}>Testimonials</a></li>
        <li><a href='#contact' onClick={() => setMobileMenu(false)}>Contact us</a></li>
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
