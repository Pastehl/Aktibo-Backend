import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc, increment, orderBy, limit, startAfter, deleteField} from "firebase/firestore";
import * as bootstrap from 'bootstrap'

const firebaseConfig = {
    apiKey: "AIzaSyAH168KKUYGhSGV_GVX5SqDGfxm4vtYR7w",
    authDomain: "aktibo-2023.firebaseapp.com",
    projectId: "aktibo-2023",
    storageBucket: "aktibo-2023.appspot.com",
    messagingSenderId: "363113385770",
    appId: "1:363113385770:web:bdf8d66757fd2067b8d853",
    measurementId: "G-1VTRRK1T20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

import '../scss/styles.scss';

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "index.html";
    }
  });

document.getElementById("logout_btn").addEventListener("click",function(){
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "index.html";

      }).catch((error) => {
        // An error happened.
      });
      
})

var main_content = document.getElementById("main_content")
main_content.innerHTML = ""
let idCounters = 1
let momentsRef = collection(db, "moments");
const q = query(momentsRef, orderBy("datePosted", "desc"));

async function showAllMoments(doc,currentPostNumber){
  var usrName = doc.data().username
  var userImageSrc = doc.data().userImageSrc
  var imageSrc = doc.data().imageSrc
  var caption = doc.data().caption
  var likeCount = doc.data().likes
  var commentCount
  let likeBtnId = 'likeBtn' + currentPostNumber
  let commentBtnId = 'commentBtn' + currentPostNumber
  let commentSectionId = 'commentSectionBoxId' + currentPostNumber
  let commenSectionBtn = 'formBtnId' +currentPostNumber
  let textAreaId = 'textAreaId' +currentPostNumber
  let postSpanLikeId = "postSpanId" +currentPostNumber
  let postSpanCommentId = "postSpanCommentId" +currentPostNumber
  let isReported = doc.data().isReported
if(isReported == false || isReported ==undefined || isReported == null){
  return
}
  
    if (commentCount = doc.data().commentsLlist == null || commentCount == doc.data().commentsLlist == undefined) {
    commentCount = "0"
  }

  let docId = doc.id
  if (!isNaN(likeCount) == false) {
    likeCount = ""
  }
  if (!isNaN(commentCount) == false) {
    commentCount = ""
    console.log(commentCount)
  }  
  let imageHTML = ""
  if(imageSrc != null && imageSrc != ""){
    imageHTML = `<img src="`+imageSrc+`">`
  }

    main_content.innerHTML +=
    `
    <div class = "post">
              <div class="header_content d-flex justify-content-end">
                <img src="`+userImageSrc+`" alt="" class="prof-pic">
                <h4 class="expand-width">`+usrName+`</h4>
                 <div class="dropdown-container" id="dropdown-container">
                      <i class='bx bx-dots-vertical bx-sm' ></i>
                  </div>
                  <div class="dropdown-content" id="dropdown-content">
                      <ul>
                          <div data-doc-id ="`+docId+`">
                          <li class = "disableBtn"> Disable </li>
                          <li class="unflagBtn"> Unflag Post </li>
                          </div>
                      </ul>
                  </div>
              </div>
              <div class="post_caption">
                  <h6>`+caption+`</h6>
              </div>
              <div class="info">
                `+imageHTML+`
              </div>
          </div>
    `
  }

  

const docSnap = await getDocs(q);

async function showFlaggedPosts(){
    docSnap.forEach((doc) => {
    const data = doc.data();
    showAllMoments(doc,idCounters)
    idCounters++
  // move show ALL Moments here
    console.log(doc.id);
  });
}

showFlaggedPosts()
addOpenReportButtonEventListeners()
disablePostButtonEventListener()
unflagPostButtonEventListener()
//Event Listeners
function addOpenReportButtonEventListeners(){
    let reportBtn = document.getElementsByClassName('bx-dots-vertical')
    for (let index = 0; index < reportBtn.length; index++) {
    const element = reportBtn[index];
    element.addEventListener('click', function (e) {
      console.log(element)
      const dropDownContentContainerDiv = element.parentNode.nextElementSibling // get the
      console.log(dropDownContentContainerDiv)
      if (dropDownContentContainerDiv.style.display === "block") {
            console.log("Close")
            dropDownContentContainerDiv.style.display = "none";   
        } else {
            console.log("Open")
            dropDownContentContainerDiv.style.display = "block" || dropDownContentContainerDiv.style.display == "";

        }
    });
 }
}
 function disablePostButtonEventListener(){
    let reportBtn = document.getElementsByClassName('disableBtn')
    for (let index = 0; index < reportBtn.length; index++) {
    const element = reportBtn[index];
    element.addEventListener('click', function (e) {
      console.log(element.parentNode.dataset.docId)
      flagMomentsPost(element.parentNode.dataset.docId,element.parentNode.parentNode,"disabled")
      toastMessage("Post has been disabled")
    });
 }
 }
 function unflagPostButtonEventListener(){
    let reportBtn = document.getElementsByClassName('unflagBtn')
    for (let index = 0; index < reportBtn.length; index++) {
    const element = reportBtn[index];
    element.addEventListener('click', function (e) {
      console.log(element.parentNode.dataset.docId)
      flagMomentsPost(element.parentNode.dataset.docId,element.parentNode.parentNode,false)
      toastMessage("Flag tag has been removed.")
    });
 }
 }


async function flagMomentsPost(docId,dropDownContentContainerDiv,status){
  const momentRef = doc(db, "moments", docId);
    console.log(docId)
    if(status === "disabled"){
      status = true
      await updateDoc(momentRef, {
    isDisabled: status,
    disableStrikeCount: increment(1)
      })
    }
    await updateDoc(momentRef, {
    isReported: status,
    reports: deleteField(),
    reportsCount: deleteField()

    
  })
   dropDownContentContainerDiv.style.display = "none";   

}

function toastMessage(message){
    // Get the toast element by its ID
  const toastElement = document.getElementById('liveToast');

  // Get the .toast-body element within the toast
  const toastBodyElement = toastElement.querySelector('.toast-body');

  // Update the content of the .toast-body element
  toastBodyElement.textContent = message;

  // Show the toast
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}
