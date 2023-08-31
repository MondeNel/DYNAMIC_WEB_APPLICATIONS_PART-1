//@ts-check
import { authors } from './data.js';

// Import necessary modules
import {
    handleSearchFormSubmit,
    handleSearchCancelButtonClick,
    initializeSearchCancelButton,
    initializeSearchOverlay,
} from './searchFunctionality.js';

import { handleDataListButtonClick, loadMoreBooks } from './bookListFunctionality.js';
import { showThemeSelectionDialog } from './themeSettings.js';
import { createAuthors } from './searchFunctionality.js';
import { createGenreSelect } from './searchFunctionality.js';
import { handleSettingsButtonClick } from './themeSettings.js';


// Initialize search form and search overlay event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Search form submission event listener
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    // Search cancel button and overlay event listeners
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchCancelButton && searchOverlayElement) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);

        searchOverlayElement.addEventListener('toggle', function () {
            //@ts-ignore
            if (searchOverlayElement.open === true) {
                //@ts-ignore
                searchCancelButton.disabled = false;
            }
        });
    }

    // Initialize search cancel button and overlay
    initializeSearchCancelButton();
    initializeSearchOverlay();
});

// Attach the event listener for data list button when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    handleDataListButtonClick();
});

// Event listener for theme selection dialog
document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', showThemeSelectionDialog);
    }
});

// Initialize author select options for main book list and search view
document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    const searchAuthorsSelect = document.querySelector('[data-search-authors]');
    if (authorsSelect) {
        //@ts-ignore
        createAuthors(authorsSelect, authors); // Pass the authorsSelect element and authors object
    }
    if (searchAuthorsSelect) {
        //@ts-ignore
        createAuthors(searchAuthorsSelect, authors); // Pass the searchAuthorsSelect element and authors object
    }
});

// Initialize genre select options for both list view and search view
document.addEventListener('DOMContentLoaded', function () {
    createGenreSelect();
});

// Event listener for settings button click
document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', handleSettingsButtonClick);
    }
});

// Load more books when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadMoreBooks();
});