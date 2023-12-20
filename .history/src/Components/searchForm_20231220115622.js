import React, { useEffect, useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(0);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [isGuestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  
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
  
   
    const toggleGuestsDropdown = () => {
      setGuestsDropdownOpen(!isGuestsDropdownOpen);
    };
  
    const closeGuestsDropdown = () => {
      setGuestsDropdownOpen(false);
    };
  
    const updateTotalGuests = () => {
      setGuests(rooms + adults + children);
    };
  
  const handleSearch = () => {

    const selectedCheckInDate = new Date(checkInDate);
    const selectedCheckOutDate = new Date(checkOutDate);
    const currentDate = new Date();
    
    if(selectedCheckInDate < currentDate)
    {
        alert('Please select a future date for check in.')
        return;
    }

    if(selectedCheckOutDate <= selectedCheckInDate)
    {
        alert('Please select a valid check-out daate after the check-in date.');
        return;
    }

    if (rooms < 1) {
      alert('Please select at least 1 room.');
      return;
    }

    if(adults || children < 1)
    {
      alert('adults of children');
      return;
    }

      onSearch({ checkInDate, checkOutDate, guests, rooms, adults, children });
    };
    return (
      <div className='searchForm'>
        <label className='label' onClick={closeGuestsDropdown}>
          Check-in Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className='input'
          />
        </label>
        <label className='label' onClick={closeGuestsDropdown}>
          Check-out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className='input'
          />
        </label>
        <label className='label' onClick={toggleGuestsDropdown}>
          Guests:
          <input
            type="text"
            value={`Rooms: ${rooms}, Adults: ${adults}, Children: ${children}`}
            readOnly
            className='input'
          />
          {isGuestsDropdownOpen && (
            <div className='dropdown-card'>
              <div>
                <span>Rooms:</span>
                <button onClick={() => { setRooms(rooms > 1 ? rooms - 1 : 1); updateTotalGuests(); }}>-</button>
                <span>{rooms}</span>
                <button onClick={() => { setRooms(rooms + 1); updateTotalGuests(); }}>+</button>
              </div>
              <div>
                <span>Adults: </span>
                <button onClick={() => { setAdults(adults > 1 ? adults - 1 : 1); updateTotalGuests(); }}>-</button>
                <span>{adults}</span>
                <button onClick={() => { setAdults(adults + 1); updateTotalGuests(); }}>+</button>
              </div>
              <div>
                <span>Children:</span>
                <button onClick={() => { setChildren(children > 0 ? children - 1 : 0); updateTotalGuests(); }}>-</button>
                <span>{children}</span>
                <button onClick={() => { setChildren(children + 1); updateTotalGuests(); }}>+</button>
              </div>
            </div>
          )}
        </label>
        <button onClick={handleSearch} className='searchButton'>
          Check Availability
        </button>
      </div>
    );
  };
  
export default SearchForm;  