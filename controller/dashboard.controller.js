const Hanghoa = require("../models/hanghoa.model")
const Nhacungcap = require("../models/nhacungcap.model")
const Khachhang = require("../models/khachhang.model")
const Hoadon = require("../models/hoadon.model")


module.exports.dashboard = async (req, res) => {
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang chủ"
    })
}


module.exports.dashboardManager = async (req, res) => {
    const statistic = {
        hanghoa: 0,
        nhacungcap: 0,
        khachhang: 0,
        hoadon: 0
    }

    statistic.hanghoa = await Hanghoa.countDocuments({
        deleted: false
    });
    statistic.nhacungcap = await Nhacungcap.countDocuments({
        deleted: false
    });
    statistic.khachhang = await Khachhang.countDocuments({
        deleted: false
    });
    statistic.hoadon = await Hoadon.countDocuments({
        deleted: false
    });

    res.render("admin/pages/dashboard/manager", {
        pageTitle: "Quản lý",
        statistic: statistic
    })
}


module.exports.baocaocuoingay = async (req, res) => {

    const start = new Date();
    start.setHours(0, 0, 0, 0); // 00:00:00.000

    const end = new Date();
    end.setHours(23, 59, 59, 999); // 23:59:59.999

    const slhoadon = await Hoadon.countDocuments({
        deleted: false,
        createdAt: { $gte: start, $lte: end },
    });
    const doanhthut = await Hoadon.find({
        deleted: false,
        createdAt: { $gte: start, $lte: end },
        no: { $ne: "no" } // lấy tất cả không nợ
    })
    const doanhthun = await Hoadon.find({
        deleted: false,
        createdAt: { $gte: start, $lte: end },
        no: "no"
    })
    console.log(slhoadon);
    let doanhthudatra = 0;
    let doanhthuno = 0;
    for (const item of doanhthut) {
        doanhthudatra +=item.tongtienhang;
    }
    for (const item of doanhthun) {
        doanhthuno +=item.tongtienhang;
    }

    doanhthudatra = doanhthudatra.toLocaleString();
    doanhthuno = doanhthuno.toLocaleString();
    res.render("admin/pages/dashboard/baocaocuoingay", {
        pageTitle: "Báo cáo cuối ngày",
        soluonghoadon: slhoadon,
        doanhthudatra: doanhthudatra,
        doanhthuno: doanhthuno
    })
}