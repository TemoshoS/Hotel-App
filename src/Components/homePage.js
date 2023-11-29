import React, { useEffect, useState } from 'react';
import NavBar from './navBar';
import Header from './header';
import bedroom from '../images/bedroom.jpg';
import { getRooms } from '../services/roomServices';


const SearchForm = ({ onSearch }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
   
    setCheckInDate(getCurrentDate());
    setCheckOutDate(getCurrentDate());
  }, []);

  const handleSearch = () => {
    onSearch({ checkInDate, checkOutDate, guests });
  };

  return (
    <div className='searchForm'>
      <label className='label'>
        Check-in Date:
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className='input'
        />
      </label>
      <label className='label'>
        Check-out Date:
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className='input'
        />
      </label>
      <label className='label'>
        Guests:
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className='input'
        />
      </label>
      <button onClick={handleSearch} className='searchButton'>
        Check Availability
      </button>
    </div>
  );
};

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
        setRooms([]);
      }
    };

    fetchRoomsData();
  }, []);

  const handleSearch = (searchParams) => {
    console.log('Search Parameters:', searchParams);
  };

  return (
    <div>

      <table>
        <tbody>
          <tr><td><NavBar /></td></tr>
          <tr>
            <td>
              <div className='image-container'>
                <img src={bedroom} className='hotel-image' alt='Hotel' />
                <Header />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ height: '30px' }}></td>
          </tr>
          <tr className='App'>
            <td>
              <SearchForm onSearch={handleSearch} />
            </td>
          </tr>

          <tr className='App'>
            <td>
              <div className='facilities'>
                {rooms.map((room) => (
                  <div key={room.id} className='facility'>
                    <img src={room.roomImage} className='facility-image' alt='Room' />
                    <div className='facility-details'>
                      <div className='facility-name'>{room.roomName}</div>
                      <div className='facility-description'>{room.roomDescription}</div>
                      <div className='facility-price'>
                        <span className='facility-price-label'>Price:</span> {room.roomPrice}
                      </div>
                      <button
                        onClick={() => {
                          console.log('Book Room:', room.id);
                        }}
                        className='facility-book-button'
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
