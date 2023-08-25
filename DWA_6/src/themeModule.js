export const themeModule = {
    setupThemeSettings() {
        // ...
    },
    toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    },

    showThemeSelectionDialog() {

        const themeDialog = document.querySelector('[data-settings-overlay]');
        const overlayButtons = document.querySelector('.overlay__buttons');
        const dataListMessage = document.querySelector('[data-list-message]');


        if (themeDialog && overlayButtons && dataListMessage) {

            dataListMessage.style.display = 'none';

            overlayButtons.style.display = 'flex';

            themeDialog.showModal();
        }

    },

    handleThemeSelectionAndSave(event) {

        event.preventDefault();

        const selectedTheme = document.querySelector('[data-settings-theme]').value;
        if (selectedTheme === 'day' || selectedTheme === 'night') {

            localStorage.setItem('themePreference', selectedTheme);

            theme = selectedTheme;
            document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
            document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
        }

        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();


    },


    handleCancelButtonClick(event) {

        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();

    }
    // ...
};
