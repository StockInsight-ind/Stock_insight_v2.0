require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./Routes/userroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;