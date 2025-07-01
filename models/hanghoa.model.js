const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const HanghoaSchema = new mongoose.Schema({
    title: String,   //San pham 1
    id_ncc: String,
    sellingPrice: Number, //giá bán
    capitalPrice: Number, //giá vốn
    inventory: Number, //tồn kho
    status: String,
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
        slug: "title", //San pham 1
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

const Hanghoa = mongoose.model('Hanghoa', HanghoaSchema, "hanghoa");

module.exports = Hanghoa