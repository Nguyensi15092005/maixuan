const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const KhachhangSchema = new mongoose.Schema({
    name: String,   
    phone: String, 
    inDebt: Number, //nợ
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {  // thư viện npm dùng để có cái trên trang ở trên url đường dẫn
        type: String,
        slug: "name", //San pham 1
        unique: true  // duy nhất
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date  
        }
    ],

    // deletedAt: Date
    // deletedBy: {
    //     account_id: String,
    //     deletedAt: Date
    // },
},
    {
        timestamps: true
    });

const Khachhang = mongoose.model('Khachhang', KhachhangSchema, "khachhang");

module.exports = Khachhang