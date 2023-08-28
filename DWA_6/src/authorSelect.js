import { books, authors } from './data.js';


/**
 * Creates author select options and appends them to the provided select element.
 * 
 * @param {HTMLElement} selectElement - The HTML select element to which author options will be appended.
 * @param {Object} authors - An object containing author information with author IDs as keys and author names as values.
 */
export function createAuthors(selectElement, authors) {
    const authorsFragment = document.createDocumentFragment();

    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = 'any';
    allAuthorsOption.innerText = 'All Authors';
    authorsFragment.appendChild(allAuthorsOption);

    const authorsEntries = Object.entries(authors);

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
 */
document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    if (authorsSelect) {
        createAuthors(authorsSelect, authors); // Pass the select element and authors object
    }

    const searchAuthorsSelect = document.querySelector('[data-search-authors]');
    if (searchAuthorsSelect) {
        createAuthors(searchAuthorsSelect, authors); // Pass the select element and authors object
    }
});
