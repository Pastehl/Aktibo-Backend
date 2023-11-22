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
  arrayRemove
} from "firebase/firestore";
import * as bootstrap from 'bootstrap'
// import {Modal} from "bootstrap/dist/js/bootstrap.bundle";

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

// document.getElementById('newExerciseButton').addEventListener('click',function(){
//     window.location.href = "exerciseForms.html";

// })

//modal
var modal =new bootstrap.Modal('#myModal',{keyboard:false});
var openModalBtn = document.getElementById("addbtn");
var cancelButton = document.getElementById("cancelBtn");
var submitBtn = document.getElementById('submitBtn')


openModalBtn.addEventListener('click',function(){
    console.log('open')
    modal.show()
}) 

cancelButton.onclick = function () {
  console.log('close cancel')
  modal.hide()

}

submitBtn.addEventListener('click',function (){
  if(validateExercise()){
    modal.hide()
  }


})

//Instructions Variables
const ulInst = document.querySelector('.inst-ul')
var inputInst = document.getElementById('instructions')
console.log(ulInst)
console.log(inputInst)
console.log('-----------------')
let instArr = ['do 1', 'do 2']

//Tags Variables
const ul = document.querySelector(".tags-ul")
var input = document.getElementById("tags")
var tagNumb = document.querySelector(".details-tags span");

console.log(ul)
console.log(input)
console.log(tagNumb)

let maxTags = 10,
tags = ["coding", "nepal"];

countTags();
createTag();
createInst()
addRemoveTagBtnEventlistener();
function countTags(){
    input.focus();
    tagNumb.innerText = maxTags - tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
      console.log(tag)
        let liTag = `<li>${tag} <i class="bx bxs-x-circle tagClose" ></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}
function createInst(){
    ulInst.querySelectorAll("li").forEach(li => li.remove());
    instArr.slice().reverse().forEach(inst =>{
      console.log(inst)
        let liInst = `<li>${inst} <i class="bx bxs-x-circle instClose" ></i></li>`;
        ulInst.insertAdjacentHTML("afterbegin", liInst);
    });
}


function remove(element, tag){

    console.log(tags)
    tags.splice(tags.indexOf(tag), 1);
    console.log('after')
    element.parentElement.remove();
    console.log(tags)
    countTags();
}
function removeInst(element, inst){
    console.log(instArr)
    instArr.splice(instArr.indexOf(inst), 1);
    console.log('after')
    element.parentElement.remove();
    console.log(instArr)
}
//Add element in Tags []
function addTag(e){
  console.log("TAG ADD")
    if(e.key == "Enter"){
      console.log(e.target)
        let tag = e.target.value.replace(/\s+/g, ' ');
        console.log(tag)
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < 10){
                tag.split(',').forEach(tag => {
                  if(tag != ""){
                    tags.push(tag);
                    createTag();
                    // Create toast? tag sucessfully added?
                  }

                });
            }
            else{
              // Create toast maximum number of tags hit
            }
        }
        e.target.value = "";
    }
    addRemoveTagBtnEventlistener()
}
//Check for enter in tags
input.addEventListener("keyup", function (e) {
    console.log(e.key)
    if(e.key === 'Enter'){
      e.preventDefault()  
      input.focus()
      addTag(e)
  }
});
//Check for enter in Instructions
function addInst(e){
  console.log("Instruction ADD")
    if(e.key == "Enter"){
      console.log("*******")
      console.log(e.target)
        let inst = e.target.value.replace(/\s+/g, ' ');
        console.log(inst)
        if(!instArr.includes(inst)){
                inst.split(',').forEach(inst => {
                  if(inst != ""){
                    instArr.push(inst);
                    console.log(instArr)
                    createInst();
                    // Create toast? tag sucessfully added?
                  }

                });
            }

          e.target.value = "";  
        }
        addRemoveTagBtnEventlistener()
}
//Check for enter in Instructions    
inputInst.addEventListener('keyup', function (e){
    
  if(e.key === 'Enter'){
    console.log(e.key+ "*INST*")
    e.preventDefault()
    inputInst.focus()
    addInst(e)
  }
})
//Remove Btn for Tags
const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    input.value = ""
    countTags();
});
//Remove Btn for Instructions
const removeInstructionsBtn = document.querySelector('.ins-details button')
removeInstructionsBtn.addEventListener("click", () =>{
    ulInst.querySelectorAll("li").forEach(li => li.remove());
    inputInst.value = ""
});

function addRemoveTagBtnEventlistener(){
  let removeTag = document.getElementsByClassName("bxs-x-circle");
  removeAllListenersFromClass(removeTag)
  let elemClassList = ""
  for (let index = 0; index < removeTag.length; index++) {
    const element = removeTag[index];
    const text = element.textContent
    elemClassList = element.classList

    if(elemClassList.contains("instClose")){
      element.addEventListener("click", function (e) {
      console.log("clicked")
      console.log()
      removeInst(e.target,text)
    });
    }
    else{
      element.addEventListener("click", function (e) {
      console.log("clicked")
      console.log()
      remove(e.target,text)
    });
    }

  }
}
//Ensure only 1 event listener is binded
function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function(element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}

//Text Field Validation
function validateExercise() {
  // Get the input elements and error message span
//TextFields
  var exerciseName = document.getElementById('name')
  var reps = document.getElementById('reps_duration')
  var sets = document.getElementById('sets')
  var mins = document.getElementById('est_time_min')
  var secs = document.getElementById('est_time_sec')

  // Get the values from the inputs
  var exerciseNameValue = exerciseName.value.trim();
  var repsValue = reps.value.trim(); // Treat reps as a string
  var setsValue = sets.value.trim(); // Treat sets as a string
  var minsValue = parseInt(mins.value, 10);
  var secsValue = parseInt(secs.value, 10);

  // Check if exerciseName is empty
  if (exerciseNameValue === '') {
      showToast('Exercise Name cannot be empty.');
      exerciseName.focus();
      return false;
  }

  // Check if reps and sets are empty strings
  if (repsValue === '' || setsValue === '') {
      showToast('Reps and Sets cannot be empty.');
      return false;
  }

  // Check if mins and secs are non-negative numbers
  if (isNaN(minsValue) || isNaN(secsValue) || minsValue < 0 || secsValue < 0) {
      showToast('Mins and Secs must be non-negative numbers.');
      return false;
  }

  // Clear any previous toast message
  showToast('');

  // You can do further processing here (e.g., submit the form or perform other actions)
  // For this example, we're just logging a success message
  console.log('Exercise is valid:', exerciseNameValue, repsValue, setsValue, minsValue, secsValue);
  return true
}

//Video Validation
  function configureFileInput() {
    // Get the file input element by its ID
    var fileInput = document.getElementById('video');

    // Set the accept attribute to allow only .mp4 files
    fileInput.accept = '.mp4';

    // Add an event listener to check the file size
    fileInput.addEventListener('change', function() {
      var file = fileInput.files[0]; // Get the selected file

      // Check if the file type is .mp4 and the size is within the limit (7 MB)
      if (file && file.type === 'video/mp4' && file.size <= 7 * 1024 * 1024) {
        console.log('File is valid.');
      } else {
        alert('Please select a valid .mp4 file with a size up to 7 MB.');
        // Optionally clear the file input to prevent an invalid file from being selected
        fileInput.value = '';
      }
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