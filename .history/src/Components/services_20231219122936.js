import React from 'react';
import NavBar from './navBar';
import Footer from './footer';
import { FaBed, FaConciergeBell, FaWifi, FaUtensils, FaClipboardList, FaSpa, FaBriefcase } from 'react-icons/fa'; // Import icons from Font Awesome
import './Services.css'; // Import the CSS file for styling

function Services() {
  return (
    <div>
      <NavBar />
      <div className="services-container">
        <h2>Our Services</h2>
        <p>
          Welcome to our hotel! We are dedicated to providing you with an
          exceptional experience during your stay. Here are some of the
          services we offer:
        </p>
        <ul>
          <li>
            <FaBed /> Comfortable and well-appointed rooms
          </li>
          <li>
            <FaConciergeBell /> 24/7 concierge service
          </li>
          <li>
            <FaWifi /> High-speed internet access
          </li>
          <li>
            <FaUtensils /> Room service
          </li>
          <li>
            <FaClipboardList /> On-site dining with a variety of culinary options
          </li>
          <li>
            <FaSpa /> Spa and wellness facilities
          </li>
          <li>
            <FaBriefcase /> Business center and meeting rooms
          </li>
          {/* Add more services as needed */}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
