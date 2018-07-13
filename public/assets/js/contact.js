$(document).ready(function() {
    $(".submit").on("click", function(event) {
        event.preventDefault();
        var message = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            message: $("#message").val().trim()
        };
        console.log(message);

        $.ajax("/api/contact", {
            type: "POST",
            data: message
        }).then(function(response) {
            if (response.success) {
                swal(
                    'Sent!',
                    'Your message has been send.',
                    'success'
                );
            } else {
                swal('Not Sent!',
                    'Your message was not sent.\nPlease check your data',
                    'error');
            }

        });

    });
});