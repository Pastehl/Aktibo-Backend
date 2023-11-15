
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc, increment, orderBy, limit, startAfter, arrayUnion} from "firebase/firestore";
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

const data = 
  {
    "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
    "imageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
    "caption": "test caption",
    "likes": 23,
    "comments":
    [
      {
        "username": "Aktibo User 2023",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "very nice dude"
      },
      {
        "username": "User234234",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "good good"
      },
      {
        "username": "lafayette",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "wow"
      },
      {
        "username": "Aktibo User 2023",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "very nice dude"
      },
      {
        "username": "User234234",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "good good"
      },
      {
        "username": "lafayette",
        "userImageSrc": "https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg",
        "comment": "wow"
      }
    ]
  }

var main_content = document.getElementById("main_content")
main_content.innerHTML = ""


const q = query(collection(db, "moments"));



async function showAllMoments(doc,currentPostNumber){
  var usrName = doc.data().username
  var userImageSrc = doc.data().userImageSrc
  var imageSrc = doc.data().imageSrc
  var caption = doc.data().caption
  var likeCount = doc.data().likes
  var isDisabled = doc.data().isDisabled
  var commentCount = doc.data().comments;
  let likeBtnId = 'likeBtn' + currentPostNumber
  let commentBtnId = 'commentBtn' + currentPostNumber
  let commentSectionId = 'commentSectionBoxId' + currentPostNumber
  let commenSectionBtn = 'formBtnId' +currentPostNumber
  let textAreaId = 'textAreaId' +currentPostNumber
  let postSpanLikeId = "postSpanId" +currentPostNumber
  let postSpanCommentId = "postSpanCommentId" +currentPostNumber
  let reportBtnId = "reportBtnId" 

  // if(isDisabled == null || isDisabled == undefined){
  //   isDisabled = false
  // }

  if(isDisabled === true){
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
              <div id = '`+commentSectionId+`' class="comment-section" data-doc-id ="`+docId+`">


              </div>
              <div class="comment-box">
                  <div class = "usr-comment-box" style="display: flex; align-items: center; justify-content: space-between;">
                  <textarea class= "commentTextArea" id="`+textAreaId+`" type="text" placeholder="Leave a comment.." style = "width: 95%; border-radius: 0.4rem; height: 1.5rem; padding-left: 0.5rem;" maxlength="500" ></textarea>
                  <i id ='`+commenSectionBtn+`' class='bx bx-send postCommentButton data-doc-id ="`+docId+`"'></i>
                  </div>
              </div>
          </div>
    `
  showFirstComment(commentSectionId)  
}

function addLikeButtonEventListeners(){
  let likeButtons = document.getElementsByClassName('likeButton');
  for (let index = 0; index < likeButtons.length; index++) {
    const element = likeButtons[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    const postSpan = element.nextElementSibling; // Get the <span> element    
    element.addEventListener('click', function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
      let likeCount = postSpan.textContent; // Get the content of the <span>
      console.log('OG likeCount:', likeCount);
      toggleLike(element,docID,postSpan,likeCount)
    });
 }
}
function addShowCommentButtonEventListeners(){
   let showCommentButton = document.getElementsByClassName('showCommentButton');

  for (let index = 0; index < showCommentButton.length; index++) {
    const element = showCommentButton[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    const postSpan = element.nextElementSibling; // Get the <span> element
    const commentCount = postSpan.textContent; // Get the content of the <span>


    element.addEventListener('click', function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
    const commentSection = element.parentNode // Find the closest parent with class "interactive_content"
    const commentSectionId = commentSection.querySelector('.showCommentButton').id // comment section show button
    const commentSectionBox = commentSection.nextElementSibling;
    var commentSectionBoxId = commentSectionBox.id
    console.log(commentSectionId)
      displayComments(commentSectionBoxId,commentSectionId)
    });
 }
}
function addPostCommentButtonEventListeners(){
  let postComment = document.getElementsByClassName('postCommentButton')
    for (let index = 0; index < postComment.length; index++) {
    const element = postComment[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    element.addEventListener('click', function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
      const commentSectionDiv = element.parentNode.parentNode.previousElementSibling.id
      const commentSectionTextArea = document.querySelector(".commentTextArea").id
      const commentSectionDocId = element.parentNode.parentNode.previousElementSibling.dataset.docId
      addComment(commentSectionDiv,commentSectionTextArea,commentSectionDocId)
    });
 }

}
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
function addReportButtonEventListeners(){
    let reportBtn = document.getElementsByClassName('reportBtn')
    for (let index = 0; index < reportBtn.length; index++) {
    const element = reportBtn[index];
    element.addEventListener('click', function (e) {
      flagMomentsPost(element.dataset.docId,element.parentNode.parentNode)
      toastMessage("Post has been reported.")
    });
 }
 }
function selectElementsLoop(e){
  for (let index = 0; index < e.length; index++) {
    const element = e[index];
    element.removeEventListener('click', function (e) {
    });
 }
}
let hasEventListenerInvoked = false
function refreshEventListeners(){
  if(hasEventListenerInvoked === true){
    let likeButtons = document.getElementsByClassName('likeButton');
    let showCommentButton = document.getElementsByClassName('showCommentButton');
    let postComment = document.getElementsByClassName('postCommentButton')
    let openReportBtn = document.getElementsByClassName('bx-dots-vertical')
    let reportBtn = document.getElementsByClassName('reportBtn')
    let allVar = [likeButtons,showCommentButton,postComment,openReportBtn,reportBtn,allVar]
    for (let index = 0; index < allVar.length; index++) {
      const element = array[index];
      selectElementsLoop(element)
      
    }
    
  }
  addLikeButtonEventListeners();
  addShowCommentButtonEventListeners()
  addPostCommentButtonEventListeners()
  addOpenReportButtonEventListeners()
  addReportButtonEventListeners()
  hasEventListenerInvoked = true
}




// Pagination

const container = document.getElementById('main_content');

// Add a scroll event listener to the window
window.addEventListener('scroll', function () {
  const lastChild = container.lastElementChild;

  if (lastChild) {
    // Get the position of the last child relative to the viewport
    const rect = lastChild.getBoundingClientRect();

    // Check if the last child is fully visible on the screen
    // console.log(rect.bottom)
    // console.log(window.innerHeight)

    // rect.bottom shows float, so keep that -1
    if (rect.bottom-1 <= window.innerHeight) {
      // You can perform actions here based on the visibility of the last child.
      showMoreMoments(3)
    }
            
  }
});

let momentsRef = collection(db, "moments");
let idCounters = 1
let lastVisible = null

showFirstMoments(3)

let hasNotShowedMessage = true

async function showFirstMoments(amount){
  const first = query(momentsRef, orderBy("datePosted", "desc"), limit(amount));
  const documentSnapshots = await getDocs(first);
  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

  documentSnapshots.forEach((doc) => {
    const data = doc.data();
    showAllMoments(doc,idCounters)
    idCounters++
  // move show ALL Moments here
    console.log(doc.id);
  });
  refreshEventListeners()

}

async function showMoreMoments(amount){
  const next = query(momentsRef,
    orderBy("datePosted", "desc"),
    startAfter(lastVisible),
    limit(amount));

  const documentSnapshots = await getDocs(next);
  documentSnapshots.forEach((doc) => {
    const data = doc.data();

    showAllMoments(doc,idCounters)
    idCounters++

    console.log(doc.id);
  });
  refreshEventListeners()

  if (documentSnapshots.docs.length > 0){
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  } else {
    // show message to user
    
    if(hasNotShowedMessage){
      console.log("no more posts")
      toastMessage("No more additional posts.")
      
      hasNotShowedMessage = false
    }
    

  }
  
}


function toggleLike(likeBtn,docId,postSpan,likeCount){
 if (likeBtn.classList.contains('liked')) {
    likeBtn.classList.remove('liked');
    likeBtn.classList.remove('bxs-heart');
    likeBtn.classList.add('bx-heart');
    console.log('removed 1 like')
    console.log("Toggle likecount decrease:",likeCount)
    decrementLikes(docId)
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

    incrementLikes(docId)
    console.log(postSpan)
    //const spanElement = document.getElementById(postSpan); // why is this null lol
    let likeCtr = parseInt(likeCount)
    likeCtr ++
    console.log(likeCtr)

    //console.log(spanElement)
    postSpan.innerText = likeCtr;
  }
}

// JavaScript functions to open, close, and add comments
function displayComments(commentSectionID, commentBtnId) {
  commentBtnId = document.getElementById(String(commentBtnId));
  commentSectionID = String(commentSectionID);
  var commentsContainer = document.getElementById(commentSectionID); // Returns commentBtn#
  console.log(commentsContainer)
  let comments = data.comments;
  console.log(commentSectionID)

  if (commentBtnId.classList.contains('open')) {
    // If the comment section is open, revert it to the initial state
    commentsContainer.innerHTML = '';
    showFirstComment(commentSectionID);
    commentBtnId.classList.remove('open');
  } else {
    commentBtnId.classList.add('open');

    // Clear any existing comments before adding new ones
    commentsContainer.innerHTML = '';

    if (commentsContainer != null) {
      // Display a maximum of 4 comments
      const maxComments = 4;
      console.log(comments.length);
      for (let i = 0; i < comments.length; i++) {
        console.log(i)
        const n = comments[i];
        commentsContainer.innerHTML += `
        <div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">
          <img src="${n.userImageSrc}" alt="" class="prof-pic">
          <div>
            <p class="usr-name">${n.username}</p>
            <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
              <p>${n.comment}</p>
            </div>
          </div>
        </div>
        `;
      // If there are more comments, make the comment section scrollable
        if (i === 3) {
                commentsContainer.style.maxHeight = "18rem"; // Set a maximum height for scrolling
                commentsContainer.style.overflowY = "auto";  // Enable vertical scrolling
            }

      }


    }
  }
}



//show 1 comment
function showFirstComment(commentSectionID){
  let comments = data.comments
  var commentsContainer = document.getElementById(commentSectionID);

   for (const n of comments) {

    commentsContainer.innerHTML += `
      <div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">
        <img src="${n.userImageSrc}" alt="" class="prof-pic">
        <div>
          <p class="usr-name">${n.username}</p>
          <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
            <p>${n.comment}</p>
          </div>
        </div>
      </div>
    `;
    // Exit the loop after the first iteration
    break;
  }
}

//add comment
function addComment(commentSectionDiv,textAreaId,commentSectionDocId){
  let commentInput = document.getElementById(textAreaId)
  let commentText = commentInput.value;
  console.log(commentText)
  let commentSection = document.getElementById(commentSectionDiv);
  console.log(commentSection)
  addCommentPost(commentSectionDocId,commentText)
  commentSection.innerHTML+=  `
  <div class = "usr-profile"style="display: flex; align-items: center; align-items: flex-start; ">
                 <img src="https://as2.ftcdn.net/v2/jpg/02/66/72/41/1000_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg" alt = "" class = "prof-pic">
                   <div>
                   <p class = "usr-name"> 4vanteguard</p>
                   <div class = "usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
                        <p>${commentText}</p>
                    </div>
                 </div>
  `
  commentInput.value = "";

}


 
// Function to increment likes
async function incrementLikes(docId) {
  const momentRef = doc(db, "moments", docId);
  await updateDoc(momentRef, {
    likes: increment(1)
  })
}

// Function to decrement likes
async function decrementLikes(docId) {
  const momentRef = doc(db, "moments", docId);

  await updateDoc(momentRef, {
    likes: increment(-1)
  })
}

function addNewExercise(){
  let category = document.getElementById("category").value
  let name = document.getElementById("name").value
  let instructions = ["asdf","sadf"]

  createNewExerciseDocument(category)
  .then(() => {
    // show user message of success
  }).catch((error) => {
    // show user message of failure
  });
}

async function createNewExerciseDocument(category, est_time, instructions, intensity, name, reps_duration, sets, tags, video) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "exercises"), {
    category: category,
    est_time: est_time,
    instructions: instructions,
    intensity: intensity,
    name: name,
    reps_duration: reps_duration,
    sets: sets,
    tags: tags,
    video: video

  });
  console.log("Document written with ID: ", docRef.id);

}

async function flagMomentsPost(docId,dropDownContentContainerDiv){
  const momentRef = doc(db, "moments", docId);
    console.log(docId)
    await updateDoc(momentRef, {
    isReported: true
  })
   dropDownContentContainerDiv.style.display = "none";   

}

async function addCommentPost(docId,text){
  const momentRef = doc(db, "moments", docId);
    console.log(docId)

    await updateDoc(momentRef, {
    
    comment:increment(1),
    commentList: arrayUnion(text)
  })
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
