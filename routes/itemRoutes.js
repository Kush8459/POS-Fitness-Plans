const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemControllers");

const router = express.Router();

// Routes
// 1) Metod - GET
router.get("/get-item", getItemController);

// 2) Method - POST
router.post("/add-item", addItemController);

// 3) Method - PUT
router.put("/edit-item", editItemController);

// 4) Method - POST
router.post("/delete-item", deleteItemController);

module.exports = router;
