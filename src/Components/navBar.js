import React, { useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className='navbar-logo'>Logo</div>
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
