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
      // Assuming you have a deleteService function in your serviceServices
      await deleteService(id);
      fetchServicesData(); // Refresh the services data after deletion
    } catch (error) {
      console.error('Error deleting service:', error.message);
    }
  };

  return (
    <div>
    <h2>All Bookings</h2>
    {bookings.length === 0 ? (
      <p>No bookings found.</p>
    ) : (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ser.map((booking) => (
            <tr key={booking.id}>
              <td >
                {booking.roomName}
              </td>
              <td >
                {booking.checkInDate}
              </td>
              <td >
                {booking.checkOutDate}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
}

export default AdminService;
