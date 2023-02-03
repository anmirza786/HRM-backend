const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone: { type: String },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "categoryhrm", require: true}
});

module.exports = mongoose.model("profilehrm", profileSchema);
