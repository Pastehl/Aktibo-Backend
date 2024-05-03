import { initializeApp,initializeFirestore } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  getUser,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  increment,
  orderBy,
  limit,
  startAfter,
  arrayUnion,
  arrayRemove,
  documentId,
  deleteDoc,
  CACHE_SIZE_UNLIMITED,
  enablePersistence,
  persistentMultipleTabManager,
  deleteField,
  
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,

} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAH168KKUYGhSGV_GVX5SqDGfxm4vtYR7w",
    authDomain: "aktibo-2023.firebaseapp.com",
    projectId: "aktibo-2023",
    storageBucket: "aktibo-2023.appspot.com",
    messagingSenderId: "363113385770",
    appId: "1:363113385770:web:bdf8d66757fd2067b8d853",
    measurementId: "G-1VTRRK1T20",
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage();

import { checkActiveLast3Months, geSnapShotFirebase } from '../admin.js'
import { QuerySnapshot, Timestamp } from 'firebase/firestore';

test( 'checkActiveLast3Months: check if undefined', () => {
    expect(checkActiveLast3Months(undefined)).toBe(false);
})
test( 'checkActiveLast3Months: beyond last 3 months', () => {
    var specificDate = new Date(2023, 1, 1);
    var timestampFromDate = Timestamp.fromDate(specificDate);
    expect(checkActiveLast3Months(timestampFromDate)).toBe(false);
})
test( 'checkActiveLast3Months: within last 3 months', () => {
    var date = Timestamp.now();
    expect(checkActiveLast3Months(date)).toBe(true);
})

test( 'get users data', async () => {
    const data = await geSnapShotFirebase()
    expect(data).toBeInstanceOf(QuerySnapshot);
}, 20000)