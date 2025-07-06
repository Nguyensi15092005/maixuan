const mongoose = require("mongoose");
const doanhthuSchema = new mongoose.Schema({
    total_tra: Number,
    total_no: Number,
    order_count: Number,
    createdAt:{
        type:Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    });

const Doanhthu = mongoose.model('Doanhthu', doanhthuSchema, "doanhthu");

module.exports = Doanhthu