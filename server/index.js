require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const signup = require("./routes/signup");
const login = require("./routes/login");
const profile = require("./routes/profile");
const tweet = require("./routes/tweet");
const dashboard = require("./routes/dashboard");
const messages = require("./routes/messages");
const users = require("./routes/users");
const conversations = require("./routes/conversations");
const { createServer } = require("http");
const protectedauth = require("./middleware/protectedauth");
const { Server } = require("socket.io");

//BodyParser Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/", signup);
app.use("/", login);
app.use("/", profile);
app.use("/", tweet);
app.use("/", messages);
app.use("/", conversations);
app.use("/", users);

app.use("/", dashboard);
app.use("/", protectedauth);

const httpServer = createServer(app);

//mondodb connection
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// SOCKET

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// io.on("connection", (socket) => {
//   console.log(`some one with id ${socket.id} has connected`);

//   socket.on("join_room", (data) => {
//     console.log(data);

//     socket.join(data);
//   });

//   socket.on("message", (data) => {
//     console.log(data);

//     socket.to(data.room).emit("receive_message", data);
//   });
// });

//PORT LISTEN
PORT = process.env.PORT_NO || 5000;

httpServer.listen(PORT, console.log(`server is running at ${PORT}`));
