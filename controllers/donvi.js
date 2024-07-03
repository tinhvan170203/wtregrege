const Donvis = require("../models/Donvis");

module.exports = {
  getDonvis: async (req, res) => {
    try {
      let donvis = await Donvis.find();
      res.status(200).json(donvis);
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({
        status: "failed",
        message: "Có lỗi xảy ra khi lấy danh sách đơn vị. Vui lòng liên hệ quản trị viên",
      });
    }
  },
  getDonvisActive: async (req, res) => {
    try {
      let donvis = await Donvis.find({active: true});
      // console.log(donvis)
      res.status(200).json(donvis);
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({
        status: "failed",
        message: "Có lỗi xảy ra khi lấy danh sách đơn vị. Vui lòng liên hệ quản trị viên",
      });
    }
  },
  
  addDonvi: async (req, res) => {
    let {tendonvi, kyhieu, active} = req.body;
    try {
        let donvi = new Donvis({tendonvi, kyhieu, active});
        await donvi.save();

        let donvis = await Donvis.find()
        res.status(200).json({donvis, message: "Thêm mới đơn vị thành công!"})
    } catch (error) {
        console.log("lỗi: ", error.message);
      res.status(401).json({
        status: "failed",
        message: "Có lỗi xảy ra khi thêm mới đơn vị. Vui lòng liên hệ quản trị viên",
      });
    }
  },

  updateDonvi: async (req, res) => {
    let {tendonvi, kyhieu, active} = req.body;
    let id = req.params.id;
    try {
      await Donvis.findByIdAndUpdate(id,{
        tendonvi, kyhieu, active
      });

      let donvis = await Donvis.find()

      res.status(200).json({donvis, message: "Update đơn vị thành công!"})
  } catch (error) {
      console.log("lỗi: ", error.message);
    res.status(401).json({
      status: "failed",
      message: "Có lỗi xảy ra khi update đơn vị. Vui lòng liên hệ quản trị viên",
    });
  }
  },

  deleteDonvi:  async (req, res) => {
    let id = req.params.id;
    try {
    //   let checked = await Canbos.findOne({
    //     "donvi.donvi" : id
    //   });

    //   if(checked!== null){
    //     const error = new Error('Thao tác xóa thất bại do có đoàn viên đang thuộc đơn vị bạn muốn xóa. Vui lòng kiểm tra lại hành động xóa');
    //     error.status = 401;
    //     throw error;
    //   };



      await Donvis.findByIdAndUpdate(id,{
        active: false
      });
      let donvis = await Donvis.find();

      res.status(200).json({donvis, message: "Xóa đơn vị thành công!"})
    } catch (error) {
      console.log("lỗi: ", error.message);
      res.status(401).json({
        status: "failed",
        message: error.message,
      });
    }
  }

};
