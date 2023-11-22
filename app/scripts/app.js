import $ from "jquery";
import slick from "slick-carousel";

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

    $('.content__wrap__list').slick({
        infinite: true, 
        slidesToShow: 4, 
        slidesToScroll: 1,
        prevArrow: $('.content__wrap__button-prev'),
        nextArrow: $('.content__wrap__button-next'),
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
          ]
    });


    $(".form__pop-up").hide();
    $(".form__error-message").hide();

    $("#submit-button").on("click", function (e) {
        e.preventDefault();

        $(".form__loading-input-file, .form__radio-container-btn-text, .form__error-text").removeClass("form__error");
        $(".form__error-text").removeClass("form__error-text");

        let inputFile = $("#file-img");
        let fileUploaded = inputFile[0].files.length > 0;
        if (!fileUploaded) {
            toggleErrorClass($(".form__loading-input-file"));
        }

        let radioChecked = $("input[name='radio-group']:checked").length > 0;
        if (!radioChecked) {
            toggleErrorClass($(".form__radio-container-btn-text"));
        }


        let nameInput = $("#name");
        let emailInput = $("#email");
        let textArea = $("#counter-text");
        let fieldsFilled = nameInput.val() !== "" && emailInput.val() !== "" && textArea.val() !== "";
        if (!fieldsFilled) {

            if (nameInput.val() === "") {
                nameInput.addClass("form__error-text");
            }
            if (emailInput.val() === "") {
                emailInput.addClass("form__error-text");
            }
            if (textArea.val() === "") {
                textArea.addClass("form__error-text");
            }
            toggleErrorClass([nameInput, emailInput, textArea]);
        }


        let approvalChecked = $("#scales").is(":checked");
        if (!approvalChecked) {
            toggleErrorClass($(".form__approval-label"));
        }

        let hasErrors = $(".form__error").length > 0;
        let allFieldsFilled = fileUploaded && radioChecked && fieldsFilled && approvalChecked;

        if (hasErrors || !allFieldsFilled) {
            $(".form__error-message").text("Заполните все поля формы.").fadeIn();
        } else {
            $(".form__error-message").fadeOut();


            let formData = new FormData();
            formData.append("file", inputFile[0].files[0]);
            formData.append("radio-group", $("input[name='radio-group']:checked").val());
            formData.append("name", nameInput.val());
            formData.append("email", emailInput.val());
            formData.append("counter-text", textArea.val());
            formData.append("approval", approvalChecked);

            $.ajax({
                url: "https://podruzhka.woman.ru/save_data/",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.error_num === 0 && response.error === '') {
                        console.log("Успешно отправлено:", response);
                        $(".form__pop-up").fadeIn();
                    } else {
                        console.error("Ошибка при отправке:", response);
                        $(".form__pop-up").text("Форма не отправлена =( " + response.error).fadeIn(); 
                    }
                },
                error: function(error) {
                    console.error("Ошибка отправки:", error);
                    $(".form__pop-up").text("Произошла ошибка при отправке формы").fadeIn();
                }
            });
        }
    });

    function toggleErrorClass(elements, iterations) {
        // По умолчанию 1 итерация, если не указано иное
        iterations = iterations || 1;

        function toggle() {
            if (elements instanceof jQuery) {
                // Если elements является объектом jQuery
                elements.addClass("form__error");
                setTimeout(function() {
                    elements.removeClass("form__error");
                }, 500); 
            } else {
                $(elements).addClass("form__error");
                setTimeout(function() {
                    $(elements).removeClass("form__error");
                }, 500); 
            }
        }

        let counter = 0;
        let intervalId = setInterval(function() {
            toggle();
            counter++;

            if (counter === iterations * 2) {
                clearInterval(intervalId);
                $(".form__error-message").fadeIn(); 
            }
        }, 700); 
    }

    toggleErrorClass($(".form__error"), 3);
    

});
