import $ from "jquery";

$(() => {
    const textarea = $('#counter-text');
    const characterCounter = $('#character-counter');

    textarea.on('input', function () {
        const currentLength = textarea.val().length;
        characterCounter.text(currentLength);
    });

    const textСounter = $('#counter-text');
    const originalPlaceholder = textСounter.attr('placeholder');
    const newPlaceholder = "Текст набора|";

    textСounter.mouseenter(function () {
        textСounter.attr('placeholder', newPlaceholder);
    });

    textСounter.mouseleave(function () {
        textСounter.attr('placeholder', originalPlaceholder);
    });

    $('.form__example-pravelny').hover(
        function () {
            $('.form__pravelny-img').fadeIn('slow');
        },
        function () {
            $('.form__pravelny-img').fadeOut('slow');
        }
    );

    $('.form__example-not-correct').hover(
        function () {
            $('.form__not-correct-img').fadeIn('slow');
        },
        function () {
            $('.form__not-correct-img').fadeOut('slow');
        }
    );

    $('#submit-button').on('click', function () {
        var formData = new FormData($('#your-form-id')[0]);

        $.ajax({
            type: 'POST',
            url: '/save_data/',
            data: formData,
            contentType: false,
            processData: false, 
            success: function (response) {
                console.log('Данные успешно отправлены:', response);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка отправки данных:', xhr, status, error);
            }
        });
    });
});
