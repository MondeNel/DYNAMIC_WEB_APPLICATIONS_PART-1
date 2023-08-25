export const previewModule = {
    createPreview(bookData) {
        const { authors, id, image, title, genre } = bookData;

        const preview = document.createElement('div');
        preview.classList.add('preview');
        preview.setAttribute('data-preview', id);

        const imageElement = document.createElement('img');
        imageElement.classList.add('preview__image');
        imageElement.src = image;

        const info = document.createElement('div');
        info.classList.add('preview__info');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('preview__title');
        titleElement.textContent = title;

        const genreElement = document.createElement('div');
        genreElement.classList.add('preview__genre');
        genreElement.textContent = genre;

        const authorElement = document.createElement('div');
        authorElement.classList.add('preview__author');
        authorElement.textContent = authors[authors]; // Assuming `authors` is an object with author IDs as keys

        info.appendChild(genreElement);
        info.appendChild(titleElement);
        info.appendChild(authorElement);

        preview.appendChild(imageElement);
        preview.appendChild(info);

        return preview;
    },

    openPreviewDialog(activeBook) {
        const dataListActive = document.querySelector('[data-list-active]');
        const dataListBlur = document.querySelector('[data-list-blur]');
        const dataListImage = document.querySelector('[data-list-image]');
        const dataListTitle = document.querySelector('[data-list-title]');
        const dataListSubtitle = document.querySelector('[data-list-subtitle]');
        const dataListDescription = document.querySelector('[data-list-description]');

        if (dataListActive) {
            dataListActive.open = true;
        }
        if (dataListBlur && dataListImage) {
            dataListBlur.src = dataListImage.src = activeBook.image;
        }
        if (dataListTitle) {
            dataListTitle.textContent = activeBook.title;
        }
        if (dataListSubtitle) {
            dataListSubtitle.textContent = `${authors[activeBook.author]} (${new Date(activeBook.published).getFullYear()})`;
        }
        if (dataListDescription) {
            dataListDescription.textContent = activeBook.description;
        }

        const dataListCloseButton = document.querySelector('[data-list-close]');
        if (dataListCloseButton) {
            dataListCloseButton.addEventListener('click', () => {
                dataListActive.open = false;
            });
        }
    },
};
