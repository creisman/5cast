var sessionListener = function(e) {
  console.log(e);
};

var onRequestSessionSuccess = function(video, session) {
  var url = video.currentSrc;
  var file = url.split('?')[0];
  var type = file.substr(file.lastIndexOf('.') + 1) || "mp4"; // Default to MP4
  var mediaInfo = new chrome.cast.media.MediaInfo(url, "video/" + type);
  var request = new chrome.cast.media.LoadRequest(mediaInfo);
  session.loadMedia(request,
     onMediaDiscovered.bind(this, video),
     onMediaError.bind(this));
};

function onMediaDiscovered(video, media) {
   video.pause();
   console.log(media);
};

function onMediaError(e) {
   console.log(e);
};

var onLaunchError = function(e) {
  console.log(e);
};

var receiverListener = function(e) {
  if (e == chrome.cast.ReceiverAvailability.AVAILABLE) {
    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];

      video.addEventListener("play", function() {
        chrome.cast.requestSession(onRequestSessionSuccess.bind(this, video), onLaunchError);
      });
    }
  } else {
    console.log("No available receivers");
  }
};

var onInitSuccess = function(e) {
  console.log('Initialized');
};

var onError = function(e) {
  console.log(e);
};

var initializeCastApi = function() {
  var sessionRequest = new chrome.cast.SessionRequest(
                     chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};	

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
}