require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const signup = require("./routes/signup");
const login = require("./routes/login");
const profile = require("./routes/profile");
const tweet = require("./routes/tweet");
const protectedauth = require("./middleware/protectedauth");
const app = express();

//BodyParser Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/", signup);
app.use("/", login);
app.use("/", profile);
app.use("/", tweet);
app.use("/", protectedauth);

//mondodb connection
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//PORT Listen
PORT = process.env.PORT_NO || 5000;

app.listen(PORT, console.log(`server is running at ${PORT}`));
