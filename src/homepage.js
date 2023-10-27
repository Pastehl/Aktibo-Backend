import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


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

var main_content = document.getElementById("main_content")
// main_content.innerHTML = ""

const q = query(collection(db, "moments"));

const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());

//   var userImageSrc = doc.data().userImageSrc
//   var imageSrc = doc.data().imageSrc
//   var caption = doc.data().caption
//   let currentPostNumber = 1
//   let likeBtnId = 'likeBtn' + currentPostNumber
//   let commentBtnId = 'commentBtn' + currentPostNumber
//   var commentsContainer = document.getElementById("commentContainer");

  
//   main_content.innerHTML +=
//   `
// <div class = "post">
//             <div class="header_content">
//                 <img src="`+userImageSrc+`" alt = "" class = "prof-pic">
//                 <h4>Hello</h4>
//                 <i class='bx bx-dots-vertical'></i>
//             </div>
//             <div class="post_caption">
//                 <h6>`+caption+`</h6>
//             </div>
//             <div class="info">
//                <img src="`+imageSrc+`">
//             </div>
//             <div class = "interact_content">
//                 <i id = '`+likeBtnId+`'class='bx bx-heart' ></i>
//                 <span class="button-number">5 likes</span>

                
//                 <script>
                    

//                 </script>
//                 <i id = '`+commentBtnId+`' class='bx bx-comment-detail' ></i>
//                 <span class="button-number">5 comments</span>

                
//             </div>
//             <div id="commentContainer">
//               <!-- Loop through the comments and add them here -->
//              </div>
//         </div>
// `
// currentPostNumber+=1
// // like button press
// const likeBtn = document.getElementById(likeBtnId)
// likeBtn.addEventListener('click',function(){
//     toggleLike(likeBtn)
// })
// const commentBtn = document.getElementById(commentBtnId)
// commentBtn.addEventListener('click',function(){
//   displayComments()
// })

// });

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
window.addEventListener('scroll', function () {
    // Get the last child of the container
    const lastChild = container.lastElementChild;

    if (lastChild) {
        // Get the position of the last child relative to the viewport
        const rect = lastChild.getBoundingClientRect();

        // Check if the last child is fully visible on the screen
        if (rect.bottom <= window.innerHeight) {
            // Last child is visible on the screen
            console.log('Last child is visible on the screen.');
            // You can perform actions here based on the visibility of the last child.

            for (let index = 0; index < 5; index++) {
              container.innerHTML += 
            `
            <div class = "post">
            <div class="header_content">
                <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg" alt = "" class = "prof-pic">
                <h4>Hello</h4>
                <i class='bx bx-dots-vertical'></i>
            </div>
            <div class="post_caption">
                <h6>hello world</h6>
            </div>
            <div class="info">
               <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg">
            </div>
            <div class = "interact_content">
                <i class='bx bx-heart' ></i>
                
                <script>
                    

                </script>
                <i class='bx bx-comment-detail' ></i>
                
            </div>
        </div>

        <div class = "post">
            <div class="header_content">
                <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/12/01/Untitled%20design.jpg" alt = "" class = "prof-pic">
                <h4>Hello</h4>
                <i class='bx bx-dots-vertical'></i>
            </div>
            <div class="post_caption">
                <h6>hello world</h6>
            </div>
            <div class="info">
               <img src="https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/F00BE1B08EDF40CAAEB9CF788ACC8FA1/ust_F00BE1B08EDF40CAAEB9CF788ACC8FA1.jpg">
            </div>
            <div class = "interact_content">
                <i class='bx bx-heart' ></i>
                
                <script>
                    

                </script>
                <i class='bx bx-comment-detail' ></i>
                
            </div>
        </div>
            `
            }
            
        }
    }
});

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
  } else {
    likeBtn.classList.add('liked');
    likeBtn.classList.remove('bx-heart');
    likeBtn.classList.add('bxs-heart');
    console.log('added 1 like')

  }
}

// JavaScript functions to open, close, and add comments
function displayComments() {
  var commentsContainer = document.getElementById("commentContainer");

  let comments = data.comments

for (const n of comments) {

  commentsContainer.innerHTML += `
<div class="container my-5 py-5 text-dark">
  <div class="row d-flex justify-content-center">
    <div class="col-md-11 col-lg-9 col-xl-7">
      <div class="d-flex flex-start mb-4">
        <!-- User Image -->
        <img class="rounded-circle shadow-1-strong me-3"
          src="${n.userImageSrc}" alt="avatar" width="65"
          height="65" />

        <div class="card w-100">
          <div class="card-body p-4">
            <!-- User Name -->
            <h5>${n.username}</h5>


            <!-- Comment -->
            <p>
              ${n.comment}
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  `
}

  
}



document.getElementById('commentBtn').addEventListener('click',function(){
  let commentInput = document.getElementById('commentInput')
  let commentText = commentInput.value;
  console.log(commentText);
  let commentSection = document.getElementById('comment-section');
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

})
