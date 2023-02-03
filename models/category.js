const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String }
});

module.exports = mongoose.model("categoryhrm", categorySchema);
