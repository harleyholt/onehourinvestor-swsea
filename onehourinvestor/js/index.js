window.onload = function() {
    $(".btn-signup").click(signup);
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