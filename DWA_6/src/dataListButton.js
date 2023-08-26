// dataListButton.js

import { books } from './data.js'; // Import the books array

export function handleDataListButtonClick(authors) {
    document.querySelector('[data-list-items]').addEventListener('click', function (event) {
        const pathArray = Array.from(event.path || event.composedPath());
        let active;

        for (const node of pathArray) {
            if (active) break; // Exit the loop if the active book is found
            const previewId = node?.dataset?.preview;

            for (const singleBook of books) {
                if (singleBook.id === previewId) {
                    active = singleBook; // Found the active book
                    break;
                }
            }
        }

        // If no active book is found, exit the function
        if (!active) return;

        const dataListActive = document.querySelector('[data-list-active]');
        const dataListBlur = document.querySelector('[data-list-blur]');
        const dataListImage = document.querySelector('[data-list-image]');
        const dataListTitle = document.querySelector('[data-list-title]');
        const dataListSubtitle = document.querySelector('[data-list-subtitle]');
        const dataListDescription = document.querySelector('[data-list-description]');

        if (dataListActive) {
            dataListActive.open = true;
        }
        if (dataListBlur) {
            dataListBlur.src = active ? '' : active.image;
        }
        if (dataListImage) {
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

        function handleDataListCloseClick(event) {
            if (dataListActive) {
                dataListActive.open = false;
            }
        }

        const dataListCloseButton = document.querySelector('[data-list-close]');
        if (dataListCloseButton) {
            dataListCloseButton.addEventListener('click', handleDataListCloseClick);
        }
    });
}

// Attach the event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const authors = {}; // Define your authors object here or import it if needed
    handleDataListButtonClick(authors);
});
