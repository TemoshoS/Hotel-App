import { collection, getDocs,doc, getDoc,deleteDoc, addDoc,updateDoc , query, where, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const storage = getStorage();


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

// Admin functions

const addHotel = async (formData) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `roomImages/${formData.image.name}`);
    await uploadBytes(imageRef, formData.image);

    const imageUrl = await getDownloadURL(imageRef);

    const hotelsCollectionRef = collection(db, 'rooms');

    // Add the document to Firestore and get the document reference
    const newHotelRef = await addDoc(hotelsCollectionRef, {
      ...formData,
      roomImage: imageUrl,
      image: null,
    });

    // Update the document with its ID as a field
    await updateDoc(newHotelRef, { id: newHotelRef.id });

    console.log('Hotel added successfully.');
  } catch (error) {
    console.error('Error adding hotel:', error.message);
    throw error;
  }
};

const deleteHotel = async (hotelId) => {
  try {
    const hotelRef = doc(db, 'rooms', hotelId);
    await deleteDoc(hotelRef);
    console.log('Hotel deleted successfully.');
  } catch (error) {
    console.error('Error deleting hotel:', error.message);
    throw error;
  }
};




const updateHotel = async (hotelId, formData) => {
  try {
    const hotelRef = doc(db, 'rooms', hotelId);

    // Check if a new image is provided
    if (formData.image) {
      // Upload the new image to Firebase Storage
      const newImageRef = ref(storage, `roomImages/${formData.image.name}`);
      await uploadBytes(newImageRef, formData.image);

      const newImageUrl = await getDownloadURL(newImageRef);

      // Update the image URL in the database
      await updateDoc(hotelRef, {
        ...formData,
        roomImage: newImageUrl,
        image: null, // Set image to null to avoid updating it again in the next step
      });
    } else {
      // Update only textual information without changing the image
      await updateDoc(hotelRef, {
        ...formData,
        image: null, // Set image to null to avoid updating it
      });
    }

    console.log('Hotel updated successfully.');
  } catch (error) {
    console.error('Error updating hotel:', error.message);
    throw error;
  }
};


const getBookings = async () => {
  try {
    

    const querySnapShot = await getDocs(collection(db, 'bookings'));
    const bookingsData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return bookingsData;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw error;
  }
};


const getRegisteredUsers = async()=>{
  const db = getFirestore();

  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    // Extract user data from the snapshot
    const usersData = usersSnapshot.docs.map((doc) => doc.data());

    return usersData;
  } catch (error) {
    console.error('Error fetching users from the database:', error);
    throw error;
  }
}

export { getRooms, fetchRoomDetails ,bookHotel,getUserBookings, addHotel, deleteHotel, updateHotel, getBookings,} ;
