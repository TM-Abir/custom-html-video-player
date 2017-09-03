window.addEventListener("load",function(){

//video container
	video= document.getElementById('video');
	pauseScreen = document.getElementById('screen');
	screenButton = document.getElementById('screen-button');
	
pbar=document.getElementById('pbar');

	playButton = document.getElementById('play-button');

	
	timeField = document.getElementById('time-field');

	soundButton =document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');
	fullscreenButton = document.getElementById('fullscreen-button');


//progressbar
pbarcontainer= document.getElementById('pbar-container');


	video.load();
	video.addEventListener('canplay',function(){

		playButton.addEventListener('click', playOrPause, false);
		pbarcontainer.addEventListener('click', skip, false);
	
		updatePlayer();
		soundButton.addEventListener('click', muteOrUnmute , false);
		sbarContainer.addEventListener('click', changeVolume, false);
		fullscreenButton.addEventListener('click', fullscreen, false);
		screenButton.addEventListener('click', playOrPause, false);
		video.addEventListener('click', playOrPause,false);


	},false);

	

},false);

playOrPause = function(){

	if(video.paused){
		video.play();
		playButton.src="icon/pause.png"
		update= setInterval(updatePlayer,30);

		pauseScreen.style.display= "none";
		screenButton.src="icon/screenplay.png"
	} else {
		video.pause();
		playButton.src="icon/play.png"
		window.clearInterval(update);

		pauseScreen.style.display="block";
		screenButton.src="icon/screenplay.png"
	}
};

function updatePlayer(){
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage + '%';
	timeField.innerHTML = getFormattedTime();
	if(video.ended){
		window.clearInterval(update);
		playButton.src="icon/replay.png";

		pauseScreen.style.display="block";
		screenButton.src="icon/screenreplay.png"
	} else if(video.paused){
		playButton.src = "icon/play.png"
		screenButton.src = "icon/screenplay.png"
	}
}



function skip(ev){

	var mousex= ev.pageX - pbarcontainer.offsetLeft;
	var width = window.getComputedStyle(pbarcontainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));
	
	video.currentTime = (mousex/width)*video.duration;
	updatePlayer();

	
}

function getFormattedTime(){
	// 1:32
	var seconds= Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	
	if(minutes>0) seconds -= minutes*60;
	if(seconds.toString().length === 1) seconds = '0'+seconds;


	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);
	if( totalMinutes > 0) totalSeconds -= totalMinutes*60;
	if(totalSeconds.toString().length === 1) totalSeconds = '0'+totalSeconds;


	return minutes + ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;
}


function muteOrUnmute(){
	if(!video.muted){
		video.muted = true;
		soundButton.src = "icon/mute.png"
		sbar.style.display = "none";
	}else {
		video.muted = false;
		soundButton.src = "icon/volume.png"
		sbar.style.display="block";
	}
}

function changeVolume(ev){
	var mousex = ev.pageX - sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mousex/width);
	sbar.style.width= (mousex/width)*100 + '%';
	video.muted = false;
	soundButton.src = "icon/volume.png"
	sbar.style.display="block";
}

function fullscreen(){
	if (video.requestFullscreen){
		video.requestFullscreen();
	} else if(video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen();
			}
	else if(video.mozRequestFullscreen) {
				video.mozRequestFullscreen();
			}
			else if(video.msRequestFullscreen) {
				video.msRequestFullscreen();
			}
}