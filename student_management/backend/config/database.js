
const mongoose = require('mongoose')

module.exports.connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/student_db')
    console.log("Kết nối thành công!");
  }
  catch (error) {
    console.log("Kết nối thất bại!");
    console.error("Lỗi: ", error.message);
  }
};
