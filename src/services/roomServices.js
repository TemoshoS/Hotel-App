import { collection, getDocs,doc, getDoc, addDoc } from 'firebase/firestore';
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

    
const bookHotel=async ()=>{
  try{
    const cartRef = doc(db, 'cart');
    const cartSnapshot = await getDoc(cartRef);
    return { id: cartSnapshot.id, ...cartSnapshot.data() };
  } catch (error) {
    console.log(error.message);
    return null;
  }
  
};   


export { getRooms, fetchRoomDetails ,bookHotel};
