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
}); 