// bài tập quản lý sinh viên backend/index.js

// Bài 1:
const express = require("express");
const app = express();
const database = require("./config/database.js");
const route = require('./routes/index.js');
// Chạy server
const port = 3000;

// CORS
const cors = require("cors");
app.use(cors());

// Middleware đọc JSON
app.use(express.json());

// Route đơn giản
app.get("/", (req, res) => {
  res.send("Hello Express!");
});


//kết nối database
database.connect();

// Routes

route(app);

app.listen(port, () => console.log(`Server running on port ${port}`));
