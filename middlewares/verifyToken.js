const jwt = require("jsonwebtoken");
const Accounts = require("../models/Accounts");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
// console.log(token)
    if (token) {
      const accessToken = req.headers.token.split(" ")[1];
      jwt.verify(accessToken, 'vuvantinh_accessToken', async (err, user) => {
        if (err) {
          console.log(err.message)
          return res.status(403).json({message: "Token đã hết hạn, vui lòng đăng nhập lại"}); // 403 trạng thái máy chủ đã xác nhận nhưng k được phép
        }
        req.userId = user;
        let checked = await Accounts.findOne({
          _id: req.userId.userId,
          trangthai: true,
          role: "Admin"
        });
        // console.log(checked)
        
        if(!checked){
          return res.status(401).json({message: "You are not authenticated"});
        }
        // console.log(req.userId)
        next();
      });
    } else {
      return res.status(401).json({message: "You are not authenticated"});
    }
  },
};

module.exports = middlewareController;
