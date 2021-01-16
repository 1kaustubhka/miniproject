
$(document).ready(()=>{
    var ct = "C";
    $.ajax({
        url: "http://localhost:3000/Category/"+ct,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: (cat) => {
         
         console.log(Object.keys(cat).length);
         let i = 1;
       
         for(i=1;i<Object.keys(cat).length;i++)
         {
            var eid = "edit" + i;
            var did = "del" + i;
                     $("tbody").append(
                       `<tr><th scope="row">` +
                         `${i}` +
                         `</th><td>` +
                        `Quiz ${i}`+
                         `</td>` +
                         `<td ><button id=${eid} class="edit btn btn-primary">Edit</button></td><td><button id=${did} class="del btn btn-danger">Delete</button></td></tr>`
                     );  
         }
            $(document).on("click", ".del", function () {
              alert(this.id);
            });
          
            $(document).on("click", ".edit", function () {
                alert(this.id);
            });
        },
        error:(e)=>{
            alert(e);
        }
   });
})

