window.onload = function() {
    $(".btn-signup").click(signup);
    $(".list-group-item").mousedown(choose);
    $(".btn-submit").click(answer);
    $(".btn-submit").attr("disabled", "disabled");
};

function signup() {
    var emailAddress = $("#email-signup").val();

    $.post("/i-am-interested", {
        email : emailAddress
    }).done(function(data) {
    });

    $("#signup-prompt").html("Thanks for signing up!");
    $("#email-signup").remove();
    $(".btn-signup").remove();
    $("#signup-form").html("We will notify you when the site is launched.");
}

function choose() {
    if ($(this).hasClass("active")) {
        $(".active .list-group-item").removeClass("active");
        $(".active .btn-submit").attr("disabled", "disabled");
    } else {
        $(".active .list-group-item").removeClass("active");
        $(this).addClass("active");
        $(".active .btn-submit").removeAttr("disabled");
    }
}

function answer() {
    if ($(".active.list-group-item.active").hasClass("correct")) {
        $("#answer-space").html("Correct!");
    } else {
        $("#answer-space").html("Wrong!");
    }
    $(".active .btn-submit").attr('disabled', 'disabled');
    $(".active .list-group-item").unbind("mousedown");
    $(".percent").html("20%");
    $(".progress-bar").width("20%");
}