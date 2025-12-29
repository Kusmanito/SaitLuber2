// Плавная прокрутка для навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем меню на мобильных устройствах
            const nav = document.querySelector('.main-nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.getElementById('menuToggle').innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Исправленный код для мобильного меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Закрытие меню при клике вне его
        if (mainNav.classList.contains('active')) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    });
    
    function closeMenuOnClickOutside(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Плавное появление элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами
document.querySelectorAll('.course-card, .logo-item, .gallery-item').forEach(element => {
    observer.observe(element);
});

// Видеоплеер
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
        this.innerHTML = `
            <iframe width="100%" height="400" src="https://rutube.ru/embed/c7758adf0e80ee3649c41076754349ef/" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
        `;
    });
}

// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация текущего года в футере
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
    
    // Параллакс эффект для баннера
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-banner');
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Предзагрузка изображений галереи
    const galleryImages = [
        'https://github.com/lobanovanas208-del/FDFFSFD/blob/main/photo_2025-12-28_21-40-34.jpg?raw=true',
        'https://github.com/Kusmanito/ppphoto/blob/main/photo_2025-12-23_10-56-40.jpg?raw=true',
        'https://github.com/Kusmanito/ppphoto/blob/main/certificate-code-future.jpg?raw=true'
    ];
    
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Добавляем стили для плавного появления
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    body.loaded .section {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }
`;
document.head.appendChild(animationStyles);

// Добавляем класс loaded после загрузки страницы
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Добавляем стили для анимации галереи
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    @keyframes fadeInUpGallery {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gallery-item {
        opacity: 0;
        transform: translateY(40px);
        animation: fadeInUpGallery 0.8s ease forwards;
    }
    
    .gallery-item:nth-child(1) { animation-delay: 0.1s; }
    .gallery-item:nth-child(2) { animation-delay: 0.2s; }
    .gallery-item:nth-child(3) { animation-delay: 0.3s; }
`;
document.head.appendChild(galleryStyles);

// Создание частиц для логотипа
function createLogoParticles() {
    const logo = document.querySelector('.logo-animated');
    if (!logo) return;
    
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Разные позиции для частиц
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 45;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.cssText = `
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-delay: ${i * 0.3}s;
            background: rgba(${Math.random() > 0.5 ? '26,86,219' : '8,145,178'}, ${0.6 + Math.random() * 0.4});
        `;
        
        logo.appendChild(particle);
    }
}

// Запускаем создание частиц после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    createLogoParticles();
    
    // Добавляем стили для частиц
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(0);
                opacity: 0;
            }
            10%, 90% {
                opacity: 0.5;
            }
            50% {
                transform: translate(var(--tx, 20px), var(--ty, -20px)) scale(1);
                opacity: 0.8;
            }
        }
        
        .logo-animated .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: particleFloat 4s ease-in-out infinite;
            z-index: 1;
            pointer-events: none;
        }
        
        .logo-animated:hover .particle {
            animation-play-state: paused;
            opacity: 0.3;
        }
    `;
    document.head.appendChild(particleStyles);
});