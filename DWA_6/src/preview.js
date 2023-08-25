// preview.js
export function createPreview(bookData) {
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
    const authorName = authors[authors];
    authorElement.textContent = authorName;

    info.appendChild(genreElement);
    info.appendChild(titleElement);
    info.appendChild(authorElement);

    preview.appendChild(imageElement);
    preview.appendChild(info);

    return preview;
}
