import { books, authors } from "./data.js";

export function updateBookList(matches, range, page) {
    const dataListItemsContainer = document.querySelector('[data-list-items]');

    // Clear existing content in the container
    dataListItemsContainer.innerHTML = '';

    // Create a fragment to hold the new book previews
    const fragment = document.createDocumentFragment();
    const extracted = books.slice(range[0], range[1]);

    // Create and append elements for each book
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
    dataListItemsContainer.appendChild(fragment);

    // Update "Show more" button and scroll to top
    const initialRemaining = matches.length - page * BOOKS_PER_PAGE;
    const hasRemaining = initialRemaining > 0;
    const remaining = hasRemaining ? initialRemaining : 0;

    const dataListButton = document.querySelector('[data-list-button]');
    dataListButton.disabled = !hasRemaining;
    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining">(${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close the search overlay
    document.querySelector('[data-search-overlay]').open = false;
}
