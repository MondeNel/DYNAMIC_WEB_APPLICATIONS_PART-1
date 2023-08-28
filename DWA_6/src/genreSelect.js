// genreSelect.js
import { genres } from "./data.js";



export function createGenreSelect() {
    const genresFragment = document.createDocumentFragment();

    const allGenresOption = document.createElement('option');
    allGenresOption.value = 'any';
    allGenresOption.innerText = 'All Genres';
    genresFragment.appendChild(allGenresOption);

    const genresEntries = Object.entries(genres);

    for (const [id, name] of genresEntries) {
        const genreOption = document.createElement('option');
        genreOption.value = id;
        genreOption.innerText = name;
        genresFragment.appendChild(genreOption);
    }

    const genresSelect = document.querySelector('[data-list-genres]');

    if (genresSelect) {
        genresSelect.innerHTML = '';
        genresSelect.appendChild(allGenresOption);
        genresSelect.appendChild(genresFragment);
    }

    const searchGenresContainer = document.querySelector('[data-search-genres]');

    if (searchGenresContainer) {
        searchGenresContainer.innerHTML = '';
        searchGenresContainer.appendChild(allGenresOption);
        searchGenresContainer.appendChild(genresFragment);
    }

}
