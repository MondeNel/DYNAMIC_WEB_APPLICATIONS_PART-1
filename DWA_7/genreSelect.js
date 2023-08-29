//@ts-check

import { genres } from "./data.js";

/**
 * Creates genre select options and appends them to the provided select elements.
 */
export function createGenreSelect() {
    const genresFragment = document.createDocumentFragment();

    // Create the "All Genres" option
    const allGenresOption = document.createElement('option');
    allGenresOption.value = 'any';
    allGenresOption.innerText = 'All Genres';
    genresFragment.appendChild(allGenresOption);

    // Create genre options from the genres object
    const genresEntries = Object.entries(genres);
    for (const [id, name] of genresEntries) {
        const genreOption = document.createElement('option');
        genreOption.value = id;
        genreOption.innerText = name;
        genresFragment.appendChild(genreOption);
    }

    // Append genre options to the main list view select element
    const genresSelect = document.querySelector('[data-list-genres]');
    if (genresSelect) {
        genresSelect.innerHTML = '';
        genresSelect.appendChild(allGenresOption);
        genresSelect.appendChild(genresFragment);
    }

    // Append genre options to the search view genres container
    const searchGenresContainer = document.querySelector('[data-search-genres]');
    if (searchGenresContainer) {
        searchGenresContainer.innerHTML = '';
        searchGenresContainer.appendChild(allGenresOption);
        searchGenresContainer.appendChild(genresFragment);
    }
}