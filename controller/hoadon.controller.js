const Hoadon = require("../models/hoadon.model");
// const searchHelper = require("../helper/search");
const paginationHelper = require("../helper/pagination");
const system = require("../config/system");
const Khachhang = require("../models/khachhang.model");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  // search
  // const objectSearch = searchHelper(req.query);
  // if (objectSearch.regex) {
  //   find.createdAt = objectSearch.regex;
  // }
  // end search 


  // pagination
  const countPage = await Hoadon.countDocuments();
  let objectPagenation = paginationHelper(
    {
      currentPage: 1,
      limitItems: 15
    },
    req.query,
    countPage
  );
  // end pagination

  const hoadon = await Hoadon.find(find)
    .limit(objectPagenation.limitItems)
    .skip(objectPagenation.skip);

  for (const item of hoadon) {
    const khachhang = await Khachhang.findOne({
      _id: item.id_kh,
    }).select("name");
    item.nameKH = khachhang.name;
    // item.tongtienhang = item.tongtienhang.toLocaleString();
  }
  res.render("admin/pages/hoadon/index", {
    pageTitle: "Quản lý hóa đơn",
    hoadon: hoadon,
    // keyword: objectSearch.keyword,
    pagenation: objectPagenation
  })
}

module.exports.create = async (req, res) => {
  try {
    req.body.tongtienhang = parseInt(req.body.tongtienhang.replace(/\./g, ''), 10);
    req.body.hanghoa = JSON.parse(req.body.hanghoa)
    const id_kh = req.body.id_kh;
    if(id_kh==""){
      req.flash("error", "bạn chưa chọn khách hàng vui lòng tạo lại hóa đơn");
      res.redirect(`${system.prefixAdmin}/dashboard`);
      return;
    }
    const no = req.body.no;
    if (no === "no") {
      const khachhang = await Khachhang.findOne({
        _id: id_kh
      });
      const inDebt = khachhang.inDebt + req.body.tongtienhang;
      await Khachhang.updateOne({ _id: id_kh }, { inDebt: inDebt });
    }
    const data = new Hoadon(req.body);
    console.log(req.body)
    await data.save();
    req.flash("success", "Thanh toán thành công");

  } catch (error) {
    console.log(error)
    req.flash("error", "Lỗi thanh toán");
  }
  res.redirect(`${system.prefixAdmin}/dashboard`);
}


module.exports.delete=async(req, res)=>{
  try {
    const id = req.params.id;
    await Hoadon.updateOne({_id:id},{deleted: true});
    req.flash("success", "Xóa hóa đơn thành công");
  } catch (error) {
    req.flash("error", "Lỗi");   
  }
  res.redirect(`${system.prefixAdmin}/hoadon`);
}




