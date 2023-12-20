import React, { useEffect, useState } from 'react';
import { getServices,addService, deleteService } from '../../services/serviceServices';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminService() {
  const [services, setServices] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(null);
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

  const handleAdd = async()=>{
    try {
        const newServiceId = await addService(formData);
        alert('Service is added successfully')
        setAddModalIsOpen(false);
        setServices(await getServices());
    } catch (error) {
        console.error("error adding services", error.message);
        alert("error adding services", error.message);
        
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      alert('Service is deleted successfully')
      fetchServicesData(); 
    } catch (error) {
      console.error('Error deleting service:', error.message);
      alert('Error deleting service:', error.message);
    }
  };

  const handleView = (service) => {
    setSelectedServices(service);
    setViewModalIsOpen(true);
  };


  const handleUpdate =()=>{
    const service = services.find((r) => r.id === serviceId);
    if (service) {
      setSelectedServices(service);

      setFormData({
        id: service.id,
        serviceName: service.serviceName,
        roomDescription: service.serviceDescription,
        roomPrice: room.roomPrice,
        checkInDate: room.checkInDate,
        checkOutDate: room.checkOutDate,
      });
      setUpdateModalIsOpen(true);
    } else {
      console.error('Invalid room selected for update.');
    }
  }
  
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    },
  };

  return (
    <div style={{padding:'50px'}}>
        <button onClick={() => setAddModalIsOpen(true)}>Add Service</button>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        style={customStyles}

        overlayClassName="modal-overlay"
        contentLabel="Add Service Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">{formData.id ? 'Update Service' : 'Add Service'}</h2>
          <button className="modal-close-btn" onClick={() => setAddModalIsOpen(false)}>
            Close
          </button>
        </div>
        <form className="modal-form">
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </label>

          <label>
            Service Name:
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
            />
          </label>
          <label>
          Service Description:
            <textarea
              name="serviceDesc"
              value={formData.serviceDesc}
              onChange={handleChange}
            />
          </label>
          
          <button type="button" onClick={formData.id ? handleUpdate : handleAdd}>
            {formData.id ? 'Update' : 'Add'} Service
          </button>
        </form>
      </Modal>

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
