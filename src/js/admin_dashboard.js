$(document).ready(() => {
  $.ajax({
    url: "http://localhost:3000/Category/",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    success: (cat) => {
      for (let i = 0; i < cat.length; i++) {
        let ct = cat[i]["id"].toString();
        let src = cat[i]["url"];
        let name = cat[i]["cat"];
        // console.log(src);
        // console.log(ct);
        var cid = ct;
        let did = "d" + ct;
        //alert(cid);
        $(".section").append(`
            <div class="col-lg-6 col-sm-12 gy-1">
                        <div class="card">
                            <img src="${src}" class="card-img-top" alt="===">
                            <div class="card-body">
                                
                               <br>
                                <button  id=${name} class="btn btn-primary crdbtn">View</button>
                                <button  id=${did} class="btn btn-danger del">Delete</button>
                            </div>
                        </div>
                    </div>`);
      }
    },
    complete: () => {
      $(".section").append(`<div class="col-lg-6 col-sm-12 gy-1">
        <div class="card">
            <div class="card-body">
                <p class="card-text"></p>
                <i class="fa fa-plus-circle" aria-hidden="true" data-toggle="modal" data-target="#addCat"></i>
                <p> Add new category</p>
                </div>
                </div>
                </div>`);
    },
  });

  $("#addCategory").click(function (e) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/Category/",
      data: {
        cat: $("#categoryName").val(),
        url: $("#categoryUrl").val(),
      },
      dataType: "JSON",
      success: function (response) {},
    });
    e.preventDefault();
  });
});
$(document).on("click", ".crdbtn", function () {
  window.open("admin_add_questions.html?id=" + this.id, "_self");
});
$(document).on("click", ".del", function () {
  let id = this.id.substr(1);
  if (confirm("Do you want to delete")) {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:3000/Category/" + id,
      dataType: "JSON",
      success: function (response) {},
    });
  }
});
