import { books, authors, BOOKS_PER_PAGE } from './data.js';

export function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const results = [];

    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());

        const authorId = filters.author;
        const genre = filters.genre;

        const authorMatch = authorId === 'any' || book.author === authorId;
        const genreMatch = genre === 'any' || book.genres.includes(genre);

        if (titleMatch && authorMatch && genreMatch) {
            results.push(book);
        }
    }

    updateBookList(results);

    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchButton = document.querySelector('[data-search-button]');
    if (searchCancelButton && searchButton) {
        searchCancelButton.disabled = false;
        searchButton.disabled = false;
    }
}

export function updateBookList(results) {
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    if (dataListButton) {
        dataListButton.disabled = !hasRemaining;
    }

    if (dataListButton) {
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    const fragment = document.createDocumentFragment();

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

    dataListItems.innerHTML = '';
    dataListItems.appendChild(fragment);

    if (dataListMessage) {
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    if (dataListButton && dataListMessage) {
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}


// Search Cancel Button Click Event
export function handleSearchCancelButtonClick() {
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchOverlayElement.open === true) {
        searchOverlayElement.open = false; // Close the search overlay
    }
}

// Initialize Search Cancel Button
export function initializeSearchCancelButton() {
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    if (searchCancelButton) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);
    }
}

// Search Form Event Listener
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    // Initialize Search Cancel Button
    initializeSearchCancelButton();

    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchOverlayElement) {
        searchOverlayElement.addEventListener('toggle', function () {
            if (searchOverlayElement.open === true) {
                const searchCancelButton = document.querySelector('[data-search-cancel]');
                if (searchCancelButton) {
                    searchCancelButton.disabled = false;
                }
            }
        });
    }
});

export function initializeSearchOverlay() {
    document.querySelector('[data-header-search]').addEventListener('click', function () {
        const searchOverlay = document.querySelector('[data-search-overlay]');
        const searchTitle = document.querySelector('[data-search-title]');

        searchOverlay.open = true;
        searchTitle.focus();
    });
}

// Attach the event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeSearchOverlay();
});
