var express = require("express");
// 引入文章控制器模块
var eassyController = require("../controllers/eassyController");
var router = express.Router();
// 展示所有文章页面
router.get("/admin/posts/:id", eassyController.showAlleassy);

module.exports = router;
