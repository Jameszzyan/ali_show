(function() {
  // 前端渲染所有分类栏
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

  // 新增种类
  $("input.btn-primary").on("click", function(event) {
    $.ajax({
      url: "/add_category",
      type: "post",
      data: $("form").serialize(),
      dataType: "json",
      success: data => {
        if (data.code == 0) {
          location.reload();
        }
      }
    });
  });

  // 删除种类
  $("tbody").on("click", "a.btndel", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/delete_category",
      type: "post",
      data: {
        id: $(this).data("id")
      },
      dataType: "json",
      success: data => {
        if (data.code == 0) {
          location.reload();
        }
      }
    });
  });
})();
