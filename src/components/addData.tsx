import { doc, setDoc } from 'firebase/firestore';

import { firebaseDB } from '@/components/Initializetion';

const db = firebaseDB;
console.log('DB', db, firebaseDB);
export default async function addData(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
