import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/apis';

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetchData();

        if (response.data && response.data.data) {
          const southAfricaInfo = response.data.data['ZA'];

          if (southAfricaInfo && southAfricaInfo.hotels) {
            setHotels(southAfricaInfo.hotels);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelData();
  }, []);

  return (
    <div>
      <h1>Hotels in South Africa</h1>
      {hotels.map((hotel, index) => (
        <div key={index}>
          <h2>{hotel.name}</h2>
          <p>Country Code: {hotel.country_code}</p>
          <p>Currency: {hotel.currency}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
