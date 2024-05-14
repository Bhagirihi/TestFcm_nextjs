import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_FrBqNVJuC8zqV5Jr1hgEFf0K4Tda0CQ',
  authDomain: 'dhruvdave-bdff2.firebaseapp.com',
  databaseURL: 'https://dhruvdave-bdff2-default-rtdb.firebaseio.com',
  projectId: 'dhruvdave-bdff2',
  storageBucket: 'dhruvdave-bdff2.appspot.com',
  messagingSenderId: '856165219006',
  appId: '1:856165219006:web:d1e891634220a0966e3cef',
  measurementId: 'G-J69MGN0CSP',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getFirestore(firebaseApp);
const firebaseProvider = new firebase.auth.GoogleAuthProvider();
firebaseProvider.setCustomParameters({ prompt: 'select_account' });

export { firebaseApp, firebaseAuth, firebaseDB, firebaseProvider };
