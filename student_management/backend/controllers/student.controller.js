const Student = require('../model/student.model');

// Lấy danh sách sinh viên (có tìm kiếm và sắp xếp)
module.exports.listStudents = async (req, res) => {
  try {
    const { search, sort } = req.query;

    // Build query cho tìm kiếm
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
    }

    // Build sort option
    let sortOption = {};
    if (sort === 'asc') {
      sortOption.name = 1; // A -> Z
    } else if (sort === 'desc') {
      sortOption.name = -1; // Z -> A
    }

    const students = await Student.find(query).sort(sortOption);
    res.status(200).json(students);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh viên:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
}

// Thêm sinh viên mới
module.exports.createStudent = async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const { name, age, class: studentClass } = req.body;

    // Validation
    if (!name || !age || !studentClass) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    // Tạo sinh viên mới
    const newStudent = new Student({
      name,
      age: parseInt(age),
      class: studentClass
    });

    await newStudent.save();
    console.log('Student saved:', newStudent);

    res.status(201).json({ message: 'Thêm sinh viên thành công', data: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
}

// Cập nhật thông tin sinh viên
module.exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, class: studentClass } = req.body;

    console.log('Updating student:', id, req.body);

    // Validation
    if (!name || !age || !studentClass) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age: parseInt(age), class: studentClass },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    console.log('Student updated:', updatedStudent);
    res.status(200).json({ message: 'Cập nhật sinh viên thành công', data: updatedStudent });
  } catch (error) {
    console.error('Lỗi khi cập nhật sinh viên:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
}

// Xóa sinh viên
module.exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Deleting student:', id);

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    console.log('Student deleted:', deletedStudent);
    res.status(200).json({ message: 'Xóa sinh viên thành công', data: deletedStudent });
  } catch (error) {
    console.error('Lỗi khi xóa sinh viên:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
}
