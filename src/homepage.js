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
main_content.innerHTML = ""

const q = query(collection(db, "moments"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());

  var userImageSrc = doc.data().userImageSrc
  var imageSrc = doc.data().imageSrc
  var caption = doc.data().caption

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
                <i class='bx bx-heart' ></i>
                
                <script>
                    

                </script>
                <i class='bx bx-comment-detail' ></i>
                
            </div>
        </div>
`
});

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
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png" alt = "" class = "prof-pic">
                <h4>Hello</h4>
                <i class='bx bx-dots-vertical'></i>
            </div>
            <div class="post_caption">
                <h6>hello world</h6>
            </div>
            <div class="info">
               <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png">
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
