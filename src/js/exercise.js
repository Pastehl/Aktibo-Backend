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

//modal
var modal =new bootstrap.Modal('#myModal',{keyboard:false});
console.log(modal)
var videomodal = new bootstrap.Modal('#videoModal');
console.log(videomodal)
var openModalBtn = document.getElementById("addbtn");
var cancelButton = document.getElementById("cancelBtn");
var submitBtn = document.getElementById('submitBtn')
var videoModalSrc = document.getElementById('videoModalBody')
var closeVideoBtn = document.getElementById('closeVideoBtn')
var searchOptionDropdown = document.getElementById('exerciseSearchOption')
var exerciseSearchBtn = document.getElementById('exerciseSearchButton')
var exerciseTextField = document.getElementById('exerciseTextField')



openModalBtn.addEventListener('click',function(){
    clearModal()
    addFileUploadStateEventListener()
    modal.show()
}) 

cancelButton.onclick = function () {
  console.log('close cancel')
  modal.hide()
  clearModal()

}

submitBtn.addEventListener('click',function (){
  if(validateExercise()){
    modal.hide()
  }


})
closeVideoBtn.addEventListener('click', function (){
  videomodal.hide()
})
exerciseSearchBtn.addEventListener('click', function (){
  var selectedValue = searchOptionDropdown.value;

  if(selectedValue == "id"){
    sortBySearchId(exerciseTextField.value)
  }
  if(selectedValue == "name"){
    sortBySearchName(exerciseTextField.value)
  }
  if(selectedValue == "category"){
    sortByCategory()
  }
  if(selectedValue == "intensity"){
    sortByIntensity()
  }
  if(selectedValue == "tags"){
    sortByTags(exerciseTextField.value)
  } 
  exerciseTextField.value = ""
 
})
// editExerciseBtn.addEventListener('click', function() {

// })
//Instructions Variables
const ulInst = document.querySelector('.inst-ul')
var inputInst = document.getElementById('instructions')

// console.log(ulInst)
// console.log(inputInst)
// console.log('-----------------')
let instArr = ['do 1', 'do 2']

//Tags Variables
const ul = document.querySelector(".tags-ul")
var input = document.getElementById("tags")
var tagNumb = document.querySelector(".details-tags span");

// console.log(ul)
// console.log(input)
// console.log(tagNumb)

let maxTags = 10,
tags = ["test1", "test2"];

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
      //console.log(tag)
        let liTag = `<li>${tag} <i class="bx bxs-x-circle tagClose" ></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}
function createInst(){
    ulInst.querySelectorAll("li").forEach(li => li.remove());
    instArr.slice().reverse().forEach(inst =>{
      //console.log(inst)
        let liInst = `<li>${inst} <i class="bx bxs-x-circle instClose" ></i></li>`;
        ulInst.insertAdjacentHTML("afterbegin", liInst);
    });
    inputInst.focus()
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


//Check for enter in Instructions    
inputInst.addEventListener('keyup', function (e){
  console.log(e.key+ "*INST*")
  if(e.key === 'Enter'){
    console.log(e.target.value)
    e.preventDefault()
    inputInst.focus()
    console.log(inputInst.value)
    addInst(e)
  }
})
//Check for enter in tags
input.addEventListener("keydown", function (e) {
    console.log(e.key)
    if(e.key === 'Enter'){
      console.log(e.target.value)
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
      console.log(e.target.value)
        let inst = e.target.value.replace(/\s+/g, ' ');
        console.log(typeof(inst))
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
//TextFields
  var exerciseName = document.getElementById('name')
  var reps = document.getElementById('reps_duration')
  var sets = document.getElementById('sets')
  var mins = document.getElementById('est_time_min')
  var secs = document.getElementById('est_time_sec')

  // Get the values from the inputs
  var exerciseNameValue = exerciseName.value.trim();
  var repsValue = reps.value.trim(); // Treat reps as a string
  var setsValue = parseInt(sets.value); // Treat sets as a string
  var minsValue = parseInt(mins.value, 10);
  var secsValue = parseInt(secs.value, 10);

  // Check if exerciseName is empty
  if (exerciseNameValue === '') {
      showToast('Exercise Name cannot be empty.');
      exerciseName.focus();
      return false;
  }

  // Check if reps and sets are empty strings
  if (repsValue === '' ) {
      showToast('Repetitions/Duration cannot be empty.');
      return false;
  }
  if (isNaN(setsValue) || setsValue < 0) {
      showToast('Sets cannot be non-negative numbers.');
      return false;
  }

  // Check if mins and secs are non-negative numbers
  if (isNaN(minsValue) || isNaN(secsValue) || minsValue < 0 || secsValue < 0) {
      showToast('Mins and Secs must be non-negative numbers.');
      return false;
  }

  //check if instructions and exercise tags are empty
  if(instArr.length === 0) {
    showToast('No instructions placed');
     return false;


  }
  if(tags.length === 0) {
    showToast('Exercise tag is empty');
    return false;
  }



  //Video Validation
  var fileInput = document.getElementById('video');

  // Set the accept attribute to allow only .mp4 files
  fileInput.accept = '.mp4';
  var file = fileInput.files[0]; // Get the selected file

  if (!file) {
    // No file selected
    showToast('Please select a file.');
    return false;
  }
  // Add an event listener to check the file size
  fileInput.addEventListener('change', function() {

// Check if the file type is .mp4 and the size is within the limit (7 MB)
if (file && file.type === 'video/mp4' && file.size <= 7 * 1024 * 1024) {
  return true
} else {
  // Optionally clear the file input to prevent an invalid file from being selected
  showToast('Invalid file. Please select a valid video file (MP4) with a size less than or equal to 7 MB.');
  fileInput.value = '';
  return false
}
  });

  // Clear any previous toast message
  showToast('');

  // You can do further processing here (e.g., submit the form or perform other actions)
  // For this example, we're just logging a success message
  console.log('Exercise is valid:', exerciseNameValue, repsValue, setsValue, minsValue, secsValue);
  return true
}

function addFileUploadStateEventListener(){
  var fileInput = document.getElementById('video');

  // Set the accept attribute to allow only .mp4 files
  fileInput.accept = '.mp4';
  var file = fileInput.files[0]; // Get the selected file

  // Add an event listener to check the file size
  removeAllListenersFromClass(fileInput)
  fileInput.addEventListener('change', function() {

// Check if the file type is .mp4 and the size is within the limit (7 MB)
if (file && file.type === 'video/mp4' && file.size <= 7 * 1024 * 1024) {
} else {
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
function showExercise(doc,exerciseListContainer){
  var exerciseID = doc.id
  var exerciseName = doc.data().name
  var category = doc.data().category
  var intensity = doc.data().intensity
  var tags = doc.data().tags
  var reps_duration = doc.data().reps_duration
  var est_time_min = doc.data().est_time_min
  var est_time_sec = doc.data().est_time_sec
  var instructions = doc.data().instructions
  let instructionsStr = ""
  let est_time = doc.data().est_time
  //var video = doc.data().video
  if(est_time == undefined && est_time_min.length > 0){
    est_time = est_time_min + " mins"
  }
  if(est_time == undefined && est_time_sec.length > 0){
    est_time = est_time_sec + " secs"
  } 
  if(instructions!= null || instructions != undefined)
    for (let index = 0; index < instructions.length; index++) {
      const element = instructions[index];
      instructionsStr += element
    }

  exerciseListContainer.innerHTML+=
  `
  <tr style="background-color: #ffffff;">
    <th scope="col" style="width:8rem;">`+exerciseID+`</th>
    <th scope="col" style="width:12rem;">`+exerciseName+`</th>
    <th scope="col" style="width:10rem;">`+category+`</th>
    <th scope="col" style="width:10rem;">`+intensity+`</th>
    <th scope="col" style="width:10rem;">`+tags+`</th>
    <th scope="col" style="width:12rem;">`+reps_duration+`</th>
    <th scope="col">`+est_time+`</th>
    <th scope="col" style="width:10rem;">`+instructionsStr+`</th>
    <th scope="col" style="width:3rem;"><button type="button" class="btn btn-secondary btn-sm videoPlayerBtn" data-doc-id ="`+doc.id+`"><i class='bx bx-video bx-sm'></i></button></th>
    <th scope="col" style="width:8rem;"><button type="button" class="btn btn-secondary btn-sm editExerciseBtn" data-doc-id ="`+doc.id+`"><i class='bx bx-edit bx-sm'></i></button></th>
  </tr>
  `

addOpenVideoPlayerEventListener()
addEditExercisesEventListener()
}
getExercises()
async function getExercises(){
const q = query(collection(db, "exercises"))//, orderBy("", "asc"));
  const querySnapshot = await getDocs(q);
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })
}

function addOpenVideoPlayerEventListener(){
  var vidPlayerBtn = document.getElementsByClassName('videoPlayerBtn')
  removeAllListenersFromClass(vidPlayerBtn)

  for (let index = 0; index < vidPlayerBtn.length; index++) {
    const element = vidPlayerBtn[index];
    element.addEventListener('click', function (e) {
      addExerciseVideoSrc(element.dataset.docId)
      videomodal.show()

    });
  }
}
function addEditExercisesEventListener(){
  var vidPlayerBtn = document.getElementsByClassName('editExerciseBtn')
  removeAllListenersFromClass(vidPlayerBtn)

  for (let index = 0; index < vidPlayerBtn.length; index++) {
    const element = vidPlayerBtn[index];
    element.addEventListener('click', function (e) {
      //fill in the values
      updateExercises(element.dataset.docId)
      modal.show()

    });
  }
}
function updateExercises(docId){
  console.log("executed")
  clearModal()
  fillModal(docId)
}

async function fillModal(docId){
  var exerciseName = document.getElementById('name')
  var reps = document.getElementById('reps_duration')
  var sets = document.getElementById('sets')
  var est_t = document.getElementById('est_time')
  //var secs = document.getElementById('est_time_sec')
  var category = document.getElementById('category')
  var intensity = document.getElementById('intensity')
  var heading = document.getElementById('heading')
  var video = document.getElementById('video')
  

  const docRef = doc(db, "exercises", docId);
  const docSnap = await getDoc(docRef);  

  //input values
  exerciseName.value = docSnap.data().name;
  exerciseName.disabled = true
  reps.value = docSnap.data().reps_duration;
  sets.value = docSnap.data().sets;
  est_t.value = docSnap.data().est_time;
  category.selectedIndex = 0;
  for (var i = 0; i < category.options.length; i++) {
    if (category.options[i].value === docSnap.data().category) {
        // Set the selectedIndex
        categorySelect.selectedIndex = i;
        break;
    }
  }
  intensity.selectedIndex = 0;
    for (var i = 0; i < intensity.options.length; i++) {
    if (intensity.options[i].value === docSnap.data().intensity) {
        // Set the selectedIndex
        categorySelect.selectedIndex = i;
        break;
    }
  }
  heading.innerHTML = 'Edit Exercise';

  instArr = docSnap.data().instructions
  tags = docSnap.data().tags

  //video source should be a text box
  video.type = 'text';
  video.id = 'videoText';
  video.name = 'videoText';
  video.value = docSnap.data().video;

  countTags();
  createTag();
  createInst()
  addRemoveTagBtnEventlistener();
}

function clearModal(){
  var exerciseName = document.getElementById('name')
  var reps = document.getElementById('reps_duration')
  var sets = document.getElementById('sets')
  var est_t = document.getElementById('est_time')
  var category = document.getElementById('category')
  var intensity = document.getElementById('intensity')
  var heading = document.getElementById('heading')
  var videoText = document.getElementById('video')
  if(videoText == null){
    videoText = document.getElementById('videoText')
  }

  // Clearing input values
  exerciseName.value = '';
  exerciseName.disabled = false

  reps.value = '';
  sets.value = 0;
  est_t.value = ''
  category.selectedIndex = 0;
  intensity.selectedIndex = 0;
  heading.innerHTML  = 'New Exercise';

  // Clearing Tags and Instructions
  instArr = ['do 1', 'do 2']
  tags = ["test1", "test2"];

  // Clearing video source

  videoText.type = 'file';
  videoText.id = 'video';
  videoText.name = 'video';
  
  // video.replaceChild(newFileInput, video);
  
  countTags();
  createTag();
  createInst()
  addRemoveTagBtnEventlistener();

}

async function addExerciseVideoSrc(docId){
  //get the doc id -> get doc src -> update the modal -> close it src = ""
  const docRef = doc(db, "exercises", docId);
  const docSnap = await getDoc(docRef);
  let src = docSnap.data().video
  console.log(src)
  console.log(videoModalSrc.src)
  if(src.length > 0){
    
  }
  videoModalSrc.src = src
}

async function sortByCategory(){
 const q = query(collection(db, "exercises"), orderBy("category","asc"))
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })

}

async function sortByIntensity(){
 const q = query(collection(db, "exercises"), orderBy("intensity","asc"))
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })

}

async function sortByTags(tag){
 const q = query(collection(db, "exercises"), where("tags", "array-contains-any", [tag]))
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })

}

async function sortBySearchName(tag){
  const q = query(collection(db, "exercises"), where("name", "==", tag))
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })

}

async function sortBySearchId(tag){
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  if(tag){
    const docRef = doc(db, "exercises", tag);
    const docSnap = await getDoc(docRef);
    showExercise(docSnap,exerciseListContainer)
  }
  else{
    const q = query(collection(db, "exercises", tag))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
    showExercise(doc,exerciseListContainer)
  })
  }


}