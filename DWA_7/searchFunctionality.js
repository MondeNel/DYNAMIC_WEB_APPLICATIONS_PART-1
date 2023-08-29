//@ts-check


// search.js

import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { page } from './bookList.js';

/**
 * Handles the form submission event for the search form.
 *
 * @param {Event} event - The form submission event.
 */
export function handleSearchFormSubmit(event) {
    /**
     * Prevents the default form submission behavior and initiates book search.
     *
     * @event Event#submit
     * @param {Event} event - The form submission event.
     */
    event.preventDefault();

    // Extract filter data from form
    //@ts-ignore
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const results = [];

    // Loop through books and apply filters
    for (const book of books) {
        //@ts-ignore
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());

        const authorId = filters.author;
        const genre = filters.genre;

        const authorMatch = authorId === 'any' || book.author === authorId;
        //@ts-ignore
        const genreMatch = genre === 'any' || book.genres.includes(genre);

        if (titleMatch && authorMatch && genreMatch) {
            results.push(book);
        }
    }

    // Update the book list with filtered results
    updateBookList(results);

    // Enable search cancel and submit buttons
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchButton = document.querySelector('[data-search-button]');
    if (searchCancelButton && searchButton) {
        /**
         * Enables the search cancel and submit buttons.
         */
        //@ts-ignore
        searchCancelButton.disabled = false;
        //@ts-ignore
        searchButton.disabled = false;
    }
}


/**
 * Updates the book list based on the search results.
 *
 * @param {Array} results - An array of book objects representing search results.
 */
export function updateBookList(results) {
    // Select necessary elements
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    // Calculate remaining books
    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    // Update "Show more" button
    if (dataListButton) {
        //@ts-ignore
        dataListButton.disabled = !hasRemaining;
    }

    // Update "Show more" button text and visibility
    if (dataListButton) {
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    // Create document fragment to hold book previews
    const fragment = document.createDocumentFragment();

    // Populate fragment with book previews
    for (const book of results) {
        const { author: authorId, id, image, title } = book;
        const element = document.createElement('button');
        element.classList.add('preview');
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    // Clear and update data list items
    //@ts-ignore
    dataListItems.innerHTML = '';
    //@ts-ignore
    dataListItems.appendChild(fragment);

    // Show or hide no results message
    if (dataListMessage) {
        //@ts-ignore
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Show or hide "Show more" button and no results message
    if (dataListButton && dataListMessage) {
        //@ts-ignore
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        //@ts-ignore
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close search overlay
    if (dataSearchOverlay) {
        //@ts-ignore
        dataSearchOverlay.open = false;
    }
}

/**
 * Handles the click event for the search cancel button.
 */
export function handleSearchCancelButtonClick() {
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    //@ts-ignore
    if (searchOverlayElement.open === true) {
        /**
         * Closes the search overlay when the search cancel button is clicked.
         */
        //@ts-ignore
        searchOverlayElement.open = false;
    }
}

/**
 * Initializes the search cancel button event listener.
 */
export function initializeSearchCancelButton() {
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    if (searchCancelButton) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);
    }
}



/**
 * Attaches event listeners for search form initialization when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Initializes search form and search overlay event listeners.
     *
     * @event Event#DOMContentLoaded
     */
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    // Initialize Search Cancel Button
    initializeSearchCancelButton();

    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchOverlayElement) {
        searchOverlayElement.addEventListener('toggle', function () {
            /**
             * Enables the search cancel button when the search overlay is open.
             */
            //@ts-ignore
            if (searchOverlayElement.open === true) {
                const searchCancelButton = document.querySelector('[data-search-cancel]');
                if (searchCancelButton) {
                    //@ts-ignore
                    searchCancelButton.disabled = false;
                }
            }
        });
    }
});

/**
 * Initializes the search overlay and attaches event listener for opening the overlay.
 */
export function initializeSearchOverlay() {
    //@ts-ignore
    document.querySelector('[data-header-search]').addEventListener('click', function () {
        const searchOverlay = document.querySelector('[data-search-overlay]');
        const searchTitle = document.querySelector('[data-search-title]');

        /**
         * Opens the search overlay and focuses on the search input.
         */
        //@ts-ignore
        searchOverlay.open = true;
        //@ts-ignore
        searchTitle.focus();
    });
}

/**
 * Attaches the event listener for search overlay initialization when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    initializeSearchOverlay();
});


// authorSelect.js


import { authors } from './data.js';

/**
 * Creates author select options and appends them to the provided select element.
 * 
 * @param {HTMLSelectElement} selectElement - The HTML select element to which author options will be appended.
 * @param {Object} authorsData - An object containing author information with author IDs as keys and author names as values.
 */
export function createAuthors(selectElement, authorsData) {
    const authorsFragment = document.createDocumentFragment();

    // Create "All Authors" option
    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = 'any';
    allAuthorsOption.textContent = 'All Authors'; // Use textContent instead of innerText
    authorsFragment.appendChild(allAuthorsOption);

    // Loop through authorsData to create author options
    for (const [id, name] of Object.entries(authorsData)) {
        const authorOption = document.createElement('option');
        authorOption.value = id;
        authorOption.textContent = name; // Use textContent instead of innerText
        authorsFragment.appendChild(authorOption);
    }

    if (selectElement instanceof HTMLSelectElement) { // Check if selectElement is an instance of HTMLSelectElement
        // Clear existing options and append new options
        selectElement.innerHTML = '';
        selectElement.appendChild(allAuthorsOption);
        selectElement.appendChild(authorsFragment);
    }
}

/**
 * Initializes the author select options for both list view and search view.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize author select options for list view
    const authorsSelectList = document.querySelector('[data-list-authors]');
    if (authorsSelectList instanceof HTMLSelectElement) { // Check if authorsSelectList is an instance of HTMLSelectElement
        createAuthors(authorsSelectList, authors);
    }

    // Initialize author select options for search view
    const authorsSelectSearch = document.querySelector('[data-search-authors]');
    if (authorsSelectSearch instanceof HTMLSelectElement) { // Check if authorsSelectSearch is an instance of HTMLSelectElement
        createAuthors(authorsSelectSearch, authors);
    }
});