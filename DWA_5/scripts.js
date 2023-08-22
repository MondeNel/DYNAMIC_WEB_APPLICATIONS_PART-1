// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Convert inputs to numbers
    const dividendNum = parseFloat(dividend);
    const dividerNum = parseFloat(divider);

    // Check for invalid inputs
    if (isNaN(dividendNum) || isNaN(dividerNum)) {
        result.innerText = "Something critical went wrong. Please reload the page.";
        console.error("Invalid input provided.");
        return;
    }

    // Check for division by zero
    if (dividerNum === 0) {
        result.innerText = "Division not performed. Invalid number provided. Try again.";
        console.error("Division by zero.");
        return;
    }

    const divisionResult = dividendNum / dividerNum;

    // Check if the result is a whole number
    if (Number.isInteger(divisionResult)) {
        result.innerText = divisionResult.toString();
    } else {
        result.innerText = divisionResult.toFixed(0);
    }
});
