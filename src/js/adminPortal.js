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
  
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,

} from "firebase/storage";
import * as bootstrap from "bootstrap";
// import {Modal} from "bootstrap/dist/js/bootstrap.bundle";

import "../scss/styles.scss";
import { main, start } from "@popperjs/core";

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


// redirect user if user is NOT signed in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const userRef = collection(db, "users");
    const docRef = await getDoc(doc(userRef, uid));

    if (docRef.exists()) {
      const isAdmin = docRef.data().isAdmin;

      if (!isAdmin) {
        window.location.href = "dashboard.html";
      }
    } else {
      // Handle the case where the user document doesn't exist
      console.error("User document does not exist");
      // You may want to redirect or handle this case appropriately
    }
  } else {
    // User is signed out
    window.location.href = "index.html";
    // Handle signed-out state if needed
  }
});

// logout
document.getElementById("logout_btn").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});

async function geSnapShotFirebase() {
  const userRef = collection(db, "users");
  const querySnapshot = await getDocs(userRef);
  return querySnapshot;
}

async function getUsers() {
  const querySnapshot = await geSnapShotFirebase(); // Await the result

  const userListContent = document.getElementById("userListContent");
  const h1Content = document.getElementById('h1Content');
  h1Content.textContent = ""
  let userListHTML = '';

  const numberofUsers = querySnapshot.size;
  h1Content.textContent = "Current Users: " + numberofUsers;

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const userId = doc.id;
    const username = userData.username ?? "No Data";
    const reportsCount = userData.reportsCount ?? 0;
    const email = userData.email ?? "No Data"
    const active = checkActiveLast3Months(userData.lastLoggedInTimestamp) ?? "No Data"

    // Check if user has logged in the last 3 months
    // const lastLoginTimestamp = new Date(userRecord.metadata.lastSignInTime);
    // const active = lastLoginTimestamp > threeMonthsAgo ? 'Yes' : userData.active ? 'Yes' : 'No';

    userListHTML += `
      <tr>
        <td class="col">${userId}</td>
        <td class="col">${username}</td>
        <td class="col">${email}</td>
        <td class="col">${active ? 'Yes' : 'No'}</td>
        <td class="col">${reportsCount}</td>

      </tr>
    `;
    console.log(userId)
  });
  
  userListContent.innerHTML = userListHTML;
}


 getUsers();
//'0y9Kkgd303QrsKSuXzKvqG2DI4E2'
function checkActiveLast3Months(lastLogin) {
  if (lastLogin === undefined) {
    return false;
  }


  // Current date
  const currentDate = new Date();

  // Date 3 months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  threeMonthsAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ignore time part
  console.log(threeMonthsAgo, "3 months ago ");

  // Assuming lastLogin is the timestamp
  const lastLoggedInDate = lastLogin.toDate();
  console.log(lastLoggedInDate);

  // Check if the last logged-in date is within the last 3 months
  const withinLast3Months = lastLoggedInDate >= threeMonthsAgo && lastLoggedInDate <= currentDate;
  console.log(withinLast3Months,"isLater than 3 months Ago and less than current Date");

  return withinLast3Months
}