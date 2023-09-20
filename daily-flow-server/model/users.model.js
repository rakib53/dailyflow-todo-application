const mongoose = require("mongoose");

const User = mongoose.Schema({
  userName: String,
  phone: String,
  email: String,
  password: String,
  date: String,
  role: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  avatar: String,
  accountCompeletation: Number,
  contactNumber: String,
  location: String,
  gender: Array,
  employeeType: String,
  language: String,
});

module.exports = mongoose.model("User", User);
