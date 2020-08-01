function spam() {
  const elem = document.getElementById('player');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
  }
}

var colors = document.getElementById('colorsFrame');
const colorList = ['blue', 'green', 'red', 'black', 'purple'];
var index = 0;
//var startVid = false;
var randomInt = setInterval(changeColors, 1000);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '720px',
    width: '100%',
    videoId: 'iLBBRuVDOo4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onPause': playVid
    }
  });
}

var playing = false;

function changeColors() {
  if (index >= 4) {
    player.playVideo();
    playing = true;
    //clearInterval(randomInt);
    document.getElementById('player').style.display = 'block';
    document.getElementById('colorsFrame').innerHTML = 'Hi';
  }
  colors.innerHTML = 'This is so ' + colorList[index % 5];
  colors.style.backgroundColor = colorList[index % 5];
  index += 1;
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  if (playing) {
    event.target.playVideo();
  }
}

function playVid(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if(event.data != 1) {
    event.target.playVideo();
  }
}

setInterval(unMuteIfMuted, 1); // Checks to see if player is muted

function unMuteIfMuted() {
  if(player.isMuted()) {
    player.unMute();
  }
  player.setVolume(100);
}
