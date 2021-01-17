$(document).ready(() => {

  var arr = new Array();

  $.ajax({
      type: "GET",
      url: "http://localhost:3000/user",

      success: function (data, status, xhr) {

          arr = JSON.parse(data);
          console.log(arr);

      },

      error: function (jqXhr, textStatus, errorMessage) {
          console.log('error' + errorMessage);
      },
      dataType: "text",
      contentType: "application/json",
  });

  $('footer').load('footer.html ', function () {

  })
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



  //registration form submission
  $('#register').submit((a) => {
      a.preventDefault();
      let name = $('#name').val();
      let email = $('#email').val();
      let password = $('#pass').val();

      let phone = $('#phone').val();
      let gender = $('input[name="gender"]:checked').val();

      var user = {
          "name": name, 
          "email": email, 
          "password": password, 
          "phone": phone,
      };

      $.ajax({
          type: "POST",
          url: "http://localhost:3000/user",
          data: JSON.stringify(user),
          success: function (data, status, xhr) {
          },

          error: function (jqXhr, textStatus, errorMessage) {
              console.log('error' + errorMessage);
          },
          dataType: "text",
          contentType: "application/json",
      });
  })

  //login form submission
  $('#login').submit((a) => {
      a.preventDefault();
      let email = $('#email1').val();
      let password = $('#pass1').val();
      if (email == "" && password == "" || email == "" || password == "") {
          alert("name and password is incorrect")
      }
      else {
          $.ajax({
              type: "GET",
              url: "http://localhost:3000/user",
              data: { "email": email, "password": password },
              success: function (data, status, xhr) {
                  console.log(data);
                  if (data !== '[]') {
                      window.location.replace('user_dashboard.html');
                  }
                  else {
                      $('.text-muted').html('Wrong Email Id or Password');
                      $('.text-muted').css('color', 'red');
                      alert('error');
                  }
              },

              error: function (jqXhr, textStatus, errorMessage) {
                  console.log('error' + errorMessage);
              },
              dataType: "text",
              contentType: "application/json",

          });
      }
  })
  
  $('#email').on('keyup', function () {

      var email = $('#email').val();
      console.log(email);
      var flag = 0;
      for (var i = 0; i < arr.length; i++) {
          if (email == arr[i].email) {
              $('#inval').html("Already registered user");
              $('#inval').css('color', 'red');
              $('#but').attr("disabled", "true");
              flag = 1;
              break;
          }

      }
      if (flag == 0) {
          $('#but').removeAttr("disabled");
          $('#inval').html("Ready to go");
          $('#inval').css('color', 'green');

      }
      if (email == "") {
          $('#but').attr("disabled", "true");
          $('#inval').html("enter your email");
          $('#inval').css('color', 'red');
      }
  })

})
