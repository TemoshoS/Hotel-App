import React, { useEffect, useState } from 'react';
import AuthService from '../services/authService';
import NavBar from './navBar';
import Footer from './footer';
import { getUserBookings ,updateBookingStatus } from '../services/roomServices';

function Profile() {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('present');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setUpdatedName(currentUser.displayName || '');
        setUpdatedEmail(currentUser.email || '');

        
        const userBookings = await getUserBookings(currentUser.uid);
        setBookingHistory(userBookings);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    await AuthService.updateUserInformation({
      displayName: updatedName,
      email: updatedEmail,
    });

    // Fetch updated user data
    const currentUser = await AuthService.getCurrentUser();
    setUser(currentUser);
    setEditable(false);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      
      await updateBookingStatus(bookingId, 'Canceled');
  
      // Fetch updated user bookings
      const userBookings = await getUserBookings(user.uid);
      setBookingHistory(userBookings);
  
      alert('Booking canceled successfully!');
    } catch (error) {
      console.error(error.message);
      // Handle error, show a user-friendly message, etc.
    }
  };

  // Get the current date
  const currentDate = new Date();

  // Separate past and present bookings
  const pastBookings = bookingHistory.filter(
    (booking) => new Date(booking.checkOutDate) < currentDate
  );

  const presentBookings = bookingHistory.filter(
    (booking) => new Date(booking.checkOutDate) >= currentDate
  );


  const renderBookingHistory = () => {
    let sortedBookings = [];

    if (selectedOption === 'present') {
      sortedBookings = presentBookings.sort(
        (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)
      );
    }
    else if (selectedOption === 'past') {
      sortedBookings = pastBookings.sort(
        (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)
      );
    } 
    return sortedBookings;
  };


  return (
    <div className="profile-container">
      <NavBar />
      {user ? (
        <>
          <div className="profile-header">
            <h2>
              {editable ? (
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              ) : (
                user.displayName
              )}
            </h2>
            <p>
              Email: {editable ? (
                <input
                  type="text"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              ) : (
                user.email
              )}
            </p>

            <div>
              {editable ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              )}
            </div>
          </div>

          <div className="booking-history-controls">
            <label>Select Booking Type:</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            > 
              <option value="present">Present Bookings</option>
              <option value="past">Past Bookings</option>
              <option value="canceled">Canceled Bookings</option>
            </select>
          </div>

          <div className="booking-history">
            <h3>{selectedOption === 'present' ? 'Present' : 'Past'} Booking History</h3>
            <table>
              <thead>
                <tr>
                  <th>CheckIn/Out Date</th>
                  <th>Room Name</th>
                  <th>Rooms</th>
                  <th>Guests</th>
                  <th>Contact Information</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {renderBookingHistory().map((booking) => (
                  <tr key={booking.id} className="booking-item">
                    <td> <b>{`${booking.checkInDate}`}</b> -<br />
                      <b>{`${booking.checkOutDate}`}</b>
                    </td>

                    <td>{booking.roomName}</td>
                    <td>{booking.guests?.rooms}</td>

                    <td>Adults: {booking.guests?.adults} <br />
                     Chlidren: {booking.guests?.children}
                     </td>
                    
                    <td>
                      <strong>Name:</strong> {booking.name}<br />
                      <strong>Email:</strong> {booking.email}<br />
                      <strong>Phone Number:</strong> {booking.phoneNumber}
                    </td>
                    <td>
      {booking.status === 'Active' && selectedOption === 'present' ? (
        <button onClick={() => handleCancelBooking(booking.id)}>
          Cancel
        </button>
      ) : null}
    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}

      <Footer />
    </div>
  );
}

export default Profile;