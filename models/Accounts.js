const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    tentaikhoan: { // cau truc name_donvi 2 cap eg: nguyenvannam_pa08_cahy vuvantinh_thusy_tienlu
        type: String, 
        unique: true
    },
    tenhienthi: String,
    donvicap1: String, // Công an Hưng Yên
    donvicap2: String, // Phòng Quản lý xuất nhập cảnh, Công an huyện Tiên Lữ, Công an xã Thủ Sỹ
    donvicap1_en: String, // Hung Yen polices
    donvicap2_en: String, // Phòng Quản lý xuất nhập cảnh, Công an huyện Tiên Lữ, Công an xã Thủ Sỹ
    matkhau: String,
    donvi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donvis"
    },
    role: {
        type: String, 
        default: 'User'
    },
    trangthai: Boolean // 
});

const Accounts = mongoose.model('Accounts', accountSchema);

module.exports = Accounts;