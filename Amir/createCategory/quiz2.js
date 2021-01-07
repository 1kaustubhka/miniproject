$(document).ready(function () {
  // $.ajax({
  //   method: "POST",
  //   url: "db.json",
  //   success: function (x) {},
  //   data: {},
  //   complete: function (data) {},
  //   error: (e) => {
  //     alert("Error" + e);
  //   },
  // });

  $("#addQuestion").click(function (e) {
    var person = {
      id: 12,
      question: $("#question").val(),
      answers: {
        a: $("#option1").val(),
        b: $("#option2").val(),
        c: $("#option3").val(),
        d: $("#option4").val(),
      },
      correctAnswer: $("#correct").val(),
    };
    console.log("adding")
    $.ajax({
      url: "http://localhost:3000/questions/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        alert("written");
        alert(data)
      },
      data: JSON.stringify(person),
    });
    e.preventDefault();
  });
  $("#patch").click(function (e) {
    $.ajax({
      url: "http://localhost:3000/questions/3",
      type: "PATCH",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        alert("written");
      },
      data: JSON.stringify(person),
    });
  });
});
