/*! For license information please see 54e18457200d9882d63f.js.LICENSE.txt */
function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach((function(e){_defineProperty(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function _defineProperty(t,e,n){return(e=_toPropertyKey(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _toPropertyKey(t){var e=_toPrimitive(t,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _regeneratorRuntime(){"use strict";_regeneratorRuntime=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),c=new R(r||[]);return a(i,"_invoke",{value:k(t,n,c)}),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var f="suspendedStart",h="suspendedYield",p="executing",g="completed",y={};function m(){}function v(){}function b(){}var w={};d(w,i,(function(){return this}));var D=Object.getPrototypeOf,x=D&&D(D(B([])));x&&x!==n&&r.call(x,i)&&(w=x);var _=b.prototype=m.prototype=Object.create(w);function C(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var d=s.arg,l=d.value;return l&&"object"==_typeof(l)&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(l).then((function(t){d.value=t,i(d)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}var o;a(this,"_invoke",{value:function(t,r){function a(){return new e((function(e,a){n(t,r,e,a)}))}return o=o?o.then(a,a):a()}})}function k(e,n,r){var a=f;return function(o,i){if(a===p)throw new Error("Generator is already running");if(a===g){if("throw"===o)throw i;return{value:t,done:!0}}for(r.method=o,r.arg=i;;){var c=r.delegate;if(c){var s=S(c,r);if(s){if(s===y)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===f)throw a=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=p;var d=u(e,n,r);if("normal"===d.type){if(a=r.done?g:h,d.arg===y)continue;return{value:d.arg,done:r.done}}"throw"===d.type&&(a=g,r.method="throw",r.arg=d.arg)}}}function S(e,n){var r=n.method,a=e.iterator[r];if(a===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,S(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),y;var o=u(a,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var i=o.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,y):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function B(e){if(e||""===e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function n(){for(;++a<e.length;)if(r.call(e,a))return n.value=e[a],n.done=!1,n;return n.value=t,n.done=!0,n};return o.next=o}}throw new TypeError(_typeof(e)+" is not iterable")}return v.prototype=b,a(_,"constructor",{value:b,configurable:!0}),a(b,"constructor",{value:v,configurable:!0}),v.displayName=d(b,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,d(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},e.awrap=function(t){return{__await:t}},C(E.prototype),d(E.prototype,c,(function(){return this})),e.AsyncIterator=E,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new E(l(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},C(_),d(_,s,"Generator"),d(_,i,(function(){return this})),d(_,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=B,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(M),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function a(r,a){return c.type="throw",c.arg=e,n.next=r,a&&(n.method="next",n.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),d=r.call(i,"finallyLoc");if(s&&d){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),M(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;M(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:B(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),y}},e}function asyncGeneratorStep(t,e,n,r,a,o,i){try{var c=t[o](i),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,a)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){asyncGeneratorStep(o,r,a,i,c,"next",t)}function c(t){asyncGeneratorStep(o,r,a,i,c,"throw",t)}i(void 0)}))}}import{Calendar}from"@fullcalendar/core";import dayGridPlugin from"@fullcalendar/daygrid";import"chart.js";import"jquery";import"popper.js";import"bootstrap";import{initializeApp}from"firebase/app";import{getAuth,onAuthStateChanged,signOut}from"firebase/auth";import{getFirestore,addDoc,collection,query,where,getDocs,doc,setDoc,updateDoc,getDoc,increment,orderBy,limit,startAfter,arrayUnion,arrayRemove,documentId}from"firebase/firestore";import*as bootstrap from"bootstrap";import"../scss/styles.scss";import{main,start}from"@popperjs/core";import jsPDF from"jspdf";import*as XLSX from"xlsx";var firebaseConfig={apiKey:"AIzaSyAH168KKUYGhSGV_GVX5SqDGfxm4vtYR7w",authDomain:"aktibo-2023.firebaseapp.com",projectId:"aktibo-2023",storageBucket:"aktibo-2023.appspot.com",messagingSenderId:"363113385770",appId:"1:363113385770:web:bdf8d66757fd2067b8d853",measurementId:"G-1VTRRK1T20"},app=initializeApp(firebaseConfig),auth=getAuth(),db=getFirestore(app),ctx=document.getElementById("myChart"),ctx2=document.getElementById("myChart2"),ctx3=document.getElementById("myChart3"),ctx4=document.getElementById("myChart4"),ctx5=document.getElementById("myChart5"),ctx6=document.getElementById("myChart6"),ctx7=document.getElementById("myChart7"),ctx8=document.getElementById("myChart8"),downloadChoiceModal=new bootstrap.Modal("#downloadChoiceModal"),food_recordModal=new bootstrap.Modal("#viewRecipeModal"),dataModal=new bootstrap.Modal("#dataModal"),closedownloadChoiceModalBtn=document.getElementById("closedownloadChoiceModalBtn"),closeFood_RecordModalBtn=document.getElementById("viewRecipeModalBtn"),closeDataModalBtn=document.getElementById("dataModalBtn"),downloadPDFBtn=document.getElementById("downloadPDF"),downloadXLSX=document.getElementById("downloadXLSX");function getUserRecord(){return _getUserRecord.apply(this,arguments)}function _getUserRecord(){return _getUserRecord=_asyncToGenerator(_regeneratorRuntime().mark((function t(){return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:onAuthStateChanged(auth,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=7;break}return n=e.uid,r=collection(db,"users"),t.next=5,getDoc(doc(r,n));case 5:setUserData(t.sent);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)}))),_getUserRecord.apply(this,arguments)}function setUserData(t){console.log(t.id);var e,n=t.data().weight,r=t.data().height,a=t.data().physicalActivityLevel||0,o=t.data().exerciseGoal;e=null==n||null==r?0:n/Math.pow(r/100,2);var i=t.data().exerciseRecords,c=t.data().totalSteps;null==c&&(c=0);var s=t.data().totalCaloriesBurned;null==s&&(s=0);var d=t.data().dailyStepCounts,l=t.data().weightRecords,u=t.data().mealRecords,f=getWeekStepData(d),h=getWeekWeightData(l);console.log("look weight",h);var p=getTodayMealData(u);setBMI(e.toFixed(1)),addgenerate_reportsBtnEventListener(t.id),addFood_RecordBtnEventListener(t.id);var g=callCalendar(i),y=macrosCalCPF(n,r,a,o),m=ctx;0==y[0]&&(y[0]=2e3),setChartData(m,[c,1e4-c],["rgb(99,169,31)","rgb(40,54,26)"],[doughnutt_Steps],{textValue:"10000"}),setChartData(ctx2,[s,2500-s],["rgb(255,127,17)","rgb(243,223,194)"],[doughnutt_Calories]),setChartData(ctx5,[p[0],y[0]],["rgb(255,0,0)","rgb(255,114,118)"],[redGraph],{maintainAspectRatio:!1}),setChartData(ctx6,[p[1],y[1]],["rgb(0, 0, 255)","rgb(37, 207, 240)"],[blueGraph]),setChartData(ctx7,[p[2],y[2]],["rgb(218, 165, 32)","rgb(255, 192, 0)"],[yellowGraph]),setChartData(ctx8,[p[3],y[3]],["rgb(54, 69, 79)","rgb(115, 147, 179)"],[grayGraph]),setBarData(ctx3,f),setLineData(ctx4,h),document.addEventListener("DOMContentLoaded",setCalendarData(g))}function macrosCalCPF(t,e,n,r){var a=e-100-.1*(e-100),o=0;switch(n){case 0:o=30*a;break;case 1:o=35*a;break;case 2:o=40*a;break;case 3:o=45*a}var i=0;switch(r){case 0:i=Math.round(o);break;case 1:i=Math.round(o+500);break;case 2:i=Math.round(o-500)}return[i,Math.round(.6*o/4),Math.round(.15*o/4),Math.round(.25*o/4)]}closeDataModalBtn.addEventListener("click",(function(){dataModal.hide(),food_recordModal.show()})),closedownloadChoiceModalBtn.addEventListener("click",(function(){downloadChoiceModal.hide()})),closeFood_RecordModalBtn.addEventListener("click",(function(){food_recordModal.hide()})),downloadPDFBtn.addEventListener("click",(function(){onAuthStateChanged(auth,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=8;break}return n=e.uid,console.log(n),r=collection(db,"users"),t.next=6,getDoc(doc(r,n));case 6:generatePDF(t.sent.data().weightRecords);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),downloadChoiceModal.hide()})),downloadXLSX.addEventListener("click",(function(){onAuthStateChanged(auth,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=8;break}return n=e.uid,console.log(n),r=collection(db,"users"),t.next=6,getDoc(doc(r,n));case 6:generateExcel(t.sent.data().weightRecords);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),downloadChoiceModal.hide()})),onAuthStateChanged(auth,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=9;break}return n=e.uid,r=collection(db,"users"),t.next=5,getDoc(doc(r,n));case 5:t.sent.exists()||(window.location.href="index.html"),t.next=10;break;case 9:window.location.href="index.html";case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),document.getElementById("logout_btn").addEventListener("click",(function(){signOut(auth).then((function(){window.location.href="index.html"})).catch((function(t){}))})),getUserRecord();var doughnutt_Steps={id:"doughnut_Steps",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1.3rem sans-serif",a.fillStyle="rgb(99,169,31)",a.textAlign="center",a.textBaseline="middle";var s=null!==(r=o.datasets[0].data[0])&&void 0!==r?r:"0";a.fillText(s,i,c)}},doughnutt_Calories={id:"doughnut_Calories",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1.3rem sans-serif",a.fillStyle="rgb(255,127,17)",a.textAlign="center",a.textBaseline="middle",a.fillText(null!==(r=o.datasets[0].data[0])&&void 0!==r?r:"0",i,c)}},redGraph={id:"redGraph",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1.5rem sans-serif",a.fillStyle="rgb(255,0,0)",a.textAlign="center",a.textBaseline="middle",a.fillText(null!==(r="".concat(o.datasets[0].data[0]))&&void 0!==r?r:"0",i,c)}},blueGraph={id:"blueGraph",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1rem sans-serif",a.fillStyle="rgb(0, 0, 255)",a.textAlign="center",a.textBaseline="middle",a.fillText(null!==(r=o.datasets[0].data[0])&&void 0!==r?r:"0",i,c)}},yellowGraph={id:"yellowGraph",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1rem sans-serif",a.fillStyle="rgb(218, 165, 32)",a.textAlign="center",a.textBaseline="middle",a.fillText(null!==(r=o.datasets[0].data[0])&&void 0!==r?r:"0",i,c)}},grayGraph={id:"grayGraph",beforeDatasetsDraw:function(t,e,n){var r,a=t.ctx,o=t.data;a.save();var i=t.getDatasetMeta(0).data[0].x,c=t.getDatasetMeta(0).data[0].y;a.font="bold 1rem sans-serif",a.fillStyle="rgb(54, 69, 79)",a.textAlign="center",a.textBaseline="middle",a.fillText(null!==(r=o.datasets[0].data[0])&&void 0!==r?r:"0",i,c)}};function setChartData(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=Object.fromEntries(r.map((function(t){var e;return[t.id,null!==(e=a[t.id])&&void 0!==e?e:{}]})));new Chart(t,{type:"doughnut",data:{datasets:[{data:e,backgroundColor:n}]},plugins:r,options:_objectSpread(_objectSpread({maintainAspectRatio:!0,responsive:!0,cutout:"80%"},a),{},{doughnut_Steps:o.doughnut_Steps})})}function setBarData(t,e){new Chart(t,{type:"bar",data:{labels:e[0],datasets:[{label:"# of Steps",data:e[1],borderWidth:1}]},options:{maintainAspectRatio:!1,responsive:!0,backgroundColor:"#63A91F",scales:{y:{beginAtZero:!0}}}})}function setLineData(t,e){new Chart(t,{type:"line",data:{labels:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],datasets:[{label:"Weight per Day",data:e,borderWidth:1}]},options:{maintainAspectRatio:!1,responsive:!0,backgroundColor:"#63A91F",scales:{y:{beginAtZero:!0}}}})}function addgenerate_reportsBtnEventListener(t){var e=document.getElementsByClassName("generate_reports");removeAllListenersFromClass(e);for(var n=0;n<e.length;n++){var r=e[n];r.setAttribute("data-doc-id",t),r.addEventListener("click",(function(t){downloadChoiceModal.show()}))}}function addFood_RecordBtnEventListener(t){var e=document.getElementsByClassName("food_record");removeAllListenersFromClass(e);for(var n=0;n<e.length;n++){var r=e[n];r.setAttribute("data-doc-id",t),r.addEventListener("click",(function(e){getRecipesData(t),food_recordModal.show()}))}}function removeAllListenersFromClass(t){Array.from(t).forEach((function(t){var e=t.cloneNode(!0);t.parentNode.replaceChild(e,t)}))}function setCalendarData(t){var e=document.getElementById("calendarContainer");new Calendar(e,{plugins:[dayGridPlugin],events:t,eventBackgroundColor:"transparent",eventBorderColor:"transparent"}).render();var n=e.querySelector(".fc-header-toolbar");n&&n.children.length>=3&&(n.removeChild(n.lastChild),n.removeChild(n.lastChild))}function setBMI(t){var e=0,n=t,r="",a=document.querySelector(".pointer");document.querySelector(".bar").offsetWidth;n<18.5?(e=n/18.5*100/4,r="underweight category."):n>=18.5&&n<=24.9?(e=(n-18.5)/(24.9-18.5)*25+24,r="normal category."):n>=25&&n<=29.9?(e=(n-25)/(29.9-25)*25+49,r="overweight category."):n>=30&&n<40?(e=n/40*98.1,r="overweight category."):n>=40&&(e=98.1,r="obese category."),a.style.left=e+"%",document.querySelector(".bmip").textContent="Your current BMI is ".concat(n,". You are within the ").concat(r)}function generatePDF(t){if(void 0!==t&&0!==t.length){var e=new jsPDF,n=20;t.forEach((function(t,r){var a=t.date.toDate(),o="".concat(a.getFullYear(),"-").concat((a.getMonth()+1).toString().padStart(2,"0"),"-").concat(a.getDate().toString().padStart(2,"0"));e.text(20,n,"Date: ".concat(o,", Weight: ").concat(t.weight)),n+=10})),e.save("output.pdf")}else alert("No data found")}function generateExcel(t){if(void 0!==t&&0!==t.length){var e=XLSX.utils.book_new(),n=t.map((function(t){return{Date:new Date(t.date.toDate()).toLocaleDateString(),Weight:t.weight}})),r=Object.keys(n[0]),a=n.map((function(t){return Object.values(t)})),o=XLSX.utils.aoa_to_sheet([r].concat(a),{header:r});XLSX.utils.book_append_sheet(e,o,"Sheet1"),XLSX.writeFile(e,"output.xlsx")}else alert("No data found")}function getWeekStepData(t){if(null==t)return[["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],[0,0,0,0,0,0,0]];var e,n=[],r=new Date;switch(r.getDay()){case 0:(e=new Date(r)).setDate(r.getDate()-6);break;case 1:e=new Date(r);break;case 2:(e=new Date(r)).setDate(r.getDate()-1);break;case 3:(e=new Date(r)).setDate(r.getDate()-2);break;case 4:(e=new Date(r)).setDate(r.getDate()-3);break;case 5:(e=new Date(r)).setDate(r.getDate()-4);break;case 6:(e=new Date(r)).setDate(r.getDate()-5)}new Date(e).setDate(e.getDate()+6);var a=new Date,o=e,i=new Date(e);for(i.setDate(e.getDate()+1);o<=a;){o.setHours(0,0,0,0),i.setHours(0,0,0,0);for(var c=!1,s=0;s<t.length;s++){var d=t[s].date.toDate();d.getFullYear()===o.getFullYear()&&d.getMonth()===o.getMonth()&&d.getDate()===o.getDate()&&(n.push(t[s].steps),c=!0)}c||n.push(0),o.setDate(o.getDate()+1),i.setDate(i.getDate()+1)}return[["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],n]}function getWeekWeightData(t){if(null==t){return[0,0,0,0,0,0,0]}console.log(t,"intialize");var e=getLastEntryBeforeMonday(t);console.log(e);var n,r=new Date;switch(r.getDay()){case 0:(n=new Date(r)).setDate(r.getDate()-6);break;case 1:n=new Date(r);break;case 2:(n=new Date(r)).setDate(r.getDate()-1);break;case 3:(n=new Date(r)).setDate(r.getDate()-2);break;case 4:(n=new Date(r)).setDate(r.getDate()-3);break;case 5:(n=new Date(r)).setDate(r.getDate()-4);break;case 6:(n=new Date(r)).setDate(r.getDate()-5)}var a=[];new Date(n).setDate(n.getDate()+6);var o=new Date;console.log("Day today:",o);var i=n,c=new Date(n);for(c.setDate(n.getDate()+1);i<=o;){i.setHours(0,0,0,0),c.setHours(0,0,0,0);for(var s=!1,d=0;d<t.length;d++){var l=t[d].date.toDate();l.getFullYear()===i.getFullYear()&&l.getMonth()===i.getMonth()&&l.getDate()===i.getDate()&&(a.push(t[d].weight),s=!0)}s||a.push(e),i.setDate(i.getDate()+1),c.setDate(c.getDate()+1)}return a}function getLastEntryBeforeMonday(t){if(!t||0===t.length)return null;var e=new Date,n=new Date(e);n.setDate(e.getDate()-e.getDay()+1);for(var r=null,a=t.length-1;a>=0;a--){if(new Date(t[a].date.toDate())<n){r=t[a];break}}return r?r.weight:null}function adjustArrayForWeekdays(t){var e=(new Date).getDay();if(e>0){for(var n=t.slice(e).concat(t.slice(0,e)),r=-1,a=n.length-1;a>=0;a--)if(0!==n[a]){r=a;break}if(-1!==r)for(var o=n[r],i=n.length-1;i>=0;i--)if(0===n[i]){n[i]=o;break}return n}return t}function getTodayMealData(t){if(null==t)return[0,0,0,0];var e=new Date;e.setHours(0,0,0,0);var n=0,r=0,a=0,o=0;return t.forEach((function(t){t.date.toDate().toDateString()===e.toDateString()&&(n+=t.calories,r+=t.carbohydrates,a+=t.fat,o+=t.protein)})),[parseFloat(n.toFixed(1)),parseFloat(r.toFixed(1)),parseFloat(o.toFixed(1)),parseFloat(a.toFixed(1))]}function callCalendar(t){if(!Array.isArray(t)||null==t)return console.error("Input is not an array."),[];var e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,0);return t.filter((function(t){var e=t.date.toDate();return e>=n&&e<=r})).map((function(t){var e=t.date.toDate(),n=e.getDate().toString().padStart(2,"0"),r=(e.getMonth()+1).toString().padStart(2,"0"),a=e.getFullYear();return{title:"⭐",start:"".concat(a,"-").concat(r,"-").concat(n)}}))}function getRecipesData(t){return _getRecipesData.apply(this,arguments)}function _getRecipesData(){return _getRecipesData=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:onAuthStateChanged(auth,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=8;break}return n=e.uid,console.log(n),r=collection(db,"users"),t.next=6,getDoc(doc(r,"0y9Kkgd303QrsKSuXzKvqG2DI4E2"));case 6:showBookmarks(t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)}))),_getRecipesData.apply(this,arguments)}function showBookmarks(t){console.log(t);var e=document.getElementById("recipeContent");e.innerHTML="";var n=t.data().bookmarkedRecipes,r=0;n.forEach((function(n){var a=n.foodLabel,o=n.calories,i=n.carbs,c=n.protein,s=n.fat;e.innerHTML+='\n      <tr class="row bg-white" data-doc-id="'.concat(t.id,'">\n        <th class="col">').concat(a,'</th>\n        <th class="col">').concat(o,'</th>\n        <th class="col">').concat(i,'</th>\n        <th class="col">').concat(c,'</th>\n        <th class="col">').concat(s,'</th>\n        <th class="col"><button type="button" class="btn btn-secondary btn-sm instructionBtn" data-doc-id="').concat(r,'"><i class=\'bx bx-book-open bx-sm\'></i></button></th>\n        <th class="col"><button type="button" class="btn btn-secondary btn-sm ingredientsBtn" data-doc-id="').concat(r,'"><i class=\'bx bx-book-open bx-sm\'></i></button></th>\n        <th class="col"><button type="button" class="btn btn-secondary btn-sm downloadRecipeBtn" data-doc-id="').concat(r,"\"><i class='bx bxs-download bx-sm'></i></button></th>\n      </tr>\n    "),r++})),instructionsAddEventListener(),ingredientsAddEventListener(),downloadRecipeBtnAddEventlistener()}function instructionsAddEventListener(){var t=document.getElementsByClassName("instructionBtn");removeAllListenersFromClass(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){modalContent(e.dataset.docId,1)}))},n=0;n<t.length;n++)e()}function ingredientsAddEventListener(){var t=document.getElementsByClassName("ingredientsBtn");removeAllListenersFromClass(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){modalContent(e.dataset.docId,2)}))},n=0;n<t.length;n++)e()}function downloadRecipeBtnAddEventlistener(){var t=document.getElementsByClassName("downloadRecipeBtn");removeAllListenersFromClass(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){downloadRecipePDF(e.parentNode.parentNode,e.dataset.docId)}))},n=0;n<t.length;n++)e()}function downloadRecipePDF(t,e){return _downloadRecipePDF.apply(this,arguments)}function _downloadRecipePDF(){return(_downloadRecipePDF=_asyncToGenerator(_regeneratorRuntime().mark((function t(e,n){var r,a;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.getAttribute("data-doc-id"),r=collection(db,"users"),t.next=4,getDoc(doc(r,"0y9Kkgd303QrsKSuXzKvqG2DI4E2"));case 4:a=t.sent,recipePDFFunc(a.data().bookmarkedRecipes[n]);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function recipePDFFunc(t){var e=new jsPDF;if(null!=t){console.log(t);var n="Recipe Name: ".concat(t.foodLabel),r=e.splitTextToSize(n,e.internal.pageSize.width-20);e.text(10,10,r);var a=20;e.text(10,a,"Calories: ".concat(t.calories)),a+=10,e.text(10,a,"Carbs: ".concat(t.carbs)),a+=10,e.text(10,a,"Protein: ".concat(t.protein)),a+=10,e.text(10,a,"Fat: ".concat(t.fat)),a+=10,t.ingredients.forEach((function(t,n){var r="".concat(n+1,". ").concat(t);e.splitTextToSize(r,e.internal.pageSize.width-20).forEach((function(t){e.text(10,a,t),a+=10}))})),a+=10,e.text(10,a,"Instructions:"),a+=10,t.instructions.forEach((function(t,n){var r="".concat(n+1,". ").concat(t);e.splitTextToSize(r,e.internal.pageSize.width-20).forEach((function(t){e.text(10,a,t),a+=10}))})),e.save("recipe.pdf")}else alert("No data found")}function modalContent(t,e){return _modalContent.apply(this,arguments)}function _modalContent(){return(_modalContent=_asyncToGenerator(_regeneratorRuntime().mark((function t(e,n){var r,a,o,i,c,s,d,l,u,f,h,p,g,y;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=document.getElementById("dataModal"),(a=r.querySelector(".modal-body")).innerHTML="",o=collection(db,"users"),t.next=6,getDoc(doc(o,"0y9Kkgd303QrsKSuXzKvqG2DI4E2"));case 6:if(i=t.sent,c=i.data().bookmarkedRecipes[e],console.log(c,"CHECK ME"),!(e<0||e>=c.length)){t.next=16;break}return(s=document.createElement("p")).textContent="Invalid index",a.appendChild(s),food_recordModal.hide(),dataModal.show(),t.abrupt("return");case 16:(d=document.createElement("h3")).textContent=1==n?"".concat(e+1,". ").concat(c.foodLabel," - Recipe Instructions"):"".concat(e+1,". ").concat(c.foodLabel," - Recipe Ingredients List"),a.appendChild(d),1==n?"string"==typeof c.instructions?((l=document.createElement("p")).textContent=c.instructions,a.appendChild(l)):Array.isArray(c.instructions)?(u=document.createElement("ul"),f=1,c.instructions.forEach((function(t){var e=document.createElement("li");e.textContent=f+". "+t,u.appendChild(e),f++})),a.appendChild(u)):((h=document.createElement("p")).textContent="No instructions available.",a.appendChild(h)):"string"==typeof c.ingredients?((p=document.createElement("p")).textContent=c.ingredients,a.appendChild(p)):Array.isArray(c.ingredients)?(g=document.createElement("ul"),c.ingredients.forEach((function(t){var e=document.createElement("li");e.textContent=t,g.appendChild(e)})),a.appendChild(g)):((y=document.createElement("p")).textContent="No ingredients available.",a.appendChild(y)),food_recordModal.hide(),dataModal.show();case 22:case"end":return t.stop()}}),t)})))).apply(this,arguments)}