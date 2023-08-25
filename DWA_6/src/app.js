import { bookModule } from "./bookModule.js";
import { themeModule } from "./themeModule.js";
import { formModule } from "./formModule.js"; // Make sure to import formModule
import { searchModule } from "./searchModule.js";
import { listModule } from "./listModule.js";
import { previewModule } from "./previewModule.js";
import { headerModule } from "./headerModule.js";

export const app = {
    init() {
        bookModule.loadInitialBooks();
        themeModule.setupThemeSettings();
        formModule.initializeForms(); // Initialize the forms, which includes setting up the search form
        searchModule.initializeSearch();
        listModule.initializeList();
        previewModule.initializePreviews();
        headerModule.handleHeaderSearchClick();
    },
};

document.addEventListener("DOMContentLoaded", function () {
    app.init(); // Initialize the app after the DOM content is loaded
});
