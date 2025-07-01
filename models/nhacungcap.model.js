const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const NhacungcapSchema = new mongoose.Schema({
    title: String,   
    phone: String, 
    christmas: Number, //nợ cần tả
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

const Nhacungcap = mongoose.model('Nhacungcap', NhacungcapSchema, "nhacungcap");

module.exports = Nhacungcap