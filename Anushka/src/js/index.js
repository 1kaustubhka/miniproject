$(document).ready(()=>{
    var th = 0;
    localStorage.setItem("theme", th);
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
            var x = localStorage.getItem("theme");
            alert(x);
            if(x == 0){

               alert("home");
                $("header").css("background-color","#282828");
                $("nav").css("background-color","#282828");
                $("section").css("background-color","#282828");
                
                $("header").css("color","white");
                $(".card").css({
                    "background-color":"#282828",
                    "color":"white",
                    "border":"2px black gray"
                    
                });
                
                $(".crdbtn").css({
                    "background-color":"#292b2c",
                    "color":"#f7f7f7"
                });
        
                $(".form-label").css("color","white");
              
               
            }else{
               
                $("header").css("background-color","white");
                $("nav").css("background-color","white");
                $("section").css("background-color","white");
                $("header").css("color","black");
                $(".card").css({
                    "background-color":"white",
                    "color":"black",
                    "border":"2px black gray"
                });
                // $(".crdbtn").addClass("btn btn-light");
                $(".form-label").css("color","black");
                $(".crdbtn").css({
                    "background-color": "#f7f7f7",
                    "color":"#292b2c"
                });
            }
        })
        
    });

    $("section").load('categories.html');

        // theme change
    $("#theme").click(()=>{
        // $("button").toggleClass("btn btn-dark");
        
        //$(".crdbtn").toggleClass("btn btn-dark");
        if(th == 0){
            alert("theme change");
        th = 1;
        localStorage.setItem("theme", th);
        $("header").css("background-color","#282828");
        $("nav").css("background-color","#282828");
        $("section").css("background-color","#282828");
        
        $("header").css("color","white");
        $(".card").css({
            "background-color":"#282828",
            "color":"white",
            "border":"2px black gray"
            
        });
        
        $("button").css({
            "background-color":"#292b2c",
            "color":"#f7f7f7"
        });

        $(".form-label").css("color","white");
      
       
    }else{
        th = 0;
        localStorage.setItem("theme", th);
        $("header").css("background-color","white");
        $("nav").css("background-color","white");
        $("section").css("background-color","white");
        $("header").css("color","black");
        $(".card").css({
            "background-color":"white",
            "color":"black",
            "border":"2px black gray"
        });
        // $(".crdbtn").addClass("btn btn-light");
        $(".form-label").css("color","black");
        $("button").css({
            "background-color": "#f7f7f7",
            "color":"#292b2c"
        });
    }
    })
   
})