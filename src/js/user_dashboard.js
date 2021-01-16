$(document).ready(() => {

    var selectedcat;
    var th = 0;
    localStorage.setItem("theme", th);
    //------------------------------- loading header and footer -------------------------------------
    $("header").load('header.html');
    $("footer").load('footer.html');

    $("nav").load('user_navbar.html', () => {//navbar jquery comes here
        //PROFILE BUTTON  
        $("#profile").click(() => {
            $("section").load('profile.html', () => {//profile jquery
                $("#profile_button").click(() => {
                    alert("Profile Jquery");
                })
                $('#profile_button2').on("click", () => {
                    alert("button 2 clicked");
                })
            });
        })

        //HOME BUTTON
        $("#home").click(() => {
            $("section").load('categories.html');
            // ---------------------------------loading categories again-------------------------------------- 
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
                        $('section').append(`
                    <div class="col-lg-6 col-sm-12 gy-1">
                                <div class="card">
                                    <img src="../images/c++.png" class="card-img-top" alt="===">
                                    <div class="card-body">
                                        <h5 class="card-title">${ct}</h5>
                                        <p class="card-text">Test Your Knowledge On ${ct}</p>
                                        <button  id=${cid} value=${ct} class="btn btn-light crdbtn">Take Test</button>
                                    </div>
                                </div>
                            </div>`);

                    }


                },

            });

            // -------------------------------------------------card button operation------------------------------------- 
            $(document).on("click", (".crdbtn"), (function () {
                alert(this.id);
                selectedcat = this.value;
                alert(selectedcat);
                $("section").load('user_testset_table.html');
            })
            );
        })
    });
// -------------------------------------------------------initial loading of categories------------------------------------------- 
    $("section").load('categories.html', function () {

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

            // -----------------------------------------------dynamic creation of cards -------------------------------------
                    $('section').append(`
                <div class="col-lg-6 col-sm-12 gy-1">
                            <div class="card">
                                <img src="../images/Frame 1${ct}.png" class="card-img-top" alt="===">
                                <div class="card-body">
                                    <h5 class="card-title">${ct}</h5>
                                    <p class="card-text">Test Your Knowledge On ${ct}</p>
                                    <button  id=${cid} value=${ct} class="btn btn-dark crdbtn">Take Test</button>
                                </div>
                            </div>
                        </div>`);

                }


            },

        });
        // -----------------------------------------------card button loading user testset table-----------------------------------
        $(document).on("click", (".crdbtn"), (function () {
            alert(this.id);
            selectedcat = this.value;
            alert(selectedcat);
            $("section").load('user_testset_table.html', () => {
                var ct = selectedcat;
                // ----------------------------dynamic creation of tesset table-----------------------------------------
                $.ajax({
                    url: "http://localhost:3000/Category/" + ct,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    success: (cat) => {

                        console.log(Object.keys(cat).length);
                        //console.log(JSON.stringify(cat['questionset2']))
                        // cat.forEach(element => {
                        //    console.log(element) 
                        // });
                        let i = 1;

                        for (i = 1; i < Object.keys(cat).length; i++) {
                            var tid = "testsets" + i;

                            // alert(i);
                            // alert tid);
                            $("tbody").append(
                                `<tr><th scope="row">` +
                                `${i}` +
                                `</th><td>` +
                                `${selectedcat} TestSet ${i}` +
                                `</td><td></td>` +
                                `<td ><button id=${tid} class="testsets btn btn-primary">Take Test</button></td>`
                            );
                        }
                        $(document).on("click", ".testsets", function () {
                            alert(this.id);
                        });
                    },
                    error: (e) => {
                        alert(e);
                    }
                });
            });
        })
        );
    });
})