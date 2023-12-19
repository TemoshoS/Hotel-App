import React, { useEffect, useState } from 'react';
import { getServices} from '../services/serviceServices'

function Services() {
  const [services, setServices] = useState([]);

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

 

    
    
  }, []);
  return (
    <div>services</div>
  )
}

export default Services