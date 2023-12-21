import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/Temoshoroyal.jpg';

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
        <div>
          <a href="/homePage" className="active" onClick={closeMenu}>
          
              <img src={logo} alt="Logo" style={{width:'100px', height:'100px',borderRadius:''}}/>
            
          </a>
        </div>
        
        <div className="right-links">
          <a>
          </a>
          <a href="/services" onClick={closeMenu}>
            Services
          </a>
          {loggedIn ? (
          <>
           
              <a href="/profile" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUser}/>
              </a>
              <a href="/profile" onClick={closeMenu}>
              <button className='logOutBtn' onClick={handleLogout}>Logout</button>
              </a>
          </>
        ) : (
          <>
            
              <a href="/" onClick={closeMenu}>
                Login
              </a>
            
              <a href="/register" onClick={closeMenu}>
                Register
              </a>
            
          </>
        )}
        </div>

        <a href="javascript:void(0);" className="icon" onClick={handleToggleMenu}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </div>
  );
}

export default Navigation;
