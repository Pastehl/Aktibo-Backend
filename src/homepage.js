import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc   } from "firebase/firestore";


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


import "../styles/style.css"

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
      }
    ]
  }

  var main_content = document.getElementById("main_content")
 // main_content.innerHTML = ""



const q = query(collection(db, "moments"));

const querySnapshot = await getDocs(q);
function showAllMoments(){
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    var userImageSrc = doc.data().userImageSrc
    var imageSrc = doc.data().imageSrc
    var caption = doc.data().caption
    var likeCount = doc.data().likes
    let currentPostNumber = 1
    let likeBtnId = 'likeBtn' + currentPostNumber
    let commentBtnId = 'commentBtn' + currentPostNumber
    let commentSectionId = 'commentSectionId' + currentPostNumber
    let commenSectionBtn = 'formBtnId' +currentPostNumber
    let textAreaId = 'textAreaId' +currentPostNumber
    if (!isNaN(likeCount) == false) {
      likeCount = ""
    }

    main_content.innerHTML +=
    `
  <div class = "post">
              <div class="header_content">
                  <img src="`+userImageSrc+`" alt = "" class = "prof-pic">
                  <h4>Hello</h4>
                  <i class='bx bx-dots-vertical'></i>
              </div>
              <div class="post_caption">
                  <h6>`+caption+`</h6>
              </div>
              <div class="info">
                <img src="`+imageSrc+`">
              </div>
              <div class = "interact_content">
                  <i id = '`+likeBtnId+`'class='bx bx-heart' ></i>
                  <span class="button-number">`+likeCount+`</span>

                  
                  <script>
                      

                  </script>
                  <i id = '`+commentBtnId+`' class='bx bx-comment-detail' ></i>
                  <span class="button-number">`+likeCount+`</span>

                  
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
showFirstComment(commentSectionId)
console.log("Ran " ,currentPostNumber)
  currentPostNumber+=1
  // like button press
  const likeBtn = document.getElementById(likeBtnId)
  likeBtn.addEventListener('click',function(){
      toggleLike(likeBtn)
  })
  const commentBtn = document.getElementById(commentBtnId)
  commentBtn.addEventListener('click',function(){
    displayComments(commentSectionId)
  })

  // add new comment
  const sendComment = document.getElementById(commenSectionBtn)
  sendComment.addEventListener('click',function(){
    addComment(commentSectionId,textAreaId)
  })
    

  });  
}
showAllMoments()

var test = false
function hello(){
  if(test){
    console.log("1234")
    return
  }

  console.log("4321")
  
}
hello()

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
// let comments = data.comments

// for (const n of comments) {
//   let username = n.username
//   console.log(username)
// }


function toggleLike(likeBtn){
 if (likeBtn.classList.contains('liked')) {
    likeBtn.classList.remove('liked');
    likeBtn.classList.remove('bxs-heart');
    likeBtn.classList.add('bx-heart');
    console.log('removed 1 like')
    decrementLikes('doc2')

  } else {
    likeBtn.classList.add('liked');
    likeBtn.classList.remove('bx-heart');
    likeBtn.classList.add('bxs-heart');
    console.log('added 1 like')
    incrementLikes('doc2')
  }
}

// JavaScript functions to open, close, and add comments
function displayComments(commentSectionID) {
  commentSectionID = String(commentSectionID)
  console.log(commentSectionID)
  var commentsContainer = document.getElementById(commentSectionID);

  let comments = data.comments
  if(commentsContainer != null){
    for (const n of comments) {
  commentsContainer.innerHTML += `
  <div class = "usr-profile"style="display: flex; align-items: center; align-items: flex-start; ">
                 <img src="${n.userImageSrc}" alt = "" class = "prof-pic">
                   <div>
                   <p class = "usr-name"> ${n.username}</p>
                   <div class = "usr-comment" style="display: flex; align-items: center; justify-content: space-between;">
                        <p> ${n.comment}</p>
                    </div>
                 </div>
                   
                </div>               
  `
}
  }


  
}

//add comment
function addComment(commentSectionDiv,textAreaId){
  let commentInput = document.getElementById(textAreaId)
  let commentText = commentInput.value;
  console.log(commentText);
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


//show 1 comment
function showFirstComment(commentSectionID){
  let comments = data.comments
  var commentsContainer = document.getElementById(commentSectionID);

   for (const n of comments) {
      console.log(n)

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
    console.log("Reach")
    // Exit the loop after the first iteration
    break;
  }
}
 
// Function to increment likes
async function incrementLikes(docId) {
  const docRef = doc(db, "moments", docId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data())
  var likes = docSnap.data().likes
  
  console.log(likes)
  if(!isNaN(likes) == false ){
    await updateDoc(docRef, {
    likes: 1
  });
  }
  else{
    await updateDoc(docRef, {
    likes: likes + 1
  });
  }
  // main_content.innerHTML = ""
  //  showAllMoments()
}

// Function to decrement likes
async function decrementLikes(docId) {
  const docRef = doc(db, "moments", docId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data())
  var likes = docSnap.data().likes
  if(likes -1 == 0){
    await updateDoc(docRef, {
    likes: ""
  });}
  else{
    await updateDoc(docRef, {
    likes: likes - 1
  });
  }
  
}