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

  const handleDelete = (serviceId) => {
    // Implement your delete logic here
    console.log(`Delete service with ID: ${serviceId}`);
  };

  const handleView = (serviceId) => {
    // Implement your view logic here
    console.log(`View service with ID: ${serviceId}`);
  };

  const handleUpdate = (serviceId) => {
    // Implement your update logic here
    console.log(`Update service with ID: ${serviceId}`);
  };

  return (
    <div>
      <div className='infoDisplay'>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <img src={service.serviceImage} alt='Service' className='imgService' />
                </td>
                <td>{service.serviceName}</td>
                <td>{service.serviceDesc}</td>
                <td>
                  <button
                    className='btn btn-danger mr-2'
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                  <button
                    className='btn btn-primary mr-2'
                    onClick={() => handleView(service.id)}
                  >
                    View
                  </button>
                  <button
                    className='btn btn-success'
                    onClick={() => handleUpdate(service.id)}
                  >
                    Update
                  </button>
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
