$.ajax({
  url: "/get_all_categories",
  type: "post",
  dataType: "json",
  success: data => {
    if (data.code == 0) {
      var html = template("all_categories", data);
      $("tbody").html(html);
    }
  }
});
