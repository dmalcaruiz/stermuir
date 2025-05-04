// Archivo JavaScript principal

document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado correctamente');
    
    // Función para cambiar el header basado en la posición de scroll
    const updateHeader = () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Evento scroll
    window.addEventListener('scroll', updateHeader);
    
    // Verificar posición inicial
    updateHeader();
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        } else {
            console.error('Mobile menu not found');
        }
    });
    
    // Manejo de preferencias locales
    const loadPreferences = () => {
        // Cargar tema
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        
        // Cargar otras preferencias del usuario
        const userName = localStorage.getItem('userName') || '';
        if (document.getElementById('user-name')) {
            document.getElementById('user-name').value = userName;
        }
    };
    
    // Guardar preferencias
    const savePreferences = (key, value) => {
        localStorage.setItem(key, value);
    };
    
    // Cargar preferencias al inicio
    loadPreferences();
    
    // Escuchar cambios en formularios
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Si el formulario tiene data-save-fields="true", guardar los campos
            if (this.getAttribute('data-save-fields') === 'true') {
                const userName = document.getElementById('user-name').value;
                savePreferences('userName', userName);
            }
        });
    }
    
    // Botón de cambio de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            savePreferences('theme', newTheme);
        });
    }
}); 