import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";

/**
 * An array containing the list of available books.
 * @type {Array<Object>}
 */
const booksList = books;

/**
 * An array containing the initial matches (books) to be displayed.
 * @type {Array<Object>}
 */
let matches = books.slice(0, BOOKS_PER_PAGE);

/**
 * The current page number for pagination.
 * @type {number}
 */
let page = 1;

/**
 * The range of indices to determine the books to display.
 * @type {Array<number>}
 */
const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];

if (!matches || !Array.isArray(books)) {
    throw new Error('Source required');
}

if (!range || range.length < 2) {
    throw new Error('Range must be an array with two numbers');
}



/**
 * Creates a preview element for a book.
 * @param {Object} bookData - The data of the book to create a preview for.
 * @param {string} bookData.authors - The authors of the book.
 * @param {string} bookData.id - The ID of the book.
 * @param {string} bookData.image - The URL of the book's image.
 * @param {string} bookData.title - The title of the book.
 * @param {string} bookData.genre - The genre of the book.
 * @returns {HTMLElement} The created preview element.
 */
function createPreview(bookData) {
    const { authors, id, image, title, genre } = bookData;

    const preview = document.createElement('div');
    preview.classList.add('preview');
    preview.setAttribute('data-preview', id);

    const imageElement = document.createElement('img');
    imageElement.classList.add('preview__image');
    imageElement.src = image;

    const info = document.createElement('div');
    info.classList.add('preview__info');

    const titleElement = document.createElement('h3');
    titleElement.classList.add('preview__title');
    titleElement.textContent = title;

    const genreElement = document.createElement('div');
    genreElement.classList.add('preview__genre');
    genreElement.textContent = genre;

    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');

    const authorName = authors[authors];
    authorElement.textContent = authorName;

    info.appendChild(genreElement);

    info.appendChild(titleElement);
    info.appendChild(authorElement);

    preview.appendChild(imageElement);
    preview.appendChild(info);
    return preview;
}








/** ===================================== Show more button - data-list-button ======================================*/

/**
 * Initializes the page by setting up the initial books and 'Load More' functionality.
 */
function loadInitialBooks() {
    /**
     * The button element responsible for loading more books.
     * @type {HTMLElement}
     */
    const dataListButton = document.querySelector('[data-list-button]');
    dataListButton.addEventListener('click', loadMoreBooks);
    loadMoreBooks();
}

// Load initial books when the DOM content is loaded.
document.addEventListener('DOMContentLoaded', loadInitialBooks);

/**
 * Loads more books and appends them to the list.
 */
function loadMoreBooks() {
    /**
     * The starting index of the range for extracting books.
     * @type {number}
     */
    const rangeStart = (page - 1) * BOOKS_PER_PAGE;

    /**
     * The ending index of the range for extracting books.
     * @type {number}
     */
    const rangeEnd = page * BOOKS_PER_PAGE;

    /**
     * The extracted list of books based on the current range.
     * @type {Array<object>}
     */
    const extracted = books.slice(rangeStart, rangeEnd);

    /**
     * A document fragment to hold the created previews.
     * @type {DocumentFragment}
     */
    const fragment = document.createDocumentFragment();

    // Loop through each extracted book and create a preview for it.
    extracted.forEach((book) => {
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        });
        fragment.appendChild(preview);
    });

    /**
     * The container element for the list of book previews.
     * @type {HTMLElement}
     */
    const listItemsContainer = document.querySelector('[data-list-items]');

    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }

    // Increment the page counter.
    page++;

    /**
     * The button element responsible for loading more books.
     * @type {HTMLElement}
     */
    const dataListButton = document.querySelector('[data-list-button]');

    if (dataListButton) {
        const totalBooks = books.length;
        const remainingBooks = totalBooks - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;

        // Update the 'Load More' button text and disabled state.
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remainingText})</span>
        `;
        dataListButton.disabled = remainingBooks <= 0;
    }
}
