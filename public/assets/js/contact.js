$(document).ready(function() {
    $(".submit").on("click", function(event) {
        event.preventDefault();
        var message = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            message: $("#message").val().trim(),
            captcha: $("#g-recaptcha-response").val()
        };

        $.ajax("/api/contact", {
            type: "POST",
            data: message
        }).then(function(response) {
            if (response.success) {
                swal(
                    response.title,
                    response.message,
                    'success'
                );

                // refresh screen
                $("#name").val("");
                $("#email").val("");
                $("#phone").val("");
                $("#message").val("");

            } else {
                swal(
                    response.title,
                    response.message,
                    'error');
            }

        });

    });
});