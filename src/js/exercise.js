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

document.getElementById("logout_btn").addEventListener("click",function(){
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "index.html";

      }).catch((error) => {
        // An error happened.
      });
      
})

// document.getElementById('newExerciseButton').addEventListener('click',function(){
//     window.location.href = "exerciseForms.html";

// })

//modal
var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("addbtn");
var closeModalBtn = document.getElementsByClassName("close")[0];
var cancelButton = document.querySelector(".cancel-button");

openModalBtn.onclick = function () {
  modal.style.display = "block";
}

closeModalBtn.onclick = function () {
  modal.style.display = "none";
}

cancelButton.onclick = function () {
  modal.style.display = "none";
}

// Handle form submission
var exerciseForm = document.getElementById("exerciseForm");

exerciseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  // You can add code to handle form submission here, e.g., sending data to a server
  modal.style.display = "none"; // Close the modal after submission
});


const ul = document.querySelector("tag-list"),
input = document.querySelector("tag-input"),
tagNumb = document.querySelector(".details span");

let maxTags = 10,
tags = ["coding", "nepal"];

countTags();
createTag();

function countTags(){
    input.focus();
    tagNumb.innerText = maxTags - tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <i class='bx bxs-x-circle' onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}

function remove(element, tag){
    let index  = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTags();
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' ');
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < 10){
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    createTag();
                });
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);

const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});
