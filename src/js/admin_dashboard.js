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
        var cid = ct;
        let did = "d" + ct;
        var idd = cat[i].id;
        $(".section").append(`
            <div class="col-lg-4 col-sm-12 gy-2 ">
                        <div class="card">
                            <div style="margin:5% 5% 0% 5%; height:250px; width:310px; background:url(${src}) no-repeat; background-size: contain, cover; "></div>
                            <div class="card-body">
                            <h2 align="center"><p id=category-name class="badge badge-name">${name}
                            </p></h2>
                            <center>
                                <button  id=${name} class="badge btn btn-warning crdbtn" value=${idd}>View</button>
                                <button  id=${did} class="badge btn btn-danger del" value=${idd}>Delete</button></center>
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
  window.open("admin_add_questions.html?id=" + this.value, "_self");
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

function logout() {
  if (sessionStorage.getItem("email") !== null) {
    sessionStorage.removeItem("email");
  }
  location.replace("../../", "_self");
}
