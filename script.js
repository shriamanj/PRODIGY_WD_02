let back = document.querySelector('#back');
let stopwatch_icon = document.querySelector('#stopwatch_icon');

back.addEventListener('click', goBack);
stopwatch_icon.addEventListener('click', goBack);

function goBack() {
    window.location.href = "/index.html"
}

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsDisplay.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsDisplay.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter} : ${lapTime}`;
        lapItem.style.marginTop = "20px";
        lapItem.style.listStyle = "none";
        lapsList.appendChild(lapItem);
    }
}
