require("dotenv").config();
// const path = require("path");
const cors = require("cors");
const express = require("express");
// const mongoose = require("mongoose");
// require("./db_config/database").connect();
const authRouters = require('./routes/authRoutes');
const booksRouters = require('./routes/booksRoutes');
const db = require("./models/mysql");
db.sequelize.sync();
const app = express();

app.use(
  express.json(),
  cors({
    origin: "*",
  })
);

const User = require('./models/user')
const books = require('./models/books')
const borrow = require('./models/borrow')
const profile = require('./models/profile')
const category = require('./models/category')

app.use("/api/user", authRouters);
app.use("/api/books", booksRouters);
app.get("/", async (req, res) => {
  let success = "Success in connecting to the server"
  return res.status(200).send(success);
})


module.exports = app