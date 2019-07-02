// 展示用户所有编写的文章
$.ajax({
  url: "/get_eassyList",
  type: "post",
  data: {
    id: $("#user_id").val()
  },
  dataType: "json",
  success: data => {
    if (data.code == 0) {
      var html = template("eassyList", data);
      $("table tbody").html(html);
    }
  }
});

// 根据分类和状态筛选文章
$(".btnFilter").on("click", function(event) {
  //   得到用户选择的分类和状态
  var cate = $("select.cateSelector option:selected").val();
  var status = $("select.statusSelector option:selected").val();
  //   分为四种情况进行判断
  if (cate == "all" && status != "all") {
    //   jQuery中each方法里面的item是原生js里面的dom对象，不能使用jQuery方法
    $("tbody tr").each(function(index, item) {
      if (!item.classList.contains(status)) {
        item.style.display = "none";
      } else {
        //   表单里面的单元格的display值为table-row
        item.style.display = "table-row";
      }
    });
  } else if (cate != "all" && status == "all") {
    $("tbody tr").each(function(index, item) {
      if (!item.classList.contains(cate)) {
        item.style.display = "none";
      } else {
        item.style.display = "table-row";
      }
    });
  } else if (cate != "all" && status != "all") {
    $("tbody tr").each(function(index, item) {
      if (!item.classList.contains(cate) || !item.classList.contains(status)) {
        item.style.display = "none";
      } else {
        item.style.display = "table-row";
      }
    });
  } else {
    $("tbody tr").css({
      display: "table-row"
    });
  }
});

// 删除文章(在数据库中将status设为trashed)
$("tbody").on("click", "a.btn-danger", function(event) {
  event.preventDefault();
  $.ajax({
    url: "/change_status",
    type: "post",
    data: {
      id: $(".post_id").val()
    },
    dataType: "json",
    success: data => {
      if (data.code == 0) {
        location.reload();
      }
    }
  });
});
