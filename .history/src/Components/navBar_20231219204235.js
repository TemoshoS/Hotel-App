
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';


function Navigation() {
  const navigate = useNavigate();
  const [active, setActive] = useState("nav_menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [loggedIn, setLoggedIn] = useState(false);

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

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className='nav'>
      <a href="/homePage" className="nav__brand">
        Temosho
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/services">Services</a>
        </li>
        {loggedIn ? (
          <>
            <li className="nav__item">
              <a href="/profile">Profile</a>
            </li>
            <li className="nav__item">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav__item">
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
