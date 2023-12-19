import React, { useEffect, useState } from 'react';
import { getServices } from '../services/serviceServices';
import NavBar from './navBar';
import Footer from './footer';


function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <img src={service.serviceImage} className="serviceImg" alt="Services" />
      <p className='serviceName'>{service.serviceName}</p>
      <p className=''>{service.serviceDesc}</p>
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
      <div >
      <h1 className='servicesHeader'>OUR HOTEL SERVICES</h1>
      <div className="services-container">
        
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;