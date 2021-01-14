$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/Category/",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: (cat) => {

            for (let i = 0; i < cat.length; i++) {
                var ct = cat[i]['id'].toString();
                console.log(ct);
                var cid = ct + "_testsets";
                //alert(cid);
                $('.section').append(`
            <div class="col-lg-6 col-sm-12 gy-1">
                        <div class="card">
                            <img src="../images/c++.png" class="card-img-top" alt="===">
                            <div class="card-body">
                                <h5 class="card-title">${ct}</h5>
                                <p class="card-text">Test Your Knowledge On ${ct}</p>
                                <button  id=${cid} class="btn btn-primary crdbtn">View</button>
                            </div>
                        </div>
                    </div>`);

            }

        
        },

    });
    $(document).on("click", (".crdbtn"), (function(){
        alert(this.id);
    })
    );

   


})

