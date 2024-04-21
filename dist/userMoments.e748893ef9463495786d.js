/*! For license information please see userMoments.e748893ef9463495786d.js.LICENSE.txt */
(()=>{"use strict";var e,t={9403:(e,t,n)=>{var r=n(223),o=n(5805),i=n(1032),a=n(8747),s=n(5072),c=n.n(s),l=n(7825),d=n.n(l),u=n(7659),f=n.n(u),p=n(5056),v=n.n(p),h=n(540),m=n.n(h),y=n(1113),g=n.n(y),b=n(969),x={};x.styleTagTransform=g(),x.setAttributes=v(),x.insert=f().bind(null,"head"),x.domAPI=d(),x.insertStyleElement=m();c()(b.A,x);b.A&&b.A.locals&&b.A.locals;var k=n(6763);function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function L(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function I(){I=function(){return t};var e,t={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(e,t,n){e[t]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,n){return e[t]=n}}function d(e,t,n,r){var i=t&&t.prototype instanceof y?t:y,a=Object.create(i.prototype),s=new _(r||[]);return o(a,"_invoke",{value:S(e,n,s)}),a}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=d;var f="suspendedStart",p="suspendedYield",v="executing",h="completed",m={};function y(){}function g(){}function b(){}var x={};l(x,a,(function(){return this}));var k=Object.getPrototypeOf,L=k&&k(k(T([])));L&&L!==n&&r.call(L,a)&&(x=L);var E=b.prototype=y.prototype=Object.create(x);function B(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function N(e,t){function n(o,i,a,s){var c=u(e[o],e,i);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"==w(d)&&r.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(d).then((function(e){l.value=e,a(l)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(e,r){function o(){return new t((function(t,o){n(e,r,t,o)}))}return i=i?i.then(o,o):o()}})}function S(t,n,r){var o=f;return function(i,a){if(o===v)throw new Error("Generator is already running");if(o===h){if("throw"===i)throw a;return{value:e,done:!0}}for(r.method=i,r.arg=a;;){var s=r.delegate;if(s){var c=C(s,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===f)throw o=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=v;var l=u(t,n,r);if("normal"===l.type){if(o=r.done?h:p,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=h,r.method="throw",r.arg=l.arg)}}}function C(t,n){var r=n.method,o=t.iterator[r];if(o===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,C(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var i=u(o,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,m):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function T(t){if(t||""===t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}throw new TypeError(w(t)+" is not iterable")}return g.prototype=b,o(E,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:g,configurable:!0}),g.displayName=l(b,c,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,b):(e.__proto__=b,l(e,c,"GeneratorFunction")),e.prototype=Object.create(E),e},t.awrap=function(e){return{__await:e}},B(N.prototype),l(N.prototype,s,(function(){return this})),t.AsyncIterator=N,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new N(d(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},B(E),l(E,c,"Generator"),l(E,a,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=T,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return s.type="throw",s.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),j(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),m}},t}function B(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}function N(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){B(i,r,o,a,s,"next",e)}function s(e){B(i,r,o,a,s,"throw",e)}a(void 0)}))}}var S=n(6425),C=n(1894),O=(0,r.Wp)({apiKey:"AIzaSyAH168KKUYGhSGV_GVX5SqDGfxm4vtYR7w",authDomain:"aktibo-2023.firebaseapp.com",projectId:"aktibo-2023",storageBucket:"aktibo-2023.appspot.com",messagingSenderId:"363113385770",appId:"1:363113385770:web:bdf8d66757fd2067b8d853",measurementId:"G-1VTRRK1T20"}),j=(0,o.xI)(),_=(0,i.aU)(O);(0,o.hg)(j,(function(e){e||(window.location.href="index.html")})),document.getElementById("logout_btn").addEventListener("click",(function(){(0,o.CI)(j).then((function(){window.location.href="index.html"})).catch((function(e){}))}));var T=new a.aF("#editPostModal"),A=new a.aF("#editConfirmModal"),P=document.getElementById("editPostModalBtn"),G=document.getElementById("closeEditConfirm"),D=document.getElementById("saveCaption"),M=document.getElementById("editYes"),H=document.getElementById("editNo");document.getElementById("deleteYes"),document.getElementById("deleteNo");H.addEventListener("click",(function(){A.hide()})),P.addEventListener("click",(function(){T.hide()})),D.addEventListener("click",(function(){A.show()})),M.addEventListener("click",(function(){var e,t,n;k.log("checkEngine"),e=M.getAttribute("data-doc-id"),t=document.getElementById("postTextInput").value,(n=new C).append("text",t),n.append("lang","en"),n.append("mode","ml"),n.append("api_user","1227574749"),n.append("api_secret","NLvWeA9iUfYBqg6rMyx6VsaJXy"),S({url:"https://api.sightengine.com/1.0/text/check.json",method:"post",data:n,headers:{"Content-Type":"multipart/form-data"}}).then((function(n){var r=n.data.moderation_classes,o=n.data.moderation_classes.available,i=[];k.log(o);for(var a=0;a<o.length;a++)r[o[a]]>=.25&&i.push(o[a]);if(k.log(i),0==i.length)!function(e,t){ee.apply(this,arguments)}(e,t);else{var s=o.join(", ");q("Caption is flagged for the following ".concat(s,". Please change your caption."))}})).catch((function(e){e.response?k.log(e.response.data):k.log(e.message)})),A.hide(),T.hide()})),G.addEventListener("click",(function(){A.hide()}));var V=document.getElementById("main_content");V.innerHTML="";var F=!1;function Y(e){return Z.apply(this,arguments)}function Z(){return(Z=N(I().mark((function e(t){var n,r,a;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=L(t),e.prev=1,a=I().mark((function e(){var t,n,a;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.value,n=(0,i.H9)(_,"moments",t.momentID),e.next=4,(0,i.x7)(n);case 4:(a=e.sent).exists()?(0,o.hg)(j,(function(e){if(e){var t=e.uid;U(a,t)}else window.location.href="index.html"})):k.log("Moment with ID ".concat(t.momentID," not found"));case 6:case"end":return e.stop()}}),e)})),n.s();case 4:if((r=n.n()).done){e.next=8;break}return e.delegateYield(a(),"t0",6);case 6:e.next=4;break;case 8:e.next=13;break;case 10:e.prev=10,e.t1=e.catch(1),n.e(e.t1);case 13:return e.prev=13,n.f(),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[1,10,13,16]])})))).apply(this,arguments)}function q(e){var t=document.getElementById("liveToast");t.querySelector(".toast-body").textContent=e,new a.y8(t).show()}function U(e,t){var n=e.data().username,r=e.data().userImageSrc,o=e.data().imageSrc,i=e.data().caption,a=e.data().likes,s=e.data().isDisabled,c=e.data().reports,l=e.data().commentsList,d=e.data().comments,u=e.data().usersLiked,f=e.data().usersDisliked,p=(e.data().reportsCount,"bx-upvote"),v="bx-downvote";if(!(s||c&&c.includes(t))){(isNaN(a)||null==a)&&(a=0),(isNaN(d)||null==d||d<0)&&(d=0);var h="";null!=o&&""!=o&&(h='<img src="'+o+'">'),null==u&&(u=[]),null==f&&(f=[]),u&&u.includes(t)?p="bxs-upvote liked":f&&f.includes(t)&&(v="bxs-downvote disliked"),k.log(u.includes(t),f.includes(t),"!!!");for(var m="",y=0;y<l.length;y++){var g=l[y],b=g.comment,x=g.username,w=g.userImageSrc;m+='<div class="usr-profile" style="display: flex; align-items: center; align-items: flex-start;">\n        <img src="'.concat(w,'" alt="" class="prof-pic">\n        <div>\n          <p class="usr-name">').concat(x,'</p>\n          <div class="usr-comment" style="display: flex; align-items: center; justify-content: space-between;">\n            <p align="left">').concat(b,"</p>\n          </div>\n        </div>\n      </div>")}V.innerHTML+='\n    <div class = "post">\n      <div class="header_content d-flex justify-content-end">\n        <img src="'+r+'" alt="" class="prof-pic">\n        <h4 class="expand-width">'+n+'</h4>\n        <div class="dropdown-container" id="dropdown-container">\n          <i class=\'bx bx-dots-vertical bx-sm\' ></i>\n        </div>\n        <div class="dropdown-content" id="dropdown-content">\n          <ul>\n            <div>\n              <li class="editBtn" id=""data-doc-id ="'+e.id+'">Edit Post</li>\n              <li class="deleteBtn" id=""data-doc-id ="'+e.id+'">Delete Post</li>\n            </div>\n          </ul>\n        </div>\n      </div>\n      <div class="post_caption">\n        <h6>'+i+'</h6>\n      </div>\n      <div class="info">'+h+'</div>\n      <div class = "interact_content">\n        <i class=\'bx '+p+" likeButton' data-doc-id =\""+e.id+'"></i>\n        <span id = ""class="button-number">'+a+"</span>\n        <i class='bx "+v+" downvoteButton' data-doc-id =\""+e.id+"\"></i>\n        <i id = '' class='bx bx-comment-detail showCommentButton' data-doc-id =\""+e.id+'"></i>\n        <span class="button-number" id = "">\n          '+d+'\n        </span>\n      </div>\n      <div id = \'\' class="comment-section" style="max-height:8rem" data-doc-id ="'+e.id+'">'+m+"</div>",function(){var e=document.getElementsByClassName("likeButton"),t=document.getElementsByClassName("downvoteButton");R(e);for(var n=function(n){var r=e[n],o=r.dataset.docId,i=r.nextElementSibling;r.addEventListener("click",(function(e){var a=i.textContent;k.log("OG likeCount:",a),z(r,t[n],o,i,a,0)}))},r=0;r<e.length;r++)n(r)}(),function(){var e=document.getElementsByClassName("bx-dots-vertical");function t(){document.querySelectorAll(".dropdown-content").forEach((function(e){"block"===e.style.display&&(e.style.display="none")}))}R(e),document.addEventListener("click",(function(e){for(var n=!1,r=e.target;r;){if(r.classList&&r.classList.contains("dropdown-content")){n=!0;break}r=r.parentNode}n||t()}));for(var n=function(){var t=e[r];t.addEventListener("click",(function(e){k.log(t);var n=t.parentNode.nextElementSibling;k.log(n),"block"===n.style.display?(k.log("Close"),n.style.display="none"):(k.log("Open"),n.style.display="block"),e.stopPropagation()}))},r=0;r<e.length;r++)n()}(),function(){var e=document.getElementsByClassName("likeButton"),t=document.getElementsByClassName("downvoteButton");R(t);for(var n=function(n){var r=t[n],o=r.dataset.docId,i=r.previousElementSibling;r.addEventListener("click",(function(t){var a=i.textContent;k.log("OG likeCount:",a),z(e[n],r,o,i,a,1)}))},r=0;r<t.length;r++)n(r)}(),function(){var e=document.getElementsByClassName("editBtn");R(e);for(var t=function(){var t=e[n];t.addEventListener("click",(function(e){var n,r,o;k.log(t.parentNode.parentNode.parentNode.parentNode.nextElementSibling),n=t.dataset.docId,r=t.parentNode.parentNode.parentNode.parentNode.nextElementSibling,o=r.innerText,document.getElementById("postTextInput").value=o,M.removeAttribute("data-doc-id"),M.setAttribute("data-doc-id",n),T.show()}))},n=0;n<e.length;n++)t()}(),function(){var e=document.getElementsByClassName("deleteBtn");R(e);for(var t=function(){var t=e[n];t.addEventListener("click",(function(e){W=t.dataset.docId,X=t.parentNode.parentNode,K.show()}))},n=0;n<e.length;n++)t();document.getElementById("deleteYes").addEventListener("click",(function(){W&&X&&(!function(e,t,n){Q.apply(this,arguments)}(W,X),q("Post has been deleted.")),K.hide()})),document.getElementById("deleteNo").addEventListener("click",(function(){K.hide()})),document.getElementById("closeDeleteConfirm").addEventListener("click",(function(){K.hide()}))}()}}function R(e){Array.from(e).forEach((function(e){var t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))}window.addEventListener("scroll",N(I().mark((function e(){var t;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=V.lastElementChild)){e.next=8;break}if(!(t.getBoundingClientRect().bottom-2<=window.innerHeight)){e.next=8;break}if(F){e.next=6;break}return e.abrupt("return");case 6:F=!1,Y(3).then((function(){F=!1}));case 8:case"end":return e.stop()}}),e)})))),(0,o.hg)(j,(function(e){if(e){var t=(0,i.H9)(_,"users",e.uid);(0,i.x7)(t).then((function(e){if(e.exists()){var t=e.data().posts;null==t?V.innerHTML='<div class="post">\n  <div class="no-user-data">\n    There is no user data.\n  </div>\n</div>\n':Y(t)}else k.log("No such document!")})).catch((function(e){k.log("Error getting document:",e)}))}}));var K=new a.aF(document.getElementById("deleteConfirmModal")),W=null,X=null;function z(e,t,n,r,o,i){0===i?e.classList.contains("liked")?(e.classList.remove("liked"),k.log("removed 1 like"),o--,J(n,-1)):(e.classList.contains("liked")||(e.classList.add("liked"),k.log("added 1 like"),o++,J(n,1)),t.classList.contains("disliked")&&(k.log("disliked to liked"),e.classList.add("liked"),t.classList.remove("disliked"),k.log("removed 1 dislike"),o++,J(n,1))):1===i&&(t.classList.contains("disliked")?(t.classList.remove("disliked"),k.log("removed 1 dislike"),o++,J(n,1)):(t.classList.contains("disliked")||e.classList.contains("liked")||(t.classList.add("disliked"),k.log("added 1 dislike"),o-=1,J(n,-1)),e.classList.contains("liked")&&(t.classList.add("disliked"),e.classList.remove("liked"),k.log("liked and downvoted","added 1 dislike"),o-=2,J(n,-2)))),e.classList.contains("liked")?(e.classList.remove("bxs-downvote"),e.classList.add("bxs-upvote"),e.classList.remove("bx-upvote")):(e.classList.remove("bxs-upvote"),e.classList.add("bx-upvote")),t.classList.contains("disliked")?(t.classList.remove("bxs-upvote"),t.classList.add("bxs-downvote"),t.classList.remove("bx-downvote")):(t.classList.remove("bxs-downvote"),t.classList.add("bx-downvote")),r.textContent=o}function J(e,t){return $.apply(this,arguments)}function $(){return $=N(I().mark((function e(t,n){return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,o.hg)(j,function(){var e=N(I().mark((function e(r){var o,a,s;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=37;break}return o=(0,i.H9)(_,"moments",t),e.next=4,(0,i.x7)(o);case 4:if(a=e.sent,s=a.data()){e.next=9;break}return e.next=9,(0,i.mZ)(o,{usersLiked:[],usersDisliked:[]});case 9:if(!(n>0)){e.next=24;break}if(!s.usersLiked||!s.usersLiked.includes(r.uid)){e.next=15;break}return e.next=13,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersLiked:(0,i.C3)(r.uid)});case 13:case 18:e.next=22;break;case 15:if(!s.usersDisliked||!s.usersDisliked.includes(r.uid)){e.next=20;break}return e.next=18,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersDisliked:(0,i.C3)(r.uid)});case 20:return e.next=22,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersLiked:(0,i.hq)(r.uid)});case 22:case 28:case 33:e.next=37;break;case 24:if(!(n<0)){e.next=37;break}if(!s.usersDisliked||!s.usersDisliked.includes(r.uid)){e.next=30;break}return e.next=28,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersDisliked:(0,i.C3)(r.uid)});case 30:if(!s.usersLiked||!s.usersLiked.includes(r.uid)){e.next=35;break}return e.next=33,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersLiked:(0,i.C3)(r.uid)});case 35:return e.next=37,(0,i.mZ)(o,{likes:(0,i.GV)(n),usersDisliked:(0,i.hq)(r.uid)});case 37:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)}))),$.apply(this,arguments)}function Q(){return Q=N(I().mark((function e(t,n,r){return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,o.hg)(j,function(){var e=N(I().mark((function e(r){var o,a,s,c;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=22;break}return e.prev=1,e.next=4,(0,i.kd)((0,i.H9)(_,"moments",t));case 4:return o=(0,i.H9)(_,"users",r.uid),e.next=7,(0,i.x7)(o);case 7:if(!(a=e.sent).exists()){e.next=13;break}return s=a.data(),c=s.posts.filter((function(e){return e.momentId!==t})),e.next=13,(0,i.BN)(o,{posts:c},{merge:!0});case 13:n.remove(),k.log("Post deleted successfully"),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),k.error("Error deleting post:",e.t0);case 20:e.next=24;break;case 22:k.log("User is not authenticated. Redirecting to index page."),window.location.href="index.html";case 24:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)}))),Q.apply(this,arguments)}function ee(){return(ee=N(I().mark((function e(t,n){var r;return I().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k.log(t),r=(0,i.H9)(_,"moments",t),e.next=4,(0,i.mZ)(r,{caption:n});case 4:q("Caption Updated Successfully");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},969:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(1601),o=n.n(r),i=n(6314),a=n.n(i)()(o());a.push([e.id,"",""]);const s=a}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={id:e,exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(d=0;d<e.length;d++){for(var[n,o,i]=e[d],s=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,o,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={341:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,s,c]=n,l=0;if(a.some((t=>0!==e[t]))){for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(c)var d=c(r)}for(t&&t(n);l<a.length;l++)i=a[l],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(d)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),r.nc=void 0;var o=r.O(void 0,[67,767,124,805,747,45,865],(()=>r(9403)));o=r.O(o)})();