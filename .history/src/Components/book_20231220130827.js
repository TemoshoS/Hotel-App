import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomDetails } from '../services/roomServices';
import { bookHotel } from '../services/roomServices';
import NavBar from './navBar';
import Footer from './footer';
import PaystackPop from '@paystack/inline-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faCar,
  faSwimmingPool,
  faWifi,
  faPlane,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';
import AuthService from '../services/authService';

const Book = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [room, setRoom] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const searchParams = useLocation().state?.searchParams;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await fetchRoomDetails(itemId);
        setRoom(roomData);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          setName(currentUser.displayName || '');
          setEmail(currentUser.email || '');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRoom();
    fetchUserData();

    if (searchParams) {
      setCheckInDate(searchParams.checkInDate || '');
      setCheckOutDate(searchParams.checkOutDate || '');
    }
  }, [itemId]);

  const calculateTotalPrice = () => {
    if (room && searchParams) {
      const { rooms, adults, children } = searchParams;
      const totalPrice = rooms * room.roomPrice * (adults + children);
      console.log('Total Price:', totalPrice);
      return totalPrice;
    }
    return 0;
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      phoneNumber.trim() !== '' &&
      checkInDate.trim() !== '' &&
      checkOutDate.trim() !== ''
    );
  };

  const paywithpaystack = (e) => {
    e.preventDefault();

    const paystack = new PaystackPop();
    const calculatedAmount = calculateTotalPrice();

    paystack.newTransaction({
      key: "pk_test_1614fb1b435881450bf82e4c90488b8143bed936",
      amount: calculatedAmount * 100,
      email: email,
      name: name,
      phoneNumber: phoneNumber,

      onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        alert(message);
        bookRoom();
        navigate('/homePage');
      },
      onCancel() {
        alert('You have canceled the transaction');
      },
    });
  };

  const bookRoom = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      if (!currentUser) {
        alert('Please log in to book a room.');
        return;
      }

      if (!isFormValid()) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!room || !searchParams) {
        alert('Unable to proceed with the booking. Please try again.');
        return;
      }

      const bookingData = await bookHotel(
        itemId,
        room.roomName,
        currentUser,
        searchParams.checkInDate,
        searchParams.checkOutDate,
        phoneNumber,
        {
          rooms: searchParams.rooms || 0,
          adults: searchParams.adults || 0,
          children: searchParams.children || 0,
        }
      );

      alert(
        'Room is successfully booked!\nDetails:\n' +
          `Room: ${room.roomName}\n` +
          `Check-in: ${searchParams.checkInDate}\n` +
          `Check-out: ${searchParams.checkOutDate}\n` +
          `Rooms: ${searchParams.rooms}\n` +
          `Adults: ${searchParams.adults}\n` +
          `Children: ${searchParams.children}\n` +
          `Guest Name: ${name}\n` +
          `Guest Email: ${email}\n` +
          `Guest Phone Number: ${phoneNumber}\n`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <div className='reserve-card'>
          <div className='images-container'>
            <div>
              <img src={room && room.roomImage ? room.roomImage : ''} className='room-view' alt='roomview' />
            </div>

            <div className='room-user-card'>
              <div>
                <h4>Reservation information</h4>

                <div className='input-contain'>
                  <label>Room type</label><br></br>
                  <input
                    type="text"
                    value={`${searchParams?.rooms || 0} `}
                    readOnly
                  />
                  <label>Number of Guests</label><br></br>
                  <input
                    type="text"
                    value={`Adults: ${searchParams?.adults || 0}, Children: ${searchParams?.children || 0}`}
                    readOnly
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div style={{ width: '48%' }}>
                      <label>Check In Date</label><br></br>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      /><br></br>
                    </div>
                    <div style={{ width: '48%' }}>
                      <label>Check Out Date</label><br></br>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      /><br></br>
                    </div>
                  </div>

                </div>
              </div>

              <div >
                {/* <h4 className='infoHerHeader'>Personal information</h4> */}
                <div className='input-contain'>
                  <label>Full Name</label><br></br>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  /><br></br>

                  <label>Email</label><br></br>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label>Phone Number</label><br></br>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <h3 className='roomPrice'>
                  <span>Price: R{calculateTotalPrice()} </span>
                </h3>
                <button
                  className='reserve-button'
                  onClick={paywithpaystack}
                  disabled={!isFormValid()}
                >
                  PAY <FontAwesomeIcon icon={faCcVisa} size="2x" />
                </button>
              </div>
            </div>

            <div></div>
          </div>

          <div>
            <h2 className='room-name'>{room ? room.roomName : ''}</h2>
            <p className='reserve-description'>{room ? room.roomDescription : ''}</p>
            <div className='hotel-icons'>

              <div >
                <FontAwesomeIcon icon={faCoffee} /> <span>Free breakfast</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faCar} /> <span>Free Parking</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faSwimmingPool} /> <span>Swimming pool</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faWifi} /> <span>WiFi</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faPlane} /> <span>Airport</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faDumbbell} /> <span>Gym</span>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Book;
