import { collection, getDocs,doc, getDoc,deleteDoc, addDoc,updateDoc , query, where, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';


const getServices = 