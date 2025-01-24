const express = require("express");
const {
  addBillController,
  getBillController,
} = require("../controllers/billController");

const router = express.Router();

// Routes

// 1) Method = GET
router.get("/get-bill", getBillController);

// 2) Method - POST
router.post("/add-bill", addBillController);

module.exports = router;
