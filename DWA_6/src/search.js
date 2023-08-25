// Get a reference to the button element
const settingsButton = document.querySelector('[data-header-settings]');

// Attach the event listener to the settings button
settingsButton.addEventListener('click', handleSettingsButtonClick);

// Attach the event listener to the search form
const searchForm = document.querySelector('[data-search-form]');
searchForm.addEventListener('submit', handleSearchFormSubmit);


export function handleSearchFormSubmit(event) {
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

// Implement the updateBookList function
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

    dataListItems.innerHTML = '';
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

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}




// Define a function to be called when the settings button is clicked
function handleSettingsButtonClick() {
    // Add your code here to handle the settings button click
    // For example, you could open a settings overlay or perform some other action
    console.log("Settings button clicked!");
}
