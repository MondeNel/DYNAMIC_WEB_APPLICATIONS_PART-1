import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";


import { handleSearchFormSubmit, handleSearchCancelButtonClick, updateBookList, initializeSearchCancelButton } from './search.js';

document.addEventListener('DOMContentLoaded', function () {

    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchCancelButton && searchOverlayElement) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);

        searchOverlayElement.addEventListener('toggle', function () {
            if (searchOverlayElement.open === true) {
                searchCancelButton.disabled = false;
            }
        });
    }

    initializeSearchCancelButton();
});

git 



import { showThemeSelectionDialog } from './theme.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', showThemeSelectionDialog);
    }
});





import { createAuthors } from './authorSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    createAuthors(authors);
});




import { createGenreSelect } from './genreSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    createGenreSelect();
});




import { handleSettingsButtonClick } from './settings.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', handleSettingsButtonClick);
    }

    // Other event listeners...
});



import { loadMoreBooks } from './bookList.js';

document.addEventListener('DOMContentLoaded', function () {
    loadMoreBooks();
});
