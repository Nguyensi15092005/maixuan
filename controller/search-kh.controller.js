
const convertToSlug = require("../helper/convertToSlug");
const system = require("../config/system");
const Khachhang = require("../models/khachhang.model");

module.exports.index = async (req, res) => {
  try {
    const key = `${req.query.key}`;


    let newKhachhang = [];

    if (key) {
      const keywordRegex = new RegExp(key, "i");

      // tạo slug ko dấu, có dấu - ngăn cách 
      // TV unidecode
      const stringSlug = convertToSlug.convertToSlug(key);

      const strignSlugRegex = new RegExp(stringSlug, "i");

      const khachhang = await Khachhang.find({
        $or: [
          { name: keywordRegex },
          { slug: strignSlugRegex }
        ]
      })

      for (const item of khachhang) {
        newKhachhang.push({
          id: item.id,
          name: item.name,
          phone: item.phone,
          inDebt: item.inDebt,
          slug: item.slug,
        });
      }
    }


    res.json({
      code: 200,
      message: "Thành công",
      khachhang: newKhachhang
    })

  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${system.prefixAdmin}/admin/dashboard`)
  }
}