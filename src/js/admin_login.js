$(document).ready(function () {
  $("#admin-form").submit(function (e) {
    username = $("#email2").val();
    password = $("#pass2").val();
    $.ajax({
      url: "http://localhost:3000/admin/?email=" + username,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        if (data[0] != undefined) {
          if (data[0]["password"] == password) {
            location.replace("admin_dashboard.html", "_self");
          } else {
            alert("invalid credentials");
          }
        } else {
          alert(" not found");
        }
      },
    });
    e.preventDefault();
  });
});
