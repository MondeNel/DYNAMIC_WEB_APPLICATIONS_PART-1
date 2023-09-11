// Define a class for the book-preview web component
class BookPreview extends HTMLElement {
    constructor() {
        super(); // Call the constructor of the parent class (HTMLElement)

        // Create a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Extract the book data from attributes
        const author = this.getAttribute('author');
        const id = this.getAttribute('id');
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const genre = this.getAttribute('genre');

        // Define the HTML content of the shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                /* Styling specific to this component */
                :host {
                    display: block;
                    padding: 16px;
                    background-color: lightgray;
                }
            </style>
            <img class="preview__image" src="${image}" alt="Book Cover">
            <h3 class="preview__title">${title}</h3>
            <p class="preview__author">Author: ${author}</p>
            <p class="preview__genre">Genre: ${genre}</p>
        `;
    }
}

// Register the custom element with the browser
customElements.define('book-preview', BookPreview);
