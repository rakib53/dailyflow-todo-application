const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/user.router");
const TaskRouter = require("./routes/dailyRoutine.router");
const googleLoginRoute = require("./routes/googleLogin.router");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// User API

app.use("/api", UserRouter);
app.use("/api", googleLoginRoute);

// Tasks Api
app.use("/api", TaskRouter);

// Error Handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ message: "Something went wrong!!" });
  }
});

module.exports = app;
