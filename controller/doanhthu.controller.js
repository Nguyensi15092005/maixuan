const Doanhthu = require("../models/doanhthu.model");
const paginationHelper = require("../helper/pagination");
const Hoadon = require("../models/hoadon.model")

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    // pagination
    const countPage = await Doanhthu.countDocuments();
    let objectPagenation = paginationHelper(
        {
            currentPage: 1,
            limitItems: 15
        },
        req.query,
        countPage
    );
    // end pagination
    const doanhthu = await Doanhthu.find(find)
        .limit(objectPagenation.limitItems)
        .skip(objectPagenation.skip);

    for (const item of doanhthu) {
        const from = new Date(item.createdAt);
        from.setHours(0, 0, 0, 0);

        const to = new Date(from);
        to.setDate(to.getDate() + 1);

        const orders = await Hoadon.find({
            createdAt: { $gte: from, $lt: to }
        });
        for (const i of orders) {
            item.order_count = item.order_count + 1;
            if(i.no =="no"){
                item.total_no=item.total_no + i.tongtienhang
            }
            else{
                item.total_tra = item.total_tra + i.tongtienhang
            }
        }
        item.total_no = item.total_no.toLocaleString("vi-VN")
        item.total_tra = item.total_tra.toLocaleString("vi-VN")
    }


    res.render("admin/pages/doanhthu/index", {
        pageTitle: "Quản lý doanh thu",
        doanhthu: doanhthu,
        pagenation: objectPagenation
    })
}