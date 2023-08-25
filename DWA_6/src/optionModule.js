import { genres, authors } from './data.js';

export const optionsModule = {
    createGenresOptions() {
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
    },
    createAuthorsOptions() {
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

};
