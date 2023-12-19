
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
    setMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar${menuOpen ? ' open' : ''}`}>
     <div className="menu-toggle" onClick={handleToggleMenu}>
        <div className="bar">1</div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul>
        <li>
          <a href="/homePage">Home</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/services">Services</a>
        </li>
        {loggedIn ? (
          <>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
