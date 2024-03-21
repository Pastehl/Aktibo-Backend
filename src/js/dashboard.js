import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import "chart.js";
import "jquery";
import "popper.js";
import "bootstrap";

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
  documentId,
} from "firebase/firestore";
import * as bootstrap from "bootstrap";
import "../scss/styles.scss";
import { main, start } from "@popperjs/core";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

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

const ctx = document.getElementById("myChart"); //steps
const ctx2 = document.getElementById("myChart2"); //calories burned
const ctx3 = document.getElementById("myChart3"); //bar steps per day
const ctx4 = document.getElementById("myChart4"); //line weight per day
const ctx5 = document.getElementById("myChart5"); //total cal
const ctx6 = document.getElementById("myChart6"); //carbs
const ctx7 = document.getElementById("myChart7"); //protien
const ctx8 = document.getElementById("myChart8"); //fats

var downloadChoiceModal = new bootstrap.Modal("#downloadChoiceModal");
var food_recordModal = new bootstrap.Modal("#viewRecipeModal");
var dataModal = new bootstrap.Modal("#dataModal");
var closedownloadChoiceModalBtn = document.getElementById("closedownloadChoiceModalBtn");
var closeFood_RecordModalBtn =  document.getElementById("viewRecipeModalBtn");
var closeDataModalBtn = document.getElementById("dataModalBtn");
var downloadPDFBtn = document.getElementById("downloadPDF");
var downloadXLSX = document.getElementById("downloadXLSX");

closeDataModalBtn.addEventListener("click", function () {
  dataModal.hide();
});
closedownloadChoiceModalBtn.addEventListener("click", function () {
  downloadChoiceModal.hide();
});
closeFood_RecordModalBtn.addEventListener("click", function () {
  food_recordModal.hide();
});
downloadPDFBtn.addEventListener("click", function () {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log(uid);
      const userRef = collection(db, "users");
      const docRef = await getDoc(doc(userRef, uid));
      //const docRef = await getDoc(doc(userRef, '0y9Kkgd303QrsKSuXzKvqG2DI4E2'));
      generatePDF(docRef.data().weightRecords);
    }
  });
  downloadChoiceModal.hide();
});
downloadXLSX.addEventListener("click", function () {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log(uid);
      const userRef = collection(db, "users");
      const docRef = await getDoc(doc(userRef, uid));
      //const docRef = await getDoc(doc(userRef, '0y9Kkgd303QrsKSuXzKvqG2DI4E2'));
      generateExcel(docRef.data().weightRecords);
    }
  });
  downloadChoiceModal.hide();
});

// redirect user if user is NOT signed in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    console.log(uid);
    const userRef = collection(db, "users");
    const docRef = await getDoc(doc(userRef, uid));
    if (!docRef.exists()) {
      // User is signed out
      window.location.href = "index.html";
      // Handle signed-out state if needed
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

//User Data
async function getUserRecord() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      const userRef = collection(db, "users");
      //const docRef = await getDoc(doc(userRef, uid));
      const docRef = await getDoc(doc(userRef, "0y9Kkgd303QrsKSuXzKvqG2DI4E2"));
      setUserData(docRef);
    }
  });
}
function setUserData(docSnap) {
  let weight = docSnap.data().weight;
  let height = docSnap.data().height;
  let bmi;

  if (weight == undefined || height == undefined) {
    bmi = 0;
  } else {
    bmi = weight / (height / 100) ** 2;
  }

  let exercise_dates = docSnap.data().exerciseRecords;

  let steps = docSnap.data().totalSteps;
  if (steps == undefined) {
    steps = 1;
  }

  let caloriesBurned = docSnap.data().totalCaloriesBurned;
  if (caloriesBurned == undefined) {
    caloriesBurned = 1;
  }

  let dailyStepsCount = docSnap.data().dailyStepCounts;
  let dailyWeightRecords = docSnap.data().weightRecords;
  let mealRecords = docSnap.data().mealRecords;

  //Get Extracted Values
  let weekStepData = getWeekStepData(dailyStepsCount); // Array Week Steps Count
  let weekWeightData = getWeekWeightData(dailyWeightRecords); // Array Week Weight Count
  let macros = getTodayMealData(mealRecords); // Daily Macros
  setBMI(bmi.toFixed(1));
  addgenerate_reportsBtnEventListener(docSnap.id);
  addFood_RecordBtnEventListener(docSnap.id);
  let calendarDates = callCalendar(exercise_dates); // Arraw Monthly Plot Points

  // Call setChartData to update the doughnut charts
  // Update doughnut chart for steps
  const stepsChartCtx = ctx; // Assuming myChart is the ID of the doughnut chart for steps

  setChartData(
    stepsChartCtx,
    [steps, 10000 - steps],
    ["rgb(99,169,31)", "rgb(40,54,26)"],
    [doughnutt_Steps],
    { textValue: "10000" }
  );

  // Update doughnut chart for calories burned
  const caloriesChartCtx = ctx2; // Assuming myChart2 is the ID of the doughnut chart for calories
  setChartData(
    caloriesChartCtx,
    [caloriesBurned, 2500 - caloriesBurned],
    ["rgb(255,127,17)", "rgb(243,223,194)"],
    [doughnutt_Calories]
  );
  setChartData(
    ctx5,
    [macros[0], 2500],
    ["rgb(255,0,0)", "rgb(255,114,118)"],
    [redGraph],
    { maintainAspectRatio: false }
  );
  setChartData(
    ctx6,
    [macros[1], 150],
    ["rgb(0, 0, 255)", "rgb(37, 207, 240)"],
    [blueGraph]
  );
  setChartData(
    ctx7,
    [macros[2], 150],
    ["rgb(218, 165, 32)", "rgb(255, 192, 0)"],
    [yellowGraph]
  );
  setChartData(
    ctx8,
    [macros[3], 150],
    ["rgb(54, 69, 79)", "rgb(115, 147, 179)"],
    [grayGraph]
  );
  setBarData(ctx3, weekStepData);
  setLineData(ctx4, weekWeightData);
  document.addEventListener("DOMContentLoaded", setCalendarData(calendarDates));
}

getUserRecord();

//Green Test Graph
//Template for Graph
// const doughnut_Steps = {
//   id: "doughnut_Steps",
//   beforeDatasetsDraw(chart, args, pluginOptions) {
//     const { ctx, data } = chart;
//     ctx.save();
//     const xCoor = chart.getDatasetMeta(0).data[0].x;
//     const yCoor = chart.getDatasetMeta(0).data[0].y;
//     ctx.font = "bold 30px sans-serif"; //text formatting
//     ctx.fillStyle = "rgb(99,169,31)";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(`Steps`, xCoor, yCoor); //Change first argument to change text inside the circle

//     var bottomText = "Steps";
//     var bottomTextX = ctx.canvas.width / 2;
//     var bottomTextY = ctx.canvas.height;
//     ctx.fillStyle = "#000";
//     ctx.font = "20px sans-serif"; //text formatting
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(bottomText, bottomTextX, bottomTextY);
//   },
// };

//modified doughnut_Steps
const doughnutt_Steps = {
  id: "doughnut_Steps",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    // console.log(pluginOptions);
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1.3rem sans-serif";
    ctx.fillStyle = "rgb(99,169,31)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textValue = data.datasets[0].data[0] ?? "0"; // Extract textValue from pluginOptions or use a default value
    // console.log(data.datasets[0].data[0]);
    ctx.fillText(textValue, xCoor, yCoor);
  },
};

//Orange Time Graph
//Template for Graph
// const doughnut_Calories = {
//   id: "doughnut_Calories",
//   beforeDatasetsDraw(chart, args, pluginOptions) {
//     const { ctx, data } = chart;
//     ctx.save();
//     const xCoor = chart.getDatasetMeta(0).data[0].x;
//     const yCoor = chart.getDatasetMeta(0).data[0].y;
//     ctx.font = "bold 30px sans-serif"; //text formatting
//     ctx.fillStyle = "rgb(255,127,17)";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(`Calories`, xCoor, yCoor); //Change first argument to change text inside the circle

//     var bottomText = "Calories Burned";
//     var bottomTextX = ctx.canvas.width / 2;
//     var bottomTextY = ctx.canvas.height - 80;
//     ctx.fillStyle = "#000";
//     ctx.font = "20px sans-serif"; //text formatting
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(bottomText, bottomTextX, bottomTextY);
//   },
// };

//modified dougnut_Calories
const doughnutt_Calories = {
  id: "doughnut_Calories",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1.3rem sans-serif"; //text formatting
    ctx.fillStyle = "rgb(255,127,17)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].data[0] ?? "0", xCoor, yCoor); //Change first argument to change text inside the circle

    // var bottomText = "Calories Burned";
    // var bottomTextX = ctx.canvas.width / 2;
    // var bottomTextY = ctx.canvas.height - 80;
    // ctx.fillStyle = "#000";
    // ctx.font = "20px sans-serif"; //text formatting
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(bottomText, bottomTextX, bottomTextY);
  },
};

//Red Graph
const redGraph = {
  id: "redGraph",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1.5rem sans-serif"; //text formatting
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${data.datasets[0].data[0]}` ?? "0", xCoor, yCoor); //Change first argument to change text inside the circle
  },
};

//Blue Graph
const blueGraph = {
  id: "blueGraph",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1rem sans-serif"; //text formatting
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].data[0] ?? "0", xCoor, yCoor); //Change first argument to change text inside the circle

    // var bottomText = "Blue";
    // var bottomTextX = ctx.canvas.width / 2;
    // var bottomTextY = ctx.canvas.height - 10;
    // ctx.fillStyle = "#000";
    // ctx.font = "20px sans-serif"; //text formatting
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(bottomText, bottomTextX, bottomTextY);
  },
};

//Yellow Graph
const yellowGraph = {
  id: "yellowGraph",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1rem sans-serif"; //text formatting
    ctx.fillStyle = "rgb(218, 165, 32)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].data[0] ?? "0", xCoor, yCoor); //Change first argument to change text inside the circle
  },
};

//Gray Graph
const grayGraph = {
  id: "grayGraph",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 1rem sans-serif"; //text formatting
    ctx.fillStyle = "rgb(54, 69, 79)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].data[0] ?? "0", xCoor, yCoor); //Change first argument to change text inside the circle
  },
};
//set all dougnut datas
function setChartData(
  chartCtx,
  dataValues,
  backgroundColors,
  plugins = [],
  options = {}
) {
  // Construct the pluginOptions object
  const pluginOptions = Object.fromEntries(
    plugins.map((plugin) => [plugin.id, options[plugin.id] ?? {}])
  );

  new Chart(chartCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
        },
      ],
    },
    plugins: plugins,
    options: {
      maintainAspectRatio: true,
      responsive: true,
      cutout: "80%",
      ...options,
      doughnut_Steps: pluginOptions["doughnut_Steps"], // Pass options specific to doughnutt_Steps
    },
  });
}

// Example usage:
// Define your chart contexts (ctx1, ctx2, ..., ctx8)
// Define your plugins (doughnutt_Steps, doughnutt_Calories, ...)
// Define your options for each chart if needed

// Then call the function for each chart:

function setBarData(chartctx, datavalues) {
  //bar chart test config Steps Per Day
  new Chart(chartctx, {
    type: "bar",
    data: {
      labels: datavalues[0],
      datasets: [
        {
          label: "# of Steps",
          data: datavalues[1],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,

      //change bar color, same with line chart
      backgroundColor: "#63A91F",

      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function setLineData(chartctx, dataValues) {
  // Weight per day Chart
  new Chart(chartctx, {
    type: "line",
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Weight per Day",
          data: dataValues,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      backgroundColor: "#63A91F",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function addgenerate_reportsBtnEventListener(docId) {
  var generate_reportsBtn = document.getElementsByClassName("generate_reports");
  removeAllListenersFromClass(generate_reportsBtn);

  for (let index = 0; index < generate_reportsBtn.length; index++) {
    const element = generate_reportsBtn[index];
    element.setAttribute("data-doc-id", docId);
    element.addEventListener("click", function (e) {
      //Download CSV File/PDF of weight data or steps data
      downloadChoiceModal.show();
      //getWeightData(element.dataset.docId);
    });
  }
}
function addFood_RecordBtnEventListener(docId){
 var food_recordBtn = document.getElementsByClassName("food_record");
  removeAllListenersFromClass(food_recordBtn);

  for (let index = 0; index < food_recordBtn.length; index++) {
    const element = food_recordBtn[index];
    element.setAttribute("data-doc-id", docId);
    element.addEventListener("click", function (e) {
      //Download CSV File/PDF of weight data or steps data
      getRecipesData(docId)
      food_recordModal.show()
      
    });
  }
}

//Ensure only 1 event listener is binded
function removeAllListenersFromClass(elements) {
  Array.from(elements).forEach(function (element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  });
}


function setCalendarData(calendarDates) {
  var calendarEl = document.getElementById("calendarContainer");
  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    events: calendarDates,
    eventBackgroundColor: "transparent",
    eventBorderColor: "transparent",
  });

  calendar.render();
  var toolbarElement = calendarEl.querySelector(".fc-header-toolbar");
  if (toolbarElement && toolbarElement.children.length >= 3) {
    toolbarElement.removeChild(toolbarElement.lastChild);
    toolbarElement.removeChild(toolbarElement.lastChild);
  }
}

function setBMI(bmi) {
  let pointerPosition = 0;
  let bmidata = bmi; // Example value retrieved from backend
  let category = "";

  const pointer = document.querySelector(".pointer");
  const barWidth = document.querySelector(".bar").offsetWidth;

  if (bmidata < 18.5) {
    pointerPosition = ((bmidata / 18.5) * 100) / 4;
    category = "underweight category.";
  } else if (bmidata >= 18.5 && bmidata <= 24.9) {
    pointerPosition = ((bmidata - 18.5) / (24.9 - 18.5)) * 25 + 24;
    category = "normal category.";
  } else if (bmidata >= 25 && bmidata <= 29.9) {
    pointerPosition = ((bmidata - 25) / (29.9 - 25)) * 25 + 49;
    category = "overweight category.";
  } else if (bmidata >= 30 && bmidata < 40) {
    pointerPosition = (bmidata / 40) * 98.1;
    category = "overweight category.";
  } else if (bmidata >= 40) {
    pointerPosition = 98.1;
    category = "obese category.";
  }

  pointer.style.left = pointerPosition + "%";

  // Get a reference to the paragraph element
  const bmipParagraph = document.querySelector(".bmip");

  // Update the paragraph text to include the value of bmidata and category
  bmipParagraph.textContent = `Your current BMI is ${bmidata}. You are within the ${category}`;
}

function generatePDF(data) {

  if (data === undefined || data.length === 0) {
    alert("No data found");
    return;
  }
  var doc = new jsPDF();

  // Set initial y position for text
  let yPos = 20;

  // Loop through the data array and add each element to the PDF
  data.forEach((item, index) => {
    // Extract date from the timestamp and format it
    const date = item.date.toDate(); // Assuming 'date' is a Firestore Timestamp
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    // Add date and weight to the PDF document
    doc.text(20, yPos, `Date: ${formattedDate}, Weight: ${item.weight}`);
    // Increment y position for next item
    yPos += 10; // Adjust as needed
  });

  // Save the PDF
  doc.save("output.pdf");
}

// Function to generate Excel file
function generateExcel(data) {
  // Check if data is undefined
  if (data === undefined || data.length === 0) {
    alert("No data found");
    return;
  }

  // Create a new workbook
  var wb = XLSX.utils.book_new();

  // Map data to extract only date part and format it
  var formattedData = data.map((item) => ({
    Date: new Date(item.date.toDate()).toLocaleDateString(), // Extract and format date
    Weight: item.weight, // Keep weight as is
  }));

  // Extract headers from the first object in the data array
  var headers = Object.keys(formattedData[0]);

  // Slice the formattedData array to remove the indices
  var slicedData = formattedData.map((item) => Object.values(item));

  // Create a new worksheet
  var ws = XLSX.utils.aoa_to_sheet([headers].concat(slicedData), {
    header: headers,
  });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write the workbook to a file
  XLSX.writeFile(wb, "output.xlsx");
}


function getWeekStepData(data) {
  if (data == undefined) {
    return [
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let steps = [];

  // Get current date
  let currentDate = new Date();
  // Calculate Monday of the current week
  let monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  // Calculate Sunday of the current week
  let sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDate.getDay() + 7);

  // Iterate over each day of the week
  let currentDateIterator = new Date(monday);
  while (currentDateIterator <= sunday) {
    // Check if there is a corresponding entry in data for the current date
    // console.log(currentDateIterator, "watch here");
    let entry = data.find(
      (item) =>
        item.date.toDate().toDateString() == currentDateIterator.toDateString()
    );
    if (entry) {
      // If entry exists, push steps into the steps array
      steps.push(entry.steps);
    } else {
      // If no entry exists, push 0 steps for the current date
      steps.push(0);
    }
    // Move to the next day
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  // Now you have an array containing steps for each day of the week
  //  console.log("Dates!!!:", days);
  // console.log("Steps:", steps);
  return [days, steps];
}

function getWeekWeightData(data) {
  if (data == undefined) {
    let val = [1, 1, 1, 1, 1, 1, 1];
    return val;
  }

  let lastWeightData = getLastEntryBeforeMonday(data);

  let currentDate = new Date();
  let monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday of the current week

  let sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6); // Sunday of the current week

  let today = new Date(currentDate);
  today.setHours(0, 0, 0, 0); // Set current time to midnight

  const weekWeightData = [];
  let lastValidWeight = 0; // Variable to store the last valid weight

  // Iterate over each day of the week (Monday to Sunday) up to today
  for (let d = new Date(monday); d <= today && d <= sunday; d.setDate(d.getDate() + 1)) {
    let found = false;

    // Search for the weight entry corresponding to the current date
    for (let i = 0; i < data.length; i++) {
      let entryDate = data[i].date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
      if (entryDate.toDateString() === d.toDateString()) {
        lastValidWeight = data[i].weight;
        weekWeightData.push(data[i].weight);
        found = true;
        break;
      }
    }

    // If no entry is found for the current date, push the last valid weight
    if (!found) {
      weekWeightData.push(lastValidWeight);
    }
  }
  if(weekWeightData[0] == 0 && lastWeightData != 0){
    weekWeightData[0] = lastWeightData;
  }
  if(weekWeightData[today.getDay()] == undefined){
    const lastNonZeroValue = weekWeightData[today.getDay() - 2];
    weekWeightData.push(lastNonZeroValue);  
  }
  return weekWeightData;
}

function getLastEntryBeforeMonday(data) {
  if (!data || data.length === 0) {
    return null; // Return null if data is empty or undefined
  }

  let currentDate = new Date();
  let monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday of the current week

  let lastEntry = null;

  // Iterate through data to find the last entry before Monday
  for (let i = data.length - 1; i >= 0; i--) {
    let entryDate = new Date(data[i].date.toDate()); // Convert Firestore Timestamp to JavaScript Date object
    if (entryDate < monday) {
      lastEntry = data[i];
      break;
    }
  }

  return lastEntry ? lastEntry.weight : null; // Return weight if last entry found, else return null
}
function adjustArrayForWeekdays(array) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

    if (dayOfWeek > 0) {
        // If it's not Sunday, shift the array by the current day of the week
        const shiftedArray = array.slice(dayOfWeek).concat(array.slice(0, dayOfWeek));

        // Find the last non-zero element
        let lastNonZeroIndex = -1;
        for (let i = shiftedArray.length - 1; i >= 0; i--) {
            if (shiftedArray[i] !== 0) {
                lastNonZeroIndex = i;
                break;
            }
        }

        // If a non-zero element is found, assign its value to the last zero element
        if (lastNonZeroIndex !== -1) {
            const lastNonZeroValue = shiftedArray[lastNonZeroIndex];
            for (let i = shiftedArray.length - 1; i >= 0; i--) {
                if (shiftedArray[i] === 0) {
                    shiftedArray[i] = lastNonZeroValue;
                    break;
                }
            }
        }

        return shiftedArray;
    } else {
        // If it's Sunday, return the array unchanged
        return array;
    }
}


function getTodayMealData(mealRecords) {
  if (mealRecords == undefined) {
    return [100.0, 10.0, 10.0, 10.0];
  }
  // Get today's date
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  // Initialize variables to store sums
  let calories = 0;
  let carbohydrates = 0;
  let fat = 0;
  let protein = 0;

  // Iterate over mealRecords array
  mealRecords.forEach((record) => {
    // Convert date to JavaScript Date object
    let recordDate = record.date.toDate(); // Assuming date is a Firestore Timestamp

    // Check if the record's date matches today's date
    if (recordDate.toDateString() === today.toDateString()) {
      // Add the values to the sums
      calories += record.calories;
      carbohydrates += record.carbohydrates;
      fat += record.fat;
      protein += record.protein;
    }
  });

  // Return an object containing the sums for today
  return [parseFloat(calories.toFixed(1)), parseFloat(carbohydrates.toFixed(1)), parseFloat(protein.toFixed(1)), parseFloat(fat.toFixed(1))];
}

function callCalendar(data) {
  if (!Array.isArray(data)) {
    console.error("Input is not an array.");
    return [];
  }

  // Get current date
  let currentDate = new Date();
  // Get the first day of the current month
  let firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Get the last day of the current month
  let lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Filter dates in the current month
  let datesInCurrentMonth = data.filter((dateObj) => {
    let date = dateObj.date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    return date >= firstDayOfMonth && date <= lastDayOfMonth;
  });

  // Extract the dates from date objects
  // let resultDates = datesInCurrentMonth.map(dateObj => dateObj.date.toDate());
  let resultDates = datesInCurrentMonth.map((dateObj) => {
    let currDate = dateObj.date.toDate();
    let date = currDate.getDate().toString().padStart(2, "0");
    let month = (currDate.getMonth() + 1).toString().padStart(2, "0");
    let year = currDate.getFullYear();
    //console.log(`${year}-${month}-${date}`);

    //return event object as specified by FullCalendar
    return {
      title: "\u2B50",
      start: `${year}-${month}-${date}`,
    };
  });

  // Return the array of event objects
  return resultDates;
}

async function getRecipesData(docId){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log(uid);
      const userRef = collection(db, "users");
      //const docRef = await getDoc(doc(userRef, uid));
      const docRef = await getDoc(doc(userRef, '0y9Kkgd303QrsKSuXzKvqG2DI4E2'));
      showBookmarks(docRef)
    }
  });
}

function showBookmarks(data) {
  console.log(data);
  // Loop through each recipe object in the array
  var recipeContent = document.getElementById("recipeContent");
  recipeContent.innerHTML = ""
  var recipeContentArray = data.data().bookmarkedRecipes;
  var counter = 0
  // Append a row to the table for each recipe
  recipeContentArray.forEach(recipe => {
    var { foodLabel, calories, carbs, protein, fat } = recipe;
    recipeContent.innerHTML +=
      `
      <tr class="row bg-white" data-doc-id="${data.id}">
        <th class="col">${foodLabel}</th>
        <th class="col">${calories}</th>
        <th class="col">${carbs}</th>
        <th class="col">${protein}</th>
        <th class="col">${fat}</th>
        <th class="col"><button type="button" class="btn btn-secondary btn-sm instructionBtn" data-doc-id="${counter}"><i class='bx bx-book-open bx-sm'></i></button></th>
        <th class="col"><button type="button" class="btn btn-secondary btn-sm ingredientsBtn" data-doc-id="${counter}"><i class='bx bx-book-open bx-sm'></i></button></th>
        <th class="col"><button type="button" class="btn btn-secondary btn-sm downloadRecipeBtn" data-doc-id="${counter}"><i class='bx bxs-download bx-sm'></i></button></th>
      </tr>
    `;
    counter++;
  });
  instructionsAddEventListener();
  ingredientsAddEventListener();
  downloadRecipeBtnAddEventlistener();
};



function instructionsAddEventListener(){
  var instructionBtn = document.getElementsByClassName("instructionBtn");
  removeAllListenersFromClass(instructionBtn);

  for (let index = 0; index < instructionBtn.length; index++) {
    const element = instructionBtn[index];
    element.addEventListener("click", function (e) {
      modalContent(element.dataset.docId,1);
    });
  }
}
function ingredientsAddEventListener(){
  var ingredientsBtn = document.getElementsByClassName("ingredientsBtn");
  removeAllListenersFromClass(ingredientsBtn);

  for (let index = 0; index < ingredientsBtn.length; index++) {
    const element = ingredientsBtn[index];
    element.addEventListener("click", function (e) {
      modalContent(element.dataset.docId,2);
    });
  }
}
function downloadRecipeBtnAddEventlistener(){
    var downloadRecipe = document.getElementsByClassName("downloadRecipeBtn");
  removeAllListenersFromClass(downloadRecipe);

  for (let index = 0; index < downloadRecipe.length; index++) {
    const element = downloadRecipe[index];
    element.addEventListener("click", function (e) {
      downloadRecipePDF(element.parentNode.parentNode,element.dataset.docId)
    });
  }
}
async function downloadRecipePDF(parentDiv, index) {
  const dataDocId = parentDiv.getAttribute("data-doc-id");
  const userRef = collection(db, "users");
  const docSnap = await getDoc(doc(userRef, "0y9Kkgd303QrsKSuXzKvqG2DI4E2"));
  const recipe = docSnap.data().bookmarkedRecipes[index];
  recipePDFFunc(recipe);
}

function recipePDFFunc(recipe) {
 let doc = new jsPDF();
  if(recipe == undefined){
    alert("No data found");
    return
  }
  console.log(recipe);
  // Now, let's use jsPDF to generate the PDF
 

  // Add recipe name
  let recipeNameText = `Recipe Name: ${recipe.foodLabel}`;
  let recipeNameLines = doc.splitTextToSize(recipeNameText, doc.internal.pageSize.width - 20); // Adjust width as needed
  doc.text(10, 10, recipeNameLines);

  // Add nutritional values
  let y = 20; // Initial y position for nutritional values
  doc.text(10, y, `Calories: ${recipe.calories}`);
  y += 10;
  doc.text(10, y, `Carbs: ${recipe.carbs}`);
  y += 10;
  doc.text(10, y, `Protein: ${recipe.protein}`);
  y += 10;
  doc.text(10, y, `Fat: ${recipe.fat}`);
  y += 10;

  // Add ingredients
  recipe.ingredients.forEach((ingredient, i) => {
    let ingredientText = `${i + 1}. ${ingredient}`;
    let ingredientLines = doc.splitTextToSize(ingredientText, doc.internal.pageSize.width - 20); // Adjust width as needed
    ingredientLines.forEach(line => {
      doc.text(10, y, line);
      y += 10; // Increment y position for the next line
    });
  });

  // Add instructions
  y += 10; // Add some space between ingredients and instructions
  doc.text(10, y, "Instructions:");
  y += 10; // Increment y position for instructions
  recipe.instructions.forEach((instruction, i) => {
    let instructionText = `${i + 1}. ${instruction}`;
    let instructionLines = doc.splitTextToSize(instructionText, doc.internal.pageSize.width - 20); // Adjust width as needed
    instructionLines.forEach(line => {
      doc.text(10, y, line);
      y += 10; // Increment y position for the next line
    });
  });

  // Finally, initiate the download of the PDF
  doc.save('recipe.pdf');
}


async function modalContent(indexRecord,choice) { 
  const modal = document.getElementById("dataModal");
  const modalBody = modal.querySelector(".modal-body");

  modalBody.innerHTML = "";

  const userRef = collection(db, "users");
  const docSnap = await getDoc(doc(userRef, "0y9Kkgd303QrsKSuXzKvqG2DI4E2"));
  const recipe = docSnap.data().bookmarkedRecipes[indexRecord];
  console.log(recipe,"CHECK ME")
  // Ensure indexRecord is within bounds
  if (indexRecord < 0 || indexRecord >= recipe.length) {
    const p = document.createElement('p');
    p.textContent = "Invalid index";
    modalBody.appendChild(p);
    food_recordModal.hide();
    dataModal.show();
    return;
  }
  // Display recipe title
  const title = document.createElement('h3');
  if(choice == 1){
    title.textContent = `${indexRecord + 1}. ${recipe.foodLabel} - Recipe Instructions`;
  }
  else{
    title.textContent = `${indexRecord + 1}. ${recipe.foodLabel} - Recipe Ingredients List`;

  }

  modalBody.appendChild(title);

  // Display nutritional information
  // const nutrition = document.createElement('ul');
  // nutrition.innerHTML = `
  //   <li>Calories: ${recipe.calories}</li>
  //   <li>Carbs: ${recipe.carbs}</li>
  //   <li>Protein: ${recipe.protein}</li>
  //   <li>Fat: ${recipe.fat}</li>
  // `;
  // modalBody.appendChild(nutrition);

  // Display instructions or ingredients based on choice
  if (choice == 1) {
    if (typeof recipe.instructions === 'string') {
      const instructions = document.createElement('p');
      instructions.textContent = recipe.instructions;
      modalBody.appendChild(instructions);
    } else if (Array.isArray(recipe.instructions)) {
      const instructionsList = document.createElement('ul');
      var counter = 1
      recipe.instructions.forEach(instruction => {
        const instructionItem = document.createElement('li');
        instructionItem.textContent = counter+". " +instruction;
        instructionsList.appendChild(instructionItem);
        counter++;
      });
      modalBody.appendChild(instructionsList);
    } else {
      const noInstructions = document.createElement('p');
      noInstructions.textContent = "No instructions available.";
      modalBody.appendChild(noInstructions);
    }
  } else { // choice == 2 for ingredients
    if (typeof recipe.ingredients === 'string') {
      const ingredients = document.createElement('p');
      ingredients.textContent = recipe.ingredients;
      modalBody.appendChild(ingredients);
    } else if (Array.isArray(recipe.ingredients)) {
      const ingredientList = document.createElement('ul');
      recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient;
        ingredientList.appendChild(ingredientItem);
      });
      modalBody.appendChild(ingredientList);
    } else {
      const noIngredients = document.createElement('p');
      noIngredients.textContent = "No ingredients available.";
      modalBody.appendChild(noIngredients);
    }
  }

  // Show the modal
  food_recordModal.hide();
  dataModal.show();
}
