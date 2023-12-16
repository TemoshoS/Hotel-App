import React, { useEffect, useState, useRef } from 'react';
import { getBookings } from '../../services/roomServices';
import Chart from 'chart.js/auto';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const chartRef = useRef(null);

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

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Bookings', 'Active Bookings', 'Past Bookings'],
          datasets: [
            {
              data: [totalBookings, activeBookings, pastBookings],
              backgroundColor: ['#36A2EB', '#4CAF50', '#FF5733'],
            },
          ],
        },
      });
    }
  }, [totalBookings, activeBookings, pastBookings]);

  return (
    <div>
      {/* Display small cards for total, active, and past bookings in a row */}
      <div className="d-flex flex-row">
        <div className="card bg-info text-white">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Total Bookings</h6>
            <h5 className="card-title">{totalBookings}</h5>
          </div>
        </div>
        <div className="card bg-success text-white">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Active Bookings</h6>
            <h5 className="card-title">{activeBookings}</h5>
          </div>
        </div>
        <div className="card bg-danger text-white">
          <div className="card-body">
            <h6 className="card-subtitle mb-2">Past Bookings</h6>
            <h5 className="card-title">{pastBookings}</h5>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row mt-3">
        {/* Table for booking details */}
        <div className="card custom-card-width flex-grow-1">
          <div className="card-body">
            <h5 className="card-title">Booking Details</h5>
            <div className="table-responsive">
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

        {/* Add a separate card for the pie chart */}
        <div className="card ml-3" style={{ width: '300px' }}>
          <div className="card-body">
            <h5 className="card-title">Booking Statistics</h5>
            {/* Add a canvas element for the pie chart */}
            <canvas ref={chartRef} width="150" height="150"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
