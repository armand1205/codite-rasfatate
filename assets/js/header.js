const menuBtn = document.querySelector('.header__btn');
const siteNav = document.getElementById('site-nav');
const DESKTOP = window.matchMedia('(min-width: 1024px)');

if (menuBtn && siteNav) {
    const isMobile = () => !DESKTOP.matches;

    const openMenu = () => {
        siteNav.removeAttribute('hidden');
        siteNav.dataset.state = 'closed';

        requestAnimationFrame(() => {
            siteNav.dataset.state = 'open';
        });

        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Inchide meniul navigatiei');
    };

    const closeMenu = () => {
        siteNav.dataset.state = 'closed';

        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Deschide meniul navigatiei');

        siteNav.addEventListener(
            'transitionend',
            (event) => {
                if (event.target !== siteNav) return;

                if (siteNav.dataset.state === 'closed' && isMobile()) {
                    siteNav.setAttribute('hidden', '');
                }
            },
            { once: true }
        );
    };

    const toggleMenu = () => {
        if (!isMobile()) return;

        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    };

    const syncDesktop = () => {
        if (DESKTOP.matches) {
            siteNav.removeAttribute('hidden');
            siteNav.dataset.state = 'open';
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Deschide meniul navigatiei');
        } else if (menuBtn.getAttribute('aria-expanded') !== 'true') {
            siteNav.dataset.state = 'closed';
            siteNav.setAttribute('hidden', '');
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (menuBtn.getAttribute('aria-expanded') !== 'true') return;

        const clickInsideMenu = siteNav.contains(event.target);
        const clickOnButton = menuBtn.contains(event.target);

        if (clickInsideMenu || clickOnButton) return;

        closeMenu();
    });

    window.addEventListener(
        'scroll',
        () => {
            if (!isMobile()) return;
            if (menuBtn.getAttribute('aria-expanded') !== 'true') return;

            closeMenu();
        },
        { passive: true }
    );

    document.addEventListener('keydown', (event) => {
        if (!isMobile()) return;
        if (event.key !== 'Escape') return;
        if (menuBtn.getAttribute('aria-expanded') !== 'true') return;

        closeMenu();
        menuBtn.focus();
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (!isMobile()) return;
            if (menuBtn.getAttribute('aria-expanded') === 'true') {
                closeMenu();
            }
        });
    });

    syncDesktop();
    DESKTOP.addEventListener('change', syncDesktop);
}