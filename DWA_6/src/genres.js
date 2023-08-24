export function initializeGenres(genres) {
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

    return genresFragment;
}
