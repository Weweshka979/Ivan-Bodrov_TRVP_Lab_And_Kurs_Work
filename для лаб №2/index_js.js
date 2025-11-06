// script.js
class PhotoCarousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselNav = document.querySelector('.carousel-nav');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalCards = 0;
        
        this.photos = [
             {
                id: 1,
                src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/b/b0/Персонаж_Темень_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20250912143857&path-prefix=ru',
                title: 'Темень'
            },
            {
                id: 2,
                src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/4/4e/Персонаж_Кирена_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20250911055101&path-prefix=ru',
                title: 'Кирена'
            },
            {
                id: 3,
                src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/1/19/Персонаж_Дань_Хэн_Освободитель_Пустошей_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20250912143840&path-prefix=ru',
                title: 'Дань Хэн: Освободитель Пустошей'
            },
            
            // Персонажи с Пенаконии
            {
                id: 4,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/2/2d/Character_Gallagher_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240327022011',
                title: 'Галлахер'
            },

            {
                id: 5,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/5/5c/Character_Misha_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240206022717',
                title: 'Миша'
            },

            {
                id: 6,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/9/92/Character_Robin_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240508021256',
                title: 'Зарянка'
            },

            {
                id: 7,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/2/21/Character_Sunday_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20241224161538',
                title: 'Воскресенье'
            },

            // Персонажи, которых встретили на Пенаконии

            {
                id: 8,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/7/78/Character_Acheron_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240327021325',
                title: 'Ахерон'
            },

            {
                id: 9,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/a/a9/Character_Aventurine_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240327104723',
                title: 'Авантюрин'
            },

            {
                id: 10,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/9/99/Character_Sparkle_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240327022635',
                title: 'Искорка'
            },

            {
                id: 11,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/3/38/Character_Firefly_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20241007220547',
                title: 'Светлячок'
            },

            {
                id: 12,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/f/fd/Character_Black_Swan_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240220023547',
                title: 'Чёрный Лебедь'
            },

            {
                id: 13,
                src: 'https://static.wikia.nocookie.net/houkai-star-rail/images/b/bb/Character_Boothill_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240624231026',
                title: 'Бутхилл'
            },
             // Персонажи с Лофу
    {
        id: 14,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/9/94/Персонаж_Фуга_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20241122125952&path-prefix=ru',
        title: 'Фуга'
    },
    {
        id: 15,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/4/48/Персонаж_Тинъюнь_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151518&path-prefix=ru',
        title: 'Тинъюнь'
    },
    {
        id: 16,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/b/bb/Персонаж_Фэйсяо_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240901162449&path-prefix=ru',
        title: 'Фэйсяо'
    },
    {
        id: 17,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/f/f2/Персонаж_Моцзэ_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240901162346&path-prefix=ru',
        title: 'Моцзэ'
    },
    {
        id: 18,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/8/89/Персонаж_Цзяоцю_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240731163747&path-prefix=ru',
        title: 'Цзяоцю'
    },
    {
        id: 19,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/4/45/Персонаж_Юньли_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240724180834&path-prefix=ru',
        title: 'Юньли'
    },
    {
        id: 20,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/7/72/Персонаж_Цзинлю_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20231014141101&path-prefix=ru',
        title: 'Цзинлю'
    },
    {
        id: 21,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/4/43/Персонаж_Яньцин_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151512&path-prefix=ru',
        title: 'Яньцин'
    },
    {
        id: 22,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/1/1c/Персонаж_Сушан_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151524&path-prefix=ru',
        title: 'Сушан'
    },
    {
        id: 23,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/7/76/Персонаж_Линша_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240901162143&path-prefix=ru',
        title: 'Линша'
    },
    {
        id: 24,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/c/c2/Персонаж_Цзин_Юань_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151631&path-prefix=ru',
        title: 'Цзин Юань'
    },
    {
        id: 25,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/4/4b/Персонаж_Гуйнайфэнь_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20231024083539&path-prefix=ru',
        title: 'Гуйнайфэнь'
    },
    {
        id: 26,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/5/5e/Персонаж_Ханья_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20231119043831&path-prefix=ru',
        title: 'Ханья'
    },
    {
        id: 27,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/e/e4/Персонаж_Сюэи_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20231229234047&path-prefix=ru',
        title: 'Сюэи'
    },
    {
        id: 28,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/3/34/Персонаж_Хохо_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20231119043851&path-prefix=ru',
        title: 'Хохо'
    },
    {
        id: 29,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/0/0c/Персонаж_Байлу_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151735&path-prefix=ru',
        title: 'Байлу'
    },
    {
        id: 30,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/e/e7/Персонаж_Цинцюэ_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151504&path-prefix=ru',
        title: 'Цинцюэ'
    },
    {
        id: 31,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/3/31/Персонаж_Пожиратель_Луны_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230831142709&path-prefix=ru',
        title: 'Дань Хэн: Пожиратель Луны'
    },
    {
        id: 32,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/5/5d/Персонаж_Март_7_%28Охота%29_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20240724181023&path-prefix=ru',
        title: 'Март 7'
    },
    {
        id: 33,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/8/82/Персонаж_Юйкун_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230528031835&path-prefix=ru',
        title: 'Юйкун'
    },
    {
        id: 34,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/0/01/Персонаж_Лоча_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230213151451&path-prefix=ru',
        title: 'Лоча'
    },
    {
        id: 35,
        src: 'https://static.wikia.nocookie.net/honkai-star-rail/images/9/9e/Персонаж_Фу_Сюань_Сплэш-арт.png/revision/latest/scale-to-width-down/1000?cb=20230831142933&path-prefix=ru',
        title: 'Фу Сюань'
    }
        ];
        
        this.init();
    }
    
    getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 5;
    }
    
    createPhotoCard(photo) {
        return `
            <div class="photo-card" data-id="${photo.id}">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy">
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                </div>
            </div>
        `;
    }
    
    createIndicators() {
        const totalSlides = Math.ceil(this.totalCards / this.cardsPerView);
        let indicatorsHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            indicatorsHTML += `
                <button class="carousel-indicator ${i === 0 ? 'active' : ''}" 
                        data-slide="${i}"></button>
            `;
        }
        
        this.carouselNav.innerHTML = indicatorsHTML;
    }
    
    updateCarousel() {
        const cardWidth = 100 / this.cardsPerView;
        const translateX = -this.currentIndex * cardWidth * this.cardsPerView;
        this.carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Обновляем индикаторы
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Обновляем состояние кнопок
        this.prevBtn.disabled = this.currentIndex === 0;
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }
    
    nextSlide() {
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        if (index >= 0 && index <= maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    handleResize() {
        const oldCardsPerView = this.cardsPerView;
        this.cardsPerView = this.getCardsPerView();
        
        if (oldCardsPerView !== this.cardsPerView) {
            this.createIndicators();
            this.updateCarousel();
        }
    }
    
    init() {
        // Добавляем карточки
        this.carouselTrack.innerHTML = this.photos.map(photo => 
            this.createPhotoCard(photo)
        ).join('');
        
        this.totalCards = this.photos.length;
        
        // Создаем индикаторы
        this.createIndicators();
        
        // Добавляем обработчики событий
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Обработчики для индикаторов
        this.carouselNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-indicator')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            }
        });
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => this.handleResize());
        
        // Инициализируем карусель
        this.updateCarousel();
        
        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Добавляем свайпы для мобильных устройств
        this.addSwipeSupport();
    }
    
    addSwipeSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const diff = startX - endX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }
}
// Для выпадающих списков 
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}
function togglePlanet() {
    const menu = document.getElementById('dropdownPlanet');
    menu.classList.toggle('show');
}


// Инициализация карусели при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel();
    document.getElementById('menuButton').addEventListener('click', toggleMenu);
    document.getElementById('Planet').addEventListener('click', togglePlanet);
});



