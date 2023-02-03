const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  bookname: { type: String, default: null },
  author: { type: String, default: null },
  category: {type: mongoose.Schema.Types.ObjectId, ref: "categoryhrm", require: true},
  published: { type: Date },
});

module.exports = mongoose.model("bookshrm", booksSchema);
