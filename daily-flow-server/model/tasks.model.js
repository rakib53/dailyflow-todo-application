const mongoose = require("mongoose");

const Tasks = mongoose.Schema({
  userId: String,
  name: String,
  status: String,
  time: Object,
  taskNo: String,
  date: String,
  tasks: [
    { id: Number, content: String, status: Boolean, lastUpdate: Boolean },
  ],
});

module.exports = mongoose.model("tasks", Tasks);
