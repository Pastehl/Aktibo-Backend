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
  deleteField,
} from "firebase/firestore";
import * as bootstrap from "bootstrap";

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

import "../scss/styles.scss";

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

//
const viewPostModal = document.getElementById('viewPostModal');
const modalInstance = new bootstrap.Modal(viewPostModal);

const confirmDeleteModal = document.getElementById('confirmDeleteModal');
const modalInstance2 = new bootstrap.Modal(confirmDeleteModal);

const confirmUnflagModal = document.getElementById('confirmUnflagModal');
const modalInstance3 = new bootstrap.Modal(confirmUnflagModal);

const closeConfirmDeleteBtn = document.getElementById('closeConfirmDeleteBtn');
const closeConfirmUnflagBtn = document.getElementById('closeConfirmUnflagBtn');
const confirmUnflagCancelBtn = document.getElementById('confirmUnflagCancelBtn');

const closeViewPostModal = document.getElementById("closeViewPostModal");

closeViewPostModal.addEventListener('click', function () {
  modalInstance.hide()
})

closeConfirmDeleteBtn.addEventListener('click', function () {
  modalInstance2.hide();
});

confirmDeleteModal.addEventListener('click', function(){
  modalInstance2.hide()
});

// function addConfirmDeleteEventListener() {
//   var deleteBtn = document.getElementsByClassName('deleteBtn')
//   removeAllListenersFromClass(deleteBtn)
//   for (let index = 0; index < deleteBtn.length; index++) {
//     const element = deleteBtn[index];
//     element.addEventListener('click', function (e) {
//       //showConfirmDeleteModal(element.dataset.docId)
//       console.log("confirm pre-Delete clicked")
//     });
//   }
// }
// function addConfirmDeleteButtonEventListener(){
//   var deleteBtn = document.getElementsByClassName('deleteBtnFinal')
//   removeAllListenersFromClass(deleteBtn)
//   for (let index = 0; index < deleteBtn.length; index++) {
//     const element = deleteBtn[index];
//     element.addEventListener('click', function (e) {
//       //do this when clicked
//       console.log("confirm Delete clicked")
//       //deleteExerciseRecord(element.dataset.docId)
//     });
//   }
// }
function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function (element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}




var table_body = document.getElementById('tableBody');
table_body.innerHTML = "";


async function getReportedPosts() {
  let reportedRef = collection(db, "moments");
  const q = query(reportedRef, orderBy("reports", "desc"));
  const docSnap = await getDocs(q);
  showReportedPosts(docSnap)
}

function showReportedPosts(docSnap) {
  var counter = 0
  docSnap.forEach((doc) => {
    addToTablePosts(doc, counter)
  });
}
function addToTablePosts(doc,counter) {
    let username = doc.data().reports[counter].username ?? "No Data"
    let report_reason = doc.data().reports[counter].violation ??  "No Data"
    let userID = doc.data().userID ?? "No Data"
    let reportCount = doc.data().reportsCount ?? "No Data"
  let status = doc.data().isDisabled ?? "Reported"
  console.log(status)
    if (status != "Reported") {
      status = "Disabled"
    }
    table_body.innerHTML += `
    <tr>
            <th scope="row">${doc.id}</th>
            <td>${username}</td>
            <td>${report_reason}</td>
            <td>${status}</td>
            <td>${reportCount}</td>
            <td>
              <button type="button" class="btn btn-secondary btn-sm openPostModal" data-doc-id="${doc.id}"><i class="bx bx-book-open bx-sm"></i></button>
            </td>
            <td>
              <button type="button" class="btn btn-primary unflagBtn" data-doc-id="${doc.id}">Unflag</button>
              <button type="button" class="btn btn-danger disableBtn" data-doc-id="${doc.id + " " + userID}" >Disable</button>
            </td>
          </tr>
    `
  addOpenViewModalEventListener()
  addUnflagButtonEventListener()
  disablePostButtonEventListener()
}
getReportedPosts()


function addOpenViewModalEventListener() {
  var openPostModal = document.getElementsByClassName("openPostModal");
  removeAllListenersFromClass(openPostModal);

  for (let index = 0; index < openPostModal.length; index++) {
    const element = openPostModal[index];
    element.addEventListener("click", function (e) {
      getSinglePost(element.dataset.docId);
      modalInstance.show();
    });
  }
}

async function getSinglePost(docID) {
  console.log(docID)
  let reportedRef = doc(db, "moments",docID);
  let docRef = await getDoc(reportedRef)
  setPostModal(docRef)
}

function setPostModal(doc) {
  const postData = document.getElementById("postData");
  postData.innerHTML = `
    <div class="header_content">
      <img src="${doc.data().userImageSrc}" alt="" class="prof-pic" style="max-width: 100%; max-height: 100%;">
      <h4>${doc.data().username}</h4>
    </div>
    <div class="post_caption">
      <h6>${doc.data().caption}</h6>
    </div>
    <div class="info" style="height: 30rem;">
      <img src="${doc.data().imageSrc}" style="width: 100%; height: 100%; object-fit: contain;">
    </div>
  `;
}



// //Event Listeners
function addUnflagButtonEventListener() {
  let unFlagBtn = document.getElementsByClassName("unflagBtn");
  removeAllListenersFromClass(unFlagBtn);
  for (let index = 0; index < unFlagBtn.length; index++) {
    const element = unFlagBtn[index];
    element.addEventListener("click", function (e) {
      console.log(element.dataset.docId);
      removeFlagMomentsPost(element.dataset.docId)
      toastMessage("Post has been unflagged.");
    });
  }
}

function disablePostButtonEventListener() {
  let disableBtn = document.getElementsByClassName("disableBtn");
  removeAllListenersFromClass(disableBtn);
  for (let index = 0; index < disableBtn.length; index++) {
    const element = disableBtn[index];
    element.addEventListener("click", function (e) {
      console.log(element.dataset.docId);
      disableMomentsPost(element.dataset.docId)
      toastMessage("Post has been disabled");
    });
  }
}

async function removeFlagMomentsPost(docId) {
  const momentRef = doc(db, "moments", docId);
  console.log(docId);
    await updateDoc(momentRef, {
      isReported:deleteField(),
      reports: deleteField(),
      reportsCount: deleteField(),
    });
}
async function disableMomentsPost(docID) {
  let IDs = docID.split(' ');
  const momentRef = doc(db, "moments", IDs[0]);
  const userRef = doc(db, "users", IDs[1])
  await updateDoc(momentRef, {
      isReported:deleteField(),
      isDisabled: true,
      disableStrikeCount: increment(1),
  });
  await updateDoc(userRef,{
    reportsCount: increment(1)
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
