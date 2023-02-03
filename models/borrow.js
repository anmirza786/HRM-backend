const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "userhrm", require: true},
  book: {type: mongoose.Schema.Types.ObjectId, ref: "bookshrm", require: true},
  borrow_date: { type: Date },
  return_date: { type: Date }
});

module.exports = mongoose.model("borrowhrm", borrowSchema);
