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
  arrayRemove,
  serverTimestamp,
  Timestamp  
} from "firebase/firestore";
import * as bootstrap from "bootstrap";
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
//const { google } = require('googleapis');

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// redirect user if user is NOT signed in



// Import our custom CSS
import '../scss/styles.scss';


const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

document.querySelector('table').onclick = ({
  target
}) => {
  if (!target.classList.contains('more')) return
  document.querySelectorAll('.dropout.active').forEach(
    (d) => d !== target.parentElement && d.classList.remove('active')
  )
  target.parentElement.classList.toggle('active')
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdownContainer = document.getElementById("dropdown-container");
    const dropdownContent = document.getElementById("dropdown-content");

    dropdownContainer.addEventListener("click", function (event) {
      console.log(dropdownContent)
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
        
    });
});





window.onload = function(){

  let spinner = document.getElementById("spinner");
  let ctx = spinner.getContext("2d");
  let width = spinner.width;
  let height = spinner.height;
  let degrees = 0;
  let new_degrees = 0;
  let difference = 0;
  let color = "turquoise";
  let bgcolor = "#222";
  let text;
  let text_width;
  let animation_loop, redraw_loop;

  // Set your totalSteps and currentSteps variables
  let totalSteps = 100;
  let currentSteps = 75;

  function init() {
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 30;
    ctx.arc(width/2, width/2, 100, 0, Math.PI*2, false);
    ctx.stroke();

    let radians = (degrees / 360) * 2 * Math.PI;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 30;
    ctx.arc(width/2, height/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = "50px arial";
    text = Math.floor(degrees/360*100);
    text_width = ctx.measureText(text).width;
    ctx.fillText(text, width/2 - text_width/2, height/2 + 15);
  }

  function draw() {
    if (typeof animation_loop != undefined) clearInterval(animation_loop);
    new_degrees = (currentSteps / totalSteps) * 360;
    difference = new_degrees - degrees;
    animation_loop = setInterval(animate_to, 100/difference);
  }

  function animate_to() {
    if (degrees >= new_degrees) {
      clearInterval(animation_loop);
    } else {
      degrees++;
      init();
    }
  }

  draw();
}
