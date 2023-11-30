import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Temoshoroyal.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Book your stay with us and embrace the Luxury Hotels experience. Redefine luxury at the most affordable rates and create lasting memories with us.</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
              <Link to="/">Rooms</Link>
            
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Address: Tembisa <br />
            Email: temoshomaduane.com <br />
            Phone: +277 213 719 77
          </p>
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-icons">
            
            <a href="https://www.facebook.com/temosho.shaku" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://github.com/TemoshoS" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/temosho-shaku-a2598917b/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
           
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Temosho Shaku. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
