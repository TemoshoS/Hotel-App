import React, { useEffect, useState } from 'react';
import AuthService from '../services/authService';
import NavBar from './navBar';
import Footer from './footer';
import { getUserBookings, updateBookingStatus } from '../services/roomServices';
import Modal from 'react-modal';

function Profile() {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('present');
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [otherReason, setOtherReason] = useState('');


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

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };


  const submitCancelRequest = async () => {
    try {
      // Update booking status to 'Canceled' and store the reason
      const newStatus = 'Canceled';
      const updatedReason = cancelReason === 'other' ? otherReason : cancelReason;
      await updateBookingStatus(selectedBookingId, newStatus, updatedReason);
  
      // Fetch updated user bookings
      const userBookings = await getUserBookings(user.uid);
      setBookingHistory(userBookings);
  
      // Reset modal state
      setShowCancelModal(false);
      setCancelReason('');
      setOtherReason(''); // Reset the other reason input
  
      alert('Cancellation request submitted successfully!');
    } catch (error) {
      console.error(error.message);
      // Handle error, show a user-friendly message, etc.
    }
  };
  

  const currentDate = new Date();
  const pastBookings = bookingHistory.filter(
    (booking) => new Date(booking.checkOutDate) < currentDate
  );

  const presentBookings = bookingHistory.filter(
    (booking) => new Date(booking.checkOutDate) >= currentDate
  );


  const renderBookingHistory = () => {
    let filteredBookings = [];

    if (selectedOption === 'present') {
      filteredBookings = presentBookings
        .filter((booking) => booking.status === 'Active')
        .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
    } else if (selectedOption === 'past') {
      filteredBookings = pastBookings
        .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate))
        .map((booking) => ({
          ...booking,
          status: new Date(booking.checkOutDate) < currentDate ? 'Past' : 'Active',
        }));
    } else if (selectedOption === 'canceled') {
      filteredBookings = bookingHistory
        .filter((booking) => booking.status === 'Canceled')
        .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
    }

    return filteredBookings;
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
                  <th>{selectedOption === 'present' ? (

                    <p>Cancel</p>

                  ) : null}</th>
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
                    <td>{booking.status}</td>
                    <td>
                      {selectedOption === 'present' ? (
                        <button onClick={() => handleCancelBooking(booking.id)} style={{backgroundColor: 'green'}}>
                          free cancellation
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
   <Modal
  isOpen={showCancelModal}
  onRequestClose={() => setShowCancelModal(false)}
  contentLabel="Cancel Booking"
  className="cancel-modal"
>
  <h2>Select a reason for cancellation</h2>
  <select
    value={cancelReason}
    onChange={(e) => setCancelReason(e.target.value)}
  >
    <option value="" disabled>Select a reason</option>
    <option value="change-of-plans">Change of plans</option>
    <option value="emergency">Emergency</option>
    <option value="other">Other</option>
  </select>
  {cancelReason === 'other' && (
    <input
      type="text"
      placeholder="Enter other reason"
      value={otherReason}
      onChange={(e) => setOtherReason(e.target.value)}
    />
  )}
  <button onClick={submitCancelRequest}>Submit</button>
</Modal>

      <Footer />
    </div>
  );
}

export default Profile;