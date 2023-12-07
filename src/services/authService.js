import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const register= async (email, password, displayName, phoneNumber)=>{
    try {
        const auth = getAuth();
        const {user} = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(user, {displayName});

        const database = getDatabase();
        const userRef = ref(database, `users/${user.uid}`);
        await set(userRef,{
            displayName,
            phoneNumber,
        });
        console.log('User registerd successfully:', user);
        
    } catch (error) {

        console.log('Error registering user:', error.message);
        
        
    }

}


export {register}