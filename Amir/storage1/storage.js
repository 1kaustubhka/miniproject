$(document).ready(() => {
  let i = 0;
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

        $("table").append(
          "<tr><td>" +
            id +
            "</td><td>" +
            ques +
            "</td><td>" +
            op1 +
            "</td><td>" +
            op2 +
            "</td><td>" +
            op3 +
            "</td><td>" +
            op4 +
            "</td><td>" +
            ca +
            "</td>" +
            "<td><button id=" +
            ("edit" + i) +
            " onclick=btnclick("+
            `${'m'}`+
            ")>Edit</button></td><td><button class=del>Delete</button></td></tr>"
        );
        i++;
      });
    },
  });
});

function btnclick(i) {
    console.log(i);
}
