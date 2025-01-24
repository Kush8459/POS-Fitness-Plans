const billModel = require("../models/billModel");

// Add Bills
const addBillController = async (req, res) => {
  try {
    const newBill = new billModel(req.body);
    await newBill.save();
    res.status(201).send({ message: "Bill Generated Successfully" });
  } catch (error) {
    res.status(505).send({ message: `Error: ${error}` });
    console.log(error);
  }
};

// get Bills
const getBillController = async (req, res) => {
  try {
    const bills = await billModel.find();
    res.status(200).send(bills);
  } catch (error) {
    res.status(404).send("Something went wrong");
    console.log(error);
  }
};

module.exports = {
  addBillController,
  getBillController,
};
