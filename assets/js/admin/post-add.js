// 根据href判断是编辑页面还是增加页面
var href = location.href;
if (href.indexOf("posts_id") != -1) {
  var arr = location.search.split("=");
  //   给编辑页面选项赋值
  $.ajax({
    url: "/get_data_by_id",
    type: "post",
    data: {
      id: arr[1]
    },
    dataType: "json",
    success: data => {
      console.log(data.result);
      if (data.code == 0) {
        $("#title").val(data.result.title);
        $("#content").val(data.result.content);
        $("#alias").val(data.result.alias);
        if (data.result.feature != null) {
          $("img.help-block")
            .css({
              display: "block"
            })
            .attr({
              src: data.result.feature
            });
          $("input.featureimg").val(data.result.feature);
        } else {
          $("img.help-block").css({
            display: "none"
          });
        }

        $("#category option").each(function(index, item) {
          if (item.classList.contains(data.result.cateName)) {
            item.setAttribute("selected", true);
          }
        });
        $("#created_time").val(data.result.created_time);
        $("#status option").each(function(index, item) {
          if (item.classList.contains(data.result.status)) {
            item.setAttribute("selected", true);
          }
        });
      }
    }
  });
}

//获取所有分类进行前端渲染
$.ajax({
  url: "/get_all_categories",
  type: "post",
  dataType: "json",
  success: data => {
    if (data.code == 0) {
      var html = template("all_categories", data);
      $("#category").html(html);
    }
  }
});
// 上传用户选择特色图片
$("input#feature").on("change", function(event) {
  var formData = new FormData();
  var input = document.querySelector("#feature");
  formData.append("feature", input.files[0]);
  $.ajax({
    url: "/uploadFeature",
    type: "post",
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    success: data => {
      if (data.code == 0) {
        $("img.help-block")
          .css({
            display: "block"
          })
          .attr({
            src: data.feature
          });
        $("input.featureimg").val(data.feature);
      }
    }
  });
});

// 根据href判断是修改还是增加文章
$(".btn.btn-primary.btnOpt").on("click", function(event) {
  if (href.indexOf("posts_id") == -1) {
    $.ajax({
      url: "/addEassy",
      type: "post",
      data: $("form.row").serialize(),
      dataType: "json",
      success: data => {
        if (data.code == 0) {
          location.href = "/admin/posts/" + $("#user_id").val();
        }
      }
    });
  } else {
    var arr1 = href.split("?");
    var arr2 = arr1[arr1.length - 1].split("=");
    var form = $("form.row").serialize() + "&" + arr2[0] + "=" + arr2[1];
    console.log(form);
    $.ajax({
      url: "/modifyEassy",
      type: "post",
      data: form,
      dataType: "json",
      success: data => {
        if (data.code == 0) {
          location.href = "/admin/posts/" + $("#user_id").val();
        }
      }
    });
  }
});
