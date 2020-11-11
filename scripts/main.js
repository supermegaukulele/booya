// MDB Lightbox Init
$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

$(function () {
    var selectedClass = "";
    $(".filter").click(function () {
        selectedClass = $(this).attr("data-rel");
        $("#gallery").fadeTo(100, 0.1);
        $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
        setTimeout(function () {
            $("." + selectedClass).fadeIn().addClass('animation');
            $("#gallery").fadeTo(300, 1);
        }, 300);
    });
});



/* $('#upnavbar .navbar-nav a').on('click', function () {
    $('#upnavbar .navbar-nav').find('li.active').removeClass('active');
    $(this).parent('li').addClass('active');
});
 */

$(document).on('click', '#upnavbar', function () {
    $(".nav-item").find(".active").removeClass("active");
})

$(document).ready(function () {
    $('a[href="' + location.pathname + '"]').closest('.nav-item').addClass('active');
});