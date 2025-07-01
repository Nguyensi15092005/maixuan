const { printReceipt } = require('../helper/printer');

exports.print = async (req, res) => {
  try {
    console.log(req.body)
    await printReceipt(req.body);
    res.json({ success: true, message: 'In hóa đơn thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi máy in hoặc dữ liệu' });
  }
};
