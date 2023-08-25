import { books, authors, genres } from "./data.js";
import { listModule } from "./listModule.js";

export const searchModule = {
    initializeSearch() {
        const searchForm = document.querySelector('[data-search-form]');
        searchForm.addEventListener('submit', this.handleSearchFormSubmit);
    },

    handleSearchFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);
        const results = [];

        for (const book of books) {
            const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
            const authorMatch = filters.author === 'any' || book.author === filters.author;
            let genreMatch = true;

            if (filters.genre !== 'any') {
                genreMatch = book.genres.includes(filters.genre);
            }

            if (titleMatch && authorMatch && genreMatch) {
                results.push(book);
            }
        }

        listModule.updateBookList(results);
    },
};
