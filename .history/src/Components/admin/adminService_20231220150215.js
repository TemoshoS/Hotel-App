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
  <div key={service.id} >
    <img src={service.serviceImage} alt='image' class='imgService' />
    <div >
      <p >{service.serviceName}</p>
      <p >{service.serviceDesc}</p>
      <p>Actions</p>
    </div>
  </div>
))}
</div>
    </div>
  )
}

export default AdminService