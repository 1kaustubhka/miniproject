$(document).ready(() => {
  var selectedcat;
  var currpass = "";
  var em = sessionStorage.getItem("email");

  //------------------------------- loading header and footer -------------------------------------

  $("header").load("header.html");
  $("footer").load("footer.html");
  $("nav").load("user_navbar.html", () => {
    //---------------------------------navbar jquery comes here---------------------------------------

    //----------------------------------PROFILE BUTTON----------------------------------------------
    var pswd, idd;
    $("#profile").click(() => {
      $("section").load("user_profile.html", () => {
        //profile jquery
       // var link = 'http://localhost:3000/user/'+sessionStorage.getItem("userId");
        event.preventDefault();
        $.ajax({
          url: "http://localhost:3000/user?id="+sessionStorage.getItem("userId"),
          type: "GET",
          success: (x) => {
            x.forEach((element) => {
              console.log(element)
              //   console.log(element.email.localeCompare(sessionStorage.getItem('email')));
                currpass = element.password;
                $("#user_name").val(element.name);
                $("#user_email").val(element.email);
                $("#user_contact").val(element.phone);
              
            });
          },
        });

        $(document).on("click",".updatePassword",function(){
          alert($("#user-new-pwd").val())
          if(currpass == $("#user_pwd").val()){
            alert("called")
            $.ajax({
              type: "patch",
              data:{
                password:$("#user-new-pwd").val()
              },
              url: "http://localhost:3000/user/"+sessionStorage.getItem("userId"),
              success: function (response) {
                
              },
            });  
          }else{
            alert("incorrect current password")
          }
            
        })
      });
    });

    // -------------------------------------Dynamically loading graph-----------------------------------------------------

    $("#performance").click(() => {
      var userid = sessionStorage.getItem("userid");

      // ---------------------------------------dymaically adding buttons for graph-------------------------------------

      $("section").load("performance.html", () => {
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart;
        $.ajax({
          url: "http://localhost:3000/Category/",
          type: "GET",
          dataType: "json",
          contentType: "application/json",
          success: (dt) => {
            for (let i = 0; i < dt.length; i++) {
              var ct = dt[i].cat.toString();
              console.log(ct);
              $(".canvas-btn").append(
                `<button id="${ct}_performance" value="${ct}" class="performanceBtn btn btn-dark">${ct}</button>`
              );
            }
          },
        });

        $(document).on("click", ".performanceBtn", function () {
          let graphBtn = this.value;
          $.ajax({
            url: "http://localhost:3000/xyz@gmail.com/",
            type: "GET",
            success: (x) => {
              var label = [];
              var marks = [];

              x.forEach((element) => {
                if (element.category == graphBtn) {
                  console.log(element.date);
                  label.push(element.date), marks.push(element.score);
                  console.log(element.score);
                }
              });
              chart = new Chart(ctx, {
                type: "bar",

                // The data for our dataset
                data: {
                  labels: label,
                  datasets: [
                    {
                      label: "Previous performance",
                      data: marks,
                    },
                  ],
                },
                options: {
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                },
              });
            },
          });
        });
      });
    });

    //------------------------------------------------HOME BUTTON--------------------------------------------------
    $("#home").click(() => {
      $("section").load("user_categories.html");

      // -----------------------------------------loading categories again---------------------------------------------

      $.ajax({
        url: "http://localhost:3000/Category/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: (dt) => {
          for (let i = 0; i < dt.length; i++) {
            var ct = dt[i].cat.toString();
            console.log(ct);
            var url = dt[i]["url"];
            console.log("image is passing" + url);
            var idd = dt[i].id;
            var cid = ct + "_testsets";
            //alert(cid);
            $("section").append(`
                    <div class="col-lg-6 col-sm-12 gy-1">
                                <div class="card">
                                    <img src="${url}" class="card-img-top" alt="===">
                                    <div class="card-body">
                                        <h5 class="card-title">${ct}</h5>
                                        <p class="card-text">Test Your Knowledge On ${ct}</p>
                                        <button  id=${cid} value=${idd} class="btn btn-dark crdbtn">Take Test</button>
                                    </div>
                                </div>
                            </div>`);
          }
        },
      });

      // -------------------------------------------------card button operation-------------------------------------------

      $(document).on("click", ".crdbtn", function () {
        alert(this.id);

        selectedcat = this.value;
        window.open(`quiz_home.html?cat=${selectedcat}`);
      });
    });
  });

  // -------------------------------------------------------initial loading of categories-------------------------------------------

  $("section").load("user_categories.html", function () {
    $.ajax({
      url: "http://localhost:3000/Category/",
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: (dt) => {
        for (let i = 0; i < dt.length; i++) {
          var ct = dt[i].cat.toString();
          console.log(ct);
          var cid = ct + "_testsets";

          var url = dt[i]["url"];
          var idd = dt[i].id;
          console.log("image is passing" + url);

          // -----------------------------------------------dynamic creation of cards -------------------------------------
          $("section").append(`
                <div class="col-lg-6 col-sm-12 gy-1">
                            <div class="card">
                                <img src="${url}" class="card-img-top" alt="===">
                                <div class="card-body">
                                    <h5 class="card-title">${ct}</h5>
                                    <p class="card-text">Test Your Knowledge On ${ct}</p>
                                    <button  id=${cid} value=${idd} class="btn btn-dark crdbtn" href="quiz_home.html">Take Test</button>
                                </div>
                            </div>
                        </div>`);
        }
      },
    });
    // -----------------------------------------------card button loading user testset table-----------------------------------
    $(document).on("click", ".crdbtn", function () {
      alert(this.value);
      selectedcat = this.value;
      window.open(`quiz_home.html?cat=${selectedcat}`);
    });
  });
});
