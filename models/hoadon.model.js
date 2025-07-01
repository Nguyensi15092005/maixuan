const mongoose = require("mongoose")

const HoadonSchema = new mongoose.Schema({
    id_kh: String,
    no: String, // trạng thái nợ
    tongtienhang:Number,
    hanghoa: [
        {
            id_hh: String,
            ten_hh: String,
            soluong: Number,
            dongia: Number
        }
    ],
    expireAt: { //thời gian nó tự đông hết hạng lấy thời gian hiện tại + 10ss
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7 // sau 1 tuần thì hóa đơn sẻ tự động cóa khỏi db
    },
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date  
        }
    ],
},
    {
        timestamps: true
    });

const Hoadon = mongoose.model('Hoadon', HoadonSchema, "hoadon");

module.exports = Hoadon