import { books, authors } from './data.js';

/**
 * Creates author select options and appends them to the provided select element.
 *
 * @param {HTMLElement} selectElement - The HTML select element to which author options will be appended.
 * @param {Object} authorsData - An object containing author information with author IDs as keys and author names as values.
 */
export function createAuthors(selectElement, authorsData) {
    const authorsFragment = document.createDocumentFragment();

    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = 'any';
    allAuthorsOption.innerText = 'All Authors';
    authorsFragment.appendChild(allAuthorsOption);

    const authorsEntries = Object.entries(authorsData);

    for (const [id, name] of authorsEntries) {
        const authorOption = document.createElement('option');
        authorOption.value = id;
        authorOption.innerText = name;
        authorsFragment.appendChild(authorOption);
    }

    if (selectElement) {
        selectElement.innerHTML = '';
        selectElement.appendChild(allAuthorsOption);
        selectElement.appendChild(authorsFragment);
    }
}

/**
 * Initializes the author select options for both list view and search view.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    if (authorsSelect) {
        // Initialize author select options for list view
        createAuthors(authorsSelect, authors);
    }

    const searchAuthorsSelect = document.querySelector('[data-search-authors]');
    if (searchAuthorsSelect) {
        // Initialize author select options for search view
        createAuthors(searchAuthorsSelect, authors);
    }
});
