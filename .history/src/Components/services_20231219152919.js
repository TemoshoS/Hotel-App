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

    const fetchCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          // User is logged in
          console.log(currentUser);
        } else {
          // User is not logged in
          console.log('No user logged in');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    
    
  }, []);
  return (
    <div>services</div>
  )
}

export default Services