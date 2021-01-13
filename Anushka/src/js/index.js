$(document).ready(() => {
    var th = 0;
    localStorage.setItem("theme", th);
    $("nav").load('nav_bar.html', () => {//navbar jquery comes here
        $("#profile").click(() => {
//_____________________________________________________________
            $("section").load('profile.html', () => {//profile jquery
               
            });
        })
        $("#home").click(() => {
            $("section").load('categories.html');

        })

    });

    $("section").load('categories.html');

    // ________change theme___________________________________________________________________________________________
    $("#theme").click(() => {
        if (th == 0) {
            th = 1;
            localStorage.setItem("theme", th);
            $("header").css("background-color", "#282828");
            $("nav").css("background-color", "#282828");
            $("section").css("background-color", "#282828");
            $("header").css("color", "white");
            $(".card").css({
                "background-color": "#282828",
                "color": "white",
                "border": "2px black gray"
            });
            $("button").css({
                "background-color": "#292b2c",
                "color": "#f7f7f7"
            });
            $(".form-label").css("color", "white");


        } else {
            th = 0;
            localStorage.setItem("theme", th);
            $("header").css("background-color", "white");
            $("nav").css("background-color", "white");
            $("section").css("background-color", "white");
            $("header").css("color", "black");
            $(".card").css({
                "background-color": "white",
                "color": "black",
                "border": "2px black gray"
            });
            // $(".crdbtn").addClass("btn btn-light");
            $(".form-label").css("color", "black");
            $("button").css({
                "background-color": "#f7f7f7",
                "color": "#292b2c"
            });
        }
    })

})