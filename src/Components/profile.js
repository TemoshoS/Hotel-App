import React, { useEffect, useState } from 'react';
import AuthService from '../services/authService';
import NavBar from './navBar';
import Footer from './footer';
import  {getUserBookings} from '../services/roomServices'

function Profile() {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setUpdatedName(currentUser.displayName || '');
        setUpdatedEmail(currentUser.email || '');

        // Fetch and set booking history
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

  return (
    <div style={{ marginTop: '100px' }}>
      <NavBar />
      {user ? (
        <>
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

          <h3>Booking History</h3>
          <ul>
            {bookingHistory.map((booking) => (
              <li key={booking.id}>
               
                <strong>Check-In Date:</strong> {booking.checkInDate}<br />
                <strong>Check-Out Date:</strong> {booking.checkOutDate}<br />
                <strong>Guests:</strong> 
                <ul>
        <li>Rooms: {booking.guests?.rooms}</li>
        <li>Adults: {booking.guests?.adults}</li>
        <li>Children: {booking.guests?.children}</li>
      </ul>
                <strong>Contact Information:</strong>
                <ul>
                  <li>Name: {booking.name}</li>
                  <li>Email: {booking.email}</li>
                  <li>Phone Number: {booking.phoneNumber}</li>
                </ul>
                {/* Add additional information as needed */}
                <hr />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}

      <Footer />
    </div>
  );
}

export default Profile;
