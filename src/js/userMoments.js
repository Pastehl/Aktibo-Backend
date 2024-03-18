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
    if (rect.bottom - 2 <= window.innerHeight) {
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
getMomentsData(5); // first shown posts
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
  if(reports != null || reports != undefined){
    for(const report of reports){
      if(report.userId === uid){
          return;
      }
    }
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
//ORIGNAL  FUNCTION BELOW
// function addOpenReportButtonEventListeners(){
//     let reportBtn = document.getElementsByClassName('bx-dots-vertical')
//     removeAllListenersFromClass(reportBtn)

//     for (let index = 0; index < reportBtn.length; index++) {
//     const element = reportBtn[index];
//     element.addEventListener('click', function (e) {
//       console.log(element)
//       const dropDownContentContainerDiv = element.parentNode.nextElementSibling // get the
//       console.log(dropDownContentContainerDiv)
//       if (dropDownContentContainerDiv.style.display === "block") {
//             console.log("Close")
//             dropDownContentContainerDiv.style.display = "none";   
//         } else {
//             console.log("Open")
//             dropDownContentContainerDiv.style.display = "block";
//             //  || dropDownContentContainerDiv.style.display == ""; 

//         }
//     });
//  }
// }

//NEW DROPDOWN FUNCTION
function addOpenReportButtonEventListeners() {
    let reportBtn = document.getElementsByClassName('bx-dots-vertical');
    removeAllListenersFromClass(reportBtn);

    // Function to close dropdown content if clicked outside
    function closeDropdownContent() {
        let dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }

    // Add click event listener to document to close dropdowns
    document.addEventListener('click', function(event) {
        let isDropdownClick = false;
        let target = event.target;
        while (target) {
            if (target.classList && target.classList.contains('dropdown-content')) {
                isDropdownClick = true;
                break;
            }
            target = target.parentNode;
        }
        if (!isDropdownClick) {
            closeDropdownContent();
        }
    });

    for (let index = 0; index < reportBtn.length; index++) {
        const element = reportBtn[index];
        element.addEventListener('click', function (e) {
            console.log(element);
            const dropDownContentContainerDiv = element.parentNode.nextElementSibling; // get the dropdown content
            console.log(dropDownContentContainerDiv);
            if (dropDownContentContainerDiv.style.display === "block") {
                console.log("Close");
                dropDownContentContainerDiv.style.display = "none";   
            } else {
                console.log("Open");
                dropDownContentContainerDiv.style.display = "block";
            }
            e.stopPropagation(); // Prevents the click event from propagating to the document click event listener
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
    let arrObj = docRef.data().reports
    if(arrObj!= undefined ){
    for (let index = 0; index < arrObj.length; index++) {
      const element = arrObj[index].userId;
        if(element == user.uid){
        console.log("already reported")
        return
        }
      }      
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

