$(document).ready(() => {
    var th = 0;//theme flag

    $("nav").load('nav_bar.html', () => {//navbar jquery comes here
     //PROFILE BUTTON  
        $("#profile").click(() => {
            $("section").load('profile.html', () => {//profile jquery
                $("#profile_button").click(() => {
                    alert("Profile Jquery");
                })
                $('#profile_button2').on("click", () => {
                    alert("button 2 clucked");
                })
            });
        })

    //HOME BUTTON
        $("#home").click(() => {
            
            document.location.href="/html/index.html";
            //I CAN REFRESH.
        })
    });

    $("section").load('categories.html',()=>{

        var cat ="C#";
        var cid = cat+"_testsets";
        $('section').append(`
        <div class="col-lg-6 col-sm-12 gy-1">
                    <div class="card">
                        <img src="../images/c++.png" class="card-img-top" alt="===">
                        <div class="card-body">
                            <h5 class="card-title">${cat}</h5>
                            <p class="card-text">Test Your Knowledge On ${cat}</p>
                            <button  id=${cid} class="btn btn-light crdbtn">Take Test</button>
                        </div>
                    </div>
                </div>`);
                alert(cid);
        $("#c_testsets").click(()=>{
            alert("c test");
            $("section").load('categoriestestset.html');
        })
        $("#c++_testsets").click(()=>{
            $("section").load('categoriestestset.html');
        })
        $("#java_testsets").click(()=>{
            $("section").load('categoriestestset.html');
        })
        $("#html_testsets").click(()=>{
            $("section").load('categoriestestset.html');
        })
        $(document).on("click",(".crdbtn"),(()=>{
            $("section").load('categoriestestset.html');
        })
    );
});



// -----------------------------------------------------------THEME CHANGE CODE----------------------------------------------------------


    // theme change
    $("#theme").click(() => {
        $("button").toggleClass("btn btn-dark");
        $(".crdbtn").toggleClass("btn btn-dark");
        if (th == 0) {

            th = 1;
            $("header").css("background-color", "black");
            $("nav").css("background-color", "black");
            $("section").css("background-color", "black");
            $("header").css("color", "white");
            $(".card").css({
                "background-color": "black",
                "color": "white",
                "border": "2px white solid"
            });

        } else {
            th = 0;
            $("header").css("background-color", "white");
            $("nav").css("background-color", "white");
            $("section").css("background-color", "white");
            $("header").css("color", "black");
            $(".card").css({
                "background-color": "white",
                "color": "black"
            });
        }
    })

})