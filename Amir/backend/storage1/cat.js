$(document).ready(function () {
  // var ct = "C";
  // $();
  // $.ajax({
  //   url: "http://localhost:3000/Category/" + ct,
  //   type: "GET",
  //   dataType: "json",
  //   contentType: "application/json",
  //   success: (cat) => {
  //     console.log(JSON.stringify(cat["questionset1"][0]));
  //     // cat.forEach(element => {
  //     //    console.log(element)
  //     // });
  //   },
  // });

  // $("#del").click(function (e) {
  //   var ct = "C";
  //   $.ajax({
  //     url: "http://localhost:3000/Category/" + ct,
  //     type: "PUT",
  //     dataType: "json",
  //     contentType: "application/json",
  //     success: (cat) => {
  //       //  console.log(JSON.stringify(cat["questionset1"][0][1]));
  //       console.log(cat);
  //     },
  //   });
  //   e.preventDefault();
  // });
  $.ajax({
    url: "http://localhost:3000/Category/",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (cat) => {
      console.log(JSON.stringify(cat[0].c[0].set1[0].q1[0].answers))
      // cat.forEach(element => {
      //    console.log(element)
      // });
    },
  });
});
