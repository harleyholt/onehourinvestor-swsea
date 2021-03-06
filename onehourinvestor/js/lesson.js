var progress = 25;
var money = 1000;

window.onload = function() {
    $(".left").hide();
    $(".btn-signup").click(signup);
    $(".list-group-item").mousedown(choose);
    $(".btn-submit").click(answer);
    $(".btn-check").click(check);
    $(".btn-submit").attr("disabled", "disabled");
    $(".status").html("$" + money);

    $(".right").click(function() {
        $(".right").hide();
    });
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
    validate($(".active .list-group-item.active").hasClass("correct"));

    $(".active .btn-submit").attr('disabled', 'disabled');
    $(".active .list-group-item").unbind("mousedown");

    progress += 25;
    $(".percent").html(progress + "%");
    $(".progress-bar").width(progress + "%");

    $(".right").show();
    if (progress == 30) {
        $(".left").show();
        $(".right").unbind("click");
    }
}

function check() {
    if ($("#googleq").val() == "898.39") {
        validate(true);
        $(".active .answer-space").html("<span class=\"alert alert-success\">Correct!</span>");
        $("#googleq").attr('disabled', 'disabled');
        $(".active .btn").attr('disabled', 'disabled');

        progress += 25;
        $(".percent").html(progress + "%");
        $(".progress-bar").width(progress + "%");

        $(".right").show();
        $(".left").show();
    } else {
        validate(false);
        $(".active .answer-space").html("<span class=\"alert alert-danger\">Incorrect! Try again.</span>");
    }
}

function validate(correct) {
    if (correct) {
        $(".active .answer-space").html("<span class=\"alert alert-success\">Correct!</span>");
        money += 1000;
        $(".status").html("$" + money);

        $("#money-add").show();
        $("#money-add").html("+$1000");
        $("#money-add").css({
            "opacity" : "1",
            "color" : "blue",
            "display" : "run-in"
        });
        $("#money-add").animate({
            top : "-=100px",
            opacity : 0
        }, "slow", function() {
            $("#money-add").css("top", "80%");
        });
    } else {
        var page = $(".item.active");
        if (page.hasClass("page2")) {
            $(".active .answer-space").html("<span class=\"alert alert-danger\">Incorrect! Banks are insured against loss and are generally considered safe.</span>");
        } else if (page.hasClass("page3")) {
            $(".active .answer-space").html("<span class=\"alert alert-danger\">Incorrect! An index fund is a mutual fund that tracks a stock index.</span>");
        }

        money -= 100;
        $(".status").html("$" + money);

        $("#money-add").html("-$100");
        $("#money-add").css({
            "opacity" : "1",
            "color" : "red",
            "display" : "run-in"
        });
        $("#money-add").animate({
            top : "-=100px",
            opacity : 0
        }, "slow", function() {
            $("#money-add").css("top", "80%");
        });
    }
}
