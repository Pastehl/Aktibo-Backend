import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
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
import '../scss/styles.scss';

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

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    const userRef = collection(db, "users");
    const docRef = await getDocs(userRef)
    docRef.forEach((doc) => {
    onAuthStateChanged(auth, (user) => {
    if(user.isAdmin){
      window.location.href = "homepage.html";
      }
    });
    window.location.href = "dashboard.html";

  });
  } 
  else {

    // User is signed out
    // ...
    
  }
});

let googleLoginButton = document.getElementById("googleLoginButton");
googleLoginButton.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        redirectPage(user)

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
});

async function redirectPage(user){
const uid = user.uid;
      const userRef = collection(db, "users");
      const docRef = await getDoc(doc(userRef, uid));

      if (docRef.exists()) {
        const isAdmin = docRef.data().isAdmin;

        if (isAdmin === true) {
          window.location.href = "homepage.html";
        } else if (isAdmin === false) {
          window.location.href = "dashboard.html";
        } else {
          // isAdmin is null or undefined, handle appropriately (redirect to a default page, etc.)
          console.error("isAdmin is not defined or null, redirecting to default page");
          window.location.href = "dashboard.html";
        }
      } else {
        // Handle the case where the user document doesn't exist
        console.error("User document does not exist");
        // You may want to redirect or handle this case appropriately
      }
}