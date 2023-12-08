import { collection, getDocs,doc, getDoc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const getRooms = async () => {
  try {
    const querySnapShot = await getDocs(collection(db, 'rooms'));
    const data = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data; 
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const fetchRoomDetails = async (itemId) => {
  try {
    const roomRef = doc(db, 'rooms', itemId);
    const roomSnapshot = await getDoc(roomRef);
    return { id: roomSnapshot.id, ...roomSnapshot.data() };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

  
const bookHotel = async (roomId, roomName,userData, checkInDate, checkOutDate, phoneNumber, guests) => {
  try {
    
    if (typeof phoneNumber !== 'string') {
      throw new Error('Invalid phone number format.');
    }

    const bookingsCollectionRef = collection(db, 'bookings');

    const newBookingDocRef = await addDoc(bookingsCollectionRef, {
      roomId: roomId,
      roomName: roomName, 
      userId: userData.uid,
      name: userData.displayName || '',
      email: userData.email || '',
      phoneNumber: phoneNumber, 
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: {
        rooms: guests.rooms || 0,
        adults: guests.adults || 0,
        children: guests.children || 0,
      },
    });

    return { id: newBookingDocRef.id, ...userData };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getUserBookings = async (userId) => {
  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );
    const bookingsSnapshot = await getDocs(bookingsQuery);
    const bookingsData = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookingsData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};



export { getRooms, fetchRoomDetails ,bookHotel,getUserBookings};
