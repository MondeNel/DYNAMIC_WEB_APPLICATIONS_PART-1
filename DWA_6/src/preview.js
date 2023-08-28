/**
 * Creates a preview element for a book.
 *
 * @param {Object} bookData - The data of the book for which to create the preview.
 * @param {Object} authors - An object containing author information with author IDs as keys and author names as values.
 * @returns {HTMLElement} The created preview element.
 */
export function createPreview(bookData, authors) {
    // Destructure bookData
    const { author, id, image, title, genre } = bookData;

    // Create the main preview element
    const preview = document.createElement('div');
    preview.classList.add('preview');
    preview.setAttribute('data-preview', id);

    // Create the book image element
    const imageElement = document.createElement('img');
    imageElement.classList.add('preview__image');
    imageElement.src = image;

    // Create the book information container
    const info = document.createElement('div');
    info.classList.add('preview__info');

    // Create the book title element
    const titleElement = document.createElement('h3');
    titleElement.classList.add('preview__title');
    titleElement.textContent = title;

    // Create the book genre element
    const genreElement = document.createElement('div');
    genreElement.classList.add('preview__genre');
    genreElement.textContent = genre;

    // Get the author's name from the authors object
    const authorName = authors[author];

    // Create the book author element
    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');
    authorElement.textContent = authorName;

    // Append elements to the info container
    info.appendChild(genreElement);
    info.appendChild(titleElement);
    info.appendChild(authorElement);

    // Append elements to the main preview element
    preview.appendChild(imageElement);
    preview.appendChild(info);

    return preview;
}
