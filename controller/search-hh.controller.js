const Hanghoa = require("../models/hanghoa.model");
const convertToSlug = require("../helper/convertToSlug");
const system = require("../config/system");

module.exports.index = async (req, res) => {
  try {
    const keyword = `${req.query.keyword}`;

    let newHangHoa = [];

    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");

      // tạo slug ko dấu, có dấu - ngăn cách 
      // TV unidecode
      const stringSlug = convertToSlug.convertToSlug(keyword);

      const strignSlugRegex = new RegExp(stringSlug, "i");

      const hanghoa = await Hanghoa.find({
        $or: [
          { title: keywordRegex },
          { slug: strignSlugRegex }
        ]
      })
      
      for (const item of hanghoa) {
        newHangHoa.push({
          id: item.id,
          title: item.title,
          capitalPrice: item.capitalPrice,
          inventory: item.inventory,
          slug: item.slug,
        });
      }
    }


    res.json({
      code: 200,
      message: "Thành công",
      hanghoa: newHangHoa
    })

  } catch (error) {
    req.flash("error", "Lỗi");
    res.redirect(`${system.prefixAdmin}/admin/dashboard`)
  }
}