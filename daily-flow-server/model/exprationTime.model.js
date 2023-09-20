const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // Your existing task schema fields

  expirationDate: {
    type: String,
    index: { expires: 60 }, // Create TTL index to automatically delete documents after 24 hours
  },
});

module.exports = mongoose.model("Task", taskSchema);
