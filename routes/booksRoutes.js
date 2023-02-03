const express = require("express");
const { addcategory,getallcategories,add_book,getallbooks,deletebook } = require('../controllers/booksController')
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/add-category").post(auth,addcategory);
router.route("/get-all-categories").get(getallcategories);
router.route("/add-book").post(auth,add_book);
router.route("/getallbooks/").get(getallbooks);
router.route("/deletebook/:id").delete(auth,deletebook);

module.exports = router;