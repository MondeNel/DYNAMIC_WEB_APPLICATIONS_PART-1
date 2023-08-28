import { books, authors } from './data.js';

/**
 * Creates author select options and appends them to the provided select element.
 * 
 * @param {HTMLElement} selectElement - The HTML select element to which author options will be appended.
 * @param {Object} authorsData - An object containing author information with author IDs as keys and author names as values.
 */
export function createAuthors(selectElement, authorsData) {
    const authorsFragment = document.createDocumentFragment();

    // Create "All Authors" option
    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = 'any';
    allAuthorsOption.innerText = 'All Authors';
    authorsFragment.appendChild(allAuthorsOption);

    // Loop through authorsData to create author options
    for (const [id, name] of Object.entries(authorsData)) {
        const authorOption = document.createElement('option');
        authorOption.value = id;
        authorOption.innerText = name;
        authorsFragment.appendChild(authorOption);
    }

    if (selectElement) {
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
    if (authorsSelectList) {
        createAuthors(authorsSelectList, authors);
    }

    // Initialize author select options for search view
    const authorsSelectSearch = document.querySelector('[data-search-authors]');
    if (authorsSelectSearch) {
        createAuthors(authorsSelectSearch, authors);
    }
});
