import {
    handleSearchFormSubmit,
    handleSearchCancelButtonClick,
    initializeSearchCancelButton,
    initializeSearchOverlay,
} from './search.js';

/**
 * Initialize search form and search overlay event listeners.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Handles the submission of the search form.
     *
     * @param {Event} event - The form submission event.
     */
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    /**
     * Handles the click event for the search cancel button and overlay.
     */
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchCancelButton && searchOverlayElement) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);

        searchOverlayElement.addEventListener('toggle', function () {
            if (searchOverlayElement.open === true) {
                searchCancelButton.disabled = false;
            }
        });
    }

    // Initialize search cancel button and overlay
    initializeSearchCancelButton();
    initializeSearchOverlay();
});

import { handleDataListButtonClick } from './dataListButton.js';

/**
 * Attach the event listener for the data list button when DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    handleDataListButtonClick();
});

// Other code in main.js

import { showThemeSelectionDialog } from './theme.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        /**
         * Event listener for opening the theme selection dialog.
         */
        settingsButton.addEventListener('click', showThemeSelectionDialog);
    }
});

import { createAuthors } from './authorSelect.js';
import { authors } from "./data.js";

document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    if (authorsSelect) {
        /**
         * Initializes author select options for the main book list.
         */
        createAuthors(authorsSelect, authors);
    }

    const searchAuthorsSelect = document.querySelector('[data-search-authors]');
    if (searchAuthorsSelect) {
        /**
         * Initializes author select options for the search view.
         */
        createAuthors(searchAuthorsSelect, authors);
    }
});

import { createGenreSelect } from './genreSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    /**
     * Initializes genre select options for both list view and search view.
     */
    createGenreSelect();
});

import { handleSettingsButtonClick } from './settings.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', handleSettingsButtonClick);
    }
});

import { loadMoreBooks } from './bookList.js';

document.addEventListener('DOMContentLoaded', function () {
    /**
     * Loads and appends more books to the book list.
     */
    loadMoreBooks();
});

document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    const searchAuthorsSelect = document.querySelector('[data-search-authors]');

    if (authorsSelect) {
        /**
         * Initializes author select options for the main book list.
         */
        createAuthors(authorsSelect, authors);
    }

    if (searchAuthorsSelect) {
        /**
         * Initializes author select options for the search view.
         */
        createAuthors(searchAuthorsSelect, authors);
    }
});
