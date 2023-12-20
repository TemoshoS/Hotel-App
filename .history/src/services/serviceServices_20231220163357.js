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

const addService = async(formData) =>{
    try {
        
        const imageRef = ref(storage, `roomImages/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
    
        const imageUrl = await getDownloadURL(imageRef);
    
        const servicesCollectionRef = collection(db, 'services');
    
       
        const newServicesRef = await addDoc(servicesCollectionRef, {
          ...formData,
          serviceImage: imageUrl,
          image: null,
        });
    
        await updateDoc(newServicesRef, { id: newServicesRef.id });
    
        console.log('Service added successfully.');
      } catch (error) {
        console.error('Error adding service:', error.message);
        throw error;
      }

}

const deleteService = async (serviceId) => {
    try {
      const serviceDocRef = doc(db, 'services', serviceId);
      await deleteDoc(serviceDocRef);
      console.log('Service deleted successfully.');
    } catch (error) {
      console.error('Error deleting service:', error.message);
      throw error;
    }
  };

export {getServices,addService, deleteService};