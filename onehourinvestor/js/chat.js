window.onload = function() {
    $(".list-group-item").mouseleave(function() {
        $("#chat-friends .list-group-item").removeClass("active");
    });
    $(".list-group-item").mouseover(function() {
        $("#chat-friends .list-group-item").removeClass("active");
        $(this).addClass("active");
    });

    $(".list-group-item").click(function() {
        $("#chat-container").show();
        $("#name").html($(this).html());
    });

    $(".close-btn").click(function() {
        $("#chat-container").hide();
    });

    $("#enter-message").bind("enterKey", function(e) {
        $("#messages").html("Me: " + $("#enter-message").val());
        $("#enter-message").val("");
    });
    $("#enter-message").keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
};
