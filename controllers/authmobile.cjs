const jwt = require("jsonwebtoken");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Accounts = require("../models/Accounts");
const Donvis = require("../models/Donvis");
const Reports = require("../models/Report");
module.exports = {
  login: async (req, res) => {
    try {
        // console.log(req.body)
      let user = await Accounts.findOne({
        tentaikhoan: req.body.tentaikhoan,
        trangthai: true
      });
      if (!user) {
        return res.status(401).json({ status: false, message: "Tài khoản không đúng!!!" });
      } else {
          const validPassword = await bcrypt.compare(req.body.matkhau, user.matkhau);
        if (!validPassword) {
          return res.status(401).json({ message: "Mật khẩu không đúng!!!" });
        }
      
        const accessToken = jwt.sign({ userId: user._id }, "vuvantinh_accessToken",{
          expiresIn: '7d'
        });

        res.status(200).json({ status: "success", _id: user._id, tentaikhoan: user.tentaikhoan, accessToken, thongtin: user});
      }
    } catch (error) {
      console.log(error.message)
      res.status(401).json({ status: "failed", message: "Lỗi đăng nhập hệ thống" });
    }
  },

  logout: async(req, res) => {
    try {
        console.log(req.body)
     // check xem mật khẩu đúng hay sai
     let user = await Accounts.findOne({
      _id: req.body.id
     });

    //  console.log(user)
     if (!user) {
        return res.status(401).json({ status: false, message: "Tài khoản không đúng!!!" });
      } else {
          const validPassword = await bcrypt.compare(req.body.matkhau, user.matkhau);
        console.log(validPassword)
          if (!validPassword) {
          return res.status(400).json({ message: "Mật khẩu không đúng!!!" });
        }
      res.status(200).json({status: "success",message: "Đăng xuất thành công"})
      }
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Lỗi server hệ thống" });
    }
  },
  addReport: async(req, res) => {
    let {rank, name, number, ghichu, id, thaido} = req.body;
    // console.log(req.body)
    try {
      let newItem = new Reports({
        hoten:name,rank,thaido,sodienthoai: number, ghichu, account: id
      });
    //   console.log(newItem)
      await newItem.save();
      res.status(200).json({message: "Thành công"})
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Lỗi server, Vui lòng liên hệ quản trị hệ thống" });
    }
  },
  changePassword: async (req, res) => {
    let { id, matkhaucu, matkhaumoi} = req.body;
    console.log(req.body)
    try {
      let user = await Accounts.findOne({
        _id: id
      });
      // console.log(user)
      if (!user) {
        return res.status(401).json({ status: false, message: "Tài khoản không đúng!!!" });
      } else {
        // console.log(user)
        const validPassword = await bcrypt.compare(matkhaucu, user.matkhau);
        console.log(validPassword)
        if (!validPassword) {
          return res.status(400).json({ message: "Mật khẩu cũ không đúng!!!" });
        }
        const salt = await bcrypt.genSalt(10);
         matkhaumoi = await bcrypt.hash(matkhaumoi, salt);
        user.matkhau = matkhaumoi;
        await user.save();
        res.status(200).json({ message: "Đổi mật khấu thành công. Vui lòng đăng nhập lại." })
      }
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Lỗi server, Vui lòng liên hệ quản trị hệ thống" });
    }
  },

};
