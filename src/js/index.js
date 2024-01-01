import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, multiFactor, getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier   } from "firebase/auth";
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

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid;
        const userRef = collection(db, "users");
        
        try {
            const docSnapshot = await getDoc(doc(userRef, uid));

            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();

                if (userData.isAdmin) {
                    // Redirect to the homepage for administrators
                    window.location.href = "homepage.html";
                } else {
                    // Redirect to the dashboard for regular users
                    window.location.href = "dashboard.html";
                }
            } else {
                console.log("User data not found. Please register.");
                // Handle the case where user data is not found (not an existing user)
                // You might want to show an error message or take appropriate action.
            }
        } catch (error) {
            console.error("Error checking user data:", error);
        }
    } else {
        // User is signed out
        // Handle signed-out state or redirect to a login page
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
         isExistingUser(user.uid)
                .then((exists) => {
                    if (exists) {
                        console.log("reached")

                        // Redirect to the appropriate page for existing users
                        redirectPage(user);
                    } else {
                        // Handle case where the user is not an existing user
                        showToast("User not found. Please register on the mobile application.");
                        // You might want to show an error message or take appropriate action.
                    }
                })
                .catch((error) => {
                    console.error("Error checking if user exists:", error);
                });

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

      if(error.code == 'auth/multi-factor-auth-required'){
        const resolver = getMultiFactorResolver(auth, error);
        console.log(resolver)
            // Ask user which second factor to use.
            if (resolver.hints[0].factorId ===
                PhoneMultiFactorGenerator.FACTOR_ID) {
                const phoneInfoOptions = {
                    multiFactorHint: resolver.hints[0],
                    session: resolver.session
                };
                const phoneAuthProvider = new PhoneAuthProvider(auth);
                // Send SMS verification code
                return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, RecaptchaVerifier)
                    .then(function (verificationId) {
                      clearInputContents()
                      modal2fa.show()

                        // Ask user for the SMS verification code. Then:
                        const cred = PhoneAuthProvider.credential(
                            verificationId, getInputs());
                        const multiFactorAssertion =
                            PhoneMultiFactorGenerator.assertion(cred);
                        // Complete sign-in.
                        return resolver.resolveSignIn(multiFactorAssertion)
                    })
                    .then(function (userCredential) {
                        // User successfully signed in with the second factor phone number.
                    });
                    
            }
        }
      else if (error.code == 'auth/wrong-password') {
               // Handle other errors such as wrong password.
      }
  });
});

async function redirectPage(docRef){
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
        showToast("Account is not yet registered. Please create an account in our mobile application.")
      }
}

// function recreateElement(elementID){
//   var old_element = document.getElementById(elementID);
//   var new_element = old_element.cloneNode(true);
//   old_element.parentNode.replaceChild(new_element, old_element);
// }

var openModalBtn = document.getElementById("2faOpen");
var modal2fa = new bootstrap.Modal('#otpModal');

openModalBtn.addEventListener('click',function(){
  modal2fa.show()
})
var cancelBtn = document.getElementById('CancelBtn')

cancelBtn.addEventListener('click', function(){
  clearInputContents()
  modal2fa.hide()

})


const inputs = document.getElementById("inputs");
inputs.addEventListener("input", function(){
  const inputElements = document.querySelectorAll('#inputs .input');
  const submitButton = document.getElementById('optConfirmBtn');
  
  const allInputsFilled = Array.from(inputElements).every(input => input.value.trim() !== '');

  submitButton.disabled = !allInputsFilled;
})       
inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;

  if (isNaN(val)) {
    target.value = "";
    return;
  }

  if (val != "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    target.value = ""
    const prev = target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
    return;
  }
});

function getInputs(){
  const inputElements = document.querySelectorAll('#inputs .input');
  let resultString = '';

  inputElements.forEach(input => {
    resultString += input.value;
  });

  console.log(resultString);
  return resultString;
}
function clearInputContents() {
  const inputElements = document.querySelectorAll('#inputs .input');

  inputElements.forEach(input => {
    input.value = '';
  });
}

function showToast(message) {
  var toastContainer = document.querySelector('.toast-container');
  var toastBody = document.querySelector('.toast-body');

  // Set the toast message
  toastBody.textContent = message;

  // Show the toast
  var toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
}

async function isExistingUser(userId) {
const userRef = collection(db, "users");
      const docRef = await getDoc(doc(userRef, userId));

      if (docRef.exists()) {
        redirectPage(docRef)
      }
}