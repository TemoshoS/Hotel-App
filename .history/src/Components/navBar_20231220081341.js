import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

function Navigation() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const user = await AuthService.getCurrentUser();
      setLoggedIn(!!user);
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setLoggedIn(false);
    navigate('/');
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div className={`topnav${menuOpen ? ' responsive' : ''}`}>
        
        <a href="#homePage" className="active" onClick={closeMenu}>
          Home
        </a>
        <a href="#services" onClick={closeMenu}>
          News
        </a>
        <a href="#profile" onClick={closeMenu}>
          Contact
        </a>
        <a href="#logout" onClick={closeMenu}>
          About
        </a>
        <a href="javascript:void(0);" className="icon" onClick={handleToggleMenu}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </div>
  );
}

export default Navigation;
