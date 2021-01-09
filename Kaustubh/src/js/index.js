$(document).ready(()=>{
    var th = 0;
    $("nav").load('nav_bar.html',()=>{//navbar jquery comes here
        $("#profile").click(()=>{
             $("section").load('profile.html',()=>{//profile jquery
                $("#profile_button").click(()=>{
                      alert("Profile Jquery");
                })  
            });
        })
        $("#home").click(()=>{
            $("section").load('categories.html');
        })
    });

    $("section").load('categories.html');

        // theme change
    $("#theme").click(()=>{
        $("button").toggleClass("btn btn-dark");
        $(".crdbtn").toggleClass("btn btn-dark");
        if(th == 0){

        th = 1;
        $("header").css("background-color","black");
        $("nav").css("background-color","black");
        $("section").css("background-color","black");
        $("header").css("color","white");
        $(".card").css({
            "background-color":"black",
            "color":"white",
            "border":"2px white solid"
        });
       
    }else{
        th = 0;
        $("header").css("background-color","white");
        $("nav").css("background-color","white");
        $("section").css("background-color","white");
        $("header").css("color","black");
        $(".card").css({
            "background-color":"white",
            "color":"black"
        });
    }
    })
   
})