var cast = document.createElement('script');
var id = chrome.runtime.id;
cast.src = "chrome-extension://" + id + "/cast.js";
document.head.appendChild(cast);

var cast = document.createElement('script');
cast.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js";
document.head.appendChild(cast);