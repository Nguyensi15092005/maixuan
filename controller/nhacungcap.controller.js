const Nhacungcap = require("../models/nhacungcap.model");
const systemConfig = require("../config/system");
const Hanghoa = require("../models/hanghoa.model");
const searchHelper = require("../helper/search");
const paginationHelper = require("../helper/pagination");

module.exports.index = async (req, res) => {

  const find = {
    deleted: false
  }

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // end search

  // pagenation
  const countPage = await Nhacungcap.countDocuments();
  const objectPagenation = paginationHelper(
    {
      currentPage: 1,
      limitItems: 6,
    },
    req.query,
    countPage
  )
  // end pagenation


  const nhacungcap = await Nhacungcap.find(find)
    .limit(objectPagenation.limitItems)
    .skip(objectPagenation.skip);


  let newNcc = [];
  let tongno = 0;
  let summua = 0;
  for (const item of nhacungcap) {
    const hanghoa = await Hanghoa.find({
      id_ncc: item.id,
      deleted: false
    });
    let tongmua = 0;
    for (const i of hanghoa) {
      tongmua += i.capitalPrice
    }
    summua +=tongmua;
    tongmua = tongmua.toLocaleString();

    item.total = tongmua;
    newNcc.push(item);
    tongno+=item.christmas;
  }
  tongno=tongno.toLocaleString("vi-VN");
  summua=summua.toLocaleString("vi-VN");
  res.render("admin/pages/nhacungcap/index", {
    pageTitle: "Quản lý nhà cung cấp",
    nhacungcap: newNcc,
    keyword: objectSearch.keyword,
    pagenation: objectPagenation,
    tongno: tongno,
    tongmua:summua
  })
}


module.exports.create = async (req, res) => {
  res.render("admin/pages/nhacungcap/create", {
    pageTitle: "Thêm mới nhà cung cấp"
  })
}

module.exports.createPost = async (req, res) => {
  try {
    const data = new Nhacungcap(req.body);
    await data.save();
    req.flash("success", "Thêm mới nhà cung cấp thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/nhacungcap`);

}


module.exports.edit = async (req, res) => {
  try {
    const nhacc = await Nhacungcap.findOne({
      _id: req.params.id
    });
    res.render("admin/pages/nhacungcap/edit", {
      pageTitle: "Chỉnh sửa nhà cung cấp",
      nhacungcap: nhacc
    })
  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/nhacungcap`);
  }

}

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Nhacungcap.updateOne({_id: id}, req.body);
    req.flash("success", "Chỉnh sửa nhà cung cấp thành công");
    res.redirect(`${systemConfig.prefixAdmin}/nhacungcap/edit/${id}`);
  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/nhacungcap`);
  }
}

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    await Nhacungcap.updateOne({_id: id}, {deleted: true});
    req.flash("success", "Xóa nhà cung cấp thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/nhacungcap`);

}

module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
      case "delete-all":
        await Nhacungcap.updateMany({ _id: { $in: ids } }, { deleted: true });
        req.flash("success", `Bạn đã xóa thành công ${ids.length} nhà cung cấp`);
        break;

      default:
        break;
    }

  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/nhacungcap`);
}