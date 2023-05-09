import { doc } from 'firebase/firestore';

import { firebaseDB } from '@/components/Initializetion';

const db = firebaseDB;
export default async function getDoument(collection, id) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
