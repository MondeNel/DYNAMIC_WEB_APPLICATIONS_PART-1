export const themeModule = {
    theme: 'day',

    themeColors: {
        day: {
            dark: '10, 10, 20',
            light: '255, 255, 255',
        },
        night: {
            dark: '255, 255, 255',
            light: '10, 10, 20',
        },
    },

    setupThemeSettings() {
        document.addEventListener('DOMContentLoaded', () => {
            const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.theme = isDarkModePreferred ? 'night' : 'day';

            this.updateThemeColors();

            const dataHeaderSettings = document.querySelector('[data-header-settings]');
            if (dataHeaderSettings) {
                dataHeaderSettings.addEventListener('click', this.showThemeSelectionDialog);
            }

            const themeSelectionForm = document.querySelector('[data-settings-form]');
            if (themeSelectionForm) {
                themeSelectionForm.addEventListener('submit', this.handleThemeSelectionAndSave);
            }

            const cancelButton = document.querySelector('[data-cancel-button]');
            if (cancelButton) {
                cancelButton.addEventListener('click', this.handleCancelButtonClick);
            }

            const dataListButton = document.querySelector('[data-list-button]');
            if (dataListButton) {
                dataListButton.addEventListener('click', bookModule.loadMoreBooks);
            }
        });
    },

    updateThemeColors() {
        document.documentElement.style.setProperty('--color-dark', this.themeColors[this.theme].dark);
        document.documentElement.style.setProperty('--color-light', this.themeColors[this.theme].light);
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
            themeModule.theme = selectedTheme;
            themeModule.updateThemeColors();
        }

        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    },

    handleCancelButtonClick(event) {
        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    },
};
