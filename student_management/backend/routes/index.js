const studentRouter = require('./student.routes');

function route(app) {
  // Route cho User
  app.use('/api/students', studentRouter);

}

module.exports = route;
