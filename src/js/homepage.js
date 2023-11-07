import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc, increment} from "firebase/firestore";


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



async function showAllMoments(){
  let currentPostNumber = 1

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {

    var usrName = doc.data().username
    var userImageSrc = doc.data().userImageSrc
    var imageSrc = doc.data().imageSrc
    var caption = doc.data().caption
    var likeCount = doc.data().likes
    var commentCount
    let likeBtnId = 'likeBtn' + currentPostNumber
    let commentBtnId = 'commentBtn' + currentPostNumber
    let commentSectionId = 'commentSectionId' + currentPostNumber
    let commenSectionBtn = 'formBtnId' +currentPostNumber
    let textAreaId = 'textAreaId' +currentPostNumber
    let postSpanLikeId = "postSpanId" +currentPostNumber
    let postSpanCommentId = "postSpanCommentId" +currentPostNumber

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
                <i class='bx bx-dots-vertical'></i>
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
                  <textarea id="`+textAreaId+`" type="text" placeholder="Leave a comment.." style = "width: 95%; border-radius: 0.4rem; height: 1.5rem; padding-left: 0.5rem;" maxlength="500" ></textarea>
                  <i id ='`+commenSectionBtn+`' class='bx bx-send'></i>
                  </div>
              </div>
          </div>
    `
    // showFirstComment(commentSectionId)

    // setupEventListeners(likeBtnId, commentBtnId, commenSectionBtn, commentSectionId, textAreaId, docId,postSpan);

    // currentPostNumber++

    // console.log(likeBtnId)

    // document.getElementById(likeBtnId).addEventListener('click', function(e){
    //   console.log(e.target.id)
    // })

    currentPostNumber++
  })

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
    const commentSectionId = commentSection.querySelector('.showCommentButton').id
    console.log(commentSectionId)
      displayComments(commentSectionId,element)
    });
 }
}

document.addEventListener('DOMContentLoaded', function () {
  // Your code that depends on the DOM being fully loaded goes here
  showAllMoments().then(() => {
    addLikeButtonEventListeners();
    addShowCommentButtonEventListeners()
  }).catch((error) => {
    console.log(error);
  });

  // Any other code that interacts with the DOM can be placed here.
});



// Get a reference to the content element
const container = document.getElementById('main_content');

// Add a scroll event listener to the window
// window.addEventListener('scroll', function () {
//     // Get the last child of the container
//     const lastChild = container.lastElementChild;

//     if (lastChild) {
//         // Get the position of the last child relative to the viewport
//         const rect = lastChild.getBoundingClientRect();

//         // Check if the last child is fully visible on the screen
//         if (rect.bottom <= window.innerHeight) {
//             // Last child is visible on the screen
//             console.log('Last child is visible on the screen.');
//             // You can perform actions here based on the visibility of the last child.

//             for (let index = 0; index < 5; index++) {
//               container.innerHTML += 
//             `
//             <div class = "post">
//             <div class="header_content">
//                 <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg" alt = "" class = "prof-pic">
//                 <h4>Hello</h4>
//                 <i class='bx bx-dots-vertical'></i>
//             </div>
//             <div class="post_caption">
//                 <h6>hello world</h6>
//             </div>
//             <div class="info">
//                <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg">
//             </div>
//             <div class = "interact_content">
//                 <i class='bx bx-heart' ></i>
                
//                 <script>
                    

//                 </script>
//                 <i class='bx bx-comment-detail' ></i>
                
//             </div>
//         </div>

//         <div class = "post">
//             <div class="header_content">
//                 <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg" alt = "" class = "prof-pic">
//                 <h4>Hello</h4>
//                 <i class='bx bx-dots-vertical'></i>
//             </div>
//             <div class="post_caption">
//                 <h6>hello world</h6>
//             </div>
//             <div class="info">
//                <img src="https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/F00BE1B08EDF40CAAEB9CF788ACC8FA1/ust_F00BE1B08EDF40CAAEB9CF788ACC8FA1.jpg">
//             </div>
//             <div class = "interact_content">
//                 <i class='bx bx-heart' ></i>
                
//                 <script>
                    

//                 </script>
//                 <i class='bx bx-comment-detail' ></i>
                
//             </div>
//         </div>
//             `
//             }
            
//         }
//     }
// });



// let userImageSrc = data.userImageSrc
// let imageSrc = data.imageSrc
// let caption = data.caption
// let likes = data.likes
//  let comments = data.comments

// for (const n of comments) {
//   let username = n.username
//   console.log(username)
// }


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
  var commentsContainer = document.getElementById(commentSectionID);
  console.log(commentsContainer)
  let comments = data.comments;

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
function addComment(commentSectionDiv,textAreaId){
  let commentInput = document.getElementById(textAreaId)
  let commentText = commentInput.value;
  let commentSection = document.getElementById(commentSectionDiv);
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
