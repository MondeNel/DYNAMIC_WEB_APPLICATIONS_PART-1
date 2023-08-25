import { bookModule } from './bookModule.js';
import { optionsModule } from './optionsModule.js';
import { themeModule } from './themeModule.js';
import { formModule } from './formModule.js';
import { searchModule } from './searchModule.js';
import { listModule } from './listModule.js';
import { previewModule } from './previewModule.js';
import { headerModule } from './headerModule.js';

export const app = {
    init() {
        bookModule.loadInitialBooks();
        themeModule.setupThemeSettings();
        formModule.initializeForms(); // Initialize formModule
        searchModule.initializeSearch(); // Initialize searchModule
        listModule.initializeList(); // Initialize listModule
        previewModule.initializePreviews(); // Initialize previewModule

        headerModule.handleHeaderSearchClick();
    }
};
