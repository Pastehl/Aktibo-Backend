import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'chart.js';
import 'jquery';
import 'popper.js';
import 'bootstrap';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

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


    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
    const ctx3 = document.getElementById('myChart3');
    const ctx4 = document.getElementById('myChart4');
    const ctx5 = document.getElementById('myChart5');
    const ctx6 = document.getElementById('myChart6');
    const ctx7 = document.getElementById('myChart7');
    const ctx8 = document.getElementById('myChart8');

    //Green Test Graph
    //Template for Graph
    const doughnut_Steps = {
    id: 'doughnut_Steps',
    beforeDatasetsDraw(chart, args, pluginOptions) {
    const {ctx, data} = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = 'bold 30px sans-serif';  //text formatting
    ctx.fillStyle = 'rgb(99,169,31)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Steps`, xCoor, yCoor); //Change first argument to change text inside the circle

    var bottomText = 'Steps';
    var bottomTextX = ctx.canvas.width / 2 
    var bottomTextY = ctx.canvas.height - 80;
    ctx.fillStyle = '#000';
    ctx.font = '20px sans-serif'; //text formatting
    ctx.textAlign = 'center';   
    ctx.textBaseline = 'middle';
    ctx.fillText(bottomText, bottomTextX, bottomTextY);
    }
    }
    
    //Orange Time Graph
    //Template for Graph
    const doughnut_Calories = {
    id: 'doughnut_Calories',
    beforeDatasetsDraw(chart, args, pluginOptions) {
    const {ctx, data} = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = 'bold 30px sans-serif';  //text formatting
    ctx.fillStyle = 'rgb(255,127,17)';  
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Calories`, xCoor, yCoor); //Change first argument to change text inside the circle

    var bottomText = 'Calories Burned';
    var bottomTextX = ctx.canvas.width / 2
    var bottomTextY = ctx.canvas.height - 80;
    ctx.fillStyle = '#000';
    ctx.font = '20px sans-serif';  //text formatting
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(bottomText, bottomTextX, bottomTextY);
    }
    }

    //Red Graph
    //Template for Graph
    const redGraph = {
      id: 'redGraph',
      beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = 'bold 30px sans-serif';  //text formatting
      ctx.fillStyle = 'rgb(255,0,0)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Red`, xCoor, yCoor); //Change first argument to change text inside the circle

      // var bottomText = 'Red';
      // var bottomTextX = ctx.canvas.width / 2
      // var bottomTextY = ctx.canvas.height - 1;
      // ctx.fillStyle = '#000';
      // ctx.font = '20px sans-serif';
      // ctx.textAlign = 'center';
      // ctx.textBaseline = 'middle';
      // ctx.fillText(bottomText, bottomTextX, bottomTextY);
      }
      }


    //Blue Graph
    //Template for Graph
    const blueGraph = {
      id: 'blueGraph',
      beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = 'bold 30px sans-serif';  //text formatting
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Blue`, xCoor, yCoor); //Change first argument to change text inside the circle

      var bottomText = 'Blue';
      var bottomTextX = ctx.canvas.width / 2;
      var bottomTextY = ctx.canvas.height - 10;
      ctx.fillStyle = '#000';
      ctx.font = '20px sans-serif'; //text formatting
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bottomText, bottomTextX, bottomTextY);
      }
      }

    //Yellow Graph
    //Template for Graph
    const yellowGraph = {
      id: 'yellowGraph',
      beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = 'bold 30px sans-serif';  //text formatting
      ctx.fillStyle = 'rgb(218, 165, 32)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Yellow`, xCoor, yCoor); //Change first argument to change text inside the circle
      
      var bottomText = 'Yellow';
      var bottomTextX = ctx.canvas.width / 2
      var bottomTextY = ctx.canvas.height - 10;
      ctx.fillStyle = '#000';
      ctx.font = '20px sans-serif'; //text formatting
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bottomText, bottomTextX, bottomTextY);
      }
      } 

    //Gray Graph
    //Template for Graph
    const grayGraph = {
      id: 'grayGraph',
      beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = 'bold 30px sans-serif';  //text formatting
      ctx.fillStyle = 'rgb(54, 69, 79)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Gray`, xCoor, yCoor); //Change first argument to change text inside the circle

      var bottomText = 'Gray';
      var bottomTextX = ctx.canvas.width / 2
      var bottomTextY = ctx.canvas.height - 10;
      ctx.fillStyle = '#000';
      ctx.font = '20px sans-serif'; //text formatting
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bottomText, bottomTextX, bottomTextY);
      }
      }

    new Chart(ctx, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],  //data
    backgroundColor: [
    'rgb(99,169,31)', //dark color
    'rgb(40,54,26)',  //light color
    ],
    }]
    },
    plugins: [doughnut_Steps],
    options: {
    maintainAspectRatio:false,
    responsive: true
    },
    });

    new Chart(ctx2, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],    //data
    backgroundColor: [
    'rgb(255,127,17)',  //dark color
    'rgb(243,223,194)', //light color
    ],
    }]
    },
    plugins: [doughnut_Calories], 
    options: {
    maintainAspectRatio: false,
    responsive: true,
    },
    });

    new Chart(ctx5, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],    //data
    backgroundColor: [
    'rgb(255,0,0)',     //dark color
    'rgb(255,114,118)', //light color
    ],
    }]
    },
    plugins: [redGraph],
    options: {
    maintainAspectRatio: false,
    responsive: true,
    },
    });

    new Chart(ctx6, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],      //data
    backgroundColor: [
    'rgb(0, 0, 255)',     //dark color
    'rgb(37, 207, 240)',  //light color
    ],
    }]
    },
    plugins: [blueGraph],
    options: {
    maintainAspectRatio: false,
    responsive: true,
    },
    });

    new Chart(ctx7, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],      //data
    backgroundColor: [
    'rgb(218, 165, 32)',  //dark color
    'rgb(255, 192, 0)',   //light color
    ],
    }]
    },
    options: {
    maintainAspectRatio: false,
    responsive: true,
    },
    plugins: [yellowGraph],
    });

    new Chart(ctx8, {
    type: 'doughnut',
    data: {
    datasets: [{
    data: [300, 50],       //data
    backgroundColor: [
    'rgb(54, 69, 79)',     //dark color
    'rgb(115, 147, 179)',  //light color
    ],
    }]
    },
    options: {
    maintainAspectRatio: false,
    responsive: true,
    },
    plugins: [grayGraph],
    });
    //bar chart test config
    new Chart(ctx3, {
    type: 'bar',
    data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3, 5],
    borderWidth: 1
    }]
    },
    options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
    y: {
    beginAtZero: true
    }
    }
    }
    });

    new Chart(ctx4, {
    type: 'line',
    data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3, 1],
    borderWidth: 1
    }]
    },
    options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
    y: {
    beginAtZero: true
    }
    }
    }
    });

 document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendarContainer');

    var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
    });

    calendar.render();
    var toolbarElement = calendarEl.querySelector('.fc-header-toolbar');
    if (toolbarElement && toolbarElement.children.length >= 3) {
      toolbarElement.removeChild(toolbarElement.lastChild);
      toolbarElement.removeChild(toolbarElement.lastChild);
    }
});