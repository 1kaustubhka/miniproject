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
        if(th == 0){

        th = 1;
        $("header").css("background-color","black");
        $("nav").css("background-color","black");
        $("section").css("background-color","black");
    }else{
        th = 0;
        $("header").css("background-color","gray");
        $("nav").css("background-color","gray");
        $("section").css("background-color","gray");
    }
    })
   
})