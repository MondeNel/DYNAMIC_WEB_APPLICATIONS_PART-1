//Booklist.js

//@ts-check

import { createPreview } from "./previewFunctionality.js";
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


// dataListButton.js



/**
 * Handles the click event for data list button.
 */
export function handleDataListButtonClick() {
    // @ts-ignore
    document.querySelector('[data-list-items]').addEventListener('click', function (event) {
        // @ts-ignore
        const pathArray = Array.from(event.path || event.composedPath());
        let active;

        for (const node of pathArray) {
            if (active) break; // Exit the loop if the active book is found
            const previewId = node?.dataset?.preview;

            for (const singleBook of books) {
                if (singleBook.id === previewId) {
                    active = singleBook; // Found the active book
                    break;
                }
            }
        }

        // If no active book is found, exit the function
        if (!active) return;

        const dataListActive = document.querySelector('[data-list-active]');
        const dataListBlur = document.querySelector('[data-list-blur]');
        const dataListImage = document.querySelector('[data-list-image]');
        const dataListTitle = document.querySelector('[data-list-title]');
        const dataListSubtitle = document.querySelector('[data-list-subtitle]');
        const dataListDescription = document.querySelector('[data-list-description]');

        if (dataListActive) {
            // @ts-ignore
            dataListActive.open = true;
        }
        if (dataListBlur) {
            // @ts-ignore
            dataListBlur.src = active ? '' : active.image;
        }
        if (dataListImage) {
            // @ts-ignore
            dataListImage.src = active ? active.image : '';
        }
        if (dataListTitle) {
            dataListTitle.textContent = active.title;
        }
        if (dataListSubtitle) {
            dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;


        }
        if (dataListDescription) {
            dataListDescription.textContent = active.description;
        }

        /**
         * Handles the click event for data list close button.
         *
         * @param {Event} event - The click event object.
         */
        function handleDataListCloseClick(event) {
            if (dataListActive) {
                // @ts-ignore
                dataListActive.open = false;
            }
        }

        const dataListCloseButton = document.querySelector('[data-list-close]');
        if (dataListCloseButton) {
            dataListCloseButton.addEventListener('click', handleDataListCloseClick);
        }
    });
}

// Attach the event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const authors = {}; // Define your authors object here or import it if needed
    // @ts-ignore
    handleDataListButtonClick(authors);
});