let COUNTER = 0;
const MAX_COUNT = 10;

function updateProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    const percentage = (COUNTER / MAX_COUNT) * 100;
    progressBar.value = percentage;
}

function showResetMessage() {
    const resetAlert = document.querySelector(".resetAlert");
    resetAlert.open = true; // Display reset message
}

function hideResetMessage() {
    const resetAlert = document.querySelector(".resetAlert");
    resetAlert.open = false; // Hide reset message
}

function incrementCounter() {
    if (COUNTER < MAX_COUNT) {
        COUNTER += 1;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
    }
}

function decrementCounter() {
    if (COUNTER > 0) {
        COUNTER -= 1;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
    }
}

function resetCounter() {
    if (COUNTER !== 0) {
        COUNTER = 0;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
        showResetMessage(); // Display reset message when resetting
        setTimeout(hideResetMessage, 3000); // Hide reset message after 3 seconds (adjust as needed)
    }
}

// Attach event listeners to buttons
document.querySelector(".incrementButton").addEventListener('click', incrementCounter);
document.querySelector(".decrementButton").addEventListener('click', decrementCounter);
document.querySelector(".resetButton").addEventListener('click', resetCounter);

// Initialize progress bar
updateProgressBar();
