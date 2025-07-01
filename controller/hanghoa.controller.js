const Hanghoa = require("../models/hanghoa.model");
const systemConfig = require("../config/system");
const searchHelper = require("../helper/search");
const paginationHelper = require("../helper/pagination");
const Nhacungcap = require("../models/nhacungcap.model");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // end search 


  // pagination
  const countPage = await Hanghoa.countDocuments();
  let objectPagenation = paginationHelper(
    {
      currentPage: 1,
      limitItems: 6
    },
    req.query,
    countPage
  );
  // end pagination





  const hanghoa = await Hanghoa.find(find)
    .limit(objectPagenation.limitItems)
    .skip(objectPagenation.skip);
  res.render("admin/pages/hanghoa/index", {
    pageTitle: "Quản lý hàng hóa",
    hanghoa: hanghoa,
    keyword: objectSearch.keyword,
    pagenation: objectPagenation
  })
}

module.exports.create = async (req, res) => {
  const nhacungcap = await Nhacungcap.find({
    deleted: false
  });
  res.render("admin/pages/hanghoa/create", {
    pageTitle: "Thêm mới hàng hóa",
    nhacungcap: nhacungcap
  })
}

module.exports.createPost = async (req, res) => {
  try {
    const data = new Hanghoa(req.body);
    await data.save();
    req.flash("success", "Thêm mới hàng hóa thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/hanghoa`);
}

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const hanghoa = await Hanghoa.findOne({
      _id: id,
      deleted: false
    });
    const nhacungcap = await Nhacungcap.find({
      deleted: false
    });
    res.render("admin/pages/hanghoa/edit", {
      pageTitle: "Chỉnh sửa hàng hóa",
      hanghoa: hanghoa,
      nhacungcap : nhacungcap
    })
  } catch (error) {
    console.log(error)
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/hanghoa`);
  }
}

module.exports.editPatch = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    await Hanghoa.updateOne({ _id: id }, req.body);
    req.flash("success", "Chỉnh sửa hàng hóa thành công");
    res.redirect(`${systemConfig.prefixAdmin}/hanghoa/edit/${id}`);

  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${systemConfig.prefixAdmin}/hanghoa`);
  }
}

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Hanghoa.updateOne({ _id: id }, { deleted: true });
    req.flash("success", "Xóa hàng hóa thành công");
  } catch (error) {
    req.flash("error", "Lỗi");
  }
  res.redirect(`${systemConfig.prefixAdmin}/hanghoa`);
}

module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
      case "delete-all":
        await Hanghoa.updateMany({ _id: { $in: ids } }, { deleted: true });
        req.flash("success", `Bạn đã xóa thành công ${ids.length} hàng hóa`);
        break;

      default:
        break;
    }

  } catch (error) {
    req.flash("error", "Lỗi");
    console.log(error)
  }
  res.redirect(`${systemConfig.prefixAdmin}/hanghoa`);
}


