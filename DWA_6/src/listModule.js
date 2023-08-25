export const listModule = {
    initializeList() {
        this.loadInitialBooks();
        this.setupListCloseButton();
    },

    loadInitialBooks() {
        const dataListButton = document.querySelector('[data-list-button]');
        dataListButton.addEventListener('click', this.loadMoreBooks);
        this.loadMoreBooks();
    },

    loadMoreBooks() {
        const rangeStart = (page - 1) * BOOKS_PER_PAGE;
        const rangeEnd = page * BOOKS_PER_PAGE;
        const extracted = books.slice(rangeStart, rangeEnd);
        const fragment = document.createDocumentFragment();

        for (const book of extracted) {
            const preview = this.createPreview({
                authors: book.author,
                id: book.id,
                image: book.image,
                title: book.title,
                genre: book.genre,
            });
            fragment.appendChild(preview);
        }

        const listItemsContainer = document.querySelector('[data-list-items]');
        if (listItemsContainer) {
            listItemsContainer.appendChild(fragment);
        }

        page++;

        const dataListButton = document.querySelector('[data-list-button]');
        if (dataListButton) {
            const totalBooks = books.length;
            const remainingBooks = totalBooks - (page * BOOKS_PER_PAGE);
            const remainingText = remainingBooks > 0 ? remainingBooks : 0;
            dataListButton.innerHTML = `
                <span>Show more</span>
                <span class="list__remaining">(${remainingText})</span>
            `;
            dataListButton.disabled = remainingBooks <= 0;
        }
    },

    setupListCloseButton() {
        const listCloseButton = document.querySelector('[data-list-close]');
        const listActiveElement = document.querySelector('[data-list-active]');

        listCloseButton.addEventListener('click', () => {
            if (listActiveElement.open === true) {
                listActiveElement.open = false; // Close the list overlay
            }
        });
    },

    updateBookList(results) {
        const dataListItems = document.querySelector('[data-list-items]');
        const dataListButton = document.querySelector('[data-list-button]');
        const dataSearchOverlay = document.querySelector('[data-search-overlay]');
        const dataListMessage = document.querySelector('[data-list-message]');
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

        const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
        const hasRemaining = remainingBooks > 0;
        const remaining = hasRemaining ? remainingBooks : 0;

        if (dataListButton) {
            dataListButton.disabled = !hasRemaining;
        }

        if (dataListButton) {
            dataListButton.innerHTML = `
                <span>Show more</span>
                <span class="list__remaining">(${remaining})</span>
            `;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (dataSearchOverlay) {
            dataSearchOverlay.open = false;
        }
    },


};
