document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav__item--dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            });
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('DubaiRealty website loaded successfully!');
});

