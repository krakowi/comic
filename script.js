let timer;
let timeLeft = 60;
let round = 1;
const totalRounds = 5;

function changeTimerText(text) {
    document.getElementById('timer').textContent = text;
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timeLeft === 60) {
        timerElement.textContent = '01:00';
    } else if (timeLeft <= 0) {
        changeTimerText("🤓Не получилось🤡");
        clearInterval(timer);
        timer = null;
        timerElement.style.color = 'white'; // Установка белого цвета после истечения времени
    } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    // Change color based on time left
    if (timeLeft <= 10) {
        timerElement.style.color = 'red';
    } else if (timer) {
        timerElement.style.color = 'yellow';
    } else {
        timerElement.style.color = 'white';
    }
}


function updateRoundDisplay() {
    document.getElementById('round').textContent = `Круг: ${round}/${totalRounds}`;
}

function startTimer() {
    if (!timer) { // Start only if the timer is not already running
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
            }
        }, 1000);
    }
    updateTimerDisplay(); // Immediately update color to yellow when timer starts
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = 60;
    updateTimerDisplay();
    document.getElementById('startStopBtn').textContent = 'Запустить таймер';
}

function stopTimer() {
    const timerElement = document.getElementById('timer');
    clearInterval(timer);
    timer = null;
    document.getElementById('startStopBtn').textContent = 'Запустить таймер';
    
    if (round === totalRounds) {
        openModal();
    } else if (timeLeft > 0) {
        timerElement.textContent = '😹Ха-ха, рассмешил🎉';
        timerElement.style.color = 'white';
    }
}

function toggleTimer() {
    if (timer) {
        stopTimer();
    } else {
        startTimer();
        document.getElementById('startStopBtn').textContent = 'Остановить таймер';
    }
}

function resetAll() {
    resetTimer();
    round = 1;
    updateRoundDisplay();
    closeModal();
}

function nextRound() {
    if (round < totalRounds) {
        round++;
        resetTimer();
        updateRoundDisplay();
    }
}

function openModal() {
    document.getElementById('winnerModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('winnerModal').style.display = "none";
}

// Initialize the timer display
updateTimerDisplay();
updateRoundDisplay();
