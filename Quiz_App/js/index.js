$(document).ready(() => {

    var selectedcat;
    var th = 0;
    localStorage.setItem("theme", th);
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
            $("section").load('categories.html');
            //I CAN REFRESH.
            $.ajax({
                url: "http://localhost:3000/Category/",
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                success: (cat) => {
        
                    for (let i = 0; i < cat.length; i++) {
                        var ct = cat[i]['id'].toString();
                        console.log(ct);
                        var cid = ct + "_testsets";
                        //alert(cid);
                        $('section').append(`
                    <div class="col-lg-6 col-sm-12 gy-1">
                                <div class="card">
                                    <img src="../images/c++.png" class="card-img-top" alt="===">
                                    <div class="card-body">
                                        <h5 class="card-title">${ct}</h5>
                                        <p class="card-text">Test Your Knowledge On ${ct}</p>
                                        <button  id=${cid} class="btn btn-light crdbtn">Take Test</button>
                                    </div>
                                </div>
                            </div>`);
        
                    }
        
                
                },
        
            });
            $(document).on("click", (".crdbtn"), (function(){
                alert(this.id);
                $("section").load('user_testset_table.html');
            })
            );
        })
    });

    $("section").load('categories.html',()=>{

        $.ajax({
            url: "http://localhost:3000/Category/",
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: (cat) => {
    
                for (let i = 0; i < cat.length; i++) {
                    var ct = cat[i]['id'].toString();
                    console.log(ct);
                    var cid = ct + "_testsets";
                    //alert(cid);
                    $('section').append(`
                <div class="col-lg-6 col-sm-12 gy-1">
                            <div class="card">
                                <img src="../images/c++.png" class="card-img-top" alt="===">
                                <div class="card-body">
                                    <h5 class="card-title">${ct}</h5>
                                    <p class="card-text">Test Your Knowledge On ${ct}</p>
                                    <button  id=${cid} class="btn btn-light crdbtn">Take Test</button>
                                </div>
                            </div>
                        </div>`);
    
                }
    
            
            },
    
        });
        $(document).on("click", (".crdbtn"), (function(){
            alert(this.id);
            $("section").load('user_testset_table.html',()=>{
                var ct = "C";
                $.ajax({
                    url: "http://localhost:3000/Category/"+ct,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    success: (cat) => {
                     
                     console.log(Object.keys(cat).length);
                     //console.log(JSON.stringify(cat['questionset2']))
                        // cat.forEach(element => {
                        //    console.log(element) 
                        // });
                     let i = 1;
                   
                     for(i=1;i<Object.keys(cat).length;i++)
                     {
                        var tid = "testsets" + i;
                           
                        // alert(i);
                                 // alert tid);
                                 $("tbody").append(
                                   `<tr><th scope="row">` +
                                     `${i}` +
                                     `</th><td>` +
                                    `TestSet ${i}`+
                                     `</td><td></td>` +
                                     `<td ><button id=${tid} class="testsets btn btn-primary">Take Test</button></td>`
                                 );  
                     }
                      
                      
                        $(document).on("click", ".testsets", function () {
                            alert(this.id);
                        });
                    },
                    error:(e)=>{
                        alert(e);
                    }
               });
            });
        })
        );
    
        // $("#c_testsets").click(()=>{
        //     alert("c test");
        //     $("section").load('categoriestestset.html');
        // })
        // $("#c++_testsets").click(()=>{
        //     $("section").load('categoriestestset.html');
        // })
        // $("#java_testsets").click(()=>{
        //     $("section").load('categoriestestset.html');
        // })
        // $("#html_testsets").click(()=>{
        //     $("section").load('categoriestestset.html');
        // })
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