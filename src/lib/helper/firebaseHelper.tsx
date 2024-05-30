import { signInWithPopup } from 'firebase/auth';
import { addDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { firebaseAuth, firebaseProvider } from '@/components/Initializetion';

export async function userLogin() {
  signInWithPopup(firebaseAuth, firebaseProvider);
}

export async function setData(refStore: any, data: any) {
  await setDoc(refStore, data, { merge: true }).then(() => console.log('Data Set Successfully!'));
}

export async function addData(refStore: any, data: any) {
  await addDoc(refStore, data, { merge: true }).then(() => console.log('Data Stored Successfully!'));
}

export async function updateData(refStore: any, data: any) {
  await updateDoc(refStore, data, { merge: true }).then(() => console.log('Data Update Successfully!'));
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
