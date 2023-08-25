export const headerModule = {
    handleHeaderSearchClick() {
        document.querySelector('[data-header-search]').addEventListener('click', function () {
            const searchOverlay = document.querySelector('[data-search-overlay]');
            const searchTitle = document.querySelector('[data-search-title]');

            searchOverlay.open = true;

            searchTitle.focus();
        });
    },
};
