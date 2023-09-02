

/**
 * The counter variable to keep track of the current tally count.
 * @type {number}
 */
let COUNTER = 0;

/**
 * Increment the tally counter when the "Add" button is clicked.
 * @function
 * @listens click
 */
document.querySelector(".incrementButton").addEventListener('click', () => {
    COUNTER += 1;
    document.querySelector(".counter").textContent = COUNTER;
});

/**
 * Decrement the tally counter when the "Subtract" button is clicked.
 * @function
 * @listens click
 */
document.querySelector(".decrementButton").addEventListener('click', () => {
    COUNTER -= 1;
    document.querySelector(".counter").textContent = COUNTER;
});

/**
 * Reset the tally counter to zero when the "Reset" button is clicked.
 * If the counter is not already at zero, a confirmation message is displayed.
 * @function
 * @listens click
 */
document.querySelector(".resetButton").addEventListener('click', () => {
    if (COUNTER !== 0) {
        COUNTER = 0;
        document.querySelector(".counter").textContent = COUNTER;
        const resetAlert = document.querySelector(".resetAlert");
        resetAlert.open = true; // Display reset message
    }
});
