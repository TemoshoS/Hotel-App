import { collection, getDocs,doc, getDoc,deleteDoc, addDoc,updateDoc , query, where, getFirestore } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

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

const addServices = async(formData) =>{
    try {
        
        const imageRef = ref(storage, `roomImages/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
    
        const imageUrl = await getDownloadURL(imageRef);
    
        const servicesCollectionRef = collection(db, 'services');
    
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

}

const deleteService = async()=>{

}

export {getServices, deleteService};