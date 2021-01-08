/*var id = [];
var questions = [];
var option1 = [];
var option2 = [];
var option3 = [];
var option4 = [];
var answer = [];
var i = 0;
$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3000/questions",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      data.forEach((element) => {
        id.push(element.id);
        console.log(id);
        questions.push(element.question);
        option1[i] = element.answers.a;
        option2[i] = element.answers.b;
        option3[i] = element.answers.c;
        option4[i] = element.answers.d;
        answer[i++] = element.answer;

        var rowdata = [
          "#",
          "Questions",
          "1",
          "2",
          "3",
          "4",
          "Answer",
          "Edit",
          "Delete",
        ];
        function tableCreate() {
          x = 0
          var body = document.body,
            tbl = document.createElement("table");
          tbl.style.position = "absolute";
          tbl.style.top = "250px";
          tbl.style.left = "100px";
          tbl.style.cssFloat = "left";

          tbl.style.border = "1px solid black";
          tbl.style.borderCollapse = "collapse";

          for (var i = 0; i < 5; i++) {
            var tr = tbl.insertRow();
            for (var j = 0; j < 10; j++) {
              var td = tr.insertCell();
              if (i == 0) {
                td.appendChild(document.createTextNode(rowdata[j]));
                td.style.border = "1px solid black";
              } else {
                if (j == 0) td.appendChild(document.createTextNode(id[x]));
                if (j == 1)
                  td.appendChild(document.createTextNode(questions[x]));
                if (j == 2) {
                  td.appendChild(document.createTextNode(option1[x]));
                }
                td.style.border = "1px solid black";
                td.style.width="100px";
                x++
              }
            }
          }
          body.appendChild(tbl);
        }
        tableCreate();
      });
    },
  });
});
*/
// dfkjnhdfjklfgn,dfjkl

$(document).ready(()=>{
    $.ajax({
    url: "http://localhost:3000/questions",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (q)=>{
      
      q.forEach(data=>{
        var id = data.id;
        var ques = data.question;
        var op1 = data.answers.a;
        var op2 = data.answers.b;
        var op3 = data.answers.c;
        var op4 = data.answers.d;
        var ca = data.answer;

        $("table").append('<tr><td>'+id+'</td><td>'+ques+'</td><td>'+op1+'</td><td>'+op2+'</td><td>'+op3+'</td><td>'+op4+'</td><td>'+ca+'</td></tr>');
      }) 
    }
    })
})