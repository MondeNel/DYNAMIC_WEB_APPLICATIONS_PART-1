/** ============================================== Importing Data and Constants ===================================*/

import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";
import { loadMoreBooks, loadInitialBooks } from './loadMoreBooks.js';
import { initializeGenres } from './genres.js';

const booksList = books; // Assuming books array is available
let matches = books.slice(0, BOOKS_PER_PAGE);
let page = 1;
const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];






/** ===========================================  Create genres ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const genresFragment = initializeGenres(genres);

    const genresSelect = document.querySelector('[data-list-genres]');
    if (genresSelect) {
        genresSelect.innerHTML = '';
        genresSelect.appendChild(genresFragment);
    }

    const searchGenresContainer = document.querySelector('[data-search-genres]');
    if (searchGenresContainer) {
        searchGenresContainer.innerHTML = '';
        searchGenresContainer.appendChild(genresFragment);
    }

    loadMoreBooks();
    loadInitialBooks();
});

























/** =============================================== data-search-authors ==========================================  */

/**
 * This line creates an empty DocumentFragment called authorsFragment. Like the previous examples, a DocumentFragment
 */
const authorsFragment = document.createDocumentFragment();



/**
 * This block of code creates an <option> element representing the "All Authors" 
 * option and appends it to the authorsFragment. 
 * The value attribute is set to 'any', and the text content inside the <option> is set to 'All Authors'.
 */
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);



/**
 * This line converts the authors object into an array of arrays (authorsEntries), 
 * where each inner array contains a key-value pair from the authors object. 
 * Each key-value pair represents an author's id and name.
 */
const authorsEntries = Object.entries(authors);



/**
 * This for...of loop iterates through each [id, name] pair in authorsEntries. 
 * For each author, it creates a new <option> element and sets its value attribute to the id, 
 * and the text content to the name.
 * Then, it appends each author <option> to the authorsFragment.
 */
for (const [id, name] of authorsEntries) {
    // Create a new option element for each author
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.innerText = name;
    authorsFragment.appendChild(authorOption);
}



/**
 * This line retrieves the reference to the HTML <select> element with the attribute data-list-authors. 
 * This element represents the select box where the author options will be appended.
 */
const authorsSelect = document.querySelector('[data-list-authors]');



/**
 * This block of code appends the author options to the select box (authorsSelect). 
 * First, it clears the select box by setting its innerHTML to an empty string, 
 * effectively removing any existing options. Then, it appends the "All Authors" option 
 * (allAuthorsOption) and the author options from the authorsFragment to the select box.
 */
if (authorsSelect) {
    // Clear the select element first to remove any existing options
    authorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    authorsSelect.appendChild(allAuthorsOption);
    authorsSelect.appendChild(authorsFragment);
}


/**
 * This line retrieves the reference to the HTML element with the attribute data-search-authors. 
 * This element represents the select box in the search area where the author options will be appended.
 */
const searchAuthorsSelect = document.querySelector('[data-search-authors]');



/**
 * This block of code does the same as the previous block, but for the select box in the search area (searchAuthorsSelect). 
 * It clears the select box and appends the "All Authors" option and the author options from the authorsFragment to the search select box.
 */
if (searchAuthorsSelect) {
    // Clear the select element first to remove any existing options
    searchAuthorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    searchAuthorsSelect.appendChild(allAuthorsOption);
    searchAuthorsSelect.appendChild(authorsFragment);
}










/** ================================================= Theme Settings ================================================= */


/**
 * The event listener waits for the DOM to be fully loaded before executing the enclosed code. 
 * It starts by checking if the user's device or browser preference is set to dark mode. 
 * The matchMedia method with the media query string '(prefers-color-scheme: dark)' 
 * is used to detect if the user prefers dark mode.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Check if the user prefers dark mode
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;


    /**
     * A variable theme is declared and initialized based on the user's dark mode preference. 
     * If isDarkModePreferred is true, the theme is set to 'night'; otherwise, it's set to 'day'.
     */
    let theme = isDarkModePreferred ? 'night' : 'day';


    /**
     * An object themeColors is defined, which contains color values for both day and night themes. 
     * Each theme has two color values, dark and light, represented as RGB values.
     */
    const themeColors = {
        day: {
            dark: '10, 10, 20',
            light: '255, 255, 255',
        },
        night: {
            dark: '255, 255, 255',
            light: '10, 10, 20',
        },
    };

    /**
     * This is a function named toggleTheme responsible for toggling between the day and night themes. 
     * It changes the theme variable based on its current value. Then it updates the CSS variables --color-dark 
     * and --color-light on the documentElement (HTML root element) to apply the selected theme's colors.
     */
    function toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }



    /**
     * This function showThemeSelectionDialog is called when the user clicks on the element with the attribute 
     * [data-header-settings]. It retrieves references to the theme selection dialog, overlay buttons, 
     * and the "No results found" message element using document.querySelector.
     */
    function showThemeSelectionDialog() {
        const themeDialog = document.querySelector('[data-settings-overlay]');
        const overlayButtons = document.querySelector('.overlay__buttons');
        const dataListMessage = document.querySelector('[data-list-message]');


        /**
         * If all the required elements are found (themeDialog, overlayButtons, and dataListMessage), 
         * this block of code hides the "No results found" message and shows the overlay buttons (cancel and save buttons). 
         * Finally, it displays the theme selection dialog using the showModal method.
         */
        if (themeDialog && overlayButtons && dataListMessage) {
            // Hide the "No results found" message
            dataListMessage.style.display = 'none';

            // Show the overlay buttons
            overlayButtons.style.display = 'flex';

            // Show the theme selection dialog
            themeDialog.showModal();
        }
    }

    /**
     * This function handleThemeSelectionAndSave is called when the user submits the theme selection form. 
     * It prevents the default form submission behavior (event.preventDefault()), retrieves the selected theme value, 
     * and saves it to the local storage. Then, it updates the theme variable and applies the selected theme colors 
     * to the CSS variables. 
     * Finally, it closes the theme selection dialog using themeDialog.close().
     */
    function handleThemeSelectionAndSave(event) {
        event.preventDefault();

        const selectedTheme = document.querySelector('[data-settings-theme]').value;
        if (selectedTheme === 'day' || selectedTheme === 'night') {
            // Save the user's theme preference to local storage
            localStorage.setItem('themePreference', selectedTheme);

            // Update the theme based on the user's selection
            theme = selectedTheme;
            document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
            document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
        }

        // Close the theme selection dialog
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }


    /**
     * This function handleCancelButtonClick is called when the user clicks on the cancel button in the theme selection dialog.
     * It prevents the default button
     */
    function handleCancelButtonClick(event) {
        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }


    /**
     * This code retrieves the reference to the element with the attribute [data-header-settings] 
     * (presumably a settings icon or button). If found, it attaches the showThemeSelectionDialog function to its click event. 
     * This means that when the user clicks on the settings icon/button, the theme selection dialog will be shown.
     */
    const dataHeaderSettings = document.querySelector('[data-header-settings]');

    // Attach the toggleTheme function to the data-header-settings element's click event
    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', showThemeSelectionDialog);
    }


    /**
     * 
     */
    const themeSelectionForm = document.querySelector('[data-settings-form]');

    // Attach the handleThemeSelectionAndSave function to the form's submit event
    if (themeSelectionForm) {
        themeSelectionForm.addEventListener('submit', handleThemeSelectionAndSave);
    }

    // Get the cancel button
    const cancelButton = document.querySelector('[data-cancel-button]');

    // Attach the handleCancelButtonClick function to the cancel button's click event
    if (cancelButton) {
        cancelButton.addEventListener('click', handleCancelButtonClick);
    }

    // Apply the selected theme colors to the document
    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);

    // Update the "Show more" button with the remaining books count
    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const remainingBooks = books.length - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;

        // Set the innerHTML of the "Show more" button with the remaining books count
        dataListButton.innerHTML = `<span>Show more</span><span class="list__remaining">(${remainingText})</span>`;

        // Disable the "Show more" button if there are no remaining books
        dataListButton.disabled = !(remainingBooks > 0);

        // Attach the loadMoreBooks function to the "Show more" button's click event
        dataListButton.addEventListener('click', loadMoreBooks);
    }

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