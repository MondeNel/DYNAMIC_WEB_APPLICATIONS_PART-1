// bookList.js
import { createPreview } from "./preview.js";
import { books, BOOKS_PER_PAGE, authors } from "./data.js";


let page = 1;

export function loadMoreBooks() {
    const rangeStart = (page - 1) * BOOKS_PER_PAGE;
    const rangeEnd = page * BOOKS_PER_PAGE;
    const extracted = books.slice(rangeStart, rangeEnd);

    const fragment = document.createDocumentFragment();

    for (const book of extracted) {
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        });

        fragment.appendChild(preview);
    }

    const listItemsContainer = document.querySelector('[data-list-items]');

    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }
    page++;

    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
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

function loadInitialBooks() {
    const dataListButton = document.querySelector('[data-list-button]');

    dataListButton.addEventListener('click', loadMoreBooks);

    loadMoreBooks();
}

document.addEventListener('DOMContentLoaded', loadInitialBooks);

export function updateBookList(results) {
    const fragment = document.createDocumentFragment();

    for (const book of results) {
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        });

        fragment.appendChild(preview);
    }

    const listItemsContainer = document.querySelector('[data-list-items]');

    if (listItemsContainer) {
        listItemsContainer.innerHTML = ''; // Clear existing content
        listItemsContainer.appendChild(fragment);
    }
}
export { page };
