/**
 * Creates a preview element for a book.
 *
 * @param {Object} bookData - Data of the book to create a preview for.
 * @param {string} bookData.author - Author ID of the book.
 * @param {string} bookData.id - ID of the book.
 * @param {string} bookData.image - Image URL of the book.
 * @param {string} bookData.title - Title of the book.
 * @param {string} bookData.genre - Genre of the book.
 * @param {Object} authors - An object containing author information with author IDs as keys and author names as values.
 * @returns {HTMLElement} - The created preview element.
 */
export function createPreview(bookData, authors) {
    const { author, id, image, title, genre } = bookData;

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

    const authorName = authors[author];
    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');
    authorElement.textContent = authorName;

    info.appendChild(genreElement);
    info.appendChild(titleElement);
    info.appendChild(authorElement);

    preview.appendChild(imageElement);
    preview.appendChild(info);

    return preview;
}
