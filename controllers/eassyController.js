// 引入文章数据处理模块
var eassyModule = require("../modules/eassyModule");
module.exports = {
  showAlleassy(req, res) {
    var url = req.url;
    var arr = url.split("/");
    var id = arr[arr.length - 1];
    // 用户退出登录以后，session中相应的值变为null，需要重定向登录页面，防治越权访问
    if (req.session["data" + id] == null) {
      res.redirect("/admin/login");
      return;
    }
    var { avatar, nickname, user_id } = req.session["data" + id];
    res.render("admin/posts", {
      id: user_id,
      avatar: avatar,
      nickname: nickname
    });
  }
};
