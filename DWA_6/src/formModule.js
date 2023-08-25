export const formModule = {
    handleSettingsFormSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    },
    handleSearchFormSubmit(event) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);

    }
    // ...
};
