import React, { useState } from 'react';
import logo from '../images/Temoshoroyal.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div >
            <Link to="/">
              <img src={logo} alt="Logo"  className="navbar-logo" />
            </Link>
          </div>
      <div className='navbar-links'>Links</div>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Rooms</a>
        <a href='#'>Contact</a>
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        
      </div>
    </nav>
  );
};

export default NavBar;
