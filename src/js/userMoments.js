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
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import * as bootstrap from "bootstrap";
import "../scss/styles.scss";
import { main, start } from "@popperjs/core";

const axios = require("axios");
const FormData = require("form-data");

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

var editPostModal = new bootstrap.Modal("#editPostModal");
var closeEditPostModal = document.getElementById("editPostModalBtn");
var saveCaption = document.getElementById("saveCaption")

closeEditPostModal.addEventListener("click", function () {
  editPostModal.hide();
});
saveCaption.addEventListener("click", function () {
  editPostSightEngieCheck();
})

// clear content
let main_content = document.getElementById("main_content");
main_content.innerHTML = "";

// pagination (Moments)
let canLoadMoreData = false;
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
        canLoadMoreData = false;
      });
    }
  }
});

// get data from firestore
let userPostRef = doc(db, "users", "0y9Kkgd303QrsKSuXzKvqG2DI4E2");
const userRef = await getDoc(userPostRef);

let lastVisible; // last loaded post
getMomentsData(5); // first shown posts
let hasNotShownLastPostToast = true; // for last post Toast message

async function getMomentsData(amount) {
  // Check if the userRef contains posts data
  if (userRef.exists() && userRef.data().posts) {
    const posts = userRef.data().posts;

    // Fetch moments for each momentId
    for (const post of posts) {
      const momentRef = doc(db, "moments", post["momentID"]);
      const momentSnap = await getDoc(momentRef);

      if (momentSnap.exists()) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            showMoment(momentSnap, uid);
          } else {
            window.location.href = "index.html";
          }
        });
      } else {
        console.log(`Moment with ID ${post["momentID"]} not found`);
      }
    }
  } else {
    console.log("User has no posts data");
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
  var usersDisliked = doc.data().usersDisliked;
  var reportCount = doc.data().reportsCount
  let heartStyle = "bx-upvote";
  let downvoteStyle = "bx-downvote"

  // Check if moment is disabled or user has reported it
  if (isDisabled || (reports && reports.includes(uid))) {
    return;
  }

  if (isNaN(likes) || likes == null ) {
    likes = 0;
  }

  if (isNaN(comments) || comments == null || comments < 0) {
    comments = 0;
  }

  let imageHTML = "";
  if (imageSrc != null && imageSrc != "") {
    imageHTML = `<img src="` + imageSrc + `">`;
  }
  if (usersLiked == undefined) {
    usersLiked = []
  }
    if (usersDisliked == undefined) {
    usersDisliked = []
  }

if (usersLiked && usersLiked.includes(uid)) {
  heartStyle = "bxs-upvote liked";
} else if (usersDisliked && usersDisliked.includes(uid)) {
  downvoteStyle = "bxs-downvote disliked";
}
   console.log(usersLiked.includes(uid),usersDisliked.includes(uid),"!!!")
  // Populate comments section
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
              <li class="editBtn" id="`+`"data-doc-id ="`+doc.id+`">Edit Post</li>
              <li class="deleteBtn" id="`+`"data-doc-id ="`+doc.id+`">Delete Post</li>
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
        <span id = "`+ `"class="button-number">` + likes +`</span>
        <i class='bx `+downvoteStyle+` downvoteButton' data-doc-id ="`+doc.id+`"></i>
        <i id = '`+`' class='bx bx-comment-detail showCommentButton' data-doc-id ="`+doc.id+`"></i>
        <span class="button-number" id = "`+`">
          `+comments+`
        </span>
      </div>
      <div id = '`+`' class="comment-section" style="max-height:8rem" data-doc-id ="`+doc.id+`">`
        +commentHTML+
      `</div>`;

  // Add event listeners
  addLikeButtonEventListeners()
  addOpenReportButtonEventListeners()
  addDownvoteButtonEventListeners()
  addEditPostButtonEventListener()
  addDeletePostButtonEventListener()
}

function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function (element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}

function addLikeButtonEventListeners() {
  let likeButtons = document.getElementsByClassName("likeButton");
  let downvoteButtons = document.getElementsByClassName("downvoteButton");
  removeAllListenersFromClass(likeButtons)

  for (let index = 0; index < likeButtons.length; index++) {
    const element = likeButtons[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    const postSpan = element.nextElementSibling; // Get the <span> element
    element.addEventListener("click", function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
      let likeCount = postSpan.textContent; // Get the content of the <span>
      console.log("OG likeCount:", likeCount);
      toggleLike(element, downvoteButtons[index], docID, postSpan, likeCount, 0);
    });
  }
}

function addDownvoteButtonEventListeners() {
  let likeButtons = document.getElementsByClassName("likeButton");
  let downvoteButtons = document.getElementsByClassName("downvoteButton");
  removeAllListenersFromClass(downvoteButtons)

  for (let index = 0; index < downvoteButtons.length; index++) {
    const element = downvoteButtons[index];
    const docID = element.dataset.docId; // Get the data-doc-id attribute
    const postSpan = element.previousElementSibling; // Get the <span> element
    element.addEventListener("click", function (e) {
      // Your code here, you can use docID, postSpan, likeCount, and elementId as needed
      let likeCount = postSpan.textContent; // Get the content of the <span>
      console.log("OG likeCount:", likeCount);
      toggleLike(likeButtons[index], element, docID, postSpan, likeCount, 1);
    });
  }
}
//NEW DROPDOWN FUNCTION
function addOpenReportButtonEventListeners() {
  let reportBtn = document.getElementsByClassName("bx-dots-vertical");
  removeAllListenersFromClass(reportBtn);

  // Function to close dropdown content if clicked outside
  function closeDropdownContent() {
    let dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(function (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      }
    });
  }

  // Add click event listener to document to close dropdowns
  document.addEventListener("click", function (event) {
    let isDropdownClick = false;
    let target = event.target;
    while (target) {
      if (target.classList && target.classList.contains("dropdown-content")) {
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
    element.addEventListener("click", function (e) {
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

function addEditPostButtonEventListener() {
  let editBtn = document.getElementsByClassName("editBtn");
  removeAllListenersFromClass(editBtn);
  for (let index = 0; index < editBtn.length; index++) {
    const element = editBtn[index];
    element.addEventListener("click", function (e) {
      loadPostModal(
        element.dataset.docId,
        element.parentNode.parentNode.parentNode.parentNode.nextElementSibling
      );
    });
  }
}

function loadPostModal(docID, h6Element) {
  var h6Text = h6Element.innerText;
  document.getElementById("postTextInput").value = h6Text;
  editPostModal.show();
}
function updateCaptionFirebase(docId) {
  //Firebase update
}

function addDeletePostButtonEventListener() {
  let deleteBtn = document.getElementsByClassName("deleteBtn");
  removeAllListenersFromClass(deleteBtn);
  for (let index = 0; index < deleteBtn.length; index++) {
    const element = deleteBtn[index];
    element.addEventListener("click", function (e) {
      console.log(element.dataset.docId);
      console.log(element.innerHTML);
      console.log(element.parentNode.parentNode);
      deletePost(element.dataset.docId, element.parentNode.parentNode);
      toastMessage("Post has been reported.");
    });
  }
}

function toggleLike(likeBtn, downvoteBtn, docId, postSpan, likeCount, type) {
  // Remove dislike if present and like is clicked
  if (type === 0) {
    if (likeBtn.classList.contains('liked')) { // Like to remove like = 0
      // If already liked, remove like
      likeBtn.classList.remove('liked');
      console.log('removed 1 like');
      // Decrease like count by 1
      likeCount--;
      updateLikesCount(docId, -1);
    } else {
      if (!likeBtn.classList.contains('liked')) { // Add Like = 1
        // If not liked, add like
        likeBtn.classList.add('liked');
        console.log('added 1 like');
        // Increase like count by 1
        likeCount++;
        updateLikesCount(docId, 1);
      }

      // Clear dislike if present
      if (downvoteBtn.classList.contains('disliked')) { // dislike to like = 1 ..... -1 to 1
        console.log("disliked to liked");
        // If downvote was already present, clear it
        likeBtn.classList.add('liked');
        downvoteBtn.classList.remove('disliked');
        console.log('removed 1 dislike');
        // Decrease like count by 1 (to offset the previous increment)
        likeCount++;
        // Decrease dislike count by 1
        updateLikesCount(docId, 1);
      }
    }
  }
  // Remove like if present and dislike is clicked
  else if (type === 1) {
    if (downvoteBtn.classList.contains('disliked')) { // dislike to reset = 0
      // If downvote is disliked, remove dislike and increment like count
      downvoteBtn.classList.remove('disliked');
      console.log('removed 1 dislike');
      // Decrease dislike count by 1
      // Increment like count by 1
      likeCount++;
      // Update likes count by 1
      updateLikesCount(docId, 1);
    } else {
      // If downvote is not disliked, add dislike and decrement like count
      if (!downvoteBtn.classList.contains('disliked') && !likeBtn.classList.contains('liked')) { // dislike = -1
        downvoteBtn.classList.add('disliked');
        console.log('added 1 dislike');
        likeCount-= 1;
        // Update likes count by -1
        updateLikesCount(docId, -1);
      }
      if (likeBtn.classList.contains('liked')) { // Liked to dislike = -1
        downvoteBtn.classList.add('disliked');
        likeBtn.classList.remove('liked');
        console.log("liked and downvoted", 'added 1 dislike');
        likeCount-= 2;
        // Update likes count by -1
        updateLikesCount(docId, -2);
      }
    }
  }

  // Toggle like/dislike icon class
  if (likeBtn.classList.contains('liked')) {
    // If liked, set like icon
    likeBtn.classList.remove('bxs-downvote');
    likeBtn.classList.add('bxs-upvote');
    likeBtn.classList.remove('bx-upvote'); // Remove 'bx-upvote' class
  } else {
    // If not liked, set default like icon
    likeBtn.classList.remove('bxs-upvote');
    likeBtn.classList.add('bx-upvote'); // Add 'bx-upvote' class when neither liked nor disliked
  }

  if (downvoteBtn.classList.contains('disliked')) {
    // If disliked, set dislike icon
    downvoteBtn.classList.remove('bxs-upvote');
    downvoteBtn.classList.add('bxs-downvote');
    downvoteBtn.classList.remove('bx-downvote'); // Remove 'bx-downvote' class
  } else {
    // If not disliked, set default dislike icon
    downvoteBtn.classList.remove('bxs-downvote');
    downvoteBtn.classList.add('bx-downvote'); // Add 'bx-downvote' class when neither liked nor disliked
  }
  postSpan.textContent = likeCount;
}

async function updateLikesCount(docId, num) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const momentRef = doc(db, "moments", docId);
            const momentSnap = await getDoc(momentRef);
            const momentData = momentSnap.data();
            
            if (!momentData) { // Document doesn't exist, create new document
                await updateDoc(momentRef, {
                    usersLiked: [],
                    usersDisliked: []
                });
            }
            
            if (num > 0) { // Handling like
                if (momentData.usersLiked && momentData.usersLiked.includes(user.uid)) {
                    // User has already liked the moment, so remove the like
                    await updateDoc(momentRef, {
                        likes: increment(num),
                        usersLiked: arrayRemove(user.uid)
                    });
                } else {
                    // User hasn't liked the moment yet, so add the like
                    // If the user disliked the moment before, remove the dislike
                    if (momentData.usersDisliked && momentData.usersDisliked.includes(user.uid)) {
                        await updateDoc(momentRef, {
                            likes: increment(num),
                            usersDisliked: arrayRemove(user.uid)
                        });
                    } else {
                        await updateDoc(momentRef, {
                            likes: increment(num),
                            usersLiked: arrayUnion(user.uid)
                        });
                    }
                }
            } else if (num < 0) { // Handling dislike
                if (momentData.usersDisliked && momentData.usersDisliked.includes(user.uid)) {
                    // User has already disliked the moment, so remove the dislike
                    await updateDoc(momentRef, {
                        likes: increment(num),
                        usersDisliked: arrayRemove(user.uid)
                    });
                } else {
                    // User hasn't disliked the moment yet, so add the dislike
                    // If the user liked the moment before, remove the like
                    if (momentData.usersLiked && momentData.usersLiked.includes(user.uid)) {
                        await updateDoc(momentRef, {
                            likes: increment(num),
                            usersLiked: arrayRemove(user.uid)
                        });
                    } else {
                        await updateDoc(momentRef, {
                            likes: increment(num),
                            usersDisliked: arrayUnion(user.uid)
                        });
                    }
                }
            }
        }
    });
}

async function deletePost(docId, dropDownContentContainerDiv, reason) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Delete the moment document directly using docId
        await deleteDoc(doc(db, "moments", docId));

        // Remove the deleted post from the user's posts array
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const updatedPosts = userData.posts.filter(
            (post) => post.momentId !== docId
          );
          await setDoc(userRef, { posts: updatedPosts }, { merge: true });
        }

        // Remove the deleted post from the UI
        dropDownContentContainerDiv.remove();

        // Notify the user about the deletion
        console.log("Post deleted successfully");

        // You can also add additional logic here, such as displaying a confirmation message or updating UI.
      } catch (error) {
        console.error("Error deleting post:", error);

        // You can handle the error appropriately, such as displaying an error message to the user.
      }
    } else {
      console.log("User is not authenticated. Redirecting to index page.");
      window.location.href = "index.html"; // Redirect to index page if user is not authenticated
    }
  });
}

function editPostSightEngieCheck() {
  var postTextInput = document.getElementById("postTextInput").value;
  var caption = postTextInput;
  var data = new FormData();
  data.append("text", caption);
  data.append("lang", "en");
  data.append("mode", "ml");
  data.append("api_user", "1227574749");
  data.append("api_secret", "NLvWeA9iUfYBqg6rMyx6VsaJXy");

  axios({
    url: "https://api.sightengine.com/1.0/text/check.json",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  })
    .then(function (response) {
      // on success: handle response
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    });
}
