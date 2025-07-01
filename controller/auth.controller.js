const Account = require("../models/account.model");
const systemConfig = require("../config/system");
const md5 = require("md5");
module.exports.login = async (req, res) =>{
    res.render("admin/pages/auth/login",{
        pageTitle:"Đăng nhập"
    })
}


module.exports.loginPost = async (req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password
        const account = await Account.findOne({
            email: email
        });
        if(!account){
            req.flash("error", "Email không tồn tại")
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
            return;
        }
        if(account.password !== md5(password)){
            req.flash("error", "Sai mật khẩu")
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
            return;
        }
        res.cookie("token", account.token);
        req.flash("success", "Chúc mừng bạn đã đăng nhập thành công");
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);


    } catch (error) {
        req.flash("error", "lỗi đăng nhập")
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
}

module.exports.logout = (req, res) => {
    // xóa token trong cookie
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}