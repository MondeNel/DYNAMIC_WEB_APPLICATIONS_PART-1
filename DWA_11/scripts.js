
/**
 * Creates an action to increment the counter.
 * @function
 * @returns {Object} An action object with type 'INCREMENT'.
 */
const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

/**
 * Creates an action to decrement the counter.
 * @function
 * @returns {Object} An action object with type 'DECREMENT'.
 */
const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

/**
 * Creates an action to reset the counter to zero.
 * @function
 * @returns {Object} An action object with type 'RESET'.
 */
const reset = () => {
    return {
        type: 'RESET'
    }
}

/**
 * Reducer function for managing the counter state.
 * @function
 * @param {number} state - The current state of the counter.
 * @param {Object} action - The action object that describes the state change.
 * @returns {number} The new state of the counter.
 */
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'RESET':
            return 0;
    }
};

/**
 * Create the Redux store with the counter reducer.
 * @type {Object}
 */
const store = Redux.createStore(counter);

/**
 * Subscribe to changes in the Redux store and log the state to the console.
 */
store.subscribe(() => console.log(store.getState()));

// Get references to the buttons in your HTML
const incrementButton = document.querySelector('.incrementButton');
const decrementButton = document.querySelector('.decrementButton');
const resetButton = document.querySelector('.resetButton');

// Add event listeners to the buttons
incrementButton.addEventListener('click', () => {
    store.dispatch(increment());
});

decrementButton.addEventListener('click', () => {
    store.dispatch(decrement());
});

resetButton.addEventListener('click', () => {
    store.dispatch(reset());
});
