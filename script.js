/*SCRIPT PRINCIPAL*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("Instituto Superior Alma Fuerte - JS Inicializado correctamente.");

    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    const DESKTOP_BREAKPOINT = 992;

    //  Lógica del menú móvil (se ejecuta únicamente si existen los elementos necesarios)
    if (mobileToggle && navMenu) {
        const toggleMobileMenu = (forceState) => {
            const isOpen = typeof forceState === 'boolean' 
                ? forceState 
                : !navMenu.classList.contains('active');

            navMenu.classList.toggle('active', isOpen);
            
            //  Uso explícito de String(isOpen) para el atributo aria-expanded
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            mobileToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
            mobileToggle.textContent = isOpen ? '✕' : '☰';
        };

        // Evento clic en el botón hamburguesa
        mobileToggle.addEventListener('click', () => {
            toggleMobileMenu();
        });

        // Cerrar el menú al hacer clic en cualquier enlace de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu(false);
                }
            });
        });

        // Cerrar el menú presionando la tecla Escape y devolver el foco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMobileMenu(false);
                mobileToggle.focus();
            }
        });

        // Cerrar el menú al hacer clic fuera de él (en el documento)
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = mobileToggle.contains(e.target);

            if (navMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
                toggleMobileMenu(false);
            }
        });

        // Controlar cambio de tamaño de ventana para limpiar estado en escritorio
        window.addEventListener('resize', () => {
            if (window.innerWidth > DESKTOP_BREAKPOINT && navMenu.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        });
    }

    // 4. Efecto de cabecera al hacer scroll (Independiente del menú móvil)
    const handleHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Comprobar estado inicial del scroll al cargar la página
    handleHeaderScroll();

    if (header) {
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    }
});