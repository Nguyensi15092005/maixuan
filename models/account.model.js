const mongoose = require("mongoose");
const generate = require("../helper/generate");
const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
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

const Account = mongoose.model('Account', accountSchema, "account");

module.exports = Account