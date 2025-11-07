import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";

function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  return (
    <div className="container">
      <header className="header">
        <h2>Quản lý người dùng</h2>
      </header>

      <div className="search-add">
        <div className="search-box">
          <SearchForm onChangeValue={setKeyword} />
        </div>
        <div className="add-box">
          <AddUser onAdd={setNewUser} />
        </div>
      </div>

      <div className="result-section">
        <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
      </div>
    </div>
  );
}

export default App;
