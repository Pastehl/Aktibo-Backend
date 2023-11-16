import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


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

document.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.getElementById('category');
  const estTimeInput = document.getElementById('est_time');
  const instructionsTextarea = document.getElementById('instructions');
  const intensitySelect = document.getElementById('Intensity');
  const nameInput = document.getElementById('name');
  const repsDurationInput = document.getElementById('reps_duration');
  const setsInput = document.getElementById('sets');
  const tagsInput = document.getElementById('tags');
  const videoInput = document.getElementById('video');
  const submitButton = document.getElementById('submitBtn');

  // Add an event listener to the form submit button
  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting (just for demonstration)

    // Get the values of the form fields
    const categoryValue = categorySelect.value;
    const estTimeValue = estTimeInput.value;
    const instructionsValue = instructionsTextarea.value;
    const intensityValue = intensitySelect.value;
    const nameValue = nameInput.value;
    const repsDurationValue = repsDurationInput.value;
    const setsValue = setsInput.value;
    const videoValue = videoInput.value;

    // You can use these values as needed
    console.log('Category:', categoryValue);
    console.log('Estimated Time:', estTimeValue);
    console.log('Instructions:', instructionsValue);
    console.log('Intensity:', intensityValue);
    console.log('Name:', nameValue);
    console.log('Repetitions/Duration:', repsDurationValue);
    console.log('Sets:', setsValue);
    console.log('Video URL:', videoValue);
  });
});

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