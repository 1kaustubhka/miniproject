$(document).ready(function () {
  var arr = new Array();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/user",
    dataType: "json",

    success: function (response) {
      arr =response;
    },
    contentType: "application/json",
    
  });

  $("#email").on("keyup", function () {
    var email = $("#email").val();
    var flag = 0;
    for (var i = 0; i < arr.length; i++) {
      if (email == arr[i].email) {
        $("#inval").html("Already registered user");
        $("#inval").css("color", "red");
        $("#but").attr("disabled", "true");
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      $("#but").removeAttr("disabled");
      $("#inval").html("Email Is Available");
      $("#inval").css("color", "green");
    }
    if (email == "") {
      $("#but").attr("disabled", "true");
      $("#inval").html("Please Enter Email");
      $("#inval").css("color", "red");
    }
  });

  //password checking
  $('#pass,#cpass').on('keyup', function () {
    if ($('#pass').val() === $('#cpass').val()) {
        $('#out').html("Matching");
        $('#out').css('color', 'green');
        $('#but').removeAttr("disabled");
    }
    else {
        $('#out').html("Not Matching");
        $('#out').css('color', 'red');
        $('#but').attr("disabled", "true");
    }
});

  $("#login").submit(function (e) {
    username = $("#email1").val();
    password = $("#pass1").val();
    $.ajax({
      url: "http://localhost:3000/user/?email=" + username,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        if (data[0] != undefined) {
          if (data[0]["password"] == password) {
            sessionStorage.setItem("userId", data[0].id);
            sessionStorage.setItem("Name", data[0].name);
            location.replace("user_dashboard.html", "_self");
          } else {
            alert("invalid credentials");
          }
        } else {
          alert("user not found");
        }
      },
      error: function (e) {
        if (e.statusText === "Not Found") {
          alert("User not found");
        }
      },
    });
    e.preventDefault();
  });

  $("#register").submit((a) => {
    a.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#pass").val();

    let phone = $("#phone").val();

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/user",
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone,
        category: "{}",
      },
      success: function () {
        window.location.replace("../../index.html");
      },

      error: function (errorMessage) {
      },
    });
  });

  //  admin login
});

function logout() {
  if (sessionStorage.getItem("email") !== null) {
    sessionStorage.removeItem("email");
    location.href = "/index.html";
  }
}
