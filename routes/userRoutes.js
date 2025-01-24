const express = require("express");
const {
  loginControler,
  registerController,
} = require("../controllers/userControllers");

const router = express.Router();

// Routes
// 1) Metod - POST
router.post("/login", loginControler);

// 2) Method - POST
router.post("/register", registerController);

module.exports = router;
