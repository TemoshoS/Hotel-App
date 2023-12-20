import React, { useEffect, useState } from 'react';
import { getServices, deleteService } from '../../services/serviceServices';

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

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      fetchServicesData(); // Refresh the services data after deletion
    } catch (error) {
      console.error('Error deleting service:', error.message);
    }
  };

  return (
    <div>
      <div className='infoService'>
        {services.map((service) => (
          <div key={service.id} className='serviceCard'>
            <img src={service.serviceImage} alt='image' className='aimgService' />
            <div className='serviceDetails'>
              <p className='serviceName'>{service.serviceName}</p>
              <p >{service.serviceDesc}</p>
              <div className='actionButtons'>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
                <button>View</button>
                <button>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminService;
