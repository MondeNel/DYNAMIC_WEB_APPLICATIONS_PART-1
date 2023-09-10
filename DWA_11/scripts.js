// Action creators
const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

const reset = () => {
    return {
        type: 'RESET'
    }
}

// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'RESET':
            return 0;
        default:
            return state;
    }
};

// Create the Redux store
const store = Redux.createStore(counter);

// Display the state in the console whenever it changes
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
