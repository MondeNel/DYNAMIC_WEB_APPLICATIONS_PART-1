
/**
 * The current tally count.
 * @type {number}
 */
let COUNTER = 0;

/**
 * The maximum count allowed.
 * @type {number}
 */
const MAX_COUNT = 10;

/**
 * Updates the progress bar based on the current tally count.
 */
function updateProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    const percentage = (COUNTER / MAX_COUNT) * 100;
    progressBar.value = percentage;
}

/**
 * Displays the reset message.
 */
function showResetMessage() {
    const resetAlert = document.querySelector(".resetAlert");
    resetAlert.open = true; // Display reset message
}

/**
 * Hides the reset message.
 */
function hideResetMessage() {
    const resetAlert = document.querySelector(".resetAlert");
    resetAlert.open = false; // Hide reset message
}

/**
 * Increments the tally counter and updates the display.
 */
function incrementCounter() {
    if (COUNTER < MAX_COUNT) {
        COUNTER += 1;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
    }
}

/**
 * Decrements the tally counter and updates the display.
 */
function decrementCounter() {
    if (COUNTER > 0) {
        COUNTER -= 1;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
    }
}

/**
 * Resets the tally counter to zero and displays a confirmation message.
 */
function resetCounter() {
    if (COUNTER !== 0) {
        COUNTER = 0;
        document.querySelector(".counter").textContent = COUNTER;
        updateProgressBar();
        showResetMessage(); // Display reset message when resetting
    }
}

// Attach event listeners to buttons
document.querySelector(".incrementButton").addEventListener('click', incrementCounter);
document.querySelector(".decrementButton").addEventListener('click', decrementCounter);
document.querySelector(".resetButton").addEventListener('click', resetCounter);

// Initialize progress bar
updateProgressBar();
