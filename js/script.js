// ==========================================
// ОСНОВНІ ФУНКЦІЇ САЙТУ
// ==========================================

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// ==========================================
// ГЕРОЙ СЛАЙДЕР
// ==========================================

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
    currentSlide = n;
}

function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
}

function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Add event listeners for buttons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// ==========================================
// ПЛАВНА ПРОКРУТКА
// ==========================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// ==========================================
// КНОПКА "BACK TO TOP"
// ==========================================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// МОДАЛЬНІ ВІКНА ДЛЯ ТУРІВ
// ==========================================

const tourModal = document.getElementById('tourModal');
const closeModal = document.querySelector('.close-modal');

// Дані для модальних вікон турів
const tourData = {
    1: {
        title: "Романтична Італія",
        content: `
            <div class="tour-modal-content">
                <div class="tour-modal-image">
                    <img src="https://picsum.photos/500/300?random=1" alt="Італія">
                </div>
                <div class="tour-modal-details">
                    <h4>Деталі туру:</h4>
                    <ul>
                        <li><strong>Тривалість:</strong> 7 днів / 6 ночей</li>
                        <li><strong>Маршрут:</strong> Рим - Флоренція - Венеція</li>
                        <li><strong>Харчування:</strong> Сніданки</li>
                        <li><strong>Готель:</strong> 4* з басейном</li>
                        <li><strong>Екскурсії:</strong> Колізей, Ватикан, галерея Уффіці</li>
                    </ul>
                    <div class="tour-price">Ціна: €899 на особу</div>
                    <button class="cta-button" style="width:100%;margin-top:15px;" onclick="alert('Тур додано до кошика!')">Забронювати</button>
                </div>
            </div>
        `
    },
    2: {
        title: "Антична Греція",
        content: `
            <div class="tour-modal-content">
                <div class="tour-modal-image">
                    <img src="https://picsum.photos/500/300?random=2" alt="Греція">
                </div>
                <div class="tour-modal-details">
                    <h4>Деталі туру:</h4>
                    <ul>
                        <li><strong>Тривалість:</strong> 5 днів / 4 ночі</li>
                        <li><strong>Маршрут:</strong> Афіни - Санторіні - Міконос</li>
                        <li><strong>Харчування:</strong> Сніданки + 2 вечері</li>
                        <li><strong>Готель:</strong> 3* з видом на море</li>
                        <li><strong>Екскурсії:</strong> Акрополь, музей Акрополя, старовинний міст</li>
                    </ul>
                    <div class="tour-price">Ціна: €759 на особу</div>
                    <button class="cta-button" style="width:100%;margin-top:15px;" onclick="alert('Тур додано до кошика!')">Забронювати</button>
                </div>
            </div>
        `
    },
    3: {
        title: "Таємничий Єгипет",
        content: `
            <div class="tour-modal-content">
                <div class="tour-modal-image">
                    <img src="https://picsum.photos/500/300?random=3" alt="Єгипет">
                </div>
                <div class="tour-modal-details">
                    <h4>Деталі туру:</h4>
                    <ul>
                        <li><strong>Тривалість:</strong> 8 днів / 7 ночей</li>
                        <li><strong>Маршрут:</strong> Каїр - Луксор - Шарм-ель-Шейх</li>
                        <li><strong>Харчування:</strong> Все включено</li>
                        <li><strong>Готель:</strong> 5* біля моря</li>
                        <li><strong>Екскурсії:</strong> Піраміди Гізи, єгипетський музей, круїз по Нілу</li>
                    </ul>
                    <div class="tour-price">Ціна: €699 на особу</div>
                    <button class="cta-button" style="width:100%;margin-top:15px;" onclick="alert('Тур додано до кошика!')">Забронювати</button>
                </div>
            </div>
        `
    }
};

// Функція для показу модального вікна туру
function showTourModal(tourId) {
    if (tourModal && tourData[tourId]) {
        document.getElementById('modalTitle').textContent = tourData[tourId].title;
        document.getElementById('modalContent').innerHTML = tourData[tourId].content;
        tourModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку
    }
}

// Закриття модального вікна
if (closeModal) {
    closeModal.addEventListener('click', () => {
        tourModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Відновлюємо прокрутку
    });
}

// Закриття модального вікна при кліку поза ним
window.addEventListener('click', (e) => {
    if (e.target === tourModal) {
        tourModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// АНІМАЦІЯ ПРИ СКРОЛІ
// ==========================================

// Функція для анімації елементів при скролі
function animateOnScroll() {
    const elements = document.querySelectorAll('.advantage-card, .tour-card, .weather-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Додаємо стилі для анімації
const style = document.createElement('style');
style.textContent = `
    .advantage-card, .tour-card, .weather-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .tour-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 20px;
    }
    
    .tour-modal-image img {
        width: 100%;
        border-radius: 10px;
    }
    
    .tour-modal-details ul {
        list-style: none;
        margin: 15px 0;
    }
    
    .tour-modal-details li {
        margin-bottom: 8px;
        padding-left: 20px;
        position: relative;
    }
    
    .tour-modal-details li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #27ae60;
        font-weight: bold;
    }
    
    .tour-price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #e74c3c;
        text-align: center;
        margin: 15px 0;
    }
    
    @media (max-width: 768px) {
        .tour-modal-content {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// ІНТЕРАКТИВНА КАРТА
// ==========================================

function initMap() {
    const map = document.getElementById('map');
    if (map) {
        map.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;border-radius:10px;padding:20px;text-align:center;">
                <i class="fas fa-map-marked-alt" style="font-size:48px;margin-bottom:20px;"></i>
                <h3 style="margin-bottom:15px;">Наші туристичні напрямки</h3>
                <p style="margin-bottom:20px;">Італія, Греція, Єгипет, Іспанія, Туреччина</p>
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;width:100%;max-width:300px;">
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇮🇹 Італія</div>
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇬🇷 Греція</div>
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇪🇬 Єгипет</div>
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇪🇸 Іспанія</div>
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇹🇷 Туреччина</div>
                    <div style="background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;">🇫🇷 Франція</div>
                </div>
                <button onclick="showMapModal()" style="margin-top:20px;padding:10px 20px;background:rgba(255,255,255,0.3);border:2px solid white;color:white;border-radius:5px;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.5)'" onmouseout="this.style.background='rgba(255,255,255,0.3)'">
                    Переглянути детальну карту
                </button>
            </div>
        `;
    }
}

function showMapModal() {
    const modalContent = `
        <div style="padding:20px;text-align:center;">
            <h3>Детальна карта офісу</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.265441240377!2d24.004921576399788!3d49.83746977148155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473addf25b27a669%3A0xda27575ef330476c!2sTravel%20Mix%20Lviv!5e0!3m2!1suk!2sua!4v1760626989546!5m2!1suk!2sua" 
                    width="100%" height="400" style="border:0;border-radius:10px;" allowfullscreen="" 
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <p style="margin-top:15px;color:#666;">м. Львів, офіс Travel Mix</p>
        </div>
    `;
    
    // Створюємо модальне вікно для карти
    const mapModal = document.createElement('div');
    mapModal.className = 'modal';
    mapModal.innerHTML = `
        <div class="modal-content" style="max-width:800px;">
            <span class="close-modal">&times;</span>
            ${modalContent}
        </div>
    `;
    
    document.body.appendChild(mapModal);
    mapModal.style.display = 'block';
    
    // Додаємо обробник закриття
    const closeBtn = mapModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(mapModal);
        document.body.style.overflow = 'auto';
    });
    
    // Закриття при кліку поза модальним вікном
    mapModal.addEventListener('click', (e) => {
        if (e.target === mapModal) {
            document.body.removeChild(mapModal);
            document.body.style.overflow = 'auto';
        }
    });
    
    document.body.style.overflow = 'hidden';
}
// ==========================================
// ВІДЖЕТ ПОГОДИ (ОНОВЛЕННЯ)
// ==========================================

function updateWeather() {
    const weatherIcons = document.querySelectorAll('.weather-info i');
    const weatherTemps = document.querySelectorAll('.weather-info span');
    
    // Симуляція оновлення погоди
    const weatherData = [
        { icon: 'fa-sun', temp: '+25°C' },
        { icon: 'fa-cloud-sun', temp: '+28°C' },
        { icon: 'fa-sun', temp: '+32°C' }
    ];
    
    weatherIcons.forEach((icon, index) => {
        // Додаємо анімацію
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
            icon.className = `fas ${weatherData[index].icon}`;
        }, 300);
    });
    
    weatherTemps.forEach((temp, index) => {
        temp.textContent = weatherData[index].temp;
    });
}

// Оновлюємо погоду кожні 30 секунд
setInterval(updateWeather, 30000);

// ==========================================
// ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація карты
    initMap();
    
    // Ініціалізація анімації при скролі
    animateOnScroll();
    
    // Показуємо перший слайд
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Додаємо обробник скролу для анімації
    window.addEventListener('scroll', animateOnScroll);
    
    // Спочатку запускаємо анімацію
    animateOnScroll();
    
    console.log('Travel Time website initialized successfully! 🚀');
});

// ==========================================
// ДОДАТКОВІ ФУНКЦІЇ
// ==========================================

// Функція для відображення поточного часу у футері (можна додати пізніше)
function displayCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('uk-UA');
    const dateString = now.toLocaleDateString('uk-UA');
    
    // Можна додати відображення часу у футері
    // document.querySelector('.footer-bottom').innerHTML += `<p>Поточний час: ${dateString} ${timeString}</p>`;
}

// Викликаємо функцію часу
setInterval(displayCurrentTime, 1000);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}