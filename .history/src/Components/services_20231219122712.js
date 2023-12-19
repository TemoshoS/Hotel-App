import React from 'react';
import NavBar from './navBar';
import Footer from './footer';

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
          <li>Comfortable and well-appointed rooms</li>
          <li>24/7 concierge service</li>
          <li>High-speed internet access</li>
          <li>Room service</li>
          <li>On-site dining with a variety of culinary options</li>
          <li>Spa and wellness facilities</li>
          <li>Business center and meeting rooms</li>
          
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
