let countdownDisplay = document.getElementById("countdownDisplay");
let startButton = document.getElementById("startBtn");
let stopButton = document.getElementById("stopBtn");
let setButton = document.getElementById("setBtn");
let minInput = document.getElementById("numInput");
let countdownButton = document.getElementById("countdownBtn");

let totalSeconds = 0;
let timer = null;
let resetTimer = null;
let isRunning = false;

function showCountdown() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    countdownDisplay.innerText = hours + ":" + minutes + ":" + seconds;
}

function startCountdown() {
    if (isRunning) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        startButton.innerText = "Resume";
        return;
    }

    if (totalSeconds <= 0) return;

    isRunning = true;
    startButton.innerText = "Pause";

    timer = setInterval(function () {
        totalSeconds--;

        if (totalSeconds <= 0) {
            totalSeconds = 0;
            clearInterval(timer);
            timer = null;
            isRunning = false;

            countdownDisplay.innerText = "TIME UP!";
            startButton.innerText = "Start";

            resetTimer = setTimeout(function () {
                showCountdown();
                resetTimer = null;
            }, 10000);

            return;
        }

        showCountdown();
    }, 1000);
}

function stopCountdown() {
    clearInterval(timer);
    clearTimeout(resetTimer);

    timer = null;
    resetTimer = null;
    totalSeconds = 0;
    isRunning = false;

    showCountdown();
    startButton.innerText = "Start";
}

function setCountdown() {
    let minutes = Number(minInput.value);

    if (minInput.value.trim() === "" || !Number.isFinite(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    clearInterval(timer);
    clearTimeout(resetTimer);

    timer = null;
    resetTimer = null;
    isRunning = false;

    totalSeconds = Math.floor(minutes * 60);
    showCountdown();

    startButton.innerText = "Start";
    setButton.classList.remove("hidden");
    minInput.classList.add("hidden");
    countdownButton.classList.add("hidden");
    minInput.value = "";
}

startButton.addEventListener("click", startCountdown);
stopButton.addEventListener("click", stopCountdown);

setButton.addEventListener("click", function () {
    setButton.classList.add("hidden");
    minInput.classList.remove("hidden");
    countdownButton.classList.remove("hidden");
    minInput.focus();
});

countdownButton.addEventListener("click", setCountdown);

minInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        setCountdown();
    }
});

function showDate() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    let months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    document.getElementById("date").innerText =
        date + " " + months[month] + " " + year;
}

function showTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) hours = 12;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("time").innerText =
        hours + ":" + minutes + ":" + seconds + " " + period;
}

showDate();
showTime();

setInterval(showTime, 1000);
showCountdown();