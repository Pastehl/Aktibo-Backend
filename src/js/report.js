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

//VIEW POST MODAL DRAFT
// Wait for the document to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  const viewPostModal = document.getElementById('viewPostModal');
  const modalInstance = new bootstrap.Modal(viewPostModal);

  const confirmDeleteModal = document.getElementById('confirmDeleteModal');
  const modalInstance2 = new bootstrap.Modal(confirmDeleteModal);

  const confirmUnflagModal = document.getElementById('confirmUnflagModal');
  const modalInstance3 = new bootstrap.Modal(confirmUnflagModal);

  const closeConfirmDeleteBtn = document.getElementById('closeConfirmDeleteBtn');
  const closeConfirmUnflagBtn = document.getElementById('closeConfirmUnflagBtn');
  const confirmUnflagCancelBtn = document.getElementById('confirmUnflagCancelBtn');

  const disableBtn = document.getElementById('disableBtn');
  const unflagBtn = document.getElementById('unflagBtn');
  
  // Get all elements with the class 'openPostModal'
  const openPostButtons = document.querySelectorAll('.openPostModal');
  

  // Iterate through each button and attach a click event listener
  openPostButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      modalInstance.show();
    });
  });

  closeViewPostModal.addEventListener("click", function () {
    modalInstance.hide();
  });

  disableBtn.addEventListener('click', function() {
    modalInstance2.show();
  });

  closeConfirmDeleteBtn.addEventListener('click', function () {
    modalInstance2.hide();
  });

  confirmDeleteModal.addEventListener('click', function(){
    modalInstance2.hide()
  });

  unflagBtn.addEventListener('click', function() {
    modalInstance3.show();
  });

  closeConfirmUnflagBtn.addEventListener('click', function () {
    modalInstance3.hide();
  });

  confirmUnflagCancelBtn.addEventListener('click', function(){
    modalInstance3.hide()
  });







  // function addConfirmDeleteEventListener() {
  //   var deleteBtn = document.getElementsByClassName('deleteBtn')
  //   removeAllListenersFromClass(deleteBtn)
  //   for (let index = 0; index < deleteBtn.length; index++) {
  //     const element = deleteBtn[index];
  //     element.addEventListener('click', function (e) {
  //       showConfirmDeleteModal(element.dataset.docId)
  
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
  //       deleteExerciseRecord(element.dataset.docId)
  //     });
  //   }
  // }
});




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
    let userID = doc.data().reports[counter].userID ?? "No Data"
    let reportCount = doc.data().reportsCount ?? "No Data"
    let status = doc.data().isDisabled ?? "Reported"
    if (status) {
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
              <button type="button" class="btn btn-secondary" data-doc-id="${doc.id}">Unflag</button>
              <button type="button" class="btn btn-danger data-doc-id="${doc.id + " " + userID}" >Disable</button>
            </td>
          </tr>
    `
}
getReportedPosts()

// var main_content = document.getElementById("main_content");
// main_content.innerHTML = "";
// let idCounters = 1;
// let momentsRef = collection(db, "moments");
// const q = query(momentsRef, orderBy("datePosted", "desc"));

// async function showAllMoments(doc, currentPostNumber) {
//   // if(doc.data().){

//   // }
//   var usrName = doc.data().username;
//   var userImageSrc = doc.data().userImageSrc;
//   var imageSrc = doc.data().imageSrc;
//   var caption = doc.data().caption;
//   var likeCount = doc.data().likes;
//   var commentCount;
//   let likeBtnId = "likeBtn" + currentPostNumber;
//   let commentBtnId = "commentBtn" + currentPostNumber;
//   let commentSectionId = "commentSectionBoxId" + currentPostNumber;
//   let commenSectionBtn = "formBtnId" + currentPostNumber;
//   let textAreaId = "textAreaId" + currentPostNumber;
//   let postSpanLikeId = "postSpanId" + currentPostNumber;
//   let postSpanCommentId = "postSpanCommentId" + currentPostNumber;
//   let isReported = doc.data().isReported;
//   if (isReported == false || isReported == undefined || isReported == null) {
//     return;
//   }

//   if (
//     (commentCount =
//       doc.data().commentsLlist == null ||
//       (commentCount == doc.data().commentsLlist) == undefined)
//   ) {
//     commentCount = "0";
//   }

//   let docId = doc.id;
//   if (!isNaN(likeCount) == false) {
//     likeCount = "";
//   }
//   if (!isNaN(commentCount) == false) {
//     commentCount = "";
//     console.log(commentCount);
//   }
//   let imageHTML = "";
//   if (imageSrc != null && imageSrc != "") {
//     imageHTML = `<img src="` + imageSrc + `">`;
//   }

//   main_content.innerHTML +=
//     `
//     <div class = "post">
//               <div class="header_content d-flex justify-content-end">
//                 <img src="` +
//     userImageSrc +
//     `" alt="" class="prof-pic">
//                 <h4 class="expand-width">` +
//     usrName +
//     `</h4>
//                  <div class="dropdown-container" id="dropdown-container">
//                       <i class='bx bx-dots-vertical bx-sm' ></i>
//                   </div>
//                   <div class="dropdown-content" id="dropdown-content">
//                       <ul>
//                           <div data-doc-id ="` +
//     docId +
//     `">
//                           <li class = "disableBtn"> Disable </li>
//                           <li class="unflagBtn"> Unflag Post </li>
//                           </div>
//                       </ul>
//                   </div>
//               </div>
//               <div class="post_caption">
//                   <h6>` +
//     caption +
//     `</h6>
//               </div>
//               <div class="info">
//                 ` +
//     imageHTML +
//     `
//               </div>
//           </div>
//     `;
// }

// const docSnap = await getDocs(q);

// async function showFlaggedPosts() {
  // docSnap.forEach((doc) => {
  //   const data = doc.data();
  //   showAllMoments(doc, idCounters);
  //   idCounters++;
  //   // move show ALL Moments here
  //   console.log(doc.id);
  // });
// }

// showFlaggedPosts();
// addOpenReportButtonEventListeners();
// disablePostButtonEventListener();
// unflagPostButtonEventListener();
// //Event Listeners
// function addOpenReportButtonEventListeners() {
//   let reportBtn = document.getElementsByClassName("bx-dots-vertical");
//   for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener("click", function (e) {
//       console.log("Report Button Clicked");
//       console.log(element);
//       const dropDownContentContainerDiv = element.parentNode.nextElementSibling;
//       if (dropDownContentContainerDiv.style.display === "block") {
//         console.log("Close");
//         dropDownContentContainerDiv.style.display = "none";
//       } else {
//         console.log("Open");
//         dropDownContentContainerDiv.style.display = "block";
//       }
//     });
//   }
// }

// function disablePostButtonEventListener() {
//   let reportBtn = document.getElementsByClassName("disableBtn");
//   for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener("click", function (e) {
//       console.log(element.parentNode.dataset.docId);
//       flagMomentsPost(
//         element.parentNode.dataset.docId,
//         element.parentNode.parentNode,
//         "disabled"
//       );
//       toastMessage("Post has been disabled");
//     });
//   }
// }
// function unflagPostButtonEventListener() {
//   let reportBtn = document.getElementsByClassName("unflagBtn");
//   for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener("click", function (e) {
//       console.log(element.parentNode.dataset.docId);
//       flagMomentsPost(
//         element.parentNode.dataset.docId,
//         element.parentNode.parentNode,
//         false
//       );
//       toastMessage("Flag tag has been removed.");
//     });
//   }
// }

// async function flagMomentsPost(docId, dropDownContentContainerDiv, status) {
//   const momentRef = doc(db, "moments", docId);
//   console.log(docId);
//   if (status === "disabled") {
//     status = true;
//     await updateDoc(momentRef, {
//       isReported:deleteField(),
//       isDisabled: status,
//       disableStrikeCount: increment(1),
//     });
//   } else {
//     await updateDoc(momentRef, {
//       isReported:deleteField(),
//       reports: deleteField(),
//       reportsCount: deleteField(),
//     });
//   }
//   const parentToRemove = dropDownContentContainerDiv.parentNode.parentNode.parentNode;
//   parentToRemove.parentNode.removeChild(parentToRemove);
// }

// function toastMessage(message) {
//   // Get the toast element by its ID
//   const toastElement = document.getElementById("liveToast");

//   // Get the .toast-body element within the toast
//   const toastBodyElement = toastElement.querySelector(".toast-body");

//   // Update the content of the .toast-body element
//   toastBodyElement.textContent = message;

//   // Show the toast
//   const toast = new bootstrap.Toast(toastElement);
//   toast.show();
// }
