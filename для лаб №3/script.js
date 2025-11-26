// Основные константы для работы приложения
const DEFAULT_BACKGROUND = "#FFFFFF"; // Цвет фона страницы
const HIGHLIGHT_COLOR = "#FFF8DC"; // Цвет выделения
const SECTIONS_COUNT = 4; 

/* Обработка навигационного меню - выделение активных разделов */
function initializeMenuHighlighting() {
    const menuItems = document.querySelectorAll('nav a');
    
    for (let itemIndex = 0; itemIndex < SECTIONS_COUNT; itemIndex++) {
        const menuItem = menuItems[itemIndex];
        menuItem.addEventListener('click', function(clickEvent) {
            // Предотвращаем стандартное поведение ссылки
            clickEvent.preventDefault();
            
            // Сбрасываем фон у ВСЕХ секций (включая опрос) на цвет по умолчанию
            const allSections = document.querySelectorAll('section');
            allSections.forEach(section => {
                section.style.backgroundColor = DEFAULT_BACKGROUND;
            });
            
            // Определяем целевой раздел для выделения
            const targetHref = this.getAttribute('href');
            const targetSectionId = targetHref.slice(1);
            const targetSectionElement = document.getElementById(targetSectionId);
            
            // Выделяем только целевую секцию
            if (targetSectionElement) {
                targetSectionElement.style.backgroundColor = HIGHLIGHT_COLOR;
                
                // Плавная прокрутка к секции
                targetSectionElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}


/* Управление выделением столбцов таблицы */
function setupTableColumnHighlight() {
    let activeColumnIndex = -1;
    const headerCells = document.querySelectorAll('table thead th');
    
    for (let columnIndex = 0; columnIndex < headerCells.length; columnIndex++) {
        const headerCell = headerCells[columnIndex];
        headerCell.addEventListener('click', function(event) {
            // Останавливаем всплытие события, чтобы не сработал обработчик секции
            event.stopPropagation();
            
            // Снимаем выделение со всех ячеек таблицы
            const allRows = document.querySelectorAll('table tbody tr');
            allRows.forEach(row => {
                const cells = row.querySelectorAll('td, th');
                cells.forEach(cell => {
                    cell.style.textShadow = '';
                    cell.style.boxShadow = '';
                });
            });
            
            // Переключаем состояние выделения
            if (activeColumnIndex === columnIndex) {
                activeColumnIndex = -1;
            } else {
                activeColumnIndex = columnIndex;
                // Применяем эффекты тени к ячейкам активного столбца
                allRows.forEach(row => {
                    const cell = row.cells[columnIndex];
                    if (cell) {
                        cell.style.textShadow = '0px 2px 5px 3px rgba(0, 0, 0, 0.5)';
                        cell.style.boxShadow = '0px 2px 5px 3px rgba(0, 0, 0, 0.5)';
                    }
                });
            }
        });
    }
}

/* Функционал всплывающих окон */
function showPopupWindow(popupId) {
    const overlayElement = document.getElementById("overlay");
    const popupElement = document.getElementById(popupId);
    
    if (overlayElement && popupElement) {
        overlayElement.style.display = "block";
        popupElement.style.display = "block";
    }
}

function hideAllPopups() {
    const overlayElement = document.getElementById("overlay");
    const allPopups = document.querySelectorAll('[id^="popupDialog"]');
    
    if (overlayElement) {
        overlayElement.style.display = "none";
    }
    allPopups.forEach(popup => {
        popup.style.display = "none";
    });
}

function initializePopupSystem() {
    // Регистрируем обработчики закрытия
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', hideAllPopups);
    });
    
    // Назначаем обработчики открытия только для основных секций (исключая опрос)
    const mainSections = document.querySelectorAll("#history, #pyramids, #gods, #dynasties");
    mainSections.forEach((sectionElement, sectionIndex) => {
        sectionElement.addEventListener('click', () => {
            showPopupWindow("popupDialog" + (sectionIndex + 1));
        });
    });
    
    // Отдельный обработчик для заголовка таблицы
    const tableCaption = document.querySelector('table caption');
    if (tableCaption) {
        tableCaption.addEventListener('click', function(event) {
            event.stopPropagation(); // Останавливаем всплытие
            showPopupWindow("popupDialog5"); // Окно для таблицы
        });
    }
    
    // Запрещаем всплывающие окна для самой таблицы (кроме заголовка)
    const tableElement = document.querySelector('table');
    if (tableElement) {
        tableElement.addEventListener('click', function(event) {
            event.stopPropagation(); // Полностью блокируем клики по таблице
        });
    }
}



/* Изменяет цвет фона элементов формы на указанный цвет */
function changeFormElementsColor(newColor) {
    // Находим все элементы управления формы
    const formControls = document.querySelectorAll('.form-control, .form-select');
    
    // Применяем новый цвет ко всем элементам
    formControls.forEach(element => {
        element.style.backgroundColor = newColor;
    });
    
    // Сбрасываем цвет через 1 секунду
    window.setTimeout(() => {
        formControls.forEach(element => {
            element.style.backgroundColor = '';
        });
    }, 1000);
}

/* Обработчик для кнопки сброса формы */
function handleResetButtonClick(evt) {
    // Спрашиваем подтверждение у пользователя
    const userResponse = window.confirm("Вы действительно хотите очистить форму?");
    
    if (userResponse) {
        // Пользователь согласился - красим в красный
        changeFormElementsColor('#ff6b6b');
    } else {
        // Пользователь отказался - красим в зеленый и отменяем сброс
        evt.preventDefault();
        changeFormElementsColor('#51cf66');
    }
}

/* Обработчик для кнопки отправки формы */
function handleSubmitButtonClick(evt) {
    // Меняем цвет полей на синий
    changeFormElementsColor('#339af0');
    
    // Показываем сообщение об успешной отправке
    window.alert('Ваши данные были успешно отправлены!');
    
    // Блокируем реальную отправку формы
    evt.preventDefault();
}

// Назначаем обработчики событий после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на кнопки формы
    const resetBtn = document.getElementById('reset');
    const submitBtn = document.getElementById('submit');
    
    // Проверяем, что кнопки существуют
    if (resetBtn && submitBtn) {
        // Назначаем обработчики
        resetBtn.addEventListener('click', handleResetButtonClick);
        submitBtn.addEventListener('click', handleSubmitButtonClick);
    }
    
    // Инициализация остального функционала
    initializeMenuHighlighting();
    setupTableColumnHighlight();
    initializePopupSystem();
});