var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var assessRouter = require("./routes/assess");
var childrenRouter = require("./routes/children");
// var docsRouter = require("./routes/docs");
var eventsRouter = require("./routes/events");
var authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("uploads"));

//app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// app.use("/api/assess", assessRouter);
app.use("/api/children", childrenRouter);
// app.use("/api/docs", docsRouter);
app.use("/api/events", eventsRouter);

module.exports = app;
