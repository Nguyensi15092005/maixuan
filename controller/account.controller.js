const md5 = require("md5");
const Account = require("../models/account.model");
const systemConfig = require('../config/system');

module.exports.create = async (req, res) => {
  res.render("admin/pages/dashboard/account", {
    pageTitle: "Thêm mới quản trị"
  })
}

module.exports.createPost = async (req, res) => {
  try {
    req.body.password = md5(req.body.password)
    console.log(req.body);
    const data = new Account(req.body);
    await data.save();
    req.flash("success", "Tạo mới tài khoản thành công")
    res.redirect(`${systemConfig.prefixAdmin}/login`);
  } catch (error) {
    req.flash("error", "Lỗi")
    res.redirect(`${systemConfig.prefixAdmin}/account/create`);
  }
}