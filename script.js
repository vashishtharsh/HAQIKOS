document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelector('.nav-links');
    const toggleNav = document.createElement('div');

    toggleNav.classList.add('toggle-nav');
    toggleNav.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(toggleNav);

    toggleNav.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    const smoothScroll = function(targetEl, duration) {
        const target = document.querySelector(targetEl);
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const scrollTo = function() {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(each => {
            each.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                smoothScroll(target, 1000);
            });
        });
    };

    scrollTo();
});
