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

openModalBtn.addEventListener('click',function(){
    console.log('open')
    modal.show()
}) 


cancelButton.onclick = function () {
  console.log('close cancel')
  modal.hide()

}

//Instructions Variables
const ulInst = document.querySelector('.inst-ul')
var inputInst = document.getElementById('instructions')

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
addRemoveTagBtnEventlistener();
function countTags(){
    input.focus();
    tagNumb.innerText = maxTags - tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
      console.log(tag)
        let liTag = `<li>${tag} <i class="bx bxs-x-circle" ></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}
function createInst(){
    ulInst.querySelectorAll("li").forEach(li => li.remove());
    instArr.slice().reverse().forEach(inst =>{
      console.log(inst)
        let liInst = `<li>${inst} <i class="bx bxs-x-circle" ></i></li>`;
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
//Add element in Tags []
function addTag(e){
  console.log("TAG ADD")
    if(e.key == "Enter"){
      console.log(e.target)
        let tag = e.target.value.replace(/\s+/g, ' ');
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
        if(!instArr.includes(inst)){
                inst.split(',').forEach(inst => {
                  if(inst != ""){
                    instArr.push(inst);
                    createInst();
                    // Create toast? tag sucessfully added?
                  }

                });
            }
            else{
              // Create toast maximum number of tags hit
            }
          e.target.value = "";  
        }
        addRemoveTagBtnEventlistener()
}
//Check for enter in Instructions    
inputInst.addEventListener('keyup', function (e){
  console.log(e.key+ "*INST*")
  if(e.key === 'Enter'){
    e.preventDefault()
      addInst(e)
  }
})
//Remove Btn for Tags
const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});
//Remove Btn for Instructions
const removeInstructionsBtn = document.querySelector('.ins-details button')
removeInstructionsBtn.addEventListener("click", () =>{
    instArr.length = 0;
    ulInst.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});

function addRemoveTagBtnEventlistener(){
  let removeTag = document.getElementsByClassName("bxs-x-circle");
  removeAllListenersFromClass(removeTag)

  for (let index = 0; index < removeTag.length; index++) {
    const element = removeTag[index];
    const text = element.textContent
    element.addEventListener("click", function (e) {
      console.log("clicked")
      console.log()
      remove(e.target,text)
    });
  }
}
//Ensure only 1 event listener is binded
function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function(element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
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