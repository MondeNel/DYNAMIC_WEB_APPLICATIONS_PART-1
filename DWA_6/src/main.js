import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";
import { loadMoreBooks, loadInitialBooks } from './loadMoreBooks.js';
import { initializeGenres } from './genres.js';
import { initializeAuthors } from './authors.js';
import { initializeTheme } from './theme.js';

const booksList = books; // Assuming books array is available
let matches = books.slice(0, BOOKS_PER_PAGE);
let page = 1;
const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];





document.addEventListener('DOMContentLoaded', () => {
    const genresFragment = initializeGenres(genres);
    const authorsFragment = initializeAuthors(authors);

    const genresSelect = document.querySelector('[data-list-genres]');
    if (genresSelect) {
        genresSelect.innerHTML = '';
        genresSelect.appendChild(genresFragment);
    }

    const authorsSelect = document.querySelector('[data-list-authors]');
    if (authorsSelect) {
        authorsSelect.innerHTML = '';
        authorsSelect.appendChild(authorsFragment);
    }

    const searchGenresContainer = document.querySelector('[data-search-genres]');
    if (searchGenresContainer) {
        searchGenresContainer.innerHTML = '';
        searchGenresContainer.appendChild(genresFragment);
    }

    const searchAuthorsContainer = document.querySelector('[data-search-authors]');
    if (searchAuthorsContainer) {
        searchAuthorsContainer.innerHTML = '';
        searchAuthorsContainer.appendChild(authorsFragment);
    }

    loadMoreBooks();
    loadInitialBooks();
});


























/** =============================================== data-search-authors ==========================================  */












/** ================================================= Theme Settings ================================================= */

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
});




/** ============================================= data-settings-form =============================================== */

const settingsForm = document.querySelector('[data-settings-form]');

function handleSettingsFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
}

settingsForm.addEventListener('submit', handleSettingsFormSubmit);

const searchForm = document.querySelector('[data-search-form]');

// Add an event listener to the search form's submit button
searchForm.addEventListener('submit', handleSearchFormSubmit);









/** ========================================== data-search-cancel ==================================== */

const searchCancelButton = document.querySelector('[data-search-cancel]');
const searchOverlayElement = document.querySelector('[data-search-overlay]');

function handleSearchCancelButtonClick() {
    if (searchOverlayElement.open === true) {
        searchOverlayElement.open = false; // Close the search overlay
    }
}
searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);









/** ========================================== data-list-close ==================================== */

const listCloseButton = document.querySelector('[data-list-close]');
const listActiveElement = document.querySelector('[data-list-active]');

function handleListCloseButtonClick() {
    if (listActiveElement.open === true) {
        listActiveElement.open = false; // Close the list overlay
    }
}
listCloseButton.addEventListener('click', handleListCloseButtonClick);





/** ====================================== data-list-button ============================================= */

document.querySelector('[data-list-items]').addEventListener('click', function (event) {
    // Getting the path array of the clicked element to find the book preview button
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    // Looping through the path array to find the book preview button and its dataset
    for (const node of pathArray) {
        if (active) break; // Exit the loop if the active book is found
        const previewId = node?.dataset?.preview;

        // Searching for the book with the matching id in the 'books' array
        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook; // Found the active book
                break;
            }
        }
    }

    // If no active book is found, exit the function
    if (!active) return;


    // Get a reference to the dialog element with data-list-active attribute
    const dataListActive = document.querySelector('[data-list-active]');
    // Get references to other elements inside the dataListActive dialog
    const dataListBlur = document.querySelector('[data-list-blur]');
    const dataListImage = document.querySelector('[data-list-image]');
    const dataListTitle = document.querySelector('[data-list-title]');
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    const dataListDescription = document.querySelector('[data-list-description]');

    // Updating the book details in the UI
    if (dataListActive) {
        dataListActive.open = true;
    }
    if (dataListBlur) {
        // Set the 'src' attribute of the blur image based on whether the item is active or not
        dataListBlur.src = active ? '' : active.image;
    }
    if (dataListImage) {
        // Set the 'src' attribute of the main image
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

    // Function to handle the click event on the "Close" button inside the dataListActive dialog
    function handleDataListCloseClick(event) {
        // Close the dialog by setting its open attribute to false
        if (dataListActive) {
            dataListActive.open = false;
        }
    }

    // Attach the event listener to the "Close" button inside the dataListActive dialog
    const dataListCloseButton = document.querySelector('[data-list-close]');
    if (dataListCloseButton) {
        dataListCloseButton.addEventListener('click', handleDataListCloseClick);
    }
});





/** ====================================== data-header-search ============================================= */

// Add a click event listener to the search button in the header
document.querySelector('[data-header-search]').addEventListener('click', function () {
    // Get references to the search overlay and title input elements
    const searchOverlay = document.querySelector('[data-search-overlay]');
    const searchTitle = document.querySelector('[data-search-title]');

    // Open the search overlay
    searchOverlay.open = true;

    // Set focus to the title input for better user experience
    searchTitle.focus();
});









/** =========================================== data-search-form ============================================= */

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


// Implement the function to update the book list
function updateBookList(results) {
    // Get references to the required elements
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    // Calculate the remaining books count to be displayed in the 'Show more' button
    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    // Disable the 'Show more' button if there are no remaining books
    if (dataListButton) {
        dataListButton.disabled = !hasRemaining;
    }

    // Set the innerHTML of the 'Show more' button to display the remaining books count
    if (dataListButton) {
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    // Create a fragment to hold the new book previews
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

    // Clear existing content in the 'data-list-items' container
    dataListItems.innerHTML = '';

    // Append the fragment to the 'data-list-items' container
    dataListItems.appendChild(fragment);

    // Show or hide the "No results found" message based on the presence of search results
    if (dataListMessage) {
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Show or hide the overlay buttons based on the presence of search results
    if (dataListButton && dataListMessage) {
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close the search overlay by setting its 'open' attribute to false
    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}










/** ========================================= data-list-items.innerHTML ================================== */

document.querySelector('[data-list-items]').innerHTML = '';
const fragment = document.createDocumentFragment();
const extracted = books.slice(range[0], range[1]);

for (const props of extracted) {
    const { author: authorId, id, image, title } = props;

    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;

    fragment.appendChild(element);
}

// Append the fragment to the container
document.querySelector('[data-list-items]').appendChild(fragment);

const initial = matches.length - page * BOOKS_PER_PAGE;
const hasRemaining = initial > 0;
const remaining = hasRemaining ? initial : 0;

document.querySelector('[data-list-button]').disabled = !hasRemaining;

document.querySelector('[data-list-button]').innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">(${remaining})</span>
`;

window.scrollTo({ top: 0, behavior: 'smooth' });
document.querySelector('[data-search-overlay]').open = false;





/** ============================================= data-list-items ==================================================== */

document.querySelector('[data-list-items]').addEventListener('click', function (event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) {
        if (active) {
            break;
        }
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            }
        }
    }

    if (!active) {
        return;
    }

    const dataListActive = document.querySelector('[data-list-active]');
    const dataListBlur = document.querySelector('[data-list-blur]');
    const dataListImage = document.querySelector('[data-list-image]');
    const dataListTitle = document.querySelector('[data-list-title]');
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    const dataListDescription = document.querySelector('[data-list-description]');

    if (dataListActive) {
        dataListActive.open = true;
    }
    if (dataListBlur && dataListImage) {
        dataListBlur.src = dataListImage.src = active.image;
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
});