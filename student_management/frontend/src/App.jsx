import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Lấy danh sách sinh viên từ backend
  useEffect(() => {
    fetchStudents();
  }, [searchTerm, sortOrder]);

  const fetchStudents = () => {
    let url = "http://localhost:3000/api/students?";
    if (searchTerm) url += `search=${searchTerm}&`;
    if (sortOrder) url += `sort=${sortOrder}`;

    axios
      .get(url)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Lỗi khi fetch danh sách:", error));
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Mở modal thêm mới
  const handleOpenAddModal = () => {
    setEditMode(false);
    setFormData({ name: "", age: "", class: "" });
    setShowModal(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEditModal = (student) => {
    setEditMode(true);
    setCurrentStudentId(student._id);
    setFormData({
      name: student.name,
      age: student.age,
      class: student.class
    });
    setShowModal(true);
  };

  // Xử lý submit form (thêm hoặc sửa)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.age || !formData.class) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (editMode) {
      // Cập nhật sinh viên
      axios
        .put(`http://localhost:3000/api/students/update/${currentStudentId}`, formData)
        .then((response) => {
          alert("Cập nhật sinh viên thành công!");
          setShowModal(false);
          setFormData({ name: "", age: "", class: "" });
          fetchStudents();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật sinh viên:", error);
          alert("Có lỗi xảy ra!");
        });
    } else {
      // Thêm sinh viên mới
      axios
        .post("http://localhost:3000/api/students/create", formData)
        .then((response) => {
          alert("Thêm sinh viên thành công!");
          setShowModal(false);
          setFormData({ name: "", age: "", class: "" });
          fetchStudents();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sinh viên:", error);
          alert("Có lỗi xảy ra!");
        });
    }
  };

  // Xóa sinh viên
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa sinh viên "${name}"?`)) {
      axios
        .delete(`http://localhost:3000/api/students/delete/${id}`)
        .then((response) => {
          alert("Xóa sinh viên thành công!");
          fetchStudents();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sinh viên:", error);
          alert("Có lỗi xảy ra!");
        });
    }
  };

  return (
    <div className="container">
      <h1>Quản Lý Sinh Viên</h1>

      {/* Thanh công cụ */}
      <div className="toolbar">
        <button className="btn-add" onClick={handleOpenAddModal}>
          + Thêm Sinh Viên
        </button>

        <div className="search-sort">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="">Sắp xếp</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* Bảng danh sách sinh viên */}
      <table className="student-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleOpenEditModal(student)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(student._id, student.name)}
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {searchTerm ? "Không tìm thấy sinh viên" : "Chưa có sinh viên nào"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal thêm/sửa sinh viên */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editMode ? "Chỉnh Sửa Sinh Viên" : "Thêm Sinh Viên Mới"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sinh viên"
                />
              </div>

              <div className="form-group">
                <label>Tuổi:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Nhập tuổi"
                />
              </div>

              <div className="form-group">
                <label>Lớp:</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  placeholder="Nhập lớp"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editMode ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
