/* ========================
   Lugo - Script Principal
   ======================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHamburgerMenu();
    initializeForm();
    initializeScroll();
});

/* ========================
   MENÚ HAMBURGUESA
   ======================== */

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/* ========================
   NAVEGACIÓN ACTIVA
   ======================== */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover clase activa de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase activa al enlace clicado
            this.classList.add('active');
        });
    });

    // Marcar enlace activo al cargar la página
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath.split('/').pop() || 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ========================
   FORMULARIO DE CONTACTO
   ======================== */

function initializeForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar que todos los campos obligatorios estén llenos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !projectType || !message) {
                showAlert('Por favor, completa todos los campos obligatorios (*).', 'error');
                return;
            }
            
            // Validar email
            if (!isValidEmail(email)) {
                showAlert('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Mostrar mensaje de éxito
            showFormSuccess();
            
            // Limpiar formulario
            form.reset();
        });
    }
}

/* ========================
   VALIDACIÓN DE EMAIL
   ======================== */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ========================
   MENSAJE DE ÉXITO
   ======================== */

function showFormSuccess() {
    const form = document.getElementById('contactForm');
    
    // Crear elemento de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '✓ Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto pronto.';
    
    // Insertar antes del formulario
    form.parentNode.insertBefore(successMessage, form);
    
    // Estilar el mensaje
    successMessage.style.cssText = `
        background-color: #d4f1d4;
        color: #2a5f2a;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
        border-left: 4px solid #2a5f2a;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/* ========================
   ALERTAS PERSONALIZADAS
   ======================== */

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.textContent = message;
    
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 500;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    if (type === 'error') {
        alert.style.backgroundColor = '#f8d7da';
        alert.style.color = '#721c24';
        alert.style.borderLeft = '4px solid #721c24';
    } else {
        alert.style.backgroundColor = '#d4edda';
        alert.style.color = '#155724';
        alert.style.borderLeft = '4px solid #155724';
    }
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 4000);
}

/* ========================
   SCROLL SUAVE
   ======================== */

function initializeScroll() {
    // El scroll suave está habilitado en CSS (scroll-behavior: smooth)
    // Esta función está aquí para efectos adicionales si se necesitan
    
    document.addEventListener('scroll', function() {
        handleScrollEffects();
    });
}

/* ========================
   EFECTOS AL HACER SCROLL
   ======================== */

function handleScrollEffects() {
    // Aquí puedes agregar efectos adicionales al hacer scroll
    // Por ejemplo: animaciones, cambios de opacidad, etc.
    
    const scrollPosition = window.scrollY;
    
    // Hacer que la navegación cambie de estilo al hacer scroll
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
}

/* ========================
   ANIMACIONES
   ======================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

/* ========================
   MEJORAS DE ACCESIBILIDAD
   ======================== */

// Mejorar navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

