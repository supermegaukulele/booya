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





$(function () {
    $("#sidebar .nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });
});




window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`nav li a[href="#${id}"]`).classList.add('active');
            } else {
                document.querySelector(`nav li a[href="#${id}"]`).classList.remove('active');
            }
        });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });

});