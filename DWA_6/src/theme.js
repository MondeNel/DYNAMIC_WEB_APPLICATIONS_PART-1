// theme.js
document.addEventListener('DOMContentLoaded', function () {
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = isDarkModePreferred ? 'night' : 'day';

    const themeColors = {
        day: {
            dark: '10, 10, 20',
            light: '255, 255, 255',
        },
        night: {
            dark: '255, 255, 255',
            light: '10, 10, 20',
        },
    };

    function toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }

    function showThemeSelectionDialog() {
        const themeDialog = document.querySelector('[data-settings-overlay]');
        const overlayButtons = document.querySelector('.overlay__buttons');
        const dataListMessage = document.querySelector('[data-list-message]');

        if (themeDialog && overlayButtons && dataListMessage) {
            dataListMessage.style.display = 'none';
            overlayButtons.style.display = 'flex';
            themeDialog.showModal();
        }
    }

    function handleThemeSelectionAndSave(event) {
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
    }

    function handleCancelButtonClick(event) {
        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }

    const dataHeaderSettings = document.querySelector('[data-header-settings]');

    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', showThemeSelectionDialog);
    }

    const themeSelectionForm = document.querySelector('[data-settings-form]');

    if (themeSelectionForm) {
        themeSelectionForm.addEventListener('submit', handleThemeSelectionAndSave);
    }

    const cancelButton = document.querySelector('[data-cancel-button]');

    if (cancelButton) {
        cancelButton.addEventListener('click', handleCancelButtonClick);
    }

    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);

    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const remainingBooks = books.length - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;

        dataListButton.innerHTML = `<span>Show more</span><span class="list__remaining">(${remainingText})</span>`;

        dataListButton.disabled = !(remainingBooks > 0);

        dataListButton.addEventListener('click', loadMoreBooks);
    }

    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', showThemeSelectionDialog);
    }
});
