$(document).ready(function () {
  $("form").submit(function (e) {
    username = $("#username").val();
    password = $("#password").val();
    console.log(username + password);
    $.ajax({
      url: "http://localhost:3000/admin/" + username,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        if (data["password"] == password) {
          alert("login success");
        } else {
          alert("invalid credentials");
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
});
