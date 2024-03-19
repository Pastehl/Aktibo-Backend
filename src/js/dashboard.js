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

//User Data
async function getUserRecord() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log(uid);
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
  let exercise_dates = docSnap.data().exerciseRecords;
  let bmi = weight / (height / 100) ** 2;
  let steps = docSnap.data().totalSteps;
  let caloriesBurned = docSnap.data().totalCaloriesBurned;
  let dailyStepsCount = docSnap.data().dailyStepCounts;
  let dailyWeightRecords = docSnap.data().weightRecords;
  let mealRecords = docSnap.data().mealRecords;

  //Get Extracted Values
  getWeekStepData(dailyStepsCount); // Array Week Steps Count
  getWeekWeightData(dailyWeightRecords) // Array Week Weight Count
  getTodayMealData(mealRecords)// Daily Macros
  setBMI(bmi.toFixed(1));
  addgenerate_reportsBtnEventListener(docSnap.id);
  callCalendar(exercise_dates); // Arraw Monthly Plot Points

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
    [caloriesBurned, 500 - caloriesBurned],
    ["rgb(255,127,17)", "rgb(243,223,194)"],
    [doughnutt_Calories]
  );
  setChartData(
    ctx5,
    [100, 2500],
    ["rgb(255,0,0)", "rgb(255,114,118)"],
    [redGraph],
    { maintainAspectRatio: false }
  );
  setChartData(
    ctx6,
    [240, 110],
    ["rgb(0, 0, 255)", "rgb(37, 207, 240)"],
    [blueGraph]
  );
  setChartData(
    ctx7,
    [300, 50],
    ["rgb(218, 165, 32)", "rgb(255, 192, 0)"],
    [yellowGraph]
  );
  setChartData(
    ctx8,
    [300, 50],
    ["rgb(54, 69, 79)", "rgb(115, 147, 179)"],
    [grayGraph]
  );
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
    const textValue = data.datasets[0].data[0] ?? "NaN"; // Extract textValue from pluginOptions or use a default value
    console.log(data.datasets[0].data[0]);
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
    ctx.fillText(`325`, xCoor, yCoor); //Change first argument to change text inside the circle

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
//Template for Graph
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
    ctx.fillText(`595`, xCoor, yCoor); //Change first argument to change text inside the circle

    // var bottomText = 'Red';
    // var bottomTextX = ctx.canvas.width / 2
    // var bottomTextY = ctx.canvas.height - 1;
    // ctx.fillStyle = '#000';
    // ctx.font = '20px sans-serif';
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.fillText(bottomText, bottomTextX, bottomTextY);
  },
};

//Blue Graph
//Template for Graph
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
    ctx.fillText(`48g`, xCoor, yCoor); //Change first argument to change text inside the circle

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
//Template for Graph
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
    ctx.fillText(`22g`, xCoor, yCoor); //Change first argument to change text inside the circle

    // var bottomText = "Yellow";
    // var bottomTextX = ctx.canvas.width / 2;
    // var bottomTextY = ctx.canvas.height - 10;
    // ctx.fillStyle = "#000";
    // ctx.font = "20px sans-serif"; //text formatting
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(bottomText, bottomTextX, bottomTextY);
  },
};

//Gray Graph
//Template for Graph
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
    ctx.fillText(`22g`, xCoor, yCoor); //Change first argument to change text inside the circle

    // var bottomText = "Gray";
    // var bottomTextX = ctx.canvas.width / 2;
    // var bottomTextY = ctx.canvas.height - 10;
    // ctx.fillStyle = "#000";
    // ctx.font = "20px sans-serif"; //text formatting
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(bottomText, bottomTextX, bottomTextY);
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

//bar chart test config Steps Per Day
new Chart(ctx3, {
  type: "bar",
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
        label: "# of Steps",
        data: [5000, 500, 3000, 10000, 12500, 18030, 20000],
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
// Weight per day Chart
new Chart(ctx4, {
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
        data: [71, 71, 70, 69, 71, 75, 70],
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
function addgenerate_reportsBtnEventListener(docId) {
  var generate_reportsBtn = document.getElementsByClassName("generate_reports");
  removeAllListenersFromClass(generate_reportsBtn);

  for (let index = 0; index < generate_reportsBtn.length; index++) {
    const element = generate_reportsBtn[index];
    element.setAttribute("data-doc-id", docId);
    element.addEventListener("click", function (e) {
      //Download CSV File/PDF of weight data or steps data
      getWeightData(element.dataset.docId);
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
function removeAllListeners(element) {
  if (element) {
    const clone = element.cloneNode(true);
    element.replaceWith(clone);
  } else {
    console.error(`Element with id "${elementId}" not found.`);
  }
}

//need to pass an array with object to "events"
// '\u2B50' = star emoji
//Calendar
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendarContainer");

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    events: [
      {
        title: "\u2B50",
        start: "2024-03-01",
      },
      {
        title: "\u2B50",
        start: "2024-03-02",
      },
      {
        title: "\u2B50",
        start: "2024-03-04",
      },
      {
        title: "\u2B50",
        start: "2024-03-05",
      },
      {
        title: "\u2B50",
        start: "2024-03-08",
      },
      {
        title: "\u2B50",
        start: "2024-03-07",
      },
      {
        title: "\u2B50",
        start: "2024-03-12",
      },
    ],
    eventBackgroundColor: "transparent",
    eventBorderColor: "transparent",
    event,
  });

  calendar.render();
  var toolbarElement = calendarEl.querySelector(".fc-header-toolbar");
  if (toolbarElement && toolbarElement.children.length >= 3) {
    toolbarElement.removeChild(toolbarElement.lastChild);
    toolbarElement.removeChild(toolbarElement.lastChild);
  }
});
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
async function getWeightData(uid, choice) {
  const userRef = collection(db, "users");
  const docRef = await getDoc(doc(userRef, uid));

  if (choice == 0) {
    generatePDF(docRef.data().weightRecords);
  } else {
    generateExcel(docRef.data().weightRecords);
  }
}
function generatePDF(data) {
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
  console.log(data, "CHCHCHCH");
  let dates = [];
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
    console.log(currentDateIterator, "watch here");
    let entry = data.find(
      (item) =>
        item.date.toDate().toDateString() ==
        currentDateIterator.toDateString()
    );
    if (entry) {
      // If entry exists, push date and steps into respective arrays
      dates.push(new Date(currentDateIterator)); // Create a new Date object
      steps.push(entry.steps);
    } else {
      // If no entry exists, push 0 steps for the current date
      dates.push(new Date(currentDateIterator)); // Create a new Date object
      steps.push(0);
    }
    // Move to the next day
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  // Now you have separate arrays for dates and steps representing Monday to Sunday of the current week
  console.log("Dates!!!:", dates);
  console.log("Steps:", steps);
  return [dates, steps];
}


function getWeekWeightData(data) {
    let currentDate = new Date();
    let monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday of the current week

    let friday = new Date(monday);
    friday.setDate(monday.getDate() + 4); // Friday of the current week

    let weekWeightData = [];

    // Iterate over each day of the week (Monday to Friday)
    for (let d = new Date(monday); d <= friday; d.setDate(d.getDate() + 1)) {
        let found = false;

        // Search for the weight entry corresponding to the current date
        for (let i = 0; i < data.length; i++) {
            let entryDate = data[i].date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
            if (entryDate.toDateString() === d.toDateString()) {
                weekWeightData.push(data[i].weight);
                found = true;
                break;
            }
        }

        // If no entry is found for the current date, push 0
        if (!found) {
            weekWeightData.push(0);
        }
    }
  console.log(weekWeightData)
    return weekWeightData;
}

function getTodayMealData(mealRecords) {
    // Get today's date
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    // Initialize variables to store sums
    let calories = 0;
    let carbohydrates = 0;
    let fat = 0;
    let protein = 0;

    // Iterate over mealRecords array
    mealRecords.forEach(record => {
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
    console.log([calories,carbohydrates,fat,protein])
    return [calories,carbohydrates,fat,protein];
}
function callCalendar(data) {
    if (!Array.isArray(data)) {
        console.error("Input is not an array.");
        return [];
    }

    // Get current date
    let currentDate = new Date();
    // Get the first day of the current month
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // Get the last day of the current month
    let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Filter dates in the current month
    let datesInCurrentMonth = data.filter(dateObj => {
        let date = dateObj.date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
        return date >= firstDayOfMonth && date <= lastDayOfMonth;
    });

    // Extract the dates from date objects
    let resultDates = datesInCurrentMonth.map(dateObj => dateObj.date.toDate());

    // Return the array of dates
    console.log(resultDates,"LOOK")
    return resultDates;
}