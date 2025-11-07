import React from "react";
import './resyltTable.css';


function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [editing, setEditing] = React.useState(null);

  // tải dữ liệu từ API 1 lần
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // khi có user mới => thêm vào danh sách
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user]);

  // lọc theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  const removeUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  const editUser = (u) => setEditing({ ...u, address: { ...u.address } });

  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setEditing((prev) => ({ ...prev, [field]: value }));
    }
  };

  const saveUser = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editing.id ? editing : u))
    );
    setEditing(null);
  };

  return (
    <div>
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa người dùng</h4>
            <input
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <input
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
            />
            <input
              value={editing.address.city}
              onChange={(e) => handleEditChange("city", e.target.value)}
            />
            <button onClick={saveUser}>Lưu</button>
            <button onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </div>
      )}

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Username</th>
            <th>Email</th>
            <th>Thành phố</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <button onClick={() => editUser(u)}>Sửa</button>
                <button onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
