const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    rank: String,
    ghichu: String,
    thaido: String,
    hoten: {
        type: String
    },
    sodienthoai: {
        type: Number
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts"
    },
},{timestamps: true});

const Reports = mongoose.model('Reports', reportSchema);

module.exports = Reports;