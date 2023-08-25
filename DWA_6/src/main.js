


// search.js

import { handleSearchFormSubmit } from './search.js';

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }
});





// theme.js

import { showThemeSelectionDialog } from './theme.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', showThemeSelectionDialog);
    }
});



// authorSelect.js

import { createAuthors } from './authorSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    createAuthors();
});


// genreSelect.js


import { createGenreSelect } from './genreSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    createGenreSelect();
});



// bookList

import { loadMoreBooks } from './bookList.js';

document.addEventListener('DOMContentLoaded', function () {
    loadMoreBooks();
});




