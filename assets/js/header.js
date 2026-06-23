// Elementele pe care le controlam
const menuBtn = document.querySelector('.header__btn');
const siteNav = document.getElementById('site-nav');
const DESKTOP = window.matchMedia('(min-width: 1024px)');

// Daca pagina nu are header, iesim silent (fara erori in consola)
if (menuBtn && siteNav) {
    // --- DESCHIDE MENiUL ---
    const openMenu = () => {
        // 1. Scoatem hidden ca nav-ul sa poata fi vazut si focusabil
        siteNav.removeAttribute('hidden');

        // 2. Pastram starea vizuala "inchis" (max-height: 0) un frame
        siteNav.dataset.state = 'closed';

        // 3. Dupa ce browserul deseneaza frame-ul, trecem la "open"
        //    → CSS-ul prinde tranzitia (max-height, opacity)
        requestAnimationFrame(() => {
            siteNav.dataset.state = 'open';
        });

        // 4. Actualizam butonul pentru screen readers si assistive tech
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Inchide meniul navigatiei');
    };

    // --- INCHIDE MENiUL ---
    const closeMenu = () => {
        // 1. Pornim animatia de inchidere in CSS
        siteNav.dataset.state = 'closed';

        // 2. Butonul reflecta starea inchisa
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Deschide meniul navigatiei');

        // 3. Asteptam sa se termine animatia CSS, apoi punem hidden
        //    → linkurile nu mai sunt in tab order dupa inchidere
        siteNav.addEventListener(
            'transitionend',
            (event) => {
                // Ignoram transitionend de la copii (ex. liniile de sub linkuri)
                if (event.target !== siteNav) return;

                // Punem hidden doar daca inca suntem in starea "closed"
                if (siteNav.dataset.state === 'closed') {
                    siteNav.setAttribute('hidden', '');
                }
            },
            { once: true } // listener-ul se sterge singur dupa prima rulare
        );
    };

    // --- COMUTA intre deschis / inchis ---
    const toggleMenu = () => {
        // Sursa adevarului: aria-expanded de pe buton
        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    };

    // Click pe butonul hamburger
    menuBtn.addEventListener('click', toggleMenu);

    // Click in afara meniului → inchide
    document.addEventListener('click', (event) => {
        // Meniul e inchis? Nu facem nimic
        if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
        // Click-ul a fost IN meniu sau PE buton? Nu inchidem
        const clickInsideMenu = siteNav.contains(event.target);
        const clickOnButton = menuBtn.contains(event.target);
        if (clickInsideMenu || clickOnButton) return;
        // Click in afara → inchide
        closeMenu();
    });

    // Scroll pe pagina → inchide meniul (daca e deschis)
    window.addEventListener(
        'scroll',
        () => {
            if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
            closeMenu();
        },
        { passive: true } // nu blocam scroll-ul — mai bun pentru performanta
    );

    // Escape inchide meniul si muta focusul inapoi pe buton
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (menuBtn.getAttribute('aria-expanded') !== 'true') return;

        closeMenu();
        menuBtn.focus();
    });

    // Click pe un link din meniu → inchide meniul (util pe mobile)
    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (menuBtn.getAttribute('aria-expanded') === 'true') {
                closeMenu();
            }
        });
    });

    // Pentru DESKTOP
    const syncDesktop = () => {
        if (DESKTOP.matches) {
            // Desktop: nav mereu vizibil, fara hidden
            siteNav.removeAttribute('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        } else if (menuBtn.getAttribute('aria-expanded') !== 'true') {
            // Mobile + inchis: punem hidden inapoi
            siteNav.setAttribute('hidden', '');
        }
    };
    menuBtn.addEventListener('click', () => {
        if (!isMobile()) return;
        menuBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    syncDesktop();
    DESKTOP.addEventListener('change', syncDesktop);
}
