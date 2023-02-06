const express = require("express");
const { register,login,checkAuthenticated } = require('../controllers/mysql/authCont')
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(auth,checkAuthenticated)

module.exports = router;