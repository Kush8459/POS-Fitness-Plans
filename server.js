const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");
const connectDB = require("./config/config");

// dotenv Config
dotenv.config();

// MongoDB Connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

// port
const PORT = 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgCyan.white);
});
