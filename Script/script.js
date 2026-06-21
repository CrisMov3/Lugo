/* ========================
   Lugo - Script Principal
   ======================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHamburgerMenu();
    initializeForm();
    initializeScroll();
    initializeGalleryModal();
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
        
        // Cerrar modal si está abierto
        closeImageModal();
    }
});

/* ========================
   MODAL DE GALERÍA
   ======================== */

let currentImageIndex = 0;
let galleryImages = [];

function initializeGalleryModal() {
    // Obtener todas las imágenes de la galería
    const galleryItems = document.querySelectorAll('.gallery-clickable');
    
    galleryItems.forEach((item, index) => {
        // Obtener la URL de la imagen del atributo data-image
        const imageSrc = item.getAttribute('data-image');
        if (imageSrc) {
            galleryImages.push(imageSrc);
        }
        
        // Agregar evento de click
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openImageModal(imageSrc);
        });
    });

    // Eventos del modal
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const backdrop = document.querySelector('.modal-backdrop');

    closeBtn.addEventListener('click', closeImageModal);
    backdrop.addEventListener('click', closeImageModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Navegación con teclado en el modal
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Remover clases de animación anteriores
    modalImage.classList.remove('fade-out', 'fade-in');
    
    // Agregar animación de entrada
    modalImage.classList.add('fade-in');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    modal.classList.remove('closing');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Agregar clase de cierre para animación
    modal.classList.add('closing');
    
    // Esperar a que termine la animación antes de remover la clase active
    setTimeout(() => {
        modal.classList.remove('active');
        modal.classList.remove('closing');
        modalImage.classList.remove('fade-in', 'fade-out');
        document.body.style.overflow = 'auto';
    }, 300);
}

function showPreviousImage() {
    if (galleryImages.length > 0) {
        const modalImage = document.getElementById('modalImage');
        
        // Agregar animación de salida
        modalImage.classList.remove('fade-in');
        modalImage.classList.add('fade-out');
        
        // Esperar a que termine la animación para cambiar la imagen
        setTimeout(() => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImage.classList.remove('fade-out');
            modalImage.classList.add('fade-in');
            modalImage.src = galleryImages[currentImageIndex];
        }, 300);
    }
}

function showNextImage() {
    if (galleryImages.length > 0) {
        const modalImage = document.getElementById('modalImage');
        
        // Agregar animación de salida
        modalImage.classList.remove('fade-in');
        modalImage.classList.add('fade-out');
        
        // Esperar a que termine la animación para cambiar la imagen
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            modalImage.classList.remove('fade-out');
            modalImage.classList.add('fade-in');
            modalImage.src = galleryImages[currentImageIndex];
        }, 300);
    }
}

