
let COUNTER = 0;

document.querySelector(".incrementButton").addEventListener('click', () => {
    COUNTER += 1;
    COUNTER = document.querySelector(".counter").textContent = COUNTER;
});


document.querySelector(".decrementButton").addEventListener('click', () => {
    if (COUNTER <= 0) {
        COUNTER -= 1;
        document.querySelector(".counter").textContent = COUNTER;
    }
});