// Get references to form and result elements
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Display initial message when the page loads
result.innerText = "NO calculation performed";

// Add event listener for form submission
form.addEventListener("submit", handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the entered values from the form
    const dividendInput = event.target.querySelector('input[name="dividend"]');
    const dividerInput = event.target.querySelector('input[name="divider"]');

    // Get the values as strings and remove any extra spaces
    const dividend = dividendInput.value.trim();
    const divider = dividerInput.value.trim();

    // Check if either input is empty
    if (dividend === '' || divider === '') {
        showError("Division not performed. Both values are required in inputs. Try again.");
        return;
    }

    try {
        // Convert inputs to numeric values
        const dividendNum = parseFloat(dividend);
        const dividerNum = parseFloat(divider);

        // Check if inputs are valid numbers
        const areInputsValid = !isNaN(dividendNum) && !isNaN(dividerNum);
        if (!areInputsValid) {
            throw new Error("Invalid input format. Please enter valid numbers.");
        }

        // Check for invalid division (dividerNum is zero, NaN, or negative)
        const isInvalidDivision = dividerNum === 0 || isNaN(dividerNum) || dividerNum < 0;
        if (isInvalidDivision) {
            throw new Error("Division not performed. Invalid number provided. Try again.");
        }

        // Calculate the division result
        const divisionResult = parseFloat(dividend) / parseFloat(divider);

        // Display the division result without decimal
        result.innerText = Math.floor(divisionResult).toString();
    } catch (error) {
        // Handle errors by displaying error message and logging
        showError(error.message);
        console.error(error);

        // Crash the website if invalid characters/letters are divided
        const hasInvalidCharactersDivision = isInvalidCharactersDivision(dividend) || isInvalidCharactersDivision(divider);
        if (hasInvalidCharactersDivision) {
            crashWebsite();
        }
    }
}

// Function to display error message
function showError(message) {
    result.innerText = message;
}

// Function to check if a value involves invalid characters/letters
function isInvalidCharactersDivision(value) {
    return isNaN(parseFloat(value));
}

// Function to crash the website
function crashWebsite() {
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page</h1>";
    console.error("Something critical went wrong. Please reload the page");
}
