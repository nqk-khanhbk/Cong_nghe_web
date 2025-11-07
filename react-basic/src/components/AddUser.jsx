import React from "react";
import './adduser.css';

function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (!user.name || !user.username) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
    });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)}>Thêm người dùng</button>
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>
            <input id="name" value={user.name} onChange={handleChange} placeholder="Tên" />
            <input id="username" value={user.username} onChange={handleChange} placeholder="Username" />
            <input id="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input id="city" value={user.address.city} onChange={handleChange} placeholder="Thành phố" />
            <button onClick={handleAdd}>Lưu</button>
            <button onClick={() => setAdding(false)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;
