import React, { useEffect, useState } from 'react';
import { getServices} from '../services/serviceServices'

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error.message);
        setServices([]);
        
      }
    };

 
    
  }, []);
  return (
    <div>services</div>
  )
}

export default Services