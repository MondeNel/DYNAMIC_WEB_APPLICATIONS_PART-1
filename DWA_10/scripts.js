let COUNTER = 0;

document.querySelector(".incrementButton").addEventListener('click', () => {
    COUNTER += 1;
    document.querySelector(".counter").textContent = COUNTER;
});

document.querySelector(".decrementButton").addEventListener('click', () => {
    COUNTER -= 1;
    document.querySelector(".counter").textContent = COUNTER;
});

document.querySelector(".resetButton").addEventListener('click', () => {
    if (COUNTER !== 0) {
        COUNTER = 0;
        document.querySelector(".counter").textContent = COUNTER;
        const resetAlert = document.querySelector(".resetAlert");
        resetAlert.open = true; // Display reset message
    }
});
