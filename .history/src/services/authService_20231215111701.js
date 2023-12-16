
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
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

  getRegisteredUsers: async () => {
    try {
      
      const usersData = await getRegisteredUsers(); 

      
      const formattedUsers = usersData.map((userData) => ({
        email: userData.email,
        created: userData.created,
        signedIn: userData.signedIn,
        userUID: userData.userUID,
      }));

      return { users: formattedUsers };
    } catch (error) {
      return { error };
    }
  },

  


};



export default AuthService;
