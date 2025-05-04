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
    
    // Manejo de favoritos
    const loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Actualizar iconos de corazón en productos
        const wishlistIcons = document.querySelectorAll('.wishlist-icon');
        wishlistIcons.forEach(icon => {
            const productItem = icon.closest('.product-item');
            if (productItem) {
                const productId = productItem.getAttribute('data-product-id');
                if (productId && favorites.includes(productId)) {
                    icon.classList.add('active');
                }
            }
        });
        
        // Actualizar iconos del header
        updateHeaderHearts(favorites.length > 0);
    };
    
    // Actualizar iconos de corazón en el header
    const updateHeaderHearts = (hasFavorites) => {
        document.querySelectorAll('.favorites-icon').forEach(icon => {
            if (hasFavorites) {
                icon.classList.add('has-favorites');
            } else {
                icon.classList.remove('has-favorites');
            }
        });
        
        // Asegurarse que los iconos Feather se actualicen correctamente
        if (window.feather) {
            feather.replace();
        }
    };
    
    // Guardar favorito
    const toggleFavorite = (productId) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.includes(productId);
        
        if (isFavorite) {
            // Quitar de favoritos
            favorites = favorites.filter(id => id !== productId);
        } else {
            // Agregar a favoritos
            favorites.push(productId);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateHeaderHearts(favorites.length > 0);
        return !isFavorite;
    };
    
    // Inicializar favoritos
    loadFavorites();
    
    // Manejar clics en corazones de productos
    document.addEventListener('click', function(e) {
        const wishlistIcon = e.target.closest('.wishlist-icon');
        if (wishlistIcon) {
            const productItem = wishlistIcon.closest('.product-item');
            if (productItem) {
                const productId = productItem.getAttribute('data-product-id');
                if (productId) {
                    const isFavoriteNow = toggleFavorite(productId);
                    
                    if (isFavoriteNow) {
                        wishlistIcon.classList.add('active');
                    } else {
                        wishlistIcon.classList.remove('active');
                    }
                }
            }
        }
    });
    
    // Manejar clics en el ícono de favoritos del header
    document.querySelectorAll('.favorites-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Este evento solo debe navegar a la página de favoritos
            // La clase active se maneja automáticamente
        });
    });
}); 