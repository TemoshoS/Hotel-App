import React, { useEffect, useState } from 'react';
import { getBookings } from '../../services/roomServices';
import Chart from 'chart.js/auto';
import 
function Dashboard() {
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

  // Calculate the total, active, and past bookings
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Active'
  ).length;
  const pastBookings = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Past'
  ).length;

  return (
    <div>
      {/* Display small cards for total, active, and past bookings in a row */}
      <div className="d-flex flex-row">
        <div className="card">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Total Bookings</h6>
            <h5 className="card-title">{totalBookings}</h5>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Active Bookings</h6>
            <h5 className="card-title">{activeBookings}</h5>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Past Bookings</h6>
            <h5 className="card-title">{pastBookings}</h5>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <div className="card custom-card-width">
            <div className="card-body">
              <h5 className="card-title">Booking Details</h5>
              <div className="table-responsive">
                {/* Table for booking details */}
                <table className="table table-bordered table-striped">
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
                        <td>{booking.roomName}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{getStatus(booking.checkInDate, booking.checkOutDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
