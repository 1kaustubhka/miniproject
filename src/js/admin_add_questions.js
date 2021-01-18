$(document).ready(() => {
  //Start of Function to display questions
  var cat = window.location.search.split("?")[1].split("=")[1];
  let i = 1;
  $.ajax({
    url: "http://localhost:3000/questions",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (q) => {
      q.forEach((data) => {
        if (data.cat == cat) {
          var id = data.id;
          var ques = data.question;
          var op1 = data.option_1;
          var op2 = data.option_2;
          var op3 = data.option_3;
          var op4 = data.option_4;
          var ca = data.correct_option;
          var mar = data.marks;
          var url = data.url;
          if (url == undefined) url = "";
          var eid = "edit" + id;
          var did = "del" + id;
          $("table").append(
            `<tr><td>` +
              i +
              `</td><td>` +
              ques +
              `</td><td>` +
              op1 +
              `</td><td>` +
              op2 +
              `</td><td>` +
              op3 +
              `</td><td>` +
              op4 +
              `</td><td>` +
              ca +
              `</td><td>` +
              mar +
              `</td>` +
              `<td><button class="edit" id="${eid}" 
            )>Edit</button></td><td><button class=del id="${did}">Delete</button></td></tr>`
          );
          i++;
        }
      });
    },
  });

  //Start of Function to add the questions
  $("#addQuestion").click(function (e) {
    $.ajax({
      url: "http://localhost:3000/questions",
      type: "POST",
      data: {
        question: $("#question").val(),
        cat: cat,
        option_1: $("#option1").val(),
        option_2: $("#option2").val(),
        option_3: $("#option3").val(),
        option_4: $("#option4").val(),
        url: $("#url").val(),
        correct_option: $("#correct").val(),
        marks: $("#marks").val(),
      },
      success: function () {},
      error: (e) => {},
    });
    e.preventDefault();
  });

  //End of Function to add the questions
});

//Start of Function to update the questions
$(document).on("click", ".edit", function () {
  id = parseInt(this.id.substr(4));
  $("#updateModal").modal("show");
  $.ajax({
    url: "http://localhost:3000/questions/" + id,
    type: "GET",
    success: function (data) {
      $("#editQuestion").val(data.question);
      $("#editOption1").val(data.option_1);
      $("#editOption2").val(data.option_2);
      $("#editOption3").val(data.option_3);
      $("#editOption4").val(data.option_4); 
      $("#editAnswer").val(data.correct_option);
      $("#editMarks").val(data.marks);
      $("#editurl").val(data.url);
    },
  });
});

$(document).on("click", "#updateQuestion", function () {
  event.preventDefault();
  $.ajax({
    url: "http://localhost:3000/questions/" + id,
    type: "PATCH",
    data: {
      question: $("#editQuestion").val(),
      option_1: $("#editOption1").val(),
      option_2: $("#editOption2").val(),
      option_3: $("#editOption3").val(),
      option_4: $("#editOption4").val(),
      url: $("#editurl").val(),
      correct_option: $("#editAnswer").val(),
      marks: $("#editMarks").val(),
    },
    success: function (data) {},
  });
});

//End of Function to update the questions

//Start of Function to delete the questions
$(document).on("click", ".del", function () {
  if (confirm("Do you really want to delete")) {
    id = parseInt(this.id.substr(3));
    $.ajax({
      url: "http://localhost:3000/questions/" + id,
      type: "DELETE",
      success: function () {},
    });
  }
});
//End of Function to delete the questions
