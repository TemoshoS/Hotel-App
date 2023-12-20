import React, { useEffect, useState } from 'react';
import { getServices } from '../../services/serviceServices';

function AdminService() {
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
                <div class='infoDisplay'>

{services.map((service) => (
  <div key={service.id} class='services'>
    <img src={service.serviceImage} alt='image' class='imgService' />
    <div className='serviceInfo'>
      <p class='nameService'>{service.serviceName}</p>
      <p class='descService'>{service.serviceDesc}</p>
    </div>
  </div>
))}
</div>
    </div>
  )
}

export default AdminService