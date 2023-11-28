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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// redirect user if user is NOT signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
  } else {
    window.location.href = "index.html";
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

// clear content
let main_content = document.getElementById("main_content");
main_content.innerHTML = "";

// pagination (Moments)
let canLoadMoreData = true;
window.addEventListener("scroll", async function () {
  const lastChild = main_content.lastElementChild;
  if (lastChild) {
    const rect = lastChild.getBoundingClientRect();

    // rect.bottom shows float, so keep that -1
    if (rect.bottom - 1 <= window.innerHeight) {
      if (!canLoadMoreData) {
        // still getting data
        return;
      }

      canLoadMoreData = false;
      getMomentsData(3).then(() => {
        canLoadMoreData = true;
      });
    }
  }
});

// get data from firestore
let momentsRef = collection(db, "moments");
let lastVisible; // last loaded post
getMomentsData(3); // first shown posts
let hasNotShownLastPostToast = true; // for last post Toast message

async function getMomentsData(amount) {
  let q;
  if (lastVisible) {
    // get posts after initial query
    q = query(
      momentsRef,
      orderBy("datePosted", "desc"),
      limit(amount),
      startAfter(lastVisible)
    );
  } else {
    // initial query
    q = query(momentsRef, orderBy("datePosted", "desc"), limit(amount));
  }

  const documentSnapshots = await getDocs(q);

  if (documentSnapshots.docs.length > 0) {
    // still have posts left to show
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    documentSnapshots.forEach((doc) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          showMoment(doc, uid);
        } else {
          window.location.href = "index.html";
        }
      });
    });

    
    
  } else {
    // no more posts to show
    if (hasNotShownLastPostToast) {
      toastMessage("No more additional posts.");
      hasNotShownLastPostToast = false;
    }
  }
}

function toastMessage(message) {
  const toastElement = document.getElementById("liveToast");
  const toastBodyElement = toastElement.querySelector(".toast-body");
  toastBodyElement.textContent = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

function showMoment(doc, uid) {
  var username = doc.data().username;
  var userImageSrc = doc.data().userImageSrc;
  var imageSrc = doc.data().imageSrc;
  var caption = doc.data().caption;
  var likes = doc.data().likes;
  var isDisabled = doc.data().isDisabled;
  var reports = doc.data().reports;
  var commentsList = doc.data().commentsList;
  var comments = doc.data().comments;
  var usersLiked = doc.data().usersLiked;
  var reportCount = doc.data().reportsCount
  let heartStyle = "bx-heart";


  // if(reportCount >= 5){
  //   return
  // }
  // hides report Un comment in regular user  
  // if(reports.includes(uid)){
  //   return
  // }

  if (isDisabled) {
    // don't show post if disabled
    return;
  }

  if (isNaN(likes) || likes == null || likes < 0) {
    likes = 0;
  }

  if (isNaN(comments) || comments == null || comments < 0) {
    comments = 0;
  }

  let imageHTML = "";
  if (imageSrc != null && imageSrc != "") {
    imageHTML = `<img src="` + imageSrc + `">`;
  }

  if (usersLiked && usersLiked.length > 0) {
    if (usersLiked.includes(uid)) {
      heartStyle = "bxs-heart liked";
    }
  }

  // populate comments section
  let commentHTML = ``; 

  for (let index = 0; index < commentsList.length; index++) {
    const element = commentsList[index];
    const comment = element.comment
    const username = element.username
    const userImageSrc = element.userImageSrc
    
    let tempCommentHTML =
    `<div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">
        <img src="${userImageSrc}" alt="" class="prof-pic">
        <div>
          <p class="usr-name">${username}</p>
          <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
            <p align="left">${comment}</p>
          </div>
        </div>
      </div>`

    commentHTML += tempCommentHTML;
  }

  main_content.innerHTML +=
    `
    <div class = "post">
      <div class="header_content d-flex justify-content-end">
        <img src="`+userImageSrc+`" alt="" class="prof-pic">
        <h4 class="expand-width">`+username+`</h4>
        <div class="dropdown-container" id="dropdown-container">
          <i class='bx bx-dots-vertical bx-sm' ></i>
        </div>
        <div class="dropdown-content" id="dropdown-content">
          <ul>
            <div>
              <p>Report Reason:</p>
              <hr>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Hate Speech or Harassment</li>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Graphic or Violent Content</li>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Misinformation or Fake News</li>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Privacy Violation</li>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Bullying or Cyberbullying</li>
              <li class="reportBtn" id="`+`"data-doc-id ="`+doc.id+`">Others</li>
            </div>
          </ul>
        </div>
      </div>
      <div class="post_caption">
        <h6>`+caption+`</h6>
      </div>
      <div class="info">`
        +imageHTML +
      `</div>
      <div class = "interact_content">
        <i class='bx `+heartStyle+` likeButton' data-doc-id ="`+doc.id+`"></i>
        <span id = "`+`"class="button-number">`+likes+`</span>
        <i id = '`+`' class='bx bx-comment-detail showCommentButton' data-doc-id ="`+doc.id+`"></i>
        <span class="button-number" id = "`+`">
          `+comments+`
        </span>
      </div>
      <div id = '`+`' class="comment-section" style="max-height:8rem" data-doc-id ="`+doc.id+`">`
        +commentHTML+
      `</div>`;

  // add event listeners
  addLikeButtonEventListeners()
  addOpenReportButtonEventListeners()
  addReportPostButtonEventListener()
}

function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function(element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}

function addLikeButtonEventListeners() {
  let likeButtons = document.getElementsByClassName("likeButton");
  removeAllListenersFromClass(likeButtons)

  for (let index = 0; index < likeButtons.length; index++) {
    const element = likeButtons[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    const postSpan = element.nextElementSibling; // Get the <span> element
    element.addEventListener("click", function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
      let likeCount = postSpan.textContent; // Get the content of the <span>
      console.log("OG likeCount:", likeCount);
      toggleLike(element, docID, postSpan, likeCount);
    });
  }
}

function addOpenReportButtonEventListeners(){
    let reportBtn = document.getElementsByClassName('bx-dots-vertical')
    removeAllListenersFromClass(reportBtn)

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

function addReportPostButtonEventListener(){
    let reportBtn = document.getElementsByClassName('reportBtn')
    removeAllListenersFromClass(reportBtn)
    for (let index = 0; index < reportBtn.length; index++) {
    const element = reportBtn[index];
    element.addEventListener('click', function (e) {
      console.log(element.dataset.docId)
      console.log(element.innerHTML)
      console.log(element.parentNode.parentNode)
      flagMomentsPost(element.dataset.docId,element.parentNode.parentNode,element.innerHTML)
      toastMessage("Post has been reported.")
    });
 }
}

function toggleLike(likeBtn,docId,postSpan,likeCount){
 if (likeBtn.classList.contains('liked')) {
    likeBtn.classList.remove('liked');
    likeBtn.classList.remove('bxs-heart');
    likeBtn.classList.add('bx-heart');
    console.log('removed 1 like')
    console.log("Toggle likecount decrease:",likeCount)
    updateLikesCount(docId, -1)
    console.log(postSpan)
    let likeCtr = parseInt(likeCount)
    likeCtr --
    console.log(likeCtr)

    postSpan.innerText = likeCtr;

  } else {
    likeBtn.classList.add('liked');
    likeBtn.classList.remove('bx-heart');
    likeBtn.classList.add('bxs-heart');
    console.log('added 1 like')
    console.log("Toggle likecount increase:",likeCount)

    updateLikesCount(docId, 1)
    console.log(postSpan)
    //const spanElement = document.getElementById(postSpan); // why is this null lol
    let likeCtr = parseInt(likeCount)
    likeCtr ++
    console.log(likeCtr)

    //console.log(spanElement)
    postSpan.innerText = likeCtr;
  }
}

async function updateLikesCount(docId, num) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
        const momentRef = doc(db, "moments", docId);
        if (num > 0){ // add like
          await updateDoc(momentRef, {
            likes: increment(num),
            usersLiked: arrayUnion(user.uid)
          })
        } else { // remove like
          await updateDoc(momentRef, {
            likes: increment(num),
            usersLiked: arrayRemove(user.uid)
          })
        }
    }
  })
}

async function flagMomentsPost(docId,dropDownContentContainerDiv,reason){
  const momentRef = doc(db, "moments", docId);
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = await getDoc(momentRef)    
    console.log()

    if(docRef.data().reports!= undefined && docRef.data().reports.includes(user.uid)){
      console.log("already reported")
      return
    }
    const userColRef = doc(db, "users", user.uid)
    const userRef = await getDoc(userColRef)
    const myMap = {
      time: Timestamp.now(),
      userId: user.uid,
      userImageSrc: userRef.data().userImage,
      username: userRef.data().username,
      violation: reason
    }

    console.log(myMap)
    await updateDoc(momentRef, {
      isReported: true,
      reports: arrayUnion(myMap),
      reportsCount: increment(1)
    })
    dropDownContentContainerDiv.style.display = "none";
    }
  })
}



 

// async function showAllMoments(doc, currentPostNumber) {
//   var usrName = doc.data().username;
//   var userImageSrc = doc.data().userImageSrc;
//   var imageSrc = doc.data().imageSrc;
//   var caption = doc.data().caption;
//   var likeCount = doc.data().likes;
//   var isDisabled = doc.data().isDisabled;
//   var commentsList = doc.data().commentsList;
//   var commentCount = doc.data().comments;
//   var isLiked = doc.data().usersLiked;
//   console.log(isLiked);

//   let likeBtnId = "likeBtn" + currentPostNumber;
//   let commentBtnId = "commentBtn" + currentPostNumber;
//   let commentSectionId = "commentSectionBoxId" + currentPostNumber;
//   let commenSectionBtn = "formBtnId" + currentPostNumber;
//   let textAreaId = "textAreaId" + currentPostNumber;
//   let postSpanLikeId = "postSpanId" + currentPostNumber;
//   let postSpanCommentId = "postSpanCommentId" + currentPostNumber;
//   let reportBtnId = "reportBtnId";
//   let heartStyle = "bx-heart";

//   console.log(commentCount);
//   if (isDisabled) {
//     return;
//   }

//   if (commentCount == null || commentCount < 0) {
//     commentCount = "0";
//   }

//   let docId = doc.id;
//   if (isNaN(likeCount)) {
//     likeCount = 0;
//   }
//   if (isNaN(commentCount)) {
//     commentCount = 0;
//   }
//   let imageHTML = "";
//   if (imageSrc != null && imageSrc != "") {
//     imageHTML = `<img src="` + imageSrc + `">`;
//   }
//   if (isLiked && isLiked.length > 0) {
//     for (let index = 0; index < isLiked.length; index++) {
//       const element = isLiked[index];
//       console.log("********************");
//       console.log(element);
//       if (element === uid) {
//         heartStyle = "bxs-heart liked";
//       }
//     }
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
//                           <div><li class="reportBtn" id="` +
//     reportBtnId +
//     `" data-doc-id ="` +
//     docId +
//     `">Report</li></div>
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
//               <div class = "interact_content">
//                   <i class='bx ` +
//     heartStyle +
//     ` likeButton' data-doc-id ="` +
//     docId +
//     `"></i>
//                   <span id = "` +
//     postSpanLikeId +
//     `"class="button-number">` +
//     likeCount +
//     `</span>

//                   <i id = '` +
//     commentBtnId +
//     `' class='bx bx-comment-detail showCommentButton' data-doc-id ="` +
//     docId +
//     `" ></i>
//                   <span class="button-number" id = "` +
//     postSpanCommentId +
//     `">` +
//     commentCount +
//     `</span>

                  
//               </div>
//               <div id = '` +
//     commentSectionId +
//     `' class="comment-section" data-doc-id ="` +
//     docId +
//     `">


//               </div>
//               `;
//   //     <div class="comment-box">
//   //         <div class = "usr-comment-box" style="display: flex; align-items: center; justify-content: space-between;">
//   //         <textarea class= "commentTextArea" id="`+textAreaId+`" type="text" placeholder="Leave a comment.." style = "width: 95%; border-radius: 0.4rem; height: 1.5rem; padding-left: 0.5rem; padding-top: 0.2rem;" maxlength="500" ></textarea>
//   //         <i id ='`+commenSectionBtn+`' class='bx bx-send postCommentButton data-doc-id ="`+docId+`"'></i>
//   //         </div>
//   //     </div>
//   // </div>
//   if (commentsList != null || commentsList.length >= 0) {
//     for (let index = 0; index < commentsList.length; index++) {
//       const element = commentsList[index];
//       // console.log("-----------")
//       const comment = commentsList[index].comment;
//       const srcImg = commentsList[index].userImageSrc;
//       const userNameComment = commentsList[index].username;
//       // console.log(comment)
//       // console.log(srcImg)
//       // console.log(userNameComment)
//       displayComments(
//         commentSectionId,
//         userNameComment,
//         comment,
//         srcImg,
//         index
//       );
//     }
//   }
// }


// function addShowCommentButtonEventListeners() {
//   let showCommentButton = document.getElementsByClassName("showCommentButton");

//   for (let index = 0; index < showCommentButton.length; index++) {
//     const element = showCommentButton[index];
//     const docID = element.dataset.docId; // Get the data-doc-id attribute
//     const postSpan = element.nextElementSibling; // Get the <span> element
//     const commentCount = postSpan.textContent; // Get the content of the <span>

//     element.addEventListener("click", function (e) {
//       // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
//       const commentSection = element.parentNode; // Find the closest parent with class "interactive_content"
//       const commentSectionId =
//         commentSection.querySelector(".showCommentButton").id; // comment section show button
//       const commentSectionBox = commentSection.nextElementSibling;
//       var commentSectionBoxId = commentSectionBox.id;
//       console.log(commentSectionId);
//       displayComments(commentSectionBoxId, commentSectionId);
//     });
//   }
// }
// function addPostCommentButtonEventListeners() {
//   let postComment = document.getElementsByClassName("postCommentButton");
//   for (let index = 0; index < postComment.length; index++) {
//     const element = postComment[index];
//     const docID = element.dataset.docId; // Get the data-doc-id attribute
//     element.addEventListener("click", function (e) {
//       // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
//       const commentSectionDiv =
//         element.parentNode.parentNode.previousElementSibling.id;
//       const commentSectionTextArea =
//         document.querySelector(".commentTextArea").id;
//       const commentSectionDocId =
//         element.parentNode.parentNode.previousElementSibling.dataset.docId;
//       addComment(
//         commentSectionDiv,
//         commentSectionTextArea,
//         commentSectionDocId
//       );
//     });
//   }
// }
// function addOpenReportButtonEventListeners() {
//   let reportBtn = document.getElementsByClassName("bx-dots-vertical");
//   for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener("click", function (e) {
//       console.log(element);
//       const dropDownContentContainerDiv = element.parentNode.nextElementSibling; // get the
//       console.log(dropDownContentContainerDiv);
//       if (dropDownContentContainerDiv.style.display === "block") {
//         console.log("Close");
//         dropDownContentContainerDiv.style.display = "none";
//       } else {
//         console.log("Open");
//         dropDownContentContainerDiv.style.display =
//           "block" || dropDownContentContainerDiv.style.display == "";
//       }
//     });
//   }
// }
// function addReportButtonEventListeners() {
//   let reportBtn = document.getElementsByClassName("reportBtn");
//   for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener("click", function (e) {
//       flagMomentsPost(element.dataset.docId, element.parentNode.parentNode);
//       toastMessage("Post has been reported.");
//     });
//   }
// }
// function removeEventListener(elements) {
//   const removeEventListener = (elements) => {
//     elements.forEach((element) => {
//       // Clone the element to remove all event listeners
//       const clonedElement = element.cloneNode(true);
//       element.parentNode.replaceChild(clonedElement, element);
//       console.log(getEventListeners(clonedElement));
//       // If you have specific event types to remove, you can do something like this:
//       // element.removeEventListener('click', yourClickListenerFunction);
//       // Replace 'click' with the actual event type and provide the function reference accordingly.
//     });
//   };
// }

// let hasEventListenerInvoked = false;
// function refreshEventListeners() {
//   if (hasEventListenerInvoked === true) {
//     let likeButtons = document.getElementsByClassName("likeButton");
//     let showCommentButton =
//       document.getElementsByClassName("showCommentButton");
//     let postComment = document.getElementsByClassName("postCommentButton");
//     let openReportBtn = document.getElementsByClassName("bx-dots-vertical");
//     let reportBtn = document.getElementsByClassName("reportBtn");
//     removeEventListener(likeButtons);
//     removeEventListener(showCommentButton);
//     removeEventListener(postComment);
//     removeEventListener(openReportBtn);
//     removeEventListener(reportBtn);
//   }

//   addLikeButtonEventListeners();
//   //addShowCommentButtonEventListeners()
//   //addPostCommentButtonEventListeners()
//   addOpenReportButtonEventListeners();
//   addReportButtonEventListeners();
//   hasEventListenerInvoked = true;
// }

// Pagination

// const container = document.getElementById('main_content');

// // Add a scroll event listener to the window
// let lastPost = false
// window.addEventListener('scroll', function () {
//   const lastChild = container.lastElementChild;

//   if (lastChild) {
//     const rect = lastChild.getBoundingClientRect();

//     // rect.bottom shows float, so keep that -1
//     if (rect.bottom-1 <= window.innerHeight) {
//       // You can perform actions here based on the visibility of the last child.
//       if(lastPost == false){
//         showMoreMoments(3)
//          delay(300).then(() => {
//         refreshEventListeners()
//       });
//     }
//     if(lastPost == true){
//       //refreshEventListeners()
//       lastPost = null
//     }
//    }
//   }
// });

// let momentsRef = collection(db, "moments");
// let idCounters = 1
// let lastVisible = null

// showFirstMoments(3)

// let hasNotShowedMessage = true

// async function showFirstMoments(amount){
//   const first = query(momentsRef, orderBy("datePosted", "desc"), limit(amount));
//   const documentSnapshots = await getDocs(first);
//   lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

//   documentSnapshots.forEach((doc) => {
//     showAllMoments(doc,idCounters)

//     idCounters++
//   // move show ALL Moments here
//     console.log(doc.id);
//   });
//   refreshEventListeners()

// }

// async function showMoreMoments(amount){
//   const next = query(momentsRef,
//     orderBy("datePosted", "desc"),
//     startAfter(lastVisible),
//     limit(amount));

//   const documentSnapshots = await getDocs(next);
//   documentSnapshots.forEach((doc) => {
//     const data = doc.data();

//     showAllMoments(doc,idCounters)
//     idCounters++

//     console.log(doc.id);
//   });

//   if (documentSnapshots.docs.length > 0){
//     lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//     console.log("Not Yet 0")
//   }
//   else {
//     // show message to user

//     if(hasNotShowedMessage){
//       console.log("no more posts")
//       toastMessage("No more additional posts.")
//       hasNotShowedMessage = false
//       lastPost = true
//     }

//   }

// }



// // JavaScript functions to open, close, and add comments
// function displayComments(commentSectionId,userNameComment,comment,srcImg,i) {
//   const commentSection = document.getElementById(commentSectionId)
//     if (commentSection != null) {
//       // Display a maximum of 4 comments
//       const maxComments = 4;
//         commentSection.innerHTML += `
//         <div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">
//           <img src="${srcImg}" alt="" class="prof-pic">
//           <div>
//             <p class="usr-name">${userNameComment}</p>
//             <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
//               <p>${comment}</p>
//             </div>
//           </div>
//         </div>
//         `;
//       // If there are more comments, make the comment section scrollable
//         if (i === 3) {
//                 commentSection.style.maxHeight = "17rem"; // Set a maximum height for scrolling
//                 commentSection.style.overflowY = "auto";  // Enable vertical scrolling
//             }

//       }

//     }

// //show 1 comment
// function showFirstComment(commentSectionID){
//   let comments = data.comments
//   var commentsContainer = document.getElementById(commentSectionID);

//    for (const n of comments) {

//     commentsContainer.innerHTML += `
//       <div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">
//         <img src="${n.userImageSrc}" alt="" class="prof-pic">
//         <div>
//           <p class="usr-name">${n.username}</p>
//           <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
//             <p>${n.comment}</p>
//           </div>
//         </div>
//       </div>
//     `;
//     // Exit the loop after the first iteration
//     break;
//   }
// }

// //add comment
// function addComment(commentSectionDiv,textAreaId,commentSectionDocId){
//   let commentInput = document.getElementById(textAreaId)
//   let commentText = commentInput.value;
//   console.log(commentText)
//   let commentSection = document.getElementById(commentSectionDiv);
//   console.log(commentSection)
//   addCommentPost(commentSectionDocId,commentText)
//   commentSection.innerHTML+=  `
//   <div class = "usr-profile"style="display: flex; align-items: center; align-items: flex-start; ">
//                  <img src="https://as2.ftcdn.net/v2/jpg/02/66/72/41/1000_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg" alt = "" class = "prof-pic">
//                    <div>
//                    <p class = "usr-name"> 4vanteguard</p>
//                    <div class = "usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
//                         <p>${commentText}</p>
//                     </div>
//                  </div>
//   `
//   commentInput.value = "";

// }

// Function to update likes count


// Function to decrement likes
// async function decrementLikes(docId) {
//   const momentRef = doc(db, "moments", docId);
//   const momentDoc = await getDoc(momentRef);
//   const usersLiked = momentDoc.data().usersLiked || [];
//   const updatedUsersLiked = usersLiked.filter((user) => user !== uid);

//   await updateDoc(momentRef, {
//     likes: increment(-1),
//     usersLiked: updatedUsersLiked
//   })
// }

// function addNewExercise(){
//   let category = document.getElementById("category").value
//   let name = document.getElementById("name").value
//   let instructions = ["asdf","sadf"]

//   createNewExerciseDocument(category)
//   .then(() => {
//     // show user message of success
//   }).catch((error) => {
//     // show user message of failure
//   });
// }

// async function createNewExerciseDocument(category, est_time, instructions, intensity, name, reps_duration, sets, tags, video) {
//   // Add a new document with a generated id.
//   const docRef = await addDoc(collection(db, "exercises"), {
//     category: category,
//     est_time: est_time,
//     instructions: instructions,
//     intensity: intensity,
//     name: name,
//     reps_duration: reps_duration,
//     sets: sets,
//     tags: tags,
//     video: video

//   });
//   console.log("Document written with ID: ", docRef.id);

// }



// async function addCommentPost(docId,text){
//   const momentRef = doc(db, "moments", docId);
//     console.log(docId)

//     await updateDoc(momentRef, {

//     comment:increment(1),
//     commentList: arrayUnion(text)
//   })
// }

// function delay(milliseconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve, milliseconds);
//   });
// }
