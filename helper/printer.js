const escpos = require('escpos');
escpos.USB = require('escpos-usb');

function formatCurrency(v) {
  return v.toLocaleString('vi-VN');
}

async function printReceipt(data) {
  return new Promise((resolve, reject) => {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);

    device.open(err => {
      if (err) return reject("Không kết nối được máy in");

      printer
        .align('CT')       // Canh giữa
        .style('B')        // In đậm
        .text('HÓA ĐƠN BÁN HÀNG')
        .style('NORMAL')   // Trở lại in thường
        .align('LT')       // Canh trái cho nội dung tiếp theo
        .text(`Ngày: ${data.date}`)
        .text(`Nhân viên: ${data.staff}`)
        .text(`Khách hàng: ${data.customer}`)
        .drawLine()
        .tableCustom([
          { text: 'Tên hàng', align: 'LEFT', width: 0.5 },
          { text: 'SL', align: 'CENTER', width: 0.2 },
          { text: 'Tiền', align: 'RIGHT', width: 0.3 }
        ]);

      data.items.forEach(item => {
        printer.tableCustom([
          { text: item.name, align: 'LEFT', width: 0.5 },
          { text: item.quantity.toString(), align: 'CENTER', width: 0.2 },
          { text: formatCurrency(item.total), align: 'RIGHT', width: 0.3 }
        ]);
        printer.text(`  Đơn giá: ${formatCurrency(item.price)} đ`);
      });

      printer
        .drawLine()
        .text(`Tổng tiền: ${formatCurrency(data.total)}`)
        .text(`Nợ cũ: ${formatCurrency(data.oldDebt)}`)
        .text(`Tổng thu: ${formatCurrency(data.grandTotal)}`)
        .text(`(${data.totalInWords})`)
        .align('CT')
        .qrimage(
          data.qrData ||
            `https://img.vietqr.io/image/MB-879888999.png?amount=${data.total}&addInfo=ThanhToan&accountName=MAI%20XUAN`,
          function () {
            printer
              .text('Cảm ơn quý khách!')
              .cut()
              .close(resolve);
          }
        );
    });
  });
}

module.exports = { printReceipt };
