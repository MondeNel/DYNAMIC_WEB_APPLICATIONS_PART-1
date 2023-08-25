// authorSelect.js
import { authors } from "./data.js";



export function createAuthors() {
    const authorsFragment = document.createDocumentFragment();

    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = 'any';
    allAuthorsOption.innerText = 'All Authors';
    authorsFragment.appendChild(allAuthorsOption);

    const authorsEntries = Object.entries(authors);

    for (const [id, name] of authorsEntries) {
        const authorOption = document.createElement('option');
        authorOption.value = id;
        authorOption.innerText = name;
        authorsFragment.appendChild(authorOption);
    }

    const authorsSelect = document.querySelector('[data-list-authors]');

    if (authorsSelect) {
        authorsSelect.innerHTML = '';
        authorsSelect.appendChild(allAuthorsOption);
        authorsSelect.appendChild(authorsFragment);
    }

    const searchAuthorsSelect = document.querySelector('[data-search-authors]');

    if (searchAuthorsSelect) {
        searchAuthorsSelect.innerHTML = '';
        searchAuthorsSelect.appendChild(allAuthorsOption);
        searchAuthorsSelect.appendChild(authorsFragment);
    }

}

