//@ts-check

// Determine if dark mode is preferred by default
const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = isDarkModePreferred ? 'night' : 'day';

// Theme color configurations
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

/**
 * Toggles between day and night themes.
 */
export function toggleTheme() {
    theme = theme === 'day' ? 'night' : 'day';
    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
}

/**
 * Opens the theme selection dialog.
 */
export function showThemeSelectionDialog() {
    const themeDialog = document.querySelector('[data-settings-overlay]');
    const overlayButtons = document.querySelector('.overlay__buttons');
    const dataListMessage = document.querySelector('[data-list-message]');

    if (themeDialog && overlayButtons && dataListMessage) {
        //@ts-ignore
        dataListMessage.style.display = 'none';
        //@ts-ignore
        overlayButtons.style.display = 'flex';
        //@ts-ignore
        themeDialog.showModal();
    }
}

/**
 * Handles theme selection and saves the user's preference.
 *
 * @param {Event} event - The form submission event.
 */
function handleThemeSelectionAndSave(event) {
    event.preventDefault();
    //@ts-ignore

    const selectedTheme = document.querySelector('[data-settings-theme]').value;
    if (selectedTheme === 'day' || selectedTheme === 'night') {
        localStorage.setItem('themePreference', selectedTheme);

        theme = selectedTheme;
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }

    const themeDialog = document.querySelector('[data-settings-overlay]');
    //@ts-ignore
    themeDialog.close();
}

/**
 * Handles the click event of the cancel button in the theme selection dialog.
 *
 * @param {Event} event - The click event.
 */
function handleCancelButtonClick(event) {
    event.preventDefault();
    const themeDialog = document.querySelector('[data-settings-overlay]');
    //@ts-ignore
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

// Apply the initial theme colors
document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
