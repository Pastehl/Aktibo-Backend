import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs
  
} from "firebase/firestore";

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

export function checkActiveLast3Months(lastLogin) {
    if (lastLogin === undefined) {
      return false;
    }
  
    // Current date
    const currentDate = new Date();
  
    // Date 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    threeMonthsAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ignore time part
  
    // Assuming lastLogin is the timestamp
    const lastLoggedInDate = lastLogin.toDate();
    console.log(lastLoggedInDate);
  
    // Check if the last logged-in date is within the last 3 months
    const withinLast3Months = lastLoggedInDate >= threeMonthsAgo && lastLoggedInDate <= currentDate;
  
    return withinLast3Months
}

export async function geSnapShotFirebase() {
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(userRef);
    return querySnapshot;
}