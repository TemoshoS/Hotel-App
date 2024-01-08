import React, { useEffect, useState } from 'react';
import { getBookings } from '../../services/roomServices';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const allBookings = await getBookings();
        setBookings(allBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchAllBookings();
  }, []);

  const getStatus = (checkInDate, checkOutDate) => {
    const currentDate = new Date();

    if (currentDate < new Date(checkInDate)) {
      return 'Active';
    } else if (currentDate >= new Date(checkInDate) && currentDate <= new Date(checkOutDate)) {
      return 'Active';
    } else {
      return 'Past';
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Active':
        return 'lightgreen'; 
      case 'Past':
        return 'lightcoral'; 
      case 'Canceled':
        return 'lightgray'; 
      default:
        return 'white'; 
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
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ backgroundColor: getStatusBackgroundColor(getStatus(booking.checkInDate, booking.checkOutDate)) }}>
                  {booking.roomName}
                </td>
                <td style={{ backgroundColor: getStatusBackgroundColor(getStatus(booking.checkInDate, booking.checkOutDate)) }}>
                  {booking.checkInDate}
                </td>
                <td style={{ backgroundColor: getStatusBackgroundColor(getStatus(booking.checkInDate, booking.checkOutDate)) }}>
                  {booking.checkOutDate}
                </td>
                <td style={{ backgroundColor: getStatusBackgroundColor(getStatus(booking.checkInDate, booking.checkOutDate)), color: 'white' }}>
                  {getStatus(booking.checkInDate, booking.checkOutDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
