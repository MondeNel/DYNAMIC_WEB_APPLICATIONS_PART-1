import { books, genres, BOOKS_PER_PAGE, authors } from './data.js';
import { previewModule } from './previewModule.js';

export const bookModule = {
    booksList: books,
    matches: books.slice(0, BOOKS_PER_PAGE),
    page: 1,

    loadInitialBooks() {
        const dataListButton = document.querySelector('[data-list-button]');
        dataListButton.addEventListener('click', this.loadMoreBooks);
        this.loadMoreBooks();
    },

    loadMoreBooks() {
        const rangeStart = (this.page - 1) * BOOKS_PER_PAGE;
        const rangeEnd = this.page * BOOKS_PER_PAGE;
        const extracted = this.booksList.slice(rangeStart, rangeEnd);

        const fragment = document.createDocumentFragment();
        for (const book of extracted) {
            const preview = previewModule.createPreview({
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

        this.page++;

        const dataListButton = document.querySelector('[data-list-button]');
        if (dataListButton) {
            const totalBooks = this.booksList.length;
            const remainingBooks = totalBooks - (this.page * BOOKS_PER_PAGE);
            const remainingText = remainingBooks > 0 ? remainingBooks : 0;
            dataListButton.innerHTML = `
                <span>Show more</span>
                <span class="list__remaining">(${remainingText})</span>
            `;
            dataListButton.disabled = remainingBooks <= 0;
        }
    },

    // Other functions related to book module
    // ...
};


