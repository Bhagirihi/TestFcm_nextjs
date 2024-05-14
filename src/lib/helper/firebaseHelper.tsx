import {
  firebaseAuth,
  firebaseDB,
  firebaseProvider,
} from '@/components/Initializetion';
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export var userAuth = [];

export async function isuserLogin() {
  var user = await getAuth().currentUser;

  const result = await isEmpty(user);
  console.log('isuserLogin Result', !result);
  return await !result;
}
export async function userLogin() {
  signInWithPopup(firebaseAuth, firebaseProvider);
}

export async function authenticationCheck() {
  onAuthStateChanged(firebaseAuth, async (user: any) => {
    console.log(user, ' authenticationCheck');
    var rootRef = doc(firebaseDB, 'users', user?.providerData[0].uid);
    const dataStore = {
      email: user?.providerData[0].email,
      creationTime: user?.metadata?.creationTime,
      lastLogin: user?.metadata?.lastSignInTime,
      // notifications: [],
    };
    await setData(rootRef, dataStore);
  });
}

export async function setData(refStore: any, data: any) {
  await setDoc(refStore, data, { merge: true }).then(() =>
    console.log('Data Set Successfully!')
  );
}

export async function addData(refStore: any, data: any) {
  await addDoc(refStore, data, { merge: true }).then(() =>
    console.log('Data Stored Successfully!')
  );
}

export async function updateData(refStore: any, data: any) {
  await updateDoc(refStore, data, { merge: true }).then(() =>
    console.log('Data Update Successfully!')
  );
}

export async function getData(refStore: any) {
  const docSnap = await getDoc(refStore);

  if (docSnap.exists()) {
    const getFirestore = docSnap.data();
    console.log('Data Get Successfully!', getFirestore);
    return getFirestore;
  } else {
    console.log('No such document!');
    return null;
  }
}

export async function isEmpty(value: any) {
  console.log('value', value);
  if (value) {
    return false;
  } else {
    return true;
  }
}
