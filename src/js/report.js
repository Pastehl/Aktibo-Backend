import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc, increment, orderBy, limit, startAfter} from "firebase/firestore";
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
  let reportBtnId = "reportBtnId" 
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
                          <div><li class="reportBtn" id="`+reportBtnId+`" data-doc-id ="`+docId+`">Report</li></div>
                      </ul>
                  </div>
              </div>
              <div class="post_caption">
                  <h6>`+caption+`</h6>
              </div>
              <div class="info">
                `+imageHTML+`
              </div>
              <div class = "interact_content">
                  <i class='bx bx-heart likeButton' data-doc-id ="`+docId+`"></i>
                  <span id = "`+postSpanLikeId+`"class="button-number">`+likeCount+`</span>

                  <i id = '`+commentBtnId+`' class='bx bx-comment-detail showCommentButton' data-doc-id ="`+docId+`" ></i>
                  <span class="button-number" id = "`+postSpanCommentId+`">`+commentCount+`</span>

                  
              </div>
              <div id = '`+commentSectionId+`' class="comment-section">


              </div>
              <div class="comment-box">
                  <div class = "usr-comment-box" style="display: flex; align-items: center; justify-content: space-between;">
                  <textarea class= "commentTextArea" id="`+textAreaId+`" type="text" placeholder="Leave a comment.." style = "width: 95%; border-radius: 0.4rem; height: 1.5rem; padding-left: 0.5rem;" maxlength="500" ></textarea>
                  <i id ='`+commenSectionBtn+`' class='bx bx-send postCommentButton data-doc-id ="`+docId+`"'></i>
                  </div>
              </div>
          </div>
    `
  }

  

  const docSnap = await getDocs(momentsRef);

  docSnap.forEach((doc) => {
    const data = doc.data();
    showAllMoments(doc,idCounters)
    idCounters++
  // move show ALL Moments here
    console.log(doc.id);
  });