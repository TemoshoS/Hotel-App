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
    <nav className={`navbar${menuOpen ? ' open' : ''}`}>
      <div className="menu-toggle" onClick={handleToggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul style={{marginLeft:'0px'}}>
      <li>
          <a href="/homePage" onClick={closeMenu}>
            Home
          </a>
        </li>
      </ul>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        
        <li>
          <a href="/services" onClick={closeMenu}>
            Services
          </a>
        </li>
        {loggedIn ? (
          <>
            <li>
              <a href="/profile" onClick={closeMenu}>
                Profile
              </a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/" onClick={closeMenu}>
                Login
              </a>
            </li>
            <li>
              <a href="/register" onClick={closeMenu}>
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
