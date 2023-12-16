
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
import getRegisteredUsers from './roomServices';

const AuthService = {
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { user };
    } catch (error) {
      return { error };
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { user };
    } catch (error) {
      return { error };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { error };
    }
  },

  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  },

  updateUserInformation: async (updateData) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No authenticated user found.');
      }

      await updateProfile(user, updateData);
      const updatedUser = auth.currentUser;

      return { user: updatedUser };
    } catch (error) {
      return { error };
    }
  },

  


};



export default AuthService;
