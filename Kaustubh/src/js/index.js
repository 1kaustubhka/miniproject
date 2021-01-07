$(document).ready(()=>{
    $("nav").load('nav_bar.html',()=>{//navbar jquery comes here
        $("#profile").click(()=>{
             $("section").load('profile.html',()=>{//profile jquery
                $("#profile_button").click(()=>{
                      alert("Profile Jquery");
                })  
            });
        })
    });

   
})