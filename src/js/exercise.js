import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  addDoc,
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
  documentId
} from "firebase/firestore";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL ,uploadBytes } from "firebase/storage";
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
const storage = getStorage();

// redirect user if user is NOT signed in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const userRef = collection(db, "users");
    const docRef = await getDoc(doc(userRef, uid));

    if (docRef.exists()) {
      const isAdmin = docRef.data().isAdmin;

      if (!isAdmin) {
        window.location.href = "dashboard.html";
      }
    } else {
      // Handle the case where the user document doesn't exist
      console.error("User document does not exist");
      // You may want to redirect or handle this case appropriately
    }
  } else {
    // User is signed out
    window.location.href = "index.html";
    // Handle signed-out state if needed
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
var videomodal = new bootstrap.Modal('#videoModal');
var instructionsModal = new bootstrap.Modal('#instructionsModal')
var openModalBtn = document.getElementById("addbtn");
var cancelButton = document.getElementById("cancelBtn");
var submitBtn = document.getElementsByClassName('submitUpdateBtn')
var videoModalSrc = document.getElementById('videoModalBody')
var closeVideoBtn = document.getElementById('closeVideoBtn')
var searchOptionDropdown = document.getElementById('exerciseSearchOption')
var exerciseSearchBtn = document.getElementById('exerciseSearchButton')
var exerciseTextField = document.getElementById('exerciseTextField')


openModalBtn.addEventListener('click',function(){
    clearModal()
    removeAllListeners(document.getElementById('video'))
    addFileUploadStateEventListener()
    removeAllListenersFromClass(submitBtn)
    addSubmitBtnEventListener(submitBtn)
    modal.show()
}) 

cancelButton.onclick = function () {
  console.log('close cancel')
  modal.hide()
  clearModal()

}


function addSubmitBtnEventListener(submitBtn){  
  for (let index = 0; index < submitBtn.length; index++) {
    const element = submitBtn[index];
    element.addEventListener('click',function(){
      if(validateExercise()){
      createNewExerciseDocument()
      clearModal()
      modal.hide()
      removeAllListenersFromClass(submitBtn)
    }
  })
  }
  
}

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
inputInst.addEventListener('keydown', function (e){
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
  console.log("*******")
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
  var est_time = document.getElementById('est_time')

  // Get the values from the inputs
  var exerciseNameValue = exerciseName.value.trim();
  var repsValue = reps.value.trim(); // Treat reps as a string
  var setsValue = parseInt(sets.value); // Treat sets as a string
  var est_timeValue = parseInt(est_time.value, 10);

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
  if (isNaN(setsValue) || setsValue <= 0) {
      showToast('Sets cannot be 0 or non-negative numbers.');
      return false;
  }

  // Check if mins and secs are non-negative numbers
  if (est_time === '') {
      showToast('Estimated Time cannot be empty.');
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
  
  return true
}
function addFileUploadStateEventListener(){
  var fileInput = document.getElementById('video');
  // Set the accept attribute to allow only .mp4 files
  fileInput.accept = '.mp4';

  // Add an event listener to check the file size
  fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    // Check if the file type is .mp4 and the size is within the limit (7 MB)
    if (file != undefined && file.type === 'video/mp4' && file.size <= 7 * 1024 * 1024) {
    } 
  
    else {
      // Optionally clear the file input to prevent an invalid file from being selected
      showToast("Wrong File Type or File Size.")
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
  var exerciseName = doc.data().name
  var category = doc.data().category
  var intensity = doc.data().intensity
  var tags = doc.data().tags
  var reps_duration = doc.data().reps_duration
  var est_time_min = doc.data().est_time_min
  var est_time_sec = doc.data().est_time_sec

  let est_time = doc.data().est_time
  //var video = doc.data().video
  if(est_time == undefined && est_time_min.length > 0){
    est_time = est_time_min + " mins"
  }
  if(est_time == undefined && est_time_sec.length > 0){
    est_time = est_time_sec + " secs"
  } 

  exerciseListContainer.innerHTML+=
  `
  <tr class="row bg-white">
    <th class="col" >` + exerciseName + `</th>
    <th class="col" >` + category + `</th>
    <th class="col" >` + intensity + `</th>
    <th class="col" >` + tags + `</th>
    <th class="col" >` + reps_duration + `</th>
    <th class="col" >` + est_time + `</th>
    <th class="col"><button type="button" class="btn btn-secondary btn-sm instructionBtn" data-doc-id="` + doc.id + `"><i class='bx bx-book-open bx-sm'></i></button></th> 
    <th class="col" ><button type="button" class="btn btn-secondary btn-sm videoPlayerBtn" data-doc-id="` + doc.id + `"><i class='bx bx-video bx-sm'></i></button></th>
    <th class="col" ><button type="button" class="btn btn-secondary btn-sm editExerciseBtn" data-doc-id="` + doc.id + `"><i class='bx bx-edit bx-sm'></i></button></th>
  </tr>

  `

addOpenVideoPlayerEventListener()
addEditExercisesEventListener()
addOpenInstructionEventListener()
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
  removeAllListeners(document.getElementById('video'))
  addFileUploadStateEventListener()
  for (let index = 0; index < vidPlayerBtn.length; index++) {
    const element = vidPlayerBtn[index];
    element.addEventListener('click', function (e) {
      //fill in the values
      updateExercises(element.dataset.docId)
      
      modal.show()

    });
  }
}
function addOpenInstructionEventListener(){
  var instructionBtn = document.getElementsByClassName('instructionBtn')
  removeAllListenersFromClass(instructionBtn)

  for (let index = 0; index < instructionBtn.length; index++) {
    const element = instructionBtn[index];
    element.addEventListener('click', function (e) {
      showInstructionsModal(element.dataset.docId)

    });
  }
}
function addUpdateBtnEventListener(){
  var updateBtn = document.getElementsByClassName('submitUpdateBtn')
  removeAllListenersFromClass(updateBtn)
  for (let index = 0; index < submitBtn.length; index++) {
    const element = updateBtn[index];
    element.addEventListener('click',function(){
      updateExerciseDocument(element.dataset.docId)
    })
  }

  
}
async function updateExercises(docId){

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
  var submitBtn = document.getElementById('submitBtn');

  const docRef = doc(db, "exercises", docId);
  const docSnap = await getDoc(docRef);  

  //input values
  exerciseName.value = docSnap.data().name;
  reps.value = docSnap.data().reps_duration;
  sets.value = docSnap.data().sets;
  est_t.value = docSnap.data().est_time;
  category.selectedIndex = 0;
  for (var i = 0; i < category.options.length; i++) {
    if (docSnap.data().category.toLowerCase().includes(category.options[i].value.toLowerCase())) {
      // Set the selectedIndex
      category.selectedIndex = i;
      break;
    }
  }

  intensity.selectedIndex = 0;
  for (var i = 0; i < intensity.options.length; i++) {
    if (docSnap.data().intensity.toLowerCase().includes(intensity.options[i].value.toLowerCase())) {
      // Set the selectedIndex
      intensity.selectedIndex = i;
      break;
    }
  }
  heading.innerHTML = 'Edit Exercise';

  instArr = docSnap.data().instructions
  tags = docSnap.data().tags


  submitBtn.setAttribute('data-doc-id', docId);
  submitBtn.innerHTML = "Update"
  submitBtn.id = 'updateBtn';
  countTags();
  createTag();
  createInst()
  addRemoveTagBtnEventlistener();
  addUpdateBtnEventListener()

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
  var submitBtn = document.getElementById('submitBtn');

  if(videoText == null){
    videoText = document.getElementById('videoText')
  }
  if(submitBtn == null){
    submitBtn = document.getElementById('updateBtn');
  }
  removeAllListenersFromClass(submitBtn)

  // Clearing input values
  exerciseName.value = '';
  reps.value = '';
  sets.value = 1;
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
  submitBtn.id = 'submitBtn'
  submitBtn.innerHTML = 'Add'
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

async function sortByCategory() {
  const exerciseListContainer = document.getElementById('exerciseListContainer');
  exerciseListContainer.innerHTML = "";

  const inputValue = exerciseTextField.value.trim().toLowerCase();

  // If the input is empty, fetch all exercises sorted by category
  if (!inputValue) {
    const q = query(collection(db, "exercises"), orderBy("category", "asc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      showExercise(doc, exerciseListContainer);
    });
  } else {
    // If the input is not empty, filter exercises by category
    const q = query(collection(db, "exercises"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const cat = doc.data().category.toLowerCase();

      // Check if the category includes the input value
      if (cat.includes(inputValue)) {
        showExercise(doc, exerciseListContainer);
      }
    });
  }
}


async function sortByIntensity() {
  const exerciseListContainer = document.getElementById('exerciseListContainer');
  exerciseListContainer.innerHTML = "";

  const inputValue = exerciseTextField.value.trim().toLowerCase();

  // If the input is empty, fetch all exercises sorted by intensity
  if (!inputValue) {
    const q = query(collection(db, "exercises"), orderBy("intensity", "asc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      showExercise(doc, exerciseListContainer);
    });
  } else {
    // If the input is not empty, filter exercises by intensity
    const q = query(collection(db, "exercises"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const intensity = doc.data().intensity.toLowerCase();

      // Check if the intensity includes the input value
      if (intensity.includes(inputValue)) {
        showExercise(doc, exerciseListContainer);
      }
    });
  }
}


async function sortByTags(tag) {
  const exerciseListContainer = document.getElementById('exerciseListContainer');
  exerciseListContainer.innerHTML = "";

  const inputValue = tag.trim().toLowerCase();

  const q = query(collection(db, "exercises"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const tags = doc.data().tags.map((t) => t.toLowerCase());

    // Check if any tag includes the partial input value
    if (tags.some((t) => t.includes(inputValue))) {
      showExercise(doc, exerciseListContainer);
    }
  });
}

async function sortBySearchName(tag){
  const q = query(collection(db, "exercises"))
  let exerciseListContainer = document.getElementById('exerciseListContainer')
  exerciseListContainer.innerHTML = ""
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
    const lowercaseDocName = doc.data().name.toLowerCase();
    const lowercaseTag = tag.toLowerCase();
    if(lowercaseDocName.includes(lowercaseTag)){
      console.log(lowercaseDocName)
      console.log(doc.id)
      showExercise(doc,exerciseListContainer)
    }
    
  })

}

async function createNewExerciseDocument() {
  var exerciseName = document.getElementById('name').value
  var reps = document.getElementById('reps_duration').value
  var sets = document.getElementById('sets').value
  var est_time = document.getElementById('est_time').value
  var category = document.getElementById('category').value
  var intensity = document.getElementById('intensity').value
  var fileInput = document.getElementById('video')
  var file = fileInput.files[0]


  console.log("Created Document",exerciseName,reps,sets,est_time,category,intensity,file)
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "exercises"), {
      category: category,
      est_time: est_time,
      instructions: instArr,
      intensity: intensity,
      name: exerciseName,
      reps_duration: reps,
      sets: sets,
      tags: tags,
      video: await uploadVideo(file)
    })

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    if (error.code === 'already-exists') {
      // Handle the case where the document with the specified ID already exists
      console.log("Document with ID already exists. Handle accordingly.");
    } else {
      // Handle other errors
      console.error("Error creating document:", error);
    }
  }
}

async function uploadVideo(file) {
    // Upload file and metadata to the object 'exercise_videos/' + file.name
  const storageRef = ref(storage, 'exercise_videos/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log('File available at', downloadURL);
  return downloadURL.toString();

}

async function updateExerciseDocument(docId){
  var exerciseName = document.getElementById('name').value
  var reps = document.getElementById('reps_duration').value
  var sets = document.getElementById('sets').value
  var est_time = document.getElementById('est_time').value
  var category = document.getElementById('category').value
  var intensity = document.getElementById('intensity').value
  var fileLink = document.getElementById('video')
  var file = fileLink.files[0]
  const updateRef = doc(db,"exercises", docId)
  await setDoc(updateRef, {
    category: category,
    est_time: est_time,
    instructions: instArr,
    intensity: intensity,
    name: exerciseName,
    reps_duration: reps,
    sets: sets,
    tags: tags,
    video: uploadVideo(file)
  })

  // Success
  showToast("Exercise updated successfully.")
  clearModal()
  modal.hide()
  getExercises()
}

function removeAllListeners(element) {
  
  if (element) {
    const clone = element.cloneNode(true);
    element.replaceWith(clone);
  } else {
    console.error(`Element with id "${elementId}" not found.`);
  }
}

async function showInstructionsModal(docId) {
  // Get the modal and its body element
  const modal = document.getElementById('instructionsModal');
  const modalBody = modal.querySelector('.modal-body');

  // Get the document data
  const docRef = doc(db, "exercises", docId);
  const docSnap = await getDoc(docRef);
  let instructions = docSnap.data().instructions,
    instructionsStr = "";

  // Clear previous content
  modalBody.innerHTML = "";

  // Check if instructions array is not null or undefined
  if (instructions != null && instructions != undefined) {
    for (let index = 0; index < instructions.length; index++) {
      let ctr = index + 1
      const element = ctr + ". " + instructions[index];
      instructionsStr += element;

      // Create a new paragraph element for each instruction
      const paragraph = document.createElement('p');
      paragraph.textContent = element;
      
      // Append the paragraph to the modal body
      modalBody.appendChild(paragraph);
    }
  }

  // Show the modal
  instructionsModal.show()
}
