import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
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
  serverTimestamp,
  Timestamp  
} from "firebase/firestore";
import * as bootstrap from "bootstrap";
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
//const { google } = require('googleapis');

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// redirect user if user is NOT signed in



// Import our custom CSS
import '../scss/styles.scss';


const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

document.querySelector('table').onclick = ({
  target
}) => {
  if (!target.classList.contains('more')) return
  document.querySelectorAll('.dropout.active').forEach(
    (d) => d !== target.parentElement && d.classList.remove('active')
  )
  target.parentElement.classList.toggle('active')
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdownContainer = document.getElementById("dropdown-container");
    const dropdownContent = document.getElementById("dropdown-content");

    dropdownContainer.addEventListener("click", function (event) {
      console.log(dropdownContent)
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
        
    });
});



onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idToken = user.getIdToken(true)
    console.log(idToken)

    // const { google } = require('googleapis');
    // const oauth2Client = new google.auth.OAuth2();
    // oauth2Client.setCredentials({
    // access_token: idToken,
  // });

//     // Create Fitness API client
//     const fitness = google.fitness('v1');

//     // Set the desired data source and time range
// const request = {
//   userId: 'me',
//   resource: {
//     aggregateBy: [{
//       dataTypeName: 'com.google.step_count.delta',
//     }],
//     bucketByTime: {
//       durationMillis: 86400000, // 1 day in milliseconds
//     },
//     startTimeMillis: Date.now() - 7 * 86400000, // 7 days ago
//     endTimeMillis: Date.now(),
//   },
//   auth: oauth2Client,
// };

// // Make the API request
// fitness.users.dataset.aggregate(request, (err, result) => {
//   if (err) {
//     console.error('Error:', err);
//     return;
//   }

//   // Process the result
//   console.log('Steps:', result.data.bucket[0].dataset[0].point[0].value[0].intVal);
// });
   }
});