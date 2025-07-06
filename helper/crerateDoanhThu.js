
const cron = require("node-cron");
const Doanhthu = require("../models/doanhthu.model");

const create = async () => {
  const data = {
    total_tra: 0,
    total_no: 0,
    order_count: 0,
  }
  const datadoanhthu = new Doanhthu(data);
  await datadoanhthu.save();
}

function createDoanhthu() {
  cron.schedule("1 0 * * *", () => {
    create();
  });


}

module.exports = createDoanhthu;
