$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3000/Category/C++",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (cat) => {
        console.log(JSON.stringify(cat['questionset1']))
        // cat.forEach(element => {
        //    console.log(element) 
        // });
    },
  });
});
