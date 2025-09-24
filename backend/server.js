const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userAuthRoute = require("./routes/UserAuthRoute");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userAuthRoute);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("not connected", err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
