import { getAuth, createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

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
  
    
  
  };




  export default AuthService;