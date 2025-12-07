const express = require("express");
const router = express.Router();
const controllers = require('../controllers/student.controller');

// Lấy danh sách sinh viên (có tìm kiếm và sắp xếp)
router.get('/', controllers.listStudents);

// Thêm sinh viên mới
router.post('/create', controllers.createStudent);

// Cập nhật sinh viên
router.put('/update/:id', controllers.updateStudent);

// Xóa sinh viên
router.delete('/delete/:id', controllers.deleteStudent);

module.exports = router;
