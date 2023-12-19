import React, { useEffect, useState } from 'react';
import { getServices } from '../services/serviceServices';
import NavBar from './navBar';
import Footer from './footer';

import './Services.css'; // Import the CSS styles

function ServiceCard({ service }) {
  return (
    <div className="feature-box-1">
      <div className="icon">
        <img src={service.serviceImage} className="serviceImg" alt="Service" />
      </div>
      <div className="feature-content">
        <h5>{service.serviceName}</h5>
        <p>{service.serviceDesc}</p>
      </div>
    </div>
  );
}

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const servicesData = await getServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error.message);
      setServices([]);
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <section className="section services-section" id="services">
          <div className="container">
            <h2 className="section-title">OUR HOTEL SERVICES</h2>
            <div className="row">
              {services.map((service) => (
                <div key={service.id} className="col-sm-6 col-lg-4">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
