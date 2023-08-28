//@ts-check

import { createPreview } from "./preview.js";
import { books, BOOKS_PER_PAGE, authors } from "./data.js";

/**
 * Represents the current page number for pagination.
 * @type {number}
 */
let page = 1;

/**
 * Loads and appends more books to the book list.
 */
export function loadMoreBooks() {
    const rangeStart = (page - 1) * BOOKS_PER_PAGE;
    const rangeEnd = page * BOOKS_PER_PAGE;
    const extracted = books.slice(rangeStart, rangeEnd);

    const fragment = document.createDocumentFragment();

    for (const book of extracted) {
        const preview = createPreview({
            author: book.author, // Pass the author ID
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        }, authors); // Pass the authors object

        fragment.appendChild(preview);
    }

    const listItemsContainer = /** @type {HTMLDivElement} */ (document.querySelector('[data-list-items]'));

    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }
    page++;

    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton instanceof HTMLButtonElement) { // Check if dataListButton is an instance of HTMLButtonElement
        const totalBooks = books.length;
        const remainingBooks = totalBooks - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remainingText})</span>
        `;
        dataListButton.disabled = remainingBooks <= 0;
    }
}

/**
 * Loads initial books and attaches the event listener for loading more books.
 */
function loadInitialBooks() {
    const dataListButton = document.querySelector('[data-list-button]');

    if (dataListButton instanceof HTMLButtonElement) {
        dataListButton.addEventListener('click', loadMoreBooks);

        loadMoreBooks();
    }
}

document.addEventListener('DOMContentLoaded', loadInitialBooks);

/**
 * Updates the book list with the provided results.
 * 
 * @param {Array} results - An array of book objects to be displayed in the book list.
 */
export function updateBookList(results) {
    const fragment = document.createDocumentFragment();

    for (const book of results) {
        const preview = createPreview({
            author: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        }, authors);

        fragment.appendChild(preview);
    }

    const listItemsContainer = /** @type {HTMLDivElement} */ (document.querySelector('[data-list-items]'));

    if (listItemsContainer) {
        listItemsContainer.innerHTML = ''; // Clear existing content
        listItemsContainer.appendChild(fragment);
    }
}

// Export the 'page' variable
export { page };
