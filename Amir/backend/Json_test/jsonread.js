$.getJSON("data.json", function (data) {
  var items = [];
  $.each(data, function (key, val) {
    items.push("<li id='" + key + "'>" + val + "</li>");
    console.log(key+" "+ val)
  });

  $("<ul/>", {
    class: "my-new-list",
    html: items.join(""),
  }).appendTo("body");
});
