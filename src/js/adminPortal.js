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
import { checkActiveLast3Months, geSnapShotFirebase } from "./adminPortalTest.js"
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
        <td class="col"><button type="button" class="btn btn-secondary btn-sm resetBtn" data-doc-id="` + userId + `"><i class='bx bx-reset'></i></button></td>

      </tr>
    `;
    console.log(userId)
  });
  userListContent.innerHTML = userListHTML;
  addConfirmResetEventListener()
  addResetButtonEventListener()
}


 getUsers();
//'0y9Kkgd303QrsKSuXzKvqG2DI4E2'


function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function (element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}

function addConfirmResetEventListener() {
  var resetBtn = document.getElementsByClassName('resetBtn')
  removeAllListenersFromClass(resetBtn)
  for (let index = 0; index < resetBtn.length; index++) {
    const element = resetBtn[index];
    element.addEventListener('click', function (e) {
      showConfirmResetStreakModal(element.dataset.docId)
    });
  }
}


function addResetButtonEventListener() {
  console.log("Running ResetBTN Loop")
  let resetBtnFinal = document.getElementsByClassName("resetBtnFinal");
  removeAllListenersFromClass(resetBtnFinal);
  for (let index = 0; index < resetBtnFinal.length; index++) {
    const element = resetBtnFinal[index];
    element.addEventListener("click", function (e) {
      console.log(element.dataset.docId);
      resetStrikeCount(element.dataset.docId)
      confirmResetStreakModal.hide()
      toastMessage("Strikes has been reset");
      setTimeout(function(){
        window.location.reload();
      }, 1500);
    });
  }
}

//Modal
var confirmResetStreakModal = new bootstrap.Modal('#confirmResetStreakModal');




async function showConfirmResetStreakModal(docId) {
  // Get the modal and its body element
  const modal = document.getElementById('confirmResetStreakModal');
  const modalBody = modal.querySelector('.modal-body');
  const confirmResetBtn = document.getElementById('confirmResetBtn');

  confirmResetBtn.setAttribute('data-doc-id', docId);

  confirmResetStreakModal.show()
}


async function resetStrikeCount(docID){
  const userRef = doc(db, "users", docID)
  await updateDoc(userRef, {
    reportsCount: deleteField()
  })
}


function toastMessage(message) {
  // Get the toast element by its ID
  const toastElement = document.getElementById("liveToast");

  // Get the .toast-body element within the toast
  const toastBodyElement = toastElement.querySelector(".toast-body");

  // Update the content of the .toast-body element
  toastBodyElement.textContent = message;

  // Show the toast
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}