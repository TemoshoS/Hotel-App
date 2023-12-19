// Import necessary libraries and components
import React from 'react';
import NavBar from './navBar';
import Footer from './footer';
import { FaBed, FaConciergeBell, FaWifi, FaUtensils, FaClipboardList, FaSpa, FaBriefcase } from 'react-icons/fa';


// Define the Services component
function Services() {
  // Define an array of services
  const services = [
    { icon: <FaBed />, name: 'Comfortable and well-appointed rooms' },
    { icon: <FaConciergeBell />, name: '24/7 concierge service' },
    { icon: <FaWifi />, name: 'High-speed internet access' },
    { icon: <FaUtensils />, name: 'Room service' },
    { icon: <FaClipboardList />, name: 'On-site dining with a variety of culinary options' },
    { icon: <FaSpa />, name: 'Spa and wellness facilities' },
    { icon: <FaBriefcase />, name: 'Business center and meeting rooms' },
    // Add more services as needed
  ];

  // Function to render a single service item
  const renderService = (service, index) => (
    <div key={index} className="service-item">
      <div className="icon">{service.icon}</div>
      <div className="name">{service.name}</div>
    </div>
  );

  // Function to render rows of services
  const renderServiceRows = () => {
    const rows = [];
    for (let i = 0; i < services.length; i += 3) {
      const row = (
        <div key={i} className="service-row">
          {services.slice(i, i + 3).map((service, index) => renderService(service, i + index))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  // Render the Services component
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
        <div className="services">{renderServiceRows()}</div>
      </div>
      <Footer />
    </div>
  );
}

// Export the Services component
export default Services;
