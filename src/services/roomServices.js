import { collection, getDocs } from 'firebase/firestore';
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

export { getRooms };
