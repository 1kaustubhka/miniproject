$(document).ready(function () {

  //code to get data into table

  $("#addQuestion").click(function (e) {
    var que = {
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
      data: JSON.stringify(que),
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
      data: JSON.stringify(que),
    });
  });
});
