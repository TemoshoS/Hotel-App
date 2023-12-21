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

  const getStatus = (checkInDate, checkOutDate, status) => {
    const currentDate = new Date();
  
    if (status === 'Canceled') {
      return 'Canceled';
    } else if (currentDate < new Date(checkInDate)) {
      return 'Active';
    } else if (currentDate >= new Date(checkInDate) && currentDate <= new Date(checkOutDate)) {
      return 'Active';
    } else if (currentDate > new Date(checkOutDate)) {
      return 'Past';
    } else {
      return 'Canceled'; // You can set a default status if needed
    }
  };
  
  

  const getStatusButtonClass = (checkInDate, checkOutDate) => {
    const status = getStatus(checkInDate, checkOutDate);

    switch (status) {
      case 'Active':
        return 'btn-success'; 
      case 'Past':
        return 'btn-secondary'; 
      case 'Canceled':
        return 'btn-danger'; 
      default:
        return 'btn-light'; 
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
  const canceledBookings = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Canceled'
  ).length;

  const activeBookingsData = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Active'
  );

  const pastBookingsData = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Past'
  );

  const canceledBookingsData = bookings.filter(
    (booking) => getStatus(booking.checkInDate, booking.checkOutDate) === 'Canceled'
  );
  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Bookings', 'Active Bookings', 'Past Bookings','Canceled bookings'],
          datasets: [
            {
              data: [totalBookings, activeBookings, pastBookings,canceledBookings],
              backgroundColor: ['#36A2EB', '#4CAF50', '#FF5733','gold'],
            },
          ],
        },
      });
    }
  }, [totalBookings, activeBookings, pastBookings, canceledBookings]);

  return (
    <div style={{padding:'50px'}}>
 {/* Add a separate card for the pie chart */}
 <div className="card ml-3" style={{ width: '300px' }}>
          <div className="card-body">
            <h5 className="card-title">Booking Statistics</h5>

            <canvas ref={chartRef} width="150" height="150"></canvas>
          </div>
        </div>

      {/* Display small cards for total, active, and past bookings in a row */}
      <div className="d-flex flex-row mt-3">
        <div className="card custom-card-width flex-grow-1">
          <div className="card-body">
            <h5 className="card-title">Active Bookings</h5>
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
                  {activeBookingsData.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.roomName}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>
                        <button
                          className={`btn ${getStatusButtonClass(
                            booking.checkInDate,
                            booking.checkOutDate
                          )}`}
                        >
                          {getStatus(booking.checkInDate, booking.checkOutDate)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card ml-3 flex-grow-1">
          <div className="card-body">
            <h5 className="card-title">Past Bookings</h5>
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
                  {pastBookingsData.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.roomName}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>
                        <button
                          className={`btn ${getStatusButtonClass(
                            booking.checkInDate,
                            booking.checkOutDate
                          )}`}
                        >
                          {getStatus(booking.checkInDate, booking.checkOutDate)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card ml-3 flex-grow-1">
          <div className="card-body">
            <h5 className="card-title">Canceled Bookings</h5>
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
                  {canceledBookingsData.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.roomName}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>
                        <button
                          className={`btn ${getStatusButtonClass(
                            booking.checkInDate,
                            booking.checkOutDate
                          )}`}
                        >
                          {getStatus(booking.checkInDate, booking.checkOutDate)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
