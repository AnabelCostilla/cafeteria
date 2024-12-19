document.addEventListener('DOMContentLoaded', () => {
    
    // Lazy Loading de imágenes
    const lazyImages = document.querySelectorAll('.lazy-image');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    function loadImage(img) {
        const actualSrc = img.dataset.src;
        if (!actualSrc) return;

        const tempImage = new Image();
        tempImage.onload = () => {
            img.src = actualSrc;
            img.classList.add('loaded');
        };
        tempImage.src = actualSrc;
    }

    lazyImages.forEach(img => imageObserver.observe(img));

    // Animaciones al hacer scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, animationOptions);

    animatedElements.forEach(el => animationObserver.observe(el));

    // Control del navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    // Optimización del scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 70) {
                    navbar.classList.add('hide');
                } else {
                    navbar.classList.remove('hide');
                }
                
                lastScroll = currentScroll;
                scrollTimeout = null;
            });
            scrollTimeout = true;
        }
    }, { passive: true });

    // Manejo de pestañas
    const tabs = document.querySelectorAll('.tab');
    const contentSections = document.querySelectorAll('.rewards-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            });
            
            tab.classList.add('active');
            
            const targetContent = document.querySelector(`#content-${tab.dataset.tab}`);
            setTimeout(() => {
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
            }, 100);
        });
    });
}); 


// Agregar al JavaScript existente
document.addEventListener('DOMContentLoaded', () => {
    // ... código existente ...

    // Funcionalidad del menú móvil
    const menuTrigger = document.querySelector('.menu-trigger');
    const menuMobile = document.querySelector('.menu-mobile');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.menu-close');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    const submenuBacks = document.querySelectorAll('.submenu-back');

    // Abrir menú
    menuTrigger.addEventListener('click', () => {
        menuMobile.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar menú
    function closeMenu() {
        menuMobile.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Resetear submenús
        document.querySelectorAll('.submenu.active').forEach(submenu => {
            submenu.classList.remove('active');
        });
    }

    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Manejo de submenús
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const submenu = trigger.nextElementSibling;
            submenu.classList.add('active');
        });
    });

    submenuBacks.forEach(back => {
        back.addEventListener('click', () => {
            const submenu = back.closest('.submenu');
            submenu.classList.remove('active');
        });
    });

    // Cerrar menú al cambiar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 769) {
            closeMenu();
        }
    });
});