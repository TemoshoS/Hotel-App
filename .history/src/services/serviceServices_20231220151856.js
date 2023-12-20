import { collection, getDocs,doc, getDoc,deleteDoc, addDoc,updateDoc , query, where, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';


const getServices = async()=>{
    try {
        const querySnapShot = await getDocs(collection(db, 'services'));
        const data = querySnapShot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const deleteService

export {getServices};