

export function handleSearchFormSubmit(event, booksList, updateBookList) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    const results = booksList.filter(book => {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);

        return titleMatch && authorMatch && genreMatch;
    });

    updateBookList(results);
}

export function updateBookList(results, page, BOOKS_PER_PAGE, authors) {
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    if (dataListButton) {
        dataListButton.disabled = !hasRemaining;
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    const fragment = document.createDocumentFragment();

    results.forEach(book => {
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
    });

    dataListItems.innerHTML = '';
    dataListItems.appendChild(fragment);

    if (dataListMessage) {
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    if (dataListButton && dataListMessage) {
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}
