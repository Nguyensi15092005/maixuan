const Khachhang = require("../models/khachhang.model");
const systemConfig = require("../config/system");
const searchHelper = require("../helper/search");
const paginationHelper = require("../helper/pagination");
const Hoadon = require("../models/hoadon.model");

module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false
    };

    // search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
      find.name = objectSearch.regex;
    }
    // end search

    // pagenation
    const countPage = await Khachhang.countDocuments();
    const objectPagenation = paginationHelper(
      {
        currentPage: 1,
        limitItems: 6,
      },
      req.query,
      countPage
    )
    // end pagenation

    const khachhang = await Khachhang.find(find)
      .limit(objectPagenation.limitItems)
      .skip(objectPagenation.skip);

    let sumno=0;
    let sumban = 0;

    for (const item of khachhang) {
      let tongban = 0;
      const hoadon = await Hoadon.find({
        id_kh: item.id
      })
      for (const hd of hoadon) {
        tongban+=hd.tongtienhang
      }
      sumno +=item.inDebt;
      sumban +=tongban;
      item.inDebt = item.inDebt.toLocaleString("vi-VN");
      item.tongban=tongban.toLocaleString();
    }
    sumno = sumno.toLocaleString("vi-VN");
    sumban = sumban.toLocaleString("vi-VN");
    res.render("admin/pages/khachhang/index", {
      pageTitle: "Quản lý khách hàng",
      khachhang: khachhang,
      keyword: objectSearch.keyword,
      pagenation: objectPagenation,
      sumno: sumno,
      sumban: sumban
    })
  } catch (error) {
    console.log(error)
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/dashboard/manager`);
  }
}


module.exports.create = async (req, res) => {
  res.render("admin/pages/khachhang/create", {
    pageTitle: "Thêm mới khách hàng"
  })
}

module.exports.createPost = async (req, res) => {
  try {
    const data = new Khachhang(req.body);
    await data.save();
    req.flash("success", "Thêm mới khách hàng thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/khachhang`);
}

module.exports.edit = async (req, res) => {
  try {
    const khachhang = await Khachhang.findOne({
      _id: req.params.id
    });
    res.render("admin/pages/khachhang/edit", {
      pageTitle: "Chỉnh sửa khách hàng",
      khachhang: khachhang
    })
  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/khachhang`);

  }
}


module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Khachhang.updateOne({ _id: id }, req.body);
    req.flash("success", "Chỉnh sửa khách hàng thành công");
    res.redirect(`${systemConfig.prefixAdmin}/khachhang/edit/${id}`);
  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/khachhang`);
  }
}

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Khachhang.updateOne({ _id: id }, { deleted: true });
    req.flash("success", "Xóa khách hàng thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/khachhang`);

}

module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
      case "delete-all":
        await Khachhang.updateMany({ _id: { $in: ids } }, { deleted: true });
        req.flash("success", `Bạn đã xóa thành công ${ids.length} khách hàng`);
        break;

      default:
        break;
    }

  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/khachhang`);
}