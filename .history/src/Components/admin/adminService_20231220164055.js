import React, { useEffect, useState } from 'react';
import { getServices,addService, deleteService } from '../../services/serviceServices';

function AdminService() {
  const [services, setServices] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    serviceName: '',
    serviceDesc: '',
   
  });

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

  const handleAdd =async()=>{
    try {
        const newServiceId = await addService(formData);
        
    } catch (error) {
        
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      fetchServicesData(); 
    } catch (error) {
      console.error('Error deleting service:', error.message);
    }
  };
  

  return (
    <div style={{padding:'50px'}}>
      <table className='table' style={{ width: '80%' }}>
        <thead className='thead-dark' style={{height:'50px'}}>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Service Name</th>
            <th scope='col'>Service Description</th>
            <th scope='col'>Action</th>
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
  );
}

export default AdminService;
