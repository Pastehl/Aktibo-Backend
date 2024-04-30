/*! For license information please see report.b598124e0cc0be026279.js.LICENSE.txt */
(()=>{"use strict";var t,e={2375:(t,e,n)=>{var r=n(223),o=n(5805),a=n(1032),i=n(8747),c=(n(301),n(6763));function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function s(){s=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var a=e&&e.prototype instanceof b?e:b,i=Object.create(a.prototype),c=new N(r||[]);return o(i,"_invoke",{value:j(t,n,c)}),i}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var p="suspendedStart",v="suspendedYield",y="executing",m="completed",g={};function b(){}function w(){}function x(){}var E={};d(E,i,(function(){return this}));var L=Object.getPrototypeOf,k=L&&L(L(P([])));k&&k!==n&&r.call(k,i)&&(E=k);var I=x.prototype=b.prototype=Object.create(E);function O(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function n(o,a,i,c){var s=h(t[o],t,a);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==u(d)&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(d).then((function(t){l.value=t,i(l)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}var a;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return a=a?a.then(o,o):o()}})}function j(e,n,r){var o=p;return function(a,i){if(o===y)throw new Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(r.method=a,r.arg=i;;){var c=r.delegate;if(c){var u=B(c,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===p)throw o=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var s=h(e,n,r);if("normal"===s.type){if(o=r.done?m:v,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=m,r.method="throw",r.arg=s.arg)}}}function B(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,B(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var a=h(o,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,g;var i=a.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function P(e){if(e||""===e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}throw new TypeError(u(e)+" is not iterable")}return w.prototype=x,o(I,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:w,configurable:!0}),w.displayName=d(x,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,d(t,l,"GeneratorFunction")),t.prototype=Object.create(I),t},e.awrap=function(t){return{__await:t}},O(S.prototype),d(S.prototype,c,(function(){return this})),e.AsyncIterator=S,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new S(f(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},O(I),d(I,l,"Generator"),d(I,i,(function(){return this})),d(I,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=P,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;C(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:P(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}function l(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){l(a,r,o,i,c,"next",t)}function c(t){l(a,r,o,i,c,"throw",t)}i(void 0)}))}}var f=(0,r.Wp)({apiKey:"AIzaSyAH168KKUYGhSGV_GVX5SqDGfxm4vtYR7w",authDomain:"aktibo-2023.firebaseapp.com",projectId:"aktibo-2023",storageBucket:"aktibo-2023.appspot.com",messagingSenderId:"363113385770",appId:"1:363113385770:web:bdf8d66757fd2067b8d853",measurementId:"G-1VTRRK1T20"}),h=(0,o.xI)(),p=(0,a.aU)(f);(0,o.hg)(h,function(){var t=d(s().mark((function t(e){var n,r,o;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=9;break}return n=e.uid,r=(0,a.rJ)(p,"users"),t.next=5,(0,a.x7)((0,a.H9)(r,n));case 5:(o=t.sent).exists()?o.data().isAdmin||(window.location.href="dashboard.html"):c.error("User document does not exist"),t.next=10;break;case 9:window.location.href="index.html";case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),document.getElementById("logout_btn").addEventListener("click",(function(){(0,o.CI)(h).then((function(){window.location.href="index.html"})).catch((function(t){}))}));var v=document.getElementById("viewPostModal"),y=new i.aF(v),m=document.getElementById("confirmDeleteModal"),g=new i.aF(m),b=document.getElementById("confirmUnflagModal"),w=(new i.aF(b),document.getElementById("closeConfirmDeleteBtn"));document.getElementById("closeConfirmUnflagBtn"),document.getElementById("confirmUnflagCancelBtn");function x(t){Array.from(t).forEach((function(t){var e=t.cloneNode(!0);t.parentNode.replaceChild(e,t)}))}document.getElementById("closeViewPostModal").addEventListener("click",(function(){y.hide()})),w.addEventListener("click",(function(){g.hide()})),m.addEventListener("click",(function(){g.hide()}));var E=document.getElementById("tableBody");function L(){return(L=d(s().mark((function t(){var e,n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(0,a.rJ)(p,"moments"),n=(0,a.P)(e,(0,a.My)("reports","desc")),t.next=4,(0,a.GG)(n);case 4:k(t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(t){t.forEach((function(t){!function(t,e){var n,r,o,a,i,u=null!==(n=t.data().reports[e].username)&&void 0!==n?n:"No Data",s=null!==(r=t.data().reports[e].violation)&&void 0!==r?r:"No Data",l=null!==(o=t.data().userID)&&void 0!==o?o:"No Data",d=null!==(a=t.data().reportsCount)&&void 0!==a?a:"No Data",f=null!==(i=t.data().isDisabled)&&void 0!==i?i:"Reported";c.log(f),"Reported"!=f&&(f="Disabled");E.innerHTML+='\n    <tr>\n            <th scope="row">'.concat(t.id,"</th>\n            <td>").concat(u,"</td>\n            <td>").concat(s,"</td>\n            <td>").concat(f,"</td>\n            <td>").concat(d,'</td>\n            <td>\n              <button type="button" class="btn btn-secondary btn-sm openPostModal" data-doc-id="').concat(t.id,'"><i class="bx bx-book-open bx-sm"></i></button>\n            </td>\n            <td>\n              <button type="button" class="btn btn-primary unflagBtn" data-doc-id="').concat(t.id,'">Unflag</button>\n              <button type="button" class="btn btn-danger disableBtn" data-doc-id="').concat(t.id+" "+l,'" >Disable</button>\n            </td>\n          </tr>\n    '),function(){var t=document.getElementsByClassName("openPostModal");x(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){!function(t){I.apply(this,arguments)}(e.dataset.docId),y.show()}))},n=0;n<t.length;n++)e()}(),function(){var t=document.getElementsByClassName("unflagBtn");x(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){c.log(e.dataset.docId),function(t,e){O.apply(this,arguments)}(e.dataset.docId,e.parentNode.parentNode),j("Post has been unflagged.")}))},n=0;n<t.length;n++)e()}(),function(){var t=document.getElementsByClassName("disableBtn");x(t);for(var e=function(){var e=t[n];e.addEventListener("click",(function(t){c.log(e.dataset.docId),function(t){S.apply(this,arguments)}(e.dataset.docId),j("Post has been disabled")}))},n=0;n<t.length;n++)e()}()}(t,0)}))}function I(){return(I=d(s().mark((function t(e){var n,r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.log(e),n=(0,a.H9)(p,"moments",e),t.next=4,(0,a.x7)(n);case 4:r=t.sent,o=r,void 0,document.getElementById("postData").innerHTML='\n    <div class="header_content">\n      <img src="'.concat(o.data().userImageSrc,'" alt="" class="prof-pic" style="max-width: 100%; max-height: 100%;">\n      <h4>').concat(o.data().username,'</h4>\n    </div>\n    <div class="post_caption">\n      <h6>').concat(o.data().caption,'</h6>\n    </div>\n    <div class="info" style="height: 30rem;">\n      <img src="').concat(o.data().imageSrc,'" style="width: 100%; height: 100%; object-fit: contain;">\n    </div>\n  ');case 6:case"end":return t.stop()}var o}),t)})))).apply(this,arguments)}function O(){return(O=d(s().mark((function t(e,n){var r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(0,a.H9)(p,"moments",e),c.log(e),t.next=4,(0,a.mZ)(r,{isReported:(0,a.CL)(),reports:(0,a.CL)(),reportsCount:(0,a.CL)()});case 4:n.parentNode.removeChild(n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function S(){return(S=d(s().mark((function t(e){var n,r,o;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.split(" "),r=(0,a.H9)(p,"moments",n[0]),o=(0,a.H9)(p,"users",n[1]),t.next=5,(0,a.mZ)(r,{isReported:(0,a.CL)(),isDisabled:!0,disableStrikeCount:(0,a.GV)(1)});case 5:return t.next=7,(0,a.mZ)(o,{reportsCount:(0,a.GV)(1)});case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function j(t){var e=document.getElementById("liveToast");e.querySelector(".toast-body").textContent=t,new i.y8(e).show()}E.innerHTML="",function(){L.apply(this,arguments)}()}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var a=n[t]={id:t,exports:{}};return e[t](a,a.exports,r),a.exports}r.m=e,t=[],r.O=(e,n,o,a)=>{if(!n){var i=1/0;for(l=0;l<t.length;l++){for(var[n,o,a]=t[l],c=!0,u=0;u<n.length;u++)(!1&a||i>=a)&&Object.keys(r.O).every((t=>r.O[t](n[u])))?n.splice(u--,1):(c=!1,a<i&&(i=a));if(c){t.splice(l--,1);var s=o();void 0!==s&&(e=s)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[n,o,a]},r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{r.b=document.baseURI||self.location.href;var t={857:0};r.O.j=e=>0===t[e];var e=(e,n)=>{var o,a,[i,c,u]=n,s=0;if(i.some((e=>0!==t[e]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(u)var l=u(r)}for(e&&e(n);s<i.length;s++)a=i[s],r.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return r.O(l)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),r.nc=void 0;var o=r.O(void 0,[253,767,124,805,747,270,682],(()=>r(2375)));o=r.O(o)})();