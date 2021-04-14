import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAJgoln2Ili88L_1XvqV_Qk0FVmCRswk1U",
    authDomain: "ecomshop-f8116.firebaseapp.com",
    projectId: "ecomshop-f8116",
    storageBucket: "ecomshop-f8116.appspot.com",
    messagingSenderId: "634790144403",
    appId: "1:634790144403:web:672becedafa767f1bee066"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;
      
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get()
      if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        } catch(error){
          console.log('error creating user', error.message);
        }
      }
      return userRef;
  }

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;