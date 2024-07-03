const jwt = require("jsonwebtoken");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Accounts = require("../models/Accounts");
const Donvis = require("../models/Donvis");
const Reports = require("../models/Report");
module.exports = {
  login: async (req, res) => {
    // console.log(req.body)
    try {
      let user = await Accounts.findOne({
        tentaikhoan: req.body.tentaikhoan,
        role: 'Admin'
      });
      if (!user) {
        return res.status(401).json({ status: false, message: "Tài khoản không đúng!!!" });
      } else {
        const validPassword = await bcrypt.compare(req.body.matkhau, user.matkhau);
        if (!validPassword) {
          return res.status(400).json({ message: "Mật khẩu không đúng!!!" });
        }

        const accessToken = jwt.sign({ userId: user._id }, "vuvantinh_accessToken", {
          expiresIn: '7d'
        });

        res.status(200).json({ status: "success", _id: user._id, tentaikhoan: user.tentaikhoan, accessToken });
      }
    } catch (error) {
      console.log(error.message)
      res.status(401).json({ status: "failed", message: "Lỗi đăng nhập hệ thống" });
    }
  },

  logout: async (req, res) => {
    try {
      //xóa cookie
      // check xem mật khẩu đúng hay sai
      let user = await Accounts.findOne({
        _id: req.userId.userId,
      });

      if (!user) {
        res.status(401).json({ status: 'failed', message: "Không thể đăng xuất tài khoản do xảy ra lỗi" })
        return;
      }
      res.status(200).json({ status: "success", message: "Đăng xuất thành công" })
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Lỗi server hệ thống" });
    }
  },
  getUserList: async (req, res) => {
    // console.log(req.query)
    let { tentaikhoan } = req.query;
    try {
      let users = await Accounts.find({
        tentaikhoan: { $regex: tentaikhoan, $options: "i" },
      }).populate('donvi')
      res.status(200).json(users)
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Có lỗi xảy ra khi lấy dữ liệu" });
    }
  },
  addUser: async (req, res) => {
    let { tentaikhoan, donvi, donvicap1, tenhienthi, donvicap2, donvicap1_en, donvicap2_en, trangthai, matkhau, role } = req.body;
    // console.log(req.body)
    donvi = donvi.value;
    role = role === true ? "Admin" : 'User'
    try {
      let newItem = new Accounts({
        tentaikhoan,
        matkhau,
        role: role,
        tenhienthi,
        donvi: donvi,
        donvicap1, donvicap1_en,
        donvicap2, donvicap2_en,
        trangthai
      });
      const salt = await bcrypt.genSalt(10);
      newItem.matkhau = await bcrypt.hash(matkhau, salt);
      await newItem.save();
      let users = await Accounts.find().populate('donvi');
      res.status(200).json({ status: "success", users, message: "Thêm tài khoản thành công" })
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Có lỗi xảy ra khi thêm mới" });
    }
  },
  editUser: async (req, res) => {
    let id = req.params.id;
    let { tentaikhoan, donvi, donvicap1, tenhienthi, donvicap2, donvicap1_en, donvicap2_en, trangthai, matkhau, role } = req.body;
    donvi = donvi.value;
    role = role === true ? "Admin" : 'User'
    try {
      const salt = await bcrypt.genSalt(10);
      matkhau = await bcrypt.hash(matkhau, salt);
      await Accounts.findByIdAndUpdate(id, {
        tentaikhoan,
        matkhau,
        role: role,
        tenhienthi,
        donvi: donvi,
        donvicap1, donvicap1_en,
        donvicap2, donvicap2_en,
        trangthai
      });
      let users = await Accounts.find().populate('donvi')

      res.status(200).json({ status: "success", users, message: "Cập nhật tài khoản thành công" })
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Có lỗi xảy ra khi cập nhật tài khoản" });
    }
  },
  deleteUser: async (req, res) => {
    let id = req.params.id;

    try {
      await Accounts.findByIdAndDelete(id);
      let users = await Accounts.find().populate('donvi');

      res.status(200).json({ status: "success", users, message: "Xóa tài khoản thành công" })
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Có lỗi xảy ra khi xóa" });
    }
  },


  changePassword: async (req, res) => {
    let { id, matkhaucu, matkhaumoi } = req.body;
    // console.log(req.body)
    try {
      let user = await Accounts.findOne({
        _id: id
      });
      if (!user) {
        return res.status(401).json({ status: false, message: "Tài khoản không đúng!!!" });
      } else {
        // console.log(user)
        const validPassword = await bcrypt.compare(matkhaucu, user.matkhau);
        // console.log(validPassword)
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

  fetchBaocao: async (req, res) => {
    let { tentaikhoan, tungay, denngay, xeploai, donvi, thaido } = req.query;
    // console.log(req.query)
    donvi = donvi.value;
    if (tungay === '') {
      tungay = "1970-01-01"
    };
    if (denngay === '') {
      denngay = "9999-01-01"
    };
    try {
      let donvis = [];
      if (donvi === "") {
        donvis = await Donvis.find();
      } else {
        donvis = await Donvis.find({ _id: donvi })
      };
      // console.log(donvis)
      let accounts = [];
      for (let i of donvis) {
        // console.log('i',i)
        let accounts_donvis = await Accounts.find({
          donvi: i._id,
          tentaikhoan: { $regex: tentaikhoan, $options: "i" }
        });

        if (accounts_donvis.length > 0) {
          accounts = accounts.concat(accounts_donvis)
        };
      };
      // console.log('acc', accounts)
      let rows = [];
      let rathailong = 0;
      let hailong = 0;
      let binhthuong = 0;
      let ratkhonghailong = 0;
      // console.log(accounts)
      for (let e of accounts) {
        // console.log('acc',e)
        let items = await Reports.find({
          account: e._id.toString(),
          createdAt: {
            $lte: denngay,
            $gte: tungay
          },
          rank: { $regex: xeploai },
         thaido: { $regex: thaido},
        }).sort({ createdAt: -1 }).populate({
          path: 'account',
          model: 'Accounts',
          populate: [{
            path: 'donvi',
            model: 'Donvis'
          }]
        })
        // console.log(items)
        if (items.length > 0) {
          rows = rows.concat(items)
        }
      };

      rathailong = rows.filter(i => i.rank === "Rất hài lòng").length;
      hailong = rows.filter(i => i.rank === "Hài lòng").length;
      binhthuong = rows.filter(i => i.rank === "Bình thường").length;
      ratkhonghailong = rows.filter(i => i.rank === "Rất không hài lòng").length;

      let thaidorathailong = 0;
      let thaidohailong = 0;
      let thaidobinhthuong = 0;
      let thaidoratkhonghailong = 0;

      thaidorathailong = rows.filter(i => i.thaido === "Rất hài lòng").length;
      thaidohailong = rows.filter(i => i.thaido === "Hài lòng").length;
      thaidobinhthuong = rows.filter(i => i.thaido === "Bình thường").length;
      thaidoratkhonghailong = rows.filter(i => i.thaido === "Rất không hài lòng").length;

      rows = rows.sort((a,b) => b.createdAt - a.createdAt);

      // console.log(rows)
      res.status(200).json({ status: "success", message: "Tìm kiếm thành công", data: rows, rathailong, hailong, binhthuong, ratkhonghailong, 
        thaidorathailong, thaidohailong, thaidobinhthuong, thaidoratkhonghailong 
      })


    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({ status: "failed", message: "Lỗi server, Vui lòng liên hệ quản trị hệ thống" });
    }
  }
};
