//@ts-check

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
