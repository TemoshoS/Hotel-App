import { collection, getDocs,doc, getDoc,deleteDoc, addDoc,updateDoc , query, where, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';


const getServices = async()=>{
    try {
        const querySnapShot = await getDocs(collection(db, 'rooms'));
        const data = quer
    } catch (error) {
        
    }
}