function initDropdown() {
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const dropdown = item.querySelector('.dropdown');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('dropdown--active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav__item--dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('dropdown--active');
            });
        }
    });
}

export default initDropdown;

