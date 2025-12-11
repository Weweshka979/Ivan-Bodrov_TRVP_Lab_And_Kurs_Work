// ОСНОВНОЙ КЛАСС ОРГАНАЙЗЕРА
class TaskOrganizer {
    constructor() {
        // Инициализация основных переменных
        this.currentDate = new Date(); // Текущая отображаемая дата
        this.tasks = new Map(); // Хранилище задач (ключ - дата, значение - текст задач)
        this.selectedDate = null; // Выбранная дата для редактирования задач
        
        // Массивы названий месяцев и дней недели
        this.monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        
        this.dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        
        // Запуск инициализации
        this.init();
    }
    
    // ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ  
    init() {
        this.cacheElements(); // Кэширование DOM элементов
        this.bindEvents(); // Привязка событий
        this.renderCalendar(); // Отрисовка календаря
        this.loadFromStorage(); // Загрузка задач из хранилища
    }
    
    // Кэширование ссылок на DOM элементы для быстрого доступа
    cacheElements() {
        this.calendarGrid = document.getElementById('calendarGrid');
        this.currentMonthYear = document.getElementById('currentMonthYear');
        this.yearInput = document.getElementById('yearInput');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.taskModal = document.getElementById('taskModal');
        this.modalDate = document.getElementById('modalDate');
        this.taskInput = document.getElementById('taskInput');
        this.saveBtn = document.getElementById('saveTasks');
        this.closeModalBtn = document.getElementById('closeModal');
        this.cancelBtn = document.getElementById('cancelBtn');
    }
    
    // Привязка обработчиков событий к элементам
    bindEvents() {
        // Кнопки переключения месяцев
        this.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        this.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        
        // Поле ввода года
        this.yearInput.addEventListener('change', () => this.changeYear());
        
        // Кнопки модального окна
        this.saveBtn.addEventListener('click', () => this.saveTasks());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());
    }
    
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ РАБОТЫ С ДАТАМИ
    
    // Форматирование даты в строку YYYY-MM-DD
    getFormattedDate(date = this.currentDate) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    
    // Создание ключа для хранения задач в Map
    getDateKey(date) {
        return `${date.getFullYear()}-${this.monthNames[date.getMonth()]}-${date.getDate()}`;
    }
    
    // УПРАВЛЕНИЕ ОТОБРАЖАЕМЫМ МЕСЯЦЕМ И ГОДОМ
    
    // Изменение месяца (offset: -1 для предыдущего, 1 для следующего)
    changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        this.renderCalendar();
    }
    
    // Изменение года из поля ввода
    changeYear() {
        const year = parseInt(this.yearInput.value);
        // Проверка корректности введенного года
        if (year >= 2000 && year <= 2100) {
            this.currentDate.setFullYear(year);
            this.renderCalendar();
        } else {
            // Восстановление предыдущего значения при некорректном вводе
            this.yearInput.value = this.currentDate.getFullYear();
        }
    }
    
    // ОТРИСОВКА КАЛЕНДАРЯ
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Обновление заголовка с месяцем и годом
        this.currentMonthYear.textContent = `${this.monthNames[month]} ${year}`;
        this.yearInput.value = year;
        
        // Вычисление первого и последнего дня месяца
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Определение дня недели для первого дня месяца (1 = понедельник, 0 = воскресенье)
        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        
        // Очистка сетки календаря
        this.calendarGrid.innerHTML = '';
        
        // СОЗДАНИЕ ПУСТЫХ ЯЧЕЕК ДЛЯ ВЫРАВНИВАНИЯ
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            this.calendarGrid.appendChild(emptyDay);
        }
        
        // СОЗДАНИЕ ЯЧЕЕК С ДНЯМИ МЕСЯЦА
        const today = new Date(); // Текущая дата для сравнения
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const date = new Date(year, month, day);
            const dateKey = this.getDateKey(date);
            
            // ПРОВЕРКА: ЭТО СЕГОДНЯШНИЙ ДЕНЬ?
            if (isCurrentMonth && day === today.getDate()) {
                dayElement.classList.add('today'); // Добавляем класс для выделения
            }
            
            
            // ПРОВЕРКА: ЕСТЬ ЛИ ЗАДАЧИ НА ЭТУ ДАТУ?
            if (this.tasks.has(dateKey) && this.tasks.get(dateKey).trim() !== '') {
                dayElement.classList.add('has-tasks'); // Добавляем синюю рамку
            }
            
            // Привязка события клика для открытия модального окна
            dayElement.addEventListener('click', () => this.openTaskModal(date));
            this.calendarGrid.appendChild(dayElement);
        }
    }
    
    
    // РАБОТА С МОДАЛЬНЫМ ОКНОМ ЗАДАЧ
    
    // Открытие модального окна для выбранной даты
    openTaskModal(date) {
        this.selectedDate = date;
        const dateKey = this.getDateKey(date);
        
        // Установка заголовка модального окна
        this.modalDate.textContent = `${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
        
        // Загрузка существующих задач или очистка поля
        this.taskInput.value = this.tasks.has(dateKey) ? this.tasks.get(dateKey) : '';
        
        // Показ модального окна
        this.modalOverlay.style.display = 'block';
        this.taskModal.style.display = 'block';
        
        // Установка фокуса на поле ввода
        setTimeout(() => {
            this.taskInput.focus();
        }, 100);
    }
    
    // Закрытие модального окна
    closeModal() {
        this.modalOverlay.style.display = 'none';
        this.taskModal.style.display = 'none';
        this.selectedDate = null;
        this.taskInput.value = '';
    }
    
    // Сохранение задач для выбранной даты
    saveTasks() {
        if (!this.selectedDate) return;
        
        const dateKey = this.getDateKey(this.selectedDate);
        const tasksText = this.taskInput.value.trim();
        
        // Сохранение или удаление задач
        if (tasksText) {
            this.tasks.set(dateKey, tasksText);
        } else {
            this.tasks.delete(dateKey);
        }
        
        // Обновление хранилища и отображения
        this.saveToStorage();
        this.renderCalendar();
        this.closeModal();
    }
    
    
    // РАБОТА С ЛОКАЛЬНЫМ ХРАНИЛИЩЕМ
    
    // Сохранение задач в LocalStorage
    saveToStorage() {
        const tasksObject = Object.fromEntries(this.tasks);
        localStorage.setItem('taskOrganizer', JSON.stringify(tasksObject));
    }
    
    // Загрузка задач из LocalStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('taskOrganizer');
            if (saved) {
                const tasksObject = JSON.parse(saved);
                this.tasks = new Map(Object.entries(tasksObject));
                this.renderCalendar(); // Перерисовка календаря с загруженными задачами
            }
        } catch (error) {
            console.warn('Не удалось загрузить сохраненные задачи:', error);
        }
    }
}


// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    new TaskOrganizer();
});


// Добавление метода для получения названия дня недели
Date.prototype.getWeekDayName = function() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[this.getDay()];
};

// Добавление метода для преобразования первой буквы строки в верхний регистр
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};