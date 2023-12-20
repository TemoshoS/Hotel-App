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
      <div>
      <table className='infoService'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td><img src={service.serviceImage} alt='image' className='aimgService' /></td>
              <td>{service.serviceName}</td>
              <td>{service.serviceDesc}</td>
              <td>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
                <button>View</button>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AdminService;
