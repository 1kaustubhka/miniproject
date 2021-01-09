$(document).ready(() => {
  let i = 1;
  let btt="btn";
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
        var eid="edit"+i;
        var did="del"+i;
        if(op3 ==undefined )
        {
          op3 = ""
        }
        if(op4 ==undefined )
        {
          op4 = ""
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
  $(document).on("click", ".del", function(){
    alert (this.id);
  });
  $(document).on("click", ".edit", function(){
    alert (this.id);
  });
});



function btnclick(t) {
    alert(t.id);
}

