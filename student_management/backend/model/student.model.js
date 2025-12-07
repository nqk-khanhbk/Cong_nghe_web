const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema, 'students');
module.exports = Student;
