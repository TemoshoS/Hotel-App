// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">
              <img src="/path/to/your/logo.png" alt="Your Logo" />
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your description about the hotel and its values.</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/amenities">Amenities</Link>
            </li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Address: Your Hotel Address <br />
            Email: your.email@example.com <br />
            Phone: +1 123 456 7890
          </p>
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-icons">
            
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
           
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Your Hotel Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
