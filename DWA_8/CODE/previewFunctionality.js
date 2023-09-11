/**
 * Creates a book preview object.
 *
 * @param {Object} bookData - The data of the book for which to create the preview.
 * @param {Object} authors - An object containing author information with author IDs as keys and author names as values.
 * @returns {Object} The created book preview object.
 */
export function createPreview(bookData, authors) {
    // Destructure bookData
    const { author, id, image, title, genre } = bookData;

    // Create the book preview object
    const bookPreview = {
        id: id,
        image: image,
        title: title,
        genre: genre,
        author: authors[author],
        /**
         * Get a description of the book preview.
         *
         * @returns {string} The description of the book preview.
         */
        getDescription() {
            return `This is a book preview with title "${this.title}" by ${this.author}, in the genre of ${this.genre}, and an image URL of "${this.image}"`;
        },
    };

    return bookPreview;
}