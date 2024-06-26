
let mainPage = document.getElementById("main");
let timeSection = document.getElementById("time-section");
let pomodoro = document.getElementById("pomodoro");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let clockEl = document.getElementById("clock");
let startBtn = document.getElementById("start");
let pageTitle = document.getElementById("title");
let progressBar = document.getElementById("progress-bar");

let Breakminute, time, strt, updateTitle, moveNext, wit;
wit = 0;

Breakminute = 25;
time = Breakminute * 60;
moveNext = 100 / time;

let setStyle = {
	pomofocus: function () {
		startBtn.textContent = "START";
		mainPage.style.background = "rgb(240, 91, 86)";
		timeSection.style.background = "rgba(255, 255, 255, 0.1)";
		startBtn.style.color = "rgb(240, 91, 86)";
		Breakminute = 25;
		time = Breakminute * 60;
		clockEl.textContent = "25:00";
		moveNext = 100 / time;
		wit = 0;
		updateTitle = "Time To Work";
		pageTitle.textContent = `25:00 | ${updateTitle}`;
		document.querySelector(`[data-sound="${timer.mode}"]`).play();
  
        startTimer();
	},
	shrtBrk: function () {
		startBtn.textContent = "START";
		mainPage.style.background = "rgb(76, 166, 169)";
		startBtn.style.color = "rgb(76, 166, 169)";
		timeSection.style.background = "rgba(255, 255, 255, 0.1)";
		Breakminute = 5;
		time = Breakminute * 60;
		clockEl.textContent = "05:00";
		moveNext = 100 / time;
		wit = 0;
		updateTitle = "Short Break";
		pageTitle.textContent = `05:00 | ${updateTitle}`;
		document.querySelector(`[data-sound="${timer.mode}"]`).play();
  
        startTimer();
	},
	lngBrk: function () {
		debugger;
		startBtn.textContent = "START";
		mainPage.style.background = "rgb(73, 143, 193)";
		startBtn.style.color = "rgb(73, 143, 193)";
		timeSection.style.background = "rgba(255, 255, 255, 0.1)";
		Breakminute = 15;
		time = Breakminute * 60;
		clockEl.textContent = "15:00";
		moveNext = 100 / time;
		wit = 0;
		updateTitle = "Long Break";
		pageTitle.textContent = `15:00 | ${updateTitle}`;
		document.querySelector(`[data-sound="${timer.mode}"]`).play();
  
        startTimer();
	},
};


let clickHandlers = {
	start: function () {},
	stop: function () {},
};
let startStop = false;
let clearInt;
let runFunc = function () {
	startStop = !startStop;
	if (startStop) {
		clearInt = setInterval(countDown, 1000);
	} else {
		startBtn.textContent = "START";
		clearInterval(clearInt);
	}
};

//Chức năng đếm ngược thời gian

function countDown() {
	debugger;
	startBtn.textContent = "STOP";

	minute = Math.floor(time / 60);
	let second = time % 60;

	if (minute < 1) {
		clearInterval((minute = 0));
	}
	var formatNum = ("0" + second).slice(-2);
	var formatNum1 = ("0" + minute).slice(-2);
	clockEl.innerHTML = `${formatNum1}:${formatNum}`;
	//moveNext++;
	wit = wit + moveNext;
	progressBar.style.width = `${wit}%`;

	pageTitle.innerHTML = `${formatNum1}:${formatNum} | ${updateTitle}`;
	time--;
}

// Gọi hàm khi click
pomodoro.onclick = setStyle.pomofocus;
shortBreak.onclick = setStyle.shrtBrk;
longBreak.onclick = setStyle.lngBrk;
startBtn.onclick = runFunc;


const buttonSound = new Audio('button-sound.mp3');
  const mainButton = document.getElementById('start');
  mainButton.addEventListener('click', () => {
    buttonSound.play();
    const { action } = mainButton.dataset;
    if (action === 'start') {
      startTimer();
    } else {
      stopTimer();
    }
  });