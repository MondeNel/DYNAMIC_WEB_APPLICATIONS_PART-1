export function initializeAuthors(authors) {
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

    return authorsFragment;
}
