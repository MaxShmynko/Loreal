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

    $(".form__loading-input-file input").on("change", function () {
        const fileName = $(this).val().split("\\").pop();

        $(".form__button-file-name").text(fileName);
    });

    $("#submit-button").on("click", function () {
        var isValid = validateForm();
    
        if (isValid) {
            $(".form__error-message").hide();
    
            var formData = new FormData();
            formData.append("photo", $(".form__loading-input-file input")[0].files[0]);
            formData.append("expert", getSelectedExpert());
            formData.append("description", $("#counter-text").val());
    
            $.ajax({
                type: "POST",
                url: "https://podruzhka.woman.ru/save_data/",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log("Данные успешно отправлены", response);
                },
                error: function (xhr, status, error) {
                    console.error("Ошибка при отправке данных", xhr, status, error);
                }
            });
        } else {
            $(".form__error-message").show();
            animateError();
        }
    });
    
    function validateForm() {
        var photo = $(".form__loading-input-file input").val();
        var expert = $(".form__radio-container-btn input:checked").val();
        var description = $("#counter-text").val();
    
        return photo !== "" && expert !== undefined && description !== "";
    }
    
    function animateError() {
        for (let i = 0; i < 8; i++) {
            setTimeout(function () {
                $(".form__loading-input-file, .form__radio-container-btn-text").toggleClass("form__error");
                $("#counter-text, .form__counter").toggleClass("form__error-text");
            }, i * 350);
        }
    
        setTimeout(function () {
            $(".form__loading-input-file, .form__radio-container-btn-text").removeClass("form__error");
            $("#counter-text, .form__counter").removeClass("form__error-text");
        }, 5000);
    }
    
    function getSelectedExpert() {
        return $(".form__radio-container-btn input:checked").index() + 1;
    }
});
