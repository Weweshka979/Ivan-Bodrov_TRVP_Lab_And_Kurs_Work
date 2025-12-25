// Кастомный плагин jQuery для работы с aside элементами
(function($) {
    $.fn.animateAside = function(options) {
        const settings = $.extend({
            fontSize: '25px',
            duration: 500
        }, options);
        
        return this.each(function() {
            const $aside = $(this);
            let isExpanded = false;
            let originalPosition = null;
            
            $aside.on('click', function() {
                if (!isExpanded) {
                    // Сохраняем оригинальную позицию
                    originalPosition = {
                        parent: $aside.parent(),
                        position: $aside.css('position'),
                        float: $aside.css('float'),
                        width: $aside.css('width'),
                        margin: $aside.css('margin')
                    };
                    
                    // Перемещаем в центр экрана
                    $aside.css({
                        'position': 'fixed',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'z-index': '1001',
                        'float': 'none',
                        'width': '80%',
                        'max-width': '500px',
                        'margin': '0'
                    });
                    
                    // Увеличиваем шрифт
                    $aside.find('.aside-content').animate({
                        'font-size': settings.fontSize
                    }, settings.duration);
                    
                    isExpanded = true;
                } else {
                    // Возвращаем в исходное положение
                    $aside.css({
                        'position': originalPosition.position,
                        'top': '',
                        'left': '',
                        'transform': '',
                        'z-index': '',
                        'float': originalPosition.float,
                        'width': originalPosition.width,
                        'margin': originalPosition.margin
                    });
                    
                    // Возвращаем исходный размер шрифта
                    $aside.find('.aside-content').animate({
                        'font-size': '14px'
                    }, settings.duration);
                    
                    isExpanded = false;
                }
            });
        });
    };
})(jQuery);

$(document).ready(function() {
    /* 1. Анимированное меню */
    for(let i = 1; i <= 3; i++) {
        $('.nav-item' + i).hover(
            function() {
                $('.article' + i).css("display", "block");
            },
            function() {
                setTimeout(function() {
                    $('.article' + i).css("display", "none");
                }, 1000);
            }
        );
    }
    
    /* 2. Выделение разделов при выборе пункта меню */
    // Для секций второго уровня
    for(let i = 1; i <= 6; i++) {
        $('.nav-link' + i).click(function(e) {
            e.preventDefault();
            
            // Сбрасываем фон у всех элементов
            $('article, section, .culture-area').css("background-color", "");
            
            // Для секций 1-6 выделяем соответствующие секции
            if (i >= 1 && i <= 6) {
                $('#section' + i).css("background-color", "beige");
                
                // Плавная прокрутка
                $('html, body').animate({
                    scrollTop: $('#section' + i).offset().top - 100
                }, 500);
            }
        });
    }
    
    // Для статей первого уровня
    for(let i = 1; i <= 3; i++) {
        $('.nav-item' + i + ' a').click(function(e) {
            e.preventDefault();
            
            // Сбрасываем фон у всех элементов
            $('article, section, .culture-area').css("background-color", "");
            
            if (i == 1 || i == 2) {
                // Для статей 1 и 2 выделяем только статью
                $('#article' + i).css("background-color", "aquamarine");
                
                // Плавная прокрутка
                $('html, body').animate({
                    scrollTop: $('#article' + i).offset().top - 100
                }, 500);
            }
            
            if (i == 3) {
                $('.culture-area').css("background-color", "aquamarine");
                
                // Плавная прокрутка к области культуры
                $('html, body').animate({
                    scrollTop: $('.culture-area').offset().top - 100
                }, 500);
            }
        });
    }
    
    /* 3. Выделение столбцов таблицы */
    let currentColumn = -1;
    
    $('.myTable thead th').click(function() {
        let columnIndex = $(this).index();
        
        // Снимаем выделение со всех ячеек
        $('.myTable td, .myTable th').css({
            "textShadow": "",
            "boxShadow": ""
        });
        
        if (currentColumn === columnIndex) {
            currentColumn = -1;
        } else {
            currentColumn = columnIndex;
            
            // Добавляем тень к ячейкам выбранного столбца
            $('.myTable tr').each(function() {
                $(this).find('td, th').eq(columnIndex).css({
                    "textShadow": "0px 2px 5px 3px rgba(0, 0, 0, 0.5)",
                    "boxShadow": "0px 2px 5px 3px rgba(0, 0, 0, 0.5)"
                });
            });
        }
    });
    
    /* 4. Применение кастомного плагина к aside элементам */
    $('aside').animateAside({
        fontSize: '22px',
        duration: 400
    });
    
    /* 5. Мигающий логотип */
    let blinkInterval;
    
    $('.logo').hover(
        function() {
            const $logo = $(this);
            let opacity = 1;
            let direction = -1;
            
            blinkInterval = setInterval(function() {
                opacity += direction * 0.1;
                
                if (opacity <= 0.5) {
                    direction = 1;
                    opacity = 0.5;
                } else if (opacity >= 1) {
                    direction = -1;
                    opacity = 1;
                }
                
                $logo.css('opacity', opacity);
            }, 100);
        },
        function() {
            clearInterval(blinkInterval);
            $(this).animate({ opacity: 1 }, 500);
        }
    );
    
    /* 6. Сохраненный функционал из предыдущей лабораторной работы */
    // Функционал изменения цвета (только для кнопок формы)
    function changeFormElementsColor(newColor) {
        $('#reset, #submit').closest('form').find('.form-control, .form-select, .form-check-input').css('backgroundColor', newColor);
        
        setTimeout(() => {
            $('#reset, #submit').closest('form').find('.form-control, .form-select, .form-check-input').css('backgroundColor', '');
        }, 1000);
    }
    
    // Обработчики кнопок формы
    $('#reset').click(function(evt) {
        if (confirm("Вы действительно хотите очистить форму?")) {
            changeFormElementsColor('#ff6b6b');
        } else {
            evt.preventDefault();
            changeFormElementsColor('#51cf66');
        }
    });
    
    $('#submit').click(function(evt) {
        changeFormElementsColor('#339af0');
        alert('Ваши данные были успешно отправлены!');
        evt.preventDefault();
    });
    
    // Функционал выбора цвета текста и фона
    $('#text-color').change(function() {
        $('body').css('color', $(this).val());
    });
    
    $('#bg-color').change(function() {
        $('body').css('backgroundColor', $(this).val());
    });
    
    $('#reset-button').click(function() {
        $('#text-color').val('#8B4513');
        $('#bg-color').val('#FFF8DC');
        $('body').css({
            'color': '#5a3921',
            'backgroundColor': '#f5f5dc'
        });
    });
});