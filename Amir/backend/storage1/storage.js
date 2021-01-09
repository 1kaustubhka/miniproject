$(document).ready(() => {
  //Code to add the question into json file.
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
      answer: $("#correct").val(),
      marks: $("#marks").val(),
    };
    console.log("Adding");
    $.ajax({
      url: "http://localhost:3000/questions/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        alert("written");
        alert(data);
      },
      data: JSON.stringify(que),
    });
    e.preventDefault();
  });

  //Code to fetch and print the data on the table
  let i = 1;
  $.ajax({
    url: "http://localhost:3000/questions",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (q) => {
      q.forEach((data) => {
        var id = data.id;
        var ques = data.question;
        var op1 = data.answers.a;
        var op2 = data.answers.b;
        var op3 = data.answers.c;
        var op4 = data.answers.d;
        var ca = data.answer;
        var eid = "edit" + i;
        var did = "del" + i;
        if (op3 == undefined) {
          op3 = "";
        }
        if (op4 == undefined) {
          op4 = "";
        }

        // alert(eid);
        $("table").append(
          `<tr><td>` +
            id +
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
            `</td>` +
            `<td ><button id=${eid} class="edit">Edit</button></td><td><button id=${did} class="del">Delete</button></td></tr>`
        );
        i++;
      });
    },
  });
  $(document).on("click", ".del", function () {
    alert(this.id);
  });

  $(document).on("click", ".edit", function () {
    let eid = this.id.substr(4,)
    console.log(this.id.substr(4,))
    $.ajax({
      url: "http://localhost:3000/questions",
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: (q) => {
        q.forEach((data) => {
          if(eid == data.id){
            $("#editQuestion").val(data.question)
            $("#editOption1").val(data.answers.a)
            $("#editOption2").val(data.answers.b)
            $("#editAnswer").val(data.answers.c)
            $("#editOption3").val(data.answers.d)
            $("#editOption4").val(data.answer)
            $("#editMarks").val(data.marks)
        
            jQuery.noConflict();
            $('#myModal').modal('show');
          }
        }
      )}
    });
  })


});



