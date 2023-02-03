const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String }
});

module.exports = mongoose.model("userhrm", userSchema);
