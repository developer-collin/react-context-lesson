import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBPRAGNMZ4gc5g_SKlR5XEknN4u-fxnxPs",
  authDomain: "zerotomastery-react.firebaseapp.com",
  databaseURL: "https://zerotomastery-react.firebaseio.com",
  projectId: "zerotomastery-react",
  storageBucket: "zerotomastery-react.appspot.com",
  messagingSenderId: "51885256246",
  appId: "1:51885256246:web:f4188b1f1e0ecc66f37297",
  measurementId: "G-XQ2143TZGT"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
