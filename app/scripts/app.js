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

    $("#submit-button").on("click", function () {
        const formData = {
            photo: $(".form__loading-input-file input").val(),
            expert: $(".form__radio-container-btn input:checked").val(),
            description: $("#counter-text").val()
        };

        $.ajax({
            type: "POST",
            url: "https://podruzhka.woman.ru/save_data/",
            data: formData,
            success: function (response) {
                console.log("Данные успешно отправлены", response);
            },
            error: function (xhr, status, error) {
                console.error("Ошибка при отправке данных", xhr, status, error);
            }
        });
    });

});
