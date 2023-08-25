// search.js
import { updateBookList } from "./bookList.js"; // Import the necessary function from another module


function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const results = [];

    for (const book of booksList) {
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

    // Call the function to update the book list with the filtered results
    updateBookList(results);
}

// Attach the event listener to the search form
const searchForm = document.querySelector('[data-search-form]');

if (searchForm) {
    searchForm.addEventListener('submit', handleSearchFormSubmit);
}

// ... Rest of the search-related code
