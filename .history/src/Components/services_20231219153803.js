import React, { useEffect, useState } from 'react';
import { getServices } from '../services/serviceServices'
import NavBar from './navBar';
import Footer from './footer';

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
       {
        services.map((service)=>(
          <div key={service.id}>
            <img src={service.serviceImage} className='' alt='Services'/>
            <p>{service.serviceName}</p>
            <p>{service.serviceDesc}</p>


          </div>
        ))
       }
      <Footer />

    </div>
  )
}

export default Services