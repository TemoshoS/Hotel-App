import React, { useEffect, useState } from 'react';
import { getBookings, getRegisteredUsers } from '../../services/roomServices';
import Chart from 'chart.js/auto';
import AuthService from '../../services/authService';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const allBookings = await getBookings();
        setBookings(allBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    const fetchData = async () => {
      try {
        const allBookings = await getBookings();
        setBookings(allBookings);

        const { users } = await getRegisteredUsers();
        setRegisteredUsers(users);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

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


                    {/* Display registered users */}
      {registeredUsers.length === 0 ? (
        <p>No registered users found.</p>
      ) : (
        <>
          <div className="card custom-card-width mt-4">
            <div className="card-body">
              <h5 className="card-title">Registered Users</h5>
              <div className="table-responsive">
                {/* Table for registered users */}
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Created</th>
                      <th>Signed In</th>
                      <th>User UID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((user) => (
                      <tr key={user.userUID}>
                        <td>{user.email}</td>
                        <td>{user.created}</td>
                        <td>{user.signedIn}</td>
                        <td>{user.userUID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
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
